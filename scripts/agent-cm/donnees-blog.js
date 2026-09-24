/**
 * Lecture et écriture SÛRES des fichiers de données du blog.
 *
 * Pourquoi un vrai analyseur (le compilateur TypeScript) et plus des
 * expressions régulières :
 *
 *  1. TRONCATURE DU 18/09/2026. L'ancien découpage repérait le début de chaque
 *     article par sa signature de mise en page, et prenait « jusqu'à la fin du
 *     fichier » pour le dernier. Réécrire le DERNIER article du fichier
 *     remplaçait donc aussi la fermeture `];` du tableau : le commit 872ae77 a
 *     laissé `blog-posts-camille.ts` ouvert et cassé `main` pendant deux jours.
 *     Ici chaque article est un nœud de l'arbre syntaxique, avec un début et
 *     une fin exacts : on ne remplace que lui.
 *
 *  2. QUATRE FICHIERS, QUATRE MISES EN PAGE. `blog-posts.ts` mélange des
 *     constantes isolées (`const article1: BlogPost = {…};`) et un tableau dont
 *     les objets ont l'auteur sur une ligne et la FAQ avant le contenu ;
 *     `blog-posts-seo-2026.ts` n'a que des constantes. Aucune signature de
 *     texte ne les couvre tous ; l'arbre syntaxique, si.
 *
 *  3. VÉRIFIER AVANT D'ÉCRIRE. Toute écriture passe par verifierEcriture() :
 *     le fichier produit doit être du TypeScript syntaxiquement valide, garder
 *     le même nombre d'articles (+1 pour une création), n'en perdre aucun, et
 *     l'article écrit doit se relire tel qu'on l'a voulu. Sinon RIEN n'est
 *     écrit sur le disque.
 */
const fs = require('fs');
const path = require('path');
const ts = require('typescript');
const { DATA_DIR, FICHIERS_DONNEES, MERGED_PATH } = require('./config');

function nomPropriete(nom) {
  if (ts.isIdentifier(nom) || ts.isStringLiteral(nom) || ts.isNumericLiteral(nom)) return nom.text;
  return null;
}

/** Valeur JavaScript d'un littéral ; `undefined` pour tout ce qui n'en est pas un (identifiant, appel…). */
function valeur(n) {
  if (!n) return undefined;
  if (ts.isStringLiteral(n) || ts.isNoSubstitutionTemplateLiteral(n)) return n.text;
  if (ts.isNumericLiteral(n)) return Number(n.text);
  if (n.kind === ts.SyntaxKind.TrueKeyword) return true;
  if (n.kind === ts.SyntaxKind.FalseKeyword) return false;
  if (ts.isAsExpression(n) || ts.isParenthesizedExpression(n) || ts.isSatisfiesExpression?.(n)) return valeur(n.expression);
  if (ts.isPrefixUnaryExpression(n) && n.operator === ts.SyntaxKind.MinusToken) {
    const v = valeur(n.operand);
    return typeof v === 'number' ? -v : undefined;
  }
  if (ts.isArrayLiteralExpression(n)) return n.elements.map(valeur);
  if (ts.isObjectLiteralExpression(n)) {
    const o = {};
    for (const p of n.properties) {
      if (ts.isPropertyAssignment(p)) {
        const k = nomPropriete(p.name);
        if (k !== null) o[k] = valeur(p.initializer);
      }
    }
    return o;
  }
  return undefined;
}

/**
 * Tous les articles d'un fichier source : chaque objet littéral qui porte à
 * la fois `slug` (chaîne) et `content`. On ne descend pas dans un article.
 */
function analyser(source, nom = 'donnees.ts') {
  const sf = ts.createSourceFile(nom, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const articles = [];
  const visiter = (n) => {
    if (ts.isObjectLiteralExpression(n)) {
      const props = new Map();
      for (const p of n.properties) {
        if (ts.isPropertyAssignment(p)) {
          const k = nomPropriete(p.name);
          if (k !== null) props.set(k, p);
        }
      }
      const slug = props.has('slug') ? valeur(props.get('slug').initializer) : undefined;
      if (typeof slug === 'string' && props.has('content')) {
        articles.push({ slug, debut: n.getStart(sf), fin: n.getEnd(), props, sf });
        return;
      }
    }
    ts.forEachChild(n, visiter);
  };
  visiter(sf);
  return articles;
}

/** Les champs d'un article analysé, en valeurs JavaScript. */
function valeurs(article) {
  const o = {};
  for (const [k, p] of article.props) o[k] = valeur(p.initializer);
  return o;
}

/** Texte source d'un champ, tel qu'il est écrit dans le fichier. */
function texteChamp(article, champ) {
  const p = article.props.get(champ);
  return p ? p.getText(article.sf) : null;
}

/** Erreurs de SYNTAXE (pas de typage) d'un fichier TypeScript. */
function erreursSyntaxe(source, nom = 'donnees.ts') {
  const r = ts.transpileModule(source, {
    reportDiagnostics: true,
    fileName: nom,
    compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext },
  });
  return (r.diagnostics || []).map((d) => {
    const pos = d.file && d.start != null ? d.file.getLineAndCharacterOfPosition(d.start) : null;
    return `${pos ? `ligne ${pos.line + 1} : ` : ''}${ts.flattenDiagnosticMessageText(d.messageText, '\n')}`;
  });
}

const normaliser = (s) => String(s ?? '').trim();

/**
 * GARDE-FOU ANTI-TRONCATURE. Lève si `apres` n'est pas une version saine de
 * `avant`. Ne touche à rien : c'est à l'appelant de ne pas écrire.
 *
 * @param {object} [opts]
 * @param {number} [opts.delta=0]   variation attendue du nombre d'articles (+1 = création)
 * @param {string} [opts.slug]      l'article écrit — doit exister exactement une fois
 * @param {object} [opts.attendu]   champs que l'article écrit doit porter en relecture
 */
function verifierEcriture(avant, apres, nom, { delta = 0, slug = null, attendu = null } = {}) {
  const problemes = [];

  const syntaxe = erreursSyntaxe(apres, nom);
  if (syntaxe.length) problemes.push(`syntaxe invalide (fermeture manquante ou fichier tronqué ?) : ${syntaxe.slice(0, 3).join(' | ')}`);

  const articlesAvant = analyser(avant, nom);
  const articlesApres = analyser(apres, nom);
  if (articlesApres.length !== articlesAvant.length + delta) {
    problemes.push(`nombre d'articles : ${articlesApres.length} au lieu de ${articlesAvant.length + delta}`);
  }
  const restants = new Set(articlesApres.map((a) => a.slug));
  const perdus = articlesAvant.map((a) => a.slug).filter((s) => !restants.has(s));
  if (perdus.length) problemes.push(`article(s) disparu(s) : ${perdus.slice(0, 5).join(', ')}`);

  if (slug) {
    const occurrences = articlesApres.filter((a) => a.slug === slug);
    if (occurrences.length !== 1) {
      problemes.push(`l'article « ${slug} » apparaît ${occurrences.length} fois au lieu d'une`);
    } else if (attendu) {
      const relu = valeurs(occurrences[0]);
      for (const [k, v] of Object.entries(attendu)) {
        if (normaliser(relu[k]) !== normaliser(v)) problemes.push(`le champ « ${k} » ne se relit pas tel qu'écrit`);
      }
    }
  }

  if (problemes.length) {
    throw new Error(`Écriture REFUSÉE dans ${nom} — le fichier serait abîmé :\n- ${problemes.join('\n- ')}`);
  }
}

/**
 * Écrit `apres` à la place de `avant`, SEULEMENT si verifierEcriture() passe.
 * Relit ensuite le disque : si le contenu diffère (disque plein, écriture
 * interrompue), restaure l'original et lève.
 */
function ecrireFichierVerifie(chemin, avant, apres, opts = {}) {
  const nom = path.basename(chemin);
  verifierEcriture(avant, apres, nom, opts);
  fs.writeFileSync(chemin, apres, 'utf-8');
  if (fs.readFileSync(chemin, 'utf-8') !== apres) {
    fs.writeFileSync(chemin, avant, 'utf-8');
    throw new Error(`Écriture de ${nom} non conforme à la relecture — version d'origine restaurée`);
  }
}

/** Toutes les occurrences d'un slug, dans les quatre fichiers. */
function localiser(slug) {
  const trouves = [];
  for (const fichier of FICHIERS_DONNEES) {
    const chemin = path.join(DATA_DIR, fichier);
    if (!fs.existsSync(chemin)) continue;
    const source = fs.readFileSync(chemin, 'utf-8');
    for (const article of analyser(source, fichier)) {
      if (article.slug === slug) trouves.push({ fichier, chemin, source, article });
    }
  }
  return trouves;
}

/**
 * Remplace l'objet de l'article `slug`, où qu'il vive, par le texte que
 * `construire(occurrence)` renvoie (un objet littéral `{ … }`, sans virgule).
 * Seul l'intervalle exact de l'objet change ; le reste du fichier est conservé
 * à l'octet près.
 */
function remplacerArticle(slug, construire, { attendu = null } = {}) {
  const trouves = localiser(slug);
  if (trouves.length === 0) throw new Error(`Réécriture impossible : aucun article avec le slug "${slug}"`);
  if (trouves.length > 1) {
    throw new Error(
      `Réécriture refusée : le slug "${slug}" est présent dans plusieurs objets (${trouves.map((t) => t.fichier).join(', ')}) — ambigu, à dédoublonner à la main.`,
    );
  }
  const occ = trouves[0];
  const texte = construire(occ);
  const apres = occ.source.slice(0, occ.article.debut) + texte + occ.source.slice(occ.article.fin);
  ecrireFichierVerifie(occ.chemin, occ.source, apres, { slug, attendu });
  return occ;
}

const compterMots = (html) => String(html || '').replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;

/**
 * Inventaire de TOUS les articles, quel que soit leur fichier, avec ce qu'il
 * faut pour choisir et réécrire : contenu, dates, volume, conformité.
 */
function listerArticles() {
  const liste = [];
  for (const fichier of FICHIERS_DONNEES) {
    const chemin = path.join(DATA_DIR, fichier);
    if (!fs.existsSync(chemin)) continue;
    const source = fs.readFileSync(chemin, 'utf-8');
    for (const a of analyser(source, fichier)) {
      const v = valeurs(a);
      const html = normaliser(v.content);
      liste.push({
        fichier,
        id: v.id,
        slug: a.slug,
        title: v.title || '',
        category: v.category,
        author: v.author && typeof v.author === 'object' ? v.author : undefined,
        image: v.image,
        imageAlt: v.imageAlt || '',
        keywords: Array.isArray(v.keywords) ? v.keywords.filter((k) => typeof k === 'string') : [],
        publishedAt: v.publishedAt,
        updatedAt: v.updatedAt || null,
        content: html,
        mots: compterMots(html),
        h3: (html.match(/<h3[\s>]/gi) || []).length,
        sourceExterne: /<a [^>]*href=["']https?:\/\/(?!www\.selectchateaux)/i.test(html),
      });
    }
  }
  return liste;
}

/** Slugs redirigés en 301 (src/data/merged-redirects.json) → destination. */
function lireFusions() {
  try {
    return new Map(JSON.parse(fs.readFileSync(MERGED_PATH, 'utf-8')).merges.map((m) => [m.from, m.to]));
  } catch {
    return new Map();
  }
}

module.exports = {
  analyser, valeurs, texteChamp, erreursSyntaxe, verifierEcriture, ecrireFichierVerifie,
  localiser, remplacerArticle, listerArticles, lireFusions, compterMots,
};

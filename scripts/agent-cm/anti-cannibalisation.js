#!/usr/bin/env node
/**
 * Garde-fou ANTI-CANNIBALISATION — Agent Camille
 *
 * RÈGLE FONDATRICE (Avidan, 2026-06-11) : on ne soigne pas le symptôme,
 * on corrige la machine. Ce module est la machine corrigée : un gate EN CODE
 * (pas en prompt) qui bloque toute publication d'article cannibalisant.
 *
 * 4 règles bloquantes :
 *   1. CLUSTER_PROTEGE       — le title/slug/keywords cible un mot-clé possédé
 *                              par une page canonique (seo-clusters.json) → REJET
 *   2. SLUG_SIMILAIRE        — slug trop proche d'un article existant
 *                              (Jaccard ≥ 0.5, accents/stopwords/années neutralisés)
 *   3. SUJET_DOUBLON         — title+keywords trop proches d'un article existant
 *                              (Jaccard ≥ 0.45)
 *   4. LIEN_CANONIQUE_MANQUANT — l'article mentionne une zone (Chantilly, Yvelines…)
 *                              dans son ciblage OU son contenu, sans lien vers sa
 *                              landing canonique
 *
 * Usage module : const { checkArticle, loadClusters, getExistingArticles } = require('./anti-cannibalisation')
 * Usage CLI    : node anti-cannibalisation.js --file /tmp/article.json [--exclude-slug slug-en-reecriture]
 */
const fs = require('fs');
const path = require('path');

const AGENT_DIR = __dirname;
const SITE_DIR = path.resolve(AGENT_DIR, '../..');

// Mots vides + mots "marketing" sans valeur de ciblage + années (bruit pur)
const STOPWORDS = new Set([
  'les', 'des', 'une', 'aux', 'pour', 'dans', 'sur', 'avec', 'sans', 'vos',
  'votre', 'nos', 'notre', 'par', 'est', 'son', 'ses', 'qui', 'que', 'quel',
  'quelle', 'quels', 'quelles', 'comment', 'pourquoi', 'combien', 'guide',
  'complet', 'complete', 'top', 'meilleur', 'meilleurs', 'meilleure',
  'meilleures', 'idee', 'idees', 'conseils', 'astuces',
  '2024', '2025', '2026', '2027', '2028',
]);

// Zones dont le mot déclencheur est ambigu : on ignore l'occurrence si elle est
// précédée d'un des mots listés (ex: "Val-d'Oise" → ['val','oise'] ≠ Oise 60).
const ZONE_WORD_NOT_PRECEDED_BY = {
  oise: ['val'],
};

function normalizeWords(text) {
  return String(text || '')
    .toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '') // accents
    .replace(/[^a-z0-9\s-]/g, ' ')
    .split(/[\s-]+/)
    .filter(w => w.length > 0);
}

function normalize(text) {
  // Les nombres à 2+ chiffres sont conservés : "78", "92", "60" sont des
  // départements DISCRIMINANTS — les jeter dégraderait "chateau seminaire 78"
  // en paire générique {chateau, seminaire} qui matcherait n'importe quoi.
  return normalizeWords(text).filter(w => (w.length > 2 || /^\d{2,}$/.test(w)) && !STOPWORDS.has(w));
}

function toSet(text) { return new Set(normalize(text)); }

function jaccard(a, b) {
  if (a.size === 0 || b.size === 0) return 0;
  const inter = [...a].filter(w => b.has(w)).length;
  const union = new Set([...a, ...b]).size;
  return inter / union;
}

function containsAll(haystackSet, words) {
  return words.length > 0 && words.every(w => haystackSet.has(w));
}

/** Détecte une zone dans une liste ordonnée de mots, en respectant les exceptions
 *  (ex: 'oise' précédé de 'val' = Val-d'Oise, pas la zone Oise 60).
 *  On remonte en sautant les connecteurs d'une lettre : "val-d'oise" se
 *  normalise en ['val','d','oise'] — le mot significatif précédent est 'val'. */
function wordsMentionZone(words, zoneWord) {
  const exceptions = ZONE_WORD_NOT_PRECEDED_BY[zoneWord];
  for (let i = 0; i < words.length; i++) {
    if (words[i] !== zoneWord) continue;
    if (exceptions) {
      let j = i - 1;
      while (j >= 0 && words[j].length <= 1) j--; // sauter les connecteurs (d, l…)
      if (j >= 0 && exceptions.includes(words[j])) continue;
    }
    return true;
  }
  return false;
}

function loadClusters() {
  const file = path.join(AGENT_DIR, 'seo-clusters.json');
  return JSON.parse(fs.readFileSync(file, 'utf-8')).clusters;
}

/**
 * Scanne les 4 fichiers de données blog → [{slug, title}]
 * Parsing par machine à états (slug → title suivant) : robuste aux apostrophes
 * françaises dans les titres double-quotés et aux clés dans le désordre —
 * contrairement à deux regex indépendantes appariées par index.
 */
function getExistingArticles() {
  const articles = [];
  const dataDir = path.join(SITE_DIR, 'src/data');
  const files = ['blog-posts.ts', 'blog-posts-seo-2026.ts', 'blog-posts-niches-2026.ts', 'blog-posts-camille.ts'];
  // Capture "…" (apostrophes OK à l'intérieur) ou '…' (sans apostrophe interne)
  const kvRegex = /\b(slug|title):\s*(?:"([^"]*)"|'([^']*)')/g;
  for (const file of files) {
    try {
      const content = fs.readFileSync(path.join(dataDir, file), 'utf-8');
      let current = null;
      let m;
      while ((m = kvRegex.exec(content)) !== null) {
        const key = m[1];
        const value = m[2] !== undefined ? m[2] : m[3];
        if (key === 'slug') {
          if (current) articles.push(current); // slug sans title rencontré avant
          current = { slug: value, title: value };
        } else if (key === 'title' && current && current.title === current.slug) {
          current.title = value;
        }
      }
      if (current) articles.push(current);
      kvRegex.lastIndex = 0;
    } catch { /* fichier absent — ok */ }
  }
  return articles;
}

/** Pré-calcule les ensembles de mots des articles existants (perf : évite de
 *  re-normaliser ~75 titres/slugs à chaque candidat). */
function prepareExisting(existingArticles) {
  return existingArticles.map(ex => ({
    ...ex,
    slugSet: toSet(ex.slug),
    subjectSet: new Set([...toSet(ex.title), ...toSet(ex.slug)]),
  }));
}

/**
 * Vérifie un article candidat. Retourne { ok, violations: [{rule, detail}] }.
 * @param article  {slug, title, keywords?, content?}
 * @param existingArticles  [{slug, title}] — défaut : scan des data files.
 *        Peut contenir des entrées déjà préparées (prepareExisting) pour la perf.
 * @param clusters  défaut : seo-clusters.json
 * @param opts  {excludeSlug} — pour valider une RÉÉCRITURE (s'exclure soi-même)
 */
function checkArticle(article, existingArticles, clusters, opts = {}) {
  let existing = existingArticles || getExistingArticles();
  clusters = clusters || loadClusters();
  if (opts.excludeSlug) {
    existing = existing.filter(a => a.slug !== opts.excludeSlug);
  }
  // Préparer si pas déjà fait
  if (existing.length > 0 && !existing[0].slugSet) {
    existing = prepareExisting(existing);
  }

  const violations = [];
  const titleSet = toSet(article.title);
  const slugSet = toSet(article.slug);
  const kwSet = toSet((article.keywords || []).join(' '));
  // Mots ordonnés du ciblage (title+slug+keywords) — utilisés par la règle 4
  // pour la détection de zone avec exceptions d'adjacence (Val-d'Oise ≠ Oise).
  const footprintWords = [
    ...normalizeWords(article.title),
    ...normalizeWords(article.slug),
    ...normalizeWords((article.keywords || []).join(' ')),
  ];

  // ── Règle 1 : protection des clusters (mots-clés possédés)
  // Surveille title + slug + KEYWORDS : un title neutre avec keywords
  // ["seminaire chantilly"] est un ciblage déguisé → bloqué aussi.
  // Évaluation PAR PHRASE (title, slug, chaque keyword séparément) — l'union
  // de tous les mots matcherait des mots éparpillés sur des keywords sans
  // rapport (faux positifs massifs sur les mots fréquents seminaire/chateau).
  const ambiguousFiltered = (words) => {
    const set = new Set(words.filter(w => (w.length > 2 || /^\d{2,}$/.test(w)) && !STOPWORDS.has(w)));
    for (const zw of Object.keys(ZONE_WORD_NOT_PRECEDED_BY)) {
      if (set.has(zw) && !wordsMentionZone(words, zw)) set.delete(zw);
    }
    return set;
  };
  const targetingPhrases = [
    ambiguousFiltered(normalizeWords(article.title)),
    ambiguousFiltered(normalizeWords(article.slug)),
    ...(article.keywords || []).map(k => ambiguousFiltered(normalizeWords(k))),
  ];
  for (const c of clusters) {
    if (c.canonical === `/blog/${article.slug}`) continue; // réécriture de la page pilier elle-même
    if (opts.excludeSlug && c.canonical === `/blog/${opts.excludeSlug}`) continue;
    for (const pk of c.primaryKeywords) {
      const pkWords = normalize(pk);
      if (targetingPhrases.some(phrase => containsAll(phrase, pkWords))) {
        violations.push({
          rule: 'CLUSTER_PROTEGE',
          detail: `Le title/slug/keywords cible "${pk}" qui appartient à ${c.canonical}. INTERDIT — il faut renforcer la page canonique (réécriture, maillage), pas créer un concurrent interne.`,
        });
        break; // 1 violation par cluster suffit
      }
    }
  }

  // ── Règle 2 : similarité de slug (seuil 0.5 — l'ancien 0.7 laissait passer les doublons réordonnés)
  const MAX_PER_RULE = 3; // au-delà, le feedback devient du bruit pour le LLM
  let slugHits = 0;
  for (const ex of existing) {
    const sim = jaccard(slugSet, ex.slugSet);
    if (sim >= 0.5) {
      if (slugHits < MAX_PER_RULE) {
        violations.push({
          rule: 'SLUG_SIMILAIRE',
          detail: `Slug "${article.slug}" trop proche de "${ex.slug}" (similarité ${(sim * 100).toFixed(0)}%).`,
        });
      }
      slugHits++;
    }
  }
  if (slugHits > MAX_PER_RULE) {
    violations.push({ rule: 'SLUG_SIMILAIRE', detail: `…et ${slugHits - MAX_PER_RULE} autre(s) slug(s) similaire(s).` });
  }

  // ── Règle 3 : doublon de sujet (title + keywords vs articles existants)
  const subjectSet = new Set([...titleSet, ...kwSet]);
  let subjectHits = 0;
  for (const ex of existing) {
    const sim = jaccard(subjectSet, ex.subjectSet);
    if (sim >= 0.45) {
      if (subjectHits < MAX_PER_RULE) {
        violations.push({
          rule: 'SUJET_DOUBLON',
          detail: `Le sujet (title+keywords) recouvre "${ex.slug}" à ${(sim * 100).toFixed(0)}%. Choisir un sujet réellement différent.`,
        });
      }
      subjectHits++;
    }
  }
  if (subjectHits > MAX_PER_RULE) {
    violations.push({ rule: 'SUJET_DOUBLON', detail: `…et ${subjectHits - MAX_PER_RULE} autre(s) sujet(s) doublonné(s).` });
  }

  // ── Règle 4 : rôle satellite — zone mentionnée (ciblage OU contenu) ⇒ lien canonique obligatoire
  if (article.content) {
    // Le lien est accepté sous toute forme contenant le chemin canonique
    // (relatif, absolu https://www.selectchateaux.com/…, avec ou sans slash final)
    const hasCanonicalLink = (canonical) => article.content.includes(canonical);
    const contentWords = normalizeWords(article.content.replace(/<[^>]+>/g, ' '));
    for (const c of clusters) {
      if (!c.zoneWords || c.zoneWords.length === 0) continue;
      const mentionsZone = c.zoneWords.some(z =>
        wordsMentionZone(footprintWords, z) || wordsMentionZone(contentWords, z)
      );
      if (mentionsZone && !hasCanonicalLink(c.canonical)) {
        violations.push({
          rule: 'LIEN_CANONIQUE_MANQUANT',
          detail: `L'article mentionne la zone "${c.id}" mais ne contient aucun lien vers ${c.canonical}. Ajouter dans le premier tiers : <a href='${c.canonical}' class='text-primary font-semibold hover:underline'>${c.anchorText}</a>`,
        });
      }
    }
  }

  return { ok: violations.length === 0, violations };
}

/** Formate un rapport lisible pour feedback (humain ou LLM) */
function formatReport(slug, result) {
  if (result.ok) return `✅ ${slug} : aucun problème de cannibalisation détecté.`;
  const lines = [`❌ ${slug} : ${result.violations.length} violation(s) — PUBLICATION BLOQUÉE`];
  for (const v of result.violations) lines.push(`  [${v.rule}] ${v.detail}`);
  return lines.join('\n');
}

module.exports = { checkArticle, loadClusters, getExistingArticles, prepareExisting, formatReport, normalize, jaccard };

// ── CLI
if (require.main === module) {
  const args = process.argv.slice(2);
  const fileIdx = args.indexOf('--file');
  const excludeIdx = args.indexOf('--exclude-slug');
  if (fileIdx < 0) {
    console.error('Usage: node anti-cannibalisation.js --file /tmp/article.json [--exclude-slug slug-en-reecriture]');
    process.exit(2);
  }
  const article = JSON.parse(fs.readFileSync(args[fileIdx + 1], 'utf-8'));
  const opts = excludeIdx >= 0 ? { excludeSlug: args[excludeIdx + 1] } : {};
  const result = checkArticle(article, null, null, opts);
  console.log(formatReport(article.slug, result));
  process.exit(result.ok ? 0 : 1);
}

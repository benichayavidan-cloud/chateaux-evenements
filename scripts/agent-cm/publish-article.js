#!/usr/bin/env node
const fs = require('fs');
const { ARTICLES_PATH } = require('./config');
const { checkArticle, formatReport, getExistingArticles } = require('./anti-cannibalisation');

const CAMILLE_FILE_TEMPLATE = `import type { BlogPost } from "./blog-posts";

export const camilleArticles: BlogPost[] = [
];
`;

function ensureCamilleFile() {
  if (!fs.existsSync(ARTICLES_PATH)) {
    fs.writeFileSync(ARTICLES_PATH, CAMILLE_FILE_TEMPLATE, 'utf-8');
    console.log('Created blog-posts-camille.ts');
  }
}

function getNextId() {
  const content = fs.readFileSync(ARTICLES_PATH, 'utf-8');
  const ids = [];
  const regex = /id:\s*(\d+)/g;
  let m;
  while ((m = regex.exec(content)) !== null) ids.push(parseInt(m[1]));
  return ids.length > 0 ? Math.max(...ids) + 1 : 1000;
}

function escapeForTS(str) {
  return str
    .replace(/\\/g, '\\\\')
    .replace(/`/g, '\\`')
    .replace(/\$\{/g, '\\${');
}

function escapeString(str) {
  return str.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n');
}

function formatArticleTS(article) {
  const i = '  ';
  const ii = '    ';
  let ts = `${i}{\n`;
  ts += `${ii}id: ${article.id},\n`;
  ts += `${ii}slug: "${escapeString(article.slug)}",\n`;
  ts += `${ii}title: "${escapeString(article.title)}",\n`;
  ts += `${ii}excerpt: "${escapeString(article.excerpt)}",\n`;
  ts += `${ii}category: "${article.category}" as const,\n`;
  ts += `${ii}author: {\n`;
  ts += `${ii}  name: "${escapeString(article.author?.name || 'Sophie Durand')}",\n`;
  ts += `${ii}  role: "${escapeString(article.author?.role || 'Experte Événementiel')}",\n`;
  ts += `${ii}  avatar: "${escapeString(article.author?.avatar || 'SD')}",\n`;
  ts += `${ii}},\n`;
  ts += `${ii}publishedAt: "${article.publishedAt}",\n`;
  if (article.updatedAt) {
    ts += `${ii}updatedAt: "${article.updatedAt}",\n`;
  }
  ts += `${ii}readingTime: ${article.readingTime || 10},\n`;
  ts += `${ii}image: "${article.image}",\n`;
  ts += `${ii}imageAlt: "${escapeString(article.imageAlt)}",\n`;
  ts += `${ii}keywords: [${article.keywords.map(k => `"${escapeString(k)}"`).join(', ')}],\n`;
  ts += `${ii}content: \`\n${escapeForTS(article.content)}\n${ii}\`,\n`;

  if (article.faq && article.faq.length > 0) {
    ts += `${ii}faq: [\n`;
    for (const faq of article.faq) {
      ts += `${ii}  { question: "${escapeString(faq.question)}", answer: "${escapeString(faq.answer)}" },\n`;
    }
    ts += `${ii}],\n`;
  }

  if (article.howTo && Array.isArray(article.howTo.steps) && article.howTo.steps.length > 0) {
    ts += `${ii}howTo: {\n`;
    ts += `${ii}  name: "${escapeString(article.howTo.name)}",\n`;
    ts += `${ii}  steps: [\n`;
    for (const step of article.howTo.steps) {
      ts += `${ii}    { name: "${escapeString(step.name)}", text: "${escapeString(step.text)}" },\n`;
    }
    ts += `${ii}  ],\n`;
    ts += `${ii}},\n`;
  }

  ts += `${i}},\n`;
  return ts;
}

/**
 * Plancher de longueur — la règle la mieux étayée du lot.
 *
 * Mesure sur les 284 articles vivants au 31/08/2026, en croisant avec les
 * URLs que la Search Console refuse d'indexer :
 *
 *     < 900 mots    → 89 % de refus  (8 sur 9)
 *   900-2600 mots   → ~10 % de refus
 *
 *   p10 des articles indexés : 1 865 mots
 *   p10 des articles refusés :   738 mots
 *
 * Le plancher est posé à 1 500 : au-dessus de la falaise des 900, en dessous
 * du p10 des indexés. Les articles de Camille tournent autour de 2 000-2 400
 * mots, donc la règle ne gêne pas la production courante — elle attrape
 * l'article bâclé, qui est celui que Google jette.
 *
 * On compte le texte VISIBLE (balises retirées) : 1 500 mots de HTML brut
 * avec des tableaux inline, ce n'est pas 1 500 mots lus.
 */
const MIN_MOTS = 1500;

function assertLongueurSuffisante(article) {
  const texte = String(article.content || '').replace(/<[^>]+>/g, ' ');
  const mots = texte.trim().split(/\s+/).filter(Boolean).length;
  if (mots < MIN_MOTS) {
    throw new Error(
      `Article trop court : ${mots} mots visibles (minimum ${MIN_MOTS}).\n` +
      `Sous 900 mots, Google a refusé d'indexer 89 % des articles du site. ` +
      `Développer le fond — cas concrets, chiffres, tableaux comparatifs — ` +
      `plutôt que rallonger avec du remplissage.`
    );
  }
}

/**
 * Contrôle LEXICAL du slug — attrape la faute de frappe et l'anglicisme.
 *
 * Cas réel : `seminar-responsable-formation-chateau-guide-opco-2026` publié
 * avec « seminar » (anglais) au lieu de « seminaire » — passé inaperçu
 * jusqu'à l'audit GSC du 31/08/2026. Le format ASCII était valide ; c'est
 * l'orthographe qui était fausse.
 *
 * Principe : pas de dictionnaire externe — le VOCABULAIRE DU CORPUS fait foi.
 * Un mot du slug candidat est suspect s'il est absent des slugs existants
 * (fusionnés exclus : « seminar » y est, justement) ET qu'il ressemble
 * fortement (préfixe commun ≥ 5, distance d'édition ≤ 2) à un mot fréquent
 * du corpus (≥ 10 occurrences). « seminar » → « seminaire » : flag.
 * « salon » vs « salle » : préfixe commun 3 → pas de flag. Un mot vraiment
 * nouveau (« oenologie » la première fois) n'a pas de voisin fréquent → OK.
 * Les variantes singulier/pluriel d'un mot du corpus sont tolérées.
 *
 * On REFUSE avec suggestion plutôt que corriger en silence — même logique
 * que assertSlugValide.
 */
function distanceEdition(a, b) {
  const dp = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)]);
  for (let j = 1; j <= b.length; j++) dp[0][j] = j;
  for (let i = 1; i <= a.length; i++)
    for (let j = 1; j <= b.length; j++)
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1),
      );
  return dp[a.length][b.length];
}

function prefixeCommun(a, b) {
  let n = 0;
  while (n < a.length && n < b.length && a[n] === b[n]) n++;
  return n;
}

function assertSlugLexique(slug, existingArticles) {
  let mergedFroms = new Set();
  try {
    mergedFroms = new Set(require('../../src/data/merged-redirects.json').merges.map(m => m.from));
  } catch { /* pas de fichier de fusions : vocabulaire complet */ }

  const vocab = new Map();
  for (const ex of existingArticles) {
    if (mergedFroms.has(ex.slug)) continue; // les slugs fautifs fusionnés ne font pas foi
    for (const mot of ex.slug.split('-')) {
      if (mot.length >= 4 && !/^\d+$/.test(mot)) vocab.set(mot, (vocab.get(mot) || 0) + 1);
    }
  }

  // Auto-validation à partir de 2 occurrences : une occurrence unique ne fait
  // pas foi — « seminar » existait déjà dans UN slug vivant (concept « slow
  // seminar » assumé) et blanchissait l'anglicisme pour tous les suivants.
  const connu = (m) => (vocab.get(m) || 0) >= 2;
  for (const mot of slug.split('-')) {
    if (mot.length < 4 || /^\d+$/.test(mot)) continue;
    if (connu(mot)) continue;
    if (connu(mot + 's') || (mot.endsWith('s') && connu(mot.slice(0, -1)))) continue; // pluriel/singulier
    for (const [ref, freq] of vocab) {
      if (freq < 10 || ref.length < 5) continue;
      if (prefixeCommun(mot, ref) >= 5 && distanceEdition(mot, ref) <= 2) {
        throw new Error(
          `Slug suspect : "${mot}" (dans "${slug}") n'existe dans aucun slug du corpus ` +
          `mais ressemble à "${ref}" (${freq} occurrences). Faute de frappe ou anglicisme probable — ` +
          `cas vécu : "seminar" au lieu de "seminaire". Corriger le mot, ou --force si c'est voulu.`
        );
      }
    }
  }
}

/**
 * Un slug DOIT être ASCII strict : [a-z0-9-].
 *
 * En août 2026, deux articles ont été publiés avec un « é » dans le slug
 * (fidélisation, fidéliser). Le sitemap déclarait l'URL accentuée, mais la
 * comparaison `post.slug === slug` échouait au rendu : les deux pages
 * répondaient « Article introuvable » et la Search Console les a classées
 * en « exclue par la balise noindex ». Deux articles perdus, et un soft 404
 * déclaré au sitemap — mauvais signal de qualité pour tout /blog.
 *
 * Le modèle produit le slug lui-même ; rien ne validait son format. On
 * translittère et on refuse plutôt que de corriger en silence : un slug
 * réécrit sans que l'agent le sache désynchroniserait le nom du fichier
 * image, les liens internes de l'article et le maillage des articles voisins.
 */
function assertSlugValide(slug) {
  if (typeof slug !== 'string' || !slug) {
    throw new Error('slug manquant ou non textuel');
  }
  if (!/^[a-z0-9-]+$/.test(slug)) {
    const propre = slug
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')   // accents
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
    throw new Error(
      `Slug invalide : "${slug}"\n` +
      `Un slug ne doit contenir que [a-z0-9-] — ni accent, ni majuscule, ni espace.\n` +
      `Proposition : "${propre}"\n` +
      `Republie l'article avec ce slug (et le nom de fichier image assorti).`
    );
  }
}

function publishArticle(article, opts = {}) {
  ensureCamilleFile();
  const content = fs.readFileSync(ARTICLES_PATH, 'utf-8');

  const required = ['slug', 'title', 'excerpt', 'category', 'publishedAt',
    'image', 'imageAlt', 'keywords', 'content'];
  for (const f of required) {
    if (!(f in article)) throw new Error(`Missing required field: ${f}`);
  }

  // Format du slug — avant toute autre vérification : un slug non-ASCII
  // produit une URL que le rendu ne sait pas résoudre (voir assertSlugValide).
  assertSlugValide(article.slug);

  // Longueur — un article trop court est refusé par Google (voir MIN_MOTS).
  assertLongueurSuffisante(article);

  // Doublon exact de slug — vérifié sur les 4 fichiers de données (pas
  // seulement blog-posts-camille.ts) : deux BlogPost avec le même slug dans
  // des fichiers différents rendraient le routing non-déterministe.
  const existing = getExistingArticles();
  if (existing.some(a => a.slug === article.slug)) {
    throw new Error(`Article with slug "${article.slug}" already exists`);
  }

  // Orthographe du slug — le vocabulaire du corpus fait foi (voir
  // assertSlugLexique). Placé après le chargement de `existing`, dont il dépend.
  if (!opts.force) assertSlugLexique(article.slug, existing);

  // GATE ANTI-CANNIBALISATION — défense en profondeur : ce check couvre TOUS
  // les chemins de publication (pipeline auto + publication manuelle).
  // Bypass conscient uniquement : --force (réécritures validées humainement —
  // les réécritures ne passent pas par ce script d'insertion, elles se valident
  // via `node anti-cannibalisation.js --file … --exclude-slug <slug>`).
  if (!opts.force) {
    const gate = checkArticle(article, existing);
    if (!gate.ok) {
      throw new Error(`Publication bloquée par le gate anti-cannibalisation :\n${formatReport(article.slug, gate)}\n(--force pour bypasser en connaissance de cause)`);
    }
  }

  if (!article.id) {
    article.id = getNextId();
  }

  const marker = 'export const camilleArticles: BlogPost[] = [';
  const idx = content.indexOf(marker);
  if (idx < 0) throw new Error('Could not find camilleArticles array marker');

  const insertAt = idx + marker.length;
  const newContent = content.slice(0, insertAt) + '\n' + formatArticleTS(article) + content.slice(insertAt);
  fs.writeFileSync(ARTICLES_PATH, newContent, 'utf-8');

  return { slug: article.slug, id: article.id, inserted: true };
}

async function main() {
  const args = process.argv.slice(2);
  const fileIdx = args.indexOf('--file');

  let input;
  if (fileIdx >= 0) {
    input = fs.readFileSync(args[fileIdx + 1], 'utf-8');
  } else {
    const chunks = [];
    for await (const chunk of process.stdin) chunks.push(chunk);
    input = Buffer.concat(chunks).toString();
  }

  try {
    const article = JSON.parse(input);
    delete article.imagePrompt;
    const force = args.includes('--force');

    // Gate DOUBLON SÉMANTIQUE — ici, dans la CLI, car TOUTE publication passe
    // par elle (pipeline auto via execSync, publication manuelle). Avant
    // publishArticle : rien ne doit être écrit si le verdict est doublon.
    // Voir doublon-semantique.js pour la politique d'échec (bloquant sur
    // verdict, non-bloquant si clé absente ou API en échec).
    if (!force) {
      const { checkDoublonSemantique } = require('./doublon-semantique');
      const sem = await checkDoublonSemantique(article, getExistingArticles());
      if (sem.warning) console.error(`⚠️  ${sem.warning}`);
      if (!sem.ok) throw new Error(`Publication bloquée — ${sem.detail}\n(--force pour bypasser en connaissance de cause)`);
    }

    const result = publishArticle(article, { force });
    console.log(JSON.stringify(result));
  } catch (err) {
    console.error(JSON.stringify({ error: err.message }));
    process.exit(1);
  }
}

// Exécuter main() SEULEMENT en usage CLI. Sans ce garde, tout `require` du
// module lançait main(), qui sans --file se met à lire stdin et bloque le
// process appelant indéfiniment (constaté en testant les garde-fous).
if (require.main === module) {
  main();
}

module.exports = { publishArticle, assertSlugValide, assertSlugLexique, assertLongueurSuffisante };

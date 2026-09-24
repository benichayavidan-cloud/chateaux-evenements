// Tests de la file de réécriture de Camille — `node --test scripts/agent-cm/`
//
// Toutes les écritures se font sur un FAUX SITE jetable (CAMILLE_SITE_DIR),
// jamais sur les fichiers de données du dépôt.
import { test, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { createRequire } from 'node:module';

const SITE = fs.mkdtempSync(path.join(os.tmpdir(), 'camille-site-'));
process.env.CAMILLE_SITE_DIR = SITE;
const DATA = path.join(SITE, 'src/data');
fs.mkdirSync(DATA, { recursive: true });

const require = createRequire(import.meta.url);
const publish = require('./publish-article.js');
const pipeline = require('./pipeline.js');
const donnees = require('./donnees-blog.js');
const { fermerCommandes, lireResultat } = require('./fermer-commandes.js');
const { comparerVersions } = require('./verif-donnees.js');

// ── Fabrique d'articles ─────────────────────────────────────────────────────

const LIEN = "<a href='https://www.insee.fr/fr/statistiques' rel='nofollow'>INSEE</a>";
function corps(mot, n = 1600) {
  const h3 = Array.from({ length: 6 }, (_, i) => `<h3>Partie ${i + 1}</h3>`).join('\n');
  return `<h2>Titre</h2>\n${h3}\n<p>${Array(n).fill(mot).join(' ')} ${LIEN}</p>`;
}

/** Article au format de Camille (formatArticleTS). */
function blocCamille({ id, slug, publishedAt = '2026-06-01', content = '<p>court</p>' }) {
  return `  {
    id: ${id},
    slug: "${slug}",
    title: "Titre ${slug}",
    excerpt: "Résumé",
    category: "organisation" as const,
    author: {
      name: "Sophie Durand",
      role: "Experte",
      avatar: "SD",
    },
    publishedAt: "${publishedAt}",
    readingTime: 5,
    image: "/images/${slug}.webp",
    imageAlt: "Alt",
    keywords: ["seminaire", "chateau"],
    content: \`
${content}
    \`,
  },
`;
}

function fichierCamille(blocs) {
  return `import type { BlogPost } from "./blog-posts";

export const camilleArticles: BlogPost[] = [
${blocs.join('')}];
`;
}

/** blog-posts.ts : formats HISTORIQUES (const isolé, author sur une ligne, faq avant content, champs en plus). */
const BLOG_POSTS = `import { camilleArticles } from "./blog-posts-camille";

export interface BlogPost { id: number; slug: string; [k: string]: unknown }

const article1: BlogPost = {
  id: 1,
  slug: "guide-historique",
  title: "Guide historique",
  excerpt: "Le premier",
  category: "organisation",
  author: { name: "Ludovic Martin", role: "Auteur", avatar: "LM" },
  publishedAt: "2025-11-01",
  readingTime: 7,
  image: "/images/guide-historique.webp",
  imageAlt: "Alt historique",
  keywords: ["guide", "seminaire"],
  featured: true,
  seoTitle: "Titre SERP choisi à la main",
  faq: [
    { question: "Q ?", answer: "R." },
  ],
  content: \`
    <div class="prose">
<p>Ancien contenu { avec accolades } et \\\`backtick\\\`.</p>
    </div>
  \`
};

const placeholderArticles: BlogPost[] = [
  {
    id: 23,
    slug: "escape-game-geant-chateau",
    title: "Escape game",
    excerpt: "Escape",
    category: "team-building",
    author: { name: "Ludovic Martin", role: "Créateur", avatar: "LM" },
    publishedAt: "2025-11-30",
    readingTime: 9,
    image: "/images/escape.webp",
    imageAlt: "Escape alt",
    keywords: ["escape game château"],
    faq: [
      { question: "Q ?", answer: "R." },
    ],
    content: \`
    <p>Vieux contenu escape.</p>
  \`
  },
  {
    id: 24,
    slug: "article-redirige",
    title: "Redirigé",
    excerpt: "x",
    category: "lieux",
    author: { name: "X", role: "Y", avatar: "XY" },
    publishedAt: "2025-10-01",
    readingTime: 3,
    image: "/images/r.webp",
    imageAlt: "r",
    keywords: ["r"],
    content: \`<p>redirigé</p>\`
  }
];

import mergedRedirects from "./merged-redirects.json";
export const blogPosts: BlogPost[] = [article1, ...placeholderArticles, ...camilleArticles];
`;

const SEO_2026 = `import type { BlogPost } from "./blog-posts";

const seoUn: BlogPost = {
  id: 501,
  slug: "seminaire-hiver-chateau-activites-ambiance",
  title: "Séminaire d'hiver",
  excerpt: "Hiver",
  category: "organisation",
  author: { name: "A", role: "B", avatar: "AB" },
  publishedAt: "2026-03-13",
  readingTime: 4,
  image: "/images/hiver.webp",
  imageAlt: "Hiver",
  keywords: ["hiver"],
  content: \`<p>Hiver court.</p>\`,
};

export const seoArticles2026: BlogPost[] = [seoUn];
`;

const NICHES = `import type { BlogPost } from "./blog-posts";

export const nichesArticles2026: BlogPost[] = [];
`;

function ecrireSite({ camille, blogPosts = BLOG_POSTS, seo = SEO_2026, niches = NICHES, fusions = [] } = {}) {
  fs.writeFileSync(path.join(DATA, 'blog-posts.ts'), blogPosts);
  fs.writeFileSync(path.join(DATA, 'blog-posts-seo-2026.ts'), seo);
  fs.writeFileSync(path.join(DATA, 'blog-posts-niches-2026.ts'), niches);
  fs.writeFileSync(path.join(DATA, 'blog-posts-camille.ts'), camille ?? fichierCamille([
    blocCamille({ id: 1001, slug: 'camille-recent', publishedAt: '2026-07-01' }),
    blocCamille({ id: 1000, slug: 'camille-ancien', publishedAt: '2026-06-01' }),
  ]));
  fs.writeFileSync(path.join(DATA, 'merged-redirects.json'), JSON.stringify({ merges: fusions }));
}

const lire = (f) => fs.readFileSync(path.join(DATA, f), 'utf8');

function reecriture(slug, mot = 'nouveau') {
  return {
    slug,
    title: 'Titre court réécrit',
    excerpt: 'Nouveau résumé',
    category: 'organisation',
    image: `/images/${slug}.webp`,
    imageAlt: 'Alt',
    keywords: ['seminaire', 'chateau'],
    readingTime: 8,
    content: corps(mot),
  };
}

beforeEach(() => ecrireSite());

// ── Défaut n°1 : la troncature du 18/09 ─────────────────────────────────────

test('régression 18/09 : réécrire le DERNIER article du fichier ne retire pas la fermeture du tableau', () => {
  publish.replaceArticle(reecriture('camille-ancien'));
  const apres = lire('blog-posts-camille.ts');
  assert.match(apres, /\n\];\n?$/, 'le fichier doit toujours se terminer par la fermeture « ]; »');
  assert.deepEqual(donnees.erreursSyntaxe(apres, 'blog-posts-camille.ts'), []);
  assert.equal(donnees.analyser(apres).length, 2);
});

test('réécrire un article de Camille ne touche QUE son bloc', () => {
  const avant = lire('blog-posts-camille.ts');
  publish.replaceArticle(reecriture('camille-recent'));
  const apres = lire('blog-posts-camille.ts');
  const ancien = avant.slice(avant.indexOf('  {\n    id: 1000,'));
  assert.ok(apres.endsWith(ancien), "l'article voisin doit rester identique à l'octet près");
  const art = donnees.listerArticles().find((a) => a.slug === 'camille-recent');
  assert.equal(art.mots >= 1500, true);
  assert.equal(art.publishedAt, '2026-07-01');
});

// ── Défaut n°2 : les articles hors du fichier de Camille ────────────────────

test('un article de blog-posts.ts (tableau historique) se réécrit en place', () => {
  const camilleAvant = lire('blog-posts-camille.ts');
  const res = publish.replaceArticle(reecriture('escape-game-geant-chateau'));
  assert.equal(res.replaced, true);
  assert.equal(res.fichier, 'blog-posts.ts');
  const apres = lire('blog-posts.ts');
  assert.deepEqual(donnees.erreursSyntaxe(apres, 'blog-posts.ts'), []);
  const art = donnees.listerArticles().find((a) => a.slug === 'escape-game-geant-chateau');
  assert.equal(art.id, 23, "l'identifiant est conservé");
  assert.equal(art.publishedAt, '2025-11-30', 'la date de parution est conservée');
  assert.ok(art.updatedAt, 'updatedAt est posé');
  assert.ok(art.mots >= 1500);
  assert.equal(lire('blog-posts-camille.ts'), camilleAvant, "le fichier de Camille n'est pas touché");
  assert.ok(apres.includes('slug: "article-redirige"'), "l'article voisin est conservé");
  assert.ok(apres.includes('const article1: BlogPost = {'), 'le reste du fichier est intact');
});

test('un article isolé (const articleN) garde ses champs manuels (featured, seoTitle)', () => {
  publish.replaceArticle(reecriture('guide-historique'));
  const apres = lire('blog-posts.ts');
  assert.deepEqual(donnees.erreursSyntaxe(apres, 'blog-posts.ts'), []);
  const art = donnees.analyser(apres).find((a) => a.slug === 'guide-historique');
  const v = donnees.valeurs(art);
  assert.equal(v.featured, true);
  assert.equal(v.seoTitle, 'Titre SERP choisi à la main');
  assert.equal(v.id, 1);
  assert.equal(v.author.name, 'Ludovic Martin', "l'auteur d'origine est conservé");
  assert.match(apres, /const article1: BlogPost = \{[\s\S]*?\n\s*\};\n\nconst placeholderArticles/);
});

test('un article de blog-posts-seo-2026.ts se réécrit aussi', () => {
  publish.replaceArticle(reecriture('seminaire-hiver-chateau-activites-ambiance'));
  const apres = lire('blog-posts-seo-2026.ts');
  assert.deepEqual(donnees.erreursSyntaxe(apres, 'blog-posts-seo-2026.ts'), []);
  assert.match(apres, /export const seoArticles2026: BlogPost\[\] = \[seoUn\];/);
});

test('listerArticles couvre les quatre fichiers et dit où vit chaque article', () => {
  const tous = donnees.listerArticles();
  const ou = Object.fromEntries(tous.map((a) => [a.slug, a.fichier]));
  assert.equal(ou['escape-game-geant-chateau'], 'blog-posts.ts');
  assert.equal(ou['seminaire-hiver-chateau-activites-ambiance'], 'blog-posts-seo-2026.ts');
  assert.equal(ou['camille-ancien'], 'blog-posts-camille.ts');
  assert.equal(tous.find((a) => a.slug === 'guide-historique').content.includes('backtick'), true);
});

// ── Garde-fou anti-troncature ───────────────────────────────────────────────

test('verifierEcriture refuse un fichier tronqué, un article perdu, une erreur de syntaxe', () => {
  const avant = lire('blog-posts-camille.ts');
  const tronque = avant.replace(/\];\n$/, '');
  assert.throws(() => donnees.verifierEcriture(avant, tronque, 'blog-posts-camille.ts'), /syntaxe|fermeture|article/i);
  const unDeMoins = fichierCamille([blocCamille({ id: 1001, slug: 'camille-recent' })]);
  assert.throws(() => donnees.verifierEcriture(avant, unDeMoins, 'blog-posts-camille.ts'), /article/i);
  assert.doesNotThrow(() => donnees.verifierEcriture(avant, avant, 'blog-posts-camille.ts'));
});

test("une écriture qui casserait le fichier n'écrit RIEN sur le disque", () => {
  const avant = lire('blog-posts.ts');
  assert.throws(() => donnees.remplacerArticle('escape-game-geant-chateau', () => '{ id: 23, slug: "escape-game-geant-chateau", content: `oups'));
  assert.equal(lire('blog-posts.ts'), avant);
});

test('un slug présent dans deux fichiers est refusé (ambigu) plutôt que réécrit au hasard', () => {
  ecrireSite({ camille: fichierCamille([blocCamille({ id: 1000, slug: 'escape-game-geant-chateau' })]) });
  assert.throws(() => publish.replaceArticle(reecriture('escape-game-geant-chateau')), /plusieurs|ambigu/i);
});

test('publishArticle (création) vérifie aussi le fichier avant de l’écrire', () => {
  const avant = lire('blog-posts-camille.ts');
  const art = { ...reecriture('nouvel-article-inedit'), publishedAt: '2026-09-24' };
  publish.publishArticle(art, { force: true });
  const apres = lire('blog-posts-camille.ts');
  assert.equal(donnees.analyser(apres).length, donnees.analyser(avant).length + 1);
  assert.deepEqual(donnees.erreursSyntaxe(apres, 'blog-posts-camille.ts'), []);
});

// ── Vérification du workflow avant commit ──────────────────────────────────

test('verif-donnees : signale la baisse du nombre d’articles et la syntaxe cassée', () => {
  const avant = lire('blog-posts-camille.ts');
  assert.deepEqual(comparerVersions(avant, avant, 'blog-posts-camille.ts'), []);
  const moins = fichierCamille([blocCamille({ id: 1001, slug: 'camille-recent' })]);
  assert.ok(comparerVersions(avant, moins, 'blog-posts-camille.ts').some((p) => /camille-ancien|article/.test(p)));
  assert.ok(comparerVersions(avant, avant.slice(0, -4), 'blog-posts-camille.ts').length > 0);
  const plus = fichierCamille([blocCamille({ id: 1002, slug: 'nouveau' }), blocCamille({ id: 1001, slug: 'camille-recent' }), blocCamille({ id: 1000, slug: 'camille-ancien' })]);
  assert.deepEqual(comparerVersions(avant, plus, 'blog-posts-camille.ts'), [], 'une création est légitime');
});

// ── Défaut n°4 : les articles redirigés ─────────────────────────────────────

test('régression 07/09 : un article redirigé (301) n’est jamais choisi pour réécriture', () => {
  ecrireSite({ fusions: [{ from: 'camille-ancien', to: '/blog/camille-recent' }] });
  const slugs = pipeline.choisirReecritures('{}', 10, [], { commandes: [] }).map((r) => r.slug);
  assert.ok(!slugs.includes('camille-ancien'), 'le plus ancien est redirigé : il ne doit pas être choisi');
  assert.deepEqual(slugs, ['camille-recent']);
});

test('le repli par ancienneté reste dans le fichier de Camille (les autres fichiers : sur demande seulement)', () => {
  const retenus = pipeline.choisirReecritures('{}', 10, [], { commandes: [] });
  assert.ok(retenus.length > 0);
  assert.ok(retenus.every((r) => r.fichier === 'blog-posts-camille.ts'));
});

// ── Défaut n°2 bis : la file de commandes ───────────────────────────────────

test('une commande de Marcus sur un article hors fichier de Camille est retenue en priorité', () => {
  const retenus = pipeline.choisirReecritures('{}', 1, [], {
    commandes: [{ slug: 'seminaire-hiver-chateau-activites-ambiance', issue: 7, creeLe: '2026-09-24T10:00:00Z' }],
  });
  assert.equal(retenus[0].slug, 'seminaire-hiver-chateau-activites-ambiance');
  assert.equal(retenus[0].issue, 7);
});

test('trierCommandes ferme les demandes redirigées, introuvables ou déjà exécutées', () => {
  const parSlug = new Map([
    ['a', { slug: 'a', updatedAt: '2026-09-25' }],
    ['b', { slug: 'b' }],
  ]);
  const { aTraiter, aFermer } = pipeline.trierCommandes(
    [
      { slug: 'a', issue: 1, creeLe: '2026-09-24T08:00:00Z' },
      { slug: 'b', issue: 2, creeLe: '2026-09-24T08:00:00Z' },
      { slug: 'r', issue: 3, creeLe: '2026-09-24T08:00:00Z' },
      { slug: 'inconnu', issue: 4, creeLe: '2026-09-24T08:00:00Z' },
    ],
    parSlug,
    new Map([['r', '/blog/b']]),
  );
  assert.deepEqual(aTraiter.map((c) => c.issue), [2]);
  assert.deepEqual(aFermer.map((f) => f.numero).sort(), [1, 3, 4]);
  assert.ok(aFermer.every((f) => f.commentaire.length > 10));
});

test('la file est traitée dans l’ordre d’arrivée (gh liste les plus récentes en premier)', () => {
  const parSlug = new Map([['a', { slug: 'a' }], ['b', { slug: 'b' }], ['c', { slug: 'c' }]]);
  const { aTraiter } = pipeline.trierCommandes(
    [{ slug: 'c', issue: 50 }, { slug: 'b', issue: 46 }, { slug: 'a', issue: 45 }],
    parSlug,
    new Map(),
  );
  assert.deepEqual(aTraiter.map((c) => c.issue), [45, 46, 50]);
});

test('fermerCommandes ferme chaque demande par gh, sans shell, et survit à un échec', () => {
  const appels = [];
  const exec = (cmd, args) => {
    appels.push([cmd, ...args]);
    if (args[2] === '9') throw new Error('réseau');
  };
  const n = fermerCommandes({ issuesAFermer: [{ numero: 9, commentaire: 'x' }, { numero: 12, commentaire: "Réécrit `ok` $(rm -rf)" }] }, exec);
  assert.equal(n, 1);
  assert.deepEqual(appels[1], ['gh', 'issue', 'close', '12', '--comment', "Réécrit `ok` $(rm -rf)"]);
});

test('lireResultat prend la dernière ligne JSON de la sortie du pipeline', () => {
  const r = lireResultat('[Step 1] x\n{"a":1}\n[Step 2] y\n{"status":"success","issuesAFermer":[{"numero":3}]}\n');
  assert.equal(r.issuesAFermer[0].numero, 3);
  assert.equal(lireResultat('rien'), null);
});

// ── Défaut n°3 : le label ───────────────────────────────────────────────────

test('Marcus et Camille parlent du même label, et Marcus le crée avant d’ouvrir une demande', async () => {
  const marcus = await import('../agent-seo/actions.mjs');
  assert.equal(marcus.LABEL_REECRITURE, pipeline.LABEL_REECRITURE);
  const appels = [];
  marcus.commanderReecriture({ cible: '/blog/x', motif: 'm', prediction: 'p' }, 42, (cmd, args) => { appels.push([cmd, ...args]); return ''; });
  assert.deepEqual(appels[0].slice(0, 4), ['gh', 'label', 'create', pipeline.LABEL_REECRITURE]);
  assert.ok(appels[0].includes('--force'), 'création idempotente');
  const issue = appels[1];
  assert.deepEqual(issue.slice(0, 3), ['gh', 'issue', 'create']);
  assert.equal(issue[issue.indexOf('--label') + 1], pipeline.LABEL_REECRITURE);
  assert.match(issue[issue.indexOf('--title') + 1], /\/blog\/x/);
});

test('Marcus ne commande pas la réécriture d’une page redirigée', async () => {
  const marcus = await import('../agent-seo/actions.mjs');
  const backlog = marcus.construireBacklog(
    { gsc28: { pages_muettes: [{ p: '/blog/vieux', imp: 900, pos: 8 }, { p: '/blog/vivant', imp: 500, pos: 9 }] } },
    { fusionnes: new Set(['vieux']) },
  );
  const cmd = backlog.find((a) => a.type === 'commande-reecriture');
  assert.equal(cmd.cible, '/blog/vivant');
});

// Tests du registre des articles retirés de Google — `node --test src/lib/hors-google.test.ts`
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { creerFiltreHorsGoogle } from './hors-google.ts';

const registre = JSON.parse(readFileSync(new URL('../data/articles-hors-google.json', import.meta.url), 'utf-8'));
const FICHIERS_BLOG = ['blog-posts.ts', 'blog-posts-camille.ts', 'blog-posts-niches-2026.ts', 'blog-posts-seo-2026.ts'];
const corpus = FICHIERS_BLOG.map((f) => readFileSync(new URL(`../data/${f}`, import.meta.url), 'utf-8')).join('\n');

test('un article du registre est hors Google, les autres restent indexés', () => {
  const { estHorsGoogle } = creerFiltreHorsGoogle(registre.articles);
  assert.equal(estHorsGoogle('murder-party-chateau-activite-immersive'), true);
  assert.equal(estHorsGoogle('escape-game-geant-chateau'), true);
  assert.equal(estHorsGoogle('atelier-cuisine-chef-gastronomie'), true);
  assert.equal(estHorsGoogle('checklist-organiser-seminaire'), false);
});

test('robots : noindex mais liens suivis pour un article hors Google', () => {
  const { robots } = creerFiltreHorsGoogle(registre.articles);
  assert.deepEqual(robots('murder-party-chateau-activite-immersive'), { index: false, follow: true });
  assert.deepEqual(robots('checklist-organiser-seminaire'), { index: true, follow: true });
});

test('chaque slug du registre existe dans les données du blog (pas de faute de frappe silencieuse)', () => {
  for (const { slug } of registre.articles) {
    assert.match(corpus, new RegExp(`slug:\\s*["'\`]${slug}["'\`]`), `slug introuvable : ${slug}`);
  }
});

test('chaque entrée porte une raison', () => {
  for (const a of registre.articles) assert.ok(a.raison && a.raison.length > 10, `raison manquante : ${a.slug}`);
});

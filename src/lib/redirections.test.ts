// Tests de la résolution des redirections internes — `node --test src/lib/redirections.test.ts`
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { creerResolveur } from './redirections.ts';

const { resoudre, reecrireHtml, estRedirige } = creerResolveur([
  { from: '/seminaire-chateau-yvelines-78', to: '/blog/seminaire-yvelines-78-luxe-proximite' },
  { from: '/blog/ancien', to: '/blog/intermediaire' },
  { from: '/blog/intermediaire', to: '/team-building-chantilly' },
  { from: '/a', to: '/b' },
  { from: '/b', to: '/a' },
]);

test('un lien vers une page redirigée pointe vers sa destination', () => {
  assert.equal(resoudre('/seminaire-chateau-yvelines-78'), '/blog/seminaire-yvelines-78-luxe-proximite');
  assert.equal(resoudre('/seminaire-chateau-yvelines-78/'), '/blog/seminaire-yvelines-78-luxe-proximite');
});

test('une chaîne de redirections est résolue jusqu’au bout (pas de double 301)', () => {
  assert.equal(resoudre('/blog/ancien'), '/team-building-chantilly');
});

test('l’adresse absolue du site et la requête sont conservées, l’ancre est retirée', () => {
  assert.equal(resoudre('https://www.selectchateaux.com/seminaire-chateau-yvelines-78?utm=x#lieux'), 'https://www.selectchateaux.com/blog/seminaire-yvelines-78-luxe-proximite?utm=x');
  assert.equal(resoudre('/seminaire-chateau-yvelines-78#lieux'), '/blog/seminaire-yvelines-78-luxe-proximite');
});

test('un lien non redirigé, externe ou une boucle reste inchangé', () => {
  assert.equal(resoudre('/seminaire-chateau-chantilly'), '/seminaire-chateau-chantilly');
  assert.equal(resoudre('https://www.insee.fr/seminaire-chateau-yvelines-78'), 'https://www.insee.fr/seminaire-chateau-yvelines-78');
  assert.equal(resoudre('/a'), '/a');
  assert.equal(estRedirige('/seminaire-chateau-yvelines-78'), true);
  assert.equal(estRedirige('/lieux'), false);
});

test('le HTML d’un article est réécrit, guillemets simples et doubles', () => {
  const html = `<a href="/seminaire-chateau-yvelines-78">78</a> <a href='/blog/ancien' class='x'>a</a> <a href="/lieux">l</a>`;
  assert.equal(
    reecrireHtml(html),
    `<a href="/blog/seminaire-yvelines-78-luxe-proximite">78</a> <a href='/team-building-chantilly' class='x'>a</a> <a href="/lieux">l</a>`,
  );
});

// ── Cohérence du registre réel ──────────────────────────────────────────────

const registre = JSON.parse(readFileSync(new URL('../data/redirections-commerciales.json', import.meta.url), 'utf8'));
const fusions = JSON.parse(readFileSync(new URL('../data/merged-redirects.json', import.meta.url), 'utf8'));

test('chaque redirection commerciale vise un article vivant (ni fusionné, ni absent)', () => {
  const fusionnes = new Set(fusions.merges.map((m: { from: string }) => m.from));
  const fichiers = ['blog-posts.ts', 'blog-posts-seo-2026.ts', 'blog-posts-niches-2026.ts', 'blog-posts-camille.ts']
    .map((f) => readFileSync(new URL(`../data/${f}`, import.meta.url), 'utf8')).join('\n');
  for (const r of registre.redirections) {
    const slug = r.to.replace(/^\/blog\//, '');
    assert.ok(r.to.startsWith('/blog/'), `${r.to} : la cible est un article`);
    assert.ok(!fusionnes.has(slug), `${slug} est lui-même redirigé`);
    assert.match(fichiers, new RegExp(`slug:\\s*["']${slug}["']`), `${slug} introuvable dans les données du blog`);
    assert.match(r.departementCode, /^\d{2}$/);
  }
});

test('aucune fusion de blog ne finit en chaîne une fois les redirections commerciales ajoutées', () => {
  const tout = creerResolveur([
    ...fusions.merges.map((m: { from: string; to: string }) => ({ from: `/blog/${m.from}`, to: m.to })),
    ...registre.redirections,
  ]);
  for (const m of fusions.merges) {
    const final = tout.resoudre(m.to);
    assert.ok(!tout.estRedirige(final), `/blog/${m.from} → ${m.to} → … ne se termine pas`);
  }
});

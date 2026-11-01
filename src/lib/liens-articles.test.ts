import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';

// ── Garde-fou : aucun lien interne d'article vers une page qui n'existe pas ──
// Le 01/11/2026, 6 liens menaient à une 404 dans 5 articles, signalés dès le
// 11/10. Ils se glissent surtout quand l'article est écrit par un agent : soit
// `/blog/` manque, soit le titre cité n'a jamais été publié.

const DATA = fileURLToPath(new URL('../data', import.meta.url));
const APP = fileURLToPath(new URL('../app', import.meta.url));
const lire = (f: string) => readFileSync(join(DATA, f), 'utf8');
const fichiers = readdirSync(DATA);
const articles = fichiers.filter((f) => /^blog-posts.*\.ts$/.test(f));
const slugs = (src: string) => [...src.matchAll(/slug:\s*["'`]([a-z0-9-]+)["'`]/g)].map((m) => m[1]);

const slugsBlog = new Set(articles.flatMap((f) => slugs(lire(f))));
const fusions = (JSON.parse(lire('merged-redirects.json')).merges as { from: string }[]).map((m) => m.from);
for (const s of fusions) slugsBlog.add(s);

// Pages à la racine : hors fichiers d'articles, un slug de donnée est une landing.
const slugsRacine = new Set(fichiers.filter((f) => /\.ts$/.test(f) && !articles.includes(f)).flatMap((f) => slugs(lire(f))));
const redirections = /source:\s*['"]\/([a-z0-9-]+)['"]/g;
for (const m of readFileSync(fileURLToPath(new URL('../../next.config.ts', import.meta.url)), 'utf8').matchAll(redirections)) slugsRacine.add(m[1]);
for (const f of fichiers.filter((x) => /redirections/.test(x))) for (const m of lire(f).matchAll(/["']\/([a-z0-9-]+)["']/g)) slugsRacine.add(m[1]);

function cassé(chemin: string): boolean {
  const c = chemin.split(/[?#]/)[0].replace(/\/$/, '');
  const blog = c.match(/^\/blog\/([a-z0-9-]+)$/);
  if (blog) return !slugsBlog.has(blog[1]);
  const racine = c.match(/^\/([a-z0-9-]+)$/);
  if (racine) return !existsSync(join(APP, racine[1])) && !slugsRacine.has(racine[1]);
  return false; // fiches lieux et châteaux, images, ancres : hors périmètre de ce garde-fou
}

test('aucun lien interne d’article ne mène à une page inexistante', () => {
  const fautifs = articles.flatMap((f) =>
    [...lire(f).matchAll(/href=\\?['"](\/[^'"\\]*)\\?['"]/g)].map((m) => m[1]).filter(cassé).map((l) => `${f} → ${l}`));
  assert.deepEqual([...new Set(fautifs)], []);
});

test('le garde-fou reconnaît un lien cassé et un lien valide', () => {
  assert.equal(cassé('/top-chateaux-oise-60'), true);
  assert.equal(cassé('/blog/top-chateaux-oise-60'), false);
  assert.equal(cassé('/blog/article-qui-n-existe-pas'), true);
  assert.equal(cassé('/chateaux'), false);
});

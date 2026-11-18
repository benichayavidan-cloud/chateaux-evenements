// `node --test src/data/redirections-annuaire.test.ts`
import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import annuaire from './redirections-annuaire.json' with { type: 'json' };
import commerciales from './redirections-commerciales.json' with { type: 'json' };
import { venues } from './venues.ts';

const red = annuaire.redirections;

test('annuaire : la liste des lieux est vide', () => {
  assert.equal(venues.length, 0);
});

test('annuaire : chaque adresse supprimée est redirigée une seule fois', () => {
  const sources = red.map((r) => r.from);
  assert.equal(new Set(sources).size, sources.length);
  assert.ok(sources.includes('/lieux'));
  assert.ok(sources.filter((s) => s.startsWith('/lieux/')).length >= 60);
});

test('annuaire : aucune destination n\'est elle-même une adresse supprimée (pas de chaîne)', () => {
  const sources = new Set([...red.map((r) => r.from), ...commerciales.redirections.map((r) => r.from)]);
  assert.deepEqual(red.filter((r) => sources.has(r.to)).map((r) => `${r.from} → ${r.to}`), []);
});

test('annuaire : chaque destination est une page qui existe', () => {
  for (const cible of new Set(red.map((r) => r.to))) {
    if (cible.startsWith('/blog/')) {
      const slug = cible.slice('/blog/'.length);
      const articles = ['blog-posts.ts', 'blog-posts-camille.ts', 'blog-posts-seo-2026.ts', 'blog-posts-niches-2026.ts']
        .filter((f) => fs.existsSync(`src/data/${f}`)).map((f) => fs.readFileSync(`src/data/${f}`, 'utf8')).join('\n');
      assert.ok(articles.includes(`"${slug}"`) || articles.includes(`'${slug}'`), `article introuvable : ${slug}`);
    } else {
      assert.ok(fs.existsSync(`src/app${cible}/page.tsx`), `page introuvable : ${cible}`);
    }
  }
});

test('annuaire : les routes supprimées n\'existent plus dans src/app', () => {
  for (const r of red.filter((x) => !x.from.startsWith('/lieux/'))) {
    assert.ok(!fs.existsSync(`src/app${r.from}/page.tsx`), `route encore présente : ${r.from}`);
  }
});

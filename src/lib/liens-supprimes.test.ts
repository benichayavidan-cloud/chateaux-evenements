// `node --test src/lib/liens-supprimes.test.ts`
import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { retirerLiensSupprimes } from './liens-supprimes.ts';

const supprime = (s: string) => s === 'article-retire';

test('un lien vers un article supprimé disparaît, son texte reste', () => {
  assert.equal(retirerLiensSupprimes('<p>Voir <a href="/blog/article-retire" class="x">notre <strong>guide</strong></a>.</p>', supprime), '<p>Voir notre <strong>guide</strong>.</p>');
  assert.equal(retirerLiensSupprimes("<a href='https://www.selectchateaux.com/blog/article-retire/#prix'>prix</a>", supprime), 'prix');
});

test('les autres liens ne bougent pas', () => {
  const html = '<a href="/blog/article-garde">a</a> <a href="/chateaux">b</a> <a href="/blog/article-retire-bis">c</a>';
  assert.equal(retirerLiensSupprimes(html, supprime), html);
});

test('registre : un article supprimé existe dans les sources et n\'est ni fusionné ni cible d\'une fusion', () => {
  const reg = JSON.parse(fs.readFileSync('src/data/articles-supprimes.json', 'utf8'));
  const fusions = JSON.parse(fs.readFileSync('src/data/merged-redirects.json', 'utf8')).merges as { from: string; to: string }[];
  const sources = fs.readdirSync('src/data').filter((f) => /^blog-posts.*\.ts$/.test(f)).map((f) => fs.readFileSync(`src/data/${f}`, 'utf8')).join('\n');
  const tous = [...reg.articles, ...reg.fusionsOrphelines];
  assert.equal(new Set(tous).size, tous.length, 'doublon dans le registre');
  for (const s of tous) {
    assert.ok(new RegExp(`slug:\\s*["'\`]${s}["'\`]`).test(sources), `inconnu des sources : ${s}`);
    assert.ok(!fusions.some((m) => m.from === s), `à la fois supprimé et fusionné : ${s}`);
    assert.ok(!fusions.some((m) => m.to === `/blog/${s}`), `une fusion mène à un article supprimé : ${s}`);
  }
});

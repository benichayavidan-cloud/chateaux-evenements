// Tests du bilan du plan — `node --test scripts/agent-seo/bilan-plan.test.mjs`
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { comparerIntentions, positionsCibles } from './bilan-plan.mjs';

const L = (q, p, clicks, impressions, position) => ({ keys: [q, `https://www.selectchateaux.com${p}`], clicks, impressions, position });

test('les clics par intention sont comparés avant / après', () => {
  const r = comparerIntentions([L('séminaire yvelines', '/x', 0, 100, 30)], [L('séminaire yvelines', '/x', 3, 120, 15), L('murder party chateau', '/y', 5, 50, 3)]);
  const lieu = r.find((x) => x.intention === 'lieu');
  assert.deepEqual(lieu.avant, { clics: 0, imp: 100, pos: 30 });
  assert.deepEqual(lieu.apres, { clics: 3, imp: 120, pos: 15 });
  assert.deepEqual(r.find((x) => x.intention === 'animation').avant, { clics: 0, imp: 0, pos: null });
});

test('la place de la page cible est isolée des autres pages, accents et ancres compris', () => {
  const r = positionsCibles([
    L('Séminaire Yvelines', '/blog/seminaire-yvelines-78-luxe-proximite#lieux', 1, 100, 20),
    L('seminaire yvelines', '/blog/seminaire-yvelines-78-luxe-proximite', 0, 100, 30),
    L('seminaire yvelines', '/seminaire-chateau-yvelines-78', 0, 50, 40),
  ]);
  const y = r.find((c) => c.requete === 'seminaire yvelines');
  assert.deepEqual(y.cible, { page: '/blog/seminaire-yvelines-78-luxe-proximite', imp: 200, clics: 1, pos: 25 });
  assert.equal(y.pages.length, 2);
});

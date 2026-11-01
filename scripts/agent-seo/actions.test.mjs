// Tests du backlog de Marcus — `node --test scripts/agent-seo/actions.test.mjs`
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { construireBacklog } from './actions.mjs';

// Décision du 01/11/2026 : 12 envois IndexNow sans effet mesuré et 6 commandes
// de réécriture jamais exécutées. Marcus observe et rapporte, il n'agit plus.
test('Marcus ne construit plus aucune action automatique, quel que soit le relevé', () => {
  const snapshot = {
    indexation: { non_indexees: [{ url: '/blog/x', etat: 'Crawled - currently not indexed' }] },
    gsc28: { pages_muettes: [{ p: '/blog/seminaire-yvelines-78-luxe-proximite', imp: 486, pos: 38 }] },
  };
  assert.deepEqual(construireBacklog(snapshot), []);
});

// `node --test scripts/agent-seo/verdicts.test.mjs`
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { actionsAJuger } from './verdicts.mjs';

const a = (id, verdict = null) => ({ id, action: 'ACTION HUMAINE 06/10', prediction: 'p', echeance: '2026-11-03', verdict });

// Régression 01/11/2026 : 23 actions, 0 verdict. Une action « gelée » ou
// « prolongée » n'était jamais relue, et une action humaine était prolongée pour
// « 0 imp » parce que la mesure ne regardait que les 10 pages les plus cliquées.
test('une action gelée ou prolongée revient à juger, une action tranchée non', async () => {
  const q = [];
  const lire = async (s) => { q.push(s); return [a(1), a(2, 'gele'), a(3, 'prolonge')]; };
  const r = await actionsAJuger({ lire, aujourdhui: '2026-11-03' });
  assert.deepEqual(r.map((x) => x.id), [1, 2, 3]);
  assert.match(q[0], /or=\(verdict\.is\.null,verdict\.in\.\(gele,prolonge\)\)/);
  assert.match(q[0], /echeance=lte\.2026-11-03/);
});

test('rien n’est écrit automatiquement : le verdict reste une décision humaine', async () => {
  const r = await actionsAJuger({ lire: async () => [a(7)], aujourdhui: '2026-11-03' });
  assert.equal(r[0].verdict_propose, undefined);
  assert.match(r[0].a_trancher, /p/);
});

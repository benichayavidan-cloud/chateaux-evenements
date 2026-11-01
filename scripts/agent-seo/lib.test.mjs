// `node --test scripts/agent-seo/lib.test.mjs`
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { sbSelectTout } from './lib.mjs';

// Régression 01/11/2026 : Supabase rend 1 000 lignes au plus par requête. Le
// compteur de robots affichait 1 000 sur 11 relevés sur 21, alors que le pic
// réel du 10/09 était de 20 553 passages.
test('sbSelectTout lit toutes les pages au-delà du plafond de 1 000 lignes', async () => {
  const appels = [];
  const lire = async (q) => { appels.push(q); return q.includes('offset=0') ? new Array(1000).fill({}) : q.includes('offset=1000') ? new Array(1000).fill({}) : new Array(7).fill({}); };
  const rows = await sbSelectTout('bot_hits?select=bot&order=ts.asc', { lire });
  assert.equal(rows.length, 2007);
  assert.equal(appels.length, 3);
});

test('une erreur Supabase est levée, jamais comptée comme zéro ligne', async () => {
  await assert.rejects(sbSelectTout('bot_hits?select=bot', { lire: async () => ({ message: 'timeout' }) }), /timeout/);
});

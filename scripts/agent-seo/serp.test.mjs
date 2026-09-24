// Tests du capteur SERP (C4) — `node --test scripts/agent-seo/`
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { positionSerp, resumeSerp } from './serp.mjs';

const SITE = 'https://www.selectchateaux.com';
const page = (liens) => ({ organic: liens.map((link, i) => ({ rank: i + 1, link })) });
const autres = (n) => Array.from({ length: n }, (_, i) => `https://concurrent-${i}.fr/`);

/** Faux Bright Data : une file de réponses par page (objet, ou Error à lever). */
function fauxFetch(parPage) {
  const appels = [];
  const fetchPage = async (p) => {
    appels.push(p);
    const r = parPage[p].shift();
    if (r instanceof Error) throw r;
    return r;
  };
  return { fetchPage, appels };
}

test('régression 10/09 : une page 1 vide n\'est PAS un « >30 », on réessaie et on trouve le rang', async () => {
  const { fetchPage } = fauxFetch({
    0: [{}, page(autres(10))],
    1: [page([...autres(2), `${SITE}/team-building-chantilly`, ...autres(7)])],
  });
  const r = await positionSerp(fetchPage, { attente: 0 });
  assert.deepEqual(r, { pos: 13, url: '/team-building-chantilly', statut: 'trouve' });
});

test('une page qui reste vide après tous les essais donne une ERREUR, pas « >30 »', async () => {
  const { fetchPage, appels } = fauxFetch({ 0: [{}, new Error('timeout'), {}] });
  const r = await positionSerp(fetchPage, { attente: 0 });
  assert.equal(r.statut, 'erreur');
  assert.equal(r.pos, null);
  assert.equal(appels.length, 3);
});

test('trois pages pleines sans le site : vraiment absent du top 30', async () => {
  const { fetchPage } = fauxFetch({ 0: [page(autres(10))], 1: [page(autres(10))], 2: [page(autres(10))] });
  assert.deepEqual(await positionSerp(fetchPage, { attente: 0 }), { pos: '>30', url: null, statut: 'absent' });
});

test('le site en page 1 : trouvé sans lire les pages suivantes', async () => {
  const { fetchPage, appels } = fauxFetch({ 0: [page([...autres(3), `${SITE}/`])] });
  assert.deepEqual(await positionSerp(fetchPage, { attente: 0 }), { pos: 4, url: '/', statut: 'trouve' });
  assert.deepEqual(appels, [0]);
});

test('le résumé ne compte pas les erreurs comme des absences et les signale', () => {
  const s = resumeSerp({
    a: { pos: 4, url: '/', statut: 'trouve' },
    b: { pos: 13, url: '/x', statut: 'trouve' },
    c: { pos: '>30', url: null, statut: 'absent' },
    d: { pos: null, url: null, statut: 'erreur' },
  });
  assert.deepEqual(s, { top10: ['a'], mesurees: 3, erreurs: ['d'] });
});

test('échéance dépassée : on arrête d\'interroger et la requête est une ERREUR (le run ne doit pas dépasser son timeout)', async () => {
  const { fetchPage, appels } = fauxFetch({ 0: [page(autres(10))] });
  const r = await positionSerp(fetchPage, { attente: 0, echeance: Date.now() - 1 });
  assert.equal(r.statut, 'erreur');
  assert.equal(appels.length, 0);
});

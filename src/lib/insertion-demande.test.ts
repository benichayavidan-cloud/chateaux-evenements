// Garde-fou d'insertion : une demande n'est jamais perdue à cause des colonnes d'origine.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { insererAvecRepli } from './insertion-demande.ts';

const LIGNE = { nom_prenom: 'Jeanne', origine_canal: 'pub', origine_ads: { motCle: 'x' }, origine_utm: { source: 'g' } };
type Ligne = typeof LIGNE;

function faux(reponses: Array<{ data: Ligne[] | null; error: { message: string } | null }>) {
  const lignes: Array<Partial<Ligne>> = [];
  const journal: unknown[][] = [];
  return {
    lignes,
    journal,
    inserer: async (l: Partial<Ligne>) => { lignes.push(l); return reponses[lignes.length - 1]; },
    log: (...args: unknown[]) => { journal.push(args); },
  };
}

test('insertion réussie : un seul essai, ligne complète, aucun log', async () => {
  const f = faux([{ data: [LIGNE], error: null }]);
  const r = await insererAvecRepli(f.inserer, LIGNE, f.log);
  assert.equal(r.error, null);
  assert.deepEqual(f.lignes, [LIGNE]);
  assert.equal(f.journal.length, 0);
});

test('régression : échec (jsonb refusé, colonne absente) : un second essai sans les deux colonnes, avec log', async () => {
  const f = faux([{ data: null, error: { message: 'unsupported Unicode escape sequence' } }, { data: [LIGNE], error: null }]);
  const r = await insererAvecRepli(f.inserer, LIGNE, f.log);
  assert.equal(r.error, null);
  assert.deepEqual(r.data, [LIGNE]);
  assert.equal(f.lignes.length, 2);
  assert.deepEqual(f.lignes[1], { nom_prenom: 'Jeanne', origine_canal: 'pub' });
  assert.equal(f.journal.length, 1);
});

test('deux échecs : l\'erreur remonte, pas de troisième essai', async () => {
  const f = faux([{ data: null, error: { message: 'a' } }, { data: null, error: { message: 'b' } }]);
  const r = await insererAvecRepli(f.inserer, LIGNE, f.log);
  assert.equal(r.error?.message, 'b');
  assert.equal(f.lignes.length, 2);
});

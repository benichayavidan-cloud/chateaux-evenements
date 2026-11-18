// Photo des cartes de lieux — `node --test src/lib/photo-carte.test.ts`
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { venues } from '../data/venues.ts';
import { PHOTO_CARTE } from '../data/photos-cartes.ts';
import { photoCarte, avecPhotoCarte } from './photo-carte.ts';

test('chaque lieu publié a une photo de carte vérifiée (ou null assumé)', () => {
  const manquants = venues.filter((v) => !(v.slug in PHOTO_CARTE)).map((v) => v.slug);
  assert.deepEqual(manquants, [], 'lieu ajouté sans vérification de sa photo : compléter src/data/photos-cartes.ts');
});

test('chaque index pointe vers une photo existante', () => {
  for (const v of venues) {
    const i = PHOTO_CARTE[v.slug];
    if (i === null || i === undefined) continue;
    assert.ok(i >= 0 && i < v.photos.length, `${v.slug} : index ${i} hors des ${v.photos.length} photos`);
  }
});

// Deux tests retirés le 18/11/2026 : ils lisaient des lieux précis de l'annuaire, vidé ce jour-là
// (data/venues.ts, décision du PO : le site est une collection de 4 châteaux).

test('un lieu inconnu de la table n\'a pas de carte', () => {
  assert.equal(photoCarte({ slug: 'lieu-pas-encore-verifie', photos: [{ url: 'https://x/logo.png' }] }), null);
});

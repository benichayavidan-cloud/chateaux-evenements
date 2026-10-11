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

test('la photo de carte est celle choisie, pas la première du CRM', () => {
  const palais = venues.find((v) => v.slug === 'palais-des-congres-de-versailles-versailles')!;
  assert.equal(photoCarte(palais)?.url, palais.photos[3].url);
});

test('un lieu sans photo du lieu lui-même n\'a pas de carte', () => {
  // Ferme du Manet : ses 6 photos portent un logo ou un bandeau « LA GRANGE » (vu le 11/10).
  const masques = ['auberge-du-mont-saint-mard-vieux-moulin', 'golf-de-la-vaucouleurs-civry-la-foret', 'la-ferme-du-manet-montigny-le-bretonneux'];
  for (const slug of masques) {
    const v = venues.find((x) => x.slug === slug)!;
    assert.equal(photoCarte(v), null, slug);
  }
  const affiches = avecPhotoCarte(venues).map((v) => v.slug);
  assert.ok(masques.every((s) => !affiches.includes(s)));
  assert.equal(affiches.length, venues.length - masques.length);
});

test('un lieu inconnu de la table n\'a pas de carte', () => {
  assert.equal(photoCarte({ slug: 'lieu-pas-encore-verifie', photos: [{ url: 'https://x/logo.png' }] }), null);
});

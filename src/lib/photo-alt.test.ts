// Photos renommées des châteaux — `node --test src/lib/photo-alt.test.ts`
import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { creerAltPhoto, redirectionsPhotos, type PhotosRenommees } from './photo-alt.ts';

const photos: PhotosRenommees = JSON.parse(fs.readFileSync(new URL('../data/photos-renommees.json', import.meta.url), 'utf-8'));
const altPhoto = creerAltPhoto(photos);
const VRAIS_NOMS = /montvillar|margot|cernay|mont-royal|tiara|halphen|stradivarius|callas|caruso|debussy|vivaldi|conde|les-chasses|trattoria|betty|james|refectoire-des-moines/i;

test('une photo renommée reçoit sa description, avec accents', () => {
  assert.equal(
    altPhoto('/images/seminaire-chateau-chantilly-salle-pleniere-theatre.webp', 'repli'),
    'Salle plénière en configuration théâtre, convention en château à Chantilly',
  );
  assert.match(altPhoto('/images/seminaire-abbaye-vallee-de-chevreuse-refectoire-medieval-voute.webp', 'repli'), /^Réfectoire médiéval voûté/);
});

test('une photo du stockage (URL complète, encodée) est reconnue aussi', () => {
  assert.match(altPhoto('https://x.supabase.co/storage/v1/object/public/chateaux-images/hotel-paris-92/seminaire-hotel-historique-paris-92-salle-reunion-board-bleue.webp', 'repli'), /^Salle de réunion en board/);
});

test('une photo inconnue garde le texte de repli', () => {
  assert.equal(altPhoto('/images/autre.webp', 'Château - vue 1'), 'Château - vue 1');
});

test('chaque photo locale renommée existe sur le disque et a une description', () => {
  for (const lot of photos.lots) for (const p of lot.photos) {
    if (p.ou !== 'local') continue;
    assert.ok(fs.existsSync(new URL(`../../public/images/${p.nouveau}`, import.meta.url)), `absente : ${p.nouveau}`);
    assert.ok(p.alt.length > 10, `sans description : ${p.nouveau}`);
  }
});

test('aucun fichier du site ni nouveau nom ne porte un vrai nom de lieu', () => {
  assert.deepEqual(fs.readdirSync(new URL('../../public/images/', import.meta.url)).filter((f: string) => VRAIS_NOMS.test(f)), []);
  for (const lot of photos.lots) {
    assert.doesNotMatch(lot.dossierStockage.nouveau, VRAIS_NOMS);
    for (const p of lot.photos) assert.doesNotMatch(p.nouveau, VRAIS_NOMS);
  }
});

test('chaque ancienne adresse /images/ redirige (308) vers la nouvelle', () => {
  const r = redirectionsPhotos(photos);
  const locaux = photos.lots.flatMap((l) => l.photos).filter((p) => p.ou === 'local');
  assert.equal(r.length, locaux.length);
  for (const x of r) {
    assert.match(x.source, /^\/images\/.+\.webp$/);
    assert.doesNotMatch(x.destination, VRAIS_NOMS);
    assert.equal(x.permanent, true);
  }
});

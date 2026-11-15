// Photos renommées du Manoir — `node --test src/lib/photo-alt.test.ts`
import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { creerAltPhoto, redirectionsPhotos } from './photo-alt.ts';

const photos = JSON.parse(fs.readFileSync(new URL('../data/photos-manoir-chantilly.json', import.meta.url), 'utf-8'));
const altPhoto = creerAltPhoto(photos);

test('une photo renommée reçoit sa description, avec accents', () => {
  assert.equal(
    altPhoto('/images/seminaire-chateau-chantilly-salle-pleniere-theatre.webp', 'repli'),
    'Salle plénière en configuration théâtre, convention en château à Chantilly',
  );
});

test('une photo du stockage (URL complète) est reconnue aussi', () => {
  assert.match(altPhoto('https://x.supabase.co/storage/v1/object/public/chateaux-images/manoir-chantilly/seminaire-chateau-chantilly-chambre-suite-rouge.webp', 'repli'), /^Suite/);
});

test('une autre photo garde le texte de repli', () => {
  assert.equal(altPhoto('/images/abbaye-01.webp', 'Abbaye - vue 1'), 'Abbaye - vue 1');
});

test('chaque photo renommée existe et a une description', () => {
  const r = redirectionsPhotos(photos);
  for (const { destination } of r) {
    assert.ok(fs.existsSync(new URL(`../../public${destination}`, import.meta.url)), `absente : ${destination}`);
    assert.notEqual(altPhoto(destination, ''), '', `sans description : ${destination}`);
  }
});

test('aucune photo ne porte encore le vrai nom du lieu', () => {
  const restes = fs.readdirSync(new URL('../../public/images/', import.meta.url)).filter((f: string) => /montvillar/i.test(f));
  assert.deepEqual(restes, []);
});

test('chaque ancienne adresse /images/ redirige vers la nouvelle, sans le vrai nom', () => {
  const r = redirectionsPhotos(photos);
  assert.equal(r.length, 24);
  for (const x of r) {
    assert.match(x.source, /^\/images\/evenement-entreprise-chateau-montvillargenne-.+\.webp$/);
    assert.match(x.destination, /^\/images\/seminaire-chateau-chantilly-.+\.webp$/);
    assert.doesNotMatch(x.destination, /montvillar/i);
    assert.equal(x.permanent, true);
  }
});

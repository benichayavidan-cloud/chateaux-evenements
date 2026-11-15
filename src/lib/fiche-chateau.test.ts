// Fiches château (/chateaux/[slug]) — `node --test src/lib/fiche-chateau.test.ts`
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { aligneChiffres, chateauxDuDepartement, descriptionFiche, itemListChateaux, localite, remplitChiffres, titreFiche } from './fiche-chateau.ts';

const base = {
  nom: 'Grand Château de style Anglo-Normand à Chantilly',
  region: 'Chantilly (60)',
  slug: 'manoir-anglo-normand-chantilly',
  capacite: { min: 50, max: 280 },
  roomsTotal: 120,
  meetingRooms: 21,
  atouts: ['Capacité 280 pers', '119 Chambres', 'Spa de Prestige'],
  seoTitle: 'Château Séminaire Chantilly (60) | Grand Domaine {capacite} pers',
  seoDescription: 'Château anglo-normand : {chambres} chambres, {salles} salles, plénière {capacite} personnes.',
};

test('les jetons de chiffres sont remplis depuis les données de la fiche', () => {
  assert.equal(remplitChiffres('{chambres} ch · {salles} salles · {capacite} pers', base), '120 ch · 21 salles · 280 pers');
});

test('le titre prévu dans les données est utilisé, chiffres remplis', () => {
  assert.equal(titreFiche(base), 'Château Séminaire Chantilly (60) | Grand Domaine 280 pers');
});

test('un titre prévu trop long cède la place au titre de repli (≤ 60)', () => {
  const t = titreFiche({ ...base, seoTitle: 'Château Séminaire Chantilly (60) | Grand Domaine historique de 280 personnes' });
  assert.ok(t.length <= 60, t);
  assert.match(t, /^Séminaire .*Chantilly$/);
});

test('sans titre prévu, le titre de repli garde « Séminaire » et la ville', () => {
  assert.equal(titreFiche({ ...base, seoTitle: '' }), 'Séminaire Grand Château Chantilly');
});

test('la description propre à la fiche est utilisée, chiffres remplis, ponctuée', () => {
  assert.equal(descriptionFiche(base), 'Château anglo-normand : 120 chambres, 21 salles, plénière 280 personnes.');
});

test('sans description propre, la phrase de repli dit « à », jamais « en Chantilly »', () => {
  const d = descriptionFiche({ ...base, seoDescription: undefined });
  assert.match(d, /à Chantilly/);
  assert.doesNotMatch(d, /en Chantilly/);
});

test('la ville balisée ne contient pas le département', () => {
  assert.equal(localite('Chantilly (60)'), 'Chantilly');
  assert.equal(localite('Issy-les-Moulineaux (92)'), 'Issy-les-Moulineaux');
});

test('les badges chambres et salles suivent les données, les autres restent', () => {
  const c = aligneChiffres({ ...base, atouts: ['Capacité 280 pers', '100+ Chambres', '14 Salles de Réunion', 'Spa'] });
  assert.deepEqual(c.atouts, ['Capacité 280 pers', '120 Chambres', '21 Salles de Réunion', 'Spa']);
});

test('le filtre département garde les seules réf. « #<dept>- », tout sans filtre', () => {
  const l = [{ ref: '#60-CHANTILLY' }, { ref: '#92-REFUGE' }, { ref: '#600-X' }];
  assert.deepEqual(chateauxDuDepartement(l, '60'), [{ ref: '#60-CHANTILLY' }]);
  assert.equal(chateauxDuDepartement(l).length, 3);
});

test('la liste des châteaux ne recopie rien : un nom et une adresse par fiche', () => {
  const l = itemListChateaux([base, { ...base, slug: 'autre', nom: 'Autre' }]);
  assert.equal(l['@type'], 'ItemList');
  assert.equal(l.numberOfItems, 2);
  assert.deepEqual(l.itemListElement[1], {
    '@type': 'ListItem', position: 2, name: 'Autre', url: 'https://www.selectchateaux.com/chateaux/autre',
  });
});

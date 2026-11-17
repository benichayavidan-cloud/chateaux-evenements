// Icônes de la fiche château — `node --test src/lib/icones-fiche.test.ts`
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Bed, Car, Plane, TrainFront, TramFront, UtensilsCrossed, Waves } from 'lucide-react';
import { chateaux } from '../data/chateaux.ts';
import { sectionsFiche } from './fiche-sections.ts';
import { ICONE_PAR_DEFAUT, iconeChiffre, iconeTransport } from './icones-fiche.ts';

test('transport : le titre du bloc donne son icône, un titre sans transport n’en a pas', () => {
  assert.equal(iconeTransport('En voiture'), Car);
  assert.equal(iconeTransport('En train ou en RER'), TrainFront);
  assert.equal(iconeTransport('En métro'), TramFront);
  assert.equal(iconeTransport('En avion ou en hélicoptère'), Plane);
  assert.equal(iconeTransport('Travaux sur l’A13 jusqu’à fin août 2027'), undefined);
});

test('chiffre : le sujet du libellé l’emporte sur le lieu où il se passe', () => {
  assert.equal(iconeChiffre('Banquet sous les voûtes'), UtensilsCrossed);
  assert.equal(iconeChiffre('Cocktail en plénière'), UtensilsCrossed);
  assert.equal(iconeChiffre('Accès au spa'), Waves);
  assert.equal(iconeChiffre('Chambres à lits jumeaux'), Bed);
  assert.equal(iconeChiffre('Aéroport d’Orly'), Plane);
});

test('chiffre : un libellé inconnu reçoit l’icône neutre, jamais rien', () => {
  assert.equal(iconeChiffre('Zzz'), ICONE_PAR_DEFAUT);
});

test('chiffre : tous les libellés affichés sur les 4 fiches ont une icône choisie', () => {
  const sansIcone = chateaux.flatMap((c) =>
    sectionsFiche(c.slug, c).flatMap((s) => s.faits.filter((f) => iconeChiffre(f.label) === ICONE_PAR_DEFAUT).map((f) => `${c.slug} / ${s.id} : ${f.label}`)),
  );
  assert.deepEqual(sansIcone, []);
});

test('chiffre : tous les libellés des 28 pages détaillées ont une icône choisie', async () => {
  const { RUBRIQUES_PAR_CHATEAU } = await import('../data/rubriques/index.ts');
  const sansIcone = Object.entries(RUBRIQUES_PAR_CHATEAU).flatMap(([slug, rubs]) =>
    Object.entries(rubs).flatMap(([id, r]) => r!.faits.filter((f) => iconeChiffre(f.label) === ICONE_PAR_DEFAUT).map((f) => `${slug}/${id} : ${f.label}`)),
  );
  assert.deepEqual(sansIcone, []);
});

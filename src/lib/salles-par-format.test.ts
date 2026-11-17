// « Quelle salle pour quel format » — `node --test src/lib/salles-par-format.test.ts`
import { test } from 'node:test';
import assert from 'node:assert/strict';
import type { SalleReunion } from '../types/rubriques.ts';
import { RUBRIQUES_PAR_CHATEAU } from '../data/rubriques/index.ts';
import { sallesParFormat } from './salles-par-format.ts';

const salle = (nom: string, v: Partial<SalleReunion>): SalleReunion => ({
  nom, surfaceM2: null, theatre: null, classe: null, enU: null, banquet: null, cocktail: null, cabaret: null, ...v,
});

test('plénière : les plus grandes en théâtre d’abord, 3 au plus', () => {
  const f = sallesParFormat([salle('A', { theatre: 50 }), salle('B', { theatre: 280 }), salle('C', { theatre: 120 }), salle('D', { theatre: 90 })])[0];
  assert.equal(f.id, 'pleniere');
  assert.deepEqual(f.salles.map((s) => s.nom), ['B', 'C', 'D']);
  assert.equal(f.salles[0].capacite, '280 places en théâtre');
  assert.equal(f.resume, "jusqu'à 280 places");
});

test('plénière : sans disposition théâtre, la capacité « en réunion » du lieu compte', () => {
  const f = sallesParFormat([salle('Voûtes', { reunion: 150 }), salle('Orangerie', { theatre: 110 })])[0];
  assert.deepEqual(f.salles.map((s) => [s.nom, s.capacite]), [['Voûtes', '150 personnes en réunion'], ['Orangerie', '110 places en théâtre']]);
});

test('ateliers : jusqu’à 80 places en classe ; comité : jusqu’à 25 en U, les plus petites d’abord', () => {
  const formats = sallesParFormat([salle('Grande', { classe: 140, enU: 90 }), salle('Atelier', { classe: 40, enU: 25 }), salle('Bureau', { classe: 12, enU: 8 }), salle('Réduit', { classe: 4 })]);
  const ateliers = formats.find((f) => f.id === 'ateliers')!;
  assert.deepEqual(ateliers.salles.map((s) => s.nom), ['Atelier', 'Bureau']);
  assert.equal(ateliers.resume, '2 salles, de 12 à 40 places en classe');
  assert.deepEqual(formats.find((f) => f.id === 'comite')!.salles.map((s) => s.capacite), ['8 places en U', '25 places en U']);
});

test('gala : convives à table, cocktail quand il est connu ; une seule salle sans « de… à… »', () => {
  const f = sallesParFormat([salle('Serre', { banquet: 250, cocktail: 200, note: 'de mai à octobre' })]).find((x) => x.id === 'gala')!;
  assert.equal(f.salles[0].capacite, '250 convives à table, 200 en cocktail');
  assert.equal(f.salles[0].mention, 'de mai à octobre');
  assert.equal(f.resume, '1 salle, 250 convives à table');
});

test('mention : la première précision de la note, si elle est courte', () => {
  const f = sallesParFormat([salle('Terrasse', { reunion: 100, note: 'en plein air, jusqu’à 100 personnes en réunion' })])[0];
  assert.equal(f.salles[0].mention, 'en plein air');
});

test('une note longue n’est pas reprise en mention', () => {
  const f = sallesParFormat([salle('Plénière', { theatre: 280, note: '60 autour d’une table de réunion ; écran de 18 m²' })])[0];
  assert.equal(f.salles[0].mention, undefined);
});

test('un format sans salle n’apparaît pas ; aucune salle, aucun format', () => {
  assert.deepEqual(sallesParFormat([salle('A', { theatre: 30 })]).map((f) => f.id), ['pleniere']);
  assert.deepEqual(sallesParFormat([]), []);
});

for (const [slug, rubs] of Object.entries(RUBRIQUES_PAR_CHATEAU)) {
  test(`${slug} : chaque chiffre affiché vient du tableau des salles`, () => {
    const salles = rubs.salles!.salles!;
    const formats = sallesParFormat(salles);
    assert.ok(formats.length >= 2, `${formats.length} format(s)`);
    for (const f of formats) {
      for (const l of f.salles) {
        const s = salles.find((x) => x.nom === l.nom)!;
        const connus = [s.theatre, s.classe, s.enU, s.banquet, s.cocktail, s.reunion].filter((v) => v !== null && v !== undefined).map(String);
        for (const n of l.capacite.match(/\d+/g) ?? []) assert.ok(connus.includes(n), `${slug} / ${f.id} / ${l.nom} : ${n}`);
      }
    }
  });
}

test('la plus grande salle de chaque domaine ouvre la carte plénière', () => {
  const tete = (slug: string) => sallesParFormat(RUBRIQUES_PAR_CHATEAU[slug].salles!.salles!)[0].salles[0];
  assert.equal(tete('manoir-anglo-normand-chantilly').capacite, '280 places en théâtre');
  assert.equal(tete('abbaye-millenaire-vallee-chevreuse').capacite, '150 personnes en réunion');
  assert.equal(tete('palais-royal-foret-chantilly').capacite, '250 places en théâtre');
  assert.equal(tete('hotel-historique-seminaire-paris-92').capacite, '100 personnes en réunion');
});

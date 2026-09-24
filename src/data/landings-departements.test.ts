// Les chiffres écrits dans les guides de département doivent être ceux des
// données — `node --test src/data/landings-departements.test.ts`
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { landingsDepartements } from './landings-departements.ts';
import { venues } from './venues.ts';

function chiffres(code: string) {
  const l = venues.filter((v) => v.departementCode === code);
  const caps = l.map((v) => v.capacite);
  return { n: l.length, min: Math.min(...caps), max: Math.max(...caps), heberges: l.filter((v) => v.chambres).length };
}

test('régression 24/09 : les Yvelines et l\'Oise sont des guides du DÉPARTEMENT, plus des fiches d\'un seul domaine', () => {
  for (const [code, slug] of [['78', 'seminaire-chateau-yvelines-78'], ['60', 'seminaire-chateau-oise-60']]) {
    const l = landingsDepartements.find((x) => x.slug === slug);
    assert.ok(l, `${slug} doit être servi par le gabarit département`);
    assert.equal(l.code, code);
  }
});

for (const l of landingsDepartements) {
  test(`${l.slug} : le nombre de lieux annoncé est celui de venues.ts`, () => {
    const c = chiffres(l.code);
    for (const [champ, texte] of [['title', l.title], ['description', l.description], ['reponseDirecte', l.reponseDirecte]] as const) {
      const m = texte.match(/(\d+) lieux/);
      if (m) assert.equal(Number(m[1]), c.n, `${champ} annonce ${m[1]} lieux, venues.ts en compte ${c.n}`);
    }
  });

  test(`${l.slug} : la fourchette de capacité annoncée est celle de venues.ts`, () => {
    const c = chiffres(l.code);
    const m = l.reponseDirecte.match(/de (\d+) à (\d+) personnes/);
    assert.ok(m, 'la réponse directe doit donner la fourchette de capacité');
    assert.deepEqual([Number(m[1]), Number(m[2])], [c.min, c.max]);
  });

  test(`${l.slug} : le nombre de lieux avec hébergement annoncé est celui de venues.ts`, () => {
    const c = chiffres(l.code);
    const m = l.reponseDirecte.match(/dont (\d+) avec hébergement/);
    if (m) assert.equal(Number(m[1]), c.heberges);
  });
}

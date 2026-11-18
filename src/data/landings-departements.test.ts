// Les chiffres écrits dans les guides de département doivent être ceux des
// données — `node --test src/data/landings-departements.test.ts`
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { landingsDepartements } from './landings-departements.ts';


test('régression 24/09 : les Yvelines et l\'Oise sont des guides du DÉPARTEMENT, plus des fiches d\'un seul domaine', () => {
  for (const [code, slug] of [['78', 'seminaire-chateau-yvelines-78'], ['60', 'seminaire-chateau-oise-60']]) {
    const l = landingsDepartements.find((x) => x.slug === slug);
    assert.ok(l, `${slug} doit être servi par le gabarit département`);
    assert.equal(l.code, code);
  }
});

// Les contrôles « chiffres annoncés = venues.ts » ont été retirés le 18/11/2026 : l'annuaire est vide
// (décision du PO) et les pages département ne sont plus servies (redirigées, data/redirections-annuaire.json
// et redirections-commerciales.json). Les textes de landings-departements.ts ne sont plus affichés ; seuls
// le budget et le nom du département servent encore au bloc commercial des deux guides du blog.

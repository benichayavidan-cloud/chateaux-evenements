// Demande du PO (04/11/2026) : sur ces pages, la section « Pourquoi… » passe
// juste avant le pied de page. Les autres pages gardent leur ordre.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { geoLandingPages } from './geo-landing-pages.ts';
import { getLandingFormat } from './landings-formats.ts';

const lire = (chemin: string) => readFileSync(new URL(`../${chemin}`, import.meta.url), 'utf-8');
const GEO_EN_BAS = ['seminaire-chateau-chantilly', 'seminaire-vallee-de-chevreuse'];

test('pages géo : seules Chantilly et la Vallée de Chevreuse descendent la section', () => {
  assert.deepEqual(geoLandingPages.filter((p) => p.pourquoiEnBasDePage).map((p) => p.slug).sort(), [...GEO_EN_BAS].sort());
});

for (const slug of GEO_EN_BAS) {
  test(`${slug} : la section est le dernier bloc de la page`, () => {
    const page = lire(`app/${slug}/page.tsx`);
    assert.ok(page.indexOf('<GeoPourquoiSection') > page.indexOf('<GuidesSection'));
  });
}

test('team-building-chantilly : seule la section Pourquoi est marquée', () => {
  const finales = getLandingFormat('team-building-chantilly')!.sections.filter((s) => s.enBasDePage);
  assert.deepEqual(finales.map((s) => s.titre), ['Pourquoi Chantilly pour un team building']);
  assert.equal(getLandingFormat('journee-etude-seminaire')!.sections.some((s) => s.enBasDePage), false);
});

test('gabarit des formats : la section marquée passe après le formulaire', () => {
  const gabarit = lire('components/lieux/LandingFormat.tsx');
  assert.ok(gabarit.lastIndexOf('sectionsFinales') > gabarit.indexOf('<DevisSection'));
});

test('team-building-chateau : la section est après les avis', () => {
  const page = lire('app/team-building-chateau/page.tsx');
  assert.ok(page.indexOf('<TeamBuildingPointsForts') > page.indexOf('<ReviewsSection'));
  assert.ok(page.indexOf('<TeamBuildingPointsForts') < page.indexOf('<StickyCtaBar'));
});

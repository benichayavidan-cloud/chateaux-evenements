// Rubriques des domaines (/chateaux/<slug>/<rubrique>) — `node --test src/lib/rubriques.test.ts`
import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { RUBRIQUES } from '../types/rubriques.ts';
import { RUBRIQUES_PAR_CHATEAU } from '../data/rubriques/index.ts';
import { paragraphesEnDouble, rapportRemplissage, rubriquesPubliees, urlRubrique } from './rubriques.ts';
import { TITLE_MAX } from './seo.ts';

const DESCRIPTION_MAX = 160;

/**
 * Blind booking strict (15/11) : aucun nom réel, ni du lieu, ni de l'enseigne,
 * ni des salles, ni de la commune. Liste tenue ICI (jamais publiée).
 */
const NOMS_REELS = [
  'Vaux-de-Cernay', 'Vaux de Cernay', 'Cernay', 'Paris Society', 'Tata Harper',
  'Saint-Thibault', 'Montfort', 'Savigny', 'Auffargis', 'Perray',
  'Montvillargenne', 'Jeanne and the Forest', 'Gouvieux',
  'Mont Royal', 'Tiara', 'Chapelle-en-Serval',
  'Margot', 'MGallery', 'Wilmotte', 'Monastic', 'Agastache', 'Mélisse', 'Marguerite', 'Valois', 'Accor',
  'InterContinental', 'IHG', 'Callas', 'Vivaldi', 'Halphen', 'Stradivarius',
];

const toutesLesRubriques = Object.entries(RUBRIQUES_PAR_CHATEAU).flatMap(([slug, rubs]) =>
  Object.entries(rubs).map(([id, r]) => ({ slug, id, r: r! })),
);

test('les 4 domaines ont leurs 7 rubriques', () => {
  for (const slug of ['abbaye-millenaire-vallee-chevreuse', 'manoir-anglo-normand-chantilly', 'palais-royal-foret-chantilly', 'hotel-historique-seminaire-paris-92']) {
    assert.deepEqual(rubriquesPubliees(slug), [...RUBRIQUES], slug);
  }
});

test('un château sans données n’a aucune rubrique, et ne plante pas', () => {
  assert.deepEqual(rubriquesPubliees('inconnu'), []);
});

test('les rubriques suivent l’ordre de navigation', () => {
  for (const slug of Object.keys(RUBRIQUES_PAR_CHATEAU)) {
    const ids = rubriquesPubliees(slug);
    const attendu = RUBRIQUES.filter((r) => ids.includes(r));
    assert.deepEqual(ids, attendu);
  }
});

test('url de rubrique', () => {
  assert.equal(urlRubrique('abc', 'salles'), '/chateaux/abc/salles');
});

for (const { slug, id, r } of toutesLesRubriques) {
  test(`${slug}/${id} : titre ≤ ${TITLE_MAX}, description ≤ ${DESCRIPTION_MAX}`, () => {
    assert.ok(r.seoTitle.length <= TITLE_MAX, `${r.seoTitle.length} car. : ${r.seoTitle}`);
    assert.ok(r.seoDescription.length <= DESCRIPTION_MAX, `${r.seoDescription.length} car.`);
  });

  test(`${slug}/${id} : chaque photo existe dans public/`, () => {
    for (const p of r.photos) {
      if (!p.src.startsWith('/')) continue; // photo du stockage : vérifiée en prod
      assert.ok(fs.existsSync(path.join('public', p.src)), p.src);
      assert.ok(p.legende.trim().length > 0, `légende vide : ${p.src}`);
    }
  });

  test(`${slug}/${id} : aucun vrai nom dans le texte publié`, () => {
    // `sources` n'est jamais affiché : il peut nommer le lieu.
    const texte = JSON.stringify({ ...r, sources: [] });
    for (const nom of NOMS_REELS) {
      assert.ok(!texte.toLowerCase().includes(nom.toLowerCase()), `« ${nom} » dans ${slug}/${id}`);
    }
  });
}

test('titres uniques sur l’ensemble des rubriques', () => {
  const titres = toutesLesRubriques.map((x) => x.r.seoTitle);
  assert.equal(new Set(titres).size, titres.length);
});

test('rapport de remplissage : une ligne par rubrique, ne lève jamais', () => {
  const rapport = rapportRemplissage();
  assert.equal(rapport.length, toutesLesRubriques.length);
  for (const ligne of rapport) assert.ok(Array.isArray(ligne.manques));
});

test('rapport : signale ce qui manque par rapport à la cible', () => {
  const vide = {
    seoTitle: 't', seoDescription: 'd', resume: 'r', intro: 'i',
    faits: [], photos: [], blocs: [], sources: [],
  };
  const [ligne] = rapportRemplissage({ x: { salles: vide } });
  assert.ok(ligne.manques.some((m) => m.includes('photos')));
  assert.ok(ligne.manques.some((m) => m.includes('chiffres')));
  assert.ok(ligne.manques.some((m) => m.includes('tableau des salles')));
});

test('paragraphes en double : détectés entre deux domaines', () => {
  const r = (texte: string) => ({
    seoTitle: 't', seoDescription: 'd', resume: 'r', intro: texte,
    faits: [], photos: [], blocs: [], sources: [],
  });
  const doublons = paragraphesEnDouble({ a: { salles: r('Même texte.') }, b: { salles: r('Même texte.') } });
  assert.equal(doublons.length, 1);
  assert.deepEqual(paragraphesEnDouble({ a: { salles: r('Un.') }, b: { salles: r('Deux.') } }), []);
});

// Sections de la fiche château — `node --test src/lib/fiche-sections.test.ts`
import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { chateaux } from '../data/chateaux.ts';
import { FICHE_SECTIONS, SECTIONS_FICHE } from '../data/fiche-sections.ts';
import { angleSeminaire, angleSuffisant, horsSujet, phrases, rapportAngleSeminaire, rapportHorsSujet, sectionsFiche } from './fiche-sections.ts';

const CHIFFRES = { roomsTotal: 119, meetingRooms: 21, capacite: { min: 10, max: 280 } };
const parSlug = Object.fromEntries(chateaux.map((c) => [c.slug, c]));

test('chaque château de data/chateaux.ts a ses 6 sections configurées', () => {
  for (const c of chateaux) assert.equal(sectionsFiche(c.slug, c).length, 6, c.slug);
});

test('un château sans configuration n’affiche aucune section (et ne plante pas)', () => {
  assert.deepEqual(sectionsFiche('inconnu', CHIFFRES), []);
});

test('hors sujet : le spa dans l’hébergement est signalé, pas dans les activités', () => {
  const bloc = { titre: 'Le spa, inclus', texte: 'Piscine intérieure chauffée et hammam.' };
  const base = { titre: 'Titre', intro: '', blocs: [bloc], faits: [] };
  assert.deepEqual(horsSujet({ ...base, id: 'hebergement' }), ['spa', 'piscine', 'hammam']);
  assert.deepEqual(horsSujet({ ...base, id: 'activites' }), []);
});

test('hors sujet : mot entier seulement, accents et pluriels compris', () => {
  const section = (texte: string) => ({ id: 'hebergement' as const, titre: '', intro: texte, blocs: [], faits: [] });
  assert.deepEqual(horsSujet(section('Une baignoire et des espaces de travail.')), []);
  assert.deepEqual(horsSujet(section('Deux BARS et une Plénière.')), ['bar', 'plénière']);
});

test('hors sujet : pluriel et trait d’union dans une expression de plusieurs mots', () => {
  const s = (id: 'activites' | 'reunion', intro: string) => ({ id, titre: '', intro, blocs: [], faits: [] });
  assert.deepEqual(horsSujet(s('activites', 'Nos salles de réunion sont au château.')), ['salle de réunion']);
  assert.deepEqual(horsSujet(s('reunion', 'Un team-building en fin de journée.')), ['team building']);
});

test('hors sujet : les activités de cohésion dans les salles sont signalées', () => {
  const s = { id: 'reunion' as const, titre: '', intro: 'Rallye en 2CV, VTT en forêt et team building.', blocs: [], faits: [] };
  assert.deepEqual(horsSujet(s), ['team building', 'rallye', 'vtt']);
});

for (const slug of Object.keys(FICHE_SECTIONS)) {
  const sections = sectionsFiche(slug, parSlug[slug]);

  test(`${slug} : les 6 sections, dans l’ordre`, () => {
    assert.deepEqual(sections.map((s) => s.id), [...SECTIONS_FICHE]);
  });

  test(`${slug} : chaque section a un titre sans jeton, du texte et un lien vers sa page`, () => {
    for (const s of sections) {
      assert.ok(s.titre && !/[{}]/.test(s.titre), `${s.id} : titre « ${s.titre} »`);
      assert.ok(s.intro.length > 0 && s.blocs.length >= 2, `${s.id} : texte`);
      assert.ok(s.liens.length >= 1, `${s.id} : lien`);
    }
  });

  test(`${slug} : titres de section tous différents`, () => {
    assert.equal(new Set(sections.map((s) => s.titre)).size, sections.length);
  });

  test(`${slug} : chaque photo existe dans public/`, () => {
    for (const p of sections.flatMap((s) => s.photos)) {
      if (p.src.startsWith('http')) continue;
      assert.ok(fs.existsSync(path.join('public', p.src)), p.src);
    }
  });

  test(`${slug} : aucune section ne sort de son sujet`, () => {
    for (const s of sections) assert.deepEqual(horsSujet(s), [], `${s.id}`);
  });
}

test('titres de section : jamais le même sur deux châteaux', () => {
  const titres = Object.keys(FICHE_SECTIONS).flatMap((slug) => sectionsFiche(slug, parSlug[slug]).map((s) => s.titre));
  assert.equal(new Set(titres).size, titres.length);
});

test('rapport hors sujet : une ligne par section fautive, ne lève jamais', () => {
  const config = {
    x: {
      titres: { lieu: 'Le spa du lieu', hebergement: 'a', reunion: 'b', restauration: 'c', activites: 'd', acces: 'e' },
      lieu: { intro: 'Un parc.', blocs: [], faits: [] },
    },
  };
  assert.deepEqual(rapportHorsSujet({ x: CHIFFRES }, config), ['x / lieu : spa']);
  assert.deepEqual(rapportHorsSujet({}, config), ['x : château absent de data/chateaux.ts']);
});

test('titre principal : un mot-clé « séminaire » et un lieu par fiche, jamais deux fois le même', () => {
  const fiches = chateaux.filter((c) => c.titreFiche);
  assert.equal(fiches.length, 4);
  for (const c of fiches) {
    assert.match(c.titreFiche!.motCle, /^Séminaire /, c.slug);
    assert.ok(c.titreFiche!.lieu.length > 0 && !c.titreFiche!.lieu.includes('{'), c.slug);
  }
  assert.equal(new Set(fiches.map((c) => c.titreFiche!.motCle)).size, 4);
});

test('titre principal : aucun titre de section ne le répète', () => {
  for (const slug of Object.keys(FICHE_SECTIONS)) {
    const h1 = parSlug[slug].titreFiche!.motCle;
    for (const s of sectionsFiche(slug, parSlug[slug])) assert.notEqual(s.titre, h1, `${slug} / ${s.id}`);
  }
});

test('ligne d’infos : chaque fiche annonce son trajet', () => {
  for (const c of chateaux.filter((f) => f.titreFiche)) assert.match(c.trajet ?? '', /^à \d+ min /, c.slug);
});

test('angle séminaire : compte les phrases qui parlent à un organisateur', () => {
  const s = { intro: 'Au château, 80 chambres gardent l’esprit Belle Époque. Pour un séminaire résidentiel, tout le groupe dort sur place.', blocs: [{ titre: 't', texte: 'Le bar ferme à 1 h. Vos participants s’y retrouvent.' }] };
  assert.equal(phrases(s).length, 4);
  assert.deepEqual(angleSeminaire(s), { pro: 2, total: 4 });
});

test('angle séminaire : repère à 2 phrases sur 3, jamais atteint sans texte', () => {
  assert.equal(angleSuffisant({ pro: 8, total: 12 }), true);
  assert.equal(angleSuffisant({ pro: 7, total: 12 }), false);
  assert.equal(angleSuffisant({ pro: 0, total: 0 }), false);
});

test('angle séminaire : le rapport nomme la section trop descriptive', () => {
  const config = {
    x: {
      titres: { lieu: 'a', hebergement: 'b', reunion: 'c', restauration: 'd', activites: 'e', acces: 'f' },
      lieu: { intro: 'Un parc de 6 hectares. Une façade à colombages.', blocs: [], faits: [] },
    },
  };
  assert.deepEqual(rapportAngleSeminaire({ x: CHIFFRES }, config), ['x / lieu : 0 phrase(s) sur 2 orientée(s) séminaire']);
});

for (const slug of Object.keys(FICHE_SECTIONS)) {
  const sections = sectionsFiche(slug, parSlug[slug]);

  test(`${slug} : chaque section parle séminaire (2 phrases sur 3 au moins)`, () => {
    for (const s of sections) {
      const a = angleSeminaire(s);
      assert.ok(angleSuffisant(a), `${s.id} : ${a.pro}/${a.total}`);
    }
  });

  test(`${slug} : « séminaire résidentiel » dans le lieu, l’hébergement et l’accès`, () => {
    for (const s of sections.filter((x) => ['lieu', 'hebergement', 'acces'].includes(x.id))) {
      assert.match(phrases(s).join(' '), /séminaire résidentiel/i, s.id);
    }
  });
}

// Sections de la fiche château — `node --test src/lib/fiche-sections.test.ts`
import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { chateaux } from '../data/chateaux.ts';
import { FICHE_SECTIONS, SECTIONS_FICHE } from '../data/fiche-sections.ts';
import { horsSujet, rapportHorsSujet, sectionsFiche } from './fiche-sections.ts';

const CHIFFRES = { roomsTotal: 119, meetingRooms: 21, capacite: { min: 10, max: 280 } };
const parSlug = Object.fromEntries(chateaux.map((c) => [c.slug, c]));

test('un château sans configuration garde son ancien gabarit (aucune section)', () => {
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

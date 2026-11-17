// Sections de la fiche château — `node --test src/lib/fiche-sections.test.ts`
import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { chateaux } from '../data/chateaux.ts';
import { FICHE_SECTIONS, SECTIONS_FICHE } from '../data/fiche-sections.ts';
import { angleSeminaire, angleSuffisant, chiffresHorsSection, horsSujet, phrases, rapportAngleSeminaire, rapportHorsSujet, sectionRubrique, sectionsFiche, sectionsSupplementaires } from './fiche-sections.ts';

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

/**
 * Chiffres retirés le 17/11/2026 : les questions fréquentes, le texte de
 * partage et la description contredisaient les sections (sources officielles).
 */
const CHIFFRES_RETIRES: Record<string, RegExp> = {
  'manoir-anglo-normand-chantilly': /\b120 chambres|23 minutes de TER/i,
  'hotel-historique-seminaire-paris-92': /4 minutes à pied|36 minutes|5 000 m²|360 ?m²/i,
  'abbaye-millenaire-vallee-chevreuse': /48 places/i,
  'palais-royal-foret-chantilly': /\b12 salons|\b11 salons|15 min(utes)? de (l'aéroport |Roissy|CDG)|35 minutes de Paris|48 chambres twin|300 (en cocktail|personnes)/i,
};

for (const [slug, motif] of Object.entries(CHIFFRES_RETIRES)) {
  test(`${slug} : plus aucun chiffre retiré dans la fiche (questions fréquentes, partage, description)`, () => {
    const c = parSlug[slug];
    const textes = [c.description, c.accrocheHero, c.seoDescription ?? '', c.descriptionLongue, ...c.atouts, ...c.faq.flatMap((f) => [f.question, f.answer])];
    for (const t of textes) assert.doesNotMatch(t, motif);
  });
}

test('conseil : un chiffre absent de la section est signalé', () => {
  const base = { titre: '21 salles', intro: 'Une plénière de 280 places.', blocs: [], faits: [{ label: 'Écran', valeur: '18 m²' }] };
  assert.deepEqual(chiffresHorsSection({ ...base, conseil: 'Plénière de 280 places, 21 salles, écran de 18 m².' }), []);
  assert.deepEqual(chiffresHorsSection({ ...base, conseil: 'Jusqu’à 300 personnes en 12 salles.' }), ['300', '12']);
  assert.deepEqual(chiffresHorsSection({ ...base }), []);
});

test('conseils : écrits pour les 4 châteaux', () => {
  assert.equal(Object.values(FICHE_SECTIONS).filter((c) => c.conseils).length, 4);
});

for (const slug of Object.keys(FICHE_SECTIONS).filter((s) => FICHE_SECTIONS[s].conseils)) {
  const sections = sectionsFiche(slug, parSlug[slug]);

  test(`${slug} : un conseil par section, dans le vocabulaire du séminaire`, () => {
    for (const s of sections) {
      assert.ok(s.conseil && s.conseil.length <= 260, `${s.id} : conseil manquant ou trop long`);
      assert.match(s.conseil, /séminaire|participants|convention|collaborateurs/i, s.id);
    }
  });

  test(`${slug} : aucun conseil n’avance un chiffre absent de sa section`, () => {
    for (const s of sections) assert.deepEqual(chiffresHorsSection(s), [], s.id);
  });
}

test('balises : le title de chaque fiche commence par « Séminaire », sans jeton oublié, et tous diffèrent', async () => {
  const { titreFiche, descriptionFiche } = await import('./fiche-chateau.ts');
  const fiches = chateaux.filter((c) => c.titreFiche);
  const titres = fiches.map((c) => titreFiche(c));
  for (const [i, t] of titres.entries()) {
    assert.match(t, /^Séminaire /, fiches[i].slug);
    assert.ok(t.length <= 60 && !/[{}]/.test(t), `${fiches[i].slug} : « ${t} »`);
    const d = descriptionFiche(fiches[i]);
    assert.ok(d.length <= 160 && !/[{}]/.test(d) && /séminaire|équipes/i.test(d), `${fiches[i].slug} : « ${d} »`);
  }
  assert.equal(new Set(titres).size, titres.length);
});

// ---- Pages détaillées : même brique de section que la fiche
import { RUBRIQUES } from '../types/rubriques.ts';
import { RUBRIQUES_PAR_CHATEAU } from '../data/rubriques/index.ts';

const pagesDetaillees = Object.entries(RUBRIQUES_PAR_CHATEAU).flatMap(([slug, rubs]) =>
  RUBRIQUES.filter((id) => rubs[id]).map((id) => ({ slug, id, s: sectionRubrique(id, rubs[id]!) })),
);
const sectionsDesFiches = Object.keys(FICHE_SECTIONS).flatMap((slug) => sectionsFiche(slug, parSlug[slug]));

test('pages détaillées : 28 sections, chacune avec titre, texte, photos et conseil', () => {
  assert.equal(pagesDetaillees.length, 28);
  for (const { slug, id, s } of pagesDetaillees) {
    assert.ok(s.titre && s.titre.length <= 75 && !/[{}]/.test(s.titre), `${slug}/${id} : titre « ${s.titre} »`);
    // Une page qui a des sections supplémentaires peut ouvrir sur un seul paragraphe.
    const minimum = RUBRIQUES_PAR_CHATEAU[slug][id]?.sections?.length ? 1 : 2;
    assert.ok(s.intro && s.blocs.length >= minimum && s.photos.length >= 1, `${slug}/${id}`);
    assert.ok(s.conseil && s.conseil.length <= 260, `${slug}/${id} : conseil manquant ou trop long`);
    assert.match(s.conseil, /séminaire|participants|convention|collaborateurs/i, `${slug}/${id}`);
    assert.deepEqual(s.liens, [], `${slug}/${id} : la page ne renvoie pas vers elle-même`);
  }
});

test('pages détaillées : titres de section tous différents, et différents de ceux des fiches', () => {
  const titres = pagesDetaillees.map((p) => p.s.titre);
  assert.equal(new Set(titres).size, titres.length);
  const desFiches = new Set(sectionsDesFiches.map((s) => s.titre));
  assert.deepEqual(titres.filter((t) => desFiches.has(t)), []);
});

test('pages détaillées : conseils tous différents, et différents de ceux des fiches', () => {
  const conseils = pagesDetaillees.map((p) => p.s.conseil!);
  assert.equal(new Set(conseils).size, conseils.length);
  const desFiches = new Set(sectionsDesFiches.map((s) => s.conseil));
  assert.deepEqual(conseils.filter((c) => desFiches.has(c)), []);
});

test('pages détaillées : un conseil n’avance aucun chiffre absent de sa page', () => {
  for (const { slug, id, s } of pagesDetaillees) assert.deepEqual(chiffresHorsSection(s), [], `${slug}/${id}`);
});

// ---- Sections supplémentaires des pages détaillées
const supplementaires = Object.entries(RUBRIQUES_PAR_CHATEAU).flatMap(([slug, rubs]) =>
  RUBRIQUES.filter((id) => rubs[id]).flatMap((id) => sectionsSupplementaires(id, rubs[id]!).map((s) => ({ slug, id, s }))),
);

test('sections supplémentaires : les 4 pages Salles ont leur salle signature et leurs ateliers, avec photos et texte', () => {
  assert.deepEqual(supplementaires.filter((x) => x.id === 'salles').map((x) => x.s.ancre), Array(4).fill(['salle-signature', 'ateliers']).flat());
  assert.deepEqual(supplementaires.filter((x) => x.id === 'chambres').map((x) => x.s.ancre), Array(4).fill(['grand-groupe', 'direction-invites', 'sejour']).flat());
  assert.deepEqual(supplementaires.filter((x) => x.id === 'restauration').map((x) => x.s.ancre), Array(4).fill(['banquets', 'pauses']).flat());
  assert.deepEqual(supplementaires.filter((x) => x.id === 'exterieurs').map((x) => x.s.ancre), Array(4).fill(['plein-air', 'detente']).flat());
  for (const { slug, id, s } of supplementaires) {
    assert.ok(s.titre && s.intro && s.blocs.length >= 2 && s.faits.length >= 3, `${slug}/${id}`);
    assert.ok(s.photos.length >= 2, `${slug}/${id} : il faut au moins 2 photos pour le diaporama`);
    for (const p of s.photos) if (!p.src.startsWith('http')) assert.ok(fs.existsSync(path.join('public', p.src)), p.src);
    assert.match(s.conseil ?? '', /séminaire|participants|convention|collaborateurs/i, `${slug}/${id}`);
  }
});

test('sections supplémentaires : titre et conseil différents de ceux de la page et des fiches', () => {
  const pris = new Set([...pagesDetaillees.flatMap((p) => [p.s.titre, p.s.conseil]), ...sectionsDesFiches.flatMap((s) => [s.titre, s.conseil])]);
  for (const { slug, id, s } of supplementaires) {
    assert.ok(!pris.has(s.titre), `${slug}/${id} : titre déjà utilisé`);
    assert.ok(!pris.has(s.conseil), `${slug}/${id} : conseil déjà utilisé`);
  }
  assert.equal(new Set(supplementaires.map((x) => x.s.titre)).size, supplementaires.length);
});

test('sections supplémentaires : aucun chiffre qui ne soit déjà publié sur les pages du même domaine', () => {
  const nombres = (t: string) => t.match(/\d+(?:[,.]\d+)?/g) ?? [];
  for (const { slug, id, s } of supplementaires) {
    const rubs = RUBRIQUES_PAR_CHATEAU[slug];
    const publies = new Set(
      Object.values(rubs).flatMap((r) => [
        ...nombres([r!.intro, r!.resume, ...r!.blocs.flatMap((b) => [b.titre, b.texte]), ...r!.faits.flatMap((f) => [f.label, f.valeur]), ...r!.photos.map((p) => p.legende)].join(' ')),
        ...(r!.salles ?? []).flatMap((x) => [x.surfaceM2, x.theatre, x.classe, x.enU, x.banquet, x.cocktail, x.cabaret, x.reunion].filter((v) => v != null).map(String).concat(nombres(x.note ?? ''))),
      ]),
    );
    const texte = [s.titre, s.intro, s.conseil ?? '', ...s.blocs.flatMap((b) => [b.titre, b.texte]), ...s.faits.flatMap((f) => [f.label, f.valeur])].join(' ');
    assert.deepEqual(nombres(texte).filter((n) => !publies.has(n)), [], `${slug}/${id}`);
  }
});

test('pages détaillées : un bloc de texte et un titre de bloc n’apparaissent qu’une fois sur la page', () => {
  for (const [slug, rubs] of Object.entries(RUBRIQUES_PAR_CHATEAU)) {
    for (const id of RUBRIQUES.filter((x) => rubs[x])) {
      const sections = [sectionRubrique(id, rubs[id]!), ...sectionsSupplementaires(id, rubs[id]!)];
      const titres = sections.flatMap((s) => s.blocs.map((b) => b.titre));
      assert.equal(new Set(titres).size, titres.length, `${slug}/${id} : ${titres.join(' | ')}`);
      assert.equal(new Set(sections.map((s) => ('ancre' in s ? (s as { ancre: string }).ancre : s.id))).size, sections.length, `${slug}/${id} : ancres en double`);
    }
  }
});

test('la fiche château garde tous les blocs de la rubrique Salles, même quand la page les répartit', () => {
  const fiche = sectionsFiche('manoir-anglo-normand-chantilly', parSlug['manoir-anglo-normand-chantilly']).find((s) => s.id === 'reunion')!;
  assert.equal(fiche.blocs.length, RUBRIQUES_PAR_CHATEAU['manoir-anglo-normand-chantilly'].salles!.blocs.length);
});

test('pages détaillées : une photo n’apparaît que dans un seul diaporama de la page', () => {
  for (const [slug, rubs] of Object.entries(RUBRIQUES_PAR_CHATEAU)) {
    for (const id of RUBRIQUES.filter((x) => rubs[x])) {
      const srcs = [sectionRubrique(id, rubs[id]!), ...sectionsSupplementaires(id, rubs[id]!)].flatMap((x) => x.photos.map((p) => p.src));
      assert.equal(new Set(srcs).size, srcs.length, `${slug}/${id}`);
    }
  }
});

test('fiches de l’abbaye et du 92 : l’hébergement garde ses deux paragraphes, sans ceux de la page Chambres', () => {
  for (const slug of ['abbaye-millenaire-vallee-chevreuse', 'hotel-historique-seminaire-paris-92']) {
    const fiche = sectionsFiche(slug, parSlug[slug]).find((x) => x.id === 'hebergement')!;
    assert.deepEqual(fiche.blocs, RUBRIQUES_PAR_CHATEAU[slug].chambres!.blocs.slice(0, 2), slug);
  }
});

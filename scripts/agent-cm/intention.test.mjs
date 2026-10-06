// Tests de l'intention des sujets de Camille — `node --test scripts/agent-cm/intention.test.mjs`
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { classerIntention, classerSerp, motifIntention, blocIntentionsPrompt, resumerParIntention } = require('./intention.js');

// Top 10 RÉELS relevés le 06/10/2026 (bdata search --country fr).
const TOP_SEMINAIRE_YVELINES = [
  'https://www.funbooker.com/fr/category/seminaire/yvelines',
  'https://seminairesdecaractere.fr/destination-seminaire/seminaire-yvelines-78/',
  'https://www.chateauform.com/fr/lp/seminaire/france/ile-de-france/yvelines/',
  'https://www.dolcehotelversailles.com/seminaire-yvelines/',
  'https://paris.i-way-world.com/seminaire-evenementiel-entreprise-saint-quentin-en-yvelines',
  'https://www.aleou.fr/xd/lieux-congres-seminaires/yvelines-78',
];
const TOP_TEAM_BUILDING_IDF = [
  'https://www.autreman.com/teambuilding/team-building-ile-de-france/',
  'https://www.happy-unity.com/team-building/paris',
  'https://www.kactus.com/fr/cat/activites/paris',
  'https://www.theoasishouse.fr/post/5-idees-pour-un-team-building-au-vert-en-ile-de-france',
  'https://www.magmateambuilding.fr/les-meilleures-idees-de-team-building-a-paris/',
  'https://dotmap.fr/destinations/nos-regions/ile-de-france/',
  'https://businessexperience.parcasterix.fr/nos-solutions/animations/team-building',
];

const fauxFetch = (urls) => async () => ({ json: async () => ({ organic: urls.map((link) => ({ link })) }) });

test('un sujet d’animation est classé animation, même avec « séminaire » ou « château »', () => {
  assert.equal(classerIntention('Escape game géant au château pour votre séminaire'), 'animation');
  assert.equal(classerIntention('Murder party château : enquête grandeur nature'), 'animation');
  assert.equal(classerIntention('Atelier cuisine avec un chef'), 'animation');
});

test('lieu et organisation sont distingués', () => {
  assert.equal(classerIntention('Séminaire proche Paris : 12 châteaux à moins d’une heure'), 'lieu');
  assert.equal(classerIntention('Séminaire 100 personnes avec hébergement'), 'lieu');
  assert.equal(classerIntention('Budget séminaire entreprise : combien prévoir par personne'), 'organisation');
  assert.equal(classerIntention('Négocier les clauses de force majeure d’un contrat'), 'autre', '« majeure » ne contient pas le mot « jeu »');
});

test('le top 10 réel de « séminaire yvelines » est une recherche de lieu, celui de « team building île de france » non', () => {
  assert.deepEqual(classerSerp(TOP_SEMINAIRE_YVELINES), { type: 'lieu', catalogues: 4 });
  assert.deepEqual(classerSerp(TOP_TEAM_BUILDING_IDF), { type: 'information', catalogues: 1 });
});

test('création : un sujet d’animation est refusé sans même interroger Google', async () => {
  let appels = 0;
  const motif = await motifIntention({ title: 'Escape game au château', keywords: ['escape game chateau'] }, { cle: 'x', fetchImpl: async () => { appels++; return {}; } });
  assert.match(motif, /animation/);
  assert.equal(appels, 0);
});

test('création : un sujet de lieu passe si Google y montre des catalogues, sinon il est refusé', async () => {
  const ok = await motifIntention({ title: 'Séminaire dans les Yvelines', keywords: ['séminaire yvelines'] }, { cle: 'x', fetchImpl: fauxFetch(TOP_SEMINAIRE_YVELINES) });
  assert.equal(ok, null);
  const ko = await motifIntention({ title: 'Team building en Île-de-France', keywords: ['team building île de france'] }, { cle: 'x', fetchImpl: fauxFetch(TOP_TEAM_BUILDING_IDF) });
  assert.match(ko, /1 catalogue/);
});

test('création : sans clé ou si la sonde échoue, le contrôle du top 10 est sauté (jamais bloquant)', async () => {
  const journal = [];
  assert.equal(await motifIntention({ title: 'Séminaire proche Paris', keywords: [] }, { cle: '', log: (m) => journal.push(m) }), null);
  assert.equal(await motifIntention({ title: 'Séminaire proche Paris', keywords: [] }, { cle: 'x', fetchImpl: async () => { throw new Error('réseau'); }, log: (m) => journal.push(m) }), null);
  assert.equal(journal.length, 2);
});

test('un sujet d’organisation passe sans sonde', async () => {
  assert.equal(await motifIntention({ title: 'Programme de séminaire : modèle sur deux jours', keywords: [] }, { cle: 'x', fetchImpl: async () => { throw new Error('ne doit pas être appelé'); } }), null);
});

test('le prompt liste les recherches qui ont donné des demandes', () => {
  const bloc = blocIntentionsPrompt();
  assert.match(bloc, /« séminaire proche paris » : 4 demande/);
  assert.match(bloc, /Plus aucun sujet d'animation/);
});

test('le relevé Search Console est résumé par intention (indicateur du plan)', () => {
  const r = resumerParIntention([
    { keys: ['murder party chateau'], clicks: 9, impressions: 54, position: 3 },
    { keys: ['séminaire yvelines'], clicks: 0, impressions: 100, position: 30 },
    { keys: ['seminaire chateau proche paris'], clicks: 1, impressions: 100, position: 10 },
    { keys: ['budget seminaire entreprise'], clicks: 0, impressions: 50, position: 18 },
    { keys: ['select chateaux'], clicks: 2, impressions: 3, position: 1 },
  ]);
  assert.deepEqual(r.animation, { clics: 9, imp: 54, pos: 3 });
  assert.deepEqual(r.lieu, { clics: 1, imp: 200, pos: 20 });
  assert.deepEqual(r.organisation, { clics: 0, imp: 50, pos: 18 });
  assert.deepEqual(r.marque, { clics: 2, imp: 3, pos: 1 });
});

test('revue du 06/10 : formats de travail et sujets « château » d’organisation ne sont pas mal classés', () => {
  assert.equal(classerIntention("Atelier d'intelligence collective en séminaire château"), 'organisation');
  assert.equal(classerIntention('Enquête de satisfaction après séminaire'), 'organisation');
  assert.equal(classerIntention('Organisation atelier de co-développement séminaire'), 'organisation');
  assert.equal(classerIntention('Assurance annulation séminaire en château'), 'organisation');
  assert.equal(classerIntention('Menu dîner de gala séminaire château'), 'organisation');
  assert.equal(classerIntention('Séminaire en Île-de-France : 40 domaines'), 'lieu');
  assert.equal(classerIntention('Séminaire Seine-et-Marne'), 'lieu');
  assert.equal(classerIntention('séminaire 78'), 'lieu');
  assert.equal(classerIntention('Jeux de cohésion d’équipe en séminaire'), 'animation');
  assert.equal(classerIntention('Les enjeux d’un séminaire de direction'), 'organisation');
});

test('un mot-clé secondaire ne bloque pas un sujet d’organisation', async () => {
  const motif = await motifIntention({ title: 'Programme de séminaire sur deux jours', keywords: ['programme seminaire', 'atelier cuisine'] }, { cle: '' });
  assert.equal(motif, null);
});

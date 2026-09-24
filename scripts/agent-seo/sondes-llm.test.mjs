// Tests du capteur C5 (citations LLM) — `node --test scripts/agent-seo/`
//
// Régression du 17/09 : 11 sondes sur 11 « sans recherche » des deux côtés.
// En réalité, AUCUNE réponse n'avait été obtenue : DataForSEO renvoyait
// « Payment Required » et Gemini une erreur (clé absente en CI, 503 en local).
// Une erreur d'API était lue comme une réponse vide, donc comme « le moteur
// n'a pas cherché ». Ces tests figent la lecture des réponses brutes.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { analyserReponse, lireOpenAI, lireGemini, estNotreDomaine } from './sondes-llm.mjs';

// ── Réponses brutes, au format réellement renvoyé par les API (24/09/2026) ──
const openaiAvecRecherche = (urls, texte = 'Voici des châteaux…') => ({
  model: 'gpt-5.4-mini-2026-03-17',
  usage: { input_tokens: 8783, output_tokens: 857 },
  output: [
    { type: 'reasoning' },
    { type: 'web_search_call', status: 'completed', action: { type: 'search', queries: ['château séminaire paris'] } },
    { type: 'message', status: 'completed', content: [{ type: 'output_text', text: texte,
      annotations: urls.map((url) => ({ type: 'url_citation', url, title: 't' })) }] },
  ],
});
const geminiAvecRecherche = (titres, texte = 'Voici des châteaux…') => ({
  modelVersion: 'gemini-3.5-flash',
  candidates: [{ content: { parts: [{ text: texte }] }, groundingMetadata: {
    webSearchQueries: ['chateau seminaire ile de france'],
    groundingChunks: titres.map((title) => ({ web: { uri: 'https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZ', title } })),
  } }],
});

test('régression 17/09 : une erreur d\'API Gemini est une ERREUR, pas « sans recherche »', () => {
  for (const brut of [
    { error: { code: 503, message: 'This model is currently experiencing high demand.', status: 'UNAVAILABLE' } },
    { error: { code: 403, message: 'Method doesn\'t allow unregistered callers', status: 'PERMISSION_DENIED' } },
  ]) {
    const r = analyserReponse(lireGemini(brut));
    assert.equal(r.statut, 'erreur');
    assert.equal(r.a_cherche, false);
    assert.equal(r.cite, false);
    assert.match(r.erreur, /high demand|unregistered/);
  }
});

test('régression 17/09 : une erreur d\'API OpenAI est une ERREUR', () => {
  const r = analyserReponse(lireOpenAI({ error: { message: 'Incorrect API key provided', type: 'invalid_request_error' } }));
  assert.equal(r.statut, 'erreur');
  assert.match(r.erreur, /Incorrect API key/);
});

test('une réponse sans aucun contenu est une erreur, jamais une absence', () => {
  assert.equal(analyserReponse(lireGemini({ candidates: [] })).statut, 'erreur');
  assert.equal(analyserReponse(lireOpenAI({ output: [] })).statut, 'erreur');
});

test('OpenAI : recherche faite, notre domaine dans les sources citées → cite', () => {
  const r = analyserReponse(lireOpenAI(openaiAvecRecherche([
    'https://chateaudeprunay.fr/?utm_source=openai',
    'https://www.selectchateaux.com/seminaire-chateau-ile-de-france?utm_source=openai',
  ])));
  assert.equal(r.statut, 'cite');
  assert.equal(r.cite, true);
  assert.equal(r.a_cherche, true);
  assert.deepEqual(r.sources, ['chateaudeprunay.fr', 'selectchateaux.com']);
});

test('OpenAI : recherche faite, nous absents des sources et du texte → absent', () => {
  const r = analyserReponse(lireOpenAI(openaiAvecRecherche(['https://chateaudeprunay.fr/', 'https://www.chateauform.com/fr/'])));
  assert.equal(r.statut, 'absent');
  assert.equal(r.cite, false);
  assert.equal(r.a_cherche, true);
});

test('OpenAI : recherche faite, marque nommée dans le texte sans lien → cite', () => {
  const r = analyserReponse(lireOpenAI(openaiAvecRecherche(['https://chateaudeprunay.fr/'], 'L\'agence Select Châteaux organise…')));
  assert.equal(r.statut, 'cite');
});

test('OpenAI : réponse sans appel web_search → sans_recherche, jamais absent', () => {
  const brut = { output: [{ type: 'message', content: [{ type: 'output_text', text: 'De mémoire : Château de Chantilly…', annotations: [] }] }] };
  const r = analyserReponse(lireOpenAI(brut));
  assert.equal(r.statut, 'sans_recherche');
  assert.equal(r.a_cherche, false);
});

test('une mention de mémoire (sans recherche) ne compte pas comme citation', () => {
  const brut = { output: [{ type: 'message', content: [{ type: 'output_text', text: 'Select Châteaux est une agence…', annotations: [] }] }] };
  const r = analyserReponse(lireOpenAI(brut));
  assert.equal(r.statut, 'sans_recherche');
  assert.equal(r.cite, false);
});

test('Gemini : grounding avec notre domaine → cite ; sans lui → absent', () => {
  assert.equal(analyserReponse(lireGemini(geminiAvecRecherche(['aleou.fr', 'selectchateaux.com']))).statut, 'cite');
  const r = analyserReponse(lireGemini(geminiAvecRecherche(['aleou.fr', 'naboo.app', 'aleou.fr'])));
  assert.equal(r.statut, 'absent');
  assert.deepEqual(r.sources, ['aleou.fr', 'naboo.app']);
});

test('Gemini : réponse sans groundingMetadata → sans_recherche', () => {
  const brut = { modelVersion: 'gemini-3.8-flash', candidates: [{ content: { parts: [{ text: 'De mémoire…' }] } }] };
  assert.equal(analyserReponse(lireGemini(brut)).statut, 'sans_recherche');
});

test('estNotreDomaine : le domaine exact et ses sous-domaines, pas les homonymes', () => {
  assert.equal(estNotreDomaine('selectchateaux.com'), true);
  assert.equal(estNotreDomaine('www.selectchateaux.com'), true);
  assert.equal(estNotreDomaine('https://www.selectchateaux.com/blog/x'), true);
  assert.equal(estNotreDomaine('notselectchateaux.com'), false);
  assert.equal(estNotreDomaine('selectchateaux.com.evil.fr'), false);
});

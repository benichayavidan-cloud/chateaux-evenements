// Tests de la provenance des demandes — `node --test src/lib/origine.test.ts`
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { canalOrigine, lirePremierContact, parsePremierContact } from './origine.ts';

const QUAND = new Date('2026-09-24T10:00:00Z');
const contact = (url: string, referrer = '') => lirePremierContact(url, referrer, QUAND);

test('régression : la page d\'arrivée est celle de la PREMIÈRE visite, pas la page du formulaire', () => {
  const pc = contact('https://www.selectchateaux.com/blog/seminaire-yvelines?utm_source=chatgpt.com', '');
  assert.equal(pc.page, '/blog/seminaire-yvelines');
  assert.deepEqual(pc.utm, { source: 'chatgpt.com' });
  assert.equal(pc.date, '2026-09-24T10:00:00.000Z');
});

test('Google naturel : référent google, sans gclid', () => {
  assert.equal(canalOrigine(contact('https://www.selectchateaux.com/', 'https://www.google.fr/')), 'google');
  assert.equal(canalOrigine(contact('https://www.selectchateaux.com/', 'https://www.google.com/')), 'google');
});

test('une annonce Google (gclid) reste une pub, même avec un référent google', () => {
  assert.equal(canalOrigine(contact('https://www.selectchateaux.com/?gclid=abc', 'https://www.google.com/')), 'pub');
});

test('les assistants IA sont reconnus par leur utm_source OU leur référent', () => {
  assert.equal(canalOrigine(contact('https://www.selectchateaux.com/x?utm_source=chatgpt.com')), 'chatgpt');
  assert.equal(canalOrigine(contact('https://www.selectchateaux.com/x', 'https://chatgpt.com/')), 'chatgpt');
  assert.equal(canalOrigine(contact('https://www.selectchateaux.com/x', 'https://www.perplexity.ai/')), 'perplexity');
  assert.equal(canalOrigine(contact('https://www.selectchateaux.com/x', 'https://gemini.google.com/')), 'gemini');
  assert.equal(canalOrigine(contact('https://www.selectchateaux.com/x', 'https://copilot.microsoft.com/')), 'copilot');
  assert.equal(canalOrigine(contact('https://www.selectchateaux.com/x', 'https://claude.ai/')), 'claude');
});

test('Gemini n\'est pas confondu avec Google, Copilot pas avec Bing', () => {
  assert.equal(canalOrigine(contact('https://www.selectchateaux.com/', 'https://www.bing.com/')), 'bing');
  assert.equal(canalOrigine(contact('https://www.selectchateaux.com/', 'https://duckduckgo.com/')), 'autre-moteur');
});

test('réseaux sociaux, sites référents, email, accès direct', () => {
  assert.equal(canalOrigine(contact('https://www.selectchateaux.com/', 'https://www.linkedin.com/')), 'reseau-social');
  assert.equal(canalOrigine(contact('https://www.selectchateaux.com/', 'https://www.aleou.fr/ville/x')), 'site-referent');
  assert.equal(canalOrigine(contact('https://www.selectchateaux.com/?utm_medium=email&utm_source=newsletter')), 'email');
  assert.equal(canalOrigine(contact('https://www.selectchateaux.com/')), 'direct');
});

test('un référent interne au site n\'est pas un site référent', () => {
  const pc = contact('https://www.selectchateaux.com/devis', 'https://www.selectchateaux.com/blog/x');
  assert.equal(pc.referent, null);
  assert.equal(canalOrigine(pc), 'direct');
});

test('sans premier contact (ancien navigateur, stockage bloqué) : inconnu', () => {
  assert.equal(canalOrigine(null), 'inconnu');
});

test('parsePremierContact rejette un contenu stocké corrompu ou trafiqué', () => {
  assert.equal(parsePremierContact('pas du json'), null);
  assert.equal(parsePremierContact(JSON.stringify({ page: 42 })), null);
  const ok = contact('https://www.selectchateaux.com/a', 'https://www.google.fr/');
  assert.deepEqual(parsePremierContact(JSON.stringify(ok)), ok);
  const long = { ...ok, page: '/' + 'x'.repeat(1000) };
  assert.equal(parsePremierContact(JSON.stringify(long))?.page.length, 300);
});

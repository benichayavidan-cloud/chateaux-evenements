// Tests de la provenance des demandes — `node --test src/lib/origine.test.ts`
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  canalOrigine, clicAdsEnCours, clicAdsMemorise, clicAMemoriser, consentementPublicitaire, lireClicAds,
  lirePremierContact, memoriserClicAds, memoriserPremierContact, origineAds, parseClicAds, parsePremierContact,
} from './origine.ts';

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

// ── Dernier clic sur une annonce ─────────────────────────────────────────────

const ANNONCE = 'https://www.selectchateaux.com/chateaux/palais-royal-foret-chantilly'
  + '?utm_source=google&utm_medium=cpc&utm_campaign=oise-chantilly&utm_content=830458815022'
  + '&utm_term=ch%C3%A2teau+s%C3%A9minaire+oise&sc_match=e&sc_device=m&sc_adgroup=123456&gclid=Cj0KCQ-abc_DEF';
const CLIC_LE = new Date('2026-11-04T13:12:00Z');

test('un clic Ads complet est lu champ par champ, page sans paramètres', () => {
  assert.deepEqual(lireClicAds(ANNONCE, CLIC_LE), {
    campagne: 'oise-chantilly',
    annonceId: '830458815022',
    groupeId: '123456',
    motCle: 'château séminaire oise',
    correspondance: 'e',
    appareil: 'm',
    page: '/chateaux/palais-royal-foret-chantilly',
    clicLe: '2026-11-04T13:12:00.000Z',
    gclid: 'Cj0KCQ-abc_DEF',
    gbraid: null,
    wbraid: null,
  });
});

test('un clic est reconnu par gclid, gbraid, wbraid ou utm google + cpc, et rien d\'autre', () => {
  const base = 'https://www.selectchateaux.com/x';
  assert.equal(lireClicAds(`${base}?gclid=abc`, CLIC_LE)?.gclid, 'abc');
  assert.equal(lireClicAds(`${base}?gbraid=abc`, CLIC_LE)?.gbraid, 'abc');
  assert.equal(lireClicAds(`${base}?wbraid=abc`, CLIC_LE)?.wbraid, 'abc');
  assert.equal(lireClicAds(`${base}?utm_source=google&utm_medium=cpc&utm_campaign=c`, CLIC_LE)?.campagne, 'c');
  assert.equal(lireClicAds(base, CLIC_LE), null);
  assert.equal(lireClicAds(`${base}?utm_source=google`, CLIC_LE), null);
  assert.equal(lireClicAds(`${base}?utm_medium=cpc`, CLIC_LE), null);
  assert.equal(lireClicAds(`${base}?utm_source=bing&utm_medium=cpc`, CLIC_LE), null);
  assert.equal(lireClicAds(`${base}?gclid=`, CLIC_LE), null);
  assert.equal(lireClicAds(`${base}?gclid=%3Cscript%3E`, CLIC_LE), null);
});

test('les valeurs sont bornées, et un numéro de clic trop long est écarté plutôt que tronqué', () => {
  const u = new URL('https://www.selectchateaux.com/x');
  u.searchParams.set('utm_source', 'google');
  u.searchParams.set('utm_medium', 'cpc');
  u.searchParams.set('utm_term', 'm'.repeat(1000));
  u.searchParams.set('sc_match', 'z');
  u.searchParams.set('sc_device', '{device}');
  u.searchParams.set('utm_content', '{creative}');
  u.searchParams.set('gclid', 'g'.repeat(2000));
  const clic = lireClicAds(u.toString(), CLIC_LE);
  assert.equal(clic?.motCle?.length, 150);
  assert.equal(clic?.correspondance, null);
  assert.equal(clic?.appareil, null);
  assert.equal(clic?.annonceId, null, 'un {paramètre} non remplacé par Google n\'est pas une valeur');
  assert.equal(clic?.gclid, null);
});

test('recharger la page du même clic ne rajeunit pas sa date ; un nouveau clic la remplace', () => {
  const premier = lireClicAds(ANNONCE, CLIC_LE);
  const recharge = lireClicAds(ANNONCE, new Date('2026-11-20T10:00:00Z'));
  assert.equal(clicAMemoriser(recharge!, premier).clicLe, '2026-11-04T13:12:00.000Z');
  const autre = lireClicAds('https://www.selectchateaux.com/y?gclid=autre', new Date('2026-11-20T10:00:00Z'));
  assert.equal(clicAMemoriser(autre!, premier).clicLe, '2026-11-20T10:00:00.000Z');
  assert.equal(clicAMemoriser(autre!, null).gclid, 'autre');
});

test('parseClicAds écarte le contenu corrompu et borne le reste', () => {
  const ok = lireClicAds(ANNONCE, CLIC_LE);
  assert.deepEqual(parseClicAds(JSON.stringify(ok)), ok);
  assert.deepEqual(parseClicAds(ok), ok);
  for (const mauvais of ['pas du json', 42, null, undefined, [], {}, { page: 42, clicLe: 'x' }, { page: '/a', clicLe: 'pas une date' }]) {
    assert.equal(parseClicAds(mauvais), null);
  }
  const trafique = parseClicAds({
    page: '/' + 'x'.repeat(1000), clicLe: CLIC_LE.toISOString(),
    campagne: { a: 1 }, motCle: 'm'.repeat(1000), correspondance: '<b>', appareil: 12,
    gclid: '<img onerror=x>', gbraid: 7, autreChamp: 'ignoré',
  });
  assert.equal(trafique?.page.length, 300);
  assert.equal(trafique?.campagne, null);
  assert.equal(trafique?.motCle?.length, 150);
  assert.equal(trafique?.correspondance, null);
  assert.equal(trafique?.appareil, null);
  assert.equal(trafique?.gclid, null);
  assert.equal(trafique?.gbraid, null);
  assert.equal('autreChamp' in (trafique ?? {}), false);
});

test('un clic de plus de 30 jours est ignoré, 30 jours pile compte encore', () => {
  const clic = lireClicAds(ANNONCE, CLIC_LE)!;
  const JOUR = 86_400_000;
  assert.deepEqual(clicAdsEnCours(clic, new Date(CLIC_LE.getTime() + 30 * JOUR)), clic);
  assert.equal(clicAdsEnCours(clic, new Date(CLIC_LE.getTime() + 30 * JOUR + 1)), null);
  assert.equal(clicAdsEnCours(clic, new Date(CLIC_LE.getTime() - 2 * JOUR)), null, 'date dans le futur');
  assert.equal(clicAdsEnCours(null, CLIC_LE), null);
});

test('régression : Google naturel puis annonce = pub, même si le premier contact dit autre chose', () => {
  const naturel = contact('https://www.selectchateaux.com/', 'https://www.google.fr/');
  const clic = lireClicAds(ANNONCE, CLIC_LE);
  assert.equal(canalOrigine(naturel), 'google');
  assert.equal(canalOrigine(naturel, clic), 'pub');
  assert.equal(canalOrigine(contact('https://www.selectchateaux.com/', 'https://chatgpt.com/'), clic), 'pub');
  assert.equal(canalOrigine(null, clic), 'pub');
  assert.equal(canalOrigine(naturel, null), 'google');
});

// Navigateur simulé : un vrai parcours sur plusieurs pages.
function navigateur() {
  const donnees = new Map<string, string>();
  const g = globalThis as unknown as Record<string, unknown>;
  g.localStorage = {
    getItem: (k: string) => donnees.get(k) ?? null,
    setItem: (k: string, v: string) => { donnees.set(k, v); },
  };
  g.document = { referrer: '' };
  return { donnees, visite: (href: string) => { g.window = { location: { href } }; } };
}

test('parcours : le dernier clic s\'ajoute sans jamais toucher au premier contact', () => {
  const nav = navigateur();
  nav.visite('https://www.selectchateaux.com/blog/a');
  memoriserPremierContact();
  memoriserClicAds();
  assert.equal(clicAdsMemorise(), null, 'une visite sans annonce ne crée aucun clic');
  const premier = nav.donnees.get('sc_premier_contact');

  nav.visite('https://www.selectchateaux.com/x?gclid=un');
  memoriserPremierContact();
  memoriserClicAds();
  assert.equal(clicAdsMemorise()?.gclid, 'un');

  nav.visite('https://www.selectchateaux.com/devis');
  memoriserClicAds();
  assert.equal(clicAdsMemorise()?.gclid, 'un', 'une page sans annonce n\'efface pas le clic');

  nav.visite('https://www.selectchateaux.com/y?gclid=deux');
  memoriserClicAds();
  assert.equal(clicAdsMemorise()?.gclid, 'deux');
  assert.equal(nav.donnees.get('sc_premier_contact'), premier);
});

test('clicAdsMemorise applique la fenêtre de 30 jours', () => {
  const nav = navigateur();
  nav.visite('https://www.selectchateaux.com/x?gclid=un');
  memoriserClicAds();
  const dans31Jours = new Date(Date.now() + 31 * 86_400_000);
  assert.equal(clicAdsMemorise(dans31Jours), null);
  assert.equal(clicAdsMemorise()?.gclid, 'un');
});

test('stockage bloqué : rien ne casse', () => {
  const g = globalThis as unknown as Record<string, unknown>;
  g.localStorage = { getItem: () => { throw new Error('bloqué'); }, setItem: () => { throw new Error('bloqué'); } };
  g.window = { location: { href: 'https://www.selectchateaux.com/x?gclid=un' } };
  assert.doesNotThrow(() => memoriserClicAds());
  assert.equal(clicAdsMemorise(), null);
  assert.equal(consentementPublicitaire(), 'inconnu');
});

test('le consentement vient du choix réel de la bannière', () => {
  const nav = navigateur();
  assert.equal(consentementPublicitaire(), 'inconnu');
  nav.donnees.set('cookie-consent', 'accepted');
  assert.equal(consentementPublicitaire(), 'oui');
  nav.donnees.set('cookie-consent', 'rejected');
  assert.equal(consentementPublicitaire(), 'non');
  nav.donnees.set('cookie-consent', 'autre');
  assert.equal(consentementPublicitaire(), 'inconnu');
});

test('contrat CRM : exactement les champs convenus, consentement inclus', () => {
  const clic = lireClicAds(ANNONCE, CLIC_LE);
  assert.deepEqual(Object.keys(origineAds(clic, 'oui') ?? {}).sort(), [
    'annonceId', 'appareil', 'campagne', 'clicLe', 'consentement', 'correspondance',
    'gbraid', 'gclid', 'groupeId', 'motCle', 'page', 'wbraid',
  ]);
  assert.equal(origineAds(clic, 'non')?.consentement, 'non');
  assert.equal(origineAds(null, 'oui'), null);
});

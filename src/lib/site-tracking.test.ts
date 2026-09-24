// Tests du traceur de visites — `node --test src/lib/site-tracking.test.ts`
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { z } from 'zod';
import {
  ORIGINE_CRM,
  URL_COLLECTE,
  appareilDepuisLargeur,
  estSiteSuivi,
  lireContexteVisite,
  lireSessionId,
  payloadEvenement,
  payloadPageVue,
  paliersScrollAtteints,
  sourceDepuisCanal,
} from './site-tracking.ts';

// Copie fidèle de `siteIngestSchema` (CRM V2, src/modules/analytics-site/site-tracking.schema.ts).
// `.strict()` en plus : le CRM ignore les champs inconnus en silence, ce qui a caché
// pendant trois mois que le site parlait encore le format du CRM V1.
const optionalText = (max: number) => z.string().trim().max(max).nullable().optional();
const optionalInt = z.number().int().min(0).nullable().optional();
const SITE_EVENT_TYPES_V2 = [
  'PAGE_VIEW', 'CLICK_CTA', 'CLICK_PHONE', 'CLICK_EMAIL', 'FORM_START', 'FORM_SUBMIT',
  'SCROLL_25', 'SCROLL_50', 'SCROLL_75', 'SCROLL_100', 'SESSION_START', 'SESSION_END',
] as const;
const schemaV2 = z.object({
  fingerprint: z.string().trim().min(1).max(100),
  sessionId: z.string().trim().max(40).optional(),
  kind: z.enum(['pageview', 'event']),
  pathname: z.string().trim().min(1).max(500),
  pageTitle: optionalText(300),
  device: z.enum(['SITE_DESKTOP', 'SITE_MOBILE', 'SITE_TABLET']).optional(),
  source: z.enum(['ORGANIC', 'PAID', 'DIRECT', 'REFERRAL', 'SOCIAL', 'EMAIL_SOURCE', 'OTHER']).optional(),
  referrer: optionalText(500),
  utmSource: optionalText(150),
  utmMedium: optionalText(150),
  utmCampaign: optionalText(150),
  utmContent: optionalText(150),
  utmTerm: optionalText(150),
  gclid: optionalText(255),
  landingPage: optionalText(500),
  screenWidth: optionalInt,
  country: optionalText(100),
  city: optionalText(100),
  region: optionalText(100),
  eventType: z.enum(SITE_EVENT_TYPES_V2).optional(),
  label: optionalText(200),
  value: optionalText(200),
  scrollDepth: optionalInt,
}).strict();

const QUAND = new Date('2026-09-24T10:00:00Z');
const ctx = (url: string, referrer = '', largeur = 1440) => lireContexteVisite(url, referrer, largeur, QUAND);

test('régression : le traceur poste sur la route unique du CRM V2, plus sur /collect ni /heartbeat', () => {
  assert.equal(URL_COLLECTE('https://crm.selectchateaux.com'), 'https://crm.selectchateaux.com/api/site-tracking');
  assert.equal(URL_COLLECTE('https://crm.selectchateaux.com/'), 'https://crm.selectchateaux.com/api/site-tracking');
});

test('régression : une page vue respecte le schéma V2 (champs et valeurs d\'enum)', () => {
  const c = ctx(
    'https://www.selectchateaux.com/blog/seminaire?utm_source=newsletter&utm_medium=email&utm_campaign=sept&utm_content=a&utm_term=b',
    'https://mail.example.com/',
    390,
  );
  const p = payloadPageVue({ fingerprint: 'fp-1', sessionId: null, contexte: c, pathname: '/blog/seminaire', pageTitle: 'Séminaire' });
  const r = schemaV2.safeParse(p);
  assert.ok(r.success, JSON.stringify(r.error?.issues));
  assert.equal(p.kind, 'pageview');
  assert.equal(p.device, 'SITE_MOBILE');
  assert.equal(p.source, 'EMAIL_SOURCE');
  assert.equal(p.utmSource, 'newsletter');
  assert.equal(p.utmMedium, 'email');
  assert.equal(p.utmCampaign, 'sept');
  assert.equal(p.utmContent, 'a');
  assert.equal(p.utmTerm, 'b');
  assert.equal(p.landingPage, '/blog/seminaire');
  assert.equal(p.screenWidth, 390);
  assert.equal('sessionId' in p, false, 'pas de sessionId avant la réponse du CRM');
  assert.equal('action' in p, false, 'le champ action est celui du CRM V1');
});

test('un événement respecte le schéma V2 et réutilise la session', () => {
  const c = ctx('https://www.selectchateaux.com/?gclid=XYZ', 'https://www.google.com/');
  const p = payloadEvenement({ fingerprint: 'fp-1', sessionId: 'cm1abc', contexte: c, pathname: '/', eventType: 'SCROLL_50', scrollDepth: 50 });
  assert.ok(p);
  const r = schemaV2.safeParse(p);
  assert.ok(r.success, JSON.stringify(r.error?.issues));
  assert.equal(p.kind, 'event');
  assert.equal(p.sessionId, 'cm1abc');
  assert.equal(p.eventType, 'SCROLL_50');
  assert.equal(p.scrollDepth, 50);
  assert.equal(p.gclid, 'XYZ');
  assert.equal(p.source, 'PAID');
});

test('les types d\'événement inconnus du CRM V2 sont ignorés au lieu de faire rejeter la requête', () => {
  const c = ctx('https://www.selectchateaux.com/');
  assert.equal(payloadEvenement({ fingerprint: 'fp', sessionId: 's', contexte: c, pathname: '/', eventType: 'CLICK_WHATSAPP' }), null);
  assert.equal(payloadEvenement({ fingerprint: 'fp', sessionId: 's', contexte: c, pathname: '/', eventType: 'scroll_50' }), null);
  for (const t of ['CLICK_PHONE', 'FORM_SUBMIT', 'CLICK_CTA', 'SCROLL_100']) {
    const p = payloadEvenement({ fingerprint: 'fp', sessionId: 's', contexte: c, pathname: '/', eventType: t, label: 'x' });
    assert.ok(p && schemaV2.safeParse(p).success, t);
  }
});

test('appareil : mobile < 768 ≤ tablette < 1024 ≤ ordinateur', () => {
  assert.equal(appareilDepuisLargeur(375), 'SITE_MOBILE');
  assert.equal(appareilDepuisLargeur(767), 'SITE_MOBILE');
  assert.equal(appareilDepuisLargeur(768), 'SITE_TABLET');
  assert.equal(appareilDepuisLargeur(1023), 'SITE_TABLET');
  assert.equal(appareilDepuisLargeur(1024), 'SITE_DESKTOP');
});

test('source : chaque canal d\'origine du site a sa source CRM', () => {
  const attendu = {
    google: 'ORGANIC', bing: 'ORGANIC', 'autre-moteur': 'ORGANIC',
    pub: 'PAID',
    chatgpt: 'REFERRAL', perplexity: 'REFERRAL', gemini: 'REFERRAL', copilot: 'REFERRAL', claude: 'REFERRAL',
    'site-referent': 'REFERRAL',
    'reseau-social': 'SOCIAL',
    email: 'EMAIL_SOURCE',
    direct: 'DIRECT', inconnu: 'DIRECT',
  } as const;
  for (const [canal, source] of Object.entries(attendu)) {
    assert.equal(sourceDepuisCanal(canal as keyof typeof attendu), source, canal);
  }
});

test('source déduite de la visite : Google naturel, ChatGPT, réseau social, accès direct', () => {
  assert.equal(ctx('https://www.selectchateaux.com/', 'https://www.google.fr/').source, 'ORGANIC');
  assert.equal(ctx('https://www.selectchateaux.com/x?utm_source=chatgpt.com').source, 'REFERRAL');
  assert.equal(ctx('https://www.selectchateaux.com/', 'https://www.linkedin.com/').source, 'SOCIAL');
  assert.equal(ctx('https://www.selectchateaux.com/').source, 'DIRECT');
});

test('un lien interne n\'est pas un référent', () => {
  const c = ctx('https://www.selectchateaux.com/chateaux', 'https://www.selectchateaux.com/');
  assert.equal(c.referrer, undefined);
  assert.equal(c.source, 'DIRECT');
});

test('les textes trop longs sont coupés aux limites du schéma V2', () => {
  const long = 'a'.repeat(800);
  const c = ctx(`https://www.selectchateaux.com/${long}?utm_source=${long}&gclid=${long}`, `https://ex.com/${long}`);
  const p = payloadPageVue({ fingerprint: 'f'.repeat(300), sessionId: 's'.repeat(80), contexte: c, pathname: `/${long}`, pageTitle: long });
  const r = schemaV2.safeParse(p);
  assert.ok(r.success, JSON.stringify(r.error?.issues));
});

test('page sans titre ni référent : les champs vides ne sont pas envoyés', () => {
  const p = payloadPageVue({ fingerprint: 'fp', sessionId: null, contexte: ctx('https://www.selectchateaux.com/'), pathname: '/', pageTitle: '' });
  assert.ok(schemaV2.safeParse(p).success);
  assert.equal('pageTitle' in p, false);
  assert.equal('referrer' in p, false);
  assert.equal('gclid' in p, false);
});

test('lireSessionId lit { success, data: { sessionId } } et rien d\'autre', () => {
  assert.equal(lireSessionId({ success: true, data: { sessionId: 'cm1' } }), 'cm1');
  assert.equal(lireSessionId({ success: false }), null);
  assert.equal(lireSessionId({ sessionId: 'v1' }), null);
  assert.equal(lireSessionId(null), null);
  assert.equal(lireSessionId({ success: true, data: { sessionId: 42 } }), null);
});

test('paliers de scroll : chaque palier une seule fois par page', () => {
  const vus = new Set<number>();
  assert.deepEqual(paliersScrollAtteints(10, vus), []);
  assert.deepEqual(paliersScrollAtteints(55, vus), [25, 50]);
  assert.deepEqual(paliersScrollAtteints(60, vus), []);
  assert.deepEqual(paliersScrollAtteints(100, vus), [75, 100]);
});

test('seul le site public est suivi : ni localhost ni les préversions Vercel ne créent de visites', () => {
  assert.equal(estSiteSuivi('www.selectchateaux.com'), true);
  assert.equal(estSiteSuivi('selectchateaux.com'), true);
  assert.equal(estSiteSuivi('localhost'), false);
  assert.equal(estSiteSuivi('site-web-git-fix.vercel.app'), false);
  assert.equal(estSiteSuivi('selectchateaux.com.evil.io'), false);
  assert.equal(estSiteSuivi('crm.selectchateaux.com'), false);
});

test('régression : l\'origine du CRM est autorisée par la CSP du site (connect-src), sinon le navigateur bloque l\'envoi', () => {
  assert.equal(ORIGINE_CRM('https://crm.selectchateaux.com'), 'https://crm.selectchateaux.com');
  assert.equal(ORIGINE_CRM('https://crm.selectchateaux.com/'), 'https://crm.selectchateaux.com');
  assert.equal(ORIGINE_CRM('pas une url'), null);
  const middleware = readFileSync(new URL('../middleware.ts', import.meta.url), 'utf8');
  assert.match(middleware, /ORIGINE_CRM\(/, 'la CSP de production doit inclure ORIGINE_CRM(...) dans connect-src');
});

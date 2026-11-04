// Du côté du site, un refus du CRM ne se voyait nulle part : la demande restait
// dans la base et dans l'email, sans fiche, et personne n'était prévenu.
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { envoyerDemandeAuCrm } from './envoi-crm.ts';
import { getAlerteCrmTemplate } from './email.ts';

const URL_CRM = 'https://crm.example/api/leads';
const reponse = (status: number, corps = '') => new Response(corps, { status });

function essai(envoyer: typeof fetch) {
  const alertes: string[] = [];
  const resultat = envoyerDemandeAuCrm(URL_CRM, 's', { a: 1 }, async (m) => { alertes.push(m); return true; }, envoyer);
  return { resultat, alertes };
}

test('CRM accepte : aucune alerte', async () => {
  const { resultat, alertes } = essai(async () => reponse(201));
  assert.deepEqual(await resultat, { ok: true });
  assert.deepEqual(alertes, []);
});

test('CRM refuse : alerte avec le code et la réponse', async () => {
  const { resultat, alertes } = essai(async () => reponse(409, 'email déjà utilisé'));
  assert.equal((await resultat).ok, false);
  assert.equal(alertes.length, 1);
  assert.match(alertes[0], /409/);
  assert.match(alertes[0], /email déjà utilisé/);
});

test('CRM injoignable : alerte, et aucune exception qui casserait la demande', async () => {
  const { resultat, alertes } = essai(async () => { throw new Error('délai dépassé'); });
  assert.equal((await resultat).ok, false);
  assert.match(alertes[0], /délai dépassé/);
});

test('adresse ou secret absent : alerte, sans appel', async () => {
  let appels = 0;
  const alertes: string[] = [];
  const r = await envoyerDemandeAuCrm(undefined, 's', {}, async (m) => { alertes.push(m); return true; }, async () => { appels++; return reponse(201); });
  assert.equal(r.ok, false);
  assert.equal(appels, 0);
  assert.equal(alertes.length, 1);
});

test('alerte qui échoue à partir : la demande du prospect ne casse pas', async () => {
  const r = await envoyerDemandeAuCrm(URL_CRM, 's', {}, async () => { throw new Error('smtp'); }, async () => reponse(500));
  assert.equal(r.ok, false);
});

test('email d\'alerte : champs neutralisés, motif et contact présents', () => {
  const { html, text, subject } = getAlerteCrmTemplate(
    { id: 'abc', nom_prenom: '<script>x</script>', entreprise: 'Acme', email: 'a@b.fr', telephone_mobile: '01', nombre_participants: 30 } as never,
    'Le CRM a répondu 409 <img src=x>',
  );
  assert.equal(/<script|<img/i.test(html), false);
  assert.match(text, /409/);
  assert.match(text, /a@b\.fr/);
  assert.match(subject, /sans fiche CRM/);
});

test('délai dépassé : le motif prévient que la fiche existe peut-être', async () => {
  const delai = new Error('expiré'); delai.name = 'TimeoutError';
  const alertes: string[] = [];
  await envoyerDemandeAuCrm(URL_CRM, 's', {}, async (m) => { alertes.push(m); return true; }, async () => { throw delai; });
  assert.match(alertes[0], /peut-être/);
});

test('redirection : comptée comme un échec, sans la suivre', async () => {
  let options: RequestInit | undefined;
  const r = await envoyerDemandeAuCrm(URL_CRM, 's', {}, async () => true, async (_u, o) => { options = o; return reponse(307); });
  assert.equal(r.ok, false);
  assert.equal(options?.redirect, 'manual');
});

test('alerte refusée par le serveur d\'email (false) : la demande ne casse pas', async () => {
  const r = await envoyerDemandeAuCrm(URL_CRM, 's', {}, async () => false, async () => reponse(500));
  assert.equal(r.ok, false);
});

test('la route passe bien par l\'envoi surveillé', () => {
  const route = readFileSync(new URL('../app/api/devis/route.ts', import.meta.url), 'utf-8');
  assert.match(route, /envoyerDemandeAuCrm\(/);
  assert.match(route, /sendAlerteFicheCrmManquante\(newDevis, motif\)/);
  assert.equal(/fetch\(crmLeadsUrl/.test(route), false);
});

// Tests de la conversion Google Ads — `npx tsx --test src/lib/conversion-ads.test.ts`
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { CONVERSION_SEND_TO, envoyerConversionDevis, telephoneE164 } from './conversion-ads.ts';

function fausseBalise() {
  const appels: unknown[][] = [];
  return { appels, gtag: (...args: unknown[]) => { appels.push(args); } };
}
const demande = (id: string, consentement: 'oui' | 'non' | 'inconnu') => ({
  demandeId: id, email: ' Jeanne@Acme.fr ', telephone: '06 12 34 56 78', consentement,
});

test('la conversion porte le numéro de la demande', () => {
  const b = fausseBalise();
  assert.equal(envoyerConversionDevis(b.gtag, demande('c-1', 'non')), true);
  assert.deepEqual(b.appels, [
    ['event', 'conversion', { send_to: 'AW-18551949936/3rYLCJ-D7rEdEPCUoY5F', transaction_id: 'c-1' }],
  ]);
  assert.equal(CONVERSION_SEND_TO, 'AW-18551949936/3rYLCJ-D7rEdEPCUoY5F');
});

test('email et téléphone partent juste avant, et seulement si les cookies sont acceptés', () => {
  const oui = fausseBalise();
  envoyerConversionDevis(oui.gtag, demande('c-2', 'oui'));
  assert.deepEqual(oui.appels[0], ['set', 'user_data', { email: 'jeanne@acme.fr', phone_number: '+33612345678' }]);
  assert.equal(oui.appels[1][1], 'conversion');

  for (const [id, consentement] of [['c-3', 'non'], ['c-4', 'inconnu']] as const) {
    const b = fausseBalise();
    envoyerConversionDevis(b.gtag, demande(id, consentement));
    assert.equal(b.appels.length, 1);
    assert.equal(JSON.stringify(b.appels).includes('acme'), false);
    assert.equal(JSON.stringify(b.appels).includes('612345678'), false);
  }
});

test('une seule fois par demande', () => {
  const b = fausseBalise();
  assert.equal(envoyerConversionDevis(b.gtag, demande('c-5', 'non')), true);
  assert.equal(envoyerConversionDevis(b.gtag, demande('c-5', 'non')), false);
  assert.equal(b.appels.length, 1);
});

test('sans numéro de demande, pas de conversion : elle ne serait pas dédoublonnée', () => {
  const b = fausseBalise();
  assert.equal(envoyerConversionDevis(b.gtag, { ...demande('', 'oui') }), false);
  assert.equal(envoyerConversionDevis(b.gtag, { ...demande('x', 'oui'), demandeId: null }), false);
  assert.equal(b.appels.length, 0);
});

test('balise absente ou en panne : jamais d\'exception', () => {
  assert.equal(envoyerConversionDevis(undefined, demande('c-6', 'oui')), false);
  assert.doesNotThrow(() => envoyerConversionDevis(() => { throw new Error('bloqueur'); }, demande('c-7', 'non')));
  assert.equal(envoyerConversionDevis(() => { throw new Error('bloqueur'); }, demande('c-8', 'non')), false);
});

test('si seule la transmission des coordonnées échoue, la conversion part quand même', () => {
  const appels: unknown[] = [];
  const gtag = (...args: unknown[]) => {
    if (args[0] === 'set') throw new Error('panne');
    appels.push(args[1]);
  };
  assert.equal(envoyerConversionDevis(gtag, demande('c-9', 'oui')), true);
  assert.deepEqual(appels, ['conversion']);
});

test('téléphone au format international attendu par Google, sinon omis', () => {
  assert.equal(telephoneE164('06 12 34 56 78'), '+33612345678');
  assert.equal(telephoneE164('06.12.34.56.78'), '+33612345678');
  assert.equal(telephoneE164('+33 6 12 34 56 78'), '+33612345678');
  assert.equal(telephoneE164('0033612345678'), '+33612345678');
  assert.equal(telephoneE164('+32 470 12 34 56'), '+32470123456');
  assert.equal(telephoneE164('12345'), null);
  assert.equal(telephoneE164('appelez-moi au bureau'), null);
  const b = fausseBalise();
  envoyerConversionDevis(b.gtag, { ...demande('c-10', 'oui'), telephone: 'bureau' });
  assert.deepEqual(b.appels[0], ['set', 'user_data', { email: 'jeanne@acme.fr' }]);
});

// Garde-fous sur le branchement réel : une décision écrite n'est pas une décision appliquée.
const lire = (chemin: string) => readFileSync(new URL(`../${chemin}`, import.meta.url), 'utf8');

test('la balise Ads est configurée sous le Consent Mode, défauts toujours refusés', () => {
  const layout = lire('app/layout.tsx');
  const defaut = layout.indexOf("gtag('consent', 'default'");
  assert.ok(defaut >= 0);
  assert.ok(layout.indexOf("gtag('config', 'AW-18551949936')") > defaut);
  for (const signal of ['analytics_storage', 'ad_storage', 'ad_user_data', 'ad_personalization']) {
    assert.match(layout, new RegExp(`'${signal}': 'denied'`));
  }
});

test('accepter la bannière accorde les trois signaux publicitaires', () => {
  const banniere = lire('components/CookieConsent.tsx');
  const accepter = banniere.slice(banniere.indexOf('handleAccept'), banniere.indexOf('handleDecline'));
  for (const signal of ['ad_storage', 'ad_user_data', 'ad_personalization']) {
    assert.match(accepter, new RegExp(`${signal}: "granted"`));
  }
});

test('la CSP de production laisse passer les domaines documentés par Google pour Ads', () => {
  const mw = lire('middleware.ts');
  const prod = mw.slice(mw.indexOf('} else {'));
  const directive = (nom: string) => prod.split('\n').find((l) => l.includes(`${nom} 'self'`)) ?? '';
  for (const d of ['https://www.googletagmanager.com', 'https://www.googleadservices.com', 'https://www.google.com']) {
    assert.ok(directive('script-src').includes(d), `script-src ${d}`);
  }
  for (const d of [
    'https://www.googletagmanager.com', 'https://www.googleadservices.com', 'https://googleads.g.doubleclick.net',
    'https://pagead2.googlesyndication.com', 'https://www.google.com', 'https://www.google.fr', 'https://ad.doubleclick.net',
  ]) {
    assert.ok(directive('connect-src').includes(d), `connect-src ${d}`);
  }
  assert.ok(directive('frame-src').includes('https://www.googletagmanager.com'));
});

test('le formulaire n\'envoie la conversion qu\'après une réponse réussie', () => {
  const form = lire('components/DevisFormMini.tsx');
  const refus = form.indexOf('if (!response.ok)');
  assert.ok(refus >= 0);
  assert.ok(form.indexOf('envoyerConversionDevis(') > refus);
});

test('la mémorisation du clic tourne à chaque page, pas seulement au montage', () => {
  assert.match(lire('components/SiteTracker.tsx'), /memoriserClicAds\(\);\s*\}, \[pathname\]\)/);
});

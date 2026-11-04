// Tests du bloc « Source de la demande » de l'email d'admin.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { blocSourceHtml, blocSourceTexte, echapperHtml, lignesSourceDemande } from './source-demande.ts';
import { lireClicAds, lirePremierContact, parseClicAds } from './origine.ts';
import type { ClicAds } from './origine.ts';

const CLIC_LE = new Date('2026-11-04T13:12:00Z');
const ANNONCE = 'https://www.selectchateaux.com/chateaux/palais-royal-foret-chantilly'
  + '?utm_source=google&utm_medium=cpc&utm_campaign=oise-chantilly&utm_content=830458815022'
  + '&utm_term=ch%C3%A2teau+s%C3%A9minaire+oise&sc_match=e&sc_device=m&sc_adgroup=1&gclid=Cj0KCQ-complet';
const clic = (url = ANNONCE) => lireClicAds(url, CLIC_LE) as ClicAds;
const naturel = lirePremierContact('https://www.selectchateaux.com/blog/a', 'https://www.google.fr/', new Date('2026-10-28T10:00:00Z'));
const valeur = (lignes: [string, string][], cle: string) => lignes.find(([k]) => k === cle)?.[1];

test('demande Ads : toutes les informations en clair', () => {
  const l = lignesSourceDemande({ canal: 'pub', premierContact: naturel, clic: clic(), consentement: 'oui' });
  assert.equal(valeur(l, 'Canal'), 'Annonce Google Ads');
  assert.equal(valeur(l, 'Campagne'), 'Oise - Chantilly');
  assert.equal(valeur(l, 'Annonce'), 'Palais Royal (n° 830458815022)');
  assert.equal(valeur(l, 'Mot-clé'), 'château séminaire oise (exact)');
  assert.equal(valeur(l, 'Appareil'), 'Mobile');
  assert.equal(valeur(l, "Page d'arrivée"), '/chateaux/palais-royal-foret-chantilly');
  assert.equal(valeur(l, 'Clic du'), '04/11/2026 à 14:12', 'heure de Paris');
  assert.equal(valeur(l, 'Première visite'), '28/10/2026, Google (recherche naturelle)');
  assert.equal(valeur(l, 'GCLID'), 'Cj0KCQ-complet');
  assert.equal(valeur(l, 'Consentement'), 'Oui');
});

test('le nom de l\'annonce vient de la page d\'arrivée', () => {
  const nom = (page: string) => valeur(
    lignesSourceDemande({ canal: 'pub', premierContact: null, clic: { ...clic(), page, annonceId: '7' }, consentement: 'non' }),
    'Annonce',
  );
  assert.equal(nom('/chateaux/palais-royal-foret-chantilly'), 'Palais Royal (n° 7)');
  assert.equal(nom('/chateaux/manoir-anglo-normand-chantilly'), 'Manoir anglo-normand (n° 7)');
  assert.equal(nom('/chateaux/abbaye-millenaire-vallee-chevreuse'), 'Abbaye (organisation) (n° 7)');
  assert.equal(nom('/seminaire-vallee-de-chevreuse'), 'Abbaye (déconnexion) (n° 7)');
  assert.equal(nom('/autre-page'), 'n° 7');
});

test('correspondance et appareil traduits ; variantes iPhone du numéro de clic', () => {
  const avec = (c: Partial<ClicAds>) => lignesSourceDemande({ canal: 'pub', premierContact: null, clic: { ...clic(), ...c }, consentement: 'inconnu' });
  assert.equal(valeur(avec({ correspondance: 'p' }), 'Mot-clé'), 'château séminaire oise (expression)');
  assert.equal(valeur(avec({ correspondance: 'b' }), 'Mot-clé'), 'château séminaire oise (large)');
  assert.equal(valeur(avec({ appareil: 't' }), 'Appareil'), 'Tablette');
  assert.equal(valeur(avec({ appareil: 'c' }), 'Appareil'), 'Ordinateur');
  assert.equal(valeur(avec({ appareil: null }), 'Appareil'), 'Non renseigné');
  assert.equal(valeur(avec({}), 'Consentement'), 'Inconnu');
  const braid = avec({ gclid: null, gbraid: 'gb-1', wbraid: 'wb-1' });
  assert.equal(valeur(braid, 'GCLID'), undefined);
  assert.equal(valeur(braid, 'GBRAID'), 'gb-1');
  assert.equal(valeur(braid, 'WBRAID'), 'wb-1');
  assert.equal(valeur(lignesSourceDemande({ canal: 'pub', premierContact: null, clic: clic(), consentement: 'non' }), 'Première visite'), 'Inconnue');
  assert.equal(valeur(lignesSourceDemande({ canal: 'pub', premierContact: null, clic: clic(), consentement: 'non' }), 'Consentement'), 'Non');
});

test('sc_match=a : annonce sans mot-clé (AI Max)', () => {
  const ligne = (motCle: string | null) => valeur(
    lignesSourceDemande({ canal: 'pub', premierContact: null, clic: { ...clic(), motCle, correspondance: 'a' }, consentement: 'non' }),
    'Mot-clé',
  );
  assert.equal(ligne(null), 'sans mot-clé (AI Max)');
  assert.equal(ligne('château'), 'sans mot-clé (AI Max)');
});

test('demande hors Ads : canal, page d\'arrivée et première visite seulement', () => {
  const l = lignesSourceDemande({ canal: 'google', premierContact: naturel, clic: null, consentement: 'oui' });
  assert.deepEqual(l, [
    ['Canal', 'Google (recherche naturelle)'],
    ["Page d'arrivée", '/blog/a'],
    ['Première visite', '28/10/2026'],
  ]);
  assert.deepEqual(lignesSourceDemande({ canal: 'inconnu', premierContact: null, clic: null, consentement: 'inconnu' }), [
    ['Canal', 'Inconnue'],
    ["Page d'arrivée", 'Inconnue'],
    ['Première visite', 'Inconnue'],
  ]);
});

test('sécurité : du code placé dans l\'adresse ressort inerte dans l\'email', () => {
  const mot = '<script>alert(1)</script>';
  const img = '"><img src=x onerror=alert(1)>';
  const url = new URL('https://www.selectchateaux.com/x');
  url.searchParams.set('gclid', 'abc');
  url.searchParams.set('utm_term', mot);
  url.searchParams.set('utm_campaign', img);
  url.searchParams.set('utm_content', img);
  const c = clic(url.toString());
  const trafique = parseClicAds({ ...c, page: `/${img}` }) as ClicAds;
  for (const html of [
    blocSourceHtml(lignesSourceDemande({ canal: 'pub', premierContact: { ...naturel, page: mot }, clic: trafique, consentement: 'oui' })),
    blocSourceHtml(lignesSourceDemande({ canal: 'google', premierContact: { ...naturel, page: img }, clic: null, consentement: 'oui' })),
  ]) {
    assert.equal(/<script/i.test(html), false);
    assert.equal(/<img/i.test(html), false);
    assert.ok(html.includes('&lt;') || html.includes('&gt;'));
  }
  assert.ok(blocSourceHtml([['Mot-clé', mot]]).includes('&lt;script&gt;alert(1)&lt;/script&gt;'));
  assert.ok(blocSourceHtml([['Mot-clé', img]]).includes('&quot;&gt;&lt;img src=x onerror=alert(1)&gt;'));
});

test('echapperHtml neutralise aussi l\'esperluette et les guillemets', () => {
  assert.equal(echapperHtml(`a&b"c'd<e>`), 'a&amp;b&quot;c&#39;d&lt;e&gt;');
});

test('version texte : les valeurs restent lisibles, sous le même titre', () => {
  const texte = blocSourceTexte([['Canal', 'Annonce Google Ads'], ['Mot-clé', 'a & b']]);
  assert.equal(texte, 'SOURCE DE LA DEMANDE\nCanal : Annonce Google Ads\nMot-clé : a & b');
});

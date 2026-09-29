// Tests de validation des demandes de devis — `node --test src/lib/devis-schema.test.ts`
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { formSchema, chateauxDeLaDemande } from './devis-schema.ts';

// Exactement ce qu'envoie DevisFormMini depuis un article de blog ou une fiche
// lieu : aucun château n'est passé au composant, donc `chateauIds: []`.
const envoiDepuisUnArticle = {
  typeEvenement: 'seminaire',
  dateArrivee: '2026-11-12',
  dateDepart: '2026-11-13',
  duree: '1-jour',
  chateauIds: [],
  entreprise: 'Acme',
  nomPrenom: 'Jeanne Martin',
  email: 'jeanne@acme.fr',
  telephoneMobile: '0612345678',
  nombreParticipants: 30,
  nombreChambres: 1,
  budget: '',
  commentaireDeroulement: '',
  datesFlexibles: false,
  sourceLabel: 'Article : Murder party au château',
  sourcePage: '/blog/murder-party-chateau-activite-immersive',
};

test('une demande envoyée depuis un article (aucun château) est acceptée', () => {
  const r = formSchema.safeParse(envoiDepuisUnArticle);
  assert.equal(r.success, true, JSON.stringify(!r.success && r.error.issues));
});

test('une demande sans champ chateauIds du tout est acceptée', () => {
  const { chateauIds: _, ...sansChateaux } = envoiDepuisUnArticle;
  assert.equal(formSchema.safeParse(sansChateaux).success, true);
});

test('un groupe de moins de 10 personnes est accepté', () => {
  const r = formSchema.safeParse({ ...envoiDepuisUnArticle, nombreParticipants: 6 });
  assert.equal(r.success, true);
});

test('zéro participant reste refusé', () => {
  const r = formSchema.safeParse({ ...envoiDepuisUnArticle, nombreParticipants: 0 });
  assert.equal(r.success, false);
});

test('un email invalide reste refusé', () => {
  const r = formSchema.safeParse({ ...envoiDepuisUnArticle, email: 'pas-un-email' });
  assert.equal(r.success, false);
});

test('sans château choisi, la demande porte sur tous les châteaux (comme /devis)', () => {
  assert.deepEqual(chateauxDeLaDemande([], ['1', '2', '3', '4']), ['1', '2', '3', '4']);
});

test('un château choisi est conservé tel quel', () => {
  assert.deepEqual(chateauxDeLaDemande(['2'], ['1', '2', '3', '4']), ['2']);
});

test("l'entreprise est obligatoire", () => {
  assert.equal(formSchema.safeParse({ ...envoiDepuisUnArticle, entreprise: '' }).success, false);
  assert.equal(formSchema.safeParse({ ...envoiDepuisUnArticle, entreprise: '   ' }).success, false);
  const { entreprise: _, ...sansEntreprise } = envoiDepuisUnArticle;
  assert.equal(formSchema.safeParse(sansEntreprise).success, false);
});

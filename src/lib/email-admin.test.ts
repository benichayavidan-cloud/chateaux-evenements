// Test de l'email d'admin complet : tout ce qui vient du navigateur est neutralisé.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { getAdminEmailTemplate } from './email.ts';

type Devis = Parameters<typeof getAdminEmailTemplate>[0];
const SCRIPT = '<script>alert(1)</script>';
const IMG = '<img src=x onerror=alert(1)>';

test('email d\'admin : aucun champ saisi ne peut injecter de code', () => {
  const devis = {
    id: '12345678-aaaa', dates_souhaitees: '2026-12-01|2026-12-02', chateau_id: 'conseil',
    nom_prenom: SCRIPT, entreprise: IMG, email: `a"${IMG}@b.fr`, telephone_mobile: IMG,
    nombre_participants: 30, commentaire_deroulement: SCRIPT, dates_flexibles: false,
  } as unknown as Devis;
  const html = getAdminEmailTemplate(devis, SCRIPT, [['Mot-clé', `${SCRIPT}${IMG}`]]);
  assert.equal(/<script/i.test(html), false);
  assert.equal(/<img/i.test(html), false);
  assert.ok(html.includes('Source de la demande'));
  assert.ok(html.includes('&lt;script&gt;'));
});

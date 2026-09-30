// Tests des appels à l'action des articles — `node --test src/lib/cta-article.test.ts`
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { insererCtaMilieu, CIBLE_FORMULAIRE, evenementCta } from './cta-article.ts';

const p = (n: number) => Array.from({ length: n }, (_, i) => `<p>Paragraphe ${i + 1}.</p>`).join('');
const compte = (html: string) => (html.match(/data-cta="article-milieu"/g) ?? []).length;

test('le CTA de milieu se pose juste avant le h2 du milieu', () => {
  const html = `${p(2)}<h2 id="a">A</h2>${p(3)}<h2 id="b">B</h2>${p(3)}<h2 id="c">C</h2>${p(3)}<h2 id="d">D</h2>${p(3)}`;
  const out = insererCtaMilieu(html);
  assert.equal(compte(out), 1);
  // 4 titres : le CTA précède le 3ᵉ (indice 2), pas le premier ni le dernier.
  assert.ok(out.indexOf('data-cta="article-milieu"') < out.indexOf('<h2 id="c">'));
  assert.ok(out.indexOf('data-cta="article-milieu"') > out.indexOf('<h2 id="b">'));
});

test('le CTA renvoie vers le formulaire de la page, pas vers /devis', () => {
  const out = insererCtaMilieu(`${p(2)}<h2>A</h2>${p(2)}<h2>B</h2>${p(2)}`);
  assert.equal(CIBLE_FORMULAIRE, '#devis-express');
  assert.match(out, /href="#devis-express"/);
});

test("le CTA n'introduit aucun titre : le sommaire et le suivi de lecture restent intacts", () => {
  const out = insererCtaMilieu(`${p(2)}<h2>A</h2>${p(2)}<h2>B</h2>${p(2)}`);
  assert.equal((out.match(/<h[1-6]/g) ?? []).length, 2);
});

test('sans assez de titres, il se pose au paragraphe du milieu', () => {
  const out = insererCtaMilieu(p(8));
  assert.equal(compte(out), 1);
  assert.ok(out.indexOf('Paragraphe 4.') < out.indexOf('data-cta'));
  assert.ok(out.indexOf('data-cta') < out.indexOf('Paragraphe 5.'));
});

test('sans titres, il ne se glisse jamais dans une liste ou une citation', () => {
  const html = `${p(3)}<ul><li><p>Puce A.</p></li><li><p>Puce B.</p></li></ul><blockquote><p>Citation.</p></blockquote>${p(3)}`;
  const out = insererCtaMilieu(html);
  assert.equal(compte(out), 1);
  const pos = out.indexOf('data-cta');
  const avant = out.slice(0, pos);
  // Autant de <ul>/<blockquote> ouverts que fermés avant le CTA : il est au niveau du corps.
  assert.equal((avant.match(/<ul/g) ?? []).length, (avant.match(/<\/ul>/g) ?? []).length);
  assert.equal((avant.match(/<blockquote/g) ?? []).length, (avant.match(/<\/blockquote>/g) ?? []).length);
});

test("un article trop court n'en reçoit pas (le CTA du bas suffit)", () => {
  assert.equal(compte(insererCtaMilieu(p(3))), 0);
});

test("un article qui porte déjà le CTA n'en reçoit pas un second", () => {
  const une = insererCtaMilieu(p(8));
  assert.equal(compte(insererCtaMilieu(une)), 1);
});

test('clic suivi : les liens marqués data-cta deviennent CLICK_CTA avec leur libellé', () => {
  assert.deepEqual(evenementCta('#devis-express', 'barre-fixe-devis'), { type: 'CLICK_CTA', label: 'barre-fixe-devis' });
});

test('clic suivi : un lien vers /devis non marqué reste compté', () => {
  assert.deepEqual(evenementCta('/devis#formulaire', null), { type: 'CLICK_CTA', label: '/devis#formulaire' });
});

test("clic suivi : téléphone et liens ordinaires ne sont pas des CTA (le téléphone a son propre suivi)", () => {
  assert.equal(evenementCta('tel:+33757991146', null), null);
  assert.equal(evenementCta('/blog/murder-party', null), null);
});

// ── Page merci : plus de faux numéro de référence ──
// Jusqu'au 30/09/2026 le formulaire tirait un nombre au hasard (`?ref=…`) que la
// page affichait comme « Numéro de référence #DEV… ». Il n'existait nulle part :
// ni dans le CRM, ni dans les emails. Un client qui l'aurait cité n'aurait rien trouvé.
test("le formulaire n'invente plus de référence", () => {
  const src = readFileSync(new URL('../components/DevisFormMini.tsx', import.meta.url), 'utf8');
  assert.doesNotMatch(src, /merci\?ref=/);
  assert.doesNotMatch(src, /Math\.random/);
});

test('la page merci donne le téléphone et les étapes, sans numéro inventé', () => {
  const src = readFileSync(new URL('../app/devis/merci/MerciContent.tsx', import.meta.url), 'utf8');
  assert.doesNotMatch(src, /Numéro de référence|Math\.random|#DEV/);
  assert.match(src, /tel:\+33757991146/);
  assert.match(src, /24 h/);
});

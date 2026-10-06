// Tests du bloc « Où organiser » — `node --test src/lib/bloc-organiser.test.ts`
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { blocOrganiserHtml, insererApresIntro, messageDevisActivite } from './bloc-organiser.ts';

const LIEUX = [
  { slug: 'chateau-a', nom: 'Château <A>', ville: 'Chantilly', capacite: 120, chambres: 40 },
  { slug: 'domaine-b', nom: "Domaine d'Été", ville: null, capacite: 60, chambres: null },
];

test('le bloc liste les lieux, échappe les noms et porte les marqueurs du traceur', () => {
  const html = blocOrganiserHtml('murder party', LIEUX);
  assert.match(html, /Où organiser votre murder party \?/);
  assert.match(html, /href="\/lieux\/chateau-a" data-cta="article-organiser:chateau-a">Château &lt;A&gt;</);
  assert.match(html, /Domaine d&#39;Été/);
  assert.match(html, /Chantilly · jusqu&#39;à 120 pers\. · 40 chambres/);
  assert.match(html, /href="#devis-express" data-cta="article-organiser-devis"/);
  assert.doesNotMatch(html, /<h[23]/, 'aucun titre : le sommaire ne doit pas bouger');
});

test('le bloc se pose juste avant le premier h2, une seule fois', () => {
  const corps = '<p>Intro 1.</p><p>Intro 2.</p><h2 id="a">A</h2><p>x</p><h2 id="b">B</h2>';
  const bloc = blocOrganiserHtml('escape game', []);
  const une = insererApresIntro(corps, bloc);
  assert.equal(une.indexOf(bloc), corps.indexOf('<h2'));
  assert.equal(insererApresIntro(une, bloc), une);
});

test('sans h2, il se pose après le deuxième paragraphe', () => {
  const bloc = blocOrganiserHtml('atelier cuisine', []);
  const out = insererApresIntro('<p>1</p><p>2</p><p>3</p>', bloc);
  assert.equal(out, `<p>1</p><p>2</p>${bloc}<p>3</p>`);
});

test('le message du devis nomme l’activité', () => {
  assert.equal(messageDevisActivite('murder party', 'une'), 'Nous souhaitons organiser une murder party dans un lieu privatisé pour notre équipe.');
  assert.equal(messageDevisActivite('escape game', 'un'), 'Nous souhaitons organiser un escape game dans un lieu privatisé pour notre équipe.');
});

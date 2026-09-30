// Tests du choix des lieux affichés sous un article — `node --test src/lib/lieux-article.test.ts`
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { lieuxPourArticle, type LieuChoisissable } from './lieux-article.ts';

const lieu = (slug: string, dept: string, ville: string, capacite = 80, chambres: number | null = 20): LieuChoisissable =>
  ({ slug, nom: slug, ville, departementCode: dept, capacite, chambres });

const LIEUX: LieuChoisissable[] = [
  lieu('a-rambouillet', '78', 'Rambouillet'),
  lieu('b-versailles', '78', 'Versailles'),
  lieu('c-jouy', '78', 'Jouy-en-Josas'),
  lieu('d-poissy', '78', 'Poissy'),
  lieu('e-chantilly', '60', 'Chantilly'),
  lieu('f-gouvieux', '60', 'Gouvieux'),
  lieu('g-compiegne', '60', 'Compiègne'),
  lieu('h-meaux', '77', 'Meaux'),
  lieu('i-fontainebleau', '77', 'Fontainebleau'),
  lieu('j-petit', '91', 'Dourdan', 12, null),
  lieu('k-cergy', '95', 'Cergy'),
];

const slugs = (l: LieuChoisissable[]) => l.map((x) => x.slug);

test("article de zone : ses lieux viennent du département de son cluster", () => {
  const r = lieuxPourArticle({ slug: 'seminaire-yvelines', clusterId: 'yvelines', texte: '' }, LIEUX);
  assert.equal(r.length, 3);
  assert.ok(r.every((l) => l.departementCode === '78'), slugs(r).join());
});

test('les villes citées dans le texte passent devant', () => {
  const r = lieuxPourArticle(
    { slug: 'x', clusterId: 'yvelines', texte: 'Un séminaire à Rambouillet, puis une visite de Poissy.' },
    LIEUX,
  );
  assert.deepEqual(slugs(r).slice(0, 2).sort(), ['a-rambouillet', 'd-poissy']);
});

test('sans cluster, le département le plus cité dans le texte décide', () => {
  const texte = "L'Oise offre des forêts. Dans l'Oise, Senlis et Compiègne. Paris est proche.";
  const r = lieuxPourArticle({ slug: 'seminaire-nature', clusterId: null, texte }, LIEUX);
  assert.ok(r.length >= 2);
  assert.ok(r.every((l) => l.departementCode === '60'), slugs(r).join());
  assert.equal(r[0].slug, 'g-compiegne');
});

test('une seule mention de département ne suffit pas à trancher', () => {
  const r = lieuxPourArticle({ slug: 'discours-cloture', clusterId: null, texte: 'Un mot sur les Yvelines.' }, LIEUX);
  assert.ok(new Set(r.map((l) => l.departementCode)).size >= 2, 'sélection générale, plusieurs départements');
});

test("sélection générale : jamais de lieu trop petit pour un groupe (moins de 30 pers.)", () => {
  for (const s of ['a', 'b', 'c', 'd', 'e', 'f', 'g']) {
    const r = lieuxPourArticle({ slug: s, clusterId: null, texte: '' }, LIEUX);
    assert.ok(r.every((l) => l.capacite >= 30), `${s} → ${slugs(r).join()}`);
  }
});

test('stable pour un même article, variée d\'un article à l\'autre (le maillage se répartit)', () => {
  const un = slugs(lieuxPourArticle({ slug: 'article-un', clusterId: null, texte: '' }, LIEUX));
  assert.deepEqual(un, slugs(lieuxPourArticle({ slug: 'article-un', clusterId: null, texte: '' }, LIEUX)));
  const vus = new Set<string>();
  for (let i = 0; i < 30; i++) {
    for (const s of slugs(lieuxPourArticle({ slug: `article-${i}`, clusterId: null, texte: '' }, LIEUX))) vus.add(s);
  }
  assert.ok(vus.size >= 8, `seulement ${vus.size} lieux différents sur 30 articles`);
});

test('ni doublon ni dépassement du nombre demandé', () => {
  const r = lieuxPourArticle({ slug: 'x', clusterId: 'yvelines', texte: 'Rambouillet Rambouillet' }, LIEUX, 3);
  assert.equal(new Set(slugs(r)).size, r.length);
  assert.ok(r.length <= 3);
});

test('département trop peu fourni : complété sans sortir de la région, au lieu de rester vide', () => {
  const r = lieuxPourArticle({ slug: 'x', clusterId: 'val-d-oise', texte: '' }, LIEUX);
  assert.equal(r.length, 3);
  assert.equal(r[0].departementCode, '95');
});

// Le bilan compare pilote et témoin : un article dans les deux listes fausserait tout.
test('pilote et témoin : 21 et 20 articles, sans recouvrement ni doublon', async () => {
  const { ARTICLES_PILOTE_LIEUX, ARTICLES_TEMOIN_LIEUX } = await import('../data/pilote-lieux-articles.ts');
  assert.equal(ARTICLES_PILOTE_LIEUX.length, 21);
  assert.equal(ARTICLES_TEMOIN_LIEUX.length, 20);
  assert.equal(new Set(ARTICLES_PILOTE_LIEUX).size, 21);
  assert.ok(ARTICLES_TEMOIN_LIEUX.every((s: string) => !ARTICLES_PILOTE_LIEUX.includes(s)));
  assert.ok(ARTICLES_PILOTE_LIEUX.includes('murder-party-chateau-activite-immersive'));
});

// Site « châteaux » : sous un article, un château passe avant un hôtel de chaîne.
const MIXTE: LieuChoisissable[] = [
  lieu('best-western-parc', '60', 'Chantilly'),
  { ...lieu('chateau-a', '60', 'Senlis'), nom: 'Château de Montvillargenne' },
  { ...lieu('domaine-b', '60', 'Gouvieux'), nom: 'Domaine des Fontaines' },
  { ...lieu('aiden-hotel', '60', 'Compiègne'), nom: 'Aiden by Best Western' },
  { ...lieu('abbaye-c', '60', 'Pontpoint'), nom: 'Abbaye Royale du Moncel' },
  { ...lieu('mesnuls', '78', 'Les Mesnuls'), nom: 'Château des Mesnuls - Châteauform' },
];

test('les lieux de caractère (château, domaine, abbaye…) passent devant les hôtels de chaîne', () => {
  for (const s of ['a', 'b', 'c', 'd', 'e']) {
    const r = lieuxPourArticle({ slug: s, clusterId: 'oise', texte: '' }, MIXTE);
    assert.deepEqual(slugs(r).sort(), ['abbaye-c', 'chateau-a', 'domaine-b'], s);
  }
});

test("un lieu d'une marque concurrente (Châteauform) n'est jamais recommandé", () => {
  for (const s of ['a', 'b', 'c', 'd', 'e', 'f']) {
    const r = lieuxPourArticle({ slug: s, clusterId: 'yvelines', texte: 'Les Mesnuls' }, MIXTE);
    assert.ok(!slugs(r).includes('mesnuls'), s);
  }
});

test("une ville citée ne fait pas remonter un hôtel de chaîne devant les châteaux du département", () => {
  const r = lieuxPourArticle({ slug: 'x', clusterId: 'oise', texte: 'Séminaire à Chantilly et à Compiègne.' }, MIXTE);
  assert.ok(!slugs(r).includes('best-western-parc') && !slugs(r).includes('aiden-hotel'), slugs(r).join());
});

test('articles du même département : les trios varient (pas trois fois les mêmes lieux)', () => {
  const dept78 = Array.from({ length: 8 }, (_, i) => ({ ...lieu(`chateau-${i}`, '78', `Ville${i}`), nom: `Château ${i}` }));
  const trios = new Set<string>();
  for (let i = 0; i < 12; i++) {
    trios.add(slugs(lieuxPourArticle({ slug: `article-yvelines-${i}`, clusterId: 'yvelines', texte: '' }, dept78)).sort().join());
  }
  assert.ok(trios.size >= 5, `${trios.size} trios différents sur 12 articles`);
});

test("« Asnières-sur-Oise » compte pour le Val-d'Oise, pas pour l'Oise", () => {
  const r = lieuxPourArticle(
    { slug: 'x', clusterId: null, texte: "L'abbaye d'Asnières-sur-Oise. Retour à Asnières-sur-Oise, près de Royaumont." },
    LIEUX,
  );
  assert.equal(r[0].departementCode, '95');
});

test('deux mentions qui se suivent comptent deux fois', () => {
  const r = lieuxPourArticle({ slug: 'x', clusterId: null, texte: 'Yvelines Yvelines' }, LIEUX);
  assert.ok(r.every((l) => l.departementCode === '78'), slugs(r).join());
});

test('un nom accentué (« Prieuré ») est bien reconnu comme lieu de caractère', () => {
  const avecPrieure: LieuChoisissable[] = [
    { ...lieu('hotel-z', '78', 'Poissy'), nom: 'Hôtel Moderne' },
    { ...lieu('prieure-y', '78', 'Poissy'), nom: 'Le Prieuré' },
  ];
  assert.equal(lieuxPourArticle({ slug: 'a', clusterId: 'yvelines', texte: '' }, avecPrieure)[0].slug, 'prieure-y');
});

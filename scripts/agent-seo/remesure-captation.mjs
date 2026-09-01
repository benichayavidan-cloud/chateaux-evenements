#!/usr/bin/env node
/**
 * REMESURE — la structure d'un article prédit-elle sa captation par les IA ?
 *
 * Le 01/09/2026, la réponse mesurée était NON : entre articles bien captés,
 * marginaux et jamais captés, longueur, titres, FAQ, tableaux, prix et liens
 * internes étaient identiques (médianes 1721 / 1747 / 1795 mots).
 *
 * Mais la comparaison ne valait rien : les 284 articles partageaient le même
 * défaut — FAQ balisée jamais affichée, aucune ancre dans le HTML servi. On ne
 * mesurait l'effet d'aucun levier actionné. Le gabarit a été corrigé le jour
 * même ; il faut donc REFAIRE la mesure sur un corpus qui fonctionne, après
 * 6 à 8 semaines d'exposition (soit à partir de la mi-octobre 2026).
 *
 * Ce script rejoue exactement le même protocole. Il ne conclut pas à votre
 * place : il sort les médianes par groupe, à comparer à la ligne « 01/09 ».
 *
 *   node remesure-captation.mjs <export-gsc-pages.csv>
 *
 * L'export attendu est celui de Search Console → Performances → Fonctionnalités
 * IA génératives → onglet Pages, en CSV (colonnes : URL, Impressions).
 */

import { readFileSync } from 'node:fs';
import { execSync } from 'node:child_process';

const SITEMAP = 'https://www.selectchateaux.com/sitemap.xml';
const ECHANTILLON_NON_CAPTES = 45;

/** Référence du 01/09/2026, avant correction du gabarit. */
const BASELINE = {
  date: '2026-09-01',
  medianes: { bienCaptes: 1721, marginaux: 1747, jamaisCaptes: 1795 },
  tauxCaptation: 0.20,
  verdict: 'aucun écart — mais gabarit défectueux, mesure non concluante',
};

const get = (url) => execSync(`curl -s --max-time 25 ${JSON.stringify(url)}`, { encoding: 'utf8', maxBuffer: 32 * 1024 * 1024 });

function mediane(xs) {
  if (!xs.length) return null;
  const t = [...xs].sort((a, b) => a - b);
  return t[Math.floor(t.length / 2)];
}

/** Mesures structurelles d'une page, telles que servies (sans exécuter de JS). */
function mesurer(html) {
  const sansScript = html.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, '');
  const texte = sansScript.replace(/<[^>]+>/g, ' ');
  return {
    mots: texte.split(/\s+/).filter((m) => m.length > 1).length,
    h2: (sansScript.match(/<h2/g) || []).length,
    h3: (sansScript.match(/<h3/g) || []).length,
    tableaux: (sansScript.match(/<table/g) || []).length,
    questions: (html.match(/"@type":"Question"/g) || []).length,
    ancres: (html.match(/<h[23][^>]*\sid="/g) || []).length,
    euros: (texte.match(/[0-9][0-9\s]*\s?€/g) || []).length,
    liensInternes: new Set(html.match(/href="\/[a-z0-9/-]+"/g) || []).size,
  };
}

const csv = process.argv[2];
if (!csv) {
  console.error('Usage : node remesure-captation.mjs <export-gsc-pages.csv>');
  process.exit(1);
}

// 1. Pages captées, depuis l'export GSC
const captees = new Map();
for (const ligne of readFileSync(csv, 'utf8').split('\n').slice(1)) {
  const m = ligne.match(/^(https?:\/\/[^,]+),(\d+)/);
  if (m) captees.set(m[1], Number(m[2]));
}

// 2. Échantillon d'articles jamais captés, tiré du sitemap
const toutesUrls = [...get(SITEMAP).matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const articles = toutesUrls.filter((u) => u.includes('/blog/'));
const jamais = articles.filter((u) => !captees.has(u));
const echantillon = jamais.sort(() => Math.random() - 0.5).slice(0, ECHANTILLON_NON_CAPTES);

console.log(`${captees.size} pages captées · ${jamais.length} articles jamais captés (échantillon de ${echantillon.length})`);
console.log(`taux de captation du corpus blog : ${Math.round(((articles.length - jamais.length) / articles.length) * 100)} % (01/09 : ${BASELINE.tauxCaptation * 100} %)\n`);

// 3. Mesure
const groupes = { bienCaptes: [], marginaux: [], jamaisCaptes: [] };
const cibles = [
  ...[...captees].filter(([u]) => u.includes('/blog/')).map(([u, n]) => [u, n]),
  ...echantillon.map((u) => [u, 0]),
];

for (const [url, imp] of cibles) {
  const html = get(url);
  if (!html) continue;
  const m = mesurer(html);
  const g = imp >= 4 ? 'bienCaptes' : imp >= 1 ? 'marginaux' : 'jamaisCaptes';
  groupes[g].push(m);
}

// 4. Restitution — les médianes, à comparer à la baseline
const CHAMPS = ['mots', 'h2', 'h3', 'tableaux', 'questions', 'ancres', 'euros', 'liensInternes'];
console.log('métrique'.padEnd(15) + 'bien captés'.padStart(13) + 'marginaux'.padStart(12) + 'jamais captés'.padStart(15));
for (const c of CHAMPS) {
  const l = ['bienCaptes', 'marginaux', 'jamaisCaptes'].map((g) => String(mediane(groupes[g].map((x) => x[c])) ?? '—'));
  console.log(c.padEnd(15) + l[0].padStart(13) + l[1].padStart(12) + l[2].padStart(15));
}
console.log('n'.padEnd(15) + String(groupes.bienCaptes.length).padStart(13) + String(groupes.marginaux.length).padStart(12) + String(groupes.jamaisCaptes.length).padStart(15));

console.log(`\nRappel ${BASELINE.date} — mots : ${BASELINE.medianes.bienCaptes} / ${BASELINE.medianes.marginaux} / ${BASELINE.medianes.jamaisCaptes}`);
console.log(`Verdict d'alors : ${BASELINE.verdict}`);
console.log(`\nÀ conclure : un écart NET sur « mots », « h3 » ou « questions » entre bien captés
et jamais captés signifie que le levier éditorial agit enfin. Des médianes à
nouveau identiques signifient que le tri se fait ailleurs (demande du sujet,
autorité) — et qu'il ne sert à rien d'allonger les articles.`);

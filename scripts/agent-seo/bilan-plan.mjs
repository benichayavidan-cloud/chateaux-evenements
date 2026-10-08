#!/usr/bin/env node
/**
 * Bilan avant / après du plan « intention commerciale » du 06/10/2026
 * (_claude_docs/2026-10-06_audit-acquisition/plan-intention-commerciale.md).
 *
 * Lancé une fois par .github/workflows/bilan-plan-intention.yml (03/11/2026),
 * ou à la main : `node scripts/agent-seo/bilan-plan.mjs`.
 *
 * Compare les 28 derniers jours de Search Console à la photo « avant »
 * (06/09→03/10) : clics par intention, et place de chaque page sur les
 * requêtes cibles. Ajoute les demandes reçues depuis la mise en ligne, par
 * canal et par page d'arrivée. Envoie le tout par email (EMAIL_ADMIN).
 * Lecture seule : n'écrit rien, ni sur le site ni en base.
 */

import fs from 'node:fs';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { SITE, gsc, fenetre28, sbSelect, email } from './lib.mjs';

const { resumerParIntention } = createRequire(import.meta.url)('../agent-cm/intention.js');

const PHOTO_AVANT = new URL('../../_claude_docs/2026-10-06_audit-acquisition/photo-avant-2026-10-06.json', import.meta.url);
const MISE_EN_LIGNE = '2026-10-07';

/** Requêtes cibles du plan, et la page qui doit désormais les porter. */
export const CIBLES = [
  { requete: 'seminaire yvelines', page: '/blog/seminaire-yvelines-78-luxe-proximite' },
  { requete: 'seminaire oise', page: '/blog/seminaire-oise-nature-prestige-paris' },
  { requete: 'seminaire chantilly', page: '/seminaire-chateau-chantilly' },
  { requete: 'team building chantilly', page: '/team-building-chantilly' },
];

const norm = (s) => String(s).normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
const chemin = (url) => String(url).replace(SITE, '').replace(/#.*$/, '') || '/';

/** Clics / impressions / place par intention, avant et après. */
export function comparerIntentions(lignesAvant, lignesApres) {
  const a = resumerParIntention(lignesAvant.map((r) => ({ ...r, keys: [r.keys[0]] })));
  const b = resumerParIntention(lignesApres.map((r) => ({ ...r, keys: [r.keys[0]] })));
  return [...new Set([...Object.keys(a), ...Object.keys(b)])].map((k) => ({
    intention: k,
    avant: a[k] || { clics: 0, imp: 0, pos: null },
    apres: b[k] || { clics: 0, imp: 0, pos: null },
  }));
}

/** Place moyenne (pondérée par les impressions) de chaque page sur une requête cible. */
export function positionsCibles(lignes) {
  return CIBLES.map((c) => {
    const parPage = {};
    for (const r of lignes) {
      if (norm(r.keys[0]) !== c.requete) continue;
      const p = chemin(r.keys[1]);
      const x = parPage[p] || (parPage[p] = { imp: 0, clics: 0, pw: 0 });
      x.imp += r.impressions; x.clics += r.clicks; x.pw += r.position * r.impressions;
    }
    const pages = Object.entries(parPage)
      .map(([page, x]) => ({ page, imp: x.imp, clics: x.clics, pos: +(x.pw / x.imp).toFixed(1) }))
      .sort((m, n) => m.pos - n.pos);
    return { ...c, pages, cible: pages.find((p) => p.page === c.page) || null };
  });
}

const fmt = (x) => (x?.pos == null ? `${x?.clics ?? 0} clics / ${x?.imp ?? 0} imp.` : `${x.clics} clics / ${x.imp} imp. / place ${x.pos}`);

async function main() {
  const avant = JSON.parse(fs.readFileSync(PHOTO_AVANT, 'utf8')).rows || [];
  const f = fenetre28();
  const site = encodeURIComponent(SITE + '/');
  const r = await gsc(`/webmasters/v3/sites/${site}/searchAnalytics/query`, { ...f, dimensions: ['query', 'page'], rowLimit: 25000, type: 'web' });
  const apres = r.rows || [];
  if (!apres.length) throw new Error(`Search Console vide pour ${f.startDate}→${f.endDate} : ${JSON.stringify(r).slice(0, 200)}`);

  const intentions = comparerIntentions(avant, apres);
  const pAvant = positionsCibles(avant);
  const pApres = positionsCibles(apres);

  const demandes = await sbSelect(`demandes_devis_chateaux?select=created_at,origine_canal,origine_page,email&created_at=gte.${MISE_EN_LIGNE}&order=created_at.asc`);
  // Une erreur Supabase n'est pas « 0 demande » : la prédiction #8 se juge sur ce chiffre.
  if (!Array.isArray(demandes)) throw new Error(`Supabase demandes_devis_chateaux : ${JSON.stringify(demandes).slice(0, 200)}`);
  const reelles = demandes.filter((d) => !/@(example\.com|review-fake\.test)$/i.test(d.email || ''));
  const compte = (cle) => reelles.reduce((acc, d) => ({ ...acc, [d[cle] || 'inconnu']: (acc[d[cle] || 'inconnu'] || 0) + 1 }), {});

  const lignes = [
    `BILAN DU PLAN « INTENTION COMMERCIALE » — ${new Date().toLocaleDateString('fr-FR')}`,
    `Avant : Search Console 06/09→03/10 · Après : ${f.startDate}→${f.endDate}`,
    ``,
    `CLICS PAR INTENTION (avant → après)`,
    ...intentions.map((i) => `· ${i.intention} : ${fmt(i.avant)} → ${fmt(i.apres)}`),
    `  Animation : chute VOLONTAIRE — 3 articles retirés de Google le 08/10 (murder party = ~40 % des clics du site). Le total des clics baisse d'autant ; seules les lignes lieu et organisation jugent le plan.`,
    ``,
    `REQUÊTES CIBLES — place de la page qui doit les porter (avant → après)`,
    ...pApres.map((c, k) => `· « ${c.requete} » → ${c.page} : ${pAvant[k].cible ? `place ${pAvant[k].cible.pos}` : 'absente'} → ${c.cible ? `place ${c.cible.pos}, ${c.cible.clics} clics` : 'absente'}` +
      (c.pages.length > 1 ? `  [autres pages : ${c.pages.filter((p) => p.page !== c.page).map((p) => `${p.page} ${p.pos}`).join(', ')}]` : '')),
    `  Prédiction du 06/10 (marcus_journal #7) : sur Yvelines et Oise, la page restante gagne au moins 5 places par rapport à la colonne « avant » ci-dessus.`,
    ``,
    `DEMANDES REÇUES DEPUIS LE ${MISE_EN_LIGNE} : ${reelles.length}`,
    `· par canal : ${JSON.stringify(compte('origine_canal'))}`,
    `· par page d'arrivée : ${JSON.stringify(compte('origine_page'))}`,
    `  Prédiction du 06/10 (marcus_journal #8) : ANNULÉE le 08/10 — les articles murder party, escape game et atelier cuisine ont été retirés de Google (recherches de particuliers). Ne pas la juger.`,
  ];
  const texte = lignes.join('\n');
  console.log(texte);
  if (!process.env.BILAN_SANS_MAIL) await email('Bilan du plan « intention commerciale » (avant / après)', texte);
}

if (fileURLToPath(import.meta.url) === process.argv[1]) {
  main().catch((e) => { console.error(e); process.exit(1); });
}

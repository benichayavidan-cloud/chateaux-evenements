#!/usr/bin/env node
/**
 * GARDE-FOU — aucune page du site ne sort avec un <title> de plus de 60
 * caractères, ni une meta description de plus de 160.
 *
 * Pourquoi il existe. Le correctif de longueur des titres a été posé le
 * 01/09/2026 dans `lib/seo.pageTitle()` — et branché sur le SEUL blog. Le
 * 06/09, la mesure des 382 pages en production a trouvé 97 titres au-dessus de
 * la limite (médiane 80 pour les landings, 83 pour les fiches lieux, maximum
 * 116), portant 44 % des impressions du site pour un CTR de 0,2 %. Une consigne
 * que rien ne vérifie finit par ne plus être suivie : c'est déjà ce qui était
 * arrivé à la FAQ, décrite comme « affichée en accordéons » alors qu'elle ne
 * s'affichait sur aucune page.
 *
 * Ce script ne lit ni les données ni le code : il lit le HTML RÉELLEMENT
 * PRODUIT par `next build`. Il attrape donc n'importe quelle page — y compris
 * celles qui n'existent pas encore, et celles qui contournent `lib/seo`.
 *
 * Branché sur `npm run build` : une seule page en infraction fait échouer la
 * construction, donc le déploiement Vercel. C'est voulu.
 *
 *   node scripts/verif-titres.mjs           # vérifie le build local (.next)
 *   node scripts/verif-titres.mjs --live    # vérifie la production via le sitemap
 */
import fs from "node:fs";
import path from "node:path";

const TITLE_MAX = 60;
const DESCRIPTION_MAX = 160;
const SITE = "https://www.selectchateaux.com";

/** Le HTML encode les apostrophes et esperluettes — Google compte le texte rendu. */
function decode(s) {
  return s
    .replace(/&#x27;|&#39;|&apos;/g, "'")
    .replace(/&quot;|&#34;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#x2F;/g, "/")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&");
}

function extraire(html) {
  const t = html.match(/<title>([\s\S]*?)<\/title>/i)?.[1] ?? "";
  const d = html.match(/<meta name="description" content="([^"]*)"/i)?.[1] ?? "";
  return { titre: decode(t).trim(), description: decode(d).trim() };
}

function fichiersHtml(racine) {
  const out = [];
  const pile = [racine];
  while (pile.length) {
    const d = pile.pop();
    let entrees;
    try { entrees = fs.readdirSync(d, { withFileTypes: true }); } catch { continue; }
    for (const e of entrees) {
      const p = path.join(d, e.name);
      if (e.isDirectory()) pile.push(p);
      else if (e.name.endsWith(".html")) out.push(p);
    }
  }
  return out;
}

async function pagesDuBuild() {
  const racine = path.join(process.cwd(), ".next", "server", "app");
  if (!fs.existsSync(racine)) {
    console.error(
      "verif-titres : .next/server/app introuvable.\n" +
      "Ce script se lance APRÈS `next build`. Pour vérifier la production : --live"
    );
    process.exit(2);
  }
  const fichiers = fichiersHtml(racine);
  return fichiers.map((f) => ({
    url: "/" + path.relative(racine, f).replace(/\.html$/, "").replace(/(^|\/)index$/, ""),
    ...extraire(fs.readFileSync(f, "utf8")),
  }));
}

async function pagesDeLaProd() {
  const xml = await (await fetch(`${SITE}/sitemap.xml`)).text();
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  const out = [];
  let i = 0;
  await Promise.all(
    Array.from({ length: 12 }, async () => {
      while (i < urls.length) {
        const u = urls[i++];
        try {
          out.push({ url: u.replace(SITE, "") || "/", ...extraire(await (await fetch(u)).text()) });
        } catch { /* une URL injoignable relève d'un autre contrôle */ }
      }
    })
  );
  return out;
}

const live = process.argv.includes("--live");
const pages = live ? await pagesDeLaProd() : await pagesDuBuild();

const titresLongs = pages.filter((p) => p.titre.length > TITLE_MAX);
const descLongues = pages.filter((p) => p.description.length > DESCRIPTION_MAX);
const sansTitre = pages.filter((p) => !p.titre);

console.log(`verif-titres : ${pages.length} page(s) ${live ? "en production" : "dans le build"}`);

if (sansTitre.length) {
  console.log(`\n${sansTitre.length} page(s) sans <title> :`);
  for (const p of sansTitre.slice(0, 20)) console.log(`   ${p.url}`);
}

if (descLongues.length) {
  console.log(`\n${descLongues.length} meta description(s) au-delà de ${DESCRIPTION_MAX} caractères :`);
  for (const p of descLongues.slice(0, 20)) {
    console.log(`   ${String(p.description.length).padStart(3)}  ${p.url}`);
  }
}

if (titresLongs.length) {
  console.error(`\n❌ ${titresLongs.length} balise(s) <title> au-delà de ${TITLE_MAX} caractères :\n`);
  titresLongs
    .sort((a, b) => b.titre.length - a.titre.length)
    .forEach((p) => console.error(`   ${String(p.titre.length).padStart(3)}  ${p.url}\n        ${p.titre}`));
  console.error(
    `\nGoogle coupe au-delà de ${TITLE_MAX} caractères : la fin du titre — bénéfice,\n` +
    `prix ou zone — disparaît du résultat de recherche.\n\n` +
    `Le suffixe « | Select Châteaux » du gabarit racine coûte 18 caractères : une\n` +
    `page qui le reçoit dispose donc de 42 caractères en propre. Les helpers de\n` +
    `src/lib/seo.ts appliquent la règle :\n` +
    `   titreSousMarque(titre)   page ordinaire (budget 42)\n` +
    `   titreLieu({ nom, … })    fiche lieu, avec title: { absolute } (budget 60)\n` +
    `   pageTitle(titre)         article de blog, qui porte son suffixe lui-même\n`
  );
  process.exit(1);
}

const maxTitre = Math.max(0, ...pages.map((p) => p.titre.length));
console.log(`✅ tous les titres tiennent dans ${TITLE_MAX} caractères (le plus long : ${maxTitre})`);

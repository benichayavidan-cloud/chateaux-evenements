#!/usr/bin/env node
/**
 * GARDE-FOU — aucune meta description ne se termine sur un fait amputé.
 *
 * Pourquoi il existe. Mesuré le 20/09/2026 sur le build : 333 pages sur 387
 * sortaient tronquées, et 83 d'entre elles coupaient en plein milieu d'un fait.
 * « Le lieu dispose de 19 chambres, 3… », « tarifs dès… », « À 35 min de… ».
 *
 * Ce n'est pas cosmétique. Le prix et la distance sont les deux seuls éléments
 * qui déclenchent un clic sur une requête de séminaire, et ils sont toujours en
 * fin de phrase : `metaDescription()` les décapitait systématiquement. Sur la
 * période du 19/06 au 17/09/2026, le site a servi 25 084 impressions pour 300
 * clics — un taux de 1,20 %. Les pages concernées portaient l'essentiel du
 * manque : /blog/seminaire-storytelling… était en 3ᵉ position, avec 224
 * impressions et ZÉRO clic, pour une description finissant sur « tarifs dès… ».
 *
 * Comme `verif-titres.mjs`, ce script ne lit ni les données ni le code : il lit
 * le HTML RÉELLEMENT PRODUIT par `next build`. Il attrape donc les pages qui
 * contournent `lib/seo`, et celles qui n'existent pas encore.
 *
 *   node scripts/verif-descriptions.mjs          # le build local (.next)
 *   node scripts/verif-descriptions.mjs --live   # la production via le sitemap
 */
import fs from "node:fs";
import path from "node:path";

const SITE = "https://www.selectchateaux.com";
const DESCRIPTION_MIN = 70;

/**
 * Fin de description qui annonce un fait sans le dire : nombre nu, préposition
 * ou connecteur orphelin, unité sans valeur, parenthèse restée ouverte.
 * Doit rester alignée sur FIN_AMPUTEE dans src/lib/seo.ts.
 */
const FIN_AMPUTEE =
  /(?:^|[\s(])(?:\d+[\d\s.,]*|d[eèé]s?|du|des|au|aux|à|en|et|ou|par|pour|sur|sous|avec|sans|dans|vers|entre|jusqu['’]?|depuis|selon|soit|dont|que|qui|environ|plus|moins|min|h|km|€)…?$|\($/i;

function decode(s) {
  return s
    .replace(/&#x27;|&#39;|&apos;/g, "'")
    .replace(/&quot;|&#34;/g, '"')
    .replace(/&lt;/g, "<").replace(/&gt;/g, ">")
    .replace(/&#x2F;/g, "/").replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&");
}

const extraire = (html) =>
  decode(html.match(/<meta name="description" content="([^"]*)"/i)?.[1] ?? "").trim();

function fichiersHtml(racine) {
  const out = [], pile = [racine];
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

function pagesDuBuild() {
  const racine = path.join(process.cwd(), ".next", "server", "app");
  if (!fs.existsSync(racine)) {
    console.error(
      "verif-descriptions : .next/server/app introuvable.\n" +
      "Ce script se lance APRÈS `next build`. Pour la production : --live"
    );
    process.exit(2);
  }
  return fichiersHtml(racine).map((f) => ({
    url: "/" + path.relative(racine, f).replace(/\.html$/, "").replace(/(^|\/)index$/, ""),
    description: extraire(fs.readFileSync(f, "utf8")),
  }));
}

async function pagesDeLaProd() {
  const xml = await (await fetch(`${SITE}/sitemap.xml`)).text();
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  const out = [];
  let i = 0;
  await Promise.all(Array.from({ length: 12 }, async () => {
    while (i < urls.length) {
      const u = urls[i++];
      try { out.push({ url: u.replace(SITE, "") || "/", description: extraire(await (await fetch(u)).text()) }); }
      catch { /* une URL injoignable relève d'un autre contrôle */ }
    }
  }));
  return out;
}

const live = process.argv.includes("--live");
const pages = live ? await pagesDeLaProd() : pagesDuBuild();
const avecDesc = pages.filter((p) => p.description);

console.log(`verif-descriptions : ${pages.length} page(s) ${live ? "en production" : "dans le build"}`);

const courtes = avecDesc.filter((p) => p.description.length < DESCRIPTION_MIN);
if (courtes.length) {
  console.log(`\n${courtes.length} description(s) sous ${DESCRIPTION_MIN} caractères :`);
  for (const p of courtes.slice(0, 15)) console.log(`   ${String(p.description.length).padStart(3)}  ${p.url}`);
}

/**
 * Une phrase qui se termine par un point est FINIE, même si le dernier mot est
 * un nombre : « …coûte entre 95 € et 280 € par personne en 2026. » se lit très
 * bien. Seules deux fins trahissent une coupe : les points de suspension, et
 * l'absence de toute ponctuation finale.
 */
const coupee = (d) => /…\s*$/.test(d) || !/[.!?»)]\s*$/.test(d);
const amputees = avecDesc.filter(
  (p) => coupee(p.description) && FIN_AMPUTEE.test(p.description.replace(/…\s*$/, "").trim()),
);
if (amputees.length) {
  console.error(`\n❌ ${amputees.length} description(s) se terminent sur un fait amputé :\n`);
  for (const p of amputees.slice(0, 30)) {
    console.error(`   ${p.url}\n        …${p.description.slice(-64)}`);
  }
  console.error(
    `\nCe que Google affiche s'arrête au milieu d'un chiffre ou d'une préposition.\n` +
    `Le prix et la distance — les deux éléments qui font cliquer — sont toujours\n` +
    `en fin de phrase : une coupe aveugle les décapite.\n\n` +
    `Composer la description pour qu'elle TIENNE, au lieu de la tronquer après :\n` +
    `   descriptionLieu(v)          fiche lieu — dégrade les équipements, jamais\n` +
    `                               la capacité ni « Devis sous 48 h »\n` +
    `   metaDescription(texte)      cas général — coupe à la phrase, et recule\n` +
    `                               tant que la fin annonce un fait sans le dire\n`
  );
  process.exit(1);
}

console.log(`✅ aucune description ne s'arrête sur un fait amputé (${avecDesc.length} vérifiées)`);

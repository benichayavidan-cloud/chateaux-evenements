#!/usr/bin/env node
/**
 * GARDE-FOU — aucun article ne doit dépendre du seul blog pour être découvert.
 *
 * CE QU'IL VÉRIFIE : chaque article publié reçoit au moins un lien depuis une
 * page HORS /blog — fiche lieu, landing, accueil. Ces pages-là sont celles que
 * Googlebot repasse voir.
 *
 * POURQUOI. Mesuré le 06/09/2026 sur le HTML produit par `next build` :
 *
 *   - 124 des 284 articles n'avaient qu'UN lien entrant, et c'était la
 *     pagination de /blog (103) ou l'index /blog (21) ;
 *   - les pages /blog/page/2..8 ne figurent pas au sitemap ;
 *   - /blog n'avait pas été crawlé depuis le 20/08 ;
 *   - les 72 fiches lieux ne liaient AUCUN article — zéro sur 72 ;
 *   - au total, 16 articles sur 284 étaient atteignables depuis une page
 *     fréquemment crawlée.
 *
 *   En regard : l'âge médian du dernier passage de Googlebot est de 6 jours sur
 *   les fiches lieux et les landings, contre 36 jours sur le blog — 19 articles
 *   n'avaient jamais été vus. Un article que seule la pagination du blog
 *   désigne est, en pratique, invisible.
 *
 * COMME POUR LES TITRES, il lit le HTML RÉELLEMENT PRODUIT, pas les données ni
 * le code : il attrape donc n'importe quelle régression, y compris celle qui
 * viendrait d'un composant supprimé par mégarde.
 *
 *   node scripts/verif-maillage.mjs           # sur le build local
 *   node scripts/verif-maillage.mjs --live    # sur la production
 */
import fs from "node:fs";
import path from "node:path";

const SITE = "https://www.selectchateaux.com";

/**
 * Isole le contenu de la page : sans le pied de page (identique partout, donc
 * sans valeur de découverte), sans la navigation, et sans la charge RSC que
 * Next inscrit en fin de document.
 */
function contenu(html) {
  let s = html;
  const i = s.indexOf("<footer");
  const j = s.indexOf("</footer>");
  if (i >= 0 && j > i) s = s.slice(0, i) + s.slice(j + "</footer>".length);
  s = s.replace(/<nav[\s\S]*?<\/nav>/g, " ");
  const k = s.indexOf("__next_f");
  if (k >= 0) {
    const debutScript = s.lastIndexOf("<script", k);
    if (debutScript >= 0) s = s.slice(0, debutScript);
  }
  return s;
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
    console.error("verif-maillage : .next/server/app introuvable. Ce script se lance APRÈS `next build`.");
    process.exit(2);
  }
  return fichiersHtml(racine).map((f) => ({
    url: "/" + path.relative(racine, f).replace(/\.html$/, "").replace(/(^|\/)index$/, ""),
    html: fs.readFileSync(f, "utf8"),
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
      try { out.push({ url: u.replace(SITE, "") || "/", html: await (await fetch(u)).text() }); } catch { /* couvert ailleurs */ }
    }
  }));
  return out;
}

const live = process.argv.includes("--live");
const pages = await (live ? pagesDeLaProd() : pagesDuBuild());

const articles = new Set(
  pages.map((p) => p.url)
    .filter((u) => u.startsWith("/blog/") && !u.startsWith("/blog/page"))
    .map((u) => u.slice("/blog/".length))
);

/** Pour chaque article, les pages HORS /blog qui le désignent. */
const depuisPagesFraiches = new Map([...articles].map((a) => [a, new Set()]));
for (const p of pages) {
  if (p.url.startsWith("/blog")) continue;
  const c = contenu(p.html);
  for (const m of c.matchAll(/href="\/blog\/([a-z0-9-]+)"/g)) {
    const cible = depuisPagesFraiches.get(m[1]);
    if (cible) cible.add(p.url);
  }
}

const orphelins = [...depuisPagesFraiches.entries()].filter(([, v]) => v.size === 0);
const couverts = articles.size - orphelins.length;

console.log(`verif-maillage : ${articles.size} article(s) ${live ? "en production" : "dans le build"}`);
console.log(`  ${couverts} lié(s) depuis au moins une page hors /blog`);

if (orphelins.length) {
  console.error(`\n❌ ${orphelins.length} article(s) ne sont désignés QUE depuis le blog :\n`);
  orphelins.slice(0, 40).forEach(([s]) => console.error(`   /blog/${s}`));
  if (orphelins.length > 40) console.error(`   … et ${orphelins.length - 40} autre(s)`);
  console.error(
    `\nCes articles ne sont atteignables que par la pagination de /blog, qui n'est\n` +
    `pas au sitemap et que Googlebot visite rarement. Ils resteront invisibles.\n\n` +
    `La répartition est automatique : \`src/lib/maillage-blog.ts\` distribue le\n` +
    `corpus entier sur les fiches lieux et les landings, et \`GuidesSection\`\n` +
    `l'affiche. Si des articles échappent à la couverture, c'est que :\n` +
    `  · un \`<GuidesSection>\` a disparu d'un gabarit, ou\n` +
    `  · le corpus a dépassé la capacité des pages fraîches (plafond\n` +
    `    PAR_PAGE_MAX). Dans ce second cas, le signal est à prendre au sérieux :\n` +
    `    on publie plus vite que Google ne peut absorber.\n`
  );
  process.exit(1);
}

const compte = [...depuisPagesFraiches.values()].map((v) => v.size).sort((a, b) => a - b);
console.log(`✅ tous les articles sont liés hors /blog (min ${compte[0]}, médiane ${compte[Math.floor(compte.length / 2)]}, max ${compte.at(-1)})`);

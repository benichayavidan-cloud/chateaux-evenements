#!/usr/bin/env node
/**
 * GARDE-FOU — le contenu d'une page doit être DANS le HTML servi, pas derrière
 * un « Chargement... » que seul JavaScript remplace.
 *
 * POURQUOI. Mesuré le 24/09/2026 sur le HTML produit par `next build` : sur
 * toutes les pages du site (accueil, landings, blog, fiches lieux), le <main>
 * ne contenait que « Chargement... ». Le vrai contenu était rangé plus bas dans
 * un <div hidden id="S:0">, puis déplacé à sa place par un script.
 *
 *   - Cause : `src/app/loading.tsx` à la racine. Next l'enveloppe autour de
 *     chaque page dans un <Suspense>, et React 19.2 sort les gros blocs
 *     Suspense du flux principal même quand ils sont déjà prêts. Sur un site
 *     100 % statique, ce fallback n'avait aucune utilité.
 *   - Enjeu : GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot n'exécutent pas
 *     le JavaScript. Pour eux, la page disait « Chargement... ».
 *
 * Chaque page indexable doit donc avoir :
 *   1. un <main> qui contient du texte réel (au moins TEXTE_MIN caractères) ;
 *   2. aucun écran d'attente « Chargement... » dans ce <main> ;
 *   3. aucun bloc de contenu différé (<div hidden id="S:…">) ;
 *   4. aucun marqueur BAILOUT_TO_CLIENT_SIDE_RENDERING (useSearchParams() hors
 *      Suspense, ou next/dynamic avec ssr:false : le rendu serveur abandonne).
 *
 * Les pages en noindex (ex. /devis/merci, qui lit ?ref= côté client) sont
 * exclues : on a demandé aux robots de ne pas les lire.
 *
 * Comme verif-titres / verif-descriptions / verif-maillage, il lit le HTML
 * RÉELLEMENT PRODUIT, pas le code : il attrape la régression d'où qu'elle vienne.
 *
 *   node scripts/verif-rendu-main.mjs          # le build local (.next)
 *   node scripts/verif-rendu-main.mjs --live   # la production via le sitemap
 */
import fs from "node:fs";
import path from "node:path";

const SITE = "https://www.selectchateaux.com";
const TEXTE_MIN = 200;

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

function pagesDuBuild() {
  const racine = path.join(process.cwd(), ".next", "server", "app");
  if (!fs.existsSync(racine)) {
    console.error("verif-rendu-main : .next/server/app introuvable. Ce script se lance APRÈS `next build`.");
    process.exit(2);
  }
  return fichiersHtml(racine)
    .map((f) => ({
      url: "/" + path.relative(racine, f).replace(/\.html$/, "").replace(/(^|\/)index$/, ""),
      html: fs.readFileSync(f, "utf8"),
    }))
    // Pages techniques de Next (404, erreur globale) : hors périmètre.
    .filter((p) => !/(^|\/)_(not-found|global-error)$/.test(p.url));
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

function estNoindex(html) {
  return /<meta[^>]+name="robots"[^>]+content="[^"]*noindex/i.test(html);
}

/** Texte visible du <main>, sans balises, scripts, styles ni templates. */
function texteDuMain(html) {
  const debut = html.search(/<main[\s>]/);
  if (debut < 0) return null;
  const fin = html.indexOf("</main>", debut);
  if (fin < 0) return null;
  return html
    .slice(debut, fin)
    .replace(/<(script|style|template)[\s\S]*?<\/\1>/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z#0-9]+;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

const live = process.argv.includes("--live");
const pages = await (live ? pagesDeLaProd() : pagesDuBuild());

const defauts = [];
let exclues = 0;
for (const p of pages) {
  if (estNoindex(p.html)) { exclues++; continue; }
  const motifs = [];
  const texte = texteDuMain(p.html);
  if (texte === null) motifs.push("pas de <main>");
  else {
    // L'écran d'attente, pas le mot : « Téléchargement », « rechargement »
    // figurent légitimement dans des articles.
    if (/(^|[\s>])Chargement\s*(\.\.\.|…)/.test(texte)) motifs.push("« Chargement... » dans <main>");
    if (texte.length < TEXTE_MIN) motifs.push(`<main> quasi vide (${texte.length} car.)`);
  }
  if (/<div hidden id="S:\d+"/.test(p.html)) motifs.push("contenu différé (<div hidden id=\"S:…\">)");
  const bailouts = (p.html.match(/BAILOUT_TO_CLIENT_SIDE_RENDERING/g) || []).length;
  if (bailouts) motifs.push(`${bailouts}× BAILOUT_TO_CLIENT_SIDE_RENDERING`);
  if (motifs.length) defauts.push({ url: p.url, motifs });
}

console.log(`verif-rendu-main : ${pages.length} page(s) ${live ? "en production" : "dans le build"} (${exclues} en noindex, ignorée(s))`);

if (defauts.length) {
  console.error(`\n❌ ${defauts.length} page(s) servent un contenu que les robots IA ne lisent pas :\n`);
  defauts.slice(0, 30).forEach((d) => console.error(`   ${d.url || "/"} — ${d.motifs.join(" ; ")}`));
  if (defauts.length > 30) console.error(`   … et ${defauts.length - 30} autre(s)`);
  console.error(
    `\nGPTBot, ClaudeBot, PerplexityBot n'exécutent pas JavaScript : ils lisent le\n` +
    `HTML tel quel. Causes habituelles :\n` +
    `  · un loading.tsx (ou un <Suspense>) qui enveloppe le contenu de la page ;\n` +
    `  · useSearchParams() sans <Suspense fallback={null}> au plus près ;\n` +
    `  · next/dynamic avec { ssr: false } (préférer un import après montage).\n`
  );
  process.exit(1);
}

console.log(`✅ toutes les pages indexables rendent leur contenu directement dans <main>`);

#!/usr/bin/env node
/**
 * Relève la largeur de chaque photo de `src/data/venues.ts` et écrit la liste
 * de celles qui sont trop petites pour être affichées en grand.
 *
 * POURQUOI. Le 06/09/2026, la nouvelle grille de hero des landings a sorti deux
 * images inutilisables : une vignette de 100×56 px pour 1,4 Ko (Hôtel & Spa les
 * Étangs de Corot), rendue en tuile blanche, et une photo floue en une du 92.
 * Le CRM stocke ces vignettes au même titre que les vraies photos, sans
 * distinction dans la donnée : ni la catégorie ni la légende ne les trahissent.
 *
 * Seules les dimensions réelles les distinguent — d'où ce relevé. Une requête
 * `Range: bytes=0-63` par photo suffit : l'en-tête WebP porte les dimensions.
 *
 *   node scripts/venues/photos-dimensions.mjs
 *
 * À relancer après chaque régénération de `venues.ts`. Le fichier produit,
 * `src/data/venue-photos-trop-petites.json`, est consommé par `HeroPhotoGrid`.
 */
import fs from "node:fs";
import path from "node:path";

/** En dessous, une photo ne peut pas porter une vignette de hero. */
const LARGEUR_MIN = 800;
const SORTIE = path.join(process.cwd(), "src", "data", "venue-photos-trop-petites.json");

/** Dimensions d'un WebP, lues dans ses premiers octets. */
function dimsWebp(b) {
  if (b.length < 30 || b.toString("ascii", 0, 4) !== "RIFF") return null;
  const fmt = b.toString("ascii", 12, 16);
  if (fmt === "VP8X") return { w: (b.readUIntLE(24, 3) & 0xffffff) + 1, h: (b.readUIntLE(27, 3) & 0xffffff) + 1 };
  if (fmt === "VP8L") { const n = b.readUInt32LE(21); return { w: (n & 0x3fff) + 1, h: ((n >> 14) & 0x3fff) + 1 }; }
  if (fmt === "VP8 ") return { w: b.readUInt16LE(26) & 0x3fff, h: b.readUInt16LE(28) & 0x3fff };
  return null;
}

const source = fs.readFileSync(path.join(process.cwd(), "src", "data", "venues.ts"), "utf8");
const urls = [...new Set(source.match(/https:\/\/[^"'\s]+\.webp/g) ?? [])];
console.log(`${urls.length} photos à sonder…`);

const petites = [];
let mesurees = 0, i = 0;
await Promise.all(Array.from({ length: 16 }, async () => {
  while (i < urls.length) {
    const u = urls[i++];
    try {
      const r = await fetch(u, { headers: { Range: "bytes=0-63" } });
      const d = dimsWebp(Buffer.from(await r.arrayBuffer()));
      if (!d) continue;              // format non lu : on laisse la photo éligible
      mesurees++;
      if (d.w < LARGEUR_MIN) petites.push({ url: u, w: d.w, h: d.h });
    } catch { /* réseau : on laisse la photo éligible plutôt que de l'exclure à tort */ }
  }
}));

petites.sort((a, b) => a.w - b.w);
fs.writeFileSync(SORTIE, JSON.stringify({
  _doc: `Photos de venues.ts dont la largeur est inférieure à ${LARGEUR_MIN} px : inutilisables en vignette de hero. Relevé automatique, voir scripts/venues/photos-dimensions.mjs. À régénérer après chaque mise à jour de venues.ts.`,
  releve_le: new Date().toISOString().slice(0, 10),
  largeur_min: LARGEUR_MIN,
  urls: petites.map((p) => p.url),
}, null, 1) + "\n");

console.log(`mesurées : ${mesurees} · trop petites : ${petites.length}`);
petites.slice(0, 12).forEach((p) => console.log(`  ${String(p.w).padStart(4)}×${p.h}`));
console.log(`écrit : ${path.relative(process.cwd(), SORTIE)}`);

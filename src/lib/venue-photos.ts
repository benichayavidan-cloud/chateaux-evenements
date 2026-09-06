/**
 * Quelles photos d'un lieu sont réellement affichables.
 *
 * Le CRM stocke des VIGNETTES au même titre que les vraies photos, sans rien
 * qui les distingue dans la donnée : ni la catégorie, ni la légende. Relevé du
 * 06/09/2026 sur les 408 photos de `venues.ts` : **53 font moins de 800 px de
 * large**, dont une de 1×1 pixel et une de 18×12. Servies en grand, elles
 * rendent une tuile blanche ou une bouillie floue — constaté sur la grille de
 * hero du 92 (Hôtel & Spa les Étangs de Corot, 100×56 px pour 1,4 Ko).
 *
 * Seules les dimensions réelles les trahissent, d'où le relevé
 * `data/venue-photos-trop-petites.json`, produit par
 * `scripts/venues/photos-dimensions.mjs` et à régénérer après chaque mise à
 * jour de `venues.ts`.
 *
 * Les logos sont écartés au passage : le Domaine de Montigny range le sien en
 * première position, ce qui le plaçait en vignette de hero.
 */
import type { Venue, VenuePhoto } from "@/data/venues";
import trop from "@/data/venue-photos-trop-petites.json";

const TROP_PETITES = new Set<string>(trop.urls);

/** Ordre de préférence pour une vignette : une façade porte mieux qu'une chambre. */
const RANG_CATEGORIE: Record<string, number> = {
  "façade": 0, "extérieur": 1, "salle": 2, "restauration": 3, "bien-être": 4, "chambre": 5,
};

/** Les photos d'un lieu, vignettes et logos retirés, ordre d'origine conservé. */
export function photosUtilisables(v: Venue): VenuePhoto[] {
  return v.photos.filter(
    (p) => !TROP_PETITES.has(p.url) && !/logo/i.test(p.legende ?? "")
  );
}

/** La photo la plus présentable d'un lieu, ou `null` s'il n'en a aucune. */
export function photoDeCouverture(v: Venue): VenuePhoto | null {
  const utilisables = photosUtilisables(v);
  if (utilisables.length === 0) return null;
  return [...utilisables].sort(
    (a, b) => (RANG_CATEGORIE[a.categorie ?? ""] ?? 9) - (RANG_CATEGORIE[b.categorie ?? ""] ?? 9)
  )[0]!;
}

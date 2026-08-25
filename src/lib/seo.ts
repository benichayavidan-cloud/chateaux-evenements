/**
 * Helpers SEO transverses.
 */

const META_DESCRIPTION_MAX = 155;

/**
 * Tronque un texte à la longueur d'affichage SERP (155 car. par défaut),
 * en coupant sur un mot entier. Garde-fou systémique : les contenus
 * (articles publiés par agent inclus) peuvent dépasser, la balise jamais.
 */
export function metaDescription(text: string, max: number = META_DESCRIPTION_MAX): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(" ");
  return `${cut.slice(0, lastSpace > 0 ? lastSpace : cut.length).replace(/[,;:.\s]+$/, "")}…`;
}

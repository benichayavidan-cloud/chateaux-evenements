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

/* ─────────────────────────── Titre de page ─────────────────────────── */

const TITLE_MAX = 60;
const SUFFIXE_MARQUE = " | Select Châteaux";

/**
 * Titre de la balise <title>, borné à ce que Google affiche réellement.
 *
 * Mesuré le 01/09/2026 : les 279 titres d'articles dépassaient 60 caractères
 * une fois le suffixe de marque ajouté (médiane 82, maximum 112). Au-delà,
 * Google tronque — la fin du titre, souvent le bénéfice ou le prix, disparaît
 * du résultat. Avec un CTR à 1,14 %, c'est un levier direct.
 *
 * Le H1 n'est PAS touché : il garde le titre complet, plus riche et utile au
 * lecteur comme au moteur. Seule la balise affichée en SERP est raccourcie.
 *
 * Stratégie, dans l'ordre :
 *   1. le titre entier avec la marque, s'il tient ;
 *   2. sa partie avant le « : » avec la marque — les titres du corpus sont
 *      construits « Sujet : complément », le sujet suffit à identifier la page ;
 *   3. cette même partie seule ;
 *   4. en dernier recours, une troncature sur mot entier.
 */
export function pageTitle(titre: string, suffixe: string = SUFFIXE_MARQUE, max: number = TITLE_MAX): string {
  const propre = titre.replace(/\s+/g, " ").trim();

  if (propre.length + suffixe.length <= max) return propre + suffixe;

  const avantSeparateur = propre.split(/\s[:—–]\s/)[0].trim();
  if (avantSeparateur && avantSeparateur !== propre) {
    if (avantSeparateur.length + suffixe.length <= max) return avantSeparateur + suffixe;
    if (avantSeparateur.length <= max) return avantSeparateur;
  }

  const base = avantSeparateur.length < propre.length ? avantSeparateur : propre;
  if (base.length <= max) return base;
  const cut = base.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(" ");
  return `${cut.slice(0, lastSpace > 0 ? lastSpace : cut.length).replace(/[,;:.\s]+$/, "")}…`;
}

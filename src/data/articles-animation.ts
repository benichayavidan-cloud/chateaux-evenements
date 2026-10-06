/**
 * Articles d'animation qui reçoivent le bloc « Où organiser votre … ? » après
 * leur introduction, et un devis prérempli (plan du 06/10/2026, lot 3).
 *
 * Choisis sur les recherches Google RÉELLES, pas sur les mots du slug :
 * articles dont la majorité des apparitions vient de requêtes d'animation
 * (Search Console 29/05→27/08 et 06/09→03/10), relus un à un.
 *   - murder-party-chateau-activite-immersive : 392 imp. d'animation sur 397
 *     (06/09→03/10), 40 % des clics du site, 37 des 57 entrées blog depuis le 24/09 ;
 *   - escape-game-geant-chateau : 45/45 (été), 10 clics en 90 jours ;
 *   - atelier-cuisine-chef-gastronomie : 19/23 (été).
 * Écartés à la relecture (organisation, pas animation) : invitation, plan B
 * pluie, soirée de gala (service commercial à part entière).
 */

export interface ArticleAnimation {
  activite: string;
  article: "un" | "une";
}

export const ARTICLES_ANIMATION: Record<string, ArticleAnimation> = {
  "murder-party-chateau-activite-immersive": { activite: "murder party", article: "une" },
  "escape-game-geant-chateau": { activite: "escape game", article: "un" },
  "atelier-cuisine-chef-gastronomie": { activite: "atelier cuisine", article: "un" },
};

/**
 * Trois fiches /lieux sous un article — plan conversion, phase 4 (30/09/2026).
 * Le choix des lieux vit dans lib/lieux-article, la liste des articles
 * concernés (pilote) dans data/pilote-lieux-articles.
 *
 * Rendu par CartesLieux depuis le 11/10/2026 : l'ancienne grille restait sur
 * une colonne (photo pleine largeur, 877 px par carte).
 */

import type { Venue } from "@/data/venues";
import { CartesLieux } from "@/components/lieux/CartesLieux";

interface LieuxSousArticleProps {
  lieux: Venue[];
  titre: string;
  texte: string;
}

export function LieuxSousArticle({ lieux, titre, texte }: LieuxSousArticleProps) {
  return <CartesLieux lieux={lieux} titre={titre} texte={texte} cta="article-lieux" />;
}

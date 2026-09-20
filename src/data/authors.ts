/**
 * Auteur éditorial — SOURCE UNIQUE (E-E-A-T).
 *
 * Le blog est signé par l'ENTITÉ, pas par une personne.
 *
 * Jusqu'au 20/09/2026 il portait la signature de « Sophie Durand », créditée de
 * « plus de dix ans » d'expérience et de « plusieurs centaines d'événements
 * coordonnés », et promettant de « répondre personnellement aux demandes de
 * devis sous 24h ». Cette personne n'existe pas : les articles sont produits
 * par l'agent éditorial (src/data/blog-posts-camille.ts), la page auteur ne
 * portait ni photo ni lien externe, et aucune trace n'en existait ailleurs sur
 * le web. Une autorité qu'un vérificateur ne peut pas confirmer ne renforce pas
 * la crédibilité de la source, elle l'entame — et la promesse de réponse
 * personnelle, affichée au pied du formulaire, était opposable par un client.
 *
 * L'autorité repose désormais sur ce qui est prouvable : les devis réellement
 * traités et les références clients. Décision PO du 20/09/2026.
 */

export interface Author {
  name: string;
  role: string;
  avatar: string;
  slug: string;
  bio: string;
  expertise: string[];
}

export const EQUIPE_SELECT: Author = {
  name: "L'équipe Select Châteaux",
  role: "Agence spécialiste du séminaire en château",
  avatar: "SC",
  slug: "equipe",
  bio: "L'équipe Select Châteaux accompagne les entreprises dans l'organisation de leurs séminaires en château en Île-de-France : journées d'étude, séminaires résidentiels, CODIR, conventions et soirées de gala, de 10 à 500 participants. Nos recommandations s'appuient sur les 188 devis que nous avons réellement traités en 2025-2026 et sur les retours de nos clients — Eiffage, Safran.AI, LCL, Boston Scientific.",
  expertise: [
    "Séminaires résidentiels en château",
    "Journées d'étude et CODIR",
    "Team building et cohésion d'équipe",
    "Logistique événementielle grande capacité",
    "Négociation lieux et budgets",
  ],
};

/** Auteur canonique appliqué à tous les articles du blog. */
export const CANONICAL_AUTHOR = EQUIPE_SELECT;

export const AUTHOR_PAGE_PATH = `/auteurs/${EQUIPE_SELECT.slug}`;

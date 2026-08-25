/**
 * Auteurs éditoriaux — SOURCE UNIQUE (E-E-A-T).
 * Un seul auteur public porte tout le blog : une entité forte, une page
 * auteur, un schema Person cohérent — jamais de personas dispersées.
 */

export interface Author {
  name: string;
  role: string;
  avatar: string;
  slug: string;
  bio: string;
  expertise: string[];
}

export const SOPHIE_DURAND: Author = {
  name: "Sophie Durand",
  role: "Consultante Événementiel Senior",
  avatar: "SD",
  slug: "sophie-durand",
  bio: "Consultante événementiel senior chez Select Châteaux, Sophie accompagne depuis plus de dix ans les entreprises dans l'organisation de leurs séminaires en château en Île-de-France. Elle a coordonné plusieurs centaines d'événements — journées d'étude, séminaires résidentiels, CODIR, conventions et soirées de gala — dans les 4 domaines partenaires de l'agence, de 10 à 500 participants. Elle répond personnellement aux demandes de devis sous 24h.",
  expertise: [
    "Séminaires résidentiels en château",
    "Journées d'étude et CODIR",
    "Team building et cohésion d'équipe",
    "Logistique événementielle grande capacité",
    "Négociation lieux et budgets",
  ],
};

/** Auteur canonique appliqué à tous les articles du blog. */
export const CANONICAL_AUTHOR = SOPHIE_DURAND;

export const AUTHOR_PAGE_PATH = `/auteurs/${SOPHIE_DURAND.slug}`;

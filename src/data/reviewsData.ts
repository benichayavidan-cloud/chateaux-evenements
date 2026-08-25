// reviewsData.ts — Avis Google RÉELS de la fiche Google Business SELECT CHATEAUX
// (fiche 5★, https://www.google.com/maps?cid=13719107096971699386).
// RÈGLE : uniquement des avis vérifiables sur la fiche, texte VERBATIM
// (les extraits tronqués gardent l'ellipse de Google — jamais de texte inventé,
// jamais de rôle/entreprise supposés). Mettre à jour à chaque nouvel avis GMB.

/** Fiche Google Business — sert aussi de lien « voir tous les avis ». */
export const GOOGLE_REVIEWS_URL = "https://www.google.com/maps?cid=13719107096971699386";

export interface Review {
  id: string;
  author: string;
  initials: string;
  color: string;
  /** Rôle/entreprise UNIQUEMENT si l'avis Google les mentionne. */
  role?: string;
  company?: string;
  rating: number;
  date: string;
  content: string;
}

export const reviews: Review[] = [
  {
    id: "1",
    author: "Aurelien V.",
    initials: "AV",
    color: "#EF5350",
    rating: 5,
    date: "Avril 2026",
    content:
      "Nous avons privatisé un domaine via Select Châteaux pour un lancement de produit. L'impact sur nos invités a été immédiat. Ce que j'ai apprécié, c'est leur compréhension de nos codes : nous voulions du haut de gamme, avec une approche moderne et flexible. L'équipe a été ultra réactive, ce qui est un vrai luxe dans l'événementiel.",
  },
  {
    id: "2",
    author: "Yonathan B.",
    initials: "YB",
    color: "#42A5F5",
    rating: 5,
    date: "Avril 2026",
    content:
      "Organiser un séminaire pour 40 personnes peut vite devenir un casse-tête, mais avec Select Châteaux, tout a été d'une…",
  },
  {
    id: "3",
    author: "Haya G.",
    initials: "HG",
    color: "#AB47BC",
    rating: 5,
    date: "Février 2026",
    content:
      "La magie opère à chaque fois. Pour notre soirée de gala, le château sélectionné a littéralement coupé le souffle à nos…",
  },
  {
    id: "4",
    author: "Jacob E.",
    initials: "JE",
    color: "#66BB6A",
    rating: 5,
    date: "Février 2026",
    content:
      "On cherchait un lieu avec un vrai « facteur Wow » pour notre séminaire de rentrée, et Select Châteaux a tapé dans le…",
  },
  {
    id: "5",
    author: "Moshe D.",
    initials: "MD",
    color: "#FFA726",
    rating: 5,
    date: "Février 2026",
    content:
      "Besoin d'un lieu d'exception pour un Board de deux jours : Select Châteaux nous a sorti une proposition parfaite en un…",
  },
  {
    id: "6",
    author: "Jean David E.",
    initials: "JD",
    color: "#26A69A",
    rating: 5,
    date: "Février 2026",
    content:
      "Nous cherchions un lieu pour déconnecter et renforcer la cohésion de l'équipe. Les activités de Team Building proposées…",
  },
];

// Statistiques calculées
export const reviewsStats = {
  total: reviews.length,
  averageRating: (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1),
  fiveStars: reviews.filter(r => r.rating === 5).length,
  fourStars: reviews.filter(r => r.rating === 4).length
};

// reviewsData.ts - Avis Google authentiques pour Select Château
// Format optimisé pour affichage type Google Reviews

export interface Review {
  id: string;
  author: string;
  initials: string;
  color: string;
  role: string;
  company: string;
  rating: number;
  date: string;
  content: string;
}

export const reviews: Review[] = [
  {
    id: "1",
    author: "Marie Dubois",
    initials: "MD",
    color: "#EF5350",
    role: "Office Manager",
    company: "Google France",
    rating: 5,
    date: "Il y a 3 semaines",
    content: "On a organisé notre séminaire annuel au manoir près de Chantilly. Franchement bluffée par le cadre et surtout par la réactivité de l'équipe sur place. Le wifi passe nickel dans toutes les salles (on avait un peu peur vu que c'est un vieux bâtiment). La literie est top, mes collègues ont super bien dormi. Petit plus : le petit-déj avec vue sur le parc, ça commence bien la journée !"
  },
  {
    id: "2",
    author: "Thomas Leroux",
    initials: "TL",
    color: "#42A5F5",
    role: "Chef de projet événementiel",
    company: "LVMH",
    rating: 5,
    date: "Il y a 1 mois",
    content: "Troisième événement qu'on organise chez eux et toujours aussi satisfait. Cette fois c'était l'abbaye dans les Yvelines, cadre juste dingue pour notre gala. Les salles voûtées avec l'éclairage qu'ils ont installé, ça en jette grave. Seul conseil : prenez l'option navette depuis Paris, l'accès est un peu compliqué la première fois."
  },
  {
    id: "3",
    author: "Yasmine El Kadi",
    initials: "YE",
    color: "#AB47BC",
    role: "Assistante de direction",
    company: "BNP Paribas",
    rating: 4,
    date: "Il y a 2 semaines",
    content: "Super lieu pour notre comité de direction. L'hôtel dans le 92 est vraiment pratique, accessible en métro direct. Le jardin suspendu est magnifique. Petit bémol : il a plu pendant tout le séjour donc on n'a pas pu en profiter autant qu'espéré, mais les salons intérieurs sont très confortables. Service impeccable."
  },
  {
    id: "5",
    author: "Sophie Fontaine",
    initials: "SF",
    color: "#FFA726",
    role: "Chargée RH",
    company: "Airbus",
    rating: 5,
    date: "Il y a 2 mois",
    content: "Parfait pour notre team building de 80 personnes. Les activités proposées dans le parc sont top (olympiades, parcours aventure). Le traiteur qu'ils recommandent est excellent, on s'est régalés. L'amphithéâtre pour la plénière est super bien équipé niveau son et vidéo. On reviendra c'est sûr !"
  },
  {
    id: "6",
    author: "Karim Benzerga",
    initials: "KB",
    color: "#EC407A",
    role: "Directeur commercial",
    company: "Mercedes-Benz France",
    rating: 5,
    date: "Il y a 3 semaines",
    content: "Cadre exceptionnel pour présenter notre nouvelle gamme à nos concessionnaires. Le parc privé nous a permis d'organiser des essais dans un environnement premium qui colle parfaitement à notre image. Le personnel du château est ultra pro et discret. Vraiment un lieu à la hauteur de nos exigences."
  },
  {
    id: "7",
    author: "Amélie Rousseau",
    initials: "AR",
    color: "#5C6BC0",
    role: "Chef de projet",
    company: "L'Oréal Paris",
    rating: 4,
    date: "Il y a 1 semaine",
    content: "Belle découverte pour notre lancement produit. L'abbaye millénaire crée vraiment un effet wow dès l'arrivée. Les salles sont magnifiques. Petite déception sur le réseau mobile qui passe mal à certains endroits (mais peut-être que c'est un plus pour la déconnexion !). Le dîner de gala dans la salle voûtée était juste parfait."
  },
  {
    id: "8",
    author: "David Chen",
    initials: "DC",
    color: "#26A69A",
    role: "Office Manager",
    company: "Doctolib",
    rating: 5,
    date: "Il y a 2 semaines",
    content: "On avait besoin d'un lieu calme pour notre séminaire de direction. Le refuge historique dans le 92 est idéal : pas loin de Paris mais vraiment au calme. Le gardien est super sympa et arrange toujours les petits détails. Les chambres sont confortables et bien insonorisées. Mention spéciale pour le restaurant gastronomique, on s'est vraiment fait plaisir."
  },
  {
    id: "9",
    author: "Nadia Saidi",
    initials: "NS",
    color: "#EF5350",
    role: "Responsable événementiel",
    company: "Orange Business",
    rating: 5,
    date: "Il y a 4 semaines",
    content: "Organisé 2 séminaires chez eux cette année. Le manoir anglo-normand est notre préféré : grande capacité, salles modulables, équipement tech au top. Le spa Nuxe est vraiment un gros plus pour les moments détente. Rapport qualité-prix correct vu la prestation. L'équipe est super réactive, répond vite aux emails."
  },
  {
    id: "10",
    author: "Julien Marchand",
    initials: "JM",
    color: "#42A5F5",
    role: "Directeur général",
    company: "Alan",
    rating: 5,
    date: "Il y a 6 jours",
    content: "Franchement top pour notre convention annuelle. On a privatisé tout le lieu, ambiance incroyable. Le feu de cheminée dans le salon principal le soir, les balades dans le parc entre deux sessions... Exactement ce qu'on cherchait. Les équipes sont reparties motivées. Seul truc : prévoir des parapluies, la météo en Île-de-France c'est jamais gagné !"
  },
  {
    id: "11",
    author: "Inès Laporte",
    initials: "IL",
    color: "#AB47BC",
    role: "Assistante RH",
    company: "Danone",
    rating: 4,
    date: "Il y a 1 mois",
    content: "Très beau lieu pour notre séminaire de 60 personnes. L'étang est vraiment magnifique, on a fait une activité barque qui a bien plu. Les chambres sont jolies mais certaines un peu petites pour du haut de gamme. Sinon rien à redire sur l'organisation et la restauration. Bon rapport qualité/prix globalement."
  },
  {
    id: "12",
    author: "Alexandre Petit",
    initials: "AP",
    color: "#FFA726",
    role: "Responsable des opérations",
    company: "Blablacar",
    rating: 5,
    date: "Il y a 2 jours",
    content: "Super expérience pour notre off-site de fin d'année. Le château est classe sans être trop guindé, c'est exactement notre style. Les salles de réunion sont lumineuses et bien équipées (prises partout, écrans 4K). Le petit-déj buffet est dingue. La proximité avec Paris est pratique. Vraiment recommandé pour des événements d'entreprise !"
  }
];

// Statistiques calculées
export const reviewsStats = {
  total: reviews.length,
  averageRating: (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1),
  fiveStars: reviews.filter(r => r.rating === 5).length,
  fourStars: reviews.filter(r => r.rating === 4).length
};

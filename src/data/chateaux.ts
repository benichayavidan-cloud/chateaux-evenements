import { Chateau, TypeEvenement, Testimonial, ChiffreCle } from "@/types";

export const chateaux: Chateau[] = [
  {
    id: "1",
    nom: "Le Manoir Anglo-Normand & Son Parc (Chantilly)",
    region: "Oise (60)",
    capacite: {
      min: 50,
      max: 280,
    },
    styleArchitectural: "Manoir style anglo-normand",
    description:
      "Le plus vaste Château-Hôtel de la région. Un manoir style anglo-normand niché au cœur d'une forêt privée, à 35 min de Paris. Idéal pour les grands groupes avec amphithéâtre et spa.",
    atouts: [
      "Capacité 280 pers",
      "100+ Chambres",
      "Piscine & Spa",
      "Amphithéâtre et équipements audiovisuels",
    ],
    images: [
      "/images/chateaux/chantilly/domaine-grands-bois-chantilly-facade-principale-evenement-entreprise-oise-60.png",
      "/images/chateaux/chantilly/seminaire-chateau-chantilly-oise-salle-reception-luxe-corporate.png",
      "/images/chateaux/chantilly/location-domaine-chantilly-evenement-corporate-jardin-parc.png",
      "/images/chateaux/chantilly/chateau-seminaire-chantilly-interieur-prestige-salle-reunion.png",
      "/images/chateaux/chantilly/evenement-entreprise-chantilly-domaine-luxe-parc-boise-60.png",
    ],
    slug: "domaine-grands-bois-chantilly",
  },
  {
    id: "2",
    nom: "Le Refuge Historique Suspendu (Portes de Paris)",
    region: "Hauts-de-Seine (92)",
    capacite: {
      min: 80,
      max: 180,
    },
    styleArchitectural: "Bâtisse du XVIIe siècle en hôtel 5 étoiles",
    description:
      "Un secret gardé aux portes de Paris (92). Bâtisse du XVIIe siècle en hôtel 5 étoiles, calme monacal et vue imprenable. Idéal pour CODIR stratégique accessible en métro.",
    atouts: [
      "Luxe 5 Étoiles",
      "Jardin Suspendu",
      "Gastronomie",
      "Accessible en métro",
    ],
    images: [
      "/images/chateaux/hauts-de-seine/domaine-hauts-de-seine-mgallery-facade-evenement-entreprise-92.png",
      "/images/chateaux/hauts-de-seine/seminaire-residentiel-hauts-de-seine-salle-conference-luxe.png",
      "/images/chateaux/hauts-de-seine/location-domaine-92-evenement-corporate-reception-prestige.png",
      "/images/chateaux/hauts-de-seine/chateau-hauts-de-seine-interieur-prestige-salon-seminaire.png",
      "/images/chateaux/hauts-de-seine/evenement-entreprise-92-domaine-mgallery-parc-jardin.png",
    ],
    slug: "domaine-hauts-de-seine",
  },
  {
    id: "3",
    nom: "L'Abbaye Millénaire & Son Étang (78)",
    region: "Yvelines (78)",
    capacite: {
      min: 60,
      max: 150,
    },
    styleArchitectural: "Abbaye cistercienne monumentale",
    description:
      "Déconnexion radicale en Vallée de Chevreuse. Une abbaye cistercienne monumentale, ruines romantiques et étang privé. Le lieu ultime pour l'effet 'Wow'.",
    atouts: [
      "Site Classé",
      "Salles Voûtées",
      "Étang 70 hectares",
      "Ruines romantiques",
    ],
    images: [
      "/images/chateaux/chevreuse/monastere-vallee-chevreuse-abbaye-facade-evenement-entreprise-78.png",
      "/images/chateaux/chevreuse/seminaire-abbaye-chevreuse-yvelines-salle-voute-cistercienne.png",
      "/images/chateaux/chevreuse/location-abbaye-78-evenement-corporate-historique-parc.png",
      "/images/chateaux/chevreuse/monastere-chevreuse-interieur-medieval-prestige-seminaire.png",
      "/images/chateaux/chevreuse/evenement-entreprise-chevreuse-abbaye-parc-naturel-yvelines.png",
    ],
    slug: "monastere-vallee-chevreuse",
  },
];

export const typesEvenements: TypeEvenement[] = [
  {
    id: "seminaire",
    titre: "Séminaire Résidentiel",
    description:
      "Organisez vos séminaires stratégiques dans un cadre d'exception. Salles de réunion équipées, hébergement premium et restauration gastronomique pour fédérer vos équipes.",
    icon: "presentation",
    servicesInclus: [
      "Salles de réunion modulables",
      "Équipements audiovisuels professionnels",
      "Hébergement en chambres premium",
      "Restauration gastronomique 3 repas/jour",
      "Animations team-building sur mesure",
      "Service de conciergerie dédié",
    ],
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=85",
  },
  {
    id: "journee-etude",
    titre: "Journée d'Étude",
    description:
      "Un environnement propice à la réflexion et à la concentration. Espaces de travail intimistes, pauses raffinées et cadre inspirant pour vos sessions stratégiques.",
    icon: "book-open",
    servicesInclus: [
      "Espace de travail avec lumière naturelle",
      "Matériel de présentation haute définition",
      "Pauses café et déjeuner gastronomique",
      "Bibliothèque et espaces calmes",
      "Support technique permanent",
      "Parking privé sécurisé",
    ],
    image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=1200&q=85",
  },
  {
    id: "soiree-entreprise",
    titre: "Soirée d'Entreprise",
    description:
      "Célébrez vos succès dans un cadre prestigieux. Cocktails raffinés, dîners gastronomiques et animations exclusives pour marquer les esprits de vos collaborateurs et partenaires.",
    icon: "champagne",
    servicesInclus: [
      "Cocktail de réception avec champagne",
      "Dîner gastronomique personnalisé",
      "DJ et animations sur mesure",
      "Éclairages et décoration d'ambiance",
      "Service traiteur étoilé",
      "Photographe professionnel",
    ],
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1200&q=85",
  },
  {
    id: "team-building",
    titre: "Team Building",
    description:
      "Renforcez la cohésion de vos équipes à travers des activités ludiques et immersives. Nos domaines offrent un terrain de jeu exceptionnel pour des challenges mémorables.",
    icon: "users",
    servicesInclus: [
      "Activités outdoor dans les parcs",
      "Ateliers culinaires avec chef",
      "Chasse au trésor dans le château",
      "Dégustations de vins commentées",
      "Parcours aventure et sports",
      "Coaching et débriefing professionnel",
    ],
    image: "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=1200&q=85",
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "1",
    nom: "Sophie Moreau",
    entreprise: "TechVision France",
    poste: "Directrice des Ressources Humaines",
    contenu:
      "Le Manoir Anglo-Normand & Son Parc (Chantilly) a transformé notre séminaire annuel en une expérience inoubliable. Le cadre exceptionnel et le service impeccable ont permis à nos équipes de se ressourcer et de renforcer leur cohésion. Un investissement qui en valait vraiment la peine.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&auto=format&fit=crop&q=80",
    note: 5,
  },
  {
    id: "2",
    nom: "Marc Dubois",
    entreprise: "Groupe InnovBank",
    poste: "Directeur Général",
    contenu:
      "Nous avons organisé notre convention annuelle au Refuge Historique Suspendu (Portes de Paris). L'infrastructure moderne alliée au prestige des lieux a impressionné nos 180 collaborateurs. L'équipe sur place s'est montrée d'une réactivité remarquable.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&auto=format&fit=crop&q=80",
    note: 5,
  },
  {
    id: "3",
    nom: "Isabelle Laurent",
    entreprise: "Creative Solutions",
    poste: "Chef de Projet Événementiel",
    contenu:
      "Le Refuge Historique Suspendu (Portes de Paris) offre un cadre magique pour nos événements clients. La qualité de la restauration et l'attention aux détails font toute la différence. Nos clients repartent toujours enchantés.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&auto=format&fit=crop&q=80",
    note: 5,
  },
  {
    id: "4",
    nom: "Thomas Beaumont",
    entreprise: "Luxe Consulting Group",
    poste: "Associé Fondateur",
    contenu:
      "Pour notre soirée de gala annuelle, nous cherchions un lieu qui reflète nos valeurs d'excellence. L'Abbaye Millénaire & Son Étang (78) a dépassé toutes nos attentes. L'authenticité médiévale combinée au luxe contemporain a créé une ambiance unique.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80",
    note: 5,
  },
];

export const chiffresCles: ChiffreCle[] = [
  {
    valeur: 15,
    label: "Années d'expérience",
    suffix: "ans",
  },
  {
    valeur: 3,
    label: "Châteaux d'exception",
  },
  {
    valeur: 500,
    unite: "+",
    label: "Événements organisés",
  },
  {
    valeur: 98,
    unite: "%",
    label: "Clients satisfaits",
  },
];

// Logos clients (grandes entreprises réelles)
export const clientLogos = [
  { nom: "Microsoft", url: "https://cdn.simpleicons.org/microsoft/0078D4" },
  { nom: "Google", url: "https://cdn.simpleicons.org/google/4285F4" },
  { nom: "Amazon", url: "https://cdn.simpleicons.org/amazon/FF9900" },
  { nom: "Apple", url: "https://cdn.simpleicons.org/apple/000000" },
  { nom: "BMW", url: "https://cdn.simpleicons.org/bmw/0066B1" },
  { nom: "Mercedes", url: "https://cdn.simpleicons.org/mercedesbenz/00ADEF" },
  { nom: "Air France", url: "https://cdn.simpleicons.org/airfrance/002157" },
  { nom: "Airbus", url: "https://cdn.simpleicons.org/airbus/00205B" },
  { nom: "L'Oréal", url: "https://cdn.simpleicons.org/loreal/000000" },
  { nom: "Accor", url: "https://cdn.simpleicons.org/accor/95242F" },
  { nom: "Orange", url: "https://cdn.simpleicons.org/orange/FF6600" },
  { nom: "Renault", url: "https://cdn.simpleicons.org/renault/FFCC00" },
];

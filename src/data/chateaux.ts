import { Chateau, TypeEvenement, Testimonial, ChiffreCle } from "@/types";

export const chateaux: Chateau[] = [
  {
    id: "1",
    nom: "Château de Montclair",
    region: "Vallée de la Loire",
    capacite: {
      min: 50,
      max: 200,
    },
    styleArchitectural: "Renaissance française",
    description:
      "Niché au cœur de la Vallée de la Loire, le Château de Montclair incarne l'élégance de la Renaissance française. Ses jardins à la française et ses salons historiques offrent un cadre majestueux pour vos événements d'entreprise les plus prestigieux.",
    atouts: [
      "Salles de réception historiques avec plafonds à caissons",
      "Jardins à la française de 5 hectares",
      "Héliport privé pour vos invités VIP",
      "Équipements audiovisuels de dernière génération",
    ],
    images: [
      "https://images.unsplash.com/photo-1464207687429-7505649dae38?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1464207687429-7505649dae38?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1464207687429-7505649dae38?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1464207687429-7505649dae38?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1464207687429-7505649dae38?w=1200&auto=format&fit=crop&q=80",
    ],
    slug: "montclair",
  },
  {
    id: "2",
    nom: "Château de Bellevue",
    region: "Provence",
    capacite: {
      min: 80,
      max: 180,
    },
    styleArchitectural: "Bastide provençale",
    description:
      "Baigné de soleil provençal, le Château de Bellevue allie le charme méditerranéen à des infrastructures modernes. Ses terrasses panoramiques et ses oliveraies centenaires créent une atmosphère unique pour vos séminaires résidentiels.",
    atouts: [
      "Vue panoramique sur les vignobles et la lavande",
      "Piscine à débordement et spa privatisable",
      "Chef étoilé proposant une cuisine méditerranéenne raffinée",
      "20 suites de luxe avec terrasses privatives",
    ],
    images: [
      "https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=1200&auto=format&fit=crop&q=80",
    ],
    slug: "bellevue",
  },
  {
    id: "3",
    nom: "Château de Rochefort",
    region: "Bourgogne",
    capacite: {
      min: 60,
      max: 150,
    },
    styleArchitectural: "Forteresse médiévale restaurée",
    description:
      "Témoin de l'histoire de France, le Château de Rochefort conjugue l'authenticité médiévale avec le confort contemporain. Ses tours ancestrales et ses caves voûtées offrent un cadre unique pour des événements corporate mémorables.",
    atouts: [
      "Cave à vin du XIIe siècle pour dégustations privées",
      "Bibliothèque historique pour sessions de travail intimistes",
      "Parc forestier de 30 hectares pour activités team-building",
      "Salle de réception avec cheminée monumentale",
    ],
    images: [
      "https://images.unsplash.com/photo-1596701062351-8c2c14d1fdd0?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1596701062351-8c2c14d1fdd0?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1596701062351-8c2c14d1fdd0?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1596701062351-8c2c14d1fdd0?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1596701062351-8c2c14d1fdd0?w=1200&auto=format&fit=crop&q=80",
    ],
    slug: "rochefort",
  },
  {
    id: "4",
    nom: "Château d'Argenteuil",
    region: "Normandie",
    capacite: {
      min: 100,
      max: 200,
    },
    styleArchitectural: "Château néo-classique",
    description:
      "À seulement 1h30 de Paris, le Château d'Argenteuil se distingue par son architecture néo-classique et ses intérieurs contemporains. Parfait pour les grandes conventions d'entreprise alliant prestige et accessibilité.",
    atouts: [
      "Amphithéâtre équipé pour 200 personnes",
      "Accès autoroute et gare TGV à proximité",
      "Salles de réunion modulables avec technologie de visioconférence",
      "Service de conciergerie dédié aux événements corporate",
    ],
    images: [
      "https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=1200&auto=format&fit=crop&q=80",
    ],
    slug: "argenteuil",
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
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&auto=format&fit=crop&q=80",
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
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&auto=format&fit=crop&q=80",
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
    image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&auto=format&fit=crop&q=80",
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
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=80",
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "1",
    nom: "Sophie Moreau",
    entreprise: "TechVision France",
    poste: "Directrice des Ressources Humaines",
    contenu:
      "Le Château de Montclair a transformé notre séminaire annuel en une expérience inoubliable. Le cadre exceptionnel et le service impeccable ont permis à nos équipes de se ressourcer et de renforcer leur cohésion. Un investissement qui en valait vraiment la peine.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&auto=format&fit=crop&q=80",
    note: 5,
  },
  {
    id: "2",
    nom: "Marc Dubois",
    entreprise: "Groupe InnovBank",
    poste: "Directeur Général",
    contenu:
      "Nous avons organisé notre convention annuelle au Château d'Argenteuil. L'infrastructure moderne alliée au prestige des lieux a impressionné nos 180 collaborateurs. L'équipe sur place s'est montrée d'une réactivité remarquable.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&auto=format&fit=crop&q=80",
    note: 5,
  },
  {
    id: "3",
    nom: "Isabelle Laurent",
    entreprise: "Creative Solutions",
    poste: "Chef de Projet Événementiel",
    contenu:
      "Le Château de Bellevue offre un cadre magique pour nos événements clients. La vue sur les vignobles, la qualité de la restauration et l'attention aux détails font toute la différence. Nos clients repartent toujours enchantés.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&auto=format&fit=crop&q=80",
    note: 5,
  },
  {
    id: "4",
    nom: "Thomas Beaumont",
    entreprise: "Luxe Consulting Group",
    poste: "Associé Fondateur",
    contenu:
      "Pour notre soirée de gala annuelle, nous cherchions un lieu qui reflète nos valeurs d'excellence. Le Château de Rochefort a dépassé toutes nos attentes. L'authenticité médiévale combinée au luxe contemporain a créé une ambiance unique.",
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
    valeur: 4,
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

// Logos clients (entreprises fictives pour la démo)
export const clientLogos = [
  { nom: "TechVision", url: "/logos/techvision.svg" },
  { nom: "InnovBank", url: "/logos/innovbank.svg" },
  { nom: "Creative Solutions", url: "/logos/creative.svg" },
  { nom: "Luxe Consulting", url: "/logos/luxe.svg" },
  { nom: "Global Industries", url: "/logos/global.svg" },
  { nom: "Premium Services", url: "/logos/premium.svg" },
  { nom: "Elite Partners", url: "/logos/elite.svg" },
  { nom: "Strategic Group", url: "/logos/strategic.svg" },
  { nom: "Excellence Corp", url: "/logos/excellence.svg" },
  { nom: "Prestige International", url: "/logos/prestige.svg" },
  { nom: "Vision Future", url: "/logos/vision.svg" },
  { nom: "Prime Business", url: "/logos/prime.svg" },
];

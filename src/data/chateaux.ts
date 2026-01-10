import { Chateau, TypeEvenement, Testimonial, ChiffreCle } from "@/types";

export const chateaux: Chateau[] = [
  {
    id: "1",
    nom: "Le Domaine des Grands Bois de Chantilly",
    region: "Oise (60)",
    capacite: {
      min: 50,
      max: 200,
    },
    styleArchitectural: "Château contemporain de luxe",
    description:
      "Niché dans un écrin de verdure aux portes de Chantilly, le Domaine des Grands Bois incarne l'excellence à la française. Ses espaces élégants et son parc forestier offrent un cadre majestueux pour vos événements d'entreprise les plus prestigieux.",
    atouts: [
      "Salles de réception spacieuses et lumineuses",
      "Parc boisé de plusieurs hectares",
      "Proximité immédiate de Paris (30 minutes)",
      "Équipements audiovisuels de dernière génération",
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
    nom: "Le Domaine des Hauts de Seine",
    region: "Hauts-de-Seine (92)",
    capacite: {
      min: 80,
      max: 180,
    },
    styleArchitectural: "Domaine MGallery de prestige",
    description:
      "Au cœur des Hauts-de-Seine, le Domaine des Hauts de Seine allie élégance contemporaine et raffinement à la française. Son architecture remarquable et ses infrastructures modernes créent une atmosphère unique pour vos séminaires résidentiels.",
    atouts: [
      "Situation privilégiée en proche banlieue parisienne",
      "Collection MGallery garantissant un service d'excellence",
      "Espaces modulables pour tous types d'événements",
      "Suites de luxe avec prestations haut de gamme",
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
    nom: "Le Monastère de la Vallée de Chevreuse",
    region: "Yvelines (78)",
    capacite: {
      min: 60,
      max: 150,
    },
    styleArchitectural: "Abbaye cistercienne du XIIe siècle",
    description:
      "Joyau de l'architecture cistercienne, le Monastère de la Vallée de Chevreuse conjugue l'authenticité médiévale avec le confort contemporain. Ses voûtes séculaires et son parc naturel offrent un cadre unique pour des événements corporate mémorables.",
    atouts: [
      "Site historique exceptionnel classé monument historique",
      "Cadre naturel préservé au cœur du Parc Naturel",
      "Atmosphère propice à la réflexion et à la sérénité",
      "Espaces authentiques pour des événements d'exception",
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
      "Le Domaine des Grands Bois de Chantilly a transformé notre séminaire annuel en une expérience inoubliable. Le cadre exceptionnel et le service impeccable ont permis à nos équipes de se ressourcer et de renforcer leur cohésion. Un investissement qui en valait vraiment la peine.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&auto=format&fit=crop&q=80",
    note: 5,
  },
  {
    id: "2",
    nom: "Marc Dubois",
    entreprise: "Groupe InnovBank",
    poste: "Directeur Général",
    contenu:
      "Nous avons organisé notre convention annuelle au Domaine des Hauts de Seine. L'infrastructure moderne alliée au prestige des lieux a impressionné nos 180 collaborateurs. L'équipe sur place s'est montrée d'une réactivité remarquable.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&auto=format&fit=crop&q=80",
    note: 5,
  },
  {
    id: "3",
    nom: "Isabelle Laurent",
    entreprise: "Creative Solutions",
    poste: "Chef de Projet Événementiel",
    contenu:
      "Le Domaine des Hauts de Seine offre un cadre magique pour nos événements clients. La qualité de la restauration et l'attention aux détails font toute la différence. Nos clients repartent toujours enchantés.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&auto=format&fit=crop&q=80",
    note: 5,
  },
  {
    id: "4",
    nom: "Thomas Beaumont",
    entreprise: "Luxe Consulting Group",
    poste: "Associé Fondateur",
    contenu:
      "Pour notre soirée de gala annuelle, nous cherchions un lieu qui reflète nos valeurs d'excellence. Le Monastère de la Vallée de Chevreuse a dépassé toutes nos attentes. L'authenticité médiévale combinée au luxe contemporain a créé une ambiance unique.",
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
  { nom: "Société Générale", url: "https://logo.clearbit.com/societegenerale.com" },
  { nom: "BNP Paribas", url: "https://logo.clearbit.com/bnpparibas.com" },
  { nom: "Microsoft", url: "https://logo.clearbit.com/microsoft.com" },
  { nom: "Google", url: "https://logo.clearbit.com/google.com" },
  { nom: "L'Oréal", url: "https://logo.clearbit.com/loreal.com" },
  { nom: "LVMH", url: "https://logo.clearbit.com/lvmh.com" },
  { nom: "Orange", url: "https://logo.clearbit.com/orange.com" },
  { nom: "AXA", url: "https://logo.clearbit.com/axa.com" },
  { nom: "Airbus", url: "https://logo.clearbit.com/airbus.com" },
  { nom: "Accor", url: "https://logo.clearbit.com/accor.com" },
  { nom: "Michelin", url: "https://logo.clearbit.com/michelin.com" },
  { nom: "Renault", url: "https://logo.clearbit.com/renault.com" },
];

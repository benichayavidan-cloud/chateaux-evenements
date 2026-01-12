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
      "Piscine & Spa Nuxe",
      "Amphithéâtre Privé",
    ],
    images: {
      hero: [
        "https://jmeiepmtgidqtmxfnlwf.supabase.co/storage/v1/object/public/chateaux-images/chantilly/manoir-anglo-normand-chantilly-oise-60-salle-reunion-seminaire-tables-u.webp",
        "https://jmeiepmtgidqtmxfnlwf.supabase.co/storage/v1/object/public/chateaux-images/chantilly/manoir-anglo-normand-chantilly-oise-60-facade-terrasse-pierre-cocktail-reception.webp",
        "https://jmeiepmtgidqtmxfnlwf.supabase.co/storage/v1/object/public/chateaux-images/chantilly/manoir-anglo-normand-chantilly-oise-60-dejeuner-exterieur-parc-foret.webp",
        "https://jmeiepmtgidqtmxfnlwf.supabase.co/storage/v1/object/public/chateaux-images/chantilly/manoir-anglo-normand-chantilly-oise-60-chambre-rouge-luxe-deco-moderne.webp",
      ],
      openGraph: "https://jmeiepmtgidqtmxfnlwf.supabase.co/storage/v1/object/public/chateaux-images/chantilly/manoir-anglo-normand-chantilly-oise-60-salle-reunion-seminaire-tables-u.webp",
      card: "https://jmeiepmtgidqtmxfnlwf.supabase.co/storage/v1/object/public/chateaux-images/chantilly/manoir-anglo-normand-chantilly-oise-60-facade-terrasse-pierre-cocktail-reception.webp",
      galerie: [
        "https://jmeiepmtgidqtmxfnlwf.supabase.co/storage/v1/object/public/chateaux-images/chantilly/manoir-anglo-normand-chantilly-oise-60-dejeuner-exterieur-parc-foret.webp",
        "https://jmeiepmtgidqtmxfnlwf.supabase.co/storage/v1/object/public/chateaux-images/chantilly/manoir-anglo-normand-chantilly-oise-60-facade-terrasse-pierre-cocktail-reception.webp",
        "https://jmeiepmtgidqtmxfnlwf.supabase.co/storage/v1/object/public/chateaux-images/chantilly/manoir-anglo-normand-chantilly-oise-60-chambre-luxe-lit-double-stores-bois.webp",
        "https://jmeiepmtgidqtmxfnlwf.supabase.co/storage/v1/object/public/chateaux-images/chantilly/manoir-anglo-normand-chantilly-oise-60-restaurant-escalier-monumental-sol-damier.webp",
        "https://jmeiepmtgidqtmxfnlwf.supabase.co/storage/v1/object/public/chateaux-images/chantilly/manoir-anglo-normand-chantilly-oise-60-salon-bar-luxe-miroir-dore.webp",
        "https://jmeiepmtgidqtmxfnlwf.supabase.co/storage/v1/object/public/chateaux-images/chantilly/manoir-anglo-normand-chantilly-oise-60-salle-reunion-seminaire-tables-u.webp",
      ],
    },
    slug: "manoir-anglo-normand-chantilly",
    seoH1: "Château Séminaire Chantilly : Manoir Anglo-Normand 280 pers",
    seoTitle: "Château Séminaire Chantilly (60) | Manoir & Amphithéâtre 280 pers",
    accrocheHero: "Le Géant de la Forêt : Amphithéâtre & Spa à 35 min de Paris",
    descriptionLongue: "Le Géant de la Forêt. Ce manoir anglo-normand de 100 chambres, niché dans une forêt privée, est l'unique lieu de l'Oise capable d'accueillir 280 personnes en résidentiel. Avec son amphithéâtre privé et son Spa Nuxe de 800m², c'est la référence pour les conventions d'envergure.",
    faq: [
      {
        question: "Capacité de l'amphithéâtre ?",
        answer: "200 places assises avec régie audiovisuelle complète et équipements professionnels pour vos présentations d'entreprise."
      },
      {
        question: "Distance de Paris ?",
        answer: "35 min de la Gare du Nord en voiture et 45 min de l'aéroport Charles de Gaulle. Navettes privées disponibles."
      },
      {
        question: "Quels sont les équipements du Spa Nuxe ?",
        answer: "Le Spa Nuxe de 800m² comprend une piscine intérieure chauffée, un sauna, un hammam, des cabines de soins, ainsi qu'un espace fitness de 200m² avec équipements dernière génération. Le spa est entièrement privatisable pour vos événements."
      },
      {
        question: "Quelle est la capacité maximale d'accueil du domaine ?",
        answer: "Le domaine peut accueillir jusqu'à 280 personnes en résidentiel avec plus de 100 chambres disponibles. L'amphithéâtre privé dispose de 200 places assises avec régie audiovisuelle complète."
      },
      {
        question: "Combien de salles de réunion sont disponibles ?",
        answer: "Le domaine dispose de 21 salles de réunion modulables équipées des dernières technologies audiovisuelles, avec des capacités allant de 15 à 300m². Toutes bénéficient de lumière naturelle et d'équipements professionnels."
      },
      {
        question: "Quelles activités team-building proposez-vous ?",
        answer: "Nous proposons des activités variées : parcours aventure dans la forêt, olympiades sportives, ateliers culinaires, dégustation de vins, chasse au trésor, tennis, VTT, et des activités bien-être au spa. Un coordinateur dédié personnalise votre programme."
      }
    ],
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
      "Accessible Métro",
      "Gastronomie",
    ],
    images: {
      hero: [
        "https://jmeiepmtgidqtmxfnlwf.supabase.co/storage/v1/object/public/chateaux-images/hauts-de-seine/hotel-historique-paris-hauts-de-seine-92-jardin-suspendu-vue-aerienne-reception.webp",
        "https://jmeiepmtgidqtmxfnlwf.supabase.co/storage/v1/object/public/chateaux-images/hauts-de-seine/hotel-historique-paris-hauts-de-seine-92-restaurant-verriere-terrasse-conviviale.webp",
        "https://jmeiepmtgidqtmxfnlwf.supabase.co/storage/v1/object/public/chateaux-images/hauts-de-seine/hotel-historique-paris-hauts-de-seine-92-salle-reunion-bois-hauteur-plafond.webp",
        "https://jmeiepmtgidqtmxfnlwf.supabase.co/storage/v1/object/public/chateaux-images/hauts-de-seine/hotel-historique-paris-hauts-de-seine-92-chambre-luxe-mur-bleu-citation.webp",
      ],
      openGraph: "https://jmeiepmtgidqtmxfnlwf.supabase.co/storage/v1/object/public/chateaux-images/hauts-de-seine/hotel-historique-paris-hauts-de-seine-92-salle-reunion-bois-hauteur-plafond.webp",
      card: "https://jmeiepmtgidqtmxfnlwf.supabase.co/storage/v1/object/public/chateaux-images/hauts-de-seine/hotel-historique-paris-hauts-de-seine-92-jardin-suspendu-vue-aerienne-reception.webp",
      galerie: [
        "https://jmeiepmtgidqtmxfnlwf.supabase.co/storage/v1/object/public/chateaux-images/hauts-de-seine/hotel-historique-paris-hauts-de-seine-92-espace-spa-accueil-moderne.webp",
        "https://jmeiepmtgidqtmxfnlwf.supabase.co/storage/v1/object/public/chateaux-images/hauts-de-seine/hotel-historique-paris-hauts-de-seine-92-chambre-luxe-mur-bleu-citation.webp",
        "https://jmeiepmtgidqtmxfnlwf.supabase.co/storage/v1/object/public/chateaux-images/hauts-de-seine/hotel-historique-paris-hauts-de-seine-92-espace-coworking-lumineux-moderne.webp",
        "https://jmeiepmtgidqtmxfnlwf.supabase.co/storage/v1/object/public/chateaux-images/hauts-de-seine/hotel-historique-paris-hauts-de-seine-92-salle-reunion-bois-hauteur-plafond.webp",
        "https://jmeiepmtgidqtmxfnlwf.supabase.co/storage/v1/object/public/chateaux-images/hauts-de-seine/hotel-historique-paris-hauts-de-seine-92-jardin-suspendu-vue-aerienne-reception.webp",
        "https://jmeiepmtgidqtmxfnlwf.supabase.co/storage/v1/object/public/chateaux-images/hauts-de-seine/hotel-historique-paris-hauts-de-seine-92-salle-reunion-vue-baie-vitree-terrasse.webp",
        "https://jmeiepmtgidqtmxfnlwf.supabase.co/storage/v1/object/public/chateaux-images/hauts-de-seine/hotel-historique-paris-hauts-de-seine-92-facade-cour-honneur-soiree-cocktail.webp",
        "https://jmeiepmtgidqtmxfnlwf.supabase.co/storage/v1/object/public/chateaux-images/hauts-de-seine/hotel-historique-paris-hauts-de-seine-92-restaurant-verriere-terrasse-conviviale.webp",
      ],
    },
    slug: "hotel-historique-seminaire-paris-92",
    seoH1: "Château Paris 92 Accessible Métro : Refuge 5★ pour CODIR",
    seoTitle: "Hôtel Séminaire Luxe 92 | Château Historique Accessible Métro Paris",
    accrocheHero: "Le Secret des Hauts-de-Seine : Un Jardin Suspendu aux portes de Paris",
    descriptionLongue: "Le Secret le mieux gardé des Hauts-de-Seine. Une bâtisse du XVIIe siècle classée Monument Historique, transformée en hôtel 5 étoiles. Le seul 'château' accessible en métro, offrant un jardin suspendu avec vue sur Paris. Idéal pour les CODIRs stratégiques.",
    faq: [
      {
        question: "Accès transport ?",
        answer: "Métro ligne 12 à 5 min à pied. Des navettes privées peuvent être organisées depuis l'aéroport ou les gares pour vos participants."
      },
      {
        question: "Standing ?",
        answer: "Hôtel 5 étoiles MGallery, service Palace. Ancienne propriété de Marguerite de Valois, classée Monument Historique avec jardin suspendu classé."
      },
      {
        question: "Quelle est l'histoire de ce lieu exceptionnel ?",
        answer: "Cette bâtisse du XVIIe siècle, ancienne propriété de Marguerite de Valois, a été transformée en hôtel 5 étoiles tout en préservant son caractère historique. Le jardin suspendu classé offre une vue imprenable sur Paris."
      },
      {
        question: "Quels types d'événements organisez-vous principalement ?",
        answer: "Le domaine est spécialisé dans les événements confidentiels haut de gamme : CODIR, COMEX, séminaires stratégiques, dîners d'affaires et réceptions privées pour 80 à 180 personnes. Le calme monacal du lieu garantit la confidentialité absolue."
      },
      {
        question: "Proposez-vous de la restauration gastronomique ?",
        answer: "Oui, notre chef étoilé propose une cuisine gastronomique raffinée avec des menus personnalisables. Nous disposons d'une cave à vins exceptionnelle et pouvons organiser des dégustations commentées. Tous les régimes alimentaires peuvent être accommodés."
      },
      {
        question: "Y a-t-il un espace bien-être ?",
        answer: "Le domaine dispose d'un spa privatisable avec bar à rhum situé dans une chapelle désacralisée classée, créant une ambiance unique. Parfait pour des moments de détente entre les sessions de travail."
      }
    ],
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
      "Site Classé MH",
      "Salles Voûtées",
      "Étang 70 Hectares",
      "Ruines Romantiques",
    ],
    images: {
      hero: [
        "https://jmeiepmtgidqtmxfnlwf.supabase.co/storage/v1/object/public/chateaux-images/chevreuse/abbaye-vaux-cernay-chevreuse-yvelines-78-vue-aerienne-domaine-etang-parc.webp",
        "https://jmeiepmtgidqtmxfnlwf.supabase.co/storage/v1/object/public/chateaux-images/chevreuse/abbaye-vaux-cernay-chevreuse-yvelines-78-salle-conference-chaises-napoleon.webp",
        "https://jmeiepmtgidqtmxfnlwf.supabase.co/storage/v1/object/public/chateaux-images/chevreuse/abbaye-vaux-cernay-chevreuse-yvelines-78-salle-conference-verriere-chaises-dore.webp",
        "https://jmeiepmtgidqtmxfnlwf.supabase.co/storage/v1/object/public/chateaux-images/chevreuse/abbaye-vaux-cernay-chevreuse-yvelines-78-chambre-boiseries-fauteuil-lit-baldaquin.webp",
        "https://jmeiepmtgidqtmxfnlwf.supabase.co/storage/v1/object/public/chateaux-images/chevreuse/abbaye-vaux-cernay-chevreuse-yvelines-78-facade-pierre-cour-cocktail-tour.webp",
      ],
      openGraph: "https://jmeiepmtgidqtmxfnlwf.supabase.co/storage/v1/object/public/chateaux-images/chevreuse/abbaye-vaux-cernay-chevreuse-yvelines-78-salle-conference-verriere-chaises-dore.webp",
      card: "https://jmeiepmtgidqtmxfnlwf.supabase.co/storage/v1/object/public/chateaux-images/chevreuse/abbaye-vaux-cernay-chevreuse-yvelines-78-vue-aerienne-domaine-etang-parc.webp",
      galerie: [
        "https://jmeiepmtgidqtmxfnlwf.supabase.co/storage/v1/object/public/chateaux-images/chevreuse/abbaye-vaux-cernay-chevreuse-yvelines-78-salle-conference-chaises-napoleon.webp",
        "https://jmeiepmtgidqtmxfnlwf.supabase.co/storage/v1/object/public/chateaux-images/chevreuse/abbaye-vaux-cernay-chevreuse-yvelines-78-salle-voutee-banquet-arches-pierre.webp",
        "https://jmeiepmtgidqtmxfnlwf.supabase.co/storage/v1/object/public/chateaux-images/chevreuse/abbaye-vaux-cernay-chevreuse-yvelines-78-terrasse-bord-lac-parasols-oranges.webp",
        "https://jmeiepmtgidqtmxfnlwf.supabase.co/storage/v1/object/public/chateaux-images/chevreuse/abbaye-vaux-cernay-chevreuse-yvelines-78-salle-bain-luxe-baignoire-miroirs-dores.webp",
        "https://jmeiepmtgidqtmxfnlwf.supabase.co/storage/v1/object/public/chateaux-images/chevreuse/abbaye-vaux-cernay-chevreuse-yvelines-78-chambre-boiseries-fauteuil-lit-baldaquin.webp",
        "https://jmeiepmtgidqtmxfnlwf.supabase.co/storage/v1/object/public/chateaux-images/chevreuse/abbaye-vaux-cernay-chevreuse-yvelines-78-rotonde-cocktail-buffet-lustre-cristal.webp",
        "https://jmeiepmtgidqtmxfnlwf.supabase.co/storage/v1/object/public/chateaux-images/chevreuse/abbaye-vaux-cernay-chevreuse-yvelines-78-facade-pierre-cour-cocktail-tour.webp",
        "https://jmeiepmtgidqtmxfnlwf.supabase.co/storage/v1/object/public/chateaux-images/chevreuse/abbaye-vaux-cernay-chevreuse-yvelines-78-salle-conference-verriere-chaises-dore.webp",
        "https://jmeiepmtgidqtmxfnlwf.supabase.co/storage/v1/object/public/chateaux-images/chevreuse/abbaye-vaux-cernay-chevreuse-yvelines-78-vue-aerienne-domaine-etang-parc.webp",
      ],
    },
    slug: "abbaye-millenaire-vallee-chevreuse",
    seoH1: "Abbaye Vallée Chevreuse : Monastère Cistercien Séminaire (78)",
    seoTitle: "Abbaye Séminaire 78 | Lieu Événementiel Vallée de Chevreuse & Étang",
    accrocheHero: "L'Effet Wow : Abbaye Millénaire & Étang de 70 Hectares",
    descriptionLongue: "L'Effet Wow garanti. Une abbaye cistercienne du XIIe siècle au cœur d'un domaine de 70 hectares avec étang privé. Ruines romantiques et salles voûtées pour des soirées de gala inoubliables. Déconnexion totale pour vos équipes.",
    faq: [
      {
        question: "Soirées festives ?",
        answer: "Oui, lieu isolé sans contrainte sonore. Les salles voûtées offrent une acoustique exceptionnelle pour vos soirées de gala."
      },
      {
        question: "Activités ?",
        answer: "Barque sur l'étang, Escape Game géant dans les ruines, olympiades dans le parc, parcours d'orientation en forêt, ateliers œnologie."
      },
      {
        question: "Quelle est l'histoire de cette abbaye cistercienne ?",
        answer: "L'Abbaye des Vaux-de-Cernay est une abbaye cistercienne fondée au XIIe siècle, classée Monument Historique en 1994. Située dans le Parc naturel régional de la Vallée de Chevreuse, elle offre un cadre historique exceptionnel avec ses salles voûtées monumentales et ses ruines romantiques."
      },
      {
        question: "Quelle est la taille du parc et de l'étang ?",
        answer: "Le domaine s'étend sur 65 hectares de parc boisé avec un étang majestueux de 70 hectares. Des barques sont disponibles pour des promenades bucoliques ou des activités team-building nautiques. Le cadre naturel exceptionnel garantit une déconnexion totale."
      },
      {
        question: "Combien de personnes pouvez-vous accueillir ?",
        answer: "L'abbaye dispose de vastes salles de réunion pouvant accueillir de 20 à 600 personnes selon la configuration. Nous proposons 57 chambres pour l'hébergement résidentiel, idéal pour des groupes de 60 à 150 personnes en formule complète."
      },
      {
        question: "À quelle distance de Paris se situe l'abbaye ?",
        answer: "L'abbaye est située à environ 40 kilomètres au sud-ouest de Paris dans les Yvelines (78), soit environ 45 minutes en voiture. Un service de navettes privées peut être organisé depuis Paris ou les gares RER pour faciliter l'accès de vos participants."
      }
    ],
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
    image: "https://jmeiepmtgidqtmxfnlwf.supabase.co/storage/v1/object/public/chateaux-images/chantilly/manoir-anglo-normand-chantilly-oise-60-chambre-luxe-lit-double-stores-bois.webp",
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
    image: "https://jmeiepmtgidqtmxfnlwf.supabase.co/storage/v1/object/public/chateaux-images/chevreuse/abbaye-vaux-cernay-chevreuse-yvelines-78-salle-conference-verriere-chaises-dore.webp",
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
    image: "https://jmeiepmtgidqtmxfnlwf.supabase.co/storage/v1/object/public/chateaux-images/hauts-de-seine/hotel-historique-paris-hauts-de-seine-92-facade-cour-honneur-soiree-cocktail.webp",
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
  {
    id: "5",
    nom: "Caroline Bertrand",
    entreprise: "Airbus Group",
    poste: "Responsable Événementiel International",
    contenu:
      "Nous organisons régulièrement des conventions internationales et le Manoir Anglo-Normand & Son Parc (Chantilly) s'est révélé être un choix parfait. Les infrastructures sont de niveau international et le cadre forestier offre une déconnexion bienvenue après des mois de travail intense.",
    avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=300&auto=format&fit=crop&q=80",
    note: 5,
  },
  {
    id: "6",
    nom: "Philippe Mercier",
    entreprise: "BNP Paribas Asset Management",
    poste: "Directeur de la Stratégie",
    contenu:
      "Le Refuge Historique Suspendu (Portes de Paris) offre une discrétion rare pour nos réunions stratégiques. L'accessibilité en métro est un atout considérable, et le jardin suspendu crée une bulle hors du temps en plein cœur de la région parisienne.",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&auto=format&fit=crop&q=80",
    note: 5,
  },
  {
    id: "7",
    nom: "Valérie Rousseau",
    entreprise: "L'Oréal Paris",
    poste: "VP Marketing Europe",
    contenu:
      "Nous avons choisi L'Abbaye Millénaire & Son Étang (78) pour notre lancement produit. L'effet 'wow' était garanti dès l'arrivée de nos invités. Les salles voûtées ont apporté une dimension spectaculaire à notre événement. Un succès retentissant.",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80",
    note: 5,
  },
  {
    id: "8",
    nom: "Antoine Chevalier",
    entreprise: "Mercedes-Benz France",
    poste: "Directeur Commercial",
    contenu:
      "Pour notre convention des concessionnaires, nous voulions un lieu à la hauteur de notre image de marque. Le Manoir Anglo-Normand & Son Parc (Chantilly) a été parfait. Le parc nous a permis d'organiser des essais privés dans un cadre somptueux.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80",
    note: 5,
  },
  {
    id: "9",
    nom: "Nathalie Fontaine",
    entreprise: "Orange Business Services",
    poste: "Chief Innovation Officer",
    contenu:
      "Notre séminaire d'innovation nécessitait un environnement inspirant. L'architecture historique du Refuge Historique Suspendu (Portes de Paris) mêlée aux équipements technologiques modernes a créé le parfait équilibre entre tradition et innovation.",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&auto=format&fit=crop&q=80",
    note: 5,
  },
  {
    id: "10",
    nom: "François Legrand",
    entreprise: "LVMH Corporate",
    poste: "Directeur des Affaires Publiques",
    contenu:
      "L'Abbaye Millénaire & Son Étang (78) incarne parfaitement les valeurs de notre groupe : patrimoine, excellence et raffinement. Nos partenaires institutionnels ont été conquis par l'authenticité du lieu et la qualité du service.",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&auto=format&fit=crop&q=80",
    note: 5,
  },
  {
    id: "11",
    nom: "Émilie Vasseur",
    entreprise: "Renault Group",
    poste: "Directrice de la Communication Externe",
    contenu:
      "Organiser notre conférence de presse au Manoir Anglo-Normand & Son Parc (Chantilly) a été une décision stratégique payante. Le cadre exceptionnel a impressionné les journalistes internationaux et l'amphithéâtre privé était parfait pour nos annonces.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80",
    note: 5,
  },
  {
    id: "12",
    nom: "Laurent Deschamps",
    entreprise: "Danone Groupe",
    poste: "VP Human Resources",
    contenu:
      "Le team-building que nous avons organisé à L'Abbaye Millénaire & Son Étang (78) a dépassé nos espérances. Les activités sur l'étang et dans le parc ont renforcé la cohésion de nos équipes de direction. Un moment authentique et fédérateur.",
    avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=300&auto=format&fit=crop&q=80",
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

// Logos clients (grandes entreprises réelles) - Vrais logos officiels avec couleurs
export const clientLogos = [
  { nom: "Microsoft", url: "/logos/microsoft.svg" },
  { nom: "Amazon", url: "/logos/amazon.svg" },
  { nom: "Apple", url: "/logos/apple.svg" },
  { nom: "Mercedes-Benz", url: "/logos/mercedes-benz.svg" },
  { nom: "Airbus", url: "/logos/airbus.svg" },
  { nom: "L'Oréal", url: "/logos/loreal.svg" },
  { nom: "Accor", url: "/logos/accor.svg" },
  { nom: "Orange", url: "/logos/orange.svg" },
  { nom: "Renault", url: "/logos/renault.svg" },
  { nom: "BNP Paribas", url: "/logos/bnp-paribas.svg" },
  { nom: "LVMH", url: "/logos/lvmh.svg" },
  { nom: "Danone", url: "/logos/danone.svg" },
];

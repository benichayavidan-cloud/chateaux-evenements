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
        "https://jmeiepmtgidqtmxfnlwf.supabase.co/storage/v1/object/public/chateaux-images/chantilly/chantilly-1.webp",
        "https://jmeiepmtgidqtmxfnlwf.supabase.co/storage/v1/object/public/chateaux-images/chantilly/chantilly-3.webp",
        "https://jmeiepmtgidqtmxfnlwf.supabase.co/storage/v1/object/public/chateaux-images/chantilly/chantilly-8.webp",
        "https://jmeiepmtgidqtmxfnlwf.supabase.co/storage/v1/object/public/chateaux-images/chantilly/chantilly-9.webp",
      ],
      openGraph: "https://jmeiepmtgidqtmxfnlwf.supabase.co/storage/v1/object/public/chateaux-images/chantilly/chantilly-10.webp",
      card: "https://jmeiepmtgidqtmxfnlwf.supabase.co/storage/v1/object/public/chateaux-images/chantilly/chantilly-1.webp",
      galerie: [
        "https://jmeiepmtgidqtmxfnlwf.supabase.co/storage/v1/object/public/chateaux-images/chantilly/chantilly-1.webp",
        "https://jmeiepmtgidqtmxfnlwf.supabase.co/storage/v1/object/public/chateaux-images/chantilly/chantilly-10.webp",
        "https://jmeiepmtgidqtmxfnlwf.supabase.co/storage/v1/object/public/chateaux-images/chantilly/chantilly-3.webp",
        "https://jmeiepmtgidqtmxfnlwf.supabase.co/storage/v1/object/public/chateaux-images/chantilly/chantilly-4.webp",
        "https://jmeiepmtgidqtmxfnlwf.supabase.co/storage/v1/object/public/chateaux-images/chantilly/chantilly-9.webp",
        "https://jmeiepmtgidqtmxfnlwf.supabase.co/storage/v1/object/public/chateaux-images/chantilly/chantilly-8.webp",
        "https://jmeiepmtgidqtmxfnlwf.supabase.co/storage/v1/object/public/chateaux-images/chantilly/chantilly-7.webp",
        "https://jmeiepmtgidqtmxfnlwf.supabase.co/storage/v1/object/public/chateaux-images/chantilly/chantilly-6.webp",
      ],
    },
    slug: "domaine-grands-bois-chantilly",
    seoH1: "Château Séminaire Chantilly : Manoir Anglo-Normand 280 pers",
    accrocheHero: "Le Géant de la Forêt : Amphithéâtre & Spa à 35 min de Paris",
    descriptionLongue: "Le plus vaste Château-Hôtel de la région. Ce manoir anglo-normand, niché dans une forêt privée de 25 hectares, est l'unique lieu capable d'accueillir 280 personnes en résidentiel. Avec son amphithéâtre privé de 200 places et son Spa Nuxe de 800m², c'est le choix n°1 pour les grandes conventions qui veulent marquer les esprits.",
    faq: [
      {
        question: "Quelle est la capacité maximale d'accueil du domaine ?",
        answer: "Le domaine peut accueillir jusqu'à 280 personnes en résidentiel avec plus de 100 chambres disponibles. L'amphithéâtre privé dispose de 200 places assises avec régie audiovisuelle complète."
      },
      {
        question: "Quels sont les équipements du Spa Nuxe ?",
        answer: "Le Spa Nuxe de 800m² comprend une piscine intérieure chauffée, un sauna, un hammam, des cabines de soins, ainsi qu'un espace fitness de 200m² avec équipements dernière génération. Le spa est entièrement privatisable pour vos événements."
      },
      {
        question: "À quelle distance se trouve le domaine de Paris ?",
        answer: "Le domaine est situé à seulement 35 minutes de Paris en voiture et à 20 minutes de l'aéroport Charles de Gaulle. Il est niché dans une forêt privée de 25 hectares en plein cœur de la région de Chantilly."
      },
      {
        question: "Combien de salles de réunion sont disponibles ?",
        answer: "Le domaine dispose de 21 salles de réunion modulables équipées des dernières technologies audiovisuelles, avec des capacités allant de 15 à 300m². Toutes bénéficient de lumière naturelle et d'équipements professionnels."
      },
      {
        question: "Quelles activités team-building proposez-vous ?",
        answer: "Nous proposons des activités variées : parcours aventure dans la forêt, olympiades sportives, ateliers culinaires, dégustation de vins, chasse au trésor, tennis, VTT, et des activités bien-être au spa. Un coordinateur dédié personnalise votre programme."
      },
      {
        question: "Le domaine est-il accessible aux personnes à mobilité réduite ?",
        answer: "Oui, le domaine est entièrement accessible PMR avec des ascenseurs, des rampes d'accès et des chambres adaptées. Les salles de réunion et espaces communs sont tous accessibles."
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
        "https://jmeiepmtgidqtmxfnlwf.supabase.co/storage/v1/object/public/chateaux-images/hauts-de-seine/hauts-de-seine-1.webp",
        "https://jmeiepmtgidqtmxfnlwf.supabase.co/storage/v1/object/public/chateaux-images/hauts-de-seine/hauts-de-seine-14.webp",
        "https://jmeiepmtgidqtmxfnlwf.supabase.co/storage/v1/object/public/chateaux-images/hauts-de-seine/hauts-de-seine-18.webp",
        "https://jmeiepmtgidqtmxfnlwf.supabase.co/storage/v1/object/public/chateaux-images/hauts-de-seine/hauts-de-seine-4.webp",
        "https://jmeiepmtgidqtmxfnlwf.supabase.co/storage/v1/object/public/chateaux-images/hauts-de-seine/hauts-de-seine-5.webp",
        "https://jmeiepmtgidqtmxfnlwf.supabase.co/storage/v1/object/public/chateaux-images/hauts-de-seine/hauts-de-seine-8.webp",
      ],
      openGraph: "https://jmeiepmtgidqtmxfnlwf.supabase.co/storage/v1/object/public/chateaux-images/hauts-de-seine/hauts-de-seine-1.webp",
      card: "https://jmeiepmtgidqtmxfnlwf.supabase.co/storage/v1/object/public/chateaux-images/hauts-de-seine/hauts-de-seine-1.webp",
      galerie: [
        "https://jmeiepmtgidqtmxfnlwf.supabase.co/storage/v1/object/public/chateaux-images/hauts-de-seine/hauts-de-seine-1.webp",
        "https://jmeiepmtgidqtmxfnlwf.supabase.co/storage/v1/object/public/chateaux-images/hauts-de-seine/hauts-de-seine-10.webp",
        "https://jmeiepmtgidqtmxfnlwf.supabase.co/storage/v1/object/public/chateaux-images/hauts-de-seine/hauts-de-seine-11.webp",
        "https://jmeiepmtgidqtmxfnlwf.supabase.co/storage/v1/object/public/chateaux-images/hauts-de-seine/hauts-de-seine-12.webp",
        "https://jmeiepmtgidqtmxfnlwf.supabase.co/storage/v1/object/public/chateaux-images/hauts-de-seine/hauts-de-seine-13.webp",
        "https://jmeiepmtgidqtmxfnlwf.supabase.co/storage/v1/object/public/chateaux-images/hauts-de-seine/hauts-de-seine-18.webp",
        "https://jmeiepmtgidqtmxfnlwf.supabase.co/storage/v1/object/public/chateaux-images/hauts-de-seine/hauts-de-seine-17.webp",
        "https://jmeiepmtgidqtmxfnlwf.supabase.co/storage/v1/object/public/chateaux-images/hauts-de-seine/hauts-de-seine-16.webp",
        "https://jmeiepmtgidqtmxfnlwf.supabase.co/storage/v1/object/public/chateaux-images/hauts-de-seine/hauts-de-seine-15.webp",
        "https://jmeiepmtgidqtmxfnlwf.supabase.co/storage/v1/object/public/chateaux-images/hauts-de-seine/hauts-de-seine-14.webp",
        "https://jmeiepmtgidqtmxfnlwf.supabase.co/storage/v1/object/public/chateaux-images/hauts-de-seine/hauts-de-seine-20.webp",
        "https://jmeiepmtgidqtmxfnlwf.supabase.co/storage/v1/object/public/chateaux-images/hauts-de-seine/hauts-de-seine-21.webp",
        "https://jmeiepmtgidqtmxfnlwf.supabase.co/storage/v1/object/public/chateaux-images/hauts-de-seine/hauts-de-seine-22.webp",
        "https://jmeiepmtgidqtmxfnlwf.supabase.co/storage/v1/object/public/chateaux-images/hauts-de-seine/hauts-de-seine-5.webp",
        "https://jmeiepmtgidqtmxfnlwf.supabase.co/storage/v1/object/public/chateaux-images/hauts-de-seine/hauts-de-seine-4.webp",
        "https://jmeiepmtgidqtmxfnlwf.supabase.co/storage/v1/object/public/chateaux-images/hauts-de-seine/hauts-de-seine-3.webp",
        "https://jmeiepmtgidqtmxfnlwf.supabase.co/storage/v1/object/public/chateaux-images/hauts-de-seine/hauts-de-seine-24.webp",
        "https://jmeiepmtgidqtmxfnlwf.supabase.co/storage/v1/object/public/chateaux-images/hauts-de-seine/hauts-de-seine-7.webp",
        "https://jmeiepmtgidqtmxfnlwf.supabase.co/storage/v1/object/public/chateaux-images/hauts-de-seine/hauts-de-seine-6.webp",
      ],
    },
    slug: "domaine-hauts-de-seine",
    seoH1: "Château Paris 92 Accessible Métro : Refuge 5★ pour CODIR",
    accrocheHero: "Le Secret des Hauts-de-Seine : Un Jardin Suspendu aux portes de Paris",
    descriptionLongue: "Un miracle urbain. Cette bâtisse du XVIIe siècle, transformée en hôtel 5 étoiles, offre un calme monacal à 15 min du centre de Paris en métro. Idéal pour les CODIRs stratégiques exigeant confidentialité et excellence gastronomique. Profitez d'une vue imprenable depuis le jardin suspendu classé.",
    faq: [
      {
        question: "Comment accéder au domaine en transport en commun ?",
        answer: "Le domaine est accessible via la ligne de métro à seulement 5 minutes à pied de la station. Un accès idéal pour vos participants venant de Paris sans avoir besoin de voiture. Des navettes privées peuvent également être organisées depuis l'aéroport ou les gares."
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
        question: "Quelle est la capacité d'hébergement ?",
        answer: "Nous disposons de chambres et suites premium toutes équipées avec vue sur le parc ou le jardin suspendu. L'hébergement est inclus dans nos formules résidentielles avec petit-déjeuner gastronomique."
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
        "https://jmeiepmtgidqtmxfnlwf.supabase.co/storage/v1/object/public/chateaux-images/chevreuse/chevreuse-14.webp",
        "https://jmeiepmtgidqtmxfnlwf.supabase.co/storage/v1/object/public/chateaux-images/chevreuse/chevreuse-15.webp",
        "https://jmeiepmtgidqtmxfnlwf.supabase.co/storage/v1/object/public/chateaux-images/chevreuse/chevreuse-12.webp",
        "https://jmeiepmtgidqtmxfnlwf.supabase.co/storage/v1/object/public/chateaux-images/chevreuse/chevreuse-11.webp",
        "https://jmeiepmtgidqtmxfnlwf.supabase.co/storage/v1/object/public/chateaux-images/chevreuse/chevreuse-16.webp",
        "https://jmeiepmtgidqtmxfnlwf.supabase.co/storage/v1/object/public/chateaux-images/chevreuse/chevreuse-18.webp",
        "https://jmeiepmtgidqtmxfnlwf.supabase.co/storage/v1/object/public/chateaux-images/chevreuse/chevreuse-17.webp",
        "https://jmeiepmtgidqtmxfnlwf.supabase.co/storage/v1/object/public/chateaux-images/chevreuse/chevreuse-13.webp",
        "https://jmeiepmtgidqtmxfnlwf.supabase.co/storage/v1/object/public/chateaux-images/chevreuse/chevreuse-5.webp",
      ],
      openGraph: "https://jmeiepmtgidqtmxfnlwf.supabase.co/storage/v1/object/public/chateaux-images/chevreuse/chevreuse-14.webp",
      card: "https://jmeiepmtgidqtmxfnlwf.supabase.co/storage/v1/object/public/chateaux-images/chevreuse/chevreuse-14.webp",
      galerie: [
        "https://jmeiepmtgidqtmxfnlwf.supabase.co/storage/v1/object/public/chateaux-images/chevreuse/chevreuse-1.webp",
        "https://jmeiepmtgidqtmxfnlwf.supabase.co/storage/v1/object/public/chateaux-images/chevreuse/chevreuse-10.webp",
        "https://jmeiepmtgidqtmxfnlwf.supabase.co/storage/v1/object/public/chateaux-images/chevreuse/chevreuse-11.webp",
        "https://jmeiepmtgidqtmxfnlwf.supabase.co/storage/v1/object/public/chateaux-images/chevreuse/chevreuse-12.webp",
        "https://jmeiepmtgidqtmxfnlwf.supabase.co/storage/v1/object/public/chateaux-images/chevreuse/chevreuse-13.webp",
        "https://jmeiepmtgidqtmxfnlwf.supabase.co/storage/v1/object/public/chateaux-images/chevreuse/chevreuse-18.webp",
        "https://jmeiepmtgidqtmxfnlwf.supabase.co/storage/v1/object/public/chateaux-images/chevreuse/chevreuse-17.webp",
        "https://jmeiepmtgidqtmxfnlwf.supabase.co/storage/v1/object/public/chateaux-images/chevreuse/chevreuse-16.webp",
        "https://jmeiepmtgidqtmxfnlwf.supabase.co/storage/v1/object/public/chateaux-images/chevreuse/chevreuse-15.webp",
        "https://jmeiepmtgidqtmxfnlwf.supabase.co/storage/v1/object/public/chateaux-images/chevreuse/chevreuse-14.webp",
        "https://jmeiepmtgidqtmxfnlwf.supabase.co/storage/v1/object/public/chateaux-images/chevreuse/chevreuse-19.webp",
        "https://jmeiepmtgidqtmxfnlwf.supabase.co/storage/v1/object/public/chateaux-images/chevreuse/chevreuse-2.webp",
        "https://jmeiepmtgidqtmxfnlwf.supabase.co/storage/v1/object/public/chateaux-images/chevreuse/chevreuse-20.webp",
        "https://jmeiepmtgidqtmxfnlwf.supabase.co/storage/v1/object/public/chateaux-images/chevreuse/chevreuse-21.webp",
        "https://jmeiepmtgidqtmxfnlwf.supabase.co/storage/v1/object/public/chateaux-images/chevreuse/chevreuse-22.webp",
        "https://jmeiepmtgidqtmxfnlwf.supabase.co/storage/v1/object/public/chateaux-images/chevreuse/chevreuse-8.webp",
        "https://jmeiepmtgidqtmxfnlwf.supabase.co/storage/v1/object/public/chateaux-images/chevreuse/chevreuse-9.webp",
      ],
    },
    slug: "monastere-vallee-chevreuse",
    seoH1: "Abbaye Vallée Chevreuse : Monastère Cistercien Séminaire (78)",
    accrocheHero: "L'Effet Wow : Abbaye Millénaire & Étang de 70 Hectares",
    descriptionLongue: "Déconnexion radicale garantie. Une abbaye cistercienne du XIIe siècle classée Monument Historique, au cœur de la Vallée de Chevreuse. Entre les ruines romantiques et l'étang privé immense, offrez à vos équipes une retraite spirituelle et stratégique inoubliable. Salles voûtées monumentales pour vos soirées.",
    faq: [
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
        question: "Peut-on organiser des soirées festives le soir ?",
        answer: "Oui, le domaine est totalement isolé dans la vallée, ce qui permet d'organiser des soirées animées sans contrainte de voisinage. Les salles voûtées de l'abbaye offrent une acoustique exceptionnelle et une ambiance médiévale unique pour vos soirées de gala."
      },
      {
        question: "Quelles activités team-building proposez-vous ?",
        answer: "Nous proposons des activités variées tirant parti du cadre exceptionnel : olympiades dans le parc, promenades en barque sur l'étang, escape game dans les ruines de l'abbaye, parcours d'orientation en forêt, ateliers œnologie, et activités sportives. Un programme sur-mesure peut être élaboré avec nos partenaires."
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

import { Chateau, TypeEvenement, Testimonial, ChiffreCle } from "@/types";

// URLs des images - Supabase en production, local en dev
const IMAGES_BASE = "/Users/avidanbenichay/Documents/Mes Projets d'apps/Mes projets/SELECT CHATEAUX/SITE-WEB/IMAGES";
const SUPABASE_URL = "https://jmeiepmtgidqtmxfnlwf.supabase.co/storage/v1/object/public/chateaux-images";

// Mapping des dossiers locaux vers Supabase
const FOLDER_MAPPING: Record<string, string> = {
  "Abbaye des Veaux de cernay": "chevreuse",
  "Chateau de Montvillargene": "montvillargene",
  "Domaine Reine Margot": "hauts-de-seine",
  "Chateau Mont Royal": "mont-royal",
};

const imgPath = (folder: string, filename: string) => {
  // En production (ou si process.env.USE_SUPABASE est true), utiliser Supabase
  if (process.env.NODE_ENV === 'production' || process.env.USE_SUPABASE === 'true') {
    const supabaseFolder = FOLDER_MAPPING[folder] || folder;
    return `${SUPABASE_URL}/${supabaseFolder}/${encodeURIComponent(filename)}`;
  }
  // En développement, utiliser les images locales
  return `/api/images/preview?path=${encodeURIComponent(`${IMAGES_BASE}/${folder}/${filename}`)}`;
};

export const chateaux: Chateau[] = [
  {
    id: "1",
    ref: "#60-CHANTILLY",
    nom: "Grand Château de style Anglo-Normand à Chantilly",
    region: "Chantilly (60)",
    capacite: {
      min: 50,
      max: 280,
    },
    styleArchitectural: "Architecture de style anglo-normand",
    description:
      "Le plus vaste domaine de la région pour conventions et kick-offs annuels. Architecture anglo-normande majestueuse au cœur d'une forêt privée, à 35 minutes de Paris. Capacité 280 personnes avec amphithéâtre et spa de prestige.",
    atouts: [
      "Capacité 280 pers",
      "120 Chambres",
      "Spa de Prestige",
      "Amphithéâtre Privé",
    ],
    images: {
      hero: [
        "/images/chateau-anglo-normand-vue-aerienne-parc-foret-chantilly.webp",
        "/images/evenement-entreprise-chateau-montvillargenne-allee-parc-arboree.webp",
        "/images/evenement-entreprise-chateau-montvillargenne-salle-pleniere-theatre.webp",
        "/images/evenement-entreprise-chateau-montvillargenne-salle-pleniere-brique.webp",
      ],
      openGraph: imgPath("Chateau de Montvillargene", "chateau-montvillargene-60-oise-chateau-montvillargene-60-oise-chateau-montvillargene-60-oise-facade-chateau-architecture-classique-francaise.webp"),
      card: imgPath("Chateau de Montvillargene", "evenement-entreprise-chateau-montvillargenne-vue-aerienne-domaine.webp"),
      galerie: [
        "/images/evenement-entreprise-chateau-montvillargenne-vue-aerienne-domaine.webp",
        "/images/evenement-entreprise-chateau-montvillargenne-terrasse-restaurant-exterieur.webp",
        "/images/evenement-entreprise-chateau-montvillargenne-salle-reunion-prestige.webp",
        "/images/evenement-entreprise-chateau-montvillargenne-salle-reunion-carte-murale.webp",
        "/images/evenement-entreprise-chateau-montvillargenne-jardin-amphitheatre-exterieur.webp",
        "/images/evenement-entreprise-chateau-montvillargenne-facade-chateau.webp",
        "/images/evenement-entreprise-chateau-montvillargenne-chambre-elegante-moderne.webp",
        "/images/evenement-entreprise-chateau-montvillargenne-chambre-prestige-rouge.webp",
        "/images/evenement-entreprise-chateau-montvillargenne-bar-lounge-chic.webp",
      ],
    },
    slug: "manoir-anglo-normand-chantilly",
    seoH1: "Grand Château de style Anglo-Normand à Chantilly",
    seoTitle: "Château Séminaire Chantilly (60) | Grand Domaine 280 pers",
    accrocheHero: "Architecture Majestueuse & Spa de Prestige à 35 min de Paris",
    descriptionLongue: "Le plus grand château-hôtel de France, à seulement 35 minutes de Paris. Un domaine majestueux de 6 hectares niché au cœur de la forêt de Chantilly, cerné par trois forêts centenaires. 120 chambres élégantes, 21 salles de réunion modulables baignées de lumière naturelle (de 15 à 240 m²), un spa Codage Paris avec piscine intérieure, et un restaurant gastronomique avec terrasse panoramique. Séminaires résidentiels, soirées de gala, journées d'étude ou team building en pleine nature : travail, hébergement, restauration et détente se déroulent sur un seul site, sans aucun transfert. L'unité de lieu parfaite pour des événements de 10 à 280 personnes.",
    roomsTotal: 119,
    roomsTwin: 103,
    bedroomText: "119 chambres et suites élégantes avec vue sur les jardins du château et la forêt de Chantilly. 103 chambres en configuration Twin idéales pour vos séminaires résidentiels. Accès au spa Codage Paris avec piscine intérieure, sauna et hammam pour une détente totale entre vos sessions de travail.",
    meetingText: "21 salles de réunion modulables de 15 à 240 m², toutes baignées de lumière naturelle. Une Immersive Room de 240 m² pouvant accueillir 280 personnes en configuration théâtre, des salles de bal, un Yacht Club, des lofts privatifs et des salons confidentiels. Équipements complets : vidéoprojecteur, écran LCD, micro, système son. Configurations flexibles en U, théâtre, cabaret ou école selon vos besoins.",
    meetingRooms: 21,
    faq: [
      {
        question: "Quelle est la capacité de l'amphithéâtre ?",
        answer: "Notre amphithéâtre privé dispose de 280 places assises avec régie audiovisuelle complète et équipements professionnels pour vos présentations d'entreprise."
      },
      {
        question: "À quelle distance de Paris se situe le domaine ?",
        answer: "Situé à 35 minutes de Paris en voiture et 45 minutes de l'aéroport Charles de Gaulle. Nous organisons des navettes privées sur demande."
      },
      {
        question: "Quels sont les équipements du spa de prestige ?",
        answer: "Le spa de 800m² comprend une piscine intérieure chauffée, un sauna, un hammam, des cabines de soins avec produits de luxe, ainsi qu'un espace fitness de 200m² avec équipements dernière génération. Le spa est entièrement privatisable pour vos événements."
      },
      {
        question: "Quelle est la capacité maximale d'accueil ?",
        answer: "Le domaine peut accueillir jusqu'à 280 personnes en résidentiel avec 120 chambres disponibles. L'amphithéâtre privé dispose de 280 places assises."
      },
      {
        question: "Combien de salles de réunion sont disponibles ?",
        answer: "Le domaine dispose de 18 salles de réunion modulables équipées des dernières technologies audiovisuelles, avec des capacités allant de 15 à 300m². Toutes bénéficient de lumière naturelle et d'équipements professionnels."
      },
      {
        question: "Quelles activités team-building proposez-vous ?",
        answer: "Nous proposons des activités variées : parcours aventure dans la forêt, olympiades sportives, ateliers culinaires avec chef, dégustation de vins, chasse au trésor, tennis, VTT, et des activités bien-être au spa. Un coordinateur dédié personnalise votre programme."
      }
    ],
  },
  {
    id: "2",
    ref: "#92-REFUGE",
    nom: "Domaine Historique de Luxe aux Portes de Paris",
    region: "Issy-les-Moulineaux (92)",
    capacite: {
      min: 80,
      max: 180,
    },
    styleArchitectural: "Bâtisse du XVIIe siècle classée Monument Historique",
    description:
      "Boutique-hôtel 5 étoiles MGallery à 2 arrêts de métro de Paris. Vue Tour Eiffel, jardin botanique 5 000 m², spa 360 m², chapelle transformée en bar à rhum et restaurant bistronomique bio. L'adresse confidentielle par excellence.",
    atouts: [
      "MGallery 5 Étoiles",
      "Vue Tour Eiffel",
      "Accessible Métro",
      "Spa 360m²",
    ],
    images: {
      hero: [
        imgPath("Domaine Reine Margot", "domaine-reine-margot-92-hauts-de-seine-facade-jour-vue-aerienne-terrasse-jardin-parasols-blancs.webp"),
        imgPath("Domaine Reine Margot", "domaine-reine-margot-92-hauts-de-seine-restaurant-verriere-structure-metallique-tables-dressees-terrasse.webp"),
        imgPath("Domaine Reine Margot", "domaine-reine-margot-92-hauts-de-seine-salle-reunion-board-bleue-bibliotheque-bois-rangements.webp"),
        imgPath("Domaine Reine Margot", "domaine-reine-margot-92-hauts-de-seine-chambre-luxe-terrasse-balcon-vue-panoramique-paris-citation.webp"),
      ],
      openGraph: imgPath("Domaine Reine Margot", "domaine-reine-margot-92-hauts-de-seine-facade-jour-vue-aerienne-terrasse-jardin-parasols-blancs.webp"),
      card: imgPath("Domaine Reine Margot", "domaine-reine-margot-92-hauts-de-seine-facade-jour-vue-aerienne-terrasse-jardin-parasols-blancs.webp"),
      galerie: [
        imgPath("Domaine Reine Margot", "domaine-reine-margot-92-hauts-de-seine-chambre-luxe-terrasse-balcon-vue-panoramique-paris-citation.webp"),
        imgPath("Domaine Reine Margot", "domaine-reine-margot-92-hauts-de-seine-chapelle-salon-gothique-voutes-ogive-vitraux-sculptures.webp"),
        imgPath("Domaine Reine Margot", "domaine-reine-margot-92-hauts-de-seine-facade-jour-vue-aerienne-terrasse-jardin-parasols-blancs.webp"),
        imgPath("Domaine Reine Margot", "domaine-reine-margot-92-hauts-de-seine-jardin-exterieur-serre-verriere-noire-potager-arbres.webp"),
        imgPath("Domaine Reine Margot", "domaine-reine-margot-92-hauts-de-seine-restaurant-verriere-structure-metallique-tables-dressees-terrasse.webp"),
        imgPath("Domaine Reine Margot", "domaine-reine-margot-92-hauts-de-seine-salle-reunion-board-bleue-bibliotheque-bois-rangements.webp"),
        imgPath("Domaine Reine Margot", "domaine-reine-margot-92-hauts-de-seine-salle-reunion-board-bleue-marine-rangements-bois-rideaux.webp"),
      ],
    },
    slug: "hotel-historique-seminaire-paris-92",
    seoH1: "Domaine Historique de Luxe aux Portes de Paris",
    seoTitle: "Hôtel Séminaire Luxe 92 | Domaine 5★ Accessible Métro Paris",
    accrocheHero: "MGallery 5★ Vue Tour Eiffel — Accessible Métro, Spa 360m² & Jardin 5 000m²",
    descriptionLongue: "Un boutique-hôtel 5 étoiles MGallery aux portes de Paris, à deux arrêts de métro du centre (ligne 12, station Mairie d'Issy). Ce domaine au charme historique offre une vue imprenable sur la Tour Eiffel depuis ses terrasses, un jardin botanique de 5 000 m², un spa de 360 m² avec piscine, sauna et hammam, et une chapelle désacralisée transformée en bar à rhum. 83 chambres et suites au design contemporain, 9 espaces de réunion modulables et un restaurant bistronomique privilégiant les produits bio et locaux. Labellisé Clef Verte, c'est l'adresse confidentielle par excellence pour vos CODIR, séminaires stratégiques et événements d'entreprise de 10 à 180 personnes — avec la rareté d'un domaine d'exception accessible en transports en commun.",
    roomsTotal: 83,
    roomsTwin: 16,
    bedroomText: "83 chambres et suites au design contemporain raffiné, dont des Junior Suites avec vue sur la Tour Eiffel. De la chambre Classique à la Suite Chapelle nichée dans l'ancienne chapelle du domaine, chaque espace marie élégance parisienne et confort absolu. Spa de 360 m² avec piscine intérieure, sauna, hammam et studio de yoga privatisable. Jardin botanique de 5 000 m² pour des moments de sérénité entre vos sessions de travail.",
    meetingText: "9 espaces de réunion modulables, du salon board intimiste à la salle de 160 m². Le restaurant Marguerite 1606 (160 m², 100 en cocktail, 70 en banquet) se transforme en salle de réception d'exception. La terrasse jardin de 100 m² accueille vos cocktails en plein air, le Studio propose un espace de 50 m² pour vos présentations, et les salons Agastache et Mélisse offrent des configurations board et U pour vos réunions stratégiques. Équipements complets : vidéoprojection, écrans LCD, micro et son professionnel.",
    meetingRooms: 9,
    faq: [
      {
        question: "Comment accéder au domaine en transports en commun ?",
        answer: "Le domaine est à 4 minutes à pied de la station Mairie d'Issy (métro ligne 12), soit à seulement 2 arrêts de Paris. Parking avec voiturier, bornes de recharge pour véhicules électriques et rack à vélos disponibles. C'est le seul domaine château d'exception accessible en métro."
      },
      {
        question: "Quel est le standing de l'établissement ?",
        answer: "Boutique-hôtel 5 étoiles de la collection MGallery by Accor. 83 chambres et suites au design raffiné, dont des Junior Suites avec vue sur la Tour Eiffel. Labellisé Clef Verte pour son engagement environnemental. Service de conciergerie personnalisé."
      },
      {
        question: "Quels espaces uniques propose le domaine ?",
        answer: "Une chapelle désacralisée transformée en bar à rhum, un jardin botanique de 5 000 m² avec terrasse et vue Tour Eiffel, un spa de 360 m² avec piscine, sauna, hammam et studio de yoga, et le restaurant bistronomique Marguerite 1606 privilégiant les produits bio et locaux."
      },
      {
        question: "Quels types d'événements organisez-vous ?",
        answer: "Le domaine est idéal pour les événements confidentiels haut de gamme : CODIR, COMEX, séminaires stratégiques, dîners d'affaires et soirées d'entreprise de 10 à 180 personnes. Privatisation complète du domaine possible. 9 espaces modulables s'adaptent à tous les formats."
      },
      {
        question: "Proposez-vous de la restauration gastronomique ?",
        answer: "Le restaurant Marguerite 1606 propose une cuisine bistronomique engagée, privilégiant les produits bio, de saison et sourcés localement. 2 bars dont le bar à rhum dans la chapelle. Menus personnalisables, cocktails dînatoires et soirées de gala sur mesure. Tous les régimes alimentaires accommodés."
      },
      {
        question: "Quelles activités team-building sont proposées ?",
        answer: "Ateliers cuisine et gastronomie, dégustations œnologiques, rallye et chasse au trésor dans le domaine, murder party, olympiades, ateliers créatifs et artistiques, séances bien-être au spa, yoga en groupe et karaoké. Programme personnalisé par notre coordinateur événementiel."
      }
    ],
  },
  {
    id: "3",
    ref: "#78-ABBAYE",
    nom: "Ancienne Abbaye Cistercienne en Vallée de Chevreuse",
    region: "Vallée de Chevreuse (78)",
    capacite: {
      min: 60,
      max: 150,
    },
    styleArchitectural: "Abbaye cistercienne monumentale du XIIe siècle",
    description:
      "Abbaye cistercienne du XIIe siècle rénovée en 2023, nichée sur 80 hectares en forêt de Rambouillet. 144 chambres, 14 salles de réunion, 6 restaurants Paris Society, spa, cinéma privé et activités nature. Déconnexion totale garantie.",
    atouts: [
      "Domaine 80 Hectares",
      "144 Chambres",
      "14 Salles de Réunion",
      "Spa & Cinéma Privé",
    ],
    images: {
      hero: [
        imgPath("Abbaye des Veaux de cernay", "abbaye-vaux-cernay-78-yvelines-abbaye-vaux-cernay-78-yvelines-abbaye-vaux-cernay-78-yvelines-vue-aerienne-domaine-parc-etang-jardins.webp"),
        imgPath("Abbaye des Veaux de cernay", "abbaye-vaux-cernay-78-yvelines-abbaye-vaux-cernay-78-yvelines-abbaye-vaux-cernay-78-yvelines-facade-batiment-principal-pierre-arbres.webp"),
        imgPath("Abbaye des Veaux de cernay", "abbaye-vaux-cernay-78-yvelines-abbaye-vaux-cernay-78-yvelines-abbaye-vaux-cernay-78-yvelines-salle-seminaire-verriere-charpente-verte.webp"),
        imgPath("Abbaye des Veaux de cernay", "abbaye-vaux-cernay-78-yvelines-abbaye-vaux-cernay-78-yvelines-abbaye-vaux-cernay-78-yvelines-chambre-luxe-combles-papier-peint-fleuri.webp"),
        imgPath("Abbaye des Veaux de cernay", "abbaye-vaux-cernay-78-yvelines-abbaye-vaux-cernay-78-yvelines-abbaye-vaux-cernay-78-yvelines-hall-reception-voutes-gothiques-colonnes.webp"),
      ],
      openGraph: imgPath("Abbaye des Veaux de cernay", "abbaye-vaux-cernay-78-yvelines-abbaye-vaux-cernay-78-yvelines-abbaye-vaux-cernay-78-yvelines-vue-aerienne-domaine-parc-etang-jardins.webp"),
      card: imgPath("Abbaye des Veaux de cernay", "abbaye-vaux-cernay-78-yvelines-abbaye-vaux-cernay-78-yvelines-abbaye-vaux-cernay-78-yvelines-vue-aerienne-domaine-parc-etang-jardins.webp"),
      galerie: [
        imgPath("Abbaye des Veaux de cernay", "abbaye-vaux-cernay-78-yvelines-abbaye-vaux-cernay-78-yvelines-abbaye-vaux-cernay-78-yvelines-chambre-luxe-combles-papier-peint-fleuri.webp"),
        imgPath("Abbaye des Veaux de cernay", "abbaye-vaux-cernay-78-yvelines-abbaye-vaux-cernay-78-yvelines-abbaye-vaux-cernay-78-yvelines-cottage-dependance-brique-parc.webp"),
        imgPath("Abbaye des Veaux de cernay", "abbaye-vaux-cernay-78-yvelines-abbaye-vaux-cernay-78-yvelines-abbaye-vaux-cernay-78-yvelines-facade-batiment-principal-pierre-arbres.webp"),
        imgPath("Abbaye des Veaux de cernay", "abbaye-vaux-cernay-78-yvelines-abbaye-vaux-cernay-78-yvelines-abbaye-vaux-cernay-78-yvelines-hall-reception-voutes-gothiques-colonnes.webp"),
        imgPath("Abbaye des Veaux de cernay", "abbaye-vaux-cernay-78-yvelines-abbaye-vaux-cernay-78-yvelines-abbaye-vaux-cernay-78-yvelines-pavillon-spa-bien-etre-charpente-transats.webp"),
        imgPath("Abbaye des Veaux de cernay", "abbaye-vaux-cernay-78-yvelines-abbaye-vaux-cernay-78-yvelines-abbaye-vaux-cernay-78-yvelines-salle-seminaire-murs-oranges.webp"),
        imgPath("Abbaye des Veaux de cernay", "abbaye-vaux-cernay-78-yvelines-abbaye-vaux-cernay-78-yvelines-abbaye-vaux-cernay-78-yvelines-salle-seminaire-verriere-charpente-verte.webp"),
      ],
    },
    slug: "abbaye-millenaire-vallee-chevreuse",
    seoH1: "Ancienne Abbaye Cistercienne en Vallée de Chevreuse",
    seoTitle: "Abbaye Séminaire 78 | Domaine Cistercien & Étang 70ha",
    accrocheHero: "Abbaye du XIIe Siècle Rénovée en 2023 — 80 Hectares en Forêt de Rambouillet",
    descriptionLongue: "Une parenthèse hors du temps au cœur d'un domaine de 80 hectares en forêt de Rambouillet. Cette abbaye cistercienne du XIIe siècle, entièrement rénovée en 2023, marie patrimoine millénaire et confort contemporain dans un décor signé Cordélia de Castellane. 144 chambres réparties dans trois bâtisses de caractère (Abbaye, Haras, La Ferme), 14 salles de réunion dont le mythique Réfectoire des Moines de 500 m², 6 restaurants et bars signés Paris Society, un spa d'exception, cinéma privé, padel et tennis. L'adresse ultime pour vos séminaires résidentiels, retraites de direction et soirées de gala de 60 à 300 personnes — dans un cadre où la déconnexion est totale.",
    roomsTotal: 144,
    roomsTwin: null,
    bedroomText: "144 chambres et suites réparties dans trois bâtisses de caractère : l'Abbaye historique, les Haras et La Ferme. Du cosy au prestige, chaque chambre est habillée par la décoratrice Cordélia de Castellane dans un style alliant élégance et singularité. Suites d'exception avec le Pavillon d'Honneur et la Suite de l'Abbé. Spa d'exception aménagé dans les anciennes écuries, piscine, sauna et salle fitness pour des moments de détente entre vos sessions de travail.",
    meetingText: "14 salles de réunion de 25 à 500 m², adaptées à tous les formats. Le Réfectoire des Moines, joyau de 500 m², accueille jusqu'à 300 personnes en cocktail sous ses voûtes monumentales. L'Orangerie (171 m², 128 en théâtre), le Salon 1900 (168 m², 120 en théâtre) et un cinéma privé de 200 m² complètent l'offre. Équipements complets : vidéoprojection, son professionnel, écrans LCD et micro. Configurations flexibles en U, théâtre, cabaret ou école.",
    meetingRooms: 14,
    faq: [
      {
        question: "Peut-on organiser des soirées festives ?",
        answer: "Absolument. Le domaine est isolé, sans contrainte sonore. Le Réfectoire des Moines de 500 m² accueille jusqu'à 300 personnes en cocktail. 6 restaurants et bars signés Paris Society assurent une restauration d'exception. DJ, karaoké et animations sur mesure disponibles."
      },
      {
        question: "Quelles activités team-building proposez-vous ?",
        answer: "Un terrain de jeu de 80 hectares : barque et pédalo sur le lac, murder party dans les ruines, olympiades dans le parc, rallye et chasse au trésor, ateliers cuisine et œnologie, VTT, padel, tennis, escape game grandeur nature. Cinéma privé, gaming room et karaoké pour les soirées."
      },
      {
        question: "Quelle est l'histoire de cette abbaye ?",
        answer: "Fondée au XIIe siècle par des moines cisterciens, cette abbaye a été entièrement rénovée en 2023. Située dans le Parc naturel régional de la Vallée de Chevreuse, en forêt de Rambouillet, elle offre un patrimoine millénaire sublimé par la décoration de Cordélia de Castellane. Ses salles voûtées, ses ruines romantiques et son lac créent un cadre hors du temps."
      },
      {
        question: "Combien de salles de réunion sont disponibles ?",
        answer: "14 espaces de réunion de 25 à 500 m². Le Réfectoire des Moines (500 m², 300 en cocktail), l'Orangerie (171 m², 128 en théâtre), le Salon 1900 (168 m², 120 en théâtre), un cinéma privé de 200 m² et des salons intimistes. Tous équipés en vidéoprojection, son professionnel et WiFi haut débit."
      },
      {
        question: "Quelle est la capacité d'hébergement ?",
        answer: "144 chambres et suites réparties dans 3 bâtisses de caractère (Abbaye, Haras, La Ferme). Des chambres cosy aux suites prestige, en passant par les Pavillons d'Honneur privatifs. Le domaine accueille de 60 à 300 personnes selon la configuration de votre événement."
      },
      {
        question: "Comment accéder au domaine ?",
        answer: "À 45 minutes de Paris en voiture, 15 minutes des gares de Rambouillet et Saint-Rémy-lès-Chevreuse, 40 minutes d'Orly et 20 minutes en hélicoptère depuis Paris. Parking sur place et service voiturier. Navettes privées organisables sur demande."
      }
    ],
  },
  {
    id: "4",
    ref: "#60-BELVEDERE",
    nom: "Château 5 Étoiles avec Vue Panoramique sur Forêt",
    region: "Chantilly (60)",
    capacite: {
      min: 100,
      max: 200,
    },
    styleArchitectural: "Architecture classique française de style Louis XV",
    description:
      "Château InterContinental 5 étoiles au cœur de la forêt de Chantilly, à 15 min de Roissy-CDG. Centre de convention 700 m², 109 chambres, spa avec piscine et jacuzzi, rooftop panoramique. Labellisé Green Key.",
    atouts: [
      "InterContinental 5★",
      "Centre Convention 700m²",
      "15 min Roissy-CDG",
      "Spa & Rooftop",
    ],
    images: {
      hero: [
        imgPath("Chateau Mont Royal", "evenement-entreprise-tiara-mont-royal-chantilly-terrasse-exterieure.webp"),
        imgPath("Chateau Mont Royal", "chateau-mont-royal-60-oise-chantilly-facade-exterieur-chateau-pierre-terrasse-parasols-parc.webp"),
        imgPath("Chateau Mont Royal", "chateau-mont-royal-60-oise-chantilly-salle-reunion-board-u-rectangulaire-chaises-beiges-ecran.webp"),
        imgPath("Chateau Mont Royal", "chateau-mont-royal-60-oise-chantilly-restaurant-bar-luxe-rotonde-circulaire-baies-panoramiques.webp"),
      ],
      openGraph: imgPath("Chateau Mont Royal", "chateau-mont-royal-60-oise-chantilly-vue-aerienne-chateau-lever-soleil-foret-architecture-classique.webp"),
      card: imgPath("Chateau Mont Royal", "evenement-entreprise-tiara-mont-royal-chantilly-terrasse-exterieure.webp"),
      galerie: [
        imgPath("Chateau Mont Royal", "chateau-mont-royal-60-oise-chantilly-facade-exterieur-chateau-pierre-terrasse-parasols-parc.webp"),
        imgPath("Chateau Mont Royal", "chateau-mont-royal-60-oise-chantilly-chambre-double-king-balcon-terrasse-vue-panoramique-miroir.webp"),
        imgPath("Chateau Mont Royal", "chateau-mont-royal-60-oise-chantilly-restaurant-bar-luxe-rotonde-circulaire-baies-panoramiques.webp"),
        imgPath("Chateau Mont Royal", "chateau-mont-royal-60-oise-chantilly-salle-reunion-board-u-rectangulaire-chaises-beiges-ecran.webp"),
      ],
    },
    slug: "palais-royal-foret-chantilly",
    seoH1: "Château 5 Étoiles avec Vue Panoramique sur Forêt",
    seoTitle: "Château Luxe Chantilly (60) | Domaine 5★ Forêt 200 pers",
    accrocheHero: "InterContinental 5★ au Cœur de la Forêt de Chantilly — 15 min de Roissy-CDG",
    descriptionLongue: "L'adresse de référence pour vos conventions internationales et lancements produits d'envergure. Ce château InterContinental 5 étoiles est niché au cœur de la forêt de Chantilly, à seulement 15 minutes de l'aéroport Roissy-CDG. 109 chambres surplombant la forêt, un centre de convention de 700 m² avec terrasses privées, 12 salles de réunion dont la salle Halphen de 380 m² pouvant accueillir 300 personnes en cocktail, un spa avec piscine intérieure et jacuzzi, un rooftop exclusif et une cuisine bistronomique raffinée. Labellisé Green Key, le domaine allie prestige et engagement responsable pour vos événements de 100 à 300 personnes.",
    roomsTotal: 109,
    roomsTwin: 48,
    bedroomText: "109 chambres et suites surplombant la forêt de Chantilly, dont 48 en configuration Twin idéales pour vos séminaires résidentiels. Le standing InterContinental se retrouve dans chaque détail : literie d'exception, service pressing, conciergerie dédiée. Spa complet avec piscine intérieure chauffée, jacuzzi, sauna et salle fitness pour décompresser entre vos sessions de travail. Rooftop exclusif avec vue panoramique sur la forêt.",
    meetingText: "12 salles de réunion au sein d'un centre de convention de 700 m² avec terrasses privées. La salle Halphen de 380 m² accueille jusqu'à 250 personnes en théâtre et 300 en cocktail — idéale pour vos plénières et soirées de gala. Une Creativity Room dédiée à l'innovation, des salons de board de 33 à 108 m² pour vos comités de direction. Équipements complets : vidéoprojection, son professionnel, écrans LCD, micro et WiFi haut débit.",
    meetingRooms: 12,
    faq: [
      {
        question: "Quelle est la capacité maximale du domaine ?",
        answer: "Le centre de convention de 700 m² et la salle Halphen de 380 m² accueillent jusqu'à 300 personnes en cocktail et 250 en théâtre. 109 chambres et suites, dont 48 en configuration Twin, pour vos séminaires résidentiels. Privatisation complète du domaine possible."
      },
      {
        question: "Quels sont les équipements bien-être ?",
        answer: "Spa complet avec piscine intérieure chauffée, jacuzzi, sauna finlandais et salle fitness équipée. Rooftop exclusif avec vue panoramique sur la forêt de Chantilly. Activités outdoor : tennis, pétanque, VTT et équitation à proximité."
      },
      {
        question: "Quelle est la proximité avec les aéroports et Paris ?",
        answer: "À seulement 15 minutes de l'aéroport Roissy-CDG, 40 minutes de Paris par l'A1 et 8 minutes de la gare d'Orry-la-Ville. Un emplacement stratégique pour vos conventions internationales. Parking avec bornes de recharge électriques et voiturier disponible."
      },
      {
        question: "Le domaine est-il éco-responsable ?",
        answer: "Le domaine est labellisé Green Key, garantissant un engagement fort en matière de responsabilité environnementale. Bornes de recharge pour véhicules électriques, cuisine bistronomique privilégiant les produits locaux et de saison, gestion responsable des ressources."
      },
      {
        question: "Quelles activités team-building proposez-vous ?",
        answer: "Un programme complet : cours de cuisine et œnologie, VTT et équitation en forêt de Chantilly, rallye et chasse au trésor, murder party, olympiades sportives, ateliers créatifs et artistiques, karaoké et blind test. Coordinateur événementiel dédié pour personnaliser votre programme."
      },
      {
        question: "Proposez-vous une restauration gastronomique ?",
        answer: "Notre cuisine bistronomique met en valeur les produits locaux et de saison dans un cadre raffiné. Menus personnalisables pour vos déjeuners et dîners d'affaires. Service traiteur événementiel pour cocktails et soirées de gala. Tous les régimes alimentaires accommodés."
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
    image: imgPath("Chateau de Montvillargene", "chateau-montvillargene-60-oise-chateau-montvillargene-60-oise-chateau-montvillargene-60-oise-j&f-4-copie.webp"),
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
    image: imgPath("Chateau Mont Royal", "chateau-mont-royal-60-oise-chantilly-salle-reunion-board-u-rectangulaire-chaises-beiges-ecran.webp"),
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
    image: "/images/evenement-entreprise-chateau-montvillargenne-salle-pleniere-theatre.webp",
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
    image: "/images/team-building-chateau-activites-entreprise.webp",
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "1",
    nom: "Sophie Moreau",
    entreprise: "TechVision France",
    poste: "Directrice des Ressources Humaines",
    contenu:
      "Ce domaine a transformé notre séminaire annuel en une expérience inoubliable. Le cadre exceptionnel et le service impeccable ont permis à nos équipes de renforcer leur cohésion.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&auto=format&fit=crop&q=80",
    note: 5,
  },
  {
    id: "2",
    nom: "Mamadou Diallo",
    entreprise: "Groupe InnovBank",
    poste: "Directeur Général",
    contenu:
      "Une convention annuelle mémorable dans ce refuge historique. Infrastructure moderne et prestige du lieu ont impressionné nos 180 collaborateurs. L'équipe sur place s'est montrée d'une réactivité remarquable.",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&auto=format&fit=crop&q=80",
    note: 5,
  },
  {
    id: "3",
    nom: "Isabelle Laurent",
    entreprise: "Creative Solutions",
    poste: "Chef de Projet Événementiel",
    contenu:
      "Un cadre magique pour nos événements clients. La restauration exceptionnelle et l'attention aux détails font toute la différence. Nos clients repartent toujours enchantés.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&auto=format&fit=crop&q=80",
    note: 5,
  },
  {
    id: "4",
    nom: "Thomas Beaumont",
    entreprise: "Luxe Consulting Group",
    poste: "Associé Fondateur",
    contenu:
      "Un lieu qui reflète nos valeurs d'excellence. Cette abbaye cistercienne a dépassé toutes nos attentes pour notre gala annuel. L'authenticité médiévale combinée au luxe contemporain crée une ambiance unique.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80",
    note: 5,
  },
  {
    id: "5",
    nom: "Leïla Benali",
    entreprise: "Airbus Group",
    poste: "Responsable Événementiel International",
    contenu:
      "Des conventions internationales réussies dans ce grand domaine de Chantilly. Les infrastructures sont de niveau international et le cadre forestier offre une déconnexion bienvenue.",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&auto=format&fit=crop&q=80",
    note: 5,
  },
  {
    id: "6",
    nom: "Rachid El Fassi",
    entreprise: "BNP Paribas Asset Management",
    poste: "Directeur de la Stratégie",
    contenu:
      "Une discrétion rare pour nos réunions stratégiques. L'accessibilité et le jardin suspendu créent une bulle hors du temps en plein cœur de la région parisienne.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80",
    note: 5,
  },
  {
    id: "7",
    nom: "Valérie Rousseau",
    entreprise: "L'Oréal Paris",
    poste: "VP Marketing Europe",
    contenu:
      "Cette abbaye cistercienne a offert un effet 'wow' garanti pour notre lancement produit. Les salles voûtées ont apporté une dimension spectaculaire à notre événement. Un succès retentissant.",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80",
    note: 5,
  },
  {
    id: "8",
    nom: "Antoine Chevalier",
    entreprise: "Mercedes-Benz France",
    poste: "Directeur Commercial",
    contenu:
      "Un lieu à la hauteur de notre image de marque. Ce domaine a été parfait pour notre convention. Le parc nous a permis d'organiser des essais privés dans un cadre somptueux.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&auto=format&fit=crop&q=80",
    note: 5,
  },
  {
    id: "9",
    nom: "Aminata Touré",
    entreprise: "Orange Business Services",
    poste: "Chief Innovation Officer",
    contenu:
      "Un environnement inspirant pour notre séminaire d'innovation. L'architecture historique mêlée aux équipements modernes a créé le parfait équilibre entre tradition et innovation.",
    avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=300&auto=format&fit=crop&q=80",
    note: 5,
  },
  {
    id: "10",
    nom: "François Legrand",
    entreprise: "LVMH Corporate",
    poste: "Directeur des Affaires Publiques",
    contenu:
      "Ce domaine incarne nos valeurs : patrimoine, excellence et raffinement. Nos partenaires institutionnels ont été conquis par l'authenticité du lieu et la qualité du service.",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&auto=format&fit=crop&q=80",
    note: 5,
  },
  {
    id: "12",
    nom: "Laurent Deschamps",
    entreprise: "Danone Groupe",
    poste: "VP Human Resources",
    contenu:
      "Un team-building qui a dépassé nos espérances. Les activités sur l'étang et dans le parc ont renforcé la cohésion de nos équipes de direction. Un moment authentique et fédérateur.",
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
    valeur: 4,
    label: "Lieux d'exception",
  },
  {
    valeur: 500,
    unite: "+",
    label: "Événements organisés",
  },
  {
    valeur: 98,
    suffix: "%",
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
  { nom: "Orange", url: "/logos/orange.svg" },
  { nom: "BNP Paribas", url: "/logos/bnp-paribas.svg" },
  { nom: "LVMH", url: "/logos/lvmh.svg" },
  { nom: "Danone", url: "/logos/danone.svg" },
];

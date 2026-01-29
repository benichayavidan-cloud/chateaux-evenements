import { Chateau, TypeEvenement, Testimonial, ChiffreCle } from "@/types";

// URLs des images - Supabase en production, local en dev
const IMAGES_BASE = "/Users/avidanbenichay/Documents/Mes Projets d'apps/Mes projets/SELECT CHATEAUX/SITE-WEB/IMAGES";
const SUPABASE_URL = "https://jmeiepmtgidqtmxfnlwf.supabase.co/storage/v1/object/public/chateaux-images";

const imgPath = (folder: string, filename: string) => {
  // En production (ou si process.env.USE_SUPABASE est true), utiliser Supabase
  if (process.env.NODE_ENV === 'production' || process.env.USE_SUPABASE === 'true') {
    return `${SUPABASE_URL}/${encodeURIComponent(folder)}/${encodeURIComponent(filename)}`;
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
      "Le plus vaste domaine de la région. Une architecture anglo-normande majestueuse au cœur d'une forêt privée, à 35 minutes de Paris. Capacité exceptionnelle avec amphithéâtre et spa de prestige.",
    atouts: [
      "Capacité 280 pers",
      "120 Chambres",
      "Spa de Prestige",
      "Amphithéâtre Privé",
    ],
    images: {
      hero: [
        imgPath("Chateau de Montvillargene", "chateau-montvillargene-60-oise-chateau-montvillargene-60-oise-chateau-montvillargene-60-oise-facade-chateau-architecture-classique-francaise.webp"),
        imgPath("Chateau de Montvillargene", "chateau-montvillargene-60-oise-chateau-montvillargene-60-oise-chateau-montvillargene-60-oise-facade-automne-lierre-rouge-arc-en-ciel.webp"),
        imgPath("Chateau de Montvillargene", "chateau-montvillargene-60-oise-chateau-montvillargene-60-oise-chateau-montvillargene-60-oise-auditorium-conference-led-bleu-ecran-geant.webp"),
        imgPath("Chateau de Montvillargene", "chateau-montvillargene-60-oise-chateau-montvillargene-60-oise-chateau-montvillargene-60-oise-salle-seminaire-theatre-pierre-apparente-bois.webp"),
      ],
      openGraph: imgPath("Chateau de Montvillargene", "chateau-montvillargene-60-oise-chateau-montvillargene-60-oise-chateau-montvillargene-60-oise-facade-chateau-architecture-classique-francaise.webp"),
      card: imgPath("Chateau de Montvillargene", "chateau-montvillargene-60-oise-chateau-montvillargene-60-oise-chateau-montvillargene-60-oise-facade-chateau-architecture-classique-francaise.webp"),
      galerie: [
        imgPath("Chateau de Montvillargene", "chateau-montvillargene-60-oise-chateau-montvillargene-60-oise-chateau-montvillargene-60-oise-allee-entree-parc-arbres-perspective.webp"),
        imgPath("Chateau de Montvillargene", "chateau-montvillargene-60-oise-chateau-montvillargene-60-oise-chateau-montvillargene-60-oise-auditorium-conference-led-bleu-ecran-geant.webp"),
        imgPath("Chateau de Montvillargene", "chateau-montvillargene-60-oise-chateau-montvillargene-60-oise-chateau-montvillargene-60-oise-chambre-moderne-epuree-tete-lit-taupe.webp"),
        imgPath("Chateau de Montvillargene", "chateau-montvillargene-60-oise-chateau-montvillargene-60-oise-chateau-montvillargene-60-oise-j&f-4-copie.webp"),
        imgPath("Chateau de Montvillargene", "chateau-montvillargene-60-oise-chateau-montvillargene-60-oise-chateau-montvillargene-60-oise-lobby-hall-moderne-colore-fauteuils-design.webp"),
        imgPath("Chateau de Montvillargene", "chateau-montvillargene-60-oise-chateau-montvillargene-60-oise-chateau-montvillargene-60-oise-pavillon-moderne-parc-architecture-verre.webp"),
        imgPath("Chateau de Montvillargene", "chateau-montvillargene-60-oise-chateau-montvillargene-60-oise-chateau-montvillargene-60-oise-salle-seminaire-theatre-pierre-apparente-bois.webp"),
      ],
    },
    slug: "manoir-anglo-normand-chantilly",
    seoH1: "Grand Château de style Anglo-Normand à Chantilly",
    seoTitle: "Château Séminaire Chantilly (60) | Grand Domaine 280 pers",
    accrocheHero: "Architecture Majestueuse & Spa de Prestige à 35 min de Paris",
    descriptionLongue: "Le domaine de référence pour vos conventions d'envergure. Une architecture anglo-normande exceptionnelle de 120 chambres, nichée au cœur d'une forêt privée. L'unique lieu de l'Oise capable d'accueillir 280 personnes en résidentiel, avec un amphithéâtre privé de 280 places et un spa de prestige de 800m².",
    roomsTotal: 120,
    roomsTwin: 103,
    bedroomText: "120 chambres au décor contemporain ou traditionnel, dont 103 en configuration Twin. Vue apaisante sur la forêt ou le parc privé.",
    meetingText: "18 salles de réunion éclairées à la lumière du jour, dont un amphithéâtre de 280 places équipé d'une régie audiovisuelle complète pour vos plénières.",
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
      "Un écrin de confidentialité aux portes de Paris. Bâtisse du XVIIe siècle classée Monument Historique, transformée en hôtel 5 étoiles. Jardin suspendu avec vue panoramique et accessibilité métro unique.",
    atouts: [
      "Luxe 5 Étoiles",
      "Jardin Suspendu",
      "Accessible Métro",
      "Gastronomie",
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
    accrocheHero: "Bâtisse Classée du XVIIe & Jardin Suspendu avec Vue sur Paris",
    descriptionLongue: "Un refuge d'exception pour vos événements confidentiels. Cette bâtisse du XVIIe siècle classée Monument Historique a été transformée en hôtel 5 étoiles. Le seul domaine château accessible en métro, offrant un jardin suspendu classé avec vue panoramique sur Paris. L'adresse privilégiée pour vos CODIR et séminaires stratégiques de 80 à 180 personnes.",
    roomsTotal: 83,
    roomsTwin: 16,
    bedroomText: "83 chambres et suites au design raffiné, imaginées par un architecte de renom. Calme absolu aux portes de Paris.",
    meetingText: "Des espaces de travail modulables ouverts sur le jardin classé, alliant technologie de pointe et cadre monacal propice à la réflexion stratégique.",
    faq: [
      {
        question: "Comment accéder au domaine en transports en commun ?",
        answer: "Le domaine est accessible en métro à 5 minutes à pied de la station. Des navettes privées peuvent être organisées depuis l'aéroport ou les gares pour vos participants."
      },
      {
        question: "Quel est le standing de l'établissement ?",
        answer: "Hôtel 5 étoiles avec service de conciergerie personnalisé. Cette bâtisse historique du XVIIe siècle est classée Monument Historique, tout comme son jardin suspendu exceptionnel."
      },
      {
        question: "Quelle est l'histoire de ce lieu exceptionnel ?",
        answer: "Cette bâtisse du XVIIe siècle a été transformée en hôtel 5 étoiles tout en préservant son caractère historique. Le jardin suspendu classé offre une vue imprenable sur Paris."
      },
      {
        question: "Quels types d'événements organisez-vous principalement ?",
        answer: "Le domaine est spécialisé dans les événements confidentiels haut de gamme : CODIR, COMEX, séminaires stratégiques, dîners d'affaires et réceptions privées pour 80 à 180 personnes. La confidentialité absolue est garantie."
      },
      {
        question: "Proposez-vous de la restauration gastronomique ?",
        answer: "Notre chef étoilé propose une cuisine gastronomique raffinée avec des menus personnalisables. Nous disposons d'une cave à vins exceptionnelle et pouvons organiser des dégustations commentées. Tous les régimes alimentaires peuvent être accommodés."
      },
      {
        question: "Y a-t-il un espace bien-être ?",
        answer: "Le domaine dispose d'un spa privatisable situé dans une chapelle désacralisée classée, créant une ambiance unique. Parfait pour des moments de détente entre les sessions de travail."
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
      "Déconnexion radicale en pleine nature. Une abbaye cistercienne monumentale classée Monument Historique, avec ruines romantiques et étang privé de 70 hectares. L'effet 'Wow' garanti.",
    atouts: [
      "Site Classé MH",
      "Salles Voûtées",
      "Étang 70 Hectares",
      "Ruines Romantiques",
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
    accrocheHero: "Abbaye du XIIe Siècle & Étang Privé de 70 Hectares",
    descriptionLongue: "L'effet 'Wow' garanti pour vos événements d'exception. Cette abbaye cistercienne du XIIe siècle classée Monument Historique s'étend sur un domaine de 70 hectares avec étang privé. Ses ruines romantiques et ses salles voûtées monumentales créent un cadre spectaculaire pour vos soirées de gala et séminaires résidentiels de 60 à 150 personnes. Déconnexion totale garantie.",
    roomsTotal: 147,
    roomsTwin: null,
    bedroomText: "147 chambres réparties entre l'abbaye historique et le domaine. Une décoration raffinée inspirée du patrimoine cistercien.",
    meetingText: "Des salons historiques voûtés pour vos plénières grandioses et des espaces de réunion intimistes au bord de l'étang.",
    faq: [
      {
        question: "Peut-on organiser des soirées festives ?",
        answer: "Oui, le domaine est isolé sans contrainte sonore. Les salles voûtées offrent une acoustique exceptionnelle pour vos soirées de gala et événements musicaux."
      },
      {
        question: "Quelles activités proposez-vous ?",
        answer: "Barque sur l'étang de 70 hectares, Escape Game géant dans les ruines historiques, olympiades dans le parc, parcours d'orientation en forêt, ateliers œnologie et dégustations."
      },
      {
        question: "Quelle est l'histoire de cette abbaye cistercienne ?",
        answer: "Cette abbaye cistercienne fondée au XIIe siècle a été classée Monument Historique en 1994. Située dans le Parc naturel régional de la Vallée de Chevreuse, elle offre un cadre historique exceptionnel avec ses salles voûtées monumentales et ses ruines romantiques."
      },
      {
        question: "Quelle est la taille du parc et de l'étang ?",
        answer: "Le domaine s'étend sur 65 hectares de parc boisé avec un étang majestueux de 70 hectares. Des barques sont disponibles pour des promenades bucoliques ou des activités team-building nautiques. Le cadre naturel exceptionnel garantit une déconnexion totale."
      },
      {
        question: "Quelle est la capacité d'accueil du domaine ?",
        answer: "Le domaine dispose de vastes salles de réunion modulables et peut accueillir de 60 à 150 personnes en résidentiel avec 147 chambres réparties entre l'abbaye et le domaine."
      },
      {
        question: "À quelle distance de Paris se situe le domaine ?",
        answer: "Le domaine est situé à environ 40 kilomètres au sud-ouest de Paris dans les Yvelines (78), soit environ 45 minutes en voiture. Un service de navettes privées peut être organisé depuis Paris ou les gares pour faciliter l'accès de vos participants."
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
      "Le raffinement à la française. Une architecture classique prestigieuse au cœur d'une forêt de 500 hectares. Lustres de cristal, salles de bal grandioses et spa prestige de 1500m² pour vos événements les plus prestigieux.",
    atouts: [
      "Style Louis XV",
      "Salle de Bal",
      "Spa 1500m²",
      "Forêt 500 hectares",
    ],
    images: {
      hero: [
        imgPath("Chateau Mont Royal", "chateau-mont-royal-60-oise-chantilly-vue-aerienne-chateau-lever-soleil-foret-architecture-classique.webp"),
        imgPath("Chateau Mont Royal", "chateau-mont-royal-60-oise-chantilly-facade-exterieur-chateau-pierre-terrasse-parasols-parc.webp"),
        imgPath("Chateau Mont Royal", "chateau-mont-royal-60-oise-chantilly-salle-reunion-board-u-rectangulaire-chaises-beiges-ecran.webp"),
        imgPath("Chateau Mont Royal", "chateau-mont-royal-60-oise-chantilly-restaurant-bar-luxe-rotonde-circulaire-baies-panoramiques.webp"),
      ],
      openGraph: imgPath("Chateau Mont Royal", "chateau-mont-royal-60-oise-chantilly-vue-aerienne-chateau-lever-soleil-foret-architecture-classique.webp"),
      card: imgPath("Chateau Mont Royal", "chateau-mont-royal-60-oise-chantilly-vue-aerienne-chateau-lever-soleil-foret-architecture-classique.webp"),
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
    accrocheHero: "Architecture Classique Louis XV & Spa Prestige 1500m²",
    descriptionLongue: "Le lieu ultime pour vos événements prestigieux. Une architecture classique française grandiose au cœur d'une forêt domaniale de 500 hectares. Ce château 5 étoiles de 108 chambres allie le charme du patrimoine français à la technologie moderne. Avec son spa prestige de 1500m² et sa majestueuse salle de bal, c'est l'adresse de référence pour vos galas et conventions de 100 à 200 personnes.",
    roomsTotal: 108,
    roomsTwin: 48,
    bedroomText: "108 chambres et suites au style classique français. 48 chambres en configuration Twin pour faciliter l'organisation de vos séminaires résidentiels.",
    meetingText: "12 salons de conférence baignés de lumière naturelle. Notre majestueuse salle de bal modulable se transforme au gré de vos ambitions pour théâtraliser vos lancements de produits et événements prestigieux.",
    faq: [
      {
        question: "Quelle est la capacité maximale du domaine ?",
        answer: "Le domaine peut accueillir jusqu'à 200 personnes en résidentiel avec 108 chambres et suites. La salle de bal historique avec ses lustres monumentaux peut recevoir 200 convives assis pour vos galas et conventions."
      },
      {
        question: "Quels sont les équipements du spa prestige ?",
        answer: "Le spa de 1500m² comprend une piscine de 25 mètres, un parcours aquatique avec jets massants, sauna finlandais, hammam, cabines de soins avec produits de luxe, et un fitness center équipé des dernières technologies. Entièrement privatisable."
      },
      {
        question: "Le style architectural est-il authentique ?",
        answer: "Le domaine a été construit dans le pur style classique français avec moulures dorées, parquets nobles, lustres de cristal et tapisseries d'époque. Une restauration minutieuse a préservé l'authenticité du lieu tout en intégrant les technologies modernes."
      },
      {
        question: "Quelle est la taille de la forêt et quelles activités proposez-vous ?",
        answer: "Le domaine est situé au cœur d'une forêt domaniale de 500 hectares. Nous proposons chasse au trésor, rallye 4x4, parcours d'orientation, VTT électrique, course d'orientation nocturne et olympiades forestières avec coordinateur expert."
      },
      {
        question: "Proposez-vous une table gastronomique ?",
        answer: "Notre chef étoilé propose une cuisine gastronomique française raffinée avec des techniques contemporaines. Cave exceptionnelle de grands crus. Menus personnalisables et régimes spéciaux accommodés."
      },
      {
        question: "À quelle distance de Paris et des aéroports ?",
        answer: "Situé à 40 minutes de Paris par l'autoroute A1 et à 30 minutes de l'aéroport Roissy Charles de Gaulle. Service de navettes privées disponible depuis Paris, les gares et aéroports. Héliport à proximité pour arrivées VIP."
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
    image: imgPath("Chateau de Montvillargene", "chateau-montvillargene-60-oise-chateau-montvillargene-60-oise-chateau-montvillargene-60-oise-auditorium-conference-led-bleu-ecran-geant.webp"),
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
    image: "/images/team-building-chateau-activites-entreprise.jpg",
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
  { nom: "Orange", url: "/logos/orange.svg" },
  { nom: "BNP Paribas", url: "/logos/bnp-paribas.svg" },
  { nom: "LVMH", url: "/logos/lvmh.svg" },
  { nom: "Danone", url: "/logos/danone.svg" },
];

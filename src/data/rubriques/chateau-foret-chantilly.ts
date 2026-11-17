/**
 * #60-BELVEDERE — rubriques du domaine (château-hôtel en forêt de Chantilly).
 *
 * Sources lues le 16/11/2026 (jamais affichées : elles portent le vrai nom) :
 *  - BROCHURE : brochure MICE officielle du lieu (PDF, 12 pages, 2026).
 *               p.3 chiffres clés (109 clés, 10 salons, parking, spa, parc 5 ha),
 *               p.4 hébergement, p.5 offres culinaires, p.6 journées d'étude et
 *               écran LED, p.7 plan des espaces, p.8 tableau des capacités,
 *               p.9 accès, p.11 team building.
 *  - SITE     : site officiel du lieu, page d'accueil (style Louis XVI, terrasses,
 *               restaurant de la bibliothèque, court de tennis).
 *  - PRATIQUE : site officiel, page « informations pratiques » (gares et
 *               distances, Roissy-CDG, parking, transferts, piscine chauffée,
 *               sentier de 20 min, horaires d'arrivée et de départ).
 *  - FICHE    : fiche Select Châteaux existante (src/data/chateaux.ts, id 4) —
 *               utilisée seulement pour les photos ; quand elle diverge de la
 *               brochure (nombre de salons, banquet, cocktail, chambres twin),
 *               c'est la brochure qui fait foi.
 *
 * Noms de salles, de restaurant et de bars : les noms réels (noms de
 * compositeurs et d'artistes lyriques) trahiraient le lieu (blind booking
 * strict, 15/11) — chaque espace porte un nom descriptif ; surfaces et
 * capacités sont celles du tableau de la brochure (p.8). La colonne « Board »
 * de la brochure n'a pas de champ dédié : elle est reprise dans `note`.
 *
 * Volontairement écartés : les prix (brochure p.5-6), la « murder party », les
 * jeux d'enquête et l'escape game (brochure p.11), le nom de la marque de soins
 * du spa (site officiel).
 */
import type { RubriquesDomaine } from '../../types/rubriques.ts';
import { chateauImage } from '../../lib/media.ts';

const BROCHURE = 'Brochure MICE officielle du lieu (PDF 2026), lue le 16/11/2026';
const SITE = "Site officiel du lieu, page d'accueil, consultée le 16/11/2026";
const PRATIQUE = 'Site officiel du lieu, page informations pratiques, consultée le 16/11/2026';
const FICHE = 'Fiche Select Châteaux (data/chateaux.ts, id 4), 16/11/2026';

const img = (nom: string) => `/images/seminaire-chateau-foret-chantilly-${nom}.webp`;
const stock = (nom: string) => chateauImage('Chateau Foret Chantilly', `seminaire-chateau-foret-chantilly-${nom}.webp`);

export const rubriquesChateauForet: RubriquesDomaine = {
  salles: {
    seoTitle: 'Salles de séminaire en forêt de Chantilly : 380 m²',
    titreSection: "Centre de séminaires en forêt de Chantilly : plénière de 380 m²",
    conseil:
      "Pour une convention, la plénière s'équipe d'un mur LED de 5 mètres sur 2,5. Et notre bureau de coordination, au même niveau que les salons, suit votre programme toute la journée.",
    seoDescription:
      "Plénière de 380 m² pour 250 personnes, mur LED de 5 m, 9 salles de sous-commission de 33 à 75 m² autour d'un patio. Capacités salle par salle.",
    resume:
      "10 salons autour d'un patio : une plénière de 380 m² pour 250 personnes et 9 salles de sous-commission de 33 à 75 m².",
    intro:
      "Notre centre de séminaires réunit 10 salons autour d'un patio lumineux où se prennent les pauses. La salle plénière de 380 m², éclairée par la lumière du jour, s'ouvre sur une terrasse face à la forêt ; elle se divise en plusieurs espaces. Neuf salles de sous-commission, de 33 à 75 m², accueillent vos ateliers.",
    faits: [
      { label: 'Salons', valeur: '10', source: BROCHURE },
      { label: 'Salle plénière', valeur: '380 m²', source: BROCHURE },
      { label: 'Plénière en théâtre', valeur: '250 personnes', source: BROCHURE },
      { label: 'Mur LED de la plénière', valeur: '5 × 2,5 m', source: BROCHURE },
    ],
    salles: [
      { nom: 'La Salle plénière', surfaceM2: 380, theatre: 250, classe: 150, enU: 45, banquet: 200, cocktail: 270, cabaret: 144, note: 'divisible ; 60 en table de réunion ; mur LED de 5 × 2,5 m' },
      { nom: 'La Plénière, grande partie', surfaceM2: 204, theatre: 120, classe: 60, enU: 33, banquet: 42, cocktail: null, cabaret: 72, note: '42 en table de réunion' },
      { nom: 'La Plénière, salon nord', surfaceM2: 33, theatre: 30, classe: 18, enU: 15, banquet: null, cocktail: null, cabaret: 10, note: '18 en table de réunion' },
      { nom: 'La Plénière, salon ouest', surfaceM2: 42, theatre: 30, classe: 18, enU: 15, banquet: null, cocktail: null, cabaret: 10, note: '18 en table de réunion' },
      { nom: 'La Plénière, salon est', surfaceM2: 42, theatre: 30, classe: 18, enU: 15, banquet: null, cocktail: null, cabaret: 10, note: '18 en table de réunion' },
      { nom: 'Le Grand Salon', surfaceM2: 75, theatre: 70, classe: 42, enU: 33, banquet: 50, cocktail: 50, cabaret: 40, note: '36 en table de réunion' },
      { nom: 'Le Salon de la Terrasse', surfaceM2: 40, theatre: 20, classe: 18, enU: 15, banquet: 20, cocktail: 18, cabaret: 18, note: '15 en table de réunion' },
      { nom: 'Le Salon du Patio', surfaceM2: 48, theatre: 30, classe: 18, enU: 21, banquet: null, cocktail: null, cabaret: 28, note: '21 en table de réunion' },
      { nom: "L'Atelier créatif", surfaceM2: 52, theatre: 19, classe: 19, enU: 19, banquet: null, cocktail: null, cabaret: 19, note: '19 en table de réunion' },
      { nom: 'Le Salon du rez-de-chaussée', surfaceM2: 108, theatre: 70, classe: 45, enU: 36, banquet: 50, cocktail: 50, cabaret: 35, note: 'divisible en deux ; 42 en table de réunion' },
      { nom: 'Rez-de-chaussée, partie 1', surfaceM2: 56, theatre: 30, classe: 18, enU: 18, banquet: null, cocktail: null, cabaret: 14, note: '18 en table de réunion' },
      { nom: 'Rez-de-chaussée, partie 2', surfaceM2: 52, theatre: 25, classe: 18, enU: 15, banquet: null, cocktail: null, cabaret: 14, note: '18 en table de réunion' },
    ],
    photos: [
      { src: img('salle-pleniere'), legende: 'La salle plénière en configuration cabaret, tables rondes et écran' },
      { src: stock('salle-reunion-en-u'), legende: 'Un salon de réunion dressé en U' },
      { src: img('salon-reunion-1'), legende: 'Salon de sous-commission en U, éclairé par la lumière du jour' },
      { src: img('salon-reunion-4'), legende: 'Salon de réunion en disposition classe' },
      { src: img('salle-creative'), legende: 'Un salon en disposition théâtre' },
      { src: img('salon-reunion-1-bis'), legende: 'Salon en U, vue vers les fenêtres' },
      { src: img('patio'), legende: 'Le patio sous verrière, espace de pause au cœur des salons' },
    ],
    blocs: [
      {
        titre: 'Une plénière de 380 m² ouverte sur la forêt',
        texte:
          "La salle plénière reçoit 250 personnes en théâtre, 150 en classe, 200 en banquet ou 270 en cocktail. Elle est éclairée par la lumière du jour et donne sur une terrasse face à la forêt. Un mur LED de 5 mètres sur 2,5 (résolution 1920 × 960) sert d'écran principal.",
      },
      {
        titre: 'Une salle qui se divise',
        texte:
          "La plénière se cloisonne : une grande partie de 204 m² (120 places en théâtre) et trois salons de 33 à 42 m² pour une trentaine de personnes chacun. Le matin en séance commune, l'après-midi en ateliers, sans changer de bâtiment.",
      },
      {
        titre: 'Neuf salles pour les ateliers',
        texte:
          "Autour du patio, les salles de sous-commission vont de 33 à 75 m². Le grand salon reçoit 70 personnes en théâtre ; au rez-de-chaussée, un salon de 108 m² se divise en deux espaces de 56 et 52 m². Pour un comité de direction, la plupart se dressent en table de réunion de 15 à 21 places.",
      },
      {
        titre: 'Les pauses dans le patio',
        texte:
          "Le patio lumineux, au centre des salons, accueille les pauses et les échanges entre deux sessions. Un bureau de coordination événementielle se trouve sur le même niveau : notre équipe y suit votre programme pendant toute la journée.",
      },
    ],
    blocsSection: [0, 1],
    sections: [
      {
        ancre: 'salle-signature',
        etiquette: "La salle plénière",
        titre: "Une plénière de 380 m² à la lumière du jour, face à la forêt",
        intro:
          "Notre salle plénière de 380 m² reçoit 250 participants en théâtre pour votre convention. Éclairée par la lumière du jour, elle s'ouvre sur une terrasse avec vue sur la forêt de Chantilly.",
        blocs: [
          { titre: "Une terrasse dans le prolongement", texte: "La terrasse de la plénière accueille la pause, le déjeuner ou le cocktail de vos participants à la belle saison : on passe de la séance de travail au grand air en quelques pas." },
          { titre: "Le soir, votre dîner de gala", texte: "Après la convention, la même salle reçoit jusqu'à 200 convives en banquet et 270 en cocktail dînatoire." },
        ],
        faits: [
          { label: "Surface", valeur: "380 m²" },
          { label: "En théâtre", valeur: "250 places" },
          { label: "En banquet", valeur: "200 convives" },
          { label: "Mur LED", valeur: "5 × 2,5 m" },
        ],
        photos: [
          { src: img('salle-pleniere'), legende: "La salle plénière en configuration cabaret, tables rondes et écran" },
          { src: img('terrasse-exterieure'), legende: "La terrasse dressée, vue vers la forêt" },
        ],
        conseil:
          "Pour une convention suivie d'une soirée, restez dans la plénière : 250 participants en théâtre la journée, puis 200 convives à table pour le dîner de gala.",
      },
      {
        ancre: 'ateliers',
        etiquette: 'Ateliers et sous-commissions',
        titre: "Neuf salles de sous-commission autour d'un patio",
        intro:
          "Après la plénière, les sous-commissions de votre séminaire se répartissent dans neuf salles de 33 à 75 m², autour d'un patio lumineux.",
        reprend: [2, 3],
        blocs: [
          { titre: "Deux terrasses pour prolonger les ateliers", texte: "Deux grandes terrasses prolongent nos salons de réunion : vos participants y prennent la pause ou le déjeuner à la belle saison." },
        ],
        faits: [
          { label: "Salles de sous-commission", valeur: "9, de 33 à 75 m²" },
          { label: "Grand salon", valeur: "70 places en théâtre" },
          { label: "Comité de direction", valeur: "de 15 à 21 places dans la plupart des salons" },
        ],
        reprendPhotos: [2, 3, 6],
        photos: [],
        conseil:
          "Pour une session de créativité pendant votre séminaire, demandez-moi l'Atelier créatif : 19 participants, quelle que soit la disposition.",
      },
    ],
    sources: [BROCHURE, FICHE],
  },

  chambres: {
    seoTitle: 'Séminaire résidentiel à Chantilly : 109 chambres (60)',
    titreSection: "Hébergement de séminaire en château 5 étoiles : 109 chambres et suites",
    conseil:
      "Pour les participants qui arrivent tôt ou repartent tard de votre séminaire : l'arrivée se fait à partir de 15 h, le départ jusqu'à midi, et le room service fonctionne 24 heures sur 24.",
    seoDescription:
      "109 chambres et suites ouvertes sur la forêt de Chantilly, dont 18 suites et 45 chambres convertibles en twin. Balcons, terrasses, room service 24h/24.",
    resume:
      "109 chambres et suites ouvertes sur la forêt, dont 18 suites et 45 chambres convertibles en twin pour vos groupes.",
    intro:
      "Pour un séminaire résidentiel, nos 109 chambres et suites logent tous vos participants sur place, à quelques pas des salles de réunion. Lumineuses, elles ouvrent sur la forêt de Chantilly. Le château peut être privatisé sur demande pour votre événement d'entreprise.",
    faits: [
      { label: 'Chambres et suites', valeur: '109', source: BROCHURE },
      { label: 'Suites', valeur: '18', source: BROCHURE },
      { label: 'Convertibles en twin', valeur: '45 chambres', source: BROCHURE },
      { label: 'Room service', valeur: '24h/24', source: BROCHURE },
    ],
    photos: [
      { src: img('chambre-premium-terrasse'), legende: 'Chambre premium avec terrasse' },
      { src: img('chambre-premium-balcon'), legende: 'Chambre premium avec balcon' },
      { src: img('chambre-twin'), legende: 'Chambre twin, deux lits séparés' },
      { src: img('junior-suite'), legende: 'Une junior suite' },
      { src: img('suite-royale-1'), legende: "Le salon d'une suite" },
      { src: img('suite-prestige-1'), legende: "Salon de suite ouvert sur la forêt" },
      { src: img('salle-de-bain'), legende: 'Une salle de bains en marbre' },
    ],
    blocs: [
      {
        titre: 'Des catégories pour chaque participant',
        texte:
          "91 chambres en trois catégories (cosy, classique et premium) et 18 suites vous permettent de loger chaque participant selon son rôle. Certaines chambres ont un balcon ou une terrasse. Les suites conviennent à vos intervenants et à votre direction.",
      },
      {
        titre: 'Pensées pour les groupes',
        texte:
          "45 chambres peuvent être converties en twin, avec deux lits séparés : une solution pratique pour loger un grand groupe. Des chambres accessibles aux participants à mobilité réduite sont disponibles.",
      },
      {
        titre: 'Le confort pour travailler',
        texte:
          "Chaque chambre est climatisée et dispose d'un espace de travail, pour préparer la session du lendemain. Le room service fonctionne 24 heures sur 24. L'arrivée de vos participants se fait à partir de 15 h et le départ jusqu'à midi.",
      },
    ],
    blocsSection: [0, 2],
    sections: [
      {
        ancre: "grand-groupe",
        etiquette: "Grands groupes",
        titre: "45 chambres twin pour loger un grand groupe en forêt de Chantilly",
        intro:
          "Pour un séminaire résidentiel en grand groupe, tous vos participants logent au château, à quelques pas des salles de réunion.",
        reprend: [1],
        blocs: [
          { titre: "Le château pour votre événement", texte: "Le château peut être privatisé sur demande pour votre événement d'entreprise, avec ses 109 chambres et suites." },
        ],
        faits: [
          { label: "Chambres et suites", valeur: "109" },
          { label: "Chambres convertibles en twin", valeur: "45" },
          { label: "Chambres accessibles", valeur: "aux participants à mobilité réduite" },
        ],
        reprendPhotos: [2, 1],
        photos: [
        ],
        conseil:
          "Pour une convention, dites-moi combien de participants partagent une chambre : 45 chambres se convertissent en twin, avec deux lits séparés.",
      },
      {
        ancre: "direction-invites",
        etiquette: "Direction et invités",
        titre: "18 suites pour vos intervenants et votre comité de direction",
        intro:
          "Pour votre direction, vos intervenants et vos invités, le château compte 18 suites, lumineuses et ouvertes sur la forêt de Chantilly.",
        reprend: [],
        blocs: [
          { titre: "Des suites pour la direction", texte: "Nos 18 suites conviennent à vos intervenants et à votre direction : ils y disposent d'un espace de travail pour préparer la session du lendemain." },
          { titre: "Balcon ou terrasse sur la forêt", texte: "Certaines chambres ont un balcon ou une terrasse : une attention pour les invités de votre séminaire." },
        ],
        faits: [
          { label: "Suites", valeur: "18" },
          { label: "Balcon ou terrasse", valeur: "dans certaines chambres" },
          { label: "Catégories de chambres", valeur: "cosy, classique et premium" },
        ],
        reprendPhotos: [3, 4, 0],
        photos: [
        ],
        conseil:
          "Pour les intervenants de votre séminaire, réservez les suites dès votre demande : le château en compte 18.",
      },
      {
        ancre: "sejour",
        etiquette: "Le séjour de vos participants",
        titre: "Petit-déjeuner, parking, conciergerie : le séjour de vos participants",
        intro:
          "Pendant votre séminaire résidentiel, les services du château suivent le programme de travail de vos participants, du petit-déjeuner au départ.",
        reprend: [],
        blocs: [
          { titre: "Le petit-déjeuner avant la première session", texte: "Le petit-déjeuner de vos participants est servi de 7 h à 10 h, avant la première session de la journée." },
          { titre: "Stationnement et taxis", texte: "Le parking privé et gratuit de 70 places est réservé à vos participants, avec 4 bornes de recharge pour véhicules électriques. Notre conciergerie réserve les taxis." },
        ],
        faits: [
          { label: "Room service", valeur: "24h/24" },
          { label: "Petit-déjeuner", valeur: "7 h - 10 h" },
          { label: "Parking", valeur: "70 places, 4 bornes de recharge" },
        ],
        reprendPhotos: [6],
        photos: [
          { src: "https://jmeiepmtgidqtmxfnlwf.supabase.co/storage/v1/object/public/chateaux-images/chateau-foret-chantilly/seminaire-chateau-foret-chantilly-facade-terrasse-parc.webp", legende: "La façade du château, à l'arrivée" },
        ],
        conseil:
          "Pour les participants de votre séminaire qui viennent en voiture électrique, le parking du château compte 4 bornes de recharge.",
      },
    ],
    sources: [BROCHURE, PRATIQUE],
  },

  exterieurs: {
    seoTitle: 'Château avec parc de 5 ha en forêt de Chantilly',
    titreSection: "Un parc de 5 hectares en pleine forêt pour votre séminaire",
    conseil:
      "Pour un séminaire au vert, prévoyez un temps dehors dans votre programme : vos participants ont 5 hectares de parc au pied des salons.",
    seoDescription:
      "Un parc de 5 hectares en forêt de Chantilly : terrasses face aux arbres, sentier de promenade, tennis, boulodrome, vélos électriques et VTT.",
    resume:
      "Un parc de 5 hectares en pleine forêt de Chantilly, avec terrasses, sentier, tennis et boulodrome.",
    intro:
      "Le château, d'inspiration Louis XVI, se dresse dans un parc de 5 hectares au cœur de la forêt de Chantilly.",
    faits: [
      { label: 'Parc', valeur: '5 hectares', source: BROCHURE },
      { label: 'Sentier de promenade', valeur: '20 min', source: PRATIQUE },
      { label: 'Court de tennis', valeur: '1', source: PRATIQUE },
      { label: 'Grandes terrasses côté salons', valeur: '2', source: SITE },
    ],
    photos: [
      { src: stock('terrasse-exterieure-stockage'), legende: 'La terrasse face à la forêt, au pied du château' },
      { src: stock('vue-aerienne-foret-lever-soleil'), legende: 'Le château au milieu de la forêt, au lever du soleil' },
      { src: stock('facade-terrasse-parc'), legende: 'La façade, la terrasse et la pelouse du parc' },
      { src: img('terrasse-exterieure'), legende: 'La terrasse dressée, vue vers la forêt' },
      { src: img('activites-team-building'), legende: 'Le boulodrome, sous les arbres du parc' },
      { src: img('facade-chateau'), legende: 'Le château dans la forêt de Chantilly, vu du ciel' },
    ],
    blocs: [
      {
        titre: 'De la salle de réunion au parc en quelques pas',
        texte:
          "Les salons et le restaurant ouvrent directement sur le domaine : vos participants passent de la salle de réunion à la terrasse en quelques pas.",
      },
      {
        titre: 'Des terrasses face à la forêt',
        texte:
          "Deux grandes terrasses prolongent nos salons de réunion, et la salle plénière s'ouvre elle aussi sur une terrasse avec vue sur la forêt. Elles accueillent un déjeuner, une pause ou un cocktail à la belle saison.",
      },
      {
        titre: 'Le parc et la forêt',
        texte:
          "Un sentier de promenade d'une vingtaine de minutes fait le tour du domaine : de quoi organiser une réunion en marchant ou une pause au grand air. Au-delà du parc, des vélos électriques et des VTT permettent d'explorer la forêt de Chantilly.",
      },
      {
        titre: 'Tennis et boulodrome',
        texte:
          "Un court de tennis caché sous les arbres et un boulodrome complètent le parc. Ils sont à la disposition de vos participants pendant les pauses.",
      },
    ],
    blocsSection: [0],
    sections: [
      {
        ancre: "plein-air",
        etiquette: "Recevoir en plein air",
        titre: "Pause, déjeuner ou cocktail de séminaire en terrasse, face à la forêt",
        intro:
          "À la belle saison, les terrasses du château deviennent des lieux de réception pour votre séminaire, dans le prolongement direct de vos salles.",
        reprend: [1],
        blocs: [
          { titre: "Un cocktail en terrasse avant le dîner", texte: "Les terrasses face à la forêt se prêtent à un cocktail de fin de journée, avant de passer à table. Notre équipe compose le déroulé de la soirée avec vous." },
        ],
        faits: [
          { label: "Terrasse de la salle plénière", valeur: "vue sur la forêt" },
          { label: "Déjeuner en terrasse", valeur: "à la belle saison" },
          { label: "Cocktail en terrasse", valeur: "en fin de journée" },
        ],
        reprendPhotos: [0, 3],
        photos: [
        ],
        conseil:
          "Pour la pause de votre séminaire à la belle saison, demandez-moi un service en terrasse : deux d'entre elles prolongent directement les salons de réunion.",
      },
      {
        ancre: "detente",
        etiquette: "S'aérer entre deux sessions",
        titre: "Sentier, tennis et boulodrome : s'aérer entre deux sessions de travail",
        intro:
          "Entre deux sessions, le parc et la forêt offrent à vos participants de quoi marcher, pédaler ou disputer une partie.",
        reprend: [2, 3],
        blocs: [
        ],
        faits: [
          { label: "Sentier du domaine", valeur: "une vingtaine de minutes" },
          { label: "Vélos électriques et VTT", valeur: "pour la forêt de Chantilly" },
          { label: "Boulodrome du parc", valeur: "sous les arbres" },
        ],
        reprendPhotos: [4, 1],
        photos: [
        ],
        conseil:
          "Pour une pause active pendant votre séminaire, pensez aux vélos électriques et aux VTT : la forêt de Chantilly commence au-delà du parc.",
      },
    ],
    sources: [BROCHURE, SITE, PRATIQUE],
  },

  restauration: {
    seoTitle: 'Restauration de séminaire en château, forêt de Chantilly',
    titreSection: "Restauration de séminaire : deux restaurants et le bar du patio",
    conseil:
      "Calez le programme de votre séminaire sur les horaires du restaurant : le déjeuner de vos participants est servi de 12 h à 14 h 30, le dîner de 19 h à 21 h 30.",
    seoDescription:
      "Restaurant gastronomique, restaurant de la bibliothèque, bar du patio : produits de saison, dîners de gala jusqu'à 200 couverts, show cooking.",
    resume:
      "Un restaurant gastronomique, le restaurant de la bibliothèque et un bar de patio, avec des menus de saison composés pour vos séminaires.",
    intro:
      "Pour vos séminaires, notre offre de restauration associe savoir-faire gastronomique et flexibilité. Nos menus mettent en avant des produits frais, locaux et de saison, sélectionnés auprès de partenaires de confiance. Cocktail, déjeuner, dîner de gala ou animation culinaire : chaque prestation est composée pour votre groupe.",
    faits: [
      { label: 'Dîner de gala en plénière', valeur: '200 couverts', source: BROCHURE },
      { label: 'Cocktail en plénière', valeur: '270 personnes', source: BROCHURE },
      { label: 'Petit-déjeuner', valeur: '7 h - 10 h', source: BROCHURE },
      { label: 'Bar', valeur: 'tous les jours, 12 h - 22 h', source: BROCHURE },
    ],
    photos: [
      { src: img('restaurant-gastronomique'), legende: 'Le restaurant, baigné de lumière naturelle' },
      { src: img('bar-bibliotheque'), legende: 'Le restaurant de la bibliothèque, boiseries et cheminée' },
      { src: img('pause-gourmande-patisseries'), legende: 'Pâtisseries et desserts de la pause gourmande' },
      { src: img('patio-2'), legende: 'Le bar et le salon sous la verrière du patio' },
      { src: img('terrasse-exterieure'), legende: 'Déjeuner en terrasse, face à la forêt' },
    ],
    blocs: [
      {
        titre: 'Deux restaurants, du petit-déjeuner au dîner',
        texte:
          "Le restaurant sert à vos participants le petit-déjeuner de 7 h à 10 h, le déjeuner de 12 h à 14 h 30 et le dîner de 19 h à 21 h 30. Le restaurant de la bibliothèque, avec ses boiseries et sa cheminée, propose une carte de saison et de terroir, avec une terrasse face à la forêt.",
      },
      {
        titre: 'Pauses et déjeuners de séminaire',
        texte:
          "Pour un séminaire à la journée, nos offres de journée et de demi-journée d'étude comprennent les pauses et le déjeuner. Les pauses sont servies dans le patio, au centre des salons de réunion ; à la belle saison, le déjeuner peut se prendre en terrasse.",
      },
      {
        titre: 'Animations culinaires',
        texte:
          "Pour animer un repas de groupe : show cooking dès 15 personnes, ou déjeuner grillé en plein air en complément du déjeuner en libre-service raffiné dès 50 personnes.",
      },
    ],
    blocsSection: [0],
    sections: [
      {
        ancre: "banquets",
        etiquette: "Banquets et dîners de groupe",
        titre: "Banquet de séminaire au château : gala de 200 couverts et show cooking",
        intro:
          "Dîner de gala, cocktail ou animation culinaire : pour les repas de groupe de votre séminaire, la salle plénière et les salons du château deviennent vos salles de réception.",
        reprend: [],
        blocs: [
          { titre: "Dîner de gala et cocktail en salle plénière", texte: "La salle plénière reçoit jusqu'à 200 convives pour le dîner de gala de votre convention, et 270 personnes en cocktail." },
          { titre: "Un repas de groupe en salon", texte: "Pour un groupe plus restreint, le grand salon et le salon du rez-de-chaussée accueillent chacun 50 personnes à table." },
          { titre: "Show cooking et déjeuner grillé", texte: "Pour animer un repas de séminaire, le show cooking se réserve dès 15 personnes. Dès 50 personnes, un déjeuner grillé en plein air vient compléter le déjeuner en libre-service raffiné." },
        ],
        faits: [
          { label: "Banquet en salon", valeur: "50 convives" },
          { label: "Show cooking", valeur: "dès 15 personnes" },
          { label: "Déjeuner grillé en plein air", valeur: "dès 50 personnes" },
        ],
        reprendPhotos: [],
        photos: [
          { src: "/images/seminaire-chateau-foret-chantilly-salle-pleniere.webp", legende: "La salle plénière dressée en tables rondes" },
          { src: "/images/seminaire-chateau-foret-chantilly-salon-reunion-4.webp", legende: "Un salon du château, ici en disposition classe" },
        ],
        conseil:
          "Pour un grand groupe, pensez au déjeuner grillé en plein air : il se réserve dès 50 participants.",
      },
      {
        ancre: "pauses",
        etiquette: "Pauses et journée d'étude",
        titre: "Journée d'étude en forêt de Chantilly : pauses et déjeuner compris",
        intro:
          "Pour un séminaire à la journée, tout se passe au même endroit : les pauses sont servies au centre des salons de réunion, et le déjeuner est compris dans l'offre.",
        reprend: [1],
        blocs: [
          { titre: "Le patio sous verrière, votre espace de pause", texte: "Sous sa verrière, le patio est l'espace de pause de votre séminaire : vos participants s'y retrouvent entre deux sessions. Son bar se réserve aussi pour l'apéritif de votre groupe." },
        ],
        faits: [
          { label: "Pauses", valeur: "servies dans le patio" },
          { label: "Déjeuner de journée d'étude", valeur: "compris dans l'offre" },
          { label: "Bar du patio", valeur: "sur réservation, pour vos apéritifs" },
        ],
        reprendPhotos: [2, 3],
        photos: [
        ],
        conseil:
          "Votre séminaire tient en une demi-journée ? Demandez-moi l'offre de demi-journée d'étude pour vos participants.",
      },
    ],
    sources: [BROCHURE, SITE],
  },

  soirees: {
    seoTitle: "Soirée d'entreprise dans un château près de Roissy",
    titreSection: "Soirée d'entreprise au château : gala de 200 convives et deux bars",
    conseil:
      "Pour le cocktail de fin de séminaire, commencez sur les terrasses face à la forêt, puis passez à table en salle plénière. Notre équipe compose le déroulé de la soirée avec vous.",
    seoDescription:
      "Dîner de gala jusqu'à 200 convives, cocktail de 270 personnes, bar de la bibliothèque, apéritif sous la verrière du patio : vos soirées sur place.",
    resume:
      "Dîner de gala jusqu'à 200 convives, cocktail jusqu'à 270 personnes, bar de la bibliothèque et bar du patio.",
    intro:
      "Après la journée de travail, la soirée se déroule sans quitter le château. Cocktail en terrasse, dîner de gala dans la salle plénière, dernier verre près de la cheminée de l'ancienne bibliothèque.",
    faits: [
      { label: 'Dîner de gala', valeur: '200 convives', source: BROCHURE },
      { label: 'Cocktail dînatoire', valeur: '270 personnes', source: BROCHURE },
      { label: 'Bars', valeur: '2', source: BROCHURE },
      { label: 'Room service', valeur: '24h/24', source: BROCHURE },
    ],
    photos: [
      { src: img('bar-bibliotheque'), legende: "Le bar de l'ancienne bibliothèque et sa cheminée" },
      { src: img('salle-pleniere'), legende: 'La salle plénière dressée en tables rondes' },
      { src: img('patio-2'), legende: 'Le bar du patio, pour vos apéritifs' },
      { src: img('restaurant-gastronomique'), legende: 'Le restaurant, pour un dîner en petit comité' },
      { src: stock('terrasse-exterieure-stockage'), legende: 'La terrasse, pour un cocktail au coucher du soleil' },
    ],
    blocs: [
      {
        titre: 'Le dîner de gala',
        texte:
          "La salle plénière reçoit jusqu'à 200 convives en banquet et 270 en cocktail dînatoire. Pour un groupe plus restreint, le grand salon et le salon du rez-de-chaussée accueillent chacun 50 personnes à table.",
      },
      {
        titre: 'Deux bars pour prolonger la soirée',
        texte:
          "Le bar de l'ancienne bibliothèque, avec ses boiseries et sa cheminée, est ouvert tous les jours de midi à 22 h. Le bar du patio, sous la verrière, se réserve pour vos apéritifs ou vos soirées privées.",
      },
      {
        titre: 'Les terrasses à la belle saison',
        texte:
          "Les terrasses face à la forêt se prêtent à un cocktail de fin de journée, avant de passer à table. Notre équipe compose le menu et le déroulé de la soirée avec vous.",
      },
    ],
    blocsSection: [0, 2],
    sections: [
      {
        ancre: "apres-diner",
        etiquette: "Les bars du château",
        titre: "Apéritif et fin de soirée au château : deux bars pour votre séminaire",
        intro:
          "Avant comme après le dîner, la soirée de votre séminaire se passe au château : le bar de la bibliothèque est ouvert jusqu'à 22 h, et le bar du patio se réserve pour votre groupe.",
        reprend: [1],
        blocs: [
          { titre: "Une fin de soirée sur place", texte: "Vos participants rejoignent leur chambre à pied à la fin de la soirée. Le room service répond 24h/24." },
        ],
        faits: [
          { label: "Bar de la bibliothèque", valeur: "tous les jours, de midi à 22 h" },
          { label: "Bar du patio", valeur: "apéritifs et soirées privées" },
          { label: "Chambres", valeur: "à pied depuis les bars" },
        ],
        reprendPhotos: [0, 2],
        photos: [
        ],
        conseil:
          "Pour une soirée privée pendant votre séminaire, demandez-moi le bar du patio : il se réserve pour votre groupe, sous la verrière.",
      },
    ],
    sources: [BROCHURE],
  },

  activites: {
    seoTitle: 'Team building en forêt de Chantilly : parc et spa',
    titreSection: "Team building au château 5 étoiles : polo, dragon boat et ateliers",
    conseil:
      "Pour une demi-journée hors du château pendant votre séminaire, demandez-moi l'initiation au polo dans un club de Chantilly, ou le dragon boat challenge.",
    seoDescription:
      "Atelier crème Chantilly avec notre chef pâtissier, défis culinaires, olympiades dans le parc, tennis, VTT, spa avec piscine, initiation au polo à proximité.",
    resume:
      "Ateliers culinaires, olympiades dans le parc, tennis, VTT et spa sur place ; polo, dragon boat et visites autour de Chantilly.",
    intro:
      "Pour votre team building, nous organisons des activités sur mesure dans nos espaces et dans notre parc de 5 hectares, pour fédérer vos équipes entre deux sessions de travail. Les environs de Chantilly offrent d'autres formats, à quelques minutes du château.",
    faits: [
      { label: 'Parc pour les activités', valeur: '5 hectares', source: BROCHURE },
      { label: 'Cabines de soins', valeur: '3', source: BROCHURE },
      { label: 'Piscine intérieure', valeur: 'chauffée', source: PRATIQUE },
      { label: 'Show cooking', valeur: 'dès 15 personnes', source: BROCHURE },
    ],
    photos: [
      { src: img('activites-team-building'), legende: 'Le boulodrome du parc, prêt pour un tournoi' },
      { src: img('piscine-interieure'), legende: 'La piscine intérieure du spa' },
      { src: img('cabines-de-soin-spa'), legende: 'Une cabine de soins du spa' },
      { src: img('pause-gourmande-patisseries'), legende: "Pâtisseries maison, à l'image de l'atelier du chef pâtissier" },
    ],
    blocs: [
      {
        titre: 'Au château',
        texte:
          "Atelier de création de crème Chantilly avec notre chef pâtissier, défis culinaires, olympiades dans le parc, challenges d'aventure inspirés des grands jeux télévisés, défis collaboratifs en plein air. Notre équipe adapte chaque format à la taille du groupe.",
      },
      {
        titre: 'En libre accès',
        texte:
          "Court de tennis, boulodrome, sentier de promenade, vélos électriques et VTT pour la forêt de Chantilly. Vos participants choisissent selon leur énergie du moment.",
      },
      {
        titre: 'Le spa',
        texte:
          "Entre deux sessions, vos participants profitent de notre espace bien-être : piscine intérieure chauffée, bain à remous, sauna, salle de fitness et zone de relaxation, ainsi que 3 cabines de soins.",
      },
      {
        titre: 'Autour de Chantilly',
        texte:
          "Pour une sortie de groupe : initiation au polo dans un club de Chantilly, dragon boat challenge, visite du château de Chantilly, rallyes de découverte du territoire, à organiser en demi-journée.",
      },
    ],
    blocsSection: [0, 3],
    sections: [
      {
        ancre: "temps-libre",
        etiquette: "Spa et temps libre",
        titre: "Spa, tennis et VTT : le temps libre de vos participants en forêt de Chantilly",
        intro:
          "Entre deux sessions de travail, vos participants ont le choix entre l'espace bien-être du château et les équipements du parc.",
        reprend: [1, 2],
        blocs: [
        ],
        faits: [
          { label: "Spa", valeur: "sauna, bain à remous, salle de fitness" },
          { label: "Tennis", valeur: "un court sous les arbres" },
          { label: "Vélos électriques et VTT", valeur: "pour la forêt de Chantilly" },
        ],
        reprendPhotos: [0, 1, 2],
        photos: [
        ],
        conseil:
          "Laissez un créneau libre dans le programme de votre séminaire : vos participants le passent au spa, sur le court de tennis ou à VTT en forêt.",
      },
    ],
    sources: [BROCHURE, PRATIQUE],
  },

  acces: {
    seoTitle: 'Accès : 20 min de Roissy-CDG, 45 min de Paris',
    titreSection: "Accès au séminaire : Roissy à 20 min, gare du Nord en train",
    conseil:
      "Certains de vos participants viennent en voiture électrique ? Signalez dans votre convocation que le parking du château compte 4 bornes de recharge.",
    seoDescription:
      "À 45 min de Paris en voiture, 20 min de Roissy-CDG et de sa gare TGV, train depuis Paris Gare du Nord. Parking de 70 places et bornes de recharge.",
    resume:
      "45 minutes de Paris, 20 minutes de Roissy-CDG, train depuis la gare du Nord. Parking de 70 places sur place.",
    intro:
      "Pour un séminaire résidentiel facile d'accès, le château se trouve au cœur de la forêt de Chantilly, dans l'Oise, à 45 minutes de Paris et à 20 minutes de l'aéroport Roissy-Charles-de-Gaulle. Une adresse pratique pour réunir des participants venus de Paris, de province ou de l'étranger.",
    faits: [
      { label: 'Paris en voiture', valeur: '45 min', source: BROCHURE },
      { label: 'Aéroport Roissy-CDG', valeur: '20 min', source: BROCHURE },
      { label: 'Gare du Nord - Orry-la-Ville-Coye', valeur: '20 min de train', source: BROCHURE },
      { label: 'Parking', valeur: '70 places, 4 bornes de recharge', source: BROCHURE },
    ],
    photos: [
      { src: img('facade-chateau'), legende: 'Le château dans la forêt de Chantilly, vu du ciel' },
      { src: stock('facade-terrasse-parc'), legende: "La façade du château, à l'arrivée" },
    ],
    blocs: [
      {
        titre: 'En voiture',
        texte:
          "Comptez 45 minutes depuis Paris et 15 minutes depuis Chantilly. Le château dispose d'un parking privé et gratuit de 70 places, réservé à ses hôtes et donc à vos participants, avec 4 bornes de recharge pour véhicules électriques.",
      },
      {
        titre: 'En train',
        texte:
          "Pour vos participants venus en train : depuis Paris Gare du Nord, la gare d'Orry-la-Ville-Coye est à 20 minutes de train ; elle se trouve à environ 7 km du château, soit 10 minutes en voiture. La gare de Chantilly est à environ 10 km (15 minutes), celles de Survilliers-Fosses et de Mitry-Claye à environ 15 minutes.",
      },
      {
        titre: 'En avion',
        texte:
          "L'aéroport Paris-Charles-de-Gaulle et sa gare TGV sont à une vingtaine de kilomètres, soit 20 à 30 minutes de route selon la circulation : vos participants internationaux rejoignent le château dès l'atterrissage.",
      },
      {
        titre: 'Transferts',
        texte:
          "Le château n'a pas de navette régulière. Notre équipe organise vos transferts privés depuis la gare ou l'aéroport, pour un participant comme pour tout le groupe, et notre conciergerie réserve les taxis.",
      },
    ],
    blocsSection: [0],
    sections: [
      {
        ancre: "sans-voiture",
        etiquette: "Train, avion et transferts",
        titre: "Venir en séminaire en train ou en avion : Orry-la-Ville-Coye et Roissy",
        intro:
          "Pour vos participants qui ne viennent pas en voiture, le château se rejoint en train depuis Paris ou en avion par Roissy. Notre équipe organise le dernier trajet.",
        reprend: [1, 2, 3],
        blocs: [
        ],
        faits: [
          { label: "Gare d'Orry-la-Ville-Coye", valeur: "10 min en voiture" },
          { label: "Gare de Chantilly", valeur: "environ 10 km, 15 minutes" },
          { label: "Transferts privés", valeur: "depuis la gare ou l'aéroport" },
        ],
        reprendPhotos: [],
        photos: [
          { src: "https://jmeiepmtgidqtmxfnlwf.supabase.co/storage/v1/object/public/chateaux-images/chateau-foret-chantilly/seminaire-chateau-foret-chantilly-vue-aerienne-foret-lever-soleil.webp", legende: "Le château au milieu de la forêt, au lever du soleil" },
          { src: "https://jmeiepmtgidqtmxfnlwf.supabase.co/storage/v1/object/public/chateaux-images/chateau-foret-chantilly/seminaire-chateau-foret-chantilly-terrasse-exterieure-stockage.webp", legende: "La terrasse face à la forêt, au pied du château" },
        ],
        conseil:
          "Pour vos participants qui arrivent par la gare TGV de Roissy, demandez-moi un transfert privé : notre équipe l'organise pour un participant comme pour tout le groupe.",
      },
    ],
    sources: [BROCHURE, PRATIQUE],
  },
};

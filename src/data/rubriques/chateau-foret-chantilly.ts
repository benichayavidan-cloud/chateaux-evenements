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
    seoDescription:
      "Plénière de 380 m² pour 250 personnes, mur LED de 5 m, 9 salles de sous-commission de 33 à 75 m² autour d'un patio. Capacités salle par salle.",
    resume:
      "10 salons autour d'un patio : une plénière de 380 m² pour 250 personnes et 9 salles de sous-commission de 33 à 75 m².",
    intro:
      "Notre centre de séminaires réunit 10 salons autour d'un patio lumineux où se prennent les pauses. La salle plénière de 380 m², éclairée par la lumière du jour, s'ouvre sur une terrasse face à la forêt ; elle se divise en plusieurs espaces. Neuf salles de sous-commission, de 33 à 75 m², accueillent vos ateliers. Le tableau ci-dessous reprend la surface et la capacité de chaque espace selon la disposition.",
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
    sources: [BROCHURE, FICHE],
  },

  chambres: {
    seoTitle: 'Séminaire résidentiel à Chantilly : 109 chambres (60)',
    seoDescription:
      "109 chambres et suites ouvertes sur la forêt de Chantilly, dont 18 suites et 45 chambres convertibles en twin. Balcons, terrasses, room service 24h/24.",
    resume:
      "109 chambres et suites ouvertes sur la forêt, dont 18 suites et 45 chambres convertibles en twin pour vos groupes.",
    intro:
      "Nos 109 chambres et suites offrent un cadre lumineux, ouvert sur la forêt de Chantilly. Pour un séminaire résidentiel, tous vos participants logent sur place, à quelques pas des salles de réunion. Le château peut être privatisé sur demande.",
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
          "91 chambres en trois catégories (cosy, classique et premium) et 18 suites. Certaines chambres ont un balcon ou une terrasse. Les suites conviennent à vos intervenants et à votre direction.",
      },
      {
        titre: 'Pensées pour les groupes',
        texte:
          "45 chambres peuvent être converties en twin, avec deux lits séparés : une solution pratique pour loger un grand groupe. Des chambres accessibles aux personnes à mobilité réduite sont disponibles.",
      },
      {
        titre: 'Le confort pour travailler',
        texte:
          "Chaque chambre est climatisée et dispose d'un espace de travail. Le room service fonctionne 24 heures sur 24. L'arrivée se fait à partir de 15 h et le départ jusqu'à midi.",
      },
    ],
    sources: [BROCHURE, PRATIQUE],
  },

  exterieurs: {
    seoTitle: 'Château avec parc de 5 ha en forêt de Chantilly',
    seoDescription:
      "Un parc de 5 hectares en forêt de Chantilly : terrasses face aux arbres, sentier de promenade, tennis, boulodrome, vélos électriques et VTT.",
    resume:
      "Un parc de 5 hectares en pleine forêt de Chantilly, avec terrasses, sentier, tennis et boulodrome.",
    intro:
      "Le château, d'inspiration Louis XVI, se dresse dans un parc de 5 hectares au cœur de la forêt de Chantilly. Les salons et le restaurant ouvrent directement sur le domaine : on passe de la salle de réunion à la terrasse en quelques pas.",
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
    ],
    blocs: [
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
          "Un court de tennis caché sous les arbres et un boulodrome complètent le parc. Ils servent aux pauses libres comme aux tournois entre équipes.",
      },
    ],
    sources: [BROCHURE, SITE, PRATIQUE],
  },

  restauration: {
    seoTitle: 'Restauration de séminaire en château, forêt de Chantilly',
    seoDescription:
      "Restaurant gastronomique, restaurant de la bibliothèque, bar du patio : produits de saison, dîners de gala jusqu'à 200 couverts, show cooking.",
    resume:
      "Un restaurant gastronomique, le restaurant de la bibliothèque et un bar de patio, avec des menus de saison composés pour vos séminaires.",
    intro:
      "Notre offre de restauration associe savoir-faire gastronomique et flexibilité. Nos menus mettent en avant des produits frais, locaux et de saison, sélectionnés auprès de partenaires de confiance. Cocktail, déjeuner, dîner de gala ou animation culinaire : chaque prestation est composée pour votre groupe.",
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
          "Le restaurant sert le petit-déjeuner de 7 h à 10 h, le déjeuner de 12 h à 14 h 30 et le dîner de 19 h à 21 h 30. Le restaurant de la bibliothèque, avec ses boiseries et sa cheminée, propose une carte de saison et de terroir, avec une terrasse face à la forêt.",
      },
      {
        titre: 'Pauses et déjeuners de séminaire',
        texte:
          "Nos offres de journée et de demi-journée d'étude comprennent les pauses et le déjeuner. Les pauses sont servies dans le patio, au centre des salons ; à la belle saison, le déjeuner peut se prendre en terrasse.",
      },
      {
        titre: 'Animations culinaires',
        texte:
          "Pour animer un repas : show cooking dès 15 personnes, déjeuner grillé en plein air en complément du déjeuner en libre-service raffiné dès 50 personnes, ou atelier autour de la crème Chantilly avec dégustation de fruits de saison dès 10 personnes.",
      },
    ],
    sources: [BROCHURE, SITE],
  },

  soirees: {
    seoTitle: "Soirée d'entreprise dans un château près de Roissy",
    seoDescription:
      "Dîner de gala jusqu'à 200 convives, cocktail de 270 personnes, bar de la bibliothèque, apéritif sous la verrière du patio : vos soirées sur place.",
    resume:
      "Dîner de gala jusqu'à 200 convives, cocktail jusqu'à 270 personnes, bar de la bibliothèque et bar du patio.",
    intro:
      "Après la journée de travail, la soirée se déroule sans quitter le château. Cocktail en terrasse, dîner de gala dans la salle plénière, dernier verre près de la cheminée de l'ancienne bibliothèque : vos participants rejoignent leur chambre à pied.",
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
    sources: [BROCHURE],
  },

  activites: {
    seoTitle: 'Team building en forêt de Chantilly : parc et spa',
    seoDescription:
      "Atelier crème Chantilly avec notre chef pâtissier, défis culinaires, olympiades dans le parc, tennis, VTT, spa avec piscine, initiation au polo à proximité.",
    resume:
      "Ateliers culinaires, olympiades dans le parc, tennis, VTT et spa sur place ; polo, dragon boat et visites autour de Chantilly.",
    intro:
      "Nous organisons des activités sur mesure dans nos espaces et dans notre parc de 5 hectares, pour fédérer vos équipes entre deux sessions de travail. Les environs de Chantilly offrent d'autres formats, à quelques minutes du château.",
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
          "Notre espace bien-être comprend une piscine intérieure chauffée, un bain à remous, un sauna, une salle de fitness et une zone de relaxation, ainsi que 3 cabines de soins.",
      },
      {
        titre: 'Autour de Chantilly',
        texte:
          "Initiation au polo dans un club de Chantilly, dragon boat challenge, visite du château de Chantilly, rallyes de découverte du territoire : des sorties à organiser en demi-journée.",
      },
    ],
    sources: [BROCHURE, PRATIQUE],
  },

  acces: {
    seoTitle: 'Accès : 20 min de Roissy-CDG, 45 min de Paris',
    seoDescription:
      "À 45 min de Paris en voiture, 20 min de Roissy-CDG et de sa gare TGV, train depuis Paris Gare du Nord. Parking de 70 places et bornes de recharge.",
    resume:
      "45 minutes de Paris, 20 minutes de Roissy-CDG, train depuis la gare du Nord. Parking de 70 places sur place.",
    intro:
      "Le château se trouve au cœur de la forêt de Chantilly, dans l'Oise, à 45 minutes de Paris et à 20 minutes de l'aéroport Roissy-Charles-de-Gaulle. Une adresse pratique pour réunir des participants venus de Paris, de province ou de l'étranger.",
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
          "Comptez 45 minutes depuis Paris et 15 minutes depuis Chantilly. Le château dispose d'un parking privé et gratuit de 70 places, réservé à ses hôtes, avec 4 bornes de recharge pour véhicules électriques.",
      },
      {
        titre: 'En train',
        texte:
          "Depuis Paris Gare du Nord, la gare d'Orry-la-Ville-Coye est à 20 minutes de train ; elle se trouve à environ 7 km du château, soit 10 minutes en voiture. La gare de Chantilly est à environ 10 km (15 minutes), celles de Survilliers-Fosses et de Mitry-Claye à environ 15 minutes.",
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
    sources: [BROCHURE, PRATIQUE],
  },
};

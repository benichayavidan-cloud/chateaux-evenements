/**
 * #60-CHANTILLY — rubriques du domaine (16/11/2026).
 *
 * Sources lues le 16/11/2026 (jamais affichées : elles portent le vrai nom) :
 *  - FICHE    : fiche Select Châteaux existante (src/data/chateaux.ts, id 1)
 *  - MICE     : dossier séminaires officiel du lieu (PDF, 4 pages, tableau
 *               des 21 salles en m²) —
 *               https://www.conferencehotelgroup.com/img/hotels/files/9985/J&F - MICE - Condensée (3).pdf
 *  - FACTSHEET: fiche technique officielle FR (PDF, 2 pages : chambres par
 *               catégorie, services, même tableau des salles) —
 *               https://www.conferencehotelgroup.com/img/hotels/files/9985/J&F FACTSHEET FR.pdf
 *  - SITE     : site officiel, pages /seminaire, /acces-contact,
 *               /restaurants-bar, /le-health-club, /activites
 *               (https://www.jeanneandtheforest.com)
 *  - CVENT    : https://www.cvent.com/venues/fr-FR/gouvieux/hotel/chateau-de-montvillargenne/venue-34b95bc4-52af-4cc0-b9ea-df5fe1faca1e
 *  - TRAIN    : durée TER Paris-Nord → gare de Chantilly (comparateur Omio :
 *               trajet le plus rapide 25 min, direct) —
 *               https://www.omio.fr/trains/paris-gare-du-nord/chantilly-gouvieux-4m369
 *
 * Écarts entre sources : la FICHE annonce 120 chambres, le SITE et la
 * FACTSHEET 119 (110 chambres + 9 suites) → on retient 119. Cvent compte
 * 27 salles, le lieu 21 → on retient 21 (source officielle).
 *
 * Noms de salles : les noms réels trahiraient le lieu (blind booking strict,
 * 15/11) — chaque salle porte un nom descriptif ; surfaces et capacités sont
 * celles du tableau officiel (MICE / FACTSHEET), sans conversion.
 * Colonne « pavé » (table de réunion unique) du tableau officiel : reportée
 * en note, le type n'a pas de colonne dédiée.
 * Gare : le nom officiel contient la commune → on écrit « gare de Chantilly ».
 */
import type { RubriquesDomaine } from '../../types/rubriques.ts';
import { chateauImage } from '../../lib/media.ts';

const FICHE = 'Fiche Select Châteaux (data/chateaux.ts, id 1), 16/11/2026';
const MICE = 'Dossier séminaires officiel du lieu (PDF), consulté le 16/11/2026';
const FACTSHEET = 'Fiche technique officielle du lieu (PDF), consultée le 16/11/2026';
const SITE = 'Site officiel du lieu (séminaire, accès, restaurants, spa, activités), consulté le 16/11/2026';
const CVENT = 'Fiche Cvent du lieu, consultée le 16/11/2026';
const TRAIN = 'Comparateur Omio, Paris-Nord → gare de Chantilly, consulté le 16/11/2026';

const img = (nom: string) => `/images/seminaire-chateau-chantilly-${nom}.webp`;

export const rubriquesManoirChantilly: RubriquesDomaine = {
  salles: {
    seoTitle: 'Salles de séminaire en château, forêt de Chantilly',
    seoDescription:
      "21 espaces de réunion de 15 à 300 m² : plénière de 280 places avec écran de 18 m², grand salon de 264 m², serre dans le parc. Capacités salle par salle.",
    resume:
      "21 espaces à la lumière du jour, de 15 à 240 m², plus une serre de 300 m² dans le parc. La plénière reçoit 280 personnes en théâtre.",
    intro:
      "Nos 21 espaces de réunion, tous éclairés par la lumière du jour, se répartissent entre le château, une aile contemporaine et le bâtiment de la plénière. De la salle confidentielle de 21 m² pour un comité restreint à la plénière de 240 m² qui reçoit 280 personnes, chaque format a sa salle. De mai à octobre, une serre de 300 m² s'ajoute dans le parc. Le tableau ci-dessous reprend surface et capacité selon la disposition choisie.",
    faits: [
      { label: 'Espaces de réunion', valeur: '21, de 15 à 240 m²', source: MICE },
      { label: 'Plénière en théâtre', valeur: '280 places', source: MICE },
      { label: 'Écran de la plénière', valeur: '18 m²', source: MICE },
      { label: 'Hauteur sous plafond (plénière)', valeur: '6,7 m', source: FICHE },
      { label: 'Serre dans le parc', valeur: '300 m², de mai à octobre', source: MICE },
    ],
    salles: [
      { nom: 'La Salle plénière', surfaceM2: 240, theatre: 280, classe: 120, enU: 60, banquet: 140, cocktail: 160, cabaret: 90, note: '60 autour d’une table de réunion ; écran de 18 m², scène et régie' },
      { nom: 'Le Grand Salon (deux parties réunies)', surfaceM2: 264, theatre: 230, classe: 140, enU: 90, banquet: 240, cocktail: 250, cabaret: 108 },
      { nom: 'Le Grand Salon, une partie', surfaceM2: 132, theatre: 140, classe: 60, enU: 60, banquet: 150, cocktail: 130, cabaret: 66, note: 'deux parties identiques' },
      { nom: 'Le Salon de 134 m²', surfaceM2: 134, theatre: 120, classe: 70, enU: 45, banquet: 100, cocktail: 130, cabaret: 48, note: '45 autour d’une table de réunion' },
      { nom: 'Le Salon-atelier de 118 m²', surfaceM2: 118, theatre: 85, classe: 50, enU: 30, banquet: null, cocktail: 80, cabaret: 36, note: '38 autour d’une table de réunion' },
      { nom: 'La Serre du parc', surfaceM2: 300, theatre: 250, classe: 120, enU: null, banquet: 250, cocktail: 200, cabaret: null, note: 'de mai à octobre' },
      { nom: 'L’Atelier de 61 m²', surfaceM2: 61, theatre: 50, classe: 40, enU: 25, banquet: null, cocktail: null, cabaret: null, note: '30 autour d’une table de réunion' },
      { nom: 'La Salle de 48 m²', surfaceM2: 48, theatre: 25, classe: 15, enU: 16, banquet: null, cocktail: 18, cabaret: 20, note: '18 autour d’une table de réunion' },
      { nom: 'La Salle du comité de direction', surfaceM2: 47, theatre: null, classe: null, enU: null, banquet: null, cocktail: null, cabaret: null, note: '18 autour d’une table de réunion' },
      { nom: 'Le Salon du château de 47 m²', surfaceM2: 47, theatre: null, classe: 15, enU: 15, banquet: null, cocktail: null, cabaret: null, note: '18 autour d’une table de réunion' },
      { nom: 'L’Atelier de 45 m²', surfaceM2: 45, theatre: 25, classe: 20, enU: 16, banquet: null, cocktail: null, cabaret: null, note: '19 autour d’une table de réunion' },
      { nom: 'Le Salon privé', surfaceM2: 41, theatre: null, classe: null, enU: null, banquet: 40, cocktail: 50, cabaret: null, note: '20 autour d’une table de réunion' },
      { nom: 'Le Bureau de 41 m²', surfaceM2: 41, theatre: 30, classe: 12, enU: 12, banquet: null, cocktail: 20, cabaret: null, note: '15 autour d’une table de réunion' },
      { nom: 'L’Atelier de 41 m²', surfaceM2: 41, theatre: 25, classe: 25, enU: 16, banquet: null, cocktail: null, cabaret: null, note: '16 autour d’une table de réunion' },
      { nom: 'Le Salon du château de 36 m²', surfaceM2: 36, theatre: null, classe: 15, enU: 15, banquet: null, cocktail: null, cabaret: null, note: '15 autour d’une table de réunion' },
      { nom: 'Le Salon du château de 34 m²', surfaceM2: 34, theatre: null, classe: null, enU: null, banquet: null, cocktail: null, cabaret: null, note: '10 autour d’une table de réunion' },
      { nom: 'Le Salon du château de 32 m²', surfaceM2: 32, theatre: null, classe: null, enU: null, banquet: null, cocktail: null, cabaret: null, note: '10 autour d’une table de réunion' },
      { nom: 'Le Bureau de 30 m²', surfaceM2: 30, theatre: 30, classe: 12, enU: 12, banquet: null, cocktail: 20, cabaret: null, note: '15 autour d’une table de réunion' },
      { nom: 'L’Atelier de 30 m²', surfaceM2: 30, theatre: 20, classe: 16, enU: 12, banquet: null, cocktail: null, cabaret: null, note: '16 autour d’une table de réunion' },
      { nom: 'Le Bureau de 28 m²', surfaceM2: 28, theatre: null, classe: null, enU: null, banquet: null, cocktail: null, cabaret: null, note: '10 autour d’une table de réunion' },
      { nom: 'La Salle confidentielle', surfaceM2: 21, theatre: null, classe: null, enU: null, banquet: null, cocktail: null, cabaret: null, note: '8 autour d’une table de réunion' },
      { nom: 'L’Atelier de 20 m²', surfaceM2: 20, theatre: 15, classe: 12, enU: 8, banquet: null, cocktail: null, cabaret: 6, note: '8 autour d’une table de réunion' },
      { nom: 'L’Atelier de 15 m²', surfaceM2: 15, theatre: 12, classe: 9, enU: 8, banquet: null, cocktail: null, cabaret: 6, note: '8 autour d’une table de réunion' },
    ],
    photos: [
      { src: img('salle-pleniere-theatre'), legende: 'La salle plénière en disposition théâtre, écrans géants et scène' },
      { src: img('salle-pleniere-brique'), legende: 'Salle de réunion aux murs de pierre et au plafond boisé, en disposition théâtre' },
      { src: img('salle-reunion-prestige'), legende: 'Salon du château aux boiseries noir et blanc, en table de réunion' },
      { src: img('salle-reunion-board-room'), legende: 'Salon aux murs verts, table ovale pour un comité de direction' },
      { src: img('salle-reunion-carte-murale'), legende: 'Salle de réunion en U, sous une carte du monde murale' },
      { src: img('salle-seminaire-verte'), legende: 'Salle de séminaire avec écran et parquet en chevrons' },
      { src: img('salle-atelier-creatif'), legende: "Salle d'atelier, tables hautes et mur de post-it" },
      { src: img('lobby-salon-accueil'), legende: 'Le salon de travail et de pause, ouvert sur le parc' },
    ],
    blocs: [
      {
        titre: 'Une plénière de 280 places',
        texte:
          "Notre salle plénière de 240 m² reçoit 280 personnes en théâtre, 120 en classe ou 140 en banquet. Elle dispose d'un écran géant de 18 m², d'une scène équipée, d'une régie intégrée et d'éclairages personnalisables : conventions, lancements de produit et kick-offs y prennent une autre ampleur.",
      },
      {
        titre: 'Le Grand Salon, d’un seul tenant ou en deux',
        texte:
          "Au château, le Grand Salon se divise en deux parties identiques de 132 m². Réunies, elles offrent 264 m² : 230 places en théâtre, 140 en classe, 240 convives en banquet ou 250 en cocktail. Séparées, elles servent de seconde plénière ou de salle de restitution à côté des ateliers.",
      },
      {
        titre: 'Des ateliers pour chaque taille de groupe',
        texte:
          "Pour les sous-commissions, une quinzaine de salles de 15 à 134 m² se répartissent entre les salons du château, aux boiseries d'époque, et l'aile contemporaine. Une salle confidentielle de 21 m² accueille 8 personnes pour les échanges qui ne doivent pas sortir de la pièce.",
      },
      {
        titre: 'La serre, de mai à octobre',
        texte:
          "Nichée en pleine nature dans le parc, notre serre de 300 m² reçoit 250 personnes en théâtre, 120 en classe ou 200 en cocktail. On y organise un séminaire créatif, un atelier de réflexion collective ou un cocktail au milieu des arbres.",
      },
    ],
    sources: [MICE, FACTSHEET, FICHE, CVENT],
  },

  chambres: {
    seoTitle: 'Séminaire résidentiel à Chantilly : 119 chambres (60)',
    seoDescription:
      "119 chambres et suites, dont 39 pensées pour travailler, jusqu'à 243 personnes hébergées. Spa avec piscine intérieure chauffée, sauna et hammam inclus.",
    resume:
      "119 chambres et suites de 18 à 60 m², jusqu'à 243 personnes logées sur place. Spa et piscine intérieure inclus pour les résidents.",
    intro:
      "Nos 119 chambres et suites se partagent entre deux univers. Au château, 80 chambres de 18 à 60 m² gardent l'esprit Belle Époque des lieux. Dans l'aile contemporaine, 39 chambres et suites de 18 à 38 m² sont pensées pour travailler, au calme, entre deux sessions. Avec les chambres partagées, nous logeons jusqu'à 243 participants sur place.",
    faits: [
      { label: 'Chambres et suites', valeur: '119 (110 chambres, 9 suites)', source: FACTSHEET },
      { label: 'Capacité d’hébergement', valeur: '243 personnes', source: SITE },
      { label: 'Chambres à lits jumeaux', valeur: '103', source: FICHE },
      { label: 'Surfaces', valeur: 'de 18 à 60 m²', source: MICE },
    ],
    photos: [
      { src: img('chambre-loft-industriel'), legende: "Chambre de l'aile contemporaine, coin salon et bureau" },
      { src: img('chambre-design-contemporaine'), legende: 'Chambre au mur graphique, avec secrétaire' },
      { src: img('chambre-double-cosy'), legende: 'Chambre double, tons bois et lin' },
      { src: img('chambre-elegante-moderne'), legende: 'Chambre sous les toits, tons gris et blanc' },
      { src: img('chambre-prestige-rouge'), legende: 'Grande chambre aux murs rouges et parquet en point de Hongrie' },
    ],
    blocs: [
      {
        titre: 'Au château ou dans l’aile contemporaine',
        texte:
          "Les chambres du château vont de la chambre standard de 19 à 22 m² à la chambre prestige de 40 m², certaines avec vue sur le parc. Dans l'aile contemporaine, les 21 chambres de 18 à 19 m² et les 9 suites de 38 m² offrent une ambiance minimaliste, avec un vrai coin bureau.",
      },
      {
        titre: 'Des lits jumeaux pour les grands groupes',
        texte:
          "103 chambres se configurent en lits jumeaux : un levier précieux pour loger un grand groupe en chambres partagées sans renoncer au confort. Votre coordinateur répartit les participants selon votre liste.",
      },
      {
        titre: 'Ce que chaque chambre comprend',
        texte:
          "Wi-Fi haut débit, douche ou baignoire, peignoir et chaussons, coin bureau, télévision avec Chromecast, machine à café, coffre-fort. Toutes les chambres sont non-fumeur.",
      },
      {
        titre: 'Le spa, inclus pour les résidents',
        texte:
          "Notre spa est ouvert gratuitement aux résidents, tous les jours de 7 h à 22 h : piscine intérieure chauffée, sauna, hammam, tisanerie, salle de fitness et de yoga. Cabines de soins et cabine de massage en duo sont disponibles sur réservation.",
      },
    ],
    sources: [FACTSHEET, MICE, SITE, FICHE],
  },

  exterieurs: {
    seoTitle: 'Château avec parc de 6 hectares en forêt de Chantilly',
    seoDescription:
      "Un parc de 6 hectares entouré de forêts, des terrasses en cascade, un amphithéâtre de verdure et une serre de 300 m² pour vos pauses et ateliers en plein air.",
    resume:
      "6 hectares de parc entourés de forêts : terrasses en cascade, amphithéâtre de verdure, serre de 300 m² et terrasse plein sud.",
    intro:
      "Le château se dresse au cœur d'un parc de 6 hectares, entouré de trois forêts et planté d'arbres centenaires. Des terrasses en cascade, dessinées à la manière d'un jardin italien, descendent du château vers les bois. Vos participants passent de la salle de réunion au grand air en quelques pas.",
    faits: [
      { label: 'Surface du parc', valeur: '6 hectares', source: SITE },
      { label: 'Serre événementielle', valeur: '300 m², de mai à octobre', source: MICE },
      { label: 'Terrasse du restaurant', valeur: 'plein sud', source: SITE },
      { label: 'Label environnemental', valeur: 'Clef Verte', source: SITE },
    ],
    photos: [
      { src: img('vue-aerienne-domaine'), legende: 'Le château anglo-normand et ses terrasses, vus du ciel' },
      { src: img('allee-parc-arboree'), legende: "L'allée arborée qui mène au château" },
      { src: img('jardin-amphitheatre-exterieur'), legende: "L'amphithéâtre de verdure, au pied des terrasses" },
      { src: img('facade-chateau'), legende: 'La façade à colombages et sa terrasse à balustres' },
      { src: img('terrasse-restaurant-exterieur'), legende: 'La terrasse du restaurant, face aux arbres du parc' },
    ],
    blocs: [
      {
        titre: 'Des terrasses en cascade',
        texte:
          "Au pied de la façade à colombages, les terrasses descendent par paliers vers le parc. Un amphithéâtre de verdure, avec ses gradins de pierre, se prête à une prise de parole en plein air ou à la photo de groupe de fin de séminaire.",
      },
      {
        titre: 'La serre, au milieu des arbres',
        texte:
          "De mai à octobre, notre serre de 300 m² accueille séminaires créatifs, cocktails et activités de cohésion en pleine nature : un cadre propice à la déconnexion et à la réflexion collective, à quelques minutes à pied du château.",
      },
      {
        titre: 'Le parc comme terrain de jeu',
        texte:
          "Court de tennis, vélos, pétanque, mölkky et jeux d'extérieur sont à disposition. Le domaine abrite aussi un rucher : en saison, sur réservation, l'apiculteur fait visiter les ruches, d'où vient le miel servi au petit-déjeuner.",
      },
    ],
    sources: [SITE, MICE, FACTSHEET, FICHE],
  },

  restauration: {
    seoTitle: 'Restaurants du château : terrasse plein sud, Chantilly',
    seoDescription:
      "3 restaurants et un bar à cocktails, terrasse plein sud sur le parc, déjeuner en libre-service raffiné de produits de saison. Banquets jusqu'à 250 convives.",
    resume:
      "3 restaurants et un bar, une terrasse plein sud sur le parc, et des banquets jusqu'à 250 convives.",
    intro:
      "Nos 3 restaurants et notre bar permettent de varier les cadres au fil d'un séminaire de plusieurs jours : déjeuner en libre-service raffiné, carte servie à toute heure, table bistronomique. La terrasse plein sud, avec sa vue panoramique sur le parc, accueille les déjeuners à la belle saison.",
    faits: [
      { label: 'Restaurants', valeur: '3, et un bar', source: SITE },
      { label: 'Banquet au Grand Salon', valeur: '240 convives', source: MICE },
      { label: 'Banquet dans la serre', valeur: '250 convives', source: MICE },
      { label: 'Régimes alimentaires', valeur: 'tous pris en charge', source: FICHE },
    ],
    photos: [
      { src: img('dejeuner-libre-service-raffine'), legende: 'Déjeuner en libre-service raffiné, produits de saison, dans un salon lambrissé' },
      { src: img('patisseries-pause-gourmande'), legende: 'Les pâtisseries de la pause gourmande' },
      { src: img('restaurant-bar-lounge'), legende: 'La salle du restaurant, sur deux niveaux, au sol en damier' },
      { src: img('terrasse-restaurant-exterieur'), legende: 'Déjeuner en terrasse, face au parc' },
    ],
    blocs: [
      {
        titre: 'Trois façons de passer à table',
        texte:
          "Un déjeuner en libre-service raffiné, de saison et aux influences du monde, dans un esprit de partage ; une carte généreuse qui mêle classiques français et inspirations internationales, servie à toute heure ; une table bistronomique où les chefs revisitent les produits du terroir. Chaque repas du séminaire peut avoir son propre cadre.",
      },
      {
        titre: 'Banquets et dîners assis',
        texte:
          "Le Grand Salon du château reçoit 240 convives en banquet, la salle plénière 140, et la serre du parc 250 de mai à octobre. Pour un groupe plus restreint, un salon privé de 41 m² accueille 40 convives à table.",
      },
      {
        titre: 'Petit-déjeuner, pauses et menus sur mesure',
        texte:
          "Le petit-déjeuner est servi en libre-service, avec des produits locaux et de saison et le miel du domaine. Les pauses gourmandes sont servies dans les salons attenants aux salles de réunion. Notre équipe compose les menus selon votre programme et prend en charge les régimes végétarien, végan, sans gluten, halal ou casher.",
      },
    ],
    sources: [SITE, MICE, FICHE],
  },

  soirees: {
    seoTitle: "Soirée d'entreprise dans un château à Chantilly",
    seoDescription:
      "Dîner de gala jusqu'à 240 convives, cocktail jusqu'à 250, bar à cocktails ouvert tard, soirée DJ, billard : vos soirées sans quitter le château.",
    resume:
      "Dîner de gala au Grand Salon, bar à cocktails, salon au coin du feu, soirée DJ : la soirée se passe sur place.",
    intro:
      "Après la journée de travail, la soirée se déroule sans quitter le domaine. Dîner de gala au Grand Salon, verre au bar, partie de billard au coin du feu : vos participants regagnent leur chambre à pied, sans navette ni horaire de retour.",
    faits: [
      { label: 'Dîner de gala', valeur: '240 convives', source: MICE },
      { label: 'Cocktail au Grand Salon', valeur: '250 personnes', source: MICE },
      { label: 'Bar ouvert le vendredi et le samedi', valeur: "jusqu'à 1 h", source: SITE },
    ],
    photos: [
      { src: img('salon-lounge-bar'), legende: 'Le salon du bar, fauteuils colorés et sol à motifs' },
      { src: img('bar-lounge-chic'), legende: 'Le salon-bar contemporain, fauteuils de cuir et étagères' },
      { src: img('salon-cheminee-cosy'), legende: 'Le salon au coin du feu, boiseries et fauteuils fleuris' },
      { src: img('restaurant-bar-lounge'), legende: 'La grande salle dressée pour le dîner' },
    ],
    blocs: [
      {
        titre: 'Le dîner de gala',
        texte:
          "Le Grand Salon du château reçoit 240 convives en banquet ou 250 en cocktail dînatoire. Pour un format plus scénique, la salle plénière accueille 140 personnes à table, avec scène, écran géant et éclairages personnalisés pour les discours et remises de prix.",
      },
      {
        titre: 'Le bar à cocktails',
        texte:
          "Dans une ambiance feutrée, nos barmans préparent des cocktails signatures à base de sirops et d'hydrolats maison, inspirés de l'herboristerie, aux côtés des grands classiques. Le bar reste ouvert jusqu'à 1 h le vendredi et le samedi, jusqu'à 0 h 30 les autres soirs.",
      },
      {
        titre: 'Prolonger la soirée',
        texte:
          "Soirée DJ, billard, ping-pong ou échecs dans les salons du château : notre équipe adapte la fin de soirée à l'énergie du groupe. De mai à octobre, la serre du parc accueille aussi des cocktails jusqu'à 200 personnes.",
      },
    ],
    sources: [MICE, SITE, FACTSHEET],
  },

  activites: {
    seoTitle: 'Team building en forêt de Chantilly, au château',
    seoDescription:
      "Challenges nature, ateliers créatifs, VTT, dragon boat, rallye 2CV, atelier crème Chantilly, yoga, équitation : activités de cohésion sur place et autour.",
    resume:
      "Challenges nature dans le parc, VTT, dragon boat, rallye 2CV, atelier crème Chantilly, yoga : des formats de cohésion sur place et alentour.",
    intro:
      "Le parc de 6 hectares et la forêt de Chantilly servent de terrain aux activités de cohésion. Certaines se pratiquent librement pendant les temps de pause ; d'autres sont organisées par notre équipe pour l'ensemble du groupe, à l'horaire prévu dans votre programme.",
    faits: [
      { label: 'Parc', valeur: '6 hectares', source: SITE },
      { label: 'Spa', valeur: 'ouvert de 7 h à 22 h', source: SITE },
      { label: 'Serre pour les ateliers', valeur: '300 m²', source: MICE },
    ],
    photos: [
      { src: img('jardin-amphitheatre-exterieur'), legende: "L'amphithéâtre de verdure, cadre des ateliers en plein air" },
      { src: img('salle-atelier-creatif'), legende: 'Atelier créatif en sous-groupe' },
      { src: img('allee-parc-arboree'), legende: 'Les allées du parc, pour les sorties à vélo' },
    ],
    blocs: [
      {
        titre: 'Dans le parc',
        texte:
          "Challenges nature, ateliers créatifs et coaching en plein air se déroulent dans le parc ou dans la serre, de mai à octobre. Vélos, court de tennis, pétanque et jeux d'extérieur restent à disposition entre deux sessions.",
      },
      {
        titre: 'Des formats de cohésion autour de Chantilly',
        texte:
          "VTT en forêt, dragon boat, rallye en 2CV dans les environs, atelier autour de la crème Chantilly, soirée DJ : notre équipe organise l'activité et l'adapte à la taille du groupe. La région se prête aussi aux balades à cheval et aux visites du domaine de Chantilly en calèche.",
      },
      {
        titre: 'Le bien-être',
        texte:
          "Des séances de yoga ont lieu au spa, qui réunit piscine intérieure chauffée, sauna, hammam et salle de fitness. Un réveil au yoga ou un créneau de massage donne un autre rythme à un séminaire de plusieurs jours.",
      },
    ],
    sources: [SITE, MICE],
  },

  acces: {
    seoTitle: 'Accès au château : A1, TER Paris-Nord et Roissy à 25 min',
    seoDescription:
      "À moins de 35 km de Paris par l'A1, gare de Chantilly à 5 min (TER direct depuis Paris-Nord en 25 min environ), Roissy-CDG à 25 min. Parking gratuit.",
    resume:
      "À moins de 35 km de Paris par l'A1, à 5 minutes de la gare de Chantilly et 25 minutes de Roissy-CDG. Parking gratuit sur place.",
    intro:
      "Le domaine se trouve en lisière de la forêt de Chantilly, dans l'Oise, à moins de 35 km de Paris. On y vient en voiture par l'A1, en train depuis la gare du Nord, ou en avion par Roissy-Charles-de-Gaulle.",
    faits: [
      { label: 'Distance de Paris', valeur: 'moins de 35 km', source: SITE },
      { label: 'Gare de Chantilly', valeur: '5 min en voiture', source: SITE },
      { label: 'TER depuis Paris-Nord', valeur: 'environ 25 min, direct', source: TRAIN },
      { label: 'Aéroport Roissy-CDG', valeur: '25 min', source: SITE },
      { label: 'Parking', valeur: 'gratuit, sur place', source: FACTSHEET },
    ],
    photos: [
      { src: chateauImage('Manoir Chantilly', 'seminaire-chateau-chantilly-facade-anglo-normande.webp'), legende: 'La façade anglo-normande, à votre arrivée' },
      { src: img('allee-parc-arboree'), legende: "L'allée d'arrivée, à travers le parc" },
    ],
    blocs: [
      {
        titre: 'En voiture',
        texte:
          "Depuis Paris, prenez l'A1 vers le nord et sortez à Survilliers-Chantilly (sortie 7), puis suivez Chantilly par la N17 et la D924a ; le château est ensuite fléché. Depuis Bruxelles, sortez de l'A1 à Senlis (sortie 8). L'itinéraire détaillé est joint à votre confirmation. Le parking est gratuit sur place.",
      },
      {
        titre: 'En train ou en RER',
        texte:
          "Des TER directs relient Paris-Gare du Nord à la gare de Chantilly en 25 minutes environ ; la gare est ensuite à 5 minutes en voiture du domaine. Par le RER D, la gare d'Orry-la-Ville est à 15 minutes en voiture. Notre équipe peut organiser un transfert pour l'ensemble de vos participants.",
      },
      {
        titre: 'En avion',
        texte:
          "L'aéroport Roissy-Charles-de-Gaulle est à 25 minutes de route : un atout pour les séminaires internationaux et les participants venus de province. Un transfert depuis l'aéroport peut être organisé sur demande.",
      },
      {
        titre: 'Accessibilité',
        texte: "Le domaine est accessible aux personnes à mobilité réduite.",
      },
    ],
    sources: [SITE, FACTSHEET, TRAIN, FICHE],
  },
};

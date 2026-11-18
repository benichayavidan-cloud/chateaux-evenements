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
/** Photo hébergée dans le stockage (lot du 18/11/2026, éclairage retouché ; originaux dans manoir-chantilly/originaux). */
const stock = (nom: string) => chateauImage('Manoir Chantilly', `seminaire-chateau-chantilly-${nom}.webp`);

export const rubriquesManoirChantilly: RubriquesDomaine = {
  salles: {
    seoTitle: 'Salles de séminaire en château, forêt de Chantilly',
    titreSection: "Salles de séminaire à Chantilly : jusqu'à 280 participants",
    conseil:
      "Pour une convention, demandez-moi la plénière de 280 places, avec son écran de 18 m². Et si vos ateliers demandent de l'air, la serre du parc reçoit vos groupes de mai à octobre.",
    seoDescription:
      "21 espaces de réunion de 15 à 300 m² : plénière de 280 places avec écran de 18 m², grand salon de 264 m², serre dans le parc. Capacités salle par salle.",
    resume:
      "21 espaces à la lumière du jour, de 15 à 240 m², plus une serre de 300 m² dans le parc. La plénière reçoit 280 personnes en théâtre.",
    intro:
      "Nos 21 espaces de réunion, tous éclairés par la lumière du jour, se répartissent entre le château, une aile contemporaine et le bâtiment de la plénière : votre séminaire passe de la plénière aux ateliers sans quitter le domaine. De la salle confidentielle de 21 m² pour un comité restreint à la plénière de 240 m² qui reçoit 280 personnes, chaque format de réunion a sa salle. De mai à octobre, une serre de 300 m² s'ajoute dans le parc pour vos séminaires créatifs.",
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
      { src: stock('salon-travail-pause-fauteuils'), legende: "Le salon de travail et de pause, avec ses fauteuils et ses tables hautes" },
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
          "Pour les sous-commissions, une quinzaine de salles de 15 à 134 m² se répartissent entre les salons du château, aux boiseries d'époque, et l'aile contemporaine. Certaines, au rez-de-jardin, ouvrent sur une terrasse privée pour les pauses à la belle saison. Une salle confidentielle de 21 m² accueille 8 personnes pour les échanges qui ne doivent pas sortir de la pièce.",
      },
      {
        titre: 'La serre, de mai à octobre',
        texte:
          "Nichée en pleine nature dans le parc, notre serre de 300 m² reçoit 250 personnes en théâtre, 120 en classe ou 200 en cocktail. On y organise un séminaire créatif, un atelier de réflexion collective ou un cocktail au milieu des arbres.",
      },
    ],
    blocsSection: [1, 3],
    sections: [
      {
        ancre: 'salle-signature',
        etiquette: "La salle plénière",
        titre: "Une plénière de 280 places pour votre convention à Chantilly",
        intro:
          "Pour une convention, un lancement de produit ou un kick-off, notre salle plénière de 240 m² reçoit 280 participants en théâtre, sous 6,7 mètres de plafond. Elle occupe son propre bâtiment.",
        blocs: [
          { titre: "Une scène, un écran de 18 m² et une régie", texte: "La salle dispose d'un écran géant de 18 m², d'une scène équipée, d'une régie intégrée et d'éclairages personnalisables : les prises de parole de votre convention y prennent une autre ampleur." },
          { titre: "Du théâtre au dîner de gala", texte: "280 places en théâtre pour la plénière, 120 en classe pour une séance de travail, 140 convives en banquet le soir : la même salle suit le déroulé de votre séminaire. Le dîner s'y tient avec scène, écran géant et éclairages personnalisés, pour les discours et les remises de prix." },
          { titre: "Puis les ateliers", texte: "Après la plénière, vos participants rejoignent les salles d'ateliers du château et de l'aile contemporaine, sans quitter le domaine." },
        ],
        faits: [
          { label: "Surface", valeur: "240 m²" },
          { label: "En théâtre", valeur: "280 places" },
          { label: "En banquet", valeur: "140 convives" },
          { label: "Hauteur sous plafond", valeur: "6,7 m" },
        ],
        photos: [
          { src: img('salle-pleniere-theatre'), legende: "La salle plénière en disposition théâtre, écrans géants et scène" },
          { src: img('salle-pleniere-brique'), legende: "Salle de réunion aux murs de pierre et au plafond boisé, en disposition théâtre" },
        ],
        conseil:
          "Pour une remise de prix pendant votre convention, je vous conseille la plénière en banquet : 140 convives à table, avec scène, écran géant et éclairages personnalisés.",
      },
      {
        ancre: 'ateliers',
        etiquette: 'Ateliers et sous-commissions',
        titre: "Des salles d'ateliers pour vos sous-commissions, à Chantilly",
        intro:
          "Après la plénière, votre séminaire se poursuit en ateliers : une quinzaine de salles de 15 à 134 m² se répartissent entre les salons du château et l'aile contemporaine.",
        reprend: [2],
        blocs: [
          { titre: "Les pauses à deux pas des salles", texte: "Les pauses gourmandes de votre séminaire sont servies dans les salons attenants aux salles de réunion : vos participants reprennent la séance sans perdre de temps." },
          { titre: "Toutes à la lumière du jour", texte: "Nos 21 espaces de réunion sont tous éclairés par la lumière du jour : un confort qui compte quand vos ateliers durent toute la journée." },
        ],
        faits: [
          { label: "Salles d'ateliers", valeur: "une quinzaine, de 15 à 134 m²" },
          { label: "Salle confidentielle", valeur: "21 m², 8 personnes" },
          { label: "Lumière du jour", valeur: "dans tous les espaces" },
        ],
        reprendPhotos: [4, 6, 5, 7],
        photos: [
          { src: stock('salle-reunion-table-conseil'), legende: "Salon du château en table de conseil, pour un comité de direction" },
        ],
        conseil:
          "Pour vos sous-commissions, donnez-moi le nombre de groupes et leur taille : entre les salons du château et l'aile contemporaine, chaque atelier de votre séminaire a sa salle.",
      },
    ],
    sources: [MICE, FACTSHEET, FICHE, CVENT],
  },

  chambres: {
    seoTitle: 'Séminaire résidentiel à Chantilly : 119 chambres (60)',
    titreSection: "Hébergement de séminaire à Chantilly : 243 participants logés sur place",
    conseil:
      "Pour les participants de votre séminaire qui préparent une session le soir, demandez-moi les 9 suites de l'aile contemporaine : 38 m² et un vrai coin bureau.",
    seoDescription:
      "119 chambres et suites de 18 à 60 m², dont 103 à lits jumeaux et 39 pensées pour travailler. Jusqu'à 243 personnes hébergées sur place, à Chantilly.",
    resume:
      "119 chambres et suites de 18 à 60 m², jusqu'à 243 personnes logées sur place, dont 103 chambres à lits jumeaux.",
    intro:
      "Pour un séminaire résidentiel, nos 119 chambres et suites logent tout votre groupe sur place, jusqu'à 243 participants avec les chambres partagées. Au château, 80 chambres de 18 à 60 m² gardent l'esprit Belle Époque des lieux. Dans l'aile contemporaine, 39 chambres et suites de 18 à 38 m² sont pensées pour travailler au calme entre deux sessions.",
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
      { src: stock('chambre-claire-coin-salon'), legende: "Chambre lumineuse avec coin salon" },
      { src: stock('chambre-bois-clair-coin-salon'), legende: "Chambre aux tons bois clair, avec coin salon séparé" },
      { src: stock('salle-de-bains-douche-baignoire'), legende: "Salle de bains sous les toits, avec douche et baignoire" },
      { src: stock('salle-de-bains-peignoirs'), legende: "Salle de bains avec vasque, peignoirs à disposition" },
    ],
    blocs: [
      {
        titre: 'Au château ou dans l’aile contemporaine',
        texte:
          "Vous répartissez vos participants selon leur rôle : les chambres du château vont de la chambre standard de 19 à 22 m² à la chambre prestige de 40 m², certaines avec vue sur le parc, pour vos intervenants ou votre comité de direction. Dans l'aile contemporaine, les 21 chambres de 18 à 19 m² et les 9 suites de 38 m² offrent une ambiance minimaliste, avec un vrai coin bureau pour préparer la session du lendemain.",
      },
      {
        titre: 'Des lits jumeaux pour les grands groupes',
        texte:
          "103 chambres se configurent en lits jumeaux : un levier précieux pour loger un grand groupe en chambres partagées sans renoncer au confort, et pour tenir le budget d'un séminaire de plusieurs jours. Votre coordinateur répartit les participants selon votre liste.",
      },
      {
        titre: 'Ce que chaque chambre comprend',
        texte:
          "Chaque participant dispose du Wi-Fi haut débit, d'un coin bureau, d'une douche ou d'une baignoire, d'un peignoir et de chaussons, d'une télévision avec Chromecast, d'une machine à café et d'un coffre-fort. Toutes les chambres sont non-fumeur.",
      },
    ],
    blocsSection: [0, 2],
    sections: [
      {
        ancre: "grand-groupe",
        etiquette: "Grands groupes",
        titre: "103 chambres à lits jumeaux pour loger votre convention",
        intro:
          "Pour une convention ou un séminaire résidentiel en grand groupe, tous vos participants dorment sur le domaine : 80 chambres au château et 39 chambres et suites dans l'aile contemporaine.",
        reprend: [1],
        blocs: [
          { titre: "Tout le groupe sur le même domaine", texte: "Vos participants se répartissent entre le château et l'aile contemporaine. Le soir, après le dîner, chacun regagne sa chambre à pied, sans navette ni horaire de retour." },
        ],
        faits: [
          { label: "Capacité d'hébergement", valeur: "243 participants" },
          { label: "Chambres à lits jumeaux", valeur: "103" },
          { label: "Chambres au château", valeur: "80" },
        ],
        reprendPhotos: [2, 3],
        photos: [
        ],
        conseil:
          "Pour une convention, envoyez-moi la liste de vos participants : nous préparons avec vous leur répartition, y compris dans les chambres à lits jumeaux.",
      },
      {
        ancre: "direction-invites",
        etiquette: "Direction et invités",
        titre: "Chambres prestige et suites pour votre comité de direction",
        intro:
          "Pour vos intervenants, vos invités et votre comité de direction, réservez les plus belles chambres du domaine : les chambres prestige du château et les suites de l'aile contemporaine.",
        reprend: [],
        blocs: [
          { titre: "Les chambres prestige du château", texte: "Au château, les chambres prestige de 40 m² gardent l'esprit Belle Époque des lieux. Certaines chambres ont vue sur le parc : une attention pour les intervenants et les invités de votre séminaire." },
          { titre: "Neuf suites dans l'aile contemporaine", texte: "Les 9 suites de 38 m² de l'aile contemporaine offrent une ambiance minimaliste et un vrai coin bureau : votre comité de direction y prépare la session du lendemain." },
        ],
        faits: [
          { label: "Chambre prestige", valeur: "40 m²" },
          { label: "Suites", valeur: "9, de 38 m²" },
          { label: "Surface des chambres", valeur: "jusqu'à 60 m²" },
        ],
        reprendPhotos: [4, 0],
        photos: [
          { src: stock('chambre-prestige-parquet-coin-salon'), legende: "Grande chambre du château : parquet, moulures et coin salon" },
          { src: stock('chambre-classique-tete-de-lit-fleurie'), legende: "Chambre du château à la tête de lit fleurie, ouverte sur un balcon" },
          { src: stock('suite-sous-les-toits-murs-dores'), legende: "Suite sous les toits aux murs dorés, avec coin salon" },
          { src: stock('suite-coin-bureau-vasque'), legende: "Suite avec bureau et vasque, ouverte sur la chambre" },
          { src: stock('suite-coin-salon-canape'), legende: "Le coin salon d'une suite : canapé, table basse et bibliothèque" },
        ],
        conseil:
          "Pour les intervenants de votre séminaire, pensez aux chambres prestige du château : 40 m² dans l'esprit Belle Époque.",
      },
      {
        ancre: "sejour",
        etiquette: "Le séjour de vos participants",
        titre: "De l'arrivée au petit-déjeuner : le séjour de vos participants à Chantilly",
        intro:
          "Pendant votre séminaire résidentiel, tout est prévu pour que vos participants n'aient à penser qu'à leur programme de travail, de l'arrivée sur le domaine au petit-déjeuner du lendemain.",
        reprend: [],
        blocs: [
          { titre: "Arrivée et stationnement", texte: "Vos participants venus en voiture se garent sur le parking gratuit du domaine. Pour ceux qui arrivent en train, la gare de Chantilly est à 5 minutes en voiture, et notre équipe peut organiser un transfert pour l'ensemble du groupe. Le domaine est accessible aux participants à mobilité réduite." },
          { titre: "Le petit-déjeuner avant la première session", texte: "Le petit-déjeuner de vos participants est servi en libre-service, avec des produits locaux et de saison et le miel du domaine." },
        ],
        faits: [
          { label: "Parking", valeur: "gratuit, sur place" },
          { label: "Gare de Chantilly", valeur: "à 5 min en voiture" },
          { label: "Petit-déjeuner", valeur: "en libre-service" },
        ],
        reprendPhotos: [],
        photos: [
          { src: "https://jmeiepmtgidqtmxfnlwf.supabase.co/storage/v1/object/public/chateaux-images/manoir-chantilly/seminaire-chateau-chantilly-facade-anglo-normande.webp", legende: "La façade anglo-normande, à votre arrivée" },
          { src: "/images/seminaire-chateau-chantilly-allee-parc-arboree.webp", legende: "L'allée d'arrivée, à travers le parc" },
          { src: "/images/seminaire-chateau-chantilly-lobby-salon-accueil.webp", legende: "Le salon de travail et de pause, ouvert sur le parc" },
        ],
        conseil:
          "Pour les participants de votre séminaire qui viennent en voiture, le parking du domaine est gratuit : précisez-le dans votre convocation.",
      },
    ],
    sources: [FACTSHEET, MICE, SITE, FICHE],
  },

  exterieurs: {
    seoTitle: 'Château avec parc de 6 hectares en forêt de Chantilly',
    titreSection: "Un parc de 6 hectares pour vos pauses et vos ateliers de séminaire",
    conseil:
      "Prévoyez un temps dehors dans le programme de votre séminaire : les terrasses sont au pied du château, vos participants y sont en quelques pas.",
    seoDescription:
      "Un parc de 6 hectares entouré de forêts, des terrasses en cascade, un amphithéâtre de verdure et une serre de 300 m² pour vos pauses et ateliers en plein air.",
    resume:
      "6 hectares de parc entourés de forêts : terrasses en cascade, amphithéâtre de verdure, serre de 300 m² et terrasse plein sud.",
    intro:
      "Le château se dresse au cœur d'un parc de 6 hectares, entouré de trois forêts et planté d'arbres centenaires. Vos participants passent de la salle de réunion au grand air en quelques pas.",
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
      { src: "https://jmeiepmtgidqtmxfnlwf.supabase.co/storage/v1/object/public/chateaux-images/manoir-chantilly/seminaire-chateau-chantilly-facade-anglo-normande.webp", legende: 'La façade anglo-normande du château' },
      { src: stock('facade-lierre-colombages'), legende: "La façade du château, couverte de verdure" },
    ],
    blocs: [
      {
        titre: 'Des terrasses en cascade',
        texte:
          "Au pied de la façade à colombages, des terrasses en cascade, dessinées à la manière d'un jardin italien, descendent par paliers du château vers les bois.",
      },
      {
        titre: 'La serre, au milieu des arbres',
        texte:
          "De mai à octobre, notre serre de 300 m² accueille séminaires créatifs, cocktails et activités de cohésion en pleine nature : un cadre propice à la déconnexion et à la réflexion collective, à quelques minutes à pied du château.",
      },
    ],
    blocsSection: [0],
    sections: [
      {
        ancre: "plein-air",
        etiquette: "Travailler et recevoir dehors",
        titre: "Séminaire en plein air à Chantilly : serre, amphithéâtre et terrasse",
        intro:
          "À la belle saison, une partie de votre séminaire peut se tenir dehors : un atelier dans la serre du parc, une prise de parole dans l'amphithéâtre de verdure, un déjeuner sur la terrasse du restaurant.",
        reprend: [1],
        blocs: [
          { titre: "L'amphithéâtre de verdure", texte: "Au pied des terrasses, un amphithéâtre de verdure, avec ses gradins de pierre, se prête à une prise de parole en plein air ou à la photo de groupe de fin de séminaire." },
          { titre: "Le déjeuner en terrasse, plein sud", texte: "La terrasse du restaurant, orientée plein sud, accueille les déjeuners de votre groupe à la belle saison, avec une vue panoramique sur le parc." },
        ],
        faits: [
          { label: "Serre du parc", valeur: "séminaires créatifs et cocktails" },
          { label: "Amphithéâtre du parc", valeur: "gradins de pierre" },
          { label: "Terrasse du restaurant", valeur: "plein sud, vue sur le parc" },
        ],
        reprendPhotos: [2, 4],
        photos: [
          { src: stock('terrasse-tables-dressees-parc'), legende: "Tables dressées sur une terrasse fleurie, face au parc" },
          { src: stock('terrasse-fleurie-hortensias'), legende: "Un coin de terrasse au milieu des hortensias" },
        ],
        conseil:
          "Pour un atelier de votre séminaire entre mai et octobre, demandez-moi la serre du parc : 300 m² au milieu des arbres.",
      },
      {
        ancre: "detente",
        etiquette: "S'aérer entre deux sessions",
        titre: "Entre deux sessions : tennis, vélos et rucher dans le parc du château",
        intro:
          "Entre deux sessions de travail, vos participants trouvent dans le parc de quoi bouger ou souffler.",
        reprend: [],
        blocs: [
          { titre: "Tennis, vélos et pétanque à disposition", texte: "Court de tennis, vélos, pétanque, mölkky et jeux d'extérieur sont à la disposition de vos participants pendant leurs temps de pause." },
          { titre: "Le rucher du domaine", texte: "Le domaine abrite un rucher. En saison, sur réservation, l'apiculteur fait visiter les ruches à votre groupe : c'est de là que vient le miel servi au petit-déjeuner." },
        ],
        faits: [
          { label: "Tennis", valeur: "un court à disposition" },
          { label: "Jeux d'extérieur", valeur: "pétanque, mölkky" },
          { label: "Rucher du domaine", valeur: "visite sur réservation" },
        ],
        reprendPhotos: [1],
        photos: [
          { src: stock('velos-facade-lierre'), legende: "Des vélos à disposition devant la façade du château" },
          { src: stock('court-de-tennis'), legende: "Le court de tennis du domaine" },
        ],
        conseil:
          "Pour une pause originale pendant votre séminaire, demandez-moi la visite du rucher : elle se réserve en saison pour vos participants.",
      },
    ],
    sources: [SITE, MICE, FACTSHEET, FICHE],
  },

  restauration: {
    seoTitle: 'Restaurants du château : terrasse plein sud, Chantilly',
    titreSection: "Restauration de séminaire à Chantilly : 3 restaurants et banquets",
    conseil:
      "À la belle saison, demandez-moi la terrasse plein sud pour le déjeuner de vos participants : elle donne sur le parc du château.",
    seoDescription:
      "3 restaurants et un bar à cocktails, terrasse plein sud sur le parc, déjeuner en libre-service raffiné de produits de saison. Banquets jusqu'à 250 convives.",
    resume:
      "3 restaurants et un bar, une terrasse plein sud sur le parc, et des banquets jusqu'à 250 convives.",
    intro:
      "Nos 3 restaurants et notre bar permettent de varier les cadres au fil d'un séminaire de plusieurs jours : déjeuner en libre-service raffiné, carte servie à toute heure, table bistronomique. La terrasse plein sud, avec sa vue panoramique sur le parc, accueille les déjeuners de votre groupe à la belle saison.",
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
      { src: stock('restaurant-mezzanine-escalier'), legende: "Le restaurant sur deux niveaux, avec son escalier et son sol en damier" },
      { src: stock('restaurant-boiseries-tables-dressees'), legende: "Une salle de restaurant aux boiseries, tables dressées pour le déjeuner" },
      { src: stock('dejeuner-libre-service-salle-boisee'), legende: "Le déjeuner en libre-service raffiné, dans une salle aux boiseries" },
      { src: stock('dejeuner-libre-service-produits-saison'), legende: "Le libre-service raffiné : produits de saison présentés devant les boiseries" },
      { src: stock('assiette-oeuf-poche-avocat'), legende: "Une assiette du restaurant : œuf coulant, avocat et jeunes pousses" },
      { src: stock('dessert-tartelette-meringuee'), legende: "Un dessert à l'assiette : tartelette meringuée" },
    ],
    blocs: [
      {
        titre: 'Trois façons de passer à table',
        texte:
          "Vos participants ne déjeunent pas deux fois au même endroit : un libre-service raffiné, de saison et aux influences du monde, dans un esprit de partage ; une carte généreuse qui mêle classiques français et inspirations internationales, servie à toute heure ; une table bistronomique où les chefs revisitent les produits du terroir. Chaque repas du séminaire peut avoir son propre cadre.",
      },
      {
        titre: 'Banquets et dîners assis',
        texte:
          "Le Grand Salon du château reçoit 240 convives en banquet, la salle plénière 140, et la serre du parc 250 de mai à octobre. Pour un groupe plus restreint, un salon privé de 41 m² accueille 40 convives à table.",
      },
      {
        titre: 'Petit-déjeuner, pauses et menus sur mesure',
        texte:
          "Le petit-déjeuner de vos participants est servi en libre-service, avec des produits locaux et de saison et le miel du domaine. Les pauses gourmandes sont servies dans les salons attenants aux salles de réunion. Notre équipe compose les menus selon votre programme et prend en charge les régimes végétarien, végan, sans gluten, halal ou casher.",
      },
    ],
    blocsSection: [0],
    sections: [
      {
        ancre: "banquets",
        etiquette: "Banquets et dîners de groupe",
        titre: "Banquet de séminaire à Chantilly : du salon privé à 250 convives",
        intro:
          "Pour le dîner de gala de votre convention comme pour un repas en petit comité, les tables se dressent sur le domaine : au Grand Salon du château, en salle plénière, dans la serre du parc ou dans un salon privé.",
        reprend: [1],
        blocs: [
          { titre: "En cocktail dînatoire", texte: "Si vous préférez un format debout pour la soirée de votre séminaire, le Grand Salon reçoit 250 personnes en cocktail dînatoire. De mai à octobre, la serre du parc accueille aussi des cocktails jusqu'à 200 personnes." },
        ],
        faits: [
          { label: "Dîner assis en salle plénière", valeur: "140 convives" },
          { label: "Salon privé", valeur: "40 convives à table" },
          { label: "Cocktail au Grand Salon", valeur: "250 personnes" },
        ],
        reprendPhotos: [2],
        photos: [
          { src: stock('salle-banquet-tables-rondes'), legende: "Une salle du château dressée en tables rondes pour un banquet" },
          { src: stock('diner-salon-prive-cheminee'), legende: "Un dîner dressé sur une grande table ovale, devant la cheminée d'un salon boisé" },
        ],
        conseil:
          "Pour le repas d'un groupe restreint pendant votre séminaire, demandez-moi le salon privé : 40 convives à table, dans un cadre à part.",
      },
      {
        ancre: "pauses",
        etiquette: "Pauses et petit-déjeuner",
        titre: "Pauses de séminaire à Chantilly : petit-déjeuner et régimes alimentaires",
        intro:
          "Du petit-déjeuner aux pauses de la journée, les repas courts de votre séminaire sont servis sur le domaine, et les menus s'adaptent aux régimes de vos participants.",
        reprend: [],
        blocs: [
          { titre: "Le petit-déjeuner et les pauses gourmandes", texte: "Avant la première session, le petit-déjeuner est servi en libre-service, avec des produits locaux et de saison et le miel du domaine. Dans la journée, les pauses gourmandes de votre groupe sont servies dans les salons attenants aux salles de réunion." },
          { titre: "Régimes alimentaires et menus sur mesure", texte: "Notre équipe compose les menus de votre séminaire selon votre programme. Elle prend en charge les régimes végétarien, végan, sans gluten, halal ou casher de vos participants." },
        ],
        faits: [
          { label: "Petit-déjeuner", valeur: "en libre-service" },
          { label: "Pauses gourmandes", valeur: "à côté de vos salles" },
          { label: "Régimes alimentaires", valeur: "cinq pris en charge" },
        ],
        reprendPhotos: [1],
        photos: [
          { src: stock('petit-dejeuner-terrasse-balustrade'), legende: "Petit-déjeuner servi sur une terrasse à balustres, face au parc" },
          { src: stock('petit-dejeuner-gaufres-oeufs'), legende: "Petit-déjeuner : gaufres, œufs au plat, fruits frais et café" },
          { src: stock('petit-dejeuner-balcon-foret'), legende: "Petit-déjeuner sur un balcon, face aux arbres du parc" },
        ],
        conseil:
          "Pensez à me transmettre les régimes alimentaires de vos participants avec votre demande : les menus de votre séminaire en tiennent compte.",
      },
    ],
    sources: [SITE, MICE, FICHE],
  },

  soirees: {
    seoTitle: "Soirée d'entreprise dans un château à Chantilly",
    titreSection: "Soirée d'entreprise et dîner de gala au château, à Chantilly",
    conseil:
      "Pour clore votre convention, le dîner de gala se tient au Grand Salon, jusqu'à 240 convives. Ensuite, vos participants prolongent au bar, ouvert jusqu'à 1 h le vendredi et le samedi.",
    seoDescription:
      "Dîner de gala jusqu'à 240 convives, cocktail jusqu'à 250, bar à cocktails ouvert tard, soirée DJ, billard : vos soirées sans quitter le château.",
    resume:
      "Dîner de gala au Grand Salon, bar à cocktails, salon au coin du feu, soirée DJ : la soirée se passe sur place.",
    intro:
      "Après la journée de travail, la soirée se déroule sans quitter le domaine. Dîner de gala au Grand Salon, verre au bar, partie de billard au coin du feu : vos participants regagnent leur chambre à pied, sans navette ni horaire de retour.",
    faits: [
      { label: 'Dîner de gala', valeur: '240 convives', source: MICE },
      { label: 'Cocktail au Grand Salon', valeur: '250 personnes', source: MICE },
      { label: 'Bar, vendredi et samedi', valeur: "jusqu'à 1 h", source: SITE },
    ],
    photos: [
      { src: img('salon-lounge-bar'), legende: 'Le salon du bar, fauteuils colorés et sol à motifs' },
      { src: img('bar-lounge-chic'), legende: 'Le salon-bar contemporain, fauteuils de cuir et étagères' },
      { src: img('salon-cheminee-cosy'), legende: 'Le salon au coin du feu, boiseries et fauteuils fleuris' },
      { src: img('restaurant-bar-lounge'), legende: 'La grande salle dressée pour le dîner' },
      { src: stock('salle-banquet-tables-rondes'), legende: "Une salle du château dressée en tables rondes pour un banquet" },
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
          "Après le dîner, vos participants se retrouvent au bar : dans une ambiance feutrée, nos barmans préparent des cocktails signatures à base de sirops et d'hydrolats maison, inspirés de l'herboristerie, aux côtés des grands classiques. Le bar reste ouvert jusqu'à 1 h le vendredi et le samedi, jusqu'à 0 h 30 les autres soirs.",
      },
      {
        titre: 'Prolonger la soirée',
        texte:
          "Soirée DJ, billard, ping-pong ou échecs dans les salons du château : notre équipe adapte la fin de soirée à l'énergie du groupe. De mai à octobre, la serre du parc accueille aussi des cocktails jusqu'à 200 personnes.",
      },
    ],
    blocsSection: [0],
    sections: [
      {
        ancre: "apres-diner",
        etiquette: "Après le dîner",
        titre: "Après le dîner : bar à cocktails, billard et soirée DJ au château",
        intro:
          "Une fois le dîner terminé, la soirée de votre séminaire continue sur le domaine, au bar ou dans les salons du château.",
        reprend: [1, 2],
        blocs: [
        ],
        faits: [
          { label: "Bar, du dimanche au jeudi", valeur: "jusqu'à 0 h 30" },
          { label: "Salons du château", valeur: "billard, ping-pong, échecs" },
          { label: "Cocktails du bar", valeur: "sirops et hydrolats maison" },
        ],
        reprendPhotos: [0, 1, 2],
        photos: [
          { src: stock('bar-cocktails-comptoir'), legende: "Le bar à cocktails et son comptoir" },
          { src: stock('salon-bar-fauteuils-velours'), legende: "Le salon du bar : fauteuils de velours et sol en damier" },
        ],
        conseil:
          "Après le dîner de votre séminaire, vos participants se retrouvent au bar ou autour du billard ; la soirée DJ, elle, s'organise avec notre équipe.",
      },
      {
        ancre: "soirees-a-theme",
        etiquette: "Soirées à thème",
        titre: "Soirées à thème au château : Gatsby, casino et bal masqué",
        intro:
          "Notre équipe organise aussi des soirées à thème au château : décor, animation et dress code sont réglés pour votre groupe. Voici les trois thèmes qui vont le mieux avec le lieu.",
        reprend: [],
        blocs: [
          { titre: "Gatsby et années folles", texte: "Orchestre de jazz, démonstration de charleston, tables de casino vintage et dress code noir et or : le thème est chez lui dans un château construit au début du XXe siècle. Un classique pour le gala de clôture d'une convention." },
          { titre: "Casino", texte: "Tables de black-jack, de roulette et de poker tenues par des croupiers professionnels, tapis rouge à l'entrée et animation DJ : vos participants jouent pour le plaisir, en smoking et robe longue. Un format qui convient aux soirées de fin d'année et aux remises de récompenses." },
          { titre: "Bal masqué vénitien", texte: "Masques distribués à l'arrivée, musique baroque jouée en direct et danses de salon guidées : les boiseries des salons du château servent de décor à une soirée hors du temps." },
        ],
        faits: [
          { label: "Soirée à thème conseillée", valeur: "Gatsby" },
          { label: "Autres thèmes de soirée", valeur: "casino, bal masqué" },
          { label: "Décor et animation de soirée", valeur: "sur mesure" },
        ],
        reprendPhotos: [],
        photos: [
          { src: "/images/services/soiree-entreprise-gatsby-annees-folles-chateau-jazz.webp", legende: "Soirée Gatsby (image d’illustration, autre lieu)" },
          { src: "/images/services/soiree-entreprise-casino-royale-chateau-tables-jeux.webp", legende: "Soirée Casino (image d’illustration, autre lieu)" },
          { src: "/images/services/soiree-entreprise-bal-masque-venitien-chateau-salon.webp", legende: "Bal masqué vénitien (image d’illustration, autre lieu)" },
        ],
        liens: [{ href: "/seminaires-soirees-entreprise", label: "Voir tous nos thèmes de soirée" }],
        conseil:
          "Pour le gala de clôture de votre convention, demandez-moi le thème Gatsby : il va bien avec ce château du début du XXe siècle.",
      },
    ],
    sources: [MICE, SITE, FACTSHEET],
  },

  activites: {
    seoTitle: 'Team building en forêt de Chantilly, au château',
    titreSection: "Activités de team building au château et en forêt de Chantilly",
    conseil:
      "Pour souder vos équipes pendant le séminaire, deux formats à regarder : le rallye en 2CV dans les environs, ou le dragon boat. Nous adaptons l'activité à la taille de votre groupe.",
    seoDescription:
      "Challenges nature, ateliers créatifs, VTT, dragon boat, rallye 2CV, atelier crème Chantilly, yoga, équitation : activités de cohésion sur place et autour.",
    resume:
      "Challenges nature dans le parc, VTT, dragon boat, rallye 2CV, atelier crème Chantilly, yoga : des formats de cohésion sur place et alentour.",
    intro:
      "Le parc de 6 hectares et la forêt de Chantilly servent de terrain aux activités de team building et de cohésion. Certaines se pratiquent librement pendant les temps de pause ; d'autres sont organisées par notre équipe pour l'ensemble du groupe, à l'horaire prévu dans votre programme.",
    faits: [
      { label: 'Parc', valeur: '6 hectares', source: SITE },
      { label: 'Spa', valeur: 'ouvert de 7 h à 22 h', source: SITE },
      { label: 'Serre pour les ateliers', valeur: '300 m²', source: MICE },
    ],
    photos: [
      { src: stock('velos-facade-lierre'), legende: "Des vélos à disposition devant la façade du château" },
      { src: stock('court-de-tennis'), legende: "Le court de tennis du domaine" },
      { src: img('jardin-amphitheatre-exterieur'), legende: "L'amphithéâtre de verdure, cadre des ateliers en plein air" },
      { src: img('salle-atelier-creatif'), legende: 'Atelier créatif en sous-groupe' },
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
          "VTT en forêt, dragon boat, rallye en 2CV dans les environs, atelier autour de la crème Chantilly, soirée DJ : notre équipe organise l'activité et l'adapte à la taille du groupe. Pour une sortie de groupe, la région se prête aussi aux balades à cheval et aux visites du domaine de Chantilly en calèche.",
      },
      {
        titre: 'Le spa et le bien-être',
        texte:
          "Entre deux sessions, vos participants profitent du spa, ouvert gratuitement aux résidents tous les jours de 7 h à 22 h : piscine intérieure chauffée, sauna, hammam, tisanerie, salle de fitness et de yoga. Cabines de soins et cabine de massage en duo sont disponibles sur réservation. Un réveil au yoga ou un créneau de massage donne un autre rythme à un séminaire de plusieurs jours.",
      },
    ],
    blocsSection: [0, 1],
    sections: [
      {
        ancre: "temps-libre",
        etiquette: "Spa et temps libre",
        titre: "Spa et temps libre au château : vos participants soufflent entre deux sessions",
        intro:
          "Entre deux sessions de travail, vos participants disposent du spa du château et des équipements du parc.",
        reprend: [2],
        blocs: [
          { titre: "Le parc en accès libre", texte: "Dans le parc, un court de tennis, des vélos, la pétanque et le mölkky attendent vos participants pendant leurs temps de pause." },
        ],
        faits: [
          { label: "Spa", valeur: "gratuit pour les résidents" },
          { label: "Soins et massages", valeur: "sur réservation" },
          { label: "Jeux d'extérieur", valeur: "pétanque, mölkky" },
        ],
        reprendPhotos: [],
        photos: [
          { src: stock('piscine-interieure-spa'), legende: "La piscine intérieure du spa et ses transats" },
          { src: stock('cabine-massage-spa'), legende: "Une cabine de soins du spa" },
          { src: stock('cabine-massage-duo-spa'), legende: "La cabine de massage en duo du spa" },
          { src: stock('salle-fitness-spa'), legende: "La salle de fitness du spa" },
        ],
        conseil:
          "Pour un séminaire de plusieurs jours, laissez à vos participants un créneau libre en fin de journée : le spa reste ouvert jusqu'à 22 h.",
      },
    ],
    sources: [SITE, MICE],
  },

  acces: {
    seoTitle: 'Accès au château : A1, TER Paris-Nord et Roissy à 25 min',
    titreSection: "Accès au séminaire : A1, gare de Chantilly et Roissy",
    conseil:
      "Pour vos participants qui viennent en voiture, indiquez dans votre convocation la sortie 7 de l'A1 et le parking gratuit sur place.",
    seoDescription:
      "À moins de 35 km de Paris par l'A1, gare de Chantilly à 5 min (TER direct depuis Paris-Nord en 25 min environ), Roissy-CDG à 25 min. Parking gratuit.",
    resume:
      "À moins de 35 km de Paris par l'A1, à 5 minutes de la gare de Chantilly et 25 minutes de Roissy-CDG. Parking gratuit sur place.",
    intro:
      "Pour un séminaire résidentiel proche de Paris, le domaine se trouve en lisière de la forêt de Chantilly, dans l'Oise, à moins de 35 km de la capitale. Vos participants viennent en voiture par l'A1, en train depuis la gare du Nord, ou en avion par Roissy-Charles-de-Gaulle.",
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
          "Depuis Paris, prenez l'A1 vers le nord et sortez à Survilliers-Chantilly (sortie 7), puis suivez Chantilly par la N17 et la D924a ; le château est ensuite fléché. Depuis Bruxelles, sortez de l'A1 à Senlis (sortie 8). L'itinéraire détaillé est joint à votre confirmation, pour le transmettre à vos participants. Le parking est gratuit sur place pour tout le groupe.",
      },
      {
        titre: 'En train ou en RER',
        texte:
          "Des TER directs relient Paris-Gare du Nord à la gare de Chantilly en 25 minutes environ ; la gare est ensuite à 5 minutes en voiture du domaine. Par le RER D, la gare d'Orry-la-Ville est à 15 minutes en voiture. Notre équipe peut organiser un transfert pour l'ensemble de vos participants.",
      },
      {
        titre: 'En avion',
        texte:
          "L'aéroport Roissy-Charles-de-Gaulle est à 25 minutes de route : un atout pour les séminaires internationaux et les participants venus de province. Un transfert de groupe depuis l'aéroport peut être organisé sur demande.",
      },
      {
        titre: 'Accessibilité',
        texte: "Le domaine est accessible aux participants à mobilité réduite.",
      },
    ],
    blocsSection: [0, 3],
    sections: [
      {
        ancre: "sans-voiture",
        etiquette: "Train, avion et transferts",
        titre: "Venir en séminaire sans voiture : TER direct depuis Paris, Roissy à 25 min",
        intro:
          "Tous vos participants ne viennent pas en voiture : le domaine se rejoint aussi en train depuis Paris et en avion par Roissy, avec un transfert de groupe possible.",
        reprend: [1, 2],
        blocs: [
        ],
        faits: [
          { label: "Train direct", valeur: "Paris-Gare du Nord - Chantilly" },
          { label: "Gare d'Orry-la-Ville (RER D)", valeur: "15 min en voiture" },
          { label: "Transfert de groupe", valeur: "depuis l'aéroport, sur demande" },
        ],
        reprendPhotos: [],
        photos: [
          { src: stock('facade-lierre-colombages'), legende: "La façade du château, couverte de verdure" },
          { src: stock('velos-facade-lierre'), legende: "Des vélos à disposition devant la façade du château" },
        ],
        conseil:
          "Pour vos participants qui viennent en train, indiquez-leur le TER direct depuis Paris-Gare du Nord : la gare de Chantilly est à 5 minutes en voiture du domaine.",
      },
    ],
    sources: [SITE, FACTSHEET, TRAIN, FICHE],
  },
};

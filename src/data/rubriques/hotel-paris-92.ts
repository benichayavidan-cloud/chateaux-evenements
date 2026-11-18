/**
 * #92-REFUGE — rubriques du domaine (16/11/2026).
 *
 * Sources lues le 16/11/2026 (jamais affichées : elles portent le vrai nom) :
 *  - REUNIONS : page « réunions » du site officiel de l'hôtel
 *               https://mgallery.accor.com/fr/hotels/B599/meetings.html
 *               (9 espaces, surfaces, hauteurs, capacités par disposition ;
 *               la colonne « salle de conférence » = table de réunion, notée en `note`)
 *  - OFFICIEL : page d'accueil du site officiel (accès, parking, FAQ chambres, spa, bar)
 *               https://mgallery.accor.com/fr/hotels/B599.html
 *  - RESTO    : page restaurants & bars du site officiel
 *               https://mgallery.accor.com/fr/hotels/B599/restaurants.html
 *  - HISTOIRE : page « notre histoire » du site officiel (engagements, ruches, vélos)
 *               https://mgallery.accor.com/fr/hotels/B599/story.html
 *  - RESA     : fiche de réservation officielle (catégories et surfaces des chambres,
 *               distances) https://all.accor.com/hotel/B599/index.fr.shtml
 *  - CVENT    : fiche Cvent du lieu (83 chambres, label Clef Verte valable jusqu'au 31/12/2026)
 *               https://www.cvent.com/venues/fr-FR/paris/hotel/domaine-reine-margot-paris-issy-mgallery-collection/venue-893572e9-611c-49ae-9464-3d3e053492c1
 *  - PRESSE   : article d'ouverture (octobre 2023), Voyages d'Affaires
 *               https://www.voyages-d-affaires.com/mgallery-reine-margot-luxe-confidentiel-20231016.html
 *  - FICHE    : fiche Select Châteaux existante (src/data/chateaux.ts, id 2)
 *
 * Écarts entre sources : le spa fait 300 m² selon le site officiel (la fiche disait
 * 360 m²) ; CDG est à 50 min selon le site officiel (la fiche disait 36 min) ; Cvent
 * liste d'autres salles que le site officiel. On suit le site officiel.
 * Non trouvé dans une source : RER, cabines de soins, capacité intérieure du restaurant.
 *
 * Noms de salles, restaurant, bar et spa : les noms réels trahiraient le lieu (blind
 * booking strict, 15/11) — chaque espace porte un nom descriptif ; surfaces et
 * capacités sont celles de la source.
 */
import type { RubriquesDomaine } from '../../types/rubriques.ts';
import { chateauImage } from '../../lib/media.ts';

const REUNIONS = 'Page réunions du site officiel du lieu, consultée le 16/11/2026';
const OFFICIEL = "Page d'accueil du site officiel du lieu, consultée le 16/11/2026";
const RESTO = 'Page restaurants et bars du site officiel du lieu, consultée le 16/11/2026';
const HISTOIRE = 'Page histoire et engagements du site officiel du lieu, consultée le 16/11/2026';
const RESA = 'Fiche de réservation officielle du lieu, consultée le 16/11/2026';
const CVENT = 'Fiche Cvent du lieu, consultée le 16/11/2026';
const PRESSE = "Article de presse professionnelle à l'ouverture (octobre 2023), consulté le 16/11/2026";
const FICHE = 'Fiche Select Châteaux (data/chateaux.ts), 16/11/2026';

const URL_REUNIONS = 'https://mgallery.accor.com/fr/hotels/B599/meetings.html';
const URL_OFFICIEL = 'https://mgallery.accor.com/fr/hotels/B599.html';
const URL_RESTO = 'https://mgallery.accor.com/fr/hotels/B599/restaurants.html';
const URL_HISTOIRE = 'https://mgallery.accor.com/fr/hotels/B599/story.html';
const URL_BIEN_ETRE = 'https://mgallery.accor.com/fr/hotels/B599/wellness.html';
const URL_RESA = 'https://all.accor.com/hotel/B599/index.fr.shtml';
const URL_CVENT =
  'https://www.cvent.com/venues/fr-FR/paris/hotel/domaine-reine-margot-paris-issy-mgallery-collection/venue-893572e9-611c-49ae-9464-3d3e053492c1';
const URL_PRESSE = 'https://www.voyages-d-affaires.com/mgallery-reine-margot-luxe-confidentiel-20231016.html';

const img = (nom: string) => `/images/seminaire-hotel-historique-paris-92-${nom}.webp`;
const stockage = (fichier: string) => chateauImage('Hotel Paris 92', `seminaire-hotel-historique-paris-92-${fichier}.webp`);

export const rubriquesHotelParis92: RubriquesDomaine = {
  salles: {
    seoTitle: 'Salles de réunion 5 étoiles à Issy-les-Moulineaux',
    titreSection: "Salles de réunion aux portes de Paris : jusqu'à 70 participants",
    conseil:
      "À la belle saison, sortez la réunion dehors avec vos participants : la grande terrasse de 100 m² et le jardin prolongent vos salons, avec la tour Eiffel en toile de fond.",
    seoDescription:
      "9 espaces de réunion dans un bâtiment classé aux portes de Paris : salons de 22 à 50 m², chapelle, terrasses et jardin. Capacités salle par salle.",
    resume:
      "9 espaces, du salon de 22 m² pour un comité restreint à la terrasse de 100 m² face à la tour Eiffel. Toutes les capacités, salle par salle.",
    intro:
      "Nos salles de réunion occupent le bâtiment classé du domaine : hauts plafonds, murs d'époque et lumière naturelle, avec vue sur le jardin historique et la tour Eiffel. Nous proposons 9 espaces, cinq salons intérieurs de 22 à 50 m² et quatre espaces extérieurs, pour des réunions jusqu'à 70 participants.",
    faits: [
      { label: 'Espaces de réunion', valeur: '9', source: REUNIONS },
      { label: 'Participants en réunion', valeur: "jusqu'à 70", source: REUNIONS },
      { label: 'Plus grand salon intérieur', valeur: '50 m²', source: REUNIONS },
      { label: 'Hauteur sous plafond de la chapelle', valeur: '7 m', source: REUNIONS },
    ],
    salles: [
      { nom: 'Le Salon modulable', surfaceM2: 50, theatre: 32, classe: 15, enU: 17, banquet: null, cocktail: null, cabaret: null, note: '40 personnes autour d’une table de conférence' },
      { nom: 'La Chapelle', surfaceM2: 50, theatre: null, classe: null, enU: null, banquet: 14, cocktail: null, cabaret: null, note: '7 m sous plafond ; 14 personnes autour d’une table' },
      { nom: 'Le Salon sous haut plafond', surfaceM2: 41, theatre: 35, classe: 8, enU: null, banquet: null, cocktail: null, cabaret: null, note: '5 m sous plafond ; 35 personnes autour d’une table de conférence' },
      { nom: 'Le Salon du jardin', surfaceM2: 27, theatre: 25, classe: 4, enU: null, banquet: null, cocktail: null, cabaret: null, note: '12 personnes autour d’une table' },
      { nom: 'Le Salon privé', surfaceM2: 22, theatre: 8, classe: 4, enU: null, banquet: null, cocktail: null, cabaret: null, note: '8 personnes autour d’une table' },
      { nom: 'La Grande Terrasse', surfaceM2: 100, theatre: null, classe: null, enU: null, banquet: 70, cocktail: null, cabaret: null, note: 'en plein air, jusqu’à 100 personnes en réunion', reunion: 100 },
      { nom: 'La Terrasse haute', surfaceM2: 35, theatre: null, classe: null, enU: null, banquet: 30, cocktail: null, cabaret: null, note: 'en plein air' },
      { nom: 'La Terrasse vue tour Eiffel', surfaceM2: 20, theatre: null, classe: null, enU: null, banquet: 20, cocktail: null, cabaret: null, note: 'en plein air' },
      { nom: 'Le Jardin', surfaceM2: 9500, theatre: null, classe: null, enU: null, banquet: 300, cocktail: null, cabaret: null, note: 'en plein air' },
    ],
    photos: [
      { src: stockage('salle-reunion-board-bleue'), legende: 'Une salle de réunion en configuration table de conseil' },
      { src: img('chapelle-lounge-interieur'), legende: 'La chapelle, 50 m² sous 7 m de plafond' },
      { src: img('serre-verriere-diner'), legende: 'La serre vitrée du jardin, pour une réunion en petit comité' },
      { src: img('espace-pause-cafe-accueil'), legende: "L'espace de pause, à côté des salons" },
      { src: img('facade-jardin-terrasse'), legende: 'La grande terrasse, 100 m² au pied du bâtiment classé' },
      { src: img('cour-interieure-passerelle'), legende: 'La cour intérieure, entre le bâtiment historique et l’aile contemporaine' },
    ],
    blocs: [
      {
        titre: 'Des salons pour les comités et les ateliers',
        texte:
          "Pour vos ateliers, le salon modulable (50 m²) reçoit 32 personnes en théâtre, 17 en U ou 40 autour d'une table de conférence. Le salon sous haut plafond (41 m², 5 m de hauteur) accueille 35 personnes en théâtre. Pour les sous-groupes et les comités de direction, deux salons de 27 et 22 m² réunissent 12 et 8 personnes autour d'une table.",
      },
      {
        titre: 'Une réunion dans une chapelle',
        texte:
          "Pour une réunion à part, notre ancienne chapelle désacralisée offre 50 m² sous 7 mètres de plafond, entre statues et vitraux. On y tient une réunion stratégique ou un déjeuner de 14 personnes autour d'une même table, dans un cadre que vos invités n'oublieront pas.",
      },
      {
        titre: 'Les terrasses et le jardin',
        texte:
          "À la belle saison, la réunion se poursuit dehors : la grande terrasse de 100 m² reçoit 70 convives à table, deux terrasses plus intimes 30 et 20 personnes, et le jardin accueille jusqu'à 300 invités. La tour Eiffel reste en toile de fond.",
      },
      {
        titre: 'Ce qui est compris',
        texte:
          "Nos salles de réunion sont équipées d'un matériel audiovisuel récent et baignées de lumière naturelle. Notre équipe dédiée à l'événementiel vous aide à choisir l'espace, prépare la disposition et organise les pauses de votre groupe.",
      },
    ],
    blocsSection: [2, 3],
    sections: [
      {
        ancre: 'salle-signature',
        etiquette: "La chapelle",
        titre: "Une réunion de direction dans une chapelle, aux portes de Paris",
        intro:
          "Notre ancienne chapelle désacralisée offre 50 m² sous 7 mètres de plafond, entre statues et vitraux. On y tient une réunion stratégique ou un déjeuner de 14 participants autour d'une même table.",
        blocs: [
          { titre: "Le soir, un dîner privé", texte: "Pour un comité de direction ou des clients privilégiés, nous dressons un dîner privé dans la chapelle, à partir de 8 convives. Une dégustation de quatre rhums peut clôturer la soirée." },
          { titre: "Une masterclass pour souder le groupe", texte: "La chapelle abrite aussi notre bar à rhum : une masterclass ou une dégustation privée réunit vos équipes autour d'un même récit, en fin de journée de séminaire." },
        ],
        faits: [
          { label: "Surface", valeur: "50 m²" },
          { label: "Hauteur sous plafond", valeur: "7 m" },
          { label: "Autour d'une table", valeur: "14 personnes" },
        ],
        photos: [
          { src: img('chapelle-lounge-interieur'), legende: "La chapelle, 50 m² sous 7 m de plafond" },
          { src: img('chapelle-exterieur-coucher-soleil'), legende: "La chapelle au coucher du soleil" },
        ],
        conseil:
          "Pour un séminaire de comité de direction, pensez à la chapelle sur toute la journée : la réunion stratégique le matin, puis le déjeuner à 14 à la même table.",
      },
      {
        ancre: 'ateliers',
        etiquette: 'Ateliers et sous-commissions',
        titre: "Des salons pour vos comités et vos ateliers, côté jardin",
        intro:
          "Pour vos comités et vos ateliers, nous proposons cinq salons intérieurs de 22 à 50 m², dans le bâtiment classé du domaine, avec vue sur le jardin historique.",
        reprend: [0],
        blocs: [
          { titre: "Les pauses de votre journée", texte: "Pendant la journée de séminaire, nous servons des pauses gourmandes préparées avec des ingrédients de saison, à côté des salons." },
        ],
        faits: [
          { label: "Salons intérieurs", valeur: "5, de 22 à 50 m²" },
          { label: "Salon modulable", valeur: "32 places en théâtre" },
          { label: "Comité de direction", valeur: "de 8 à 12 personnes autour d'une table" },
        ],
        reprendPhotos: [0, 3],
        photos: [],
        conseil:
          "Pour un atelier en sous-groupes pendant votre séminaire, les deux petits salons de 27 et 22 m² réunissent 12 et 8 participants autour d'une table.",
      },
    ],
    sources: [URL_REUNIONS, URL_PRESSE, FICHE],
  },

  chambres: {
    seoTitle: 'Séminaire résidentiel aux portes de Paris : 83 chambres',
    titreSection: "Hébergement de séminaire à Paris : 83 chambres et suites",
    conseil:
      "Pour loger chaque participant de votre séminaire selon son rôle, envoyez-moi votre liste : je vous propose une répartition par catégorie, de la chambre classique à la suite.",
    seoDescription:
      "83 chambres et suites de 24 à 50 m², dont des chambres et suites avec vue sur la tour Eiffel. Pour un séminaire résidentiel à deux pas du métro.",
    resume:
      "83 chambres et suites de 24 à 50 m², certaines avec vue sur la tour Eiffel, et 30 chambres communicantes.",
    intro:
      "Pour un séminaire résidentiel, nos 83 chambres et suites logent tout votre groupe sur place, dans une atmosphère de boutique-hôtel. Vos participants se répartissent entre le bâtiment historique et une aile contemporaine. Bois naturels, tons minéraux et portraits historiques : la décoration, signée par un grand architecte français, mêle le passé du lieu au confort d'un hôtel 5 étoiles.",
    faits: [
      { label: 'Chambres et suites', valeur: '83', source: CVENT },
      { label: 'Surface des chambres', valeur: 'de 24 à 50 m²', source: RESA },
      { label: 'Chambres communicantes', valeur: '30', source: OFFICIEL },
    ],
    photos: [
      { src: img('chambre-doree'), legende: 'Une chambre aux tons dorés, ouverte sur la verdure' },
      { src: img('chambre-prestige-bleue'), legende: 'Une chambre aux tons bleu nuit' },
      { src: img('chambre-vue-panoramique'), legende: 'Une chambre avec balcon et vue sur Paris' },
      { src: stockage('chambre-luxe-terrasse-vue-paris'), legende: 'Une chambre avec terrasse sur les toits de Paris' },
      { src: img('suite-salon-vue-jardin'), legende: 'Le salon d’une suite, vue sur le jardin' },
      { src: img('salle-de-bain-design'), legende: 'Une salle de bains' },
    ],
    blocs: [
      {
        titre: 'Des chambres pour chaque participant',
        texte:
          "Chambres classiques de 24 m² et supérieures de 28 m² pour les grands groupes, chambres deluxe de 28 m² avec vue sur la tour Eiffel, suites junior de 35 m² et suites de 50 m² pour l'encadrement et vos invités. Nous disposons aussi de 30 chambres communicantes, pour loger vos équipes côte à côte.",
      },
      {
        titre: 'La tour Eiffel depuis la chambre',
        texte:
          "Les chambres deluxe, dont certaines avec balcon, la suite junior vue tour Eiffel et notre plus grande suite, avec sa terrasse privée, regardent Paris et la tour Eiffel. Une attention appréciée pour un comité de direction ou des clients invités.",
      },
      {
        titre: "De la chambre classique à la suite de 50 m²",
        texte:
          "Chambres classiques de 24 m², supérieures et deluxe de 28 m², suites junior de 35 m² et suites de 50 m² : vous logez chaque participant de votre séminaire selon son rôle.",
      },
    ],
    blocsSection: [2],
    sections: [
      {
        ancre: "grand-groupe",
        etiquette: "Grands groupes",
        titre: "30 chambres communicantes pour loger vos équipes côte à côte",
        intro:
          "Pour un séminaire résidentiel aux portes de Paris, tout votre groupe loge sur place, et les équipes qui travaillent ensemble dorment côte à côte.",
        reprend: [],
        blocs: [
          { titre: "Des équipes logées côte à côte", texte: "Nos 30 chambres communicantes permettent de loger vos équipes côte à côte : pratique pour un grand groupe ou un séminaire qui réunit plusieurs équipes." },
          { titre: "Chambres classiques et supérieures", texte: "Les chambres classiques et supérieures conviennent aux grands groupes : réservez-les pour le gros des participants de votre séminaire." },
        ],
        faits: [
          { label: "Chambres communicantes", valeur: "30" },
          { label: "Chambres et suites", valeur: "83" },
          { label: "Chambres pour grands groupes", valeur: "classiques et supérieures" },
        ],
        reprendPhotos: [0, 1],
        photos: [
        ],
        conseil:
          "Pour un séminaire à plusieurs équipes, dites-moi qui travaille avec qui : je regroupe vos participants dans les chambres communicantes.",
      },
      {
        ancre: "direction-invites",
        etiquette: "Direction et invités",
        titre: "Suites et chambres vue tour Eiffel pour votre comité de direction",
        intro:
          "Pour votre comité de direction, vos intervenants et vos clients invités, réservez les chambres et les suites qui regardent Paris.",
        reprend: [],
        blocs: [
          { titre: "Une terrasse privée pour votre invité d'honneur", texte: "Notre plus grande suite dispose d'une terrasse privée, face à Paris et à la tour Eiffel : réservez-la au dirigeant ou à l'invité qui ouvre votre séminaire." },
          { titre: "Des suites pour l'encadrement", texte: "Les suites junior et les suites reviennent à l'encadrement et aux invités de votre séminaire. La suite junior vue tour Eiffel regarde Paris." },
        ],
        faits: [
          { label: "Suite junior", valeur: "35 m²" },
          { label: "Suite", valeur: "50 m²" },
          { label: "Chambre deluxe", valeur: "28 m², vue tour Eiffel" },
        ],
        reprendPhotos: [2, 3],
        photos: [
        ],
        conseil:
          "Pour les clients que vous invitez à votre séminaire, demandez-moi les chambres deluxe : elles regardent la tour Eiffel, et certaines ont un balcon.",
      },
      {
        ancre: "sejour",
        etiquette: "Le séjour de vos participants",
        titre: "Métro, voiturier, petit-déjeuner : le séjour de vos participants à Paris",
        intro:
          "Pendant votre séminaire résidentiel, vos participants arrivent sans navette ni transfert, et le domaine s'occupe du reste.",
        reprend: [],
        blocs: [
          { titre: "Arriver sans navette", texte: "Vos participants arrivent en métro, à 5 minutes à pied du domaine. Pour ceux qui viennent en voiture, notre parking propose un service de voiturier et des bornes de recharge pour véhicules électriques." },
          { titre: "Le petit-déjeuner avant la première session", texte: "Le petit-déjeuner est servi en libre-service, sucré et salé, continental ou américain, avec brioches maison et miel du jardin." },
        ],
        faits: [
          { label: "Métro", valeur: "à 5 min à pied" },
          { label: "Parking", valeur: "voiturier et bornes de recharge" },
          { label: "Petit-déjeuner", valeur: "en libre-service" },
        ],
        reprendPhotos: [5],
        photos: [
          { src: "/images/seminaire-hotel-historique-paris-92-cour-interieure-passerelle.webp", legende: "La cour intérieure, à l'arrivée" },
        ],
        conseil:
          "Pour les participants de votre séminaire, indiquez le métro dans votre convocation : la station est à 5 minutes à pied du domaine.",
      },
    ],
    sources: [URL_RESA, URL_OFFICIEL, URL_BIEN_ETRE, URL_CVENT, URL_PRESSE, FICHE],
  },

  exterieurs: {
    seoTitle: 'Jardin historique avec vue tour Eiffel pour séminaire',
    titreSection: "Un jardin de 9 500 m² face à la tour Eiffel pour votre séminaire",
    conseil:
      "Pour le cocktail de votre séminaire, pensez au jardin : il accueille jusqu'à 300 invités, avec la tour Eiffel à l'horizon.",
    seoDescription:
      "Un jardin de 9 500 m² avec vue sur la tour Eiffel, un potager, trois terrasses et une chapelle : vos pauses et cocktails en plein air, aux portes de Paris.",
    resume:
      "Un jardin de 9 500 m² face à la tour Eiffel, son potager, ses terrasses et sa chapelle, à quelques minutes du métro.",
    intro:
      "Derrière le bâtiment classé s'étend notre jardin, avec la tour Eiffel à l'horizon. Potager, verger, terrasses et chapelle composent le décor de vos pauses, de vos déjeuners et de vos cocktails en plein air. On oublie la ville, alors que Paris est à quelques stations de métro.",
    faits: [
      { label: 'Surface du jardin', valeur: '9 500 m²', source: REUNIONS },
      { label: 'Invités dans le jardin', valeur: "jusqu'à 300", source: REUNIONS },
      { label: 'Terrasses', valeur: '3 (100, 35 et 20 m²)', source: REUNIONS },
      { label: 'Légumes, fruits et aromatiques', valeur: '80 variétés', source: PRESSE },
    ],
    photos: [
      { src: stockage('vue-aerienne-facade-jardin'), legende: 'Le bâtiment classé et son jardin vus du ciel' },
      { src: img('jardin-paysager'), legende: 'Le jardin et sa serre vitrée' },
      { src: img('terrasse-jardin-potager'), legende: 'Un coin de terrasse au-dessus du potager' },
      { src: img('chapelle-exterieur-coucher-soleil'), legende: 'La chapelle au coucher du soleil' },
      { src: img('facade-jardin-terrasse'), legende: 'La grande terrasse au pied de la façade' },
      { src: img('cour-interieure-passerelle'), legende: 'La cour intérieure' },
      { src: img('facade-illuminee-soiree'), legende: 'Cocktail au jardin, façade illuminée' },
    ],
    blocs: [
      {
        titre: 'Un jardin face à la tour Eiffel',
        texte:
          "Le jardin et ses terrasses offrent une vue dégagée sur la capitale et la tour Eiffel. Il accueille jusqu'à 300 invités pour un cocktail ou un dîner : un décor rare aux portes de Paris.",
      },
      {
        titre: 'Le potager et les ruches',
        texte:
          "Le jardin compte quelque 80 variétés de légumes, de fruits et de plantes aromatiques, ainsi que des ruches. Herbes, fruits et miel se retrouvent dans les assiettes, les cocktails et au petit-déjeuner.",
      },
      {
        titre: 'Trois terrasses pour chaque moment',
        texte:
          "La grande terrasse de 100 m² prolonge le restaurant et reçoit 70 convives à table. Deux terrasses plus intimes, de 35 et 20 m², accueillent un déjeuner de comité ou une pause à l'écart du groupe.",
      },
    ],
    blocsSection: [0],
    sections: [
      {
        ancre: "plein-air",
        etiquette: "Travailler et recevoir dehors",
        titre: "Réunion et déjeuner de séminaire au jardin : trois terrasses et une serre",
        intro:
          "Aux beaux jours, une partie de votre séminaire se tient dehors : un déjeuner sur la grande terrasse, un comité sur une terrasse à l'écart, une réunion dans la serre du jardin.",
        reprend: [2],
        blocs: [
          { titre: "Une réunion dans la serre du jardin", texte: "La serre vitrée du jardin accueille une réunion en petit comité : une autre façon de réunir votre comité de direction pendant le séminaire." },
        ],
        faits: [
          { label: "Grande terrasse", valeur: "100 m², 70 convives" },
          { label: "Terrasses intimes", valeur: "35 et 20 m²" },
          { label: "Serre du jardin", valeur: "réunion en petit comité" },
        ],
        reprendPhotos: [4, 1],
        photos: [
        ],
        conseil:
          "Pour une réunion de comité de direction pendant votre séminaire, demandez-moi la serre vitrée du jardin.",
      },
      {
        ancre: "detente",
        etiquette: "S'aérer entre deux sessions",
        titre: "Potager, ruches et vélos électriques : la pause au vert de vos participants",
        intro:
          "Entre deux sessions, le jardin sert de décor aux pauses de vos participants, et le domaine met des vélos électriques à leur disposition.",
        reprend: [1],
        blocs: [
          { titre: "Des vélos électriques pour une sortie", texte: "Le domaine met des vélos électriques à la disposition de vos participants, pour une sortie entre deux sessions de votre séminaire." },
        ],
        faits: [
          { label: "Jardin", valeur: "potager, verger et ruches" },
          { label: "Ruches du jardin", valeur: "le miel du petit-déjeuner" },
          { label: "Vélos électriques", valeur: "à disposition" },
        ],
        reprendPhotos: [2, 0],
        photos: [
        ],
        conseil:
          "Aux beaux jours, demandez-moi d'installer la pause de vos participants au jardin plutôt qu'en salle.",
      },
    ],
    sources: [URL_REUNIONS, URL_OFFICIEL, URL_HISTOIRE, URL_PRESSE],
  },

  restauration: {
    seoTitle: 'Restaurant bistronomique et terrasse jardin, séminaire 92',
    titreSection: "Restauration de séminaire à Paris : la cuisine du potager",
    conseil:
      "À savoir pour vos participants : la carte ne propose pas de viande rouge, et elle s'adapte facilement aux régimes et aux allergies. Le miel du petit-déjeuner vient du jardin.",
    seoDescription:
      "Cuisine gourmande et végétale nourrie du potager, terrasse de 100 m² pour 70 convives, pauses gourmandes, bar lounge : la restauration de vos séminaires.",
    resume:
      "Un restaurant bistronomique gourmand et végétal, une terrasse de 70 couverts face au jardin et un bar lounge aux herbes du potager.",
    intro:
      "Pour vos séminaires, notre restaurant bistronomique sert une cuisine à la fois gourmande et végétale, nourrie de produits de saison et locaux, parfois cueillis le matin même au jardin. Petit-déjeuner, pauses, déjeuner d'affaires ou banquet : notre équipe compose les menus selon votre programme.",
    faits: [
      { label: 'Banquet en terrasse', valeur: '70 couverts', source: REUNIONS },
      { label: 'Banquet dans le jardin', valeur: '300 invités', source: REUNIONS },
      { label: 'Viande rouge', valeur: 'aucune à la carte', source: HISTOIRE },
      { label: 'Label environnemental', valeur: 'Clef Verte', source: CVENT },
    ],
    photos: [
      { src: img('restaurant-verriere'), legende: 'Le restaurant sous sa verrière' },
      { src: stockage('restaurant-verriere-tables-dressees'), legende: 'Tables dressées sous la verrière' },
      { src: img('cuisine-gastronomique-dressage'), legende: 'Le dressage en cuisine' },
      { src: img('serre-verriere-diner'), legende: 'Une table dressée dans la serre du jardin' },
      { src: img('espace-pause-cafe-accueil'), legende: 'La pause café' },
      { src: img('facade-jardin-terrasse'), legende: 'La terrasse du restaurant, côté jardin' },
    ],
    blocs: [
      {
        titre: 'Une cuisine du potager',
        texte:
          "Pour les repas de votre groupe, la carte privilégie les recettes à base de plantes et les produits de saison, sans viande rouge. Poissons, viandes et pain viennent de producteurs d'Île-de-France ; fruits, herbes et miel du jardin. Cette cuisine s'adapte facilement aux régimes et aux allergies de vos participants.",
      },
      {
        titre: 'Restaurant et terrasse privatisables',
        texte:
          "Le restaurant et sa terrasse se privatisent pour un événement d'entreprise. La terrasse de 100 m² reçoit 70 convives à table ; pour un grand banquet d'été, le jardin accueille jusqu'à 300 invités.",
      },
      {
        titre: 'Petit-déjeuner et pauses',
        texte:
          "Le petit-déjeuner est servi en libre-service, sucré et salé, continental ou américain, avec brioches maison et miel du jardin. Pendant la journée, nous servons des pauses gourmandes et des menus de banquet préparés avec des ingrédients de saison.",
      },
      {
        titre: 'Le bar lounge',
        texte:
          "Notre bar lounge prépare des infusions et des cocktails signature aux fruits et aux herbes du jardin. Sa terrasse, ouverte sur le jardin, prolonge la fin de journée aux beaux jours.",
      },
    ],
    blocsSection: [0],
    sections: [
      {
        ancre: "banquets",
        etiquette: "Banquets et dîners de groupe",
        titre: "Banquet de séminaire aux portes de Paris : 70 convives en terrasse",
        intro:
          "Pour le repas de groupe de votre séminaire, le restaurant et sa terrasse se réservent pour vous seuls. L'été, le jardin accueille les grands banquets.",
        reprend: [1],
        blocs: [
          { titre: "Un dîner privé dès 8 convives", texte: "Pour un comité de direction ou des clients privilégiés, nous dressons un dîner privé dans l'ancienne chapelle du domaine, à partir de 8 convives." },
        ],
        faits: [
          { label: "Terrasse du restaurant", valeur: "100 m²" },
          { label: "Dîner privé en chapelle", valeur: "dès 8 convives" },
          { label: "Banquet d'été au jardin", valeur: "jusqu'à 300 invités" },
        ],
        reprendPhotos: [1, 3, 5],
        photos: [
        ],
        conseil:
          "Pour un déjeuner de séminaire en exclusivité, demandez-moi la privatisation du restaurant et de sa terrasse.",
      },
      {
        ancre: "pauses",
        etiquette: "Pauses et petit-déjeuner",
        titre: "Petit-déjeuner, pauses et bar lounge : la journée de vos participants",
        intro:
          "Du petit-déjeuner à la fin de journée, vos participants restent sur le domaine : libre-service du matin, pauses gourmandes pendant le séminaire, puis bar lounge, avec sa terrasse ouverte sur le jardin.",
        reprend: [2, 3],
        blocs: [
        ],
        faits: [
          { label: "Petit-déjeuner", valeur: "continental ou américain" },
          { label: "Pauses gourmandes", valeur: "ingrédients de saison" },
          { label: "Bar lounge", valeur: "infusions et cocktails du jardin" },
        ],
        reprendPhotos: [4],
        photos: [
          { src: "/images/seminaire-hotel-historique-paris-92-terrasse-jardin-potager.webp", legende: "Un coin de terrasse au-dessus du potager" },
        ],
        conseil:
          "Pour une pause de séminaire qui change du café, demandez pour vos participants les infusions du bar lounge, aux herbes du jardin.",
      },
    ],
    sources: [URL_RESTO, URL_REUNIONS, URL_HISTOIRE, URL_CVENT],
  },

  soirees: {
    seoTitle: "Soirée d'entreprise : bar à rhum dans une chapelle (92)",
    titreSection: "Soirée d'entreprise à Paris : bar à rhum dans une chapelle",
    conseil:
      "Pour un comité de direction en séminaire, demandez-moi le dîner privé dans la chapelle, à partir de 8 convives. Une dégustation de quatre rhums peut clôturer la soirée.",
    seoDescription:
      "Bar à rhum caché dans une chapelle désacralisée, dîner privé en chapelle dès 8 convives, cocktail jusqu'à 300 invités au jardin face à la tour Eiffel.",
    resume:
      "Un bar à rhum dans une chapelle, des dîners privés sous ses voûtes et des cocktails au jardin face à la tour Eiffel.",
    intro:
      "Le soir, le domaine change de visage. Cocktail au jardin face à la tour Eiffel, dîner sur la terrasse, puis dégustation de vieux rhums dans notre ancienne chapelle : vos participants rejoignent ensuite leur chambre à pied.",
    faits: [
      { label: 'Cocktail ou dîner au jardin', valeur: "jusqu'à 300 invités", source: REUNIONS },
      { label: 'Dîner privé en chapelle', valeur: 'dès 8 convives', source: RESTO },
      { label: 'Places au bar de la chapelle', valeur: 'une quinzaine', source: PRESSE },
      { label: 'Références de rhum', valeur: '400', source: PRESSE },
    ],
    photos: [
      { src: img('facade-illuminee-soiree'), legende: 'Cocktail au jardin, façade illuminée' },
      { src: img('chapelle-lounge-interieur'), legende: 'Le bar à rhum, dans la chapelle' },
      { src: img('serre-verriere-diner'), legende: 'Un dîner dressé dans la serre' },
      { src: img('restaurant-verriere'), legende: 'Le restaurant sous la verrière, prêt pour le dîner' },
    ],
    blocs: [
      {
        titre: 'Un bar à rhum dans une chapelle',
        texte:
          "Notre bar speakeasy occupe une ancienne chapelle désacralisée et restaurée, au milieu des statues et des vitraux. Il propose des vieux rhums du monde entier, avec des masterclasses dès 18 h puis des dégustations commentées. Il se privatise pour vos événements et réceptions.",
      },
      {
        titre: 'Le dîner sous les voûtes',
        texte:
          "Pour un comité de direction ou des clients privilégiés, nous dressons un dîner privé dans la chapelle, à partir de 8 convives. Une dégustation de quatre rhums peut clôturer la soirée.",
      },
      {
        titre: 'Le cocktail au jardin',
        texte:
          "Aux beaux jours, le jardin reçoit votre groupe, jusqu'à 300 invités, pour un cocktail ou un dîner, et la grande terrasse 70 convives à table. La façade illuminée et la tour Eiffel au loin font le reste.",
      },
    ],
    blocsSection: [0, 1],
    sections: [
      {
        ancre: "cocktail-jardin",
        etiquette: "Cocktail au jardin",
        titre: "Cocktail de séminaire au jardin, face à la tour Eiffel",
        intro:
          "La soirée de votre séminaire peut commencer dehors : cocktail au jardin, puis dîner sur la terrasse.",
        reprend: [2],
        blocs: [
          { titre: "Un dîner dressé dans la serre", texte: "Pour un dîner en plus petit comité, une table se dresse dans la serre vitrée du jardin." },
        ],
        faits: [
          { label: "Dîner sur la grande terrasse", valeur: "70 convives" },
          { label: "Jardin", valeur: "vue sur la tour Eiffel" },
          { label: "Cocktail au jardin", valeur: "jusqu'à 300 invités" },
        ],
        reprendPhotos: [0, 2],
        photos: [
        ],
        conseil:
          "Pour le cocktail de clôture de votre convention, le jardin reçoit jusqu'à 300 invités ; pour passer à table ensuite, la grande terrasse accueille 70 convives.",
      },
      {
        ancre: "soirees-a-theme",
        etiquette: "Soirées à thème",
        titre: "Soirées à thème aux portes de Paris : Prohibition, Gatsby et guinguette",
        intro:
          "Notre équipe organise des soirées à thème sur le domaine, du décor à l'animation. Trois thèmes font écho au lieu.",
        reprend: [],
        blocs: [
          { titre: "Prohibition et bar clandestin", texte: "Entrée secrète avec mot de passe, barmans en costume d'époque, cocktails à l'ancienne et musique swing : le thème fait écho à notre bar à rhum, installé dans une ancienne chapelle." },
          { titre: "Gatsby et années folles", texte: "Décor Art déco, jazz joué en direct et cocktails d'époque : vos invités arrivent en noir, or et sequins, et la soirée de votre séminaire bascule dans les années folles." },
          { titre: "Guinguette au jardin", texte: "Aux beaux jours, le jardin accueille une guinguette : food trucks, photobooths, jeux en bois géants et piste de danse sous les guirlandes, avec la tour Eiffel à l'horizon." },
        ],
        faits: [
          { label: "Soirée à thème conseillée", valeur: "Prohibition" },
          { label: "Autres thèmes de soirée", valeur: "Gatsby, guinguette" },
          { label: "Décor et animation de soirée", valeur: "sur mesure" },
        ],
        reprendPhotos: [],
        photos: [
          { src: "/images/services/soiree-entreprise-prohibition-speakeasy-chateau-cave.webp", legende: "Soirée Prohibition (image d’illustration, autre lieu)" },
          { src: "/images/services/soiree-entreprise-gatsby-annees-folles-chateau-jazz.webp", legende: "Soirée Gatsby (image d’illustration, autre lieu)" },
          { src: "/images/services/soiree-entreprise-festival-guinguette-chateau-plein-air.webp", legende: "Soirée guinguette en plein air (image d’illustration, autre lieu)" },
        ],
        liens: [{ href: "/seminaires-soirees-entreprise", label: "Voir tous nos thèmes de soirée" }],
        conseil:
          "Pour une soirée de séminaire qui ne ressemble à aucune autre, demandez-moi le thème Prohibition : il fait écho au bar à rhum du domaine, installé dans une ancienne chapelle.",
      },
    ],
    sources: [URL_OFFICIEL, URL_RESTO, URL_REUNIONS, URL_PRESSE],
  },

  activites: {
    seoTitle: 'Team building aux portes de Paris : vin, rhum, yoga',
    titreSection: "Activités de team building à Paris : vin, rhum, yoga et spa",
    conseil:
      "Pour le team building de votre séminaire, demandez-moi un atelier de vin : notre équipe l'organise à l'horaire prévu dans votre programme et l'adapte à la taille de votre groupe.",
    seoDescription:
      "Ateliers de vin, masterclass de rhum, yoga, spa de 300 m² avec piscine et vélos électriques : nos activités de cohésion pour vos équipes.",
    resume:
      "Ateliers de vin, masterclass de rhum, yoga et spa : des activités de cohésion sans quitter le domaine.",
    intro:
      "Pour votre team building, notre équipe propose des expériences de cohésion conçues pour inspirer vos équipes entre deux sessions de travail. Tout se passe sur place : au jardin, dans la chapelle ou au spa.",
    faits: [
      { label: 'Spa', valeur: '300 m²', source: OFFICIEL },
      { label: 'Accès au spa', valeur: '1 h par nuit incluse', source: OFFICIEL },
      { label: 'Dégustation privée en chapelle', valeur: '4 rhums', source: OFFICIEL },
      { label: 'Masterclass de rhum', valeur: 'dès 18 h, du jeudi au dimanche', source: OFFICIEL },
      { label: 'Formats de cohésion', valeur: 'vin, rhum, yoga', source: REUNIONS },
    ],
    photos: [
      { src: img('spa-piscine-interieure'), legende: 'La piscine du spa, ouverte sur le jardin' },
      { src: img('jardin-paysager'), legende: 'Le jardin, pour le yoga et les ateliers en plein air' },
      { src: img('chapelle-lounge-interieur'), legende: 'La chapelle, cadre des dégustations de rhum' },
      { src: img('cuisine-gastronomique-dressage'), legende: 'En cuisine, avec les produits du potager' },
    ],
    blocs: [
      {
        titre: 'Ateliers et défis en équipe',
        texte:
          "Ateliers de vin, cours de yoga et défis en équipe : notre équipe organise l'activité à l'horaire prévu dans votre programme et l'adapte à la taille de votre groupe.",
      },
      {
        titre: 'Le rhum, en masterclass',
        texte:
          "Dans notre ancienne chapelle, une masterclass de rhum ou une dégustation privée de quatre rhums réunit le groupe autour d'un même récit. Un format de fin de journée qui mélange les équipes sans effort.",
      },
      {
        titre: "Le spa et le plein air",
        texte:
          "Le spa de 300 m² ouvre sur le jardin : piscine intérieure, hammam, sauna et salle de fitness sont ouverts à vos participants, avec une heure d'accès incluse par nuit ; massages et soins se réservent en complément. Le domaine met aussi à disposition des vélos électriques pour une sortie entre deux sessions.",
      },
    ],
    blocsSection: [0, 1],
    sections: [
      {
        ancre: "temps-libre",
        etiquette: "Spa et temps libre",
        titre: "Spa de 300 m² et pause au jardin entre deux sessions de séminaire",
        intro:
          "Entre deux sessions de travail, vos participants ont le spa, le jardin et des vélos électriques à leur disposition.",
        reprend: [2],
        blocs: [
          { titre: "Une pause au jardin", texte: "Le jardin de 9 500 m² sert de décor aux pauses de vos participants, avec la tour Eiffel à l'horizon." },
        ],
        faits: [
          { label: "Spa", valeur: "piscine intérieure, hammam, sauna" },
          { label: "Soins et massages", valeur: "en complément, sur réservation" },
          { label: "Vélos électriques", valeur: "à disposition" },
        ],
        reprendPhotos: [0, 1],
        photos: [
        ],
        conseil:
          "Pensez à l'heure d'accès au spa incluse par nuit : placez-la avant le dîner dans le programme de votre séminaire.",
      },
    ],
    sources: [URL_REUNIONS, URL_OFFICIEL, URL_BIEN_ETRE, URL_HISTOIRE],
  },

  acces: {
    seoTitle: "Accès en métro ligne 12 : Mairie d'Issy, hôtel 5 étoiles",
    titreSection: "Accès au séminaire : métro, Porte de Versailles et Orly",
    conseil:
      "Si votre séminaire suit un salon professionnel, pensez-y : Paris Expo Porte de Versailles est à 5 minutes en voiture, et vos participants peuvent aussi venir en métro.",
    seoDescription:
      "Métro ligne 12 à 5 min à pied, Porte de Versailles à 5 min en voiture, Orly à 25 min, CDG à 50 min. Parking avec voiturier et bornes de recharge.",
    resume:
      "Métro ligne 12 (Mairie d'Issy) à 5 minutes à pied, Orly à 25 minutes. Parking avec voiturier et bornes de recharge.",
    intro:
      "Pour un séminaire résidentiel aux portes de Paris, le domaine se trouve à Issy-les-Moulineaux, au sud-ouest de la capitale. Vos participants arrivent en métro, sans navette ni transfert ; pour ceux qui viennent en voiture, notre parking dispose d'un voiturier et de bornes de recharge.",
    faits: [
      { label: "Métro Mairie d'Issy (ligne 12)", valeur: '5 min à pied', source: RESA },
      { label: 'Paris Expo Porte de Versailles', valeur: '5 min en voiture', source: RESA },
      { label: "Aéroport d'Orly", valeur: '25 min', source: OFFICIEL },
      { label: 'Aéroport Roissy-CDG', valeur: '50 min', source: OFFICIEL },
    ],
    photos: [
      { src: img('cour-interieure-passerelle'), legende: "La cour intérieure, à l'arrivée" },
      { src: img('chapelle-exterieur-coucher-soleil'), legende: 'La chapelle, au cœur du domaine' },
    ],
    blocs: [
      {
        titre: 'En métro',
        texte:
          "La ligne 12 du métro s'arrête à Mairie d'Issy, à environ 5 minutes à pied du domaine. Elle relie directement le centre de Paris : vos participants viennent en transports en commun, comme pour une réunion en ville.",
      },
      {
        titre: 'En train',
        texte:
          "La gare Montparnasse est à 20 minutes en voiture. Sur demande, nous organisons des transferts privés en taxi vers et depuis l'hôtel.",
      },
      {
        titre: 'En voiture',
        texte:
          "La sortie d'autoroute d'Issy est à 2 km, soit 5 minutes. Paris Expo Porte de Versailles est à 5 minutes en voiture : le domaine prolonge naturellement un salon professionnel pour vos équipes. Notre parking propose à vos participants un service de voiturier et des bornes de recharge pour véhicules électriques.",
      },
      {
        titre: 'En avion ou en hélicoptère',
        texte:
          "Pour vos participants venus de province ou de l'étranger, l'aéroport d'Orly est à 25 minutes de route, Roissy-Charles-de-Gaulle à 50 minutes. L'héliport d'Issy se trouve à 2,3 km, à 8 minutes en voiture.",
      },
    ],
    blocsSection: [0, 2],
    sections: [
      {
        ancre: "sans-voiture",
        etiquette: "Train, avion et transferts",
        titre: "Venir en séminaire en train ou en avion : Montparnasse, Orly et Roissy",
        intro:
          "Pour vos participants venus de province ou de l'étranger, le domaine se rejoint depuis la gare Montparnasse et depuis les deux aéroports parisiens.",
        reprend: [1, 3],
        blocs: [
        ],
        faits: [
          { label: "Gare Montparnasse", valeur: "20 min en voiture" },
          { label: "Transferts en taxi", valeur: "sur demande" },
          { label: "Héliport", valeur: "8 min en voiture" },
        ],
        reprendPhotos: [],
        photos: [
          { src: "https://jmeiepmtgidqtmxfnlwf.supabase.co/storage/v1/object/public/chateaux-images/hotel-paris-92/seminaire-hotel-historique-paris-92-vue-aerienne-facade-jardin.webp", legende: "Le bâtiment classé et son jardin vus du ciel" },
          { src: "/images/seminaire-hotel-historique-paris-92-facade-jardin-terrasse.webp", legende: "La grande terrasse au pied de la façade" },
        ],
        conseil:
          "Pour vos participants qui arrivent en train à Montparnasse, demandez-moi un transfert privé en taxi : la gare est à 20 minutes en voiture.",
      },
    ],
    sources: [URL_OFFICIEL, URL_RESA, URL_PRESSE],
  },
};

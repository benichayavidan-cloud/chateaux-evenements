/**
 * #78-ABBAYE — rubriques du domaine (pilote du 16/11/2026).
 *
 * Sources lues le 16/11/2026 (jamais affichées : elles portent le vrai nom) :
 *  - FICHE   : fiche Select Châteaux existante (src/data/chateaux.ts, id 3)
 *  - CVENT   : fiche salons du lieu sur Cvent (surfaces en pieds carrés,
 *              converties en m² arrondis ; colonnes lues par position)
 *  - ACCES   : page « accès » du site officiel du lieu
 *
 * Noms de salles : les noms réels trahiraient le lieu (blind booking strict,
 * 15/11) — chaque salle porte un nom descriptif, la surface et les capacités
 * sont celles de la source.
 */
import type { RubriquesDomaine } from '../../types/rubriques.ts';
import { chateauImage } from '../../lib/media.ts';

const FICHE = 'Fiche Select Châteaux (data/chateaux.ts), 16/11/2026';
const CVENT = 'Fiche salons Cvent du lieu, consultée le 16/11/2026';
const ACCES = 'Page accès du site officiel du lieu, consultée le 16/11/2026';

const img = (nom: string) => `/images/seminaire-abbaye-vallee-de-chevreuse-${nom}.webp`;

export const rubriquesAbbaye: RubriquesDomaine = {
  salles: {
    seoTitle: 'Salles de séminaire en abbaye, Vallée de Chevreuse',
    titreSection: "Salles de séminaire en Vallée de Chevreuse : plénière sous les voûtes",
    conseil:
      "Pour lancer votre séminaire, pensez au cinéma privatif : une cinquantaine de fauteuils pour projeter un film d'entreprise, avant de passer en ateliers dans les salons.",
    seoDescription:
      "14 espaces de réunion dans une abbaye du XIIe siècle : Grande Salle des Voûtes de 250 couverts, salon de 209 m², cinéma privé. Capacités salle par salle.",
    resume:
      "14 espaces, du salon de 25 m² pour un comité de direction à la Grande Salle des Voûtes qui reçoit 250 convives. Toutes les capacités, salle par salle.",
    intro:
      "Nos 14 espaces de réunion sont répartis entre l'abbaye et les anciens haras du domaine. La plénière se tient dans la Grande Salle des Voûtes, sous une voûte du XIIe siècle, ou dans le grand salon des haras ; les ateliers se déroulent dans des salons de 25 à 171 m², presque tous éclairés par la lumière du jour.",
    faits: [
      { label: 'Espaces de réunion', valeur: '14', source: FICHE },
      { label: 'Plus grand salon', valeur: '209 m²', source: CVENT },
      { label: 'Banquet sous les voûtes', valeur: '250 couverts', source: FICHE },
      { label: 'Cinéma privatif', valeur: '50 fauteuils', source: CVENT },
    ],
    salles: [
      { nom: 'La Grande Salle des Voûtes', surfaceM2: null, theatre: null, classe: null, enU: null, banquet: 250, cocktail: null, cabaret: null, note: '150 personnes en réunion', reunion: 150 },
      { nom: 'Le Grand Salon des Haras', surfaceM2: 209, theatre: 90, classe: 70, enU: 40, banquet: 100, cocktail: 150, cabaret: 40 },
      { nom: 'Le Cinéma', surfaceM2: 199, theatre: 50, classe: null, enU: null, banquet: null, cocktail: null, cabaret: null, note: 'fauteuils de cinéma' },
      { nom: "L'Orangerie", surfaceM2: 171, theatre: 110, classe: 80, enU: 52, banquet: null, cocktail: 80, cabaret: 80 },
      { nom: 'Le Salon des Écuries', surfaceM2: 102, theatre: 100, classe: 46, enU: 40, banquet: null, cocktail: 100, cabaret: 50 },
      { nom: "Le Grand Salon de l'Abbaye", surfaceM2: 82, theatre: 50, classe: 40, enU: null, banquet: 48, cocktail: 50, cabaret: 30 },
      { nom: "Le Salon de l'Abbaye", surfaceM2: 55, theatre: 30, classe: 20, enU: 24, banquet: null, cocktail: null, cabaret: null },
      { nom: 'Le Petit Salon', surfaceM2: 38, theatre: 20, classe: 12, enU: 12, banquet: null, cocktail: null, cabaret: null },
      { nom: 'Le Salon des Cavaliers', surfaceM2: 30, theatre: null, classe: null, enU: null, banquet: null, cocktail: null, cabaret: null, note: '12 personnes autour d’une table' },
      { nom: 'Le Salon privé', surfaceM2: 25, theatre: null, classe: null, enU: 8, banquet: null, cocktail: null, cabaret: null, note: '8 personnes autour d’une table' },
    ],
    photos: [
      { src: img('grande-salle-voutes'), legende: 'La Grande Salle des Voûtes, prête pour votre plénière' },
      { src: img('grand-salon-haras-4'), legende: 'Le grand salon des haras, 209 m², en disposition théâtre' },
      { src: img('salon-orangerie-haras'), legende: "L'Orangerie, 171 m², ouverte sur le parc" },
      { src: img('salon-ecuries-haras-1'), legende: 'Le salon des écuries, 102 m²' },
      { src: img('salon-reunion-abbaye'), legende: "Un salon de réunion dans le bâtiment de l'abbaye" },
      { src: img('salon-reunion-haras'), legende: 'Salon de sous-commission aux haras' },
      { src: img('espace-pause-sellerie-1'), legende: "L'espace de pause de la sellerie, entre deux sessions" },
      { src: img('grand-salon-haras-2'), legende: 'Le grand salon des haras en configuration cabaret' },
    ],
    blocs: [
      {
        titre: 'La plénière sous des voûtes de neuf siècles',
        texte:
          "Au cœur de l'abbaye cistercienne, la Grande Salle des Voûtes accueille 150 personnes en réunion et 250 en banquet : vos prises de parole y gagnent en solennité. Pour une plénière plus technique, le grand salon des haras offre 209 m² modulables : 90 places en théâtre, 70 en classe, ou 150 debout pour un cocktail de lancement.",
      },
      {
        titre: 'Des ateliers à deux pas de la plénière',
        texte:
          "L'Orangerie (171 m²) et le salon des écuries (102 m²) reçoivent chacun une centaine de personnes en théâtre ; ils servent de seconde plénière ou de salles d'ateliers en cabaret, jusqu'à 80 et 50 places. Pour les sous-groupes, cinq salons de 25 à 82 m² complètent l'ensemble, du travail en U à 24 personnes au comité de direction de 8.",
      },
      {
        titre: 'Un cinéma pour vos projections',
        texte:
          "Notre cinéma privatif de 199 m² compte une cinquantaine de fauteuils. On y lance un film d'entreprise, une avant-première interne ou une session de formation sur grand écran, dans le noir et le confort d'une vraie salle.",
      },
      {
        titre: 'Ce qui est compris dans chaque salle',
        texte:
          "Chaque espace dispose d'un équipement audiovisuel professionnel. Notre équipe événementielle installe la disposition voulue, organise les pauses dans les salons attenants et prépare le passage de la plénière aux ateliers.",
      },
    ],
    blocsSection: [2, 3],
    sections: [
      {
        ancre: 'salle-signature',
        etiquette: "La Grande Salle des Voûtes",
        titre: "Votre plénière sous des voûtes du XIIe siècle",
        intro:
          "Au cœur de l'abbaye cistercienne, la Grande Salle des Voûtes reçoit 150 participants en réunion. Sous une voûte du XIIe siècle, les prises de parole de votre séminaire gagnent en solennité.",
        blocs: [
          { titre: "De la plénière au dîner de gala", texte: "La même salle accueille votre plénière de 150 personnes, puis votre dîner de gala de 250 convives : le temps fort de la journée et la soirée se tiennent dans le même cadre, sans changer de bâtiment." },
          { titre: "Pour un groupe plus restreint", texte: "Quand votre séminaire réunit moins de monde, le grand salon des haras prend le relais pour le dîner : 100 personnes à table ronde, ou 150 en cocktail dînatoire." },
        ],
        faits: [
          { label: "En réunion", valeur: "150 personnes" },
          { label: "En banquet", valeur: "250 convives" },
          { label: "Voûte", valeur: "XIIe siècle" },
        ],
        photos: [
          { src: img('grande-salle-voutes'), legende: "La Grande Salle des Voûtes, prête pour votre plénière" },
          { src: img('diner-gala-grande-salle-voutes'), legende: "La Grande Salle des Voûtes dressée pour un dîner de gala" },
        ],
        conseil:
          "Pour un séminaire qui doit marquer vos collaborateurs, gardez les voûtes pour deux temps forts : la plénière d'ouverture et le dîner de gala, jusqu'à 250 convives.",
      },
      {
        ancre: 'ateliers',
        etiquette: 'Ateliers et sous-commissions',
        titre: "Des salons pour vos ateliers, à deux pas de la plénière",
        intro:
          "Après la plénière, les ateliers de votre séminaire se tiennent dans les salons de l'abbaye et des anciens haras, de 25 à 171 m².",
        reprend: [1],
        blocs: [
          { titre: "Une seconde plénière aux haras", texte: "Pour une plénière plus technique ou une restitution d'ateliers, le grand salon des haras offre 209 m² modulables : 90 places en théâtre, 70 en classe, ou 150 debout pour un cocktail de lancement." },
          { titre: "Lumière du jour et terrasses", texte: "Nos salons d'ateliers sont presque tous éclairés par la lumière du jour. À la belle saison, les terrasses du domaine prolongent la salle de réunion pour les pauses de vos participants." },
        ],
        faits: [
          { label: "Salons d'ateliers", valeur: "de 25 à 171 m²" },
          { label: "Grand salon des haras", valeur: "209 m², 90 places en théâtre" },
          { label: "Comité de direction", valeur: "8 personnes autour d'une table" },
        ],
        reprendPhotos: [2, 3, 5, 6],
        photos: [],
        conseil:
          "Pour vos sous-commissions, pensez à répartir vos groupes entre l'Orangerie et le salon des écuries : une centaine de participants chacun, à deux pas de la plénière.",
      },
    ],
    sources: [FICHE, CVENT],
  },

  chambres: {
    seoTitle: 'Séminaire résidentiel en abbaye : 144 chambres (78)',
    titreSection: "Hébergement de séminaire à l'abbaye : 144 chambres sur trois bâtiments",
    conseil:
      "Pour loger chaque participant de votre séminaire au bon endroit, envoyez-moi votre liste : je vous propose une répartition entre l'abbaye, les haras et la ferme.",
    seoDescription:
      "144 chambres et suites réparties entre l'abbaye, les haras et la ferme, rénovées en 2023. Pour un séminaire résidentiel, tout le groupe loge sur place.",
    resume:
      "144 chambres et suites dans trois bâtiments : l'abbaye, les anciens haras et la ferme. Toutes rénovées en 2023.",
    intro:
      "Pour un séminaire résidentiel, nos 144 chambres et suites logent l'ensemble de vos participants sur place, sans navette le matin. Elles se répartissent entre trois bâtiments du domaine : l'abbaye elle-même, les anciens haras et la ferme, à trois minutes en voiture. Toutes ont été rénovées en 2023, dans un décor de pierres apparentes, de boiseries et de teintes naturelles.",
    faits: [
      { label: 'Chambres et suites', valeur: '144', source: FICHE },
      { label: "À l'abbaye", valeur: '59', source: CVENT },
      { label: 'Aux haras', valeur: '47', source: CVENT },
      { label: 'À la ferme', valeur: '38', source: CVENT },
    ],
    photos: [
      { src: img('chambre-deluxe-abbaye'), legende: "Chambre deluxe dans le bâtiment de l'abbaye" },
      { src: img('chambre-superieure-abbaye-1'), legende: "Chambre supérieure à l'abbaye" },
      { src: img('chambre-singuliere-abbaye'), legende: 'Une chambre « singulière », sous les poutres' },
      { src: img('chambre-deux-pieces-abbaye'), legende: "Chambre en deux pièces sous les combles de l'abbaye" },
      { src: img('chambre-cosy-haras'), legende: 'Chambre cosy aux haras' },
      { src: img('chambre-cottage-ferme'), legende: 'Chambre cottage à la ferme' },
      { src: img('chambre-deluxe-ferme'), legende: 'Chambre deluxe à la ferme' },
    ],
    blocs: [
      {
        titre: "L'abbaye, les haras, la ferme",
        texte:
          "Vous répartissez vos participants entre trois lieux : les 59 chambres de l'abbaye donnent sur les ruines, le lac ou la forêt. Les 47 chambres des haras occupent les anciennes écuries du domaine, au plus près des salons de réunion. La ferme, avec ses 38 chambres, fonctionne comme un hameau à part : on peut y loger une équipe ou un comité de direction à l'écart du groupe.",
      },
      {
        titre: 'Des catégories pour chaque participant',
        texte:
          "Petites chambres et chambres cosy pour les grands groupes, chambres supérieures et deluxe pour l'encadrement, suites pour vos dirigeants et vos invités de marque. Toutes offrent à vos participants le Wi-Fi haut débit et une literie haut de gamme.",
      },
      {
        titre: "Trois lieux, trois ambiances",
        texte:
          "Les 59 chambres de l'abbaye donnent sur les ruines, le lac ou la forêt. Les 47 chambres des haras occupent les anciennes écuries du domaine. La ferme compte 38 chambres : vos participants se répartissent entre ces trois lieux.",
      },
      {
        titre: "De la petite chambre à la suite",
        texte:
          "Petites chambres, chambres cosy, supérieures, deluxe et suites : vous logez chaque participant de votre séminaire selon son rôle dans l'événement.",
      },
    ],
    blocsSection: [2, 3],
    sections: [
      {
        ancre: "grand-groupe",
        etiquette: "Grands groupes",
        titre: "Abbaye, haras, ferme : répartir vos participants sur le domaine",
        intro:
          "Pour un séminaire résidentiel en grand groupe, vous choisissez qui loge où, selon vos équipes et le programme de vos journées.",
        reprend: [],
        blocs: [
          { titre: "Les haras, au plus près des salles de réunion", texte: "Les 47 chambres des haras sont au plus près des salons de réunion : logez-y les équipes de votre séminaire qui passent la journée en ateliers. Les petites chambres et les chambres cosy conviennent aux grands groupes." },
          { titre: "Le soir, chacun rejoint sa chambre", texte: "Après le dîner de gala ou une soirée sur le domaine, vos participants rejoignent leur chambre sans navette ni horaire de retour : pour un grand groupe, c'est une logistique en moins." },
        ],
        faits: [
          { label: "Chambres aux haras", valeur: "47, près des salles de réunion" },
          { label: "Petites chambres et cosy", valeur: "pour les grands groupes" },
          { label: "Retour en chambre", valeur: "sans navette, le soir" },
        ],
        reprendPhotos: [4, 5],
        photos: [
          { src: "/images/seminaire-abbaye-vallee-de-chevreuse-chambre-petite-haras.webp", legende: "Petite chambre mansardée aux haras" },
        ],
        conseil:
          "Pour les équipes de votre séminaire qui enchaînent les ateliers, demandez-moi les 47 chambres des haras : elles sont au plus près des salles de réunion.",
      },
      {
        ancre: "direction-invites",
        etiquette: "Direction et invités",
        titre: "Suites et hameau de la ferme pour votre comité de direction",
        intro:
          "Pour vos dirigeants, vos intervenants et vos invités de marque, le domaine réserve ses suites et ses chambres deluxe.",
        reprend: [],
        blocs: [
          { titre: "Un hameau à part pour le comité de direction", texte: "La ferme et ses 38 chambres fonctionnent comme un hameau à part : vous y logez votre comité de direction ou une équipe à l'écart du groupe, le temps de votre séminaire." },
          { titre: "Suites et chambres deluxe", texte: "Les suites reviennent à vos dirigeants et à vos invités de marque, les chambres supérieures et deluxe à l'encadrement de votre séminaire." },
        ],
        faits: [
          { label: "Chambres à la ferme", valeur: "38, à l'écart du groupe" },
          { label: "Suites", valeur: "pour vos dirigeants et invités" },
          { label: "Chambres supérieures et deluxe", valeur: "pour l'encadrement" },
        ],
        reprendPhotos: [0, 3, 6],
        photos: [
        ],
        conseil:
          "Pour les invités de marque de votre séminaire, réservez les suites en premier : dites-moi combien de dirigeants et d'intervenants vous attendez.",
      },
      {
        ancre: "sejour",
        etiquette: "Le séjour de vos participants",
        titre: "Wi-Fi, parking, transferts : le séjour de vos participants à l'abbaye",
        intro:
          "Pendant votre séminaire résidentiel, vos participants trouvent dans leur chambre de quoi travailler le soir et se reposer, sur un domaine facile à rejoindre.",
        reprend: [],
        blocs: [
          { titre: "Dans chaque chambre", texte: "Toutes nos chambres offrent à vos participants le Wi-Fi haut débit et une literie haut de gamme : de quoi travailler le soir et bien dormir avant la session du lendemain." },
          { titre: "Arriver au domaine", texte: "Vos participants venus en voiture disposent d'un parking privé sur place. Pour ceux qui arrivent en train, les gares sont à environ 15 minutes en voiture : un transfert vers le domaine est organisé sur réservation, pour un participant comme pour tout le groupe." },
        ],
        faits: [
          { label: "Chambres rénovées", valeur: "en 2023" },
          { label: "Parking", valeur: "privé, sur place" },
          { label: "Transfert depuis la gare", valeur: "environ 15 min" },
        ],
        reprendPhotos: [],
        photos: [
          { src: "/images/seminaire-abbaye-vallee-de-chevreuse-chambre-superieure-abbaye-2.webp", legende: "Salle de bains d'une chambre à l'abbaye" },
          { src: "https://jmeiepmtgidqtmxfnlwf.supabase.co/storage/v1/object/public/chateaux-images/abbaye-chevreuse/seminaire-abbaye-vallee-de-chevreuse-facade-batiment-principal.webp", legende: "La façade du bâtiment principal, à l'arrivée" },
        ],
        conseil:
          "Pour les participants de votre séminaire qui viennent en train, réservez le transfert avec moi : les gares sont à environ 15 minutes du domaine.",
      },
    ],
    sources: [FICHE, CVENT],
  },

  exterieurs: {
    seoTitle: 'Abbaye avec parc de 80 hectares et lac, séminaire 78',
    titreSection: "80 hectares de forêt et un lac pour votre séminaire au vert",
    conseil:
      "Pour une pause qui change de la salle de réunion pendant votre séminaire, donnez rendez-vous à vos participants au bord du lac, au cœur du domaine.",
    seoDescription:
      "80 hectares de forêt, un lac, des ruines médiévales : le parc du domaine accueille vos pauses, activités et cocktails en plein air, à 45 minutes de Paris.",
    resume:
      "80 hectares de forêt et d'étangs autour des ruines de l'abbaye : lac, terrasses, piscine chauffée et parcours sportif.",
    intro:
      "Le domaine s'étend sur 80 hectares en lisière de la forêt de Rambouillet. Les ruines de l'église abbatiale, le lac et les bois centenaires composent le décor de vos pauses, de vos activités et de vos cocktails en plein air.",
    faits: [
      { label: 'Surface du domaine', valeur: '80 hectares', source: FICHE },
      { label: 'Parcours sportif', valeur: '500 m', source: CVENT },
      { label: 'Courts de tennis et de padel', valeur: '2 + 2', source: CVENT },
      { label: 'Piscine extérieure', valeur: 'chauffée', source: CVENT },
    ],
    photos: [
      { src: img('abbaye-cistercienne-vue-generale'), legende: "Vue générale de l'abbaye dans son parc" },
      { src: img('terrasse-restaurant-gastronomique'), legende: 'La terrasse du restaurant gastronomique' },
      { src: img('terrasse-table-champetre'), legende: 'La terrasse de la table champêtre du domaine' },
      { src: img('activite-camion-maraicher'), legende: 'Le camion du maraîcher, dans le parc' },
      { src: "https://jmeiepmtgidqtmxfnlwf.supabase.co/storage/v1/object/public/chateaux-images/abbaye-chevreuse/seminaire-abbaye-vallee-de-chevreuse-cottage-brique-parc.webp", legende: 'Un bâtiment de brique du domaine, sous les grands arbres du parc' },
      { src: "https://jmeiepmtgidqtmxfnlwf.supabase.co/storage/v1/object/public/chateaux-images/abbaye-chevreuse/seminaire-abbaye-vallee-de-chevreuse-facade-batiment-principal.webp", legende: 'La façade du bâtiment principal' },
    ],
    blocs: [
      {
        titre: 'Le lac et les ruines',
        texte:
          "Au cœur du domaine, le lac reflète les ruines de l'église abbatiale. Vos participants passent de la salle de réunion au parc en quelques pas.",
      },
      {
        titre: 'Des terrasses pour chaque moment',
        texte:
          "Les terrasses du restaurant gastronomique et de la table champêtre du domaine reçoivent les déjeuners d'équipe et les pauses à la belle saison. Elles prolongent la salle de réunion sans transfert : un atout quand le programme est serré.",
      },
    ],
    blocsSection: [0],
    sections: [
      {
        ancre: "plein-air",
        etiquette: "Recevoir en plein air",
        titre: "Cocktail au bord du lac et déjeuner en terrasse pour votre séminaire",
        intro:
          "Les repas et les temps forts de votre séminaire sortent des salles : déjeuner d'équipe en terrasse à la belle saison, cocktail au bord du lac.",
        reprend: [1],
        blocs: [
          { titre: "Cocktail et photo de groupe au bord du lac", texte: "Les rives du lac accueillent un cocktail de fin de journée ou une photo de groupe que vos équipes garderont, avec les ruines de l'église abbatiale en arrière-plan." },
        ],
        faits: [
          { label: "Cocktail au bord du lac", valeur: "en fin de journée" },
          { label: "Terrasses de restaurant", valeur: "gastronomique et champêtre" },
          { label: "Déjeuner en terrasse", valeur: "à la belle saison" },
        ],
        reprendPhotos: [1, 2, 3],
        photos: [
        ],
        conseil:
          "À la belle saison, demandez-moi un déjeuner d'équipe en terrasse pour vos participants : celle du restaurant gastronomique ou celle de la table champêtre.",
      },
      {
        ancre: "detente",
        etiquette: "S'aérer entre deux sessions",
        titre: "Tennis, padel et barques : les pauses actives de votre séminaire à l'abbaye",
        intro:
          "Entre deux sessions de travail, vos participants choisissent leur pause selon leur énergie du moment, sans quitter le domaine.",
        reprend: [],
        blocs: [
          { titre: "Tennis, padel et parcours sportif", texte: "Deux courts de tennis, deux courts de padel et un parcours sportif de 500 mètres : le parc se prête aux pauses libres entre deux sessions de votre séminaire." },
          { titre: "Vélos, barques et piscine extérieure", texte: "Des vélos permettent de parcourir le domaine, des barques et des pédalos attendent vos participants sur le lac, et la piscine extérieure est chauffée." },
        ],
        faits: [
          { label: "Tennis et padel", valeur: "deux courts chacun" },
          { label: "Barques et pédalos", valeur: "sur le lac" },
          { label: "Vélos", valeur: "pour parcourir le domaine" },
        ],
        reprendPhotos: [0, 4],
        photos: [
        ],
        conseil:
          "Laissez un vrai temps libre dans le programme de votre séminaire : vos participants en profitent pour une partie de padel ou un tour en barque sur le lac.",
      },
    ],
    sources: [FICHE, CVENT],
  },

  restauration: {
    seoTitle: 'Restauration de séminaire : dîner sous les voûtes (78)',
    titreSection: "Restauration de séminaire à l'abbaye : 4 restaurants et 2 bars",
    conseil:
      "Pour un dîner de cohésion pendant votre séminaire, demandez-moi la table italienne de la ferme : une cuisine généreuse à partager sur de grandes tablées.",
    seoDescription:
      "4 restaurants et 2 bars : dîner de gala de 250 couverts sous les voûtes du XIIe siècle, cuisine française, table italienne, table champêtre. Menus sur mesure.",
    resume:
      "4 restaurants et 2 bars, du dîner de gala de 250 couverts dans la Grande Salle des Voûtes à la table italienne de la ferme.",
    intro:
      "Nos 4 restaurants et 2 bars permettent de ne jamais servir deux repas dans le même cadre au cours d'un séminaire de plusieurs jours. Déjeuner d'affaires au restaurant gastronomique, dîner de gala dans la Grande Salle des Voûtes, dîner de cohésion à la table italienne de la ferme : chaque repas devient un moment du programme.",
    faits: [
      { label: 'Restaurants', valeur: '4', source: CVENT },
      { label: 'Bars', valeur: '2', source: CVENT },
      { label: 'Banquet sous les voûtes', valeur: '250 couverts', source: FICHE },
      { label: 'Régimes alimentaires', valeur: 'tous pris en charge', source: FICHE },
    ],
    photos: [
      { src: img('diner-gala-grande-salle-voutes'), legende: 'Dîner de gala dans la Grande Salle des Voûtes' },
      { src: img('restaurant-gastronomique'), legende: 'Le restaurant gastronomique' },
      { src: img('restaurant-italien-ferme'), legende: 'La table italienne de la ferme' },
      { src: img('table-champetre-domaine'), legende: "La table champêtre du domaine, pour les déjeuners d'équipe" },
      { src: img('pause-apres-midi'), legende: "La pause de l'après-midi" },
      { src: img('espace-pause-sellerie-2'), legende: 'Pause café dans la sellerie' },
    ],
    blocs: [
      {
        titre: 'La Grande Salle des Voûtes, de la plénière au gala',
        texte:
          "Sous ses voûtes du XIIe siècle, la Grande Salle des Voûtes accueille votre plénière de 150 personnes, puis votre dîner de gala de 250 convives. Le temps fort de la journée et la soirée se tiennent dans le même cadre, sans changer de bâtiment.",
      },
      {
        titre: 'Cuisine française et table italienne',
        texte:
          "Le restaurant gastronomique sert une cuisine française élégante, adaptée aux déjeuners d'affaires. À la ferme, la table italienne propose une cuisine généreuse à partager sur de grandes tablées, idéale pour un dîner de cohésion. La table champêtre du domaine complète l'offre pour les déjeuners d'équipe entre deux sessions.",
      },
      {
        titre: 'Pauses et menus sur mesure',
        texte:
          "Les pauses sont servies dans les salons attenants aux salles de réunion. Notre équipe compose les menus selon votre programme et prend en charge les régimes végétarien, végan, sans gluten, halal ou casher.",
      },
    ],
    blocsSection: [1],
    sections: [
      {
        ancre: "banquets",
        etiquette: "Banquets et dîners de groupe",
        titre: "Dîner de gala de séminaire sous les voûtes : 250 convives à table",
        intro:
          "Pour le dîner de gala de votre convention, les tables se dressent sous des voûtes du XIIe siècle. Pour un groupe plus restreint, le grand salon des haras prend le relais.",
        reprend: [0],
        blocs: [
          { titre: "Un banquet aux haras pour 100 convives", texte: "Pour un dîner de séminaire en groupe plus restreint, le grand salon des haras accueille 100 personnes à table ronde, et 150 en cocktail dînatoire." },
        ],
        faits: [
          { label: "Dîner de gala sous les voûtes", valeur: "250 convives" },
          { label: "Banquet au grand salon des haras", valeur: "100 convives" },
          { label: "Cocktail dînatoire aux haras", valeur: "150 personnes" },
        ],
        reprendPhotos: [0],
        photos: [
          { src: "/images/seminaire-abbaye-vallee-de-chevreuse-grand-salon-haras-2.webp", legende: "Le grand salon des haras en configuration cabaret" },
        ],
        conseil:
          "Pour votre convention, enchaînez la plénière et le dîner de gala dans la Grande Salle des Voûtes : vos participants ne changent pas de bâtiment.",
      },
      {
        ancre: "pauses",
        etiquette: "Pauses et menus",
        titre: "Pauses de séminaire et menus sur mesure à l'abbaye",
        intro:
          "Les pauses rythment la journée de travail : à l'abbaye, elles sont servies à côté de vos salles, et les menus de votre séminaire s'adaptent aux régimes de vos participants.",
        reprend: [],
        blocs: [
          { titre: "Des pauses servies à côté de vos salles", texte: "Les pauses de votre séminaire sont servies dans les salons attenants aux salles de réunion : vos participants ne traversent pas le domaine entre deux sessions. La sellerie sert aussi d'espace de pause." },
          { titre: "Des menus composés selon votre programme", texte: "Notre équipe compose les menus selon le programme de votre séminaire et prend en charge les régimes végétarien, végan, sans gluten, halal ou casher." },
        ],
        faits: [
          { label: "Pauses", valeur: "à côté de vos salles" },
          { label: "Menus", valeur: "composés selon votre programme" },
          { label: "Régimes alimentaires", valeur: "cinq pris en charge" },
        ],
        reprendPhotos: [4, 5],
        photos: [
        ],
        conseil:
          "Envoyez-moi le programme de votre séminaire avec votre demande : l'équipe compose les menus de vos participants à partir de celui-ci.",
      },
    ],
    sources: [FICHE, CVENT],
  },

  soirees: {
    seoTitle: "Soirée d'entreprise dans une abbaye, Vallée de Chevreuse",
    titreSection: "Soirée d'entreprise à l'abbaye : gala, salons et cinéma privé",
    conseil:
      "Pour un dîner de séminaire en plus petit groupe, demandez-moi le grand salon des haras : 100 convives à table ronde.",
    seoDescription:
      "Dîner de gala sous les voûtes du XIIe siècle pour 250 convives, bars et salons, espace jeux privatisé de 200 m², cinéma privé : vos soirées sur le domaine.",
    resume:
      "Dîner de gala dans la Grande Salle des Voûtes, bars et salons, soirée animée et cinéma : la soirée se passe sur place.",
    intro:
      "Après la journée de travail, la soirée se déroule sans quitter le domaine. Dîner de gala dans la Grande Salle des Voûtes, verre dans l'un de nos salons, soirée animée dans l'espace jeux privatisé : vos participants rejoignent leur chambre à pied, sans navette ni horaire de retour.",
    faits: [
      { label: 'Dîner de gala', valeur: '250 convives', source: FICHE },
      { label: 'Espace jeux privatisé', valeur: '200 m²', source: CVENT },
      { label: 'Cinéma privatif', valeur: '50 fauteuils', source: CVENT },
      { label: 'Bars', valeur: '2', source: CVENT },
    ],
    photos: [
      { src: img('bar-salon-anglais'), legende: 'Le salon anglais' },
      { src: img('diner-gala-grande-salle-voutes'), legende: 'La Grande Salle des Voûtes dressée pour un dîner de gala' },
      { src: img('bar-salon-de-musique'), legende: 'Le salon de musique' },
      { src: img('bar-salon-ete'), legende: "Le salon d'été" },
      { src: img('salon-soiree-animee'), legende: 'Le salon des soirées animées, privatisable pour votre groupe' },
      { src: img('bar-ferme'), legende: 'Le bar de la ferme' },
    ],
    blocs: [
      {
        titre: 'Le dîner de gala',
        texte:
          "La Grande Salle des Voûtes reçoit jusqu'à 250 convives en banquet. Pour un groupe plus restreint, le grand salon des haras accueille 100 personnes à table ronde et 150 en cocktail dînatoire.",
      },
      {
        titre: 'Des salons pour prolonger la soirée',
        texte:
          "Salon anglais, salon de musique, salon d'été, bar de la ferme : chacun a son ambiance, et l'on peut en privatiser un pour votre groupe après le dîner.",
      },
      {
        titre: 'Soirée animée, quiz musical et cinéma',
        texte:
          "Pour une soirée plus animée : un salon privatisé pour votre groupe, un quiz musical, l'espace jeux privatisé de 200 m², ou une séance privée dans notre cinéma. Autant de formats qui mélangent les équipes sans effort.",
      },
    ],
    blocsSection: [0],
    sections: [
      {
        ancre: "apres-diner",
        etiquette: "Après le dîner",
        titre: "Après le dîner à l'abbaye : salons privatisés, quiz musical et cinéma",
        intro:
          "Une fois le dîner terminé, la soirée de votre séminaire se poursuit dans les salons et les bars du domaine, ou autour d'une animation réservée à votre groupe.",
        reprend: [1, 2],
        blocs: [
        ],
        faits: [
          { label: "Salons et bars", valeur: "un salon privatisable" },
          { label: "Espace jeux", valeur: "quiz musical et soirée animée" },
          { label: "Cinéma", valeur: "séance privée pour votre groupe" },
        ],
        reprendPhotos: [0, 2, 3, 4, 5],
        photos: [
        ],
        conseil:
          "Pour finir la soirée de votre séminaire au calme, demandez-moi une séance privée au cinéma du domaine pour vos participants.",
      },
      {
        ancre: "soirees-a-theme",
        etiquette: "Soirées à thème",
        titre: "Soirées à thème à l'abbaye : banquet médiéval, murder party et bal masqué",
        intro:
          "Au-delà du dîner de gala, notre équipe met en scène des soirées à thème sur le domaine. Trois d'entre elles tirent le meilleur parti de l'abbaye.",
        reprend: [],
        blocs: [
          { titre: "Banquet médiéval sous les voûtes", texte: "Banquet aux chandelles, troubadours, spectacle de fauconnerie et tir à l'arc : sous des voûtes du XIIe siècle, le thème médiéval n'a pas besoin de décor ajouté." },
          { titre: "Murder party", texte: "Un scénario original, des comédiens professionnels et des indices cachés dans les salons : vos participants mènent l'enquête par équipes. Un format de cohésion qui fait travailler la communication et la stratégie, le temps d'une soirée." },
          { titre: "Bal masqué vénitien", texte: "Un bal costumé aux chandelles : chaque invité reçoit son masque en arrivant, puis se laisse guider pour les danses de salon, sur une musique baroque. Après le dîner de gala, vos invités changent d'époque sans quitter le domaine." },
        ],
        faits: [
          { label: "Soirée à thème conseillée", valeur: "banquet médiéval" },
          { label: "Autres thèmes de soirée", valeur: "murder party, bal masqué" },
          { label: "Décor et animation de soirée", valeur: "sur mesure" },
        ],
        reprendPhotos: [],
        photos: [
          { src: "/images/services/soiree-entreprise-medievale-banquet-chateau-chandelles.webp", legende: "Banquet médiéval aux chandelles (image d’illustration, autre lieu)" },
          { src: "/images/services/soiree-entreprise-murder-party-enquete-chateau.webp", legende: "Murder party (image d’illustration, autre lieu)" },
          { src: "/images/services/soiree-entreprise-bal-masque-venitien-chateau-salon.webp", legende: "Bal masqué vénitien (image d’illustration, autre lieu)" },
        ],
        liens: [{ href: "/seminaires-soirees-entreprise", label: "Voir tous nos thèmes de soirée" }],
        conseil:
          "Pour une soirée de séminaire qui tire parti du lieu, demandez-moi le banquet médiéval : il se tient sous les voûtes du XIIe siècle.",
      },
    ],
    sources: [FICHE, CVENT],
  },

  activites: {
    seoTitle: "Activités de team building dans un domaine de 80 ha",
    titreSection: "Team building à l'abbaye : olympiades, paintball et ball-trap",
    conseil:
      "Pour un temps fort de cohésion pendant votre séminaire, demandez-moi le paintball ou le ball-trap : notre équipe l'organise à l'horaire prévu dans votre programme.",
    seoDescription:
      "Tennis, padel, vélos, barques sur le lac, parcours sportif, spa, yoga, espace jeux privatisé : les activités en libre accès et encadrées pour vos équipes.",
    resume:
      "Tennis, padel, barques, vélos, spa, yoga, espace jeux : des activités en accès libre et des formats encadrés pour la cohésion.",
    intro:
      "Pour votre team building, le domaine propose deux types d'activités : celles que vos participants pratiquent librement pendant leurs temps de pause, et celles que notre équipe organise pour l'ensemble du groupe. Tout se déroule sur place : votre groupe n'a aucun transfert à prévoir.",
    faits: [
      { label: 'Courts de tennis', valeur: '2', source: CVENT },
      { label: 'Courts de padel', valeur: '2', source: CVENT },
      { label: 'Cabines de soins', valeur: '7', source: CVENT },
      { label: 'Espace jeux privatisé', valeur: '200 m²', source: CVENT },
    ],
    photos: [
      { src: img('activite-camion-maraicher'), legende: 'Atelier autour du camion du maraîcher' },
      { src: img('pavillon-bien-etre'), legende: 'Le pavillon bien-être' },
      { src: img('salon-soiree-animee'), legende: 'Le salon des soirées animées' },
      { src: img('abbaye-cistercienne-vue-generale'), legende: 'Le parc et le lac, terrain des activités de plein air' },
    ],
    blocs: [
      {
        titre: 'En libre accès',
        texte:
          "Tennis et padel (deux courts chacun), vélos pour parcourir le domaine, barques et pédalos sur le lac, parcours sportif de 500 mètres, salle de sport, piscine extérieure chauffée et bains nordiques. Vos participants choisissent selon leur énergie du moment.",
      },
      {
        titre: 'Encadrées pour votre groupe',
        texte:
          "Olympiades dans le parc, paintball, ball-trap, séances de yoga, quiz musical ou soirée animée dans l'espace jeux : notre équipe organise l'activité à l'horaire prévu dans votre programme et l'adapte à la taille du groupe.",
      },
      {
        titre: "Le spa et le bien-être",
        texte:
          "Entre deux sessions, vos participants profitent du spa : 7 cabines de soins, une piscine extérieure chauffée, 2 bains nordiques et une salle de sport. Des séances de yoga peuvent ouvrir la journée de travail : un moment de récupération qui change la dynamique d'un séminaire de deux ou trois jours.",
      },
    ],
    blocsSection: [1],
    sections: [
      {
        ancre: "temps-libre",
        etiquette: "Spa et temps libre",
        titre: "Temps libre à l'abbaye : spa, tennis, padel et barques sur le lac",
        intro:
          "Entre deux sessions de travail, vos participants choisissent : une partie de padel, un tour en barque sur le lac ou un moment au spa.",
        reprend: [0],
        blocs: [
          { titre: "Le spa, pour récupérer", texte: "Entre deux sessions, vos participants profitent du spa et de ses 7 cabines de soins : un moment de récupération qui change la dynamique d'un séminaire de deux ou trois jours." },
        ],
        faits: [
          { label: "Vélos", valeur: "pour parcourir le domaine" },
          { label: "Parcours sportif", valeur: "500 m" },
          { label: "Barques et pédalos", valeur: "sur le lac" },
        ],
        reprendPhotos: [1, 3],
        photos: [
        ],
        conseil:
          "Pour vos participants qui aiment bouger, signalez le parcours sportif de 500 mètres : il se fait librement, entre deux sessions.",
      },
    ],
    sources: [FICHE, CVENT],
  },

  acces: {
    seoTitle: 'Accès au domaine : RER B, train et route depuis Paris',
    titreSection: "Accès au séminaire : 45 min de Paris, RER B et Orly",
    conseil:
      "Si vos participants viennent de Paris en voiture, conseillez-leur la N118 ou l'A10 : le tunnel de Saint-Cloud est fermé vers la province jusqu'à fin août 2027.",
    seoDescription:
      "À 45 min de Paris en voiture, RER B ou train depuis Montparnasse puis transfert de 15 min, Orly à 40 min. Itinéraires, parking et transferts.",
    resume:
      "45 minutes de Paris en voiture, RER B ou train depuis Montparnasse puis 15 minutes de transfert. Parking privé sur place.",
    intro:
      "Pour un séminaire résidentiel au vert, le domaine se trouve au cœur du Parc naturel régional de la Haute Vallée de Chevreuse (Yvelines), à 45 minutes de Paris en voiture. Vos participants peuvent aussi venir en transports en commun, avec un transfert depuis la gare sur réservation.",
    faits: [
      { label: 'Paris en voiture', valeur: '45 min', source: CVENT },
      { label: 'Gare la plus proche', valeur: '15 min', source: CVENT },
      { label: 'Aéroport d’Orly', valeur: '40 min', source: CVENT },
      { label: 'Aéroport Roissy-CDG', valeur: '1 h 10', source: CVENT },
    ],
    photos: [
      { src: chateauImage('Abbaye Chevreuse', 'seminaire-abbaye-vallee-de-chevreuse-facade-batiment-principal.webp'), legende: "La façade du bâtiment principal, à l'arrivée" },
      { src: img('abbaye-cistercienne-vue-generale'), legende: 'Le domaine vu du ciel, entre forêt et lac' },
    ],
    blocs: [
      {
        titre: 'En voiture',
        texte:
          "Depuis la porte de Saint-Cloud : A13, A12 puis N10 en direction de Rambouillet ; depuis le sud-ouest de Paris (pont de Sèvres, porte d'Orléans) : N118 ou A10, puis les routes de la vallée de Chevreuse. Comptez 45 minutes hors heures de pointe pour vos participants venus de Paris. L'itinéraire détaillé est joint à votre confirmation, pour le transmettre à votre groupe. Le domaine dispose d'un parking privé avec bornes de recharge électrique.",
      },
      {
        titre: 'Travaux sur l’A13 jusqu’à fin août 2027',
        texte:
          "Information du 16 novembre 2026 : le tunnel de Saint-Cloud est fermé dans le sens Paris vers la province jusqu'à fin août 2027. Pendant cette période, privilégiez l'itinéraire par la N118 ou l'A10.",
      },
      {
        titre: 'En RER ou en train',
        texte:
          "RER B jusqu'à Saint-Rémy-lès-Chevreuse (terminus), ou train au départ de Paris-Montparnasse jusqu'à Rambouillet. Les deux gares sont à environ 15 minutes en voiture ; un transfert vers le domaine est organisé sur réservation, pour un participant comme pour tout le groupe.",
      },
      {
        titre: 'En avion ou en hélicoptère',
        texte:
          "Pour vos participants venus de province ou de l'étranger, Orly est à environ 40 minutes de route, Roissy-Charles-de-Gaulle à 1 h 10. Un transfert de groupe avec chauffeur peut être organisé depuis l'aéroport, et l'atterrissage d'un hélicoptère sur le domaine est possible sur demande.",
      },
    ],
    blocsSection: [0, 1],
    sections: [
      {
        ancre: "sans-voiture",
        etiquette: "Train, avion et transferts",
        titre: "Venir en séminaire sans voiture : RER B, train depuis Montparnasse, aéroport d'Orly",
        intro:
          "Pour vos participants sans voiture, le domaine se rejoint en RER ou en train, puis par un transfert depuis la gare. Orly et Roissy desservent ceux qui viennent de plus loin.",
        reprend: [2, 3],
        blocs: [
        ],
        faits: [
          { label: "RER B", valeur: "Saint-Rémy-lès-Chevreuse" },
          { label: "Train depuis Paris-Montparnasse", valeur: "jusqu'à Rambouillet" },
          { label: "Transfert depuis la gare", valeur: "sur réservation" },
        ],
        reprendPhotos: [],
        photos: [
          { src: "https://jmeiepmtgidqtmxfnlwf.supabase.co/storage/v1/object/public/chateaux-images/abbaye-chevreuse/seminaire-abbaye-vallee-de-chevreuse-cottage-brique-parc.webp", legende: "Un bâtiment de brique du domaine, sous les grands arbres du parc" },
          { src: "/images/seminaire-abbaye-vallee-de-chevreuse-terrasse-restaurant-gastronomique.webp", legende: "La terrasse du restaurant gastronomique" },
        ],
        conseil:
          "Pour un intervenant de votre séminaire à l'agenda serré, sachez que l'atterrissage d'un hélicoptère sur le domaine est possible sur demande.",
      },
    ],
    sources: [CVENT, ACCES],
  },
};

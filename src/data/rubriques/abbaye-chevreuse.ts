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
      { nom: 'La Grande Salle des Voûtes', surfaceM2: null, theatre: null, classe: null, enU: null, banquet: 250, cocktail: null, cabaret: null, note: '150 personnes en réunion' },
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
    sources: [FICHE, CVENT],
  },

  chambres: {
    seoTitle: 'Séminaire résidentiel en abbaye : 144 chambres (78)',
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
      { src: img('pavillon-bien-etre'), legende: 'Le pavillon bien-être du domaine' },
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
    ],
    sources: [FICHE, CVENT],
  },

  exterieurs: {
    seoTitle: 'Abbaye avec parc de 80 hectares et lac, séminaire 78',
    seoDescription:
      "80 hectares de forêt, un lac, des ruines médiévales : le parc du domaine accueille vos pauses, activités et cocktails en plein air, à 45 minutes de Paris.",
    resume:
      "80 hectares de forêt et d'étangs autour des ruines de l'abbaye : lac, terrasses, piscine chauffée et parcours sportif.",
    intro:
      "Le domaine s'étend sur 80 hectares en lisière de la forêt de Rambouillet. Les ruines de l'église abbatiale, le lac et les bois centenaires composent le décor de vos pauses, de vos activités et de vos cocktails en plein air. On passe de la salle de réunion au parc en quelques pas.",
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
      { src: img('pavillon-bien-etre'), legende: 'Le pavillon bien-être, ouvert sur le parc' },
    ],
    blocs: [
      {
        titre: 'Le lac et les ruines',
        texte:
          "Au cœur du domaine, le lac reflète les ruines de l'église abbatiale. Barques et pédalos sont à disposition des participants ; ses rives accueillent un cocktail de fin de journée ou une photo de groupe que vos équipes garderont.",
      },
      {
        titre: 'Des terrasses pour chaque moment',
        texte:
          "Les terrasses du restaurant gastronomique et de la table champêtre du domaine reçoivent les déjeuners d'équipe et les pauses à la belle saison. Elles prolongent la salle de réunion sans transfert : un atout quand le programme est serré.",
      },
      {
        titre: 'Le parc comme terrain de jeu',
        texte:
          "Deux courts de tennis, deux courts de padel, un parcours sportif de 500 mètres, des vélos et une piscine extérieure chauffée : le parc se prête aux olympiades d'entreprise comme aux pauses libres entre deux sessions.",
      },
    ],
    sources: [FICHE, CVENT],
  },

  restauration: {
    seoTitle: 'Restauration de séminaire : dîner sous les voûtes (78)',
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
    sources: [FICHE, CVENT],
  },

  soirees: {
    seoTitle: "Soirée d'entreprise dans une abbaye, Vallée de Chevreuse",
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
    sources: [FICHE, CVENT],
  },

  activites: {
    seoTitle: "Activités de team building dans un domaine de 80 ha",
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
    sources: [FICHE, CVENT],
  },

  acces: {
    seoTitle: 'Accès au domaine : RER B, train et route depuis Paris',
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
    sources: [CVENT, ACCES],
  },
};

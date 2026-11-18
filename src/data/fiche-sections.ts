/**
 * Fiche château : les 6 sections de texte sous la galerie (17/11/2026).
 *
 * Décision PO du 17/11/2026 : chaque section ne parle que de son sujet (pas
 * de spa dans l'hébergement, pas d'activités dans les salles). La matière
 * vient des rubriques du domaine (data/rubriques), déjà classées par thème et
 * sourcées : la fiche n'a plus de texte à elle, sauf « Le lieu ».
 *
 * Titres : un mot-clé + un détail propre au lieu (validés PO le 17/11).
 * Jetons {chambres} {salles} {capacite} : lus dans data/chateaux.ts.
 */
import type { BlocTexte, RubriqueId } from '../types/rubriques.ts';

export const SECTIONS_FICHE = ['lieu', 'hebergement', 'reunion', 'restauration', 'activites', 'acces'] as const;
export type SectionFicheId = (typeof SECTIONS_FICHE)[number];

/** Un bloc repris d'une rubrique : [rubrique, rang du bloc]. */
export type ChoixBloc = [RubriqueId, number];

export interface FicheSectionsChateau {
  titres: Record<SectionFicheId, string>;
  /** « Le lieu » : histoire, architecture, parc. Seul texte propre à la fiche. */
  lieu: { intro: string; blocs: BlocTexte[]; faits: Array<{ label: string; valeur: string }> };
  /**
   * Le conseil de l'assistante séminaire, un par section (bulle sous l'introduction).
   * Écrit à partir des faits de la section : aucun chiffre qui n'y figure pas
   * (testé). Signé d'un prénom réel : à faire relire par l'intéressée.
   */
  conseils?: Partial<Record<SectionFicheId, string>>;
  /** Blocs repris, quand l'ordre par défaut (tous ceux de la rubrique) ne convient pas. */
  blocs?: Partial<Record<Exclude<SectionFicheId, 'lieu'>, ChoixBloc[]>>;
}

export const FICHE_SECTIONS: Record<string, FicheSectionsChateau> = {
  'manoir-anglo-normand-chantilly': {
    titres: {
      lieu: 'Un château anglo-normand dans un parc de 6 hectares',
      hebergement: 'Séminaire résidentiel : {chambres} chambres et suites sur place',
      reunion: '{salles} salles de séminaire à la lumière du jour, au cœur du parc',
      restauration: 'Déjeuners, cocktails et dîner de gala au château',
      activites: 'Team building et spa au domaine',
      acces: 'Venir depuis Paris : moins de 35 km, 25 min de Roissy',
    },
    lieu: {
      intro:
        "Pour un séminaire résidentiel aux portes de Paris, ce château de style anglo-normand offre à vos équipes un cadre qu'elles n'oublient pas. Construit au début du XXe siècle pour une grande famille de banquiers, c'est aujourd'hui le plus grand château-hôtel de France, en lisière de la forêt de Chantilly, à moins de 35 km de la capitale.",
      blocs: [
        {
          titre: 'Un décor qui marque le début du séminaire',
          texte:
            "Colombages, fenêtres à l'anglaise, toitures d'inspiration germanique et blasons gravés dans la pierre : dès l'allée bordée d'arbres, vos participants comprennent que cette convention ne ressemblera pas aux autres. À l'intérieur, les boiseries d'époque donnent du caractère aux temps d'accueil et aux pauses de votre groupe.",
        },
        {
          titre: 'Un parc de 6 hectares pour sortir de la salle',
          texte:
            "Le parc, planté d'arbres centenaires et bordé par trois forêts, prolonge vos sessions de travail au grand air. Des terrasses en cascade, dessinées à la manière d'un jardin italien, descendent jusqu'à un amphithéâtre de verdure aux gradins de pierre : un lieu tout trouvé pour une prise de parole en plein air ou la photo de groupe de fin de séminaire.",
        },
        {
          titre: 'Tout votre événement sur un seul site',
          texte:
            "Travail, repas, soirée et nuit se déroulent au domaine : vos collaborateurs restent ensemble du café d'accueil au dernier verre, et vous n'avez aucune navette à organiser. Labellisé Clef Verte, le domaine répond aussi aux engagements environnementaux de votre entreprise.",
        },
      ],
      faits: [
        { label: 'Parc', valeur: '6 hectares' },
        { label: 'Cadre', valeur: 'forêt de Chantilly' },
        { label: 'Label', valeur: 'Clef Verte' },
      ],
    },
    blocs: {
      restauration: [['restauration', 0], ['restauration', 1], ['restauration', 2], ['soirees', 1]],
    },
    conseils: {
      lieu: "Dès l'allée bordée d'arbres, vos collaborateurs comprennent que ce séminaire sera différent. Et tout votre événement se tient sur un seul site : aucune navette à organiser pour vos participants.",
      hebergement: "Pour un séminaire résidentiel en grand groupe, pensez aux 103 chambres à lits jumeaux : vous logez jusqu'à 243 participants sur place, en tenant le budget de votre événement.",
      reunion: "Plénière de 280 places le matin, ateliers en sous-commission l'après-midi : avec 21 salles de séminaire, chaque groupe de travail a la sienne. De mai à octobre, demandez-moi la serre pour un séminaire créatif.",
      restauration: "Sur un séminaire de plusieurs jours, faites tourner les 3 restaurants : vos participants ne déjeunent jamais deux fois au même endroit. Et gardez le Grand Salon pour le dîner de gala de votre convention.",
      activites: "Entre deux sessions de travail, le spa est gratuit pour vos participants résidents, de 7 h à 22 h. Laissez un créneau libre dans le programme de votre séminaire, avant le dîner : vos équipes en profiteront ensemble.",
      acces: "Pour les participants qui viennent à votre séminaire sans voiture : un TER direct depuis la gare du Nord en 25 minutes environ, puis nous organisons le transfert du groupe depuis la gare.",
    },
  },
  'abbaye-millenaire-vallee-chevreuse': {
    titres: {
      lieu: 'Une abbaye du XIIe siècle sur 80 hectares',
      hebergement: 'Séminaire résidentiel : {chambres} chambres et suites au cœur du domaine',
      reunion: '{salles} salles de séminaire, de la Grande Salle des Voûtes aux salons à la lumière du jour',
      restauration: '4 restaurants et 2 bars, dîner de gala sous les voûtes',
      activites: 'Team building sur 80 hectares et spa',
      acces: 'Venir en séminaire : à 45 min de Paris',
    },
    lieu: {
      intro:
        "Pour un séminaire résidentiel au vert, cette abbaye cistercienne fondée au XIIe siècle plonge vos équipes dans un cadre sans équivalent, à 45 minutes de Paris. Classé Monument Historique, le domaine de 80 hectares a été entièrement rénové en 2023.",
      blocs: [
        {
          titre: 'Neuf siècles d’histoire pour décor',
          texte:
            "Ruines de l'église abbatiale, bâtiments conventuels, voûtes médiévales : vos participants ne sont pas dans un centre de congrès, et ils le sentent dès leur arrivée. Ce patrimoine donne du poids aux temps forts de votre convention et ancre les messages de votre entreprise dans les mémoires.",
        },
        {
          titre: 'Un lac et 80 hectares de forêt',
          texte:
            "Le domaine s'étend en lisière de la forêt de Rambouillet, autour d'un lac qui reflète les ruines. Vos sessions de travail se prolongent dehors, et les rives du lac accueillent la photo de groupe de fin de séminaire.",
        },
        {
          titre: 'Une vraie coupure avec le quotidien',
          texte:
            "À 45 minutes de Paris, vos collaborateurs sont coupés du bureau et disponibles pour le travail en commun. Tout se déroule sur place : vous n'avez aucun transfert à organiser entre la journée de réunion, la soirée et la nuit.",
        },
      ],
      faits: [
        { label: 'Domaine', valeur: '80 hectares' },
        { label: 'Fondation', valeur: 'XIIe siècle' },
        { label: 'Rénovation', valeur: '2023' },
      ],
    },
    blocs: {
      // La page Chambres a ses propres paragraphes d'ouverture (rangs 2 et suivants) : la fiche garde les deux premiers.
      hebergement: [['chambres', 0], ['chambres', 1]],
      restauration: [['restauration', 0], ['restauration', 1], ['restauration', 2], ['soirees', 1]],
      acces: [['acces', 0], ['acces', 2], ['acces', 3]],
    },
    conseils: {
      lieu: "Ici, vos collaborateurs ne sont pas dans un centre de congrès, et ils le sentent dès leur arrivée. À 45 minutes de Paris, votre séminaire gagne une vraie coupure avec le quotidien.",
      hebergement: "Pour un séminaire résidentiel, pensez à loger votre comité de direction à la ferme : ses 38 chambres fonctionnent comme un hameau à l'écart, pendant que le reste de vos participants dort à l'abbaye et aux haras.",
      reunion: "Gardez la Grande Salle des Voûtes pour votre plénière : 150 participants sous une voûte du XIIe siècle, vos prises de parole marquent les esprits. Pour les ateliers, les salons des haras sont à deux pas.",
      restauration: "Sur un séminaire de plusieurs jours, alternez : déjeuner d'affaires au restaurant gastronomique, dîner de cohésion à la table italienne de la ferme, et dîner de gala de 250 convives sous les voûtes pour clore votre convention.",
      activites: "Laissez du temps libre dans le programme de votre séminaire : tennis, padel, barques sur le lac, vos participants choisissent. Pour souder le groupe, demandez-moi les olympiades dans le parc.",
      acces: "Pour les participants qui viennent à votre séminaire sans voiture : RER B ou train depuis Montparnasse, puis nous organisons le transfert du groupe depuis la gare, à 15 minutes du domaine.",
    },
  },
  'palais-royal-foret-chantilly': {
    titres: {
      lieu: 'Un château Louis XVI dans 5 hectares de forêt',
      hebergement: 'Séminaire résidentiel : {chambres} chambres et suites face à la forêt',
      reunion: '{salles} salons de séminaire autour d’un patio, plénière à la lumière du jour',
      restauration: 'Restaurant gastronomique et dîner de gala jusqu’à 200 couverts',
      activites: 'Team building en forêt de Chantilly et spa',
      acces: 'Venir en séminaire : à 20 min de Roissy, 45 min de Paris',
    },
    lieu: {
      intro:
        "Pour un séminaire résidentiel en pleine forêt, ce château 5 étoiles de style Louis XVI offre à vos équipes le calme d'un domaine privé, à 20 minutes de l'aéroport de Roissy. Construit au début du XXe siècle par un compositeur, il se dresse dans un parc de 5 hectares au cœur de la forêt de Chantilly.",
      blocs: [
        {
          titre: 'Un château né de la musique',
          texte:
            "Façade classique ornée de bas-reliefs, salons qui portent des noms de compositeurs, ancienne bibliothèque aux boiseries d'origine : chaque espace raconte une histoire à vos participants. Ce cadre donne du relief aux temps forts de votre convention.",
        },
        {
          titre: 'La forêt à la porte des salons',
          texte:
            "Les salons de réunion ouvrent directement sur le domaine : votre groupe passe de la séance de travail à la terrasse en quelques pas. Un sentier d'une vingtaine de minutes fait le tour du parc, pour une réunion en marchant ou une pause au grand air.",
        },
        {
          titre: 'Un point de rendez-vous pour les équipes internationales',
          texte:
            "À 45 minutes de Paris et à 20 minutes de Roissy, le château réunit facilement des collaborateurs venus de province ou de l'étranger. Labellisé Clef Verte, il répond aussi aux engagements environnementaux de votre entreprise.",
        },
      ],
      faits: [
        { label: 'Parc', valeur: '5 hectares' },
        { label: 'Classement', valeur: '5 étoiles' },
        { label: 'Label', valeur: 'Clef Verte' },
      ],
    },
    blocs: {
      restauration: [['restauration', 0], ['restauration', 1], ['restauration', 2], ['soirees', 0]],
    },
    conseils: {
      lieu: "Pour un séminaire avec des équipes internationales, c'est l'adresse la plus simple : vos collaborateurs atterrissent à Roissy et sont au château 20 minutes plus tard, en pleine forêt.",
      hebergement: "Pour un séminaire résidentiel en grand groupe, 45 chambres se convertissent en twin. Et gardez les 18 suites pour vos intervenants et votre direction.",
      reunion: "Votre plénière de 250 participants se cloisonne l'après-midi pour les ateliers : vous passez de la séance commune aux sous-commissions sans changer de bâtiment. Les pauses se prennent dans le patio.",
      restauration: "Pour le dîner de gala de votre convention, la salle plénière reçoit jusqu'à 200 convives. Et pour animer un déjeuner de séminaire, demandez-moi le show cooking, dès 15 participants.",
      activites: "Pour souder vos équipes pendant le séminaire : olympiades dans le parc ou atelier crème Chantilly avec notre chef pâtissier. Et entre deux sessions de travail, l'espace bien-être attend vos participants.",
      acces: "Pour un séminaire avec des participants venus de l'étranger : Roissy est à 20 minutes, et nous organisons les transferts privés du groupe depuis l'aéroport ou la gare.",
    },
  },
  'hotel-historique-seminaire-paris-92': {
    titres: {
      lieu: 'Un domaine du XVIIe siècle face à la tour Eiffel',
      hebergement: 'Séminaire résidentiel : {chambres} chambres et suites aux portes de Paris',
      reunion: '{salles} espaces de réunion à la lumière du jour, côté jardin',
      restauration: 'Cuisine du potager, déjeuner en terrasse et cocktail au jardin',
      activites: 'Team building, masterclass et spa',
      acces: 'Venir en séminaire : en métro, à 5 min à pied',
    },
    lieu: {
      intro:
        "Pour un séminaire résidentiel sans quitter Paris, ce domaine du XVIIe siècle offre à vos équipes un jardin au calme, avec la tour Eiffel à l'horizon. Devenu hôtel 5 étoiles, il se rejoint en métro : vos participants arrivent sans navette ni transfert.",
      blocs: [
        {
          titre: 'Quatre siècles d’histoire',
          texte:
            "Au début du XVIIe siècle, une reine de France fuyant la peste trouvait refuge sur cette colline. Bâtiment classé, chapelle ornée de statues et de vitraux : ce patrimoine donne du caractère aux temps forts de votre événement d'entreprise.",
        },
        {
          titre: 'Un jardin de 9 500 m² face à la capitale',
          texte:
            "Potager, verger et terrasses composent le décor des pauses de votre groupe. On oublie la ville, alors que Paris est à quelques stations de métro : un vrai changement d'air pour vos collaborateurs, sans temps de trajet.",
        },
        {
          titre: 'L’intimité d’un boutique-hôtel',
          texte:
            "Ici, votre séminaire n'est pas noyé dans un hôtel de congrès : le domaine reçoit des réunions jusqu'à 70 participants, dans une atmosphère intimiste qui favorise les échanges. Labellisé Clef Verte, il répond aussi aux engagements environnementaux de votre entreprise.",
        },
      ],
      faits: [
        { label: 'Jardin', valeur: '9 500 m²' },
        { label: 'Classement', valeur: '5 étoiles' },
        { label: 'Label', valeur: 'Clef Verte' },
      ],
    },
    blocs: {
      // La page Chambres a ses propres paragraphes d'ouverture (rangs 2 et suivants) : la fiche garde les deux premiers.
      hebergement: [['chambres', 0], ['chambres', 1]],
      restauration: [['restauration', 0], ['restauration', 1], ['restauration', 2], ['soirees', 2]],
      acces: [['acces', 0], ['acces', 2], ['acces', 3]],
    },
    conseils: {
      lieu: "Pour un séminaire à Paris sans l'ambiance d'un hôtel de congrès : vos participants arrivent en métro et se retrouvent dans un jardin, avec la tour Eiffel à l'horizon.",
      hebergement: "Pour un séminaire résidentiel, les 30 chambres communicantes logent vos équipes côte à côte. Et réservez les chambres avec vue sur la tour Eiffel à votre comité de direction.",
      reunion: "Pour un comité de direction, demandez-moi la chapelle : une réunion stratégique à 14 autour d'une même table, sous 7 mètres de plafond. Vos participants s'en souviendront.",
      restauration: "Aux beaux jours, installez le déjeuner de votre séminaire sur la terrasse, jusqu'à 70 convives, puis le cocktail au jardin. La cuisine du potager s'adapte aux régimes de vos participants.",
      activites: "Pour clore une journée de séminaire, la masterclass de rhum dans la chapelle réunit le groupe autour d'un même récit. Entre deux sessions de travail, le spa est ouvert à vos participants.",
      acces: "Pour un séminaire à Paris, vos participants viennent en métro : le métro s'arrête à 5 minutes à pied. Aucune navette à organiser pour le groupe.",
    },
  },
};

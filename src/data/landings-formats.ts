/**
 * Landings par format d'événement.
 *
 * Chacune répond à une demande mesurée dans Search Console sur 16 mois et pour
 * laquelle aucune page n'existait :
 *   team building chantilly ......... 1 504 impressions, position 12, 2 clics
 *   team building 92 (+ communes) ...   157 impressions, 0 clic
 *   team building 95 (+ communes) ...    93 impressions, 0 clic
 *   journée d'étude / programme .....   562 impressions, 0 clic
 */

export interface LandingFormat {
  slug: string;
  /** Départements dont les lieux alimentent la page. */
  departements: string[];
  /** Nombre de lieux affichés au maximum. */
  limite?: number;
  /** Tri : capacité décroissante, ou nombre de salles décroissant. */
  tri?: "capacite" | "salles";
  title: string;
  description: string;
  eyebrow: string;
  h1: string;
  intro: string;
  reponseDirecte: string;
  /** Catégorie d'activités à afficher, si pertinent. */
  activites?: "tb" | "soiree";
  nbActivites?: number;
  sections: { titre: string; paragraphes: string[] }[];
  faq: { question: string; reponse: string }[];
  titreLieux: string;
  sousTitreLieux: string;
}

export const landingsFormats: LandingFormat[] = [
  {
    slug: "team-building-chantilly",
    departements: ["60"],
    tri: "capacite",
    title: "Team Building à Chantilly : 13 Domaines et 40 Activités [2026]",
    description:
      "Organiser un team building à Chantilly : 13 domaines privatisables de 40 à 500 personnes, forêt de 6 300 hectares, 40 activités de cohésion. À 35 min de Paris. Devis sous 48 h.",
    eyebrow: "Chantilly · Oise",
    h1: "Team building à Chantilly",
    intro:
      "Treize domaines privatisables au cœur de la forêt de Chantilly, de 40 à 500 personnes, à 35 minutes de Paris. La plus grande forêt d'Île-de-France sert de terrain de jeu : rallyes, olympiades, courses d'orientation, escape games dans des châteaux du XIXe.",
    reponseDirecte:
      "Chantilly accueille les team buildings d'entreprise de 40 à 500 personnes, à 35 minutes de Paris et 25 minutes de Roissy-CDG. Select Châteaux y référence 13 domaines privatisables, dont 11 avec hébergement, et propose une quarantaine d'activités de cohésion en intérieur comme en extérieur. Devis sous 48 h.",
    activites: "tb",
    nbActivites: 9,
    titreLieux: "Nos 13 domaines à Chantilly et dans l'Oise",
    sousTitreLieux:
      "De 40 à 500 personnes, la plupart avec hébergement sur place. Capacités et équipements réels — pas d'estimation.",
    sections: [
      {
        titre: "Pourquoi Chantilly pour un team building",
        paragraphes: [
          "La forêt : 6 300 hectares de forêt domaniale font de Chantilly le plus grand terrain de jeu naturel aux portes de Paris. Course d'orientation, rallye photo, olympiades, biathlon laser, accrobranche : les formats outdoor qui demandent de l'espace y sont réalisables sans transfert depuis le lieu de séminaire.",
          "Le patrimoine comme décor : châteaux du XIXe, écuries monumentales, hippodrome. Un escape game ou une murder party prennent une autre dimension dans un château privatisé que dans une salle louée. C'est aussi le format sur lequel nos clients reviennent le plus — notre article sur la murder party en château est la page la plus consultée du site.",
          "L'accès : 35 minutes de Paris par l'A1, 25 minutes de Roissy-CDG, et une gare desservie par le TER depuis Gare du Nord en 25 minutes. C'est la destination la plus rapide d'accès de tout notre périmètre pour un groupe venant du nord de Paris ou de l'aéroport.",
        ],
      },
    ],
    faq: [
      {
        question: "Combien coûte un team building à Chantilly ?",
        reponse:
          "Une activité de cohésion se situe généralement entre 45 et 90 € par personne selon le format et la durée. En journée complète avec lieu, restauration et animation, le budget observé sur nos devis dans l'Oise tourne autour de 540 € par personne. Le nombre de participants fait fortement varier le prix unitaire.",
      },
      {
        question: "Quelle capacité pour un team building à Chantilly ?",
        reponse:
          "De 40 à 500 personnes selon le domaine. Six lieux dépassent 250 personnes, ce qui permet des formats convention avec ateliers de cohésion en parallèle.",
      },
      {
        question: "Peut-on faire un team building en extérieur toute l'année ?",
        reponse:
          "Oui, mais le choix d'activités change. D'avril à octobre, la forêt et les parcs permettent rallyes, olympiades et courses d'orientation. Hors saison, les formats indoor prennent le relais : escape game, murder party, ateliers culinaires, challenges digitaux. La plupart de nos domaines proposent les deux.",
      },
      {
        question: "Team building et séminaire le même jour, c'est possible ?",
        reponse:
          "C'est le format le plus courant : plénière le matin, déjeuner sur place, activité de cohésion l'après-midi. Onze de nos treize domaines disposent d'hébergement, ce qui permet d'enchaîner sur une soirée et une seconde journée sans transfert.",
      },
    ],
  },
  {
    slug: "team-building-hauts-de-seine-92",
    departements: ["92"],
    tri: "capacite",
    title: "Team Building Hauts-de-Seine (92) : 6 Lieux Accessibles en Métro",
    description:
      "Team building dans les Hauts-de-Seine : 6 lieux privatisables de 30 à 350 personnes, accessibles en métro depuis Paris. Boulogne, Issy, Puteaux, Clamart. Devis sous 48 h.",
    eyebrow: "Hauts-de-Seine · 92",
    h1: "Team building dans les Hauts-de-Seine (92)",
    intro:
      "Six lieux privatisables aux portes immédiates de Paris, de 30 à 350 personnes, accessibles en métro ou en RER. C'est le choix des équipes qui ne veulent perdre ni une demi-journée de transport ni la possibilité de rentrer le soir.",
    reponseDirecte:
      "Les Hauts-de-Seine (92) accueillent les team buildings de 30 à 350 personnes à moins de 30 minutes du centre de Paris, en métro ou en RER. Select Châteaux y référence 6 lieux privatisables — de la péniche au domaine avec spa — et propose une quarantaine d'activités de cohésion. Devis sous 48 h.",
    activites: "tb",
    nbActivites: 6,
    titreLieux: "Nos 6 lieux dans les Hauts-de-Seine",
    sousTitreLieux:
      "De 30 à 350 personnes, tous à moins de 30 minutes du centre de Paris. Suresnes, Puteaux, Issy-les-Moulineaux, Ville-d'Avray, Malakoff, Clamart.",
    sections: [
      {
        titre: "Pourquoi le 92 pour un team building",
        paragraphes: [
          "Zéro logistique de transport : c'est le seul département de notre périmètre où les participants viennent par leurs propres moyens, en métro, tramway ou RER. Pas de navette à affréter, pas de retard de car, et chacun rentre chez soi le soir. Sur un format d'une demi-journée ou d'une soirée, cet argument prime souvent sur le cadre.",
          "Des formats courts et denses : les lieux du 92 se prêtent aux afterworks d'équipe, aux demi-journées de cohésion et aux soirées de fin d'année, davantage qu'aux résidentiels de trois jours. Nos six adresses vont de 30 à 350 personnes, ce qui couvre aussi bien l'équipe projet que la direction régionale.",
          "Le contrepoint : c'est aussi le département le plus cher de notre périmètre — autour de 635 € par personne et par jour en résidentiel, contre 363 € dans le Val-d'Oise. Sur un format résidentiel, l'arbitrage penche presque toujours vers un autre département.",
        ],
      },
    ],
    faq: [
      {
        question: "Quels lieux de team building dans les Hauts-de-Seine ?",
        reponse:
          "Nous référençons six lieux privatisables dans le 92, de 30 à 350 personnes, à Suresnes, Puteaux, Issy-les-Moulineaux, Ville-d'Avray, Malakoff et Clamart. Ils vont du restaurant événementiel au domaine avec spa.",
      },
      {
        question: "Peut-on venir en transports en commun ?",
        reponse:
          "C'est l'intérêt principal du département. Tous nos lieux du 92 sont accessibles en métro, tramway ou RER depuis Paris en moins de 30 minutes. Aucune navette à prévoir.",
      },
      {
        question: "Quel budget pour un team building dans le 92 ?",
        reponse:
          "Une activité de cohésion se situe entre 45 et 90 € par personne. En journée complète avec lieu et restauration, le budget observé dans le département tourne autour de 635 € par personne — le plus élevé de notre périmètre, la proximité de Paris se payant.",
      },
    ],
  },
  {
    slug: "team-building-val-d-oise-95",
    departements: ["95"],
    tri: "capacite",
    title: "Team Building Val-d'Oise (95) : 11 Lieux de 13 à 600 pers.",
    description:
      "Team building dans le Val-d'Oise : 11 lieux privatisables de 13 à 600 personnes, du Vexin à Roissy. Le département le plus abordable d'Île-de-France. Devis sous 48 h.",
    eyebrow: "Val-d'Oise · 95",
    h1: "Team building dans le Val-d'Oise (95)",
    intro:
      "Onze lieux privatisables au nord de Paris, de 13 à 600 personnes. Entre le parc naturel du Vexin et le pôle de Roissy, le Val-d'Oise offre le meilleur rapport cadre-budget de notre périmètre pour les activités de cohésion en extérieur.",
    reponseDirecte:
      "Le Val-d'Oise (95) accueille les team buildings de 13 à 600 personnes, à 30 à 55 minutes de Paris et moins de 30 minutes de Roissy-CDG. Select Châteaux y référence 11 lieux privatisables, dont une abbaye de 600 personnes, et propose une quarantaine d'activités de cohésion. C'est le département le plus abordable de notre périmètre. Devis sous 48 h.",
    activites: "tb",
    nbActivites: 6,
    titreLieux: "Nos 11 lieux dans le Val-d'Oise",
    sousTitreLieux:
      "De 13 à 600 personnes, du Vexin français au secteur de Roissy. Capacités et équipements réels.",
    sections: [
      {
        titre: "Pourquoi le Val-d'Oise pour un team building",
        paragraphes: [
          "Le meilleur rapport cadre-budget : avec un budget observé autour de 363 € par personne et par jour, le Val-d'Oise est le département le plus abordable de notre périmètre — pour un patrimoine qui n'a rien à envier aux Yvelines. Sur une activité de cohésion, l'économie porte surtout sur le lieu et la restauration.",
          "Le Vexin français : parc naturel régional, il offre des domaines isolés avec de grands espaces extérieurs, parfaits pour les formats outdoor qui demandent du terrain. Course d'orientation, rallye, olympiades y sont réalisables sans quitter la propriété.",
          "Roissy à moins de 30 minutes : dès qu'une partie des participants arrive en avion, le Val-d'Oise fait gagner une demi-journée de logistique par rapport à un lieu situé au sud ou à l'ouest de Paris.",
        ],
      },
    ],
    faq: [
      {
        question: "Quels lieux de team building dans le Val-d'Oise ?",
        reponse:
          "Nous référençons onze lieux privatisables dans le 95, de 13 à 600 personnes, entre le Vexin français, Asnières-sur-Oise, Viarmes, Cergy et le secteur de Roissy.",
      },
      {
        question: "Quel budget pour un team building dans le 95 ?",
        reponse:
          "Une activité de cohésion se situe entre 45 et 90 € par personne. En journée complète avec lieu et restauration, le budget observé dans le département tourne autour de 363 € par personne — le plus bas de notre périmètre en Île-de-France.",
      },
      {
        question: "Le Val-d'Oise convient-il aux grands groupes ?",
        reponse:
          "Oui. Le plus grand de nos domaines dans le département accueille 600 personnes, ce qui en fait l'un des deux plus grands sites de notre périmètre, avec la Seine-et-Marne.",
      },
    ],
  },
  {
    slug: "journee-etude-seminaire",
    departements: ["78", "60", "77", "95", "91", "92"],
    tri: "salles",
    limite: 12,
    title: "Journée d'Étude en Château : Organiser, Budget, Programme Type 2026",
    description:
      "Organiser une journée d'étude : différence avec le séminaire résidentiel, programme type heure par heure, budget réel par personne, et 12 lieux équipés à moins d'une heure de Paris. Devis sous 48 h.",
    eyebrow: "Format · Journée d'étude",
    h1: "Journée d'étude en château",
    intro:
      "Une journée d'étude, c'est une journée de travail hors des murs de l'entreprise, sans nuitée : arrivée le matin, plénière, déjeuner, ateliers, départ en fin d'après-midi. C'est le format le plus demandé et le moins coûteux — voici comment l'organiser, ce qu'il faut prévoir et où le faire.",
    reponseDirecte:
      "Une journée d'étude est un séminaire d'entreprise sans hébergement : arrivée entre 8 h 30 et 9 h, plénière, déjeuner sur place, ateliers l'après-midi, départ vers 17 h. Elle coûte environ trois fois moins qu'un résidentiel de deux jours et ne nécessite qu'une salle, une restauration et un accès rapide. Select Châteaux référence 68 lieux équipés en Île-de-France. Devis sous 48 h.",
    titreLieux: "12 lieux adaptés à une journée d'étude",
    sousTitreLieux:
      "Sélectionnés sur le nombre de salles de réunion disponibles — le critère qui compte quand il faut enchaîner plénière et ateliers en sous-commissions.",
    sections: [
      {
        titre: "Journée d'étude ou séminaire résidentiel : que choisir",
        paragraphes: [
          "La journée d'étude convient quand l'objectif est de travailler : lancement de projet, revue de trimestre, atelier de cadrage, formation. Pas de nuitée, donc pas de budget hébergement ni de contrainte familiale pour les participants. C'est le format qui obtient le meilleur taux de présence.",
          "Le résidentiel devient nécessaire quand l'objectif est la cohésion. C'est le dîner et la soirée qui créent les liens informels, pas la salle de réunion. Si votre séminaire vise à souder une équipe récemment recomposée ou à intégrer de nouveaux arrivants, une journée ne suffira pas.",
          "Le critère budgétaire est net : sur nos devis, un résidentiel de deux jours revient à environ trois fois le coût d'une journée d'étude, hébergement et dîner compris. À budget constant, on peut faire trois journées d'étude dans l'année plutôt qu'un résidentiel unique — un arbitrage qui dépend de l'objectif, pas du prix.",
        ],
      },
      {
        titre: "Programme type d'une journée d'étude",
        paragraphes: [
          "8 h 30 — Accueil café et viennoiseries. Prévoyez 30 minutes : c'est le temps réel entre le premier et le dernier arrivant sur un groupe de 30 personnes, et c'est aussi le premier moment d'échange informel.",
          "9 h 00 — Plénière. Deux heures maximum avant la première pause : au-delà, l'attention chute nettement. Si votre contenu dépasse ce format, découpez-le en deux séquences séparées par un temps actif.",
          "11 h 00 — Ateliers en sous-groupes. C'est ici que le nombre de salles compte : trois ateliers en parallèle demandent trois salles distinctes, pas une grande salle cloisonnée. C'est le premier point à vérifier avec le lieu.",
          "12 h 30 — Déjeuner. Assis plutôt que debout si l'après-midi est chargé, en buffet si vous voulez que les gens circulent et se mélangent. Le choix n'est pas anodin sur l'ambiance de l'après-midi.",
          "14 h 00 — Restitution puis séquence active. L'après-midi d'une journée d'étude est le moment le plus difficile à tenir. Une activité courte de cohésion, même 45 minutes, relance nettement mieux qu'une troisième présentation.",
          "16 h 30 — Synthèse et prochaines étapes. Terminez par les décisions et les responsables, pas par un remerciement. C'est ce que les participants retiendront et ce qui rend la journée utile.",
        ],
      },
    ],
    faq: [
      {
        question: "Qu'est-ce qu'une journée d'étude en entreprise ?",
        reponse:
          "C'est un séminaire de travail d'une journée, sans hébergement, organisé hors des locaux de l'entreprise. Arrivée le matin, plénière, déjeuner sur place, ateliers l'après-midi, départ en fin de journée. L'objectif est de produire — cadrage, formation, revue — plutôt que de souder une équipe.",
      },
      {
        question: "Quelle est la durée idéale d'une journée d'étude ?",
        reponse:
          "De 8 h 30 à 17 h, soit environ huit heures dont une heure trente de déjeuner et deux pauses. Au-delà, la valeur ajoutée décroît nettement. Si le contenu ne tient pas, mieux vaut deux journées séparées qu'une journée étirée.",
      },
      {
        question: "Combien coûte une journée d'étude par personne ?",
        reponse:
          "Comptez environ un tiers du budget d'un résidentiel de deux jours, l'hébergement et le dîner représentant l'essentiel de l'écart. Le prix dépend surtout du lieu, du niveau de restauration et de la présence ou non d'une activité l'après-midi.",
      },
      {
        question: "Combien de salles faut-il prévoir ?",
        reponse:
          "Une salle plénière plus une salle par atelier tenu en parallèle. C'est le point le plus souvent sous-estimé : trois ateliers simultanés demandent trois salles distinctes. Nous filtrons nos lieux sur ce critère.",
      },
      {
        question: "Journée d'étude dans nos locaux ou à l'extérieur ?",
        reponse:
          "À l'extérieur dès que l'objectif demande de la concentration ou une prise de recul. En interne, les participants restent joignables et retournent à leur poste aux pauses — ce qui vide la journée de son intérêt. C'est la raison principale pour laquelle les entreprises sortent.",
      },
    ],
  },
];

export function getLandingFormat(slug: string) {
  return landingsFormats.find(l => l.slug === slug);
}

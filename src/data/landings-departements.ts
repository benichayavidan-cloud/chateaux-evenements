/**
 * Landings départementales — Essonne (91), Seine-et-Marne (77), Val-d'Oise (95).
 *
 * Ces trois départements concentrent 357 demandes de devis et 93 devis reçus
 * dans le CRM, et n'avaient aucune page. Les chiffres ci-dessous sont tous
 * dérivés des données réelles (src/data/venues.ts et devis du CRM) — le budget
 * affiché est le prix d'achat médian majoré de la marge de 10 %.
 */

export interface LandingDepartement {
  slug: string;
  code: string;
  departement: string;
  title: string;
  description: string;
  eyebrow: string;
  h1: string;
  intro: string;
  /** 40 à 60 mots, factuels — c'est ce que les moteurs de réponse extraient. */
  reponseDirecte: string;
  /** Budget client par personne et par jour, marge incluse. */
  budget: { min: number; median: number; max: number; nbDevis: number };
  sections: { titre: string; paragraphes: string[] }[];
  faq: { question: string; reponse: string }[];
}

export const landingsDepartements: LandingDepartement[] = [
  {
    slug: "seminaire-chateau-essonne-91",
    code: "91",
    departement: "Essonne",
    title: "Séminaire Château Essonne (91) : 7 Domaines de 140 à 450 pers.",
    description:
      "7 lieux de séminaire vérifiés en Essonne, de 140 à 450 personnes, tous avec hébergement jusqu'à 298 chambres. Budget observé dès 430 € par personne. Devis sous 48 h.",
    eyebrow: "Essonne · 91",
    h1: "Séminaire en château en Essonne (91)",
    intro:
      "Sept domaines privatisables au sud de Paris, de 140 à 450 personnes, tous équipés pour le résidentiel. L'Essonne combine un accès rapide par l'A6 et la N20 et des tarifs sensiblement inférieurs aux Yvelines, sans perdre le cadre historique.",
    reponseDirecte:
      "Select Châteaux référence 7 lieux de séminaire en Essonne (91), de 140 à 450 personnes, tous disposant d'hébergement — jusqu'à 298 chambres sur un même site. Le budget observé sur nos devis se situe autour de 430 € par personne et par jour en résidentiel. Devis sous 48 h.",
    budget: { min: 300, median: 430, max: 620, nbDevis: 36 },
    sections: [
      {
        titre: "Pourquoi l'Essonne pour un séminaire d'entreprise",
        paragraphes: [
          "Accès : le département est traversé par l'A6 et la N20, et desservi par le RER B et C. Depuis Paris, comptez 35 à 55 minutes selon la commune — Saclay est à 30 minutes de Montparnasse, Bouray-sur-Juine à 45 minutes de Gare de Lyon. Orly est à moins de 30 minutes de la plupart des domaines, un atout réel quand une partie des participants arrive en avion.",
          "Le rapport capacité-budget : c'est l'argument le plus concret de l'Essonne. Sur nos 36 devis reçus dans le département, le budget client médian ressort autour de 430 € par personne et par jour en résidentiel — nettement en dessous des Hauts-de-Seine, pour des domaines souvent plus vastes et davantage tournés vers l'extérieur.",
          "Le résidentiel sans compromis : les 7 lieux référencés disposent tous d'hébergement, ce qui est rare à cette distance de Paris. Le plus grand offre 298 chambres et 15 salles de réunion sur un seul site — de quoi tenir une convention de 300 personnes sans aucun transfert entre le lieu de plénière et l'hôtel.",
        ],
      },
    ],
    faq: [
      {
        question: "Combien coûte un séminaire en château en Essonne ?",
        reponse:
          "Sur les 36 devis que nous avons traités dans le département, le budget client se situe le plus souvent entre 300 et 620 € par personne et par jour en résidentiel, avec une médiane autour de 430 €. Le prix dépend surtout du nombre de nuits, de la saison et du niveau de prestation — pas du lieu lui-même.",
      },
      {
        question: "Quelle capacité maximale pour un séminaire en Essonne ?",
        reponse:
          "Le plus grand domaine que nous référençons dans le 91 accueille 450 personnes. Quatre lieux dépassent 220 personnes. Pour un format au-delà de 450, il faut regarder la Seine-et-Marne ou l'Oise.",
      },
      {
        question: "Peut-on organiser un séminaire résidentiel en Essonne ?",
        reponse:
          "Oui, et c'est la particularité du département : les 7 lieux que nous référençons disposent tous d'hébergement sur place, de quelques chambres à 298. Aucun transfert entre la plénière et l'hôtel.",
      },
      {
        question: "Combien de temps depuis Paris ?",
        reponse:
          "Entre 35 et 55 minutes en voiture selon la commune. Saclay est à 30 minutes de Montparnasse en RER B, Bouray-sur-Juine à 45 minutes de Gare de Lyon par le RER C. Orly est à moins de 30 minutes de la plupart des domaines.",
      },
    ],
  },
  {
    slug: "seminaire-chateau-seine-et-marne-77",
    code: "77",
    departement: "Seine-et-Marne",
    title: "Séminaire Château Seine-et-Marne (77) : 10 Lieux jusqu'à 600 pers.",
    description:
      "10 lieux de séminaire vérifiés en Seine-et-Marne, de 40 à 600 personnes, jusqu'à 396 chambres. De Fontainebleau à Provins. Budget observé dès 421 € par personne. Devis sous 48 h.",
    eyebrow: "Seine-et-Marne · 77",
    h1: "Séminaire en château en Seine-et-Marne (77)",
    intro:
      "Dix lieux privatisables à l'est de Paris, de 40 à 600 personnes. C'est le département le plus polyvalent d'Île-de-France : forêt de Fontainebleau, cité médiévale de Provins, resorts de Marne-la-Vallée, avec la plus grosse capacité d'hébergement de la région.",
    reponseDirecte:
      "Select Châteaux référence 10 lieux de séminaire en Seine-et-Marne (77), de 40 à 600 personnes, dont 9 avec hébergement — jusqu'à 396 chambres sur un même site. Le budget observé sur nos devis se situe autour de 421 € par personne et par jour en résidentiel. Devis sous 48 h.",
    budget: { min: 290, median: 421, max: 610, nbDevis: 38 },
    sections: [
      {
        titre: "Pourquoi la Seine-et-Marne pour un séminaire d'entreprise",
        paragraphes: [
          "La capacité d'hébergement la plus élevée d'Île-de-France : avec jusqu'à 396 chambres sur un seul site, la Seine-et-Marne est le seul département de la région où l'on héberge une convention de plusieurs centaines de personnes sans répartir le groupe sur plusieurs hôtels. Neuf de nos dix lieux disposent d'hébergement.",
          "Trois univers dans un seul département : la forêt de Fontainebleau pour la nature et les activités outdoor, Provins et sa cité médiévale classée pour les séminaires à forte dimension patrimoniale, et le secteur de Marne-la-Vallée pour les formats resort avec grandes capacités et accès RER A direct. Peu de départements offrent cette variété.",
          "L'accès : l'A4 et l'A5 desservent le département, le RER A dessert Marne-la-Vallée en 40 minutes depuis Châtelet, et le RER D relie Melun. Fontainebleau est à 1 heure de Paris par l'A6. Roissy-CDG est à 45 minutes du nord du département.",
        ],
      },
    ],
    faq: [
      {
        question: "Combien coûte un séminaire en château en Seine-et-Marne ?",
        reponse:
          "Sur les 38 devis que nous avons traités dans le département, le budget client se situe le plus souvent entre 290 et 610 € par personne et par jour en résidentiel, avec une médiane autour de 421 €. Le nombre de nuits et la saison pèsent davantage que le choix du lieu.",
      },
      {
        question: "Quel est le plus grand lieu de séminaire en Seine-et-Marne ?",
        reponse:
          "Le plus grand domaine que nous référençons accueille 600 personnes. Un autre dispose de 396 chambres, la plus forte capacité d'hébergement de toute l'Île-de-France sur un site unique.",
      },
      {
        question: "Peut-on faire un séminaire à Fontainebleau ?",
        reponse:
          "Oui. Nous référençons un lieu à Ury, en lisière de la forêt de Fontainebleau, de 200 personnes avec 126 chambres. La forêt se prête particulièrement aux activités de cohésion en extérieur.",
      },
      {
        question: "Combien de temps depuis Paris ?",
        reponse:
          "De 40 minutes à 1 heure selon le secteur. Marne-la-Vallée est à 40 minutes de Châtelet par le RER A, Fontainebleau à 1 heure par l'A6, Provins à 1 h 15. Roissy-CDG est à 45 minutes du nord du département.",
      },
    ],
  },
  {
    slug: "seminaire-chateau-val-d-oise-95",
    code: "95",
    departement: "Val-d'Oise",
    title: "Séminaire Château Val-d'Oise (95) : 11 Lieux de 13 à 600 pers.",
    description:
      "11 lieux de séminaire vérifiés dans le Val-d'Oise, de 13 à 600 personnes. Abbaye, Vexin, proximité Roissy-CDG. Budget observé dès 363 € par personne. Devis sous 48 h.",
    eyebrow: "Val-d'Oise · 95",
    h1: "Séminaire en château dans le Val-d'Oise (95)",
    intro:
      "Onze lieux privatisables au nord de Paris, de 13 à 600 personnes. Le Val-d'Oise est le département le plus abordable de notre périmètre, et le mieux placé pour les événements avec participants internationaux : Roissy-CDG est à moins de 30 minutes de la plupart des domaines.",
    reponseDirecte:
      "Select Châteaux référence 11 lieux de séminaire dans le Val-d'Oise (95), de 13 à 600 personnes, dont 10 avec hébergement — jusqu'à 244 chambres. Le budget observé sur nos devis se situe autour de 363 € par personne et par jour en résidentiel, le plus bas de l'Île-de-France. Devis sous 48 h.",
    budget: { min: 250, median: 363, max: 540, nbDevis: 19 },
    sections: [
      {
        titre: "Pourquoi le Val-d'Oise pour un séminaire d'entreprise",
        paragraphes: [
          "Le budget le plus contenu de notre périmètre : sur nos 19 devis dans le département, le budget client médian ressort autour de 363 € par personne et par jour — le plus bas des six départements que nous couvrons, pour un patrimoine qui n'a rien à envier aux Yvelines. C'est l'arbitrage naturel quand l'enveloppe est serrée sans vouloir sacrifier le cadre.",
          "Roissy-CDG à moins de 30 minutes : c'est l'argument décisif dès qu'une partie des participants arrive par avion. Un séminaire avec des équipes internationales gagne une demi-journée de logistique par rapport à un lieu situé au sud ou à l'ouest de Paris.",
          "Deux profils très différents : d'un côté le Vexin français, parc naturel régional avec ses domaines isolés et ses abbayes — un des plus grands accueille 600 personnes ; de l'autre le secteur de Roissy et de Cergy, avec des capacités hôtelières importantes et un accès direct. Le département couvre aussi bien le comité de direction de 13 personnes que la convention de 600.",
        ],
      },
    ],
    faq: [
      {
        question: "Combien coûte un séminaire en château dans le Val-d'Oise ?",
        reponse:
          "Sur les 19 devis que nous avons traités dans le département, le budget client se situe le plus souvent entre 250 et 540 € par personne et par jour en résidentiel, avec une médiane autour de 363 € — le plus abordable des six départements que nous couvrons en Île-de-France.",
      },
      {
        question: "Quel lieu pour un petit comité de direction dans le 95 ?",
        reponse:
          "Nous référençons deux lieux de moins de 20 personnes dans le département, dont un château à 13 personnes. Ce sont les formats les plus adaptés à un CODIR confidentiel en privatisation totale.",
      },
      {
        question: "Le Val-d'Oise est-il adapté aux participants internationaux ?",
        reponse:
          "C'est son principal atout. Roissy-Charles-de-Gaulle est à moins de 30 minutes de la plupart de nos domaines, contre 1 h à 1 h 30 depuis les Yvelines ou l'Essonne. Sur un séminaire avec des équipes étrangères, c'est une demi-journée de logistique gagnée.",
      },
      {
        question: "Combien de temps depuis Paris ?",
        reponse:
          "De 30 à 55 minutes selon la commune. Le secteur de Roissy et Cergy est accessible par le RER A, B et D ; le Vexin se rejoint par l'A15 en 45 à 55 minutes depuis la Porte de Clichy.",
      },
    ],
  },
];

export function getLandingDepartement(slug: string) {
  return landingsDepartements.find(l => l.slug === slug);
}

/**
 * Références & études de cas — SOURCE : dossiers réels du CRM Select Châteaux.
 * RÈGLE : uniquement des données factuelles issues des dossiers (effectifs,
 * formats, budgets, nombre de lieux consultés, programmes). Les événements
 * non encore tenus sont marqués « En préparation » — jamais de résultat
 * inventé, jamais de citation fabriquée.
 */

export interface CaseStudy {
  id: string;
  client: string;
  secteur: string;
  format: string;
  participants: number;
  periode: string;
  statut: "realise" | "en-preparation";
  brief: string;
  reponse: string;
  chiffres: { label: string; valeur: string }[];
}

export const caseStudies: CaseStudy[] = [
  {
    id: "eiffage-seminaire-residentiel-50",
    client: "Eiffage Énergie Systèmes — Réseau Mobile",
    secteur: "Ingénierie & énergie",
    format: "Séminaire résidentiel · 2 jours",
    participants: 50,
    periode: "Juin 2026 — Gouvieux (Chantilly)",
    statut: "realise",
    brief:
      "Réunir 50 collaborateurs de la division Réseau Mobile pendant 2 jours : plénière de lancement, ateliers en sous-groupes, hébergement sur place et soirée de cohésion — le tout à moins d'une heure de Paris.",
    reponse:
      "Trois domaines mis en concurrence autour de Chantilly (dont deux châteaux et un campus d'exception). Après négociation, le séminaire a été confirmé au campus Les Fontaines à Gouvieux : 17 % d'économie par rapport à l'offre la plus haute, à prestations équivalentes. Déroulé millimétré du café d'accueil de 8h au départ du jour 2.",
    chiffres: [
      { label: "Lieux mis en concurrence", valeur: "3" },
      { label: "Budget final tout compris", valeur: "≈ 560 €/pers" },
      { label: "Économie vs offre la plus haute", valeur: "-17 %" },
    ],
  },
  {
    id: "safran-ai-seminaire-280",
    client: "Safran.AI",
    secteur: "Aéronautique & intelligence artificielle",
    format: "Séminaire résidentiel de rentrée",
    participants: 280,
    periode: "Septembre 2026 — Île-de-France",
    statut: "en-preparation",
    brief:
      "Le très grand format : 280 collaborateurs en résidentiel, une plénière unique, des espaces de travail en sous-groupes et une logistique bagagerie/navettes sans accroc, sur une base de 450 € HT par personne et par jour.",
    reponse:
      "Sourcing dédié grands campus et domaines à très forte capacité (Chantilly, Versailles, est parisien), avec comparatif capacité plénière / chambres / accès. Peu de lieux en Île-de-France absorbent 280 personnes en résidentiel : notre connaissance du parc fait gagner des semaines.",
    chiffres: [
      { label: "Participants", valeur: "280" },
      { label: "Base budgétaire", valeur: "450 € HT/pers/jour" },
      { label: "Format", valeur: "Plénière unique + ateliers" },
    ],
  },
  {
    id: "petits-chaperons-rouges-journee-200",
    client: "Les Petits Chaperons Rouges",
    secteur: "Éducation & petite enfance",
    format: "Journée d'étude",
    participants: 200,
    periode: "Septembre 2026 — Île-de-France",
    statut: "en-preparation",
    brief:
      "Une journée d'étude pour 200 personnes autour de 200 € par participant : accueil petit-déjeuner musical, plénière, ateliers et déjeuner assis — avec une vraie exigence d'ambiance.",
    reponse:
      "Neuf lieux consultés et chiffrés — abbayes, châteaux et lieux atypiques — pour comparer capacité en plénière, qualité traiteur et accessibilité en autocar depuis Paris.",
    chiffres: [
      { label: "Participants", valeur: "200" },
      { label: "Devis comparés", valeur: "9" },
      { label: "Budget cible", valeur: "≈ 200 €/pers" },
    ],
  },
  {
    id: "boston-scientific-soiree-120",
    client: "Boston Scientific",
    secteur: "Dispositifs médicaux",
    format: "Soirée d'entreprise",
    participants: 120,
    periode: "Janvier 2027 — Île-de-France",
    statut: "en-preparation",
    brief:
      "Une soirée d'entreprise pour 120 invités avec un déroulé précis — apéritif 19h, allocution d'ouverture, dîner — dans une enveloppe maîtrisée de 13 000 € TTC.",
    reponse:
      "Douze lieux consultés, des abbayes millénaires aux châteaux-hôtels, pour trouver le cadre qui marque les esprits sans faire exploser le budget par couvert.",
    chiffres: [
      { label: "Invités", valeur: "120" },
      { label: "Lieux consultés", valeur: "12" },
      { label: "Enveloppe", valeur: "13 000 € TTC" },
    ],
  },
  {
    id: "lcl-seminaire-residentiel-80",
    client: "LCL",
    secteur: "Banque",
    format: "Séminaire résidentiel",
    participants: 80,
    periode: "Octobre 2026 — Yvelines / Seine-et-Marne",
    statut: "en-preparation",
    brief:
      "80 collaborateurs en résidentiel avec plénière, ateliers et nuit sur place, pour un budget global de 40 000 € TTC — soit 500 € par personne tout compris.",
    reponse:
      "Mise en concurrence de châteaux privatisables dans les Yvelines et en Seine-et-Marne (Villiers-le-Mahieu, Le Mée-sur-Seine, domaines de campagne), arbitrée sur le ratio salles/chambres/budget.",
    chiffres: [
      { label: "Participants", valeur: "80" },
      { label: "Budget global", valeur: "40 000 € TTC" },
      { label: "Zone", valeur: "78 / 77" },
    ],
  },
  {
    id: "stanley-robotics-journee-45",
    client: "Stanley Robotics",
    secteur: "Robotique",
    format: "Journée d'étude",
    participants: 45,
    periode: "Septembre 2026 — Île-de-France",
    statut: "en-preparation",
    brief:
      "45 personnes, une journée d'étude efficace (café d'accueil 8h30, plénière, ateliers) et un budget serré : 7 000 € HT maximum.",
    reponse:
      "Seize lieux consultés et chiffrés — la même mécanique de mise en concurrence que pour un événement à six chiffres, au service d'une scale-up. Résultat : le choix se fait sur des données, pas sur une plaquette.",
    chiffres: [
      { label: "Participants", valeur: "45" },
      { label: "Devis comparés", valeur: "16" },
      { label: "Budget max", valeur: "7 000 € HT" },
    ],
  },
];

/** Entreprises qui nous confient leurs événements (dossiers actifs ou réalisés du CRM). */
export const clientReferences: string[] = [
  "Eiffage Énergie Systèmes",
  "Safran.AI",
  "LCL",
  "Pacifica — Crédit Agricole Assurances",
  "GS1 France",
  "Boston Scientific",
  "Dentsu",
  "Quandela",
  "Les Petits Chaperons Rouges",
  "Stanley Robotics",
];

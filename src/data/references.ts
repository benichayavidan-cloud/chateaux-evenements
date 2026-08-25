/**
 * Références & études de cas — SOURCE : dossiers réels du CRM Select Châteaux.
 * RÈGLE : uniquement des données factuelles issues des dossiers (effectifs,
 * formats, budgets, nombre de lieux consultés, programmes). Les événements
 * non encore tenus sont marqués « En préparation » — jamais de résultat
 * inventé, jamais de citation fabriquée.
 *
 * Les chiffres agrégés (`agencyStats`) sont calculés sur la base CRM au
 * 25/08/2026 — à recalculer avant de les modifier, pas à estimer.
 */

export interface CaseStudy {
  id: string;
  client: string;
  secteur: string;
  format: string;
  /** Libellé court affiché en badge sur la carte. */
  categorie: string;
  participants: number;
  periode: string;
  statut: "realise" | "en-preparation";
  /** Accroche éditoriale de la carte (le bénéfice, pas la fiche technique). */
  accroche: string;
  brief: string;
  reponse: string;
  /** Points saillants affichés en liste sur la carte. */
  points: string[];
  chiffres: { label: string; valeur: string }[];
  image: string;
  imageAlt: string;
  /** Mis en avant en haut de page (cas vedette). */
  featured?: boolean;
}

export const caseStudies: CaseStudy[] = [
  {
    id: "eiffage-seminaire-residentiel-50",
    client: "Eiffage Énergie Systèmes",
    secteur: "Ingénierie & énergie",
    format: "Séminaire résidentiel · 2 jours",
    categorie: "Cas client · Réalisé",
    participants: 50,
    periode: "Juin 2026 — Chantilly",
    statut: "realise",
    accroche: "Séminaire résidentiel à Chantilly",
    brief:
      "Un lieu à moins d'une heure de Paris pour réunir 50 collaborateurs pendant 2 jours : plénière de lancement, ateliers en sous-groupes, hébergement sur place et soirée de cohésion.",
    reponse:
      "Sélection de 3 domaines compatibles autour de Chantilly, comparaison ligne à ligne et négociation complète des prestations.",
    points: [
      "3 domaines mis en concurrence",
      "Négociation des prestations",
      "Hébergement et soirée inclus",
    ],
    chiffres: [
      { label: "collaborateurs", valeur: "50" },
      { label: "vs. l'offre la plus élevée", valeur: "−17 %" },
      { label: "par personne, tout compris", valeur: "≈ 560 €" },
    ],
    image: "/images/chateau-anglo-normand-vue-aerienne-parc-foret-chantilly.webp",
    imageAlt: "Domaine d'exception à Chantilly pour séminaire résidentiel d'entreprise",
    featured: true,
  },
  {
    id: "safran-ai-seminaire-280",
    client: "Safran.AI",
    secteur: "Aéronautique & intelligence artificielle",
    format: "Séminaire résidentiel de rentrée",
    categorie: "Grand résidentiel",
    participants: 280,
    periode: "Septembre 2026 — Île-de-France",
    statut: "en-preparation",
    accroche: "Un résidentiel pour 280 collaborateurs",
    brief:
      "280 collaborateurs en résidentiel, une plénière unique, des espaces de travail en sous-groupes et une logistique bagagerie/navettes sans accroc, sur une base de 450 € HT par personne et par jour.",
    reponse:
      "Sourcing dédié aux domaines et campus à très forte capacité, avec comparatif capacité plénière, chambres et accès. Peu de lieux en Île-de-France absorbent 280 personnes en résidentiel : notre connaissance du parc fait gagner des semaines.",
    points: ["Plénière unique", "Ateliers & sous-commissions", "Hébergement & navettes"],
    chiffres: [
      { label: "participants", valeur: "280" },
      { label: "HT / pers. / jour", valeur: "450 €" },
    ],
    image: "/images/choisir-salle-configuration-theatre-cabaret-banquet-seminaire-chateau-2026.webp",
    imageAlt: "Grande plénière en château pour un séminaire de 280 personnes",
  },
  {
    id: "petits-chaperons-rouges-journee-200",
    client: "Les Petits Chaperons Rouges",
    secteur: "Éducation & petite enfance",
    format: "Journée d'étude",
    categorie: "Journée d'étude",
    participants: 200,
    periode: "Septembre 2026 — Île-de-France",
    statut: "en-preparation",
    accroche: "Faire travailler 200 collaborateurs sans sacrifier l'expérience",
    brief:
      "Une journée d'étude pour 200 personnes autour de 200 € par participant : accueil petit-déjeuner musical, plénière, ateliers et déjeuner assis — avec une vraie exigence d'ambiance.",
    reponse:
      "Neuf lieux consultés et chiffrés — abbayes, châteaux et lieux atypiques — pour comparer capacité en plénière, qualité traiteur et accessibilité en autocar depuis Paris.",
    points: ["9 lieux comparés"],
    chiffres: [
      { label: "/ pers. (déjeuner inclus)", valeur: "200 €" },
      { label: "participants", valeur: "200" },
    ],
    image: "/images/choisir-salle-pleniere-vs-ateliers-chateau-seminaire-guide-2026.webp",
    imageAlt: "Journée d'étude en château pour 200 collaborateurs",
  },
  {
    id: "boston-scientific-soiree-120",
    client: "Boston Scientific",
    secteur: "Dispositifs médicaux",
    format: "Soirée d'entreprise",
    categorie: "Soirée d'entreprise",
    participants: 120,
    periode: "Janvier 2027 — Île-de-France",
    statut: "en-preparation",
    accroche: "Un dîner d'entreprise dans une enveloppe de 13 000 €",
    brief:
      "Une soirée d'entreprise pour 120 invités avec un déroulé précis — apéritif 19h, allocution d'ouverture, dîner — dans une enveloppe maîtrisée de 13 000 € TTC.",
    reponse:
      "Douze lieux consultés, des abbayes millénaires aux châteaux-hôtels, pour trouver le cadre qui marque les esprits sans faire exploser le budget par couvert.",
    points: ["120 invités", "12 lieux consultés"],
    chiffres: [
      { label: "TTC, enveloppe tenue", valeur: "13 000 €" },
      { label: "invités", valeur: "120" },
    ],
    image: "/images/evenement-entreprise-abbaye-vaux-de-cernay-diner-refectoire-des-moines.webp",
    imageAlt: "Dîner d'entreprise dressé dans le réfectoire d'une abbaye en Île-de-France",
  },
  {
    id: "lcl-seminaire-residentiel-80",
    client: "LCL",
    secteur: "Banque",
    format: "Séminaire résidentiel",
    categorie: "Séminaire résidentiel",
    participants: 80,
    periode: "Octobre 2026 — Yvelines / Seine-et-Marne",
    statut: "en-preparation",
    accroche: "Héberger 80 personnes avec un budget global maîtrisé",
    brief:
      "80 collaborateurs en résidentiel avec plénière, ateliers et nuit sur place, pour un budget global de 40 000 € TTC — soit 500 € par personne tout compris.",
    reponse:
      "Mise en concurrence de châteaux privatisables dans les Yvelines et en Seine-et-Marne, arbitrée sur le ratio salles / chambres / budget.",
    points: ["80 participants", "Plénière + nuit sur place"],
    chiffres: [
      { label: "TTC, tout compris", valeur: "40 000 €" },
      { label: "zone recherchée", valeur: "78 / 77" },
    ],
    image: "/images/evenement-entreprise-abbaye-vaux-de-cernay-01-abbaye-des-vaux-de-cernay.webp",
    imageAlt: "Château privatisable dans les Yvelines pour séminaire résidentiel",
  },
  {
    id: "pacifica-seminaire-residentiel-70",
    client: "Pacifica — Crédit Agricole Assurances",
    secteur: "Assurance",
    format: "Séminaire résidentiel",
    categorie: "Séminaire résidentiel",
    participants: 70,
    periode: "Octobre 2026 — Île-de-France",
    statut: "en-preparation",
    accroche: "Un résidentiel qui démarre dès l'après-midi",
    brief:
      "70 collaborateurs accueillis en milieu de journée, installation en chambre puis lancement de la plénière dans la foulée : le programme ne perd pas une heure.",
    reponse:
      "Sélection de domaines capables d'enchaîner accueil, installation et plénière sans rupture, dans une enveloppe de 40 000 € TTC.",
    points: ["70 participants", "Accueil et plénière le jour 1"],
    chiffres: [
      { label: "par personne, tout compris", valeur: "≈ 570 €" },
      { label: "participants", valeur: "70" },
    ],
    image: "/images/evenement-entreprise-chateau-montvillargenne-salle-pleniere-brique.webp",
    imageAlt: "Salle plénière d'un château pour un séminaire résidentiel de 70 personnes",
  },
  {
    id: "stanley-robotics-journee-45",
    client: "Stanley Robotics",
    secteur: "Robotique",
    format: "Journée d'étude",
    categorie: "Journée d'étude",
    participants: 45,
    periode: "Septembre 2026 — Île-de-France",
    statut: "en-preparation",
    accroche: "La même exigence pour 45 personnes que pour 280",
    brief:
      "45 personnes, une journée d'étude efficace (café d'accueil 8h30, plénière, ateliers) et un budget serré : 7 000 € HT maximum.",
    reponse:
      "Seize lieux consultés et chiffrés — la même mécanique de mise en concurrence que pour un événement à six chiffres, au service d'une scale-up.",
    points: ["16 devis comparés", "Budget tenu"],
    chiffres: [
      { label: "HT, budget maximum", valeur: "7 000 €" },
      { label: "participants", valeur: "45" },
    ],
    image: "/images/amenagement-salle-reunions-chateau-conseils-2026.webp",
    imageAlt: "Salle de réunion en château pour une journée d'étude de 45 personnes",
  },
];

export const featuredCase = caseStudies.find((c) => c.featured)!;
export const otherCases = caseStudies.filter((c) => !c.featured);

/**
 * Chiffres agrégés — calculés sur la base CRM le 25/08/2026.
 * `moyenneLieux` : moyenne des demandes de devis par dossier (30,3 sur 31 dossiers).
 * `ecartOffres` : écart moyen entre l'offre la plus haute et la plus basse
 *                 sur les 21 dossiers ayant reçu au moins 3 devis (52 %).
 */
export const agencyStats = [
  { valeur: "30", label: "lieux consultés en moyenne par brief" },
  { valeur: "280", label: "participants sur un même événement" },
  { valeur: "52 %", label: "d'écart entre l'offre la plus haute et la plus basse" },
  { valeur: "−17 %", label: "négociés pour Eiffage vs. l'offre la plus élevée" },
];

export interface MethodStep {
  numero: string;
  titre: string;
  texte: string;
}

export const methodSteps: MethodStep[] = [
  {
    numero: "01",
    titre: "Brief",
    texte: "Vos objectifs, contraintes, participants et budget sont notre point de départ.",
  },
  {
    numero: "02",
    titre: "Sourcing",
    texte: "Sélection des domaines réellement compatibles avec votre événement.",
  },
  {
    numero: "03",
    titre: "Comparaison",
    texte: "Capacité, hébergement, restauration, accès et conditions évalués côte à côte.",
  },
  {
    numero: "04",
    titre: "Négociation",
    texte: "Optimisation du prix et des prestations. Transparence totale sur les offres reçues.",
  },
  {
    numero: "05",
    titre: "Coordination",
    texte: "Un seul interlocuteur jusqu'au jour J, de la réservation au débriefing.",
  },
];

export const galleryItems = [
  {
    label: "Plénières d'inspiration",
    image: "/images/choisir-salle-configuration-theatre-cabaret-banquet-seminaire-chateau-2026.webp",
    alt: "Plénière d'entreprise dans un château en Île-de-France",
  },
  {
    label: "Instants d'équipe",
    image: "/images/cohesion-equipe-team-building-chateau-activites.webp",
    alt: "Activité de cohésion d'équipe dans le parc d'un château",
  },
  {
    label: "Dîners et soirées",
    image: "/images/animer-soiree-gala-recompenses-equipe-commerciale-chateau-idf-2026.webp",
    alt: "Dîner de gala d'entreprise dans un château",
  },
  {
    label: "Châteaux d'exception",
    image: "/images/chateau-exception-seminaire-entreprise-ile-de-france.webp",
    alt: "Château d'exception privatisable en Île-de-France",
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

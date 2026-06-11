/**
 * CARTE DE MAILLAGE INTERNE SEO
 *
 * Liens blog↔blog générés à partir des données GSC.
 * Les pages faibles (haute impressions, mauvaise position) reçoivent
 * plus de liens entrants depuis les pages fortes.
 *
 * priority: 1-10 (10 = page la plus faible, besoin maximal de liens)
 * keywords: phrases spécifiques à matcher dans le contenu des AUTRES articles
 */

export interface BlogLinkRule {
  keywords: string[];
  targetSlug?: string;  // article blog → /blog/<slug>
  targetPath?: string;  // page landing/service (prioritaire sur targetSlug)
  title: string;
  priority: number;
}

export const BLOG_LINK_MAP: BlogLinkRule[] = [
  // ══════════════════════════════════════════════════════════════════════
  // RÈGLE CANONIQUE (anti-cannibalisation — voir scripts/agent-cm/seo-clusters.json)
  // Les mots-clés "tête" de cluster pointent vers les LANDING PAGES,
  // JAMAIS vers des articles de blog. Les articles sont des satellites.
  // ══════════════════════════════════════════════════════════════════════

  {
    keywords: ["séminaire Chantilly", "séminaire à Chantilly", "séminaire entreprise Chantilly", "séminaire en château à Chantilly", "organiser séminaire Chantilly", "guide organisateur Chantilly", "séminaire Chantilly guide"],
    targetPath: "/seminaire-chateau-chantilly",
    title: "Séminaire en château à Chantilly",
    priority: 10,
  },
  {
    keywords: ["séminaire Yvelines", "séminaire dans les Yvelines", "séminaire château Yvelines"],
    targetPath: "/seminaire-chateau-yvelines-78",
    title: "Séminaire en château dans les Yvelines",
    priority: 10,
  },
  {
    keywords: ["séminaire Oise", "séminaire dans l'Oise", "château séminaire Oise"],
    targetPath: "/seminaire-chateau-oise-60",
    title: "Séminaire en château dans l'Oise",
    priority: 10,
  },
  {
    keywords: ["séminaire vallée de Chevreuse", "séminaire en vallée de Chevreuse"],
    targetPath: "/seminaire-vallee-de-chevreuse",
    title: "Séminaire en Vallée de Chevreuse",
    priority: 10,
  },
  {
    keywords: ["séminaire Hauts-de-Seine", "séminaire château 92"],
    targetPath: "/seminaire-chateau-hauts-de-seine-92",
    title: "Séminaire en château dans les Hauts-de-Seine",
    priority: 10,
  },
  {
    keywords: ["team building en château", "team building château"],
    targetPath: "/team-building-chateau",
    title: "Team building en château",
    priority: 10,
  },

  // ── PRIORITÉ MAXIMALE (articles satellites proches page 1) ──

  {
    keywords: ["activités Chantilly", "team building Chantilly", "activités team building à Chantilly", "activités team building Chantilly", "domaines Chantilly", "team building forêt Chantilly"],
    targetSlug: "seminaire-chantilly-activites-team-building",
    title: "15 activités team building à Chantilly",
    priority: 9,
  },

  // ── PRIORITÉ HAUTE (pages avec 100+ imp et pos > 25 ou 0 clics) ──

  {
    keywords: ["hôtel séminaire Chantilly", "hotel seminaire chantilly", "hébergement Chantilly", "hôtels à Chantilly", "dormir à Chantilly"],
    targetSlug: "hotel-seminaire-chantilly-comparatif",
    title: "Comparatif hôtels séminaire à Chantilly",
    priority: 9,
  },
  {
    keywords: ["budget séminaire", "coût séminaire", "prix séminaire", "tarif séminaire", "combien coûte un séminaire"],
    targetSlug: "budget-seminaire-entreprise-2026-planifier",
    title: "Budget séminaire entreprise 2026",
    priority: 9,
  },
  {
    keywords: ["séminaire CODIR", "CODIR en château", "CODIR", "comité de direction", "réunion de direction"],
    targetSlug: "seminaire-codir-chateau-privatise",
    title: "Séminaire CODIR en château privatisé",
    priority: 9,
  },
  {
    keywords: ["checklist séminaire", "check-list", "liste préparation séminaire", "préparer un séminaire", "étapes séminaire"],
    targetSlug: "checklist-organiser-seminaire",
    title: "Checklist organiser un séminaire",
    priority: 8,
  },
  {
    keywords: ["séminaire résidentiel", "résidentiel ou journée", "séminaire sur plusieurs jours", "séminaire avec nuitée"],
    targetSlug: "seminaire-residentiel-vs-journee",
    title: "Séminaire résidentiel vs journée : le comparatif",
    priority: 8,
  },
  {
    keywords: ["comparatif hôtels Chantilly", "quel hôtel Chantilly", "meilleur hôtel séminaire Chantilly"],
    targetSlug: "hotel-seminaire-chantilly-comparatif",
    title: "Comparatif hôtels séminaire Chantilly",
    priority: 8,
  },

  // ── PRIORITÉ MOYENNE (pages avec potentiel, pos 5-15) ──

  {
    keywords: ["Chevreuse séminaire nature", "nature en vallée de Chevreuse"],
    targetSlug: "seminaire-nature-chevreuse-deconnexion",
    title: "Séminaire nature en vallée de Chevreuse",
    priority: 7,
  },
  {
    keywords: ["repas séminaire", "traiteur séminaire", "menu séminaire entreprise"],
    targetSlug: "repas-seminaire-tendances-traiteur-2026",
    title: "Tendances repas séminaire 2026",
    priority: 7,
  },
  {
    keywords: ["châteaux dans l'Oise", "château Oise séminaire", "top châteaux Oise"],
    targetSlug: "top-chateaux-oise-60",
    title: "Top châteaux dans l'Oise pour séminaire",
    priority: 7,
  },
  {
    keywords: ["olympiades entreprise", "épreuves team building", "olympiades en château"],
    targetSlug: "olympiades-entreprise-10-epreuves",
    title: "10 épreuves olympiades entreprise",
    priority: 6,
  },
  {
    keywords: ["convaincre la direction", "argumenter budget séminaire", "justifier un séminaire"],
    targetSlug: "convaincre-direction-budget-seminaire",
    title: "Convaincre la direction d'investir dans un séminaire",
    priority: 6,
  },
  {
    keywords: ["privatisation château", "journée d'étude château", "privatiser un château"],
    targetSlug: "privatisation-journee-etude-chateau",
    title: "Privatiser un château pour une journée d'étude",
    priority: 6,
  },
  {
    keywords: ["séminaire éco-responsable", "RSE séminaire", "séminaire vert"],
    targetSlug: "seminaire-eco-responsable-rse",
    title: "Organiser un séminaire éco-responsable",
    priority: 6,
  },
  {
    keywords: ["soirée entreprise château", "soirée à thème château", "gala entreprise"],
    targetSlug: "soiree-entreprise-chateau-idees-themes",
    title: "Idées soirées entreprise en château",
    priority: 5,
  },
  {
    keywords: ["séminaire nature Chevreuse", "déconnexion nature", "off-site nature"],
    targetSlug: "seminaire-nature-chevreuse-deconnexion",
    title: "Séminaire nature en vallée de Chevreuse",
    priority: 5,
  },

  // ── PRIORITÉ BASSE (pages avec quelques impressions, articles niches) ──

  {
    keywords: ["team building outdoor", "activités nature équipe", "team building plein air"],
    targetSlug: "team-building-outdoor-activites-nature-equipe",
    title: "Activités team building outdoor en nature",
    priority: 4,
  },
  {
    keywords: ["team building RSE", "activités RSE", "team building responsable"],
    targetSlug: "team-building-rse-nature",
    title: "Team building RSE en pleine nature",
    priority: 4,
  },
  {
    keywords: ["ice breakers", "briser la glace réunion", "animation début séminaire"],
    targetSlug: "ice-breakers-debuter-reunion",
    title: "Ice breakers pour débuter une réunion",
    priority: 4,
  },
  {
    keywords: ["workation château", "télétravail château", "workation premium"],
    targetSlug: "workation-chateau-teletravail-premium",
    title: "Workation en château : télétravail premium",
    priority: 4,
  },
  {
    keywords: ["planning séminaire 2 jours", "programme séminaire résidentiel"],
    targetSlug: "planning-ideal-seminaire-2-jours",
    title: "Planning idéal séminaire 2 jours",
    priority: 3,
  },
  {
    keywords: ["garden party château", "parc château événement"],
    targetSlug: "plus-beaux-parcs-chateaux-garden-party",
    title: "Les plus beaux parcs de châteaux pour garden party",
    priority: 3,
  },
  {
    keywords: ["cadeaux invités séminaire", "goodies made in France"],
    targetSlug: "cadeaux-invites-made-in-france",
    title: "Cadeaux invités made in France",
    priority: 3,
  },
  {
    keywords: ["murder party château", "soirée enquête château", "murder party"],
    targetSlug: "murder-party-chateau-activite-immersive",
    title: "Murder party en château : activité immersive",
    priority: 3,
  },

  // NOTE : les anciens doublons Camille (team-building-chantilly-activites-domaines-2026,
  // seminaire-chantilly-guide-organisateurs-2026…) ont été fusionnés en 301 —
  // source unique : src/data/merged-redirects.json. Leurs mots-clés ont été
  // réintégrés dans les règles canoniques ci-dessus.
];

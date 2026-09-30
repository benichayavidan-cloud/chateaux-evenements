/**
 * PILOTE « lieux sous l'article » — plan conversion, phase 4 (30/09/2026).
 *
 * Le bloc de 3 fiches /lieux (lib/lieux-article) ne s'affiche que sur ces
 * articles : l'article murder party (40 % des clics Google du site) et les 20
 * articles vivants les plus affichés par Google du 02/07 au 30/09/2026
 * (export GSC 90 jours, workflow gsc-audit, run 36700977981).
 *
 * TÉMOIN : les 20 articles suivants du même classement ne reçoivent rien. Bilan
 * vers le 27/10 : clics CLICK_CTA « article-lieux » dans le CRM, demandes de
 * devis parties des fiches /lieux, et impressions des fiches /lieux en GSC,
 * pilote contre témoin. On étend à tout le blog seulement si le pilote fait
 * mieux que le témoin.
 */

export const DEBUT_PILOTE_LIEUX = "2026-09-30";

export const ARTICLES_PILOTE_LIEUX: readonly string[] = [
  "murder-party-chateau-activite-immersive", // 40 % des clics du site
  "seminaire-oise-nature-prestige-paris", // 495 impr.
  "seminaire-codir-chateau-privatise", // 215 impr.
  "combien-coute-seminaire-chateau-2026", // 84 impr.
  "seminaire-automne-foret-fontainebleau-rambouillet-guide-2026", // 61 impr.
  "interpreter-resultats-seminaire-mesurer-roi-2026", // 55 impr.
  "seminaire-numerique-outils-collaboration-chateau-guide-2026", // 55 impr.
  "gestion-participation-distancielle-seminaire-chateau-wifi-technique-2026", // 49 impr.
  "seminaire-entreprise-rambouillet-yvelines-guide-2026", // 48 impr.
  "seminaire-chateau-juillet-aout-avantages-disponibilites-2026", // 47 impr.
  "choisir-salle-pleniere-vs-ateliers-chateau-seminaire-guide-2026", // 37 impr.
  "amenager-espace-networking-seminaire-chateau-2026", // 33 impr.
  "amenagement-salle-hybride-presentiel-distanciel-chateau-seminaire-2026", // 32 impr.
  "cadeaux-invites-made-in-france", // 29 impr.
  "seminaire-chateau-nature-oise-experience-2026", // 29 impr.
  "negocier-rabais-groupe-domaine-evenementiel-guide-2026", // 28 impr.
  "gestion-fournisseurs-multiples-seminaire-chateau-coordination-2026", // 25 impr.
  "langage-non-verbal-seminaire-chateau-lire-salle-guide-2026", // 24 impr.
  "gestion-stress-thermique-canicule-seminaire-chateau-ete-2026", // 23 impr.
  "soiree-gala-entreprise-chateau-ile-de-france-guide-2026", // 23 impr.
  "inauguration-nouveaux-locaux-chateau-ceremonie-entreprise-guide-2026", // 22 impr.
];

/** Groupe témoin : même classement, rangs 21 à 40. Ne rien y afficher. */
export const ARTICLES_TEMOIN_LIEUX: readonly string[] = [
  "traiteur-petit-dejeuner-seminaire-chateau-formules-horaires-2026", // 22 impr.
  "grands-groupes-100-personnes-chateau", // 20 impr.
  "seminaire-seine-et-marne-fontainebleau-meaux-guide-2026", // 20 impr.
  "choisir-agence-evenementielle-seminaire-chateau-criteres-2026", // 19 impr.
  "evenement-corporate-storytelling-film-chateau-2026", // 19 impr.
  "fontainebleau-team-building-nature", // 18 impr.
  "gerer-chaleur-aout-seminaire-chateau-bien-etre-ete-2026", // 17 impr.
  "gestion-pluie-intemperies-seminaire-chateau-plan-b-2026", // 15 impr.
  "protocole-art-table-diner-gala-chateau-2026", // 15 impr.
  "mobilite-douce-acces-chateau-seminaire-velo-navette-2026", // 14 impr.
  "animer-soiree-networking-chateau-idf-guide-2026", // 12 impr.
  "choisir-prestataire-sono-lumiere-seminaire-chateau-2026", // 12 impr.
  "musique-ambiance-sonore-seminaire-chateau-concentration-guide-2026", // 11 impr.
  "assemblee-generale-entreprise-chateau-guide-organisation-2026", // 10 impr.
  "atelier-arts-creatifs-poterie-seminaire-chateau-2026", // 10 impr.
  "deconnexion-digitale-seminaire-chateau-guide-pratique-2026", // 10 impr.
  "securite-incendie-evacuation-seminaire-chateau-guide-organisateur-2026", // 10 impr.
  "seminaire-kick-off-rentree-chateau-guide-2026", // 10 impr.
  "animer-pause-cafe-seminaire-chateau-activites-courtes-2026", // 9 impr.
  "anniversaire-entreprise-chateau-organiser-celebration-2026", // 9 impr.
];

/** Titre et accroche propres à un article, quand le générique sonnerait faux. */
export const ENCART_LIEUX_SUR_MESURE: Record<string, { titre: string; texte: string }> = {
  "murder-party-chateau-activite-immersive": {
    titre: "Où organiser votre murder party\u00a0?",
    texte:
      "Une enquête se joue mieux dans un lieu entier à vous : salons, parc, parfois des chambres pour prolonger la soirée. Voici trois adresses de notre sélection ; nous organisons l’animation avec le lieu retenu.",
  },
};

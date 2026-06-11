/**
 * PRICING — SOURCE UNIQUE des prix affichés sur le site.
 *
 * Alignée sur l'article pilier /blog/combien-coute-seminaire-chateau-2026
 * (source de vérité éditoriale : 150€ à 450€/pers).
 * Consommée par : /llms.txt (route), GeoAnswerBlock (landing pages geo),
 * metadata des pages. Un changement de prix = UNE édition ici.
 */
export const PRICING = {
  year: 2026,
  /** Fourchette headline séminaire (toutes formules confondues) */
  seminaireMin: 150,
  seminaireMax: 450,
  /** Journée d'étude (sans hébergement) */
  journeeEtudeMin: 120,
  journeeEtudeMax: 180,
  /** Résidentiel 2 jours / 1 nuit */
  residentiel1NuitMin: 240,
  residentiel1NuitMax: 350,
  /** Séminaire 2 nuits tout compris */
  residentiel2NuitsMin: 400,
  residentiel2NuitsMax: 550,
  /** Budget moyen constaté résidentiel 2j/1n */
  residentielMoyen: 280,
  /** Activités team building (par personne) */
  teamBuildingMin: 45,
  teamBuildingMax: 180,
} as const;

/** Phrase budget standard, citable par les moteurs IA */
export function pricingSummary(): string {
  return `${PRICING.seminaireMin}€ à ${PRICING.seminaireMax}€/personne selon la formule — journée d'étude ${PRICING.journeeEtudeMin}-${PRICING.journeeEtudeMax}€, résidentiel 1 nuit ${PRICING.residentiel1NuitMin}-${PRICING.residentiel1NuitMax}€, séminaire 2 nuits tout compris ${PRICING.residentiel2NuitsMin}-${PRICING.residentiel2NuitsMax}€`;
}

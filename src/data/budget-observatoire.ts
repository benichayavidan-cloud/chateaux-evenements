/**
 * OBSERVATOIRE DES BUDGETS — données réelles, pas des estimations.
 *
 * Source : 188 devis reçus et traités par Select Châteaux. Les montants sont
 * des budgets CLIENT, obtenus en appliquant la marge de 10 % aux prix d'achat
 * enregistrés dans le CRM. Ils sont publiés en fourchettes et en médianes, de
 * façon qu'aucun lieu ni aucun devis ne soit identifiable.
 *
 * Régénérer les chiffres : voir la requête dans
 * _claude_docs/2026-08-30_observatoire-budgets-requetes.md
 */

export const OBSERVATOIRE = {
  nbDevis: 188,
  periode: "2025-2026",
  margeAppliquee: 10,

  global: { p10: 124, mediane: 417, p90: 746 },

  parDuree: [
    { libelle: "Journée d'étude", detail: "sans nuitée", n: 70, mediane: 150 },
    { libelle: "Résidentiel 2 jours", detail: "1 nuit", n: 105, mediane: 517 },
    { libelle: "Résidentiel 3 jours", detail: "2 nuits", n: 12, mediane: 702 },
  ],

  parTaille: [
    { libelle: "Moins de 30 personnes", n: 45, mediane: 452 },
    { libelle: "30 à 59 personnes", n: 103, mediane: 439 },
    { libelle: "60 à 99 personnes", n: 12, mediane: 301 },
    { libelle: "100 personnes et plus", n: 28, mediane: 182 },
  ],

  parDepartement: [
    { code: "92", nom: "Hauts-de-Seine", n: 7, mediane: 635 },
    { code: "60", nom: "Oise", n: 43, mediane: 537 },
    { code: "91", nom: "Essonne", n: 36, mediane: 430 },
    { code: "77", nom: "Seine-et-Marne", n: 38, mediane: 421 },
    { code: "95", nom: "Val-d'Oise", n: 19, mediane: 363 },
    { code: "78", nom: "Yvelines", n: 35, mediane: 195 },
  ],
} as const;

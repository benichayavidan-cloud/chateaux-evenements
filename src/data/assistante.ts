/**
 * L'assistante séminaire qui signe les conseils des fiches château
 * (17/11/2026). Une vraie personne de l'équipe, désignée par le PO ; son
 * titre (« votre assistante séminaire ») est celui voulu par le PO. Un seul endroit pour
 * changer le prénom, le titre ou le portrait.
 *
 * Portrait : détouré depuis la photo d'équipe du site, tête dépassant d'un
 * cercle doré (fichier 248 × 288, affiché à 72 × 84).
 * ⚠️ Avant mise en ligne : confirmer avec le PO que cette photo montre bien
 * la personne nommée (question posée le 17/11/2026, sans réponse à ce jour).
 */
export const ASSISTANTE = {
  prenom: 'Salomé',
  role: 'votre assistante séminaire',
  portrait: '/images/equipe/consultante-seminaire-select-chateaux.webp',
  largeur: 72,
  hauteur: 84,
} as const;

/**
 * Réglages partagés de CartesLieux (serveur) et FiltresCartesLieux (client).
 * Ils ne peuvent pas vivre dans le module "use client" : importée côté
 * serveur, une constante d'un tel module n'est qu'une référence client, pas
 * sa valeur (11/10/2026 : `18 > LIMITE_CARTES` valait false, filtres absents).
 */

/** Cartes visibles avant « Voir les N lieux ». */
export const LIMITE_CARTES = 8;
/** Seuil du filtre « 100 pers. et plus ». */
export const SEUIL_GRAND_GROUPE = 100;

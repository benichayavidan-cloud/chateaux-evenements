/**
 * Coordonnées publiques de Select Châteaux : la SEULE source du numéro de
 * téléphone affiché sur le site (pages, pied de page, barre mobile, données
 * structurées, suivi des clics). Changer le numéro = changer ce fichier.
 *
 * Module pur, sans "use client" : importable côté serveur comme côté client
 * (une constante d'un module client importée côté serveur ne vaut rien).
 *
 * Le test `contact.test.ts` interdit tout numéro écrit en dur ailleurs.
 */

/** Format affiché aux visiteurs. */
export const CONTACT_PHONE_DISPLAY = "01 83 80 60 00";

/** Format international E.164, pour les liens `tel:` et les données structurées. */
export const CONTACT_PHONE_E164 = "+33183806000";

/** Format international lisible (pied de page v2, qui retire les espaces pour le lien). */
export const CONTACT_PHONE_INTL = "+33 1 83 80 60 00";

export const CONTACT_EMAIL = "seminaires@selectchateaux.com";

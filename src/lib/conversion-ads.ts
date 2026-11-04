/**
 * Conversion Google Ads « Demande de devis envoyée ».
 *
 * Envoyée seulement après une réponse réussie de /api/devis, avec le numéro de
 * la demande quand il existe : Google ne la compte alors qu'une fois. Une balise absente ou bloquée ne
 * doit jamais toucher au formulaire, d'où aucune exception possible ici.
 * Aucun type TS-only (enum…) : le fichier est testé par `node --test`.
 */

import type { ConsentementPub } from './origine.ts';

export const CONVERSION_SEND_TO = 'AW-18551949936/3rYLCJ-D7rEdEPCUoY5F';

type Gtag = (...args: unknown[]) => void;

interface DemandeEnregistree {
  /** Tel que renvoyé par l'API : on ne suppose rien sur son type. */
  demandeId: unknown;
  email: string;
  telephone: string;
  consentement: ConsentementPub;
}

const dejaEnvoyees = new Set<string>();

function numeroDemande(id: unknown): string | null {
  if (typeof id === 'string' && id) return id;
  return typeof id === 'number' && Number.isFinite(id) ? String(id) : null;
}

/** Format international attendu par Google. Numéro non reconnu : null, plutôt qu'un numéro faux. */
export function telephoneE164(brut: string): string | null {
  const net = brut.replace(/[\s.()-]/g, '');
  const international = net.startsWith('00') ? `+${net.slice(2)}` : net;
  if (/^\+[1-9]\d{7,14}$/.test(international)) return international;
  return /^0[1-9]\d{8}$/.test(net) ? `+33${net.slice(1)}` : null;
}

/** Renvoie true si la conversion est partie. */
export function envoyerConversionDevis(gtag: Gtag | undefined, demande: DemandeEnregistree): boolean {
  const numero = numeroDemande(demande.demandeId);
  if (typeof gtag !== 'function' || (numero && dejaEnvoyees.has(numero))) return false;

  // Les coordonnées ne partent qu'avec un accord réel, et leur échec n'empêche pas la conversion.
  if (demande.consentement === 'oui') {
    try {
      const telephone = telephoneE164(demande.telephone);
      gtag('set', 'user_data', {
        email: demande.email.trim().toLowerCase(),
        ...(telephone ? { phone_number: telephone } : {}),
      });
    } catch { /* bloqueur : la conversion part sans coordonnées */ }
  }

  try {
    // Sans numéro, pas d'anti-doublon : cela vaut mieux qu'une conversion perdue.
    gtag('event', 'conversion', {
      send_to: CONVERSION_SEND_TO,
      ...(numero ? { transaction_id: numero } : {}),
    });
    if (numero) dejaEnvoyees.add(numero);
    return true;
  } catch {
    return false;
  }
}

/**
 * Les vraies personnes de l'équipe qui signent les conseils du blog
 * (19/11/2026). Elles remplacent les « experts » inventés par l'ancien agent
 * rédacteur (Sophie Durand, Thomas Lefèvre, Claire Martin, Antoine Moreau),
 * qui n'ont jamais existé.
 *
 * Procuration du PO (19/11/2026) : les citations signées de ces trois
 * personnes sont rédigées sans validation au cas par cas, MAIS chaque fait
 * cité vient des données du site (chateaux.ts, rubriques/) ou du CRM
 * (cas-demandes.ts). Jamais de chiffre de mémoire.
 *
 * Rôles : celui d'Avidan est celui de la page À propos ; Salomé reprend
 * ASSISTANTE (un seul endroit pour son titre).
 */
import { ASSISTANTE } from './assistante.ts';

export interface MembreEquipe {
  id: 'avidan' | 'yohan' | 'salome';
  prenom: string;
  nom?: string;
  /** Tel qu'écrit après le nom dans une citation : « — Avidan Benichay, responsable événementiel ». */
  role: string;
}

export const EQUIPE: readonly MembreEquipe[] = [
  { id: 'avidan', prenom: 'Avidan', nom: 'Benichay', role: 'responsable événementiel' },
  { id: 'yohan', prenom: 'Yohan', nom: 'Edery', role: "de l'équipe séminaires" },
  { id: 'salome', prenom: ASSISTANTE.prenom, role: ASSISTANTE.role },
];

/** Signature affichée sous une citation. */
export function signature(m: MembreEquipe): string {
  return `${m.prenom}${m.nom ? ` ${m.nom}` : ''}, ${m.role}`;
}

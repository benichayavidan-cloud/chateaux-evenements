/**
 * Rubriques d'un domaine : /chateaux/<slug>/<rubrique>.
 *
 * Chaque château a une page par thème (salles, chambres…). Le gabarit est
 * commun, le contenu est propre au lieu : c'est ce contenu chiffré (surfaces,
 * capacités, temps de trajet) que Google et les IA reprennent.
 */

export const RUBRIQUES = [
  'salles',
  'chambres',
  'exterieurs',
  'restauration',
  'soirees',
  'activites',
  'acces',
] as const;

export type RubriqueId = (typeof RUBRIQUES)[number];

/** Une photo et sa légende visible (la légende sert aussi de texte alternatif). */
export interface PhotoRubrique {
  src: string;
  legende: string;
}

/** Un fait chiffré mis en avant ; `source` noté quand on l'a (jamais bloquant). */
export interface FaitCle {
  label: string;
  valeur: string;
  source?: string;
}

/** Une ligne du tableau des salles : capacités par disposition (null = non communiqué). */
export interface SalleReunion {
  nom: string;
  surfaceM2: number | null;
  theatre: number | null;
  classe: number | null;
  enU: number | null;
  banquet: number | null;
  cocktail: number | null;
  cabaret: number | null;
  note?: string;
}

export interface BlocTexte {
  titre: string;
  texte: string;
}

export interface Rubrique {
  /** Titre de l'onglet (≤ 60 caractères, contrôlé au build). */
  seoTitle: string;
  /** Meta description (≤ 160 caractères). */
  seoDescription: string;
  /** Résumé repris sur l'accueil du domaine. */
  resume: string;
  intro: string;
  faits: FaitCle[];
  photos: PhotoRubrique[];
  blocs: BlocTexte[];
  salles?: SalleReunion[];
  /** Pages consultées pour les chiffres (noté pour s'y retrouver). */
  sources: string[];
}

export type RubriquesDomaine = Partial<Record<RubriqueId, Rubrique>>;

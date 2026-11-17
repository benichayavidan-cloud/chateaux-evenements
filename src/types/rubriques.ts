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
  /**
   * Capacité « en réunion » quand le lieu ne donne aucune disposition assise
   * chiffrée pour cette salle (le tableau ne l'affiche pas : elle est déjà
   * dans `note`). Sert au choix d'une salle par format.
   */
  reunion?: number;
}

export interface BlocTexte {
  titre: string;
  texte: string;
}

/**
 * Section de texte supplémentaire d'une page détaillée, après la section
 * principale (17/11/2026) : même gabarit, disposition inversée d'une section
 * à l'autre. Elle n'avance que des faits déjà publiés sur les pages du même
 * domaine (testé sur les chiffres) et montre des photos de son sujet.
 */
export interface SectionSupplementaire {
  /** Ancre unique dans la page (« salle-signature »). */
  ancre: string;
  etiquette: string;
  titre: string;
  intro: string;
  /** Blocs propres à cette section. */
  blocs: BlocTexte[];
  /** Blocs de la rubrique repris ici (rangs dans `Rubrique.blocs`), affichés avant les blocs propres. */
  reprend?: number[];
  faits: Array<{ label: string; valeur: string }>;
  /** Photos propres à cette section. */
  photos: PhotoRubrique[];
  /** Photos de la rubrique reprises ici (rangs dans `Rubrique.photos`). */
  reprendPhotos?: number[];
  conseil?: string;
}

export interface Rubrique {
  /** Titre de l'onglet (≤ 60 caractères, contrôlé au build). */
  seoTitle: string;
  /**
   * Titre de la section de texte de la page (H2) : un mot-clé et un détail du
   * lieu, propre à cette page — ni celui de la fiche château, ni un titre
   * commun aux 4 domaines (décision PO du 17/11/2026).
   */
  titreSection: string;
  /**
   * Le conseil de l'assistante séminaire pour cette page. Propre à la page,
   * sans chiffre absent de la rubrique (testé). Signé d'un prénom réel.
   */
  conseil: string;
  /** Meta description (≤ 160 caractères). */
  seoDescription: string;
  /** Résumé repris sur l'accueil du domaine. */
  resume: string;
  intro: string;
  faits: FaitCle[];
  photos: PhotoRubrique[];
  blocs: BlocTexte[];
  salles?: SalleReunion[];
  /**
   * Blocs affichés dans la section principale de la page (rangs dans `blocs`).
   * Absent : tous. Sert quand des sections supplémentaires reprennent certains
   * blocs : un bloc n'apparaît qu'une fois sur la page (testé). La fiche
   * château, elle, lit toujours `blocs` en entier.
   */
  blocsSection?: number[];
  /** Sections de texte après la section principale, dans l'ordre d'affichage. */
  sections?: SectionSupplementaire[];
  /** Pages consultées pour les chiffres (noté pour s'y retrouver). */
  sources: string[];
}

export type RubriquesDomaine = Partial<Record<RubriqueId, Rubrique>>;

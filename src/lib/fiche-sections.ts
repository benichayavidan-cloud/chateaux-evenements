/**
 * Sections de la fiche château, assemblées depuis les rubriques du domaine
 * (voir data/fiche-sections.ts), et contrôle « chaque section ne parle que
 * de son sujet ». Le contrôle signale ; il ne bloque aucune mise en ligne
 * (décision PO du 16/11/2026).
 */
import type { BlocTexte, Rubrique, RubriqueId, RubriquesDomaine } from '../types/rubriques.ts';
import type { Chateau } from '../types/index.ts';
import { FICHE_SECTIONS, SECTIONS_FICHE, type ChoixBloc, type FicheSectionsChateau, type SectionFicheId } from '../data/fiche-sections.ts';
import { RUBRIQUES_PAR_CHATEAU } from '../data/rubriques/index.ts';
import { remplitChiffres } from './fiche-chateau.ts';
import { sansAccents, urlRubrique } from './rubriques.ts';

export interface SectionFiche {
  id: SectionFicheId;
  etiquette: string;
  titre: string;
  intro: string;
  blocs: BlocTexte[];
  faits: Array<{ label: string; valeur: string }>;
  /** Vide pour « Le lieu » : la fiche y montre ses photos d'en-tête. */
  photos: Array<{ src: string; alt: string }>;
  liens: Array<{ href: string; label: string }>;
  /** Conseil de l'assistante séminaire pour cette section, s'il est écrit. */
  conseil?: string;
}

export const ETIQUETTES: Record<SectionFicheId, string> = {
  lieu: 'Le lieu',
  hebergement: 'Hébergement',
  reunion: 'Espaces de réunion',
  restauration: 'Restauration',
  activites: 'Activités',
  acces: 'Accès',
};

/** Rubriques dont chaque section reprend la matière (la première donne l'introduction). */
const MATIERE: Record<Exclude<SectionFicheId, 'lieu'>, RubriqueId[]> = {
  hebergement: ['chambres'],
  reunion: ['salles'],
  restauration: ['restauration', 'soirees'],
  activites: ['activites'],
  acces: ['acces'],
};

const LIENS: Record<SectionFicheId, Array<[RubriqueId, string]>> = {
  lieu: [['exterieurs', 'Découvrir nos extérieurs']],
  hebergement: [['chambres', 'Voir nos chambres']],
  reunion: [['salles', 'Voir toutes nos salles et leurs capacités']],
  restauration: [['restauration', 'Voir notre restauration'], ['soirees', "Vos soirées d'entreprise"]],
  activites: [['activites', 'Voir nos activités']],
  acces: [['acces', 'Préparer votre venue']],
};

const FAITS_MAX = 4;

type Chiffres = Pick<Chateau, 'roomsTotal' | 'meetingRooms' | 'capacite'>;

/**
 * Les 6 sections d'une fiche, dans l'ordre d'affichage. Tableau vide si le
 * château n'a pas de configuration : la fiche n'affiche alors aucune section
 * de texte (les 4 châteaux en ont une ; un test le vérifie). Une section dont
 * la rubrique manque est simplement absente.
 */
export function sectionsFiche(
  slug: string,
  chiffres: Chiffres,
  config: Record<string, FicheSectionsChateau> = FICHE_SECTIONS,
  rubriques: Record<string, RubriquesDomaine> = RUBRIQUES_PAR_CHATEAU,
): SectionFiche[] {
  const c = config[slug];
  if (!c) return [];
  const rubs = rubriques[slug] ?? {};
  const liens = (id: SectionFicheId) =>
    LIENS[id].filter(([r]) => rubs[r]).map(([r, label]) => ({ href: urlRubrique(slug, r), label }));

  return SECTIONS_FICHE.flatMap((id): SectionFiche[] => {
    const titre = remplitChiffres(c.titres[id], chiffres);
    if (id === 'lieu') {
      return [{ id, etiquette: ETIQUETTES[id], titre, ...c.lieu, photos: [], liens: liens(id), conseil: c.conseils?.[id] }];
    }
    const principale: Rubrique | undefined = rubs[MATIERE[id][0]];
    if (!principale) return [];
    const choix: ChoixBloc[] = c.blocs?.[id] ?? principale.blocs.map((_, i): ChoixBloc => [MATIERE[id][0], i]);
    const sources = MATIERE[id].map((r) => rubs[r]).filter((r): r is Rubrique => r !== undefined);
    const vues = new Set<string>();
    return [{
      id,
      etiquette: ETIQUETTES[id],
      titre,
      intro: principale.intro,
      blocs: choix.map(([r, i]) => rubs[r]?.blocs[i]).filter((b): b is BlocTexte => b !== undefined),
      faits: principale.faits.slice(0, FAITS_MAX).map(({ label, valeur }) => ({ label, valeur })),
      photos: sources
        .flatMap((r) => r.photos)
        .filter((p) => !vues.has(p.src) && vues.add(p.src))
        .map((p) => ({ src: p.src, alt: p.legende })),
      liens: liens(id),
      conseil: c.conseils?.[id],
    }];
  });
}

/**
 * Sujets qui n'ont rien à faire dans une section (comparés sans accents ni
 * casse, au début d'un mot). Exemple fondateur : le spa décrit dans
 * l'hébergement sur les 4 fiches (constat du 17/11/2026).
 */
export const HORS_SUJET: Record<SectionFicheId, string[]> = {
  lieu: ['spa', 'piscine', 'hammam', 'restaurant', 'chambre', 'plénière', 'team building'],
  hebergement: ['spa', 'piscine', 'hammam', 'sauna', 'restaurant', 'bar', 'team building', 'plénière'],
  reunion: ['spa', 'piscine', 'hammam', 'chambre', 'team building', 'rallye', 'vtt', 'olympiades'],
  restauration: ['spa', 'piscine', 'hammam', 'chambre', 'team building', 'rallye', 'vtt'],
  activites: ['chambre', 'restaurant', 'plénière', 'parking', 'salle de réunion'],
  acces: ['spa', 'piscine', 'chambre', 'restaurant', 'plénière', 'team building'],
};

/** Pluriel accepté sur chaque mot, espace ou trait d'union entre deux mots (« salles de réunion », « team-building »). */
const motif = (mot: string) =>
  new RegExp(
    `(^|[^a-z0-9])${sansAccents(mot)
      .split(/\s+/)
      .map((m) => `${m.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(s|x)?`)
      .join('[\\s-]+')}($|[^a-z0-9])`,
  );

/** Mots hors sujet présents dans le texte d'une section (titre, introduction, blocs, chiffres). */
export function horsSujet(section: Pick<SectionFiche, 'id' | 'titre' | 'intro' | 'blocs' | 'faits'> & { conseil?: string }): string[] {
  const texte = sansAccents(
    [section.titre, section.intro, section.conseil ?? '', ...section.blocs.flatMap((b) => [b.titre, b.texte]), ...section.faits.flatMap((f) => [f.label, f.valeur])].join('\n'),
  );
  return HORS_SUJET[section.id].filter((mot) => motif(mot).test(texte));
}

/** Rapport pour le build : « slug / section : mots hors sujet ». Affichage seulement. */
export function rapportHorsSujet(
  chiffresParSlug: Record<string, Chiffres>,
  config: Record<string, FicheSectionsChateau> = FICHE_SECTIONS,
): string[] {
  return Object.keys(config).flatMap((slug) => {
    const chiffres = chiffresParSlug[slug];
    if (!chiffres) return [`${slug} : château absent de data/chateaux.ts`];
    return sectionsFiche(slug, chiffres, config).flatMap((s) => {
      const mots = horsSujet(s);
      return mots.length ? [`${slug} / ${s.id} : ${mots.join(', ')}`] : [];
    });
  });
}

/**
 * Mots qui signent une phrase écrite pour un organisateur de séminaire
 * (décision PO du 17/11/2026 : les sections décrivaient le lieu comme un site
 * d'hôtel — 45 % de phrases orientées séminaire sur le pilote).
 */
export const MOTS_SEMINAIRE = [
  'séminaire', 'résidentiel', 'participant', 'groupe', 'plénière', 'atelier', 'convention', 'kick-off',
  'comité', 'session', 'collaborateur', 'vos équipes', 'programme', 'coordinateur', 'entreprise',
  'sous-commission', 'cohésion', 'team building', 'réunion', 'gala', 'banquet', 'intervenant',
] as const;

const MOTIF_SEMINAIRE = new RegExp(`(^|[^a-z0-9])(${MOTS_SEMINAIRE.map((m) => sansAccents(m).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`);

/** Phrases du texte d'une section (introduction et blocs), coupées à la ponctuation forte. */
export function phrases(section: Pick<SectionFiche, 'intro' | 'blocs'>): string[] {
  return [section.intro, ...section.blocs.map((b) => b.texte)]
    .flatMap((t) => t.split(/(?<=[.!?])\s+/))
    .map((p) => p.trim())
    .filter(Boolean);
}

/** Combien de phrases parlent à un organisateur de séminaire, sur combien. */
export function angleSeminaire(section: Pick<SectionFiche, 'intro' | 'blocs'>): { pro: number; total: number } {
  const toutes = phrases(section);
  return { pro: toutes.filter((p) => MOTIF_SEMINAIRE.test(sansAccents(p))).length, total: toutes.length };
}

/** Repère : au moins 2 phrases sur 3. */
export const angleSuffisant = ({ pro, total }: { pro: number; total: number }) => total > 0 && pro * 3 >= total * 2;

/** Rapport pour le build : sections sous le repère. Affichage seulement. */
export function rapportAngleSeminaire(
  chiffresParSlug: Record<string, Chiffres>,
  config: Record<string, FicheSectionsChateau> = FICHE_SECTIONS,
): string[] {
  return Object.keys(config).flatMap((slug) => {
    const chiffres = chiffresParSlug[slug];
    if (!chiffres) return [];
    return sectionsFiche(slug, chiffres, config).flatMap((s) => {
      const a = angleSeminaire(s);
      return angleSuffisant(a) ? [] : [`${slug} / ${s.id} : ${a.pro} phrase(s) sur ${a.total} orientée(s) séminaire`];
    });
  });
}

/**
 * Chiffres d'un conseil qui ne figurent nulle part dans sa section (titre,
 * introduction, blocs, chiffres clés). Un conseil est signé d'une personne
 * réelle : il ne peut rien affirmer que la section ne dit pas déjà.
 */
export function chiffresHorsSection(section: Pick<SectionFiche, 'titre' | 'intro' | 'blocs' | 'faits' | 'conseil'>): string[] {
  if (!section.conseil) return [];
  const nombres = (t: string) => t.match(/\d+(?:[,.]\d+)?/g) ?? [];
  const connus = new Set(
    nombres([section.titre, section.intro, ...section.blocs.flatMap((b) => [b.titre, b.texte]), ...section.faits.flatMap((f) => [f.label, f.valeur])].join(' ')),
  );
  return nombres(section.conseil).filter((n) => !connus.has(n));
}

/**
 * Section de texte d'une page détaillée (/chateaux/<slug>/<rubrique>), au
 * même format que celles de la fiche pour passer par la même brique.
 * Titre et conseil sont propres à la page (rubrique.titreSection et
 * rubrique.conseil) : ni ceux de la fiche, ni un titre commun aux 4 châteaux
 * (Google demande d'éviter le texte passe-partout sur un groupe de pages).
 */
/** Thème d'icône et d'ancre de la section, par rubrique. */
const THEME_DE_RUBRIQUE: Record<RubriqueId, SectionFicheId> = {
  salles: 'reunion',
  chambres: 'hebergement',
  exterieurs: 'lieu',
  restauration: 'restauration',
  soirees: 'restauration',
  activites: 'activites',
  acces: 'acces',
};

/** Étiquette au-dessus du titre, par rubrique. */
export const ETIQUETTES_RUBRIQUE: Record<RubriqueId, string> = {
  salles: 'Espaces de réunion',
  chambres: 'Hébergement',
  exterieurs: 'Le parc',
  restauration: 'Restauration',
  soirees: 'Soirées',
  activites: 'Activités',
  acces: 'Accès',
};

export function sectionRubrique(rubrique: RubriqueId, r: Rubrique): SectionFiche {
  return {
    id: THEME_DE_RUBRIQUE[rubrique],
    etiquette: ETIQUETTES_RUBRIQUE[rubrique],
    titre: r.titreSection,
    intro: r.intro,
    blocs: r.blocs,
    faits: r.faits.map(({ label, valeur }) => ({ label, valeur })),
    photos: r.photos.map((p) => ({ src: p.src, alt: p.legende })),
    liens: [],
    conseil: r.conseil,
  };
}

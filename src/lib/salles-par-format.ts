/**
 * « Quelle salle pour quel format » (17/11/2026) : range les salles d'un
 * domaine par type d'événement, à partir du tableau des capacités déjà
 * sourcé (types/rubriques, SalleReunion). Aucun texte propre au lieu n'est
 * écrit ici : tout vient des chiffres du tableau.
 */
import type { SalleReunion } from '../types/rubriques.ts';

export type FormatId = 'pleniere' | 'ateliers' | 'comite' | 'gala';

export interface LigneFormat {
  nom: string;
  /** « 280 places en théâtre », « 150 personnes en réunion »… */
  capacite: string;
  /** Mention courte de la salle (« de mai à octobre », « en plein air »). */
  mention?: string;
}

export interface FormatSalles {
  id: FormatId;
  titre: string;
  /** La disposition retenue pour ce format. */
  disposition: string;
  /** « 14 salles, de 9 à 70 places en classe ». */
  resume: string;
  /** Les salles les plus adaptées, 3 au plus. */
  salles: LigneFormat[];
}

const LIGNES_MAX = 3;
/** Au-delà, une note est une précision de mise en place, pas une mention à répéter. */
const MENTION_MAX = 20;
/** Un atelier ou une sous-commission : pas plus de 80 places en classe. */
const ATELIER_MAX = 80;
/** En dessous de 10 places en classe, la salle sert à un comité, pas à un atelier (« 4 places en classe » ne dit rien). */
const ATELIER_MIN = 10;
/** Un comité de direction : pas plus de 25 places en U. */
const COMITE_MAX = 25;

/** Première précision de la note (« en plein air, jusqu'à 100… » → « en plein air »), si elle est courte. */
function mention(s: SalleReunion): string | undefined {
  const premiere = s.note?.split(/[,;]/)[0].trim();
  return premiere && premiere.length <= MENTION_MAX ? premiere : undefined;
}
const pluriel = (n: number, mot: string) => `${n} ${mot}${n > 1 ? 's' : ''}`;

function format(
  id: FormatId,
  titre: string,
  disposition: string,
  retenues: Array<{ salle: SalleReunion; valeur: number; libelle: string }>,
  unite: string,
): FormatSalles | null {
  if (retenues.length === 0) return null;
  const valeurs = retenues.map((r) => r.valeur);
  const min = Math.min(...valeurs);
  const max = Math.max(...valeurs);
  const etendue = min === max ? `${max} ${unite}` : `de ${min} à ${max} ${unite}`;
  return {
    id,
    titre,
    disposition,
    // Plénière : on cherche la plus grande salle, pas un décompte (« 15 salles de 12 à 280 places » ne dit rien).
    resume: id === 'pleniere' ? `jusqu'à ${max} ${unite}` : `${pluriel(retenues.length, 'salle')}, ${etendue}`,
    salles: retenues.slice(0, LIGNES_MAX).map((r) => ({ nom: r.salle.nom, capacite: r.libelle, mention: mention(r.salle) })),
  };
}

/** Formats pour lesquels le domaine a au moins une salle, dans l'ordre d'une journée de séminaire. */
export function sallesParFormat(salles: SalleReunion[]): FormatSalles[] {
  // Plénière : la plus grande assemblée assise. Sans disposition théâtre chiffrée, la capacité « en réunion » du lieu.
  const plenieres = salles
    .map((salle) => {
      const valeur = salle.theatre ?? salle.reunion ?? null;
      return valeur === null ? null : { salle, valeur, libelle: salle.theatre !== null ? `${valeur} places en théâtre` : `${valeur} personnes en réunion` };
    })
    .filter((x): x is NonNullable<typeof x> => x !== null)
    .sort((a, b) => b.valeur - a.valeur);

  const ateliers = salles
    .filter((s) => s.classe !== null && s.classe >= ATELIER_MIN && s.classe <= ATELIER_MAX)
    .map((salle) => ({ salle, valeur: salle.classe!, libelle: `${salle.classe} places en classe` }))
    .sort((a, b) => b.valeur - a.valeur);

  const comites = salles
    .filter((s) => s.enU !== null && s.enU <= COMITE_MAX)
    .map((salle) => ({ salle, valeur: salle.enU!, libelle: `${salle.enU} places en U` }))
    .sort((a, b) => a.valeur - b.valeur);

  const galas = salles
    .filter((s) => s.banquet !== null)
    .map((salle) => ({
      salle,
      valeur: salle.banquet!,
      libelle: salle.cocktail !== null ? `${salle.banquet} convives à table, ${salle.cocktail} en cocktail` : `${salle.banquet} convives à table`,
    }))
    .sort((a, b) => b.valeur - a.valeur);

  return [
    format('pleniere', 'Convention et plénière', 'vos plus grandes assemblées', plenieres, 'places'),
    format('ateliers', 'Ateliers et sous-commissions', 'en classe', ateliers, 'places en classe'),
    format('comite', 'Comité de direction', 'en U', comites, 'places en U'),
    format('gala', 'Dîner de gala et cocktail', 'à table', galas, 'convives à table'),
  ].filter((f): f is FormatSalles => f !== null);
}

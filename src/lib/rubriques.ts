/**
 * Rubriques des domaines — quelles pages existent, leurs adresses, et le
 * rapport de remplissage.
 *
 * Le rapport ne BLOQUE RIEN (décision PO du 16/11/2026) : il liste ce qui
 * manque par rapport à une cible, pour savoir quoi enrichir. Une page légère
 * est publiée quand même.
 */
import { RUBRIQUES, type Rubrique, type RubriqueId, type RubriquesDomaine } from '../types/rubriques.ts';
import { RUBRIQUES_PAR_CHATEAU } from '../data/rubriques/index.ts';

/** Libellés courts du menu des rubriques. */
export const LIBELLES: Record<RubriqueId, string> = {
  salles: 'Salles de réunion',
  chambres: 'Chambres',
  exterieurs: 'Extérieurs',
  restauration: 'Restauration',
  soirees: 'Soirées',
  activites: 'Activités',
  acces: 'Accès',
};

/** Cible de remplissage par rubrique — un repère, jamais une condition. */
const CIBLES: Record<RubriqueId, { photos: number; faits: number; tableauSalles?: true }> = {
  salles: { photos: 6, faits: 3, tableauSalles: true },
  chambres: { photos: 5, faits: 3 },
  exterieurs: { photos: 5, faits: 3 },
  restauration: { photos: 4, faits: 3 },
  soirees: { photos: 4, faits: 2 },
  activites: { photos: 3, faits: 3 },
  acces: { photos: 1, faits: 3 },
};

export function urlRubrique(slug: string, id: RubriqueId): string {
  return `/chateaux/${slug}/${id}`;
}

export function rubriquesDuChateau(slug: string): RubriquesDomaine {
  return RUBRIQUES_PAR_CHATEAU[slug] ?? {};
}

/** Rubriques écrites pour ce château, dans l'ordre du menu. */
export function rubriquesPubliees(slug: string): RubriqueId[] {
  const rubs = rubriquesDuChateau(slug);
  return RUBRIQUES.filter((id) => rubs[id] !== undefined);
}

export function rubrique(slug: string, id: string): Rubrique | undefined {
  return (RUBRIQUES as readonly string[]).includes(id) ? rubriquesDuChateau(slug)[id as RubriqueId] : undefined;
}

export interface LigneRapport {
  slug: string;
  rubrique: RubriqueId;
  manques: string[];
}

export function rapportRemplissage(source: Record<string, RubriquesDomaine> = RUBRIQUES_PAR_CHATEAU): LigneRapport[] {
  return Object.entries(source).flatMap(([slug, rubs]) =>
    RUBRIQUES.filter((id) => rubs[id]).map((id) => {
      const r = rubs[id]!;
      const cible = CIBLES[id];
      const manques: string[] = [];
      if (r.photos.length < cible.photos) manques.push(`photos ${r.photos.length}/${cible.photos}`);
      if (r.faits.length < cible.faits) manques.push(`chiffres clés ${r.faits.length}/${cible.faits}`);
      if (cible.tableauSalles && !r.salles?.length) manques.push('tableau des salles absent');
      const sansSource = r.faits.filter((f) => !f.source).length;
      if (sansSource) manques.push(`${sansSource} chiffre(s) sans source notée`);
      return { slug, rubrique: id, manques };
    }),
  );
}

/** Paragraphes identiques sur deux domaines (à réécrire : contenu propre à chaque lieu). */
export function paragraphesEnDouble(source: Record<string, RubriquesDomaine> = RUBRIQUES_PAR_CHATEAU): string[] {
  const vus = new Map<string, string>();
  const doublons: string[] = [];
  for (const [slug, rubs] of Object.entries(source)) {
    for (const r of Object.values(rubs)) {
      if (!r) continue;
      for (const texte of [r.intro, ...r.blocs.map((b) => b.texte)]) {
        const cle = texte.trim().toLowerCase();
        const autre = vus.get(cle);
        if (autre && autre !== slug) doublons.push(`${autre} / ${slug} : « ${texte.slice(0, 60)}… »`);
        else vus.set(cle, slug);
      }
    }
  }
  return doublons;
}

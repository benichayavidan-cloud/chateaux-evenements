/**
 * Rubriques des domaines — quelles pages existent, leurs adresses, et le
 * rapport de remplissage.
 *
 * Le rapport ne BLOQUE RIEN (décision PO du 16/11/2026) : il liste ce qui
 * manque par rapport à une cible, pour savoir quoi enrichir. Une page légère
 * est publiée quand même.
 */
import { RUBRIQUES, type Rubrique, type RubriqueId, type RubriquesDomaine } from '../types/rubriques.ts';
import { LIEU_DANS_TITRE, RUBRIQUES_PAR_CHATEAU } from '../data/rubriques/index.ts';

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

/**
 * Première ligne du titre de page (H1), un mot-clé différent par rubrique
 * (validé PO 16/11/2026) : la même phrase sur les 7 pages serait du texte
 * passe-partout. La seconde ligne, propre au lieu, vient de LIEU_DANS_TITRE.
 */
export const TITRES: Record<RubriqueId, string> = {
  salles: 'Nos salles de séminaire',
  chambres: 'Nos chambres pour votre séminaire résidentiel',
  exterieurs: 'Nos extérieurs pour la cohésion de vos équipes',
  restauration: 'Notre restauration pour vos séminaires et banquets',
  soirees: "Vos soirées d'entreprise et dîners de gala",
  activites: 'Nos activités de team building',
  acces: 'Venir en séminaire',
};

export function lieuDansTitre(slug: string): string | undefined {
  return LIEU_DANS_TITRE[slug];
}

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

/**
 * Vocabulaire « bon marché » ou « particuliers » banni des pages château
 * (décision PO du 16/11/2026) : chaque espace se décrit par ce qu'il apporte
 * au séminaire (plénière, ateliers, déjeuner d'équipe, dîner de gala).
 * Comparaison sans accents ni casse, au début d'un mot (« buffet » trouve
 * « buffets »). « d'arcade » plutôt que « arcade » : les arcades d'un cloître
 * restent permises.
 */
export const MOTS_BANNIS = [
  'réfectoire', 'auberge', 'brasserie', 'buffet', 'barbecue', 'trattoria',
  'karaoké', "d'arcade", 'brunch', 'familial', 'régimes particuliers',
  'cantine', 'bistrot',
] as const;

const sansAccents = (s: string) =>
  s.normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[’‘]/g, "'").toLowerCase();

const MOTIFS_BANNIS = MOTS_BANNIS.map((mot) => ({
  mot,
  motif: new RegExp(`(^|[^a-z0-9])${sansAccents(mot).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`),
}));

/**
 * Mots bannis trouvés dans le texte publié des rubriques (« slug/rubrique : mot »).
 * Affichage seulement : ne bloque aucune publication (décision PO du 16/11/2026).
 */
export function motsBannis(source: Record<string, RubriquesDomaine> = RUBRIQUES_PAR_CHATEAU): string[] {
  const trouves: string[] = [];
  for (const [slug, rubs] of Object.entries(source)) {
    for (const id of RUBRIQUES) {
      const r = rubs[id];
      if (!r) continue;
      const texte = sansAccents(
        [
          r.seoTitle, r.seoDescription, r.intro, r.resume,
          ...r.blocs.flatMap((b) => [b.titre, b.texte]),
          ...r.faits.flatMap((f) => [f.label, f.valeur]),
          ...r.photos.map((p) => p.legende),
          ...(r.salles ?? []).map((s) => s.nom),
        ].join('\n'),
      );
      for (const { mot, motif } of MOTIFS_BANNIS) if (motif.test(texte)) trouves.push(`${slug}/${id} : ${mot}`);
    }
  }
  return trouves;
}

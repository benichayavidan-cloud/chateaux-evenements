/**
 * Fiches château (/chateaux/[slug]) — titre, description, ville balisée,
 * badges chiffrés et liste des châteaux, tous DÉRIVÉS des données.
 *
 * Pourquoi. L'audit du 15/11/2026 a trouvé sur la fiche du Manoir trois
 * chiffres de chambres (119 dans le texte, « 120 Chambres » en badge,
 * « 100+ Chambres » dans une liste recopiée à la main dans le gabarit de la
 * rubrique) et une description identique sur les 4 fiches (« …d'exception
 * en Chantilly »). Chaque chiffre est désormais écrit UNE fois, dans
 * `roomsTotal`, `meetingRooms` et `capacite.max` ; titres, descriptions et
 * badges le lisent.
 *
 * Jetons acceptés dans `seoTitle` et `seoDescription` :
 * {chambres} {salles} {capacite}.
 */
import type { Chateau } from '../types/index.ts';
import { metaDescription, TITLE_MAX } from './seo.ts';

const SITE = 'https://www.selectchateaux.com';

type Chiffres = Pick<Chateau, 'roomsTotal' | 'meetingRooms' | 'capacite'>;
type FicheSeo = Chiffres & Pick<Chateau, 'nom' | 'region' | 'seoTitle'> & { seoDescription?: string };

export function remplitChiffres(texte: string, c: Chiffres): string {
  return texte
    .replaceAll('{chambres}', String(c.roomsTotal))
    .replaceAll('{salles}', String(c.meetingRooms))
    .replaceAll('{capacite}', String(c.capacite.max));
}

/** « Chantilly (60) » → « Chantilly » : le département n'est pas une ville. */
export function localite(region: string): string {
  return region.split('(')[0].trim();
}

/** Type de lieu tiré du nom (« Grand Château de style… » → « Grand Château »). */
function typeLieu(nom: string): string {
  return nom.split(' de ')[0].split(' à ')[0].split(' en ')[0];
}

/**
 * Titre de repli : « Séminaire <type de lieu> <ville> », borné à 60.
 * Le nom des châteaux est une périphrase (blind booking) : c'est elle qu'on
 * raccourcit, jamais le mot-clé ni la ville.
 */
function titreRepli(nom: string, ville: string): string {
  const type = typeLieu(nom);
  const complet = `Séminaire ${type} ${ville}`;
  if (complet.length <= TITLE_MAX) return complet;

  const budget = TITLE_MAX - `Séminaire  ${ville}`.length;
  const cut = type.slice(0, budget);
  const lastSpace = cut.lastIndexOf(' ');
  const court = cut.slice(0, lastSpace > 0 ? lastSpace : cut.length).replace(/[,;:.\s]+$/, '');
  return `Séminaire ${court} ${ville}`;
}

/** Le titre écrit pour la fiche s'il tient en 60 caractères, sinon le repli. */
export function titreFiche(c: FicheSeo): string {
  const prevu = c.seoTitle ? remplitChiffres(c.seoTitle, c).trim() : '';
  if (prevu && prevu.length <= TITLE_MAX) return prevu;
  return titreRepli(c.nom, localite(c.region));
}

/** La description écrite pour la fiche, sinon une phrase générique correcte. */
export function descriptionFiche(c: FicheSeo): string {
  const ville = localite(c.region);
  const texte = c.seoDescription
    ? remplitChiffres(c.seoDescription, c)
    : `Séminaire d'entreprise dans ce ${typeLieu(c.nom).toLowerCase()} d'exception à ${ville}. Capacité ${c.capacite.max} personnes, hébergement sur place. Devis gratuit en 24h.`;
  return metaDescription(texte);
}

/** Les badges « N Chambres » / « N Salles de Réunion » suivent les données. */
export function aligneChiffres<T extends Pick<Chateau, 'atouts' | 'roomsTotal' | 'meetingRooms'>>(c: T): T {
  return {
    ...c,
    atouts: c.atouts.map((a) => {
      if (/^\d+\+?\s+chambres$/i.test(a)) return `${c.roomsTotal} Chambres`;
      if (/^\d+\+?\s+salles de réunion$/i.test(a)) return `${c.meetingRooms} Salles de Réunion`;
      return a;
    }),
  };
}

/** Châteaux d'un département (`?dept=60` → réf. « #60-… ») ; tous si aucun. */
export function chateauxDuDepartement<T extends Pick<Chateau, 'ref'>>(liste: T[], dept?: string): T[] {
  return dept ? liste.filter((c) => c.ref.startsWith(`#${dept}-`)) : liste;
}

/**
 * Liste des châteaux pour /chateaux uniquement. Un nom et une adresse par
 * fiche, rien d'autre : la description complète vit sur la fiche elle-même,
 * pour que Google ne lise jamais deux versions du même lieu.
 */
export function itemListChateaux(liste: Array<Pick<Chateau, 'nom' | 'slug'>>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Châteaux pour séminaires en Île-de-France',
    numberOfItems: liste.length,
    itemListElement: liste.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.nom,
      url: `${SITE}/chateaux/${c.slug}`,
    })),
  };
}

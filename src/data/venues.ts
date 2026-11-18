// ⚠️ FICHIER GÉNÉRÉ — ne pas éditer à la main.
// Source : CRM, table Prestataire. Régénérer avec :
//   DATABASE_URL=… node scripts/venues/export-venues.mjs
//
// Périmètre : départements 78, 60, 77, 95, 91, 92. Exclut les lieux déjà
// publiés sous alias sur /chateaux, et ceux dont le code postal contredit le
// département déclaré. Seuil de publication :
// description > 400 caractères, capacité renseignée, 6 photos minimum, et aucune
// photo issue de Google Places ou de Kactus (droits).
// Généré le 2026-08-30 — 68 lieux.

export interface VenuePhoto { url: string; legende: string | null; categorie: string | null }
export interface VenueSalle { nom: string; surface: number | null; theatre: number | null; u: number | null; banquet: number | null; cocktail: number | null }

export interface Venue {
  id: string; slug: string; nom: string; categorie: string;
  ville: string | null; codePostal: string | null;
  departementCode: string; departement: string | null; region: string | null;
  adresse: string | null; latitude: number | null; longitude: number | null;
  description: string; resume: string | null;
  capacite: number; chambres: number | null; chambresSingle: number | null; chambresTwin: number | null;
  sallesReunion: number | null; parking: number | null;
  equipements: string[]; services: string[]; atouts: string[];
  salles: VenueSalle[]; photos: VenuePhoto[];
}

/** Date de génération — alimente le lastmod du sitemap. */
export const GENERATED_AT = '2026-08-30';

/**
 * Annuaire retiré du site le 18/11/2026 (décision du PO : le site se présente comme une collection de
 * 4 châteaux). La liste est vide : les blocs qui la lisaient n'affichent plus rien. Les 62 lieux restent
 * dans l'historique git et dans le CRM (scripts/venues/export-venues.mjs). Ne pas régénérer ce fichier
 * sans décision : les adresses /lieux/… sont redirigées (data/redirections-annuaire.json).
 */
export const venues: Venue[] = [];

export function getVenueBySlug(slug: string): Venue | undefined {
  return venues.find(v => v.slug === slug);
}

export function getVenuesByDepartment(code: string): Venue[] {
  return venues.filter(v => v.departementCode === code);
}

/**
 * Photos renommées des châteaux (blind booking) — textes alternatifs et redirections.
 *
 * Pourquoi. Jusqu'au 15/11/2026, les photos des 4 châteaux portaient le vrai
 * nom du lieu (ou d'une salle, d'un bar) dans leur nom de fichier, lisible
 * dans le code de chaque page, alors que le site ne nomme jamais le lieu.
 * Elles s'appellent désormais « seminaire-<type de lieu>-<zone>-<sujet>.webp ».
 * Leur texte alternatif, jusque-là « <nom> - chambre 1 », décrit la photo.
 *
 * Source unique : src/data/photos-renommees.json (lu aussi par
 * next.config.ts pour les redirections 308 des anciennes adresses /images/).
 */

export interface PhotoRenommee {
  ancien: string;
  nouveau: string;
  /** local = public/images ; stockage = bucket Supabase chateaux-images. */
  ou: 'local' | 'stockage';
  alt: string;
}

export interface PhotosRenommees {
  lots: Array<{
    chateau: string;
    dossierStockage: { ancien: string; nouveau: string };
    photos: PhotoRenommee[];
  }>;
}

/** Nom de fichier d'une adresse (locale ou URL complète du stockage). */
function fichier(src: string): string {
  return decodeURIComponent(src.split('?')[0].split('/').pop() ?? '');
}

/** `altPhoto(src, repli)` : la description de la photo si on la connaît, sinon le repli. */
export function creerAltPhoto(photos: PhotosRenommees) {
  const alts = new Map(photos.lots.flatMap((l) => l.photos.map((p) => [p.nouveau, p.alt] as const)));
  return (src: string, repli: string): string => alts.get(fichier(src)) ?? repli;
}

/** 308 des anciennes adresses /images/ vers les nouvelles (Google Images, liens externes). */
export function redirectionsPhotos(photos: PhotosRenommees) {
  return photos.lots
    .flatMap((l) => l.photos)
    .filter((p) => p.ou === 'local')
    .map((p) => ({ source: `/images/${p.ancien}`, destination: `/images/${p.nouveau}`, permanent: true }));
}

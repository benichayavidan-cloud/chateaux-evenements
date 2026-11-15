/**
 * Photos renommées (blind booking) — textes alternatifs et redirections.
 *
 * Pourquoi. Jusqu'au 15/11/2026, les photos du Manoir portaient le vrai nom
 * du lieu dans leur nom de fichier, lisible dans le code de chaque page,
 * alors que le site ne nomme jamais le château. Elles s'appellent désormais
 * « seminaire-chateau-chantilly-<sujet>.webp ». Leur texte alternatif, jusque-là
 * « <nom> - chambre 1 », décrit ce que montre la photo.
 *
 * Source unique : src/data/photos-manoir-chantilly.json (lu aussi par
 * next.config.ts pour les redirections 308 des anciennes adresses).
 */

export interface PhotosRenommees {
  prefixeAncien: string;
  prefixeNouveau: string;
  stockageRenomme: Record<string, string>;
  alt: Record<string, string>;
}

/** Nom de fichier d'une adresse (locale ou URL complète du stockage). */
function fichier(src: string): string {
  return decodeURIComponent(src.split('?')[0].split('/').pop() ?? '');
}

/** `altPhoto(src, repli)` : la description de la photo si on la connaît, sinon le repli. */
export function creerAltPhoto(photos: PhotosRenommees) {
  return (src: string, repli: string): string => {
    const f = fichier(src);
    if (!f.startsWith(photos.prefixeNouveau)) return repli;
    const sujet = f.slice(photos.prefixeNouveau.length).replace(/\.webp$/, '');
    return photos.alt[sujet] ?? repli;
  };
}

/** 308 des anciennes adresses /images/ vers les nouvelles (Google Images, liens externes). */
export function redirectionsPhotos(photos: PhotosRenommees) {
  const stockageSeul = new Set(
    Object.values(photos.stockageRenomme).map((f) => f.slice(photos.prefixeNouveau.length).replace(/\.webp$/, '')),
  );
  return Object.keys(photos.alt)
    .filter((sujet) => !stockageSeul.has(sujet))
    .map((sujet) => ({
      source: `/images/${photos.prefixeAncien}${sujet}.webp`,
      destination: `/images/${photos.prefixeNouveau}${sujet}.webp`,
      permanent: true,
    }));
}

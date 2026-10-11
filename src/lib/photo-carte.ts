/**
 * Photo affichée sur la carte d'un lieu (grilles d'articles, de départements,
 * page /lieux). Ce n'est pas `photos[0]` : la table vérifiée à l'œil
 * (data/photos-cartes) écarte les logos, bannières et images floues.
 *
 * Module pur : testé par `node --test src/lib/photo-carte.test.ts`.
 */

import { PHOTO_CARTE } from '../data/photos-cartes.ts';

interface AvecPhotos<P> {
  slug: string;
  photos: P[];
}

/** Photo de carte du lieu, ou null s'il n'en a pas de présentable (carte masquée). */
export function photoCarte<P>(lieu: AvecPhotos<P>): P | null {
  const i = PHOTO_CARTE[lieu.slug];
  if (i === null || i === undefined) return null;
  return lieu.photos[i] ?? null;
}

/** Lieux qui peuvent être montrés en carte, dans le même ordre. */
export function avecPhotoCarte<P, L extends AvecPhotos<P>>(lieux: L[]): L[] {
  return lieux.filter((l) => photoCarte(l) !== null);
}

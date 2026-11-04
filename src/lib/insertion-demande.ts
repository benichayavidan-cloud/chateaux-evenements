/**
 * Insertion d'une demande de devis, avec un second essai.
 *
 * `origine_ads` et `origine_utm` contiennent du texte venu de l'adresse de la page.
 * Si Postgres les refuse (ou si la colonne manque), la demande ne doit pas être
 * perdue pour autant : on la réenregistre une fois sans elles, et on le journalise.
 * Aucun type TS-only (enum…) : le fichier est testé par `node --test`.
 */

interface ResultatInsertion<R> {
  data: R[] | null;
  error: { message: string } | null;
}

export async function insererAvecRepli<L extends { origine_ads?: unknown; origine_utm?: unknown }, R>(
  inserer: (ligne: Partial<L>) => PromiseLike<ResultatInsertion<R>>,
  ligne: L,
  journaliser: (...args: unknown[]) => void = console.error,
): Promise<ResultatInsertion<R>> {
  const essai = await inserer(ligne);
  if (!essai.error) return essai;
  journaliser('Insertion de la demande refusée, second essai sans origine_ads ni origine_utm :', JSON.stringify(essai.error));
  const sansColonnes: Partial<L> = { ...ligne };
  delete sansColonnes.origine_ads;
  delete sansColonnes.origine_utm;
  return inserer(sansColonnes);
}

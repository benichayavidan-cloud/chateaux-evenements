/**
 * Rubriques par château (clé = slug de la fiche). Un château absent d'ici n'a
 * pas encore de sous-pages : sa fiche reste telle quelle.
 */
import type { RubriquesDomaine } from '../../types/rubriques.ts';
import { rubriquesAbbaye } from './abbaye-chevreuse.ts';

export const RUBRIQUES_PAR_CHATEAU: Record<string, RubriquesDomaine> = {
  'abbaye-millenaire-vallee-chevreuse': rubriquesAbbaye,
};

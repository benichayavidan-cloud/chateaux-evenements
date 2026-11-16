/**
 * Rubriques par château (clé = slug de la fiche). Un château absent d'ici n'a
 * pas encore de sous-pages : sa fiche reste telle quelle.
 */
import type { RubriquesDomaine } from '../../types/rubriques.ts';
import { rubriquesAbbaye } from './abbaye-chevreuse.ts';
import { rubriquesManoirChantilly } from './manoir-chantilly.ts';
import { rubriquesChateauForet } from './chateau-foret-chantilly.ts';
import { rubriquesHotelParis92 } from './hotel-paris-92.ts';

export const RUBRIQUES_PAR_CHATEAU: Record<string, RubriquesDomaine> = {
  'abbaye-millenaire-vallee-chevreuse': rubriquesAbbaye,
  'manoir-anglo-normand-chantilly': rubriquesManoirChantilly,
  'palais-royal-foret-chantilly': rubriquesChateauForet,
  'hotel-historique-seminaire-paris-92': rubriquesHotelParis92,
};

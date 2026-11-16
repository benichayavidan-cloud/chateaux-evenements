/**
 * Rubriques par château (clé = slug de la fiche). Un château absent d'ici n'a
 * pas encore de sous-pages : sa fiche reste telle quelle.
 */
import type { RubriquesDomaine } from '../../types/rubriques.ts';
import { rubriquesAbbaye } from './abbaye-chevreuse.ts';
import { rubriquesManoirChantilly } from './manoir-chantilly.ts';
import { rubriquesChateauForet } from './chateau-foret-chantilly.ts';
import { rubriquesHotelParis92 } from './hotel-paris-92.ts';

/**
 * Deuxième ligne (dorée) du titre des rubriques : où l'on est. Forme courte du
 * nom anonymisé, avec sa préposition (« à l'… », « au … »). Jamais le vrai nom.
 */
export const LIEU_DANS_TITRE: Record<string, string> = {
  'abbaye-millenaire-vallee-chevreuse': "à l'Ancienne Abbaye Cistercienne",
  'manoir-anglo-normand-chantilly': 'au Grand Château Anglo-Normand',
  'palais-royal-foret-chantilly': 'au Château 5 Étoiles face à la Forêt',
  'hotel-historique-seminaire-paris-92': 'au Domaine Historique aux Portes de Paris',
};

export const RUBRIQUES_PAR_CHATEAU: Record<string, RubriquesDomaine> = {
  'abbaye-millenaire-vallee-chevreuse': rubriquesAbbaye,
  'manoir-anglo-normand-chantilly': rubriquesManoirChantilly,
  'palais-royal-foret-chantilly': rubriquesChateauForet,
  'hotel-historique-seminaire-paris-92': rubriquesHotelParis92,
};

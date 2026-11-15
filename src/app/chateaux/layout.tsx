export { metadata } from './metadata';

/**
 * Gabarit de la rubrique /chateaux — sans balisage.
 *
 * La liste des 4 châteaux (ItemList) vivait ici et s'imprimait donc AUSSI sur
 * chaque fiche, avec une description recopiée à la main qui contredisait la
 * fiche (« 100+ Chambres » contre 119 au 15/11/2026). Elle est désormais
 * construite depuis les données, sur la seule page /chateaux.
 */
export default function ChateauxLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

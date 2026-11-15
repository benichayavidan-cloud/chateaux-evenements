/**
 * PAGE CHÂTEAUX — Server Component.
 * Lit le filtre `?dept=` côté serveur et le passe en prop à la vue :
 * le HTML servi contient H1 + les 4 châteaux (crawlable par Google
 * ET par les bots IA qui n'exécutent pas le JavaScript).
 */

import { ChateauxPageView } from './chateaux-page-view';
import { chateaux } from '@/data/chateaux';
import { StructuredData } from '@/components/StructuredData';
import { chateauxDuDepartement, itemListChateaux } from '@/lib/fiche-chateau';

interface ChateauxPageProps {
  searchParams: Promise<{ dept?: string }>;
}

export default async function ChateauxPage({ searchParams }: ChateauxPageProps) {
  const { dept } = await searchParams;
  // Mêmes châteaux que ceux affichés (filtre ?dept= compris) : on ne balise que le visible.
  const affiches = chateauxDuDepartement(chateaux, dept);
  return (
    <>
      {affiches.length > 0 && <StructuredData data={itemListChateaux(affiches)} />}
      <ChateauxPageView dept={dept} />
    </>
  );
}

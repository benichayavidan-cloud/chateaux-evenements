/**
 * PAGE CHÂTEAUX — Server Component.
 * Lit le filtre `?dept=` côté serveur et le passe en prop à la vue :
 * le HTML servi contient H1 + les 4 châteaux (crawlable par Google
 * ET par les bots IA qui n'exécutent pas le JavaScript).
 */

import { ChateauxPageView } from './chateaux-page-view';

interface ChateauxPageProps {
  searchParams: Promise<{ dept?: string }>;
}

export default async function ChateauxPage({ searchParams }: ChateauxPageProps) {
  const { dept } = await searchParams;
  return <ChateauxPageView dept={dept} />;
}

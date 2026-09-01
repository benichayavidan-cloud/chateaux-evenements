/**
 * CLUSTERS SEO — page canonique de chaque zone/thème.
 *
 * Source unique : `scripts/agent-cm/seo-clusters.json`, déjà utilisé par les
 * gates anti-cannibalisation de l'agent éditorial. Le site le consommait
 * jusqu'ici indirectement (BLOG_LINK_MAP recopiait les cibles à la main) ;
 * ce module l'expose typé pour que rendu et agent partagent le même registre.
 *
 * Ne pas dupliquer les clusters ici : éditer le JSON.
 */

import clustersJson from "../../scripts/agent-cm/seo-clusters.json";

export interface SeoCluster {
  id: string;
  /** Page de référence de la zone — c'est elle qui doit ranker sur la requête tête. */
  canonical: string;
  type: string;
  primaryKeywords: string[];
  zoneWords?: string[];
  anchorText: string;
}

export const seoClusters: SeoCluster[] = (clustersJson.clusters ?? []) as SeoCluster[];

/** Normalise pour comparaison : minuscules, sans accents, sans ponctuation. */
function normaliser(texte: string): string {
  return texte
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

/**
 * Cluster auquel appartient un article, s'il en a un.
 *
 * Un article de zone est un satellite : il doit pointer vers la page canonique
 * plutôt que la concurrencer. Mesuré le 01/09/2026 : sur « séminaire chantilly »
 * et « séminaire yvelines », Google classait l'article de blog AVANT la landing
 * dédiée, alors que celle-ci est la page conçue pour convertir.
 *
 * La détection est volontairement stricte — un mot de zone dans le slug ou le
 * titre. Un article sans ancrage géographique (« discours de clôture »,
 * « assurance annulation ») ne relève d'aucun cluster et n'affiche rien.
 */
export function clusterDeLArticle(slug: string, titre: string): SeoCluster | null {
  const slugNorm = normaliser(slug);
  const titreNorm = normaliser(titre);

  for (const cluster of seoClusters) {
    if (cluster.type !== "landing") continue;
    for (const mot of cluster.zoneWords ?? []) {
      const m = normaliser(mot);
      if (!m) continue;
      const dansSlug = new RegExp(`(^| )${m}( |$)`).test(slugNorm);
      const dansTitre = new RegExp(`(^| )${m}( |$)`).test(titreNorm);
      if (dansSlug || dansTitre) return cluster;
    }
  }
  return null;
}

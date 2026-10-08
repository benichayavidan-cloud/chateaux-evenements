/**
 * Articles retirés de Google — registre src/data/articles-hors-google.json.
 *
 * noindex + hors sitemap, mais la page reste en ligne et ses liens restent
 * suivis : un visiteur venu d'une page du site la lit toujours.
 *
 * Module pur (aucune dépendance) : testé par `node --test src/lib/hors-google.test.ts`.
 */

export interface ArticleHorsGoogle {
  slug: string;
  raison: string;
}

export function creerFiltreHorsGoogle(articles: ArticleHorsGoogle[]) {
  const slugs = new Set(articles.map((a) => a.slug));

  function estHorsGoogle(slug: string): boolean {
    return slugs.has(slug);
  }

  function robots(slug: string): { index: boolean; follow: boolean } {
    return { index: !estHorsGoogle(slug), follow: true };
  }

  return { estHorsGoogle, robots };
}

/**
 * Pagination du blog — constante PURE, sans import de données.
 * NE JAMAIS importer @/data/blog-posts ici : ce module est consommé par la
 * vue client, et la moindre dépendance data embarquerait les ~291 articles
 * complets dans le bundle JS (chunk de 5,8 Mo constaté).
 */

export const POSTS_PER_PAGE = 36;

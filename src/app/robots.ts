import { MetadataRoute } from 'next'

/**
 * Fichier robots.ts - Guide les robots d'indexation
 * Autorise l'indexation complète du site, sauf les routes techniques
 * et les URLs avec parametres de filtre (eviter contenu duplique).
 */
export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://www.selectchateaux.com'

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/api/',           // Routes API privées
        '/_next/',         // Assets Next.js internes
        '/admin/',         // Panel admin
        '/chateaux?*',     // Filtres departement (?dept=) et recherche (?q=)
        '/blog?*',         // Filtres categorie (?category=)
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}

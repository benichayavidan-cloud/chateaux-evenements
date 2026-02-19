import { MetadataRoute } from 'next'

/**
 * Fichier robots.ts - Guide les robots d'indexation
 * Autorise l'indexation complète du site, sauf les routes techniques.
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
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}

import { MetadataRoute } from 'next'

/**
 * Fichier robots.ts - Guide les robots d'indexation
 *
 * ⚠️ IMPORTANT: Le blocage d'indexation réel est géré via robots metadata
 * dans layout.tsx (robots: { index: false, follow: false }).
 *
 * Ce fichier reste permissif pour faciliter l'activation future de l'indexation.
 * Il suffit de changer layout.tsx pour passer en production.
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

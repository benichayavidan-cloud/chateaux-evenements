import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://www.selectchateaux.com'

  // MODE PRÉ-LANCEMENT : BLOQUER TOUT LE MONDE
  // TODO: Passer en mode production après validation

  return {
    rules: {
      userAgent: '*',
      disallow: '/',
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }

  /*
  CONFIGURATION PRODUCTION (À ACTIVER AU LANCEMENT) :

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/devis?*',
          '/_next/',
          '/admin/',
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
  */
}

import { MetadataRoute } from 'next'
import { chateaux } from '@/data/chateaux'
import { blogPosts } from '@/data/blog-posts'
import { venues, GENERATED_AT } from '@/data/venues'
import { landingsDepartements } from '@/data/landings-departements'
import { landingsFormats } from '@/data/landings-formats'
import { geoLandingPages } from '@/data/geo-landing-pages'

/**
 * Sitemap.ts - Génération dynamique du sitemap XML
 *
 * Structure:
 * - Pages statiques (/, /devis, /contact, etc.)
 * - Pages dynamiques des châteaux (/chateaux/[slug])
 * - Pages blog (/blog, /blog/[slug]) - 30 articles
 *
 * Priorités:
 * - 1.0 : Homepage + /devis (money page)
 * - 0.9 : /chateaux (page listing)
 * - 0.8 : Pages châteaux individuelles + pages principales + /blog
 * - 0.7 : Contact + articles blog
 * - 0.3 : Pages légales
 *
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.selectchateaux.com'
  // Date de dernière mise à jour significative des pages statiques/geo —
  // à bumper lors d'une vraie refonte. JAMAIS new Date() : un lastmod qui
  // change à chaque deploy apprend à Google à ignorer le signal.
  // À remonter à chaque modification réelle des pages statiques et des landings.
  // Une date figée dans le passé prive Google de tout signal de fraîcheur : il
  // recrawle alors ces pages à sa convenance, pas après une réécriture de title.
  const staticPagesUpdated = new Date('2026-08-30')

  // Date du dernier changement du GABARIT d'article et de fiche lieu.
  //
  // À distinguer de `dateModified` (JSON-LD) : celui-ci annonce une révision
  // ÉDITORIALE du texte, et n'a pas bougé — les articles n'ont pas été
  // réécrits. `lastModified` répond à une autre question : « le document servi
  // a-t-il changé ? ». Le 01/09/2026, oui, et massivement : la FAQ de chaque
  // article est devenue visible (+448 mots en moyenne) et les titres ont reçu
  // leurs ancres. Sans ce signal, Google recrawlerait à son rythme habituel et
  // ne verrait le changement que dans plusieurs semaines.
  //
  // Comme staticPagesUpdated : une date figée, à remonter lors d'un prochain
  // changement de gabarit. Jamais new Date().
  const gabaritModifie = new Date('2026-09-01')

  /** Le plus récent des deux : la révision éditoriale ou le changement de gabarit. */
  const laPlusRecente = (a: Date, b: Date) => (a > b ? a : b)

  // 1. Pages statiques principales
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: staticPagesUpdated,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/devis`,
      lastModified: staticPagesUpdated,
      changeFrequency: 'weekly',
      priority: 1.0, // Money page - priorité maximale
    },
    {
      url: `${baseUrl}/chateaux`,
      lastModified: staticPagesUpdated,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/seminaires-soirees-entreprise`,
      lastModified: staticPagesUpdated,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/team-building-chateau`,
      lastModified: staticPagesUpdated,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/a-propos`,
      lastModified: staticPagesUpdated,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ]

  // 2. Pages légales - Retirées du sitemap (noindex)
  // À réactiver si ces pages passent en index: true
  const legalPages: MetadataRoute.Sitemap = []

  // 3. Pages dynamiques des châteaux
  const chateauxPages: MetadataRoute.Sitemap = chateaux.map((chateau) => ({
    url: `${baseUrl}/chateaux/${chateau.slug}`,
    lastModified: staticPagesUpdated,
    changeFrequency: 'weekly' as const,
    priority: 0.8, // Priorité importante pour les pages produits
  }))

  // 4. Pages blog
  const referencesPage: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/references`,
      lastModified: staticPagesUpdated,
      changeFrequency: 'monthly',
      priority: 0.8,
    }
  ]

  const authorPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/auteurs/sophie-durand`,
      lastModified: staticPagesUpdated,
      changeFrequency: 'monthly',
      priority: 0.5,
    }
  ]

  const blogListingPage: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/blog`,
      lastModified: staticPagesUpdated,
      changeFrequency: 'daily',
      priority: 0.8,
    }
  ]
  const blogPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: laPlusRecente(new Date(post.updatedAt ?? post.publishedAt), gabaritModifie),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  // 5. Pages géographiques SEO
  const geoPages: MetadataRoute.Sitemap = geoLandingPages.map((page) => ({
    url: `${baseUrl}/${page.slug}`,
    lastModified: staticPagesUpdated,
    changeFrequency: 'weekly' as const,
    priority: 0.85,
  }))

  // 6. Fiches lieux (générées depuis le CRM) + leur index
  // Les fiches lieux ont reçu leur bloc de questions le 01/09 : même raisonnement
  // que pour les articles, le document servi a changé après sa génération.
  const venuesUpdated = laPlusRecente(new Date(GENERATED_AT), gabaritModifie)
  const lieuxListingPage: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/lieux`,
      lastModified: venuesUpdated,
      changeFrequency: 'weekly',
      priority: 0.9,
    }
  ]
  const lieuxPages: MetadataRoute.Sitemap = venues.map((venue) => ({
    url: `${baseUrl}/lieux/${venue.slug}`,
    lastModified: venuesUpdated,
    changeFrequency: 'monthly' as const,
    priority: 0.75,
  }))

  // 7. Landings départementales (91, 77, 95)
  const landingsDeptPages: MetadataRoute.Sitemap = landingsDepartements.map((l) => ({
    url: `${baseUrl}/${l.slug}`,
    lastModified: staticPagesUpdated,
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }))

  // 8. Landings par format (team building géo, journée d'étude)
  const landingsFormatPages: MetadataRoute.Sitemap = landingsFormats.map((l) => ({
    url: `${baseUrl}/${l.slug}`,
    lastModified: staticPagesUpdated,
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }))

  // 9. Pages autonomes à forte valeur GEO
  const pagesGeo: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/budget-seminaire-entreprise`, lastModified: staticPagesUpdated, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/alternative-chateauform`, lastModified: staticPagesUpdated, changeFrequency: 'monthly', priority: 0.8 },
  ]

  // 10. Retour du sitemap complet
  return [
    ...pagesGeo,
    ...landingsDeptPages,
    ...landingsFormatPages,
    ...staticPages,
    ...chateauxPages,
    ...lieuxListingPage,
    ...lieuxPages,
    ...geoPages,
    ...blogListingPage,
    ...blogPages,
    ...referencesPage,
    ...authorPages,
    ...legalPages
  ]
}

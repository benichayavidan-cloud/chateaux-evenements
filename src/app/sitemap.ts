import { MetadataRoute } from 'next'
import { chateaux } from '@/data/chateaux'
import { blogPosts } from '@/data/blog-posts'
import { venues } from '@/data/venues'
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
  const staticPagesUpdated = new Date('2026-08-25')

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
    lastModified: new Date(post.updatedAt ?? post.publishedAt),
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
  const lieuxListingPage: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/lieux`,
      lastModified: staticPagesUpdated,
      changeFrequency: 'weekly',
      priority: 0.9,
    }
  ]
  const lieuxPages: MetadataRoute.Sitemap = venues.map((venue) => ({
    url: `${baseUrl}/lieux/${venue.slug}`,
    lastModified: staticPagesUpdated,
    changeFrequency: 'monthly' as const,
    priority: 0.75,
  }))

  // 7. Retour du sitemap complet
  return [
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

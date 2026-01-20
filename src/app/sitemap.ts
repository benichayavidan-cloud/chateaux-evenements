import { MetadataRoute } from 'next'
import { chateaux } from '@/data/chateaux'
import { blogPosts } from '@/data/blog-posts'

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
 * NOTE: Le site est en mode pré-prod avec robots: { index: false }.
 * Ce sitemap est préparé pour le jour de l'activation.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.selectchateaux.com'
  const currentDate = new Date()

  // 1. Pages statiques principales
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/devis`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1.0, // Money page - priorité maximale
    },
    {
      url: `${baseUrl}/chateaux`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/evenements`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/team-building`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ]

  // 2. Pages légales (faible priorité)
  const legalPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/mentions-legales`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/confidentialite`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/cgv`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]

  // 3. Pages dynamiques des châteaux
  const chateauxPages: MetadataRoute.Sitemap = chateaux.map((chateau) => ({
    url: `${baseUrl}/chateaux/${chateau.slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.8, // Priorité importante pour les pages produits
  }))

  // 4. Page listing blog
  const blogListingPage: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/blog`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8, // Priorité importante pour le contenu SEO
    }
  ]

  // 5. Pages articles blog (30 articles)
  const blogPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.7, // Contenu régulièrement mis à jour
  }))

  // 6. Retour du sitemap complet (prêt pour l'indexation future)
  return [
    ...staticPages,
    ...chateauxPages,
    ...blogListingPage,
    ...blogPages,
    ...legalPages
  ]
}

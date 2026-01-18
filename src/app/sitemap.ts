import { MetadataRoute } from 'next'
import { chateaux } from '@/data/chateaux'

/**
 * Sitemap.ts - Génération dynamique du sitemap XML
 *
 * Structure:
 * - Pages statiques (/, /devis, /contact, etc.)
 * - Pages dynamiques des châteaux (/chateaux/[slug])
 *
 * Priorités:
 * - 1.0 : Homepage + /devis (money page)
 * - 0.9 : /chateaux (page listing)
 * - 0.8 : Pages châteaux individuelles + pages principales
 * - 0.7 : Contact
 * - 0.3 : Pages légales
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

  // 4. Retour du sitemap complet
  return [...staticPages, ...chateauxPages, ...legalPages]
}

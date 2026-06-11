import { MetadataRoute } from 'next'

/**
 * Fichier robots.ts - Guide les robots d'indexation
 * Autorise l'indexation complète du site, sauf les routes techniques
 * et les URLs avec parametres de filtre (eviter contenu duplique).
 *
 * GEO (Generative Engine Optimization) : les crawlers IA sont explicitement
 * autorisés — être cité par ChatGPT/Perplexity/Gemini/Claude est un canal
 * d'acquisition gratuit. Voir aussi /llms.txt (généré dynamiquement).
 */
export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://www.selectchateaux.com'

  const technicalPaths = [
    '/api/',           // Routes API privées
    '/_next/',         // Assets Next.js internes
    '/admin/',         // Panel admin
    '/chateaux?*',     // Filtres departement (?dept=) et recherche (?q=)
    '/blog?*',         // Filtres categorie (?category=)
  ]

  // Crawlers des moteurs de réponse IA — accueil explicite
  const aiBots = [
    'GPTBot',            // OpenAI (entraînement + recherche ChatGPT)
    'OAI-SearchBot',     // OpenAI (ChatGPT Search)
    'ChatGPT-User',      // OpenAI (requêtes utilisateur en direct)
    'ClaudeBot',         // Anthropic
    'Claude-Web',        // Anthropic (navigation en direct)
    'PerplexityBot',     // Perplexity
    'Perplexity-User',   // Perplexity (requêtes utilisateur)
    'Google-Extended',   // Google Gemini
    'Applebot-Extended', // Apple Intelligence
    'CCBot',             // Common Crawl (alimente de nombreux LLM)
    'meta-externalagent',// Meta AI
  ]

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: technicalPaths,
      },
      ...aiBots.map((bot) => ({
        userAgent: bot,
        allow: '/',
        disallow: technicalPaths,
      })),
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}

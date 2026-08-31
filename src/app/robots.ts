import { MetadataRoute } from 'next'

/**
 * Fichier robots.ts - Guide les robots d'indexation
 * Autorise l'indexation complète du site, sauf les routes techniques.
 *
 * GEO (Generative Engine Optimization) : les crawlers IA sont explicitement
 * autorisés — être cité par ChatGPT/Perplexity/Gemini/Claude est un canal
 * d'acquisition gratuit. Voir aussi /llms.txt (généré dynamiquement).
 *
 * ⚠️ NE PAS bloquer /_next/ : les feuilles de style, les bundles JS et les
 * polices y vivent. Les interdire empêche Googlebot de RENDRE les pages —
 * la GSC du 31/08/2026 remontait 5 assets /_next/static/ en « bloquée par
 * robots.txt ». Google demande explicitement l'accès aux ressources de rendu.
 *
 * ⚠️ NE PAS bloquer les URLs à paramètres (?dept=, ?category=) : elles
 * portent déjà un <link rel="canonical"> vers la page parente. Les bloquer
 * empêche Google de LIRE ce canonical, donc de consolider — elles restent
 * en « bloquée par robots.txt » à vie au lieu de se replier proprement.
 */
export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://www.selectchateaux.com'

  const technicalPaths = [
    '/api/',   // Routes API privées
    '/admin/', // Panel admin
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

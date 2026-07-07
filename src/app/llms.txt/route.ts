import { chateaux } from '@/data/chateaux'
import { geoLandingPages } from '@/data/geo-landing-pages'
import { blogPosts } from '@/data/blog-posts'
import { PRICING, pricingSummary } from '@/data/pricing'

/**
 * /llms.txt — Fichier de découverte pour les moteurs IA (ChatGPT, Perplexity,
 * Claude, Gemini). Standard émergent : https://llmstxt.org
 *
 * GÉNÉRÉ DYNAMIQUEMENT depuis les data files (chateaux, geo-landing-pages,
 * blog-posts) — source de vérité unique, zéro dérive : chaque nouveau château,
 * landing ou article apparaît automatiquement.
 */

export const dynamic = 'force-static'

const BASE_URL = 'https://www.selectchateaux.com'

function buildLlmsTxt(): string {
  const lines: string[] = []

  lines.push('# Select Châteaux')
  lines.push('')
  lines.push(
    "> Select Châteaux organise des séminaires d'entreprise, journées d'étude, soirées d'entreprise et team building dans 4 châteaux privatisables en Île-de-France (Chantilly/Oise, Yvelines/Vallée de Chevreuse, Hauts-de-Seine), de 10 à 500 personnes, avec hébergement sur place. Devis gratuit avec réponse garantie sous 24h."
  )
  lines.push('')
  // Chiffres GÉNÉRÉS depuis les data files (capacités/chambres : chateaux.ts,
  // prix : pricing.ts) — une mise à jour des données met à jour ce fichier.
  const capMax = Math.max(...chateaux.map((c) => c.capacite.max))
  const roomsMax = Math.max(...chateaux.map((c) => c.roomsTotal || 0))
  lines.push('Informations clés :')
  lines.push('- Zone : Île-de-France, châteaux à 30-45 minutes de Paris (certains à 15 min de l\'aéroport CDG)')
  lines.push('- Formats : séminaire résidentiel, journée d\'étude, convention, kick-off, CODIR, soirée de gala, team building')
  lines.push(`- Capacités : de 10 à 500 personnes selon le domaine, jusqu'à ${capMax} en plénière`)
  lines.push(`- Hébergement : jusqu'à ${roomsMax} chambres sur site selon le château`)
  lines.push(`- Budget indicatif ${PRICING.year} : ${pricingSummary()}`)
  lines.push(`- Demande de devis (gratuit, réponse 24h) : ${BASE_URL}/devis`)
  lines.push('')

  // ── Châteaux (données live depuis chateaux.ts)
  lines.push('## Les châteaux')
  lines.push('')
  for (const c of chateaux) {
    const caps = `${c.capacite.min}-${c.capacite.max} pers`
    const rooms = c.roomsTotal ? `, ${c.roomsTotal} chambres` : ''
    const meeting = c.meetingRooms ? `, ${c.meetingRooms} salles de réunion` : ''
    lines.push(`- [${c.nom}](${BASE_URL}/chateaux/${c.slug}) : ${c.region} — ${caps}${rooms}${meeting}`)
  }
  lines.push('')

  // ── Pages services par zone (données live depuis geo-landing-pages.ts)
  lines.push('## Séminaires par zone géographique')
  lines.push('')
  for (const p of geoLandingPages) {
    lines.push(`- [${p.h1}](${BASE_URL}/${p.slug}) : ${p.description}`)
  }
  lines.push(`- [Team building en château](${BASE_URL}/team-building-chateau) : +40 activités de cohésion en château privatisé, de 20 à 500 personnes`)
  lines.push(`- [Soirées d'entreprise](${BASE_URL}/seminaires-soirees-entreprise) : soirées de gala, dîners d'exception et événements d'entreprise en château`)
  lines.push(`- [Catalogue des châteaux](${BASE_URL}/chateaux)`)
  lines.push('')

  // ── Guides les plus utiles (sélection éditoriale : prix, organisation, comparatifs)
  lines.push('## Guides essentiels')
  lines.push('')
  const essentialSlugs = [
    'combien-coute-seminaire-chateau-2026',
    'checklist-organiser-seminaire',
    'seminaire-residentiel-vs-journee',
    'seminaire-codir-chateau-privatise',
  ]
  for (const slug of essentialSlugs) {
    const post = blogPosts.find((p) => p.slug === slug)
    if (post) lines.push(`- [${post.title}](${BASE_URL}/blog/${post.slug}) : ${post.excerpt}`)
  }
  lines.push('')

  // ── Tout le blog (titres seulement — découverte exhaustive)
  lines.push('## Tous les articles du blog')
  lines.push('')
  for (const p of blogPosts) {
    if (essentialSlugs.includes(p.slug)) continue
    lines.push(`- [${p.title}](${BASE_URL}/blog/${p.slug})`)
  }
  lines.push('')

  lines.push('## Contact')
  lines.push('')
  lines.push(`- Demande de devis : ${BASE_URL}/devis (formulaire 2 min, réponse garantie sous 24h, gratuit et sans engagement)`)
  lines.push(`- À propos : ${BASE_URL}/a-propos`)
  lines.push('')

  return lines.join('\n')
}

export async function GET() {
  return new Response(buildLlmsTxt(), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  })
}

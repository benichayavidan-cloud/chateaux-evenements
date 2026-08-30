import { chateaux } from '@/data/chateaux'
import { venues } from '@/data/venues'
import { landingsDepartements } from '@/data/landings-departements'
import { landingsFormats } from '@/data/landings-formats'
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
  lines.push(`Version complète (contenu détaillé des châteaux, zones, tarifs et guides) : ${BASE_URL}/llms-full.txt`)
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

  // ── Répertoire complet des lieux (données live depuis venues.ts, généré CRM).
  // C'est le contenu que les moteurs de réponse ne trouvent nulle part ailleurs :
  // capacité, chambres et salles réelles, lieu par lieu.
  const byDept: Record<string, typeof venues> = {}
  for (const v of venues) (byDept[v.departementCode] ||= []).push(v)
  const deptLabels: Record<string, string> = {
    '78': 'Yvelines (78)', '60': 'Oise (60)', '77': 'Seine-et-Marne (77)',
    '95': "Val-d'Oise (95)", '91': 'Essonne (91)', '92': 'Hauts-de-Seine (92)',
  }
  lines.push(`## Répertoire des lieux de séminaire (${venues.length} lieux vérifiés)`)
  lines.push('')
  lines.push(`Index complet : ${BASE_URL}/lieux`)
  lines.push('')
  for (const [code, list] of Object.entries(byDept).sort((a, b) => b[1].length - a[1].length)) {
    lines.push(`### ${deptLabels[code] ?? code} — ${list.length} lieux`)
    lines.push('')
    for (const v of [...list].sort((a, b) => b.capacite - a.capacite)) {
      const rooms = v.chambres ? `, ${v.chambres} chambres` : ''
      const halls = v.sallesReunion ? `, ${v.sallesReunion} salles` : ''
      const city = v.ville ? `${v.ville} — ` : ''
      lines.push(`- [${v.nom}](${BASE_URL}/lieux/${v.slug}) : ${city}${v.categorie}, jusqu'à ${v.capacite} personnes${rooms}${halls}`)
    }
    lines.push('')
  }

  // ── Pages services par zone (données live depuis geo-landing-pages.ts)
  lines.push('## Séminaires par zone géographique')
  lines.push('')
  for (const p of geoLandingPages) {
    lines.push(`- [${p.h1}](${BASE_URL}/${p.slug}) : ${p.description}`)
  }
  for (const l of landingsDepartements) {
    lines.push(`- [${l.h1}](${BASE_URL}/${l.slug}) : ${l.description}`)
  }
  for (const l of landingsFormats) {
    lines.push(`- [${l.h1}](${BASE_URL}/${l.slug}) : ${l.description}`)
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
  lines.push(`- Références clients (études de cas réelles, séminaires de 45 à 280 personnes — Eiffage, Safran.AI, LCL, Boston Scientific…) : ${BASE_URL}/references`)
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

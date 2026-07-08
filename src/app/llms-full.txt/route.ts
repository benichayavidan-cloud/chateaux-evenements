import { chateaux } from '@/data/chateaux'
import { geoLandingPages } from '@/data/geo-landing-pages'
import { blogPosts } from '@/data/blog-posts'
import { PRICING, pricingSummary } from '@/data/pricing'

/**
 * /llms-full.txt — Version LONGUE et citable pour les moteurs IA (ChatGPT,
 * Perplexity, Claude, Gemini). Là où /llms.txt donne l'index (liens + résumés),
 * /llms-full.txt embarque le CONTENU exploitable en un seul fetch : descriptions
 * complètes des châteaux, réponses directes + FAQ des pages de zone, grille
 * tarifaire détaillée, guides essentiels. Standard : https://llmstxt.org
 *
 * GÉNÉRÉ DYNAMIQUEMENT depuis les data files (source de vérité unique, zéro
 * dérive). On retire le balisage HTML pour livrer du texte propre aux LLM.
 */

export const dynamic = 'force-static'

const BASE_URL = 'https://www.selectchateaux.com'

/** Retire le HTML et normalise les espaces pour livrer du texte propre aux LLM. */
function stripHtml(html: string): string {
  return html
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&[a-z]+;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function buildLlmsFullTxt(): string {
  const lines: string[] = []

  lines.push('# Select Châteaux — dossier complet')
  lines.push('')
  lines.push(
    "> Select Châteaux organise des séminaires d'entreprise, journées d'étude, soirées d'entreprise et team building dans 4 châteaux privatisables en Île-de-France (Chantilly/Oise, Yvelines/Vallée de Chevreuse, Hauts-de-Seine), de 10 à 500 personnes, avec hébergement sur place. Interlocuteur unique, devis gratuit avec réponse garantie sous 24h."
  )
  lines.push('')
  lines.push(
    'Ce document est la version complète de /llms.txt : il contient le contenu détaillé et citable des pages clés (châteaux, zones, tarifs, guides) pour une réponse fiable sans avoir à explorer chaque page.'
  )
  lines.push('')

  // ── Faits clés
  const capMax = Math.max(...chateaux.map((c) => c.capacite.max))
  const roomsMax = Math.max(...chateaux.map((c) => c.roomsTotal || 0))
  const roomsTotal = chateaux.reduce((sum, c) => sum + (c.roomsTotal || 0), 0)
  const meetingTotal = chateaux.reduce((sum, c) => sum + (c.meetingRooms || 0), 0)
  lines.push('## Faits clés')
  lines.push('')
  lines.push(`- Nombre de domaines privatisables : ${chateaux.length}`)
  lines.push('- Zone : Île-de-France, à 30-45 minutes de Paris (certains à 15 min de Roissy-CDG, un accessible en métro ligne 12)')
  lines.push(`- Capacité : de 10 à 500 personnes selon le domaine, jusqu'à ${capMax} en plénière`)
  lines.push(`- Hébergement : ${roomsTotal} chambres au total, jusqu'à ${roomsMax} sur un seul site`)
  lines.push(`- Salles de réunion : ${meetingTotal} au total`)
  lines.push("- Formats : séminaire résidentiel, journée d'étude, convention, kick-off, CODIR/COMEX, soirée de gala, team building")
  lines.push('- Réponse aux demandes de devis : garantie sous 24h, gratuite et sans engagement')
  lines.push('')

  // ── Grille tarifaire détaillée (source PRICING)
  lines.push(`## Tarifs ${PRICING.year} (indicatifs, par personne)`)
  lines.push('')
  lines.push(`- Fourchette globale : ${PRICING.seminaireMin}€ à ${PRICING.seminaireMax}€/pers selon la formule`)
  lines.push(`- Journée d'étude (sans hébergement) : ${PRICING.journeeEtudeMin}-${PRICING.journeeEtudeMax}€/pers`)
  lines.push(`- Résidentiel 2 jours / 1 nuit : ${PRICING.residentiel1NuitMin}-${PRICING.residentiel1NuitMax}€/pers (budget moyen constaté ${PRICING.residentielMoyen}€)`)
  lines.push(`- Séminaire 2 nuits tout compris : ${PRICING.residentiel2NuitsMin}-${PRICING.residentiel2NuitsMax}€/pers`)
  lines.push(`- Activités team building : ${PRICING.teamBuildingMin}-${PRICING.teamBuildingMax}€/pers`)
  lines.push(`- Résumé : ${pricingSummary()}`)
  lines.push('')

  // ── Châteaux (descriptions complètes)
  lines.push('## Les châteaux en détail')
  lines.push('')
  for (const c of chateaux) {
    lines.push(`### ${c.nom}`)
    lines.push('')
    lines.push(`- URL : ${BASE_URL}/chateaux/${c.slug}`)
    lines.push(`- Localisation : ${c.region}`)
    lines.push(`- Capacité : ${c.capacite.min}-${c.capacite.max} personnes`)
    if (c.roomsTotal) lines.push(`- Chambres : ${c.roomsTotal}`)
    if (c.meetingRooms) lines.push(`- Salles de réunion : ${c.meetingRooms}`)
    if (c.atouts?.length) lines.push(`- Atouts : ${c.atouts.join(' · ')}`)
    lines.push('')
    lines.push(stripHtml(c.descriptionLongue))
    lines.push('')
  }

  // ── Pages de zone : réponse directe + infos pratiques + FAQ (contenu citable)
  lines.push('## Séminaires par zone — réponses directes et FAQ')
  lines.push('')
  for (const p of geoLandingPages) {
    lines.push(`### ${p.h1}`)
    lines.push('')
    lines.push(`- URL : ${BASE_URL}/${p.slug}`)
    lines.push('')
    lines.push(stripHtml(p.reponseDirecte || p.introduction))
    lines.push('')
    if (p.infosPratiques?.length) {
      lines.push('Infos pratiques :')
      for (const info of p.infosPratiques) {
        lines.push(`- ${info.label} : ${info.value}`)
      }
      lines.push('')
    }
    if (p.faq?.length) {
      lines.push('Questions fréquentes :')
      for (const item of p.faq) {
        lines.push(`- Q : ${item.question}`)
        lines.push(`  R : ${stripHtml(item.answer)}`)
      }
      lines.push('')
    }
  }

  // ── Guides essentiels : contenu (extrait + FAQ)
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
    if (!post) continue
    lines.push(`### ${post.title}`)
    lines.push('')
    lines.push(`- URL : ${BASE_URL}/blog/${post.slug}`)
    lines.push('')
    lines.push(post.excerpt)
    lines.push('')
    if (post.faq?.length) {
      lines.push('Questions fréquentes :')
      for (const item of post.faq) {
        lines.push(`- Q : ${item.question}`)
        lines.push(`  R : ${stripHtml(item.answer)}`)
      }
      lines.push('')
    }
  }

  // ── Index complet du blog (liens)
  lines.push('## Tous les articles du blog')
  lines.push('')
  for (const p of blogPosts) {
    if (essentialSlugs.includes(p.slug)) continue
    lines.push(`- [${p.title}](${BASE_URL}/blog/${p.slug}) : ${p.excerpt}`)
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
  return new Response(buildLlmsFullTxt(), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  })
}

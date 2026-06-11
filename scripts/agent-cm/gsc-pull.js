#!/usr/bin/env node
const { google } = require('googleapis');
const {
  GSC_SITE_URL, GSC_CLIENT_ID, GSC_CLIENT_SECRET, GSC_REFRESH_TOKEN,
} = require('./config');

function getAuthClient() {
  if (!GSC_CLIENT_ID || !GSC_CLIENT_SECRET || !GSC_REFRESH_TOKEN) {
    throw new Error('GSC credentials missing — set GSC_CLIENT_ID, GSC_CLIENT_SECRET, GSC_REFRESH_TOKEN env vars');
  }
  const oauth2Client = new google.auth.OAuth2(GSC_CLIENT_ID, GSC_CLIENT_SECRET, 'http://localhost');
  oauth2Client.setCredentials({ refresh_token: GSC_REFRESH_TOKEN });
  return oauth2Client;
}

function formatDate(daysAgo) {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return d.toISOString().split('T')[0];
}

// Source unique : scanne les 4 fichiers de données blog (pas seulement
// blog-posts-camille.ts — sinon l'agent croit "vierges" ~150 sujets déjà couverts).
const { getExistingArticles } = require('./anti-cannibalisation');

function getExistingSlugs() {
  return getExistingArticles().map(a => a.slug);
}

async function pullGSCData(period = '30days', limit = 200) {
  const auth = getAuthClient();
  const sc = google.searchconsole({ version: 'v1', auth });
  const days = { '7days': 7, '30days': 30, '90days': 90, '16months': 480 }[period] || 30;
  const startDate = formatDate(days);
  const endDate = formatDate(0);

  const [queriesRes, pagesRes, ownershipRes] = await Promise.all([
    sc.searchanalytics.query({
      siteUrl: GSC_SITE_URL,
      requestBody: { startDate, endDate, dimensions: ['query'], rowLimit: limit, type: 'web' },
    }),
    sc.searchanalytics.query({
      siteUrl: GSC_SITE_URL,
      requestBody: { startDate, endDate, dimensions: ['page'], rowLimit: limit, type: 'web' },
    }),
    // CRITIQUE ANTI-CANNIBALISATION : mapping requête → pages qui rankent dessus.
    // Sans ce mapping, chaque requête "opportunité" devenait un nouvel article
    // concurrent de la page qui générait déjà ses impressions.
    sc.searchanalytics.query({
      siteUrl: GSC_SITE_URL,
      requestBody: { startDate, endDate, dimensions: ['query', 'page'], rowLimit: Math.min(limit * 5, 25000), type: 'web' },
    }),
  ]);

  const stripBase = (url) => url.replace(GSC_SITE_URL.replace(/\/$/, ''), '') || '/';

  // Pour chaque requête : la page propriétaire (+ détection de cannibalisation si 2+ pages)
  const ownership = {};
  for (const r of (ownershipRes.data.rows || [])) {
    const [query, pageUrl] = r.keys;
    const page = stripBase(pageUrl);
    if (!ownership[query]) ownership[query] = [];
    ownership[query].push({ page, impressions: r.impressions, position: +r.position.toFixed(1) });
  }
  for (const q of Object.keys(ownership)) {
    ownership[q].sort((a, b) => b.impressions - a.impressions);
  }

  const annotate = (q) => {
    const owners = ownership[q.query] || [];
    return {
      ...q,
      ownedBy: owners[0]?.page || null,
      ownerPosition: owners[0]?.position ?? null,
      ownerIsLanding: owners[0] ? !owners[0].page.startsWith('/blog') : false,
      cannibalized: owners.length >= 2 ? owners.slice(0, 4).map(o => o.page) : null,
    };
  };

  const queries = (queriesRes.data.rows || []).map(r => annotate({
    query: r.keys[0], clicks: r.clicks, impressions: r.impressions,
    ctr: +(r.ctr * 100).toFixed(1), position: +r.position.toFixed(1),
  }));

  const pages = (pagesRes.data.rows || []).map(r => ({
    page: stripBase(r.keys[0]),
    clicks: r.clicks, impressions: r.impressions,
    ctr: +(r.ctr * 100).toFixed(1), position: +r.position.toFixed(1),
  }));

  return { queries, pages, period, startDate, endDate };
}

function analyzeOpportunities(data) {
  const existingSlugs = getExistingSlugs();
  const byImpressions = (a, b) => b.impressions - a.impressions;

  // PARADIGME ANTI-CANNIBALISATION :
  // Toute requête avec impressions a déjà une page propriétaire (ownedBy).
  // → On RENFORCE la page propriétaire (réécriture, maillage, title CTR).
  // → On n'écrit JAMAIS un nouvel article sur une requête possédée.
  // Les nouveaux articles viennent de sujets vierges (recherche externe),
  // validés par anti-cannibalisation.js.
  return {
    // Requêtes possédées par une LANDING/service page → renforcer la landing
    // (maillage interne depuis le blog avec ancre exacte, jamais de nouvel article)
    strengthenLanding: data.queries
      .filter(q => q.impressions >= 3 && q.ownedBy && q.ownerIsLanding)
      .sort(byImpressions),
    // Requêtes possédées par un ARTICLE (ownedBy /blog/…) en position 5-25
    // → candidat réécriture GEO de CET article
    rewriteCandidates: data.queries
      .filter(q => q.impressions >= 3 && q.ownedBy && !q.ownerIsLanding && (q.ownerPosition ?? q.position) >= 5 && (q.ownerPosition ?? q.position) <= 25)
      .sort(byImpressions),
    // Requêtes possédées mais loin (position > 25) → renforcer le propriétaire
    // par du maillage interne ; toujours PAS de nouvel article
    lowVisibilityOwned: data.queries
      .filter(q => q.impressions >= 2 && q.ownedBy && (q.ownerPosition ?? q.position) > 25)
      .sort(byImpressions),
    // Requêtes sans propriétaire identifié (hors du join query+page, capé) :
    // NE PAS agir dessus sans vérification manuelle — le propriétaire existe
    // probablement mais n'est pas dans l'échantillon GSC
    unknownOwnership: data.queries
      .filter(q => q.impressions >= 3 && !q.ownedBy)
      .sort(byImpressions),
    // ALERTE : requêtes où 2+ pages du site rankent en même temps (cannibalisation active)
    cannibalizationAlerts: data.queries
      .filter(q => q.cannibalized && q.impressions >= 5)
      .sort(byImpressions)
      .map(q => ({ query: q.query, impressions: q.impressions, position: q.position, pages: q.cannibalized })),
    topPerformers: data.queries.filter(q => q.position <= 5).sort(byImpressions),
    underperformingPages: data.pages.filter(p => p.clicks === 0 && p.impressions >= 5).sort(byImpressions),
    existingSlugs,
    totalQueries: data.queries.length,
    totalPages: data.pages.length,
    period: data.period,
    dateRange: { start: data.startDate, end: data.endDate },
  };
}

async function main() {
  const args = process.argv.slice(2);
  const periodIdx = args.indexOf('--period');
  const limitIdx = args.indexOf('--limit');
  const period = periodIdx >= 0 ? args[periodIdx + 1] : '30days';
  const limit = limitIdx >= 0 ? parseInt(args[limitIdx + 1]) : 200;

  try {
    const data = await pullGSCData(period, limit);
    const analysis = analyzeOpportunities(data);
    console.log(JSON.stringify(analysis, null, 2));
  } catch (err) {
    console.error(JSON.stringify({ error: err.message }));
    process.exit(1);
  }
}

main();

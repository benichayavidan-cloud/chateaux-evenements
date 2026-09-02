#!/usr/bin/env node
/**
 * Export BRUT et COMPLET de Google Search Console.
 *
 * Contrairement à gsc-pull.js (qui sort une analyse filtrée pour l'agent blog),
 * ce script dump toutes les lignes de toutes les dimensions, sur plusieurs
 * fenêtres temporelles, avec pagination — pour un audit humain.
 *
 * Usage : node gsc-dump.js > dump.json
 */
const { google } = require('googleapis');
const {
  GSC_SITE_URL, GSC_CLIENT_ID, GSC_CLIENT_SECRET, GSC_REFRESH_TOKEN,
} = require('./config');

const PAGE_SIZE = 25000;

function getAuthClient() {
  if (!GSC_CLIENT_ID || !GSC_CLIENT_SECRET || !GSC_REFRESH_TOKEN) {
    throw new Error('GSC credentials missing');
  }
  const c = new google.auth.OAuth2(GSC_CLIENT_ID, GSC_CLIENT_SECRET, 'http://localhost');
  c.setCredentials({ refresh_token: GSC_REFRESH_TOKEN });
  return c;
}

const iso = (d) => d.toISOString().split('T')[0];
function daysAgo(n) { const d = new Date(); d.setDate(d.getDate() - n); return iso(d); }

// GSC plafonne à 25k lignes par appel → on pagine via startRow tant que la
// page revient pleine.
async function queryAll(sc, { startDate, endDate, dimensions, type = 'web', filters }) {
  const rows = [];
  for (let startRow = 0; ; startRow += PAGE_SIZE) {
    const body = { startDate, endDate, dimensions, rowLimit: PAGE_SIZE, startRow, type };
    if (filters) body.dimensionFilterGroups = [{ filters }];
    const res = await sc.searchanalytics.query({ siteUrl: GSC_SITE_URL, requestBody: body });
    const batch = res.data.rows || [];
    rows.push(...batch);
    if (batch.length < PAGE_SIZE) break;
  }
  return rows.map((r) => ({
    keys: r.keys,
    clicks: r.clicks,
    impressions: r.impressions,
    ctr: +(r.ctr * 100).toFixed(2),
    position: +r.position.toFixed(2),
  }));
}

async function main() {
  const auth = getAuthClient();
  const sc = google.searchconsole({ version: 'v1', auth });

  // GSC a ~2-3 jours de latence : on arrête les fenêtres à J-3 pour ne pas
  // comparer une période complète à une période partielle.
  const END = daysAgo(3);
  const windows = {
    last28d:  { startDate: daysAgo(31),  endDate: END },
    prev28d:  { startDate: daysAgo(59),  endDate: daysAgo(32) },
    last90d:  { startDate: daysAgo(93),  endDate: END },
    prev90d:  { startDate: daysAgo(183), endDate: daysAgo(94) },
    last16mo: { startDate: daysAgo(480), endDate: END },
  };

  const out = { siteUrl: GSC_SITE_URL, generatedAt: new Date().toISOString(), windows, data: {} };

  for (const [name, w] of Object.entries(windows)) {
    const isLong = name === 'last16mo';
    const d = {};
    d.queries = await queryAll(sc, { ...w, dimensions: ['query'] });
    d.pages   = await queryAll(sc, { ...w, dimensions: ['page'] });
    if (!isLong) {
      d.queryPage      = await queryAll(sc, { ...w, dimensions: ['query', 'page'] });
      d.devices        = await queryAll(sc, { ...w, dimensions: ['device'] });
      d.countries      = await queryAll(sc, { ...w, dimensions: ['country'] });
      d.searchAppearance = await queryAll(sc, { ...w, dimensions: ['searchAppearance'] });
      d.byDate         = await queryAll(sc, { ...w, dimensions: ['date'] });
    } else {
      d.byDate = await queryAll(sc, { ...w, dimensions: ['date'] });
    }
    out.data[name] = d;
  }

  // Totaux site (sans dimension) pour chaque fenêtre : les sommes de lignes
  // dimensionnées sous-estiment toujours le total réel (anonymisation GSC).
  out.totals = {};
  for (const [name, w] of Object.entries(windows)) {
    const res = await sc.searchanalytics.query({
      siteUrl: GSC_SITE_URL,
      requestBody: { startDate: w.startDate, endDate: w.endDate, type: 'web' },
    });
    const r = (res.data.rows || [])[0];
    out.totals[name] = r
      ? { clicks: r.clicks, impressions: r.impressions, ctr: +(r.ctr * 100).toFixed(2), position: +r.position.toFixed(2) }
      : { clicks: 0, impressions: 0, ctr: 0, position: 0 };
  }

  // Sitemaps : couverture d'indexation déclarée
  try {
    const sm = await sc.sitemaps.list({ siteUrl: GSC_SITE_URL });
    out.sitemaps = (sm.data.sitemap || []).map((s) => ({
      path: s.path, lastSubmitted: s.lastSubmitted, lastDownloaded: s.lastDownloaded,
      isPending: s.isPending, errors: s.errors, warnings: s.warnings,
      contents: s.contents,
    }));
  } catch (e) { out.sitemaps = { error: e.message }; }

  console.log(JSON.stringify(out));
}

main().catch((e) => { console.error(JSON.stringify({ error: e.message })); process.exit(1); });

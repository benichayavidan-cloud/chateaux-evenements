/**
 * Collecte Search Console pour un audit ponctuel (01/11/2026).
 * Lecture seule. Tourne dans GitHub Actions (seul endroit qui a le jeton GSC).
 * Sortie : JSON sur stdout → artefact `audit-gsc`.
 */
import { gsc, SITE, iso } from './lib.mjs';

const site = encodeURIComponent(SITE + '/');
const q = (body) => gsc(`/webmasters/v3/sites/${site}/searchAnalytics/query`, { type: 'web', ...body });
const d = (n) => { const x = new Date(); x.setDate(x.getDate() - n); return iso(x); };
const out = { genere_le: new Date().toISOString(), fenetres: {}, erreurs: [] };
const step = async (nom, fn) => { try { out[nom] = await fn(); console.error(`[ok] ${nom}`); } catch (e) { out.erreurs.push(`${nom}: ${e.message}`); console.error(`[KO] ${nom}: ${e.message}`); } };

// Fenêtres : GSC a ~3 jours de latence
const fin = d(3);
const f28 = { startDate: d(30), endDate: fin };
const f28prev = { startDate: d(58), endDate: d(31) };
const f90 = { startDate: d(92), endDate: fin };
out.fenetres = { f28, f28prev, f90, serie: { startDate: '2026-02-01', endDate: fin } };

await step('serie_jour', () => q({ startDate: '2026-02-01', endDate: fin, dimensions: ['date'], rowLimit: 1000 }));
await step('serie_jour_mobile', () => q({ startDate: '2026-02-01', endDate: fin, dimensions: ['date', 'device'], rowLimit: 3000 }));
await step('totaux_28', () => q(f28));
await step('totaux_28prev', () => q(f28prev));
await step('totaux_90', () => q(f90));
await step('requetes_28', () => q({ ...f28, dimensions: ['query'], rowLimit: 5000 }));
await step('requetes_28prev', () => q({ ...f28prev, dimensions: ['query'], rowLimit: 5000 }));
await step('requetes_90', () => q({ ...f90, dimensions: ['query'], rowLimit: 5000 }));
await step('pages_28', () => q({ ...f28, dimensions: ['page'], rowLimit: 5000 }));
await step('pages_28prev', () => q({ ...f28prev, dimensions: ['page'], rowLimit: 5000 }));
await step('pages_90', () => q({ ...f90, dimensions: ['page'], rowLimit: 5000 }));
await step('requete_page_28', () => q({ ...f28, dimensions: ['query', 'page'], rowLimit: 25000 }));
await step('requete_page_90', () => q({ ...f90, dimensions: ['query', 'page'], rowLimit: 25000 }));
await step('apparence_90', () => q({ ...f90, dimensions: ['searchAppearance'], rowLimit: 100 }));
await step('apparence_28', () => q({ ...f28, dimensions: ['searchAppearance'], rowLimit: 100 }));
await step('pays_28', () => q({ ...f28, dimensions: ['country'], rowLimit: 50 }));
await step('discover_90', () => gsc(`/webmasters/v3/sites/${site}/searchAnalytics/query`, { ...f90, type: 'discover', rowLimit: 10 }));
await step('sitemaps', () => gsc(`/webmasters/v3/sites/${site}/sitemaps`));

// Inspection d'index de chaque URL du sitemap : état + dernier passage de Google
await step('inspection', async () => {
  const xml = await (await fetch(SITE + '/sitemap.xml')).text();
  const urls = [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)].map((m) => m[1]);
  // Pages retirées du sitemap mais encore intéressantes
  for (const u of ['/blog/murder-party-chateau-activite-immersive', '/blog/escape-game-geant-chateau', '/blog/atelier-cuisine-chef-gastronomie', '/seminaire-chateau-yvelines-78', '/seminaire-chateau-oise-60']) if (!urls.includes(SITE + u)) urls.push(SITE + u);
  const rows = []; let i = 0;
  await Promise.all(Array.from({ length: 4 }, async () => {
    while (i < urls.length) {
      const u = urls[i++];
      try {
        const r = await gsc('/v1/urlInspection/index:inspect', { inspectionUrl: u, siteUrl: SITE + '/' });
        const s = r.inspectionResult?.indexStatusResult || {};
        rows.push({ url: u.replace(SITE, ''), etat: s.coverageState || r.error?.message || 'inconnu', verdict: s.verdict, derniere_visite: s.lastCrawlTime || null, robots: s.robotsTxtState, indexation: s.indexingState, fetch: s.pageFetchState, canonical_google: s.googleCanonical, canonical_site: s.userCanonical, rich: r.inspectionResult?.richResultsResult?.verdict || null });
      } catch (e) { rows.push({ url: u.replace(SITE, ''), etat: 'ERREUR', erreur: e.message }); }
    }
  }));
  return { total: urls.length, rows };
});

process.stdout.write(JSON.stringify(out));

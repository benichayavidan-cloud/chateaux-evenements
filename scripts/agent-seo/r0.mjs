#!/usr/bin/env node
/**
 * RUN R0 — baseline de l'agent Marcus (blueprint §12, Phase 0).
 *
 * Collecte la photo « avant » : GSC 28j, indexation URL par URL (le rapport
 * GSC n'a pas d'API — on le reconstruit via URL Inspection), positions SERP
 * réelles du cœur du panel (Bright Data), backlinks (DataForSEO), santé crawl.
 * Archive le tout dans marcus_runs (type 'full', premier de la série).
 *
 * Exécution LOCALE (31/08/2026) : token GSC par impersonation gcloud.
 * En CI, le futur collecteur utilisera GSC_REFRESH_TOKEN (secrets existants).
 */
import { execSync } from 'node:child_process';
import fs from 'node:fs';

const SITE = 'https://www.selectchateaux.com';
const kc = (s) => execSync(`security find-generic-password -s "${s}" -w`, { encoding: 'utf8' }).trim();
const gscToken = () => execSync(
  'gcloud auth print-access-token --impersonate-service-account=ga4-admin@selectchateaux.iam.gserviceaccount.com --scopes=https://www.googleapis.com/auth/webmasters',
  { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();
const panel = JSON.parse(fs.readFileSync(new URL('./panel-requetes.json', import.meta.url)));

const snapshot = { type: 'R0', date: new Date().toISOString(), site: SITE };

// ── 1. GSC 28 jours : totaux + requêtes du panel ────────────────────────────
{
  const tok = gscToken();
  const iso = (d) => d.toISOString().slice(0, 10);
  const end = new Date(); end.setDate(end.getDate() - 3);
  const start = new Date(end); start.setDate(start.getDate() - 28);
  const body = { startDate: iso(start), endDate: iso(end), dimensions: ['query'], rowLimit: 5000, type: 'web' };
  const r = await (await fetch(`https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent(SITE + '/')}/searchAnalytics/query`, {
    method: 'POST', headers: { Authorization: `Bearer ${tok}`, 'Content-Type': 'application/json' }, body: JSON.stringify(body),
  })).json();
  const rows = r.rows || [];
  const tot = rows.reduce((a, x) => ({ clicks: a.clicks + x.clicks, impressions: a.impressions + x.impressions }), { clicks: 0, impressions: 0 });
  const norm = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
  const panelGsc = {};
  for (const p of [...panel.requetes, ...panel.decouvertes]) {
    const row = rows.find((x) => norm(x.keys[0]) === norm(p.q));
    if (row) panelGsc[p.q] = { clicks: row.clicks, imp: row.impressions, pos: +row.position.toFixed(1) };
  }
  snapshot.gsc28 = { periode: [body.startDate, body.endDate], totaux: tot, requetes_distinctes: rows.length, panel: panelGsc };
  console.log(`[1/5] GSC 28j : ${tot.clicks} clics, ${tot.impressions} impressions, ${rows.length} requêtes`);
}

// ── 2. Indexation : URL Inspection sur tout le sitemap ──────────────────────
{
  const tok = gscToken();
  const xml = await (await fetch(`${SITE}/sitemap.xml`)).text();
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  const etats = {}; const detailsNonIndexees = [];
  let i = 0;
  async function worker() {
    while (i < urls.length) {
      const u = urls[i++];
      try {
        const r = await (await fetch('https://searchconsole.googleapis.com/v1/urlInspection/index:inspect', {
          method: 'POST', headers: { Authorization: `Bearer ${tok}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({ inspectionUrl: u, siteUrl: SITE + '/' }),
        })).json();
        const res = r.inspectionResult?.indexStatusResult || {};
        const verdict = res.coverageState || r.error?.message || 'inconnu';
        etats[verdict] = (etats[verdict] || 0) + 1;
        if (!/indexée|indexed|Submitted and indexed/i.test(verdict) || /pas|not/i.test(verdict)) {
          detailsNonIndexees.push({ url: u.replace(SITE, ''), etat: verdict });
        }
      } catch (e) { etats['ERREUR ' + e.message] = (etats['ERREUR ' + e.message] || 0) + 1; }
    }
  }
  await Promise.all(Array.from({ length: 4 }, worker));
  snapshot.indexation = { total: urls.length, etats, non_indexees: detailsNonIndexees };
  console.log(`[2/5] Indexation (${urls.length} URLs) :`, JSON.stringify(etats));
}

// ── 3. Positions SERP réelles — cœur du panel (pages 1-3, arrêt dès trouvé) ─
{
  const positions = {};
  const coeur = panel.requetes;
  let qi = 0;
  async function worker() {
    while (qi < coeur.length) {
      const p = coeur[qi++];
      let pos = null, urlTrouvee = null;
      for (let page = 0; page < 3 && pos === null; page++) {
        try {
          const out = execSync(`bdata search ${JSON.stringify(p.q)} --country fr --language fr --page ${page} --json`, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] });
          const d = JSON.parse(out);
          for (const r of d.organic || []) {
            const link = r.link || r.url || '';
            if (link.includes('selectchateaux')) { pos = page * 10 + (r.rank || 0); urlTrouvee = link.replace(SITE, ''); break; }
          }
        } catch { break; }
      }
      positions[p.q] = { pos: pos ?? '>30', url: urlTrouvee, cluster: p.cluster };
      console.log(`   ${String(positions[p.q].pos).padStart(3)}  ${p.q}`);
    }
  }
  console.log('[3/5] SERP réelles (27 requêtes × ≤3 pages) :');
  await Promise.all(Array.from({ length: 3 }, worker));
  snapshot.serp = positions;
}

// ── 4. Backlinks (DataForSEO) ───────────────────────────────────────────────
{
  const auth = 'Basic ' + Buffer.from(kc('dataforseo-login') + ':' + kc('dataforseo-password')).toString('base64');
  const r = await (await fetch('https://api.dataforseo.com/v3/backlinks/summary/live', {
    method: 'POST', headers: { Authorization: auth, 'Content-Type': 'application/json' },
    body: JSON.stringify([{ target: 'selectchateaux.com', internal_list_limit: 1 }]),
  })).json();
  const res = r.tasks?.[0]?.result?.[0] || {};
  snapshot.backlinks = { backlinks: res.backlinks, domaines_referents: res.referring_domains, rank: res.rank };
  snapshot.cout_usd = (r.tasks?.[0]?.cost || 0);
  console.log(`[4/5] Backlinks : ${res.backlinks} liens, ${res.referring_domains} domaines référents`);
}

// ── 5. Archivage dans marcus_runs ───────────────────────────────────────────
{
  const env = Object.fromEntries(fs.readFileSync(new URL('../../.env.local', import.meta.url), 'utf8')
    .split('\n').filter((l) => l.includes('=') && !l.startsWith('#'))
    .map((l) => [l.slice(0, l.indexOf('=')), l.slice(l.indexOf('=') + 1).replace(/^"|"$/g, '')]));
  const r = await fetch(`${env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/marcus_runs`, {
    method: 'POST',
    headers: { apikey: env.SUPABASE_SERVICE_ROLE_KEY, Authorization: `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`, 'Content-Type': 'application/json', Prefer: 'return=representation' },
    body: JSON.stringify({ type: 'full', statut: 'ok', snapshot, cout_usd: snapshot.cout_usd || 0, rapport: 'R0 — baseline initiale (Phase 0)' }),
  });
  const row = await r.json();
  console.log(`[5/5] Archivé dans marcus_runs — id ${row[0]?.id}`);
  fs.writeFileSync('/tmp/marcus-r0.json', JSON.stringify(snapshot, null, 1));
}

#!/usr/bin/env node
/**
 * RUN COMPLET de Marcus — Phase 1 : OBSERVATION PURE (blueprint §7, R0→R5 sans actions).
 *
 * Collecte les capteurs, calcule les deltas vs le run précédent, repère les
 * découvertes GSC, et rapporte (email + Telegram si incident). AUCUNE action
 * sur le site : la Phase 2 ajoutera R3 (verdicts) et R5 (actions).
 *
 * Capteurs : C1 GSC · C2 indexation (URL Inspection) · C3 crawl-lite ·
 * C4 SERP (Bright Data, pagination 3 pages) · C7 backlinks+Bing (jeudi) ·
 * C9 bot_hits · C10 météo algorithmique.
 *
 * Flags de test : MARCUS_SKIP_INSPECTION=1, MARCUS_SKIP_SERP=1, MARCUS_NO_MAIL=1
 */
import fs from 'node:fs';
import { SITE, env, kc, marcusEnabled, gsc, fenetre28, sitemapUrls, sbInsert, sbSelect, telegram, email } from './lib.mjs';
import { sondesLLM } from './sondes-llm.mjs';
import { passerLesVerdicts } from './verdicts.mjs';
import { executerActions } from './actions.mjs';

if (!(await marcusEnabled())) { console.log('kill switch OFF — sortie'); process.exit(0); }

const panel = JSON.parse(fs.readFileSync(new URL('./panel-requetes.json', import.meta.url)));
const t0 = Date.now();
const jeudi = new Date().getDay() === 4;
const snapshot = { type: 'observation', date: new Date().toISOString() };
const incidents = [];
let cout = 0;

// ── C10 : météo algorithmique (Loi 6 — ne jamais conclure pendant un séisme) ─
try {
  const inc = await (await fetch('https://status.search.google.com/incidents.json')).json();
  const actifs = inc.filter((i) => !i.end && /ranking|serving|indexing/i.test(i.service_name || ''));
  snapshot.update_google_en_cours = actifs.map((i) => i.external_desc?.slice(0, 100));
  if (actifs.length) incidents.push(`update Google en cours (${actifs.length}) — verdicts à GELER`);
} catch { snapshot.update_google_en_cours = 'flux injoignable'; }

// ── C1 : GSC 28j — totaux VRAIS + panel + découvertes ───────────────────────
// Deux appels obligatoires : les totaux SANS dimension (les vrais), puis le
// détail par requête (sous-compté : Google anonymise les requêtes rares —
// constaté au R0 du 31/08 : 6 clics ventilés pour ~100 réels).
{
  const f = fenetre28();
  const site = encodeURIComponent(SITE + '/');
  const tot = await gsc(`/webmasters/v3/sites/${site}/searchAnalytics/query`, { ...f, type: 'web' });
  const parQ = await gsc(`/webmasters/v3/sites/${site}/searchAnalytics/query`, { ...f, dimensions: ['query'], rowLimit: 5000, type: 'web' });
  const parPage = await gsc(`/webmasters/v3/sites/${site}/searchAnalytics/query`, { ...f, dimensions: ['page'], rowLimit: 5000, type: 'web' });
  const rows = parQ.rows || [];
  const norm = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
  const panelGsc = {};
  for (const p of [...panel.requetes, ...panel.decouvertes]) {
    const row = rows.find((x) => norm(x.keys[0]) === norm(p.q));
    if (row) panelGsc[p.q] = { clicks: row.clicks, imp: row.impressions, pos: +row.position.toFixed(1), ctr: +(row.ctr * 100).toFixed(1) };
  }
  // Couche découverte : requêtes ≥ 50 imp/28j absentes du panel (proposées au rapport)
  const connues = new Set([...panel.requetes, ...panel.decouvertes].map((p) => norm(p.q)));
  const decouvertes = rows
    .filter((x) => x.impressions >= 50 && !connues.has(norm(x.keys[0])))
    .sort((a, b) => b.impressions - a.impressions).slice(0, 15)
    .map((x) => ({ q: x.keys[0], imp: x.impressions, pos: +x.position.toFixed(1), clicks: x.clicks }));
  snapshot.gsc28 = {
    periode: [f.startDate, f.endDate],
    totaux: tot.rows?.[0] ? { clicks: tot.rows[0].clicks, imp: tot.rows[0].impressions, ctr: +(tot.rows[0].ctr * 100).toFixed(2), pos: +tot.rows[0].position.toFixed(1) } : null,
    panel: panelGsc,
    decouvertes_candidates: decouvertes,
    top_pages: (parPage.rows || []).slice(0, 10).map((x) => ({ p: x.keys[0].replace(SITE, ''), clicks: x.clicks, imp: x.impressions })),
  };
  console.log(`[C1] GSC 28j : ${snapshot.gsc28.totaux?.clicks} clics / ${snapshot.gsc28.totaux?.imp} imp · ${decouvertes.length} découverte(s) candidate(s)`);
}

// ── C2 : indexation — reconstruction du rapport GSC, URL par URL ────────────
if (!process.env.MARCUS_SKIP_INSPECTION) {
  const urls = await sitemapUrls();
  const etats = {}; const nonIndexees = [];
  let i = 0;
  await Promise.all(Array.from({ length: 4 }, async () => {
    while (i < urls.length) {
      const u = urls[i++];
      try {
        const r = await gsc('/v1/urlInspection/index:inspect', { inspectionUrl: u, siteUrl: SITE + '/' });
        const verdict = r.inspectionResult?.indexStatusResult?.coverageState || r.error?.message || 'inconnu';
        etats[verdict] = (etats[verdict] || 0) + 1;
        if (!/Submitted and indexed|indexée/i.test(verdict)) nonIndexees.push({ url: u.replace(SITE, ''), etat: verdict });
      } catch (e) { etats['ERREUR'] = (etats['ERREUR'] || 0) + 1; }
    }
  }));
  snapshot.indexation = { total: urls.length, etats, non_indexees: nonIndexees };
  console.log(`[C2] Indexation :`, JSON.stringify(etats));
}

// ── C3 : crawl-lite — statuts + double balise robots (leçon du 31/08) ───────
{
  const urls = await sitemapUrls();
  let non200 = [], doublesRobots = 0, softCanon = 0, i = 0;
  await Promise.all(Array.from({ length: 10 }, async () => {
    while (i < urls.length) {
      const u = urls[i++];
      try {
        const r = await fetch(u, { redirect: 'manual' });
        if (r.status !== 200) { non200.push({ url: u.replace(SITE, ''), status: r.status }); continue; }
        const h = await r.text();
        if ((h.match(/<meta name="robots"/g) || []).length > 1) doublesRobots++;
        const can = h.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
        if (can && can.replace(/\/$/, '') !== u.replace(/\/$/, '')) softCanon++;
      } catch { non200.push({ url: u.replace(SITE, ''), status: 'ERR' }); }
    }
  }));
  snapshot.crawl = { total: urls.length, non200, doubles_robots: doublesRobots, canonical_divergent: softCanon };
  if (non200.length) incidents.push(`${non200.length} URL(s) du sitemap ne répondent pas 200`);
  if (doublesRobots) incidents.push(`${doublesRobots} page(s) à double balise robots (motif soft 404)`);
  console.log(`[C3] Crawl : ${non200.length} non-200 · ${doublesRobots} doubles robots · ${softCanon} canonical divergents`);
}

// ── C4 : positions SERP réelles du cœur (Bright Data, ≤3 pages) ─────────────
if (!process.env.MARCUS_SKIP_SERP) {
  const bdKey = env('BRIGHTDATA_API_KEY') || kc('brightdata-rankweld-api-key');
  const positions = {};
  let qi = 0;
  await Promise.all(Array.from({ length: 3 }, async () => {
    while (qi < panel.requetes.length) {
      const p = panel.requetes[qi++];
      let pos = null, urlT = null;
      for (let page = 0; page < 3 && pos === null; page++) {
        try {
          const r = await fetch('https://api.brightdata.com/request', {
            method: 'POST', headers: { Authorization: `Bearer ${bdKey}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({ zone: 'serp_api', url: `https://www.google.com/search?q=${encodeURIComponent(p.q)}&gl=fr&hl=fr&start=${page * 10}&brd_json=1`, format: 'raw' }),
          });
          const d = await r.json();
          for (const o of d.organic || []) {
            if ((o.link || '').includes('selectchateaux')) { pos = page * 10 + (o.rank || 0); urlT = (o.link || '').replace(SITE, ''); break; }
          }
          if (!(d.organic || []).length) break;
        } catch { break; }
      }
      positions[p.q] = { pos: pos ?? '>30', url: urlT };
    }
  }));
  snapshot.serp = positions;
  const top10 = Object.values(positions).filter((x) => typeof x.pos === 'number' && x.pos <= 10).length;
  console.log(`[C4] SERP : ${top10}/${panel.requetes.length} requêtes en top 10`);
}

// ── C7 (jeudi) : backlinks + Bing ───────────────────────────────────────────
if (jeudi) {
  try {
    const auth = 'Basic ' + Buffer.from((env('DATAFORSEO_LOGIN') || kc('dataforseo-login')) + ':' + (env('DATAFORSEO_PASSWORD') || kc('dataforseo-password'))).toString('base64');
    const r = await (await fetch('https://api.dataforseo.com/v3/backlinks/summary/live', {
      method: 'POST', headers: { Authorization: auth, 'Content-Type': 'application/json' },
      body: JSON.stringify([{ target: 'selectchateaux.com', internal_list_limit: 1 }]),
    })).json();
    const res = r.tasks?.[0]?.result?.[0] || {};
    cout += r.tasks?.[0]?.cost || 0;
    snapshot.backlinks = { backlinks: res.backlinks, domaines: res.referring_domains };
    const bing = env('BING_WMT_API_KEY') || kc('bing-webmaster-api-key');
    const q = await (await fetch(`https://ssl.bing.com/webmaster/api.svc/json/GetQueryStats?apikey=${bing}&siteUrl=${encodeURIComponent(SITE + '/')}`)).json();
    snapshot.bing = { requetes: (q.d || []).length };
    console.log(`[C7] Backlinks : ${res.backlinks} liens / ${res.referring_domains} domaines · Bing : ${snapshot.bing.requetes} requêtes`);
  } catch (e) { incidents.push('C7 en échec : ' + e.message); }
}

// ── C5 : citations LLM (jeudi, ou MARCUS_LLM=1) — capteur pur, actif dès la Phase 1
if (jeudi || process.env.MARCUS_LLM) {
  try {
    console.log('[C5] Sondes LLM :');
    const llm = await sondesLLM(panel);
    snapshot.llm = { synthese: llm.synthese, detail: llm.resultats };
    cout += llm.cout;
  } catch (e) { incidents.push('C5 en échec : ' + e.message); }
}

// ── C9 : ce que les robots ont VRAIMENT crawlé depuis le dernier run ────────
try {
  const depuis = new Date(Date.now() - 4 * 864e5).toISOString();
  const hits = await sbSelect(`bot_hits?ts=gte.${depuis}&select=bot,path`);
  const parBot = {};
  for (const h of hits) parBot[h.bot] = (parBot[h.bot] || 0) + 1;
  snapshot.bots = { fenetre_jours: 4, total: hits.length, par_bot: parBot, pages_distinctes: new Set(hits.map((h) => h.path)).size };
  console.log(`[C9] Bots (4j) : ${hits.length} hits ·`, JSON.stringify(parBot));
} catch (e) { snapshot.bots = { erreur: e.message }; }

// ── Deltas vs run précédent ─────────────────────────────────────────────────
let deltas = null;
try {
  const prev = await sbSelect('marcus_runs?type=eq.full&statut=eq.ok&order=id.desc&limit=1&select=id,snapshot');
  const p = prev?.[0]?.snapshot;
  if (p?.gsc28?.totaux && snapshot.gsc28?.totaux) {
    deltas = {
      vs_run: prev[0].id,
      clics: snapshot.gsc28.totaux.clicks - p.gsc28.totaux.clicks,
      impressions: snapshot.gsc28.totaux.imp - p.gsc28.totaux.imp,
    };
  }
} catch { /* premier run : pas de référence */ }
snapshot.deltas = deltas;
snapshot.duree_s = Math.round((Date.now() - t0) / 1000);

// ── R3 : verdicts des actions à échéance (vide en Phase 1, éprouvé quand même)
const updateEnCours = Array.isArray(snapshot.update_google_en_cours) && snapshot.update_google_en_cours.length > 0;
let verdicts = { verdicts: [], reverts: [] };
try { verdicts = await passerLesVerdicts(snapshot, updateEnCours); } catch (e) { incidents.push('R3 en échec : ' + e.message); }
snapshot.verdicts = verdicts.verdicts;

// ── R5 : moteur d'actions — DORMANT tant que agent_controls.marcus.phase < 2.
// En Phase 1 le backlog est vide : le moteur tourne à blanc, ses garde-fous
// (pages gelées, quotas, prédiction obligatoire) sont exercés à chaque run.
let actions = { executees: [], simulees: [] };
try { actions = await executerActions([], { runId: null, updateEnCours }); } catch (e) { incidents.push('R5 en échec : ' + e.message); }

// ── Archivage + rapport ─────────────────────────────────────────────────────
const statut = incidents.length ? 'degraded' : 'ok';
const run = await sbInsert('marcus_runs', { type: 'full', statut, snapshot, cout_usd: cout, rapport: incidents.join(' · ') || 'observation OK' });
console.log(`Run #${run.id} archivé (${statut}, ${snapshot.duree_s}s, ${cout.toFixed(3)}$)`);

const g = snapshot.gsc28, idx = snapshot.indexation, serp = snapshot.serp || {};
const top10 = Object.entries(serp).filter(([, v]) => typeof v.pos === 'number' && v.pos <= 10);
const lignes = [
  `MARCUS — run #${run.id} (observation) · ${new Date().toLocaleDateString('fr-FR')}`,
  ``,
  `MESURÉ`,
  `· GSC 28j : ${g?.totaux?.clicks} clics, ${g?.totaux?.imp} impressions, position moyenne ${g?.totaux?.pos}` + (deltas ? ` (${deltas.clics >= 0 ? '+' : ''}${deltas.clics} clics vs run #${deltas.vs_run})` : ' (baseline)'),
  idx ? `· Indexation : ${idx.total - (idx.non_indexees?.length || 0)}/${idx.total} URLs indexées` : null,
  Object.keys(serp).length ? `· SERP : ${top10.length}/${panel.requetes.length} requêtes du cœur en top 10` + (top10.length ? ` (${top10.map(([q]) => q).slice(0, 3).join(', ')}…)` : '') : null,
  snapshot.bots?.total != null ? `· Robots (4j) : ${snapshot.bots.total} passages, ${snapshot.bots.pages_distinctes} pages` : null,
  snapshot.backlinks ? `· Backlinks : ${snapshot.backlinks.backlinks} liens / ${snapshot.backlinks.domaines} domaines` : null,
  snapshot.llm ? `· Citations LLM : ChatGPT ${snapshot.llm.synthese.chatgpt_cite}/${snapshot.llm.synthese.sondes} · Gemini ${snapshot.llm.synthese.gemini_cite}/${snapshot.llm.synthese.sondes}` : null,
  ``,
  g?.decouvertes_candidates?.length ? `DÉCOUVERTES GSC (à valider pour le panel)\n${g.decouvertes_candidates.slice(0, 5).map((d) => `· « ${d.q} » — ${d.imp} imp, pos ${d.pos}`).join('\n')}` : null,
  incidents.length ? `\n⚠️ INCIDENTS\n${incidents.map((x) => '· ' + x).join('\n')}` : null,
  ``,
  `Phase 1 : observation pure, aucune action prise. Détail complet : marcus_runs #${run.id}.`,
].filter((x) => x !== null).join('\n');

console.log('\n' + lignes);
if (!process.env.MARCUS_NO_MAIL) await email(`Marcus — run #${run.id} ${statut === 'ok' ? '✓' : '⚠️'}`, lignes);
if (incidents.length) await telegram(`⚠️ Marcus run #${run.id} : ${incidents.join(' · ')}`);

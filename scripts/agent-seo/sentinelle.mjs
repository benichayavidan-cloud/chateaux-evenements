#!/usr/bin/env node
/**
 * SENTINELLE quotidienne de Marcus (blueprint §3, étage 1).
 *
 * Trois contrôles vitaux, ~2 minutes, ZÉRO action. Alerte Telegram UNIQUEMENT
 * si ça brûle — sinon silence total (une ligne dans marcus_runs et c'est tout).
 */
import { SITE, marcusEnabled, gsc, fenetre28, iso, sbInsert, telegram } from './lib.mjs';

if (!(await marcusEnabled())) { console.log('kill switch OFF — sortie'); process.exit(0); }

const alertes = [];

// ── Contrôle 1 : pages vitales servies et indexables ────────────────────────
for (const path of ['/', '/devis']) {
  try {
    const r = await fetch(SITE + path, { redirect: 'manual' });
    if (r.status !== 200) { alertes.push(`${path} répond ${r.status}`); continue; }
    const h = await r.text();
    const robots = [...h.matchAll(/<meta name="robots" content="([^"]+)"/g)].map((m) => m[1]);
    if (robots.some((v) => /noindex/i.test(v))) alertes.push(`${path} porte un NOINDEX (${robots.join(' | ')})`);
    if (robots.length > 1) alertes.push(`${path} a ${robots.length} balises robots (signe de soft 404 — voir leçon du 31/08)`);
  } catch (e) { alertes.push(`${path} injoignable : ${e.message}`); }
}

// ── Contrôle 2 : sitemap accessible et plein ────────────────────────────────
try {
  const xml = await (await fetch(`${SITE}/sitemap.xml`)).text();
  const n = (xml.match(/<loc>/g) || []).length;
  if (n < 300) alertes.push(`sitemap.xml : ${n} URLs seulement (attendu ~380)`);
} catch (e) { alertes.push(`sitemap.xml injoignable : ${e.message}`); }

// ── Contrôle 3 : trafic GSC dans la bande normale ───────────────────────────
// Petites valeurs quotidiennes (site ~1-5 clics/j) : on compare les
// IMPRESSIONS de J-3 (dernière journée consolidée) à la moyenne 28j.
// Seuil grossier volontairement : la sentinelle attrape l'effondrement,
// pas la nuance — la nuance, c'est le run complet.
try {
  const { startDate, endDate } = fenetre28();
  const r = await gsc(`/webmasters/v3/sites/${encodeURIComponent(SITE + '/')}/searchAnalytics/query`,
    { startDate, endDate, dimensions: ['date'], rowLimit: 40, type: 'web' });
  const rows = r.rows || [];
  if (rows.length >= 14) {
    const avg = rows.reduce((a, x) => a + x.impressions, 0) / rows.length;
    const dernier = rows.find((x) => x.keys[0] === endDate);
    if (dernier && avg >= 20 && dernier.impressions < avg * 0.2) {
      alertes.push(`impressions GSC du ${endDate} : ${dernier.impressions} (moyenne 28j : ${avg.toFixed(0)}) — chute > 80 %`);
    }
  }
} catch (e) { alertes.push(`GSC injoignable : ${e.message}`); }

// ── Verdict ─────────────────────────────────────────────────────────────────
const statut = alertes.length ? 'degraded' : 'ok';
await sbInsert('marcus_runs', {
  type: 'sentinel', statut,
  snapshot: { alertes },
  rapport: alertes.length ? alertes.join(' · ') : 'RAS',
});
if (alertes.length) {
  await telegram(`🚨 Marcus — sentinelle ${iso(new Date())}\n\n${alertes.map((a) => '• ' + a).join('\n')}\n\nAucune action automatique prise — diagnostic au prochain run complet, ou demande à Claude.`);
  console.log('ALERTES:', alertes);
  process.exit(1);
}
console.log('✓ sentinelle : RAS');

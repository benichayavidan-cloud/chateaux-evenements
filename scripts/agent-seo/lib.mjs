/**
 * Bibliothèque commune de l'agent Marcus — auth, Supabase, Telegram, email.
 *
 * Deux environnements, mêmes fonctions :
 *  - CI (GitHub Actions)  : tout vient de process.env (secrets)
 *  - local (développement): fallback .env.local du site + Keychain macOS
 *                           + impersonation gcloud pour GSC
 */
import { execSync } from 'node:child_process';
import fs from 'node:fs';

const SITE_ENV = new URL('../../.env.local', import.meta.url);

function envLocal() {
  try {
    return Object.fromEntries(fs.readFileSync(SITE_ENV, 'utf8')
      .split('\n').filter((l) => l.includes('=') && !l.startsWith('#'))
      .map((l) => [l.slice(0, l.indexOf('=')), l.slice(l.indexOf('=') + 1).replace(/^"|"$/g, '')]));
  } catch { return {}; }
}
const LOCAL = envLocal();

export const env = (k) => process.env[k] || LOCAL[k] || null;

export function kc(service) {
  try { return execSync(`security find-generic-password -s "${service}" -w`, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim(); }
  catch { return null; }
}

export const SITE = 'https://www.selectchateaux.com';

// ── GSC ─────────────────────────────────────────────────────────────────────
let gscTok = null;
export async function gscToken() {
  if (gscTok) return gscTok;
  const [id, secret, refresh] = [env('GSC_CLIENT_ID'), env('GSC_CLIENT_SECRET'), env('GSC_REFRESH_TOKEN')];
  if (id && secret && refresh) {
    const r = await (await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ client_id: id, client_secret: secret, refresh_token: refresh, grant_type: 'refresh_token' }),
    })).json();
    if (!r.access_token) throw new Error('GSC refresh: ' + JSON.stringify(r).slice(0, 150));
    return (gscTok = r.access_token);
  }
  // local : impersonation du SA (la politique d'org interdit les clés SA)
  return (gscTok = execSync(
    'gcloud auth print-access-token --impersonate-service-account=ga4-admin@selectchateaux.iam.gserviceaccount.com --scopes=https://www.googleapis.com/auth/webmasters',
    { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim());
}

export async function gsc(path, body) {
  const tok = await gscToken();
  const r = await fetch(`https://searchconsole.googleapis.com${path}`, {
    method: body ? 'POST' : 'GET',
    headers: { Authorization: `Bearer ${tok}`, 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  });
  return r.json();
}

// ── Supabase (service key) ──────────────────────────────────────────────────
function sbHeaders() {
  const key = env('SUPABASE_SERVICE_KEY') || env('SUPABASE_SERVICE_ROLE_KEY');
  return { apikey: key, Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' };
}
export async function sbInsert(table, row) {
  const r = await fetch(`${env('SUPABASE_URL') || env('NEXT_PUBLIC_SUPABASE_URL')}/rest/v1/${table}`, {
    method: 'POST', headers: { ...sbHeaders(), Prefer: 'return=representation' }, body: JSON.stringify(row),
  });
  const d = await r.json();
  if (!r.ok) throw new Error(`Supabase ${table}: ${JSON.stringify(d).slice(0, 200)}`);
  return d[0];
}
export async function sbSelect(query) {
  const r = await fetch(`${env('SUPABASE_URL') || env('NEXT_PUBLIC_SUPABASE_URL')}/rest/v1/${query}`, { headers: sbHeaders() });
  return r.json();
}

/** Kill switch (Loi de fonctionnement : toujours vérifié en premier). */
export async function marcusEnabled() {
  try {
    const rows = await sbSelect('agent_controls?id=eq.marcus&select=enabled');
    return rows?.[0]?.enabled === true;
  } catch { return true; } // Supabase KO ≠ agent coupé — la sentinelle le signalera
}

// ── Canaux ──────────────────────────────────────────────────────────────────
export async function telegram(text) {
  const tok = env('TELEGRAM_BOT_TOKEN'), chat = env('TELEGRAM_CHAT_ID');
  if (!tok || !chat) return console.error('⚠️ Telegram non configuré');
  await fetch(`https://api.telegram.org/bot${tok}/sendMessage`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chat, text }),
  }).catch(() => {});
}

export async function email(subject, text) {
  const nodemailer = (await import('nodemailer')).default;
  const t = nodemailer.createTransport({
    host: env('SMTP_HOST'), port: +(env('SMTP_PORT') || 587), secure: false,
    auth: { user: env('SMTP_USER'), pass: env('SMTP_PASS') },
  });
  await t.sendMail({ from: env('SMTP_USER'), to: env('EMAIL_ADMIN'), subject, text });
}

// ── Divers ──────────────────────────────────────────────────────────────────
export const iso = (d) => d.toISOString().slice(0, 10);
export function fenetre28() {
  const end = new Date(); end.setDate(end.getDate() - 3); // latence GSC
  const start = new Date(end); start.setDate(start.getDate() - 27);
  return { startDate: iso(start), endDate: iso(end) };
}
export async function sitemapUrls() {
  const xml = await (await fetch(`${SITE}/sitemap.xml`)).text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}

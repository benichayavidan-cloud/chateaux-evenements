/**
 * Provenance des demandes de devis — d'où venait la personne à sa PREMIÈRE visite.
 *
 * Jusqu'au 24/09/2026, une demande ne portait que la page du formulaire
 * (`source_page`, presque toujours `/devis`) : impossible de dire si le client
 * arrivait de Google, de ChatGPT ou d'un favori. Le traceur de visites du CRM
 * ne reçoit plus rien depuis la bascule vers le CRM V2 (juillet), il ne peut
 * donc pas servir de relais.
 *
 * Le premier contact est mémorisé dans le navigateur à la première page vue
 * (`memoriserPremierContact`, appelé par SiteTracker), puis joint à la demande.
 * Aucun type TS-only (enum…) : le fichier est testé par `node --test`.
 */

const CLE = 'sc_premier_contact';
const MAX_PAGE = 300;
const MAX_TEXTE = 150;

export interface PremierContact {
  /** Chemin de la première page vue, sans paramètres. */
  page: string;
  /** Domaine du site d'où venait la personne, null si accès direct ou lien interne. */
  referent: string | null;
  /** utm_* de la première page, sans le préfixe (`source`, `medium`…). */
  utm: Record<string, string>;
  /** Arrivée par une annonce Google Ads. */
  gclid: boolean;
  /** Date ISO de la première visite. */
  date: string;
}

export type CanalOrigine =
  | 'google' | 'bing' | 'autre-moteur'
  | 'chatgpt' | 'perplexity' | 'gemini' | 'copilot' | 'claude'
  | 'reseau-social' | 'site-referent' | 'email' | 'pub' | 'direct' | 'inconnu';

export const LIBELLE_CANAL: Record<CanalOrigine, string> = {
  google: 'Google (recherche naturelle)',
  bing: 'Bing (recherche naturelle)',
  'autre-moteur': 'Autre moteur de recherche',
  chatgpt: 'ChatGPT',
  perplexity: 'Perplexity',
  gemini: 'Gemini',
  copilot: 'Copilot',
  claude: 'Claude',
  'reseau-social': 'Réseau social',
  'site-referent': 'Lien depuis un autre site',
  email: 'Email',
  pub: 'Annonce Google Ads',
  direct: 'Accès direct (adresse tapée, favori)',
  inconnu: 'Inconnue',
};

// Ordre significatif : les IA hébergées chez Google/Microsoft avant leur moteur.
const IA: [CanalOrigine, RegExp][] = [
  ['chatgpt', /(^|\.)(chatgpt\.com|chat\.openai\.com|openai\.com)$/],
  ['perplexity', /(^|\.)perplexity\.ai$/],
  ['gemini', /^(gemini|bard)\.google\.com$/],
  ['copilot', /^copilot\.microsoft\.com$/],
  ['claude', /(^|\.)claude\.ai$/],
];
const MOTEURS: [CanalOrigine, RegExp][] = [
  ['google', /(^|\.)google\.[a-z.]+$/],
  ['bing', /(^|\.)bing\.com$/],
  ['autre-moteur', /(^|\.)(duckduckgo\.com|qwant\.com|ecosia\.org|yahoo\.[a-z.]+|yandex\.[a-z.]+|brave\.com|startpage\.com)$/],
];
const SOCIAL = /(^|\.)(linkedin\.com|lnkd\.in|facebook\.com|instagram\.com|t\.co|x\.com|twitter\.com|youtube\.com|pinterest\.[a-z.]+|tiktok\.com)$/;
const INTERNE = /(^|\.)selectchateaux\.com$/;

const coupe = (s: string, n: number) => s.slice(0, n);

function domaine(url: string): string | null {
  try {
    const h = new URL(url).hostname.toLowerCase();
    return h && !INTERNE.test(h) ? h : null;
  } catch {
    return null;
  }
}

/** Photographie de la visite courante — pur, testable. */
export function lirePremierContact(url: string, referrer: string, maintenant: Date): PremierContact {
  const u = new URL(url);
  const utm: Record<string, string> = {};
  for (const k of ['source', 'medium', 'campaign', 'content', 'term']) {
    const v = u.searchParams.get(`utm_${k}`);
    if (v) utm[k] = coupe(v, MAX_TEXTE);
  }
  return {
    page: coupe(u.pathname, MAX_PAGE),
    referent: referrer ? domaine(referrer) : null,
    utm,
    gclid: u.searchParams.has('gclid'),
    date: maintenant.toISOString(),
  };
}

export function canalOrigine(pc: PremierContact | null): CanalOrigine {
  if (!pc) return 'inconnu';
  if (pc.gclid) return 'pub';
  const src = (pc.utm.source || '').toLowerCase();
  const medium = (pc.utm.medium || '').toLowerCase();
  const ref = pc.referent || '';
  for (const [canal, re] of IA) if (re.test(src) || re.test(ref)) return canal;
  if (medium === 'email') return 'email';
  if (/^(cpc|ppc|paid)/.test(medium)) return 'pub';
  for (const [canal, re] of MOTEURS) if (re.test(ref)) return canal;
  if (SOCIAL.test(ref)) return 'reseau-social';
  if (ref) return 'site-referent';
  return 'direct';
}

/** Relit un premier contact venu du navigateur : tout ce qui n'a pas la bonne forme est écarté. */
export function parsePremierContact(brut: unknown): PremierContact | null {
  let o: unknown = brut;
  if (typeof brut === 'string') {
    try { o = JSON.parse(brut); } catch { return null; }
  }
  if (!o || typeof o !== 'object') return null;
  const x = o as Record<string, unknown>;
  if (typeof x.page !== 'string' || typeof x.date !== 'string' || Number.isNaN(Date.parse(x.date))) return null;
  const utm: Record<string, string> = {};
  if (x.utm && typeof x.utm === 'object') {
    for (const k of ['source', 'medium', 'campaign', 'content', 'term']) {
      const v = (x.utm as Record<string, unknown>)[k];
      if (typeof v === 'string' && v) utm[k] = coupe(v, MAX_TEXTE);
    }
  }
  return {
    page: coupe(x.page, MAX_PAGE),
    referent: typeof x.referent === 'string' && x.referent ? coupe(x.referent, MAX_TEXTE) : null,
    utm,
    gclid: x.gclid === true,
    date: x.date,
  };
}

/** À la première page vue seulement : les visites suivantes n'écrasent rien. */
export function memoriserPremierContact(): void {
  try {
    if (localStorage.getItem(CLE)) return;
    localStorage.setItem(CLE, JSON.stringify(lirePremierContact(window.location.href, document.referrer, new Date())));
  } catch { /* stockage bloqué (navigation privée) : la demande partira en « inconnue » */ }
}

export function premierContactMemorise(): PremierContact | null {
  try {
    return parsePremierContact(localStorage.getItem(CLE));
  } catch {
    return null;
  }
}

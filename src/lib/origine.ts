/**
 * Provenance des demandes de devis — d'où venait la personne à sa PREMIÈRE visite.
 *
 * Jusqu'au 24/09/2026, une demande ne portait que la page du formulaire
 * (`source_page`, presque toujours `/devis`) : impossible de dire si le client
 * arrivait de Google, de ChatGPT ou d'un favori. Le traceur de visites du CRM
 * ne reçoit plus rien depuis la bascule vers le nouveau CRM (juillet), il ne peut
 * donc pas servir de relais.
 *
 * Le premier contact est mémorisé dans le navigateur à la première page vue
 * (`memoriserPremierContact`, appelé par SiteTracker), puis joint à la demande.
 *
 * Le premier contact ne change jamais. Depuis le 04/11/2026, le DERNIER clic sur
 * une annonce est gardé à côté (`memoriserClicAds`) : quelqu'un venu par Google
 * naturel, qui revient plus tard par une annonce, compte comme Ads.
 * Aucun type TS-only (enum…) : le fichier est testé par `node --test`.
 */

const CLE = 'sc_premier_contact';
const CLE_CLIC = 'sc_dernier_clic_ads';
const MAX_PAGE = 300;
const MAX_TEXTE = 150;
const MAX_ID_CLIC = 512;
const JOUR_MS = 86_400_000;
// Fenêtre de la conversion dans Google Ads.
const FENETRE_CLIC_MS = 30 * JOUR_MS;
// Tolérance pour une horloge de navigateur en avance sur le serveur.
const AVANCE_HORLOGE_MS = JOUR_MS;

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

/** Dernier clic sur une annonce. Les clés sont le contrat `origine.ads` du CRM (avec `consentement`, voir `origineAdsCrm`). */
export interface ClicAds {
  campagne: string | null;
  annonceId: string | null;
  groupeId: string | null;
  motCle: string | null;
  /** e = exact, p = expression, b = large, a = sans mot-clé (AI Max). */
  correspondance: string | null;
  /** m = mobile, t = tablette, c = ordinateur. */
  appareil: string | null;
  /** Page d'arrivée du clic, sans paramètres. */
  page: string;
  /** Date ISO du clic. */
  clicLe: string;
  gclid: string | null;
  gbraid: string | null;
  wbraid: string | null;
}

/** Choix du visiteur sur la bannière de cookies au moment de la demande. */
export type ConsentementPub = 'oui' | 'non' | 'inconnu';

export interface OrigineAds extends ClicAds {
  consentement: ConsentementPub;
}

export interface OrigineAdsCrm extends ClicAds {
  consentement: boolean | null;
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

// Le caractère nul et les demi-caractères (emoji coupé) sont refusés par Postgres :
// l'insertion échouerait et la demande serait perdue. Filtré à la lecture de
// l'adresse ET à la relecture côté serveur, qui passent toutes deux par `coupe`.
const REFUSES_POSTGRES = /\u0000|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?<![\uD800-\uDBFF])[\uDC00-\uDFFF]/g;
const nettoie = (s: string) => s.replace(REFUSES_POSTGRES, '');
// Second passage : la coupe elle-même peut séparer un emoji en deux.
const coupe = (s: string, n: number) => nettoie(nettoie(s).slice(0, n));

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

/** Un clic Ads en cours de validité l'emporte : c'est lui qui a amené la demande. */
export function canalOrigine(pc: PremierContact | null, clic: ClicAds | null = null): CanalOrigine {
  if (clic) return 'pub';
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

// Un paramètre que Google n'a pas remplacé arrive tel quel : `{keyword}` n'est pas un mot-clé.
function texteClic(v: unknown): string | null {
  if (typeof v !== 'string') return null;
  const t = coupe(v.trim(), MAX_TEXTE).trim();
  return !t || /^\{.*\}$/.test(t) ? null : t;
}

function codeClic(v: unknown, codes: string): string | null {
  return typeof v === 'string' && v.length === 1 && codes.includes(v) ? v : null;
}

// Un numéro de clic tronqué ne se rattache à rien dans Google : on l'écarte plutôt que de le couper.
function idClic(v: unknown): string | null {
  return typeof v === 'string' && v.length <= MAX_ID_CLIC && /^[\w.~-]+$/.test(v) ? v : null;
}

function champsClic(x: Record<string, unknown>, page: string, clicLe: string): ClicAds {
  return {
    campagne: texteClic(x.campagne),
    annonceId: texteClic(x.annonceId),
    groupeId: texteClic(x.groupeId),
    motCle: texteClic(x.motCle),
    correspondance: codeClic(x.correspondance, 'epba'),
    appareil: codeClic(x.appareil, 'mtc'),
    page: coupe(page, MAX_PAGE),
    clicLe,
    gclid: idClic(x.gclid),
    gbraid: idClic(x.gbraid),
    wbraid: idClic(x.wbraid),
  };
}

/** Clic porté par la page courante, null si elle ne vient pas d'une annonce — pur, testable. */
export function lireClicAds(url: string, maintenant: Date): ClicAds | null {
  const u = new URL(url);
  const p = u.searchParams;
  const clic = champsClic({
    campagne: p.get('utm_campaign'),
    annonceId: p.get('utm_content'),
    groupeId: p.get('sc_adgroup'),
    motCle: p.get('utm_term'),
    correspondance: p.get('sc_match'),
    appareil: p.get('sc_device'),
    gclid: p.get('gclid'),
    gbraid: p.get('gbraid'),
    wbraid: p.get('wbraid'),
  }, u.pathname, maintenant.toISOString());
  const parUtm = p.get('utm_source')?.toLowerCase() === 'google' && p.get('utm_medium')?.toLowerCase() === 'cpc';
  return clic.gclid || clic.gbraid || clic.wbraid || parUtm ? clic : null;
}

const aUnNumero = (c: ClicAds) => Boolean(c.gclid || c.gbraid || c.wbraid);

/**
 * Recharger la page d'arrivée n'est pas un nouveau clic : le même numéro garde sa date.
 * Un clic sans numéro n'efface pas un clic récent qui en a un : ce numéro seul permet
 * de rattacher la demande à l'annonce dans Google.
 */
export function clicAMemoriser(nouveau: ClicAds, precedent: ClicAds | null): ClicAds {
  if (precedent && !aUnNumero(nouveau) && aUnNumero(precedent)
    && clicAdsEnCours(precedent, new Date(nouveau.clicLe))) return precedent;
  const meme = precedent && (
    (nouveau.gclid && nouveau.gclid === precedent.gclid)
    || (nouveau.gbraid && nouveau.gbraid === precedent.gbraid)
    || (nouveau.wbraid && nouveau.wbraid === precedent.wbraid)
  );
  return meme ? { ...nouveau, clicLe: precedent.clicLe } : nouveau;
}

/** Relit un clic venu du navigateur : champ de mauvaise forme = vide, page ou date absente = pas de clic. */
export function parseClicAds(brut: unknown): ClicAds | null {
  let o: unknown = brut;
  if (typeof brut === 'string') {
    try { o = JSON.parse(brut); } catch { return null; }
  }
  if (!o || typeof o !== 'object') return null;
  const x = o as Record<string, unknown>;
  if (typeof x.page !== 'string' || typeof x.clicLe !== 'string') return null;
  const date = Date.parse(x.clicLe);
  if (Number.isNaN(date)) return null;
  return champsClic(x, x.page, new Date(date).toISOString());
}

/** Clic de plus de 30 jours (ou daté du futur) : ignoré. Vérifié au navigateur ET au serveur. */
export function clicAdsEnCours(clic: ClicAds | null, maintenant: Date): ClicAds | null {
  if (!clic) return null;
  const age = maintenant.getTime() - Date.parse(clic.clicLe);
  return age <= FENETRE_CLIC_MS && age >= -AVANCE_HORLOGE_MS ? clic : null;
}

/** À chaque page : ne fait rien sans annonce dans l'adresse, et ne touche jamais au premier contact. */
export function memoriserClicAds(): void {
  try {
    const clic = lireClicAds(window.location.href, new Date());
    if (!clic) return;
    const precedent = parseClicAds(localStorage.getItem(CLE_CLIC));
    localStorage.setItem(CLE_CLIC, JSON.stringify(clicAMemoriser(clic, precedent)));
  } catch { /* stockage bloqué : la demande partira sans clic Ads */ }
}

export function clicAdsMemorise(maintenant: Date = new Date()): ClicAds | null {
  try {
    return clicAdsEnCours(parseClicAds(localStorage.getItem(CLE_CLIC)), maintenant);
  } catch {
    return null;
  }
}

/** Seule la bannière écrit `cookie-consent` : pas de réponse = inconnu, jamais un accord supposé. */
export function consentementPublicitaire(): ConsentementPub {
  try {
    const choix = localStorage.getItem('cookie-consent');
    if (choix === 'accepted') return 'oui';
    return choix === 'rejected' ? 'non' : 'inconnu';
  } catch {
    return 'inconnu';
  }
}

export function origineAds(clic: ClicAds | null, consentement: ConsentementPub): OrigineAds | null {
  return clic ? { ...clic, consentement } : null;
}

const CONSENTEMENT_CRM: Record<ConsentementPub, boolean | null> = { oui: true, non: false, inconnu: null };

/** Corps envoyé au CRM : son contrat attend un booléen, ou null si le choix est inconnu. */
export function origineAdsCrm(ads: OrigineAds | null): OrigineAdsCrm | null {
  return ads ? { ...ads, consentement: CONSENTEMENT_CRM[ads.consentement] } : null;
}

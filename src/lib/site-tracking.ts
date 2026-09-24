/**
 * Traceur de visites → CRM V2 : construction des messages envoyés au CRM.
 *
 * Jusqu'au 24/09/2026, SiteTracker parlait encore le format du CRM V1
 * (`/api/site-tracking/collect` + `/heartbeat`, champ `action`). Le CRM V2
 * (juillet) n'expose que `POST /api/site-tracking` avec le schéma
 * `siteIngestSchema` (CRM V2, src/modules/analytics-site/site-tracking.schema.ts) :
 * chaque appel tombait en 404, en silence, et la table SiteSession est restée vide.
 *
 * Ce module est pur (pas de window/document) pour être testé par `node --test` ;
 * aucun type TS-only (enum…). Les limites de longueur sont celles du schéma V2 :
 * au-delà, le CRM rejette tout le message.
 *
 * Côté CRM, une session est créée au premier message sans `sessionId` (ou après
 * 30 min d'inactivité) avec la source, le référent et les utm du message ; les
 * messages suivants réutilisent le `sessionId` renvoyé.
 */
import { canalOrigine, lirePremierContact, type CanalOrigine } from './origine.ts';

/** Adresse du CRM (surchargeable pour une préversion). */
export const BASE_CRM = process.env.NEXT_PUBLIC_CRM_TRACKING_URL || 'https://crm.selectchateaux.com';

/** Origine à autoriser dans la CSP du site (`connect-src`), sans quoi le navigateur bloque l'envoi. */
export function ORIGINE_CRM(baseCrm: string): string | null {
  try {
    return new URL(baseCrm).origin;
  } catch {
    return null;
  }
}

export const URL_COLLECTE = (baseCrm: string): string => `${baseCrm.replace(/\/+$/, '')}/api/site-tracking`;

/** Seul le site public alimente le CRM : ni localhost, ni les préversions Vercel, ni le CRM lui-même. */
export function estSiteSuivi(hostname: string): boolean {
  return hostname === 'selectchateaux.com' || hostname === 'www.selectchateaux.com';
}

/** Types d'événement acceptés par le CRM V2 (`SITE_EVENT_TYPES`). Tout autre type fait rejeter le message. */
export const SITE_EVENT_TYPES = [
  'PAGE_VIEW', 'CLICK_CTA', 'CLICK_PHONE', 'CLICK_EMAIL', 'FORM_START', 'FORM_SUBMIT',
  'SCROLL_25', 'SCROLL_50', 'SCROLL_75', 'SCROLL_100', 'SESSION_START', 'SESSION_END',
] as const;
export type SiteEventType = (typeof SITE_EVENT_TYPES)[number];

export type SiteDevice = 'SITE_DESKTOP' | 'SITE_MOBILE' | 'SITE_TABLET';
export type SiteSource = 'ORGANIC' | 'PAID' | 'DIRECT' | 'REFERRAL' | 'SOCIAL' | 'EMAIL_SOURCE' | 'OTHER';

const PALIERS_SCROLL = [25, 50, 75, 100] as const;

const coupe = (s: string | null | undefined, n: number): string | undefined => {
  const t = (s ?? '').trim();
  return t ? t.slice(0, n) : undefined;
};

export function appareilDepuisLargeur(largeur: number): SiteDevice {
  if (largeur < 768) return 'SITE_MOBILE';
  if (largeur < 1024) return 'SITE_TABLET';
  return 'SITE_DESKTOP';
}

const SOURCE_PAR_CANAL: Record<CanalOrigine, SiteSource> = {
  google: 'ORGANIC',
  bing: 'ORGANIC',
  'autre-moteur': 'ORGANIC',
  pub: 'PAID',
  chatgpt: 'REFERRAL',
  perplexity: 'REFERRAL',
  gemini: 'REFERRAL',
  copilot: 'REFERRAL',
  claude: 'REFERRAL',
  'site-referent': 'REFERRAL',
  'reseau-social': 'SOCIAL',
  email: 'EMAIL_SOURCE',
  direct: 'DIRECT',
  inconnu: 'DIRECT',
};

export function sourceDepuisCanal(canal: CanalOrigine): SiteSource {
  return SOURCE_PAR_CANAL[canal] ?? 'OTHER';
}

/** Ce qui décrit l'arrivée sur le site pour ce chargement de page : sert à créer la session côté CRM. */
export interface ContexteVisite {
  device: SiteDevice;
  source: SiteSource;
  screenWidth?: number;
  referrer?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
  gclid?: string;
  landingPage?: string;
}

/** Photographie de l'arrivée — même règles de provenance que les demandes de devis (origine.ts). */
export function lireContexteVisite(url: string, referrer: string, largeur: number, maintenant: Date): ContexteVisite {
  const pc = lirePremierContact(url, referrer, maintenant);
  const u = new URL(url);
  return {
    device: appareilDepuisLargeur(largeur),
    source: sourceDepuisCanal(canalOrigine(pc)),
    screenWidth: Number.isFinite(largeur) && largeur >= 0 ? Math.round(largeur) : undefined,
    // Référent externe seulement : un lien interne n'est pas une provenance.
    referrer: pc.referent ? coupe(referrer, 500) : undefined,
    utmSource: coupe(pc.utm.source, 150),
    utmMedium: coupe(pc.utm.medium, 150),
    utmCampaign: coupe(pc.utm.campaign, 150),
    utmContent: coupe(pc.utm.content, 150),
    utmTerm: coupe(pc.utm.term, 150),
    gclid: coupe(u.searchParams.get('gclid'), 255),
    landingPage: coupe(pc.page, 500),
  };
}

interface Commun {
  fingerprint: string;
  /** `null` tant que le CRM n'a pas renvoyé de session. */
  sessionId: string | null;
  contexte: ContexteVisite;
  pathname: string;
}

export interface PayloadV2 extends ContexteVisite {
  fingerprint: string;
  sessionId?: string;
  kind: 'pageview' | 'event';
  pathname: string;
  pageTitle?: string;
  eventType?: SiteEventType;
  label?: string;
  value?: string;
  scrollDepth?: number;
}

/** Retire les champs vides : le CRM les traite comme absents, autant ne pas les envoyer. */
function nettoie(p: PayloadV2): PayloadV2 {
  const o = p as unknown as Record<string, unknown>;
  for (const k of Object.keys(o)) if (o[k] === undefined) delete o[k];
  return p;
}

function base(c: Commun, kind: PayloadV2['kind']): PayloadV2 {
  return {
    fingerprint: coupe(c.fingerprint, 100) ?? 'inconnu',
    sessionId: coupe(c.sessionId, 40),
    kind,
    pathname: coupe(c.pathname, 500) ?? '/',
    ...c.contexte,
  };
}

export function payloadPageVue(c: Commun & { pageTitle?: string }): PayloadV2 {
  return nettoie({ ...base(c, 'pageview'), pageTitle: coupe(c.pageTitle, 300) });
}

export function estTypeEvenement(t: string): t is SiteEventType {
  return (SITE_EVENT_TYPES as readonly string[]).includes(t);
}

/** `null` si le type n'existe pas côté CRM V2 : mieux vaut ne rien envoyer qu'un message rejeté. */
export function payloadEvenement(
  c: Commun & { eventType: string; label?: string; value?: string; scrollDepth?: number },
): PayloadV2 | null {
  if (!estTypeEvenement(c.eventType)) return null;
  const profondeur = c.scrollDepth !== undefined && Number.isFinite(c.scrollDepth)
    ? Math.max(0, Math.round(c.scrollDepth))
    : undefined;
  return nettoie({
    ...base(c, 'event'),
    eventType: c.eventType,
    label: coupe(c.label, 200),
    value: coupe(c.value, 200),
    scrollDepth: profondeur,
  });
}

/** Réponse du CRM V2 : `{ success: true, data: { sessionId } }`. */
export function lireSessionId(reponse: unknown): string | null {
  if (!reponse || typeof reponse !== 'object') return null;
  const r = reponse as { success?: unknown; data?: { sessionId?: unknown } };
  if (r.success !== true || !r.data || typeof r.data.sessionId !== 'string' || !r.data.sessionId) return null;
  return r.data.sessionId;
}

/** Paliers franchis pour la première fois sur cette page ; `dejaVus` est mis à jour. */
export function paliersScrollAtteints(pourcentage: number, dejaVus: Set<number>): number[] {
  const nouveaux: number[] = [];
  for (const m of PALIERS_SCROLL) {
    if (pourcentage >= m && !dejaVus.has(m)) {
      dejaVus.add(m);
      nouveaux.push(m);
    }
  }
  return nouveaux;
}

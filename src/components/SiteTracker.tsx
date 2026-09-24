"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { memoriserPremierContact } from "@/lib/origine";
import {
  BASE_CRM,
  URL_COLLECTE,
  estSiteSuivi,
  lireContexteVisite,
  lireSessionId,
  paliersScrollAtteints,
  payloadEvenement,
  payloadPageVue,
  type ContexteVisite,
  type PayloadV2,
} from "@/lib/site-tracking";

/**
 * Traceur de visites → CRM V2 (`POST /api/site-tracking`, voir src/lib/site-tracking.ts).
 * Une page vue à chaque changement de route, un événement par palier de scroll ;
 * le `sessionId` renvoyé par le CRM est réutilisé (le CRM clôt la session après
 * 30 min d'inactivité). Plus de heartbeat ni de fin de page/session : le CRM V2
 * ne les connaît pas.
 */

const COOKIE_NAME = "sc_vid";
const COOKIE_DAYS = 365;
const CLE_SESSION = "sc_sid";

interface EtatTraceur {
  fingerprint: string;
  contexte: ContexteVisite;
  sessionId: string | null;
  /** Les messages partent l'un après l'autre : le premier crée la session, les suivants la réutilisent. */
  file: Promise<void>;
}

let etat: EtatTraceur | null = null;

function getFingerprint(): string {
  const match = document.cookie.match(new RegExp(`(?:^|; )${COOKIE_NAME}=([^;]*)`));
  if (match) return match[1];
  const id = crypto.randomUUID();
  document.cookie = `${COOKIE_NAME}=${id};path=/;max-age=${COOKIE_DAYS * 86400};SameSite=Lax`;
  return id;
}

function lireSessionMemorisee(): string | null {
  try {
    return sessionStorage.getItem(CLE_SESSION);
  } catch {
    return null;
  }
}

function memoriserSession(id: string): void {
  try {
    sessionStorage.setItem(CLE_SESSION, id);
  } catch { /* stockage bloqué : la session sera recréée au prochain chargement */ }
}

/** `null` hors du site public (localhost, préversions Vercel) : aucune fausse visite dans le CRM. */
function initialiser(): EtatTraceur | null {
  if (etat) return etat;
  if (typeof window === "undefined" || !estSiteSuivi(window.location.hostname)) return null;
  try {
    etat = {
      fingerprint: getFingerprint(),
      contexte: lireContexteVisite(window.location.href, document.referrer, window.innerWidth, new Date()),
      sessionId: lireSessionMemorisee(),
      file: Promise.resolve(),
    };
  } catch {
    return null;
  }
  return etat;
}

function envoyer(e: EtatTraceur, construire: (sessionId: string | null) => PayloadV2 | null): void {
  e.file = e.file.then(async () => {
    const payload = construire(e.sessionId);
    if (!payload) return;
    try {
      const res = await fetch(URL_COLLECTE(BASE_CRM), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        keepalive: true,
      });
      const sessionId = lireSessionId(await res.json());
      if (sessionId && sessionId !== e.sessionId) {
        e.sessionId = sessionId;
        memoriserSession(sessionId);
      }
    } catch {
      // Best-effort : le suivi ne doit jamais gêner la navigation.
    }
  });
}

export function SiteTracker() {
  const pathname = usePathname();

  useEffect(() => {
    // Provenance des demandes de devis : indépendante du CRM (voir origine.ts).
    memoriserPremierContact();
  }, []);

  useEffect(() => {
    const e = initialiser();
    if (!e || !pathname) return;

    envoyer(e, (sessionId) =>
      payloadPageVue({
        fingerprint: e.fingerprint,
        sessionId,
        contexte: e.contexte,
        pathname,
        pageTitle: document.title,
      }),
    );

    const paliersVus = new Set<number>();
    const surScroll = () => {
      const hauteur = document.documentElement.scrollHeight - window.innerHeight;
      if (hauteur <= 0) return;
      const pct = Math.round((window.scrollY / hauteur) * 100);
      for (const palier of paliersScrollAtteints(pct, paliersVus)) {
        envoyer(e, (sessionId) =>
          payloadEvenement({
            fingerprint: e.fingerprint,
            sessionId,
            contexte: e.contexte,
            pathname,
            eventType: `SCROLL_${palier}`,
            scrollDepth: palier,
          }),
        );
      }
    };

    window.addEventListener("scroll", surScroll, { passive: true });
    return () => window.removeEventListener("scroll", surScroll);
  }, [pathname]);

  return null;
}

/** Événement ponctuel (clic téléphone, envoi de formulaire…). Types inconnus du CRM V2 ignorés. */
export function trackSiteEvent(type: string, label?: string, value?: string) {
  const e = initialiser();
  if (!e) return;
  envoyer(e, (sessionId) =>
    payloadEvenement({
      fingerprint: e.fingerprint,
      sessionId,
      contexte: e.contexte,
      pathname: window.location.pathname,
      eventType: type,
      label,
      value,
    }),
  );
}

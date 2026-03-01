/**
 * GCLID (Google Click ID) - Capture et stockage
 * Capture le gclid depuis l'URL d'arrivée Google Ads et le stocke en cookie 90 jours
 */

const GCLID_COOKIE_NAME = "_gclid";
const GCLID_COOKIE_DAYS = 90;

function setCookie(name: string, value: string, days: number): void {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)};expires=${expires};path=/;SameSite=Lax`;
}

function getCookie(name: string): string | null {
  const match = document.cookie.match(
    new RegExp("(?:^|; )" + name + "=([^;]*)")
  );
  return match ? decodeURIComponent(match[1]) : null;
}

/**
 * Capture le GCLID depuis l'URL et le stocke en cookie.
 * À appeler sur chaque page (dans Analytics).
 */
export function captureGclid(): void {
  if (typeof window === "undefined") return;

  const params = new URLSearchParams(window.location.search);
  const gclid = params.get("gclid");

  if (gclid) {
    setCookie(GCLID_COOKIE_NAME, gclid, GCLID_COOKIE_DAYS);
  }
}

/**
 * Lit le GCLID stocké en cookie.
 */
export function getGclid(): string | null {
  if (typeof window === "undefined") return null;
  return getCookie(GCLID_COOKIE_NAME);
}

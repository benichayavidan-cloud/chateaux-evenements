/**
 * Redirections internes — résolution des liens vers leur adresse finale.
 *
 * Une page redirigée (301) qui reste liée partout dans le site fait passer
 * chaque visite et chaque robot par un détour, et peut créer des chaînes de
 * redirections (fusion de blog → landing → article). Ce module résout un lien
 * jusqu'à sa destination finale, pour le HTML des articles comme pour les
 * redirections de next.config.
 *
 * Module pur (aucune dépendance) : testé par `node --test src/lib/redirections.test.ts`.
 */

export interface Redirection {
  from: string;
  to: string;
}

const DOMAINE = /^https?:\/\/(www\.)?selectchateaux\.com/i;
const PROFONDEUR_MAX = 5;

function chemin(href: string): { base: string; suite: string; absolu: string } {
  const absolu = (href.match(DOMAINE) || [""])[0];
  const reste = href.slice(absolu.length);
  const i = reste.search(/[?#]/);
  const brut = i === -1 ? reste : reste.slice(0, i);
  const suite = i === -1 ? "" : reste.slice(i);
  const base = brut.length > 1 ? brut.replace(/\/+$/, "") : brut;
  return { base, suite, absolu };
}

export function creerResolveur(redirections: Redirection[]) {
  const table = new Map(redirections.map((r) => [chemin(r.from).base, r.to]));

  /** Adresse finale d'un chemin interne ; inchangé s'il n'est pas redirigé. */
  function resoudre(href: string): string {
    const { base, suite, absolu } = chemin(href);
    if (!base.startsWith("/")) return href;
    let courant = base;
    for (let i = 0; i < PROFONDEUR_MAX && table.has(courant); i++) {
      courant = table.get(courant)!;
    }
    // Une boucle ne doit jamais produire de lien : on rend l'original.
    if (table.has(courant)) return href;
    if (courant === base) return href;
    // Une ancre de l'ancienne page n'existe pas sur la nouvelle : seule la
    // requête (?…) est conservée.
    const garder = suite.startsWith("?") ? suite.replace(/#.*$/, "") : "";
    return `${absolu}${courant}${garder}`;
  }

  /** Réécrit les href="…" d'un fragment HTML vers leur adresse finale. */
  function reecrireHtml(html: string): string {
    return html.replace(/href=(["'])([^"']+)\1/g, (tout, q: string, href: string) => {
      const final = resoudre(href);
      return final === href ? tout : `href=${q}${final}${q}`;
    });
  }

  return { resoudre, reecrireHtml, estRedirige: (href: string) => table.has(chemin(href).base) };
}

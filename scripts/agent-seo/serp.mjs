/**
 * Capteur SERP (C4) — position réelle du site sur une requête, ≤ 3 pages Google.
 *
 * Trois issues, jamais confondues :
 *  - `trouve`  : le site est dans le top 30 (pos = rang)
 *  - `absent`  : 3 pages LUES en entier, le site n'y est pas (pos = '>30')
 *  - `erreur`  : une page n'a pas pu être lue après tous les essais (pos = null)
 *
 * Avant le 24/09/2026, une réponse vide ou en erreur arrêtait la lecture et
 * valait « >30 ». Bright Data renvoie régulièrement une page 1 vide : du 10/09
 * au 21/09 le rapport a affiché 0/27 requêtes en top 10 alors que la GSC était
 * stable (« team building chantilly » : noté >30, réellement 13ᵉ).
 */
import { SITE } from './lib.mjs';

const PAGES = 3;

/**
 * @param {(page: number) => Promise<object>} fetchPage  réponse brute Bright Data (brd_json) pour la page 0, 1, 2
 * @param {{ essais?: number, attente?: number, echeance?: number }} [opts]
 *   essais : par page · attente (ms) entre deux essais — ≥ 15 s : sous ce délai
 *   Bright Data refuse la relance (`failed_query_rejected` après un captcha),
 *   mesuré le 24/09/2026 · echeance : horodatage (ms) au-delà duquel on n'interroge
 *   plus — la requête devient une erreur plutôt que de faire dépasser au run son
 *   timeout (le run n'est archivé qu'à la fin : un run tué perd TOUS ses capteurs).
 */
export async function positionSerp(fetchPage, { essais = 3, attente = 20_000, echeance = Infinity } = {}) {
  for (let page = 0; page < PAGES; page++) {
    let organic = null;
    for (let essai = 0; essai < essais && !organic; essai++) {
      if (essai && attente) await new Promise((r) => setTimeout(r, attente));
      if (Date.now() > echeance) return { pos: null, url: null, statut: 'erreur' };
      try {
        const d = await fetchPage(page);
        if (d?.organic?.length) organic = d.organic;
      } catch { /* essai suivant */ }
    }
    if (!organic) return { pos: null, url: null, statut: 'erreur' };
    const o = organic.find((x) => (x.link || '').includes('selectchateaux'));
    if (o) return { pos: page * 10 + (o.rank || 0), url: o.link.replace(SITE, ''), statut: 'trouve' };
  }
  return { pos: '>30', url: null, statut: 'absent' };
}

/** Top 10 calculé sur les seules requêtes réellement mesurées. */
export function resumeSerp(positions) {
  const e = Object.entries(positions);
  return {
    top10: e.filter(([, v]) => typeof v.pos === 'number' && v.pos <= 10).map(([q]) => q),
    mesurees: e.filter(([, v]) => v.statut !== 'erreur').length,
    erreurs: e.filter(([, v]) => v.statut === 'erreur').map(([q]) => q),
  };
}

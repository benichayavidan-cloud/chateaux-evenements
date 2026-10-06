/**
 * Bloc « Où organiser votre … ? » inséré après l'introduction des articles
 * d'animation (plan du 06/10/2026, lot 3).
 *
 * Mesuré : depuis le 24/09, 57 visites Google entrent par le blog, dont 37 par
 * l'article murder party ; 46 ne voient qu'une page, 2 atteignent /devis. Ces
 * lecteurs cherchent une idée d'animation : on ne change pas leur recherche,
 * on leur montre tôt où la faire et comment demander un devis. Le texte de
 * l'article n'est pas modifié.
 *
 * Module pur (ni window ni document) : testé par `node --test src/lib/bloc-organiser.test.ts`.
 */

export interface LieuBloc {
  slug: string;
  nom: string;
  ville: string | null;
  capacite: number;
  chambres: number | null;
}

const MARQUEUR = 'data-cta="article-organiser"';

function echapper(texte: string): string {
  return texte
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/**
 * HTML du bloc. Aucun titre h2/h3 : il ne doit ni entrer dans le sommaire ni
 * fausser le suivi de lecture (même règle que le CTA de milieu). Chaque lien
 * porte un `data-cta`, compté par le traceur CRM.
 */
export function blocOrganiserHtml(activite: string, lieux: LieuBloc[]): string {
  const act = echapper(activite);
  const items = lieux
    .map((l) => {
      const detail = [l.ville, `jusqu'à ${l.capacite} pers.`, l.chambres ? `${l.chambres} chambres` : null]
        .filter(Boolean)
        .map((x) => echapper(String(x)))
        .join(" · ");
      return `<li><a href="/lieux/${encodeURIComponent(l.slug)}" data-cta="article-organiser:${echapper(l.slug)}">${echapper(l.nom)}</a> <span>${detail}</span></li>`;
    })
    .join("");
  return (
    `<aside class="article-organiser" ${MARQUEUR}>` +
    `<p class="article-organiser__titre">Où organiser votre ${act} ?</p>` +
    `<p class="article-organiser__texte">Des lieux privatisables de notre sélection, avec salles et hébergement pour votre groupe :</p>` +
    (items ? `<ul class="article-organiser__lieux">${items}</ul>` : "") +
    `<a class="article-organiser__bouton" href="#devis-express" data-cta="article-organiser-devis">Recevoir des lieux pour votre ${act}</a>` +
    `</aside>`
  );
}

/**
 * Pose le bloc après l'introduction : juste avant le premier h2. Sans h2, après
 * le deuxième paragraphe du corps. Rien si le bloc est déjà présent.
 */
export function insererApresIntro(html: string, bloc: string): string {
  if (html.includes(MARQUEUR)) return html;
  const h2 = html.search(/<h2[\s>]/i);
  if (h2 !== -1) return html.slice(0, h2) + bloc + html.slice(h2);
  const fins = [...html.matchAll(/<\/p>/gi)].map((m) => m.index! + m[0].length);
  if (!fins.length) return html + bloc;
  const pos = fins[Math.min(1, fins.length - 1)];
  return html.slice(0, pos) + bloc + html.slice(pos);
}

/** Message prérempli du formulaire de devis (`article` : « un » ou « une »). */
export function messageDevisActivite(activite: string, article: "un" | "une"): string {
  return `Nous souhaitons organiser ${article} ${activite} dans un lieu privatisé pour notre équipe.`;
}

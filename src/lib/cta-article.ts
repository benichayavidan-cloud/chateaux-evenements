/**
 * Appels à l'action des articles et suivi des clics sur ces appels.
 *
 * Plan conversion, phase 2 (30/09/2026). Le blog porte l'essentiel des clics
 * Google (40 % sur le seul article murder party) mais le formulaire n'arrivait
 * qu'en bas de page, après la FAQ et « À lire aussi ». Un lecteur qui décroche
 * à mi-article n'a jamais vu de quoi demander un devis.
 *
 * Module pur (ni window ni document) : testé par `node --test`.
 */

/** Ancre du formulaire posé sur la page (`DevisFormMini` porte `id="devis-express"`). */
export const CIBLE_FORMULAIRE = '#devis-express';

const MARQUEUR = 'data-cta="article-milieu"';

/** Sous ce nombre de paragraphes, l'article est trop court : le formulaire du bas est déjà proche. */
const PARAGRAPHES_MIN = 6;

/**
 * Bloc inséré dans le corps. Aucun titre (h2/h3) : il ne doit ni entrer dans
 * le sommaire ni fausser la section active du suivi de lecture. Le style vit
 * dans globals.css (`.article-cta-milieu`), le HTML reste sobre.
 */
export const CTA_MILIEU_HTML =
  `<aside class="article-cta-milieu" ${MARQUEUR}>` +
  `<p class="article-cta-milieu__titre">Vous organisez un séminaire ou un team building ?</p>` +
  `<p class="article-cta-milieu__texte">Dites-nous vos dates et votre effectif : nous vous proposons des châteaux disponibles sous 24 h, sans engagement.</p>` +
  `<a class="article-cta-milieu__bouton" href="${CIBLE_FORMULAIRE}">Recevoir mes propositions</a>` +
  `</aside>`;

/**
 * Pose un CTA au milieu du corps de l'article :
 *   - avant le h2 du milieu quand l'article en a au moins deux ;
 *   - sinon après le paragraphe du milieu ;
 *   - rien pour un article court, ni si le bloc est déjà présent.
 */
export function insererCtaMilieu(html: string): string {
  if (html.includes(MARQUEUR)) return html;

  const titres = [...html.matchAll(/<h2[\s>]/gi)];
  if (titres.length >= 2) {
    const pos = titres[Math.floor(titres.length / 2)].index!;
    return html.slice(0, pos) + CTA_MILIEU_HTML + html.slice(pos);
  }

  // Seules les fins de paragraphe au niveau du corps comptent : un <aside>
  // glissé dans une puce ou une citation décalerait tout le rendu.
  const fins: number[] = [];
  let profondeur = 0;
  for (const m of html.matchAll(/<(\/?)(ul|ol|blockquote|table|p)\b[^>]*>/gi)) {
    const fermante = m[1] === '/';
    const balise = m[2].toLowerCase();
    if (balise === 'p') {
      if (fermante && profondeur === 0) fins.push(m.index! + m[0].length);
    } else {
      profondeur = Math.max(0, profondeur + (fermante ? -1 : 1));
    }
  }
  if (fins.length < PARAGRAPHES_MIN) return html;
  const pos = fins[Math.floor(fins.length / 2) - 1];
  return html.slice(0, pos) + CTA_MILIEU_HTML + html.slice(pos);
}

/**
 * Traduit un clic sur un lien en événement pour le CRM :
 *   - un lien (ou un de ses parents) marqué `data-cta` → CLICK_CTA avec ce libellé ;
 *   - un lien non marqué vers /devis ou le formulaire de la page → CLICK_CTA avec l'adresse ;
 *   - le reste → null. Le téléphone n'est pas un CTA ici : `trackPhoneClick` l'envoie déjà
 *     en CLICK_PHONE, le compter deux fois fausserait les chiffres.
 */
export function evenementCta(
  href: string | null,
  dataCta: string | null,
): { type: 'CLICK_CTA'; label: string } | null {
  if (!href || href.startsWith('tel:') || href.startsWith('mailto:')) return null;
  if (dataCta) return { type: 'CLICK_CTA', label: dataCta };
  if (href === CIBLE_FORMULAIRE || /^\/devis(?:[#?/]|$)/.test(href)) return { type: 'CLICK_CTA', label: href };
  return null;
}

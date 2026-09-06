/**
 * Helpers SEO transverses.
 */

const META_DESCRIPTION_MAX = 155;

/**
 * Tronque un texte à la longueur d'affichage SERP (155 car. par défaut),
 * en coupant sur un mot entier. Garde-fou systémique : les contenus
 * (articles publiés par agent inclus) peuvent dépasser, la balise jamais.
 */
export function metaDescription(text: string, max: number = META_DESCRIPTION_MAX): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(" ");
  return `${cut.slice(0, lastSpace > 0 ? lastSpace : cut.length).replace(/[,;:.\s]+$/, "")}…`;
}

/* ─────────────────────────── Titre de page ─────────────────────────── */

// TITLE_MAX et SUFFIXE_MARQUE sont exportés plus bas (règle permanente).

/**
 * Titre de la balise <title>, borné à ce que Google affiche réellement.
 *
 * Mesuré le 01/09/2026 : les 279 titres d'articles dépassaient 60 caractères
 * une fois le suffixe de marque ajouté (médiane 82, maximum 112). Au-delà,
 * Google tronque — la fin du titre, souvent le bénéfice ou le prix, disparaît
 * du résultat. Avec un CTR à 1,14 %, c'est un levier direct.
 *
 * Le H1 n'est PAS touché : il garde le titre complet, plus riche et utile au
 * lecteur comme au moteur. Seule la balise affichée en SERP est raccourcie.
 *
 * Stratégie, dans l'ordre :
 *   1. le titre entier avec la marque, s'il tient ;
 *   2. sa partie avant le « : » avec la marque — les titres du corpus sont
 *      construits « Sujet : complément », le sujet suffit à identifier la page ;
 *   3. cette même partie seule ;
 *   4. en dernier recours, une troncature sur mot entier.
 */
export function pageTitle(titre: string, suffixe: string = SUFFIXE_MARQUE, max: number = TITLE_MAX): string {
  const propre = titre.replace(/\s+/g, " ").trim();

  if (propre.length + suffixe.length <= max) return propre + suffixe;

  const avantSeparateur = propre.split(/\s[:—–]\s/)[0].trim();
  if (avantSeparateur && avantSeparateur !== propre) {
    if (avantSeparateur.length + suffixe.length <= max) return avantSeparateur + suffixe;
    if (avantSeparateur.length <= max) return avantSeparateur;
  }

  const base = avantSeparateur.length < propre.length ? avantSeparateur : propre;
  if (base.length <= max) return base;
  const cut = base.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(" ");
  return `${cut.slice(0, lastSpace > 0 ? lastSpace : cut.length).replace(/[,;:.\s]+$/, "")}…`;
}

/* ──────────────── Règle permanente : 60 caractères affichés ─────────────── */

/**
 * RÈGLE NON NÉGOCIABLE — aucune balise `<title>` du site ne dépasse
 * TITLE_MAX caractères, telle qu'elle est SERVIE dans le HTML.
 *
 * Google coupe au-delà : la fin du titre — souvent le bénéfice, le prix ou la
 * zone — disparaît du résultat de recherche. Mesuré le 06/09/2026 : 97 pages
 * dépassaient (médiane 80 pour les landings, 83 pour les fiches lieux, maximum
 * 116). Ces pages portaient 44 % des impressions du site pour un CTR de 0,2 %.
 *
 * Le H1 n'est jamais concerné : il garde le titre complet, plus riche pour le
 * lecteur comme pour le moteur. Seule la balise affichée en SERP est bornée.
 *
 * DEUX BUDGETS, parce que le site a deux régimes (vérifié en production le
 * 06/09/2026) :
 *
 *  - `app/layout.tsx` déclare `title.template = "%s | Select Châteaux"`. Toute
 *    page qui donne son titre en chaîne se voit AJOUTER ce suffixe de 18
 *    caractères. Son budget propre est donc BUDGET_SOUS_MARQUE (42).
 *  - `app/blog/layout.tsx` déclare son propre titre sans nouveau gabarit, ce
 *    qui NEUTRALISE le template pour toutes ses pages filles. Les articles
 *    portent donc leur suffixe eux-mêmes, via `pageTitle()`, sur 60.
 *
 * Une page qui a besoin des 60 caractères entiers (fiche lieu : le nom du lieu
 * est déjà long) sort du gabarit avec `title: { absolute: … }` et renonce au
 * suffixe de marque. C'est un arbitrage assumé : sur un site à 9 domaines
 * référents, le nom du lieu et le mot « séminaire » valent mieux que la marque.
 *
 * Le garde-fou qui VÉRIFIE cette règle est `scripts/verif-titres.mjs`, branché
 * sur `npm run build` : il lit le HTML réellement produit et fait échouer la
 * construction si une seule page dépasse. Une règle que rien ne contrôle finit
 * par ne plus être suivie — c'est exactement ce qui est arrivé à ce correctif,
 * posé le 01/09/2026 et branché sur le seul blog.
 */
export const TITLE_MAX = 60;
export const SUFFIXE_MARQUE = " | Select Châteaux";
/** Budget d'une page dont le gabarit racine ajoutera le suffixe de marque. */
export const BUDGET_SOUS_MARQUE = TITLE_MAX - SUFFIXE_MARQUE.length;

/**
 * Borne un titre à `max` sans le rendre illisible.
 *
 * Dans l'ordre : le titre entier ; sa partie avant le séparateur (les titres du
 * corpus sont bâtis « Sujet : complément », le sujet suffit à identifier la
 * page) ; en dernier recours une troncature sur mot entier.
 */
export function bornerTitre(titre: string, max: number = TITLE_MAX): string {
  const propre = titre.replace(/\s+/g, " ").trim();
  if (propre.length <= max) return propre;

  const avantSeparateur = propre.split(/\s[:—–|]\s/)[0].trim();
  if (avantSeparateur && avantSeparateur.length <= max) return avantSeparateur;

  const base = avantSeparateur.length < propre.length ? avantSeparateur : propre;
  const cut = base.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(" ");
  return `${cut.slice(0, lastSpace > 0 ? lastSpace : cut.length).replace(/[,;:.\s]+$/, "")}…`;
}

/** Titre d'une page qui reçoit le suffixe de marque par le gabarit racine. */
export function titreSousMarque(titre: string): string {
  return bornerTitre(titre, BUDGET_SOUS_MARQUE);
}

/**
 * Titre d'une fiche lieu — le mot « séminaire » et la zone survivent toujours.
 *
 * Appliquer `bornerTitre` au gabarit existant produisait « Hôtel Inn Design
 * Paris St Quentin en Yvelines » tout court : le nom du lieu mangeait le budget
 * et le seul mot-clé sur lequel ces pages peuvent se positionner disparaissait.
 * On dégrade donc la ZONE et non le mot-clé, et on abandonne le nom en dernier.
 *
 * Ces pages sortent du gabarit de marque (`title: { absolute }`) : elles ont
 * besoin des 60 caractères entiers.
 */
export function titreLieu(lieu: {
  nom: string;
  ville?: string | null;
  departementCode?: string | null;
}): string {
  const nom = lieu.nom.replace(/\s+/g, " ").trim();
  const dep = (lieu.departementCode ?? "").trim();
  const ville = (lieu.ville ?? "").trim();

  const candidats = [
    ville && dep ? `${nom} — Séminaire à ${ville} (${dep})` : null,
    ville ? `${nom} — Séminaire à ${ville}` : null,
    dep ? `${nom} — Séminaire ${dep}` : null,
    `${nom} — Séminaire`,
  ].filter((c): c is string => c !== null);

  for (const c of candidats) if (c.length <= TITLE_MAX) return c;

  // Le nom seul ne tient pas : on le raccourcit, jamais le mot-clé.
  const queue = dep ? ` — Séminaire ${dep}` : " — Séminaire";
  const budgetNom = TITLE_MAX - queue.length - 1;
  const cut = nom.slice(0, budgetNom);
  const lastSpace = cut.lastIndexOf(" ");
  return `${cut.slice(0, lastSpace > 0 ? lastSpace : cut.length).replace(/[,;:.\s]+$/, "")}…${queue}`;
}

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

  // Une description qui tient doit quand même se terminer proprement : sans
  // ponctuation finale, elle se lit comme une phrase coupée — y compris par le
  // garde-fou de build, qui ne peut pas distinguer « …en 2026 » d'une troncature.
  if (clean.length <= max) return /[.!?»)]$/.test(clean) ? clean : `${clean}.`;

  // 1. Couper à une FRONTIÈRE DE PHRASE si l'une tombe dans la seconde moitié
  //    du budget : une description qui se termine par un point se lit comme un
  //    texte fini, pas comme une phrase amputée.
  //    Attention à la typographie française : « ? » et « ! » sont précédés
  //    d'une espace. Repérer le délimiteur puis couper à son DÉBUT ferait
  //    perdre la ponctuation elle-même — on coupe donc après le signe.
  const phrase = clean.slice(0, max);
  const finPhrase = Math.max(
    ...[/\.\s/g, /\s?[!?]\s/g].flatMap((re) =>
      [...phrase.matchAll(re)].map((m) => m.index! + m[0].trimEnd().length),
    ),
    -1,
  );
  if (finPhrase > max * 0.55) return clean.slice(0, finPhrase).trim();

  // 2. Sinon, reculer mot à mot jusqu'à ne plus terminer sur un FAIT AMPUTÉ.
  //    Mesuré le 20/09/2026 : 83 pages sur 387 se terminaient sur un chiffre ou
  //    une préposition — « Le lieu dispose de 19 chambres, 3… », « tarifs
  //    dès… », « À 35 min de… ». Le prix et la distance, les deux seuls
  //    éléments qui déclenchent un clic, sont toujours en fin de phrase : la
  //    coupe aveugle les décapitait systématiquement.
  let cut = clean.slice(0, max - 1);
  for (let i = 0; i < 12; i++) {
    const lastSpace = cut.lastIndexOf(" ");
    cut = (lastSpace > 0 ? cut.slice(0, lastSpace) : cut).replace(/[,;:.\s]+$/, "");
    if (!FIN_AMPUTEE.test(cut)) break;
  }
  return `${cut}…`;
}

/**
 * Une description ne doit jamais s'arrêter sur un fait à moitié dit.
 *
 * Attrape : un nombre nu (« 19 chambres, 3 »), une préposition ou un
 * connecteur orphelin (« tarifs dès », « à 35 min de », « entre »), une
 * parenthèse ouverte, une unité sans valeur.
 */
export const FIN_AMPUTEE =
  /(?:^|[\s(])(?:\d+[\d\s.,]*|d[eèé]s?|du|des|au|aux|à|en|et|ou|par|pour|sur|sous|avec|sans|dans|vers|entre|jusqu['’]?|depuis|selon|soit|dont|que|qui|environ|entre|plus|moins|entre|min|h|km|€)$|\($/i;

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

/* ───────────────────────── Description d'une fiche lieu ───────────────────── */

/**
 * Description SERP d'une fiche lieu — composée pour TENIR, pas tronquée après.
 *
 * L'ancien gabarit produisait une phrase de 180 à 220 caractères que
 * `metaDescription()` coupait à 155. Mesuré le 20/09/2026 sur le build : les 68
 * fiches sortaient amputées, et toujours au même endroit — au milieu de la
 * liste d'équipements. « Devis sous 48 h », la seule promesse commerciale de la
 * balise, n'atteignait aucune page.
 *
 * On compose donc du plus complet au plus court, et on retient le premier
 * candidat qui tient — même stratégie que `titreLieu()`, qui dégrade la zone
 * plutôt que le mot-clé. Ce qui saute en premier, ce sont les équipements
 * secondaires, jamais la capacité ni la promesse de devis.
 *
 * L'accord au pluriel est traité ici : le gabarit précédent écrivait
 * « 1 salles de réunion », y compris dans le bloc de réponse directe affiché en
 * haut de page — c'est-à-dire précisément le passage que Google et les modèles
 * de langage recopient.
 */
export function descriptionLieu(
  v: {
    nom: string;
    capacite?: number | null;
    ville?: string | null;
    departement?: string | null;
    departementCode?: string | null;
    chambres?: number | null;
    sallesReunion?: number | null;
    parking?: number | null;
  },
  max: number = META_DESCRIPTION_MAX,
): string {
  const pluriel = (n: number, mot: string, motPluriel?: string) =>
    `${n} ${n > 1 ? (motPluriel ?? `${mot}s`) : mot}`;

  const lieu = [
    v.ville ? `à ${v.ville}` : null,
    v.departementCode ? `(${v.departementCode})` : null,
  ].filter(Boolean).join(" ");

  const tete = v.capacite
    ? `${v.nom} : séminaire d'entreprise jusqu'à ${v.capacite} personnes${lieu ? ` ${lieu}` : ""}.`
    : `${v.nom} : séminaire d'entreprise${lieu ? ` ${lieu}` : ""}.`;

  const equipements = [
    v.chambres ? pluriel(v.chambres, "chambre") : null,
    v.sallesReunion ? pluriel(v.sallesReunion, "salle") + " de réunion" : null,
    v.parking ? pluriel(v.parking, "place") + " de parking" : null,
  ].filter((e): e is string => e !== null);

  const promesse = "Devis sous 48 h.";

  // Du plus complet au plus court : on sacrifie les équipements, jamais la
  // capacité ni la promesse de devis.
  for (let n = equipements.length; n >= 0; n--) {
    const milieu = n ? ` ${equipements.slice(0, n).join(", ")}.` : "";
    const candidat = `${tete}${milieu} ${promesse}`;
    if (candidat.length <= max) return candidat;
  }
  return metaDescription(`${tete} ${promesse}`, max);
}

/**
 * Titre d'une landing de zone — la marque cède quand le titre a besoin de place.
 *
 * `titreSousMarque()` borne à 42 caractères pour laisser les 18 du suffixe. Le
 * titre plus long n'est pas raccourci : il est COUPÉ à son séparateur, et ce
 * qui suit disparaît. Mesuré le 20/09/2026 : « Séminaire Hauts-de-Seine :
 * château-hôtel 5★, métro L12 » était servi « Séminaire Hauts-de-Seine ». Le
 * métro L12 est pourtant l'argument que personne d'autre ne peut écrire dans le
 * 92, et « château-hôtel » capte à lui seul les requêtes « hôtel séminaire ».
 *
 * On tranche donc dans l'autre sens, comme pour les fiches lieux : si le titre
 * tient dans 60 sans le suffixe mais pas avec, on garde le titre et on renonce
 * à la marque. Sur un site à 11 domaines référents, elle n'est pas cherchée.
 *
 * Retourne soit une chaîne (le gabarit racine ajoutera « | Select Châteaux »),
 * soit `{ absolute }` (le titre est servi tel quel).
 */
export function titreLanding(titre: string): string | { absolute: string } {
  const propre = titre.replace(/\s+/g, " ").trim();
  if (propre.length <= BUDGET_SOUS_MARQUE) return propre;
  if (propre.length <= TITLE_MAX) return { absolute: propre };
  return { absolute: bornerTitre(propre) };
}

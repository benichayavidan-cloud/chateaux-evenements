/**
 * MAILLAGE INTERNE — donner à chaque article un lien depuis une page que
 * Googlebot visite réellement.
 *
 * LE CONSTAT (mesuré le 06/09/2026 sur le HTML produit par `next build`)
 *
 *   124 des 284 articles n'avaient qu'UN seul lien entrant, et c'était la
 *   pagination de /blog (103) ou l'index /blog (21). Or les pages
 *   /blog/page/2..8 ne figurent pas au sitemap, et /blog lui-même n'avait pas
 *   été crawlé depuis le 20/08.
 *
 *   Les 72 fiches lieux ne liaient AUCUN article. Zéro sur 72. Sur 18 landings,
 *   8 seulement en liaient, pour 28 liens.
 *
 *   Au total, 16 articles sur 284 étaient atteignables depuis une page
 *   « fraîche ». Et la fraîcheur, ici, est mesurée : l'âge médian du dernier
 *   passage de Googlebot est de 6 jours sur les fiches lieux et les landings,
 *   contre 36 jours sur le blog (p75 : 47 j, 19 articles jamais vus).
 *
 * CE QUE FAIT CE MODULE
 *
 *   Il répartit les articles sur les pages fraîches — fiches lieux et landings
 *   — de façon DÉTERMINISTE et EXHAUSTIVE : chaque article reçoit au moins un
 *   lien, et la répartition est stable d'un build à l'autre (aucun rendu
 *   aléatoire, sinon Google verrait un maillage différent à chaque passage).
 *
 *   La pertinence passe d'abord : une fiche lieu de l'Oise propose en priorité
 *   les articles qui parlent de l'Oise. Le reste est complété par les articles
 *   les moins servis, pour que la couverture soit totale.
 *
 * POURQUOI PAS UNE LISTE ÉCRITE À LA MAIN
 *
 *   Parce qu'elle se périmerait au premier article publié. Ici un nouvel
 *   article entre automatiquement dans la répartition — il est même prioritaire,
 *   n'ayant encore aucun lien. Et `scripts/verif-maillage.mjs` fait échouer le
 *   build si un seul article reste sans lien depuis une page fraîche.
 */

import { blogPosts, type BlogPost } from "@/data/blog-posts";
import { venues } from "@/data/venues";
import { geoLandingPages } from "@/data/geo-landing-pages";
import { landingsFormats } from "@/data/landings-formats";
import { landingsDepartements } from "@/data/landings-departements";

/**
 * Créneaux par page, en DEUX parts qui ne se disputent pas :
 *
 *  - PERTINENCE : 2 articles liés au lieu ou à la zone. Ils se répètent d'une
 *    page à l'autre, c'est normal — un article sur l'Oise a sa place sur toutes
 *    les fiches de l'Oise.
 *  - COUVERTURE : le reste, réservé aux articles les MOINS servis du corpus.
 *    C'est cette part qui garantit qu'aucun article ne reste orphelin, et elle
 *    est dimensionnée pour : ceil(nb articles / nb pages fraîches).
 *
 * Sans cette séparation, la part pertinence mangeait tous les créneaux et
 * 121 articles sur 284 ne recevaient aucun lien (mesuré en construisant ce
 * module le 06/09/2026).
 *
 * Le plafond total est un signal utile : s'il est atteint, c'est que le corpus
 * grossit plus vite que la surface de pages fraîches — donc qu'on publie plus
 * vite que Google ne peut absorber.
 */
const CRENEAUX_PERTINENCE = 2;
const PAR_PAGE_MAX = 8;

function normaliser(texte: string): string {
  return texte
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

/** Identité stable d'une page fraîche : son chemin. */
export interface PageFraiche {
  chemin: string;
  /** Mots qui rendent un article pertinent ici : ville, département, thème. */
  motsCles: string[];
}

let repartition: Map<string, BlogPost[]> | null = null;

/**
 * Les pages « fraîches » du site — celles que Googlebot repasse voir.
 *
 * Dérivées des données, jamais écrites à la main : une fiche lieu ou une
 * landing ajoutée demain entre dans le maillage sans que personne y pense.
 */
function pagesFraiches(): PageFraiche[] {
  const pages: PageFraiche[] = [];

  for (const v of venues) {
    pages.push({
      chemin: `/lieux/${v.slug}`,
      motsCles: [v.departement, v.ville, `${v.departementCode}`].filter(
        (x): x is string => typeof x === "string" && x.length > 2
      ),
    });
  }
  for (const g of geoLandingPages) {
    pages.push({ chemin: `/${g.slug}`, motsCles: [g.h1, ...(g.keywords ?? [])].filter(Boolean) });
  }
  for (const l of landingsFormats) {
    pages.push({ chemin: `/${l.slug}`, motsCles: [l.eyebrow, l.h1].filter(Boolean) });
  }
  for (const d of landingsDepartements) {
    pages.push({ chemin: `/${d.slug}`, motsCles: [d.departement, d.code].filter(Boolean) });
  }
  return pages;
}

/**
 * Construit la répartition complète, une fois par build.
 *
 * Algorithme, volontairement simple et reproductible :
 *   1. les pages sont parcourues dans l'ordre alphabétique de leur chemin ;
 *   2. chaque page prend d'abord les articles PERTINENTS les moins servis ;
 *   3. puis complète avec les articles les moins servis du corpus entier ;
 *   4. à égalité de service, le slug tranche — donc aucun aléa.
 */
function construire(pages: PageFraiche[]): Map<string, BlogPost[]> {
  const ordonnees = [...pages].sort((a, b) => a.chemin.localeCompare(b.chemin));
  const pourCouverture = Math.ceil(blogPosts.length / Math.max(1, ordonnees.length));
  const parPage = Math.min(PAR_PAGE_MAX, CRENEAUX_PERTINENCE + pourCouverture);

  const servis = new Map<string, number>();
  for (const a of blogPosts) servis.set(a.slug, 0);

  const motsDe = new Map<string, string>();
  for (const a of blogPosts) {
    motsDe.set(a.slug, normaliser([a.slug, a.title, ...(a.keywords ?? [])].join(" ")));
  }

  const moinsServis = (candidats: BlogPost[]) =>
    [...candidats].sort(
      (x, y) =>
        (servis.get(x.slug) ?? 0) - (servis.get(y.slug) ?? 0) ||
        x.slug.localeCompare(y.slug)
    );

  const resultat = new Map<string, BlogPost[]>();
  for (const page of ordonnees) {
    const cles = page.motsCles.map(normaliser).filter((c) => c.length > 2);
    const pertinents = cles.length
      ? blogPosts.filter((a) => {
          const m = motsDe.get(a.slug) ?? "";
          return cles.some((c) => m.includes(c));
        })
      : [];

    const choisis: BlogPost[] = [];
    const pris = new Set<string>();
    const prendre = (source: BlogPost[], plafond: number) => {
      for (const a of source) {
        if (choisis.length >= plafond) break;
        if (pris.has(a.slug)) continue;
        pris.add(a.slug);
        choisis.push(a);
        servis.set(a.slug, (servis.get(a.slug) ?? 0) + 1);
      }
    };
    // La pertinence d'abord, mais bornée : elle ne doit jamais priver la
    // couverture de ses créneaux.
    prendre(moinsServis(pertinents), CRENEAUX_PERTINENCE);
    prendre(moinsServis(blogPosts), parPage);
    resultat.set(page.chemin, choisis);
  }
  return resultat;
}

/** Les articles à afficher sur une page fraîche. Calcul unique par build. */
export function articlesPour(chemin: string): BlogPost[] {
  if (!repartition) repartition = construire(pagesFraiches());
  return repartition.get(chemin) ?? [];
}

/** Exposée pour le garde-fou : la répartition entière. */
export function repartitionComplete(): Map<string, BlogPost[]> {
  if (!repartition) repartition = construire(pagesFraiches());
  return repartition;
}

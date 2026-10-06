/**
 * Redirections du site, liées à leurs deux registres : fusions du blog
 * (merged-redirects.json) et une-page-par-requête commerciale
 * (redirections-commerciales.json). Les composants passent leurs liens
 * internes par `lienFinal` : aucun lien du site ne doit pointer vers une
 * page redirigée.
 */

import fusions from "./merged-redirects.json";
import commerciales from "./redirections-commerciales.json";
import { creerResolveur } from "@/lib/redirections";

const resolveur = creerResolveur([
  ...fusions.merges.map((m) => ({ from: `/blog/${m.from}`, to: m.to })),
  ...commerciales.redirections,
]);

export const lienFinal = resolveur.resoudre;
export const reecrireLiensHtml = resolveur.reecrireHtml;
export const estRedirige = resolveur.estRedirige;

export const redirectionsCommerciales = commerciales.redirections;

/** Entrée commerciale dont cet article est la page gagnante, s'il en a une. */
export function pageCommercialeDeLArticle(slug: string) {
  return commerciales.redirections.find((r) => r.to === `/blog/${slug}`) ?? null;
}

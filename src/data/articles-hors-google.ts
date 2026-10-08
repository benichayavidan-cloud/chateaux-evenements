/**
 * Articles retirés de Google, liés à leur registre (articles-hors-google.json).
 * Le layout des articles et le sitemap passent par ces deux fonctions.
 */

import registre from "./articles-hors-google.json";
import { creerFiltreHorsGoogle } from "@/lib/hors-google";

const filtre = creerFiltreHorsGoogle(registre.articles);

export const estHorsGoogle = filtre.estHorsGoogle;
export const robotsArticle = filtre.robots;

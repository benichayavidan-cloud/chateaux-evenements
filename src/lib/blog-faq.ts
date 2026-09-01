/**
 * FAQ D'ARTICLE — passage des données au rendu visible.
 *
 * Le champ `faq` des articles n'alimentait que le JSON-LD : au 01/09/2026,
 * 284 articles déclaraient un FAQPage et 49 seulement affichaient les questions.
 * Google exige que le contenu balisé soit visible, et un moteur génératif ne cite
 * que ce qu'il lit dans la page — les réponses étaient donc perdues deux fois.
 *
 * Ce module prépare les items pour <FaqSection> et pose les trois garde-fous
 * que le branchement direct ne fournit pas :
 *   1. les articles qui rendent DÉJÀ leur FAQ dans leur HTML sont ignorés
 *      (détection par le balisage, jamais par une liste de slugs à maintenir) ;
 *   2. les questions en double sont écartées — <FaqSection> les utilise comme
 *      clé de liste React, un doublon casserait le build ;
 *   3. le champ `answer` des articles est mappé sur le `reponse` attendu par
 *      le composant, convention des landings.
 */

import type { BlogPost } from "@/data/blog-posts";

export interface FaqSectionItem {
  question: string;
  reponse: string;
}

/** Signatures d'une FAQ déjà rendue dans le HTML de l'article. */
const FAQ_DEJA_RENDUE = /faq-section|schema\.org\/FAQPage/i;

/**
 * Items à passer à <FaqSection>, ou tableau vide si rien n'est à afficher.
 * Un tableau vide fait retourner null au composant : aucune section parasite.
 */
export function getVisibleFaq(article: BlogPost): FaqSectionItem[] {
  if (!article.faq?.length) return [];
  if (FAQ_DEJA_RENDUE.test(article.content)) return [];

  const vues = new Set<string>();
  const items: FaqSectionItem[] = [];

  for (const { question, answer } of article.faq) {
    const q = question?.trim();
    const r = answer?.trim();
    if (!q || !r) continue;

    const cle = q.toLowerCase();
    if (vues.has(cle)) continue;
    vues.add(cle);

    items.push({ question: q, reponse: r });
  }

  return items;
}

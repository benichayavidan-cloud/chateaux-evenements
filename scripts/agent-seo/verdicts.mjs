/**
 * Étape R3 du run — ACTIONS À JUGER.
 *
 * Marcus liste les actions arrivées à échéance et les remonte dans son rapport.
 * Il n'écrit plus de verdict lui-même (décision du 01/11/2026). L'ancien module
 * n'a produit aucun verdict réel en deux mois :
 *  - une action « gelée » ou « prolongée » n'était jamais relue ;
 *  - la mesure ne regardait que les 10 pages les plus cliquées : toute autre cible
 *    valait « 0 imp », y compris une action humaine mesurée dans le CRM ;
 *  - aucune prédiction chiffrée n'était réellement comparée à une mesure.
 * Depuis le retrait des actions automatiques, le journal ne reçoit que des
 * actions humaines : leur verdict se pose à la main, preuve à l'appui.
 */
import { sbSelect } from './lib.mjs';

export async function actionsAJuger({ lire = sbSelect, aujourdhui = new Date().toISOString().slice(0, 10) } = {}) {
  const dues = await lire(`marcus_journal?or=(verdict.is.null,verdict.in.(gele,prolonge))&echeance=lte.${aujourdhui}&order=echeance.asc&select=*`);
  if (!Array.isArray(dues)) throw new Error(`Supabase : ${dues?.message || 'réponse illisible'}`);
  return dues.map((a) => ({ id: a.id, action: a.action, echeance: a.echeance, a_trancher: `prédiction : ${a.prediction}` }));
}

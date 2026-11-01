/**
 * Étape R5 — MOTEUR D'ACTIONS niveau 1 (blueprint §6-7). DORMANT en Phase 1.
 *
 * Le réveil est un CHANGEMENT DE DONNÉE, pas de code :
 *   update agent_controls set phase = 2 where id = 'marcus';
 * Tant que phase < 2, ce module liste ce qu'il AURAIT fait (répétition
 * générale dans les rapports d'observation) et ne touche à rien.
 *
 * Garde-fous appliqués dans l'ordre, AVANT toute action :
 *   1. phase ≥ 2                      (sinon simulation)
 *   2. page absente de pages-gelees   (sinon rejet définitif)
 *   3. quota du type d'action non atteint sur ce run
 *   4. update Google en cours → run SANS action (Loi 6)
 *   5. chaque action exécutée = entrée marcus_journal avec prédiction
 *      chiffrée et échéance (sinon l'action est ILLÉGALE — Loi 2)
 *
 * Actions implémentées : aucune dans le backlog (voir construireBacklog).
 * `commande-reecriture` reste exécutable, car une demande peut être ouverte à la main.
 *
 * DEUX ACTIONS ONT ÉTÉ RETIRÉES le 06/09/2026, à la revue qui a précédé le
 * passage en phase 2 :
 *
 *   inspection-google — PLACEBO. L'API URL Inspection est en LECTURE SEULE :
 *     elle ne déclenche aucune indexation. Le bouton « Demander une indexation »
 *     de l'interface n'a pas d'API publique, et l'API Indexing est réservée aux
 *     JobPosting et BroadcastEvent. L'action consommait du quota en donnant
 *     l'illusion d'agir.
 *
 *   title-ab — SANS OBJET. Les 97 titres hors norme ont été réécrits le
 *     06/09 et `scripts/verif-titres.mjs` les borne désormais à 60 caractères
 *     en faisant échouer le build. Un test A/B de titres se battrait contre le
 *     garde-fou.
 *
 * Les rétablir demanderait de lever ces deux obstacles, pas de décommenter du
 * code : c'est pourquoi elles sont supprimées et non désactivées.
 */
import fs from 'node:fs';
import { execFileSync } from 'node:child_process';
import { sbSelect, sbInsert } from './lib.mjs';

const QUOTAS = { 'commande-reecriture': 1 };
const GELEES = JSON.parse(fs.readFileSync(new URL('./pages-gelees.json', import.meta.url))).pages;

/**
 * Label des demandes de réécriture — Camille lit exactement celui-ci
 * (scripts/agent-cm/pipeline.js, LABEL_REECRITURE ; un test vérifie l'égalité).
 * Au 24/09/2026 il n'existait pas dans le dépôt : `gh issue create --label`
 * échoue sur un label inconnu, et aucune demande n'avait jamais été créée.
 */
export const LABEL_REECRITURE = 'camille-reecriture';

/**
 * Ouvre la demande de réécriture pour Camille.
 *
 * Le label est (re)créé d'abord : `--force` rend l'opération idempotente, et
 * une demande ne peut plus échouer faute de label. Les arguments passent SANS
 * shell (execFileSync) : le motif contenait des guillemets et pouvait
 * contenir `$` ou des backticks, que l'ancien `execSync` interprétait.
 */
export function commanderReecriture(a, runId, exec = execFileSync) {
  exec('gh', ['label', 'create', LABEL_REECRITURE, '--force', '--color', '5319e7',
    '--description', 'Demande de réécriture d\'un article pour Camille (ouverte par Marcus ou à la main)'], { encoding: 'utf8' });
  return exec('gh', ['issue', 'create',
    '--title', `Camille : réécriture GEO — ${a.cible}`,
    '--label', LABEL_REECRITURE,
    '--body', `${a.motif}\n\nDemandé par Marcus (run #${runId}). Prédiction : ${a.prediction}`,
  ], { encoding: 'utf8' });
}

/**
 * LE BACKLOG EST VIDE depuis le 01/11/2026 : Marcus observe et rapporte.
 *
 *   ping-indexnow — RETIRÉ. 12 envois de 20 URL. Sur les listes reconstituées,
 *     1 à 4 URL sur 20 indexées au 01/11 pour 30 % prédits. Googlebot n'est pas
 *     venu, et Bing visitait déjà ces pages avant le ping (84 URL avant, 104
 *     après, sur les 12 envois). IndexNow ne notifie pas Google.
 *
 *   commande-reecriture — RETIRÉ. 6 commandes sur le même article, toutes
 *     refermées sans réécriture. L'hypothèse « beaucoup d'impressions et zéro
 *     clic = problème de contenu, pas de rang » visait une page en 40ᵉ position.
 *
 * Toute nouvelle action devra d'abord prouver qu'elle se mesure.
 */
export function construireBacklog() {
  return [];
}

export async function phaseCourante() {
  const rows = await sbSelect('agent_controls?id=eq.marcus&select=phase');
  return rows?.[0]?.phase ?? 1;
}

export async function executerActions(backlog, { runId, updateEnCours }) {
  const phase = await phaseCourante();
  const simulation = phase < 2;
  if (updateEnCours && !simulation) { console.log('[R5] update Google en cours — run SANS action (Loi 6)'); return { executees: [], simulees: [] }; }

  const compteurs = {}; const executees = []; const simulees = [];
  for (const a of backlog) {
    if (GELEES.includes(a.cible)) { console.log(`[R5] REFUS page gelée : ${a.cible}`); continue; }
    compteurs[a.type] = (compteurs[a.type] || 0) + 1;
    if (compteurs[a.type] > (QUOTAS[a.type] ?? 0)) continue;
    if (!a.prediction || !a.echeance) { console.log(`[R5] ILLÉGALE (sans prédiction) : ${a.type} ${a.cible}`); continue; }

    if (simulation) { simulees.push(a); continue; }

    try {
      if (a.type === 'commande-reecriture') {
        commanderReecriture(a, runId);
      } else { continue; }
      await sbInsert('marcus_journal', { run_id: runId, cible: a.cible, action: a.type + (a.motif ? ' — ' + a.motif : ''), niveau: 1, hypothese: a.hypothese || null, prediction: a.prediction, echeance: a.echeance });
      executees.push(a);
    } catch (e) { console.log(`[R5] échec ${a.type} ${a.cible} : ${e.message}`); }
  }
  console.log(`[R5] Actions : ${executees.length} exécutée(s), ${simulees.length} simulée(s) (phase ${phase})`);
  return { executees, simulees };
}

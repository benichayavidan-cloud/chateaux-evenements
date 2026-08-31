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
 * Actions implémentées (v1) :
 *   - ping-indexnow        : notifier Bing/Yandex des URLs modifiées
 *   - inspection-google    : demander l'inspection GSC d'une URL modifiée
 *   - commande-reecriture  : ouvrir une issue GitHub étiquetée pour Camille
 *   [Phase 2] title-ab     : réécriture de title avec groupe témoin —
 *                            implémentée à l'activation, avec les 2 semaines
 *                            de courbe CTR-par-position en référence
 */
import fs from 'node:fs';
import { execSync } from 'node:child_process';
import { SITE, env, gsc, sbSelect, sbInsert } from './lib.mjs';

const QUOTAS = { 'ping-indexnow': 99, 'inspection-google': 20, 'commande-reecriture': 1, 'title-ab': 3 };
const GELEES = JSON.parse(fs.readFileSync(new URL('./pages-gelees.json', import.meta.url))).pages;

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
      if (a.type === 'ping-indexnow') {
        execSync(`node ${new URL('../indexnow.mjs', import.meta.url).pathname} ${a.urls.map((u) => `"${u}"`).join(' ')}`, { stdio: 'inherit' });
      } else if (a.type === 'inspection-google') {
        await gsc('/v1/urlInspection/index:inspect', { inspectionUrl: SITE + a.cible, siteUrl: SITE + '/' });
      } else if (a.type === 'commande-reecriture') {
        execSync(`gh issue create --title "Camille : réécriture GEO — ${a.cible}" --label camille-reecriture --body ${JSON.stringify(a.motif + '\n\nDemandé par Marcus (run #' + runId + '). Prédiction : ' + a.prediction)}`, { encoding: 'utf8' });
      } else { continue; }
      await sbInsert('marcus_journal', { run_id: runId, cible: a.cible, action: a.type + (a.motif ? ' — ' + a.motif : ''), niveau: 1, hypothese: a.hypothese || null, prediction: a.prediction, echeance: a.echeance });
      executees.push(a);
    } catch (e) { console.log(`[R5] échec ${a.type} ${a.cible} : ${e.message}`); }
  }
  console.log(`[R5] Actions : ${executees.length} exécutée(s), ${simulees.length} simulée(s) (phase ${phase})`);
  return { executees, simulees };
}

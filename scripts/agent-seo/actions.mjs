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
 * Actions implémentées :
 *   - ping-indexnow        : notifier Bing/Yandex des URLs modifiées
 *   - commande-reecriture  : ouvrir une issue GitHub étiquetée pour Camille
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
import { execSync } from 'node:child_process';
import { env, sbSelect, sbInsert } from './lib.mjs';

const QUOTAS = { 'ping-indexnow': 99, 'commande-reecriture': 1 };
const GELEES = JSON.parse(fs.readFileSync(new URL('./pages-gelees.json', import.meta.url))).pages;

/**
 * CONSTRUIT LE BACKLOG à partir du snapshot du run.
 *
 * Ajouté le 07/09/2026. Jusque-là `collecte.mjs` appelait
 * `executerActions([], …)` — un tableau vide EN DUR. Le moteur tournait donc
 * à blanc quelle que soit la phase : passer Marcus en phase 2 le 06/09 n'a
 * rien pu changer, et `marcus_journal` est resté vide parce qu'il n'avait
 * jamais rien à écrire. Le commentaire « en Phase 1 le backlog est vide »
 * décrivait une intention, pas un branchement.
 *
 * Chaque action porte une PRÉDICTION CHIFFRÉE et une ÉCHÉANCE, sans quoi
 * executerActions la refuse (Loi 2) : une action dont on ne peut pas dire à
 * l'avance ce qu'elle doit produire n'est pas évaluable, donc pas légitime.
 */
const JOURS = (n) => new Date(Date.now() + n * 864e5).toISOString().slice(0, 10);

export function construireBacklog(snapshot) {
  const backlog = [];

  // ── ping-indexnow : les pages que Google dit ne pas avoir indexées.
  //
  // C'est le SEUL levier d'accélération réellement disponible. L'API Indexing
  // de Google est réservée aux JobPosting/BroadcastEvent et l'API URL
  // Inspection est en lecture seule (c'est ce qui a fait retirer l'action
  // « inspection-google » le 06/09). IndexNow ne notifie que Bing et Yandex —
  // on ne prétend donc pas accélérer Google ici, et la prédiction porte sur
  // ce qui est réellement mesurable.
  //
  // On exclut les états qui ne se corrigent PAS par un ping : une page
  // redirigée, en double, ou volontairement exclue restera non indexée quel
  // que soit le nombre de notifications. Les pinger consommerait du quota en
  // donnant l'illusion d'agir — exactement le reproche fait à l'action
  // placebo retirée le 06/09.
  const sansEspoir = /redirect|duplicat|canonical|exclue|noindex|introuvable|404|not found/i;
  const aPinger = (snapshot.indexation?.non_indexees || [])
    .filter((p) => !sansEspoir.test(p.etat))
    .slice(0, 20);

  if (aPinger.length > 0) {
    backlog.push({
      type: 'ping-indexnow',
      cible: `${aPinger.length} URL non indexées`,
      urls: aPinger.map((p) => `https://www.selectchateaux.com${p.url}`),
      motif: `${aPinger.length} URL du sitemap non indexées (états : ${[...new Set(aPinger.map((p) => p.etat))].slice(0, 3).join(', ')})`,
      hypothese: 'Notifier Bing/Yandex par IndexNow réduit le délai de découverte des pages non indexées',
      prediction: `sur ces ${aPinger.length} URL, au moins 30 % passent à un état indexé d'ici 21 jours`,
      echeance: JOURS(21),
    });
  }

  // ── commande-reecriture : UNE page par run (quota), celle qui a le plus à
  // gagner. On vise la page qui reçoit beaucoup d'impressions sans clics :
  // elle est vue et pas choisie, donc le problème est le contenu ou le titre,
  // pas la position. Camille choisit ses 3 réécritures sur la position
  // (5-25) ; Marcus complète sur un autre signal, sinon les deux agents
  // désigneraient les mêmes pages.
  const muettes = (snapshot.gsc28?.pages_muettes || []).filter((p) => /^\/blog\//.test(p.p || ''));

  if (muettes.length > 0) {
    const p = muettes[0];
    backlog.push({
      type: 'commande-reecriture',
      cible: p.p,
      motif: `${p.imp} impressions sur 28 jours en position ${p.pos} et AUCUN clic — la page est vue et jamais choisie`,
      hypothese: 'Une page à fortes impressions et zéro clic souffre de son titre ou de son contenu, pas de son rang',
      prediction: `au moins 1 clic sur ${p.p} dans les 28 jours suivant la réécriture`,
      echeance: JOURS(28),
    });
  }

  return backlog;
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
      if (a.type === 'ping-indexnow') {
        execSync(`node ${new URL('../indexnow.mjs', import.meta.url).pathname} ${a.urls.map((u) => `"${u}"`).join(' ')}`, { stdio: 'inherit' });
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

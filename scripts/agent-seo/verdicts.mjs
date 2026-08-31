/**
 * Étape R3 du run — VERDICTS (blueprint §7, Lois 2, 3 et 6).
 *
 * Relit marcus_journal : toute action arrivée à échéance reçoit son verdict.
 * En Phase 1 (observation) le journal est vide : le module tourne, ne trouve
 * rien, et c'est voulu — il est ainsi éprouvé AVANT d'avoir des décisions à
 * prendre. Dès la Phase 2, chaque action niveau 1 créée par actions.mjs
 * portera sa prédiction et repassera ici.
 *
 * Règles :
 *  - update Google en cours (C10) → verdict 'gele', réexamen au run suivant (Loi 6)
 *  - l'évaluation compare l'effet MESURÉ (snapshot courant vs snapshot
 *    antérieur à l'action) à la prédiction chiffrée
 *  - < 50 impressions sur la cible → 'prolonge' (données insuffisantes, §5),
 *    une seule prolongation puis verdict forcé
 *  - verdict 'annule' → le run crée une entrée de REVERT dans le backlog
 *    d'actions (exécutée par actions.mjs, jamais ici : mesurer et agir sont
 *    deux modules séparés)
 */
import { sbSelect } from './lib.mjs';

export async function passerLesVerdicts(snapshot, updateEnCours) {
  const dues = await sbSelect(`marcus_journal?verdict=is.null&echeance=lte.${new Date().toISOString().slice(0, 10)}&select=*`);
  if (!dues.length) { console.log('[R3] Verdicts : aucune action à échéance'); return { verdicts: [], reverts: [] }; }

  const verdicts = [], reverts = [];
  for (const a of dues) {
    let verdict, effet;
    if (updateEnCours) {
      verdict = 'gele'; effet = 'update Google en cours — verdict reporté (Loi 6)';
    } else {
      // Évaluation générique : la cible est une page → on compare ses clics/impressions
      const page = snapshot.gsc28?.top_pages?.find((p) => p.p === a.cible);
      const imp = page?.imp ?? 0;
      if (imp < 50 && !a.effet_mesure?.includes('prolongé')) {
        verdict = 'prolonge'; effet = `données insuffisantes (${imp} imp) — prolongé une fois`;
      } else {
        // Sans moteur de prédiction chiffrée parsée (Phase 2), on remonte à l'humain
        verdict = null; effet = `à évaluer manuellement : prédiction « ${a.prediction} », page à ${imp} imp`;
      }
    }
    if (verdict) {
      await fetch(`${process.env.SUPABASE_URL || ''}/rest/v1/marcus_journal?id=eq.${a.id}`, { method: 'PATCH', headers: { apikey: process.env.SUPABASE_SERVICE_KEY, Authorization: `Bearer ${process.env.SUPABASE_SERVICE_KEY}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ verdict, verdict_at: new Date().toISOString(), effet_mesure: effet }) });
      if (verdict === 'annule') reverts.push(a);
    }
    verdicts.push({ id: a.id, action: a.action, verdict: verdict || 'manuel', effet });
  }
  console.log(`[R3] Verdicts : ${verdicts.length} traité(s)`);
  return { verdicts, reverts };
}

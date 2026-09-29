-- Petits groupes acceptés (29/09/2026).
-- Projet Supabase select-chateaux (jmeiepmtgidqtmxfnlwf), table demandes_devis_chateaux.
-- La contrainte d'origine imposait 10 participants minimum : un comité de
-- direction de 6 personnes voyait « Erreur lors de l'enregistrement » et sa
-- demande était perdue. Élargissement seul — toute ligne existante reste valide.
-- À appliquer AVANT le déploiement de src/lib/devis-schema.ts (min 1).
-- Idempotent.
alter table public.demandes_devis_chateaux
  drop constraint if exists demandes_devis_chateaux_nombre_participants_check;
alter table public.demandes_devis_chateaux
  add constraint demandes_devis_chateaux_nombre_participants_check
  check (nombre_participants >= 1 and nombre_participants <= 500);

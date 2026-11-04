-- Dernier clic sur une annonce Google Ads, joint à la demande de devis (04/11/2026).
-- Projet Supabase select-chateaux (jmeiepmtgidqtmxfnlwf), table demandes_devis_chateaux.
-- À appliquer AVANT le déploiement de src/app/api/devis/route.ts qui écrit cette colonne :
-- sans elle, l'insertion échoue et la demande est perdue.
-- Idempotent. Facultative : une demande sans clic Ads reste valide (null).
alter table public.demandes_devis_chateaux
  add column if not exists origine_ads jsonb;

comment on column public.demandes_devis_chateaux.origine_ads is
  'Dernier clic Ads de moins de 30 jours : campagne, annonceId, groupeId, motCle, correspondance, appareil, page, clicLe, gclid, gbraid, wbraid, consentement (oui | non | inconnu) — src/lib/origine.ts';

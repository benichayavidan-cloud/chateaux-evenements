-- Provenance des demandes de devis au PREMIER contact (24/09/2026).
-- Projet Supabase select-chateaux (jmeiepmtgidqtmxfnlwf), table demandes_devis_chateaux.
-- À appliquer AVANT le déploiement de src/app/api/devis/route.ts qui écrit ces colonnes :
-- sans elles, l'insertion échoue et la demande est perdue.
-- Idempotent. Toutes facultatives : une demande sans provenance reste valide.
alter table public.demandes_devis_chateaux
  add column if not exists origine_canal text,
  add column if not exists origine_page text,
  add column if not exists origine_referent text,
  add column if not exists origine_utm jsonb,
  add column if not exists origine_premiere_visite timestamptz;

comment on column public.demandes_devis_chateaux.origine_canal is
  'google | bing | autre-moteur | chatgpt | perplexity | gemini | copilot | claude | reseau-social | site-referent | email | pub | direct | inconnu (src/lib/origine.ts)';
comment on column public.demandes_devis_chateaux.origine_page is
  'Première page vue sur le site (chemin), ≠ source_page qui est la page du formulaire';

# TODO - Prochaine session (SITE-WEB)

## Session 11 juin 2026 (soir) — Audit SEO/GEO + fix racine cannibalisation — DÉPLOYÉE ✅

### ⚡ Action immédiate (Avidan, 2 min)
- [ ] GSC UI → Inspection d'URL → « Demander une indexation » pour :
  - /blog/alternative-chateauform-ile-de-france (PRIORITAIRE — nouvelle page, inconnue de Google)
  - / (homepage), /seminaire-chateau-chantilly, /team-building-chateau
  - Si quota restant : landing Oise, Yvelines, Chevreuse, 92
- ⚠️ Ne PAS demander d'indexation sur les 12 URLs fusionnées (301 voulus). « Page avec redirection » dans GSC pendant 2-4 semaines = normal.

### Fait cette session (3 commits, déployés via `vercel --prod`)
- [x] Audit SEO/GEO complet (rapport : `_claude_docs/2026-06-11_audit-seo-geo-complet.md`)
- [x] **Gate anti-cannibalisation EN CODE** : `scripts/agent-cm/anti-cannibalisation.js` + `seo-clusters.json` (registre mot-clé→page canonique) — 7/7 tests
- [x] Pipeline Camille blindé : cross-check intra-run, cap 2 articles, ownership requête→page GSC, retry résilient
- [x] **12 fusions 301** d'articles cannibalisants — source unique `src/data/merged-redirects.json` (next.config + MERGED_SLUGS)
- [x] Maillage canonique automatique (internal-link-map `targetPath` → landing pages, injecté au rendu)
- [x] **llms.txt dynamique** + 11 bots IA dans robots.ts (point « reporté » de la session CRO ↓ : FAIT)
- [x] Blocs GEO (réponse directe citable + tableau comparatif) sur les 6 landing geo
- [x] Titles CTR avec prix — source unique `src/data/pricing.ts`
- [x] Article « Alternative à Châteauform IDF » publié via le gate
- [x] Audit /code-review du diff → 10 findings corrigés AVANT deploy (règle racine appliquée)

### TODO prochaine session (volet SEO/GEO)
- [ ] Annuaires B2B : ABC Salles, 1001 Salles, Bedouk, Kactus, Aleou, Salles-Séminaires.com (liens gratuits + leads directs)
- [ ] GBP : posts hebdo + collecte d'avis (accès API en attente, dossier 7-1582000039874)
- [ ] Corriger prix article `budget-seminaire-entreprise-2026-planifier` (250-500€ vs pilier 150-450€) — référence : `src/data/pricing.ts`
- [ ] J+14 : check GSC positions landing Chantilly/Yvelines (effet fusions attendu 4-8 sem.) + canal "AI Assistant" GA4
- [ ] Baromètre prix séminaires IDF depuis data CRM (citations IA + backlinks)

---

## Session 11 juin 2026 — CRO tunnel de conversion devis

### Contexte
Départ : « session SEO + GEO ». Recadrage utilisateur → objectif réel = **plus de leads (devis), vite et mesurable, sans Ads**. Pivot vers le **CRO** (convertir le trafic déjà présent ~435 sessions/90j). Diagnostic : 2 fuites — seulement 10% atteignent `/devis`, et ~58% d'abandon du formulaire.

### Fait cette session (12 commits, tout en prod via `vercel --prod`)
- [x] **StickyCtaBar** ajoutée sur homepage + team-building (fuite haut de tunnel)
- [x] **Formulaire `/devis` (DevisFormMini)** :
  - [x] Participants en **chiffre précis** (+ aide « estimation suffit », validation 10-500)
  - [x] **Autofill natif** (`autocomplete` name/email/tel/organization)
  - [x] **Entreprise auto** depuis le domaine de l'email pro (compatible autofill via effet debounce)
  - [x] **✓ vert** email/tél valides (dérivé de la valeur)
  - [x] **Date départ = date arrivée** (auto, gère séminaires 1 jour)
  - [x] **Visiteur de retour** : coordonnées pré-remplies (localStorage `sc_devis_contact`)
  - [x] **Dates obligatoires** + case **« Ces dates ne sont pas encore définitives »** (drapeau)
  - [x] **Colonne DB dédiée `dates_flexibles`** (migration prod via API Management Supabase) + injection dans l'email `seminaires@` (encart ⚠️) — VÉRIFIÉ OK
- [x] Baseline funnel figée : `_claude_docs/2026-06-11_baseline-funnel-cro.md`

### Filet de sécurité
- Tag git `pre-cro-2026-06-11` (commit `1a88351`) = état avant la session. Rollback aussi via Vercel (Promote previous deployment).
- ⚠️ Auto-deploy GitHub→Vercel **inactif** → déployer via `vercel --prod` (voir mémoire `site_web_deploy`).

### TODO prochaine session
- [ ] **MESURE S+2 (~25 juin)** : re-relever les events GA4 (`form_start`/`form_submit`/`generate_lead`), comparer au baseline (complétion 42% / 10% atteinte /devis / ~7 leads/mois). Puis **S+4 (~9 juil)**.
- [ ] Vérifier la répartition `dates_flexibles = true` parmi les nouveaux devis (signal flexibilité pour le commercial).
- [ ] Si besoin : pousser le CRO (CTA hero homepage renforcé, sticky sur pages château `[slug]`).
- [ ] (Reporté) Axe SEO/GEO de fond : `llms.txt` + allowlist crawlers IA dans `robots.ts` — quasi-gratuit, bénéfice long terme.
- [ ] (Optionnel) Diagnostiquer/reconnecter l'auto-deploy GitHub→Vercel.

### Points d'attention
- Volume faible (~140 sessions/mois) → un signal CRO lisible demande **2-4 semaines**, pas quelques jours.
- Le mode « période flexible » a été testé puis abandonné au profit de « dates obligatoires + drapeau » (préférence UX utilisateur).

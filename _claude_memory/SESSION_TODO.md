# TODO - Prochaine session (SITE-WEB)

## Session 17 juin 2026 — SEO/GEO « moteur agent » — DÉPLOYÉE ✅ (commit 9d3e7ed)

### Fait (1 commit, push main → auto-deploy Vercel)
- [x] **Moteur Camille → GEO** (signaux garantis en code, 4 couches) : `dateModified` réel via `updatedAt` (+ fix : la réécriture n'écrase plus `publishedAt`) · schema **HowTo** · liage d'entités (`isPartOf`/`about`) sur tous les articles · `knowsAbout` + `contactPoint` sur Organization
- [x] **Consolidation CODIR** (data GSC : 4 articles cannibalisaient le pilier pos 3,7) : 3×301 → `/blog/seminaire-codir-chateau-privatise`, cluster `codir` enregistré, upgrade GEO du pilier (titre 2026+prix, howTo, `<ol>`+blockquote), 11 liens internes repointés
- [x] **Registre keywords** enrichi : pépite `lieu séminaire` → IDF, zoneWords Versailles/Vélizy (régression vérifiée : 0 nouveau blocage)
- [x] **Baseline GEO** : GA4 canal AI Assistant = 3 sess/90j (0% rebond, 161s) · GSC pépites confirmées
- [x] Doc : `_claude_docs/2026-06-17_geo-keyword-assignment.md` (matrice + backlog)

### TODO prochaine session
- [x] **Deploy live vérifié** (titre 2026, schema HowTo, dateModified, knowsAbout, 3×308→canonique) + **IndexNow pingé** (canonique + 3 URLs redirigées, 200 OK) — 17/06
- [ ] **Backlog GEO #2** : créer pilier `séminaire au vert proche Paris` (Ads-prouvé, vierge) — puis enregistrer cluster
- [ ] **Backlog GEO #3** : contenu info P15 (`programme séminaire exemple/modèle`, cahier des charges) — vérifier d'abord que `checklist-organiser-seminaire` ne couvre pas
- [ ] **`sameAs` Maps** dès accès API GBP accordé (dossier 7-1582000039874) → ajouter URL fiche à `structured-data.ts`
- [ ] **MESURE S+2 (~1er juil)** : position `codir château` (effet consolidation 3,7 → page 1 ?) + canal AI Assistant GA4
- [ ] Vérifier rich results : tester un article avec `howTo` (après prochain run Camille) dans le Rich Results Test Google

---

## Session 12 juin 2026 — Indexation Bing/IndexNow + annuaires B2B + plan keywords — DÉPLOYÉE ✅

### Fait cette session (2 commits, auto-deploy Vercel actif)
- [x] Indexation GSC demandée manuellement (article Châteauform + 7 pages prioritaires) — fait par Avidan
- [x] **Bing Webmaster Tools** : site inscrit (import GSC), sitemap.xml soumis, Site Scan lancé
- [x] **IndexNow opérationnel** : clé + fichier `public/0d627a0f….txt` + script `scripts/indexnow-ping.js` — 22 URLs pingées (10 stratégiques + 12 fusionnées 301)
- [x] **Hook IndexNow dans le pipeline Camille** (`camille-blog-agent.yml`) : poll l'URL en 200 (attente auto-deploy) puis ping — chaque futur article auto-soumis à Bing
- [x] **Découverte : auto-deploy GitHub→Vercel re-fonctionne** (vérifié API Vercel, source: git) — point TODO résolu, mémoire mise à jour
- [x] GSC « Bloquée par robots.txt » (3 URLs paramétrées) analysé → blocage volontaire, rien à faire
- [x] **Annuaires B2B** : liste corrigée pour intermédiaire (PAS de château en propre) — 9 annuaires vérifiés avec URLs d'inscription + kit copier-coller : `_claude_docs/2026-06-12_kit-inscription-annuaires.md`
- [x] **Plan keywords SEO + IA mode** : 363 keywords / 15 patterns validés (data GSC + termes Ads réels + Keyword Planner) : `_claude_docs/2026-06-12_keyword-plan.md` (+ patterns rejetés : insolite/original, nature, sportif)

### TODO prochaine session
- [ ] **Inscriptions annuaires** (Avidan, ~10-15 min chacun) : kit prêt, 9 URLs dans le kit. Une fois fait → donner les URLs des fiches à Claude pour vérif NAP/backlinks
- [ ] **Exploiter le keyword plan** : croiser avec seo-clusters.json → assigner chaque pattern à une page existante (renfort) ou contenu à créer ; prioriser par volume/conversion. Pépites identifiées : `codir château` (pos 3,7 !), `seminaire chateau nature` (pos 9,7), `lieu séminaire` (590/mois)
- [ ] **Bing WMT à surveiller** : résultats Site Scan, soumissions IndexNow visibles, menu AI Performance (visibilité Copilot)
- [ ] Vérifier indexation Google de l'article Châteauform (inspection URL, ~J+3)
- [ ] Surveiller le 1er run Camille avec hook IndexNow (logs GitHub Actions)
- [ ] Corriger prix article `budget-seminaire-entreprise-2026-planifier` (250-500€ vs pilier 150-450€) — référence : `src/data/pricing.ts`
- [ ] GBP : posts hebdo + avis (API en attente, dossier 7-1582000039874)
- [ ] Baromètre prix séminaires IDF depuis data CRM (citations IA + backlinks)
- [ ] **MESURE S+2 (~25 juin)** : events GA4 funnel CRO vs baseline + check GSC positions landing (effet fusions) + canal "AI Assistant" GA4

---

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

# TODO - Prochaine session

## Session 17 avril 2026 — Audit GSC + refonte SEO complète (avant Chabbat)

### ✅ Fait cette session (2 commits SEO déployés)

#### 🔍 Audit GSC complet 90 jours
- [x] 76 clics / 4177 impressions / CTR 1.8% / pos moy 26.5
- [x] Détection 6 pages top 10 avec CTR 0% (quick wins)
- [x] Détection 4 pages géo en page 4-5 avec 200+ impressions
- [x] Requêtes orphelines identifiées (hôtel séminaire, salle séminaire, etc.)

#### 📝 Vague 1 — Title/meta (commit 5bc14fc)
- [x] 5 articles blog réécrits (combien-coute, checklist, budget, repas, escape-game)
- [x] 3 pages géo réécrites (Chantilly, Oise, Yvelines) avec mots-clés matchés
- [x] 8 URLs soumises indexation manuelle GSC

#### 📝 Vague 2 — Contenu + maillage + CWV (commit 4346660)
- [x] Page Chantilly : +6 FAQ + 3 H2 + ~800 mots ciblés "hôtel séminaire"
- [x] Maillage inter-pages géo : nouvelle section "Autres régions" (42 nouveaux liens internes)
- [x] CWV : fetchPriority=high + decoding=async + quality optimisée
- [x] dns-prefetch Google Ads / doubleclick

#### 📄 Plan backlinks actionnable
- [x] `_claude_docs/2026-04-17_plan-backlinks-seo.md` créé
- [x] 5 priorités + templates emails + calendrier 6 mois

### ⏳ À faire prochaine session

#### 📊 24 avril — Mesure impact SEO (7 jours après déploiement)
- [ ] Vérifier CTR des 5 articles blog (doit passer de 0% à 2-5%)
- [ ] Vérifier positions pages géo (Chantilly 44→30, Yvelines 48→35, Oise 35→25)
- [ ] GSC : `/blog/seminaire-residentiel-vs-journee` toujours "Crawled not indexed" ?

#### 🔗 Backlinks (exécution plan — voir _claude_docs/2026-04-17_plan-backlinks-seo.md)
- [ ] **Semaine 21-25 avril** : 4 emails offices tourisme + commander Boosterlink 154€
- [ ] Créer comptes Medium + LinkedIn (si pas fait)
- [ ] Pitcher 3 médias B2B (Bedouk, Republik Event, L'Écho Touristique)

#### 🎯 22 avril — Mini-audit Google Ads pour décision tCPA
- [ ] Vérifier CPA stabilisé post-changements (7 jours d'algo)
- [ ] Si CPA < 600 ₪ → baisser tCPA à 750 ₪ (objectif leads ultra-qualifiés)
- [ ] Si CPA 600-700 ₪ → baisser tCPA à 800 ₪
- [ ] Si CPA 700-800 ₪ → baisser tCPA à 850 ₪
- [ ] Si CPA > 800 ₪ → NE PAS baisser (garder 963 ₪)

#### 📊 30 avril — Re-audit GSC complet
- [ ] Comparer données avant/après optimisations
- [ ] Identifier nouvelles opportunités

---

## Historique session 15 avril 2026 (après-midi) — Automatisation complète Google Ads

### ✅ Fait cette session

#### 🛡️ Optimisation campagne SÉMINAIRE CHÂTEAU IDF
- [x] Calendrier resserré : Lun-Jeu 10-13h + 15-18h, Vendredi -80%, Sam/Dim SUPPRIMÉS
- [x] Budget passé de 350 ₪ → **450 ₪/jour** (accord DAF obtenu)
- [x] tCPA conservé à 963 ₪ (décision 22 avril)
- [x] 19 mots-clés négatifs ajoutés (listeUpdate11Fev26 : 193 → **212 négatifs**)
- [x] 2 audiences ajoutées en OBSERVATION : Event Planning Services (80512) + Corporate Event Planning (80521)
- [x] 2 audiences BLOQUANTES retirées (elles étaient en exclusion + on voulait les observer)
- [x] 16 audiences restent exclues (mariage, sport, gym, immobilier, etc.)

#### 🤖 Automatisation complète (2 scripts Google Ads)
- [x] Script #1 "Auto Cap + Soft Restart" installé → CAP 8500 ₪ + paliers 200/290/370/450
- [x] Script #2 "Auto Pause Jours Fériés + Ponts FR 2026-2027" installé
- [x] 6 anciennes règles jours fériés supprimées (évite conflits)
- [x] Scripts planifiés : #1 à 00h-01h, #2 à 01h-02h
- [x] Emails automatiques → seminaires@selectchateaux.com

#### 📄 Livrables créés
- [x] Rapport HTML DAF en hébreu : `public/rapport-ads-daf.html` (déployé Vercel)
- [x] Fichiers scripts dans `_claude_docs/` :
  - `2026-04-15_google-ads-script-auto.js`
  - `2026-04-15_google-ads-script-jours-feries.js`

### 📊 Résultats au 15 avril fin de journée
- **Dépensé avril** : 4 668 ₪ (~1 262 €)
- **Conversions** : 8 (vs 2 en mars 💪)
- **CPA** : 583 ₪ (-39% vs cible 963 ₪)
- **CTR** : 15,9% (excellent, ind. 3-5%)
- **Optimization score** : 100% 🔥 (était 63%)
- **Projection fin avril** : ~8 168 ₪ (sous cap 8 500 ₪)

### ⏳ À faire prochaine session

#### 🎯 22 avril 2026 — Mini-audit pour décision tCPA
- [ ] Vérifier CPA stabilisé post-changements (7 jours d'algo)
- [ ] Si CPA < 600 ₪ → baisser tCPA à 750 ₪ (objectif leads ultra-qualifiés)
- [ ] Si CPA 600-700 ₪ → baisser tCPA à 800 ₪
- [ ] Si CPA 700-800 ₪ → baisser tCPA à 850 ₪
- [ ] Si CPA > 800 ₪ → NE PAS baisser (garder 963 ₪)

#### ✅ FAIT 17 avril — Audit GSC + optimisations SEO (commit 5bc14fc)
- [x] Audit GSC complet 90 jours (76 clics, 4177 imp, pos moy 26.5)
- [x] Title/meta optimisés x5 articles blog (pos 5-12 CTR 0% → attendu 2-5%)
- [x] Title/meta optimisés x3 pages géo (Chantilly, Oise, Yvelines)
- [x] Indexation GSC manuelle des 8 URLs demandée

#### 📊 À mesurer 24 avril (7 jours après)
- [ ] Vérifier CTR des 5 articles blog sur GSC (doit passer de 0% à 2-5%)
- [ ] Vérifier positions pages géo (Chantilly pos 44 → viser 30, Yvelines pos 48 → 35, Oise pos 35 → 25)
- [ ] Re-audit complet 30 avril

#### 🔴 Article en "Crawled not indexed" (GSC)
- [ ] Surveiller `/blog/seminaire-residentiel-vs-journee` (pos 28 mais pas indexé)

#### 🟢 SEO — Priorités reportées
- [ ] Backlinks : Conseils-Tourisme.com
- [ ] 3 articles Medium + 1 LinkedIn
- [ ] Pitcher Ô Mon Château, Voyages en Patrimoine, Républik Event, Écho Touristique
- [ ] Commander Top 5 Boosterlink (154€)
- [ ] Offices de tourisme Oise, Yvelines, Chantilly

#### Reporté
- [ ] Nettoyage fichiers _claude_docs
- [ ] LinkedIn : logo, couverture, services
- [ ] CRM : Pusher Vercel, auto-sélection prestataires IA

## Notes importantes

### Configuration active
- **Budget** : 450 ₪/jour (depuis 15/04 accord DAF)
- **CAP mensuel** : 8 500 ₪ (~2 300 €)
- **tCPA** : 963 ₪ (inchangé, re-évaluation 22/04)
- **Calendrier** : Lun-Jeu 10-13h + 15-18h, Ven partiel, Sam/Dim OFF

### Automatisation
- Scripts tournent seuls chaque nuit
- Emails automatiques sur toutes actions
- Soft restart automatique si pause cap atteint
- Jours fériés FR 2026-2027 couverts

### Sources de données
- **mcp__gads** (GAQL) = données réelles Ads
- **MCP google-ads** = GA4 data (pas pour conversions)
- Compte : 9285151029, Campagne : 23644127670

### Problème cash-flow à suivre
- Paiement clients J+30 post-événement (~4 mois après dépense)
- Pas de solution bancaire possible pour l'instant
- Stratégie "leads ultra-qualifiés" pour maximiser ROI par lead

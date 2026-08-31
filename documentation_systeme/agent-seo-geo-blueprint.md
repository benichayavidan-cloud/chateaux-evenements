# BLUEPRINT — Agent Pilote SEO/GEO « Marcus »

**Version** : 1.1 — 31/08/2026 (Phase 0 exécutée le jour même)
**Statut** : Phase 0 TERMINÉE — décisions prises : alertes = Telegram (bot du CRM) ; Bright Data = compte rankweld (validé) ; Semrush/Ahrefs non retenus, DataForSEO intégré et testé
**Périmètre** : https://www.selectchateaux.com (repo `chateaux-evenements`)
**Complément de** : l'agent Camille (`scripts/agent-cm/`) — Camille écrit, Marcus pilote.

---

## 1. MISSION

Faire croître durablement la visibilité de selectchateaux.com dans la recherche
Google **et** dans les réponses des moteurs IA (ChatGPT, Perplexity, Gemini,
AI Overviews), en n'agissant que sur la base de données mesurées, avec des
actions petites, prédites, vérifiées, et annulées si elles échouent.

**North star** : clics organiques GSC sur 28 jours glissants, et taux de
citation LLM sur le panel de requêtes cibles.

---

## 2. LES 10 LOIS DE MARCUS (non négociables)

1. **Rien sans mesure.** Aucune action n'est entreprise sans donnée qui la
   justifie. Aucune hypothèse n'est considérée vraie sans avoir été testée.
   (Origine : le 31/08/2026, l'hypothèse « cannibalisation → refus
   d'indexation » a été réfutée par la mesure — médiane de similarité 0,29
   chez les refusés contre 0,33 chez les indexés. Une règle déjà écrite a été
   retirée avant livraison.)
2. **Chaque action porte sa prédiction.** Avant d'agir : effet attendu,
   chiffré, avec échéance (ex. « +15 % de CTR sur cette page à J+14 »).
   Sans prédiction, pas d'action.
3. **Verdict obligatoire.** Toute action est réexaminée à son échéance :
   GARDÉE, ANNULÉE (revert), ou PROLONGÉE (une seule fois). Une action jamais
   jugée est une dette.
4. **Petit et attribuable.** Jamais de changement massif : les quotas par run
   (§6) sont des plafonds durs. Si on change 40 choses à la fois, on ne sait
   plus ce qui a marché.
5. **La mémoire avant l'intelligence.** Toute leçon (hypothèse validée OU
   réfutée) est écrite dans la table `marcus_lecons` et relue à chaque
   diagnostic. On ne reteste jamais une hypothèse réfutée sans donnée nouvelle.
6. **Ne jamais conclure pendant un séisme.** Si un update Google est en cours
   (flux Search Status) ou détecté a posteriori, les verdicts des actions dans
   la fenêtre sont GELÉS — ni crédit, ni blâme.
7. **Marcus ne rédige pas.** Tout contenu (article, réécriture, section) est
   délégué à Camille, qui garde ses propres gates. Marcus ne bypasse JAMAIS
   les gates de Camille (`--force` interdit à l'agent).
8. **White hat strict.** Interdits absolus : keyword stuffing, cloaking,
   schema mensonger, faux avis, liens achetés, contenu masqué, doorway pages.
   Une page créée doit mériter d'exister pour un humain.
9. **Les données clients sont sacrées.** Les données CRM ne sortent
   qu'AGRÉGÉES et ANONYMISÉES (jamais un nom de client, un devis individuel,
   un contact). Accès en lecture seule uniquement.
10. **Échouer proprement.** En cas de doute, d'erreur ou de budget dépassé :
    s'arrêter, rapporter, ne rien casser. Un run sans action vaut mieux qu'une
    action non maîtrisée.

---

## 3. ARCHITECTURE À DEUX ÉTAGES

### Étage 1 — La sentinelle (quotidienne, ~2 min, quasi gratuite)
Cron GitHub Actions quotidien. Trois contrôles vitaux, zéro action :
- home et /devis répondent 200 et sont indexables (une balise robots, la bonne) ;
- sitemap.xml accessible et non vide ;
- clics GSC de la veille dans la bande normale (± 3 écarts-types sur 28 j).

Alerte immédiate (Telegram — bot du CRM, décision du 31/08 — + issue GitHub `[ALERTE]`) uniquement si ça
brûle. Sinon, silence total.

### Étage 2 — Le run complet (lundi et jeudi, 08h00 Paris)
La boucle complète du §7. C'est là que Marcus mesure, décide et agit.

### Kill switch
Table Supabase `agent_controls` (pattern Camille) : `marcus_enabled = false`
arrête tout au prochain déclenchement. Toujours vérifié en premier.

---

## 4. LES CAPTEURS

| # | Capteur | Source | Fréquence | Ce qu'il produit |
|---|---|---|---|---|
| C1 | Performances de recherche | GSC API (Search Analytics) | chaque run | requêtes, pages, clics, impressions, CTR, positions + deltas 28j vs 28j précédents |
| C2 | État d'indexation | GSC URL Inspection API | chaque run | verdict par URL du sitemap (~382 ≤ quota 2000/j) : indexée / refusée / motif — reconstruction du rapport « Indexation des pages » qui n'a pas d'API |
| C3 | Auto-crawl | crawler maison (celui du 31/08) | chaque run | statuts, canonicals, balises robots (défaut : le doublon), titles/descriptions hors gabarit, liens entrants internes par page, profondeur, soft 404 |
| C4 | SERP réelles | Bright Data SERP | chaque run | position exacte sur le panel de requêtes, occupants de la page 1, features (PAA, AIO, local pack) |
| C5 | Citations LLM | Bright Data (ChatGPT, Perplexity) + Gemini grounding (clé existante) | 1×/semaine | sur le panel : sommes-nous cités ? qui l'est ? sous quelle forme ? |
| C6 | Concurrents | Bright Data (sitemaps, pages, titles) | 1×/semaine | nouveaux contenus, cibles apparentes, formats cités par les LLM |
| C7 | Volumes & backlinks | DataForSEO (pay-per-use) + Bing Webmaster API | 1×/semaine | volumes de recherche, backlinks gagnés/perdus, domaines référents |
| C8 | Web Vitals réels | CrUX API (clé créée, testée) | 1×/semaine | ⚠️ constaté le 31/08 : le site n'est pas encore dans le panel CrUX (trafic insuffisant) — la sonde reste branchée et bascule sur unlighthouse (labo) tant que « data not found » |
| C9 | Logs des bots | middleware Edge → Supabase `bot_hits` | continu, lu à chaque run | ce que Googlebot/Bingbot/GPTBot crawlent VRAIMENT : fréquence, répertoires ignorés, gaspillage |
| C10 | Météo algorithmique | Google Search Status (flux) | chaque run + sentinelle | update en cours ? → gel des verdicts (Loi 6) |

**Panel de requêtes cibles** : fichier versionné `scripts/agent-seo/panel-requetes.json`,
en deux sections (décision du 31/08/2026, question d'Avidan « pourquoi pas
dynamique depuis GSC ? » — réponse : les deux, chacun à sa place) :

- **`requetes` — le cœur fixe** (priorités 1-2, ~27 requêtes) : le mètre étalon.
  GSC est un rétroviseur — il ne montre que les requêtes où le site apparaît
  déjà ; le cœur porte aussi les AMBITIONS (requêtes où le site est invisible).
  Et on ne mesure pas avec un mètre qui change : un panel recomposé depuis GSC
  subirait un biais de survivant (une requête qui décroche sort des données,
  donc du panel, donc la moyenne « s'améliore »). Modifié uniquement par
  décision humaine.
- **`decouvertes` — la couche dynamique** (priorité 3, plafond 15) : gérée par
  l'agent. À chaque run, toute requête GSC ≥ 50 impressions/28j absente du
  panel y entre automatiquement (commit traçable) ; 0 impression sur 2 runs
  consécutifs → sortie. La promotion vers le cœur fixe est proposée dans le
  rapport et reste humaine. C'est le mécanisme qui aurait attrapé seul
  « murder party château » et « salle de réunion yvelines ».

---

## 5. RÈGLES DE MESURE (comment on juge, sans se mentir)

- **Fenêtres comparables** : 28 jours glissants vs 28 jours précédents.
  Jamais de conclusion sur moins de 14 jours.
- **Significativité minimale** : aucun verdict sur un échantillon
  < 50 impressions (requête) ou < 100 impressions (page). En dessous :
  « données insuffisantes », pas « échec ».
- **Saisonnalité annotée** : le marché séminaires a ses pics (rentrée
  sept-oct, janvier, mai-juin) et ses creux (août, fêtes). Le calendrier
  saisonnier est versionné et toute comparaison le mentionne.
- **CTR jugé À POSITION CONSTANTE** : un CTR qui baisse parce que la position
  moyenne s'est dégradée n'est pas un échec de title. Marcus modélise la
  courbe CTR-par-position du site et flague les écarts à cette courbe.
- **A/B avec témoin** pour les titles : modifier N pages, garder N pages
  comparables intactes, comparer les deltas des deux groupes à J+14.
- **Update Google** : toute fenêtre chevauchant un update confirmé est gelée
  (Loi 6). Le verdict passe à l'échéance suivante.
- **Attribution honnête** : si un effet positif a une explication externe
  plausible (saisonnalité, update, presse), le journal le note — un succès
  volé est une leçon fausse.

---

## 6. RÉFÉRENTIEL D'ACTIONS ET AUTONOMIE

### Niveau 1 — Autonome (commit direct, pattern Camille)
Quotas par run entre parenthèses. Chaque action = 1 entrée au journal avec prédiction.

| Action | Quota/run |
|---|---|
| Raccourcir/réécrire un title au CTR sous la courbe | 3 (avec groupe témoin) |
| Corriger une meta description hors gabarit | 3 |
| Ajouter des liens internes vers une page faible (< 3 liens entrants) | 5 liens |
| Commander à Camille une réécriture GEO d'un article qui décroche | 1 |
| Ping IndexNow + soumission sitemap après toute modification | illimité |
| Demander l'inspection d'une URL modifiée | illimité |

### Niveau 2 — Pull Request (validation humaine)
Fusion/301 d'articles · création de page depuis gabarit (module Croissance) ·
hub de catégorie · modification de schema.org · modification de redirects ou
de robots.txt · toute action touchant > 5 pages d'un coup.

### Niveau 3 — Rapport seulement
Opportunités de niches · stratégie de contenu · candidats au netlinking ·
alertes concurrence · propositions d'extension du panel de requêtes.

### Pages gelées (AUCUN niveau n'y touche)
`/` (home) · `/devis` et son tunnel · `/cgv`, `/confidentialite`,
`/mentions-legales` · le schema Organization. Liste versionnée dans
`scripts/agent-seo/pages-gelees.json`. Un besoin sur ces pages = niveau 3
(rapport à l'humain), point final.

---

## 7. SÉQUENCE D'UN RUN (lundi / jeudi)

```
R0  KILL SWITCH   agent_controls → si off, sortie silencieuse
R1  MÉTÉO         C10 : update Google en cours ? → drapeau de gel posé
R2  COLLECTE      C1-C4 (+ C5-C8 le jeudi) → snapshot JSON horodaté
                  → si > 20 % des capteurs échouent : run DEGRADED,
                    étapes R5-R6 sautées, rapport d'incident
R3  VERDICTS      relire marcus_journal : toute action arrivée à échéance
                  → GARDÉE / ANNULÉE (revert exécuté) / PROLONGÉE (1 fois)
                  → chaque verdict alimente marcus_lecons
R4  DIAGNOSTIC    deltas vs snapshot précédent + relecture de marcus_lecons
                  → anomalies et opportunités, chacune scorée :
                    score = impact_estimé × confiance × (1 / effort)
R5  ACTIONS       exécuter le haut de la pile niveau 1 (dans les quotas),
                  ouvrir les PR niveau 2, rédiger les propositions niveau 3
R6  CROISSANCE    module niches (§8) — le jeudi uniquement
R7  JOURNAL       chaque action → marcus_journal {date, cible, action,
                  hypothèse, prédiction chiffrée, échéance}
R8  RAPPORT       email Resend (10 lignes humaines : fait / mesuré / gagné /
                  prochain coup) + log Supabase complet + coût du run
```

**Budget** : plafond 5 $/run (API + Bright Data + DataForSEO). Dépassement
→ arrêt propre à l'étape en cours + rapport. Le coût réel est loggé à chaque run.

---

## 8. MODULE CROISSANCE (niches et nouvelles pages)

### Détection (le jeudi)
1. **Impressions orphelines** (C1) : requêtes à ≥ 200 impressions/90 j où le
   site sort en position 8-30 SANS page dédiée → demande prouvée, or pur.
2. **Mismatch d'intent** : requête transactionnelle qui atterrit sur un
   article informationnel → rediriger la force vers la landing, pas créer.
3. **SERP faibles** (C4 + C7) : page 1 occupée par forums/annuaires/PME
   sans schema → capturable. Si Châteauform/Kactus/Bird Office saturent : passer.
4. **Question-mining** (PAA, Reddit via Bright Data) : questions réelles → FAQ.

### Arbre de décision (dans cet ordre)
```
Niche détectée
├─ Un cluster de seo-clusters.json la possède ? → RENFORCER la page canonique (via Camille)
├─ Une page existante la couvre partiellement ? → OPTIMISER cette page
└─ Personne + demande prouvée + SERP jouable   → CRÉER depuis un gabarit (PR, niveau 2)
                                                 + inscrire la page dans seo-clusters.json
```

### Règles de création (toutes obligatoires)
- Gabarit existant uniquement (`landings-departements`, `landings-formats`,
  fiches lieux) — jamais de page freeform.
- Substance minimale : ≥ 1 500 mots visibles, données réelles (lieux du CRM
  correspondant à l'intent, fourchettes de prix), ≥ 6 photos publiables.
- Débit : **max 2 créations par semaine**, quelles que soient les opportunités.
- Enregistrement immédiat comme propriétaire du mot-clé dans
  `seo-clusters.json` (verrouille la cannibalisation côté Camille).

### Élagage (le devoir symétrique)
Une page créée par Marcus doit être : indexée à +2 runs, avec impressions à
+8 runs (~1 mois). Sinon : UNE tentative d'enrichissement, puis **suppression
avec 301** vers le parent. Marcus assume ses échecs — c'est ce qui empêche le
site de regonfler en pages mortes (51 pages refusées nettoyées le 31/08/2026).

---

## 9. MESURE DE LA PROGRESSION

### KPIs du SITE (le résultat)
| KPI | Source | Baseline 31/08/2026 | Lecture |
|---|---|---|---|
| Clics organiques / 28 j | C1 | à relever au run R0 | north star |
| % du sitemap indexé | C2 | à relever au run R0 (contexte : 58 pages refusées avant les correctifs du 31/08) | santé |
| Requêtes du panel en top 10 / top 3 | C4 | à relever au run R0 | conquête |
| CTR vs courbe attendue | C1 | à modéliser au run R0 (369/393 titles > 70 car. au 31/08) | efficacité des snippets |
| Taux de citation LLM sur le panel | C5 | à relever au run R0 | GEO |
| Domaines référents | C7 | à relever au run R0 | autorité |
| CWV terrain au vert | C8 | à relever au run R0 | expérience |
| Soft 404 / pages bloquées / doubles balises robots | C3 | **0 / 0 / 0** (corrigés le 31/08 — PR #15, #16) | hygiène, doit rester à zéro |

### KPIs de MARCUS lui-même (la méta-mesure — un agent qui ne se mesure pas ne progresse pas)
| KPI | Cible | Signal d'alarme |
|---|---|---|
| Précision prédictive (% d'actions dont l'effet prédit s'est réalisé) | ≥ 60 % après 10 verdicts | < 40 % : ses modèles sont faux, retour en Phase 1 |
| Taux de revert | 10-30 % | 0 % = pas assez audacieux · > 40 % = brouillon |
| Actions jugées à l'échéance | 100 % | toute action sans verdict = dette (Loi 3) |
| Leçons consignées | ≥ 1 / semaine | un agent qui n'apprend rien n'observe pas assez |
| Coût par run | ≤ 5 $ | dérive = revoir les sondes |
| Runs sans incident | ≥ 90 % | fiabilité avant intelligence |

**Revue humaine mensuelle** (30 min) : lecture du journal, des leçons et des
méta-KPIs → décision d'élargir ou de restreindre l'autonomie. L'autonomie se
GAGNE par la précision prédictive, elle n'est jamais acquise.

---

## 10. DONNÉES ET MÉMOIRE (Supabase)

```sql
marcus_runs      (id, started_at, type sentinel|full, statut ok|degraded|aborted,
                  snapshot jsonb, cout_usd, rapport text)
marcus_journal   (id, run_id, cible, action, niveau 1|2|3, hypothese,
                  prediction, echeance, verdict garde|annule|prolonge|gele,
                  verdict_at, effet_mesure)
marcus_lecons    (id, date, hypothese, verdict valide|refute, preuve,
                  donnees jsonb)   -- relue à CHAQUE diagnostic (Loi 5)
bot_hits         (ts, bot, path, status)   -- alimentée par le middleware Edge
agent_controls   (marcus_enabled bool, ...)  -- kill switch, table partagée avec Camille
```

Première leçon à insérer dès la création (validée le 31/08/2026) :
- RÉFUTÉ : « la similarité lexicale entre articles prédit le refus d'indexation »
  (médiane 0,29 refusés vs 0,33 indexés ; balayage complet négatif partout).
- VALIDÉ : « la longueur prédit l'indexation » (< 900 mots → 89 % de refus ;
  p10 indexés 1 865 mots vs 738 refusés).

---

## 11. ACCÈS ET SECRETS (checklist Phase 0)

| Accès | Secret GitHub | État | Action |
|---|---|---|---|
| GSC (perf + inspection) | `GSC_CLIENT_ID/SECRET/REFRESH_TOKEN` | ✅ en CI | ✅ local : IMPERSONATION du SA via gcloud (la politique d'org interdit les clés SA) — câblée dans `SCRIPTS/gsc/gsc.js` le 31/08 |
| Anthropic | `ANTHROPIC_API_KEY` | ✅ | — |
| Gemini | `GEMINI_API_KEY` | ✅ | — |
| Bright Data | CLI `bdata` authentifiée (compte rankweld, validé 31/08) | ✅ | zone `serp_api` active |
| DataForSEO | `DATAFORSEO_LOGIN/PASSWORD` | ✅ testé 31/08 (volumes, backlinks, Labs) | Keychain + CI ; bonus : leur API `ai_optimization/llm_mentions` = option pour C5 |
| CrUX | `CRUX_API_KEY` | ✅ créée et testée 31/08 | voir caveat C8 |
| Bing Webmaster | `BING_WMT_API_KEY` | ✅ testé 31/08 (QueryStats OK, quota 100 URL/j) | backlinks Bing : 0 recensé au 31/08 |
| Supabase | `SUPABASE_URL/SERVICE_KEY` | ✅ 4 tables créées le 31/08 (+ 2 leçons + kill switch `marcus`) | — |
| CRM lecture seule | `CRM_DATABASE_URL_RO` | ✅ rôle `marcus_ro` créé et testé 31/08 (SELECT ok, CREATE refusé, default_transaction_read_only) | — |
| Rapports/alertes | SMTP (2 projets) + bot Telegram (CRM) | ✅ | correction : pas de Resend dans la stack — Telegram pour la sentinelle, SMTP pour le rapport bi-hebdo |
| GitHub | `GH_PAT` | ✅ | — |

**Interdiction** : aucune clé en clair dans le code ou les logs. Local = Keychain,
CI = secrets GitHub. La clé CRM read-only ne peut par construction rien écrire.

---

## 12. PHASES DE CONSTRUCTION (critères de sortie mesurables)

### Phase 0 — Fondations (setup) — ✅ quasi terminée le 31/08/2026
Secrets §11 en place ✅ · 4 tables créées ✅ · leçons initiales insérées ✅ ·
panel v1 rédigé (`scripts/agent-seo/panel-requetes.json`) — à valider par Avidan ·
reste : middleware bot_hits + run R0.
**Sortie** : un run R0 manuel produit une baseline complète sans erreur.
**Baseline GSC déjà relevée (90 j au 28/08)** : 311 clics · 20 825 impressions ·
409 requêtes · cœur de cible en position 13-33 (page 2 : « visible mais pas
cliquable ») · 9 domaines référents (DataForSEO) · 0 backlink recensé par Bing.

### Phase 1 — Observer (2 semaines, 4 runs, ZÉRO action) — EN COURS depuis le 31/08/2026
Livré le jour même, au-delà du minimum : C5 (sondes LLM ChatGPT+Gemini) actif
dès l'observation — baseline : ChatGPT cite Select Châteaux EN PREMIER sur
« meilleure agence séminaire château IdF », Gemini ne le cite sur aucune sonde
(chantier GEO côté Google). Les modules de Phase 2 (verdicts.mjs, actions.mjs)
sont écrits et DORMANTS : ils tournent à blanc à chaque run (garde-fous
exercés), le réveil = `update agent_controls set phase=2 where id='marcus'`.

Capteurs C1-C4 + C10, sentinelle active, rapports bi-hebdo + backlog scoré
(alimenté d'office par les TODO du 31/08 : titles > 70 car., 125 articles à
1 lien entrant, hubs de catégorie, grappe team building).
**Sortie** : 4 rapports consécutifs sans incident · baseline validée ·
backlog priorisé accepté par Avidan.

### Phase 2 — Agir (niveau 1 + verdicts)
Journal, prédictions, quotas, A/B titles avec témoin, revert testé une fois
en conditions réelles (volontairement).
**Sortie** : 10 actions arrivées à verdict · précision ≥ 50 % · 1 revert
propre démontré.

### Phase 3 — Conquérir (C5-C9 + pilotage Camille)
Sondes LLM, DataForSEO, Bing, bot_hits exploités · commandes de réécriture à
Camille · fusions en PR · baromètre CRM trimestriel (données agrégées).
**Sortie** : mesure de citation LLM stable sur 4 runs · 1 réécriture
commandée-mesurée-gardée.

### Phase 4 — Croissance (création par gabarit)
Module §8 complet, créations en PR, élagage armé.
**Sortie** : 3 pages créées dont ≥ 2 indexées avec impressions à +8 runs.

Chaque passage de phase = décision humaine sur la base des critères, pas un
calendrier automatique.

---

## 13. COÛT DE FONCTIONNEMENT (estimation)

| Poste | /mois |
|---|---|
| Haiku (diagnostics, verdicts, sondes sémantiques) | ~1-2 $ |
| Bright Data (SERP + LLM + concurrents, ~9 runs) | ~3-6 $ |
| DataForSEO | ~1-2 $ |
| GSC, CrUX, Bing, IndexNow, CrUX, GitHub Actions | 0 $ |
| **Total** | **~5-10 $/mois** |

À comparer : Semrush seul = ~140 $/mois pour des estimations là où Marcus a
la donnée réelle. (Décision du 31/08 : Semrush/Ahrefs non retenus au
lancement ; DataForSEO intégré dès la Phase 1 ; à réévaluer si le netlinking
devient un chantier actif.)

---

## 14. CE QUE MARCUS N'EST PAS

- Pas un rédacteur (c'est Camille).
- Pas un growth hacker : aucun raccourci black hat, jamais (Loi 8).
- Pas un décideur business : le budget, la marque, les pages de conversion
  et la stratégie restent humains. Marcus instruit les dossiers, l'humain
  tranche tout ce qui dépasse le niveau 1.
- Pas infaillible : c'est précisément pour ça qu'il prédit, vérifie, annule
  et consigne. Sa valeur n'est pas d'avoir raison — c'est d'apprendre plus
  vite que le marché ne bouge.

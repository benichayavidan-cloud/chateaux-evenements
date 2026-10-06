# Visibilité moteurs de recherche de selectchateaux.com (janv. → 05/10/2026)

Audit en lecture seule, réalisé le 06/10/2026. Données brutes : `gsc.json` (même dossier).

## Sources et méthode

| Source | Ce qu'elle donne | Fiabilité |
|---|---|---|
| Dump API GSC du 30/08 (branche `feat/gsc-export-complet`, `_claude_docs/gsc/2026-08-30_gsc-dump-brut.json`) | Série **quotidienne** 08/02 → 27/08, requêtes/pages/appareils sur 5 fenêtres | Exacte (API) |
| Snapshots Marcus (`marcus_runs.snapshot.gsc28`, Supabase) | 11 fenêtres glissantes de 28 j, totaux site sans dimension, 01/08 → 02/10 | Exacte par fenêtre |
| Workflow `gsc-audit.yml` lancé le 06/10 (7 j / 30 j / 90 j / 16 mois) | Requêtes avec ≥2–3 impressions, page propriétaire, nombre total de requêtes et pages | Pas de dimension date, pas de totaux |
| Export interface GSC « AI features » du 06/09 | Impressions quotidiennes des fonctionnalités IA, 05/06 → 05/09 | Exacte |
| API Bing Webmaster (06/10) | Trafic quotidien 13/06 → 04/10, requêtes et pages par semaine | Exacte |

**Accès GSC direct impossible** : l'impersonation gcloud échoue (`Reauthentication failed` — les jetons de `seminaires@selectchateaux.com` ont expiré le 24/09 et il faut relancer `gcloud auth login` en interactif). Les sources ci-dessus remplacent l'accès direct.

**Reconstitution après le 27/08** : chaque fenêtre Marcus de 28 jours, moins la précédente, plus les jours sortis de la fenêtre (connus grâce au dump), donne la somme exacte du bloc de 3–4 jours ajouté. Contrôle : la somme des blocs du 01/09 au 28/09 donne exactement la fenêtre Marcus du 01/09 au 28/09 (133 clics, 10 516 impressions). À l'intérieur d'un bloc, les jours sont répartis à parts égales : le détail par semaine après le 27/08 est donc **estimé**.

## 1. Série mensuelle (Google)

GSC n'a **aucune donnée avant le 08/02/2026** (1re impression le 09/02, 1er clic le 10/02). En janvier, le site était sur le domaine Vercel puis en noindex (sauf la home).

| Mois | Clics | Impressions | CTR | Position moy. | Pages ≥1 imp. | Requêtes distinctes | Remarque |
|---|---|---|---|---|---|---|---|
| janv. | 0 | 0 | — | — | — | — | pas de propriété GSC |
| févr. (09→29) | 11 | 832 | 1,3 % | 27,4 | | | 3 semaines |
| mars | 42 | 2 275 | 1,8 % | 27,1 | 65 (mars-mai) | 173 (mars-mai) | |
| avril | 61 | 2 479 | 2,5 % | 19,2 | | | |
| mai | 48 | 3 646 | 1,3 % | 14,5 | | | Camille démarre 19/05 |
| juin | **127** | 6 369 | 2,0 % | **11,8** | ≈ 233 (29/05→27/08) | ≈ 399 (29/05→27/08) | meilleure position |
| juillet | 97 | 6 574 | 1,5 % | 16,2 | 106 (02→29/07) | 217 | +106 articles |
| août | 93 | 8 755 | 1,1 % | 20,2 | 195 (30/07→27/08) | 276 | 4 derniers jours reconstruits |
| sept. | **≈143** | ≈11 077 | 1,3 % | 19,0 | 248 (06/09→06/10) | 463 (06/09→06/10) | 01→28 exacts (133 / 10 516), 29-30 estimés |
| oct. (01→02) | ≈10 | ≈561 | 1,8 % | 16,2 | | | **partiel, estimé** |

Les nombres de pages et de requêtes ne sont disponibles que par fenêtre (pas mois par mois). Le total « pages » de septembre compte aussi les URL avec ancre (`#format-2…`) apparues après la PR #23. Le total « requêtes » ne compte que celles que Google affiche (voir limites).

### Série hebdomadaire (Google)

| Semaine (lundi) | Clics | Impressions | Position |
|---|---|---|---|
| 09/02 | 8 | 273 | 29,6 |
| 16/02 | 2 | 205 | 30,2 |
| 23/02 | 1 | 394 | 24,4 |
| 02/03 | 8 | 424 | 31,3 |
| 09/03 | 8 | 492 | 31,9 |
| 16/03 | 7 | 492 | 30,0 |
| 23/03 | 17 | 643 | 20,8 |
| 30/03 | 8 | 631 | 18,1 |
| 06/04 | 7 | 433 | 23,1 |
| 13/04 | 13 | 551 | 21,0 |
| 20/04 | 20 | 624 | 18,1 |
| 27/04 | 15 | 654 | 17,6 |
| 04/05 | 14 | 767 | 17,2 |
| 11/05 | 13 | 855 | 14,2 |
| 18/05 | 13 | 864 | 12,6 |
| 25/05 | 8 | 930 | 13,1 |
| 01/06 | 27 | 1 484 | 12,4 |
| 08/06 | 38 | 1 536 | 11,7 |
| 15/06 | 31 | 1 542 | 10,8 |
| 22/06 | 29 | 1 377 | 12,0 |
| 29/06 | 20 | 1 502 | 12,7 |
| 06/07 | 19 | 1 551 | 14,1 |
| 13/07 | 24 | 1 276 | 16,3 |
| 20/07 | 21 | 1 388 | 17,1 |
| 27/07 | 22 | 1 723 | 20,0 |
| 03/08 | 15 | 1 665 | 19,1 |
| 10/08 | 18 | 1 824 | 19,9 |
| 17/08 | 21 | 2 003 | 20,3 |
| 24/08 | ≈30 | ≈2 457 | 20,6 |
| 31/08 | ≈26 | ≈3 675 | 20,9 |
| 07/09 | ≈23 | ≈2 701 | 19,9 |
| 14/09 | ≈39 | ≈2 183 | 18,5 |
| 21/09 | ≈42 | ≈2 045 | 16,6 |
| 28/09 (5 j) | ≈25 | ≈1 402 | 16,7 |

≈ = reconstruit depuis les blocs Marcus (répartition uniforme dans chaque bloc de 3–4 jours).

## 2. Clics par type de page

| Période | Home | Blog | Landings (/seminaire-…, /team-building…) | /chateaux | /lieux | Autres |
|---|---|---|---|---|---|---|
| 28/02→28/05 (mars-mai) | **71** (998 imp.) | 54 (3 913) | 14 (2 975) | 9 (1 010) | — | 2 (241) |
| ≈ juin (29/05→01/07) | 26 (648) | **96** (4 654) | 10 (1 766) | 5 (318) | — | 0 (84) |
| juillet (02→29/07) | 14 (465) | 59 (3 695) | 6 (1 696) | 4 (271) | — | 0 (51) |
| août (30/07→27/08) | 21 (548) | 65 (5 380) | 4 (2 236) | 1 (467) | — | 0 (48) |
| sept. (05/09→02/10, **partiel** : top 10 pages, 123 clics sur 140) | 28 | 83 | 10 | 2 | 0 dans le top 10 | — |

Le blog porte 60 à 70 % des clics depuis juin. Les landings commerciales reçoivent 1 700 à 2 200 impressions par mois mais seulement 4 à 10 clics. Les fiches `/lieux` (en ligne depuis le 30/08) ont environ 240 impressions sur 30 jours et 0 clic visible.

## 3. Marque et hors marque

Requêtes de marque = « select château(x) » et ses variantes (les recherches « select paris » ou « select event » ne sont pas la marque et sont exclues).

| Fenêtre | Clics marque | Impr. marque | Clics hors marque visibles | Clics sur requêtes masquées par Google |
|---|---|---|---|---|
| 28/02→28/05 | **23** | 71 | 6 | 121 |
| 29/05→27/08 | 0 | 0 | 19 | 291 |
| juillet | 0 | 0 | 9 | 74 |
| août | 0 | 0 | 6 | 85 |
| 06/09→06/10 | 0 | 0 | 10 | n.d. |

« select chateaux » apparaissait au printemps (71 impressions, 23 clics). Depuis fin mai, la requête est passée **sous le seuil d'anonymisation de Google** : elle n'est plus listée du tout. Côté Bing, elle reste la 1re requête (« select chateaux » + « select châteaux » = 11 clics, 81 impressions depuis juin).

## 4. Top 15 — 28 derniers jours vs juillet

La GSC ne permet pas de recouper exactement « la même fenêtre 3 mois plus tôt » (06/06→06/07) : la comparaison se fait avec la fenêtre du 02/07 au 29/07 (≈ 2 mois plus tôt), la plus ancienne qui soit détaillée.

### Requêtes (06/09→06/10, workflow)

| Requête | Clics | Impr. | Pos. | Juillet (clics / impr. / pos.) |
|---|---|---|---|---|
| murder party chateau | 9 | 54 | 3,3 | 5 / 33 / 6,6 |
| murder party château | 1 | 18 | 4,2 | — |
| team building chantilly | 0 | 244 | 16,5 | 2 / 288 / 13,2 |
| seminaire chantilly | 0 | 210 | **53,5** | 0 / 143 / 31,7 |
| séminaire yvelines | 0 | 177 | 28,5 | 0 / 213 / 15,7 |
| seminaire chateau | 0 | 144 | 45,5 | 0 / 6 / 62 |
| seminaire oise | 0 | 115 | 29,5 | 0 / 63 / 26,6 |
| team building ile de france | 0 | 113 | 41,4 | 0 / 40 / 62,8 |
| seminaire yvelines | 0 | 89 | 29,5 | 0 / 82 / 20,1 |
| séminaire oise | 0 | 83 | 27,6 | 0 / 70 / 29,0 |
| séminaire château | 0 | 80 | 37,8 | — |
| check-list complète pour organiser un événement professionnel dans le 92 | 0 | 80 | 2,1 | — |
| chateau séminaire ile de france | 0 | 78 | 35,6 | 0 / 22 / 17,8 |
| séminaire chantilly | 0 | 64 | 33,8 | 1 / 96 / 23,3 |
| chateau team building | 0 | 58 | 23,4 | 0 / 79 / 13,8 |

### Pages (05/09→02/10, Marcus)

| Page | Clics | Impr. | Juillet (clics / impr. / pos.) |
|---|---|---|---|
| /blog/murder-party-chateau-activite-immersive | **56** | 863 | 29 / 589 / 7,3 |
| / (home) | 28 | 682 | 14 / 465 / 16,7 |
| /blog/seminaire-chantilly-activites-team-building | 12 | 336 | 5 / 598 / 10,4 |
| /blog/alternative-chateauform-ile-de-france | 6 | 202 | 2 / 61 / 4,3 |
| /blog/checklist-organiser-seminaire | 6 | 856 | 5 / 450 / 10,1 |
| /team-building-chateau | 4 | 616 | 1 / 508 / 27,2 |
| /blog/dress-code-seminaire-chateau-guide-2026 | 3 | 11 | 0 / 18 / 8,2 |
| /seminaires-soirees-entreprise | 3 | 67 | 0 / 27 / 9,0 |
| /team-building-chantilly | 3 | 223 | — (nouvelle) |
| /chateaux/abbaye-millenaire-vallee-chevreuse | 2 | 71 | 0 / 123 / 22,8 |
| /blog/seminaire-yvelines-78-luxe-proximite | 0 | 733 (pos. 22,1) | 4 / 958 / 16,4 |
| /seminaire-chateau-oise-60 | 0 | 301 (31,0) | 1 / 327 / 25,2 |
| /seminaire-chateau-chantilly | 0 | 255 (32,3) | 0 / 259 / 24,6 |
| /lieux | 0 | 249 (44,1) | — |
| /seminaire-chateau-hauts-de-seine-92 | 0 | 247 (12,2) | 0 / 73 / 15,2 |

Top pages de juillet absentes aujourd'hui : /chateaux/manoir-anglo-normand-chantilly (4 clics), /seminaire-vallee-de-chevreuse (3), /blog/escape-game-geant-chateau (3). Nouveauté de septembre : 6 URL `murder-party…#format-…` (ancres de la PR #23) à la position 5, avec 100 à 200 impressions chacune.

## 5. Requêtes en langage naturel (style IA)

Définition retenue : 7 mots ou plus, ou début par quel/comment/propose/je suis/pourquoi/combien… Les requêtes de robots qui contiennent `site:` sont exclues.

| Fenêtre | Requêtes | Impressions | Position | Clics |
|---|---|---|---|---|
| 28/02→28/05 | 7 | 51 | 20,1 | 0 |
| juillet | 6 | 34 | 6,4 | 0 |
| août | 21 | 116 | 16,0 | 0 |
| 06/09→06/10* | 50 | **486** | **8,2** | **0** |
| 29/09→06/10* | 21 | 88 | 5,1 | 0 |

\* Le workflow ne garde que les requêtes à 2–3 impressions ou plus, donc ces chiffres sont des minimums.

Exemples : « check-list complète pour organiser un événement professionnel dans le 92 » (80 impr., pos. 2,1) ; « je suis assistante de direction. propose-moi des châteaux ou domaines prestigieux… » (29, pos. 3,6) ; une série de questions « chateauform » (comparatif des tarifs, alternative, meilleures maisons), en positions 3 à 9.

Export GSC « fonctionnalités IA » (impressions) : juin 36 → juillet 142 → août 282 (au 05/09). La note du 06/09 parle d'un « trompe-l'œil ».

## 6. Appareils et apparence

| Fenêtre | Ordinateur (clics / impr. / CTR) | Mobile | Tablette |
|---|---|---|---|
| mars-mai | 119 / 6 753 / 1,8 % | 31 / 1 267 / 2,5 % | 0 / 34 |
| juillet | 45 / 4 327 / 1,0 % | 37 / 1 487 / 2,5 % | 1 / 21 |
| août | 40 / 5 815 / **0,7 %** | **47** / 1 969 / 2,4 % | 4 / 47 |

En août, pour la première fois, le mobile apporte plus de clics que l'ordinateur, avec un tiers des impressions seulement. `searchAppearance` est vide sur toutes les fenêtres (aucun extrait enrichi ni FAQ comptabilisé). Pays : la France fait environ 76 % des impressions IA (398 sur 521).

## 7. Bing

| Mois | Clics | Impressions |
|---|---|---|
| juin (13→30) | 11 | 277 |
| juillet | 15 | 440 |
| août | 16 | 581 |
| septembre | 27 | **1 517** |
| oct. (01→04, partiel) | 4 | 172 |

Bing est tout petit (environ 15 % des impressions Google), mais ses impressions ont presque triplé en septembre. Ses premières requêtes sont celles de marque.

## 8. Jalons datés (git)

| Date | Jalon |
|---|---|
| 05/01 | Création du dépôt |
| 18/01 | Blog magazine (30 articles), robots/sitemap |
| 22/01 → 27/01 | Indexation ouverte, puis refermée sauf la home (pré-lancement) |
| 05/02 | Audit pré-lancement, tracking Google Ads |
| 09/02 | « indexation SEO » → 1re impression GSC le 09/02 |
| 19/02 | Sitemap soumis + 6 pages géographiques |
| 10–25/03 | Réécriture des pages géo, metas CTR, environ 27 articles, page vallée de Chevreuse |
| 17–23/04 | Audit GSC, titles, quick wins |
| 19/05 | **Agent Camille lancé** |
| 02/06 | Optimisation CTR + données structurées |
| 11–12/06 | llms.txt, fusion 301 de 12 articles, IndexNow/Bing |
| juin / juil. / août | Camille publie 19 / **106** / 83 articles |
| 07–08/07 | Dé-cannibalisation des clusters, retrait de la couche conversion Google Ads |
| 25/08 | Audit SEO/LLM : /chateaux en SSR, pagination du blog, /references |
| 30/08 | 69 fiches /lieux + 8 landings (départements, formats, budgets) |
| 31/08 | Vrais 404, 11 fusions, robots.txt ; naissance de Marcus |
| 01/09 | **PR #23** : FAQ affichées (1 991 réponses), titres ancrés |
| 06/09 | PR #25 (97 titres), #28 maillage ; Camille passe à 3 réécritures pour 1 création |
| 20/09 | PR #37 « booster les clics » |
| 24/09 | Guides départements 78/60, rendu sans « Chargement… », traceur CRM réparé |
| 28/09 | Mise à jour Google « September 2026 spam update » détectée |
| 29–30/09 | Formulaire devis du blog réparé ; pilote lieux sous articles |

Indexation (inspection d'URL par Marcus) : 330 URL indexées sur 382 le 31/08, 324 sur 371 le 05/10. Environ 45 URL restent hors index (« explorée, non indexée » ou « découverte, non indexée »).

## Constats majeurs

1. **Les impressions ont été multipliées par 5 depuis mars, les clics seulement par 3.** Le CTR passe de 2,5 % (avril) à 1,1–1,3 % (août-septembre).
2. **Juin reste le pic de qualité** : position 11,8, 127 clics. La production de masse de juillet-août (+189 articles) a fait monter les impressions, mais la position s'est dégradée jusqu'à 20,2 et les clics ont stagné (97 puis 93).
3. **Septembre marque une reprise** : environ 143 clics (record) ; semaines du 14 et du 21/09 autour de 40 clics (meilleures semaines) ; position de 20,9 à 16,6. Dans le même temps, les impressions hebdomadaires ont reculé de 3 675 à environ 2 000. C'est une corrélation avec la phase « qualité » (fusions, PR #23/#25/#37, fin des créations), pas une preuve, et une mise à jour anti-spam de Google tombe dans la même période.
4. **Le trafic dépend d'un seul article et de la home.** L'article murder party (40 %) et la home (20 %) font 60 % des clics. Les pages commerciales sont à des positions 25 à 55 sur les requêtes cœur : « séminaire chantilly » 53,5, « séminaire château » 45,5, « team building île de france » 41,4.
5. **Les questions de style IA progressent nettement**, de 34 impressions en juillet à environ 486 sur les 30 derniers jours, en position 2 à 9, avec **zéro clic**. La marque, elle, a disparu de la GSC depuis fin mai.

## Limites et trous de données

- **Pas d'accès GSC direct** (gcloud doit être reconnecté à la main). Aucune requête n'a pu être faite avec une dimension date après le 27/08.
- Septembre et octobre sont **reconstruits** : les totaux de 3–4 jours sont exacts, le détail jour par jour est estimé. Le 29–30/09 et le 01–02/10 sont estimés. **Octobre est partiel** (2 jours) et la GSC a 2–3 jours de latence : les données s'arrêtent au 02/10.
- **Environ 90 % des clics portent sur des requêtes que Google masque** (291 clics sur 310 entre le 29/05 et le 27/08). Toute analyse par requête (marque, langage naturel, top 15) ne voit donc que la partie émergée.
- La répartition par type de page et le nombre de pages ou de requêtes **ne sont pas disponibles mois par mois** : seulement par fenêtre (mars-mai, ≈ juin par soustraction, juillet, août, et septembre partiel).
- La comparaison « 3 mois plus tôt » se fait avec juillet (≈ 2 mois plus tôt) : la fenêtre 06/06→06/07 n'est pas détaillée dans les sources disponibles.
- Les chiffres du workflow (06/10) ne gardent que les requêtes à 2–3 impressions ou plus : ce sont des minimums.
- `searchAppearance` est vide. L'export « fonctionnalités IA » s'arrête au 05/09.
- Bing : trafic depuis le 13/06 seulement, requêtes par semaine depuis le 19/06.

**Pour combler ces trous** : lancer `gcloud auth login seminaires@selectchateaux.com`, puis relancer le dump (`scripts/agent-cm/gsc-dump.js` de la branche `feat/gsc-export-complet`). On obtiendrait ainsi la série quotidienne exacte jusqu'au 03/10 et les fenêtres mois par mois.

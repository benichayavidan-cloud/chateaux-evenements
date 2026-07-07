# Audit SEO + GEO — selectchateaux.com
**Date** : 11 juin 2026 · **Objectif** : booster la génération de leads organiques (gratuit, 0 ads)
**Sources** : Google Search Console (90j), GA4 (30j), fetch live de 7 pages, code source SITE-WEB

---

## 📊 Résumé exécutif

| Dimension | Score | Verdict |
|---|---|---|
| SEO Technique | 9/10 ✅ | Excellent — ce n'est PAS le problème |
| Structured Data | 9/10 ✅ | Très riche (@graph complet) |
| On-Page | 8/10 ✅ | Titles/metas/H1 bien optimisés |
| **Architecture contenu** | **3/10 🔴** | **Cannibalisation massive — frein n°1** |
| **Autorité / Backlinks** | **2/10 🔴** | **Domaine jeune, positions 12-35 plafonnées** |
| CTR | 4/10 🟠 | 1830 impressions à 1,2% CTR = clics perdus |
| GEO (moteurs IA) | 5/10 🟠 | Bonne fondation (FAQPage) mais llms.txt absent |

**Le diagnostic en une phrase** : le site est techniquement irréprochable mais **86 articles de blog se cannibalisent entre eux et avec les landing pages**, sur un domaine sans autorité — Google hésite entre 12 pages pour « séminaire chantilly » et n'en classe aucune en page 1.

**La bonne nouvelle** : l'engagement organique est exceptionnel (8min28 de session moyenne, 34% de rebond vs 68% en direct). Le trafic organique **convertit** — il en faut juste 10× plus.

---

## 1. État des lieux — chiffres clés

### Search Console (90 jours)
- **~175 clics**, dont 23 sur la marque « select chateaux » (pos 1,4)
- Homepage : 71 clics, 1 108 impressions, **position 15**
- Sitemap : 104 URLs, **100 indexées, 0 erreur** ✅

### Money keywords — tous plafonnés en page 2-4
| Requête | Impressions | Position | Clics |
|---|---|---|---|
| séminaire chantilly | 346 | 23,2 | 1 |
| chateau team building | 174 | 24,3 | 0 |
| hotel seminaire chantilly | 148+ | 34,9 | 0 |
| chateau seminaire oise | 91 | 17,0 | 1 |
| chateau séminaire ile de france | 89 | 27,4 | 0 |
| chateau seminaire 78 | 89 | 12,0 | 2 |
| chateauform chantilly/yvelines/78 | ~36 | 16–30 | 0 |

### GA4 (30 jours)
- Organic Search : 26 sessions, durée moyenne **507s**, rebond 34% → trafic ultra-qualifié
- AI Assistant : 1 session (GEO embryonnaire)
- /devis : 18 vues, 933s de durée moyenne → le funnel fonctionne

---

## 2. 🔴 Finding critique #1 — Cannibalisation massive

**Evidence (GSC, requête « séminaire chantilly », 90j)** :
- `/seminaire-chateau-chantilly` (landing) → 268 impressions, **position 35,8**, 0 clic
- `/blog/seminaire-chantilly-activites-team-building` → 160 impressions, **position 12,2**, 1 clic

Google montre les DEUX pages et ne sait pas laquelle classer → aucune ne monte. Même schéma sur « activite seminaire chantilly » (33 imp blog pos 8,3 vs 2 imp landing pos 43), « chateauform chantilly », « hotel seminaire chantilly ».

**Ampleur** : ~12 pages ciblent Chantilly (1 landing + 11 articles : hotel-seminaire-chantilly-guide, hotel-seminaire-chantilly-comparatif, chantilly-destination-royale, chantilly-vs-fontainebleau, seminaire-chantilly-activites-team-building, seminaire-chateau-chantilly-guide-2026, seminaire-chantilly-guide-organisateurs-2026, team-building-chantilly-activites-domaines-2026, team-building-chantilly-equitation-polo…, seminaire-team-building-chantilly-oise…, seminaire-oise-chantilly-senlis…). Idem Yvelines (~8 pages), Chevreuse (~5), Hauts-de-Seine (~3).

**Cause racine** : 86 articles publiés (45 + 19 + 17 + 5 dans `src/data/blog-posts*.ts`) avec des angles trop proches, sans hiérarchie pilier/satellite.

**Fix (impact maximal, 0€)** :
1. **Désigner 1 page canonique par cluster de mots-clés** (la landing page geo).
2. Chaque article satellite : lien interne vers la landing avec **ancre exacte** (« séminaire château à Chantilly ») dans le 1er tiers du contenu (`internal-link-map.ts` existe déjà — l'exploiter).
3. **Désoptimiser les satellites** : retirer le mot-clé principal des titles des articles qui doublonnent (ex. les 2 articles « hotel-seminaire-chantilly-* » → fusionner en 1, redirect 301 de l'autre).
4. Fusionner les quasi-doublons : `seminaire-chateau-chantilly-guide-2026` + `seminaire-chantilly-guide-organisateurs-2026` → 1 seul guide ; rediriger en 301.
5. Le blog post qui ranke déjà (pos 12) devient un satellite assumé « activités » et pousse la landing.

**Impact attendu** : consolidation du signal → landing Chantilly de pos 35 → page 1-2 en 4-8 semaines. C'est le levier n°1.

---

## 3. 🔴 Finding critique #2 — Autorité quasi nulle

**Evidence** : positions 12-35 partout malgué un on-page excellent = signal classique de déficit de backlinks. Concurrents (Châteauform, ABC Salles, 1001 Salles) ont des DR 50-70.

**Fix gratuit (effort, pas argent)** :
1. **Annuaires événementiel B2B** (liens gratuits, trafic direct qualifié en bonus) : ABC Salles, 1001 Salles, Bedouk, Kactus, Privateaser Pro, EventCatering, Salles-Séminaires.com, Aleou.
2. **Presse locale & tourisme** : Oise Tourisme, Yvelines Tourisme, CRT Île-de-France, offices de tourisme Chantilly/Senlis/Chevreuse — demander une fiche/lien partenaire.
3. **Partenariats croisés** : traiteurs, agences team building, photographes événementiels — échange de liens contextuels.
4. **HARO français** : répondre aux journalistes (Relations Presse via LinkedIn, #JournoRequest).

---

## 4. 🟠 Finding #3 — CTR faibles sur les positions acquises

**Evidence** :
- `/blog/seminaire-chantilly-activites-team-building` : pos 11,1, **1 830 impressions, CTR 1,2%** (≈ 60-70 clics/90j perdus vs CTR normal de 3-5% à cette position)
- `/seminaire-chateau-chantilly` : 823 imp, CTR 0,1%
- `/blog/seminaire-yvelines-78-luxe-proximite` : 866 imp, CTR 0,7%
- `/seminaire-chateau-oise-60` : 600 imp, CTR 0,5%

**Fix** : réécrire les titles avec un différenciateur cliquable (chiffres concrets, prix, bénéfice) :
- Avant : « Séminaire Chantilly : 15 Activités Team Building [Guide 2026] »
- Après : « Séminaire à Chantilly : 15 Activités + Tarifs 2026 (dès 89€/pers) » — le prix dans le title est le booster de CTR n°1 en B2B event.

---

## 5. 🟠 Audit GEO (ChatGPT, Perplexity, AI Overviews)

### ✅ Déjà en place (bonne fondation)
- **FAQPage** JSON-LD sur les landing pages et articles (`structured-data.ts`) — c'est LE format que citent les moteurs IA
- LocalBusiness + Service + AggregateRating + Place/EventVenue/LodgingBusiness
- Bots IA non bloqués (robots.txt `User-Agent: *` + `Allow: /`)
- Contenu riche : 1 800–4 100 mots/page, données chiffrées (228 chambres, 6 300 ha, 35 min de Paris)

### ❌ Manquant
1. **`llms.txt` → 404** (vérifié live). À créer : résumé du site, offres, 4 châteaux, capacités, zones, contact — le standard émergent que lisent les crawlers IA.
2. **Règles robots explicites pour les bots IA** : ajouter dans `robots.ts` des règles dédiées `GPTBot`, `ClaudeBot`, `PerplexityBot`, `Google-Extended`, `Bingbot`, `CCBot` avec `allow: '/'` — signal d'accueil explicite + protection si on veut exclure certains chemins.
3. **Contenu « citable » à structurer** : les moteurs IA citent les réponses directes et les tableaux comparatifs. Ajouter sur chaque landing :
   - Un bloc « réponse directe » de 2-3 phrases sous le H1 (qui/quoi/combien/où)
   - Tableaux comparatifs (capacité / chambres / distance Paris / prix indicatif)
   - Statistiques propriétaires datées (« En 2026, le budget moyen d'un séminaire en château en IDF est de X€/pers » — données CRM = or pour être cité)
4. **Page « Combien coûte un séminaire en château ? »** : l'article existe (`combien-coute-seminaire-chateau-2026`, CTR 7,4%, pos 4 ✅) — le renforcer avec un tableau de prix structuré + FAQPage, c'est le contenu le plus cité par les IA sur ce secteur.
5. **Cohérence entité** : s'assurer que Wikipedia/Wikidata n'existent pas mais que la fiche **Google Business Profile** est complète (les IA s'appuient massivement sur GBP + avis pour les requêtes locales).

---

## 6. 💎 Opportunité — Requêtes « Châteauform »

**Evidence GSC** : `chateauform chantilly` (18 imp pos 22,6), `chateauform yvelines`, `chateauforme 78`, `chateau form yvelines` — le site apparaît déjà sans page dédiée.

**Fix** : créer `/blog/alternative-chateauform-ile-de-france` — « Alternative à Châteauform en Île-de-France : comparatif 2026 ». Comparaison factuelle (capacité, flexibilité, exclusivité, prix), ton respectueux. Intention d'achat maximale, concurrence quasi nulle sur ce mot-clé, et les IA adorent les comparatifs pour répondre à « alternatives à Châteauform ».

---

## 7. 🎯 Plan d'action priorisé (lead gen rapide, 0€)

### P0 — Cette semaine (impact sous 4-8 semaines)
| # | Action | Effort | Impact |
|---|---|---|---|
| 1 | Fix cannibalisation Chantilly : fusions 301 + maillage ancres exactes vers landing | 1 jour | 🔥🔥🔥 |
| 2 | Idem Yvelines + Chevreuse + 92 | 1 jour | 🔥🔥🔥 |
| 3 | Réécrire 6 titles/metas à fort volume + CTR faible (prix dans le title) | 2h | 🔥🔥 |
| 4 | Créer `llms.txt` + règles bots IA dans `robots.ts` | 1h | 🔥 (GEO) |
| 5 | Page « Alternative à Châteauform » | 3h | 🔥🔥 |

### P1 — Semaines 2-3
| # | Action | Effort | Impact |
|---|---|---|---|
| 6 | Bloc « réponse directe » + tableau comparatif sur les 6 landing geo (GEO-ready) | 1 jour | 🔥🔥 |
| 7 | Inscriptions annuaires B2B (8 annuaires) | 1 jour | 🔥🔥 (+ leads directs) |
| 8 | GBP : posts hebdo, photos, Q&A, collecte d'avis clients | continu | 🔥🔥 (local pack = leads gratuits) |
| 9 | Renforcer l'article prix (pos 4 déjà !) : tableau structuré, FAQ étendue | 3h | 🔥 |

### P2 — Mois 1-2
| # | Action | Effort | Impact |
|---|---|---|---|
| 10 | Campagne backlinks tourisme/presse locale | continu | 🔥🔥🔥 (déblocage page 1) |
| 11 | Stats propriétaires CRM publiées (baromètre prix séminaires IDF) → attire liens + citations IA | 1 jour | 🔥🔥 |
| 12 | Geler la production d'articles tant que les clusters ne sont pas assainis | 0 | 🔥 |

### ⚠️ Ce qu'il ne faut PAS faire
- **Ne plus publier d'articles** sur des angles déjà couverts (la cadence actuelle aggrave la cannibalisation)
- Pas de nouvelles pages geo : le problème est l'autorité et la consolidation, pas le volume

---

## Out-of-Scope Notes
- **Core Web Vitals terrain** : non mesurés ici → `npx unlighthouse --site https://www.selectchateaux.com` ou PageSpeed Insights (la perf avait déjà été optimisée, cf. mémoire projet)
- **Backlinks existants** : nécessite Ahrefs/Semrush (gratuit : Ahrefs Webmaster Tools)
- **Volumes de recherche exacts** : Keyword Planner non accessible via l'API GAQL actuelle
- **Couverture d'indexation détaillée** : 100/104 indexées selon GSC sitemaps, RAS

---
*Audit réalisé avec data first-party GSC/GA4 + fetch live (rendu SSR complet, JSON-LD vérifié) + analyse du code source.*

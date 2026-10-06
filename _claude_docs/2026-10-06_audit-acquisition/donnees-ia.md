# Historique GEO / LLM — selectchateaux.com (janv. → 05/10/2026)

Données brutes : `geo.json` (même dossier). Lecture seule : Supabase `select-chateaux` (marcus_runs, marcus_lecons, bot_hits, demandes_devis_chateaux), CRM `SiteSession` (transaction READ ONLY), artefacts GitHub du workflow `llm-citations.yml`, export GSC « AI Features » du 06/09, audits `_claude_docs/`.

Mesures exclues : sondes Marcus « sans recherche » avant le 25/09 (= erreurs API), SERP du 10 au 21/09 (réponse vide comptée >30), run LLM du 24/09 (11/11 sans réponse), ChatGPT du 01/10 (crédit OpenAI épuisé).

---

## 1. Citations par les IA (mesures valides seulement)

Format : cité / requêtes réellement mesurées (requêtes testées). Rang = place du domaine dans la liste des sources renvoyées.

| Date | Moteur | Cité / mesuré | Détail |
|---|---|---|---|
| 25/08 | Claude (workflow mensuel) | **6/7** | rangs 2, 2, 4, 8, 8, 9 ; absent sur « quelle agence… 100 pers. » |
| 31/08 | ChatGPT (R0) | cité **1er** | « meilleure agence séminaire château IdF » (1 prompt, non archivé en détail) |
| 31/08 | Gemini (R0) | 0 — **non mesuré** | Gemini ne cherchait pas (8/9 sans recherche le 01/09) |
| 01/09 | Claude | **5/6** (7) | 1 erreur API ; nouveau : cité sur « quelle agence » (rang 10/15) |
| 03/09 | ChatGPT (Marcus) | **1/5** (11) | « combien coûte » rang 2/5 ; 6 invalides |
| 03/09 | Gemini (Marcus) | invalide (0/11 mesurées) | |
| 06/09 | ChatGPT (manuel) | **1/5** | « alternative châteauform » |
| 06/09 | Gemini (manuel) | **2/2** | dont « combien coûte » (1 source sur 8) |
| 10/09 | ChatGPT (Marcus) | **2/5** (11) | « combien coûte » rang **1**/4, « alternative châteauform » rang 2/4 |
| 17/09 | ChatGPT (Marcus) | 0/1 (11) | 10 invalides — le « 0/11 » de l'audit du 20/09 est faux |
| 20/09 | manuel (moteur non précisé) | cité sur 2 | « séminaire château IdF », « alternative Châteauform » |
| 24/09 | ChatGPT + Gemini | invalide | 11/11 sans réponse des deux côtés |
| 01/10 | Gemini (Marcus, recherche forcée) | **6/11 (55 %)** | rangs : budget 1/9, murder party 2/15, proche Paris 3/3, team building 5/9, combien coûte 5/5, résidentiel 10/13 |
| 01/10 | ChatGPT (Marcus) | invalide | 11/11 « no credits remaining » (OpenAI) |
| 01/10 | Claude | **5/7** | perdu : « château proche Paris », « séminaire à Chantilly » ; rangs 3, 9, 11, 11, 18 |

Perplexity, Copilot, Grok : **jamais sondés**.

Lecture : partout où un moteur cherche vraiment sur le web, le site sort dans 20 à 85 % des réponses. Les deux pages qui font citer le site sont celles bâties sur une donnée propriétaire (observatoire des 188 devis / budget, comparatif « alternative Châteauform »).

---

## 2. AI Overviews (Google)

Source unique : export manuel GSC « Generative AI Features » (06/09) + série recalculée le 20/09. Aucune API ne l'expose.

| Mois | Impressions IA | Part du total |
|---|---|---|
| juin | 36 | 0,66 % |
| juillet | 142 | 2,16 % |
| août | 282 | **3,22 %** |
| sept. (1-4) | 61 | 2,48 % |

Part IA sur 28 j glissants : 3,24 % (28/08) → 3,15 % → 2,79 % → 2,67 % → 2,73 % → 2,76 % (14/09). Hausse en volume (1,3/j fin juin → 12,9/j début sept.), baisse en part : c'est la croissance du site, pas un gain IA.

- 94 pages captées au 06/09 ; 75 % des impressions IA vont au blog.
- Taux de captation du corpus blog : **~20 %** au 01/09 (23 % mars, 21 % juillet, 20 % août).
- Après le correctif du 01/09 (FAQ visibles, ancres) : **non remesuré** (`remesure-captation.mjs` prévu à partir du 15/10).
- Clics depuis les réponses IA : non exportés. Requêtes en langage naturel : 498 impressions, positions 3-5, **0 clic**.

---

## 3. Positions Google du panel (27 requêtes, Bright Data)

| Date | Top 3 | Top 10 | Top 30 | Note |
|---|---|---|---|---|
| 31/08 (R0) | 1 | 7 | 15 | |
| 31/08 (run 6) | 1 | 6 | 13 | |
| 03/09 | 1 | 5 | 15 | |
| 07/09 | 1 | 5 | 14 | |
| 10 → 21/09 | — | — | — | **mesure invalide** (4 runs) |
| 24/09 | 2 | 5 | 18 | 26 mesurées |
| 28/09 | 1 | 5 | 11 | 25 mesurées |
| 01/10 | 0 | 3 | 7 | **partielle** : 11 requêtes en erreur |
| 05/10 | 2 | 5 | 15 | 27 mesurées |

Top 10 au 05/10 : alternative châteauform (2), combien coûte un séminaire en château (3), murder party château (6), team building chantilly (7), journée d'étude château (8). Stable depuis le R0 : 5-7 requêtes en top 10, le reste en page 2-3.

---

## 4. Robots (bot_hits, depuis le 31/08 seulement)

Total 40 306 passages. Par semaine (lundi) :

| Semaine | ChatGPT-User | Perplexity* | OAI-SearchBot | GPTBot | ClaudeBot | Meta | Googlebot | Bingbot |
|---|---|---|---|---|---|---|---|---|
| 31/08 | 265 | 380 | 1 291 | 83 | 153 | 18 | 78 | 246 |
| 07/09 | 226 | 137 | 1 097 | 414 | 170 | 23 785 | 46 | 262 |
| 14/09 | 199 | 162 | 1 011 | 2 988 | 228 | 1 801 | 76 | 257 |
| 21/09 | 158 | 155 | 2 345 | 18 | 194 | 0 | 59 | 243 |
| 28/09 | 153 | 98 | 355 | 8 | 145 | 0 | 50 | 233 |
| 05/10 (2 j) | 28 | 19 | 64 | 3 | 38 | 0 | 55 | 48 |

Autres : CCBot 192, Applebot 271, Google-Extended 1 (jeton robots.txt, pas un robot : sans signification).

Les robots qui comptent — ceux qui vont lire une page parce qu'un humain pose une question :

- **ChatGPT-User : ~38/jour début septembre → ~22/jour fin septembre (-42 %)**. Pages lues : accueil (345), guide séminaire d'été (117), murder party (48), séminaire proche Paris (37).
- **Perplexity** : 380 → ~100-160/semaine ; mais le capteur ne distingue pas PerplexityBot (index) de Perplexity-User (réponse en direct) — 85 hits sur robots.txt sont l'indexeur.
- Entraînement (GPTBot, ClaudeBot, Meta, CCBot) : pics ponctuels (Meta 23 785 la semaine du 07/09, GPTBot 2 988 la semaine du 14/09), sans lien avec la visibilité.
- Googlebot : 50-80/semaine, dont une bonne part sur robots.txt/sitemap.

\* Perplexity = PerplexityBot + Perplexity-User confondus.

---

## 5. Visites humaines venant des IA

| Période | Source | Résultat |
|---|---|---|
| ~10/04 → 08/07 (90 j) | GA4, canal « AI Assistant » | **11 sessions** (2 %), 341 s/session, rebond 18 % |
| 08/07 → aujourd'hui | GA4, événement `ai_referral` | en place mais **non lu** (accès GA4 indisponible localement) |
| 22/06 → 20/09 | CRM SiteSession | **trou** : traceur en 404 silencieux |
| 21/09 → 06/10 | CRM SiteSession | **1 session ChatGPT sur 305** (utm_source=chatgpt.com, semaine du 28/09, article feux d'artifice) |
| 24/09 → 06/10 | demandes de devis (origine_canal) | 2 demandes, toutes deux Google ; **0 venant d'une IA** |

---

## 6. Leçons Marcus utiles au bilan

1. **La structure d'un article ne prédit pas sa captation IA** (01/09) — mais la mesure ne valait rien : 284/284 articles avaient la FAQ balisée non affichée et 283/284 sans ancres. Corrigé le 01/09 (PR #23), à remesurer après le 15/10.
2. **La hausse des impressions IA après le 01/09 n'est pas l'effet des correctifs** (06/09) : la part IA baisse (2,86 % → 2,48 %), et Googlebot n'avait re-crawlé que 3 articles sur 284.
3. **Le blog porte 75 % de la captation IA**, et c'est la famille que Google crawle le moins (36 j de médiane contre 6 pour les landings).
4. **La longueur prédit l'indexation** (<900 mots = 89 % de refus) ; la cannibalisation lexicale ne prédit rien (31/08).

---

## 7. Trous de mesure

- **Janv. → 24/08** : aucune sonde de citation IA. Seul indice : 11 sessions GA4 « AI Assistant » (avr.-juil.).
- **Janv. → 30/08** : aucun log de robots (bot_hits créé le 31/08).
- **Avant le 05/06** : aucune donnée AI Overviews ; **après le 14/09** : aucune (export manuel non refait).
- **ChatGPT automatique** : seulement 11 réponses réelles en 5 runs (03/09 → 01/10) ; **aucune mesure ChatGPT valide depuis le 17/09** (DataForSEO puis crédit OpenAI épuisés).
- **Gemini** : une seule mesure automatique valide (01/10).
- **SERP** : trou du 10 au 21/09 ; 01/10 partiel.
- **Visites humaines IA** : 08/07 → 20/09 non lues (GA4 non consulté, CRM cassé).
- **Perplexity, Copilot** : jamais sondés ; Perplexity-User et Claude-User non distingués dans les logs.

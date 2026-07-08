# Audit SEO + GEO + Performance — selectchateaux.com

**Date :** 2026-07-08
**Périmètre :** SEO technique, GEO (moteurs IA), autorité, performance web. Données live GSC + GA4 (90 jours) + inspection prod + inventaire code.

---

## Verdict en une phrase

**La plomberie SEO/GEO est quasi irréprochable (9/10) — le plafond n'est PAS technique. Le trafic reste faible parce que le site plafonne en bas de page 1 / page 2 (position moyenne ~13) faute d'AUTORITÉ (backlinks 2/10), et laisse filer des clics sur des pages à forte impression (CTR faible + cluster Chantilly bloqué page 3).**

Autrement dit : on a construit une Ferrari, il lui manque le carburant (liens) et deux réglages de titres. On n'a quasiment plus rien à coder — on a des choses à **positionner** et à **promouvoir**.

---

## 1. Constat de performance (données 90 jours)

### Trafic global (GA4)
| Métrique | Valeur |
|---|---|
| Utilisateurs | 408 (389 nouveaux) |
| Sessions | 470 |
| Pages vues | 799 |
| Durée moy. session | 130 s |
| Taux de rebond | 50,4 % |

### Acquisition (GA4)
| Canal | Sessions | Part | Rebond | Durée |
|---|---|---|---|---|
| **Direct** | 319 | 68 % | 59 % | 35 s |
| **Organic Search** | 101 | 21 % | 31 % | **360 s** |
| Paid Search | 18 | 4 % | 6 % | 318 s |
| **AI Assistant** | **11** | 2 % | 18 % | 341 s |
| Referral | 10 | 2 % | 60 % | 144 s |

**Lectures clés :**
- Le **Direct domine (68 %)** = trafic marque/Ads/hors-ligne. L'organique est encore petit (21 %) mais **très qualifié** (6 min/session, rebond 31 %).
- **Le canal "AI Assistant" existe déjà (11 sessions, 341 s/session)** : ChatGPT/Perplexity commencent à envoyer du trafic. Le travail GEO **fonctionne** mais est encore micro. C'est le signal à faire grossir.

### Search Console (90 j)
| | Clics | Impressions | CTR | Position moy. |
|---|---|---|---|---|
| **Total** | ~247 | ~13 200 | ~1,9 % | **~13,5** |
| Desktop | 154 | 10 304 | 1,5 % | 14,2 |
| Mobile | 89 | 2 790 | 3,2 % | 11,8 |

- Impressions en **croissance nette** (75/j en avril → 250/j en juillet) : Google indexe et montre de plus en plus le site.
- Mais **position moyenne ~13 = bas de page 1 / page 2** → peu de clics. Le contenu est vu, pas cliqué car pas assez haut.
- **CTR desktop (1,5 %) = moitié du mobile (3,2 %)** : anomalie à creuser (concurrence + sitelinks desktop).

### Pages : les vraies opportunités (GSC 90 j)
| Page | Impr. | Position | CTR | Diagnostic |
|---|---|---|---|---|
| `/blog/seminaire-chantilly-activites-team-building` | **2 380** | 10,0 | 1,1 % | Énorme volume, CTR faible → **titre à réécrire** |
| `/blog/seminaire-yvelines-78-luxe-proximite` | **1 899** | 12,1 | 0,6 % | Idem, gros gisement de clics perdus |
| `/seminaire-chateau-chantilly` (landing money) | 932 | **25,3** | 0,1 % | **Anormal** : landing transac en page 3 |
| `/seminaire-chateau-oise-60` | 781 | 22,5 | 0,3 % | Landing bloquée page 3 |
| `/team-building-chateau` | 892 | 19,7 | 1,0 % | Page service en page 2 |
| `/blog/murder-party-chateau-activite-immersive` | 933 | **7,0** | 6,4 % | ✅ Ce qui marche : pos 7, bon CTR |

### Requêtes à débloquer (page 2-3, gros volume)
- **"team building chantilly"** — 862 impressions, **position 9,5**, 1 clic. À 3 places du top 5.
- **"séminaire chantilly"** — 381 impressions, position 20,9.
- **"chateau seminaire 78"** — 82 impr, pos 8,7.
- Marque **"select chateaux"** : position 1,2 ✅.

**Conclusion du constat :** le goulot n'est ni l'indexation, ni le balisage, ni la vitesse. C'est **(1) l'autorité qui plafonne les positions à ~13, (2) le cluster Chantilly qui sous-performe, (3) des titres qui laissent filer des clics sur des pages déjà bien vues.**

---

## 2. Ce qui est déjà excellent (à ne PAS retoucher)

Inventaire code — fondation rare pour un site de cette taille :

- **Métadonnées** centralisées (`layout.tsx` : metadataBase, title template, OG/Twitter complets) + `generateMetadata` dynamique par château/article + canonicals propres.
- **Structured data (JSON-LD) très riche** via `src/utils/seo/structured-data.ts` : Organization (+ `knowsAbout` = signal d'expertise GEO), LocalBusiness (adresse, géo, 9 départements, horaires), Service + OfferCatalog, FAQPage, BreadcrumbList, BlogPosting (avec `dateModified`, author Person, `about` Organization), Place/EventVenue/LodgingBusiness par château, HowTo + VideoObject conditionnels. AggregateRating 4,8 **adossé à 12 vrais avis affichés** (conforme).
- **Sitemap dynamique** (104 URLs, priorités calibrées, pages légales en noindex).
- **robots.ts** accueille explicitement **tous les crawlers IA** : GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-Web, PerplexityBot, Perplexity-User, Google-Extended, Applebot-Extended, CCBot, meta-externalagent.
- **llms.txt dynamique** (norme llmstxt.org) généré depuis les données (châteaux, pricing, guides, blog) — jamais désynchronisé.
- **Blocs GEO** : `GeoAnswerBlock` (réponse directe citable sous le H1 + **tableau comparatif des 4 châteaux** — format favori des IA) + FAQ à schéma. Prompt agent impose ce format.
- **Système anti-cannibalisation "Camille"** : `seo-clusters.json` (14 clusters, 1 requête = 1 page canonique) + `anti-cannibalisation.js` (gate bloquant EN CODE : cluster protégé, slug/sujet similaire Jaccard, lien canonique obligatoire) + 18 fusions 301 (`merged-redirects.json` source unique → next.config + filtre blog-posts).
- **Maillage interne** piloté par la donnée (`internal-link-map.ts`, GSC-driven, priorités, pilier→satellite) auto-injecté dans les articles.
- **IndexNow** (`indexnow-ping.js`) vers Bing/Yandex + ChatGPT Search, pingué après chaque publication.
- **Performance** (mesuré en prod) : TTFB **0,24 s**, 100 % images WebP/AVIF, LCP préchargé `fetchPriority=high`, fonts préchargées `display:swap`, HTML 27-40 Ko, headers HSTS/cache immutable, GA/Ads en `lazyOnload`, Consent Mode v2. Toutes les pages testées indexées, canonical propre, crawl mobile.

**Ce socle vaut de l'argent. Le plan d'action ci-dessous ne le touche pas — il le rentabilise.**

---

## 3. Axes d'amélioration (priorisés)

### 🔴 P1 — AUTORITÉ / BACKLINKS (le vrai plafond)
**Pourquoi :** l'audit fondateur notait l'autorité **2/10**. Tout le technique est 9/10 mais les positions plafonnent à ~13 car le domaine a peu d'équité de liens. **C'est LE levier n°1.** Aucun réglage technique ne fera passer une page de la position 13 à 5 sans autorité supplémentaire.

**Actions concrètes :**
1. **Exécuter le kit annuaires** déjà rédigé (`_claude_docs/2026-06-12_kit-inscription-annuaires.md`) — annuaires événementiel/séminaire/mariage pro, Google Business, PagesJaunes, annuaires B2B.
2. **Liens depuis les 4 châteaux partenaires** : chaque domaine a un site — obtenir un lien "commercialisé par Select Châteaux". Backlinks thématiques ultra-pertinents.
3. **Digital PR / contenu citable** : 1-2 études chiffrées ("Budget séminaire château 2026", "Baromètre CODIR hors les murs") diffusées à la presse pro RH/événementiel → liens + citations IA.
4. **Partenariats réciproques ciblés** (déjà fait avec RankWeld) : traiteurs, agences RH, activités team building.
5. Suivre les plans backlinks existants (`2026-04-17_plan-backlinks-seo.md`, `2026-06-02_strategie-seo-backlinks.md`).

### 🟠 P2 — Débloquer le cluster CHANTILLY + pages à forte impression
**Pourquoi :** `/seminaire-chateau-chantilly` (landing transactionnelle) en **position 25** avec 932 impressions est anormal — soit contenu trop mince face aux concurrents, soit cannibalisée par l'article blog Chantilly (2 380 impr, pos 10). Le cluster Chantilly est le plus gros gisement (~2 000 impr cumulées) et le plus mal positionné.

**Actions :**
1. Vérifier que la **landing** (pas l'article blog) possède "séminaire chantilly" dans `seo-clusters.json`, et enrichir son contenu (profondeur, tableau, FAQ, preuves).
2. **Injecter des liens internes forts** vers la landing Chantilly depuis les pages qui rankent (home, article murder-party pos 7, article Chantilly blog) avec ancre "séminaire château Chantilly".
3. Même traitement pour `/seminaire-chateau-oise-60` (pos 22) et `/team-building-chateau` (pos 19,7 sur "team building chantilly" à pos 9,5 → à 3 places du top 5).

### 🟡 P3 — CTR : réécrire les titres des pages à forte impression / faible CTR
**Pourquoi :** gains rapides sans bouger la position. Deux pages cumulent **4 300 impressions** à <1,2 % de CTR.

**Actions :**
1. `/blog/seminaire-chantilly-activites-team-building` (2 380 impr, 1,1 %) et `/blog/seminaire-yvelines-78-luxe-proximite` (1 899 impr, 0,6 %) : titres avec **chiffre + crochet + "2026" + accroche prix** (ex. la murder-party à 6,4 % de CTR sert de modèle).
2. Investiguer le **CTR desktop 2× plus faible** que mobile (concurrence SERP, absence de sitelinks) sur les pages clés.

### 🟢 P4 — GEO : faire grossir le signal "AI Assistant"
**Pourquoi :** 11 sessions IA déjà, très engagées. Le socle GEO est prêt, il faut l'amplifier et le mesurer.

**Actions :**
1. **`/llms-full.txt`** (version longue avec le contenu des guides piliers) en complément du `llms.txt` actuel.
2. **Mesurer** explicitement les référents IA dans GA4 (canal custom : chat.openai.com, perplexity.ai, gemini, copilot) pour piloter.
3. **Étendre les blocs citables** (réponse directe + tableau comparatif) aux **articles piliers et pages château** — aujourd'hui surtout sur les landings géo.
4. Entretenir la **fraîcheur** (`dateModified`) sur les guides à budget/tarifs 2026 — les IA privilégient le contenu récent et daté.

### ⚪ P5 — Micro-correctifs techniques (faible effort)
- Aligner `reviewCount` : `structured-data.ts` dit tantôt **11** tantôt **12** avis (les vrais = 12). Harmoniser.
- `wordCount` du BlogPosting est estimé (`content.length / 6`) → calculer le vrai compte.
- Pas de `llms-full.txt` (cf. P4).

---

## Séquencement recommandé
1. **Cette semaine :** P3 (titres, ~2 h, gain rapide) + P5 (micro-fix).
2. **Ce mois :** P2 (cluster Chantilly : contenu + maillage) + démarrage P1 (annuaires + liens châteaux).
3. **Continu :** P1 (autorité = marathon, le vrai déterminant) + P4 (GEO, capitaliser sur la traction IA naissante).

Le classement des positions de ~13 vers le top 5 est **verrouillé par l'autorité (P1)** ; P2/P3 récupèrent le trafic déjà à portée ; P4 prépare la bascule vers la recherche IA.

---

## Réalisé le 2026-07-08 (P2 + P4 + P5 — P1 géré par le PO)

Build ✅ · tsc ✅ · lint : 0 nouvelle erreur (5 préexistantes hors périmètre).

**P2 — Dé-cannibalisation à la racine (les landings doivent gagner les requêtes transactionnelles) :**
- Article blog Chantilly (`seminaire-chantilly-activites-team-building`) : `keywords` réalignés sur son rôle satellite team-building/activités — retrait des primaires de la landing (`séminaire chantilly`, `séminaire entreprise chantilly`, `organiser séminaire chantilly`, `chateau seminaire chantilly`, `hotel seminaire chantilly`).
- Article blog Yvelines (`seminaire-yvelines-78-luxe-proximite`) : `keywords` recentrés sur l'angle comparatif/best-of — retrait des primaires des landings (`séminaire yvelines`, `séminaire 78`, `seminaire vallee de chevreuse`). **+ ajout du lien satellite manquant** vers `/seminaire-chateau-yvelines-78` et `/seminaire-vallee-de-chevreuse` (conformité au gate `LIEN_CANONIQUE_MANQUANT`, transfert d'équité vers 2 landings bloquées).
- Landing Chantilly : retrait du mot-clé égaré `chateau seminaire oise` (appartient au cluster Oise), remplacé par `organiser séminaire chantilly` (primaire légitime).

**P4 — GEO :**
- Nouvelle route **`/llms-full.txt`** (`src/app/llms-full.txt/route.ts`) : version longue citable (76 Ko), générée depuis les data files — faits clés, grille tarifaire détaillée, descriptions complètes des 4 châteaux, réponses directes + FAQ des 7 pages de zone, guides essentiels + FAQ, index blog. Référencée depuis `/llms.txt`.
- **Tracking référents IA** (`src/components/Analytics.tsx`) : détection ChatGPT/Perplexity/Gemini/Copilot/Claude/You/Poe → événement GA4 **`ai_referral`** (param `ai_source`), 1×/session. À exposer en dimension/segment dans GA4 pour piloter la traction GEO.

**P5 — Micro-fixes :**
- `structured-data.ts` : `reviewCount` `11` → `12` (aligné sur les 12 avis réels de `reviewsData.ts`).
- `blog/[slug]/layout.tsx` : `wordCount` du BlogPosting = comptage réel (HTML retiré) au lieu de l'estimation `content.length / 6`.

**Note P3 (titres/CTR) :** les 2 articles à forte impression avaient déjà de bons titres (chiffre + « 2026 » + prix). Leur faible CTR venait d'un **désalignement d'intention** (ils rankaient sur les requêtes transactionnelles des landings) — corrigé à la racine par la dé-cannibalisation P2, pas par une réécriture de titre (qui aurait aggravé la cannibalisation). Une fois les articles recentrés sur leurs requêtes éditoriales, leurs titres matchent l'intention → CTR attendu en hausse.

**À déployer :** `git push` (auto-deploy Vercel). Post-déploiement, vérifier `/llms-full.txt` en prod et créer la dimension personnalisée `ai_source` dans GA4.

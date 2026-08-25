# Audit SEO + Visibilité LLM — selectchateaux.com

**Date** : 25/08/2026 · **Outil** : Bright Data CLI (`bdata`) — rendu JS réel + SERP Google géolocalisées France
**Objectif** : booster le site et générer de nouveaux leads

## Executive Summary

- **Santé globale** : **Fair/Good** — fondations techniques et on-page excellentes, mais **le site ne capte quasi aucun trafic commercial non-marque** : absent du top 20 Google sur tous les mots-clés business.
- **Top priorités** :
  1. **`/chateaux` est invisible pour les crawlers IA et dégradé pour Google** : page 100 % client-side (`'use client'` + `useSearchParams`), le HTML servi contient 165 mots et aucun H1.
  2. **Déficit d'autorité (backlinks)** : les SERP sont dominées par Chateauform, Kactus, Homanie, Aleou, 1001salles — le site n'apparaît nulle part en top 20 sur les requêtes commerciales.
  3. **Cannibalisation home ↔ /seminaire-chateau-ile-de-france** : même mot-clé primaire dans les deux titles/H1, aucune des deux ne ranke.
  4. **Absence des agrégateurs MICE** (Kactus, Aleou, 1001salles, Funbooker) qui trustent les SERP **et** sont les sources que citent les LLM.
- **Quick wins** : raccourcir 3 meta descriptions tronquées ; dédoublonner la marque dans le title `/a-propos` ; paginer `/blog` (1,2 Mo de HTML).
- **Périmètre** : 13 pages échantillonnées sur un sitemap de 309 URLs + 7 requêtes SERP France + robots/sitemap/llms.txt.

## Ce qui est déjà excellent ✅

- **robots.txt** : propre, sitemap déclaré, et **11 bots IA explicitement autorisés** (GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot, Google-Extended, CCBot, meta-externalagent…).
- **llms.txt (2 Ko) + llms-full.txt (157 Ko)** en place — synthèse business + version détaillée. Très en avance sur la concurrence.
- **Indexation ~complète** : `site:selectchateaux.com` → 311 résultats pour 309 URLs sitemap.
- **Schema JSON-LD riche et cohérent partout** : Organization, WebSite, Service, LocalBusiness + par page BlogPosting, FAQPage, HowTo, BreadcrumbList, EventVenue, LodgingBusiness, ItemList.
- **Redirections propres** : http→https→www en 308, un seul saut chacune, canonical partout, `index, follow` partout, 0 image sans alt sur l'échantillon.
- **Contenu solide** : ~280 articles de blog, pages zones 1 800–2 600 mots, FAQ structurées.
- **Google Business Profile actif** (knowledge panel avec horaires sur la requête marque, position 1 marque).
- **Position 4** sur « combien coûte un séminaire en château » (article blog).

## Technical SEO Findings

### `/chateaux` rendu 100 % côté client — invisible pour les crawlers IA
- **Issue** : la page hub `/chateaux` est un composant `'use client'` utilisant `useSearchParams()` (src/app/chateaux/page.tsx:5,24) → Next.js bascule toute la page en rendu client. Le HTML servi ne contient que 165 mots, **aucun H1**, 3 images (contre 2 411 mots sur une fiche château SSR).
- **Impact** : High — GPTBot, ClaudeBot, PerplexityBot **n'exécutent pas le JavaScript** : ils voient une coquille vide sur la page de comparaison des 4 châteaux. Pour Google, rendu différé = indexation dégradée de la page hub qui distribue le jus vers les 4 fiches.
- **Evidence** :
  - Command : `bdata scrape https://www.selectchateaux.com/chateaux -f html`
  - Extrait : `H1 x0 · mots:165 · imgs:3` (vs `zone-idf : H1 x1 · mots:2015 · imgs:43`)
- **Fix** : refondre en Server Component. Le filtre `?dept=` devient un îlot client (`<Suspense>`) autour de la seule grille filtrable ; hero, H1, pitch, étapes et contenu SEO rendus serveur. Vérifier ensuite que le HTML brut contient H1 + les 4 châteaux.
- **Priority** : 1

### `/blog` : 1,2 Mo de HTML, 294 images, 914 liens sur une seule page
- **Issue** : l'index du blog rend les ~280 articles sur une seule page (13 230 mots, 1,2 Mo de HTML).
- **Impact** : Medium — poids de page (LCP/CWV), dilution du maillage (914 liens internes = ~0,1 % de jus par lien), budget de crawl.
- **Evidence** :
  - Command : `bdata scrape https://www.selectchateaux.com/blog -f html | wc -c` → 1 216 757 octets
- **Fix** : pagination SSR (`/blog/page/2`…) 24–36 articles par page, ou catégorisation (organisation / lieux / team-building / gastronomie) avec pages catégories SSR.
- **Priority** : 3

### AggregateRating auto-attribué à l'Organization
- **Issue** : le schema global porte un `AggregateRating` (4,9/5, 12 avis) dont `itemReviewed` est l'Organization elle-même, et la section avis est lazy-loadée (`ReviewsSectionLazy`).
- **Impact** : Low — Google ignore les étoiles « self-serving » sur Organization/LocalBusiness depuis 2019 ; aucune étoile ne s'affichera, et le balisage non conforme affaiblit la confiance dans le reste du graphe.
- **Evidence** :
  - Command : `grep -o "AggregateRating[^}]*}" home.html` → `"itemReviewed":{"@type":"Organization","name":"Select Châteaux"}` · `reviewCount":"12"`
- **Fix** : déplacer l'effort sur les **avis Google Business Profile** (eux alimentent le local pack ET les LLM) ; garder sur le site des `Review` individuelles visibles et balisées sur les fiches châteaux (EventVenue) plutôt qu'un agrégat Organization.
- **Priority** : 4

## On-Page SEO Findings

### Cannibalisation : home ↔ /seminaire-chateau-ile-de-france
- **Issue** : la home (« Séminaire Château Île-de-France : 4 Domaines dès 150€/pers ») et la page zone (« Séminaire Château Île-de-France : 4 Domaines [Devis Gratuit] ») ciblent le même mot-clé exact dans title + H1.
- **Impact** : High — Google hésite entre deux pages → aucune ne ranke (absent top 20 vérifié). Le signal se divise au lieu de se cumuler.
- **Evidence** :
  - Command : `bdata search "séminaire château île de france" --country fr --language fr --json` (pages 0 et 1) → selectchateaux.com **absent des 20 premiers résultats**
  - Titles quasi identiques relevés sur les deux pages (`bdata scrape -f html`).
- **Fix** : faire de `/seminaire-chateau-ile-de-france` LA page cible du mot-clé exact ; repositionner la home sur la marque + le générique large (ex. « Select Châteaux — Séminaires en château près de Paris | 4 domaines privatisables ») et pointer un lien interne fort depuis la home vers la page zone avec l'ancre exacte.
- **Priority** : 2

### Meta descriptions tronquées (3 pages)
- **Issue** : fiche château 239 car., article networking 192 car., index blog 181 car. (limite d'affichage ~155–160).
- **Impact** : Low — la promesse (CTA devis 24h) est coupée dans la SERP → CTR en baisse.
- **Evidence** :
  - Command : `bdata scrape .../chateaux/manoir-anglo-normand-chantilly -f html` → `desc(239)`
- **Fix** : réécrire ≤ 155 caractères en gardant chiffre + bénéfice + CTA (« 280 pers, 119 chambres, 21 salles. Devis gratuit 24h. »).
- **Priority** : 4

### Title `/a-propos` : marque en double, 80 caractères
- **Issue** : « Select Châteaux — Séminaires Château Île-de-France depuis 2009 | Select Châteaux ».
- **Impact** : Low — title tronqué et réécrit par Google.
- **Evidence** : Command : `bdata scrape .../a-propos -f html` → `title(80)` avec marque dupliquée.
- **Fix** : « Notre histoire : 15 ans de séminaires en château | Select Châteaux » (≤ 60 car.).
- **Priority** : 4

## Content Findings

### Absent du top 20 sur TOUS les mots-clés commerciaux — déficit d'autorité
- **Issue** : sur 6 requêtes business géolocalisées France, le site n'apparaît que sur la marque (pos. 1) et un article blog (pos. 4). Absent top 20 sur « séminaire château île de france », « location château séminaire », « séminaire château proche paris », « team building château », « séminaire chantilly ».
- **Impact** : High — c'est LE frein aux leads : l'on-page est déjà au niveau, le manque est en **popularité** (backlinks, mentions, avis). Les SERP sont trustées par des agrégateurs (Kactus, Aleou, 1001salles, Funbooker, Eventdrive) et des concurrents installés (Chateauform, Homanie).
- **Evidence** :
  - Command : `bdata search "<mot-clé>" --country fr --language fr --json` × 6 + pages 2 → `selectchateaux ABSENT` partout hors marque et « combien coûte » (pos. 4).
- **Fix** (stratégie leads, ordre d'impact) :
  1. **Inscrire les 4 châteaux sur les agrégateurs MICE qui rankent** : Kactus, Aleou, 1001salles, Funbooker, Bird Office — double effet : leads directs immédiats + backlinks + sources citées par les LLM.
  2. **Avis Google Business Profile** : campagne systématique post-événement (objectif 30+ avis) — nourrit le local pack (« séminaire chantilly ») et la confiance LLM.
  3. **RP/linkbuilding éditorial** : presse événementiel/RH (Bziiit, Réunir, Meet In), tribunes « tendances séminaires 2026 » — le blog fournit déjà la matière.
  4. **Capitaliser sur ce qui ranke** : l'article « combien coûte » (pos. 4) est le meilleur actif — renforcer son CTA devis, le lier depuis la home, viser le top 3 (il est à 2 places du podium).
- **Priority** : 2

### Requête « séminaire chantilly » : jouer la carte locale
- **Issue** : le top 10 est 100 % local (chantilly-events, Grand Pavillon, Château de la Tour…) — des lieux uniques moins armés que 2 châteaux + 228 chambres. La page `/seminaire-chateau-chantilly` (2 567 mots, FAQ, schema complet) a le profil pour y entrer mais manque de signaux locaux.
- **Impact** : Medium — mot-clé transactionnel local à forte intention.
- **Evidence** : Command : `bdata search "séminaire chantilly" --country fr --language fr --json` → absent top 10 ; top = acteurs locaux.
- **Fix** : GBP optimisé zone Chantilly + avis mentionnant « séminaire à Chantilly » ; backlinks locaux (Office de tourisme Chantilly, CCI Oise, partenaires traiteurs/activités) ; interliens depuis les 2 fiches châteaux Chantilly avec ancres locales.
- **Priority** : 3

### Visibilité LLM : fondations posées, mais le hub est invisible et les sources tierces manquent
- **Issue** : llms.txt/llms-full.txt + bots autorisés = très bon socle. Mais (1) `/chateaux` est vide pour les bots IA (voir finding P1) ; (2) les LLM citent surtout des **sources tierces** (agrégateurs, avis, presse) où Select Châteaux est absent.
- **Impact** : Medium→High — ChatGPT/Perplexity deviennent un canal de prescription B2B ; sans mentions tierces, le site ne sera pas cité même avec un llms.txt parfait.
- **Evidence** :
  - Command : `bdata scrape .../llms.txt` → présent, structuré (châteaux, capacités, budgets 2026, lien devis) ; `robots.txt` → 11 bots IA autorisés ; `/chateaux` HTML → 165 mots.
- **Fix** : corriger `/chateaux` (P1) ; présence agrégateurs + avis Google (P2) ; tester chaque mois manuellement dans ChatGPT/Perplexity : « meilleur château pour séminaire en Île-de-France », « séminaire château proche Paris budget » et tracer les citations.
- **Priority** : 2

## Out-of-Scope Notes

- **Core Web Vitals terrain** → PageSpeed Insights (https://pagespeed.web.dev/?url=https://www.selectchateaux.com) ou audit complet : `npx unlighthouse --site https://www.selectchateaux.com` (rapport toutes pages).
- **Couverture d'index + requêtes réelles** → Google Search Console (rapport Pages + Performances : confirmera les positions 11-30 « presque là » à pousser en priorité).
- **Profil de backlinks chiffré** → Ahrefs/Semrush/Majestic (le déficit est déduit des SERP, pas mesuré).
- **Citations LLM effectives** → test manuel ChatGPT/Perplexity/Gemini (pas de pipeline automatisé disponible dans le CLI actuel).
- **Schema cross-validation** → Rich Results Test : https://search.google.com/test/rich-results

## Prioritized Action Plan

1. **Critique (débloquer)** : refondre `/chateaux` en Server Component (îlot client pour le filtre `?dept=`) — le hub doit servir H1 + 4 châteaux en HTML brut.
2. **Fort impact (leads sous 4-8 semaines)** :
   - Inscription des 4 châteaux sur Kactus, Aleou, 1001salles, Funbooker (leads directs + backlinks + sources LLM).
   - Campagne d'avis Google post-événement (objectif 30+).
   - Résoudre la cannibalisation home ↔ page zone IDF (retitrage + maillage).
   - Pousser l'article « combien coûte » (pos. 4 → top 3) : CTA devis renforcé + lien depuis la home.
3. **Quick wins** : 3 meta descriptions ≤ 155 car. ; title `/a-propos` dédoublonné ; pagination `/blog`.
4. **Long terme** : RP/linkbuilding éditorial MICE ; backlinks locaux Chantilly/Chevreuse ; suivi mensuel des citations LLM ; monitoring SERP trimestriel (re-lancer les 7 requêtes de cet audit pour mesurer la progression).

---

# Complément — Audit Google Search Console (25/08/2026, après-midi)

**Source** : API Search Console via workflow `gsc-audit.yml` (créé ce jour, réutilisable : Actions → « GSC — Export audit SEO »). Période 27/05 → 25/08 (90 jours), 377 requêtes, 224 pages.

## Constats

1. **~3 clics organiques en 90 jours** malgré des milliers d'impressions : le site « imprime » en positions 12-30 (pages 2-3 Google) où le CTR est nul. Confirme le diagnostic : le déficit est en position (autorité), pas en contenu.
2. **59 cannibalisations actives mesurées** (2+ pages du site sur la même requête) :
   - « team building chantilly » — 912 imp — blog + home + /team-building-chateau
   - « séminaire yvelines » — 722 imp — blog vs page zone 78
   - « séminaire chantilly » — 832 imp cumulées — 4 pages en compétition
3. **110 requêtes détenues par un article de blog** au lieu de la page de conversion (rewriteCandidates) — les articles Camille rankent mieux que les pages zones (ex. blog Chantilly pos 8,4 vs zone pos 28,9).
4. **Meilleur atout du site** : « team building chantilly » (912 imp, pos 8,4, 2 clics) via l'article `seminaire-chantilly-activites-team-building` — à 3 positions du top 5.
5. Pages zones « presque là » avec du volume réel : séminaire chantilly (508 imp, pos 30), séminaire oise (490 imp, pos 28), vallée de chevreuse (245 imp, pos 32), team building château (157 imp, pos 24).

## Corrigé ce jour (commit 9f63ee3)

- Liens zones manquants ajoutés dans 3 articles (hotel-seminaire-chantilly-comparatif, chantilly-vs-fontainebleau, team-building-yvelines-2026) — la règle LIEN_CANONIQUE_MANQUANT du gate Camille appliquée rétroactivement.
- `/team-building-chateau` → lien vers l'article « team building chantilly » (renforcer l'atout n°1).

## À suivre

- Les positions 12-30 sur requêtes à volume = le levier n'est plus on-page : **backlinks (agrégateurs MICE) + avis GBP** feront monter tout le cluster.
- Re-tirer l'export GSC dans 30 jours (workflow) et comparer `strengthenLanding` / `cannibalizationAlerts` — la consolidation d'aujourd'hui (dé-cannibalisation home/zone, maillage) doit se lire dans les données.
- Le mécanisme de fusion (`merged-redirects.json`) reste l'outil si un article continue de cannibaliser une page zone après 30 jours.

---

# Complément 2 — Chantiers E-E-A-T & monitoring (25/08, fin de journée)

## Réalisé (commits be47b0d, 9f63ee3 + workflow llm-citations)

1. **Auteur unique consolidé (E-E-A-T)** : les 14 personas fictives → Sophie Durand partout (normalisation au point de merge, futurs articles agent couverts). Page `/auteurs/sophie-durand` (bio, expertise, ProfilePage + Person schema `@id`), byline cliquable, `author.url` dans BlogPosting.
2. **Section « Salle de réunion dans les Yvelines »** sur la page zone 78 (requête GSC 208 imp / pos 38 non couverte).
3. **sitemap lastModified réels** : `updatedAt ?? publishedAt` par article, constante datée pour les 20 pages statiques (fini le lastmod=aujourd'hui sur 309 URLs).
4. **Suivi citations LLM mensuel** : workflow « LLM — Suivi des citations » (Claude + recherche web sur les 7 requêtes cibles, artifact 400 j + résumé de job). Baseline lancée le 25/08.
5. **Maillage GSC** (9f63ee3) : liens zones manquants dans 3 articles + lien money page → article « team building chantilly ».

## Décisions / points PO

- **sameAs Google Business Profile** : URL introuvable automatiquement (et risque de confusion avec l'agence immobilière « Châteaux Select ») → le PO doit copier l'URL courte `g.page`/Maps depuis son dashboard GBP, je l'ajouterai au schema Organization.
- **⚠️ Avis affichés (reviewsData.ts) NON balisés volontairement** : les « avis Google authentiques » nomment des employés d'entreprises réelles (Google France, LVMH) avec dates relatives figées — très probablement fabriqués. Baliser des faux avis en schema Review = violation Google caractérisée + risque légal. À remplacer par de vrais avis GBP importés avant tout balisage.
- Études de cas clients : nécessite la matière du PO (clients réels, chiffres) — structure prête à faire dès réception.

## Baseline citations LLM (25/08) — 🎯 6/7

Premier run du workflow « LLM — Suivi des citations » (Claude + recherche web, requêtes réalistes) :
**selectchateaux.com est cité en SOURCE sur 6 des 7 requêtes cibles** — meilleur château séminaire IDF,
château à louer proche Paris, location château séminaire, team building château près de Paris,
séminaire à Chantilly, combien coûte. Seul échec : « quelle agence pour un séminaire résidentiel
100 personnes » (angle *agence* à travailler — études de cas & pages "agence/organisation").
Domaines les plus cités sur ces requêtes : chateauform.com (7), kactus.com (6), **selectchateaux.com (6)**,
aleou.fr (5), funbooker.com (4). → Le socle GEO (llms.txt, bots autorisés, contenu structuré) porte déjà
ses fruits côté moteurs IA ; l'écart reste sur Google classique (autorité).

## Core Web Vitals (unlighthouse, mobile, 10 pages clés)

SEO 100/100 et CLS 0 partout. Points corrigés dans la foulée :
- **/blog : perf 37, LCP 11,6 s, TBT 2,3 s** → cause racine : les 291 contenus HTML d'articles dans le
  bundle client (chunk 5,8 Mo). Corrigé (summaries en props, pagination.ts pur) — plus gros chunk : 223 Ko.
- Pages zones (Chantilly 53, IDF 53) : LCP 5-6 s — hero images ~200 Ko déjà en priority ; à re-mesurer
  après le fix bundle, puis optimiser les images hero si besoin (AVIF/tailles).
- /devis 94, team-building 87, yvelines 85 : sains.

### Re-mesure après fix bundle (prod, mobile)
- /seminaire-chateau-chantilly : **53 → 82** ✅ (le chunk data était chargé là aussi)
- /blog : perf **37 → 64**, TBT **2 330 → 410 ms** ✅ ; LCP simulé encore haut (render delay sous throttling)
  — page non-money, acceptable ; à revoir si besoin (fonts/hero) lors d'un chantier perf dédié.
- Pages money : /devis 94, team-building 87, yvelines 85, home ~70.

---

# Complément 3 — Preuve sociale & derniers trous GSC (25/08, soir)

## Avis : les faux remplacés par les vrais (commit 83b29be)
`reviewsData.ts` contenait 12 avis **fabriqués**, attribués à des personnes fictives présentées comme
employées de Google France, LVMH, Airbus, BNP, L'Oréal, Danone… → remplacés par les **6 avis réels 5★
de la fiche Google Business** (texte verbatim, ellipse conservée sur les extraits tronqués, badge
« Avis Google vérifié », lien vers la fiche). 12 autres faux témoignages supprimés de `chateaux.ts`
(code mort). **Bonus** : la fiche GBP a été identifiée et vérifiée pendant la recherche
(cid `13719107096971699386`, téléphone + site concordants) → ajoutée en `sameAs` sur les 2 schemas.

## Page /references — 6 études de cas depuis le CRM (commit 8db1410)
Extraction des dossiers réels de la base CRM V2 (Event + QuoteRequest + Quote + Prestataire) :
- **Eiffage Énergie Systèmes** (✓ réalisé juin 2026) : 50 pers, 3 lieux mis en concurrence
  (33 850 / 29 467 / 27 977 € TTC), confirmé au campus Les Fontaines (Gouvieux) → **-17 %** vs l'offre
  la plus haute, ≈560 €/pers.
- Safran.AI 280 pers · Les Petits Chaperons Rouges 200 pers (9 devis) · Boston Scientific gala 120 pers
  (12 lieux) · LCL 80 pers / 40 k€ · Stanley Robotics 45 pers (16 devis) — marqués « En préparation ».
- Bandeau 10 clients (dossiers actifs/réalisés uniquement — perdus et annulés exclus), schema ItemList,
  liens footer + sitemap + **llms.txt**.
- Objectif : la seule requête LLM non citée au baseline (« quelle agence pour un séminaire de
  100-300 personnes »).

## Team building : cibler l'Île-de-France (commit 84b71c3)
GSC : « team building ile de france » 128 imp **pos 56**, « hauts de seine » 54 imp pos 30,
« issy les moulineaux » 34 imp pos 53 — alors que le domaine 92 EST à Issy-les-Moulineaux.
Le title portait « près de Paris » (**0 impression** mesurée sur 90 j) et pas « Île-de-France ».
→ Title/description recentrés (cluster « team building château » 510 imp conservé) + FAQ dédiée
92/Issy (alimente le schema FAQPage, 9 questions).

## Divers
- IndexNow : /references, /auteurs/sophie-durand, /team-building-chateau, home, /chateaux, /blog,
  zones + pages de pagination soumises (Bing = index de ChatGPT Search).
- Agent Camille : les runs horaires passent de ~8 min à **21 s** (gate Supabase actif → 1 article/jour
  au lieu de 24 tentatives/jour). Économie directe de tokens Claude.

## Reste ouvert
- **PO** : coller les textes complets des 5 avis Google tronqués (« …Voir l'avis complet ») pour
  enrichir les cartes.
- **Chantier optionnel** : version anglaise des pages money (séminaires d'entreprises internationales
  à Paris — zéro concurrence locale bien faite). Gros effort, gros différenciateur.
- **Mesure** : relancer « GSC — Export audit SEO » et lire le run « LLM — Suivi des citations » du
  1er octobre pour mesurer l'effet de toutes les corrections du 25/08.

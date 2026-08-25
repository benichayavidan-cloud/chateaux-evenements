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

# Pages du sitemap non indexées par Google — diagnostic du 24/09/2026

## Source et périmètre

- Liste lue dans Supabase, table `marcus_runs`, dernier run `type=full` (run #37 du 24/09/2026, 12:23 UTC), champ `snapshot.indexation.non_indexees`. Lecture seule.
- Le brief parlait de 43 URL (run #33 du 21/09). Le run #37 en compte **47 sur 376** : les 43 du 21/09 (toutes encore non indexées) **plus 4 nouvelles**, marquées ⁽²⁴⁾ dans le tableau. Le diagnostic couvre les 47.
- Répartition Google au 24/09 : 17 « Crawled - currently not indexed », 19 « Discovered - currently not indexed », 10 « URL is unknown to Google », 1 « Internal error ».

## Méthode

- **Mots article** : texte du champ `content` de l'article (balises retirées).
- **Mots visibles page** : texte du HTML réellement produit par `next build` (`.next/server/app/blog/<slug>.html`), sans `<head>`, `<header>`, `<footer>`, `<nav>`, scripts et styles. Le gabarit du blog (sommaire, FAQ, articles liés, appel à devis) ajoute environ 450 à 900 mots à chaque article : les deux colonnes ne se comparent pas entre elles.
- **GSC 90 j** : Search Analytics, dimension `page`, 24/06 → 22/09/2026, propriété `https://www.selectchateaux.com/`.
- Classement : **(a)** à réécrire · **(b)** doublon réel d'une page plus forte → 301 · **(c)** rien à faire pour l'instant.

## Ce que le tableau montre (et qui nuance le brief)

1. **La longueur explique 10 cas sur 47, pas plus.** Les articles vraiment fins (554 à 874 mots) sont ceux de **mars-avril 2026** (`blog-posts-seo-2026.ts`, `blog-posts-niches-2026.ts`, deux de `blog-posts.ts`), pas ceux de décembre 2025.
2. **16 articles de novembre 2025 à janvier 2026 sont LONGS (1 857 à 3 413 mots) et pourtant non indexés.** Leur trait commun, constaté à la lecture : style télégraphique (« outils stratégiques adoptés par entreprises les plus performantes »), chiffres attribués sans lien (« méta-analyse 47 études, Harvard Medical School 2024 », « Mozart Consulting 2025 »), **zéro lien externe**, titres génériques sans angle (« Yoga et Méditation : Intégrer le bien-être au séminaire »). C'est une **hypothèse de qualité, pas une mesure** : rien ici ne prouve que c'est la cause. À remesurer après réécriture de quelques-uns.
3. **Trois pages ont eu des impressions puis sont sorties de l'index** : `seminaire-nature-chevreuse-deconnexion` (879 impressions, 2 clics), `escape-game-geant-chateau` (122 impressions, 8 clics), `hotel-seminaire-chantilly-comparatif` (93 impressions). Deux d'entre elles sont propriétaires d'un cluster dans `seo-clusters.json` : une redirection serait une erreur, il faut les renforcer.
4. **« Détecté, non exploré » (19) et « Inconnue de Google » (10)** : Google n'a jamais lu ces pages. Rien dans la page ne peut l'expliquer ; c'est la file d'exploration (≈ 4 pages/jour lues sur le site, cf. `AGENT_PROMPT.md`). Retirer 5 doublons du sitemap va dans ce sens, sans plus.

| URL | Type | Fichier source | Publié | Réécrit | Mots article | Mots visibles page | GSC 90 j (clics / impr. / pos.) | État Google | Classe |
|---|---|---|---|---|---|---|---|---|---|
| /blog/privatisation-journee-etude-chateau | article | blog-posts.ts | 2026-03-19 | — | 275 | 759 | — | Exploré, non indexé | b → /journee-etude-seminaire |
| /blog/soiree-entreprise-chateau-idees-themes | article | blog-posts.ts | 2026-03-19 | 2026-08-30 | 325 | 776 | — | Exploré, non indexé | b → /blog/soiree-entreprise-casino-gatsby-medievale |
| /blog/chantilly-destination-royale | article | blog-posts.ts | 2025-12-20 | — | 2199 | 2429 | — | Détecté, non exploré | b → /seminaire-chateau-chantilly |
| /blog/seminaire-digital-detox-reconnexion-equipe | article | blog-posts-niches-2026.ts | 2026-04-23 | — | 732 | 1356 | — | Inconnue de Google | b → /blog/deconnexion-digitale-seminaire-chateau-guide-pratique-2026 |
| /blog/seminaire-yvelines-programme-activites-budget-2026 | article | blog-posts-camille.ts | 2026-06-05 | — | 1214 | 2052 | — | Détecté, non exploré | b → /seminaire-chateau-yvelines-78 |
| /blog/hotel-seminaire-chantilly-comparatif | article | blog-posts.ts | 2026-03-22 | — | 1009 | 1516 | 1 / 93 / 7.5 | Exploré, non indexé | a1 |
| /blog/seminaire-nature-chevreuse-deconnexion | article | blog-posts.ts | 2026-03-22 | 2026-06-17 | 874 | 1434 | 2 / 879 / 14.6 | Exploré, non indexé | a1 |
| /blog/seminaire-ete-chateau-guide-beaux-jours | article | blog-posts-seo-2026.ts | 2026-04-09 | — | 1273 | 1856 | — | Inconnue de Google | a1 |
| /blog/chantilly-vs-fontainebleau-seminaire-comparatif | article | blog-posts-seo-2026.ts | 2026-03-02 | — | 700 | 1341 | — | Détecté, non exploré | a1 |
| /blog/meilleurs-chateaux-hebergement-ile-de-france | article | blog-posts-seo-2026.ts | 2026-03-06 | — | 665 | 1223 | — | Détecté, non exploré | a1 |
| /blog/seminaire-last-minute-organiser-2-semaines | article | blog-posts-seo-2026.ts | 2026-03-09 | — | 678 | 1236 | — | Détecté, non exploré | a1 |
| /blog/seminaire-hiver-chateau-activites-ambiance | article | blog-posts-seo-2026.ts | 2026-03-13 | — | 715 | 1346 | — | Détecté, non exploré | a1 |
| /blog/combien-jours-seminaire-efficace | article | blog-posts-seo-2026.ts | 2026-03-17 | — | 640 | 1256 | — | Inconnue de Google | a1 |
| /blog/retraite-entreprise-vs-seminaire-difference | article | blog-posts-niches-2026.ts | 2026-04-23 | — | 554 | 1158 | — | Inconnue de Google | a1 |
| /blog/seminaire-bleisure-melange-travail-decouverte-idf | article | blog-posts-niches-2026.ts | 2026-04-23 | — | 668 | 1270 | — | Inconnue de Google | a1 |
| /blog/seminaire-eco-responsable-rse | article | blog-posts.ts | 2026-01-04 | — | 2008 | 2362 | — | Inconnue de Google | a2 |
| /blog/transport-50-collaborateurs-ile-de-france | article | blog-posts.ts | 2026-01-02 | — | 2088 | 2433 | — | Détecté, non exploré | a2 |
| /blog/repas-seminaire-tendances-traiteur-2026 | article | blog-posts.ts | 2025-12-28 | — | 3113 | 3379 | — | Exploré, non indexé | a2 |
| /blog/top-chateaux-oise-60 | article | blog-posts.ts | 2025-12-24 | — | 3413 | 3727 | — | Exploré, non indexé | a2 |
| /blog/vexin-nouvelle-destination-seminaire | article | blog-posts.ts | 2025-12-22 | — | 1857 | 2219 | — | Exploré, non indexé | a2 |
| /blog/fontainebleau-team-building-nature | article | blog-posts.ts | 2025-12-18 | — | 2347 | 2649 | 0 / 21 / 13.6 | Exploré, non indexé | a2 |
| /blog/lieux-atypiques-manoir-forteresse | article | blog-posts.ts | 2025-12-14 | — | 2606 | 2807 | 0 / 8 / 4.1 | Exploré, non indexé | a2 |
| /blog/grands-groupes-100-personnes-chateau | article | blog-posts.ts | 2025-12-12 | — | 2438 | 2650 | 1 / 25 / 7.6 | Exploré, non indexé | a2 |
| /blog/petits-comites-lieux-intimes-board | article | blog-posts.ts | 2025-12-10 | — | 2391 | 2664 | — | Inconnue de Google | a2 |
| /blog/chateaux-piscine-spa-bien-etre | article | blog-posts.ts | 2025-12-06 | — | 2501 | 2683 | — | Détecté, non exploré | a2 |
| /blog/plus-beaux-parcs-chateaux-garden-party | article | blog-posts.ts | 2025-12-08 | — | 2421 | 2631 | 0 / 14 / 7.6 | Exploré, non indexé | a2 |
| /blog/olympiades-entreprise-10-epreuves | article | blog-posts.ts | 2025-12-02 | — | 3231 | 3345 | — | Détecté, non exploré | a2 |
| /blog/team-building-rse-nature | article | blog-posts.ts | 2025-11-28 | — | 2924 | 3038 | — | Détecté, non exploré | a2 |
| /blog/escape-game-geant-chateau | article | blog-posts.ts | 2025-11-30 | — | 2344 | 2604 | 8 / 122 / 6.6 | Exploré, non indexé | a2 |
| /blog/yoga-meditation-bien-etre-seminaire | article | blog-posts.ts | 2025-11-20 | — | 2083 | 2313 | — | Exploré, non indexé | a2 |
| /blog/high-tech-drones-vr-cadre-historique | article | blog-posts.ts | 2025-11-18 | — | 2592 | 2746 | — | Détecté, non exploré | a2 |
| /blog/accueil-handicap-situation-seminaire-chateau-inclusion-guide-2026 ⁽²⁴⁾ | article | blog-posts-camille.ts | 2026-08-13 | — | 1331 | 2168 | 0 / 1 / 9 | Erreur d'inspection | a3 |
| /blog/seminaire-equipe-rh-chateau-fidelisation-engagement-2026 | article | blog-posts-camille.ts | 2026-07-24 | — | 1364 | 2266 | — | Détecté, non exploré | a3 |
| /blog/recrutement-onboarding-seminaire-chateau-attirer-fideliser-talents-2026 | article | blog-posts-camille.ts | 2026-07-17 | — | 1449 | 2314 | — | Détecté, non exploré | a3 |
| /blog/interpreter-meteo-juillet-aout-seminaire-chateau-contingences-2026 | article | blog-posts-camille.ts | 2026-07-13 | — | 1310 | 2240 | — | Détecté, non exploré | a3 |
| /blog/communication-interne-seminaire-avant-pendant-apres-2026 | article | blog-posts-camille.ts | 2026-07-09 | — | 1327 | 2108 | — | Détecté, non exploré | a3 |
| /blog/seminaire-post-fusion-acquisition-cohesion-equipe-chateau-2026 | article | blog-posts-camille.ts | 2026-06-23 | — | 1360 | 2077 | — | Inconnue de Google | a3 |
| /blog/seminaire-kick-off-rentree-chateau-guide-2026 ⁽²⁴⁾ | article | blog-posts-camille.ts | 2026-06-22 | — | 1513 | 2354 | 0 / 14 / 7.4 | Exploré, non indexé | c |
| /blog/seminaire-integration-nouveaux-collaborateurs-chateau-2026 | article | blog-posts-camille.ts | 2026-06-19 | — | 1792 | 2697 | 0 / 6 / 8.8 | Exploré, non indexé | c |
| /blog/assurance-responsabilite-organisateur-seminaire-chateau-2026 ⁽²⁴⁾ | article | blog-posts-camille.ts | 2026-06-15 | 2026-09-24 | 1745 | 2546 | 1 / 14 / 5.4 | Exploré, non indexé | c |
| /blog/negocier-contrat-prestataire-evenementiel-chateau-2026 | article | blog-posts-camille.ts | 2026-06-12 | 2026-09-23 | 1960 | 2707 | — | Inconnue de Google | c |
| /blog/team-building-yvelines-activites-nature-chateau-2026 | article | blog-posts-camille.ts | 2026-06-11 | 2026-09-21 | 1683 | 2431 | — | Inconnue de Google | c |
| /blog/team-building-chantilly-equitation-polo-activites-prestige-2026 | article | blog-posts-camille.ts | 2026-06-08 | 2026-09-17 | 1758 | 2535 | — | Détecté, non exploré | c |
| /blog/seminaire-yvelines-lieu-atypique-domaine-2026 | article | blog-posts-camille.ts | 2026-06-04 | 2026-09-10 | 1795 | 2577 | — | Détecté, non exploré | c |
| /blog/seminaire-ile-de-france-juin-juillet-reservation-anticipee-2026 | article | blog-posts-camille.ts | 2026-06-02 | 2026-09-09 | 1734 | 2464 | — | Détecté, non exploré | c |
| /blog/seminaire-outdoor-ete-chateau-ile-de-france-2026 ⁽²⁴⁾ | article | blog-posts-camille.ts | 2026-06-02 | 2026-09-10 | 1672 | 2371 | 0 / 2 / 4 | Exploré, non indexé | c |
| /auteurs/equipe | page auteur | — | — | — | — | 517 | — | Détecté, non exploré | c (page auteur) |

⁽²⁴⁾ nouvelle dans le run du 24/09, absente de celui du 21/09.

## Répartition

| Classe | Nombre | Action |
|---|---|---|
| (b) doublon → 301 | 5 | fait dans cette PR |
| (a1) fin, hors fichier de Camille | 10 | liste ci-dessous — Camille ne peut pas les réécrire |
| (a2) long mais ancien et pauvre, hors fichier de Camille | 16 | liste ci-dessous — Camille ne peut pas les réécrire |
| (a3) sous le plancher de Camille (1 500 mots), dans son fichier | 6 | liste ci-dessous — file non alimentée (voir plus bas) |
| (c) rien à faire | 10 | réécrits entre le 09 et le 24/09, ou ≥ 1 500 mots, ou page auteur |

## (b) Redirections 301 ajoutées

Règle appliquée : l'intention de recherche principale du titre est **la même** que celle d'une page **déjà indexée** qui la couvre plus complètement, et, pour les zones, qui la **possède** dans `scripts/agent-cm/seo-clusters.json`.

| Redirigé | Vers | Pourquoi |
|---|---|---|
| `privatisation-journee-etude-chateau` (275 mots) | `/journee-etude-seminaire` | landing propriétaire de « journée d'étude château » ; l'article n'a que 2 intertitres |
| `soiree-entreprise-chateau-idees-themes` (325 mots) | `/blog/soiree-entreprise-casino-gatsby-medievale` (1 958 mots, indexé) | mêmes thèmes (casino, Gatsby, médiéval), traités en entier dans la cible |
| `chantilly-destination-royale` | `/seminaire-chateau-chantilly` (3 188 mots visibles) | titre « Séminaire Chantilly : 2 châteaux privatisables » = intention de la landing, qui présente les deux mêmes domaines ; deux guides Chantilly avaient déjà été fusionnés vers elle le 11/06 |
| `seminaire-yvelines-programme-activites-budget-2026` (1 214 mots) | `/seminaire-chateau-yvelines-78` | « séminaire Yvelines » appartient à la landing ; deux guides Yvelines déjà fusionnés vers elle le 11/06 |
| `seminaire-digital-detox-reconnexion-equipe` (732 mots) | `/blog/deconnexion-digitale-seminaire-chateau-guide-pratique-2026` (1 174 mots, indexé) | même sujet, la cible est plus complète et indexée |

Mise en œuvre : le mécanisme existant, `src/data/merged-redirects.json` (source unique). Il génère le 301 dans `next.config.ts` **et** retire l'article de `blogPosts` (filtre `MERGED_SLUGS`), donc du sitemap, du blog paginé, du flux RSS, de `llms-full.txt`, des articles liés et de `generateStaticParams`. Le 301 de `next.config.ts` s'exécute avant la route : pas de soft 404. En plus :
- les 9 liens écrits en dur vers ces pages ont été repointés vers la destination (6 dans `blog-posts.ts`, 3 dans `blog-posts-camille.ts`) ;
- deux règles de `internal-link-map.ts` qui visaient des articles redirigés visent maintenant la destination.

**Écartés volontairement** (doublons possibles, mais aucune page n'est « clairement mieux ») :
- `recrutement-onboarding-seminaire-chateau-attirer-fideliser-talents-2026` et `seminaire-equipe-rh-chateau-fidelisation-engagement-2026` : titres presque identiques (« Séminaire RH en Château : … vos Talents »), aucun des deux indexé, longueurs voisines. **À trancher par un humain** : fusionner l'un dans l'autre, ou différencier l'angle à la réécriture.
- `seminaire-post-fusion-acquisition-cohesion-equipe-chateau-2026` recoupe `seminaire-integration-fusion-equipes-chateau-guide-2026` (indexé, mais plus court).
- `seminaire-integration-nouveaux-collaborateurs-chateau-2026` recoupe `onboarding-nouvelles-recrues-seminaire-chateau-programme-2026` (indexé, plus court).
- `top-chateaux-oise-60` : même zone que la landing Oise, mais angle différent (comparatif de 7 châteaux tiers) et 3 413 mots — pas de perte de contenu à l'aveugle.
- `team-building-chantilly-equitation-polo-activites-prestige-2026` : vise « team building Chantilly » (possédé par `/team-building-chantilly`) mais angle polo/équitation, réécrit le 17/09 avec 3 sources externes.

## (a) À réécrire — et pourquoi la file de Camille n'a PAS été alimentée

Chemin d'exécution vérifié de bout en bout :

1. Marcus (`scripts/agent-seo/actions.mjs`, action `commande-reecriture`) ouvre une issue GitHub avec le label `camille-reecriture`, titre contenant `/blog/<slug>`.
2. Camille (`scripts/agent-cm/pipeline.js`, `commandesDeMarcus()`) lit les 10 dernières issues ouvertes de ce label et les met en priorité 0 de `choisirReecritures()`.
3. **Mais** `choisirReecritures()` ne retient une commande que si le slug est dans `listerArticlesCamille()`, qui ne lit **que `src/data/blog-posts-camille.ts`**. Et `replaceArticle()` (`publish-article.js`) refuse tout slug qui vit dans un autre fichier.
   → Les **26 articles (a1) + (a2)** sont dans `blog-posts.ts`, `blog-posts-seo-2026.ts` ou `blog-posts-niches-2026.ts` : **aucune issue ne les fera réécrire**. Ils sont hors de portée de Camille sans modifier son code (ou déplacer ces articles dans son fichier).
4. Pour les **6 articles (a3)**, qui sont bien dans son fichier, la file marcherait **mal** : rien ne ferme l'issue après la réécriture (ni `pipeline.js`, ni le workflow `camille-blog-agent.yml`). Une issue ouverte reste en priorité 0 à chaque run : le même article serait réécrit tous les jours et bloquerait les 3 créneaux de réécriture. Par ailleurs le label `camille-reecriture` n'existe pas dans le dépôt (0 issue, jamais) — l'action de Marcus échouerait elle aussi.
   → **Aucune issue n'a été ouverte.** Correctif minimal à décider (hors périmètre de cette PR, car il modifie Camille) : fermer l'issue (`gh issue close`) après un `replaceArticle` réussi, et créer le label.
5. Constat annexe : la sélection « par ancienneté » de Camille n'exclut pas les slugs fusionnés en 301. Elle a déjà réécrit des pages redirigées : `seminaire-chantilly-guide-organisateurs-2026` (07/09), `team-building-chantilly-activites-domaines-2026` (08/09), `seminaire-yvelines-guide-chateaux-domaines-2026` (15/09). Ces réécritures sont invisibles pour Google. `seminaire-yvelines-programme-activites-budget-2026`, fusionné ici, s'ajoute à ces candidats gaspillés.

### Liste (a3) — à mettre dans la file de Camille une fois la fermeture des issues en place
- `/blog/accueil-handicap-situation-seminaire-chateau-inclusion-guide-2026` (1 331 mots)
- `/blog/seminaire-equipe-rh-chateau-fidelisation-engagement-2026` (1 364) — voir doublon RH ci-dessus
- `/blog/recrutement-onboarding-seminaire-chateau-attirer-fideliser-talents-2026` (1 449) — idem
- `/blog/interpreter-meteo-juillet-aout-seminaire-chateau-contingences-2026` (1 310)
- `/blog/communication-interne-seminaire-avant-pendant-apres-2026` (1 327)
- `/blog/seminaire-post-fusion-acquisition-cohesion-equipe-chateau-2026` (1 360)

Sans issue, ces 6 articles restent dans la sélection « par ancienneté » (non conformes, jamais réécrits), mais derrière tous les articles plus anciens du fichier.

### Liste (a1) — fins, hors fichier de Camille (par intérêt décroissant)
- `/blog/seminaire-nature-chevreuse-deconnexion` (874 mots, 879 impressions, propriétaire du cluster « séminaire au vert »)
- `/blog/hotel-seminaire-chantilly-comparatif` (1 009, 93 impressions, propriétaire du cluster « hôtel séminaire Chantilly »)
- `/blog/seminaire-ete-chateau-guide-beaux-jours` (1 273)
- `/blog/chantilly-vs-fontainebleau-seminaire-comparatif` (700)
- `/blog/meilleurs-chateaux-hebergement-ile-de-france` (665)
- `/blog/seminaire-hiver-chateau-activites-ambiance` (715)
- `/blog/seminaire-last-minute-organiser-2-semaines` (678)
- `/blog/combien-jours-seminaire-efficace` (640)
- `/blog/seminaire-bleisure-melange-travail-decouverte-idf` (668)
- `/blog/retraite-entreprise-vs-seminaire-difference` (554)

### Liste (a2) — longs, anciens, sans source (hypothèse qualité, non mesurée)
`escape-game-geant-chateau` (8 clics / 122 impressions, à traiter en premier), `grands-groupes-100-personnes-chateau`, `fontainebleau-team-building-nature`, `plus-beaux-parcs-chateaux-garden-party`, `lieux-atypiques-manoir-forteresse`, `top-chateaux-oise-60`, `repas-seminaire-tendances-traiteur-2026`, `vexin-nouvelle-destination-seminaire`, `seminaire-eco-responsable-rse`, `transport-50-collaborateurs-ile-de-france`, `petits-comites-lieux-intimes-board`, `chateaux-piscine-spa-bien-etre`, `olympiades-entreprise-10-epreuves`, `team-building-rse-nature`, `yoga-meditation-bien-etre-seminaire`, `high-tech-drones-vr-cadre-historique`.

## (c) Rien à faire

- Réécrits récemment par Camille, laisser Google repasser : `assurance-responsabilite-organisateur…` (24/09), `negocier-contrat-prestataire…` (23/09), `team-building-yvelines…` (21/09), `team-building-chantilly-equitation-polo…` (17/09), `seminaire-yvelines-lieu-atypique…` (10/09), `seminaire-outdoor-ete…` (10/09), `seminaire-ile-de-france-juin-juillet…` (09/09).
- Au-dessus du plancher de 1 500 mots, jamais réécrits : `seminaire-kick-off-rentree…` (1 513), `seminaire-integration-nouveaux-collaborateurs…` (1 792).
- `/auteurs/equipe` : page auteur (517 mots visibles), créée le 20/09 à la suppression de la persona. Rien à faire.

## Vérifications

- `npx tsc --noEmit` : OK.
- `npm run build` : OK, y compris `verif-titres`, `verif-descriptions` et `verif-maillage` (279 articles au lieu de 284).
- `next start` local : les 5 anciennes URL répondent en redirection permanente vers leur destination (code 308, celui que Next émet pour `permanent: true`, comme toutes les fusions existantes ; Google le traite comme un 301). Aucune des 5 n'est plus dans `/sitemap.xml` (371 URL au lieu de 376).
- Note technique : Turbopack refuse un `node_modules` en lien symbolique qui sort du dossier ; le worktree a utilisé une copie (clone APFS).

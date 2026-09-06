# Règles SEO non négociables — SITE-WEB

Chaque règle de ce document est **vérifiée par un contrôle automatique**. Une
règle qu'aucun code ne vérifie finit par ne plus être suivie : c'est arrivé deux
fois sur ce site en un mois (la FAQ décrite comme « affichée en accordéons »
alors qu'elle ne s'affichait sur aucune page ; la limite de longueur des titres
posée le 01/09/2026 et branchée sur le seul blog).

Si une règle nouvelle est ajoutée ici, **elle vient avec son contrôle**, sinon
elle n'a pas sa place dans ce fichier.

---

## 1. Balise `<title>` : 60 caractères servis, jamais plus

### La règle

Google n'affiche qu'environ 60 caractères. Au-delà, il coupe — et ce qui
disparaît est la fin du titre, c'est-à-dire le prix, la capacité ou la zone.

Le site a **deux régimes**, tous deux plafonnés à 60 :

| régime | pages concernées | budget propre |
|---|---|---|
| sous le gabarit racine `%s \| Select Châteaux` | landings, pages fixes | **42** caractères |
| hors gabarit (`title: { absolute }`) | fiches lieux, fiches châteaux | **60** caractères |
| blog (`app/blog/layout.tsx` neutralise le gabarit) | 284 articles | 60, suffixe porté par `pageTitle()` |

Le **H1 n'est jamais concerné** : il garde le titre complet, plus riche pour le
lecteur comme pour le moteur.

### Les helpers — `src/lib/seo.ts`

```ts
titreSousMarque(titre)          // page ordinaire  → borne à 42
titreLieu({ nom, ville, dep })  // fiche lieu      → borne à 60, préserve « Séminaire » + zone
pageTitle(titre)                // article de blog → borne à 60, ajoute le suffixe
bornerTitre(titre, max)         // primitive commune
```

`titreLieu()` mérite une explication. Appliquer une troncature générique au
gabarit des fiches produisait « Hôtel Inn Design Paris St Quentin en Yvelines »
tout court : le nom du lieu mangeait le budget et **le mot « séminaire »
disparaissait** — le seul mot-clé sur lequel ces pages peuvent se positionner.
La fonction dégrade donc la zone (`ville (dep)` → `dep`), puis le nom, jamais le
mot-clé.

### Le contrôle

`scripts/verif-titres.mjs`, branché sur `npm run build` :

```jsonc
"build": "next build && node scripts/verif-titres.mjs"
```

Il lit le **HTML réellement produit** dans `.next/server/app` — ni les données
ni le code. Il attrape donc toute page, y compris celles qui n'existent pas
encore et celles qui contourneraient `lib/seo`. Une seule page en infraction
fait échouer la construction, donc le déploiement Vercel.

```bash
npm run verif:titres        # sur le dernier build local
npm run verif:titres:prod   # sur la production, via le sitemap
```

### Côté agent Camille

`assertTitre()` dans `scripts/agent-cm/publish-article.js` refuse un article
dont la partie avant le « : » dépasse 42 caractères, au même titre que
`assertLongueurSuffisante`, `assertStructureH3` et `assertSourceExterne`.

**Conséquence de rédaction** : le chiffre différenciateur (prix, capacité,
nombre de lieux) doit être placé **avant** le séparateur. Placé après, il est
écrit pour rien — Google ne l'affiche pas.

### Ce qui a motivé la règle

Mesure du 06/09/2026 sur les 382 URLs du sitemap :

| famille | pages | médiane | max | > 60 car. |
|---|---|---|---|---|
| blog | 284 | 51 | 60 | 0 |
| landings | 18 | 80 | 88 | **18** |
| fiches lieux | 72 | 83 | **116** | **72** |

Ces 90 pages portaient **44 % des impressions du site** pour un CTR de 0,18 %
(landings) et 0,31 % (lieux).

---

## 2. Meta description : 155 caractères

`metaDescription()` (`src/lib/seo.ts`) borne à 155 en coupant sur un mot entier.
Appliquée aux points de passage : fiches lieux, fiches châteaux, landings
(`LandingFormat`, `LandingDepartement`, les `metadata.ts` géo), pages fixes.

Contrôlée par le même `verif-titres.mjs`, qui signale toute description au-delà
de 160 caractères **décodés** — l'encodage HTML (`&#x27;` pour une apostrophe)
gonfle artificiellement la mesure et a déjà produit un faux positif.

---

## 3. Longueur d'article : plancher de 1 500 mots visibles

`assertLongueurSuffisante()` dans `publish-article.js`.

Sous 900 mots, Google a refusé d'indexer 89 % des articles du site (8 sur 9).
Mesuré le 31/08/2026, leçon `marcus_lecons` id 2.

---

## 4. Structure : au moins 6 `<h3>` par article

`assertStructureH3()`. Depuis que les ancres sont posées au build, chaque `<h3>`
est une section citable par un moteur de réponse.

---

## 5. Traçabilité : au moins une source externe par article

`assertSourceExterne()`. Les liens vers `selectchateaux.com` ne comptent pas.

---

## 6. Anti-cannibalisation

`anti-cannibalisation.js` + `src/data/seo-clusters.ts`. Un article de zone est un
satellite : il pointe vers la page canonique de son cluster plutôt que de la
concurrencer.

**Limite connue, mesurée le 06/09/2026** : le lien satellite fonctionne mais
lentement — les landings remontent de 3 à 10 positions par semaine depuis la
cinquantaine, pendant que l'article garde la sienne. Sur « séminaire yvelines »
et « séminaire oise », les deux pages se disputent encore la requête. Une
décision reste à prendre (fusion, `canonical`, ou assumer l'article comme page
de destination).

---

## 7. Maillage : aucun article ne dépend du seul blog pour être découvert

### La règle

Chaque article publié reçoit au moins un lien depuis une page **hors `/blog`** —
fiche lieu, landing, accueil. Ce sont les pages que Googlebot repasse voir.

### Pourquoi

Mesuré le 06/09/2026 sur le HTML produit :

- 124 des 284 articles n'avaient qu'**un** lien entrant, et c'était la
  pagination de `/blog` (103) ou l'index `/blog` (21) ;
- les pages `/blog/page/2..8` **ne figurent pas au sitemap** ;
- `/blog` n'avait pas été crawlé depuis le 20/08 ;
- les **72 fiches lieux ne liaient aucun article** — zéro sur 72 ;
- au total, **16 articles sur 284** étaient atteignables depuis une page
  fréquemment crawlée.

En regard, l'âge médian du dernier passage de Googlebot : **6 jours** sur les
fiches lieux et les landings, **36 jours** sur le blog.

### Le mécanisme

`src/lib/maillage-blog.ts` répartit le corpus entier sur les 82 pages fraîches,
de façon **déterministe** (aucun aléa : Google verrait sinon un maillage
différent à chaque passage) et **exhaustive**.

Deux parts de créneaux par page, qui ne se disputent pas :
- **2 créneaux de pertinence** — articles liés au lieu ou à la zone ;
- **le reste pour la couverture** — les articles les moins servis du corpus,
  dimensionné à `ceil(nb articles / nb pages fraîches)`.

Sans cette séparation, la pertinence mangeait tous les créneaux et 121 articles
sur 284 restaient orphelins (constaté en construisant le module).

Affichage : `GuidesSection` dans `src/components/lieux/index.tsx`, branchée sur
les fiches lieux, les 4 landings de format, les 3 de département et les 7 géo.

### Le contrôle

`scripts/verif-maillage.mjs`, branché sur `npm run build` aux côtés de
`verif-titres.mjs`. Il lit le HTML produit, pas le code.

```bash
npm run verif:maillage        # sur le dernier build local
npm run verif:maillage:prod   # sur la production
```

Côté agent, `assertMaillage()` dans `publish-article.js` refuse une publication
qui ferait passer le corpus au-dessus de **492 articles** (82 pages × 6
créneaux de couverture). Ce plafond n'est pas à augmenter : l'atteindre signifie
qu'on publie plus vite que le site ne peut faire découvrir.

---

## Contexte de crawl — à connaître avant de promettre un effet

Mesuré le 06/09/2026 par l'API URL Inspection sur les 382 URLs :

- Googlebot re-crawle le blog avec un **âge médian de 36 jours** (p75 : 47 j,
  maximum : 208 j). 19 articles n'ont jamais été vus.
- Les landings et fiches lieux, elles, ont un âge médian de **6 jours**.
- Sur 6 jours, Googlebot a fait **55 passages dont 32 sur `robots.txt` et
  `sitemap.xml`** — une vingtaine de pages réelles. Les crawlers d'IA en ont
  fait 1 653 sur 265 pages.

**Conséquence** : une correction posée sur le blog met environ deux mois à être
vue par Google ; la même correction sur une landing ou une fiche lieu est vue en
une semaine. Il n'existe aucune API pour forcer un re-crawl (l'API Indexing est
réservée aux `JobPosting` et `BroadcastEvent`).

C'est ce qui explique qu'aucun effet des PR #23 et #24 (01/09) ne soit mesurable
au 06/09 : **3 articles sur 284** avaient été re-crawlés.

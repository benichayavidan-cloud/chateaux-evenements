# Audit SEO & recherche IA — 6 septembre 2026

Périmètre : `SITE-WEB` (selectchateaux.com). Sources : Search Console (API,
accès restauré ce jour), Bright Data SERP (google.fr, live), sondes ChatGPT
(DataForSEO) et Gemini (grounding Google Search), capteur `bot_hits`,
DataForSEO Backlinks, crawl des 382 URLs du sitemap.

---

## 1. Le fait central : le site grossit, l'audience non

| 28 jours | clics | impressions | CTR | pos. moyenne |
|---|---|---|---|---|
| 14/05 → 10/06 | 67 | 4 446 | 1,51 % | 12,5 |
| 11/06 → 08/07 | **112** | 5 890 | 1,90 % | **11,9** |
| 09/07 → 05/08 | 86 | 6 035 | 1,43 % | 17,6 |
| 06/08 → 03/09 | 86 | **9 270** | **0,93 %** | **20,7** |

Les impressions ont doublé en trois mois. Les clics ont *baissé* de 23 % depuis
le pic de juin. La position moyenne est passée de 11,9 à 20,7 — de bas de
première page à deuxième/troisième page.

Ce n'est pas un accident de mesure : c'est la signature d'un site qui publie
plus vite qu'il ne gagne d'autorité. Chaque page nouvelle ajoute des
impressions en position 30-45, ce qui tire la moyenne vers le bas sans rien
rapporter.

### Où va la croissance

| 28 j courants | pages actives | clics | impressions | CTR | pos. |
|---|---|---|---|---|---|
| Accueil | 1 | 17 | 583 | 2,92 % | 14,4 |
| **Landings** | **17** | **5** | **2 764** | **0,18 %** | **36,7** |
| Blog | 170 | 60 | 5 611 | 1,07 % | 15,5 |
| Fiches lieux | 69 | 4 | 1 307 | 0,31 % | 32,7 |

Il y a deux mois, 33 articles de blog et 5 fiches lieux recevaient des
impressions ; ils sont aujourd'hui 170 et 69. Le blog est passé de la position
9,4 à 15,5 sur la même période.

**Les landings sont le problème le plus net** : 17 pages, 2 764 impressions,
**5 clics**. Ce sont les pages commerciales, celles qui convertissent — elles
sont vues 2 764 fois par mois et cliquées 5 fois.

### La concentration des clics

5 pages font 77 % des clics (66 sur 86). `/blog/murder-party-chateau-activite-immersive`
seul en fait 36, soit 42 %.

Et 97 % des clics viennent de requêtes que Google n'affiche pas (anonymisées
car trop rares) : sur 86 clics, 3 seulement sont rattachables à une requête
nommée. Autrement dit **l'audience actuelle vient de la traîne ultra-longue,
pas du panel de requêtes cibles**.

---

## 2. Google se désengage, les IA prennent le relais

Capteur `bot_hits`, 6 derniers jours, 1 922 passages :

| | passages | pages distinctes |
|---|---|---|
| **Crawlers IA** | **1 653 (86 %)** | 265 |
| dont OAI-SearchBot | 908 | |
| dont ChatGPT-User | 242 | |
| dont Perplexity | 228 | |
| dont ClaudeBot | 153 | |
| dont GPTBot | 83 | |
| Bingbot | 210 | |
| **Googlebot** | **55** | **21** |

Sur les 55 passages de Googlebot, **32 portaient sur `robots.txt` et
`sitemap.xml`**. Googlebot a donc lu une vingtaine de pages réelles en six
jours, sur un site qui en compte 382. Vérification directe : la landing
Yvelines — la plus exposée du site — a été crawlée pour la dernière fois le
**30 août**.

Les crawlers d'IA, eux, lisent 265 pages distinctes, et en priorité les
landings (29 % de leurs requêtes), c'est-à-dire exactement les pages que Google
laisse en position 36.

`llms.txt` : **0 requête** en six jours. Le constat du 01/09 tient, ce fichier
ne sert à rien ici.

---

## 3. Les positions réelles (Bright Data, google.fr, 3 pages)

31 requêtes du panel testées en direct :

| | |
|---|---|
| Top 10 | **4 / 31** |
| Classé dans les 30 | 12 / 31 |
| Absent des 3 premières pages | **19 / 31** |

Ce qui marche :

| pos | requête | page qui classe |
|---|---|---|
| **2** | alternative châteauform | `/blog/alternative-chateauform-ile-de-france` |
| **4** | murder party château | `/blog/murder-party-chateau-activite-immersive` |
| **4** | combien coûte un séminaire en château | `/blog/combien-coute-seminaire-chateau-2026` |
| **7** | journée d'étude château | `/blog/seminaire-residentiel-vs-journee` |

Ce qui ne marche pas — toutes les requêtes commerciales de tête :
`séminaire château`, `séminaire château île de france`, `location château
séminaire`, `séminaire chantilly`, `séminaire oise`, `team building château`,
`budget séminaire entreprise` : **au-delà de la position 30**.

### Le blog mange les landings

Sur 6 requêtes, c'est un article de blog que Google classe, pas la landing
conçue pour convertir :

| requête | ce qui classe | la landing prévue |
|---|---|---|
| séminaire yvelines | blog, pos. 23 | 391 imp. en pos. 45 |
| séminaire 78 | blog, pos. 21 | — |
| team building chantilly | blog, pos. 13 | 63 imp. en pos. 27 |
| séminaire château nature | blog, pos. 11 | — |
| séminaire campagne proche paris | blog, pos. 19 | — |
| journée d'étude château | blog, pos. 7 | **0 impression** |

Le correctif du 01/09 (PR #24) ajoute un lien satellite → page canonique. Cinq
jours plus tard, la hiérarchie n'a pas bougé, et Googlebot n'est pas repassé.
Un lien ne suffira pas ici.

---

## 4. La cause matérielle, mesurée

| domaine | backlinks | domaines référents | rank |
|---|---|---|---|
| **selectchateaux.com** | **10** | **9** | **0** |
| homanie.com | 1 733 | 162 | 252 |
| chateauform.com | 19 479 | 1 942 | 326 |
| kactus.com | 19 405 | 2 425 | 336 |
| 1001salles.com | 33 139 | 3 274 | 355 |
| funbooker.com | 76 986 | 3 540 | 406 |
| aleou.fr | 20 805 | 1 981 | 456 |

Le plus petit concurrent présent dans le top 10 du panel a **18 fois** plus de
domaines référents. Aucun levier éditorial ou technique ne compense un écart de
cet ordre sur les requêtes disputées. Les 19 requêtes hors top 30 le resteront
tant que ce chiffre est à 9.

Occupation du top 10 sur le panel : chateauform.com (22 apparitions),
kactus.com (17), 1001salles.com (17), aleou.fr (15), funbooker.com (13),
homanie.com (10).

---

## 5. La recherche IA : le seul terrain où le site gagne

Sondes du jour (11 prompts en langage naturel) :

| | a cherché | nous a cités | taux |
|---|---|---|---|
| ChatGPT (gpt-4o-mini + web) | 5 / 11 | 1 | **20 %** |
| Gemini (Google Search grounding) | 2 / 11 | 2 | **100 %** |

Évolution depuis la mesure du 03/09 : Gemini est passé de **0 recherche** à 2,
et nous a cités les deux fois. C'est la première fois que ce moteur nous
retient.

Vérification directe sur « Combien coûte un séminaire en château en
Île-de-France ? » — Gemini interroge 8 sources et `selectchateaux.com` en fait
partie, aux côtés de 1001salles, Châteauform, EventDrive, whereez.

Et ChatGPT nous cite sur « alternative châteauform ».

**Ces deux succès ont la même cause** : ce sont les deux seules pages du site
qui reposent sur une donnée que personne d'autre ne détient — l'observatoire
des 188 devis réels, et le comparatif des 68 domaines indépendants face à
Châteauform. Ce ne sont pas les mieux structurées ni les plus longues : ce sont
les seules qui répondent avec un chiffre propriétaire.

Les 6 prompts restants n'ont déclenché **aucune recherche** : les moteurs ont
répondu de mémoire. Ce n'est pas un échec de visibilité, c'est une absence de
mesure — la distinction posée le 01/09 tient.

**Limite d'instrumentation** : les AI Overviews de Google ne sont exposés ni par
l'API Search Console (`searchAppearance` renvoie 0 ligne) ni par Bright Data
(0 AIO capturé sur 8 requêtes testées). Le rapport « Performance on Search
Generative AI Features » de l'interface GSC reste la seule source. Il faut
l'exporter à la main pour mesurer l'effet de la PR #23.

---

## 6. Défauts techniques encore ouverts

### 90 balises `<title>` tronquées par Google

Le correctif du 01/09 borne les titres à 60 caractères — mais `pageTitle()`
n'est appelé que depuis `src/app/blog/[slug]/layout.tsx`. Les autres familles
ne passent pas par lui :

| famille | pages | médiane | max | > 60 car. |
|---|---|---|---|---|
| blog | 284 | 51 | 60 | **0** |
| **landings** | 18 | 80 | 88 | **18** |
| **fiches lieux** | 72 | 83 | **116** | **72** |

Ces 90 pages portent 4 071 impressions par mois (44 % du total) pour un CTR de
0,18 % et 0,31 %. Leur titre est coupé dans le résultat de recherche.

Exemples servis aujourd'hui :
- `Alternative à Châteauform' : 68 Domaines Indépendants en Île-de-France | Select Châteaux` (88)
- `Hôtel Inn Design Paris St Quentin en Yvelines — Séminaire à Montigny-le-Bretonneux (78), 100 pers. | Select Châteaux` (116)

52 des 72 fiches lieux ont aussi une meta description au-delà de 160
caractères, 9 landings sur 18 également.

### Indexation : 341 / 382, et le déficit est 100 % blog

Inspection URL par URL des 382 pages du sitemap (API GSC, ce jour) :

| état | pages |
|---|---|
| Submitted and indexed | **341** (89 %) |
| Crawled – currently not indexed | 22 |
| URL is unknown to Google | 13 |
| Discovered – currently not indexed | 6 |

Progression réelle : 330 le 31/08 → 337 le 03/09 → **341 le 06/09**. Lente mais
positive.

**Les 41 pages non indexées sont toutes des articles de blog.** Les 18 landings
et les 72 fiches lieux sont indexées à 100 %. Le problème d'indexation n'est
donc pas structurel au site : il est propre au corpus éditorial.

13 articles sont même « unknown to Google » — jamais vus, alors qu'ils sont au
sitemap et ont été poussés par IndexNow. Avec un Googlebot qui lit 4 pages par
jour, c'est cohérent : le budget de crawl ne suit pas le rythme de publication.

Parmi eux, plusieurs sur des sujets à valeur commerciale directe :
`/blog/chantilly-vs-fontainebleau-seminaire-comparatif`,
`/blog/seminaire-yvelines-programme-activites-budget-2026`,
`/blog/negocier-contrat-prestataire-evenementiel-chateau-2026`.

### Ce qui tient

Vérifié sur les 382 URLs en production :

- **FAQ** : 373 pages déclarent un `FAQPage`, **373 l'affichent réellement**
  (une seule partielle). Le défaut corrigé le 01/09 ne s'est pas rouvert.
- **Longueur** : médiane 2 526 mots (blog), 1 873 (landings), 998 (lieux).
  26 pages sous 900 mots, dont 23 fiches lieux — le plancher côté blog tient.
- **Technique** : 0 URL non-200, 0 double balise robots, 0 canonical divergent,
  0 noindex accidentel.

---

## 7. Lecture d'ensemble

Trois choses se passent en même temps, et elles ne pointent pas dans la même
direction :

1. **Sur Google, le site perd du terrain.** Pas parce qu'il est mal fait — il
   est techniquement propre et le contenu est long — mais parce qu'il n'a que
   9 domaines référents. Google le crawle 4 pages par jour et le classe en
   position 20. Publier davantage aggrave la moyenne au lieu de l'améliorer.

2. **Sur les moteurs IA, le site est lu massivement** (86 % du crawl) et
   commence à être cité — mais uniquement sur les deux sujets où il apporte un
   chiffre que personne d'autre n'a.

3. **Les pages qui devraient convertir ne servent à rien** : 17 landings,
   2 764 impressions, 5 clics, titres tronqués, et un article de blog qui les
   double sur leur propre requête.

---

## 8. Ce que je recommande, dans l'ordre

**A — Étendre `pageTitle()` aux landings et aux fiches lieux.**
Une ligne par gabarit. 90 pages, 44 % des impressions, CTR actuel 0,2 %.
C'est le seul levier de cette liste dont l'effet est mécanique et immédiat.
Idem pour les meta descriptions au-delà de 160 caractères.

**B — Trancher la cannibalisation pour de bon.**
Le lien satellite ne suffit pas. Sur les 6 requêtes concernées, il faut soit
fusionner l'article dans la landing, soit poser un `canonical` de l'article
vers la landing, soit assumer que l'article *est* la page de destination et
lui ajouter le formulaire de devis. Trois options, une décision à prendre —
je peux instruire chacune.

**C — Systématiser ce qui marche en IA : la donnée propriétaire.**
Les deux citations obtenues viennent des deux pages bâties sur les 188 devis.
Le CRM contient de quoi en produire une dizaine d'autres (budget médian par
département, par saison, par format, taille de groupe, délai de réservation).
C'est le seul angle où le déficit d'autorité ne joue pas : un moteur d'IA cite
la source d'un chiffre, pas le domaine le plus lié.

**D — Arrêter de publier au volume.**
170 articles actifs, 60 clics. Camille est en pause depuis le 01/09 : la
laisser en pause tant que le CTR des landings n'est pas redressé. Le corpus
n'est pas le facteur limitant.

**E — Exporter le rapport « AI Features » de Search Console.**
Seule façon de mesurer l'effet de la PR #23 (FAQ visibles + ancres) sur les AI
Overviews. Baseline du 01/09 : 444 impressions sur 3 mois, 72 pages.

**Ce qui n'est pas dans cette liste, et pourquoi.** Le vrai plafond est à 9
domaines référents. Les chantiers d'acquisition de liens ont été écartés le
01/09 et je ne les remets pas sur la table — mais il faut savoir que A à D
travaillent *sous* ce plafond : ils amélioreront le rendement des positions
déjà acquises, pas les 19 requêtes hors top 30.

---

## Annexe — sources et coûts

| mesure | source | coût |
|---|---|---|
| Performance, pages, requêtes | GSC API (impersonation `ga4-admin@`) | 0 |
| Positions SERP (31 requêtes × 3 pages) | Bright Data `serp_api` | ~0,10 $ |
| Citations ChatGPT (11 prompts) | DataForSEO `chat_gpt/llm_responses` | 0,141 $ |
| Citations Gemini (11 + 3 prompts) | `gemini-flash-latest` + grounding | 0 |
| Backlinks (7 domaines) | DataForSEO Backlinks | ~0,02 $ |
| Crawl 382 URLs (mots, titres, FAQ) | direct | 0 |
| Bots | capteur `bot_hits` (Supabase) | 0 |
| Indexation 382 URLs | GSC URL Inspection API (~9 s/URL, 58 min) | 0 |

**Accès GSC** : le token gcloud avait expiré, `gcloud auth login` relancé le
06/09 sur `seminaires@selectchateaux.com`. Il expirera de nouveau.

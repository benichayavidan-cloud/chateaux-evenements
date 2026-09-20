# Audit SEO + captation IA — selectchateaux.com

**Date** : 20/09/2026
**Fenêtre mesurée** : 19/06 → 17/09/2026 (90 jours, Search Console)
**Sources** : API Search Console (accès direct rétabli le 20/09), export « Performance on Search Generative AI Features », mémoire de l'agent Marcus (Supabase : `marcus_runs`, `marcus_lecons`, `bot_hits`), code `SITE-WEB/`, récupération HTTP du site en production.

---

## Le chiffre qui résume tout

Sur 90 jours : **25 084 impressions, 300 clics**. Taux de clic **1,20 %**. Position moyenne **18,3**.

La visibilité grimpe vite. Le trafic, non.

| Quinzaine | Impressions/jour | Clics/jour | CTR | Position |
|---|---|---|---|---|
| 19/06 – 02/07 | 204 | 3,5 | 1,72 % | 11,6 |
| 17/07 – 30/07 | 210 | 3,4 | 1,60 % | 18,2 |
| 14/08 – 27/08 | 292 | 3,8 | 1,30 % | 20,6 |
| 28/08 – 10/09 | 460 | 3,6 | 0,79 % | 20,6 |
| 11/09 – 17/09 | 339 | 4,3 | 1,26 % | 19,8 |

**Les impressions ont augmenté de 66 %. Les clics sont restés plats.** Le site devient visible sur de plus en plus de requêtes, mais de plus en plus loin dans la page — la position moyenne est passée de 11,6 à 19,8.

---

## 1. Le site gagne sur les questions posées à une IA, et perd sur les mots-clés

C'est le constat central, et il n'avait jamais été mesuré.

J'ai séparé les 745 requêtes en deux familles : celles formulées en langage naturel (« quel est le meilleur cadre pour un séminaire ? », « je suis assistante de direction, propose-moi… ») et les mots-clés classiques (« séminaire yvelines »).

| | Requêtes | Impressions | Position moyenne | Part en top 10 | Clics |
|---|---|---|---|---|---|
| **Langage naturel** | 64 | 498 | **11,8** | **77,9 %** | **0** |
| **Mots-clés classiques** | 681 | 13 061 | 26,4 | 8,5 % | 25 |

Sur les questions formulées comme on parle à une IA, **78 % des impressions sont en première page**. Sur les mots-clés classiques, **8,5 %**. Un écart de neuf fois.

**Et zéro clic sur les premières.** 498 impressions, souvent en position 3 à 5, aucun clic.

Exemples réels, tirés de Search Console :

| Requête | Position | Impressions | Clics |
|---|---|---|---|
| « quelles sont les meilleures maisons chateauform en ile de france » | 2,9 | 16 | 0 |
| « je suis assistante de direction. propose-moi des châteaux ou domaines… » | 3,8 | 16 | 0 |
| « checklist pour préparer un offsite de management sans rien oublier » | 3,5 | 28 | 0 |
| « château, domaine ou villa, quel est le meilleur cadre pour un séminaire » | 5,5 | 22 | 0 |
| « comparatif des tarifs chateauform par rapport aux autres offres » | 4,3 | 18 | 0 |

**Ce que ça veut dire.** Quelqu'un demande à Google « je suis assistante de direction, propose-moi des châteaux près de Paris ». Google construit sa réponse, et pour l'écrire il lit votre site — vous êtes en 4ᵉ position de ses sources. Il rédige la réponse. La personne la lit et referme. Elle a eu ce qu'elle voulait ; elle n'a jamais su que ça venait de vous.

Ce n'est pas un défaut du site. C'est la mécanique des réponses génératives. Mais elle a une conséquence directe : **la part du trafic que vous perdez ainsi va continuer d'augmenter**, et aucune optimisation de page ne la récupérera.

---

## 2. La part de l'IA baisse — elle ne monte pas

Attention au piège, il a déjà été tendu deux fois sur ce projet.

En valeur absolue, les impressions dans les réponses IA montent : 1,3/jour fin juin, 12,9/jour depuis le 1ᵉʳ septembre. Tentant d'y lire l'effet des correctifs du 01/09 (PR #23 : FAQ rendues visibles, ancres au build).

**C'est faux.** Rapportées au total du site, elles baissent :

| Fenêtre 28 j finissant le | Impressions totales | Dont réponses IA | Part IA |
|---|---|---|---|
| 28/08 | 7 646 | 248 | **3,24 %** |
| 31/08 | 8 051 | 254 | 3,15 % |
| 04/09 | 9 519 | 266 | 2,79 % |
| 07/09 | 10 100 | 270 | 2,67 % |
| 11/09 | 10 634 | 290 | 2,73 % |
| 14/09 | 10 884 | 300 | **2,76 %** |

La hausse absolue vient de la croissance générale du site, pas des correctifs. La part IA a culminé à 3,24 % fin août et s'est stabilisée autour de 2,75 % depuis début septembre.

**Verdict sur PR #23 : aucun effet mesurable à ce volume.** Ce n'est pas la preuve que le correctif était inutile — il fallait le faire, une FAQ balisée mais jamais affichée est un défaut objectif. C'est la preuve que son effet, s'il existe, est plus petit que le bruit de la série. Ne pas le recompter comme un gain.

---

## 3. OpenAI lit votre site 40 fois plus que Google

Relevé sur les 7 derniers jours (13 → 20/09), depuis vos propres logs :

| Robot | Visites / 7 j | À quoi il sert |
|---|---|---|
| **GPTBot** | 2 989 | entraînement des modèles OpenAI |
| **OAI-SearchBot** | 802 | index de ChatGPT Search |
| **ClaudeBot** | 370 | entraînement Anthropic |
| **Bingbot** | 275 | Bing (et, par ricochet, ChatGPT) |
| **ChatGPT-User** | 216 | va lire la page en direct pendant une conversation |
| **PerplexityBot** | 120 | Perplexity |
| **Googlebot** | **76** | Google |

**4 497 visites de robots d'IA contre 76 de Googlebot.** Les IA consomment votre site massivement.

Et pourtant — sondes automatiques de Marcus, 11 requêtes métier testées le 17/09 : **ChatGPT cite le site 0 fois sur 11. Gemini, 0 sur 11.** Sur « séminaire château proche paris », ChatGPT est allé chercher sur le web et a cité quatre châteaux en direct (chateaudeprunay.fr, chateaudechatenay.fr, chateaudelabucherie.com, chateaudelatrye.com) — pas vous.

**Ils vous lisent énormément. Ils ne vous citent pas.** C'est le vrai sujet de la partie « IA générative » de cet audit, et il n'est pas technique : l'accès est parfait (voir §6), le contenu est lisible sans JavaScript, tout est en place. Ce qui manque, c'est une raison de vous préférer.

*Nuance honnête : une vérification manuelle faite en parallèle a trouvé le site cité sur deux requêtes (« séminaire château Île-de-France », « alternative à Châteauform »), avec vos chiffres repris mot pour mot. Les sondes automatiques et la vérification manuelle ne concordent donc pas parfaitement — le panel de sondes est probablement trop étroit ou mal formulé. À corriger avant d'en tirer une tendance.*

---

## 4. Le blog écrase les pages commerciales — y compris sur les requêtes commerciales

Répartition des 300 clics :

| Famille | URLs | Impressions | Clics | CTR |
|---|---|---|---|---|
| Blog | 237 | 14 907 | **208** | 1,40 % |
| Pages zones / offres | 21 | 7 514 | 17 | 0,23 % |
| Fiches lieux | 73 | 3 078 | 11 | 0,36 % |
| Accueil | 1 | 1 849 | 64 | 3,46 % |
| **/devis** | 1 | 120 | **0** | 0 % |

Et un seul article fait 40 % du trafic du site : `/blog/murder-party-chateau-activite-immersive`, **121 clics** sur 300.

Le problème n'est pas que le blog marche. C'est qu'il marche **à la place** des pages qui vendent. Mesuré requête par requête :

**« séminaire chantilly » — 5 URLs de votre site se disputent la requête**
| URL | Position | Clics |
|---|---|---|
| /seminaire-chateau-chantilly (la page commerciale) | 31,1 | 0 |
| /blog/seminaire-chantilly-activites-team-building | 21,3 | 1 |
| /chateaux/manoir-anglo-normand-chantilly | 58,6 | 0 |
| /chateaux/palais-royal-foret-chantilly | 83,9 | 0 |
| /team-building-chantilly | 83,9 | 0 |

**« séminaire yvelines » — 978 impressions**
| URL | Position | Clics |
|---|---|---|
| /blog/seminaire-yvelines-78-luxe-proximite | 19,6 | 0 |
| /seminaire-chateau-yvelines-78 (la page commerciale) | **52,7** | 1 |

**« seminaire oise »** : blog en 17,5 ; page commerciale en 36,0.

Le schéma est constant : **l'article de blog devance la page qui vend, de 15 à 30 places.**

> ⚠️ Précision de méthode importante. Une mesure d'août avait *réfuté* la cannibalisation — mais elle portait sur la similarité de vocabulaire entre articles comme cause de non-indexation. Ce n'est pas la même chose. Ici je mesure la compétition réelle de plusieurs URLs sur une même requête dans Search Console. Les deux constats ne se contredisent pas.

---

## 5. Votre meilleur actif est invisible sur sa propre requête

`/budget-seminaire-entreprise` publie une médiane de **417 € par personne, calculée sur 188 devis réellement traités**. Personne d'autre sur ce marché ne publie ça.

Sur la requête « combien coûte un séminaire en château 2026 », **cinq des neuf résultats sont des articles Select Châteaux** — mais des articles périphériques (storytelling, ROI, TVA, serious game). La réponse générée par Google cite des fourchettes de prix **venant de vos concurrents** (290–515 €, 250–400 €). Votre page budget n'apparaît nulle part.

Vous avez occupé la place et perdu la citation.

Deux causes vérifiées :
- **Aucune date de mise à jour visible** sur la page (vérifié en production le 20/09). Sur une donnée tarifaire, la fraîcheur est le premier critère de confiance d'un modèle. Sans date, votre chiffre est traité comme potentiellement périmé.
- **Aucun article ne pointe vers elle** avec un lien dont le texte est la question elle-même.

---

## 6. Ce qui est déjà bon — à ne pas retoucher

- **Accès des robots IA : parfait.** Les 12 robots sont nommément autorisés dans `robots.txt`, entraînement comme réponse en direct. Vérifié en production, conforme au code (`src/app/robots.ts`).
- **Rendu sans JavaScript : sain.** Mesuré page par page sur le HTML servi : accueil 1 128 mots, Yvelines 2 714, Chantilly 3 371, team-building 4 672, article murder party 4 613. Le piège classique — le robot arrive et voit une page blanche — ne s'applique pas ici.
- **Le correctif du 01/09 tient.** La FAQ est réellement affichée à l'écran (et pas seulement balisée) sur les pages vérifiées.
- **llms.txt et llms-full.txt** sont servis en texte brut, régénérés à chaque build depuis les données. Travail propre — mais aucun grand modèle ne les lit systématiquement aujourd'hui. Ne pas y réinvestir de temps.
- **Avis clients** : garde-fou en place, verbatim vérifiables uniquement, note calculée et non écrite à la main. Le nettoyage du 02/09 a tenu.
- **Le chemin blog → devis existe** depuis le 06/09 : formulaire inséré dans l'article, avec l'origine enregistrée.

---

## 7. À corriger — gravité haute

### 🔴 La note « 5 étoiles » est revendiquée sur 368 pages, y compris vos CGV

**Vérifié en production le 20/09.** Le bloc `LocalBusiness` portant `aggregateRating` 5,0/6 avis est posé dans le gabarit racine (`src/app/layout.tsx:96` → `src/utils/seo/structured-data.ts:323`). Il part donc sur **toutes** les pages. J'ai vérifié : il est présent sur l'article murder party, sur la checklist, sur `/cgv` et sur `/mentions-legales`.

**Le problème concret** : vos mentions légales déclarent à Google « Select Châteaux, noté 5 sur 6 avis » alors qu'aucun avis n'y figure. Google exige que l'élément noté soit réellement présent sur la page, et refuse les notes qu'une entreprise s'attribue elle-même. C'est un motif classique d'action manuelle « données structurées » — et une action manuelle fait perdre **tous** les résultats enrichis du domaine d'un coup.

**Correction** : sortir `generateLocalBusinessSchema()` du gabarit racine, ne l'injecter que sur les pages qui affichent vraiment les avis (accueil, fiches château, team building). Garder `Organization` et `WebSite` partout, eux ne posent pas de problème.

*Note : une décision du 25/08 avait déjà supprimé ce balisage partout pour cette raison exacte, avant qu'il ne soit réintroduit le 01/09 avec la vraie note. La donnée est juste cette fois ; le placement, non.*

### 🔴 La page de remerciement dit à Google d'ignorer la page devis

**Vérifié en production.** `/devis/merci` renvoie simultanément :
```
<meta name="robots" content="noindex, nofollow">
<link rel="canonical" href="https://www.selectchateaux.com/devis">
```

Elle dit « ne m'indexe pas » **et** « ma version officielle, c'est /devis ». Les deux instructions se contredisent, et Google indique que le « ne m'indexe pas » peut se reporter sur la page désignée — c'est-à-dire sur `/devis`, la page qui rapporte l'argent.

**Correction** : une ligne dans `src/app/devis/merci/metadata.ts` → `alternates: { canonical: "/devis/merci" }`.

### 🔴 Le garde-fou de l'agent éditorial a neuf trous

`scripts/agent-cm/seo-clusters.json` est décrit comme « la source de vérité de la propriété des mots-clés ». C'est lui qui empêche l'agent Camille — qui publie un article par heure — d'écrire sur un sujet déjà couvert par une page commerciale.

Il recense 14 clusters pour **24 pages commerciales réelles**. Manquent : `/budget-seminaire-entreprise`, `/team-building-chantilly`, `/team-building-hauts-de-seine-92`, `/team-building-val-d-oise-95`, `/journee-etude-seminaire`, `/alternative-chateauform`, `/lieux` et les trois landings 91/77/95.

Pire, ligne 164 : le mot-clé « budget seminaire entreprise » est attribué à l'article `/blog/combien-coute-seminaire-chateau-2026`, alors qu'une page entière porte ce nom dans son adresse.

**Le problème concret** : demain l'agent peut publier un article visant « team building Chantilly » sans qu'aucune alarme ne sonne, et venir concurrencer la landing créée pour ça. C'est exactement le mécanisme qui a produit la cannibalisation décrite au §4 — et il tourne toutes les heures.

**Correction** : ajouter les 9 clusters manquants et réattribuer « budget seminaire entreprise » à `/budget-seminaire-entreprise`.

### 🔴 La page auteur affirme une expérience inventée

`src/data/authors.ts:21` déclare que Sophie Durand « accompagne depuis plus de dix ans », « a coordonné plusieurs centaines d'événements » et « répond personnellement aux demandes de devis sous 24h ». Signature appliquée à **tous** les articles (`CANONICAL_AUTHOR`, ligne 32). Le blog est écrit par l'agent Camille ; la page n'a ni photo, ni LinkedIn, ni trace ailleurs sur le web.

**Décision du PO, 20/09/2026 : c'est une persona inventée.**

**Correction retenue** : remplacer la signature individuelle par « L'équipe Select Châteaux », retirer les affirmations personnelles de `authors.ts:21`, et reporter l'autorité sur ce qui est prouvable — 188 devis traités, références Eiffage / Safran.AI / LCL / Boston Scientific.

Point d'attention : « elle répond personnellement sous 24h » est affiché au pied du formulaire de devis (`auteurs/sophie-durand/page.tsx:83`). C'est une promesse opposable par un client. À retirer en priorité.

### 🔴 Deux pages vendent la même abbaye sur le même mot-clé

`src/data/geo-landing-pages.ts:603` et `:839`. `/seminaire-chateau-yvelines-78` déclare comme **premier** mot-clé « seminaire vallee de chevreuse » — le mot-clé principal de `/seminaire-vallee-de-chevreuse`. Les deux pages décrivent le même et unique lieu : l'abbaye cistercienne, 144 chambres, 80 hectares.

C'est la cause mécanique du constat du §4 : sur « séminaire yvelines », la page commerciale est en **52ᵉ position** pendant que l'article de blog est en 19ᵉ.

**Correction** : `/seminaire-vallee-de-chevreuse` garde l'abbaye. `/seminaire-chateau-yvelines-78` est re-ciblée sur le **département** — retirer les mots-clés Chevreuse, et alimenter la page avec l'inventaire CRM des Yvelines, comme les landings 91/77/95.

### 🔴 « 4 lieux » ou « 68 lieux » ? Le site dit les deux

`/lieux` s'intitule « 68 Lieux de Séminaire en Île-de-France ». `/seminaire-chateau-ile-de-france` s'intitule « Séminaire Château Île-de-France : 4 lieux ». Les deux listent « lieu séminaire Île-de-France » dans leurs mots-clés. Même écart entre `/alternative-chateauform` (62 domaines), `/a-propos` (4 domaines), `/seminaire-chateau-oise-60` (2 châteaux) et `/team-building-chantilly` (13 domaines sur le même territoire).

**Le problème concret** : un office manager qui compare deux de vos pages à trois secondes d'intervalle lit deux chiffres contradictoires. Et un modèle d'IA, interrogé sur « combien de châteaux propose Select Châteaux », doit trancher entre 4 et 68 — voire vous attribuer le campus Capgemini, qui figure dans vos fiches sans que vous le commercialisiez.

**Correction** : poser une hiérarchie et la tenir, en toutes lettres dans l'introduction des deux pages. `/lieux` = le catalogue référencé (68). `/seminaire-chateau-ile-de-france` = les 4 domaines exclusifs en privatisation totale. Croiser les liens.

---

## 8. À corriger — gravité moyenne

| Sujet | Fichier | Ce qui se passe |
|---|---|---|
| **Sitemap sans fraîcheur** | `src/app/sitemap.ts` | 346 URLs sur 376 annoncent la même date (`2026-09-01`, la date de déploiement). Google apprend vite qu'un tel signal ne veut rien dire et cesse d'en tenir compte. |
| **Chantilly = Oise, écrit deux fois** | `geo-landing-pages.ts:314-482` | Les deux pages présentent les mêmes châteaux dans la même forêt et partagent « séminaire forêt chantilly ». Chantilly *est* dans l'Oise. → Différencier : Chantilly garde les 2 domaines + l'accès CDG ; Oise devient une page de département sur l'inventaire CRM (13 lieux). |
| **8 pages de blog absentes du sitemap** | `src/app/sitemap.ts:131-136` | `/blog/page/2` à `/blog/page/9` sont indexables et portent les liens vers la majorité des articles, mais ne sont pas déclarées. |
| **68 descriptions coupées en plein chiffre** | `src/app/lieux/[slug]/page.tsx:57-69` | Relevé réel : « *…dispose de 19 chambres, 3…* ». La promesse « Devis sous 48 h » est systématiquement sacrifiée. Et la faute « **1 salles** de réunion » apparaît dans le bloc de réponse en haut de page — celui-là même que Google et les IA recopient. |
| **Les 7 pages de zone chargent les 6 autres** | `GeoLandingPage.tsx:1,15,18` | Composant client qui importe les 959 lignes de texte des 7 zones, juste pour afficher des liens en bas de page. Chaque visiteur télécharge 6 pages qu'il ne verra jamais. |
| **Deux pages entières côté navigateur** | `a-propos/page.tsx:1`, `seminaires-soirees-entreprise/page.tsx:1` | Contenu statique à 95 %, marqué client. Le visiteur mobile paie un chargement inutile. |
| **Le titre de l'accueil est écrit en tout petit** | `HeroSlider.tsx:170-218` | « Location de Château pour Séminaire d'Entreprise » s'affiche en gris clair, 12-14 px, comme un surtitre. Le texte dominant est le nom du château du diaporama, qui change toutes les 3 secondes. La page ne dit pas ce qu'elle vend. |
| **Le blog s'appelle « L'Inspiration Événementiel »** | `blog-index-view.tsx:88` | Le titre visible ne contient aucun mot recherché. C'est la partie la plus visible du site, et son point d'entrée ne se positionne sur rien. |
| **Chaque fiche château présente les 3 autres** | `chateaux/layout.tsx:8-157` | La liste des 4 châteaux est sur le gabarit de rubrique, donc répétée sur chaque fiche. Une fiche dédiée à l'abbaye déclare « cette page présente 4 lieux, dont un manoir à Chantilly ». |
| **Deux pages « alternative Châteauform »** | `/alternative-chateauform` + `/blog/alternative-chateauform-ile-de-france` | C'est la seconde qui remonte ; `llms.txt` ne pointe que vers la première. |

---

## 9. À corriger — gravité basse

- **Fil d'Ariane à un seul maillon** sur l'accueil (`page.tsx:46`) : inutile, signalé comme incomplet par l'outil de test Google. À supprimer.
- **FAQ coupée à 300 px même ouverte** (`TeamBuildingPageClient.tsx:850`, `ChateauPageClient.tsx:1264`) : la réponse sur les Hauts-de-Seine fait 600 caractères, sa fin est invisible sur mobile alors qu'elle est bien déclarée à Google.
- **Deux balises `<main>` imbriquées** (`blog-index-view.tsx:62`, `auteurs/sophie-durand/page.tsx:48`) : HTML invalide ; les extracteurs de contenu, dont ceux des IA, peuvent se tromper de bloc principal.
- **Pages légales en `nofollow`** : pour une agence B2B, des mentions légales indexées sont un signal de sérieux. Le `nofollow` n'apporte rien.
- **Flux RSS déclaré puis perdu** (`layout.tsx:53-58`) : dès qu'une page définit sa propre adresse de référence — toutes sauf l'accueil — la déclaration du flux disparaît.
- **Images du flux RSS interdites aux robots** : le flux pointe vers `/api/images/...`, or `robots.ts` interdit tout `/api/`. Google Business Profile, destinataire prévu, ne peut pas récupérer les vignettes.
- **Textes alternatifs génériques** (`GeoLandingPage.tsx:109`) : « *Nom du château - 1* », « *- 2* ». Ne décrit rien, ni pour Google Images ni pour un visiteur malvoyant.
- **10 % des impressions viennent des États-Unis pour 1 clic** : 2 475 impressions, 1 clic. Ce bruit tire le CTR vers le bas. Le CTR réel sur la France est de **1,43 %**, pas 1,20 %.
- **Le mobile convertit 2,5 fois mieux et reçoit 3 fois moins de visibilité** : ordinateur 18 820 impressions à 0,85 % de CTR ; mobile 6 152 impressions à **2,18 %**.

---

## 10. Ce qui est déjà bon — ne pas y toucher

- **Accès des robots IA : parfait.** Les 12 robots sont nommément autorisés dans `robots.txt`, entraînement comme réponse en direct. Vérifié en production, conforme au code.
- **Rendu sans JavaScript : sain.** Mesuré sur le HTML servi : accueil 1 128 mots, Yvelines 2 714, Chantilly 3 371, team-building 4 672, article murder party 4 613. Le piège « le robot voit une page blanche » ne s'applique pas ici.
- **Les soft-404 sont réglés.** Les quatre routes dynamiques ont `generateStaticParams` **et** `dynamicParams = false`.
- **Les titres sont tous sous 60 caractères**, vérifiés à chaque build par `scripts/verif-titres.mjs`.
- **Le correctif FAQ du 01/09 tient** : 368 pages, une seule `FAQPage` par page, aucune orpheline, toutes affichées à l'écran.
- **llms.txt / llms-full.txt** servis en texte brut, régénérés à chaque build. Travail propre — mais aucun grand modèle ne les lit systématiquement aujourd'hui. Ne pas y réinvestir de temps.
- **Avis clients** : verbatim vérifiables uniquement, note calculée et non écrite à la main. Le nettoyage du 02/09 a tenu. *(C'est le placement du balisage qui pose problème, pas la donnée — voir §7.)*
- **Le chemin blog → devis existe** depuis le 06/09 : formulaire inséré dans l'article, origine enregistrée.

---

## 11. Cartographie intention → page unique

| Intention | Page qui doit gagner | Action |
|---|---|---|
| séminaire château Île-de-France | `/seminaire-chateau-ile-de-france` | garder |
| lieu / salle séminaire IDF (catalogue) | `/lieux` | garder, **différencier** de la ligne au-dessus |
| séminaire château proche Paris | `/seminaire-chateau-proche-paris` | garder (retirer ce mot-clé des mots-clés IDF) |
| séminaire Chantilly | `/seminaire-chateau-chantilly` | garder |
| séminaire Oise 60 | `/seminaire-chateau-oise-60` | **re-cibler département**, inventaire CRM |
| séminaire Yvelines 78 | `/seminaire-chateau-yvelines-78` | **re-cibler département**, retirer Chevreuse |
| séminaire vallée de Chevreuse | `/seminaire-vallee-de-chevreuse` | garder, page propriétaire du sujet |
| séminaire 92 / 91 / 77 / 95 | landings de département | garder |
| team building château | `/team-building-chateau` | garder |
| team building Chantilly / 92 / 95 | landings format | garder, **à inscrire au registre** |
| journée d'étude | `/journee-etude-seminaire` | 0 clic sur 90 j ; l'article `/blog/seminaire-residentiel-vs-journee` capte le sujet → enrichir ou fusionner |
| budget / prix d'un séminaire | `/budget-seminaire-entreprise` | **arbitrer contre** `/blog/combien-coute-seminaire-chateau-2026`, propriétaire déclaré aujourd'hui |
| soirée d'entreprise, gala | `/seminaires-soirees-entreprise` | garder |
| alternative à Châteauform' | `/alternative-chateauform` | garder, rediriger l'article vers elle |

---

## 12. Ce que vaudrait le travail

Quinze requêtes ont déjà du volume et sont coincées entre la 11ᵉ et la 30ᵉ place. Les amener en 5ᵉ position :

| Requête | Impressions/90 j | Position | Clics estimés en pos. 5 |
|---|---|---|---|
| team building chantilly | 932 | 14,9 | 56 |
| séminaire yvelines | 783 | 21,5 | 47 |
| seminaire oise (2 variantes) | 566 | 27,7 | 34 |
| séminaire chantilly | 306 | 27,5 | 18 |
| chateau team building | 249 | 18,5 | 15 |
| *(+ 10 autres)* | 1 332 | — | 80 |
| **Total** | **4 168** | — | **≈ 250 clics / 90 j** |

**Le site fait 300 clics sur 90 jours aujourd'hui. Ces quinze requêtes, bien placées, le doubleraient.**

Ordre de grandeur : ~100 clics/mois produisent aujourd'hui ~7 demandes de devis/mois. À transformation constante, doubler les clics c'est passer de 7 à 14 demandes par mois.

---

## 13. Par quoi commencer

### Cette semaine — 1 journée, risque évité

1. **Sortir la note « avis » du gabarit racine.** C'est le seul point qui peut coûter tous vos résultats enrichis d'un coup, et il est sur 368 pages depuis le 01/09.
2. **Corriger l'adresse de référence de `/devis/merci`** — une ligne, et c'est votre page devis qui est en jeu.
3. **Retirer la promesse « réponse personnelle sous 24h »** de la page auteur : opposable par un client, sur une personne qui n'existe pas.

### Ensuite — 2 à 3 jours, le plus rentable

4. **Compléter le registre de clusters** (9 pages manquantes) : sans ça, l'agent éditorial recreuse le trou toutes les heures.
5. **Régler la cannibalisation zone par zone** (Yvelines/Chevreuse, Chantilly/Oise) : c'est là que sont les 250 clics.
6. **Basculer la signature du blog** sur « L'équipe Select Châteaux ».

### Puis — 1 jour

7. **Rendre la page budget citable** : afficher la date de mise à jour et la poser dans le balisage ; reformuler la première phrase en réponse autonome (« En Île-de-France, un séminaire en château coûte entre 124 et 746 € par personne et par jour, médiane 417 €, sur 188 devis traités en 2025-2026 ») ; faire pointer chaque article qui parle de prix vers elle.
8. **Trancher l'incohérence 4 vs 68 lieux** et l'écrire en toutes lettres.

### Ce qu'il ne faut PAS faire

- Retoucher `robots.txt` ou enrichir `llms.txt` : déjà optimaux, rendement nul.
- Réécrire les pages zones « pour capter plus d'IA » : elles font déjà 2 700 à 4 700 mots, et Google ne déclenche quasiment pas de réponse générative sur les requêtes d'achat local.
- Compter PR #23 comme un gain acquis : son effet n'est pas mesurable.

---

## 14. Ce qui reste à mesurer

- **Les devis venant du blog.** Depuis la pose du marqueur le 06/09 : 9 demandes, **dont 0 issue d'un article**. Échantillon de deux semaines — direction, pas preuve. À recompter début novembre. Si le blog produit 69 % des clics et 0 % des devis, tout l'arbitrage éditorial change.
- **Les clics réellement issus des réponses IA.** L'export fourni n'a pas de colonne clics. À réexporter avec la métrique activée, maintenant que l'accès API est rétabli.
- **Le panel de sondes LLM de Marcus** donne 0 citation sur 11 requêtes, là où une vérification manuelle en trouve deux. Le panel est à revoir avant d'en tirer une tendance.
- **La présence directe dans ChatGPT, Claude et Perplexity** (hors moteur de recherche). Dix minutes de test manuel.

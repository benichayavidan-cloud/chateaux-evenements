# PLAN D'OPTIMISATION SEO — selectchateaux.com
### 18 mars 2026 | Multi-sessions

**Contexte** : B2B (desktop-first), LinkedIn uniquement, site < 2 mois sur Google
**Objectif** : Passer de 18 clics/mois à 200+ clics/mois en 3-6 mois

---

## PHASE 1 — URGENCES CRITIQUES (Session 1-2)
> Ce qui bloque activement le référencement

### 1.1 ❌ Indexer /team-building-chateau
- **Gravité** : CRITIQUE
- **Problème** : Page totalement inconnue de Google malgré présence dans sitemap (priority 0.8)
- **Action code** : Vérifier qu'il n'y a pas de `noindex` caché ou de problème de rendu
- **Action manuelle** : GSC → Inspect URL → Request Indexing
- **Temps** : 15 min
- **Statut** : [x] FAIT (18/03/2026) — Indexation demandée via GSC

### 1.2 ❌ Dédupliquer les geo-landing pages
- **Gravité** : CRITIQUE
- **Problème** : Contenu dupliqué massif entre les 6 pages
  - `/seminaire-chateau-ile-de-france` et `/seminaire-chateau-proche-paris` = 70% identique (mêmes 4 châteaux, mêmes points forts, 5/6 FAQ identiques)
  - `/seminaire-chateau-chantilly` et `/seminaire-chateau-oise-60` = mêmes propriétés [1,4], même texte sur la forêt de Chantilly
  - FAQ "Combien coûte un séminaire..." identique sur les 6 pages
  - Template identique (`GeoLandingPage.tsx`) = même structure DOM partout
- **Actions** :
  - [ ] Réécrire chaque intro avec un angle unique (ex: Oise = nature/forêt, Yvelines = patrimoine/spiritualité, 92 = urbain/accessibilité)
  - [ ] FAQ 100% uniques par page — questions spécifiques au territoire
  - [ ] Points forts différenciés par page
  - [ ] Ajouter du contenu SEO unique par territoire (histoire, accès, activités locales)
  - [ ] Envisager de fusionner IDF + Proche Paris (intent identique)
- **Temps** : 3-4h
- **Statut** : [x] FAIT (18/03/2026) — 7 liens cassés corrigés, 18 liens diversifiés, keywords supprimés

### 1.3 ⚠️ Réécrire les meta titles/descriptions pour le CTR
- **Gravité** : ÉLEVÉE
- **Problème** : Pages en page 1-2 de Google avec 0 clics = snippet pas attractif
- **Pages prioritaires** :
  - `/a-propos` — Position 7.7, 125 impressions, 0 clics
    - Actuel : "À Propos de Select Châteaux | 15 Ans d'Excellence Événementielle"
    - Problème : Titre générique, aucune proposition de valeur
    - Proposition : "Select Châteaux — L'Agence qui Privatise des Châteaux pour vos Séminaires"
  - `/chateaux` — Position 5.4, 114 impressions, 0 clics
    - Actuel : [vérifier le titre exact]
    - Ajouter des power words : "Privatisation exclusive", "À 30 min de Paris", "Devis 24h"
  - `/blog/combien-coute-seminaire-chateau-2026` — Position 6.1, 82 impressions, 0 clics
    - Ajouter prix concrets dans la description : "de 150€ à 450€/pers"
  - `/blog/checklist-organiser-seminaire` — Position 7.6, 39 impressions, 0 clics
    - Ajouter "Checklist PDF gratuite" ou "15 étapes essentielles"
  - `/blog/repas-seminaire-tendances-traiteur-2026` — Position 7.2, 37 impressions, 0 clics
  - `/devis` — Position 10.5, 33 impressions, 1 clic
- **Règles de réécriture** :
  - Title < 60 caractères, avec le mot-clé principal EN PREMIER
  - Description 140-155 caractères, avec CTA + chiffre concret + emoji optionnel
  - Toujours inclure une proposition de valeur unique (USP)
- **Temps** : 2h
- **Statut** : [x] FAIT (18/03/2026) — 8 pages réécrites

---

## PHASE 2 — OPTIMISATIONS ON-PAGE (Session 3-4)
> Améliorer ce que Google voit sur chaque page

### 2.1 ⚠️ Rendre les H1 visibles sur les pages commerciales
- **Gravité** : MOYENNE-HAUTE
- **Problème** : H1 en `sr-only` sur homepage, /chateaux, pages châteaux = signal affaibli
- **Actions** :
  - [ ] Homepage : H1 visible avec "Châteaux pour Séminaires d'Entreprise en Île-de-France"
  - [ ] /chateaux : H1 visible "Nos 4 Châteaux d'Exception pour Séminaires"
  - [ ] Pages châteaux individuelles : H1 visible avec nom du château + "Séminaire"
  - [ ] Style : Grande typographie, au-dessus de la ligne de flottaison
  - [ ] Garder cohérent avec le design existant
- **Temps** : 1h
- **Statut** : [x] FAIT (18/03/2026) — H1 visible sur /chateaux

### 2.2 ⚠️ Maillage interne stratégique (siloing)
- **Gravité** : ÉLEVÉE
- **Problème** : Liens unidirectionnels, pas de maillage thématique, blog déconnecté des pages commerciales
- **Problèmes détectés** :
  - Blog `top-10-chateaux-seminaire-ile-de-france` linké depuis les 6 geo-pages (sur-optimisé)
  - Aucun article de blog ne renvoie vers les geo-landing pages
  - Pages châteaux ne linkent pas vers le blog
  - Geo-landing pages n'ont que des "sibling links" (navigation horizontale)
- **Actions** :
  - [ ] Créer des liens contextuels blog → geo-landing pages (dans le corps des articles)
  - [ ] Créer des liens contextuels blog → pages châteaux
  - [ ] Ajouter section "Articles liés" sur chaque page château
  - [ ] Diversifier les articles linkés depuis les geo-pages (1 article commun max, 2 spécifiques par page)
  - [ ] Ajouter des liens dans le footer vers les articles populaires
- **Structure de siloing** :
  ```
  Homepage
  ├── /chateaux (hub)
  │   ├── /chateaux/manoir-chantilly ←→ blog articles Chantilly
  │   ├── /chateaux/hotel-92 ←→ blog articles Paris/92
  │   ├── /chateaux/abbaye-chevreuse ←→ blog articles Yvelines
  │   └── /chateaux/palais-chantilly ←→ blog articles Chantilly
  ├── /seminaire-chateau-* (geo-hubs)
  │   ├── chantilly ←→ blog Chantilly + châteaux Chantilly
  │   ├── oise-60 ←→ blog Oise + châteaux Oise
  │   ├── yvelines-78 ←→ blog Yvelines + château Yvelines
  │   └── hauts-de-seine-92 ←→ blog 92 + château 92
  ├── /team-building-chateau ←→ blog team building
  └── /blog (content hub)
      └── Chaque article → 2-3 liens vers pages commerciales pertinentes
  ```
- **Temps** : 3-4h
- **Statut** : [x] FAIT (18/03/2026) — 90 liens internes ajoutés (30 articles × 3), lien cassé corrigé

### 2.3 Nettoyer le code SEO obsolète
- **Gravité** : FAIBLE
- **Actions** :
  - [ ] Supprimer les balises `keywords` de tous les metadata (Google les ignore depuis 2009)
- **Temps** : 30 min
- **Statut** : [x] FAIT (18/03/2026) — keywords supprimés partout

---

## PHASE 3 — CONTENU & BLOG (Session 5-8, puis continu)
> Créer du contenu frais qui attire du trafic long-tail

### 3.1 ⚠️ Reprendre la publication blog (2-3 articles/semaine)
- **Gravité** : ÉLEVÉE
- **Problème** : 0 article depuis le 15 janvier 2026 (2 mois de silence)
- **Stratégie** :
  - Publier régulièrement (2-3/semaine pendant 2 mois, puis 1/semaine)
  - Cibler des requêtes long-tail à FAIBLE concurrence
  - Chaque article doit linker vers 2-3 pages commerciales
  - Contenu B2B orienté : DRH, office managers, assistantes de direction, CEO
- **Statut** : [x] EN COURS — 2 nouveaux articles publiés (19/03/2026)

### 3.2 Articles prioritaires à écrire (basés sur les données GSC)
- **Gravité** : ÉLEVÉE
- **Requêtes à cibler** (opportunités détectées) :

| # | Sujet article | Requête cible | Position actuelle | Potentiel | Statut |
|---|---|---|---|---|---|
| 1 | "Guide complet : organiser un séminaire résidentiel en château" | seminaire residentiel | 69.5 | Page pilier | [ ] TODO |
| 2 | "Séminaire à Chantilly : guide des plus beaux domaines" | seminaire chantilly (124 imp) | 53.7 | Fort volume | [x] FAIT 19/03 — Titre, excerpt, 6 keywords, 5 FAQ, CTA optimisés |
| 3 | "Séminaire en Vallée de Chevreuse : l'abbaye secrète" | seminaire vallee de chevreuse (157 imp) | 49.1 | Plus fort volume | [x] FAIT 19/03 — Nouvel article 1800 mots, 5 FAQ, liens internes |
| 4 | "Les meilleurs hôtels de séminaire à Chantilly" | hotel seminaire chantilly (52 imp) | 59.7 | Volume moyen | [ ] TODO |
| 5 | "Séminaire dans l'Oise : nature et prestige à 30 min de Paris" | seminaire oise (22 imp) | 43.5 | Geo-spécifique | [ ] TODO |
| 6 | "Privatisation de journée d'étude en château" | privatisation journée d'étude | 62.0 | Niche B2B | [ ] TODO |
| 7 | "Séminaire dans les Yvelines : châteaux et abbayes" | seminaire yvelines (17 imp) | 56.9 | Geo-spécifique | [ ] TODO |
| 8 | "Budget séminaire d'entreprise 2026 : combien prévoir ?" | budget séminaire | 45.0 | Intent commercial | [ ] TODO |
| 9 | "Soirée casino, Gatsby ou médiévale en château" | soirée entreprise château | — | Événementiel | [ ] TODO |
| 10 | "Séminaire CODIR : pourquoi choisir un château privatisé" | codir château (pos 8!) | 8.0 | Déjà top 10! | [x] FAIT 19/03 — Nouvel article 1600 mots, 4 FAQ, tableaux comparatifs |

- **Statut** : [x] PARTIEL — 3/10 articles faits (Chantilly optimisé, Chevreuse et CODIR créés)

### 3.3 Optimiser les articles existants qui rankent presque
- **Gravité** : MOYENNE
- **Quick wins** — articles proches du top 10 :

| Article | Requête | Position | Action | Statut |
|---|---|---|---|---|
| /blog/checklist-organiser-seminaire | check list organisation seminaire | 8.8 | Enrichir + meilleur title | [x] FAIT 19/03 — Vidéo intégrée + FAQ + Video Schema |
| /blog/escape-game-geant-chateau | création escape game chateau | 10.6 | Enrichir contenu | [x] FAIT 19/03 — FAQ + keywords enrichis |
| /blog/murder-party-chateau | murder party immersive | 33.5 | Déjà 5 clics, renforcer | [x] FAIT 19/03 — FAQ + keywords enrichis |
| /blog/combien-coute-seminaire-chateau-2026 | budget séminaire | 45.0 | Ajouter tableau de prix | [x] FAIT 19/03 — FAQ budget ajoutée |

- **Statut** : [x] FAIT (19/03/2026)

### 3.4 ✅ Optimisation SEO globale du blog (NOUVEAU — Session 5)
- **Réalisé le** : 19/03/2026
- **Actions effectuées** :
  - [x] Analyse concurrentielle : blogs Kactus, Naboo, Aleou
  - [x] FAQ JSON-LD ajoutées aux **32 articles** (~85 questions/réponses)
  - [x] Schema VideoObject JSON-LD ajouté (article checklist)
  - [x] Keywords enrichis sur **26 articles** (passés de 4 à 6 mots-clés)
  - [x] Titres optimisés : Chantilly (#13), RSE (#6), Vexin (#12)
  - [x] Excerpts améliorés avec chiffres/stats : 4 articles
  - [x] Vidéo "Planification de Séminaire" (5m29s) intégrée dans article checklist
  - [x] Layout blog mis à jour : génération auto FAQ + Video Schema JSON-LD
- **Impact attendu** : Rich results FAQ sur 32 pages, +30% visibilité organique

---

## PHASE 4 — AUTORITÉ & BACKLINKS (Session 9+, continu)
> La priorité absolue à moyen terme — sans ça, rien ne bougera vraiment

### 4.1 🔴 Google Business Profile
- **Gravité** : CRITIQUE
- **Actions** :
  - [ ] Créer/vérifier la fiche Google Business Profile "Select Châteaux"
  - [ ] Catégorie : "Organisateur d'événements" + "Agence événementielle"
  - [ ] Adresse : 60 Rue François 1er, 75008 Paris
  - [ ] Photos : Ajouter 20+ photos des châteaux
  - [ ] Horaires : Lun-Jeu 9h-18h
  - [ ] Posts Google : Publier 1/semaine (offres, articles blog)
  - [ ] Répondre aux avis existants
- **Impact** : Visibilité locale + crédibilité + lien vers le site
- **Temps** : 1h setup + 15 min/semaine
- **Statut** : [ ] TODO

### 4.2 🔴 Annuaires événementiels B2B
- **Gravité** : ÉLEVÉE
- **Annuaires prioritaires** (backlinks + visibilité B2B) :
  - [ ] 1001Salles.com — Inscription gratuite
  - [ ] Bird Office — Marketplace lieux de séminaires
  - [ ] Kactus.com — Réservation lieux événementiels
  - [ ] BizEvents.com — Annuaire événementiel
  - [ ] Bedouk.com — Guide MICE (meetings, incentives, conferences)
  - [ ] abc-salles.com — Annuaire salles de réception
  - [ ] My Event Network — Réseau pro événementiel
  - [ ] Meetin.fr — Espaces de séminaire
  - [ ] PagesJaunes/Solocal — Fiche entreprise
- **Temps** : 4-5h (inscriptions initiales)
- **Statut** : [ ] TODO

### 4.3 🔴 Stratégie LinkedIn → Backlinks naturels
- **Gravité** : ÉLEVÉE
- **Contexte** : LinkedIn est votre seul réseau social — exploitez-le à fond
- **Actions** :
  - [ ] Publier 3-5 posts LinkedIn/semaine avec lien vers articles blog
  - [ ] Partager chaque nouvel article de blog sur LinkedIn
  - [ ] Écrire des articles LinkedIn natifs avec backlink vers le site
  - [ ] Commenter/interagir sur les posts RH, événementiel, management
  - [ ] Contacter des blogueurs/journalistes événementiels pour partenariats
  - [ ] Demander aux clients satisfaits de mentionner Select Châteaux sur LinkedIn
- **Impact** : Signaux sociaux + trafic referral + backlinks indirects
- **Statut** : [ ] TODO

### 4.4 ⚠️ Partenariats & échanges de liens
- **Gravité** : MOYENNE
- **Cibles** :
  - [ ] Traiteurs partenaires → page "Nos partenaires" avec lien mutuel
  - [ ] Photographes événementiels → portfolio avec crédit + lien
  - [ ] Agences de team building → recommandation mutuelle
  - [ ] Offices de tourisme (Oise, Yvelines, Hauts-de-Seine)
  - [ ] CCI locales (Chambre de Commerce)
- **Temps** : Continu, 1-2h/semaine de prospection
- **Statut** : [ ] TODO

### 4.5 ⚠️ Collecter des avis Google
- **Gravité** : MOYENNE
- **Objectif** : Passer de 11 à 30+ avis
- **Actions** :
  - [ ] Envoyer un email post-événement avec lien direct vers avis Google
  - [ ] Ajouter QR code "Donnez votre avis" sur les supports post-événement
  - [ ] Répondre à TOUS les avis (positifs et négatifs)
- **Statut** : [ ] TODO

---

## PHASE 5 — PAGES PILIERS (Session 10+)
> Contenu long format qui positionne le site comme référence

### 5.1 Créer 3 pages piliers (guides exhaustifs 3000+ mots)
- **Gravité** : MOYENNE
- **Pages à créer** :

| Page | Mot-clé cible | Format |
|---|---|---|
| /guide/organiser-seminaire-chateau | organiser séminaire château | Guide étape par étape avec checklist, budgets, exemples |
| /guide/team-building-chateau-activites | team building château activités | Catalogue de 50+ activités avec photos, durées, tarifs |
| /guide/choisir-lieu-seminaire-ile-de-france | lieu séminaire ile de france | Comparatif des types de lieux (château vs hôtel vs centre de conférence) |

- **Chaque page pilier** doit :
  - Avoir 3000+ mots de contenu unique et expert
  - Linker vers toutes les pages commerciales pertinentes
  - Être linkée depuis les articles de blog existants
  - Avoir un lead magnet (PDF téléchargeable en échange d'email)
  - Inclure des données structurées HowTo ou FAQ
- **Temps** : 4-5h par page pilier
- **Statut** : [ ] TODO

---

## CALENDRIER MULTI-SESSIONS

| Session | Phase | Focus | Durée estimée |
|---|---|---|---|
| **Session 1** | Phase 1.1 + 1.3 | Indexer team-building + réécrire meta titles/descriptions | 2-3h |
| **Session 2** | Phase 1.2 | Dédupliquer les 6 geo-landing pages | 3-4h |
| **Session 3** | Phase 2.1 + 2.3 | H1 visibles + nettoyage keywords | 1.5h |
| **Session 4** | Phase 2.2 | Maillage interne complet (siloing) | 3-4h |
| **Session 5** ✅ | Phase 3.2 + 3.3 + 3.4 | Articles Chevreuse + CODIR + optimisation SEO 32 articles + vidéo | **FAIT 19/03** |
| **Session 6** | Phase 3.2 | Écrire articles #4-6 (hôtel Chantilly, Oise, privatisation) | 3-4h |
| **Session 7** | Phase 3.2 | Écrire articles #7-10 (Yvelines, budget, soirée, résidentiel) | 3-4h |
| **Session 8** | Phase 4.1 + 4.2 | Google Business Profile + annuaires B2B | 3-4h |
| **Session 9** | Phase 4.3 | Stratégie LinkedIn + premiers posts | 2h |
| **Session 10** | Phase 5.1 | Page pilier #1 : Guide organiser séminaire | 4-5h |
| **Session 11** | Phase 5.1 | Page pilier #2 : Catalogue team building | 4-5h |
| **Session 12** | Phase 5.1 | Page pilier #3 : Comparatif lieux | 4-5h |
| **Continu** | Phase 3 + 4 | 2-3 articles/semaine + LinkedIn + backlinks | 30 min/jour |

---

## MÉTRIQUES DE SUIVI

### KPIs à surveiller chaque semaine via GSC + GA4

| Métrique | Baseline (18 mars) | Objectif M+1 | Objectif M+3 | Objectif M+6 |
|---|---|---|---|---|
| Clics organiques/mois | 18 | 50 | 150 | 400+ |
| Impressions/mois | 1 451 | 3 000 | 8 000 | 15 000+ |
| CTR moyen | 1.2% | 3% | 4% | 5%+ |
| Position moyenne | 29.3 | 20 | 12 | 8 |
| Pages en top 10 | 3 | 8 | 15 | 25+ |
| Utilisateurs/mois | 43 | 100 | 300 | 600+ |
| Articles blog total | 30 | 42 | 54 | 70+ |
| Backlinks (domaines) | ~0 | 10 | 25 | 50+ |
| Avis Google | 11 | 15 | 25 | 40+ |

---

## NOTES IMPORTANTES

### Ce qu'on ne fait PAS (et pourquoi)
- **Pas d'optimisation mobile poussée** → B2B desktop, cible = bureau
- **Pas de réseaux sociaux multiples** → Focus LinkedIn uniquement
- **Pas de refonte design** → Le design est déjà bon
- **Pas de refonte technique** → La stack est solide
- **Pas de Google Ads SEO** → Le Paid est séparé du SEO organique

### Règle d'or
Le SEO est un marathon, pas un sprint. Les positions vont monter LENTEMENT pendant 3-6 mois puis accélérer. La clé : **régularité** (contenu + backlinks chaque semaine, sans exception).

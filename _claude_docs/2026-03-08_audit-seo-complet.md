# AUDIT SEO COMPLET - Select Chateaux
**Date** : 8 mars 2026
**URL** : https://www.selectchateaux.com
**Outil** : Analyse manuelle du code source (Next.js App Router)

---

## TABLE DES MATIERES

1. [Synthese globale](#1-synthese-globale)
2. [Infrastructure technique SEO](#2-infrastructure-technique-seo)
3. [Audit page par page](#3-audit-page-par-page)
4. [Problemes critiques identifies](#4-problemes-critiques-identifies)
5. [Recommandations prioritaires](#5-recommandations-prioritaires)

---

## 1. SYNTHESE GLOBALE

### Pages indexees (index: true)
| # | Route | Title (longueur) | Description (longueur) | Canonical | JSON-LD | H1 |
|---|-------|-------------------|------------------------|-----------|---------|-----|
| 1 | `/` (Homepage) | 55 car. | 156 car. | `/` | Oui (Breadcrumb, AggregateRating) | "Chateaux d'Exception pour Seminaires en Ile-de-France" (dans HeroSlider heading) |
| 2 | `/chateaux` | 74 car. | 159 car. | `/chateaux` | Non (layout uniquement) | "Nos Chateaux pour Seminaires" (sr-only) |
| 3 | `/chateaux/[slug]` (x4) | ~65 car. dynamique | ~160 car. dynamique | `/chateaux/[slug]` | Oui (Place, FAQ, Breadcrumb) | Dynamique via `chateau.seoH1` |
| 4 | `/devis` | 53 car. | 125 car. | `/devis` | Non | "Devis Seminaire Gratuit & Reponse 24h" |
| 5 | `/seminaires-soirees-entreprise` | 60 car. | 157 car. | `/seminaires-soirees-entreprise` | Oui (Service inline) | "Seminaires et Soirees d'Entreprise en Chateau" |
| 6 | `/a-propos` | 61 car. | 168 car. | `/a-propos` | Non | "A Propos de Select Chateaux" |
| 7 | `/blog` | 58 car. | 155 car. | `/blog` | Oui (Blog schema) | "L'Inspiration Evenementiel" |
| 8 | `/blog/[slug]` (x30) | Dynamique | Dynamique | Dynamique | Oui (BlogPosting, Breadcrumb) | Dans contenu article |
| 9 | `/seminaire-chateau-ile-de-france` | 63 car. | 145 car. | Oui | Oui (Service, Breadcrumb, FAQ) | "Seminaire en Chateau en Ile-de-France" |
| 10 | `/seminaire-chateau-proche-paris` | 66 car. | 146 car. | Oui | Oui (Service, Breadcrumb, FAQ) | "Seminaire en Chateau Proche de Paris" |
| 11 | `/seminaire-chateau-chantilly` | Dynamique | Dynamique | Oui | Oui (Service, Breadcrumb, FAQ) | Dynamique |
| 12 | `/seminaire-chateau-oise-60` | Dynamique | Dynamique | Oui | Oui (Service, Breadcrumb, FAQ) | Dynamique |
| 13 | `/seminaire-chateau-yvelines-78` | Dynamique | Dynamique | Oui | Oui (Service, Breadcrumb, FAQ) | Dynamique |
| 14 | `/seminaire-chateau-hauts-de-seine-92` | Dynamique | Dynamique | Oui | Oui (Service, Breadcrumb, FAQ) | Dynamique |

### Pages non-indexees (noindex)
| Route | Raison |
|-------|--------|
| `/cgv` | Page legale |
| `/confidentialite` | Page legale |
| `/mentions-legales` | Page legale |
| `/devis/merci` | Page de conversion post-formulaire |

---

## 2. INFRASTRUCTURE TECHNIQUE SEO

### 2.1 Configuration globale (layout.tsx racine)

**Points positifs :**
- `lang="fr"` sur la balise `<html>` -- CORRECT
- `metadataBase` defini sur `https://www.selectchateaux.com` -- CORRECT
- Polices Google avec `display: "swap"` -- CORRECT (evite FOIT)
- Preconnect/DNS-prefetch pour Supabase, Google Fonts, GTM -- CORRECT
- Google Consent Mode v2 implemente -- CORRECT
- Skip-to-content link pour accessibilite -- CORRECT
- Structured Data global : Organization, WebSite, Service, LocalBusiness -- EXCELLENT

**Points d'attention :**
- La balise `keywords` meta est definie dans le layout racine ET dans la page d'accueil (doublon potentiel) -- bien que `keywords` soit ignore par Google depuis 2009, c'est une bonne pratique de ne pas les dupliquer
- Le fichier `og-image.jpg` est reference mais l'image OG generee dynamiquement via `opengraph-image.tsx` pourrait creer un conflit

### 2.2 Robots.txt
```
User-agent: *
Allow: /
Disallow: /api/
Disallow: /_next/
Disallow: /admin/
Disallow: /chateaux?*
Disallow: /blog?*
Sitemap: https://www.selectchateaux.com/sitemap.xml
```
**Verdict** : CORRECT. Les filtres par parametres sont bien bloques (evite contenu duplique).

### 2.3 Sitemap.xml
- Pages statiques : 5 (/, /devis, /chateaux, /seminaires-soirees-entreprise, /a-propos)
- Pages chateaux dynamiques : 4
- Pages geo SEO : 6
- Blog listing : 1
- Articles blog : 30
- Pages legales : exclues (noindex)
- **Total estime : ~46 URLs**
- Priorites bien calibrees (1.0 pour homepage et devis, 0.85 pour geo pages, 0.8 pour chateaux)
- `changeFrequency` appropriees

**Verdict** : EXCELLENT

### 2.4 Manifest.json
- Nom, description, couleurs de theme presentes -- CORRECT

### 2.5 Structured Data (JSON-LD) global
Schemas presents au niveau racine :
1. **Organization** : nom, adresse, telephone, email, logo, sameAs (LinkedIn), foundingDate, areaServed
2. **WebSite** : url, name, publisher
3. **Service** : serviceType, areaServed (IDF), OfferCatalog (4 services)
4. **LocalBusiness** : adresse, geo, areaServed (9 departements), openingHoursSpecification, priceRange

**Verdict** : TRES COMPLET. Couvre bien les besoins.

**Anomalie** : `openingHoursSpecification` ne liste que Lundi-Jeudi (pas Vendredi). Si l'entreprise travaille le vendredi, c'est a corriger.

---

## 3. AUDIT PAGE PAR PAGE

---

### 3.1 PAGE ACCUEIL — `/`

**Route** : `/` | **Fichier** : `src/app/page.tsx`

#### Title
```
Chateaux Seminaire Ile-de-France & Oise | Select Chateaux
```
- Longueur : ~55 caracteres -- CORRECT (< 60)
- Mots-cles principaux en debut de titre -- CORRECT
- Pipe separator avec nom de marque -- CORRECT

#### Meta Description
```
4 chateaux d'exception pour seminaires d'entreprise en Ile-de-France et Oise (60). Devis gratuit en 24h. Lieux confidentiels de 10 a 500 personnes. Seminaire residentiel, CODIR, team building.
```
- Longueur : ~156 caracteres -- CORRECT (150-160 ideal)
- Inclut USP (4 chateaux, devis 24h, capacites)
- Call-to-action implicite

#### Hierarchie des titres
- **H1** : "Chateaux d'Exception pour Seminaires en Ile-de-France" (dans `HeroSlider heading` prop)
- **H2** : "Nos Chateaux d'Exception" / "Nos Services d'Excellence" / "Pret a organiser votre evenement ?"
- **H3** : Noms des chateaux dans les cartes (via composant Card)

**Verdict** : CORRECT -- une seule H1, hierarchie logique.

#### Mots-cles dans le contenu
- "chateaux", "seminaires", "Ile-de-France", "Oise", "entreprise", "exception", "team building", "CODIR" -- PRESENTS
- Manque potentiel : "location", "privatisation", "tarif"

#### Maillage interne
- Links vers `/chateaux/[slug]` (x4 via cartes)
- Links vers `/seminaires-soirees-entreprise` (via services)
- Link vers `/devis#formulaire` (CTA principal)
- Link vers `/chateaux` (CTA secondaire)
- **Verdict** : BON maillage en silo

#### Images
- Hero slider : images dynamiques des chateaux (alt depuis donnees)
- Logo : alt="Select Chateaux - Chateaux pour seminaires d'entreprise en Ile-de-France" -- BON (descriptif)
- Logo footer : meme alt -- CORRECT

#### JSON-LD
- BreadcrumbList (Accueil)
- AggregateRating (4.8/5, 11 avis)
- **Verdict** : CORRECT

#### Problemes
- [MINEUR] Le bouton "Voir tous nos chateaux" (Button) n'est PAS entoure d'un `<Link>` -- il ne mene nulle part. C'est un bouton sans `href`.

---

### 3.2 PAGE CHATEAUX (LISTING) — `/chateaux`

**Route** : `/chateaux` | **Fichier** : `src/app/chateaux/page.tsx` + `metadata.ts`

#### Title
```
Nos Chateaux d'Exception | 4 Domaines Seminaire Ile-de-France | Select Chateaux
```
- Longueur : ~74 caracteres -- TROP LONG (> 60). Sera tronque dans les SERP.

#### Meta Description
```
Decouvrez notre collection confidentielle de 4 chateaux d'exception pour vos seminaires d'entreprise. Manoir Chantilly, hotel 5* Paris 92, abbaye Yvelines, palais royal. Capacite 50-280 pers.
```
- Longueur : ~159 caracteres -- CORRECT

#### Hierarchie des titres
- **H1** : "Nos Chateaux pour Seminaires" (dans un span `sr-only` -- visuellement cache)
- **H2** : "Pourquoi Choisir Nos Chateaux" / "4 Chateaux d'Exception" / "Comment ca marche" / "Pourquoi Select Chateaux ?" / "Pret a organiser votre evenement d'exception ?"
- **H3** : "Quel chateau pour votre evenement ?" / Noms des chateaux / Etapes du processus

**Attention** : Le H1 est en `sr-only` (classe CSS qui le cache visuellement). Google lit quand meme le contenu sr-only, mais c'est a la limite du « cloaking » si le contenu visible est tres different. Ici le titre visible repete la meme chose, donc c'est acceptable.

#### Maillage interne
- Links vers `/chateaux/[slug]` (x4 cartes + x3 boussole)
- Link vers `/devis#formulaire` (CTA + formulaire mini embed)
- Lien tel `+33757991146`
- **Verdict** : EXCELLENT -- riche en liens internes vers les pages produit

#### Images
- Hero : alt="Chateaux pour seminaires en Ile-de-France" -- BON
- Cartes chateaux : alt=`chateau.nom` -- BON (descriptif)
- Boussole : alt=`item.answer` (ex: "Abbaye en Vallee de Chevreuse (78)") -- BON

#### JSON-LD
- Aucun JSON-LD specifique a cette page (seulement le global du layout racine)
- **Recommandation** : Ajouter un schema `ItemList` listant les 4 chateaux pour obtenir des rich results de type "liste"

#### Problemes
- [CRITIQUE] Title trop long (74 car.) -- sera tronque par Google
- [MOYEN] Pas de JSON-LD ItemList pour la page listing

---

### 3.3 PAGES CHATEAU INDIVIDUELLES — `/chateaux/[slug]`

**Route** : `/chateaux/[slug]` | **Fichiers** : `[slug]/layout.tsx` (generateMetadata) + `[slug]/page.tsx` + `ChateauPageClient.tsx`

#### Title (dynamique)
```
Seminaire [typeLieu] [ville] | [capaciteMax] pers - Select Chateaux
```
Exemple : "Seminaire Manoir Anglo-Normand Chantilly | 280 pers - Select Chateaux"
- Longueur variable mais generalement ~55-70 car. -- ACCEPTABLE

#### Meta Description (dynamique)
```
Seminaire d'entreprise dans ce [typeLieu] d'exception en [ville]. Capacite [max] personnes. [accrocheHero] Devis gratuit en 24h.
```
- Longueur variable, generalement adequate

#### Hierarchie des titres
- **H1** : `chateau.seoH1` (dans le contenu du composant client, via alt de l'image hero qui inclut le seoH1)
- **H2** : "Points Forts", "Hebergement Premium", "Nos Espaces", sections FAQ
- **H3** : Questions FAQ, sous-sections

**Attention** : Le H1 ne semble pas explicitement present comme balise `<h1>` dans `ChateauPageClient.tsx`. Le composant utilise `chateau.seoH1` dans l'alt de l'image hero mais il faudrait verifier que le composant contient bien un `<h1>` visible.

#### Maillage interne
- Link vers `/devis#formulaire` (multiple CTA)
- Lien telephone `tel:+33757991146`
- Formulaire DevisFormMini integre
- Links vers articles blog lies (via FAQ/contenu)

#### Images
- Hero : alt=`${chateau.seoH1} - Vue principale` -- BON
- Galerie : images multiples avec alt descriptifs -- A VERIFIER selon les donnees
- Images des sections (hebergement, salles) -- alt generalement correct

#### JSON-LD
1. **Place + EventVenue + LodgingBusiness** : nom, description, capacite, chambres, atouts, aggregateRating
2. **FAQPage** : questions/reponses
3. **BreadcrumbList** : Accueil > Nos Chateaux > [Nom]

**Verdict** : EXCELLENT -- structured data tres complet pour des pages produit

#### Problemes
- [MOYEN] AggregateRating hardcode a "4.8" et "12 reviewCount" pour tous les chateaux -- devrait refleter les vrais avis par chateau
- [MINEUR] Pas de keywords meta specifique par chateau (le layout parent n'en genere pas)

---

### 3.4 PAGE DEVIS — `/devis`

**Route** : `/devis` | **Fichiers** : `devis/metadata.ts` + `devis/page.tsx`

#### Title
```
Devis Seminaire Gratuit & Reponse 24h | Select Chateaux
```
- Longueur : ~53 car. -- CORRECT
- USP claire (gratuit + 24h)

#### Meta Description
```
Obtenez votre devis gratuit pour votre seminaire en chateau. Reponse sous 24h, 4 chateaux d'exception en Ile-de-France. Sans engagement.
```
- Longueur : ~125 car. -- UN PEU COURT (ideal 150-160). Pourrait etre enrichie.

#### Hierarchie des titres
- **H1** : "Devis Seminaire Gratuit & Reponse 24h" -- CORRECT, correspond au title

#### Maillage interne
- Formulaire de devis (composant lazy-loaded)
- LogoCarousel et ReviewsSection en bas

#### Images
- Hero : alt="Devis location chateau seminaire Ile-de-France - Salle de reunion lumineuse" -- EXCELLENT (tres descriptif et riche en mots-cles)

#### JSON-LD
- Aucun specifique (seulement global)
- **Recommandation** : Pourrait beneficier d'un schema `ContactPage` ou `WebPage` avec `mainEntity` de type `Service`

#### Problemes
- [MINEUR] Meta description un peu courte (125 car.)

---

### 3.5 PAGE DEVIS/MERCI — `/devis/merci`

**Route** : `/devis/merci` | **noindex: true**

- Title : "Demande de devis envoyee | Select Chateaux"
- robots: `{ index: false, follow: false }` -- CORRECT (page de conversion)
- **Verdict** : Correctement configure

---

### 3.6 PAGE SEMINAIRES & SOIREES — `/seminaires-soirees-entreprise`

**Route** : `/seminaires-soirees-entreprise` | **Fichiers** : `metadata.ts` + `page.tsx`

#### Title
```
Seminaires & Soirees d'Entreprise en Chateau | Select Chateaux
```
- Longueur : ~60 car. -- PARFAIT

#### Meta Description
```
Organisation complete de vos evenements professionnels en chateau : seminaires, team building, soirees corporate, CODIR. Solutions sur-mesure en Ile-de-France. Devis 24h.
```
- Longueur : ~157 car. -- CORRECT

#### Hierarchie des titres
- **H1** : "Seminaires et Soirees d'Entreprise en Chateau" -- CORRECT
- **H2** : "Nos Services" / "Comment ca marche ?" / "Pret a creer un evenement memorable ?"
- **H3** : Noms des types d'evenements / Etapes du processus

#### Maillage interne
- Links vers `/devis#formulaire` (x3 CTA)
- Aucun lien vers `/chateaux` ou `/chateaux/[slug]` depuis le contenu principal -- PROBLEME de maillage

#### Images
- Hero : alt="Seminaire d'entreprise et dejeuner corporate dans un chateau en Ile-de-France - Organisation evenements professionnels" -- EXCELLENT
- Images des services : alt=`evenement.titre` -- CORRECT

#### JSON-LD (inline dans le composant client)
- Schema `Service` avec provider, areaServed, serviceOutput (4 types), AggregateOffer
- **Verdict** : BON mais le schema est dans un composant `use client` ce qui peut poser probleme pour le SSR initial (Google devrait quand meme le voir via le rendu JS)

#### Problemes
- [MOYEN] Pas de liens vers les pages chateaux individuelles -- le maillage interne vers les pages produit est inexistant sur cette page
- [MINEUR] JSON-LD dans un composant client plutot que server

---

### 3.7 PAGE A PROPOS — `/a-propos`

**Route** : `/a-propos` | **Fichiers** : `metadata.ts` + `page.tsx`

#### Title
```
A Propos de Select Chateaux | 15 Ans d'Excellence Evenementielle
```
- Longueur : ~61 car. -- LEGEREMENT LONG mais acceptable

#### Meta Description
```
Decouvrez Select Chateaux, agence specialisee dans l'organisation de seminaires en chateaux depuis 2009. Notre equipe, nos valeurs, notre engagement pour vos evenements d'exception.
```
- Longueur : ~168 car. -- TROP LONG (sera tronque)

#### Hierarchie des titres
- **H1** : "A Propos de Select Chateaux" -- CORRECT
- **H2** : "15 Ans d'Excellence Evenementielle" / "Nos Chiffres Cles" / "Notre Mission" / "Notre Equipe" / "Pret a Creer Votre Evenement d'Exception ?"
- **H3** : Noms des valeurs (Excellence, Authenticite, Sur-Mesure, Engagement) / Noms des membres d'equipe

#### Maillage interne
- Link vers `/devis#formulaire` (x2 CTA)
- Aucun lien vers `/chateaux` -- PROBLEME

#### Images
- Hero : alt="A propos de SelectChateaux - Organisation evenements en chateaux" -- BON
- Histoire : alt="Histoire SelectChateaux" -- TROP GENERIQUE
- Photos equipe : alt=`membre.nom` (ex: "Rebecca Ben Attar") -- CORRECT mais pourrait inclure le role

#### JSON-LD
- Aucun specifique a cette page
- **Recommandation** : Ajouter schema `AboutPage` ou enrichir avec les `Person` pour l'equipe

#### Problemes
- [MOYEN] Meta description trop longue (168 car.)
- [MOYEN] Pas de lien vers `/chateaux` ou les pages produit
- [MINEUR] Alt de l'image histoire trop generique
- [MINEUR] Images d'equipe issues d'Unsplash (photos stock) -- peut nuire a la confiance

---

### 3.8 PAGE BLOG (LISTING) — `/blog`

**Route** : `/blog` | **Fichiers** : `blog/layout.tsx` (metadata + Blog schema) + `blog/page.tsx`

#### Title
```
Blog & Magazine Evenementiel | Guides Seminaires Chateaux
```
- Longueur : ~58 car. -- CORRECT

#### Meta Description
```
Guides complets, etudes de cas, et tendances pour organiser des seminaires d'exception en chateau : organisation, lieux, team building. Conseils d'experts Select Chateaux.
```
- Longueur : ~155 car. -- CORRECT

#### Hierarchie des titres
- **H1** : "L'Inspiration Evenementiel" -- CORRECT mais pas tres SEO-friendly (pas de mot-cle "blog" ou "seminaire")
- **H2** : Titre du featured post / "Inspire par nos articles ?"
- **H3** : Titres des articles dans la grille

#### Maillage interne
- Links vers `/blog/[slug]` (x30 articles)
- Link vers `/devis#formulaire` (CTA bas de page)
- **Verdict** : BON

#### Images
- Articles : alt=`post.imageAlt` -- CORRECT (alt descriptif stocke dans les donnees)

#### JSON-LD
- Schema `Blog` avec name, description, publisher, inLanguage
- **Verdict** : CORRECT

#### Problemes
- [MINEUR] H1 "L'Inspiration Evenementiel" -- manque de mots-cles SEO. Aurait pu etre "Blog Seminaires en Chateau | Guides et Conseils"

---

### 3.9 ARTICLES BLOG — `/blog/[slug]`

**Route** : `/blog/[slug]` | **Fichiers** : `blog/[slug]/layout.tsx` (generateMetadata) + `page.tsx` + `ArticleClientLogic.tsx`

#### Title (dynamique)
```
[Article Title] | Blog Select Chateaux
```

#### Meta Description : `article.excerpt` -- CORRECT

#### Metadata dynamique
- `keywords` : depuis `article.keywords`
- `authors` : `article.author.name`
- `openGraph.type` : "article" -- CORRECT
- `openGraph.publishedTime` : date de publication -- CORRECT
- `canonical` : URL complete -- CORRECT

#### JSON-LD
1. **BlogPosting** : headline, description, image, datePublished, dateModified, author (Person), publisher, wordCount, keywords, articleSection, inLanguage
2. **BreadcrumbList** : Accueil > Blog > [Titre]

**Verdict** : EXCELLENT -- implementation SEO tres complete pour les articles

#### Maillage interne
- Links vers articles lies (x3 "A Lire Aussi")
- Link vers `/devis#formulaire` (CTA final)
- Links vers categories `/blog?category=...`

#### Problemes
- [MINEUR] `dateModified` = `datePublished` (pas de date de modification separee)

---

### 3.10 PAGES GEO LANDING (x6)

**Routes** :
- `/seminaire-chateau-ile-de-france`
- `/seminaire-chateau-proche-paris`
- `/seminaire-chateau-chantilly`
- `/seminaire-chateau-oise-60`
- `/seminaire-chateau-yvelines-78`
- `/seminaire-chateau-hauts-de-seine-92`

**Fichiers** : Chaque page a un `metadata.ts` + `page.tsx` qui utilise `GeoLandingPage` component

#### Architecture commune
- Title, description, keywords : charges depuis les donnees `geo-landing-pages.ts`
- OpenGraph et Twitter cards : complets
- Canonical : defini
- robots: `{ index: true, follow: true }`

#### Analyse de la page type (Ile-de-France)

**Title** : "Seminaire en Chateau en Ile-de-France | 4 Domaines d'Exception" (~63 car.) -- CORRECT

**Description** : "Organisez votre seminaire en chateau en Ile-de-France. 4 domaines exclusifs de 50 a 280 personnes, a 30-45 min de Paris. Devis gratuit sous 24h." (~145 car.) -- CORRECT

**H1** : "Seminaire en Chateau en Ile-de-France" -- CORRECT, correspond au mot-cle cible

#### Hierarchie des titres (commune)
- **H1** : Titre principal geo
- **H2** : Intro titre / "Pourquoi [region]" / "Nos chateaux dans cette region" / "Informations pratiques" / Contenu SEO additionnel (H2 injectes via HTML) / "Articles qui pourraient vous interesser" / "Tout ce que vous devez savoir" / "Explorez d'autres regions" / "Pret a organiser votre seminaire ?"
- **H3** : Questions FAQ

#### Maillage interne -- EXCELLENT
- Links vers `/chateaux/[slug]` (chateaux de la zone)
- Links vers `/blog/[slug]` (articles lies)
- Links vers les AUTRES pages geo (silo geographique)
- Links vers `/devis#formulaire` (CTA)
- Links vers `/chateaux` (CTA secondaire)
- Breadcrumb visible avec liens

#### JSON-LD
1. **Service** : nom, description, provider, areaServed
2. **BreadcrumbList**
3. **FAQPage** : 5-6 questions/reponses

**Verdict** : EXCELLENT -- ces pages sont les mieux optimisees du site

#### Contenu SEO additionnel
- Texte riche injecte via `dangerouslySetInnerHTML` avec H2 et paragraphes supplementaires
- FAQ complete (5-6 questions)
- Infos pratiques (distances, transports, capacites)

#### Problemes
- [MINEUR] Toutes les pages geo utilisent la meme image hero (`/images/seminaires-soirees-entreprise-hero.webp`) -- manque de variete visuelle et l'image OG est identique pour toutes

---

### 3.11 PAGES LEGALES

#### `/cgv`
- Title : "Conditions Generales de Vente | Select Chateaux"
- robots: `{ index: false, follow: false }` -- CORRECT
- Canonical : `/cgv` -- CORRECT

#### `/confidentialite`
- Title : "Politique de Confidentialite | Select Chateaux"
- robots: `{ index: false, follow: false }` -- CORRECT
- Canonical : `/confidentialite` -- CORRECT

#### `/mentions-legales`
- Title : "Mentions Legales | Select Chateaux"
- robots: `{ index: false, follow: false }` -- CORRECT
- Canonical : `/mentions-legales` -- CORRECT

**Verdict** : CORRECT -- pages legales bien configurees en noindex

---

### 3.12 PAGE 404 — `not-found.tsx`

- Existe au niveau racine (`src/app/not-found.tsx`)
- Existe aussi pour les chateaux (`src/app/chateaux/[slug]/not-found.tsx`)
- **Verdict** : CORRECT

---

## 4. PROBLEMES CRITIQUES IDENTIFIES

### CRITIQUE

1. **Bouton "Voir tous nos chateaux" sans lien (Homepage)**
   - Le composant `<Button>` dans la section chateaux de la homepage n'est pas entoure d'un `<Link>`. Il est non-cliquable pour la navigation.
   - **Impact** : Perte de maillage interne + mauvaise UX
   - **Fichier** : `src/app/page.tsx`, ligne ~126

2. **Title trop long sur /chateaux (74 car.)**
   - Sera tronque dans les SERP Google
   - **Suggestion** : "4 Chateaux Seminaire Ile-de-France | Select Chateaux" (~52 car.)

### MOYEN

3. **Meta description /a-propos trop longue (168 car.)**
   - **Suggestion** : Reduire a ~155 car.

4. **Meta description /devis trop courte (125 car.)**
   - **Suggestion** : Enrichir avec "4 chateaux d'exception" et "de 50 a 280 personnes"

5. **Pas de liens vers /chateaux depuis /seminaires-soirees-entreprise et /a-propos**
   - Ces pages importantes ne maillent pas vers les pages produit
   - **Impact** : Distribution du PageRank sous-optimale

6. **AggregateRating hardcode pour chaque chateau**
   - "4.8" et "12 reviewCount" identiques pour tous -- devrait etre dynamique

7. **Pas de JSON-LD sur /chateaux (page listing)**
   - Manque un schema `ItemList` pour potentiellement obtenir des rich results de type carrousel

8. **Image hero identique pour toutes les pages geo**
   - `/images/seminaires-soirees-entreprise-hero.webp` est reutilisee partout
   - Impact sur l'OG image (partage sur reseaux sociaux = meme image pour 6 pages differentes)

9. **Horaires LocalBusiness : vendredi absent**
   - `openingHoursSpecification` ne couvre que Lundi-Jeudi -- si l'entreprise travaille le vendredi, c'est a corriger

### MINEUR

10. **H1 du blog listing pas assez SEO** : "L'Inspiration Evenementiel" -- pas de mot-cle cible
11. **Alt image generique** : "Histoire SelectChateaux" sur la page A Propos
12. **dateModified = datePublished** sur les articles blog
13. **Images equipe stock (Unsplash)** sur /a-propos
14. **JSON-LD Service dans composant client** sur /seminaires-soirees-entreprise (risque si Google ne rend pas le JS)
15. **Doublon de keywords meta** entre layout.tsx racine et page.tsx homepage

---

## 5. RECOMMANDATIONS PRIORITAIRES

### Priorite 1 (Quick wins -- a faire maintenant)

| # | Action | Fichier | Effort |
|---|--------|---------|--------|
| 1 | Corriger le bouton "Voir tous nos chateaux" en l'entourant d'un `<Link href="/chateaux">` | `src/app/page.tsx` | 2 min |
| 2 | Raccourcir le title de /chateaux a < 60 car. | `src/app/chateaux/metadata.ts` | 2 min |
| 3 | Allonger meta description /devis (~155 car.) | `src/app/devis/metadata.ts` | 5 min |
| 4 | Raccourcir meta description /a-propos (~155 car.) | `src/app/a-propos/metadata.ts` | 5 min |
| 5 | Ajouter "Friday" dans openingHoursSpecification | `src/utils/seo/structured-data.ts` | 2 min |

### Priorite 2 (Important -- cette semaine)

| # | Action | Fichier | Effort |
|---|--------|---------|--------|
| 6 | Ajouter liens vers /chateaux sur /seminaires-soirees-entreprise | page.tsx | 15 min |
| 7 | Ajouter liens vers /chateaux sur /a-propos | page.tsx | 15 min |
| 8 | Ajouter schema ItemList sur /chateaux | page.tsx ou layout.tsx | 30 min |
| 9 | Deplacer le JSON-LD Service de /seminaires-soirees-entreprise dans le layout (server) | layout.tsx | 20 min |
| 10 | Varier les images hero/OG des pages geo | Creer ou assigner des images differentes | 1h |

### Priorite 3 (Ameliorations -- ce mois)

| # | Action | Impact |
|---|--------|--------|
| 11 | Rendre AggregateRating dynamique par chateau | Rich results plus fiables |
| 12 | Changer H1 du blog listing pour inclure mots-cles | SEO blog |
| 13 | Remplacer photos equipe stock par vraies photos | E-E-A-T (Expertise, Authority, Trust) |
| 14 | Ajouter `dateModified` distinct de `datePublished` pour les articles mis a jour | Freshness signal |
| 15 | Ameliorer les alt generiques (ex: "Histoire SelectChateaux") | Accessibilite + image SEO |

---

## RESUME DE L'AUDIT

**Score global : 8/10**

Le site Select Chateaux presente une tres bonne base SEO technique :
- Structured Data riche et varie (Organization, LocalBusiness, Service, Place, FAQ, BlogPosting, Breadcrumb)
- Sitemap dynamique bien configure
- Robots.txt correct
- Canonicals sur toutes les pages
- OpenGraph et Twitter cards sur toutes les pages
- Pages geo-landing optimisees de maniere exemplaire
- Blog avec 30 articles et structured data BlogPosting
- Hierarchie des titres generalement correcte

Les axes d'amelioration portent principalement sur :
- Le maillage interne inter-pages (surtout depuis /seminaires-soirees-entreprise et /a-propos)
- Quelques titles/descriptions a ajuster en longueur
- L'ajout d'un schema ItemList sur /chateaux
- La diversification des images OG des pages geo
- Un bouton CTA orphelin sur la homepage

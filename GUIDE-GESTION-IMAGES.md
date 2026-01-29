# 📸 Guide Complet : Gestion des Images du Site

## Vue d'ensemble

Ce système vous permet de gérer facilement toutes les images de vos châteaux sur le site web, depuis le choix des images locales jusqu'à leur affichage sur le site.

## 🎯 Processus en 4 étapes

### Étape 1 : Scanner les images disponibles

**But** : Analyser toutes les images optimisées et les catégoriser automatiquement.

```bash
cd scripts
node scan-images-disponibles.js
```

**Résultat** : Fichier `images-disponibles.json` contenant :
- Liste de toutes les images par château
- Catégorisation automatique (hero, chambres, salles, spa, etc.)
- Métadonnées (taille, mots-clés)
- URLs Supabase prédéfinies

**Statistiques actuelles** :
- ✅ 98 images disponibles
- 💾 7 MB total
- 🏰 4 châteaux configurés

---

### Étape 2 : Sélectionner les images (Interface Web)

**But** : Choisir visuellement les images pour chaque château et chaque usage.

#### Lancer l'interface :

```bash
npm run dev
```

Puis ouvrez : `http://localhost:3000/admin/images`

#### Fonctionnalités de l'interface :

**Pour chaque château, vous pouvez :**

1. **Images Hero** (slider page d'accueil)
   - Sélectionnez 3-5 images représentatives
   - Photos de façade, salles prestigieuses, vue d'ensemble

2. **Image Card** (vignette catalogue)
   - 1 seule image : la plus représentative du château
   - Apparaît dans la liste des châteaux

3. **Image OpenGraph** (réseaux sociaux)
   - 1 seule image pour les partages Facebook/Twitter/LinkedIn
   - Format idéal : 1200x630px

4. **Galerie** (page détail château)
   - 6-12 images variées
   - Montrez la diversité des espaces : chambres, salles, spa, extérieur

#### Filtres disponibles :
- Par catégorie (chambres, salles, spa, restauration, extérieur)
- Vue grille ou liste
- Compteur de sélections en temps réel

#### Actions :
- **Télécharger le code** : Génère automatiquement le code TypeScript pour `chateaux.ts`

---

### Étape 3 : Uploader vers Supabase

**But** : Transférer les images vers le CDN Supabase pour qu'elles soient accessibles publiquement.

#### Installation Supabase CLI (si nécessaire) :

```bash
npm install -g supabase
```

#### Lancer l'upload :

```bash
cd scripts
./upload-to-supabase.sh
```

**Le script va** :
1. Vérifier l'authentification Supabase
2. Uploader toutes les images dans les bons dossiers
3. Afficher la progression en temps réel
4. Générer un rapport final

**Structure des dossiers sur Supabase** :
```
chateaux-images/
├── chevreuse/          (Abbaye des Vaux de Cernay)
├── montvillargene/     (Château de Montvillargene)
├── hauts-de-seine/     (Domaine Reine Margot)
└── mont-royal/         (Château Mont Royal)
```

---

### Étape 4 : Mettre à jour le site

**But** : Intégrer les nouvelles images dans le code du site.

#### 1. Copier le code généré

Le fichier `chateaux-images-code.txt` contient le code TypeScript prêt à l'emploi.

#### 2. Éditer `src/data/chateaux.ts`

Remplacez la section `images` de chaque château par le code généré :

```typescript
{
  id: "1",
  nom: "Le Manoir Anglo-Normand",
  // ... autres propriétés
  images: {
    hero: [
      "https://jmeiepmtgidqtmxfnlwf.supabase.co/storage/v1/object/public/chateaux-images/chantilly/manoir-anglo-normand-chantilly-oise-60-salle-reunion.webp",
      "https://jmeiepmtgidqtmxfnlwf.supabase.co/storage/v1/object/public/chateaux-images/chantilly/manoir-anglo-normand-chantilly-oise-60-facade.webp",
    ],
    openGraph: "https://jmeiepmtgidqtmxfnlwf.supabase.co/storage/v1/object/public/chateaux-images/chantilly/manoir-anglo-normand-chantilly-oise-60-salle-reunion.webp",
    card: "https://jmeiepmtgidqtmxfnlwf.supabase.co/storage/v1/object/public/chateaux-images/chantilly/manoir-anglo-normand-chantilly-oise-60-facade.webp",
    galerie: [
      "https://jmeiepmtgidqtmxfnlwf.supabase.co/storage/v1/object/public/chateaux-images/chantilly/manoir-anglo-normand-chantilly-oise-60-chambre.webp",
      // ... plus d'images
    ],
  },
}
```

#### 3. Vérifier le site

```bash
npm run dev
```

Vérifiez que les images s'affichent correctement sur :
- Page d'accueil (slider hero)
- Page catalogue des châteaux (cards)
- Page détail de chaque château (galerie)

---

## 📋 Bonnes Pratiques

### Images Hero
- **Nombre** : 3-5 images
- **Usage** : Slider page d'accueil et page détail
- **Critères** : Images spectaculaires, variété des espaces

### Image Card
- **Nombre** : 1 seule
- **Usage** : Vignette dans le catalogue
- **Critères** : Image emblématique du château (souvent la façade)

### Image OpenGraph
- **Nombre** : 1 seule
- **Usage** : Partages sur réseaux sociaux
- **Critères** : Image représentative, bonne composition

### Galerie
- **Nombre** : 6-12 images
- **Usage** : Page détail du château
- **Critères** : Variété (chambres, salles, spa, extérieur, restaurant)

---

## 🔧 Maintenance

### Ajouter un nouveau château

1. Ajoutez un dossier dans `/IMAGES/` avec le nom du château
2. Placez les images optimisées (.webp) dedans
3. Mettez à jour `FOLDER_TO_CHATEAU` dans `scan-images-disponibles.js`
4. Relancez le processus depuis l'étape 1

### Remplacer une image

1. Remplacez le fichier dans `/IMAGES/[château]/`
2. Relancez le scan (étape 1)
3. Re-sélectionnez les images dans l'interface (étape 2)
4. Uploadez uniquement les nouvelles images (étape 3)

### Optimiser les performances

**Images déjà optimisées** :
- ✅ Format WebP
- ✅ Compression 85% qualité
- ✅ Crop automatique 10%
- ✅ Max 1920px
- ✅ Noms SEO-friendly

**Next.js optimise automatiquement** :
- Lazy loading
- Responsive images (srcset)
- Placeholder blur
- Format moderne (WebP/AVIF)

---

## 🐛 Dépannage

### L'interface admin ne charge pas les images

**Solution** : Vérifiez que `images-disponibles.json` est bien dans `/public/scripts/`

```bash
ls public/scripts/images-disponibles.json
```

### Upload Supabase échoue

**Solutions** :
1. Vérifiez votre authentification : `supabase login`
2. Vérifiez les permissions du bucket `chateaux-images`
3. Vérifiez votre connexion internet

### Les images ne s'affichent pas sur le site

**Solutions** :
1. Vérifiez les URLs dans `chateaux.ts`
2. Vérifiez que les images sont bien uploadées sur Supabase
3. Vérifiez la configuration Next.js dans `next.config.js` :

```javascript
images: {
  domains: ['jmeiepmtgidqtmxfnlwf.supabase.co'],
}
```

---

## 📊 Statistiques Actuelles

### Images par château

| Château | Images | Catégories principales |
|---------|--------|------------------------|
| Abbaye des Vaux de Cernay | 31 | hero(12), salles(9), chambres(6) |
| Château Mont Royal | 19 | hero(19), extérieur(8), chambres(7) |
| Château de Montvillargene | 23 | hero(23), salles(7), chambres(4) |
| Domaine Reine Margot | 25 | hero(25), salles(8), chambres(8) |

**Total** : 98 images optimisées • 7 MB

---

## 🎨 Styles d'Images Recommandés

### Pour les Hero (slider)
- Photos larges et lumineuses
- Bonne composition
- Montrent l'ampleur des espaces

### Pour les Cards
- Façade ou vue emblématique
- Bonne lumière naturelle
- Composition centrée

### Pour la Galerie
**Variété recommandée** :
- 2-3 images de salles de réunion
- 2-3 images de chambres
- 1-2 images de restaurant/bar
- 1-2 images de spa/piscine
- 2-3 images d'extérieur/parc
- 1 image de réception/hall

---

## 🚀 Workflow Complet (Récap)

```bash
# 1. Scanner les images
cd scripts
node scan-images-disponibles.js

# 2. Lancer l'interface de sélection
cd ..
npm run dev
# → Ouvrir http://localhost:3000/admin/images
# → Sélectionner les images pour chaque château
# → Télécharger le code généré

# 3. Uploader vers Supabase
cd scripts
./upload-to-supabase.sh

# 4. Mettre à jour le code
# → Copier le code dans src/data/chateaux.ts
# → Vérifier le site
```

---

## 📞 Support

En cas de problème, vérifiez :
1. Les logs du script de scan
2. La console Next.js (npm run dev)
3. Les logs Supabase Storage
4. La configuration dans `chateaux.ts`

---

**Dernière mise à jour** : Janvier 2026
**Version** : 1.0.0

# Guide de Modification des Images

Ce guide explique comment modifier facilement les images des cartes sur le site.

## 📂 Structure des Dossiers d'Images

Toutes les images sont organisées par **page** puis par **section** :

```
public/
  images/
    accueil/               ← Page d'accueil
      hero/                ← Section Hero
      chateaux/            ← Section "Nos Châteaux d'Exception"
      evenements/          ← Section "Types d'Événements"
      temoignages/         ← Section "Ils nous font confiance"
    chateaux/              ← Page dédiée Châteaux
    evenements/            ← Page dédiée Événements
    contact/               ← Page Contact
```

## 🏰 Images de la Section Châteaux (Page d'accueil)

**Dossier :** `public/images/accueil/chateaux/`

Pour chaque château, placez 5 images :

```
images/accueil/chateaux/
  montclair-1.jpg     ← Image principale du Château de Montclair
  montclair-2.jpg
  montclair-3.jpg
  montclair-4.jpg
  montclair-5.jpg

  bellevue-1.jpg      ← Image principale du Château de Bellevue
  bellevue-2.jpg
  bellevue-3.jpg
  bellevue-4.jpg
  bellevue-5.jpg

  rochefort-1.jpg     ← Image principale du Château de Rochefort
  rochefort-2.jpg
  rochefort-3.jpg
  rochefort-4.jpg
  rochefort-5.jpg

  argenteuil-1.jpg    ← Image principale du Château d'Argenteuil
  argenteuil-2.jpg
  argenteuil-3.jpg
  argenteuil-4.jpg
  argenteuil-5.jpg
```

## 🎉 Images de la Section Événements (Page d'accueil)

**Dossier :** `public/images/accueil/evenements/`

Une image par type d'événement :

```
images/accueil/evenements/
  seminaire.jpg              ← Séminaire Résidentiel
  journee-etude.jpg          ← Journée d'Étude
  soiree-entreprise.jpg      ← Soirée d'Entreprise
  team-building.jpg          ← Team Building
```

## 👤 Images de la Section Témoignages (Page d'accueil)

**Dossier :** `public/images/accueil/temoignages/`

Un avatar par témoignage :

```
images/accueil/temoignages/
  sophie-moreau.jpg          ← Sophie Moreau (TechVision)
  marc-dubois.jpg            ← Marc Dubois (InnovBank)
  isabelle-laurent.jpg       ← Isabelle Laurent (Creative Solutions)
  thomas-beaumont.jpg        ← Thomas Beaumont (Luxe Consulting)
```

## 🔄 Comment Modifier une Image ?

### Méthode Simple (recommandée)

1. Allez dans le dossier correspondant
2. Remplacez le fichier image existant par votre nouvelle image
3. **Gardez exactement le même nom de fichier**

**Exemple :** Pour changer l'image du Château de Montclair :
- Renommez votre nouvelle photo en `montclair-1.jpg`
- Remplacez le fichier dans `public/images/accueil/chateaux/`

### Méthode Avancée (nouveau nom de fichier)

Si vous voulez utiliser un nouveau nom de fichier :

1. Placez votre nouvelle image dans le bon dossier
2. Ouvrez `src/data/chateaux.ts`
3. Modifiez le chemin correspondant

**Exemple pour changer le Séminaire :**
```typescript
// Dans src/data/chateaux.ts, ligne ~125
image: "/images/accueil/evenements/mon-nouveau-seminaire.jpg",
```

## ✅ Formats d'Images Recommandés

- **JPG** : Idéal pour les photos (recommandé)
- **PNG** : Pour les images avec transparence
- **WebP** : Meilleure compression (moderne)
- **AVIF** : Excellente qualité/poids (très moderne)

## 📏 Tailles d'Images Recommandées

- **Châteaux** : 1200x800px minimum
- **Événements** : 800x600px minimum
- **Avatars** : 300x300px (carré)

## 🚨 Important

- **Nommage** : Utilisez des noms en minuscules, sans espaces, avec des tirets (-)
  - ✅ Bon : `chateau-bellevue.jpg`
  - ❌ Mauvais : `Château Bellevue.jpg`

- **Organisation** : Respectez la structure par page/section pour faciliter la maintenance

- **Compression** : Optimisez vos images avant de les ajouter (utilisez TinyPNG par exemple)

## 💡 Exemple Complet

**Scénario :** Vous voulez changer toutes les images du Château de Montclair

1. Préparez 5 photos du château
2. Renommez-les : `montclair-1.jpg` à `montclair-5.jpg`
3. Placez-les dans `public/images/accueil/chateaux/`
4. Remplacez les anciens fichiers
5. Rafraîchissez votre navigateur !

## 🆘 Besoin d'Aide ?

**Les images ne s'affichent pas ?**

1. Vérifiez que le nom du fichier est exactement le même que dans le code
2. Vérifiez que l'image est dans le bon dossier (`public/images/...`)
3. Rafraîchissez la page (Ctrl+F5 ou Cmd+Shift+R)
4. Vérifiez que l'image n'est pas corrompue

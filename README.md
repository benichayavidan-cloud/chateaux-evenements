# ChâteauxPrestige - Site Web Premium pour Événements d'Entreprise

Site web moderne et performant pour promouvoir 4 châteaux d'exception destinés aux événements d'entreprise en France.

## 🎯 Objectifs du Projet

- **Conversion maximale** : Design et UX optimisés pour générer des demandes de devis
- **Émotion et projection** : Visuels premium et storytelling immersif
- **Performance** : Site ultra-rapide avec optimisation SEO complète
- **Responsive 100%** : Expérience parfaite sur tous les appareils

## ✨ Fonctionnalités Principales

### Pages

1. **Accueil** (`/`)
   - Hero Section avec slider d'images full-screen
   - Présentation des 4 châteaux en grid responsive
   - Types d'événements avec cards animées
   - Section social proof (témoignages, chiffres clés, logos clients)

2. **Nos Châteaux** (`/chateaux`)
   - Présentation détaillée de chaque château
   - Galeries photos
   - Informations complètes (capacité, localisation, atouts)

3. **Types d'Événements** (`/evenements`)
   - Séminaires résidentiels
   - Journées d'étude
   - Soirées d'entreprise
   - Team building
   - Services inclus et processus détaillé

4. **Demande de Devis** (`/devis`)
   - **Formulaire multi-étapes (4 étapes)**
   - Validation en temps réel avec Zod
   - Animations fluides entre les étapes
   - Progress bar visuelle

5. **Contact** (`/contact`)
   - Formulaire de contact
   - Informations pratiques
   - FAQ

## 🚀 Stack Technique

- **Framework** : Next.js 15 (App Router)
- **Language** : TypeScript
- **Styling** : Tailwind CSS v4
- **Animations** : Framer Motion
- **Formulaires** : React Hook Form + Zod
- **Polices** : Playfair Display (titres) + Inter (corps)
- **Images** : Unsplash (placeholders haute qualité)

## 📦 Installation

### Prérequis

- Node.js 18+
- npm

### Commandes

```bash
# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev

# Construire pour la production
npm run build

# Lancer la version de production
npm start
```

Le site sera accessible sur `http://localhost:3000`

## 🎨 Design System

### Couleurs

```css
--primary: #1e40af      /* Bleu royal */
--secondary: #faf9f6    /* Blanc cassé */
--accent: #b87333       /* Cuivre */
--gold: #d4af37         /* Or */
--text-primary: #1f2937 /* Gris anthracite */
```

### Typographie

- **Titres** : Playfair Display (serif élégant)
- **Corps** : Inter (sans-serif lisible)

### Breakpoints

- Mobile : 640px
- Tablet : 768px
- Desktop : 1024px+

## 📁 Structure du Projet

```
src/
├── app/                    # Pages Next.js
├── components/             # Composants React
├── data/                   # Données fictives
├── types/                  # Types TypeScript
└── lib/                    # Utilitaires
```

## 🚢 Déploiement

### Vercel (Recommandé)

1. Push le code sur GitHub
2. Connecter le repo à Vercel
3. Déploiement automatique

```bash
npm i -g vercel
vercel
```

## ⚡ Performance

- Score Lighthouse visé : **90+**
- Images optimisées avec next/image
- Lazy loading automatique
- Code splitting par route

## 📝 Prochaines Étapes

1. Remplacer les images placeholder par des photos réelles
2. Configurer l'envoi d'emails pour les formulaires
3. Ajouter Google Analytics
4. Créer un sitemap.xml dynamique
5. Implémenter les structured data

---

**Développé avec Next.js 15 + TypeScript + Tailwind CSS**
# Test déploiement automatique
# Fix ignored build step

# Déploiements automatiques activés

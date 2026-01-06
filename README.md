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

## 📝 Dev Log

### Session du 06/01/2026 - Système de Design Tokens

**✅ Implémenté:**

1. **Système de Design Tokens Centralisé** (`globals.css`)
   - Variables CSS pour tous les espacements : `--space-lg`, `--space-2xl`, `--space-3xl`, `--space-4xl`, etc.
   - Variables pour sections : `--section-padding-sm/md/lg`
   - Variables pour containers : `--container-padding`, `--max-width-content`
   - Variables pour gaps : `--gap-sm/md/lg/3xl`
   - Variables pour hauteurs : `--height-image-card`, `--height-icon-lg`
   - Variables pour boutons : `--btn-padding-md/lg`
   - Variables pour badges : `--badge-padding-md/lg`

2. **Classes Utilitaires Créées**
   - `.section-container` - Container standardisé avec max-width et padding
   - `.section-padding-sm/md/lg` - Padding vertical des sections
   - `.badge`, `.badge-lg` - Badges standardisés

3. **Refactorisation Complète du Site**
   - ✅ `/src/app/evenements/page.tsx` - 77 valeurs hard-codées → variables CSS
   - ✅ `/src/app/contact/page.tsx` - Toutes valeurs inline → variables CSS
   - ✅ `/src/components/HeroSection.tsx` - Spacings standardisés
   - ✅ `/src/components/ChateauxSection.tsx` - Classes utilitaires appliquées
   - ✅ `/src/components/EvenementsSection.tsx` - Variables CSS appliquées
   - ✅ `/src/components/SocialProofSection.tsx` - Spacings standardisés
   - ✅ `/src/components/NavigationLuxe.tsx` + `FooterLuxe.tsx` - Badges standardisés

4. **Corrections Design Page Événements**
   - Gap entre colonnes optimisé : 40px → 20px
   - Espacement services/CTA augmenté : 32px → 48px
   - Puces de liste centrées avec le texte

**📊 Résultats:**
- **0 changement visuel** - valeurs identiques, juste centralisées
- **Maintenance ultra-rapide** - modifier 1 variable au lieu de 50+ lignes
- **Cohérence garantie** - tous les composants utilisent les mêmes valeurs

**🎯 Avantages pour les sessions futures:**

Avant : Changer tous les espacements de sections = chercher dans 15 fichiers, modifier 50+ lignes, 15 minutes
Maintenant : `--section-padding-lg: 120px` = 5 secondes, tout le site se met à jour

**Exemples d'utilisation rapide:**
```css
/* Augmenter tous les espacements de sections */
--section-padding-lg: 120px; /* était 100px */

/* Modifier tous les gaps entre colonnes */
--gap-3xl: 30px; /* était 20px */

/* Ajuster tous les paddings de boutons */
--btn-padding-lg: 20px 48px; /* était 18px 40px */
```

---

### 📝 Pour la Prochaine Session

**Prêt à modifier rapidement:**
- Tous les espacements centralisés dans `globals.css`
- Modifier le design en quelques secondes au lieu de minutes
- Système cohérent et maintenable

**Prochaines Étapes:**

1. Remplacer les images placeholder par des photos réelles
2. Configurer l'envoi d'emails pour les formulaires
3. Ajouter Google Analytics
4. Créer un sitemap.xml dynamique
5. Implémenter les structured data

---

**Développé avec Next.js 15 + TypeScript + Tailwind CSS**

# 🎨 Système de Design - SelectChateaux Pro

## Vue d'ensemble

Système de design professionnel avec tokens cohérents, responsive automatique et accessibilité intégrée.

## 📦 Structure

```
design-system/
├── tokens/
│   ├── colors.ts          # Palette de couleurs
│   ├── spacing.ts         # Échelle d'espacement
│   ├── typography.ts      # Système typographique
│   ├── breakpoints.ts     # Points de rupture responsive
│   ├── effects.ts         # Ombres, animations, transitions
│   ├── theme.ts           # Thème complet combiné
│   └── index.ts           # Point d'entrée
└── documentation/
    └── README.md          # Ce fichier
```

## 🎯 Principes

1. **Un seul système** - Tous les styles viennent des tokens
2. **Responsive par défaut** - Utilisation de `clamp()` partout
3. **Accessibilité** - WCAG 2.1 AA minimum
4. **Performance** - CSS optimisé, animations 60fps
5. **Maintenabilité** - Zéro styles inline, composants réutilisables

## 🚀 Usage

### Importer le thème

```tsx
import { theme } from '@/design-system/tokens';

// Utiliser dans un composant
<div style={{
  color: theme.colors.primary.bronze,
  padding: theme.spacing.md,
  fontSize: theme.typography.fontSize.lg,
}}>
  Contenu
</div>
```

### Variables CSS

```css
.element {
  color: var(--bronze);
  padding: var(--space-md);
  box-shadow: var(--shadow-lg);
  transition: all var(--transition-smooth) ease;
}
```

## 📐 Breakpoints

### Valeurs standards
- **xs** : 0px (mobile petit)
- **sm** : 576px (mobile grand)
- **md** : 768px (tablette)
- **lg** : 992px (desktop)
- **xl** : 1200px (desktop large)
- **2xl** : 1400px (widescreen)
- **3xl** : 1920px (ultra-wide)

### Usage

```tsx
import { breakpoints } from '@/design-system/tokens';

// Dans CSS-in-JS
const styles = {
  fontSize: '16px',
  [breakpoints.up.md]: {
    fontSize: '18px',
  },
};
```

## 🎨 Couleurs

### Palette principale
- `colors.primary.bronze` - #A37E2C
- `colors.primary.bronzeDark` - #8B6A24
- `colors.primary.gold` - #D4AF37

### Neutres
- `colors.neutral.gray50` → `colors.neutral.gray900`

### Overlays
- `colors.overlay.black10` → `colors.overlay.black80`
- `colors.overlay.white10` → `colors.overlay.white90`

## 📏 Spacing

### Échelle de base
- `spacing.xs` : 8px
- `spacing.sm` : 12px
- `spacing.md` : 16px
- `spacing.lg` : 24px
- `spacing.xl` : 32px
- `spacing.2xl` : 40px
- `spacing.3xl` : 48px

### Spacing responsive (sections)
```tsx
// S'adapte automatiquement à la taille d'écran
padding: theme.spacing.section.md // 64px → 96px
```

## ✍️ Typography

### Tailles responsive
Toutes les tailles utilisent `clamp()` pour s'adapter automatiquement :

```tsx
fontSize: theme.typography.fontSize.h1  // clamp(2.5rem, 6vw, 4rem)
```

### Styles prédéfinis
```tsx
// Appliquer un style de titre
<h1 style={theme.typography.textStyles.h1}>Titre</h1>

// Appliquer un style de corps de texte
<p style={theme.typography.textStyles.body}>Texte</p>
```

## ✨ Effets

### Ombres
- `effects.shadows.sm` → `effects.shadows.2xl`
- `effects.shadows.glow` - Effet lueur bronze

### Animations
```tsx
transition: `all ${theme.effects.transitions.smooth} ${theme.effects.easings.smooth}`
```

### Border Radius
- `effects.borderRadius.sm` → `effects.borderRadius.3xl`
- `effects.borderRadius.full` - Cercle parfait

## 📱 Bootstrap Grid

Le système utilise Bootstrap 5 Grid :

```tsx
<div className="container">
  <div className="row">
    <div className="col-lg-6 col-md-12">Colonne</div>
    <div className="col-lg-6 col-md-12">Colonne</div>
  </div>
</div>
```

### Classes disponibles
- `container`, `container-fluid`
- `row` avec gap automatique
- `col-{breakpoint}-{size}` (1 à 12 colonnes)
- Utilitaires : `mb-*`, `mt-*`, `p-*`, `m-*`

## 🎯 Standards de qualité

### Performance
- ✅ Lighthouse 95+
- ✅ Animations 60fps (utiliser transform/opacity uniquement)
- ✅ CSS purgé en production

### Accessibilité
- ✅ Contrast ratio ≥ 4.5:1 pour texte
- ✅ Focus visible sur tous les éléments interactifs
- ✅ Keyboard navigation complète

### Responsive
- ✅ Testé 375px → 1920px
- ✅ Touch-friendly (minimum 44x44px pour boutons)
- ✅ Orientation portrait + landscape

## 📚 Exemples

### Créer un bouton responsive
```tsx
<button style={{
  padding: theme.components.button.padding.md,
  fontSize: theme.components.button.fontSize.md,
  borderRadius: theme.components.button.borderRadius,
  background: theme.colors.primary.bronze,
  color: theme.colors.neutral.white,
  transition: theme.components.button.transition,
}}>
  Cliquez ici
</button>
```

### Créer une carte
```tsx
<div style={{
  padding: theme.components.card.padding.md,
  borderRadius: theme.components.card.borderRadius,
  boxShadow: theme.components.card.shadow,
}}>
  Contenu de la carte
</div>
```

## 🔄 Migration depuis l'ancien système

### Avant (styles inline)
```tsx
<div style={{ padding: '20px', fontSize: '16px' }}>
```

### Après (tokens)
```tsx
<div style={{
  padding: theme.spacing.lg,
  fontSize: theme.typography.fontSize.base
}}>
```

## 📞 Support

Pour questions ou problèmes, consulter :
1. Cette documentation
2. Exemples dans `/components`
3. Storybook (à venir)

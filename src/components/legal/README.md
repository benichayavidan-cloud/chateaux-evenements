# Composants Legal - Guide de Maintenance

## 📁 Structure des Composants

```
src/components/legal/
├── LegalPageLayout.tsx   # Layout principal pour les pages légales
├── LegalSection.tsx      # Section avec titre et contenu
├── LegalContent.tsx      # Contenu, listes et liens
├── index.ts              # Exports centralisés
└── README.md             # Ce fichier
```

## 🎯 Composants Disponibles

### 1. `LegalPageLayout`
Layout principal qui gère la structure de la page (navigation, header, container).

**Props:**
- `title` (string, requis) - Titre de la page
- `subtitle` (string, optionnel) - Sous-titre (ex: date de mise à jour)
- `children` (ReactNode, requis) - Contenu de la page

**Exemple:**
```tsx
<LegalPageLayout
  title="Mentions Légales"
  subtitle="Dernière mise à jour : Janvier 2026"
>
  {/* Sections ici */}
</LegalPageLayout>
```

### 2. `LegalSection`
Section avec un titre et du contenu.

**Props:**
- `title` (string, requis) - Titre de la section
- `children` (ReactNode, requis) - Contenu de la section

**Exemple:**
```tsx
<LegalSection title="1. Objet">
  <LegalContent>
    <p>Texte de la section...</p>
  </LegalContent>
</LegalSection>
```

### 3. `LegalContent`
Container pour le contenu avec espacement optionnel.

**Props:**
- `children` (ReactNode, requis) - Contenu
- `spaced` (boolean, optionnel) - Active l'espacement entre les paragraphes

**Exemple:**
```tsx
<LegalContent spaced>
  <p>Premier paragraphe</p>
  <p>Deuxième paragraphe</p>
</LegalContent>
```

### 4. `LegalList`
Liste à puces ou numérotée.

**Props:**
- `items` (string[], requis) - Tableau d'éléments
- `ordered` (boolean, optionnel) - Liste numérotée (défaut: false)

**Exemple:**
```tsx
<LegalList items={[
  "Premier élément",
  "Deuxième élément",
  "Troisième élément"
]} />
```

### 5. `LegalLink`
Lien stylisé avec la couleur bronze du thème.

**Props:**
- `href` (string, requis) - URL du lien
- `children` (ReactNode, requis) - Texte du lien

**Exemple:**
```tsx
<LegalLink href="mailto:contact@example.com">
  contact@example.com
</LegalLink>
```

## 🔧 Modifier le Design

### Changer les couleurs
Éditer `/src/config/theme.ts`:
```ts
theme.colors.neutral.gray900  // Couleur des titres
theme.colors.neutral.gray700  // Couleur du texte
theme.colors.primary.bronze   // Couleur des liens
```

### Changer les espacements
Éditer `LegalSection.tsx`:
```tsx
className="mb-10"  // Espacement entre sections
style={{ paddingLeft: '15px' }}  // Indentation des sections
```

### Changer la largeur du container
Éditer `LegalPageLayout.tsx`:
```tsx
style={{ maxWidth: '1200px' }}  // Largeur max du contenu
```

### Changer la taille des titres
Éditer `LegalPageLayout.tsx` pour le titre principal:
```tsx
className="text-3xl md:text-4xl font-bold mb-4"
```

Éditer `LegalSection.tsx` pour les titres de section:
```tsx
className="text-2xl font-semibold mb-6"
```

## ✨ Ajouter une Nouvelle Page Légale

1. Créer un nouveau fichier dans `/src/app/nom-page/page.tsx`
2. Importer les composants:
```tsx
import { LegalPageLayout, LegalSection, LegalContent, LegalList, LegalLink } from "@/components/legal";
```

3. Utiliser le template:
```tsx
export default function NouvellePage() {
  return (
    <LegalPageLayout title="Titre de la Page">
      <LegalSection title="Section 1">
        <LegalContent>
          <p>Contenu...</p>
        </LegalContent>
      </LegalSection>

      {/* Autres sections */}
    </LegalPageLayout>
  );
}
```

## 📝 Avantages de cette Architecture

✅ **Maintenance facile**: Modifier un composant = modification sur toutes les pages
✅ **Design cohérent**: Tous les éléments utilisent les mêmes styles
✅ **Code lisible**: Structure claire et déclarative
✅ **Réutilisable**: Créer de nouvelles pages en quelques lignes
✅ **Responsive**: Géré automatiquement par les composants
✅ **Modifiable**: Changer les styles dans un seul fichier

## 🎨 Personnalisation Rapide

Pour modifier rapidement l'apparence:

1. **Couleurs**: `/src/config/theme.ts`
2. **Espacements**: `LegalSection.tsx` et `LegalPageLayout.tsx`
3. **Typographie**: Classes Tailwind dans chaque composant
4. **Layout**: `LegalPageLayout.tsx`

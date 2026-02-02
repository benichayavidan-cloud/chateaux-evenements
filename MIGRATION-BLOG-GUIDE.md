# 📝 GUIDE MIGRATION BLOG - Select Châteaux

## 🎯 SITUATION

Vous avez un site en production avec un blog `/blog` et vous voulez déployer la nouvelle version en gardant le blog actuel.

---

## ✅ SOLUTIONS SELON VOTRE CAS

### SCÉNARIO A : Blog Next.js (même système que le nouveau)

**Votre blog actuel utilise :** Next.js avec articles dans un fichier TypeScript

**Solution** : Copier les articles

```bash
# 1. Récupérer les articles du site en production
# Copiez le contenu de /src/data/blog-posts.ts

# 2. Les ajouter au nouveau site
# Fusionnez avec /src/data/blog-posts.ts du nouveau site

# 3. C'est tout ! ✅
```

**Avantages** :
- ✅ Migration instantanée
- ✅ Aucun changement pour les utilisateurs
- ✅ SEO préservé (même URLs)
- ✅ Design amélioré automatiquement

---

### SCÉNARIO B : Blog WordPress, Contentful, Strapi, etc.

**Votre blog actuel utilise :** Un CMS externe

**Solution** : Intégrer l'API du CMS

#### Option B1 : Garder le CMS (Recommandé)

```typescript
// /src/lib/blog-api.ts
export async function getBlogPosts() {
  // WordPress
  const res = await fetch('https://votre-site.com/wp-json/wp/v2/posts');

  // OU Contentful
  const res = await fetch(`https://cdn.contentful.com/spaces/${SPACE_ID}/entries`);

  // OU Strapi
  const res = await fetch('https://votre-strapi.com/api/posts');

  return res.json();
}
```

Modifier `/src/app/blog/page.tsx` pour utiliser ces données :
```typescript
// Au lieu de
import { blogPosts } from "@/data/blog-posts";

// Utiliser
const blogPosts = await getBlogPosts();
```

**Avantages** :
- ✅ Édition facile via CMS
- ✅ Pas de migration de contenu
- ✅ Workflow existant préservé

#### Option B2 : Migrer vers Next.js

Si vous voulez abandonner le CMS :
1. Exporter tous les articles du CMS
2. Convertir en format TypeScript
3. Ajouter à `/src/data/blog-posts.ts`

---

### SCÉNARIO C : Blog sur sous-domaine (blog.selectchateaux.com)

**Votre blog actuel est sur :** Un sous-domaine séparé

**Solution** : Proxy ou redirection

#### Option C1 : Garder séparé (Simple)

```typescript
// Dans la navigation - /src/app/layout.tsx
links={[
  { label: "Accueil", href: "/" },
  { label: "Nos Châteaux", href: "/chateaux" },
  { label: "Blog", href: "https://blog.selectchateaux.com" }, // ⬅️ Lien externe
  { label: "À propos", href: "/a-propos" },
]}
```

**Avantages** :
- ✅ Aucune migration
- ✅ Blog continue de fonctionner
- ✅ Déploiement immédiat

#### Option C2 : Proxy avec Next.js rewrites

```typescript
// next.config.ts
async rewrites() {
  return [
    {
      source: '/blog',
      destination: 'https://blog.selectchateaux.com/blog',
    },
    {
      source: '/blog/:path*',
      destination: 'https://blog.selectchateaux.com/blog/:path*',
    },
  ];
}
```

**Avantages** :
- ✅ URL unifiée (selectchateaux.com/blog)
- ✅ SEO unifié
- ✅ Pas de migration immédiate

---

### SCÉNARIO D : Blog Markdown (.md files)

**Votre blog actuel utilise :** Fichiers Markdown

**Solution** : Adapter le système actuel

```bash
# 1. Créer dossier
mkdir -p /content/blog

# 2. Copier vos fichiers .md
cp -r /votre-ancien-site/content/blog/* /content/blog/

# 3. Installer gray-matter
npm install gray-matter
```

```typescript
// /src/lib/blog.ts
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export function getBlogPosts() {
  const postsDirectory = path.join(process.cwd(), 'content/blog');
  const filenames = fs.readdirSync(postsDirectory);

  return filenames.map(filename => {
    const filePath = path.join(postsDirectory, filename);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug: filename.replace(/\.md$/, ''),
      ...data,
      content,
    };
  });
}
```

---

## 🚀 PLAN DE MIGRATION RECOMMANDÉ

### Étape 1 : Identifier votre système actuel
```bash
# Vérifiez votre blog en production
curl https://www.selectchateaux.com/blog | grep -i "wordpress\|contentful\|strapi"
```

### Étape 2 : Backup complet
```bash
# Sauvegardez tout avant migration
# - Base de données (si WordPress/Strapi)
# - Fichiers Markdown (si Markdown)
# - Export CMS (si Contentful/etc)
```

### Étape 3 : Test en local
```bash
# 1. Implémenter la solution choisie
# 2. Tester avec npm run dev
# 3. Vérifier tous les articles
# 4. Tester les URLs
```

### Étape 4 : Déploiement progressif

#### Option A : Déploiement direct
```bash
# Si migration simple (copie de données)
git push origin main
# Déployer sur Vercel/Netlify
```

#### Option B : Déploiement progressif (Recommandé)
```bash
# 1. Déployer sur URL de preview
vercel --prod

# 2. Tester tous les articles
# 3. Vérifier SEO (redirections 301 si URLs changent)
# 4. Basculer le DNS vers nouvelle version
```

---

## 🔄 MIGRATION AVEC ZÉRO DOWNTIME

### Si vous voulez ZÉRO interruption :

1. **Déployer nouvelle version sur nouveau domaine temporaire**
   ```
   nouvelle-version.selectchateaux.com
   ```

2. **Tester complètement**
   - Tous les articles accessibles
   - SEO vérifié
   - Analytics fonctionnel

3. **Configurer redirections 301** (si URLs changent)
   ```typescript
   // next.config.ts
   async redirects() {
     return [
       {
         source: '/blog/ancien-slug',
         destination: '/blog/nouveau-slug',
         permanent: true, // 301
       },
     ];
   }
   ```

4. **Basculer le DNS**
   ```
   www.selectchateaux.com → nouvelle version
   ```

---

## 📊 CHECKLIST MIGRATION BLOG

### Avant migration
- [ ] Backup complet du blog actuel
- [ ] Liste de toutes les URLs blog actuelles
- [ ] Export de tous les articles
- [ ] Vérification des images (chemins)
- [ ] Note des métadonnées SEO actuelles

### Pendant migration
- [ ] Articles importés correctement
- [ ] Images fonctionnelles
- [ ] URLs identiques (ou redirections 301)
- [ ] Metadata SEO préservées
- [ ] Design responsive

### Après migration
- [ ] Tous les articles accessibles
- [ ] Google Search Console - aucune erreur 404
- [ ] Analytics trackant correctement
- [ ] Performances (PageSpeed > 90)
- [ ] Sitemap mis à jour

---

## 🆘 BESOIN D'AIDE ?

**Je peux vous aider à :**

1. **Identifier votre système actuel**
   - Donnez-moi l'URL de votre blog en production
   - Je vais analyser et vous dire exactement quoi faire

2. **Coder la migration**
   - Je peux adapter le code selon votre système
   - Écrire les scripts de migration
   - Configurer les redirections

3. **Tester avant déploiement**
   - Vérifier que tout fonctionne
   - S'assurer du SEO

---

## 🎯 QUELLE EST VOTRE SITUATION ?

**Répondez à ces questions pour que je vous guide précisément :**

1. Votre blog actuel en production est sur quelle URL ?
   - [ ] www.selectchateaux.com/blog
   - [ ] blog.selectchateaux.com
   - [ ] Autre : _______________

2. Votre blog actuel utilise quelle technologie ?
   - [ ] WordPress
   - [ ] Next.js (même que le nouveau)
   - [ ] Contentful / Strapi / autre CMS
   - [ ] Fichiers Markdown (.md)
   - [ ] Je ne sais pas

3. Combien d'articles avez-vous ?
   - [ ] < 10 articles
   - [ ] 10-50 articles
   - [ ] 50+ articles

4. Les URLs des articles doivent-elles rester identiques ?
   - [ ] Oui, impératif pour le SEO
   - [ ] Non, je peux faire des redirections 301

---

**Une fois que vous me donnez ces infos, je peux vous créer un plan de migration exact et coder la solution pour vous** 🚀

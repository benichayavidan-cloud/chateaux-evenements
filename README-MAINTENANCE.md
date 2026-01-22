# SELECT CHÂTEAUX - Guide de Maintenance
**Version:** 1.0 Production
**Date:** 15 janvier 2026

---

## 🚀 Démarrage Rapide

### Installation
```bash
# Installer les dépendances
npm install

# Lancer en mode développement
npm run dev

# Build pour production
npm run build

# Démarrer en production (après build)
npm start
```

Le site sera accessible sur `http://localhost:3000`

---

## 📁 Structure du Projet

```
chateaux-evenements/
├── src/
│   ├── app/              # Pages Next.js (App Router)
│   │   ├── page.tsx      # Page d'accueil
│   │   ├── chateaux/     # Listing et détails châteaux
│   │   ├── evenements/   # Page événements
│   │   ├── team-building/# Page team building
│   │   ├── contact/      # Page contact
│   │   ├── devis/        # Formulaire devis
│   │   └── api/          # API routes
│   ├── components/       # Composants React réutilisables
│   ├── data/             # Données des châteaux
│   ├── config/           # Configuration thème
│   ├── lib/              # Utilitaires et Supabase client
│   └── types/            # Types TypeScript
├── public/               # Assets statiques
│   ├── images/           # Images du site
│   └── logos/            # Logos clients
├── backup/               # Sauvegarde complète (NE PAS TOUCHER)
├── .env.local            # Variables d'environnement (SENSIBLE)
├── package.json          # Dépendances
└── README-MAINTENANCE.md # Ce fichier

```

---

## 📝 Modifications Courantes

### 1. Modifier le Contenu des Châteaux

**Fichier:** `src/data/chateaux.ts`

```typescript
// Exemple de structure
{
  nom: "Le Manoir Anglo-Normand & Son Parc (Chantilly)",
  region: "Oise (60)",
  capacite: { min: 50, max: 280 },
  descriptionLongue: "Votre description ici...",
  images: {
    hero: ["url1.jpg", "url2.jpg", ...],
    card: "url.jpg",
    galerie: ["url1.jpg", "url2.jpg", ...]
  },
  faq: [
    {
      question: "Votre question ?",
      answer: "Votre réponse..."
    }
  ]
}
```

**Après modification:**
```bash
npm run dev  # Vérifier en local
```

### 2. Ajouter/Modifier des Images

#### Images Locales (public/images/)
1. Ajouter l'image dans `public/images/`
2. Référencer dans le code: `/images/nom-image.jpg`

#### Images Supabase
1. Uploader sur Supabase Dashboard
2. Bucket: `chateaux-images`
3. URL format: `https://jmeiepmtgidqtmxfnlwf.supabase.co/storage/v1/object/public/chateaux-images/[dossier]/[nom].jpg`

### 3. Modifier les Métadonnées SEO

**Fichier:** `src/app/layout.tsx` (global)
**Ou:** `src/app/[page]/layout.tsx` (page spécifique)

```typescript
export const metadata: Metadata = {
  title: "Votre titre",
  description: "Votre description",
  keywords: ["mot-clé1", "mot-clé2"]
}
```

### 4. Modifier le Formulaire de Devis

**Fichiers:**
- `src/components/DevisForm/` (tous les steps)
- `src/app/api/devis/route.ts` (API endpoint)

---

## 🗄️ Base de Données Supabase

### Configuration
**Projet:** jmeiepmtgidqtmxfnlwf
**Dashboard:** https://supabase.com/dashboard/project/jmeiepmtgidqtmxfnlwf

### Tables
- **devis:** Stocke les demandes de devis du formulaire

### Storage
- **chateaux-images:** Bucket public pour les images des châteaux

### Accès
Credentials dans `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=https://jmeiepmtgidqtmxfnlwf.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[clé publique]
SUPABASE_SERVICE_ROLE_KEY=[clé secrète]
```

**⚠️ NE JAMAIS committer .env.local sur Git!**

---

## 🚀 Déploiement

### Vercel (Production)

**Méthode Automatique (recommandée):**
```bash
# Push sur GitHub déclenche auto-deploy
git add .
git commit -m "Description des modifications"
git push origin main
```

**Méthode Manuelle:**
```bash
vercel --prod
```

### Variables d'Environnement Vercel
Configurer dans Vercel Dashboard > Settings > Environment Variables:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

---

## 🔧 Dépannage

### Erreur "Module not found"
```bash
rm -rf node_modules package-lock.json
npm install
```

### Build qui échoue
```bash
# Nettoyer le cache
rm -rf .next
npm run build
```

### Images qui ne s'affichent pas
1. Vérifier que l'image existe dans `public/images/` ou sur Supabase
2. Vérifier le chemin dans le code
3. Vérifier les permissions du bucket Supabase (public)

### Formulaire devis qui ne fonctionne pas
1. Vérifier la connexion Supabase (credentials dans .env.local)
2. Vérifier les logs: `vercel logs` ou console navigateur
3. Vérifier la table `devis` existe dans Supabase

---

## 📞 Contacts Importants

**Email du site:** seminaires@selectchateaux.com
**Téléphone:** +33 7 57 99 11 46

**URLs:**
- **Production:** https://www.selectchateaux.com
- **Vercel Dashboard:** https://vercel.com/benichayavidan-clouds-projects/select_chateaux
- **GitHub Repo:** https://github.com/benichayavidan-cloud/chateaux-evenements

---

## 🔒 Sécurité

### Fichiers Sensibles (NE PAS PARTAGER)
- `.env.local` - Credentials Supabase
- `backup/` - Contient les credentials

### Bonnes Pratiques
- Toujours tester en local avant de déployer
- Ne jamais committer de credentials
- Faire des backups réguliers (dossier `backup/`)
- Vérifier les logs après chaque déploiement

---

## 📚 Technologies Utilisées

- **Framework:** Next.js 16.1.1 (App Router)
- **UI:** React 19 + Tailwind CSS
- **Animations:** Framer Motion
- **Backend:** Supabase (PostgreSQL + Storage)
- **Déploiement:** Vercel
- **Icônes:** Lucide React
- **TypeScript:** Pour la sécurité du code

---

## 🆘 Support

En cas de problème:
1. Consulter ce README
2. Consulter `backup/README-BACKUP.md` pour restauration
3. Vérifier les logs Vercel
4. Contacter le développeur

---

**Dernière mise à jour:** 15 janvier 2026
**Version:** 1.0 Production Ready

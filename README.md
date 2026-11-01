# SELECT CHÂTEAUX - Site Web Officiel

**Site de présentation et réservation pour châteaux et lieux d'événements d'entreprise en Île-de-France**

🌐 **Site en ligne:** https://www.selectchateaux.com

---

## 🎯 À Propos

Select Châteaux est une plateforme premium présentant 4 domaines d'exception pour:
- Séminaires d'entreprise
- Conventions et CODIR
- Team Building
- Événements corporate

**Régions couvertes:** Chantilly (60), Paris 92, Vallée de Chevreuse (78)

---

## ⚡ Démarrage Rapide

```bash
# Installation
npm install

# Développement
npm run dev

# Build Production
npm run build

# Démarrage Production
npm start
```

Ouvrir http://localhost:3000

---

## 📋 Documentation

- 📖 **Guide de Maintenance:** `README-MAINTENANCE.md`
- 💾 **Backup & Restauration:** `backup/README-BACKUP.md`

---

## 🛠️ Stack Technique

- **Framework:** Next.js 16.1.1 (App Router)
- **Langage:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Backend:** Supabase (PostgreSQL + Storage)
- **Déploiement:** Vercel
- **Version Node:** 18+

---

## 📦 Fonctionnalités

✅ 4 Pages Détail Châteaux avec galeries interactives
✅ Formulaire de devis multi-étapes
✅ SEO optimisé (Schema.org, Open Graph)
✅ Responsive Design
✅ Performance optimisée
✅ Intégration Supabase pour les demandes
✅ Sitemap & Robots.txt
✅ Pages légales (CGV, Confidentialité, Mentions)

---

## 🚀 Déploiement

### Production Vercel
```bash
vercel --prod
```

### Variables d'Environnement
Configurer dans Vercel Dashboard:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

---

## 📞 Contact

**Email:** seminaires@selectchateaux.com
**Téléphone:** +33 1 83 80 60 00

---

## 🔒 Sécurité

⚠️ **Fichier `.env.local` contient des credentials sensibles**
- Ne JAMAIS committer ce fichier
- Ne JAMAIS partager les clés API
- Backup régulier recommandé (voir `backup/`)

---

## 📝 License

Propriétaire - Select Châteaux © 2026

---

**Version:** 1.0 Production
**Dernière mise à jour:** 15 janvier 2026

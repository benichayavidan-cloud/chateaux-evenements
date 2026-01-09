# Guide de Migration Base de Données - Châteaux Événements

## 📋 Vue d'ensemble

Ce guide vous explique comment appliquer la migration de la table `demandes_devis_chateaux` dans votre base Supabase.

---

## 🔐 Étape 1: Récupérer la Connection String PostgreSQL

### Dans le Dashboard Supabase:

1. **Ouvrez** https://app.supabase.com
2. **Sélectionnez** votre projet `site-moderne-expert`
3. **Cliquez** sur l'icône ⚙️ **Settings** (en bas à gauche)
4. **Cliquez** sur **Database** dans le menu
5. **Scrollez** jusqu'à la section **Connection string**
6. **Sélectionnez** l'onglet **URI**
7. **Copiez** la connection string qui ressemble à :
   ```
   postgresql://postgres.[PROJECT-REF]:[YOUR-PASSWORD]@aws-0-eu-central-1.pooler.supabase.com:6543/postgres
   ```

### ⚠️ Important:

- Dans la connection string, remplacez `[YOUR-PASSWORD]` par votre mot de passe de base de données
- Si vous ne connaissez pas votre mot de passe, cliquez sur "Reset database password" dans les settings
- **Gardez cette connection string secrète** - ne la partagez jamais et ne la commitez pas

---

## 🚀 Étape 2: Exécuter la Migration Automatique

Une fois que vous avez la connection string:

```bash
node scripts/apply-migration.js
```

Le script va:
1. ✅ Ouvrir une fenêtre de dialogue sécurisée
2. ✅ Vous demander la connection string (collez-la)
3. ✅ Se connecter à votre base Supabase
4. ✅ Créer la table `demandes_devis_chateaux`
5. ✅ Créer tous les indexes nécessaires
6. ✅ Configurer les RLS policies
7. ✅ Vérifier que tout fonctionne

---

## 📊 Étape 3: Vérification

Après la migration, vérifiez dans Supabase Dashboard:

1. **Table Editor** → Vous devriez voir la table `demandes_devis_chateaux`
2. **SQL Editor** → Exécutez:
   ```sql
   SELECT * FROM demandes_devis_chateaux LIMIT 1;
   ```
3. Si tout est OK, vous êtes prêt à tester le formulaire!

---

## 🧪 Étape 4: Tester le Formulaire

```bash
npm run dev
```

1. Ouvrez http://localhost:3000/devis
2. Remplissez le formulaire de demande de devis
3. Soumettez-le
4. Vérifiez dans Supabase que la demande est bien enregistrée

---

## 🔄 Alternative: Migration Manuelle

Si vous préférez ne pas utiliser le script automatique:

1. **Ouvrez** Supabase Dashboard → SQL Editor
2. **Copiez** le contenu de `supabase-devis-chateaux-migration.sql`
3. **Collez** dans SQL Editor
4. **Cliquez** sur "RUN"
5. **Vérifiez** le message "Success. No rows returned"

---

## 🆘 En cas de Problème

### Erreur: "relation already exists"
La table existe déjà. Pas de problème! Vérifiez juste qu'elle a la bonne structure.

### Erreur: "function update_updated_at_column does not exist"
Le script la crée automatiquement. Si vous faites la migration manuelle, créez d'abord:

```sql
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
```

### Erreur: "connection refused"
Vérifiez que:
- Votre connection string est correcte
- Vous avez remplacé `[YOUR-PASSWORD]` par le vrai mot de passe
- Votre projet Supabase est actif

---

## ✅ Checklist Complète

- [ ] Connection string récupérée
- [ ] Script de migration exécuté avec succès
- [ ] Table visible dans Supabase Dashboard
- [ ] Formulaire testé en local
- [ ] Données arrivent bien dans la base
- [ ] Prêt à pusher le code!

---

## 📞 Contact

En cas de problème persistant, vérifiez les logs détaillés dans le script ou contactez le support Supabase.

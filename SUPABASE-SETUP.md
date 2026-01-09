# Configuration Supabase pour Châteaux Événements

## 📋 Prérequis

- Un compte Supabase (gratuit sur [supabase.com](https://supabase.com))
- Un projet Supabase créé

## 🚀 Installation

### 1. Créer les tables principales

Allez dans votre dashboard Supabase :
1. Cliquez sur **SQL Editor** dans le menu latéral
2. Cliquez sur **New query**
3. Copiez-collez le contenu du fichier `supabase-migration.sql`
4. Cliquez sur **Run** pour exécuter la migration

Cela créera les tables :
- `chateaux`
- `evenements`
- `testimonials`

### 2. Créer la table des demandes de devis

Dans le même SQL Editor :
1. Créez une **New query**
2. Copiez-collez le contenu du fichier `supabase-devis-migration.sql`
3. Cliquez sur **Run** pour exécuter

Cela créera la table :
- `demandes_devis` (pour stocker toutes les demandes de devis)

### 3. Configuration des variables d'environnement

Créez un fichier `.env.local` à la racine du projet avec :

```env
NEXT_PUBLIC_SUPABASE_URL=votre_url_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre_clé_anonyme
```

Pour trouver ces valeurs :
1. Allez dans **Settings** > **API** dans votre dashboard Supabase
2. Copiez l'URL du projet
3. Copiez la clé `anon` / `public`

## 📊 Structure de la table demandes_devis

| Champ | Type | Description |
|-------|------|-------------|
| `id` | UUID | Identifiant unique (auto-généré) |
| `type_evenement` | TEXT | Type d'événement (seminaire, journee-etude, etc.) |
| `dates_souhaitees` | DATE | Date souhaitée pour l'événement |
| `duree` | TEXT | Durée (1-jour, 2-jours, 3-jours-plus) |
| `chateau_id` | TEXT | ID du château sélectionné |
| `entreprise` | TEXT | Nom de l'entreprise |
| `nom_prenom` | TEXT | Nom et prénom du contact |
| `email` | TEXT | Email du contact |
| `telephone_mobile` | TEXT | Téléphone mobile |
| `nombre_participants` | INTEGER | Nombre de participants (10-500) |
| `nombre_chambres` | INTEGER | Nombre de chambres nécessaires (1-400) |
| `plus_de_500_participants` | BOOLEAN | Si > 500 participants |
| `plus_de_400_chambres` | BOOLEAN | Si > 400 chambres |
| `chambres_twin` | BOOLEAN | Chambres twin nécessaires |
| `budget` | TEXT | Budget estimé |
| `commentaire_deroulement` | TEXT | Description du déroulement |
| `fichier_url` | TEXT | URL du fichier attaché (optionnel) |
| `statut` | TEXT | Statut (nouveau, en-cours, traite, annule) |
| `created_at` | TIMESTAMP | Date de création |
| `updated_at` | TIMESTAMP | Date de mise à jour |

## 🔐 Sécurité (RLS)

Les Row Level Security policies sont configurées ainsi :

- **Insertion** : ✅ Publique (tout le monde peut soumettre un devis)
- **Lecture** : 🔒 Bloquée (protège les données clients)
- **Mise à jour** : 🔒 Admin uniquement

Pour consulter les demandes de devis, utilisez le dashboard Supabase :
1. Allez dans **Table Editor**
2. Sélectionnez la table `demandes_devis`
3. Consultez les entrées

## 📧 Notification par email (optionnel)

Pour recevoir des notifications par email lors de nouvelles demandes :

1. Activez **Database Webhooks** dans Supabase
2. Configurez un webhook vers un service comme Zapier, Make.com, ou votre propre API
3. Le webhook se déclenchera à chaque INSERT dans `demandes_devis`

## ✅ Test

Pour tester le système :

1. Lancez le projet en local : `npm run dev`
2. Allez sur `/devis`
3. Remplissez le formulaire
4. Soumettez
5. Vérifiez dans Supabase > Table Editor > demandes_devis

## 🛠️ Dépannage

### Erreur "relation does not exist"
➡️ Vérifiez que vous avez bien exécuté les deux migrations SQL

### Erreur "permission denied"
➡️ Vérifiez les RLS policies et que l'insertion publique est bien activée

### Les données n'arrivent pas
➡️ Vérifiez la console du navigateur et les logs Supabase

### Variables d'environnement manquantes
➡️ Vérifiez que `.env.local` existe et contient les bonnes clés

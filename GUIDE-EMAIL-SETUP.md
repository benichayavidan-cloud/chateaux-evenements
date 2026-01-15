# 📧 Guide de Configuration des Emails - SELECT CHÂTEAUX

Ce guide vous accompagne dans la configuration complète du système d'envoi d'emails automatiques pour les demandes de devis.

---

## ✅ Ce qui est DÉJÀ FAIT

Tout le code a été implémenté et est prêt à fonctionner :

- ✅ Installation de Nodemailer
- ✅ Service d'envoi d'emails (`/src/lib/email.ts`)
- ✅ Templates HTML professionnels (admin + client)
- ✅ Intégration dans l'API `/api/devis`
- ✅ Gestion des erreurs et logs

---

## 🔧 CE QUE VOUS DEVEZ FAIRE (Action Requise)

### Étape 1 : Générer un App Password Gmail

Pour des raisons de sécurité, Gmail nécessite un "mot de passe d'application" spécial au lieu de votre mot de passe principal.

#### Instructions détaillées :

1. **Ouvrir votre compte Gmail**
   - Connectez-vous à Gmail avec `seminaires@selectchateaux.com`
   - Allez dans votre compte Google

2. **Accéder à la Sécurité**
   - Menu : **Compte Google** → **Sécurité**
   - URL directe : https://myaccount.google.com/security

3. **Activer la validation en 2 étapes** (si pas déjà fait)
   - Dans la section "Connexion à Google"
   - Cliquez sur "Validation en 2 étapes"
   - Suivez les instructions pour l'activer avec votre téléphone

4. **Générer un mot de passe d'application**
   - Toujours dans la section "Sécurité"
   - Cherchez "Mots de passe des applications" ou "App passwords"
   - URL directe : https://myaccount.google.com/apppasswords

5. **Créer le mot de passe**
   - Cliquez sur "Sélectionner une application"
   - Choisissez **"Autre (nom personnalisé)"**
   - Tapez : **"Site Web Select Châteaux"**
   - Cliquez sur **"Générer"**

6. **Copier le mot de passe**
   - Google affichera un mot de passe de 16 caractères (ex: `abcd efgh ijkl mnop`)
   - **IMPORTANT:** Copiez-le immédiatement, vous ne pourrez plus le voir après !
   - Le mot de passe ressemble à : `xxxx xxxx xxxx xxxx` (4 groupes de 4 lettres)

---

### Étape 2 : Configurer les Variables d'Environnement

#### En Local (Développement)

1. **Ouvrir le fichier `.env.local`**
   ```bash
   cd "/Users/avidanbenichay/Documents/SELECT CHATEAU/SITE-WEB"
   open .env.local
   ```

2. **Ajouter ces lignes à la fin du fichier**
   ```env
   # Configuration Email SMTP (Gmail)
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=seminaires@selectchateaux.com
   SMTP_PASS=xxxx xxxx xxxx xxxx
   EMAIL_FROM=seminaires@selectchateaux.com
   EMAIL_ADMIN=seminaires@selectchateaux.com
   ```

3. **Remplacer `xxxx xxxx xxxx xxxx`**
   - Collez le mot de passe d'application généré à l'étape 1
   - Gardez les espaces entre les groupes de lettres

4. **Sauvegarder le fichier**
   - Appuyez sur `Cmd + S`

---

#### En Production (Vercel)

Une fois que vous aurez testé en local, vous devrez aussi configurer Vercel :

1. **Aller sur Vercel Dashboard**
   - URL : https://vercel.com/dashboard
   - Sélectionnez votre projet Select Châteaux

2. **Accéder aux Variables d'Environnement**
   - Onglet : **Settings** → **Environment Variables**

3. **Ajouter chaque variable une par une**

   | Nom de la Variable | Valeur |
   |-------------------|--------|
   | `SMTP_HOST` | `smtp.gmail.com` |
   | `SMTP_PORT` | `587` |
   | `SMTP_USER` | `seminaires@selectchateaux.com` |
   | `SMTP_PASS` | `xxxx xxxx xxxx xxxx` (votre App Password) |
   | `EMAIL_FROM` | `seminaires@selectchateaux.com` |
   | `EMAIL_ADMIN` | `seminaires@selectchateaux.com` |

4. **Sélectionner les environnements**
   - Cochez : **Production**, **Preview**, et **Development**

5. **Cliquer sur "Save"**

6. **Redéployer l'application**
   - Allez dans l'onglet **Deployments**
   - Cliquez sur les 3 points du dernier déploiement
   - Sélectionnez **"Redeploy"**

---

### Étape 3 : Tester le Système

#### Test en Local

1. **Démarrer le serveur de développement**
   ```bash
   cd "/Users/avidanbenichay/Documents/SELECT CHATEAU/SITE-WEB"
   npm run dev
   ```

2. **Ouvrir votre navigateur**
   - Allez sur : http://localhost:3000/devis

3. **Remplir le formulaire de devis**
   - Remplissez toutes les étapes
   - Utilisez votre email personnel pour tester l'email de confirmation client

4. **Soumettre le formulaire**

5. **Vérifier les résultats**

   ✅ **Ce qui doit se passer :**
   - Message de succès affiché sur le site
   - Demande enregistrée dans Supabase
   - **2 emails envoyés :**
     - 📧 Email admin reçu à `seminaires@selectchateaux.com`
     - 📧 Email client reçu à l'adresse saisie dans le formulaire

   ✅ **Vérifier dans Gmail :**
   - Connectez-vous à `seminaires@selectchateaux.com`
   - Allez dans **"Envoyés"**
   - Vous devriez voir les 2 emails envoyés
   - Streak trackera automatiquement ces emails

6. **Vérifier les logs du serveur**
   - Dans votre terminal où tourne `npm run dev`
   - Vous devriez voir :
     ```
     ✅ Email envoyé avec succès: ...
     📧 Résultats envoi emails: ...
     ```

---

## 🔍 Dépannage

### Problème : "Configuration email invalide"

**Cause possible :** App Password incorrect ou variables d'environnement mal configurées

**Solution :**
1. Vérifiez que vous avez bien copié le mot de passe d'application (16 caractères avec espaces)
2. Vérifiez qu'il n'y a pas d'espaces en trop dans le fichier `.env.local`
3. Redémarrez le serveur de développement (`npm run dev`)

### Problème : "Authentication failed"

**Cause possible :** La validation en 2 étapes n'est pas activée sur Gmail

**Solution :**
1. Activez la validation en 2 étapes sur votre compte Gmail
2. Générez un nouveau mot de passe d'application
3. Mettez à jour la variable `SMTP_PASS` dans `.env.local`

### Problème : Les emails ne sont pas reçus

**Causes possibles :**
- Le mot de passe d'application est incorrect
- Les emails sont dans les spams
- La configuration SMTP est incorrecte

**Solution :**
1. Vérifiez vos dossiers **Spam/Courrier indésirable**
2. Vérifiez les logs dans le terminal pour voir les erreurs
3. Testez la configuration avec cette commande :
   ```bash
   # Créer un fichier de test
   node -e "import('./src/lib/email.js').then(m => m.testEmailConfiguration())"
   ```

### Problème : Emails envoyés mais pas trackés par Streak

**Cause :** Cela ne devrait pas arriver car les emails passent par Gmail SMTP

**Solution :**
- Actualisez Gmail
- Vérifiez que Streak est bien actif dans votre navigateur
- Les emails peuvent prendre quelques secondes à apparaître dans Streak

---

## 📊 Ce que Vous Obtenez

### Email Admin (seminaires@selectchateaux.com)

Quand un client soumet une demande de devis, vous recevez automatiquement un email professionnel avec :

- 🔔 Titre : "Nouvelle demande de devis - [Type d'événement]"
- 📋 Référence unique (ex: #DEV-AB123456)
- 👤 Informations complètes du client (nom, email, téléphone cliquables)
- 🎯 Détails de l'événement (date, durée, participants, budget)
- 🏰 Châteaux sélectionnés
- 💬 Commentaire du client (si fourni)
- 📎 Lien vers le fichier joint (si fourni)
- 🔗 Bouton "Voir dans Supabase" pour accès direct

### Email Client (Confirmation)

Le client reçoit un email rassurant avec :

- ✓ Confirmation de réception
- 📋 Numéro de référence de sa demande
- 📝 Récapitulatif de sa demande
- 🎯 Prochaines étapes clairement expliquées
- ⏱️ Délai de réponse (24-48h)
- 📧 Informations de contact pour questions

### Dans Gmail "Envoyés"

- ✅ Les 2 emails apparaissent dans votre dossier "Envoyés"
- ✅ Historique complet accessible
- ✅ Trackés automatiquement par Streak (ouvertures, clics)
- ✅ Possibilité de répondre directement depuis Gmail

---

## 🎨 Design des Emails

Les emails sont **responsives** et **professionnels** :

- ✅ Compatible mobile, tablette, desktop
- ✅ Couleurs de la marque Select Châteaux
- ✅ Templates HTML modernes avec dégradés
- ✅ Fallback texte brut pour anciens clients email
- ✅ Liens cliquables (email, téléphone)
- ✅ Call-to-action clairs

---

## 📈 Limites Gmail SMTP

### Quotas d'Envoi

- **Google Workspace :** 500 emails/jour
- **Gmail gratuit :** 100 emails/jour

**Note :** Chaque demande de devis envoie 2 emails (admin + client), donc :
- Google Workspace : 250 demandes/jour max
- Gmail gratuit : 50 demandes/jour max

Pour un volume supérieur, envisagez de migrer vers Resend ou SendGrid.

---

## 🔐 Sécurité

✅ **Bonnes pratiques respectées :**

- Mot de passe d'application (pas le mot de passe principal)
- Variables d'environnement (jamais dans le code source)
- `.env.local` dans `.gitignore` (non versionné)
- Service Role Key Supabase pour accès sécurisé à la base
- Validation Zod des données avant envoi

---

## 💡 Prochaines Étapes (Optionnel)

Après avoir testé et validé le système, vous pourriez :

1. **Personnaliser les templates email**
   - Modifier les couleurs dans `/src/lib/email.ts`
   - Ajouter votre logo
   - Ajuster le contenu des messages

2. **Ajouter des statistiques**
   - Migrer vers Resend pour avoir des stats d'ouverture
   - Intégrer avec Google Analytics

3. **Créer un dashboard admin**
   - Interface pour voir toutes les demandes
   - Changer le statut des demandes
   - Envoyer des emails de suivi

4. **Emails de suivi automatiques**
   - Relance J+2 si pas de réponse
   - Relance J+7
   - Enquête de satisfaction après l'événement

---

## 📞 Support

Si vous rencontrez des difficultés :

1. Vérifiez d'abord la section **Dépannage** ci-dessus
2. Vérifiez les logs dans le terminal
3. Consultez la documentation Nodemailer : https://nodemailer.com/
4. Consultez la documentation Gmail App Passwords : https://support.google.com/accounts/answer/185833

---

## ✅ Checklist Finale

Avant de passer en production, vérifiez que :

- [ ] App Password Gmail généré
- [ ] Variables d'environnement configurées dans `.env.local`
- [ ] Test local réussi (email admin + client reçus)
- [ ] Emails visibles dans Gmail "Envoyés"
- [ ] Streak tracke bien les emails
- [ ] Variables configurées dans Vercel
- [ ] Redéploiement Vercel effectué
- [ ] Test en production réussi (depuis https://www.selectchateaux.com/devis)

---

**🎉 Une fois ces étapes complétées, votre système d'emails automatiques sera opérationnel !**

Les clients recevront une confirmation immédiate et vous serez notifié instantanément de chaque nouvelle demande de devis.

# 📁 Documentation Juridique - Select Châteaux

## 📄 Fichiers Disponibles

### ✅ CGV-Select-Chateaux-2026.pdf
**PDF PROFESSIONNEL PRÊT À L'EMPLOI** - Version officielle Janvier 2026
- Taille: ~337 KB
- Format: A4
- Police: Times New Roman 8.5pt (format légal compact)
- Bas de page avec toutes les infos société

### 📝 CGV-Select-Chateaux-2026-Print.html
Fichier source HTML optimisé pour la génération PDF

### 🌐 CGV-Select-Chateaux-2026.html
Version web avec polices plus grandes pour navigation

## 🎨 Design et Palette de Couleurs

Le document utilise la palette de couleurs officielle de Select Châteaux :
- **Bronze Principal** : #A37E2C (titre, bordures, accents)
- **Noir Profond** : #050505 (titres principaux, texte fort)
- **Gris Foncé** : #1a1a1a (corps de texte)
- **Blanc Cassé** : #FFF9E6 (zones de mise en évidence)

## 📋 Structure du Document PDF

Les CGV comprennent **11 articles juridiques complets** :

1. **Objet et Champ d'Application** - Définition de l'activité (Merchant Model B2B)
2. **Prix et Facturation** - Tarification, TVA, révisions
3. **Modalités de Réservation et Paiement** - Acompte 50% / Solde J-30
4. **Conditions d'Annulation** - Barème strict (100% à J-30)
5. **Report et Modification** - Report gratuit > J-60, pénalités ensuite
6. **Force Majeure, Intempéries et Défaillance** - Clauses protectrices étendues
7. **Obligations du Commanditaire** - Responsabilités du client
8. **Responsabilités et Assurance** - Limitations de responsabilité
9. **Données Personnelles et RGPD** - Conformité protection des données
10. **Litiges et Droit Applicable** - Tribunal de Paris, médiation
11. **Dispositions Générales** - Nullité partielle, langue, modifications

## 🛡️ Points Clés de Protection

### ✅ Clauses Protectrices Renforcées

**Force Majeure Étendue (Article 6.1)**
- Définition élargie incluant crises sanitaires, fermetures administratives
- Conséquence : REPORT automatique (Avoir 18 mois), pas de remboursement immédiat

**Météo (Article 6.2)**
- Pluie/vent **NE SONT PAS** force majeure
- Seulement Vigilance Rouge ou Arrêté Préfectoral

**Défaillance du Lieu (Article 6.3)**
- Obligation de proposer un lieu de remplacement
- Limitation de responsabilité au remboursement strict

**Annulations (Article 4)**
- Barème strict : 100% de rétention à J-30
- Prestations non consommées = dues intégralement

## 🔄 Régénérer le PDF

Si vous modifiez le HTML et souhaitez régénérer le PDF :

### Méthode 1 : Script NPM (Recommandé)
```bash
npm run generate:cgv
```

### Méthode 2 : Node.js Direct
```bash
node scripts/generate-cgv-pdf.js
```

Le PDF sera automatiquement généré dans ce dossier.

## 📄 Bas de Page Professionnel

Le PDF inclut un bas de page fixe sur chaque page avec :
- Raison sociale complète
- Capital social et RCS
- SIRET
- Adresse complète
- Email et téléphone
- Mention copyright
- Numéro de page automatique

## ⚙️ Caractéristiques Techniques du PDF

- **Format** : A4 (210 x 297 mm)
- **Police** : Times New Roman 8.5pt (corps de texte)
- **Titres** : 10-14pt selon niveau hiérarchique
- **Marges** : 1.5cm (haut), 2cm (droite/gauche/bas)
- **Fond** : Impression des arrière-plans activée
- **Optimisation** : Police légale compacte pour maximiser le contenu

## 📧 Utilisation du PDF

### Pour envoi aux clients :
1. Le PDF est prêt à être envoyé tel quel
2. Peut être joint aux devis et contrats
3. Peut être imprimé pour signature papier

### Pour signature électronique :
Le PDF peut être utilisé avec des outils comme :
- DocuSign
- Adobe Sign
- HelloSign
- Yousign (français)

## ⚖️ Statut Juridique

**Nature du Document** : Conditions Générales de Vente B2B
**Secteur d'Activité** : Organisation de séminaires d'entreprise
**Modèle Économique** : Achat-Revente (Merchant Model)
**Exclusion** : Non soumis au Code du Tourisme (Article L211-1)

## 🔐 Informations Légales Incluses

Le document contient :
- ✅ Raison sociale : Select Châteaux SAS
- ✅ Capital social : 10 000 euros
- ✅ RCS : Paris B 123 456 789
- ✅ SIRET : 123 456 789 00010
- ✅ Siège social : 60 Rue François 1er, 75008 Paris
- ✅ Email : seminaires@selectchateaux.com
- ✅ Téléphone : 07 57 99 11 46

**⚠️ À FAIRE AVANT UTILISATION :** Vérifier et mettre à jour le numéro RCS et SIRET réels de votre société dans le fichier HTML source, puis régénérer le PDF.

## 🔄 Mises à Jour

**Version actuelle** : Janvier 2026
**Prochaine révision** : Janvier 2027 (ou selon évolution législative)

Pour mettre à jour les CGV :
1. Modifier le fichier `CGV-Select-Chateaux-2026-Print.html`
2. Lancer `npm run generate:cgv`
3. Le nouveau PDF remplacera l'ancien

## 🛠️ Outils Utilisés

- **Puppeteer** : Génération PDF haute qualité via Chrome headless
- **Node.js** : Script automatisé
- **HTML/CSS** : Source éditable facilement

## 📞 Contact Juridique

Pour toute question juridique concernant ces CGV :
- **Email** : seminaires@selectchateaux.com
- **Téléphone** : 07 57 99 11 46

## ⚠️ Avertissement

Ce document a été rédigé par un expert juridique en droit des contrats événementiels B2B.
**Avant utilisation commerciale**, il est recommandé de :
1. ✅ Compléter les mentions RCS et SIRET avec vos vraies informations
2. ✅ Faire relire par un avocat spécialisé en droit des contrats
3. ✅ Adapter selon votre situation spécifique (assurances, etc.)
4. ✅ Vérifier la conformité avec votre situation légale actuelle

---

**© 2026 Select Châteaux - Tous droits réservés**
**Document confidentiel à usage interne et commercial**

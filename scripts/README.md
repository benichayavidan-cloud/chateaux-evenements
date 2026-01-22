# 🛠️ Scripts Utilitaires

## 📄 generate-cgv-pdf.js

Script Node.js pour générer automatiquement le PDF professionnel des CGV à partir du fichier HTML.

### Utilisation

```bash
# Via npm (recommandé)
npm run generate:cgv

# Via Node.js direct
node scripts/generate-cgv-pdf.js
```

### Ce que fait le script

1. ✅ Charge le fichier HTML source : `documentation-juridique/CGV-Select-Chateaux-2026-Print.html`
2. ✅ Lance Chrome headless via Puppeteer
3. ✅ Génère un PDF professionnel avec :
   - Format A4
   - Marges optimisées
   - Impression des arrière-plans
   - Bas de page sur chaque page
4. ✅ Enregistre le PDF : `documentation-juridique/CGV-Select-Chateaux-2026.pdf`
5. ✅ Affiche la taille du fichier généré

### Prérequis

- Node.js installé
- Puppeteer installé (`npm install`)

### Sortie attendue

```
🚀 Démarrage de la génération du PDF...
📄 Fichier HTML trouvé: .../CGV-Select-Chateaux-2026-Print.html
🌐 Navigateur Chrome lancé...
📝 Contenu HTML chargé...
✅ PDF généré avec succès: .../CGV-Select-Chateaux-2026.pdf
📊 Taille du fichier: ~337 KB
🎉 Processus terminé!
```

### Résolution des problèmes

**Erreur "Fichier HTML n'existe pas"**
- Vérifiez que le fichier `CGV-Select-Chateaux-2026-Print.html` existe dans `documentation-juridique/`

**Erreur Puppeteer**
- Réinstallez Puppeteer : `npm install --save-dev puppeteer`

**PDF corrompu**
- Vérifiez que le HTML est valide
- Testez l'ouverture du HTML dans un navigateur avant génération

## 🔄 Workflow de Mise à Jour des CGV

1. Modifier `documentation-juridique/CGV-Select-Chateaux-2026-Print.html`
2. Lancer `npm run generate:cgv`
3. Vérifier le PDF généré
4. Mettre à jour la page web CGV si nécessaire

---

**© 2026 Select Châteaux**

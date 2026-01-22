const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

async function generatePDF() {
  console.log('🚀 Démarrage de la génération du PDF...');

  const htmlPath = path.join(__dirname, '../documentation-juridique/CGV-Select-Chateaux-2026-Print.html');
  const pdfPath = path.join(__dirname, '../documentation-juridique/CGV-Select-Chateaux-2026.pdf');

  // Vérifier que le fichier HTML existe
  if (!fs.existsSync(htmlPath)) {
    console.error('❌ Erreur: Le fichier HTML n\'existe pas:', htmlPath);
    process.exit(1);
  }

  console.log('📄 Fichier HTML trouvé:', htmlPath);

  // Lancer le navigateur
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  console.log('🌐 Navigateur Chrome lancé...');

  const page = await browser.newPage();

  // Charger le fichier HTML
  const htmlContent = fs.readFileSync(htmlPath, 'utf8');
  await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

  console.log('📝 Contenu HTML chargé...');

  // Générer le PDF avec options professionnelles
  await page.pdf({
    path: pdfPath,
    format: 'A4',
    printBackground: true,
    margin: {
      top: '1.5cm',
      right: '2cm',
      bottom: '2cm',
      left: '2cm'
    },
    displayHeaderFooter: false,
    preferCSSPageSize: true
  });

  console.log('✅ PDF généré avec succès:', pdfPath);

  // Obtenir la taille du fichier
  const stats = fs.statSync(pdfPath);
  const fileSizeInKB = (stats.size / 1024).toFixed(2);
  console.log(`📊 Taille du fichier: ${fileSizeInKB} KB`);

  await browser.close();
  console.log('🎉 Processus terminé!');
}

// Exécuter la fonction
generatePDF().catch(err => {
  console.error('❌ Erreur lors de la génération:', err);
  process.exit(1);
});

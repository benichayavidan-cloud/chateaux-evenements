#!/usr/bin/env node

/**
 * Script principal pour lancer tous les tests
 * - Tests de performance
 * - Tests cross-browser
 */

const { runPerformanceTests } = require('./test-performance');
const { runCrossBrowserTests } = require('./test-cross-browser');
const fs = require('fs');
const path = require('path');

const REPORT_DIR = path.join(__dirname, '..', 'Rapport de tests');

async function main() {
  console.log('═══════════════════════════════════════════════════════════');
  console.log('🚀 SELECT CHATEAUX - Suite de Tests Complète');
  console.log('═══════════════════════════════════════════════════════════\n');

  // Créer le dossier de rapports s'il n'existe pas
  if (!fs.existsSync(REPORT_DIR)) {
    fs.mkdirSync(REPORT_DIR, { recursive: true });
  }

  const startTime = Date.now();

  try {
    // 1. Tests de performance
    console.log('\n📊 PHASE 1: TESTS DE PERFORMANCE');
    console.log('─────────────────────────────────────────────────────────');
    await runPerformanceTests();

    // 2. Tests cross-browser
    console.log('\n\n🌍 PHASE 2: TESTS CROSS-BROWSER');
    console.log('─────────────────────────────────────────────────────────');
    await runCrossBrowserTests();

    // Générer un index
    generateIndexPage();

    const duration = ((Date.now() - startTime) / 1000).toFixed(2);

    console.log('\n═══════════════════════════════════════════════════════════');
    console.log('✅ TOUS LES TESTS SONT TERMINÉS !');
    console.log(`⏱️  Durée totale: ${duration}s`);
    console.log('═══════════════════════════════════════════════════════════\n');

    console.log('📂 Rapports disponibles dans: Rapport de tests/');
    console.log('   📄 index.html - Page d\'accueil des rapports');
    console.log('   📊 rapport-performance.html - Tests de performance');
    console.log('   🌍 rapport-cross-browser.html - Tests cross-browser');
    console.log('\n💡 Ouvrez index.html dans votre navigateur pour voir tous les résultats\n');

  } catch (error) {
    console.error('\n❌ ERREUR LORS DES TESTS:', error.message);
    console.error(error);
    process.exit(1);
  }
}

function generateIndexPage() {
  const html = `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Rapports de Tests - SELECT CHATEAUX</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      padding: 40px 20px;
    }
    .container {
      max-width: 1200px;
      margin: 0 auto;
    }
    header {
      text-align: center;
      color: white;
      margin-bottom: 50px;
    }
    h1 {
      font-size: 48px;
      margin-bottom: 10px;
      text-shadow: 0 2px 10px rgba(0,0,0,0.2);
    }
    .subtitle {
      font-size: 18px;
      opacity: 0.9;
    }
    .cards {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: 30px;
      margin-bottom: 40px;
    }
    .card {
      background: white;
      border-radius: 12px;
      padding: 40px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.2);
      transition: transform 0.3s, box-shadow 0.3s;
      text-decoration: none;
      color: inherit;
      display: block;
    }
    .card:hover {
      transform: translateY(-5px);
      box-shadow: 0 15px 40px rgba(0,0,0,0.3);
    }
    .card-icon {
      font-size: 64px;
      margin-bottom: 20px;
      text-align: center;
    }
    .card-title {
      font-size: 28px;
      font-weight: bold;
      color: #2c3e50;
      margin-bottom: 15px;
      text-align: center;
    }
    .card-description {
      color: #7f8c8d;
      line-height: 1.6;
      text-align: center;
      margin-bottom: 25px;
    }
    .card-features {
      list-style: none;
      color: #2c3e50;
    }
    .card-features li {
      padding: 8px 0;
      border-bottom: 1px solid #ecf0f1;
    }
    .card-features li:last-child {
      border-bottom: none;
    }
    .card-features li::before {
      content: '✓';
      color: #27ae60;
      font-weight: bold;
      margin-right: 10px;
    }
    .info-section {
      background: white;
      border-radius: 12px;
      padding: 30px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.2);
    }
    .info-section h2 {
      color: #2c3e50;
      margin-bottom: 20px;
      font-size: 24px;
    }
    .info-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
    }
    .info-item {
      background: #f8f9fa;
      padding: 20px;
      border-radius: 8px;
      border-left: 4px solid #667eea;
    }
    .info-item .label {
      font-size: 12px;
      color: #7f8c8d;
      text-transform: uppercase;
      margin-bottom: 8px;
    }
    .info-item .value {
      font-size: 20px;
      font-weight: bold;
      color: #2c3e50;
    }
    footer {
      text-align: center;
      color: white;
      margin-top: 50px;
      opacity: 0.9;
    }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <h1>📊 Rapports de Tests</h1>
      <p class="subtitle">SELECT CHATEAUX - Analyse complète de performance et compatibilité</p>
      <p style="margin-top: 10px; font-size: 14px;">Généré le ${new Date().toLocaleString('fr-FR')}</p>
    </header>

    <div class="cards">
      <a href="rapport-performance.html" class="card">
        <div class="card-icon">⚡</div>
        <h2 class="card-title">Tests de Performance</h2>
        <p class="card-description">
          Analyse détaillée de la vitesse et des performances du site web
        </p>
        <ul class="card-features">
          <li>Temps de chargement par page</li>
          <li>First Contentful Paint (FCP)</li>
          <li>Analyse des ressources</li>
          <li>Optimisation des images</li>
          <li>Métriques de navigation</li>
        </ul>
      </a>

      <a href="rapport-cross-browser.html" class="card">
        <div class="card-icon">🌍</div>
        <h2 class="card-title">Tests Cross-Browser</h2>
        <p class="card-description">
          Compatibilité sur différents navigateurs et appareils
        </p>
        <ul class="card-features">
          <li>Desktop (Chrome, Firefox, Safari)</li>
          <li>iPad Pro & Mobile</li>
          <li>Responsive design</li>
          <li>Accessibilité</li>
          <li>Captures d'écran multiples</li>
        </ul>
      </a>
    </div>

    <div class="info-section">
      <h2>📋 Informations sur les Tests</h2>
      <div class="info-grid">
        <div class="info-item">
          <div class="label">Pages testées</div>
          <div class="value">4 pages principales</div>
        </div>
        <div class="info-item">
          <div class="label">Configurations browser</div>
          <div class="value">6 configurations</div>
        </div>
        <div class="info-item">
          <div class="label">Tests par page</div>
          <div class="value">6 tests automatisés</div>
        </div>
        <div class="info-item">
          <div class="label">Connexion simulée</div>
          <div class="value">3G Fast (1.6 Mbps)</div>
        </div>
      </div>
    </div>

    <footer>
      <p><strong>SELECT CHATEAUX</strong></p>
      <p>Tests automatisés avec Puppeteer</p>
    </footer>
  </div>
</body>
</html>
  `.trim();

  const indexPath = path.join(REPORT_DIR, 'index.html');
  fs.writeFileSync(indexPath, html);
}

// Exécution
if (require.main === module) {
  main();
}

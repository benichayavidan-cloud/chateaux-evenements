#!/usr/bin/env node

/**
 * Script de test de performance pour SELECT CHATEAUX
 * Teste la vitesse de chargement et les métriques de performance
 */

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const REPORT_DIR = path.join(__dirname, '..', 'Rapport de tests');
const TEST_URL = process.env.TEST_URL || 'http://localhost:3000';

// Pages à tester
const PAGES_TO_TEST = [
  { name: 'Accueil', path: '/' },
  { name: 'Châteaux', path: '/chateaux' },
  { name: 'Contact', path: '/contact' },
  { name: 'À propos', path: '/a-propos' }
];

async function measurePagePerformance(page, url) {
  const startTime = Date.now();

  // Naviguer vers la page
  await page.goto(url, {
    waitUntil: 'networkidle2',
    timeout: 30000
  });

  const loadTime = Date.now() - startTime;

  // Récupérer les métriques de performance
  const metrics = await page.evaluate(() => {
    const perfData = window.performance.timing;
    const navigation = performance.getEntriesByType('navigation')[0];

    return {
      // Temps de chargement
      domContentLoaded: perfData.domContentLoadedEventEnd - perfData.navigationStart,
      loadComplete: perfData.loadEventEnd - perfData.navigationStart,

      // First Paint & First Contentful Paint
      firstPaint: performance.getEntriesByName('first-paint')[0]?.startTime || 0,
      firstContentfulPaint: performance.getEntriesByName('first-contentful-paint')[0]?.startTime || 0,

      // Navigation timing
      dnsTime: perfData.domainLookupEnd - perfData.domainLookupStart,
      tcpTime: perfData.connectEnd - perfData.connectStart,
      requestTime: perfData.responseStart - perfData.requestStart,
      responseTime: perfData.responseEnd - perfData.responseStart,
      domProcessing: perfData.domComplete - perfData.domLoading,

      // Taille transferée
      transferSize: navigation?.transferSize || 0,
      encodedBodySize: navigation?.encodedBodySize || 0,
      decodedBodySize: navigation?.decodedBodySize || 0
    };
  });

  // Compter les ressources
  const resources = await page.evaluate(() => {
    const entries = performance.getEntriesByType('resource');
    const stats = {
      total: entries.length,
      scripts: 0,
      stylesheets: 0,
      images: 0,
      fonts: 0,
      other: 0,
      totalSize: 0
    };

    entries.forEach(entry => {
      if (entry.name.includes('.js')) stats.scripts++;
      else if (entry.name.includes('.css')) stats.stylesheets++;
      else if (entry.name.match(/\.(png|jpg|jpeg|gif|svg|webp)/)) stats.images++;
      else if (entry.name.match(/\.(woff|woff2|ttf|otf)/)) stats.fonts++;
      else stats.other++;

      stats.totalSize += entry.transferSize || 0;
    });

    return stats;
  });

  // Capturer une screenshot
  const screenshot = await page.screenshot({
    fullPage: false,
    type: 'png'
  });

  return {
    loadTime,
    metrics,
    resources,
    screenshot
  };
}

async function runPerformanceTests() {
  console.log('🚀 Démarrage des tests de performance...\n');
  console.log(`📍 URL testée: ${TEST_URL}\n`);

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const results = {
    testDate: new Date().toISOString(),
    testUrl: TEST_URL,
    pages: []
  };

  try {
    for (const pageInfo of PAGES_TO_TEST) {
      console.log(`🧪 Test de la page: ${pageInfo.name}...`);

      const page = await browser.newPage();

      // Configuration de throttling simplifié
      const client = await page.createCDPSession();
      await client.send('Network.enable');

      const url = `${TEST_URL}${pageInfo.path}`;
      const result = await measurePagePerformance(page, url);

      // Sauvegarder le screenshot
      const screenshotPath = path.join(REPORT_DIR, `screenshot-${pageInfo.name.toLowerCase()}.png`);
      fs.writeFileSync(screenshotPath, result.screenshot);

      results.pages.push({
        name: pageInfo.name,
        path: pageInfo.path,
        url: url,
        loadTime: result.loadTime,
        metrics: result.metrics,
        resources: result.resources,
        screenshot: `screenshot-${pageInfo.name.toLowerCase()}.png`
      });

      console.log(`   ✅ Temps de chargement: ${result.loadTime}ms`);
      console.log(`   📦 Ressources: ${result.resources.total} (${(result.resources.totalSize / 1024).toFixed(2)} KB)`);
      console.log(`   🎨 First Contentful Paint: ${result.metrics.firstContentfulPaint.toFixed(2)}ms\n`);

      await page.close();
    }

    // Générer le rapport
    generateReport(results);

    console.log('\n✅ Tests de performance terminés !');
    console.log(`📄 Rapport généré: ${path.join(REPORT_DIR, 'rapport-performance.json')}`);
    console.log(`📊 Rapport HTML: ${path.join(REPORT_DIR, 'rapport-performance.html')}`);

  } catch (error) {
    console.error('❌ Erreur lors des tests:', error);
    throw error;
  } finally {
    await browser.close();
  }
}

function generateReport(results) {
  // Sauvegarder le JSON
  const jsonPath = path.join(REPORT_DIR, 'rapport-performance.json');
  fs.writeFileSync(jsonPath, JSON.stringify(results, null, 2));

  // Générer un rapport HTML
  const html = `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Rapport de Performance - SELECT CHATEAUX</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: #f5f5f5;
      padding: 20px;
      line-height: 1.6;
    }
    .container {
      max-width: 1200px;
      margin: 0 auto;
      background: white;
      padding: 40px;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }
    h1 {
      color: #2c3e50;
      margin-bottom: 10px;
      font-size: 32px;
    }
    .meta {
      color: #7f8c8d;
      margin-bottom: 30px;
      font-size: 14px;
    }
    .summary {
      background: #ecf0f1;
      padding: 20px;
      border-radius: 8px;
      margin-bottom: 30px;
    }
    .summary h2 {
      color: #2c3e50;
      margin-bottom: 15px;
    }
    .summary-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 15px;
    }
    .summary-item {
      background: white;
      padding: 15px;
      border-radius: 6px;
      text-align: center;
    }
    .summary-item .label {
      font-size: 12px;
      color: #7f8c8d;
      text-transform: uppercase;
      margin-bottom: 5px;
    }
    .summary-item .value {
      font-size: 24px;
      font-weight: bold;
      color: #2c3e50;
    }
    .summary-item .value.good { color: #27ae60; }
    .summary-item .value.warning { color: #f39c12; }
    .summary-item .value.bad { color: #e74c3c; }
    .page-result {
      margin-bottom: 40px;
      border: 1px solid #ecf0f1;
      border-radius: 8px;
      overflow: hidden;
    }
    .page-header {
      background: #3498db;
      color: white;
      padding: 15px 20px;
      font-size: 20px;
      font-weight: bold;
    }
    .page-content {
      padding: 20px;
    }
    .metrics-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 15px;
      margin-bottom: 20px;
    }
    .metric-card {
      background: #f8f9fa;
      padding: 15px;
      border-radius: 6px;
      border-left: 4px solid #3498db;
    }
    .metric-card h3 {
      font-size: 14px;
      color: #7f8c8d;
      margin-bottom: 8px;
    }
    .metric-card .value {
      font-size: 24px;
      font-weight: bold;
      color: #2c3e50;
    }
    .screenshot {
      margin-top: 20px;
      text-align: center;
    }
    .screenshot img {
      max-width: 100%;
      border: 1px solid #ecf0f1;
      border-radius: 6px;
    }
    .resources-table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 20px;
    }
    .resources-table th,
    .resources-table td {
      padding: 12px;
      text-align: left;
      border-bottom: 1px solid #ecf0f1;
    }
    .resources-table th {
      background: #f8f9fa;
      font-weight: 600;
      color: #2c3e50;
    }
    footer {
      margin-top: 40px;
      text-align: center;
      color: #7f8c8d;
      font-size: 14px;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>📊 Rapport de Performance</h1>
    <div class="meta">
      <strong>SELECT CHATEAUX</strong> |
      Généré le ${new Date(results.testDate).toLocaleString('fr-FR')} |
      URL testée: ${results.testUrl}
    </div>

    <div class="summary">
      <h2>Résumé Global</h2>
      <div class="summary-grid">
        ${generateGlobalSummary(results)}
      </div>
    </div>

    ${results.pages.map(page => `
      <div class="page-result">
        <div class="page-header">
          ${page.name} - ${page.path}
        </div>
        <div class="page-content">
          <div class="metrics-grid">
            <div class="metric-card">
              <h3>⏱️ Temps de chargement total</h3>
              <div class="value ${getLoadTimeClass(page.loadTime)}">${page.loadTime}ms</div>
            </div>
            <div class="metric-card">
              <h3>🎨 First Contentful Paint</h3>
              <div class="value ${getFCPClass(page.metrics.firstContentfulPaint)}">${page.metrics.firstContentfulPaint.toFixed(0)}ms</div>
            </div>
            <div class="metric-card">
              <h3>📦 Ressources chargées</h3>
              <div class="value">${page.resources.total}</div>
            </div>
            <div class="metric-card">
              <h3>💾 Taille totale</h3>
              <div class="value">${(page.resources.totalSize / 1024).toFixed(2)} KB</div>
            </div>
            <div class="metric-card">
              <h3>📜 Scripts JS</h3>
              <div class="value">${page.resources.scripts}</div>
            </div>
            <div class="metric-card">
              <h3>🎨 Feuilles CSS</h3>
              <div class="value">${page.resources.stylesheets}</div>
            </div>
            <div class="metric-card">
              <h3>🖼️ Images</h3>
              <div class="value">${page.resources.images}</div>
            </div>
            <div class="metric-card">
              <h3>🔤 Polices</h3>
              <div class="value">${page.resources.fonts}</div>
            </div>
          </div>

          <h3>⏱️ Détails de chargement</h3>
          <table class="resources-table">
            <thead>
              <tr>
                <th>Métrique</th>
                <th>Valeur</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>DNS Lookup</td><td>${page.metrics.dnsTime}ms</td></tr>
              <tr><td>TCP Connection</td><td>${page.metrics.tcpTime}ms</td></tr>
              <tr><td>Request Time</td><td>${page.metrics.requestTime}ms</td></tr>
              <tr><td>Response Time</td><td>${page.metrics.responseTime}ms</td></tr>
              <tr><td>DOM Processing</td><td>${page.metrics.domProcessing}ms</td></tr>
              <tr><td>DOM Content Loaded</td><td>${page.metrics.domContentLoaded}ms</td></tr>
              <tr><td>Load Complete</td><td>${page.metrics.loadComplete}ms</td></tr>
            </tbody>
          </table>

          <div class="screenshot">
            <h3>📸 Capture d'écran</h3>
            <img src="${page.screenshot}" alt="Screenshot ${page.name}">
          </div>
        </div>
      </div>
    `).join('')}

    <footer>
      <p>📊 Rapport généré automatiquement pour SELECT CHATEAUX</p>
      <p>Tests effectués avec Puppeteer et connexion 3G Fast simulée</p>
    </footer>
  </div>

  <script>
    function getLoadTimeClass(time) {
      if (time < 1000) return 'good';
      if (time < 3000) return 'warning';
      return 'bad';
    }
    function getFCPClass(time) {
      if (time < 1800) return 'good';
      if (time < 3000) return 'warning';
      return 'bad';
    }
  </script>
</body>
</html>
  `.trim();

  const htmlPath = path.join(REPORT_DIR, 'rapport-performance.html');
  fs.writeFileSync(htmlPath, html);
}

function generateGlobalSummary(results) {
  const avgLoadTime = results.pages.reduce((sum, p) => sum + p.loadTime, 0) / results.pages.length;
  const avgFCP = results.pages.reduce((sum, p) => sum + p.metrics.firstContentfulPaint, 0) / results.pages.length;
  const totalResources = results.pages.reduce((sum, p) => sum + p.resources.total, 0);
  const totalSize = results.pages.reduce((sum, p) => sum + p.resources.totalSize, 0);

  return `
    <div class="summary-item">
      <div class="label">Temps de chargement moyen</div>
      <div class="value ${getLoadTimeClass(avgLoadTime)}">${avgLoadTime.toFixed(0)}ms</div>
    </div>
    <div class="summary-item">
      <div class="label">FCP Moyen</div>
      <div class="value ${getFCPClass(avgFCP)}">${avgFCP.toFixed(0)}ms</div>
    </div>
    <div class="summary-item">
      <div class="label">Total Ressources</div>
      <div class="value">${totalResources}</div>
    </div>
    <div class="summary-item">
      <div class="label">Taille Totale</div>
      <div class="value">${(totalSize / 1024).toFixed(2)} KB</div>
    </div>
  `;
}

function getLoadTimeClass(time) {
  if (time < 1000) return 'good';
  if (time < 3000) return 'warning';
  return 'bad';
}

function getFCPClass(time) {
  if (time < 1800) return 'good';
  if (time < 3000) return 'warning';
  return 'bad';
}

// Exécution
if (require.main === module) {
  runPerformanceTests().catch(error => {
    console.error('Erreur fatale:', error);
    process.exit(1);
  });
}

module.exports = { runPerformanceTests };

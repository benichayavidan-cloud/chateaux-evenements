#!/usr/bin/env node

/**
 * Script de test cross-browser pour SELECT CHATEAUX
 * Teste la compatibilité sur différents navigateurs et appareils
 */

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const REPORT_DIR = path.join(__dirname, '..', 'Rapport de tests');
const TEST_URL = process.env.TEST_URL || 'http://localhost:3000';

// Configurations de navigateurs/appareils à tester
const BROWSER_CONFIGS = [
  {
    name: 'Desktop Chrome (1920x1080)',
    viewport: { width: 1920, height: 1080 },
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    isMobile: false
  },
  {
    name: 'Desktop Firefox (1920x1080)',
    viewport: { width: 1920, height: 1080 },
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:121.0) Gecko/20100101 Firefox/121.0',
    isMobile: false
  },
  {
    name: 'Desktop Safari (1920x1080)',
    viewport: { width: 1920, height: 1080 },
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 14_2) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2 Safari/605.1.15',
    isMobile: false
  },
  {
    name: 'iPad Pro (1024x1366)',
    viewport: { width: 1024, height: 1366 },
    userAgent: 'Mozilla/5.0 (iPad; CPU OS 17_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2 Mobile/15E148 Safari/604.1',
    isMobile: true
  },
  {
    name: 'iPhone 14 Pro (393x852)',
    viewport: { width: 393, height: 852 },
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2 Mobile/15E148 Safari/604.1',
    isMobile: true
  },
  {
    name: 'Samsung Galaxy S23 (360x800)',
    viewport: { width: 360, height: 800 },
    userAgent: 'Mozilla/5.0 (Linux; Android 13; SM-S911B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36',
    isMobile: true
  }
];

// Pages à tester
const PAGES_TO_TEST = [
  { name: 'Accueil', path: '/' },
  { name: 'Châteaux', path: '/chateaux' },
  { name: 'Contact', path: '/contact' }
];

// Tests à effectuer
const TESTS = [
  {
    name: 'Navigation fonctionnelle',
    test: async (page) => {
      // Vérifier que les liens de navigation existent et sont visibles
      const navLinks = await page.$$('nav a, header a');
      return {
        success: navLinks.length > 0,
        details: `${navLinks.length} liens de navigation trouvés`
      };
    }
  },
  {
    name: 'Images chargées',
    test: async (page) => {
      const images = await page.$$eval('img', imgs =>
        imgs.map(img => ({
          src: img.src,
          loaded: img.complete && img.naturalHeight !== 0,
          alt: img.alt
        }))
      );
      const loadedCount = images.filter(img => img.loaded).length;
      const missingAlt = images.filter(img => !img.alt).length;

      return {
        success: loadedCount === images.length,
        details: `${loadedCount}/${images.length} images chargées, ${missingAlt} sans attribut alt`
      };
    }
  },
  {
    name: 'Formulaires accessibles',
    test: async (page) => {
      const forms = await page.$$('form');
      const inputs = await page.$$('input, textarea, select');
      const labels = await page.$$('label');

      return {
        success: forms.length > 0,
        details: `${forms.length} formulaire(s), ${inputs.length} champ(s), ${labels.length} label(s)`
      };
    }
  },
  {
    name: 'Responsive design',
    test: async (page, config) => {
      const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
      const viewportWidth = config.viewport.width;
      const hasHorizontalScroll = bodyWidth > viewportWidth + 20; // 20px de tolérance

      return {
        success: !hasHorizontalScroll,
        details: hasHorizontalScroll
          ? `⚠️ Scroll horizontal détecté (body: ${bodyWidth}px, viewport: ${viewportWidth}px)`
          : '✅ Pas de scroll horizontal'
      };
    }
  },
  {
    name: 'Aucune erreur console',
    test: async (page, config, consoleErrors) => {
      const errors = consoleErrors.filter(e => e.type === 'error');
      const warnings = consoleErrors.filter(e => e.type === 'warning');

      return {
        success: errors.length === 0,
        details: `${errors.length} erreur(s), ${warnings.length} warning(s)`
      };
    }
  },
  {
    name: 'Performance acceptable',
    test: async (page) => {
      const metrics = await page.evaluate(() => {
        const perfData = window.performance.timing;
        return {
          loadTime: perfData.loadEventEnd - perfData.navigationStart,
          domReady: perfData.domContentLoadedEventEnd - perfData.navigationStart
        };
      });

      const isGood = metrics.loadTime < 3000;

      return {
        success: isGood,
        details: `Load: ${metrics.loadTime}ms, DOM Ready: ${metrics.domReady}ms`
      };
    }
  }
];

async function testBrowserConfig(browser, config, page) {
  console.log(`\n🌐 Test: ${config.name}`);

  const results = {
    config: config.name,
    viewport: config.viewport,
    isMobile: config.isMobile,
    pages: []
  };

  for (const pageInfo of PAGES_TO_TEST) {
    console.log(`   📄 Page: ${pageInfo.name}...`);

    const newPage = await browser.newPage();

    // Configurer le viewport et user agent
    await newPage.setViewport({
      ...config.viewport,
      deviceScaleFactor: config.isMobile ? 2 : 1,
      isMobile: config.isMobile,
      hasTouch: config.isMobile
    });
    await newPage.setUserAgent(config.userAgent);

    // Capturer les erreurs console
    const consoleMessages = [];
    newPage.on('console', msg => {
      consoleMessages.push({
        type: msg.type(),
        text: msg.text()
      });
    });

    const url = `${TEST_URL}${pageInfo.path}`;

    try {
      await newPage.goto(url, {
        waitUntil: 'networkidle2',
        timeout: 30000
      });

      // Attendre un peu pour que tout se charge
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Exécuter les tests
      const testResults = [];
      for (const test of TESTS) {
        try {
          const result = await test.test(newPage, config, consoleMessages);
          testResults.push({
            name: test.name,
            ...result
          });

          const icon = result.success ? '✅' : '❌';
          console.log(`      ${icon} ${test.name}: ${result.details}`);
        } catch (error) {
          testResults.push({
            name: test.name,
            success: false,
            details: `Erreur: ${error.message}`
          });
          console.log(`      ❌ ${test.name}: Erreur`);
        }
      }

      // Capturer un screenshot
      const screenshotName = `${config.name.replace(/[^a-zA-Z0-9]/g, '-')}-${pageInfo.name.replace(/[^a-zA-Z0-9]/g, '-')}.png`;
      const screenshotPath = path.join(REPORT_DIR, screenshotName);
      await newPage.screenshot({
        path: screenshotPath,
        fullPage: true
      });

      results.pages.push({
        name: pageInfo.name,
        path: pageInfo.path,
        url: url,
        tests: testResults,
        screenshot: screenshotName,
        passed: testResults.filter(t => t.success).length,
        total: testResults.length
      });

    } catch (error) {
      console.log(`      ❌ Erreur de chargement: ${error.message}`);
      results.pages.push({
        name: pageInfo.name,
        path: pageInfo.path,
        url: url,
        error: error.message,
        tests: [],
        passed: 0,
        total: TESTS.length
      });
    }

    await newPage.close();
  }

  return results;
}

async function runCrossBrowserTests() {
  console.log('🌍 Démarrage des tests cross-browser...\n');
  console.log(`📍 URL testée: ${TEST_URL}\n`);

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const allResults = {
    testDate: new Date().toISOString(),
    testUrl: TEST_URL,
    browsers: []
  };

  try {
    for (const config of BROWSER_CONFIGS) {
      const result = await testBrowserConfig(browser, config);
      allResults.browsers.push(result);
    }

    // Générer le rapport
    generateReport(allResults);

    console.log('\n✅ Tests cross-browser terminés !');
    console.log(`📄 Rapport généré: ${path.join(REPORT_DIR, 'rapport-cross-browser.json')}`);
    console.log(`📊 Rapport HTML: ${path.join(REPORT_DIR, 'rapport-cross-browser.html')}`);

  } catch (error) {
    console.error('❌ Erreur lors des tests:', error);
    throw error;
  } finally {
    await browser.close();
  }
}

function generateReport(results) {
  // Sauvegarder le JSON
  const jsonPath = path.join(REPORT_DIR, 'rapport-cross-browser.json');
  fs.writeFileSync(jsonPath, JSON.stringify(results, null, 2));

  // Générer un rapport HTML
  const html = `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Rapport Cross-Browser - SELECT CHATEAUX</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: #f5f5f5;
      padding: 20px;
      line-height: 1.6;
    }
    .container {
      max-width: 1400px;
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
    .browser-section {
      margin-bottom: 40px;
      border: 1px solid #ecf0f1;
      border-radius: 8px;
      overflow: hidden;
    }
    .browser-header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 15px 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .browser-header h2 {
      font-size: 20px;
      margin: 0;
    }
    .browser-header .info {
      font-size: 14px;
      opacity: 0.9;
    }
    .page-result {
      border-bottom: 1px solid #ecf0f1;
    }
    .page-result:last-child {
      border-bottom: none;
    }
    .page-header {
      background: #f8f9fa;
      padding: 15px 20px;
      font-weight: 600;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .page-score {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .score-badge {
      background: #3498db;
      color: white;
      padding: 5px 12px;
      border-radius: 20px;
      font-size: 14px;
      font-weight: bold;
    }
    .score-badge.good { background: #27ae60; }
    .score-badge.warning { background: #f39c12; }
    .score-badge.bad { background: #e74c3c; }
    .tests-list {
      padding: 20px;
    }
    .test-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 0;
      border-bottom: 1px solid #ecf0f1;
    }
    .test-item:last-child {
      border-bottom: none;
    }
    .test-name {
      font-weight: 500;
      color: #2c3e50;
    }
    .test-result {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 14px;
      color: #7f8c8d;
    }
    .test-icon {
      font-size: 20px;
    }
    .screenshots {
      padding: 20px;
      background: #f8f9fa;
    }
    .screenshots h3 {
      margin-bottom: 15px;
      color: #2c3e50;
    }
    .screenshot-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 15px;
    }
    .screenshot-item img {
      width: 100%;
      border: 1px solid #ecf0f1;
      border-radius: 6px;
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
    <h1>🌍 Rapport Cross-Browser</h1>
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

    ${results.browsers.map(browser => `
      <div class="browser-section">
        <div class="browser-header">
          <h2>${browser.isMobile ? '📱' : '💻'} ${browser.config}</h2>
          <div class="info">${browser.viewport.width}x${browser.viewport.height}</div>
        </div>

        ${browser.pages.map(page => `
          <div class="page-result">
            <div class="page-header">
              <span>${page.name} - ${page.path}</span>
              <div class="page-score">
                <span class="score-badge ${getScoreClass(page.passed, page.total)}">${page.passed}/${page.total} tests réussis</span>
              </div>
            </div>

            ${page.error ? `
              <div class="tests-list">
                <div class="test-item">
                  <span class="test-name">❌ Erreur de chargement</span>
                  <span class="test-result">${page.error}</span>
                </div>
              </div>
            ` : `
              <div class="tests-list">
                ${page.tests.map(test => `
                  <div class="test-item">
                    <span class="test-name">${test.success ? '✅' : '❌'} ${test.name}</span>
                    <span class="test-result">${test.details}</span>
                  </div>
                `).join('')}
              </div>

              ${page.screenshot ? `
                <div class="screenshots">
                  <h3>📸 Capture d'écran</h3>
                  <div class="screenshot-item">
                    <img src="${page.screenshot}" alt="Screenshot ${browser.config} - ${page.name}" loading="lazy">
                  </div>
                </div>
              ` : ''}
            `}
          </div>
        `).join('')}
      </div>
    `).join('')}

    <footer>
      <p>🌍 Rapport généré automatiquement pour SELECT CHATEAUX</p>
      <p>Tests effectués avec Puppeteer sur ${results.browsers.length} configurations différentes</p>
    </footer>
  </div>
</body>
</html>
  `.trim();

  const htmlPath = path.join(REPORT_DIR, 'rapport-cross-browser.html');
  fs.writeFileSync(htmlPath, html);
}

function generateGlobalSummary(results) {
  let totalTests = 0;
  let totalPassed = 0;
  const browsers = results.browsers.length;
  const pages = results.browsers[0]?.pages.length || 0;

  results.browsers.forEach(browser => {
    browser.pages.forEach(page => {
      totalTests += page.total;
      totalPassed += page.passed;
    });
  });

  const passRate = totalTests > 0 ? Math.round((totalPassed / totalTests) * 100) : 0;

  return `
    <div class="summary-item">
      <div class="label">Navigateurs testés</div>
      <div class="value">${browsers}</div>
    </div>
    <div class="summary-item">
      <div class="label">Pages testées</div>
      <div class="value">${pages}</div>
    </div>
    <div class="summary-item">
      <div class="label">Tests réussis</div>
      <div class="value ${passRate >= 90 ? 'good' : passRate >= 70 ? 'warning' : 'bad'}">${totalPassed}/${totalTests}</div>
    </div>
    <div class="summary-item">
      <div class="label">Taux de réussite</div>
      <div class="value ${passRate >= 90 ? 'good' : passRate >= 70 ? 'warning' : 'bad'}">${passRate}%</div>
    </div>
  `;
}

function getScoreClass(passed, total) {
  const rate = (passed / total) * 100;
  if (rate >= 90) return 'good';
  if (rate >= 70) return 'warning';
  return 'bad';
}

// Exécution
if (require.main === module) {
  runCrossBrowserTests().catch(error => {
    console.error('Erreur fatale:', error);
    process.exit(1);
  });
}

module.exports = { runCrossBrowserTests };

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://selectchateaux.com';
const PAGES = ['/', '/chateaux', '/evenements', '/contact'];

async function auditSEO() {
  console.log('🔍 Audit SEO on-page en cours...\n');

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const allResults = [];

  for (const pagePath of PAGES) {
    const url = `${BASE_URL}${pagePath}`;
    console.log(`📄 Analyse SEO de ${url}...`);

    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });

    // Extraire les données SEO
    const seoData = await page.evaluate(() => {
      // Meta tags
      const getMetaContent = (name) => {
        const meta = document.querySelector(`meta[name="${name}"], meta[property="${name}"]`);
        return meta ? meta.getAttribute('content') : null;
      };

      // Headings
      const h1 = Array.from(document.querySelectorAll('h1')).map(h => h.textContent.trim());
      const h2 = Array.from(document.querySelectorAll('h2')).map(h => h.textContent.trim());
      const h3 = Array.from(document.querySelectorAll('h3')).map(h => h.textContent.trim());

      // Links
      const links = Array.from(document.querySelectorAll('a'));
      const internalLinks = links.filter(a => {
        const href = a.getAttribute('href');
        return href && (href.startsWith('/') || href.includes('selectchateaux.com'));
      });
      const externalLinks = links.filter(a => {
        const href = a.getAttribute('href');
        return href && !href.startsWith('/') && !href.includes('selectchateaux.com') && href.startsWith('http');
      });

      // Content
      const textContent = document.body.textContent.trim();
      const wordCount = textContent.split(/\s+/).length;

      // Canonical
      const canonical = document.querySelector('link[rel="canonical"]');

      return {
        title: document.title,
        titleLength: document.title.length,
        description: getMetaContent('description'),
        descriptionLength: getMetaContent('description')?.length || 0,
        keywords: getMetaContent('keywords'),
        ogTitle: getMetaContent('og:title'),
        ogDescription: getMetaContent('og:description'),
        ogImage: getMetaContent('og:image'),
        ogType: getMetaContent('og:type'),
        ogUrl: getMetaContent('og:url'),
        twitterCard: getMetaContent('twitter:card'),
        twitterTitle: getMetaContent('twitter:title'),
        twitterDescription: getMetaContent('twitter:description'),
        twitterImage: getMetaContent('twitter:image'),
        canonical: canonical ? canonical.getAttribute('href') : null,
        h1Count: h1.length,
        h1: h1,
        h2Count: h2.length,
        h2: h2.slice(0, 5),
        h3Count: h3.length,
        internalLinksCount: internalLinks.length,
        externalLinksCount: externalLinks.length,
        wordCount: wordCount,
        lang: document.documentElement.lang,
        viewport: getMetaContent('viewport'),
        robots: getMetaContent('robots')
      };
    });

    // Performance metrics
    const performanceMetrics = await page.evaluate(() => {
      const perf = performance.getEntriesByType('navigation')[0];
      return {
        loadTime: perf ? (perf.loadEventEnd - perf.fetchStart) / 1000 : 0,
        domContentLoaded: perf ? (perf.domContentLoadedEventEnd - perf.fetchStart) / 1000 : 0
      };
    });

    allResults.push({
      page: pagePath,
      url,
      seo: seoData,
      performance: performanceMetrics
    });

    await page.close();
  }

  await browser.close();

  // Analyser les résultats
  const analysis = analyzeResults(allResults);

  // Générer le rapport HTML
  generateHTMLReport(allResults, analysis);

  // Sauvegarder JSON
  const reportDir = path.join(__dirname, '../Rapport de tests');
  fs.writeFileSync(
    path.join(reportDir, 'audit-seo.json'),
    JSON.stringify({ results: allResults, analysis }, null, 2)
  );

  console.log('\n✅ Audit SEO terminé!');
  console.log(`📊 Score global: ${analysis.globalScore}/100`);
}

function analyzeResults(results) {
  let issues = [];
  let warnings = [];
  let successes = [];
  let score = 100;

  results.forEach(result => {
    const { page, seo } = result;
    const pageName = page === '/' ? 'Accueil' : page.slice(1);

    // Title
    if (!seo.title) {
      issues.push(`${pageName}: Aucun title`);
      score -= 10;
    } else if (seo.titleLength < 30 || seo.titleLength > 60) {
      warnings.push(`${pageName}: Title ${seo.titleLength} caractères (optimal: 30-60)`);
      score -= 3;
    } else {
      successes.push(`${pageName}: Title optimal (${seo.titleLength} caractères)`);
    }

    // Description
    if (!seo.description) {
      issues.push(`${pageName}: Aucune meta description`);
      score -= 10;
    } else if (seo.descriptionLength < 120 || seo.descriptionLength > 160) {
      warnings.push(`${pageName}: Description ${seo.descriptionLength} caractères (optimal: 120-160)`);
      score -= 3;
    } else {
      successes.push(`${pageName}: Description optimale (${seo.descriptionLength} caractères)`);
    }

    // H1
    if (seo.h1Count === 0) {
      issues.push(`${pageName}: Aucun H1`);
      score -= 10;
    } else if (seo.h1Count > 1) {
      warnings.push(`${pageName}: ${seo.h1Count} H1 (recommandé: 1)`);
      score -= 3;
    } else {
      successes.push(`${pageName}: 1 H1 unique`);
    }

    // Open Graph
    if (!seo.ogTitle || !seo.ogDescription || !seo.ogImage) {
      warnings.push(`${pageName}: Open Graph incomplet`);
      score -= 2;
    } else {
      successes.push(`${pageName}: Open Graph complet`);
    }

    // Content
    if (seo.wordCount < 300) {
      warnings.push(`${pageName}: Contenu léger (${seo.wordCount} mots)`);
      score -= 2;
    } else {
      successes.push(`${pageName}: Contenu suffisant (${seo.wordCount} mots)`);
    }

    // Lang attribute
    if (!seo.lang || seo.lang === '') {
      warnings.push(`${pageName}: Attribut lang manquant`);
      score -= 2;
    }

    // Canonical
    if (!seo.canonical) {
      warnings.push(`${pageName}: Canonical manquant`);
      score -= 2;
    }
  });

  return {
    globalScore: Math.max(0, score),
    issues,
    warnings,
    successes
  };
}

function generateHTMLReport(results, analysis) {
  const color = analysis.globalScore >= 80 ? '#27ae60' : analysis.globalScore >= 60 ? '#f39c12' : '#e74c3c';

  const html = `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Audit SEO - SELECT CHATEAUX</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: linear-gradient(135deg, ${color} 0%, ${color}dd 100%);
      min-height: 100vh;
      padding: 40px 20px;
    }
    .container { max-width: 1400px; margin: 0 auto; }
    header {
      background: white;
      border-radius: 12px;
      padding: 40px;
      margin-bottom: 30px;
      text-align: center;
      box-shadow: 0 10px 30px rgba(0,0,0,0.15);
    }
    h1 { font-size: 42px; color: #2c3e50; margin-bottom: 10px; }
    .score {
      font-size: 72px;
      font-weight: bold;
      color: ${color};
      margin: 20px 0;
    }
    .alert {
      padding: 20px;
      border-radius: 8px;
      margin: 20px 0;
    }
    .alert-danger {
      background: #f8d7da;
      border-left: 4px solid #dc3545;
      color: #721c24;
    }
    .alert-warning {
      background: #fff3cd;
      border-left: 4px solid #ffc107;
      color: #856404;
    }
    .alert-success {
      background: #d4edda;
      border-left: 4px solid #28a745;
      color: #155724;
    }
    .alert h3 {
      margin-bottom: 15px;
      font-size: 18px;
    }
    .alert ul {
      margin-left: 20px;
    }
    .alert li {
      margin: 8px 0;
    }
    .page-section {
      background: white;
      border-radius: 12px;
      padding: 30px;
      margin: 20px 0;
      box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    }
    .page-title {
      font-size: 24px;
      color: #2c3e50;
      margin-bottom: 20px;
      padding-bottom: 15px;
      border-bottom: 3px solid ${color};
    }
    .seo-item {
      margin: 20px 0;
      padding: 15px;
      background: #f8f9fa;
      border-radius: 8px;
    }
    .seo-item h4 {
      color: #2c3e50;
      margin-bottom: 10px;
      font-size: 16px;
    }
    .seo-item p {
      color: #555;
      line-height: 1.6;
    }
    .badge {
      padding: 5px 12px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: bold;
      margin-left: 10px;
    }
    .badge-success { background: #d4edda; color: #155724; }
    .badge-danger { background: #f8d7da; color: #721c24; }
    .badge-warning { background: #fff3cd; color: #856404; }
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 15px;
      margin: 20px 0;
    }
    .stat-card {
      background: #f8f9fa;
      padding: 20px;
      border-radius: 8px;
      text-align: center;
    }
    .stat-value {
      font-size: 32px;
      font-weight: bold;
      color: ${color};
    }
    .stat-label {
      font-size: 13px;
      color: #7f8c8d;
      margin-top: 5px;
    }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <h1>🔍 Audit SEO On-Page</h1>
      <p style="font-size: 18px; color: #7f8c8d; margin: 10px 0;">SELECT CHATEAUX</p>
      <div class="score">${analysis.globalScore}/100</div>
      <p style="color: #7f8c8d;">Score d'optimisation SEO</p>
    </header>

    ${analysis.issues.length > 0 ? `
    <div class="alert alert-danger">
      <h3>❌ Problèmes Critiques (${analysis.issues.length})</h3>
      <ul>
        ${analysis.issues.map(issue => `<li>${issue}</li>`).join('')}
      </ul>
    </div>` : ''}

    ${analysis.warnings.length > 0 ? `
    <div class="alert alert-warning">
      <h3>⚠️ Avertissements (${analysis.warnings.length})</h3>
      <ul>
        ${analysis.warnings.map(warning => `<li>${warning}</li>`).join('')}
      </ul>
    </div>` : ''}

    ${analysis.successes.length > 0 ? `
    <div class="alert alert-success">
      <h3>✅ Points Forts (${analysis.successes.length})</h3>
      <ul>
        ${analysis.successes.map(success => `<li>${success}</li>`).join('')}
      </ul>
    </div>` : ''}

    ${results.map(result => {
      const { page, seo, performance } = result;
      const pageName = page === '/' ? 'Accueil' : page.slice(1);

      return `
      <div class="page-section">
        <h2 class="page-title">${pageName}</h2>

        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-value">${seo.titleLength}</div>
            <div class="stat-label">Caractères Title</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">${seo.descriptionLength}</div>
            <div class="stat-label">Caractères Description</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">${seo.h1Count}</div>
            <div class="stat-label">H1</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">${seo.wordCount}</div>
            <div class="stat-label">Mots</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">${seo.internalLinksCount}</div>
            <div class="stat-label">Liens Internes</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">${performance.loadTime.toFixed(2)}s</div>
            <div class="stat-label">Temps Chargement</div>
          </div>
        </div>

        <div class="seo-item">
          <h4>📋 Title
            ${seo.titleLength >= 30 && seo.titleLength <= 60
              ? '<span class="badge badge-success">✓ Optimal</span>'
              : '<span class="badge badge-warning">⚠ À optimiser</span>'
            }
          </h4>
          <p>${seo.title || '<em>Aucun title</em>'}</p>
          <p style="font-size: 12px; color: #7f8c8d; margin-top: 5px;">${seo.titleLength} caractères (optimal: 30-60)</p>
        </div>

        <div class="seo-item">
          <h4>📝 Meta Description
            ${seo.descriptionLength >= 120 && seo.descriptionLength <= 160
              ? '<span class="badge badge-success">✓ Optimal</span>'
              : '<span class="badge badge-warning">⚠ À optimiser</span>'
            }
          </h4>
          <p>${seo.description || '<em>Aucune description</em>'}</p>
          <p style="font-size: 12px; color: #7f8c8d; margin-top: 5px;">${seo.descriptionLength} caractères (optimal: 120-160)</p>
        </div>

        <div class="seo-item">
          <h4>🏷️ H1 Heading
            ${seo.h1Count === 1
              ? '<span class="badge badge-success">✓ Parfait</span>'
              : seo.h1Count === 0
                ? '<span class="badge badge-danger">✗ Manquant</span>'
                : '<span class="badge badge-warning">⚠ Multiple</span>'
            }
          </h4>
          ${seo.h1.length > 0
            ? seo.h1.map(h => `<p>• ${h}</p>`).join('')
            : '<p><em>Aucun H1</em></p>'
          }
        </div>

        ${seo.h2Count > 0 ? `
        <div class="seo-item">
          <h4>📑 H2 Headings (${seo.h2Count})</h4>
          ${seo.h2.map(h => `<p>• ${h}</p>`).join('')}
          ${seo.h2Count > 5 ? `<p style="font-size: 12px; color: #7f8c8d; margin-top: 10px;">+ ${seo.h2Count - 5} autres H2...</p>` : ''}
        </div>` : ''}

        <div class="seo-item">
          <h4>🌍 Open Graph
            ${seo.ogTitle && seo.ogDescription && seo.ogImage
              ? '<span class="badge badge-success">✓ Complet</span>'
              : '<span class="badge badge-warning">⚠ Incomplet</span>'
            }
          </h4>
          <p><strong>og:title:</strong> ${seo.ogTitle || '<em>Manquant</em>'}</p>
          <p><strong>og:description:</strong> ${seo.ogDescription || '<em>Manquant</em>'}</p>
          <p><strong>og:image:</strong> ${seo.ogImage || '<em>Manquant</em>'}</p>
          <p><strong>og:type:</strong> ${seo.ogType || '<em>Manquant</em>'}</p>
        </div>

        <div class="seo-item">
          <h4>🐦 Twitter Card
            ${seo.twitterCard
              ? '<span class="badge badge-success">✓ Présent</span>'
              : '<span class="badge badge-warning">⚠ Absent</span>'
            }
          </h4>
          <p><strong>twitter:card:</strong> ${seo.twitterCard || '<em>Manquant</em>'}</p>
          <p><strong>twitter:title:</strong> ${seo.twitterTitle || '<em>Manquant</em>'}</p>
          <p><strong>twitter:description:</strong> ${seo.twitterDescription || '<em>Manquant</em>'}</p>
        </div>

        <div class="seo-item">
          <h4>🔗 Canonical URL
            ${seo.canonical
              ? '<span class="badge badge-success">✓ Défini</span>'
              : '<span class="badge badge-warning">⚠ Manquant</span>'
            }
          </h4>
          <p>${seo.canonical || '<em>Aucun canonical</em>'}</p>
        </div>

        <div class="seo-item">
          <h4>🌐 Attributs Techniques</h4>
          <p><strong>Lang:</strong> ${seo.lang || '<em>Non défini</em>'}</p>
          <p><strong>Viewport:</strong> ${seo.viewport || '<em>Non défini</em>'}</p>
          <p><strong>Robots:</strong> ${seo.robots || 'index, follow (par défaut)'}</p>
        </div>
      </div>
    `}).join('')}

    <footer style="text-align: center; color: white; margin-top: 40px; padding: 20px;">
      <p>📅 ${new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
      <p style="margin-top: 10px;">🌐 https://selectchateaux.com</p>
    </footer>
  </div>
</body>
</html>`;

  const reportDir = path.join(__dirname, '../Rapport de tests');
  fs.writeFileSync(path.join(reportDir, 'audit-seo.html'), html);
}

auditSEO().catch(console.error);

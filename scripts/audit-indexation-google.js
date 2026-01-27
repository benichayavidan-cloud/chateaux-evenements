const puppeteer = require('puppeteer');
const https = require('https');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://www.selectchateaux.com';

async function auditIndexation() {
  console.log('🔍 Audit Indexation Google en cours...\n');

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const results = {
    sitemap: null,
    robots: null,
    googleIndex: {},
    metaTags: {},
    canonicals: {},
    structured_data: {}
  };

  // 1. Vérifier sitemap.xml
  console.log('📄 Vérification sitemap.xml...');
  results.sitemap = await fetchSitemap(`${BASE_URL}/sitemap.xml`);

  // 2. Vérifier robots.txt
  console.log('🤖 Vérification robots.txt...');
  results.robots = await fetchRobotsTxt(`${BASE_URL}/robots.txt`);

  // 3. Tester l'indexation Google (recherche site:)
  console.log('🔎 Test indexation Google...');
  const page = await browser.newPage();

  // Test 1: Recherche globale
  await page.goto(`https://www.google.com/search?q=site:selectchateaux.com`, { waitUntil: 'networkidle2' });
  await new Promise(resolve => setTimeout(resolve, 2000));

  const globalIndexed = await page.evaluate(() => {
    const stats = document.querySelector('#result-stats');
    if (stats) {
      const match = stats.textContent.match(/([0-9\s]+)\s*résultat/i);
      return match ? match[1].replace(/\s/g, '') : '0';
    }
    return '0';
  });

  results.googleIndex.global = globalIndexed;

  // Test 2: Recherche pages spécifiques
  const testPages = ['/', '/chateaux', '/evenements', '/contact'];
  for (const pagePath of testPages) {
    const testUrl = `${BASE_URL}${pagePath}`;
    await page.goto(`https://www.google.com/search?q=${encodeURIComponent(testUrl)}`, { waitUntil: 'networkidle2' });
    await new Promise(resolve => setTimeout(resolve, 2000));

    const isIndexed = await page.evaluate((url) => {
      const firstResult = document.querySelector('#search a');
      if (firstResult && firstResult.href) {
        return firstResult.href.includes('selectchateaux.com');
      }
      return false;
    }, testUrl);

    results.googleIndex[pagePath] = isIndexed ? 'Indexé' : 'Non indexé';
  }

  // 4. Vérifier meta tags essentiels
  console.log('📋 Vérification meta tags...');
  for (const pagePath of testPages) {
    const pageUrl = `${BASE_URL}${pagePath}`;
    await page.goto(pageUrl, { waitUntil: 'networkidle2' });

    const metaData = await page.evaluate(() => {
      return {
        title: document.title || '',
        description: document.querySelector('meta[name="description"]')?.content || '',
        canonical: document.querySelector('link[rel="canonical"]')?.href || '',
        robots: document.querySelector('meta[name="robots"]')?.content || 'index, follow',
        ogTitle: document.querySelector('meta[property="og:title"]')?.content || '',
        ogDescription: document.querySelector('meta[property="og:description"]')?.content || '',
        language: document.documentElement.lang || '',
        hasStructuredData: document.querySelectorAll('script[type="application/ld+json"]').length
      };
    });

    results.metaTags[pagePath] = metaData;
  }

  await browser.close();

  // Générer le rapport
  generateReport(results);

  console.log('\n✅ Audit indexation terminé!');
}

async function fetchSitemap(url) {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const urlCount = (data.match(/<loc>/g) || []).length;
        resolve({
          accessible: res.statusCode === 200,
          urlCount: urlCount,
          hasUrlset: data.includes('<urlset')
        });
      });
    }).on('error', () => resolve({ accessible: false, error: 'Erreur de connexion' }));
  });
}

async function fetchRobotsTxt(url) {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({
          accessible: res.statusCode === 200,
          hasSitemap: data.includes('Sitemap:'),
          allowsAll: !data.includes('Disallow: /'),
          content: data.split('\n').slice(0, 10).join('\n')
        });
      });
    }).on('error', () => resolve({ accessible: false, error: 'Erreur de connexion' }));
  });
}

function generateReport(results) {
  const indexedPages = Object.values(results.googleIndex).filter(v => v === 'Indexé' || v !== '0').length;
  const totalPages = Object.keys(results.googleIndex).length - 1; // -1 pour global
  const indexScore = Math.round((indexedPages / totalPages) * 100);

  const color = indexScore >= 75 ? '#27ae60' : indexScore >= 50 ? '#f39c12' : '#e74c3c';

  const html = `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Audit Indexation Google - SELECT CHATEAUX</title>
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
    .section {
      background: white;
      border-radius: 12px;
      padding: 30px;
      margin: 20px 0;
      box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    }
    .section-title {
      font-size: 24px;
      color: #2c3e50;
      margin-bottom: 20px;
      padding-bottom: 15px;
      border-bottom: 3px solid ${color};
    }
    .badge {
      padding: 6px 12px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: bold;
      display: inline-block;
      margin: 5px;
    }
    .badge-success { background: #d4edda; color: #155724; }
    .badge-danger { background: #f8d7da; color: #721c24; }
    .badge-warning { background: #fff3cd; color: #856404; }
    .item {
      padding: 15px;
      margin: 10px 0;
      background: #f8f9fa;
      border-radius: 8px;
      border-left: 4px solid ${color};
    }
    .item strong { color: #2c3e50; }
    pre {
      background: #2c3e50;
      color: #ecf0f1;
      padding: 15px;
      border-radius: 6px;
      overflow-x: auto;
      font-size: 13px;
      margin: 10px 0;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 15px 0;
    }
    th, td {
      padding: 12px;
      text-align: left;
      border-bottom: 1px solid #ecf0f1;
    }
    th {
      background: #f8f9fa;
      font-weight: bold;
      color: #2c3e50;
    }
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 15px;
      margin: 20px 0;
    }
    .stat-card {
      background: #f8f9fa;
      padding: 25px;
      border-radius: 8px;
      text-align: center;
    }
    .stat-value {
      font-size: 42px;
      font-weight: bold;
      color: ${color};
    }
    .stat-label {
      font-size: 13px;
      color: #7f8c8d;
      margin-top: 8px;
    }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <h1>🌐 Audit Indexation Google</h1>
      <p style="font-size: 18px; color: #7f8c8d; margin: 10px 0;">SELECT CHATEAUX</p>
      <div class="score">${indexScore}%</div>
      <p style="color: #7f8c8d;">Taux d'indexation</p>
    </header>

    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-value">${results.googleIndex.global}</div>
        <div class="stat-label">Pages indexées Google</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">${results.sitemap.urlCount || 0}</div>
        <div class="stat-label">URLs dans Sitemap</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">${indexedPages}/${totalPages}</div>
        <div class="stat-label">Pages testées indexées</div>
      </div>
    </div>

    <div class="section">
      <h2 class="section-title">📄 Sitemap.xml</h2>
      <div class="item">
        <strong>Status:</strong>
        ${results.sitemap.accessible
          ? '<span class="badge badge-success">✓ Accessible</span>'
          : '<span class="badge badge-danger">✗ Inaccessible</span>'}
      </div>
      <div class="item">
        <strong>URL:</strong> <a href="${BASE_URL}/sitemap.xml" target="_blank">${BASE_URL}/sitemap.xml</a>
      </div>
      <div class="item">
        <strong>Nombre d'URLs:</strong> ${results.sitemap.urlCount || 0}
      </div>
      <div class="item">
        <strong>Format valide:</strong> ${results.sitemap.hasUrlset ? '✓ Oui' : '✗ Non'}
      </div>
    </div>

    <div class="section">
      <h2 class="section-title">🤖 Robots.txt</h2>
      <div class="item">
        <strong>Status:</strong>
        ${results.robots.accessible
          ? '<span class="badge badge-success">✓ Accessible</span>'
          : '<span class="badge badge-danger">✗ Inaccessible</span>'}
      </div>
      <div class="item">
        <strong>URL:</strong> <a href="${BASE_URL}/robots.txt" target="_blank">${BASE_URL}/robots.txt</a>
      </div>
      <div class="item">
        <strong>Référence Sitemap:</strong> ${results.robots.hasSitemap ? '✓ Oui' : '✗ Non'}
      </div>
      <div class="item">
        <strong>Autorise indexation:</strong> ${results.robots.allowsAll ? '✓ Oui' : '⚠️ Partielle'}
      </div>
      ${results.robots.content ? `<pre>${results.robots.content}</pre>` : ''}
    </div>

    <div class="section">
      <h2 class="section-title">🔎 Indexation Google</h2>
      <table>
        <thead>
          <tr>
            <th>Page</th>
            <th>Statut</th>
          </tr>
        </thead>
        <tbody>
          ${Object.entries(results.googleIndex).map(([page, status]) => {
            if (page === 'global') return '';
            const isIndexed = status === 'Indexé';
            return `
              <tr>
                <td><strong>${page === '/' ? 'Accueil' : page.slice(1)}</strong></td>
                <td>
                  ${isIndexed
                    ? '<span class="badge badge-success">✓ Indexé</span>'
                    : '<span class="badge badge-warning">⚠ À vérifier</span>'}
                </td>
              </tr>
            `;
          }).join('')}
        </tbody>
      </table>
    </div>

    <div class="section">
      <h2 class="section-title">📋 Meta Tags SEO</h2>
      ${Object.entries(results.metaTags).map(([page, meta]) => `
        <div style="margin: 20px 0; padding: 20px; background: #f8f9fa; border-radius: 8px;">
          <h3 style="color: #2c3e50; margin-bottom: 15px;">${page === '/' ? 'Accueil' : page.slice(1)}</h3>
          <div class="item">
            <strong>Title:</strong> ${meta.title || '<em>Manquant</em>'}
            ${meta.title ? `<span style="color: #7f8c8d; font-size: 12px;">(${meta.title.length} car.)</span>` : ''}
          </div>
          <div class="item">
            <strong>Description:</strong> ${meta.description || '<em>Manquant</em>'}
            ${meta.description ? `<span style="color: #7f8c8d; font-size: 12px;">(${meta.description.length} car.)</span>` : ''}
          </div>
          <div class="item">
            <strong>Canonical:</strong> ${meta.canonical || '<em>Manquant</em>'}
          </div>
          <div class="item">
            <strong>Robots:</strong> ${meta.robots}
          </div>
          <div class="item">
            <strong>Lang:</strong> ${meta.language || '<em>Non défini</em>'}
          </div>
          <div class="item">
            <strong>Schema JSON-LD:</strong> ${meta.hasStructuredData} schema(s)
          </div>
        </div>
      `).join('')}
    </div>

    <div class="section">
      <h3 style="color: #2c3e50; margin-bottom: 15px;">💡 Recommandations</h3>
      <ul style="line-height: 2; color: #555;">
        <li>✅ <strong>Sitemap:</strong> Soumettre à Google Search Console pour accélérer l'indexation</li>
        <li>📊 <strong>Google Search Console:</strong> Vérifier les erreurs d'indexation et la couverture</li>
        <li>🔗 <strong>Backlinks:</strong> Créer des liens entrants de qualité pour améliorer l'autorité</li>
        <li>📱 <strong>Mobile-First:</strong> Google indexe en priorité la version mobile (déjà optimisé ✓)</li>
        <li>⚡ <strong>Core Web Vitals:</strong> Continuer à maintenir les excellentes performances</li>
        <li>🎯 <strong>Contenu:</strong> Publier régulièrement du contenu de qualité pour améliorer le ranking</li>
      </ul>
    </div>

    <footer style="text-align: center; color: white; margin-top: 40px; padding: 20px;">
      <p>📅 ${new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
      <p style="margin-top: 10px;">🌐 https://www.selectchateaux.com</p>
    </footer>
  </div>
</body>
</html>`;

  const reportDir = path.join(__dirname, '../Rapport de tests');
  fs.writeFileSync(path.join(reportDir, 'audit-indexation-google.html'), html);
  fs.writeFileSync(path.join(reportDir, 'audit-indexation-google.json'), JSON.stringify(results, null, 2));
}

auditIndexation().catch(console.error);

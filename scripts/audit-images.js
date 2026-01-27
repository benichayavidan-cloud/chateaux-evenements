const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://selectchateaux.com';
const PAGES = ['/', '/chateaux', '/evenements', '/contact'];

async function auditImages() {
  console.log('🔍 Audit des images en cours...\n');

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const allResults = [];

  for (const pagePath of PAGES) {
    const url = `${BASE_URL}${pagePath}`;
    console.log(`📄 Analyse de ${url}...`);

    const page = await browser.newPage();

    const imageStats = [];

    page.on('response', async (response) => {
      const url = response.url();
      const contentType = response.headers()['content-type'];

      if (contentType && contentType.startsWith('image/')) {
        const status = response.status();
        const buffer = await response.buffer().catch(() => null);
        const size = buffer ? buffer.length : 0;

        imageStats.push({
          url,
          contentType,
          status,
          sizeBytes: size,
          sizeKB: (size / 1024).toFixed(2)
        });
      }
    });

    await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });

    // Extraire les images du DOM
    const imagesData = await page.evaluate(() => {
      const images = Array.from(document.querySelectorAll('img'));
      return images.map(img => ({
        src: img.src,
        alt: img.alt || '',
        width: img.naturalWidth,
        height: img.naturalHeight,
        displayWidth: img.width,
        displayHeight: img.height,
        loading: img.loading || 'eager',
        hasAlt: !!img.alt,
        isDecorative: img.alt === '',
        className: img.className
      }));
    });

    const pageResult = {
      page: pagePath,
      url,
      totalImages: imagesData.length,
      imagesWithAlt: imagesData.filter(img => img.hasAlt).length,
      imagesWithoutAlt: imagesData.filter(img => !img.hasAlt).length,
      lazyLoadedImages: imagesData.filter(img => img.loading === 'lazy').length,
      totalWeight: imageStats.reduce((sum, img) => sum + img.sizeBytes, 0),
      images: imagesData,
      imageStats: imageStats
    };

    allResults.push(pageResult);
    await page.close();
  }

  await browser.close();

  // Calculer les statistiques globales
  const globalStats = {
    totalPages: PAGES.length,
    totalImages: allResults.reduce((sum, r) => sum + r.totalImages, 0),
    totalImagesWithAlt: allResults.reduce((sum, r) => sum + r.imagesWithAlt, 0),
    totalImagesWithoutAlt: allResults.reduce((sum, r) => sum + r.imagesWithoutAlt, 0),
    totalLazyLoaded: allResults.reduce((sum, r) => sum + r.lazyLoadedImages, 0),
    totalWeight: allResults.reduce((sum, r) => sum + r.totalWeight, 0),
    results: allResults
  };

  // Générer le rapport HTML
  generateHTMLReport(globalStats);

  // Sauvegarder JSON
  const reportDir = path.join(__dirname, '../Rapport de tests');
  fs.writeFileSync(
    path.join(reportDir, 'audit-images.json'),
    JSON.stringify(globalStats, null, 2)
  );

  console.log('\n✅ Audit des images terminé!');
  console.log(`📊 ${globalStats.totalImages} images analysées`);
  console.log(`✅ ${globalStats.totalImagesWithAlt} images avec alt text`);
  console.log(`❌ ${globalStats.totalImagesWithoutAlt} images sans alt text`);
  console.log(`🚀 ${globalStats.totalLazyLoaded} images en lazy loading`);
  console.log(`📦 Poids total: ${(globalStats.totalWeight / 1024 / 1024).toFixed(2)} MB`);
}

function generateHTMLReport(stats) {
  const altTextScore = (stats.totalImagesWithAlt / stats.totalImages * 100).toFixed(1);
  const lazyLoadScore = (stats.totalLazyLoaded / stats.totalImages * 100).toFixed(1);
  const avgWeightPerImage = (stats.totalWeight / stats.totalImages / 1024).toFixed(1);

  let scoreGlobal = 0;
  if (altTextScore >= 90) scoreGlobal += 40;
  else if (altTextScore >= 70) scoreGlobal += 30;
  else if (altTextScore >= 50) scoreGlobal += 20;
  else scoreGlobal += 10;

  if (lazyLoadScore >= 80) scoreGlobal += 30;
  else if (lazyLoadScore >= 60) scoreGlobal += 20;
  else if (lazyLoadScore >= 40) scoreGlobal += 10;

  if (avgWeightPerImage < 100) scoreGlobal += 30;
  else if (avgWeightPerImage < 200) scoreGlobal += 20;
  else if (avgWeightPerImage < 300) scoreGlobal += 10;

  const color = scoreGlobal >= 80 ? '#27ae60' : scoreGlobal >= 60 ? '#f39c12' : '#e74c3c';

  const html = `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Audit Images - SELECT CHATEAUX</title>
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
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
      margin: 30px 0;
    }
    .stat-card {
      background: white;
      border-radius: 12px;
      padding: 30px;
      text-align: center;
      box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    }
    .stat-value {
      font-size: 48px;
      font-weight: bold;
      color: ${color};
      margin-bottom: 10px;
    }
    .stat-label {
      font-size: 14px;
      color: #7f8c8d;
      text-transform: uppercase;
      letter-spacing: 1px;
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
    .images-table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 20px;
    }
    .images-table th,
    .images-table td {
      padding: 12px;
      text-align: left;
      border-bottom: 1px solid #ecf0f1;
    }
    .images-table th {
      background: #f8f9fa;
      font-weight: bold;
      color: #2c3e50;
    }
    .badge {
      padding: 5px 12px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: bold;
    }
    .badge-success { background: #d4edda; color: #155724; }
    .badge-danger { background: #f8d7da; color: #721c24; }
    .badge-warning { background: #fff3cd; color: #856404; }
    .recommendations {
      background: #fff3cd;
      border-left: 4px solid #ffc107;
      padding: 20px;
      border-radius: 8px;
      margin: 20px 0;
    }
    .recommendations h3 {
      color: #856404;
      margin-bottom: 15px;
    }
    .recommendations ul {
      margin-left: 20px;
    }
    .recommendations li {
      margin: 10px 0;
      color: #856404;
    }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <h1>🖼️ Audit des Images</h1>
      <p style="font-size: 18px; color: #7f8c8d; margin: 10px 0;">SELECT CHATEAUX</p>
      <div class="score">${scoreGlobal}/100</div>
      <p style="color: #7f8c8d;">Score d'optimisation des images</p>
    </header>

    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-value">${stats.totalImages}</div>
        <div class="stat-label">Images totales</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">${altTextScore}%</div>
        <div class="stat-label">Avec Alt Text</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">${lazyLoadScore}%</div>
        <div class="stat-label">Lazy Loading</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">${(stats.totalWeight / 1024 / 1024).toFixed(1)} MB</div>
        <div class="stat-label">Poids Total</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">${avgWeightPerImage} KB</div>
        <div class="stat-label">Poids Moyen</div>
      </div>
    </div>

    ${stats.totalImagesWithoutAlt > 0 ? `
    <div class="recommendations">
      <h3>⚠️ Recommandations Accessibilité</h3>
      <ul>
        <li><strong>${stats.totalImagesWithoutAlt} images sans alt text</strong> - Ajouter des descriptions pour l'accessibilité et le SEO</li>
        <li>Les images décoratives doivent avoir alt="" (vide)</li>
        <li>Les images informatives doivent avoir une description claire</li>
      </ul>
    </div>` : ''}

    ${avgWeightPerImage > 150 ? `
    <div class="recommendations">
      <h3>📦 Recommandations Compression</h3>
      <ul>
        <li>Poids moyen élevé (${avgWeightPerImage} KB) - Compresser les images</li>
        <li>Utiliser des formats modernes (WebP, AVIF)</li>
        <li>Optimiser avec TinyPNG ou ImageOptim</li>
        <li>Utiliser Next.js Image avec quality={80}</li>
      </ul>
    </div>` : ''}

    ${stats.results.map(pageResult => `
      <div class="page-section">
        <h2 class="page-title">${pageResult.page === '/' ? 'Accueil' : pageResult.page.slice(1)}</h2>

        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-value" style="font-size: 36px;">${pageResult.totalImages}</div>
            <div class="stat-label">Images</div>
          </div>
          <div class="stat-card">
            <div class="stat-value" style="font-size: 36px; color: #27ae60;">${pageResult.imagesWithAlt}</div>
            <div class="stat-label">Avec Alt</div>
          </div>
          <div class="stat-card">
            <div class="stat-value" style="font-size: 36px; color: #e74c3c;">${pageResult.imagesWithoutAlt}</div>
            <div class="stat-label">Sans Alt</div>
          </div>
          <div class="stat-card">
            <div class="stat-value" style="font-size: 36px;">${(pageResult.totalWeight / 1024 / 1024).toFixed(2)} MB</div>
            <div class="stat-label">Poids Page</div>
          </div>
        </div>

        <table class="images-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Dimensions</th>
              <th>Alt Text</th>
              <th>Lazy Load</th>
              <th>Poids</th>
            </tr>
          </thead>
          <tbody>
            ${pageResult.images.map((img, i) => {
              const stat = pageResult.imageStats.find(s => s.url === img.src) || {};
              return `
              <tr>
                <td style="max-width: 300px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" title="${img.src}">
                  ${img.src.split('/').pop() || 'image'}
                </td>
                <td>${img.width}×${img.height}</td>
                <td>
                  ${img.hasAlt
                    ? `<span class="badge badge-success">✓ ${img.alt.substring(0, 30)}${img.alt.length > 30 ? '...' : ''}</span>`
                    : `<span class="badge badge-danger">✗ Manquant</span>`
                  }
                </td>
                <td>
                  ${img.loading === 'lazy'
                    ? `<span class="badge badge-success">✓ Lazy</span>`
                    : `<span class="badge badge-warning">Eager</span>`
                  }
                </td>
                <td>${stat.sizeKB ? stat.sizeKB + ' KB' : 'N/A'}</td>
              </tr>
            `}).join('')}
          </tbody>
        </table>
      </div>
    `).join('')}

    <footer style="text-align: center; color: white; margin-top: 40px; padding: 20px;">
      <p>📅 ${new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
      <p style="margin-top: 10px;">🌐 https://selectchateaux.com</p>
    </footer>
  </div>
</body>
</html>`;

  const reportDir = path.join(__dirname, '../Rapport de tests');
  fs.writeFileSync(path.join(reportDir, 'audit-images.html'), html);
}

auditImages().catch(console.error);

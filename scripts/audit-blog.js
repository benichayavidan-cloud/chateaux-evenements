const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://www.selectchateaux.com';

async function auditBlog() {
  console.log('📝 Audit Blog en cours...\n');

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const results = {
    blogIndex: null,
    articles: [],
    performance: {},
    seo: {},
    readability: {}
  };

  const page = await browser.newPage();

  // 1. Auditer la page index du blog
  console.log('📄 Analyse page /blog...');
  await page.goto(`${BASE_URL}/blog`, { waitUntil: 'networkidle2', timeout: 60000 });

  const perfBlog = await page.evaluate(() => {
    const perf = performance.getEntriesByType('navigation')[0];
    return {
      loadTime: perf ? (perf.loadEventEnd - perf.fetchStart) / 1000 : 0,
      domContentLoaded: perf ? (perf.domContentLoadedEventEnd - perf.fetchStart) / 1000 : 0,
      fcp: 0
    };
  });

  const seoBlog = await page.evaluate(() => {
    return {
      title: document.title,
      titleLength: document.title.length,
      description: document.querySelector('meta[name="description"]')?.content || '',
      descriptionLength: document.querySelector('meta[name="description"]')?.content?.length || 0,
      h1: Array.from(document.querySelectorAll('h1')).map(h => h.textContent.trim()),
      h1Count: document.querySelectorAll('h1').length,
      canonical: document.querySelector('link[rel="canonical"]')?.href || '',
      robots: document.querySelector('meta[name="robots"]')?.content || 'index, follow',
      hasStructuredData: document.querySelectorAll('script[type="application/ld+json"]').length,
      articleCount: document.querySelectorAll('article, [class*="article"], [class*="post"]').length
    };
  });

  results.blogIndex = {
    url: `${BASE_URL}/blog`,
    performance: perfBlog,
    seo: seoBlog
  };

  // 2. Récupérer les liens des articles
  const articleLinks = await page.evaluate(() => {
    const links = Array.from(document.querySelectorAll('a[href*="/blog/"]'));
    return [...new Set(links.map(a => a.href))].filter(href =>
      href.includes('/blog/') && !href.endsWith('/blog') && !href.endsWith('/blog/')
    ).slice(0, 3); // Limiter à 3 articles pour l'audit
  });

  console.log(`✅ ${articleLinks.length} articles trouvés, audit de 3 articles...\n`);

  // 3. Auditer quelques articles
  for (const articleUrl of articleLinks) {
    console.log(`📖 Analyse article: ${articleUrl.split('/').pop()}...`);

    await page.goto(articleUrl, { waitUntil: 'networkidle2', timeout: 60000 });

    const perfArticle = await page.evaluate(() => {
      const perf = performance.getEntriesByType('navigation')[0];
      return {
        loadTime: perf ? (perf.loadEventEnd - perf.fetchStart) / 1000 : 0,
        domContentLoaded: perf ? (perf.domContentLoadedEventEnd - perf.fetchStart) / 1000 : 0
      };
    });

    const seoArticle = await page.evaluate(() => {
      const article = document.querySelector('article') || document.querySelector('main');
      const content = article ? article.textContent : document.body.textContent;
      const wordCount = content.trim().split(/\s+/).length;

      return {
        title: document.title,
        titleLength: document.title.length,
        description: document.querySelector('meta[name="description"]')?.content || '',
        descriptionLength: document.querySelector('meta[name="description"]')?.content?.length || 0,
        h1: Array.from(document.querySelectorAll('h1')).map(h => h.textContent.trim()),
        h1Count: document.querySelectorAll('h1').length,
        h2Count: document.querySelectorAll('h2').length,
        h3Count: document.querySelectorAll('h3').length,
        canonical: document.querySelector('link[rel="canonical"]')?.href || '',
        robots: document.querySelector('meta[name="robots"]')?.content || 'index, follow',
        hasStructuredData: document.querySelectorAll('script[type="application/ld+json"]').length,
        wordCount: wordCount,
        imageCount: document.querySelectorAll('img').length,
        imagesWithAlt: Array.from(document.querySelectorAll('img')).filter(img => img.alt).length,
        externalLinksCount: Array.from(document.querySelectorAll('a[href^="http"]')).filter(a =>
          !a.href.includes('selectchateaux.com')
        ).length,
        internalLinksCount: Array.from(document.querySelectorAll('a[href^="/"], a[href*="selectchateaux.com"]')).length
      };
    });

    const readability = calculateReadability(seoArticle.wordCount);

    results.articles.push({
      url: articleUrl,
      slug: articleUrl.split('/').pop(),
      performance: perfArticle,
      seo: seoArticle,
      readability: readability
    });
  }

  await browser.close();

  // Calculs de scores
  const analysis = analyzeBlogResults(results);

  // Générer rapport
  generateHTMLReport(results, analysis);

  // Sauvegarder JSON
  const reportDir = path.join(__dirname, '../Rapport de tests');
  fs.writeFileSync(
    path.join(reportDir, 'audit-blog.json'),
    JSON.stringify({ results, analysis }, null, 2)
  );

  console.log('\n✅ Audit blog terminé!');
  console.log(`📊 Score SEO Blog: ${analysis.seoScore}/100`);
  console.log(`⚡ Score Performance: ${analysis.perfScore}/100`);
}

function calculateReadability(wordCount) {
  // Temps de lecture estimé (250 mots/minute en moyenne)
  const readingTimeMinutes = Math.ceil(wordCount / 250);

  // Évaluation de la longueur
  let lengthQuality = '';
  if (wordCount < 500) lengthQuality = 'Court';
  else if (wordCount < 1000) lengthQuality = 'Moyen';
  else if (wordCount < 2000) lengthQuality = 'Optimal';
  else lengthQuality = 'Long';

  return {
    wordCount,
    readingTimeMinutes,
    lengthQuality
  };
}

function analyzeBlogResults(results) {
  let seoScore = 100;
  let perfScore = 100;
  const issues = [];
  const warnings = [];
  const successes = [];

  // Analyse page index blog
  const blog = results.blogIndex;
  if (!blog.seo.title || blog.seo.titleLength < 30 || blog.seo.titleLength > 60) {
    warnings.push(`Blog index: Title ${blog.seo.titleLength} caractères (optimal: 30-60)`);
    seoScore -= 5;
  }

  if (!blog.seo.description || blog.seo.descriptionLength < 120 || blog.seo.descriptionLength > 160) {
    warnings.push(`Blog index: Description ${blog.seo.descriptionLength} caractères (optimal: 120-160)`);
    seoScore -= 5;
  }

  if (blog.seo.h1Count !== 1) {
    warnings.push(`Blog index: ${blog.seo.h1Count} H1 (recommandé: 1)`);
    seoScore -= 5;
  }

  if (blog.performance.loadTime > 3) {
    warnings.push(`Blog index: Temps de chargement ${blog.performance.loadTime.toFixed(2)}s (objectif: <3s)`);
    perfScore -= 10;
  } else {
    successes.push(`Blog index: Chargement rapide (${blog.performance.loadTime.toFixed(2)}s)`);
  }

  // Analyse articles
  results.articles.forEach((article, i) => {
    const slug = article.slug;

    if (article.seo.h1Count !== 1) {
      warnings.push(`${slug}: ${article.seo.h1Count} H1 (recommandé: 1)`);
      seoScore -= 3;
    }

    if (article.seo.wordCount < 800) {
      warnings.push(`${slug}: Article court (${article.seo.wordCount} mots, recommandé: 800+)`);
      seoScore -= 5;
    } else {
      successes.push(`${slug}: Contenu riche (${article.seo.wordCount} mots)`);
    }

    if (article.seo.imageCount > 0 && article.seo.imagesWithAlt < article.seo.imageCount) {
      const missing = article.seo.imageCount - article.seo.imagesWithAlt;
      warnings.push(`${slug}: ${missing} image(s) sans alt text`);
      seoScore -= 3;
    }

    if (article.performance.loadTime > 2.5) {
      warnings.push(`${slug}: Temps de chargement ${article.performance.loadTime.toFixed(2)}s`);
      perfScore -= 10;
    } else {
      successes.push(`${slug}: Chargement rapide (${article.performance.loadTime.toFixed(2)}s)`);
    }

    if (!article.seo.hasStructuredData) {
      warnings.push(`${slug}: Aucune donnée structurée`);
      seoScore -= 5;
    }
  });

  return {
    seoScore: Math.max(0, seoScore),
    perfScore: Math.max(0, perfScore),
    globalScore: Math.round((seoScore + perfScore) / 2),
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
  <title>Audit Blog - SELECT CHATEAUX</title>
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
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 15px;
      margin: 30px 0;
    }
    .stat-card {
      background: white;
      border-radius: 12px;
      padding: 25px;
      text-align: center;
      box-shadow: 0 5px 15px rgba(0,0,0,0.1);
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
    .alert {
      padding: 20px;
      border-radius: 8px;
      margin: 20px 0;
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
    .article-card {
      background: #f8f9fa;
      border-radius: 8px;
      padding: 20px;
      margin: 15px 0;
    }
    .article-title {
      font-size: 18px;
      color: #2c3e50;
      font-weight: bold;
      margin-bottom: 15px;
    }
    .metric-row {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 15px;
      margin: 15px 0;
    }
    .metric {
      background: white;
      padding: 15px;
      border-radius: 6px;
      text-align: center;
    }
    .metric-value {
      font-size: 24px;
      font-weight: bold;
      color: ${color};
    }
    .metric-label {
      font-size: 12px;
      color: #7f8c8d;
      margin-top: 5px;
    }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <h1>📝 Audit Blog</h1>
      <p style="font-size: 18px; color: #7f8c8d; margin: 10px 0;">SELECT CHATEAUX</p>
      <div class="score">${analysis.globalScore}/100</div>
      <p style="color: #7f8c8d;">Score global</p>
    </header>

    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-value">${analysis.seoScore}</div>
        <div class="stat-label">SEO</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">${analysis.perfScore}</div>
        <div class="stat-label">Performance</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">${results.articles.length}</div>
        <div class="stat-label">Articles audités</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">${results.blogIndex.performance.loadTime.toFixed(2)}s</div>
        <div class="stat-label">Temps chargement index</div>
      </div>
    </div>

    ${analysis.warnings.length > 0 ? `
    <div class="alert alert-warning">
      <h3>⚠️ Recommandations (${analysis.warnings.length})</h3>
      <ul>
        ${analysis.warnings.map(w => `<li>${w}</li>`).join('')}
      </ul>
    </div>` : ''}

    ${analysis.successes.length > 0 ? `
    <div class="alert alert-success">
      <h3>✅ Points Forts (${analysis.successes.length})</h3>
      <ul>
        ${analysis.successes.map(s => `<li>${s}</li>`).join('')}
      </ul>
    </div>` : ''}

    <div class="section">
      <h2 class="section-title">📄 Page Index Blog</h2>
      <div class="metric-row">
        <div class="metric">
          <div class="metric-value">${results.blogIndex.performance.loadTime.toFixed(2)}s</div>
          <div class="metric-label">Temps chargement</div>
        </div>
        <div class="metric">
          <div class="metric-value">${results.blogIndex.seo.titleLength}</div>
          <div class="metric-label">Caractères title</div>
        </div>
        <div class="metric">
          <div class="metric-value">${results.blogIndex.seo.h1Count}</div>
          <div class="metric-label">H1</div>
        </div>
        <div class="metric">
          <div class="metric-value">${results.blogIndex.seo.articleCount}</div>
          <div class="metric-label">Articles affichés</div>
        </div>
      </div>
      <div style="margin-top: 20px; padding: 15px; background: #f8f9fa; border-radius: 6px;">
        <strong>Title:</strong> ${results.blogIndex.seo.title}<br/>
        <strong>Description:</strong> ${results.blogIndex.seo.description}<br/>
        <strong>Robots:</strong> ${results.blogIndex.seo.robots}
      </div>
    </div>

    <div class="section">
      <h2 class="section-title">📖 Articles Audités</h2>
      ${results.articles.map((article, i) => `
        <div class="article-card">
          <div class="article-title">📄 ${article.slug}</div>
          <div class="metric-row">
            <div class="metric">
              <div class="metric-value">${article.performance.loadTime.toFixed(2)}s</div>
              <div class="metric-label">Chargement</div>
            </div>
            <div class="metric">
              <div class="metric-value">${article.seo.wordCount}</div>
              <div class="metric-label">Mots</div>
            </div>
            <div class="metric">
              <div class="metric-value">${article.readability.readingTimeMinutes} min</div>
              <div class="metric-label">Lecture</div>
            </div>
            <div class="metric">
              <div class="metric-value">${article.seo.h2Count}</div>
              <div class="metric-label">H2</div>
            </div>
            <div class="metric">
              <div class="metric-value">${article.seo.imageCount}</div>
              <div class="metric-label">Images</div>
            </div>
            <div class="metric">
              <div class="metric-value">${article.seo.internalLinksCount}</div>
              <div class="metric-label">Liens internes</div>
            </div>
          </div>
          <div style="margin-top: 15px; padding: 15px; background: white; border-radius: 6px;">
            <strong>Qualité contenu:</strong> ${article.readability.lengthQuality} (${article.seo.wordCount} mots)<br/>
            <strong>Structured Data:</strong> ${article.seo.hasStructuredData ? '✅ Oui' : '❌ Non'}<br/>
            <strong>Images avec alt:</strong> ${article.seo.imagesWithAlt}/${article.seo.imageCount}
          </div>
        </div>
      `).join('')}
    </div>

    <footer style="text-align: center; color: white; margin-top: 40px; padding: 20px;">
      <p>📅 ${new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
      <p style="margin-top: 10px;">🌐 https://www.selectchateaux.com/blog</p>
    </footer>
  </div>
</body>
</html>`;

  const reportDir = path.join(__dirname, '../Rapport de tests');
  fs.writeFileSync(path.join(reportDir, 'audit-blog.html'), html);
}

auditBlog().catch(console.error);

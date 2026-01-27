const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://selectchateaux.com';
const PAGES = ['/', '/chateaux', '/evenements', '/contact'];

async function auditSchema() {
  console.log('🔍 Audit Schema Markup en cours...\n');

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const allResults = [];

  for (const pagePath of PAGES) {
    const url = `${BASE_URL}${pagePath}`;
    console.log(`📄 Analyse Schema de ${url}...`);

    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });

    // Extraire les données structurées
    const schemaData = await page.evaluate(() => {
      // Trouver tous les scripts JSON-LD
      const jsonLdScripts = Array.from(document.querySelectorAll('script[type="application/ld+json"]'));
      const schemas = jsonLdScripts.map(script => {
        try {
          return JSON.parse(script.textContent);
        } catch (e) {
          return { error: 'Invalid JSON', content: script.textContent };
        }
      });

      // Microdata
      const itemscopes = Array.from(document.querySelectorAll('[itemscope]'));
      const microdata = itemscopes.map(elem => ({
        itemtype: elem.getAttribute('itemtype'),
        itemprops: Array.from(elem.querySelectorAll('[itemprop]')).map(prop => ({
          name: prop.getAttribute('itemprop'),
          content: prop.textContent.trim() || prop.getAttribute('content')
        }))
      }));

      // RDFa
      const vocabElements = Array.from(document.querySelectorAll('[vocab]'));
      const rdfa = vocabElements.map(elem => ({
        vocab: elem.getAttribute('vocab'),
        typeof: elem.getAttribute('typeof')
      }));

      return {
        jsonLd: schemas,
        microdata: microdata,
        rdfa: rdfa,
        hasStructuredData: schemas.length > 0 || microdata.length > 0 || rdfa.length > 0
      };
    });

    allResults.push({
      page: pagePath,
      url,
      schema: schemaData
    });

    await page.close();
  }

  await browser.close();

  // Analyser les résultats
  const analysis = analyzeSchemas(allResults);

  // Générer le rapport HTML
  generateHTMLReport(allResults, analysis);

  // Sauvegarder JSON
  const reportDir = path.join(__dirname, '../Rapport de tests');
  fs.writeFileSync(
    path.join(reportDir, 'audit-schema.json'),
    JSON.stringify({ results: allResults, analysis }, null, 2)
  );

  console.log('\n✅ Audit Schema Markup terminé!');
  console.log(`📊 Score global: ${analysis.globalScore}/100`);
}

function analyzeSchemas(results) {
  let score = 0;
  let issues = [];
  let warnings = [];
  let successes = [];

  const totalPages = results.length;
  let pagesWithSchema = 0;
  let totalSchemas = 0;

  const schemaTypes = new Set();

  results.forEach(result => {
    const { page, schema } = result;
    const pageName = page === '/' ? 'Accueil' : page.slice(1);

    if (schema.hasStructuredData) {
      pagesWithSchema++;
      successes.push(`${pageName}: Données structurées présentes`);
    } else {
      warnings.push(`${pageName}: Aucune donnée structurée`);
    }

    if (schema.jsonLd.length > 0) {
      totalSchemas += schema.jsonLd.length;
      schema.jsonLd.forEach(s => {
        if (s['@type']) {
          schemaTypes.add(s['@type']);
        }
        if (Array.isArray(s['@graph'])) {
          s['@graph'].forEach(item => {
            if (item['@type']) schemaTypes.add(item['@type']);
          });
        }
      });
      successes.push(`${pageName}: ${schema.jsonLd.length} schema(s) JSON-LD`);
    }

    // Vérifications spécifiques par type de page
    if (page === '/') {
      const hasOrganization = schema.jsonLd.some(s => s['@type'] === 'Organization' || (s['@graph'] && s['@graph'].some(i => i['@type'] === 'Organization')));
      const hasWebSite = schema.jsonLd.some(s => s['@type'] === 'WebSite' || (s['@graph'] && s['@graph'].some(i => i['@type'] === 'WebSite')));

      if (!hasOrganization) {
        warnings.push(`Accueil: Schema Organization recommandé`);
      }
      if (!hasWebSite) {
        warnings.push(`Accueil: Schema WebSite recommandé`);
      }
    }

    if (page === '/evenements') {
      const hasEvent = schema.jsonLd.some(s => s['@type'] === 'Event' || (s['@graph'] && s['@graph'].some(i => i['@type'] === 'Event')));
      if (!hasEvent) {
        warnings.push(`Événements: Schema Event recommandé`);
      }
    }

    if (page === '/contact') {
      const hasContactPage = schema.jsonLd.some(s => s['@type'] === 'ContactPage' || (s['@graph'] && s['@graph'].some(i => i['@type'] === 'ContactPage')));
      if (!hasContactPage) {
        warnings.push(`Contact: Schema ContactPage recommandé`);
      }
    }
  });

  // Calcul du score
  const coverageScore = (pagesWithSchema / totalPages) * 40;
  const diversityScore = Math.min(schemaTypes.size * 10, 30);
  const qualityScore = totalSchemas >= totalPages ? 30 : (totalSchemas / totalPages) * 30;

  score = Math.round(coverageScore + diversityScore + qualityScore);

  return {
    globalScore: score,
    pagesWithSchema,
    totalPages,
    totalSchemas,
    schemaTypes: Array.from(schemaTypes),
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
  <title>Audit Schema Markup - SELECT CHATEAUX</title>
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
      text-transform: uppercase;
      letter-spacing: 1px;
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
    .schema-box {
      background: #f8f9fa;
      border-radius: 8px;
      padding: 20px;
      margin: 15px 0;
    }
    .schema-type {
      font-size: 18px;
      font-weight: bold;
      color: ${color};
      margin-bottom: 10px;
    }
    pre {
      background: #2c3e50;
      color: #ecf0f1;
      padding: 15px;
      border-radius: 6px;
      overflow-x: auto;
      font-size: 12px;
      line-height: 1.5;
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
    .badge-warning { background: #fff3cd; color: #856404; }
    .badge-info { background: #d1ecf1; color: #0c5460; }
    .recommendations {
      background: #e8f4f8;
      border-left: 4px solid #17a2b8;
      padding: 20px;
      border-radius: 8px;
      margin: 20px 0;
    }
    .recommendations h3 {
      color: #0c5460;
      margin-bottom: 15px;
    }
    .recommendations ul {
      margin-left: 20px;
    }
    .recommendations li {
      margin: 10px 0;
      color: #0c5460;
    }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <h1>🏗️ Audit Schema Markup</h1>
      <p style="font-size: 18px; color: #7f8c8d; margin: 10px 0;">Données Structurées - SELECT CHATEAUX</p>
      <div class="score">${analysis.globalScore}/100</div>
      <p style="color: #7f8c8d;">Score de données structurées</p>
    </header>

    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-value">${analysis.totalSchemas}</div>
        <div class="stat-label">Schemas Détectés</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">${analysis.pagesWithSchema}/${analysis.totalPages}</div>
        <div class="stat-label">Pages avec Schema</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">${analysis.schemaTypes.length}</div>
        <div class="stat-label">Types de Schema</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">${Math.round(analysis.pagesWithSchema / analysis.totalPages * 100)}%</div>
        <div class="stat-label">Couverture</div>
      </div>
    </div>

    ${analysis.schemaTypes.length > 0 ? `
    <div class="page-section">
      <h2 style="color: #2c3e50; margin-bottom: 15px;">📋 Types de Schema Détectés</h2>
      <div>
        ${analysis.schemaTypes.map(type => `<span class="badge badge-info">${type}</span>`).join('')}
      </div>
    </div>` : ''}

    ${analysis.successes.length > 0 ? `
    <div class="alert alert-success">
      <h3>✅ Points Positifs (${analysis.successes.length})</h3>
      <ul>
        ${analysis.successes.map(success => `<li>${success}</li>`).join('')}
      </ul>
    </div>` : ''}

    ${analysis.warnings.length > 0 ? `
    <div class="alert alert-warning">
      <h3>⚠️ Recommandations (${analysis.warnings.length})</h3>
      <ul>
        ${analysis.warnings.map(warning => `<li>${warning}</li>`).join('')}
      </ul>
    </div>` : ''}

    ${results.map(result => {
      const { page, schema } = result;
      const pageName = page === '/' ? 'Accueil' : page.slice(1);

      return `
      <div class="page-section">
        <h2 class="page-title">${pageName}</h2>

        ${schema.jsonLd.length > 0 ? `
          <h3 style="margin: 20px 0 15px; color: #2c3e50;">📄 JSON-LD (${schema.jsonLd.length})</h3>
          ${schema.jsonLd.map((s, i) => {
            const type = s['@type'] || (s['@graph'] && s['@graph'][0] && s['@graph'][0]['@type']) || 'Unknown';
            return `
            <div class="schema-box">
              <div class="schema-type">${Array.isArray(type) ? type.join(', ') : type}</div>
              <pre>${JSON.stringify(s, null, 2)}</pre>
            </div>
          `}).join('')}
        ` : `
          <div class="alert alert-warning">
            <p>⚠️ Aucune donnée structurée JSON-LD détectée sur cette page</p>
          </div>
        `}

        ${schema.microdata.length > 0 ? `
          <h3 style="margin: 20px 0 15px; color: #2c3e50;">🏷️ Microdata (${schema.microdata.length})</h3>
          ${schema.microdata.map(md => `
            <div class="schema-box">
              <div class="schema-type">${md.itemtype}</div>
              <pre>${JSON.stringify(md.itemprops, null, 2)}</pre>
            </div>
          `).join('')}
        ` : ''}

        ${schema.rdfa.length > 0 ? `
          <h3 style="margin: 20px 0 15px; color: #2c3e50;">🌐 RDFa (${schema.rdfa.length})</h3>
          ${schema.rdfa.map(rd => `
            <div class="schema-box">
              <pre>${JSON.stringify(rd, null, 2)}</pre>
            </div>
          `).join('')}
        ` : ''}
      </div>
    `}).join('')}

    <div class="recommendations">
      <h3>💡 Recommandations Schema Markup</h3>
      <ul>
        <li><strong>Organization Schema:</strong> Ajouter sur la page d'accueil avec nom, logo, adresse, contacts</li>
        <li><strong>WebSite Schema:</strong> Inclure searchAction pour la barre de recherche Google</li>
        <li><strong>Event Schema:</strong> Ajouter sur la page événements avec dates, lieux, prix</li>
        <li><strong>BreadcrumbList Schema:</strong> Pour la navigation (fil d'Ariane)</li>
        <li><strong>FAQPage Schema:</strong> Si vous avez une section FAQ</li>
        <li><strong>Review/Rating Schema:</strong> Pour les avis clients sur les châteaux</li>
        <li><strong>Product Schema:</strong> Pour les offres de location de châteaux</li>
        <li><strong>ContactPage Schema:</strong> Sur la page contact avec coordonnées</li>
      </ul>
    </div>

    <div class="page-section">
      <h3 style="color: #2c3e50; margin-bottom: 15px;">🛠️ Outils de Validation</h3>
      <ul style="line-height: 2; color: #555;">
        <li>📊 <a href="https://search.google.com/test/rich-results?url=${encodeURIComponent(BASE_URL)}" target="_blank" style="color: #3498db;">Google Rich Results Test</a></li>
        <li>🔍 <a href="https://validator.schema.org/#url=${encodeURIComponent(BASE_URL)}" target="_blank" style="color: #3498db;">Schema.org Validator</a></li>
        <li>📱 <a href="https://search.google.com/structured-data/testing-tool?url=${encodeURIComponent(BASE_URL)}" target="_blank" style="color: #3498db;">Google Structured Data Testing Tool</a></li>
      </ul>
    </div>

    <footer style="text-align: center; color: white; margin-top: 40px; padding: 20px;">
      <p>📅 ${new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
      <p style="margin-top: 10px;">🌐 https://selectchateaux.com</p>
    </footer>
  </div>
</body>
</html>`;

  const reportDir = path.join(__dirname, '../Rapport de tests');
  fs.writeFileSync(path.join(reportDir, 'audit-schema.html'), html);
}

auditSchema().catch(console.error);

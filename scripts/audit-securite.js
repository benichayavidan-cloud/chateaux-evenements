const puppeteer = require('puppeteer');
const https = require('https');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://www.selectchateaux.com';
const PAGES = ['/', '/chateaux', '/evenements', '/contact'];

async function auditSecurite() {
  console.log('🔒 Audit de sécurité en cours...\n');

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const allResults = [];

  for (const pagePath of PAGES) {
    const url = `${BASE_URL}${pagePath}`;
    console.log(`🔍 Analyse sécurité de ${url}...`);

    const page = await browser.newPage();

    // Capturer les requêtes
    const requests = [];
    page.on('request', request => {
      requests.push({
        url: request.url(),
        method: request.method(),
        resourceType: request.resourceType()
      });
    });

    // Capturer les réponses et headers
    const responses = [];
    page.on('response', response => {
      responses.push({
        url: response.url(),
        status: response.status(),
        headers: response.headers()
      });
    });

    await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });

    // Analyser la sécurité
    const securityData = await page.evaluate(() => {
      const results = {
        https: window.location.protocol === 'https:',
        mixedContent: [],
        externalScripts: [],
        inlineScripts: [],
        forms: [],
        cookies: document.cookie,
        localStorage: Object.keys(localStorage).length,
        sessionStorage: Object.keys(sessionStorage).length,
        iframes: []
      };

      // Mixed content
      const allResources = Array.from(document.querySelectorAll('img, script, link, iframe'));
      allResources.forEach(elem => {
        const src = elem.src || elem.href;
        if (src && src.startsWith('http:')) {
          results.mixedContent.push(src);
        }
      });

      // Scripts externes
      const scripts = Array.from(document.querySelectorAll('script[src]'));
      results.externalScripts = scripts.map(s => s.src);

      // Scripts inline
      const inlineScripts = Array.from(document.querySelectorAll('script:not([src])'));
      results.inlineScripts = inlineScripts.map(s => ({
        length: s.textContent.length,
        hasInnerHTML: s.textContent.includes('innerHTML'),
        hasEval: s.textContent.includes('eval('),
        hasDangerousInsertions: s.textContent.includes('document.write')
      }));

      // Formulaires
      const forms = Array.from(document.querySelectorAll('form'));
      results.forms = forms.map(f => ({
        action: f.action,
        method: f.method,
        hasHttps: f.action.startsWith('https:') || f.action.startsWith('/'),
        inputs: Array.from(f.querySelectorAll('input')).map(i => ({
          type: i.type,
          name: i.name,
          hasAutocomplete: i.hasAttribute('autocomplete')
        }))
      }));

      // iframes
      const iframes = Array.from(document.querySelectorAll('iframe'));
      results.iframes = iframes.map(iframe => ({
        src: iframe.src,
        sandbox: iframe.getAttribute('sandbox'),
        allow: iframe.getAttribute('allow')
      }));

      return results;
    });

    // Analyser les headers de sécurité de la page principale
    const mainResponse = responses.find(r => r.url === url);
    const securityHeaders = mainResponse ? {
      'strict-transport-security': mainResponse.headers['strict-transport-security'],
      'content-security-policy': mainResponse.headers['content-security-policy'],
      'x-content-type-options': mainResponse.headers['x-content-type-options'],
      'x-frame-options': mainResponse.headers['x-frame-options'],
      'x-xss-protection': mainResponse.headers['x-xss-protection'],
      'referrer-policy': mainResponse.headers['referrer-policy'],
      'permissions-policy': mainResponse.headers['permissions-policy']
    } : {};

    // Analyser les requêtes non-sécurisées
    const httpRequests = requests.filter(r => r.url.startsWith('http:'));

    allResults.push({
      page: pagePath,
      url,
      security: securityData,
      headers: securityHeaders,
      httpRequests: httpRequests.length,
      totalRequests: requests.length
    });

    await page.close();
  }

  await browser.close();

  // Tester les headers au niveau du domaine
  const domainHeaders = await testDomainHeaders();

  // Analyser les résultats
  const analysis = analyzeSecurityResults(allResults, domainHeaders);

  // Générer le rapport HTML
  generateHTMLReport(allResults, analysis, domainHeaders);

  // Sauvegarder JSON
  const reportDir = path.join(__dirname, '../Rapport de tests');
  fs.writeFileSync(
    path.join(reportDir, 'audit-securite.json'),
    JSON.stringify({ results: allResults, domainHeaders, analysis }, null, 2)
  );

  console.log('\n✅ Audit de sécurité terminé!');
  console.log(`🔒 Score global: ${analysis.globalScore}/100`);
}

async function testDomainHeaders() {
  return new Promise((resolve) => {
    https.get(BASE_URL, (res) => {
      resolve({
        statusCode: res.statusCode,
        headers: res.headers
      });
    }).on('error', () => {
      resolve({ error: 'Failed to fetch headers' });
    });
  });
}

function analyzeSecurityResults(results, domainHeaders) {
  let score = 100;
  let criticalIssues = [];
  let warnings = [];
  let goodPractices = [];

  // Vérifier HTTPS
  const allHttps = results.every(r => r.security.https);
  if (allHttps) {
    goodPractices.push('✅ Toutes les pages utilisent HTTPS');
  } else {
    criticalIssues.push('❌ Certaines pages ne sont pas en HTTPS');
    score -= 20;
  }

  // Vérifier Mixed Content
  const hasMixedContent = results.some(r => r.security.mixedContent.length > 0);
  if (hasMixedContent) {
    criticalIssues.push('❌ Contenu mixte HTTP/HTTPS détecté');
    score -= 15;
  } else {
    goodPractices.push('✅ Pas de contenu mixte');
  }

  // Vérifier les headers de sécurité
  const headers = domainHeaders.headers || {};

  if (!headers['strict-transport-security']) {
    warnings.push('⚠️ Header HSTS manquant');
    score -= 10;
  } else {
    goodPractices.push('✅ HSTS configuré');
  }

  if (!headers['content-security-policy']) {
    warnings.push('⚠️ Content-Security-Policy manquant');
    score -= 10;
  } else {
    goodPractices.push('✅ CSP configuré');
  }

  if (!headers['x-content-type-options']) {
    warnings.push('⚠️ X-Content-Type-Options manquant');
    score -= 5;
  } else {
    goodPractices.push('✅ X-Content-Type-Options configuré');
  }

  if (!headers['x-frame-options']) {
    warnings.push('⚠️ X-Frame-Options manquant (protection clickjacking)');
    score -= 5;
  } else {
    goodPractices.push('✅ X-Frame-Options configuré');
  }

  if (!headers['referrer-policy']) {
    warnings.push('⚠️ Referrer-Policy manquant');
    score -= 3;
  } else {
    goodPractices.push('✅ Referrer-Policy configuré');
  }

  // Vérifier les requêtes HTTP non sécurisées
  const totalHttpRequests = results.reduce((sum, r) => sum + r.httpRequests, 0);
  if (totalHttpRequests > 0) {
    criticalIssues.push(`❌ ${totalHttpRequests} requêtes HTTP non sécurisées`);
    score -= 10;
  } else {
    goodPractices.push('✅ Toutes les requêtes sont en HTTPS');
  }

  // Vérifier les scripts inline dangereux
  results.forEach(result => {
    const dangerousScripts = result.security.inlineScripts.filter(s => s.hasEval || s.hasDangerousInsertions);
    if (dangerousScripts.length > 0) {
      warnings.push(`⚠️ ${result.page}: Scripts inline avec eval/document.write`);
      score -= 3;
    }
  });

  // Vérifier les formulaires
  results.forEach(result => {
    result.security.forms.forEach(form => {
      if (!form.hasHttps) {
        criticalIssues.push(`❌ ${result.page}: Formulaire non-HTTPS`);
        score -= 10;
      }
    });
  });

  return {
    globalScore: Math.max(0, score),
    criticalIssues,
    warnings,
    goodPractices
  };
}

function generateHTMLReport(results, analysis, domainHeaders) {
  const color = analysis.globalScore >= 80 ? '#27ae60' : analysis.globalScore >= 60 ? '#f39c12' : '#e74c3c';

  const html = `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Audit Sécurité - SELECT CHATEAUX</title>
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
    .security-item {
      margin: 15px 0;
      padding: 15px;
      background: #f8f9fa;
      border-radius: 8px;
    }
    .security-item h4 {
      color: #2c3e50;
      margin-bottom: 10px;
      font-size: 16px;
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
    .code {
      background: #2c3e50;
      color: #ecf0f1;
      padding: 3px 8px;
      border-radius: 4px;
      font-family: monospace;
      font-size: 13px;
    }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <h1>🔒 Audit de Sécurité</h1>
      <p style="font-size: 18px; color: #7f8c8d; margin: 10px 0;">SELECT CHATEAUX</p>
      <div class="score">${analysis.globalScore}/100</div>
      <p style="color: #7f8c8d;">Score de sécurité</p>
    </header>

    ${analysis.criticalIssues.length > 0 ? `
    <div class="alert alert-danger">
      <h3>🚨 Problèmes Critiques (${analysis.criticalIssues.length})</h3>
      <ul>
        ${analysis.criticalIssues.map(issue => `<li>${issue}</li>`).join('')}
      </ul>
    </div>` : ''}

    ${analysis.warnings.length > 0 ? `
    <div class="alert alert-warning">
      <h3>⚠️ Avertissements (${analysis.warnings.length})</h3>
      <ul>
        ${analysis.warnings.map(warning => `<li>${warning}</li>`).join('')}
      </ul>
    </div>` : ''}

    ${analysis.goodPractices.length > 0 ? `
    <div class="alert alert-success">
      <h3>✅ Bonnes Pratiques (${analysis.goodPractices.length})</h3>
      <ul>
        ${analysis.goodPractices.map(practice => `<li>${practice}</li>`).join('')}
      </ul>
    </div>` : ''}

    <div class="page-section">
      <h2 class="page-title">🛡️ Headers de Sécurité (Domaine)</h2>
      <table>
        <thead>
          <tr>
            <th>Header</th>
            <th>Valeur</th>
            <th>Statut</th>
          </tr>
        </thead>
        <tbody>
          ${[
            { name: 'Strict-Transport-Security', key: 'strict-transport-security', critical: true },
            { name: 'Content-Security-Policy', key: 'content-security-policy', critical: true },
            { name: 'X-Content-Type-Options', key: 'x-content-type-options', critical: false },
            { name: 'X-Frame-Options', key: 'x-frame-options', critical: false },
            { name: 'X-XSS-Protection', key: 'x-xss-protection', critical: false },
            { name: 'Referrer-Policy', key: 'referrer-policy', critical: false },
            { name: 'Permissions-Policy', key: 'permissions-policy', critical: false }
          ].map(header => {
            const value = domainHeaders.headers?.[header.key];
            const hasHeader = !!value;
            return `
            <tr>
              <td><strong>${header.name}</strong></td>
              <td style="max-width: 400px; overflow: hidden; text-overflow: ellipsis;">
                ${value ? `<span class="code">${value}</span>` : '<em>Non configuré</em>'}
              </td>
              <td>
                ${hasHeader
                  ? '<span class="badge badge-success">✓ Présent</span>'
                  : header.critical
                    ? '<span class="badge badge-danger">✗ Manquant</span>'
                    : '<span class="badge badge-warning">⚠ Recommandé</span>'
                }
              </td>
            </tr>
          `}).join('')}
        </tbody>
      </table>
    </div>

    ${results.map(result => {
      const { page, security, headers } = result;
      const pageName = page === '/' ? 'Accueil' : page.slice(1);

      return `
      <div class="page-section">
        <h2 class="page-title">${pageName}</h2>

        <div class="security-item">
          <h4>🔐 Protocole HTTPS
            ${security.https
              ? '<span class="badge badge-success">✓ Sécurisé</span>'
              : '<span class="badge badge-danger">✗ Non sécurisé</span>'
            }
          </h4>
          <p>Protocole: ${security.https ? 'HTTPS' : 'HTTP'}</p>
        </div>

        ${security.mixedContent.length > 0 ? `
        <div class="security-item">
          <h4>⚠️ Contenu Mixte
            <span class="badge badge-danger">✗ ${security.mixedContent.length} ressources HTTP</span>
          </h4>
          <ul style="margin-top: 10px; font-size: 13px;">
            ${security.mixedContent.slice(0, 5).map(url => `<li style="word-break: break-all;">${url}</li>`).join('')}
            ${security.mixedContent.length > 5 ? `<li><em>... et ${security.mixedContent.length - 5} autres</em></li>` : ''}
          </ul>
        </div>` : ''}

        <div class="security-item">
          <h4>📜 Scripts Externes (${security.externalScripts.length})</h4>
          ${security.externalScripts.length > 0 ? `
            <ul style="margin-top: 10px; font-size: 13px;">
              ${security.externalScripts.slice(0, 3).map(url => `<li style="word-break: break-all;">${url}</li>`).join('')}
              ${security.externalScripts.length > 3 ? `<li><em>... et ${security.externalScripts.length - 3} autres</em></li>` : ''}
            </ul>
          ` : '<p>Aucun script externe</p>'}
        </div>

        ${security.inlineScripts.length > 0 ? `
        <div class="security-item">
          <h4>📝 Scripts Inline (${security.inlineScripts.length})
            ${security.inlineScripts.some(s => s.hasEval || s.hasDangerousInsertions)
              ? '<span class="badge badge-warning">⚠ Patterns dangereux détectés</span>'
              : '<span class="badge badge-success">✓ OK</span>'
            }
          </h4>
          <p>Scripts avec eval: ${security.inlineScripts.filter(s => s.hasEval).length}</p>
          <p>Scripts avec document.write: ${security.inlineScripts.filter(s => s.hasDangerousInsertions).length}</p>
          <p>Scripts avec innerHTML: ${security.inlineScripts.filter(s => s.hasInnerHTML).length}</p>
        </div>` : ''}

        ${security.forms.length > 0 ? `
        <div class="security-item">
          <h4>📋 Formulaires (${security.forms.length})
            ${security.forms.every(f => f.hasHttps)
              ? '<span class="badge badge-success">✓ Tous sécurisés</span>'
              : '<span class="badge badge-danger">✗ Formulaires non-HTTPS</span>'
            }
          </h4>
          ${security.forms.map((form, i) => `
            <div style="margin: 10px 0; padding: 10px; background: white; border-radius: 6px;">
              <p><strong>Formulaire ${i + 1}</strong></p>
              <p>Action: ${form.action}</p>
              <p>Méthode: ${form.method.toUpperCase()}</p>
              <p>HTTPS: ${form.hasHttps ? '✓ Oui' : '✗ Non'}</p>
            </div>
          `).join('')}
        </div>` : ''}

        ${security.iframes.length > 0 ? `
        <div class="security-item">
          <h4>🖼️ iFrames (${security.iframes.length})</h4>
          ${security.iframes.map((iframe, i) => `
            <div style="margin: 10px 0; padding: 10px; background: white; border-radius: 6px;">
              <p><strong>iFrame ${i + 1}</strong></p>
              <p style="word-break: break-all;">Source: ${iframe.src}</p>
              <p>Sandbox: ${iframe.sandbox || 'Non défini'}</p>
            </div>
          `).join('')}
        </div>` : ''}

        <div class="security-item">
          <h4>🍪 Stockage Local</h4>
          <p>Cookies: ${security.cookies ? 'Présents' : 'Aucun'}</p>
          <p>LocalStorage items: ${security.localStorage}</p>
          <p>SessionStorage items: ${security.sessionStorage}</p>
        </div>
      </div>
    `}).join('')}

    <div class="page-section">
      <h3 style="color: #2c3e50; margin-bottom: 15px;">💡 Recommandations de Sécurité</h3>
      <ul style="line-height: 2; color: #555;">
        <li>🔒 <strong>HSTS:</strong> Configurer Strict-Transport-Security avec max-age de 1 an minimum</li>
        <li>🛡️ <strong>CSP:</strong> Implémenter une Content-Security-Policy stricte</li>
        <li>🚫 <strong>X-Frame-Options:</strong> Définir sur DENY ou SAMEORIGIN pour prévenir le clickjacking</li>
        <li>📦 <strong>X-Content-Type-Options:</strong> Définir sur nosniff</li>
        <li>🔐 <strong>Referrer-Policy:</strong> Utiliser no-referrer-when-downgrade ou strict-origin</li>
        <li>🍪 <strong>Cookies:</strong> Utiliser les flags Secure, HttpOnly et SameSite</li>
        <li>🔑 <strong>Subresource Integrity:</strong> Ajouter SRI pour les scripts/styles externes</li>
        <li>📜 <strong>Éviter eval():</strong> Supprimer eval() et document.write des scripts</li>
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
  fs.writeFileSync(path.join(reportDir, 'audit-securite.html'), html);
}

auditSecurite().catch(console.error);

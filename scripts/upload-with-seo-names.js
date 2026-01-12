#!/usr/bin/env node

/**
 * 🚀 UPLOAD DES IMAGES AVEC NOMS SEO
 *
 * Upload toutes les images sur Supabase avec leurs noms SEO optimisés
 */

const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: path.join(__dirname, '../.env.local') });

// Configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const BASE_IMAGE_DIR = path.join(process.env.HOME, 'Desktop', 'image selectchateaux');

const FOLDER_MAPPING = {
  'chantilly': 'Chateau de Montvillargenne (60)',
  'hauts-de-seine': 'MGallery Domaine de la Reine Margot (92)',
  'chevreuse': 'Abbaye des Vaux de Cernay (78)'
};

/**
 * Convertir une image en WebP
 */
async function convertToWebP(imagePath) {
  const sharp = require('sharp');
  const buffer = await fs.promises.readFile(imagePath);
  return await sharp(buffer)
    .resize({ width: 1920, withoutEnlargement: true })
    .webp({ quality: 85 })
    .toBuffer();
}

/**
 * Uploader une image sur Supabase
 */
async function uploadImage(bucketFolder, fileName, imageBuffer) {
  const filePath = `${bucketFolder}/${fileName}`;

  console.log(`📤 Upload: ${fileName}...`);

  const { data, error } = await supabase
    .storage
    .from('chateaux-images')
    .upload(filePath, imageBuffer, {
      contentType: 'image/webp',
      upsert: true
    });

  if (error) {
    console.error(`❌ Erreur:`, error.message);
    return null;
  }

  const { data: urlData } = supabase
    .storage
    .from('chateaux-images')
    .getPublicUrl(filePath);

  return urlData.publicUrl;
}

/**
 * Main
 */
async function main() {
  console.log('🚀 UPLOAD DES IMAGES AVEC NOMS SEO\n');
  console.log('═══════════════════════════════════════\n');

  // Charger le mapping
  const mappingPath = path.join(__dirname, 'images-seo-mapping.json');
  const mapping = JSON.parse(fs.readFileSync(mappingPath, 'utf-8'));

  // Vérifier sharp
  try {
    require('sharp');
  } catch (e) {
    console.log('📦 Installation de sharp...');
    require('child_process').execSync('npm install sharp', { stdio: 'inherit' });
  }

  const uploadedData = {};

  // Traiter chaque château
  for (const [slug, images] of Object.entries(mapping)) {
    const folderName = FOLDER_MAPPING[slug];
    const localDir = path.join(BASE_IMAGE_DIR, folderName);

    console.log(`\n🏰 ${slug.toUpperCase()}`);
    console.log(`📁 ${folderName}\n`);

    uploadedData[slug] = [];

    for (const imageInfo of images) {
      const localPath = path.join(localDir, imageInfo.original);

      if (!fs.existsSync(localPath)) {
        console.log(`⚠️  Fichier introuvable: ${imageInfo.original}`);
        continue;
      }

      try {
        // Convertir en WebP
        const webpBuffer = await convertToWebP(localPath);

        // Upload sur Supabase avec le nom SEO
        const url = await uploadImage(slug, imageInfo.seoName, webpBuffer);

        if (url) {
          uploadedData[slug].push({
            name: imageInfo.seoName,
            url: url,
            description: imageInfo.description
          });
          console.log(`✅ ${imageInfo.seoName}`);
        }
      } catch (error) {
        console.error(`❌ Erreur ${imageInfo.original}:`, error.message);
      }
    }
  }

  // Sauvegarder les URLs
  const outputPath = path.join(__dirname, 'uploaded-images.json');
  fs.writeFileSync(outputPath, JSON.stringify(uploadedData, null, 2));

  console.log('\n═══════════════════════════════════════');
  console.log('✅ UPLOAD TERMINÉ !');
  console.log('═══════════════════════════════════════\n');

  console.log('📊 RÉSUMÉ:');
  for (const [slug, images] of Object.entries(uploadedData)) {
    console.log(`  ✅ ${slug}: ${images.length} images uploadées`);
  }

  console.log(`\n📄 URLs sauvegardées: ${outputPath}`);

  // Mettre à jour le HTML de sélection
  updateHTMLSelector(uploadedData);
}

/**
 * Mettre à jour le HTML de sélection
 */
function updateHTMLSelector(uploadedData) {
  const templatePath = path.join(__dirname, 'final-image-selector-template.html');
  const htmlPath = path.join(__dirname, 'final-image-selector-updated.html');

  // Lire le template
  let htmlContent = fs.readFileSync(templatePath, 'utf-8');

  // Remplacer le placeholder par les vraies données
  htmlContent = htmlContent.replace(
    'IMAGES_DATA_PLACEHOLDER',
    JSON.stringify(uploadedData, null, 2)
  );

  // Sauvegarder
  fs.writeFileSync(htmlPath, htmlContent);

  console.log(`\n✅ HTML généré: ${htmlPath}`);
  console.log(`\n🌐 Ouvre ce fichier pour sélectionner tes images !`);

  // Ouvrir automatiquement
  require('child_process').exec(`open "${htmlPath}"`);
}

// OLD VERSION - KEEPING FOR BACKUP
function updateHTMLSelectorOLD(uploadedData) {
  const htmlPath = path.join(__dirname, 'image-selector-updated.html');

  let htmlContent = `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>🏰 Sélecteur d'Images - Select Châteaux</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 20px;
      min-height: 100vh;
    }
    .container {
      max-width: 1400px;
      margin: 0 auto;
      background: white;
      border-radius: 20px;
      padding: 40px;
      box-shadow: 0 20px 60px rgba(0,0,0,0.3);
    }
    h1 {
      text-align: center;
      color: #2d3748;
      margin-bottom: 10px;
      font-size: 2.5em;
    }
    .subtitle {
      text-align: center;
      color: #718096;
      margin-bottom: 40px;
      font-size: 1.1em;
    }
    .chateau-section {
      margin-bottom: 60px;
      border: 2px solid #e2e8f0;
      border-radius: 15px;
      padding: 30px;
      background: #f7fafc;
    }
    .chateau-title {
      color: #667eea;
      font-size: 1.8em;
      margin-bottom: 20px;
      padding-bottom: 15px;
      border-bottom: 3px solid #667eea;
    }
    .category {
      margin: 30px 0;
    }
    .category-title {
      color: #4a5568;
      font-size: 1.3em;
      margin-bottom: 15px;
      padding: 10px;
      background: white;
      border-left: 5px solid #48bb78;
      border-radius: 5px;
    }
    .images-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 20px;
      margin-top: 20px;
    }
    .image-card {
      position: relative;
      border: 3px solid #e2e8f0;
      border-radius: 12px;
      overflow: hidden;
      cursor: pointer;
      transition: all 0.3s ease;
      background: white;
    }
    .image-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 25px rgba(0,0,0,0.2);
      border-color: #667eea;
    }
    .image-card.selected {
      border-color: #48bb78;
      border-width: 4px;
    }
    .image-card img {
      width: 100%;
      height: 200px;
      object-fit: cover;
      display: block;
    }
    .image-label {
      padding: 12px;
      font-size: 0.85em;
      color: #4a5568;
      background: white;
      line-height: 1.4;
    }
    .selection-badge {
      position: absolute;
      top: 10px;
      right: 10px;
      background: #48bb78;
      color: white;
      width: 35px;
      height: 35px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      font-size: 1.1em;
      box-shadow: 0 4px 12px rgba(72, 187, 120, 0.5);
    }
    .generate-btn {
      position: fixed;
      bottom: 30px;
      right: 30px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      padding: 18px 40px;
      font-size: 1.1em;
      font-weight: bold;
      border-radius: 50px;
      cursor: pointer;
      box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
      transition: all 0.3s ease;
    }
    .generate-btn:hover {
      transform: translateY(-3px);
      box-shadow: 0 15px 40px rgba(102, 126, 234, 0.6);
    }
    .code-output {
      display: none;
      margin-top: 40px;
      padding: 30px;
      background: #1a202c;
      border-radius: 15px;
      position: relative;
    }
    .code-output pre {
      color: #68d391;
      font-family: 'Monaco', 'Courier New', monospace;
      font-size: 0.9em;
      line-height: 1.6;
      overflow-x: auto;
    }
    .copy-btn {
      position: absolute;
      top: 20px;
      right: 20px;
      background: #48bb78;
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 8px;
      cursor: pointer;
      font-weight: bold;
    }
    .copy-btn:hover {
      background: #38a169;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>🏰 Sélecteur d'Images</h1>
    <p class="subtitle">Cliquez sur les images pour sélectionner (Hero & Galerie) ou choisissez via les menus (OpenGraph & Card)</p>
`;

  // Ajouter chaque château
  for (const [slug, images] of Object.entries(uploadedData)) {
    const chateauNames = {
      'chantilly': 'Manoir Anglo-Normand Chantilly (60)',
      'hauts-de-seine': 'Hôtel Historique Paris Hauts-de-Seine (92)',
      'chevreuse': 'Abbaye Vaux de Cernay Chevreuse (78)'
    };

    htmlContent += `
    <div class="chateau-section">
      <h2 class="chateau-title">${chateauNames[slug]}</h2>

      <div class="category">
        <h3 class="category-title">📸 Hero Slider (Cliquez pour sélectionner plusieurs)</h3>
        <div class="images-grid" id="${slug}-hero-grid">
`;

    images.forEach((img, i) => {
      htmlContent += `
          <div class="image-card" data-chateau="${slug}" data-category="hero" data-url="${img.url}">
            <img src="${img.url}" alt="${img.description}" loading="lazy">
            <div class="image-label">${img.name.substring(0, 60)}...</div>
          </div>
`;
    });

    htmlContent += `
        </div>
      </div>

      <div class="category">
        <h3 class="category-title">🌐 OpenGraph (Menu déroulant)</h3>
        <select id="${slug}-og-select" style="width: 100%; padding: 12px; font-size: 1em; border: 2px solid #e2e8f0; border-radius: 8px;">
          <option value="">-- Sélectionner --</option>
`;

    images.forEach((img, i) => {
      htmlContent += `          <option value="${img.url}">${img.description}</option>\n`;
    });

    htmlContent += `
        </select>
        <div id="${slug}-og-preview" style="margin-top: 15px;"></div>
      </div>

      <div class="category">
        <h3 class="category-title">🎴 Card (Menu déroulant)</h3>
        <select id="${slug}-card-select" style="width: 100%; padding: 12px; font-size: 1em; border: 2px solid #e2e8f0; border-radius: 8px;">
          <option value="">-- Sélectionner --</option>
`;

    images.forEach((img, i) => {
      htmlContent += `          <option value="${img.url}">${img.description}</option>\n`;
    });

    htmlContent += `
        </select>
        <div id="${slug}-card-preview" style="margin-top: 15px;"></div>
      </div>

      <div class="category">
        <h3 class="category-title">🖼️ Galerie (Cliquez pour sélectionner plusieurs)</h3>
        <div class="images-grid" id="${slug}-galerie-grid">
`;

    images.forEach((img, i) => {
      htmlContent += `
          <div class="image-card" data-chateau="${slug}" data-category="galerie" data-url="${img.url}">
            <img src="${img.url}" alt="${img.description}" loading="lazy">
            <div class="image-label">${img.name.substring(0, 60)}...</div>
          </div>
`;
    });

    htmlContent += `
        </div>
      </div>
    </div>
`;
  }

  htmlContent += `
    <button class="generate-btn" onclick="generateCode()">📋 Générer le Code</button>

    <div class="code-output" id="code-output">
      <button class="copy-btn" onclick="copyCode()">📄 Copier le Code</button>
      <pre id="generated-code"></pre>
    </div>
  </div>

  <script>
    const selections = ${JSON.stringify(Object.fromEntries(Object.keys(uploadedData).map(slug => [
      slug,
      { hero: [], galerie: [], openGraph: '', card: '' }
    ])))};

    // Gestion des clics sur les images
    document.querySelectorAll('.image-card').forEach(card => {
      card.addEventListener('click', () => {
        const chateau = card.dataset.chateau;
        const category = card.dataset.category;
        const url = card.dataset.url;

        if (card.classList.contains('selected')) {
          // Désélectionner
          card.classList.remove('selected');
          const badge = card.querySelector('.selection-badge');
          if (badge) badge.remove();

          const index = selections[chateau][category].indexOf(url);
          if (index > -1) {
            selections[chateau][category].splice(index, 1);
          }
        } else {
          // Sélectionner
          card.classList.add('selected');
          selections[chateau][category].push(url);

          const badge = document.createElement('div');
          badge.className = 'selection-badge';
          badge.textContent = selections[chateau][category].length;
          card.appendChild(badge);
        }

        // Mettre à jour les numéros
        updateBadgeNumbers(chateau, category);
      });
    });

    function updateBadgeNumbers(chateau, category) {
      const cards = document.querySelectorAll(\`.image-card[data-chateau="\${chateau}"][data-category="\${category}"].selected\`);
      cards.forEach((card, index) => {
        const badge = card.querySelector('.selection-badge');
        if (badge) badge.textContent = index + 1;
      });
    }

    // Gestion des selects OpenGraph
    ${Object.keys(uploadedData).map(slug => `
    document.getElementById('${slug}-og-select').addEventListener('change', (e) => {
      selections['${slug}'].openGraph = e.target.value;
      const preview = document.getElementById('${slug}-og-preview');
      if (e.target.value) {
        preview.innerHTML = '<img src="' + e.target.value + '" style="max-width: 300px; border-radius: 8px; margin-top: 10px;" />';
      } else {
        preview.innerHTML = '';
      }
    });
    `).join('')}

    // Gestion des selects Card
    ${Object.keys(uploadedData).map(slug => `
    document.getElementById('${slug}-card-select').addEventListener('change', (e) => {
      selections['${slug}'].card = e.target.value;
      const preview = document.getElementById('${slug}-card-preview');
      if (e.target.value) {
        preview.innerHTML = '<img src="' + e.target.value + '" style="max-width: 300px; border-radius: 8px; margin-top: 10px;" />';
      } else {
        preview.innerHTML = '';
      }
    });
    `).join('')}

    function generateCode() {
      let code = '// 🏰 CODE À COPIER DANS src/data/chateaux.ts\\n\\n';

      for (const [slug, data] of Object.entries(selections)) {
        code += \`// \${slug.toUpperCase()}\\n\`;
        code += 'images: {\\n';
        code += '  hero: [\\n';
        data.hero.forEach(url => {
          code += \`    "\${url}",\\n\`;
        });
        code += '  ],\\n';
        code += \`  openGraph: "\${data.openGraph}",\\n\`;
        code += \`  card: "\${data.card}",\\n\`;
        code += '  galerie: [\\n';
        data.galerie.forEach(url => {
          code += \`    "\${url}",\\n\`;
        });
        code += '  ],\\n';
        code += '},\\n\\n';
      }

      document.getElementById('generated-code').textContent = code;
      document.getElementById('code-output').style.display = 'block';
      document.getElementById('code-output').scrollIntoView({ behavior: 'smooth' });
    }

    function copyCode() {
      const code = document.getElementById('generated-code').textContent;
      navigator.clipboard.writeText(code).then(() => {
        const btn = document.querySelector('.copy-btn');
        btn.textContent = '✅ Copié !';
        setTimeout(() => {
          btn.textContent = '📄 Copier le Code';
        }, 2000);
      });
    }
  </script>
</body>
</html>
`;

  fs.writeFileSync(htmlPath, htmlContent);
  console.log(`\n✅ HTML généré: ${htmlPath}`);
  console.log(`\n🌐 Ouvre ce fichier pour sélectionner tes images !`);

  // Ouvrir automatiquement
  require('child_process').exec(`open "${htmlPath}"`);
}

main().catch(console.error);

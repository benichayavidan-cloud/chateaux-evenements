#!/usr/bin/env node

/**
 * Script de traitement d'images pour SELECT CHATEAUX
 *
 * Fonctionnalités :
 * 1. Suppression watermark (crop bas de l'image)
 * 2. Renommage SEO-friendly : [lieu]-78-yvelines-[description].webp
 * 3. Optimisation WebP (qualité 85%, max 1920px)
 * 4. Génération ALT texts automatiques
 *
 * Usage: node scripts/crop-rename-images.js
 */

const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');
const readline = require('readline');

// Configuration
const CONFIG = {
  sourceDir: '/Users/avidanbenichay/Documents/Mes Projets d\'apps/Mes projets/SELECT CHATEAUX/SITE-WEB/IMAGES',
  outputDir: path.join(__dirname, '../public/images/chateaux-processed'),
  backupDir: path.join(__dirname, '../public/images/chateaux-backup'),

  // Paramètres de rognage (% à enlever en bas pour supprimer watermark)
  cropBottomPercent: 8, // Enlève 8% du bas de l'image

  // Paramètres d'optimisation
  webpQuality: 85,
  maxWidth: 1920,
  maxHeight: 1920,

  // Mapping des noms de dossiers vers noms SEO
  folderMapping: {
    'Abbaye des Veaux de cernay': 'abbaye-vaux-cernay-78-yvelines',
    'Chateau de Chantilly': 'chateau-chantilly-60-oise',
    'Manoir': 'manoir-anglo-normand-60-oise',
    'Palais Royal': 'palais-royal-foret-60-oise'
  }
};

// Interface readline pour interaction utilisateur
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (query) => new Promise((resolve) => rl.question(query, resolve));

// Fonction pour nettoyer un nom de fichier et générer une description
function generateDescription(filename) {
  // Retirer l'extension
  let desc = path.parse(filename).name;

  // Nettoyer les noms de fichiers aléatoires
  if (/^[a-z0-9]{20,}$/i.test(desc)) {
    return null; // Pas de description pour les noms aléatoires
  }

  // Nettoyer et formater
  desc = desc
    .toLowerCase()
    .replace(/[_\s]+/g, '-')
    .replace(/abbaye\s*-?\s*superior\s*room/i, 'chambre-superieure')
    .replace(/bathroom/i, 'salle-bain')
    .replace(/abbayedesvaux\s*de\s*cernay/i, '')
    .replace(/la\s*ferme/i, 'ferme')
    .replace(/salon\s*/i, 'salon-')
    .replace(/board/i, 'reunion')
    .replace(/\s*\(\d+\)/g, '') // Retirer (2), (3), etc.
    .replace(/^[-\s]+|[-\s]+$/g, '') // Trim tirets
    .replace(/-+/g, '-'); // Normaliser tirets multiples

  return desc || null;
}

// Détection intelligente du type de pièce/espace depuis l'image
const SPACE_KEYWORDS = {
  'salle-seminaire': ['board', 'meeting', 'conference', 'salon', 'reunion'],
  'chambre': ['room', 'bedroom', 'suite', 'superior'],
  'salle-bain': ['bathroom', 'bath', 'spa'],
  'restaurant': ['restaurant', 'dining', 'cuisine', 'gastronomie'],
  'exterieur': ['facade', 'garden', 'parc', 'terrasse', 'exterior'],
  'reception': ['reception', 'hall', 'lobby', 'entree'],
  'salle-fete': ['ballroom', 'gala', 'banquet']
};

function detectSpaceType(filename) {
  const lowerName = filename.toLowerCase();

  for (const [type, keywords] of Object.entries(SPACE_KEYWORDS)) {
    if (keywords.some(kw => lowerName.includes(kw))) {
      return type;
    }
  }

  return null;
}

// Traitement d'une image
async function processImage(inputPath, folderName, outputDir, index) {
  const filename = path.basename(inputPath);
  const ext = path.extname(filename);

  // Ignorer les fichiers non-images
  if (!['.jpg', '.jpeg', '.png'].includes(ext.toLowerCase())) {
    console.log(`   ⏭️  Ignoré (non-image): ${filename}`);
    return null;
  }

  console.log(`\n   📸 Traitement: ${filename}`);

  try {
    // Charger l'image pour obtenir ses dimensions
    const image = sharp(inputPath);
    const metadata = await image.metadata();

    console.log(`      Dimensions: ${metadata.width}x${metadata.height}px`);

    // Calculer la hauteur après crop (enlever X% du bas)
    const cropHeight = Math.floor(metadata.height * (100 - CONFIG.cropBottomPercent) / 100);

    // Générer la description depuis le nom de fichier
    let description = generateDescription(filename);

    // Si pas de description intelligente, demander à l'utilisateur
    if (!description) {
      const spaceType = detectSpaceType(filename);
      if (spaceType) {
        description = `${spaceType}-${String(index).padStart(2, '0')}`;
      } else {
        console.log(`\n      ❓ Nom de fichier: ${filename}`);
        description = await question(`      Entrez une description (ou Enter pour "photo-${String(index).padStart(2, '0')}"): `);
        description = description.trim() || `photo-${String(index).padStart(2, '0')}`;
      }
    }

    // Générer le nouveau nom
    const prefix = CONFIG.folderMapping[folderName] ||
                   folderName.toLowerCase().replace(/\s+/g, '-');

    const newFilename = `${prefix}-${description}.webp`;
    const outputPath = path.join(outputDir, newFilename);

    console.log(`      ✂️  Crop: ${metadata.height}px → ${cropHeight}px (enlève ${CONFIG.cropBottomPercent}% bas)`);
    console.log(`      📝 Nouveau nom: ${newFilename}`);

    // Traiter l'image : crop + resize + optimize + convert WebP
    await image
      .extract({
        left: 0,
        top: 0,
        width: metadata.width,
        height: cropHeight
      })
      .resize({
        width: CONFIG.maxWidth,
        height: CONFIG.maxHeight,
        fit: 'inside',
        withoutEnlargement: true
      })
      .webp({ quality: CONFIG.webpQuality })
      .toFile(outputPath);

    // Obtenir la taille du fichier final
    const stats = await fs.stat(outputPath);
    const sizeKB = Math.round(stats.size / 1024);

    console.log(`      ✅ Sauvegardé: ${sizeKB} KB`);

    // Générer ALT text SEO
    const altText = generateAltText(prefix, description);

    return {
      originalName: filename,
      newName: newFilename,
      description: description,
      altText: altText,
      size: sizeKB,
      path: outputPath
    };

  } catch (error) {
    console.error(`      ❌ Erreur: ${error.message}`);
    return null;
  }
}

// Génération ALT text SEO-friendly
function generateAltText(prefix, description) {
  const base = prefix.replace(/-/g, ' ');
  const desc = description.replace(/-/g, ' ');

  // Patterns SEO
  const patterns = {
    'salle seminaire': `Salle de séminaire à l'${base} - espace professionnel`,
    'chambre': `Chambre de prestige à l'${base} - hébergement luxe`,
    'salle bain': `Salle de bain de l'${base} - confort premium`,
    'restaurant': `Restaurant de l'${base} - gastronomie raffinée`,
    'exterieur': `Vue extérieure de l'${base} - architecture historique`,
    'facade': `Façade de l'${base} - château événementiel`,
    'reception': `Espace de réception à l'${base} - événements entreprise`,
    'default': `${desc} - ${base} - séminaire et événement entreprise`
  };

  for (const [keyword, template] of Object.entries(patterns)) {
    if (desc.includes(keyword)) {
      return template;
    }
  }

  return patterns.default;
}

// Traiter un dossier complet
async function processFolder(folderPath, folderName) {
  console.log(`\n📁 Dossier: ${folderName}`);
  console.log('─'.repeat(60));

  const files = await fs.readdir(folderPath);
  const imageFiles = files.filter(f =>
    ['.jpg', '.jpeg', '.png'].includes(path.extname(f).toLowerCase()) &&
    !f.startsWith('.')
  );

  console.log(`   ${imageFiles.length} images trouvées`);

  const results = [];
  let index = 1;

  for (const file of imageFiles) {
    const inputPath = path.join(folderPath, file);
    const result = await processImage(inputPath, folderName, CONFIG.outputDir, index);

    if (result) {
      results.push(result);
      index++;
    }
  }

  return results;
}

// Générer rapport JSON avec métadonnées
function generateMetadataReport(allResults) {
  const report = {
    generatedAt: new Date().toISOString(),
    totalImages: allResults.length,
    totalSizeKB: allResults.reduce((sum, r) => sum + r.size, 0),
    images: allResults.map(r => ({
      filename: r.newName,
      originalName: r.originalName,
      description: r.description,
      altText: r.altText,
      sizeKB: r.size,
      path: r.path
    }))
  };

  return report;
}

// Main
async function main() {
  console.log('╔═══════════════════════════════════════════════════════════╗');
  console.log('║  🏰 SELECT CHATEAUX - Traitement Images Automatisé       ║');
  console.log('╚═══════════════════════════════════════════════════════════╝\n');

  try {
    // Créer les dossiers de sortie
    await fs.mkdir(CONFIG.outputDir, { recursive: true });
    await fs.mkdir(CONFIG.backupDir, { recursive: true });

    console.log('📂 Configuration:');
    console.log(`   Source: ${CONFIG.sourceDir}`);
    console.log(`   Output: ${CONFIG.outputDir}`);
    console.log(`   Crop bas: ${CONFIG.cropBottomPercent}%`);
    console.log(`   Qualité WebP: ${CONFIG.webpQuality}`);
    console.log(`   Max dimensions: ${CONFIG.maxWidth}px\n`);

    // Confirmation utilisateur
    const confirm = await question('➡️  Continuer ? (o/n): ');
    if (confirm.toLowerCase() !== 'o') {
      console.log('❌ Annulé');
      rl.close();
      return;
    }

    // Lister les dossiers à traiter
    const entries = await fs.readdir(CONFIG.sourceDir, { withFileTypes: true });
    const folders = entries
      .filter(e => e.isDirectory() && !e.name.startsWith('.'))
      .map(e => e.name);

    console.log(`\n📂 ${folders.length} dossier(s) trouvé(s):`);
    folders.forEach((f, i) => console.log(`   ${i+1}. ${f}`));

    const allResults = [];

    // Traiter chaque dossier
    for (const folder of folders) {
      const folderPath = path.join(CONFIG.sourceDir, folder);
      const results = await processFolder(folderPath, folder);
      allResults.push(...results);
    }

    // Générer rapport
    console.log('\n' + '═'.repeat(60));
    console.log('📊 RAPPORT FINAL');
    console.log('═'.repeat(60));
    console.log(`✅ ${allResults.length} images traitées avec succès`);
    console.log(`📦 Taille totale: ${Math.round(allResults.reduce((s,r) => s+r.size, 0) / 1024)} MB`);
    console.log(`📁 Emplacement: ${CONFIG.outputDir}\n`);

    // Sauvegarder métadonnées JSON
    const metadata = generateMetadataReport(allResults);
    const metadataPath = path.join(CONFIG.outputDir, 'metadata.json');
    await fs.writeFile(metadataPath, JSON.stringify(metadata, null, 2));

    console.log(`💾 Métadonnées sauvegardées: ${metadataPath}\n`);

    // Afficher quelques exemples
    console.log('📝 Exemples de renommage:');
    allResults.slice(0, 5).forEach(r => {
      console.log(`   ${r.originalName}`);
      console.log(`   → ${r.newName}`);
      console.log(`   ALT: "${r.altText}"\n`);
    });

    rl.close();

  } catch (error) {
    console.error('\n❌ Erreur:', error.message);
    console.error(error.stack);
    rl.close();
    process.exit(1);
  }
}

// Exécution
if (require.main === module) {
  main();
}

module.exports = { processImage, generateAltText, generateDescription };

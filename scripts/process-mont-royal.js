#!/usr/bin/env node

/**
 * Script de traitement d'images pour Château Mont Royal
 * Crop 10%, conversion WebP, renommage SEO
 */

const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

// Configuration
const CONFIG = {
  sourceDir: '/Users/avidanbenichay/Documents/Mes Projets d\'apps/Mes projets/SELECT CHATEAUX/SITE-WEB/IMAGES/Chateau Mont Royal',
  folderPrefix: 'chateau-mont-royal-60-oise-chantilly',
  inPlace: true,

  cropBottomPercent: 10,
  webpQuality: 85,
  maxWidth: 1920,
  maxHeight: 1920,
};

// Détection du type d'espace
const SPACE_KEYWORDS = {
  'salle-seminaire': ['board', 'meeting', 'conference', 'salon', 'reunion', 'opera', 'piano'],
  'chambre': ['room', 'bedroom', 'suite', 'superior', 'deluxe', 'royale'],
  'salle-bain': ['bathroom', 'bath'],
  'restaurant': ['restaurant', 'dining', 'cuisine'],
  'exterieur': ['facade', 'garden', 'parc', 'terrasse', 'exterior', 'outside'],
  'reception': ['reception', 'hall', 'lobby', 'entree'],
  'salle-fete': ['ballroom', 'gala', 'banquet'],
  'piscine': ['pool', 'piscine', 'spa'],
  'bar': ['bar', 'lounge']
};

function detectSpaceType(filename) {
  const lowerName = filename.toLowerCase();

  for (const [type, keywords] of Object.entries(SPACE_KEYWORDS)) {
    if (keywords.some(kw => lowerName.includes(kw))) {
      return type;
    }
  }

  return 'espace';
}

// Générer description depuis nom de fichier
function generateDescription(filename, index) {
  const name = path.parse(filename).name.toLowerCase();

  // Si nom aléatoire (hash), utiliser détection automatique
  if (/^[a-z0-9]{20,}$/i.test(name)) {
    const spaceType = detectSpaceType(filename);
    return `${spaceType}-${String(index).padStart(2, '0')}`;
  }

  // Nettoyer le nom existant
  let desc = name
    .replace(/chateau\\s*mont\\s*royal/gi, '')
    .replace(/superior\\s*room/gi, 'chambre-superieure')
    .replace(/bathroom/gi, 'salle-bain')
    .replace(/board/gi, 'reunion')
    .replace(/salon\\s*/gi, 'salon-')
    .replace(/\\s*\\(\\d+\\)/g, '')
    .replace(/[_\\s]+/g, '-')
    .replace(/^[-]+|[-]+$/g, '')
    .replace(/-+/g, '-');

  return desc || `photo-${String(index).padStart(2, '0')}`;
}

// Générer ALT text SEO
function generateAltText(prefix, description) {
  const locationName = 'Château Mont Royal';
  const desc = description.replace(/-/g, ' ');

  const patterns = {
    'salle seminaire': `Salle de séminaire au ${locationName} - espace professionnel Chantilly`,
    'chambre': `Chambre de luxe au ${locationName} - hébergement séminaire Chantilly`,
    'salle bain': `Salle de bain au ${locationName} - confort premium`,
    'restaurant': `Restaurant du ${locationName} - gastronomie pour événements`,
    'exterieur': `Vue extérieure du ${locationName} - château événementiel Chantilly`,
    'facade': `Façade du ${locationName} - séminaire entreprise en château`,
    'reception': `Espace de réception au ${locationName} - événements d'entreprise`,
    'piscine': `Piscine du ${locationName} - détente et bien-être`,
    'bar': `Bar du ${locationName} - espace cocktail et networking`,
  };

  for (const [keyword, template] of Object.entries(patterns)) {
    if (desc.includes(keyword)) {
      return template;
    }
  }

  return `${desc} au ${locationName} - séminaire et événement entreprise Chantilly`;
}

// Traiter une image
async function processImage(inputPath, index) {
  const filename = path.basename(inputPath);
  const ext = path.extname(filename).toLowerCase();

  if (!['.jpg', '.jpeg', '.png', '.webp', '.avif'].includes(ext)) {
    return null;
  }

  console.log(`   📸 ${filename}`);

  try {
    const image = sharp(inputPath);
    const metadata = await image.metadata();

    const cropHeight = Math.floor(metadata.height * (100 - CONFIG.cropBottomPercent) / 100);
    const description = generateDescription(filename, index);

    const newFilename = `${CONFIG.folderPrefix}-${description}.webp`;
    const outputPath = path.join(CONFIG.sourceDir, newFilename);

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

    const stats = await fs.stat(outputPath);
    const sizeKB = Math.round(stats.size / 1024);

    const altText = generateAltText(CONFIG.folderPrefix, description);

    // Supprimer l'original
    await fs.unlink(inputPath);

    console.log(`      ✅ ${newFilename} (${sizeKB} KB) - original supprimé`);

    return {
      originalName: filename,
      newName: newFilename,
      description: description,
      altText: altText,
      size: sizeKB,
      dimensions: {
        original: `${metadata.width}x${metadata.height}`,
        cropped: `${metadata.width}x${cropHeight}`
      }
    };

  } catch (error) {
    console.error(`      ❌ Erreur: ${error.message}`);
    return null;
  }
}

// Main
async function main() {
  console.log('╔═══════════════════════════════════════════════════════════╗');
  console.log('║  🏰 Château Mont Royal - Traitement Images               ║');
  console.log('╚═══════════════════════════════════════════════════════════╝\\n');

  try {
    console.log('📂 Configuration:');
    console.log(`   Dossier: ${CONFIG.sourceDir}`);
    console.log(`   Préfixe: ${CONFIG.folderPrefix}`);
    console.log(`   Crop bas: ${CONFIG.cropBottomPercent}%`);
    console.log(`   Qualité WebP: ${CONFIG.webpQuality}\\n`);

    const files = await fs.readdir(CONFIG.sourceDir);
    const imageFiles = files
      .filter(f => ['.jpg', '.jpeg', '.png', '.webp', '.avif'].includes(path.extname(f).toLowerCase()))
      .filter(f => !f.startsWith('.'))
      .filter(f => !f.includes(CONFIG.folderPrefix)); // Skip already processed

    console.log(`📁 Château Mont Royal`);
    console.log('─'.repeat(60));
    console.log(`   ${imageFiles.length} images à traiter\\n`);

    const results = [];
    let index = 1;

    for (const file of imageFiles) {
      const inputPath = path.join(CONFIG.sourceDir, file);
      const result = await processImage(inputPath, index);

      if (result) {
        results.push(result);
        index++;
      }
    }

    console.log('\\n' + '═'.repeat(60));
    console.log('📊 RAPPORT FINAL');
    console.log('═'.repeat(60));
    console.log(`✅ ${results.length} images traitées`);
    console.log(`📦 Taille totale: ${Math.round(results.reduce((s,r) => s+r.size, 0) / 1024)} MB`);
    console.log(`🏰 Château Mont Royal - 60 Oise Chantilly\\n`);

    // Sauvegarder métadonnées
    const metadata = {
      generatedAt: new Date().toISOString(),
      chateau: 'Château Mont Royal',
      location: '60 Oise - Chantilly',
      totalImages: results.length,
      totalSizeKB: results.reduce((sum, r) => sum + r.size, 0),
      images: results
    };

    const metadataPath = path.join(CONFIG.sourceDir, 'metadata-mont-royal.json');
    await fs.writeFile(metadataPath, JSON.stringify(metadata, null, 2));

    console.log(`💾 Métadonnées: metadata-mont-royal.json\\n`);

  } catch (error) {
    console.error('\\n❌ Erreur:', error);
    process.exit(1);
  }
}

main();

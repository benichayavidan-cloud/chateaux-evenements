#!/usr/bin/env node

/**
 * Script AUTOMATISÉ de traitement d'images pour SELECT CHATEAUX
 * Version sans interaction utilisateur
 */

const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

// Configuration
const CONFIG = {
  sourceDir: '/Users/avidanbenichay/Documents/Mes Projets d\'apps/Mes projets/SELECT CHATEAUX/SITE-WEB/IMAGES',
  inPlace: true, // Traiter dans le même dossier et supprimer originaux

  cropBottomPercent: 10,
  webpQuality: 85,
  maxWidth: 1920,
  maxHeight: 1920,

  folderMapping: {
    'Abbaye des Veaux de cernay': 'abbaye-vaux-cernay-78-yvelines',
    'Chateau de Chantilly': 'chateau-chantilly-60-oise',
    'Chateau de Montvillargene': 'chateau-montvillargene-60-oise',
    'Chateau Mont Royal': 'chateau-mont-royal-60-oise-chantilly',
    'Domaine Reine Margot': 'domaine-reine-margot-92-hauts-de-seine',
    'Manoir': 'manoir-anglo-normand-60-oise',
    'Palais Royal': 'palais-royal-foret-60-oise'
  }
};

// Détection du type d'espace
const SPACE_KEYWORDS = {
  'salle-seminaire': ['board', 'meeting', 'conference', 'salon', 'reunion'],
  'chambre': ['room', 'bedroom', 'suite', 'superior', 'deluxe'],
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
    .replace(/abbaye\s*des\s*vaux\s*de\s*cernay/gi, '')
    .replace(/la\s*ferme/gi, 'ferme')
    .replace(/superior\s*room/gi, 'chambre-superieure')
    .replace(/bathroom/gi, 'salle-bain')
    .replace(/board/gi, 'reunion')
    .replace(/salon\s*/gi, 'salon-')
    .replace(/\s*\(\d+\)/g, '')
    .replace(/[_\s]+/g, '-')
    .replace(/^[-]+|[-]+$/g, '')
    .replace(/-+/g, '-');

  return desc || `photo-${String(index).padStart(2, '0')}`;
}

// Générer ALT text SEO
function generateAltText(prefix, description) {
  const locationName = prefix.includes('abbaye') ? 'Abbaye des Vaux de Cernay' :
                        prefix.includes('chantilly') ? 'Château de Chantilly' :
                        prefix.includes('manoir') ? 'Manoir Anglo-Normand' :
                        prefix.includes('palais') ? 'Palais Royal de la Forêt' :
                        'Château';

  const desc = description.replace(/-/g, ' ');

  const patterns = {
    'salle seminaire': `Salle de séminaire au ${locationName} - espace professionnel en Île-de-France`,
    'chambre': `Chambre de luxe au ${locationName} - hébergement séminaire résidentiel`,
    'salle bain': `Salle de bain au ${locationName} - confort premium`,
    'restaurant': `Restaurant du ${locationName} - gastronomie pour événements`,
    'exterieur': `Vue extérieure du ${locationName} - château événementiel`,
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

  return `${desc} au ${locationName} - séminaire et événement entreprise`;
}

// Traiter une image
async function processImage(inputPath, folderName, folderPath, index) {
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

    const prefix = CONFIG.folderMapping[folderName] ||
                   folderName.toLowerCase().replace(/\s+/g, '-');

    const newFilename = `${prefix}-${description}.webp`;
    const outputPath = path.join(folderPath, newFilename);

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

    const altText = generateAltText(prefix, description);

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

// Traiter un dossier
async function processFolder(folderPath, folderName) {
  console.log(`\n📁 ${folderName}`);
  console.log('─'.repeat(60));

  const files = await fs.readdir(folderPath);
  const imageFiles = files
    .filter(f => ['.jpg', '.jpeg', '.png', '.webp', '.avif'].includes(path.extname(f).toLowerCase()))
    .filter(f => !f.startsWith('.'));

  console.log(`   ${imageFiles.length} images trouvées\n`);

  const results = [];
  let index = 1;

  for (const file of imageFiles) {
    const inputPath = path.join(folderPath, file);
    const result = await processImage(inputPath, folderName, folderPath, index);

    if (result) {
      results.push(result);
      index++;
    }
  }

  return results;
}

// Main
async function main() {
  console.log('╔═══════════════════════════════════════════════════════════╗');
  console.log('║  🏰 SELECT CHATEAUX - Traitement Images Automatisé       ║');
  console.log('╚═══════════════════════════════════════════════════════════╝\n');

  try {
    console.log('📂 Configuration:');
    console.log(`   Dossier: ${CONFIG.sourceDir}`);
    console.log(`   Mode: In-place (remplace les originaux)`);
    console.log(`   Crop bas: ${CONFIG.cropBottomPercent}%`);
    console.log(`   Qualité WebP: ${CONFIG.webpQuality}\n`);

    const entries = await fs.readdir(CONFIG.sourceDir, { withFileTypes: true });
    const folders = entries
      .filter(e => e.isDirectory() && !e.name.startsWith('.'))
      .map(e => e.name);

    const allResults = [];

    for (const folder of folders) {
      const folderPath = path.join(CONFIG.sourceDir, folder);
      const results = await processFolder(folderPath, folder);
      allResults.push(...results);
    }

    console.log('\n' + '═'.repeat(60));
    console.log('📊 RAPPORT FINAL');
    console.log('═'.repeat(60));
    console.log(`✅ ${allResults.length} images traitées (originaux supprimés)`);
    console.log(`📦 Taille totale: ${Math.round(allResults.reduce((s,r) => s+r.size, 0) / 1024)} MB`);
    console.log(`📁 Dossier: ${CONFIG.sourceDir}\n`);

    // Sauvegarder métadonnées dans le dossier source
    const metadata = {
      generatedAt: new Date().toISOString(),
      totalImages: allResults.length,
      totalSizeKB: allResults.reduce((sum, r) => sum + r.size, 0),
      images: allResults
    };

    const metadataPath = path.join(CONFIG.sourceDir, 'metadata.json');
    await fs.writeFile(metadataPath, JSON.stringify(metadata, null, 2));

    console.log(`💾 Métadonnées: ${metadataPath}\n`);

    console.log('📝 Exemples ALT texts générés:\n');
    allResults.slice(0, 5).forEach(r => {
      console.log(`   ${r.newName}`);
      console.log(`   "${r.altText}"\n`);
    });

  } catch (error) {
    console.error('\n❌ Erreur:', error);
    process.exit(1);
  }
}

main();

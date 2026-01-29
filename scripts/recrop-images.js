#!/usr/bin/env node

/**
 * Script pour re-rogner les images WebP existantes
 * Ajoute 3% de crop supplémentaire en bas (total = 11%)
 */

const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

const CONFIG = {
  sourceDir: '/Users/avidanbenichay/Documents/Mes Projets d\'apps/Mes projets/SELECT CHATEAUX/SITE-WEB/IMAGES',
  cropBottomPercent: 3,
  webpQuality: 85
};

async function recropImage(filePath) {
  const filename = path.basename(filePath);

  console.log(`   📸 ${filename}`);

  try {
    const image = sharp(filePath);
    const metadata = await image.metadata();

    // Rogner 3% de plus en bas
    const cropHeight = Math.floor(metadata.height * (100 - CONFIG.cropBottomPercent) / 100);

    // Créer fichier temporaire
    const tempPath = filePath + '.tmp';

    await image
      .extract({
        left: 0,
        top: 0,
        width: metadata.width,
        height: cropHeight
      })
      .webp({ quality: CONFIG.webpQuality })
      .toFile(tempPath);

    // Remplacer l'original
    await fs.unlink(filePath);
    await fs.rename(tempPath, filePath);

    const stats = await fs.stat(filePath);
    const sizeKB = Math.round(stats.size / 1024);

    console.log(`      ✅ Rogné: ${metadata.height}px → ${cropHeight}px (${sizeKB} KB)`);

    return true;

  } catch (error) {
    console.error(`      ❌ Erreur: ${error.message}`);
    return false;
  }
}

async function processFolder(folderPath, folderName) {
  console.log(`\n📁 ${folderName}`);
  console.log('─'.repeat(60));

  const files = await fs.readdir(folderPath);
  const webpFiles = files.filter(f => f.endsWith('.webp'));

  console.log(`   ${webpFiles.length} images WebP trouvées\n`);

  let successCount = 0;

  for (const file of webpFiles) {
    const filePath = path.join(folderPath, file);
    const success = await recropImage(filePath);
    if (success) successCount++;
  }

  return successCount;
}

async function main() {
  console.log('╔═══════════════════════════════════════════════════════════╗');
  console.log('║  🏰 Re-Crop Images - Suppression Watermark Final         ║');
  console.log('╚═══════════════════════════════════════════════════════════╝\n');

  console.log('📂 Configuration:');
  console.log(`   Dossier: ${CONFIG.sourceDir}`);
  console.log(`   Crop supplémentaire: ${CONFIG.cropBottomPercent}% (total = 11%)\n`);

  try {
    const entries = await fs.readdir(CONFIG.sourceDir, { withFileTypes: true });
    const folders = entries
      .filter(e => e.isDirectory() && !e.name.startsWith('.'))
      .map(e => e.name);

    let totalProcessed = 0;

    for (const folder of folders) {
      const folderPath = path.join(CONFIG.sourceDir, folder);
      const count = await processFolder(folderPath, folder);
      totalProcessed += count;
    }

    console.log('\n' + '═'.repeat(60));
    console.log('📊 RAPPORT FINAL');
    console.log('═'.repeat(60));
    console.log(`✅ ${totalProcessed} images re-rognées avec succès`);
    console.log(`📁 Watermark définitivement supprimé\n`);

  } catch (error) {
    console.error('\n❌ Erreur:', error);
    process.exit(1);
  }
}

main();

#!/usr/bin/env node

/**
 * Script de renommage SEO professionnel
 * Renomme toutes les images avec des noms descriptifs optimisés
 */

const fs = require('fs').promises;
const path = require('path');

const IMAGES_DIR = '/Users/avidanbenichay/Documents/Mes Projets d\'apps/Mes projets/SELECT CHATEAUX/SITE-WEB/IMAGES';
const MAPPING_FILE = path.join(__dirname, 'rename-images-seo.json');

async function main() {
  console.log('╔═══════════════════════════════════════════════════════════╗');
  console.log('║  🏰 Renommage SEO Professionnel - 53 Images              ║');
  console.log('╚═══════════════════════════════════════════════════════════╝\n');

  try {
    // Charger le mapping
    const mapping = JSON.parse(await fs.readFile(MAPPING_FILE, 'utf8'));

    let totalRenamed = 0;

    // Traiter chaque château
    for (const [folderKey, renames] of Object.entries(mapping)) {
      const folderName = folderKey.includes('abbaye')
        ? 'Abbaye des Veaux de cernay'
        : 'Chateau de Montvillargene';

      const folderPath = path.join(IMAGES_DIR, folderName);

      console.log(`\n📁 ${folderName}`);
      console.log('─'.repeat(60));

      for (const [oldName, newName] of Object.entries(renames)) {
        // Skip si déjà le bon nom
        if (oldName === newName) {
          console.log(`   ⏭️  ${newName} (déjà correct)`);
          continue;
        }

        const oldPath = path.join(folderPath, oldName);
        const newPath = path.join(folderPath, newName);

        try {
          // Vérifier que le fichier existe
          await fs.access(oldPath);

          // Renommer
          await fs.rename(oldPath, newPath);

          console.log(`   ✅ ${oldName}`);
          console.log(`      → ${newName}`);

          totalRenamed++;
        } catch (error) {
          if (error.code === 'ENOENT') {
            console.log(`   ⚠️  ${oldName} (fichier introuvable)`);
          } else {
            console.error(`   ❌ Erreur: ${error.message}`);
          }
        }
      }
    }

    console.log('\n' + '═'.repeat(60));
    console.log('📊 RÉSULTAT FINAL');
    console.log('═'.repeat(60));
    console.log(`✅ ${totalRenamed} images renommées avec succès`);
    console.log(`📁 Noms SEO professionnels appliqués\n`);

  } catch (error) {
    console.error('\n❌ Erreur:', error);
    process.exit(1);
  }
}

main();

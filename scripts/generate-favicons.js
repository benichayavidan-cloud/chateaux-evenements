const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const svgPath = path.join(__dirname, '../public/icon.svg');
const publicDir = path.join(__dirname, '../public');

async function generateFavicons() {
  const svgBuffer = fs.readFileSync(svgPath);

  const sizes = [
    { name: 'favicon-16.png', size: 16 },
    { name: 'favicon-32.png', size: 32 },
    { name: 'favicon-48.png', size: 48 },
    { name: 'icon.png', size: 192 },
    { name: 'apple-icon.png', size: 180 },
  ];

  console.log('🎨 Génération des favicons à partir de icon.svg...\n');

  for (const { name, size } of sizes) {
    const outputPath = path.join(publicDir, name);

    await sharp(svgBuffer)
      .resize(size, size)
      .png()
      .toFile(outputPath);

    console.log(`✅ ${name} (${size}x${size})`);
  }

  console.log('\n✨ Tous les favicons ont été générés avec succès !');
}

generateFavicons().catch(err => {
  console.error('❌ Erreur lors de la génération des favicons:', err);
  process.exit(1);
});

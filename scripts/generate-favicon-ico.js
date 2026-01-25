const pngToIco = require('png-to-ico').default || require('png-to-ico');
const fs = require('fs');
const path = require('path');

async function generateIco() {
  const publicDir = path.join(__dirname, '../public');
  const png16 = path.join(publicDir, 'favicon-16.png');
  const png32 = path.join(publicDir, 'favicon-32.png');
  const icoPath = path.join(publicDir, 'favicon.ico');

  console.log('🎨 Génération de favicon.ico...\n');

  try {
    const buf = await pngToIco([png16, png32]);
    fs.writeFileSync(icoPath, buf);
    console.log('✅ favicon.ico généré avec succès !');
  } catch (err) {
    console.error('❌ Erreur:', err);
    process.exit(1);
  }
}

generateIco();

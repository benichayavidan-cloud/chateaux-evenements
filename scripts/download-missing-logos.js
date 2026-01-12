const https = require('https');
const fs = require('fs');
const path = require('path');

// Logos de remplacement (entreprises françaises prestigieuses)
const logoSources = {
  'bnp-paribas': 'https://cdn.worldvectorlogo.com/logos/bnp-paribas.svg',
  'totalenergies': 'https://cdn.worldvectorlogo.com/logos/totalenergies.svg',
  'lvmh': 'https://cdn.worldvectorlogo.com/logos/lvmh.svg',
  'carrefour': 'https://cdn.worldvectorlogo.com/logos/carrefour.svg',
  'danone': 'https://cdn.worldvectorlogo.com/logos/danone.svg',
  'veolia': 'https://cdn.worldvectorlogo.com/logos/veolia.svg'
};

const outputDir = path.join(__dirname, '../public/logos');

function downloadFile(url, filename) {
  return new Promise((resolve, reject) => {
    const outputPath = path.join(outputDir, filename);
    const file = fs.createWriteStream(outputPath);

    const request = https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
      }
    }, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302 || response.statusCode === 307 || response.statusCode === 308) {
        file.close();
        fs.unlinkSync(outputPath);
        return downloadFile(response.headers.location, filename)
          .then(resolve)
          .catch(reject);
      }

      if (response.statusCode !== 200) {
        file.close();
        if (fs.existsSync(outputPath)) fs.unlinkSync(outputPath);
        reject(new Error(`Failed to download ${filename}: ${response.statusCode}`));
        return;
      }

      response.pipe(file);

      file.on('finish', () => {
        file.close();
        console.log(`✅ ${filename} téléchargé`);
        resolve();
      });
    });

    request.on('error', (err) => {
      if (fs.existsSync(outputPath)) fs.unlinkSync(outputPath);
      reject(err);
    });

    file.on('error', (err) => {
      if (fs.existsSync(outputPath)) fs.unlinkSync(outputPath);
      reject(err);
    });
  });
}

async function downloadAll() {
  console.log('🚀 Téléchargement des logos de remplacement...\n');

  for (const [name, url] of Object.entries(logoSources)) {
    try {
      await downloadFile(url, `${name}.svg`);
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error(`❌ Erreur pour ${name}:`, error.message);
    }
  }

  console.log('\n✨ Terminé !');
}

downloadAll().catch(console.error);

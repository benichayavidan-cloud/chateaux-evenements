const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

// URLs des logos officiels depuis CDN vectorlogo.zone (meilleure source)
const logoSources = {
  'microsoft': 'https://cdn.worldvectorlogo.com/logos/microsoft-5.svg',
  'google': 'https://cdn.worldvectorlogo.com/logos/google-2015.svg',
  'amazon': 'https://cdn.worldvectorlogo.com/logos/amazon-1.svg',
  'apple': 'https://cdn.worldvectorlogo.com/logos/apple-11.svg',
  'bmw': 'https://cdn.worldvectorlogo.com/logos/bmw.svg',
  'mercedes-benz': 'https://cdn.worldvectorlogo.com/logos/mercedes-benz-6.svg',
  'airfrance': 'https://cdn.worldvectorlogo.com/logos/air-france-4.svg',
  'airbus': 'https://cdn.worldvectorlogo.com/logos/airbus-2.svg',
  'loreal': 'https://cdn.worldvectorlogo.com/logos/l-oreal-2.svg',
  'accor': 'https://cdn.worldvectorlogo.com/logos/accor.svg',
  'orange': 'https://cdn.worldvectorlogo.com/logos/orange-1.svg',
  'renault': 'https://cdn.worldvectorlogo.com/logos/renault-7.svg'
};

const outputDir = path.join(__dirname, '../public/logos');

// Créer le dossier si nécessaire
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

function downloadFile(url, filename) {
  return new Promise((resolve, reject) => {
    const outputPath = path.join(outputDir, filename);
    const file = fs.createWriteStream(outputPath);

    const protocol = url.startsWith('https') ? https : http;

    const request = protocol.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
      }
    }, (response) => {
      // Suivre les redirections
      if (response.statusCode === 301 || response.statusCode === 302 || response.statusCode === 307 || response.statusCode === 308) {
        file.close();
        fs.unlinkSync(outputPath);
        return downloadFile(response.headers.location, filename)
          .then(resolve)
          .catch(reject);
      }

      if (response.statusCode !== 200) {
        file.close();
        fs.unlinkSync(outputPath);
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
      if (fs.existsSync(outputPath)) {
        fs.unlinkSync(outputPath);
      }
      reject(err);
    });

    file.on('error', (err) => {
      if (fs.existsSync(outputPath)) {
        fs.unlinkSync(outputPath);
      }
      reject(err);
    });
  });
}

async function downloadAllLogos() {
  console.log('🚀 Début du téléchargement des logos depuis WorldVectorLogo...\n');

  for (const [name, url] of Object.entries(logoSources)) {
    try {
      await downloadFile(url, `${name}.svg`);
      // Petit délai pour ne pas surcharger les serveurs
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error(`❌ Erreur pour ${name}:`, error.message);
    }
  }

  console.log('\n✨ Téléchargement terminé !');
  console.log(`📁 Logos sauvegardés dans: ${outputDir}`);
  console.log('\n💡 Ces logos sont les VRAIS logos officiels avec les vraies couleurs !');
}

downloadAllLogos().catch(console.error);

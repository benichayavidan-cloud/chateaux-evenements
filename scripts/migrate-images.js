const { createClient } = require('@supabase/supabase-js');
const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Mapping des dossiers sources vers les slugs
const DOSSIERS = {
  'Montvillargene 60': 'chantilly',
  'Domaine Reine Margot 92': 'hauts-de-seine',
  'Abbaye des veaux de Cernay 78': 'chevreuse'
};

const BASE_PATH = '/Users/avidanbenichay/Documents/Mes Projets d\'apps/site-moderne-expert/Image site';

async function convertToWebP(inputPath, outputPath, quality = 85) {
  await sharp(inputPath)
    .webp({ quality })
    .toFile(outputPath);
}

async function uploadToSupabase(filePath, storagePath) {
  const fileBuffer = await fs.readFile(filePath);

  const { data, error } = await supabase.storage
    .from('chateaux-images')
    .upload(storagePath, fileBuffer, {
      contentType: 'image/webp',
      cacheControl: '31536000', // 1 an
      upsert: true
    });

  if (error) throw error;
  return data;
}

async function processImages() {
  console.log('🚀 Début de la migration des images...\n');

  const results = {
    converted: 0,
    uploaded: 0,
    errors: []
  };

  for (const [folderName, slug] of Object.entries(DOSSIERS)) {
    const sourcePath = path.join(BASE_PATH, folderName);
    console.log(`\n📁 Traitement: ${folderName} → ${slug}`);

    try {
      const files = await fs.readdir(sourcePath);
      const imageFiles = files.filter(f => /\.(png|jpg|jpeg|avif)$/i.test(f));

      console.log(`   Images trouvées: ${imageFiles.length}`);

      for (let i = 0; i < imageFiles.length; i++) {
        const file = imageFiles[i];
        const inputPath = path.join(sourcePath, file);

        // Créer un nom simplifié
        const baseName = path.parse(file).name;
        const outputFileName = `${slug}-${i + 1}.webp`;
        const tempOutputPath = path.join('/tmp', outputFileName);
        const storagePath = `${slug}/${outputFileName}`;

        try {
          // Conversion WebP
          await convertToWebP(inputPath, tempOutputPath);
          results.converted++;

          // Upload Supabase
          await uploadToSupabase(tempOutputPath, storagePath);
          results.uploaded++;

          // Nettoyer le fichier temp
          await fs.unlink(tempOutputPath);

          console.log(`   ✅ ${outputFileName}`);
        } catch (err) {
          console.error(`   ❌ Erreur ${file}:`, err.message);
          results.errors.push({ file, error: err.message });
        }
      }
    } catch (err) {
      console.error(`❌ Erreur dossier ${folderName}:`, err.message);
      results.errors.push({ folder: folderName, error: err.message });
    }
  }

  console.log('\n\n📊 RÉSUMÉ:');
  console.log(`✅ Images converties: ${results.converted}`);
  console.log(`✅ Images uploadées: ${results.uploaded}`);
  console.log(`❌ Erreurs: ${results.errors.length}`);

  if (results.errors.length > 0) {
    console.log('\n⚠️  Détails des erreurs:');
    results.errors.forEach(e => console.log('   -', e));
  }

  // Générer le mapping des URLs
  console.log('\n📦 Génération du mapping des URLs...');
  const urlMapping = {};

  for (const [_, slug] of Object.entries(DOSSIERS)) {
    const { data, error } = await supabase.storage
      .from('chateaux-images')
      .list(slug);

    if (!error && data) {
      urlMapping[slug] = data.map(file => ({
        name: file.name,
        url: `${supabaseUrl}/storage/v1/object/public/chateaux-images/${slug}/${file.name}`
      }));
    }
  }

  // Sauvegarder le mapping
  await fs.writeFile(
    path.join(__dirname, 'image-urls.json'),
    JSON.stringify(urlMapping, null, 2)
  );

  console.log('✅ URLs sauvegardées dans scripts/image-urls.json');
}

processImages()
  .then(() => {
    console.log('\n🎉 Migration terminée avec succès !');
    process.exit(0);
  })
  .catch(err => {
    console.error('\n💥 Erreur fatale:', err);
    process.exit(1);
  });

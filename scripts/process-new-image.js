const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: path.join(__dirname, '../.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function processImage() {
  const inputPath = '/Users/avidanbenichay/Downloads/Gemini_Generated_Image_oxv1duoxv1duoxv1.png';
  const outputDir = '/Users/avidanbenichay/Desktop/image selectchateaux/Chateau de Montvillargenne (60)';
  const newFileName = 'manoir-anglo-normand-chantilly-oise-60-facade-terrasse-pierre-cocktail-reception.webp';
  const outputPath = path.join(outputDir, newFileName);

  console.log('📸 Traitement de l\'image...');

  // 1. Lire les dimensions
  const metadata = await sharp(inputPath).metadata();
  console.log(`📐 Dimensions originales: ${metadata.width}x${metadata.height}`);

  // 2. Rogner le bas (watermark) et convertir en WebP
  const croppedHeight = metadata.height - 80; // Enlever 80px en bas

  const webpBuffer = await sharp(inputPath)
    .extract({ left: 0, top: 0, width: metadata.width, height: croppedHeight })
    .resize({ width: 1920, withoutEnlargement: true })
    .webp({ quality: 85 })
    .toBuffer();

  console.log(`✂️  Image rognée: ${metadata.width}x${croppedHeight}`);

  // 3. Sauvegarder localement
  fs.writeFileSync(outputPath, webpBuffer);
  console.log(`✅ Sauvegardée localement: ${outputPath}`);

  // 4. Upload sur Supabase
  console.log('📤 Upload sur Supabase...');
  const filePath = `chantilly/${newFileName}`;

  const { data, error } = await supabase.storage
    .from('chateaux-images')
    .upload(filePath, webpBuffer, {
      contentType: 'image/webp',
      upsert: true
    });

  if (error) {
    console.error('❌ Erreur upload:', error.message);
    return;
  }

  const { data: urlData } = supabase.storage
    .from('chateaux-images')
    .getPublicUrl(filePath);

  console.log('✅ Upload Supabase réussi !');
  console.log(`🔗 URL: ${urlData.publicUrl}`);

  // 5. Mettre à jour le fichier de mapping
  const mappingPath = path.join(__dirname, 'uploaded-images.json');
  const mapping = JSON.parse(fs.readFileSync(mappingPath, 'utf-8'));

  mapping.chantilly.push({
    name: newFileName,
    url: urlData.publicUrl,
    description: 'Façade terrasse pierre cocktail réception'
  });

  fs.writeFileSync(mappingPath, JSON.stringify(mapping, null, 2));
  console.log('📄 Mapping mis à jour');

  console.log('\n🎉 TERMINÉ !');
  console.log(`🏰 L'image est maintenant disponible pour Chantilly`);
  console.log(`📁 Fichier local: ${newFileName}`);
  console.log(`🌐 URL Supabase: ${urlData.publicUrl}`);
}

processImage().catch(console.error);

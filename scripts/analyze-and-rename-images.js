#!/usr/bin/env node

/**
 * 🔍 ANALYSE ET RENOMMAGE SEO DES IMAGES
 *
 * Ce script :
 * 1. Lit chaque image uploadée sur Supabase
 * 2. Analyse le contenu avec Claude Vision
 * 3. Génère un nom SEO optimisé
 * 4. Renomme et ré-uploade l'image
 */

const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');
const Anthropic = require('@anthropic-ai/sdk');
require('dotenv').config({ path: path.join(__dirname, '../.env.local') });

// Configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || 'YOUR_KEY_HERE'
});

const BASE_IMAGE_DIR = path.join(process.env.HOME, 'Desktop', 'image selectchateaux');

const CHATEAUX_CONFIG = {
  'chantilly': {
    localDir: 'Chateau de Montvillargenne (60)',
    bucketFolder: 'chantilly',
    prefix: 'manoir-anglo-normand-chantilly-oise-60',
    name: 'Manoir Anglo-Normand Chantilly',
    location: 'Oise (60)'
  },
  'hauts-de-seine': {
    localDir: 'MGallery Domaine de la Reine Margot (92)',
    bucketFolder: 'hauts-de-seine',
    prefix: 'hotel-historique-paris-hauts-de-seine-92',
    name: 'Hôtel Historique Paris',
    location: 'Hauts-de-Seine (92)'
  },
  'chevreuse': {
    localDir: 'Abbaye des Vaux de Cernay (78)',
    bucketFolder: 'chevreuse',
    prefix: 'abbaye-vaux-cernay-chevreuse-yvelines-78',
    name: 'Abbaye Vaux de Cernay',
    location: 'Yvelines (78)'
  }
};

/**
 * Analyser une image avec Claude Vision
 */
async function analyzeImage(imagePath, chateauName) {
  console.log(`🔍 Analyse de l'image...`);

  const imageBuffer = await fs.promises.readFile(imagePath);
  const base64Image = imageBuffer.toString('base64');

  try {
    const message = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 200,
      messages: [{
        role: 'user',
        content: [
          {
            type: 'image',
            source: {
              type: 'base64',
              media_type: 'image/jpeg',
              data: base64Image,
            },
          },
          {
            type: 'text',
            text: `Cette photo est du ${chateauName}.

Décris en 3-4 mots ce qu'on voit dans cette image pour créer un nom de fichier SEO.

Exemples de descriptions valides :
- "facade-principale-jour"
- "salle-reception-lustres"
- "chambre-luxe-lit-baldaquin"
- "piscine-exterieure-jardin"
- "restaurant-gastronomique-tables"
- "parc-arbres-allee"
- "salon-cheminee-fauteuils"
- "salle-reunion-moderne"

Réponds UNIQUEMENT avec la description en minuscules, mots séparés par des tirets, sans article, maximum 4 mots.`
          }
        ]
      }]
    });

    const description = message.content[0].text.trim().toLowerCase();

    // Nettoyer la description
    return description
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .substring(0, 60);

  } catch (error) {
    console.error('❌ Erreur analyse:', error.message);
    return 'photo-chateau';
  }
}

/**
 * Renommer et uploader une image
 */
async function renameAndUpload(slug, imageIndex, localPath) {
  const config = CHATEAUX_CONFIG[slug];

  console.log(`\n📸 Image ${imageIndex + 1}:`);

  // Analyser l'image
  const description = await analyzeImage(localPath, config.name);

  // Générer le nouveau nom
  const newFileName = `${config.prefix}-${description}.webp`;

  console.log(`✏️  Nouveau nom: ${newFileName}`);

  // Convertir en WebP si nécessaire
  const sharp = require('sharp');
  const imageBuffer = await fs.promises.readFile(localPath);
  const webpBuffer = await sharp(imageBuffer)
    .webp({ quality: 85 })
    .toBuffer();

  // Upload sur Supabase
  const filePath = `${config.bucketFolder}/${newFileName}`;

  const { data, error } = await supabase
    .storage
    .from('chateaux-images')
    .upload(filePath, webpBuffer, {
      contentType: 'image/webp',
      upsert: true
    });

  if (error) {
    console.error(`❌ Erreur upload:`, error.message);
    return null;
  }

  const { data: urlData } = supabase
    .storage
    .from('chateaux-images')
    .getPublicUrl(filePath);

  console.log(`✅ URL: ${urlData.publicUrl}`);

  return {
    name: newFileName,
    url: urlData.publicUrl,
    description: description
  };
}

/**
 * Traiter un château
 */
async function processChateauImages(slug) {
  const config = CHATEAUX_CONFIG[slug];
  const localDir = path.join(BASE_IMAGE_DIR, config.localDir);

  console.log(`\n${'='.repeat(60)}`);
  console.log(`🏰 ${config.name} - ${config.location}`);
  console.log(`${'='.repeat(60)}`);

  if (!fs.existsSync(localDir)) {
    console.error(`❌ Dossier introuvable: ${localDir}`);
    return [];
  }

  const files = fs.readdirSync(localDir)
    .filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f))
    .sort();

  console.log(`📁 ${files.length} images à traiter`);

  const processedImages = [];

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const imagePath = path.join(localDir, file);

    try {
      const result = await renameAndUpload(slug, i, imagePath);
      if (result) {
        processedImages.push(result);
      }
    } catch (error) {
      console.error(`❌ Erreur ${file}:`, error.message);
    }

    // Pause pour éviter rate limit
    await new Promise(resolve => setTimeout(resolve, 2000));
  }

  return processedImages;
}

/**
 * Mettre à jour l'HTML de sélection
 */
function updateHTML(allImagesData) {
  const htmlPath = path.join(__dirname, 'image-selector-updated.html');
  const imageDataJSON = JSON.stringify(allImagesData, null, 2);

  let htmlContent = fs.readFileSync(
    path.join(__dirname, 'image-selector.html'),
    'utf-8'
  );

  htmlContent = htmlContent.replace(
    /const imageData = \{[\s\S]*?\};/,
    `const imageData = ${imageDataJSON};`
  );

  fs.writeFileSync(htmlPath, htmlContent);

  console.log(`\n✅ HTML mis à jour: ${htmlPath}`);
}

/**
 * Sauvegarder le mapping des images
 */
function saveImageMapping(allImagesData) {
  const mappingPath = path.join(__dirname, 'images-mapping.json');
  fs.writeFileSync(mappingPath, JSON.stringify(allImagesData, null, 2));
  console.log(`📄 Mapping sauvegardé: ${mappingPath}`);
}

/**
 * Main
 */
async function main() {
  console.log('🚀 ANALYSE ET RENOMMAGE SEO DES IMAGES\n');

  // Vérifier les dépendances
  try {
    require('sharp');
    require('@anthropic-ai/sdk');
  } catch (e) {
    console.log('📦 Installation des dépendances...');
    require('child_process').execSync('npm install sharp @anthropic-ai/sdk', { stdio: 'inherit' });
  }

  const allImagesData = {};

  // Traiter chaque château
  for (const slug of Object.keys(CHATEAUX_CONFIG)) {
    const images = await processChateauImages(slug);
    allImagesData[slug] = images;
  }

  // Sauvegarder et générer HTML
  saveImageMapping(allImagesData);
  updateHTML(allImagesData);

  console.log('\n' + '='.repeat(60));
  console.log('✅ TERMINÉ !');
  console.log('='.repeat(60));
  console.log('\n📋 RÉSUMÉ:');
  for (const [slug, images] of Object.entries(allImagesData)) {
    console.log(`  ${CHATEAUX_CONFIG[slug].name}: ${images.length} images renommées`);
  }
  console.log('\n🎨 Ouvre image-selector-updated.html pour sélectionner les emplacements !');

  // Ouvrir l'HTML
  require('child_process').exec(`open "${path.join(__dirname, 'image-selector-updated.html')}"`);
}

main().catch(console.error);

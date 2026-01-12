#!/usr/bin/env node

/**
 * 🏰 OUTIL DE GESTION D'IMAGES - STYLE WIX
 *
 * Ce script vous permet de :
 * 1. Uploader vos images locales sur Supabase
 * 2. Les renommer automatiquement (chantilly-1.webp, etc.)
 * 3. Générer un HTML pour choisir visuellement les emplacements
 * 4. Mettre à jour automatiquement chateaux.ts
 */

const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: path.join(__dirname, '../.env.local') });

// Configuration Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Configuration des chemins
const BASE_IMAGE_DIR = path.join(process.env.HOME, 'Desktop', 'image selectchateaux');

const CHATEAUX_MAPPING = {
  'chantilly': {
    localDir: 'Chateau de Montvillargenne (60)',
    bucketFolder: 'chantilly',
    name: 'Château Chantilly (60)'
  },
  'hauts-de-seine': {
    localDir: 'MGallery Domaine de la Reine Margot (92)',
    bucketFolder: 'hauts-de-seine',
    name: 'MGallery Paris (92)'
  },
  'chevreuse': {
    localDir: 'Abbaye des Vaux de Cernay (78)',
    bucketFolder: 'chevreuse',
    name: 'Abbaye Chevreuse (78)'
  }
};

/**
 * Convertir une image en WebP et la compresser
 */
async function convertToWebP(imagePath) {
  const sharp = require('sharp');
  const buffer = await fs.promises.readFile(imagePath);
  return await sharp(buffer)
    .webp({ quality: 85 })
    .toBuffer();
}

/**
 * Uploader une image sur Supabase Storage
 */
async function uploadImage(slug, imageBuffer, fileName) {
  const filePath = `${CHATEAUX_MAPPING[slug].bucketFolder}/${fileName}`;

  console.log(`📤 Upload: ${filePath}...`);

  const { data, error } = await supabase
    .storage
    .from('chateaux-images')
    .upload(filePath, imageBuffer, {
      contentType: 'image/webp',
      upsert: true
    });

  if (error) {
    console.error(`❌ Erreur upload ${filePath}:`, error.message);
    return null;
  }

  const { data: urlData } = supabase
    .storage
    .from('chateaux-images')
    .getPublicUrl(filePath);

  return urlData.publicUrl;
}

/**
 * Traiter toutes les images d'un château
 */
async function processChateauImages(slug) {
  const config = CHATEAUX_MAPPING[slug];
  const localDir = path.join(BASE_IMAGE_DIR, config.localDir);

  console.log(`\n🏰 Traitement: ${config.name}`);
  console.log(`📁 Dossier: ${localDir}`);

  if (!fs.existsSync(localDir)) {
    console.error(`❌ Dossier introuvable: ${localDir}`);
    return [];
  }

  const files = fs.readdirSync(localDir)
    .filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f))
    .sort();

  console.log(`📸 ${files.length} images trouvées`);

  const uploadedImages = [];

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const imagePath = path.join(localDir, file);
    const newFileName = `${config.bucketFolder}-${i + 1}.webp`;

    try {
      // Convertir en WebP
      const webpBuffer = await convertToWebP(imagePath);

      // Upload sur Supabase
      const url = await uploadImage(slug, webpBuffer, newFileName);

      if (url) {
        uploadedImages.push({
          name: newFileName,
          url: url,
          originalName: file
        });
        console.log(`✅ ${newFileName}`);
      }
    } catch (error) {
      console.error(`❌ Erreur ${file}:`, error.message);
    }
  }

  return uploadedImages;
}

/**
 * Générer le HTML de sélection
 */
function generateHTML(imagesData) {
  const htmlPath = path.join(__dirname, 'image-selector-updated.html');

  const imageDataJSON = JSON.stringify(imagesData, null, 2);

  const htmlContent = fs.readFileSync(
    path.join(__dirname, 'image-selector.html'),
    'utf-8'
  );

  // Remplacer les données d'images
  const updatedHTML = htmlContent.replace(
    /const imageData = \{[\s\S]*?\};/,
    `const imageData = ${imageDataJSON};`
  );

  fs.writeFileSync(htmlPath, updatedHTML);

  console.log(`\n✅ HTML généré: ${htmlPath}`);
  console.log(`🌐 Ouvrez ce fichier dans votre navigateur pour sélectionner les images !`);

  return htmlPath;
}

/**
 * Main
 */
async function main() {
  console.log('🚀 UPLOAD ET GESTION DES IMAGES\n');
  console.log('═══════════════════════════════════════\n');

  // Vérifier sharp
  try {
    require('sharp');
  } catch (e) {
    console.log('📦 Installation de sharp pour la conversion WebP...');
    require('child_process').execSync('npm install sharp', { stdio: 'inherit' });
  }

  const allImagesData = {};

  // Traiter chaque château
  for (const slug of Object.keys(CHATEAUX_MAPPING)) {
    const images = await processChateauImages(slug);
    allImagesData[slug] = images;
  }

  // Générer le HTML de sélection
  const htmlPath = generateHTML(allImagesData);

  console.log('\n═══════════════════════════════════════');
  console.log('✅ TERMINÉ !');
  console.log('═══════════════════════════════════════\n');
  console.log('📋 PROCHAINES ÉTAPES:');
  console.log(`1. Ouvre: ${htmlPath}`);
  console.log('2. Sélectionne visuellement tes images (Hero, OpenGraph, Galerie, etc.)');
  console.log('3. Clique sur "Générer le code"');
  console.log('4. Copie-colle dans src/data/chateaux.ts');
  console.log('\n🎉 C\'est aussi simple que Wix!\n');

  // Ouvrir automatiquement dans le navigateur
  const open = require('child_process').exec;
  open(`open "${htmlPath}"`, (error) => {
    if (error) {
      console.log(`\n💡 Ouvre manuellement: ${htmlPath}`);
    }
  });
}

main().catch(console.error);

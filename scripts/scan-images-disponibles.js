#!/usr/bin/env node

/**
 * Script de scan des images disponibles
 * Scanne tous les dossiers d'images et crée un JSON avec toutes les images disponibles
 */

const fs = require('fs').promises;
const path = require('path');

const IMAGES_DIR = '/Users/avidanbenichay/Documents/Mes Projets d\'apps/Mes projets/SELECT CHATEAUX/SITE-WEB/IMAGES';

// Mapping des noms de dossiers vers les slugs de châteaux
const FOLDER_TO_CHATEAU = {
  'Abbaye des Veaux de cernay': {
    slug: 'abbaye-millenaire-vallee-chevreuse',
    nom: 'Abbaye Millénaire Vallée de Chevreuse',
    supabasePath: 'chevreuse'
  },
  'Chateau de Montvillargene': {
    slug: 'chateau-montvillargene',
    nom: 'Château de Montvillargene',
    supabasePath: 'montvillargene'
  },
  'Domaine Reine Margot': {
    slug: 'hotel-historique-seminaire-paris-92',
    nom: 'Le Refuge Historique Suspendu',
    supabasePath: 'hauts-de-seine'
  },
  'Chateau Mont Royal': {
    slug: 'palais-royal-foret-chantilly',
    nom: 'Le Palais Royal de la Forêt',
    supabasePath: 'mont-royal'
  },
  'Manoir': {
    slug: 'manoir-anglo-normand-chantilly',
    nom: 'Le Manoir Anglo-Normand',
    supabasePath: 'chantilly'
  },
  'Chateau de Chantilly': {
    slug: 'chateau-chantilly',
    nom: 'Château de Chantilly',
    supabasePath: 'chantilly-patrimoine'
  },
  'Palais Royal': {
    slug: 'palais-royal-autre',
    nom: 'Palais Royal',
    supabasePath: 'palais-royal'
  }
};

// Catégorisation automatique des images par mots-clés
const IMAGE_CATEGORIES = {
  hero: [
    'facade', 'vue-aerienne', 'exterieur', 'chateau', 'domaine',
    'reception', 'hall', 'escalier', 'salle-seminaire', 'salle-banquet'
  ],
  chambres: [
    'chambre', 'suite', 'bedroom', 'lit', 'twin', 'king', 'double'
  ],
  sallies: [
    'salle-reunion', 'salle-seminaire', 'salle-conference', 'board',
    'salle-banquet', 'auditorium', 'theatre'
  ],
  espacesBienEtre: [
    'spa', 'piscine', 'massage', 'fitness', 'sauna', 'hammam', 'bien-etre'
  ],
  restauration: [
    'restaurant', 'bar', 'lounge', 'cuisine', 'gastronomie', 'terrasse-restaurant'
  ],
  exterieur: [
    'jardin', 'parc', 'terrasse', 'patio', 'cour', 'foret', 'etang'
  ],
  espaces: [
    'lobby', 'reception', 'hall', 'salon', 'bibliotheque', 'espace', 'lounge'
  ]
};

/**
 * Catégorise une image selon son nom de fichier
 */
function categorizeImage(filename) {
  const lowerName = filename.toLowerCase();
  const categories = [];

  for (const [category, keywords] of Object.entries(IMAGE_CATEGORIES)) {
    if (keywords.some(kw => lowerName.includes(kw))) {
      categories.push(category);
    }
  }

  return categories.length > 0 ? categories : ['autres'];
}

/**
 * Extrait les mots-clés descriptifs d'un nom de fichier
 */
function extractKeywords(filename) {
  const nameWithoutExt = path.parse(filename).name;
  // Enlever le préfixe château
  const parts = nameWithoutExt.split('-').slice(4); // Skip "chateau-mont-royal-60-oise-chantilly"
  return parts.join(' ');
}

/**
 * Scanne un dossier de château
 */
async function scanChateauFolder(folderPath, folderName) {
  const chateauInfo = FOLDER_TO_CHATEAU[folderName];

  if (!chateauInfo) {
    console.log(`⚠️  Dossier ignoré : ${folderName} (pas dans le mapping)`);
    return null;
  }

  const files = await fs.readdir(folderPath);
  const imageFiles = files
    .filter(f => f.endsWith('.webp'))
    .filter(f => !f.startsWith('.'));

  console.log(`\n📁 ${chateauInfo.nom}`);
  console.log(`   ${imageFiles.length} images trouvées`);

  const images = [];

  for (const file of imageFiles) {
    const fullPath = path.join(folderPath, file);
    const stats = await fs.stat(fullPath);
    const categories = categorizeImage(file);
    const keywords = extractKeywords(file);

    images.push({
      filename: file,
      path: fullPath,
      size: Math.round(stats.size / 1024), // KB
      categories,
      keywords,
      supabaseUrl: `https://jmeiepmtgidqtmxfnlwf.supabase.co/storage/v1/object/public/chateaux-images/${chateauInfo.supabasePath}/${file}`
    });
  }

  // Trier les images par catégories
  const imagesByCategory = {};
  for (const cat of Object.keys(IMAGE_CATEGORIES)) {
    imagesByCategory[cat] = images.filter(img => img.categories.includes(cat));
  }
  imagesByCategory.autres = images.filter(img => img.categories.includes('autres'));

  return {
    ...chateauInfo,
    folderName,
    totalImages: images.length,
    images,
    imagesByCategory
  };
}

/**
 * Fonction principale
 */
async function main() {
  console.log('╔═══════════════════════════════════════════════════════════╗');
  console.log('║  📸 Scan des Images Disponibles                          ║');
  console.log('╚═══════════════════════════════════════════════════════════╝');

  try {
    const entries = await fs.readdir(IMAGES_DIR, { withFileTypes: true });
    const folders = entries
      .filter(e => e.isDirectory() && !e.name.startsWith('.'))
      .map(e => e.name);

    console.log(`\n🔍 ${folders.length} dossiers à scanner\n`);

    const chateauxData = [];

    for (const folder of folders) {
      const folderPath = path.join(IMAGES_DIR, folder);
      const data = await scanChateauFolder(folderPath, folder);

      if (data) {
        chateauxData.push(data);
      }
    }

    // Statistiques globales
    const totalImages = chateauxData.reduce((sum, c) => sum + c.totalImages, 0);
    const totalSize = chateauxData.reduce((sum, c) =>
      sum + c.images.reduce((s, img) => s + img.size, 0), 0
    );

    // Sauvegarder le résultat
    const outputPath = path.join(__dirname, 'images-disponibles.json');
    await fs.writeFile(outputPath, JSON.stringify({
      generatedAt: new Date().toISOString(),
      totalChateaux: chateauxData.length,
      totalImages,
      totalSizeMB: Math.round(totalSize / 1024),
      chateaux: chateauxData
    }, null, 2));

    console.log('\n' + '═'.repeat(60));
    console.log('📊 RÉSULTAT DU SCAN');
    console.log('═'.repeat(60));
    console.log(`✅ ${chateauxData.length} châteaux scannés`);
    console.log(`📸 ${totalImages} images disponibles`);
    console.log(`💾 ${Math.round(totalSize / 1024)} MB total`);
    console.log(`\n📄 Fichier généré : images-disponibles.json\n`);

    // Afficher le résumé par château
    console.log('📋 Résumé par château :\n');
    chateauxData.forEach(c => {
      console.log(`   ${c.nom} (${c.slug})`);
      console.log(`      📸 ${c.totalImages} images`);
      console.log(`      📂 Catégories : ${Object.entries(c.imagesByCategory)
        .filter(([_, imgs]) => imgs.length > 0)
        .map(([cat, imgs]) => `${cat}(${imgs.length})`)
        .join(', ')}`);
      console.log('');
    });

  } catch (error) {
    console.error('\n❌ Erreur:', error);
    process.exit(1);
  }
}

main();

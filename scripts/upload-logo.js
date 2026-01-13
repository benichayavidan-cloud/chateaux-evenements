#!/usr/bin/env node

/**
 * Script pour uploader le logo sur Supabase Storage
 */

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Variables d\'environnement manquantes');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function uploadLogo() {
  try {
    console.log('🚀 Démarrage de l\'upload du logo...\n');

    // Vérifier que le bucket existe
    const { data: buckets, error: bucketsError } = await supabase
      .storage
      .listBuckets();

    if (bucketsError) {
      console.error('❌ Erreur lors de la récupération des buckets:', bucketsError);
      process.exit(1);
    }

    const bucketExists = buckets.some(b => b.name === 'chateaux-images');

    if (!bucketExists) {
      console.log('📦 Création du bucket chateaux-images...');
      const { error: createError } = await supabase
        .storage
        .createBucket('chateaux-images', {
          public: true,
          fileSizeLimit: 10485760, // 10MB
          allowedMimeTypes: ['image/png', 'image/jpeg', 'image/webp', 'image/avif']
        });

      if (createError) {
        console.error('❌ Erreur création bucket:', createError);
        process.exit(1);
      }
      console.log('✅ Bucket créé\n');
    }

    // Lire le fichier logo
    const logoPath = path.join(__dirname, '../public/logo.png');

    if (!fs.existsSync(logoPath)) {
      console.error('❌ Fichier logo.png introuvable:', logoPath);
      process.exit(1);
    }

    const logoFile = fs.readFileSync(logoPath);
    console.log(`📁 Fichier logo.png trouvé (${Math.round(logoFile.length / 1024)}KB)`);

    // Upload du logo
    console.log('📤 Upload en cours...');

    const { data, error } = await supabase
      .storage
      .from('chateaux-images')
      .upload('logo.png', logoFile, {
        contentType: 'image/png',
        cacheControl: '31536000', // 1 an
        upsert: true // Écrase si existe déjà
      });

    if (error) {
      console.error('❌ Erreur upload:', error);
      process.exit(1);
    }

    // Récupérer l'URL publique
    const { data: urlData } = supabase
      .storage
      .from('chateaux-images')
      .getPublicUrl('logo.png');

    console.log('\n✅ Logo uploadé avec succès !');
    console.log('📍 URL publique:', urlData.publicUrl);
    console.log('\n💡 Utilisez cette URL dans NavigationLuxe.tsx et FooterLuxe.tsx');
    console.log(`   Remplacez: src="/logo.png"`);
    console.log(`   Par: src="${urlData.publicUrl}"\n`);

  } catch (error) {
    console.error('❌ Erreur inattendue:', error);
    process.exit(1);
  }
}

uploadLogo();

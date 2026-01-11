const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function createBucket() {
  console.log('🚀 Création du bucket Supabase...');

  // Créer le bucket public 'chateaux-images'
  const { data, error } = await supabase.storage.createBucket('chateaux-images', {
    public: true,
    fileSizeLimit: 52428800, // 50 MB max par fichier
  });

  if (error) {
    if (error.message.includes('already exists')) {
      console.log('✅ Bucket "chateaux-images" existe déjà');
      return true;
    }
    console.error('❌ Erreur:', error);
    return false;
  }

  console.log('✅ Bucket "chateaux-images" créé avec succès');
  return true;
}

createBucket().then(() => process.exit(0)).catch(err => {
  console.error(err);
  process.exit(1);
});

/**
 * Script de migration des données vers Supabase
 * Exécuter avec: npx tsx scripts/migrate-data.ts
 */

import { config } from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import { chateaux, typesEvenements, testimonials } from '../src/data/chateaux';

// Charger les variables d'environnement depuis .env.local
config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// Client avec clé service_role pour pouvoir écrire
const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function migrateData() {
  console.log('🚀 Début de la migration des données...\n');

  try {
    // 1. Migrer les châteaux
    console.log('📍 Migration des châteaux...');
    const chateauxData = chateaux.map(c => ({
      nom: c.nom,
      slug: c.slug,
      region: c.region,
      capacite_min: c.capacite.min,
      capacite_max: c.capacite.max,
      style_architectural: c.styleArchitectural,
      description: c.description,
      atouts: c.atouts,
      images: c.images,
    }));

    const { data: chateauxInserted, error: chateauxError } = await supabase
      .from('chateaux')
      .upsert(chateauxData, { onConflict: 'slug' })
      .select();

    if (chateauxError) throw chateauxError;
    console.log(`✅ ${chateauxInserted?.length || 0} châteaux migrés\n`);

    // 2. Migrer les événements
    console.log('🎉 Migration des événements...');
    const evenementsData = typesEvenements.map(e => ({
      titre: e.titre,
      slug: e.id,
      description: e.description,
      icon: e.icon,
      services_inclus: e.servicesInclus,
      image: e.image,
    }));

    const { data: evenementsInserted, error: evenementsError } = await supabase
      .from('evenements')
      .upsert(evenementsData, { onConflict: 'slug' })
      .select();

    if (evenementsError) throw evenementsError;
    console.log(`✅ ${evenementsInserted?.length || 0} événements migrés\n`);

    // 3. Migrer les témoignages
    console.log('💬 Migration des témoignages...');
    const testimonialsData = testimonials.map(t => ({
      nom: t.nom,
      entreprise: t.entreprise,
      poste: t.poste,
      contenu: t.contenu,
      avatar: t.avatar,
      note: t.note,
    }));

    const { data: testimonialsInserted, error: testimonialsError } = await supabase
      .from('testimonials')
      .insert(testimonialsData)
      .select();

    if (testimonialsError) throw testimonialsError;
    console.log(`✅ ${testimonialsInserted?.length || 0} témoignages migrés\n`);

    console.log('🎉 Migration terminée avec succès !');
    console.log('\n📊 Résumé:');
    console.log(`- Châteaux: ${chateauxInserted?.length || 0}`);
    console.log(`- Événements: ${evenementsInserted?.length || 0}`);
    console.log(`- Témoignages: ${testimonialsInserted?.length || 0}`);

  } catch (error) {
    console.error('❌ Erreur lors de la migration:', error);
    process.exit(1);
  }
}

migrateData();

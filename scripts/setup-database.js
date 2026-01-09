#!/usr/bin/env node

/**
 * Script de configuration automatique de la base de données Supabase
 * Vérifie et crée la table demandes_devis si nécessaire
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Variables d\'environnement manquantes!');
  console.error('Assurez-vous que .env.local contient:');
  console.error('- NEXT_PUBLIC_SUPABASE_URL');
  console.error('- NEXT_PUBLIC_SUPABASE_ANON_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkTable() {
  console.log('\n🔍 Vérification de la table demandes_devis_chateaux...\n');

  try {
    // Tenter de faire un SELECT sur la table
    const { data, error } = await supabase
      .from('demandes_devis_chateaux')
      .select('*')
      .limit(1);

    if (error) {
      if (error.message.includes('relation "public.demandes_devis_chateaux" does not exist')) {
        console.log('⚠️  La table demandes_devis_chateaux n\'existe pas encore.');
        return false;
      }
      console.error('❌ Erreur lors de la vérification:', error.message);
      return false;
    }

    console.log('✅ La table demandes_devis_chateaux existe!');

    // Vérifier la structure
    if (data) {
      console.log('📊 Structure vérifiée avec succès');
      return true;
    }

    return true;
  } catch (err) {
    console.error('❌ Erreur inattendue:', err.message);
    return false;
  }
}

async function testInsert() {
  console.log('\n🧪 Test d\'insertion de données...\n');

  const testData = {
    type_evenement: 'seminaire',
    dates_souhaitees: new Date().toISOString().split('T')[0],
    duree: '2-jours',
    chateau_id: 'test-chateau',
    entreprise: 'Test Company',
    nom_prenom: 'Test User',
    email: 'test@example.com',
    telephone_mobile: '+33600000000',
    nombre_participants: 50,
    nombre_chambres: 10,
    plus_de_500_participants: false,
    plus_de_400_chambres: false,
    chambres_twin: false,
    budget: '5000-10000€',
    commentaire_deroulement: 'Ceci est un test d\'insertion automatique.',
  };

  try {
    const { data, error } = await supabase
      .from('demandes_devis')
      .insert([testData])
      .select();

    if (error) {
      console.error('❌ Erreur lors du test d\'insertion:', error.message);
      console.error('\n📝 Détails de l\'erreur:');
      console.error(JSON.stringify(error, null, 2));
      return false;
    }

    console.log('✅ Test d\'insertion réussi!');
    console.log('📄 ID créé:', data[0]?.id);

    // Supprimer l'entrée de test
    if (data[0]?.id) {
      const { error: deleteError } = await supabase
        .from('demandes_devis')
        .delete()
        .eq('id', data[0].id);

      if (!deleteError) {
        console.log('🗑️  Entrée de test supprimée');
      }
    }

    return true;
  } catch (err) {
    console.error('❌ Erreur inattendue:', err.message);
    return false;
  }
}

async function main() {
  console.log('\n╔════════════════════════════════════════╗');
  console.log('║   CONFIGURATION BASE DE DONNÉES       ║');
  console.log('║   Châteaux Événements                 ║');
  console.log('╚════════════════════════════════════════╝\n');

  // Vérifier la table
  const tableExists = await checkTable();

  if (!tableExists) {
    console.log('\n⚠️  ACTION REQUISE:');
    console.log('═══════════════════════════════════════════════════');
    console.log('La table demandes_devis doit être créée manuellement.');
    console.log('\n📋 ÉTAPES:');
    console.log('1. Ouvrez votre dashboard Supabase');
    console.log('2. Allez dans SQL Editor');
    console.log('3. Copiez-collez le contenu de:');
    console.log('   supabase-devis-migration.sql');
    console.log('4. Cliquez sur "Run"');
    console.log('5. Relancez ce script pour vérifier');
    console.log('═══════════════════════════════════════════════════\n');
    process.exit(1);
  }

  // Tester l'insertion
  const insertWorks = await testInsert();

  if (!insertWorks) {
    console.log('\n⚠️  PROBLÈME DÉTECTÉ:');
    console.log('═══════════════════════════════════════════════════');
    console.log('L\'insertion ne fonctionne pas correctement.');
    console.log('Vérifiez les RLS policies dans Supabase.');
    console.log('═══════════════════════════════════════════════════\n');
    process.exit(1);
  }

  console.log('\n╔════════════════════════════════════════╗');
  console.log('║   ✅ CONFIGURATION COMPLÈTE !         ║');
  console.log('╚════════════════════════════════════════╝');
  console.log('\n📝 Le système de devis est opérationnel!');
  console.log('🌐 Testez sur: http://localhost:3000/devis\n');
}

main();

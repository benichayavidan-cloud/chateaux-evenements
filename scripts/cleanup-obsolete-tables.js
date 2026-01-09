#!/usr/bin/env node

/**
 * Script de nettoyage des tables obsolètes
 * Supprime les tables qui ne sont pas utilisées par le projet chateaux-evenements
 */

const { execSync } = require('child_process');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env.local') });

console.log('\n╔════════════════════════════════════════╗');
console.log('║   NETTOYAGE TABLES OBSOLÈTES          ║');
console.log('╚════════════════════════════════════════╝\n');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const projectRef = supabaseUrl.match(/https:\/\/([^.]+)\.supabase\.co/)[1];

// Demander le mot de passe
let dbPassword;
try {
  dbPassword = execSync(
    `osascript -e 'display dialog "Entrez votre mot de passe de base de données Supabase:" default answer "" with hidden answer buttons {"Annuler", "OK"} default button "OK"' -e 'text returned of result'`,
    { encoding: 'utf8' }
  ).trim();

  if (!dbPassword) {
    console.error('❌ Mot de passe requis');
    process.exit(1);
  }
} catch (error) {
  console.error('❌ Annulé par l\'utilisateur');
  process.exit(1);
}

const connectionString = `postgresql://postgres:${dbPassword}@db.${projectRef}.supabase.co:5432/postgres`;
const psqlPath = '/usr/local/opt/libpq/bin/psql';

console.log('✅ Connexion établie\n');

// Afficher l'état actuel
console.log('📊 ÉTAT ACTUEL DE LA BASE\n');
console.log('─────────────────────────────────────────────────────\n');

try {
  const tables = execSync(
    `${psqlPath} "${connectionString}" -c "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' ORDER BY table_name;"`,
    { encoding: 'utf8' }
  );
  console.log(tables);
} catch (error) {
  console.error('❌ Erreur:', error.message);
  process.exit(1);
}

console.log('\n📋 ANALYSE DES TABLES\n');
console.log('─────────────────────────────────────────────────────\n');

console.log('Pour le projet CHÂTEAUX-ÉVÉNEMENTS:\n');
console.log('   ✅ UTILISÉES:');
console.log('      • chateaux');
console.log('      • evenements');
console.log('      • testimonials');
console.log('      • demandes_devis_chateaux\n');

console.log('   ❌ OBSOLÈTES (à supprimer):');
console.log('      • demandes_devis (doublon, remplacée par demandes_devis_chateaux)');
console.log('      • lieux (utilisée uniquement par site-moderne-expert)');
console.log('      • services (utilisée uniquement par site-moderne-expert)\n');

console.log('─────────────────────────────────────────────────────\n');

// Demander confirmation
let confirmation;
try {
  confirmation = execSync(
    `osascript -e 'display dialog "⚠️  ATTENTION: SUPPRESSION DE TABLES\\n\\nCette opération va supprimer:\\n  • demandes_devis\\n  • lieux\\n  • services\\n\\n⚠️  Si vous utilisez site-moderne-expert sur la même base, ces tables seront perdues!\\n\\nVoulez-vous continuer?" buttons {"Annuler", "Supprimer TOUT", "Supprimer UNIQUEMENT demandes_devis"} default button "Supprimer UNIQUEMENT demandes_devis" with icon caution' -e 'button returned of result'`,
    { encoding: 'utf8' }
  ).trim();
} catch (error) {
  console.log('❌ Opération annulée');
  process.exit(0);
}

if (confirmation === 'Annuler') {
  console.log('❌ Opération annulée');
  process.exit(0);
}

const tablesToDelete = [];

if (confirmation === 'Supprimer TOUT') {
  tablesToDelete.push('demandes_devis', 'lieux', 'services');
} else if (confirmation === 'Supprimer UNIQUEMENT demandes_devis') {
  tablesToDelete.push('demandes_devis');
}

console.log('\n🗑️  SUPPRESSION DES TABLES\n');
console.log('─────────────────────────────────────────────────────\n');

tablesToDelete.forEach(table => {
  console.log(`   🗑️  Suppression de: ${table}...`);

  try {
    execSync(
      `${psqlPath} "${connectionString}" -c "DROP TABLE IF EXISTS public.${table} CASCADE;"`,
      { encoding: 'utf8', stdio: 'pipe' }
    );
    console.log(`   ✅ ${table} supprimée\n`);
  } catch (error) {
    console.error(`   ❌ Erreur lors de la suppression de ${table}:`, error.message);
  }
});

// Vérifier l'état final
console.log('\n📊 ÉTAT FINAL DE LA BASE\n');
console.log('─────────────────────────────────────────────────────\n');

try {
  const tables = execSync(
    `${psqlPath} "${connectionString}" -c "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' ORDER BY table_name;"`,
    { encoding: 'utf8' }
  );
  console.log(tables);
} catch (error) {
  console.error('❌ Erreur:', error.message);
}

// Compter les lignes dans les tables restantes
console.log('\n📈 NOMBRE DE LIGNES PAR TABLE\n');
console.log('─────────────────────────────────────────────────────\n');

const remainingTables = ['chateaux', 'evenements', 'testimonials', 'demandes_devis_chateaux'];

remainingTables.forEach(table => {
  try {
    const count = execSync(
      `${psqlPath} "${connectionString}" -t -c "SELECT COUNT(*) FROM public.${table};"`,
      { encoding: 'utf8' }
    ).trim();
    console.log(`   • ${table}: ${count} lignes`);
  } catch (error) {
    console.log(`   • ${table}: n'existe pas`);
  }
});

console.log('\n\n╔════════════════════════════════════════╗');
console.log('║   ✅ NETTOYAGE TERMINÉ !              ║');
console.log('╚════════════════════════════════════════╝\n');

console.log('🎯 Votre base est maintenant propre et optimisée!');
console.log('📊 Tables actives pour châteaux-événements:');
console.log('   • chateaux (3 lignes)');
console.log('   • evenements (4 lignes)');
console.log('   • testimonials (4 lignes)');
console.log('   • demandes_devis_chateaux (pour les futures demandes)\n');

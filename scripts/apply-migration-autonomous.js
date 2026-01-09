#!/usr/bin/env node

/**
 * Script de migration autonome - Utilise les credentials du .env.local
 */

const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env.local') });

console.log('\n╔════════════════════════════════════════╗');
console.log('║   MIGRATION AUTONOME SUPABASE         ║');
console.log('║   demandes_devis_chateaux             ║');
console.log('╚════════════════════════════════════════╝\n');

// Vérifier les variables d'environnement
const databaseUrl = process.env.DATABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!databaseUrl) {
  console.error('❌ DATABASE_URL non configurée dans .env.local');
  console.error('Exécutez d\'abord: node scripts/configure-supabase.js\n');
  process.exit(1);
}

if (!serviceRoleKey) {
  console.error('❌ SUPABASE_SERVICE_ROLE_KEY non configurée dans .env.local');
  console.error('Exécutez d\'abord: node scripts/configure-supabase.js\n');
  process.exit(1);
}

// Vérifier que pg est installé
try {
  require('pg');
} catch (error) {
  console.log('📦 Installation de "pg"...\n');
  const { execSync } = require('child_process');
  execSync('npm install pg', { stdio: 'inherit' });
}

const { Client } = require('pg');

async function applyMigration() {
  console.log('📄 Lecture du fichier de migration...\n');
  const sqlFile = path.join(__dirname, '..', 'supabase-devis-chateaux-migration.sql');

  if (!fs.existsSync(sqlFile)) {
    console.error('❌ Fichier de migration introuvable:', sqlFile);
    process.exit(1);
  }

  const sqlContent = fs.readFileSync(sqlFile, 'utf8');
  console.log('✅ Migration chargée (' + sqlContent.length + ' caractères)\n');

  console.log('🔗 Connexion à Supabase...\n');
  const client = new Client({
    connectionString: databaseUrl,
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();
    console.log('✅ Connecté!\n');

    // Vérifier d'abord si la table existe déjà
    console.log('🔍 Vérification de l\'état actuel...\n');
    const checkTableQuery = `
      SELECT EXISTS (
        SELECT FROM information_schema.tables
        WHERE table_schema = 'public'
        AND table_name = 'demandes_devis_chateaux'
      ) as table_exists;
    `;

    const { rows: checkRows } = await client.query(checkTableQuery);

    if (checkRows[0].table_exists) {
      console.log('⚠️  La table demandes_devis_chateaux existe déjà!\n');
      console.log('Options:');
      console.log('  1. Passer cette migration (table déjà créée)');
      console.log('  2. Supprimer et recréer (⚠️  perte de données)\n');

      const { execSync } = require('child_process');
      const choice = execSync(
        `osascript -e 'display dialog "La table existe déjà. Que faire?" buttons {"Annuler", "Passer", "Recréer"} default button "Passer"' -e 'button returned of result'`,
        { encoding: 'utf8' }
      ).trim();

      if (choice === 'Annuler') {
        console.log('❌ Migration annulée\n');
        process.exit(0);
      }

      if (choice === 'Recréer') {
        console.log('🗑️  Suppression de la table existante...\n');
        await client.query('DROP TABLE IF EXISTS public.demandes_devis_chateaux CASCADE;');
        console.log('✅ Table supprimée\n');
      } else {
        console.log('✅ Migration ignorée (table déjà existante)\n');
        await displayTableStructure(client);
        return;
      }
    }

    // Vérifier et créer la fonction update_updated_at_column si nécessaire
    console.log('⚙️  Vérification de la fonction update_updated_at_column...\n');
    const checkFunctionQuery = `
      SELECT EXISTS (
        SELECT 1 FROM pg_proc
        WHERE proname = 'update_updated_at_column'
      ) as function_exists;
    `;

    const { rows: funcRows } = await client.query(checkFunctionQuery);

    if (!funcRows[0].function_exists) {
      console.log('⚙️  Création de la fonction...\n');
      await client.query(`
        CREATE OR REPLACE FUNCTION update_updated_at_column()
        RETURNS TRIGGER AS $$
        BEGIN
          NEW.updated_at = NOW();
          RETURN NEW;
        END;
        $$ LANGUAGE plpgsql;
      `);
      console.log('✅ Fonction créée\n');
    } else {
      console.log('✅ Fonction déjà existante\n');
    }

    // Exécuter la migration
    console.log('⚙️  Application de la migration...\n');
    await client.query(sqlContent);
    console.log('✅ Migration exécutée avec succès!\n');

    // Afficher la structure de la table
    await displayTableStructure(client);

  } catch (error) {
    console.error('❌ Erreur:', error.message);
    if (error.stack) {
      console.error('\n📝 Stack trace:\n', error.stack);
    }
    process.exit(1);
  } finally {
    await client.end();
    console.log('🔌 Déconnexion\n');
  }
}

async function displayTableStructure(client) {
  console.log('📊 Structure de la table demandes_devis_chateaux:\n');
  console.log('═══════════════════════════════════════════════════\n');

  const structureQuery = `
    SELECT
      column_name,
      data_type,
      is_nullable,
      column_default
    FROM information_schema.columns
    WHERE table_schema = 'public'
    AND table_name = 'demandes_devis_chateaux'
    ORDER BY ordinal_position;
  `;

  const { rows: columns } = await client.query(structureQuery);

  columns.forEach(col => {
    const nullable = col.is_nullable === 'YES' ? '(nullable)' : '(required)';
    const defaultVal = col.column_default ? ` = ${col.column_default}` : '';
    console.log(`  • ${col.column_name}: ${col.data_type} ${nullable}${defaultVal}`);
  });

  console.log('\n═══════════════════════════════════════════════════\n');

  // Vérifier les indexes
  const indexQuery = `
    SELECT indexname, indexdef
    FROM pg_indexes
    WHERE tablename = 'demandes_devis_chateaux'
    AND schemaname = 'public';
  `;

  const { rows: indexes } = await client.query(indexQuery);

  if (indexes.length > 0) {
    console.log('🔍 Indexes créés:\n');
    indexes.forEach(idx => {
      console.log(`  • ${idx.indexname}`);
    });
    console.log('');
  }

  // Vérifier les RLS policies
  const policyQuery = `
    SELECT policyname, cmd, qual, with_check
    FROM pg_policies
    WHERE tablename = 'demandes_devis_chateaux'
    AND schemaname = 'public';
  `;

  const { rows: policies } = await client.query(policyQuery);

  if (policies.length > 0) {
    console.log('🔒 Policies RLS activées:\n');
    policies.forEach(pol => {
      console.log(`  • ${pol.policyname} (${pol.cmd})`);
    });
    console.log('');
  }
}

applyMigration().then(() => {
  console.log('╔════════════════════════════════════════╗');
  console.log('║   ✅ MIGRATION TERMINÉE !             ║');
  console.log('╚════════════════════════════════════════╝\n');

  console.log('🎯 Prochaines étapes:');
  console.log('  1. Testez le formulaire: npm run dev');
  console.log('  2. Allez sur: http://localhost:3000/devis');
  console.log('  3. Soumettez une demande test');
  console.log('  4. Vérifiez dans Supabase Dashboard\n');
  console.log('  5. Si tout fonctionne: Push le code!\n');
}).catch(error => {
  console.error('❌ Erreur fatale:', error.message);
  process.exit(1);
});

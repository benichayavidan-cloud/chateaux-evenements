#!/usr/bin/env node

/**
 * Script d'application automatique de la migration Supabase
 * Utilise une connexion PostgreSQL directe pour exécuter le SQL
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('\n╔════════════════════════════════════════╗');
console.log('║   APPLICATION MIGRATION SUPABASE      ║');
console.log('║   demandes_devis_chateaux             ║');
console.log('╚════════════════════════════════════════╝\n');

// Fonction pour demander la connection string de manière sécurisée
function getConnectionString() {
  console.log('🔐 Récupération de la connection string PostgreSQL...\n');

  try {
    const connectionString = execSync(
      `osascript -e 'display dialog "Entrez votre Connection String PostgreSQL Supabase\\n\\n(Trouvez-la dans: Settings → Database → Connection string → URI)" default answer "" buttons {"Annuler", "OK"} default button "OK"' -e 'text returned of result'`,
      { encoding: 'utf8' }
    ).trim();

    if (!connectionString || connectionString === '') {
      console.error('❌ Connection string non fournie');
      process.exit(1);
    }

    return connectionString;
  } catch (error) {
    console.error('❌ Annulé par l\'utilisateur');
    process.exit(1);
  }
}

// Installer pg si nécessaire
console.log('📦 Vérification des dépendances...\n');
try {
  require('pg');
  console.log('✅ Package "pg" déjà installé\n');
} catch (error) {
  console.log('⚙️  Installation de "pg"...\n');
  execSync('npm install pg', { stdio: 'inherit' });
}

const { Client } = require('pg');

async function applyMigration() {
  const connectionString = getConnectionString();

  console.log('📄 Lecture du fichier de migration...\n');
  const sqlFile = path.join(__dirname, '..', 'supabase-devis-chateaux-migration.sql');
  const sqlContent = fs.readFileSync(sqlFile, 'utf8');

  console.log('🔗 Connexion à la base de données...\n');
  const client = new Client({
    connectionString,
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();
    console.log('✅ Connecté à Supabase\n');

    console.log('⚙️  Exécution de la migration...\n');

    // Vérifier d'abord si la fonction update_updated_at_column existe
    const checkFunctionQuery = `
      SELECT EXISTS (
        SELECT 1 FROM pg_proc
        WHERE proname = 'update_updated_at_column'
      ) as function_exists;
    `;

    const { rows: checkRows } = await client.query(checkFunctionQuery);

    if (!checkRows[0].function_exists) {
      console.log('⚙️  Création de la fonction update_updated_at_column...\n');
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
    }

    // Exécuter la migration complète
    await client.query(sqlContent);

    console.log('✅ Migration exécutée avec succès!\n');

    // Vérifier que la table existe
    console.log('🔍 Vérification de la table...\n');
    const checkTableQuery = `
      SELECT EXISTS (
        SELECT FROM information_schema.tables
        WHERE table_schema = 'public'
        AND table_name = 'demandes_devis_chateaux'
      ) as table_exists;
    `;

    const { rows } = await client.query(checkTableQuery);

    if (rows[0].table_exists) {
      console.log('✅ Table demandes_devis_chateaux créée avec succès!\n');

      // Afficher la structure de la table
      const structureQuery = `
        SELECT column_name, data_type, is_nullable, column_default
        FROM information_schema.columns
        WHERE table_schema = 'public'
        AND table_name = 'demandes_devis_chateaux'
        ORDER BY ordinal_position;
      `;

      const { rows: columns } = await client.query(structureQuery);
      console.log('📊 Structure de la table:');
      console.log('═══════════════════════════════════════════════════\n');
      columns.forEach(col => {
        console.log(`  • ${col.column_name} (${col.data_type})`);
      });
      console.log('\n═══════════════════════════════════════════════════\n');

    } else {
      console.error('❌ La table n\'a pas été créée correctement');
      process.exit(1);
    }

  } catch (error) {
    console.error('❌ Erreur lors de la migration:', error.message);
    console.error('\n📝 Détails:', error);
    process.exit(1);
  } finally {
    await client.end();
    console.log('🔌 Déconnexion de la base de données\n');
  }

  console.log('╔════════════════════════════════════════╗');
  console.log('║   ✅ MIGRATION TERMINÉE !             ║');
  console.log('╚════════════════════════════════════════╝\n');
  console.log('🎯 Prochaines étapes:');
  console.log('  1. Testez le formulaire de devis');
  console.log('  2. Vérifiez que les données arrivent bien dans Supabase');
  console.log('  3. Prêt à pusher le code!\n');
}

applyMigration();

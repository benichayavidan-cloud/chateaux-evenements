#!/usr/bin/env node

/**
 * Script de migration via psql - Demande le mot de passe de manière sécurisée
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
require('dotenv').config({ path: path.join(__dirname, '..', '.env.local') });

console.log('\n╔════════════════════════════════════════╗');
console.log('║   MIGRATION SUPABASE VIA PSQL         ║');
console.log('║   demandes_devis_chateaux             ║');
console.log('╚════════════════════════════════════════╝\n');

// Extraire les infos de connection du .env.local
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

if (!supabaseUrl) {
  console.error('❌ NEXT_PUBLIC_SUPABASE_URL non configurée');
  process.exit(1);
}

// Extraire le project ref depuis l'URL
const projectRef = supabaseUrl.match(/https:\/\/([^.]+)\.supabase\.co/)[1];

console.log('📋 Informations du projet:');
console.log(`   Project: ${projectRef}`);
console.log(`   Host: db.${projectRef}.supabase.co`);
console.log('');

// Demander le mot de passe de la base de données
console.log('🔐 Mot de passe requis...\n');

let dbPassword;
try {
  dbPassword = execSync(
    `osascript -e 'display dialog "Entrez votre mot de passe de base de données Supabase\\n\\n(Trouvez-le dans: Settings → Database → Database password)\\n\\n⚠️  Si vous ne le connaissez pas, cliquez sur \\"Reset database password\\" dans les settings." default answer "" with hidden answer buttons {"Annuler", "OK"} default button "OK"' -e 'text returned of result'`,
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

console.log('✅ Mot de passe reçu\n');

// Construire la connection string
const connectionString = `postgresql://postgres:${dbPassword}@db.${projectRef}.supabase.co:5432/postgres`;

// Lire le fichier SQL
console.log('📄 Lecture du fichier de migration...\n');
const sqlFile = path.join(__dirname, '..', 'supabase-devis-chateaux-migration.sql');

if (!fs.existsSync(sqlFile)) {
  console.error('❌ Fichier de migration introuvable:', sqlFile);
  process.exit(1);
}

let sqlContent = fs.readFileSync(sqlFile, 'utf8');

// Ajouter la création de la fonction update_updated_at_column si elle n'existe pas
const functionSQL = `
-- Créer la fonction si elle n'existe pas
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

`;

sqlContent = functionSQL + sqlContent;

// Créer un fichier SQL temporaire complet
const tempSqlFile = path.join(__dirname, '..', '.migration-temp.sql');
fs.writeFileSync(tempSqlFile, sqlContent, 'utf8');

console.log('✅ Migration préparée\n');

console.log('🔗 Connexion à Supabase...\n');

try {
  // Exécuter avec psql
  const psqlPath = '/usr/local/opt/libpq/bin/psql';

  // D'abord, vérifier si la table existe
  console.log('🔍 Vérification de l\'état actuel...\n');

  const checkTableSQL = `SELECT EXISTS (
    SELECT FROM information_schema.tables
    WHERE table_schema = 'public'
    AND table_name = 'demandes_devis_chateaux'
  );`;

  const tableExists = execSync(
    `${psqlPath} "${connectionString}" -t -c "${checkTableSQL}"`,
    { encoding: 'utf8' }
  ).trim();

  if (tableExists === 't') {
    console.log('⚠️  La table demandes_devis_chateaux existe déjà!\n');

    const choice = execSync(
      `osascript -e 'display dialog "La table existe déjà. Que faire?" buttons {"Annuler", "Passer", "Recréer"} default button "Passer"' -e 'button returned of result'`,
      { encoding: 'utf8' }
    ).trim();

    if (choice === 'Annuler') {
      console.log('❌ Migration annulée\n');
      fs.unlinkSync(tempSqlFile);
      process.exit(0);
    }

    if (choice === 'Recréer') {
      console.log('🗑️  Suppression de la table existante...\n');
      execSync(
        `${psqlPath} "${connectionString}" -c "DROP TABLE IF EXISTS public.demandes_devis_chateaux CASCADE;"`,
        { stdio: 'inherit' }
      );
      console.log('✅ Table supprimée\n');
    } else {
      console.log('✅ Migration ignorée (table déjà existante)\n');

      // Afficher la structure
      console.log('📊 Structure actuelle:\n');
      execSync(
        `${psqlPath} "${connectionString}" -c "\\d demandes_devis_chateaux"`,
        { stdio: 'inherit' }
      );

      fs.unlinkSync(tempSqlFile);
      process.exit(0);
    }
  }

  console.log('⚙️  Application de la migration...\n');

  // Exécuter le fichier SQL
  execSync(
    `${psqlPath} "${connectionString}" -f "${tempSqlFile}"`,
    { stdio: 'inherit' }
  );

  console.log('\n✅ Migration exécutée avec succès!\n');

  // Afficher la structure de la table
  console.log('📊 Structure de la table créée:\n');
  console.log('═══════════════════════════════════════════════════\n');

  execSync(
    `${psqlPath} "${connectionString}" -c "\\d demandes_devis_chateaux"`,
    { stdio: 'inherit' }
  );

  console.log('\n═══════════════════════════════════════════════════\n');

  // Vérifier les policies RLS
  console.log('🔒 Policies RLS:\n');

  execSync(
    `${psqlPath} "${connectionString}" -c "SELECT schemaname, tablename, policyname, cmd FROM pg_policies WHERE tablename = 'demandes_devis_chateaux';"`,
    { stdio: 'inherit' }
  );

  console.log('');

  // Nettoyer le fichier temporaire
  fs.unlinkSync(tempSqlFile);

  console.log('╔════════════════════════════════════════╗');
  console.log('║   ✅ MIGRATION TERMINÉE !             ║');
  console.log('╚════════════════════════════════════════╝\n');

  console.log('🎯 Prochaines étapes:');
  console.log('  1. Testez le formulaire: npm run dev');
  console.log('  2. Allez sur: http://localhost:3000/devis');
  console.log('  3. Soumettez une demande test');
  console.log('  4. Vérifiez dans Supabase Dashboard\n');

  // Mettre à jour le .env.local avec le bon mot de passe
  console.log('💾 Mise à jour de .env.local avec le mot de passe correct...\n');

  const envPath = path.join(__dirname, '..', '.env.local');
  let envContent = fs.readFileSync(envPath, 'utf8');

  const newConnectionString = connectionString;
  const regex = /^DATABASE_URL=.*$/m;

  if (regex.test(envContent)) {
    envContent = envContent.replace(regex, `DATABASE_URL=${newConnectionString}`);
  } else {
    envContent += `\nDATABASE_URL=${newConnectionString}\n`;
  }

  fs.writeFileSync(envPath, envContent, 'utf8');

  console.log('✅ .env.local mis à jour!\n');
  console.log('🎉 Je suis maintenant totalement autonome pour gérer votre base Supabase!\n');

} catch (error) {
  console.error('\n❌ Erreur:', error.message);

  if (error.message.includes('password authentication failed')) {
    console.error('\n⚠️  Le mot de passe est incorrect.');
    console.error('Vérifiez votre mot de passe dans: Settings → Database\n');
  }

  // Nettoyer le fichier temporaire
  if (fs.existsSync(tempSqlFile)) {
    fs.unlinkSync(tempSqlFile);
  }

  process.exit(1);
}

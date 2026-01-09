#!/usr/bin/env node

/**
 * Script pour exécuter la migration SQL via l'API Supabase
 */

const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Variables d\'environnement manquantes!');
  process.exit(1);
}

console.log('\n╔════════════════════════════════════════╗');
console.log('║   EXÉCUTION MIGRATION SQL             ║');
console.log('╚════════════════════════════════════════╝\n');

// Lire le fichier SQL
const sqlFile = path.join(__dirname, '..', 'supabase-devis-migration.sql');
const sqlContent = fs.readFileSync(sqlFile, 'utf8');

console.log('📄 Fichier SQL chargé:', sqlFile);
console.log('📊 Taille:', sqlContent.length, 'caractères\n');

// Extraire les commandes SQL (ignorer les commentaires)
const sqlCommands = sqlContent
  .split('\n')
  .filter(line => !line.trim().startsWith('--') && line.trim().length > 0)
  .join('\n')
  .split(';')
  .filter(cmd => cmd.trim().length > 0)
  .map(cmd => cmd.trim() + ';');

console.log('🔧 Nombre de commandes SQL:', sqlCommands.length);
console.log('\n⚠️  IMPORTANT:');
console.log('Le client Supabase JS ne peut pas exécuter du SQL arbitraire.');
console.log('La migration doit être exécutée via le dashboard Supabase.\n');

console.log('📋 INSTRUCTIONS:');
console.log('═════════════════════════════════════════════════════\n');
console.log('1. Ouvrez: https://app.supabase.com');
console.log('2. Sélectionnez votre projet');
console.log('3. Cliquez sur "SQL Editor" dans le menu');
console.log('4. Cliquez sur "+ New query"');
console.log('5. Copiez-collez le contenu de:');
console.log('   → supabase-devis-migration.sql');
console.log('6. Cliquez sur "RUN" (bouton en bas à droite)');
console.log('7. Vérifiez le message: "Success. No rows returned"\n');
console.log('═════════════════════════════════════════════════════\n');

console.log('💡 Le fichier SQL est prêt à être copié!\n');

// Afficher un aperçu
console.log('📝 APERÇU DU SQL (premières lignes):\n');
console.log('─────────────────────────────────────────────────────');
console.log(sqlContent.split('\n').slice(0, 30).join('\n'));
console.log('─────────────────────────────────────────────────────');
console.log('\n[...] Total:', sqlCommands.length, 'commandes SQL\n');

console.log('✅ Prêt pour la migration!\n');

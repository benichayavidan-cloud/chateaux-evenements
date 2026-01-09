#!/usr/bin/env node

/**
 * Script de configuration Supabase - Accès autonome
 * Configure toutes les clés nécessaires dans .env.local
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('\n╔════════════════════════════════════════╗');
console.log('║   CONFIGURATION SUPABASE AUTONOME     ║');
console.log('╚════════════════════════════════════════╝\n');

// Fonction pour demander une valeur via dialogue macOS
function askSecure(message, placeholder = '') {
  try {
    const value = execSync(
      `osascript -e 'display dialog "${message}" default answer "${placeholder}" buttons {"Annuler", "OK"} default button "OK"' -e 'text returned of result'`,
      { encoding: 'utf8' }
    ).trim();

    if (!value || value === '') {
      return null;
    }

    return value;
  } catch (error) {
    return null;
  }
}

// Fonction pour demander un secret (masqué)
function askSecret(message) {
  try {
    const value = execSync(
      `osascript -e 'display dialog "${message}" default answer "" with hidden answer buttons {"Annuler", "OK"} default button "OK"' -e 'text returned of result'`,
      { encoding: 'utf8' }
    ).trim();

    if (!value || value === '') {
      return null;
    }

    return value;
  } catch (error) {
    return null;
  }
}

console.log('📋 Pour configurer l\'accès autonome à Supabase, j\'ai besoin de:');
console.log('   1. Project URL');
console.log('   2. Anon (public) Key');
console.log('   3. Service Role Key (accès admin)');
console.log('   4. Database Connection String\n');

console.log('🔍 Trouvez ces valeurs dans:');
console.log('   → https://app.supabase.com');
console.log('   → Votre projet "site-moderne-expert"');
console.log('   → Settings → API\n');

console.log('─────────────────────────────────────────────────────\n');

// 1. Supabase URL
console.log('📍 Étape 1/4: Supabase Project URL\n');
const supabaseUrl = askSecure(
  'Entrez votre Supabase URL\\n\\n(Ex: https://xxxxx.supabase.co)',
  'https://'
);

if (!supabaseUrl) {
  console.error('❌ URL requise');
  process.exit(1);
}

console.log('✅ URL configurée\n');

// 2. Anon Key
console.log('🔑 Étape 2/4: Anon Key (public)\n');
const anonKey = askSecret(
  'Entrez votre Anon Key\\n\\n(Dans Settings → API → anon public)'
);

if (!anonKey) {
  console.error('❌ Anon Key requise');
  process.exit(1);
}

console.log('✅ Anon Key configurée\n');

// 3. Service Role Key
console.log('👑 Étape 3/4: Service Role Key (admin)\n');
const serviceRoleKey = askSecret(
  'Entrez votre Service Role Key\\n\\n(Dans Settings → API → service_role)\\n\\n⚠️  Cette clé donne un accès admin complet'
);

if (!serviceRoleKey) {
  console.error('❌ Service Role Key requise');
  process.exit(1);
}

console.log('✅ Service Role Key configurée\n');

// 4. Database URL
console.log('🗄️  Étape 4/4: Database Connection String\n');
const databaseUrl = askSecret(
  'Entrez votre Database Connection String\\n\\n(Dans Settings → Database → Connection string → URI)\\n\\nRemplacez [YOUR-PASSWORD] par votre mot de passe!'
);

if (!databaseUrl) {
  console.error('❌ Database URL requise');
  process.exit(1);
}

console.log('✅ Database URL configurée\n');

console.log('─────────────────────────────────────────────────────\n');
console.log('💾 Mise à jour de .env.local...\n');

// Lire le fichier .env.local actuel
const envPath = path.join(__dirname, '..', '.env.local');
let envContent = '';

if (fs.existsSync(envPath)) {
  envContent = fs.readFileSync(envPath, 'utf8');
}

// Remplacer ou ajouter les variables Supabase
const updateEnvVar = (content, key, value) => {
  const regex = new RegExp(`^${key}=.*$`, 'm');
  if (regex.test(content)) {
    return content.replace(regex, `${key}=${value}`);
  } else {
    return content + `\n${key}=${value}`;
  }
};

envContent = updateEnvVar(envContent, 'NEXT_PUBLIC_SUPABASE_URL', supabaseUrl);
envContent = updateEnvVar(envContent, 'NEXT_PUBLIC_SUPABASE_ANON_KEY', anonKey);
envContent = updateEnvVar(envContent, 'SUPABASE_SERVICE_ROLE_KEY', serviceRoleKey);
envContent = updateEnvVar(envContent, 'DATABASE_URL', databaseUrl);

// Nettoyer les lignes vides multiples
envContent = envContent.replace(/\n\n\n+/g, '\n\n').trim() + '\n';

// Écrire le fichier
fs.writeFileSync(envPath, envContent, 'utf8');

console.log('✅ Fichier .env.local mis à jour!\n');

console.log('─────────────────────────────────────────────────────\n');
console.log('🧪 Test de connexion à Supabase...\n');

// Tester la connexion
require('dotenv').config({ path: envPath });

const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);

async function testConnection() {
  try {
    // Test 1: Vérifier les tables existantes
    const { data: tables, error } = await supabase
      .from('information_schema.tables')
      .select('table_name')
      .eq('table_schema', 'public')
      .limit(5);

    if (error) throw error;

    console.log('✅ Connexion Supabase réussie!\n');
    console.log('📊 Tables trouvées dans votre projet:');
    if (tables && tables.length > 0) {
      tables.forEach(t => console.log(`   • ${t.table_name}`));
    }
    console.log('');

  } catch (error) {
    console.error('❌ Erreur de connexion:', error.message);
    console.log('\n⚠️  Vérifiez vos clés dans .env.local');
    process.exit(1);
  }
}

testConnection().then(() => {
  console.log('╔════════════════════════════════════════╗');
  console.log('║   ✅ CONFIGURATION TERMINÉE !         ║');
  console.log('╚════════════════════════════════════════╝\n');

  console.log('🎯 Je suis maintenant autonome pour:');
  console.log('   ✓ Créer/modifier des tables');
  console.log('   ✓ Exécuter des migrations SQL');
  console.log('   ✓ Lire/écrire des données');
  console.log('   ✓ Configurer les RLS policies\n');

  console.log('🚀 Prochaine étape: Appliquer la migration');
  console.log('   → node scripts/apply-migration-autonomous.js\n');
});

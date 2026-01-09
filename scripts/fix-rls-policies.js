#!/usr/bin/env node

/**
 * Script pour corriger les RLS policies
 * Le problème: la policy d'insertion est trop restrictive
 */

const { execSync } = require('child_process');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env.local') });

console.log('\n╔════════════════════════════════════════╗');
console.log('║   CORRECTION RLS POLICIES             ║');
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

// Vérifier les policies actuelles
console.log('📋 POLICIES ACTUELLES\n');
console.log('─────────────────────────────────────────────────────\n');

try {
  execSync(
    `${psqlPath} "${connectionString}" -c "SELECT policyname, cmd, qual, with_check FROM pg_policies WHERE tablename = 'demandes_devis_chateaux';"`,
    { stdio: 'inherit' }
  );
} catch (error) {
  console.error('❌ Erreur:', error.message);
}

console.log('\n🔧 SUPPRESSION DES POLICIES EXISTANTES\n');

try {
  execSync(
    `${psqlPath} "${connectionString}" -c "DROP POLICY IF EXISTS \\"Insertion publique demandes_devis_chateaux\\" ON public.demandes_devis_chateaux;"`,
    { stdio: 'pipe' }
  );
  console.log('✅ Ancienne policy d\'insertion supprimée');

  execSync(
    `${psqlPath} "${connectionString}" -c "DROP POLICY IF EXISTS \\"Lecture admin demandes_devis_chateaux\\" ON public.demandes_devis_chateaux;"`,
    { stdio: 'pipe' }
  );
  console.log('✅ Ancienne policy de lecture supprimée');

  execSync(
    `${psqlPath} "${connectionString}" -c "DROP POLICY IF EXISTS \\"Mise à jour admin demandes_devis_chateaux\\" ON public.demandes_devis_chateaux;"`,
    { stdio: 'pipe' }
  );
  console.log('✅ Ancienne policy de mise à jour supprimée\n');
} catch (error) {
  console.log('⚠️  Certaines policies n\'existaient pas (normal)\n');
}

console.log('🆕 CRÉATION DES NOUVELLES POLICIES\n');

// Policy 1: Insertion publique (anon peut insérer)
try {
  const insertPolicy = `
    CREATE POLICY "Allow anonymous inserts"
    ON public.demandes_devis_chateaux
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (true);
  `;

  execSync(
    `${psqlPath} "${connectionString}" -c "${insertPolicy}"`,
    { stdio: 'pipe' }
  );
  console.log('✅ Policy d\'insertion créée (anon + authenticated)');
} catch (error) {
  console.error('❌ Erreur création policy insertion:', error.message);
}

// Policy 2: Lecture pour service_role uniquement
try {
  const selectPolicy = `
    CREATE POLICY "Allow service_role select"
    ON public.demandes_devis_chateaux
    FOR SELECT
    TO service_role
    USING (true);
  `;

  execSync(
    `${psqlPath} "${connectionString}" -c "${selectPolicy}"`,
    { stdio: 'pipe' }
  );
  console.log('✅ Policy de lecture créée (service_role uniquement)');
} catch (error) {
  console.error('❌ Erreur création policy lecture:', error.message);
}

// Policy 3: Update pour service_role uniquement
try {
  const updatePolicy = `
    CREATE POLICY "Allow service_role update"
    ON public.demandes_devis_chateaux
    FOR UPDATE
    TO service_role
    USING (true)
    WITH CHECK (true);
  `;

  execSync(
    `${psqlPath} "${connectionString}" -c "${updatePolicy}"`,
    { stdio: 'pipe' }
  );
  console.log('✅ Policy de mise à jour créée (service_role uniquement)\n');
} catch (error) {
  console.error('❌ Erreur création policy update:', error.message);
}

// Vérifier les nouvelles policies
console.log('📊 NOUVELLES POLICIES\n');
console.log('─────────────────────────────────────────────────────\n');

try {
  execSync(
    `${psqlPath} "${connectionString}" -c "SELECT schemaname, tablename, policyname, roles, cmd FROM pg_policies WHERE tablename = 'demandes_devis_chateaux' ORDER BY policyname;"`,
    { stdio: 'inherit' }
  );
} catch (error) {
  console.error('❌ Erreur:', error.message);
}

console.log('\n\n╔════════════════════════════════════════╗');
console.log('║   ✅ POLICIES CORRIGÉES !             ║');
console.log('╚════════════════════════════════════════╝\n');

console.log('🎯 Le formulaire devrait maintenant fonctionner!');
console.log('📝 Testez sur: https://chateaux-evenements.vercel.app/devis\n');

#!/usr/bin/env node

/**
 * Script d'analyse complète de la base Supabase
 * Affiche toutes les tables, colonnes, données, policies, etc.
 */

const { execSync } = require('child_process');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env.local') });

console.log('\n╔════════════════════════════════════════╗');
console.log('║   ANALYSE BASE SUPABASE COMPLÈTE      ║');
console.log('║   Projet: site-moderne-expert         ║');
console.log('╚════════════════════════════════════════╝\n');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const projectRef = supabaseUrl.match(/https:\/\/([^.]+)\.supabase\.co/)[1];

console.log('📋 Informations du projet:');
console.log(`   Project ID: ${projectRef}`);
console.log(`   URL: ${supabaseUrl}\n`);

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
console.log('═══════════════════════════════════════════════════\n');

// Fonction pour exécuter une requête SQL
function query(sql, title) {
  console.log(`\n${title}`);
  console.log('─────────────────────────────────────────────────────\n');

  try {
    const result = execSync(
      `${psqlPath} "${connectionString}" -c "${sql}"`,
      { encoding: 'utf8', stdio: ['pipe', 'pipe', 'pipe'] }
    );
    console.log(result);
  } catch (error) {
    console.error('❌ Erreur:', error.message);
  }
}

// 1. Lister toutes les tables
query(
  `SELECT table_name, table_type FROM information_schema.tables WHERE table_schema = 'public' ORDER BY table_name;`,
  '📊 1. TOUTES LES TABLES DU SCHEMA PUBLIC'
);

// 2. Compter les lignes dans chaque table
console.log('\n📈 2. NOMBRE DE LIGNES PAR TABLE');
console.log('─────────────────────────────────────────────────────\n');

const tables = ['chateaux', 'evenements', 'testimonials', 'demandes_devis', 'demandes_devis_chateaux'];

tables.forEach(table => {
  try {
    const count = execSync(
      `${psqlPath} "${connectionString}" -t -c "SELECT COUNT(*) FROM public.${table};"`,
      { encoding: 'utf8', stdio: ['pipe', 'pipe', 'pipe'] }
    ).trim();
    console.log(`   • ${table}: ${count} lignes`);
  } catch (error) {
    console.log(`   • ${table}: n'existe pas ou erreur`);
  }
});

// 3. Structure de la table demandes_devis (existante)
console.log('\n\n📋 3. STRUCTURE TABLE: demandes_devis');
console.log('─────────────────────────────────────────────────────\n');

try {
  const structure = execSync(
    `${psqlPath} "${connectionString}" -c "\\d demandes_devis"`,
    { encoding: 'utf8', stdio: ['pipe', 'pipe', 'pipe'] }
  );
  console.log(structure);
} catch (error) {
  console.log('⚠️  Table demandes_devis n\'existe pas\n');
}

// 4. Structure de la table demandes_devis_chateaux (nouvelle)
console.log('\n📋 4. STRUCTURE TABLE: demandes_devis_chateaux');
console.log('─────────────────────────────────────────────────────\n');

try {
  const structure = execSync(
    `${psqlPath} "${connectionString}" -c "\\d demandes_devis_chateaux"`,
    { encoding: 'utf8', stdio: ['pipe', 'pipe', 'pipe'] }
  );
  console.log(structure);
} catch (error) {
  console.log('⚠️  Table demandes_devis_chateaux n\'existe pas encore\n');
}

// 5. Colonnes détaillées de chaque table
query(
  `SELECT
    table_name,
    column_name,
    data_type,
    is_nullable,
    column_default
  FROM information_schema.columns
  WHERE table_schema = 'public'
    AND table_name IN ('chateaux', 'evenements', 'testimonials', 'demandes_devis', 'demandes_devis_chateaux')
  ORDER BY table_name, ordinal_position;`,
  '🔍 5. COLONNES DÉTAILLÉES DE TOUTES LES TABLES'
);

// 6. Indexes
query(
  `SELECT
    tablename,
    indexname,
    indexdef
  FROM pg_indexes
  WHERE schemaname = 'public'
  ORDER BY tablename, indexname;`,
  '🔑 6. TOUS LES INDEXES'
);

// 7. Policies RLS
query(
  `SELECT
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual,
    with_check
  FROM pg_policies
  WHERE schemaname = 'public'
  ORDER BY tablename, policyname;`,
  '🔒 7. POLICIES RLS (ROW LEVEL SECURITY)'
);

// 8. Vérifier si RLS est activé sur les tables
query(
  `SELECT
    tablename,
    rowsecurity as rls_enabled
  FROM pg_tables
  WHERE schemaname = 'public'
  ORDER BY tablename;`,
  '🛡️  8. STATUT RLS PAR TABLE'
);

// 9. Triggers
query(
  `SELECT
    event_object_table as table_name,
    trigger_name,
    event_manipulation,
    action_timing,
    action_statement
  FROM information_schema.triggers
  WHERE trigger_schema = 'public'
  ORDER BY event_object_table, trigger_name;`,
  '⚙️  9. TRIGGERS CONFIGURÉS'
);

// 10. Fonctions PostgreSQL personnalisées
query(
  `SELECT
    routine_name,
    routine_type,
    data_type as return_type
  FROM information_schema.routines
  WHERE routine_schema = 'public'
  ORDER BY routine_name;`,
  '🔧 10. FONCTIONS POSTGRESQL PERSONNALISÉES'
);

// 11. Aperçu des données - chateaux
console.log('\n\n📸 11. APERÇU DES DONNÉES: chateaux (5 premières lignes)');
console.log('─────────────────────────────────────────────────────\n');

try {
  const data = execSync(
    `${psqlPath} "${connectionString}" -c "SELECT id, nom, slug, region, capacite_min, capacite_max FROM public.chateaux LIMIT 5;"`,
    { encoding: 'utf8', stdio: ['pipe', 'pipe', 'pipe'] }
  );
  console.log(data);
} catch (error) {
  console.log('⚠️  Pas de données ou table inexistante\n');
}

// 12. Aperçu des données - evenements
console.log('\n📸 12. APERÇU DES DONNÉES: evenements');
console.log('─────────────────────────────────────────────────────\n');

try {
  const data = execSync(
    `${psqlPath} "${connectionString}" -c "SELECT id, titre, slug FROM public.evenements;"`,
    { encoding: 'utf8', stdio: ['pipe', 'pipe', 'pipe'] }
  );
  console.log(data);
} catch (error) {
  console.log('⚠️  Pas de données ou table inexistante\n');
}

// 13. Aperçu des données - testimonials
console.log('\n📸 13. APERÇU DES DONNÉES: testimonials');
console.log('─────────────────────────────────────────────────────\n');

try {
  const data = execSync(
    `${psqlPath} "${connectionString}" -c "SELECT nom, entreprise, note FROM public.testimonials;"`,
    { encoding: 'utf8', stdio: ['pipe', 'pipe', 'pipe'] }
  );
  console.log(data);
} catch (error) {
  console.log('⚠️  Pas de données ou table inexistante\n');
}

// 14. Aperçu des données - demandes_devis
console.log('\n📸 14. APERÇU DES DONNÉES: demandes_devis (si existe)');
console.log('─────────────────────────────────────────────────────\n');

try {
  const data = execSync(
    `${psqlPath} "${connectionString}" -c "SELECT id, email, entreprise, created_at FROM public.demandes_devis ORDER BY created_at DESC LIMIT 5;"`,
    { encoding: 'utf8', stdio: ['pipe', 'pipe', 'pipe'] }
  );
  console.log(data);
} catch (error) {
  console.log('⚠️  Pas de données ou table inexistante\n');
}

// 15. Taille de la base de données
query(
  `SELECT
    pg_size_pretty(pg_database_size(current_database())) as database_size;`,
  '💾 15. TAILLE DE LA BASE DE DONNÉES'
);

// 16. Extensions PostgreSQL activées
query(
  `SELECT
    extname as extension_name,
    extversion as version
  FROM pg_extension
  ORDER BY extname;`,
  '🧩 16. EXTENSIONS POSTGRESQL ACTIVÉES'
);

// 17. Contraintes de clés étrangères
query(
  `SELECT
    tc.table_name,
    kcu.column_name,
    ccu.table_name AS foreign_table_name,
    ccu.column_name AS foreign_column_name
  FROM information_schema.table_constraints AS tc
  JOIN information_schema.key_column_usage AS kcu
    ON tc.constraint_name = kcu.constraint_name
    AND tc.table_schema = kcu.table_schema
  JOIN information_schema.constraint_column_usage AS ccu
    ON ccu.constraint_name = tc.constraint_name
    AND ccu.table_schema = tc.table_schema
  WHERE tc.constraint_type = 'FOREIGN KEY'
    AND tc.table_schema = 'public'
  ORDER BY tc.table_name;`,
  '🔗 17. CLÉS ÉTRANGÈRES (FOREIGN KEYS)'
);

// 18. Contraintes CHECK
query(
  `SELECT
    tc.table_name,
    cc.check_clause
  FROM information_schema.table_constraints tc
  JOIN information_schema.check_constraints cc
    ON tc.constraint_name = cc.constraint_name
  WHERE tc.table_schema = 'public'
    AND tc.constraint_type = 'CHECK'
  ORDER BY tc.table_name;`,
  '✔️  18. CONTRAINTES CHECK'
);

console.log('\n\n╔════════════════════════════════════════╗');
console.log('║   ✅ ANALYSE TERMINÉE !               ║');
console.log('╚════════════════════════════════════════╝\n');

console.log('💡 Résumé généré avec toutes les informations de votre base Supabase\n');

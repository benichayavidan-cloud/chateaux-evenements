#!/usr/bin/env node

/**
 * Script de vérification de sécurité automatique
 * À exécuter avant chaque déploiement
 */

const fs = require('fs');
const path = require('path');

const CHECKS = {
  passed: 0,
  failed: 0,
  warnings: 0
};

function checkResult(passed, name, details = '') {
  if (passed) {
    CHECKS.passed++;
    console.log(`✅ ${name}`);
  } else {
    CHECKS.failed++;
    console.log(`❌ ${name}`);
  }
  if (details) {
    console.log(`   ${details}`);
  }
}

function checkWarning(name, details) {
  CHECKS.warnings++;
  console.log(`⚠️  ${name}`);
  console.log(`   ${details}`);
}

console.log('\n╔════════════════════════════════════════╗');
console.log('║   VÉRIFICATION DE SÉCURITÉ            ║');
console.log('╚════════════════════════════════════════╝\n');

// 1. Vérifier .gitignore
console.log('📁 Vérification .gitignore...\n');
const gitignore = fs.readFileSync('.gitignore', 'utf8');
checkResult(
  gitignore.includes('.env'),
  'Fichiers .env ignorés',
  gitignore.includes('.env') ? '' : 'Ajoutez .env* dans .gitignore'
);

// 2. Vérifier absence de secrets dans le code
console.log('\n🔐 Recherche de secrets exposés...\n');
const dangerousPatterns = [
  { pattern: /(password|pwd|secret|token|key)\s*=\s*["'][^"']{10,}["']/i, name: 'Secrets hardcodés' },
  { pattern: /AKIA[0-9A-Z]{16}/g, name: 'AWS Access Keys' },
  { pattern: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g, name: 'Emails dans le code' }
];

function scanDirectory(dir, patterns) {
  const files = fs.readdirSync(dir, { withFileTypes: true });
  let found = [];

  for (const file of files) {
    const filePath = path.join(dir, file.name);

    // Ignorer node_modules, .git, etc.
    if (file.name.startsWith('.') || file.name === 'node_modules') {
      continue;
    }

    if (file.isDirectory()) {
      found = found.concat(scanDirectory(filePath, patterns));
    } else if (file.name.endsWith('.ts') || file.name.endsWith('.tsx') || file.name.endsWith('.js')) {
      const content = fs.readFileSync(filePath, 'utf8');

      for (const { pattern, name } of patterns) {
        if (pattern.test(content)) {
          found.push({ file: filePath, type: name });
        }
      }
    }
  }

  return found;
}

const srcDir = path.join(process.cwd(), 'src');
if (fs.existsSync(srcDir)) {
  const secrets = scanDirectory(srcDir, dangerousPatterns);
  checkResult(
    secrets.length === 0,
    'Pas de secrets hardcodés',
    secrets.length > 0 ? `Trouvé dans: ${secrets.map(s => s.file).join(', ')}` : ''
  );
} else {
  checkWarning('Dossier src/ non trouvé', 'Impossible de scanner les secrets');
}

// 3. Vérifier next.config.ts
console.log('\n⚙️  Vérification next.config.ts...\n');
const nextConfigPath = path.join(process.cwd(), 'next.config.ts');
if (fs.existsSync(nextConfigPath)) {
  const nextConfig = fs.readFileSync(nextConfigPath, 'utf8');

  checkResult(
    nextConfig.includes('poweredByHeader: false'),
    'Header X-Powered-By désactivé'
  );

  checkResult(
    nextConfig.includes('reactStrictMode: true'),
    'React Strict Mode activé'
  );

  checkResult(
    nextConfig.includes('removeConsole'),
    'Console.log supprimés en production'
  );

  checkResult(
    nextConfig.includes('Strict-Transport-Security'),
    'Headers de sécurité configurés'
  );
} else {
  checkWarning('next.config.ts non trouvé', 'Fichier de configuration manquant');
}

// 4. Vérifier middleware
console.log('\n🛡️  Vérification middleware...\n');
const middlewarePath = path.join(process.cwd(), 'src', 'middleware.ts');
if (fs.existsSync(middlewarePath)) {
  const middleware = fs.readFileSync(middlewarePath, 'utf8');

  checkResult(
    middleware.includes('rateLimit') || middleware.includes('rate-limit'),
    'Rate limiting implémenté'
  );

  checkResult(
    middleware.includes('Content-Security-Policy'),
    'CSP configuré'
  );
} else {
  checkWarning('Middleware non trouvé', 'Créez src/middleware.ts pour protections supplémentaires');
}

// 5. Vérifier variables d'environnement
console.log('\n🔑 Vérification variables d\'environnement...\n');
const envLocalPath = path.join(process.cwd(), '.env.local');
if (fs.existsSync(envLocalPath)) {
  checkResult(true, 'Fichier .env.local existe');

  const envContent = fs.readFileSync(envLocalPath, 'utf8');
  checkResult(
    envContent.includes('NEXT_PUBLIC_SUPABASE_URL'),
    'SUPABASE_URL configuré'
  );
  checkResult(
    envContent.includes('NEXT_PUBLIC_SUPABASE_ANON_KEY'),
    'SUPABASE_ANON_KEY configuré'
  );
} else {
  checkResult(false, 'Fichier .env.local', 'Créez .env.local avec vos variables');
}

// 6. Vérifier package.json
console.log('\n📦 Vérification dépendances...\n');
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const hasZod = packageJson.dependencies?.zod;
const hasSupabase = packageJson.dependencies?.['@supabase/supabase-js'];

checkResult(hasZod, 'Zod installé (validation)', hasZod ? `Version ${hasZod}` : '');
checkResult(hasSupabase, 'Supabase installé', hasSupabase ? `Version ${hasSupabase}` : '');

// 7. Vérifier dangerouslySetInnerHTML
console.log('\n⚠️  Recherche de code dangereux...\n');
if (fs.existsSync(srcDir)) {
  const dangerousCode = scanDirectory(srcDir, [
    { pattern: /dangerouslySetInnerHTML/g, name: 'dangerouslySetInnerHTML' },
    { pattern: /eval\(/g, name: 'eval()' },
    { pattern: /innerHTML\s*=/g, name: 'innerHTML =' }
  ]);

  checkResult(
    dangerousCode.length === 0,
    'Pas de code dangereux détecté',
    dangerousCode.length > 0 ? `Trouvé: ${dangerousCode.map(d => d.type).join(', ')}` : ''
  );
}

// RÉSULTATS
console.log('\n╔════════════════════════════════════════╗');
console.log('║   RÉSULTATS                           ║');
console.log('╚════════════════════════════════════════╝\n');

console.log(`✅ Tests réussis  : ${CHECKS.passed}`);
console.log(`❌ Tests échoués  : ${CHECKS.failed}`);
console.log(`⚠️  Avertissements : ${CHECKS.warnings}\n`);

const total = CHECKS.passed + CHECKS.failed;
const score = total > 0 ? ((CHECKS.passed / total) * 100).toFixed(1) : 0;

console.log(`📊 Score de sécurité : ${score}%\n`);

if (CHECKS.failed === 0 && CHECKS.warnings === 0) {
  console.log('🎉 Excellent ! Tous les tests de sécurité sont passés.\n');
  process.exit(0);
} else if (CHECKS.failed === 0) {
  console.log('✅ Bon niveau de sécurité. Corrigez les avertissements si possible.\n');
  process.exit(0);
} else {
  console.log('❌ Des problèmes de sécurité ont été détectés. Corrigez-les avant le déploiement.\n');
  process.exit(1);
}

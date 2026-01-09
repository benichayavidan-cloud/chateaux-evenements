#!/usr/bin/env node

/**
 * Script de synchronisation des données des châteaux
 * Met à jour Supabase avec les données du fichier chateaux.ts
 */

const { execSync } = require('child_process');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env.local') });

console.log('\n╔════════════════════════════════════════╗');
console.log('║   SYNCHRONISATION DONNÉES CHÂTEAUX    ║');
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

// Données des châteaux depuis le code
const nouveauxChateaux = [
  {
    nom: "Le Domaine des Grands Bois de Chantilly",
    slug: "domaine-grands-bois-chantilly",
    region: "Oise (60)",
    capacite_min: 50,
    capacite_max: 200,
    style_architectural: "Château contemporain dans un écrin de verdure",
    description: "Niché au cœur de l'Oise, le Domaine des Grands Bois de Chantilly offre un cadre exceptionnel pour vos événements d'entreprise. Ce château moderne allie élégance contemporaine et confort haut de gamme.",
    atouts: [
      "Salles de réunion modulables équipées des dernières technologies",
      "50 chambres premium avec vue sur le parc",
      "Restaurant gastronomique étoilé",
      "Spa et espaces bien-être",
      "Parc arboré de 20 hectares",
      "Héliport privé"
    ]
  },
  {
    nom: "Le Domaine des Hauts de Seine",
    slug: "domaine-hauts-de-seine",
    region: "Hauts-de-Seine (92)",
    capacite_min: 80,
    capacite_max: 180,
    style_architectural: "Architecture classique parisienne",
    description: "À quelques minutes de Paris, le Domaine des Hauts de Seine combine l'élégance de l'architecture classique avec les commodités modernes. Un lieu privilégié pour vos séminaires et événements corporate.",
    atouts: [
      "Proximité immédiate de Paris",
      "Espaces de réception prestigieux",
      "40 suites de standing",
      "Centre d'affaires équipé",
      "Jardins à la française",
      "Parking sécurisé 100 places"
    ]
  },
  {
    nom: "Le Monastère de la Vallée de Chevreuse",
    slug: "monastere-vallee-chevreuse",
    region: "Yvelines (78)",
    capacite_min: 60,
    capacite_max: 150,
    style_architectural: "Abbaye cistercienne rénovée",
    description: "Ancienne abbaye cistercienne magnifiquement restaurée, le Monastère de la Vallée de Chevreuse offre un cadre unique et inspirant pour vos événements professionnels. Un lieu chargé d'histoire au service de votre réussite.",
    atouts: [
      "Architecture médiévale authentique",
      "Cloître et jardins méditatifs",
      "35 cellules monastiques rénovées",
      "Grande salle capitulaire",
      "Calme et sérénité absolue",
      "Cuisine du terroir"
    ]
  }
];

console.log('📋 Châteaux à synchroniser:\n');
nouveauxChateaux.forEach((ch, i) => {
  console.log(`   ${i + 1}. ${ch.nom} (${ch.region})`);
});

console.log('\n');

// Demander confirmation
let confirmation;
try {
  confirmation = execSync(
    `osascript -e 'display dialog "⚠️  ATTENTION\\n\\nCette opération va:\\n1. SUPPRIMER les 4 châteaux actuels dans Supabase\\n2. INSÉRER les 3 nouveaux châteaux du code\\n\\nVoulez-vous continuer?" buttons {"Annuler", "Continuer"} default button "Continuer" with icon caution' -e 'button returned of result'`,
    { encoding: 'utf8' }
  ).trim();

  if (confirmation !== 'Continuer') {
    console.log('❌ Opération annulée');
    process.exit(0);
  }
} catch (error) {
  console.log('❌ Opération annulée');
  process.exit(0);
}

console.log('🗑️  Suppression des anciennes données...\n');

try {
  execSync(
    `${psqlPath} "${connectionString}" -c "DELETE FROM public.chateaux;"`,
    { encoding: 'utf8', stdio: 'inherit' }
  );
  console.log('✅ Anciennes données supprimées\n');
} catch (error) {
  console.error('❌ Erreur lors de la suppression:', error.message);
  process.exit(1);
}

console.log('📥 Insertion des nouvelles données...\n');

// Créer le SQL d'insertion
nouveauxChateaux.forEach((chateau, index) => {
  const atoutsArray = chateau.atouts.map(a => `'${a.replace(/'/g, "''")}'`).join(',');

  // Pour l'instant, on met des images placeholder
  const imagesArray = [
    `/images/chateaux/${chateau.slug}/image1.jpg`,
    `/images/chateaux/${chateau.slug}/image2.jpg`,
    `/images/chateaux/${chateau.slug}/image3.jpg`,
    `/images/chateaux/${chateau.slug}/image4.jpg`,
    `/images/chateaux/${chateau.slug}/image5.jpg`
  ].map(img => `'${img}'`).join(',');

  const insertSQL = `
    INSERT INTO public.chateaux (
      nom,
      slug,
      region,
      capacite_min,
      capacite_max,
      style_architectural,
      description,
      atouts,
      images
    ) VALUES (
      '${chateau.nom.replace(/'/g, "''")}',
      '${chateau.slug}',
      '${chateau.region}',
      ${chateau.capacite_min},
      ${chateau.capacite_max},
      '${chateau.style_architectural.replace(/'/g, "''")}',
      '${chateau.description.replace(/'/g, "''")}',
      ARRAY[${atoutsArray}],
      ARRAY[${imagesArray}]
    );
  `;

  try {
    execSync(
      `${psqlPath} "${connectionString}" -c "${insertSQL}"`,
      { encoding: 'utf8', stdio: 'pipe' }
    );
    console.log(`   ✅ ${index + 1}. ${chateau.nom}`);
  } catch (error) {
    console.error(`   ❌ Erreur pour ${chateau.nom}:`, error.message);
  }
});

console.log('\n📊 Vérification des données insérées:\n');

try {
  const result = execSync(
    `${psqlPath} "${connectionString}" -c "SELECT nom, slug, region, capacite_min, capacite_max FROM public.chateaux ORDER BY nom;"`,
    { encoding: 'utf8' }
  );
  console.log(result);
} catch (error) {
  console.error('❌ Erreur lors de la vérification');
}

console.log('\n╔════════════════════════════════════════╗');
console.log('║   ✅ SYNCHRONISATION TERMINÉE !       ║');
console.log('╚════════════════════════════════════════╝\n');

console.log('🎯 Les données des châteaux sont maintenant synchronisées!');
console.log('📝 Note: Les images utilisent des chemins placeholder.');
console.log('   Vous devrez télécharger les vraies images plus tard.\n');

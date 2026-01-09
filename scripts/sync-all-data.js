#!/usr/bin/env node

/**
 * Script de synchronisation COMPLÈTE de toutes les données
 * Synchronise châteaux, événements et testimonials depuis le code
 */

const { execSync } = require('child_process');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env.local') });

console.log('\n╔════════════════════════════════════════╗');
console.log('║  SYNCHRONISATION COMPLÈTE DES DONNÉES  ║');
console.log('║  Châteaux + Événements + Testimonials  ║');
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

// ==========================================
// 1. CHÂTEAUX
// ==========================================

const chateaux = [
  {
    nom: "Le Domaine des Grands Bois de Chantilly",
    slug: "domaine-grands-bois-chantilly",
    region: "Oise (60)",
    capacite_min: 50,
    capacite_max: 200,
    style_architectural: "Château contemporain de luxe",
    description: "Niché dans un écrin de verdure aux portes de Chantilly, le Domaine des Grands Bois incarne l''excellence à la française. Ses espaces élégants et son parc forestier offrent un cadre majestueux pour vos événements d''entreprise les plus prestigieux.",
    atouts: [
      "Salles de réception spacieuses et lumineuses",
      "Parc boisé de plusieurs hectares",
      "Proximité immédiate de Paris (30 minutes)",
      "Équipements audiovisuels de dernière génération"
    ],
    images: [
      "/images/chateaux/chantilly/domaine-grands-bois-chantilly-facade-principale-evenement-entreprise-oise-60.png",
      "/images/chateaux/chantilly/seminaire-chateau-chantilly-oise-salle-reception-luxe-corporate.png",
      "/images/chateaux/chantilly/location-domaine-chantilly-evenement-corporate-jardin-parc.png",
      "/images/chateaux/chantilly/chateau-seminaire-chantilly-interieur-prestige-salle-reunion.png",
      "/images/chateaux/chantilly/evenement-entreprise-chantilly-domaine-luxe-parc-boise-60.png"
    ]
  },
  {
    nom: "Le Domaine des Hauts de Seine",
    slug: "domaine-hauts-de-seine",
    region: "Hauts-de-Seine (92)",
    capacite_min: 80,
    capacite_max: 180,
    style_architectural: "Domaine MGallery de prestige",
    description: "Au cœur des Hauts-de-Seine, le Domaine des Hauts de Seine allie élégance contemporaine et raffinement à la française. Son architecture remarquable et ses infrastructures modernes créent une atmosphère unique pour vos séminaires résidentiels.",
    atouts: [
      "Situation privilégiée en proche banlieue parisienne",
      "Collection MGallery garantissant un service d''excellence",
      "Espaces modulables pour tous types d''événements",
      "Suites de luxe avec prestations haut de gamme"
    ],
    images: [
      "/images/chateaux/hauts-de-seine/domaine-hauts-de-seine-mgallery-facade-evenement-entreprise-92.png",
      "/images/chateaux/hauts-de-seine/seminaire-residentiel-hauts-de-seine-salle-conference-luxe.png",
      "/images/chateaux/hauts-de-seine/location-domaine-92-evenement-corporate-reception-prestige.png",
      "/images/chateaux/hauts-de-seine/chateau-hauts-de-seine-interieur-prestige-salon-seminaire.png",
      "/images/chateaux/hauts-de-seine/evenement-entreprise-92-domaine-mgallery-parc-jardin.png"
    ]
  },
  {
    nom: "Le Monastère de la Vallée de Chevreuse",
    slug: "monastere-vallee-chevreuse",
    region: "Yvelines (78)",
    capacite_min: 60,
    capacite_max: 150,
    style_architectural: "Abbaye cistercienne du XIIe siècle",
    description: "Joyau de l''architecture cistercienne, le Monastère de la Vallée de Chevreuse conjugue l''authenticité médiévale avec le confort contemporain. Ses voûtes séculaires et son parc naturel offrent un cadre unique pour des événements corporate mémorables.",
    atouts: [
      "Site historique exceptionnel classé monument historique",
      "Cadre naturel préservé au cœur du Parc Naturel",
      "Atmosphère propice à la réflexion et à la sérénité",
      "Espaces authentiques pour des événements d''exception"
    ],
    images: [
      "/images/chateaux/chevreuse/monastere-vallee-chevreuse-abbaye-facade-evenement-entreprise-78.png",
      "/images/chateaux/chevreuse/seminaire-abbaye-chevreuse-yvelines-salle-voute-cistercienne.png",
      "/images/chateaux/chevreuse/location-abbaye-78-evenement-corporate-historique-parc.png",
      "/images/chateaux/chevreuse/monastere-chevreuse-interieur-medieval-prestige-seminaire.png",
      "/images/chateaux/chevreuse/evenement-entreprise-chevreuse-abbaye-parc-naturel-yvelines.png"
    ]
  }
];

console.log('🏰 SYNCHRONISATION DES CHÂTEAUX\n');
console.log('🗑️  Suppression des données existantes...');

execSync(`${psqlPath} "${connectionString}" -c "DELETE FROM public.chateaux;"`, { stdio: 'pipe' });

console.log('✅ Nettoyage effectué\n');
console.log('📥 Insertion des nouveaux châteaux...\n');

chateaux.forEach((chateau, i) => {
  const atouts = chateau.atouts.map(a => `'${a.replace(/'/g, "''")}'`).join(',');
  const images = chateau.images.map(img => `'${img}'`).join(',');

  const sql = `INSERT INTO public.chateaux (nom, slug, region, capacite_min, capacite_max, style_architectural, description, atouts, images) VALUES ('${chateau.nom.replace(/'/g, "''")}', '${chateau.slug}', '${chateau.region}', ${chateau.capacite_min}, ${chateau.capacite_max}, '${chateau.style_architectural.replace(/'/g, "''")}', '${chateau.description.replace(/'/g, "''")}', ARRAY[${atouts}], ARRAY[${images}]);`;

  execSync(`${psqlPath} "${connectionString}" -c "${sql}"`, { stdio: 'pipe' });
  console.log(`   ✅ ${i + 1}. ${chateau.nom}`);
});

// ==========================================
// 2. ÉVÉNEMENTS
// ==========================================

const evenements = [
  {
    titre: "Séminaire Résidentiel",
    slug: "seminaire",
    description: "Organisez vos séminaires stratégiques dans un cadre d''exception. Salles de réunion équipées, hébergement premium et restauration gastronomique pour fédérer vos équipes.",
    icon: "presentation",
    services_inclus: [
      "Salles de réunion modulables",
      "Équipements audiovisuels professionnels",
      "Hébergement en chambres premium",
      "Restauration gastronomique 3 repas/jour",
      "Animations team-building sur mesure",
      "Service de conciergerie dédié"
    ],
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=85"
  },
  {
    titre: "Journée d'Étude",
    slug: "journee-etude",
    description: "Un environnement propice à la réflexion et à la concentration. Espaces de travail intimistes, pauses raffinées et cadre inspirant pour vos sessions stratégiques.",
    icon: "book-open",
    services_inclus: [
      "Espace de travail avec lumière naturelle",
      "Matériel de présentation haute définition",
      "Pauses café et déjeuner gastronomique",
      "Bibliothèque et espaces calmes",
      "Support technique permanent",
      "Parking privé sécurisé"
    ],
    image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=1200&q=85"
  },
  {
    titre: "Soirée d'Entreprise",
    slug: "soiree-entreprise",
    description: "Célébrez vos succès dans un cadre prestigieux. Cocktails raffinés, dîners gastronomiques et animations exclusives pour marquer les esprits de vos collaborateurs et partenaires.",
    icon: "champagne",
    services_inclus: [
      "Cocktail de réception avec champagne",
      "Dîner gastronomique personnalisé",
      "DJ et animations sur mesure",
      "Éclairages et décoration d''ambiance",
      "Service traiteur étoilé",
      "Photographe professionnel"
    ],
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1200&q=85"
  },
  {
    titre: "Team Building",
    slug: "team-building",
    description: "Renforcez la cohésion de vos équipes à travers des activités ludiques et immersives. Nos domaines offrent un terrain de jeu exceptionnel pour des challenges mémorables.",
    icon: "users",
    services_inclus: [
      "Activités outdoor dans les parcs",
      "Ateliers culinaires avec chef",
      "Chasse au trésor dans le château",
      "Dégustations de vins commentées",
      "Parcours aventure et sports",
      "Coaching et débriefing professionnel"
    ],
    image: "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=1200&q=85"
  }
];

console.log('\n\n🎯 SYNCHRONISATION DES ÉVÉNEMENTS\n');
console.log('🗑️  Suppression des données existantes...');

execSync(`${psqlPath} "${connectionString}" -c "DELETE FROM public.evenements;"`, { stdio: 'pipe' });

console.log('✅ Nettoyage effectué\n');
console.log('📥 Insertion des nouveaux événements...\n');

evenements.forEach((evt, i) => {
  const services = evt.services_inclus.map(s => `'${s.replace(/'/g, "''")}'`).join(',');

  const sql = `INSERT INTO public.evenements (titre, slug, description, icon, services_inclus, image) VALUES ('${evt.titre.replace(/'/g, "''")}', '${evt.slug}', '${evt.description.replace(/'/g, "''")}', '${evt.icon}', ARRAY[${services}], '${evt.image}');`;

  execSync(`${psqlPath} "${connectionString}" -c "${sql}"`, { stdio: 'pipe' });
  console.log(`   ✅ ${i + 1}. ${evt.titre}`);
});

// ==========================================
// 3. TESTIMONIALS
// ==========================================

const testimonials = [
  {
    nom: "Sophie Moreau",
    entreprise: "TechVision France",
    poste: "Directrice des Ressources Humaines",
    contenu: "Le Domaine des Grands Bois de Chantilly a transformé notre séminaire annuel en une expérience inoubliable. Le cadre exceptionnel et le service impeccable ont permis à nos équipes de se ressourcer et de renforcer leur cohésion. Un investissement qui en valait vraiment la peine.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&auto=format&fit=crop&q=80",
    note: 5
  },
  {
    nom: "Marc Dubois",
    entreprise: "Groupe InnovBank",
    poste: "Directeur Général",
    contenu: "Nous avons organisé notre convention annuelle au Domaine des Hauts de Seine. L''infrastructure moderne alliée au prestige des lieux a impressionné nos 180 collaborateurs. L''équipe sur place s''est montrée d''une réactivité remarquable.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&auto=format&fit=crop&q=80",
    note: 5
  },
  {
    nom: "Isabelle Laurent",
    entreprise: "Creative Solutions",
    poste: "Chef de Projet Événementiel",
    contenu: "Le Domaine des Hauts de Seine offre un cadre magique pour nos événements clients. La qualité de la restauration et l''attention aux détails font toute la différence. Nos clients repartent toujours enchantés.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&auto=format&fit=crop&q=80",
    note: 5
  },
  {
    nom: "Thomas Beaumont",
    entreprise: "Luxe Consulting Group",
    poste: "Associé Fondateur",
    contenu: "Pour notre soirée de gala annuelle, nous cherchions un lieu qui reflète nos valeurs d''excellence. Le Monastère de la Vallée de Chevreuse a dépassé toutes nos attentes. L''authenticité médiévale combinée au luxe contemporain a créé une ambiance unique.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80",
    note: 5
  }
];

console.log('\n\n💬 SYNCHRONISATION DES TESTIMONIALS\n');
console.log('🗑️  Suppression des données existantes...');

execSync(`${psqlPath} "${connectionString}" -c "DELETE FROM public.testimonials;"`, { stdio: 'pipe' });

console.log('✅ Nettoyage effectué\n');
console.log('📥 Insertion des nouveaux testimonials...\n');

testimonials.forEach((test, i) => {
  const sql = `INSERT INTO public.testimonials (nom, entreprise, poste, contenu, avatar, note) VALUES ('${test.nom}', '${test.entreprise.replace(/'/g, "''")}', '${test.poste.replace(/'/g, "''")}', '${test.contenu.replace(/'/g, "''")}', '${test.avatar}', ${test.note});`;

  execSync(`${psqlPath} "${connectionString}" -c "${sql}"`, { stdio: 'pipe' });
  console.log(`   ✅ ${i + 1}. ${test.nom} - ${test.entreprise}`);
});

// ==========================================
// VÉRIFICATION FINALE
// ==========================================

console.log('\n\n╔════════════════════════════════════════╗');
console.log('║   📊 VÉRIFICATION FINALE              ║');
console.log('╚════════════════════════════════════════╝\n');

console.log('🏰 Châteaux:\n');
execSync(`${psqlPath} "${connectionString}" -c "SELECT nom, region FROM public.chateaux ORDER BY nom;"`, { stdio: 'inherit' });

console.log('\n🎯 Événements:\n');
execSync(`${psqlPath} "${connectionString}" -c "SELECT titre, slug FROM public.evenements ORDER BY titre;"`, { stdio: 'inherit' });

console.log('\n💬 Testimonials:\n');
execSync(`${psqlPath} "${connectionString}" -c "SELECT nom, entreprise, note FROM public.testimonials ORDER BY nom;"`, { stdio: 'inherit' });

console.log('\n╔════════════════════════════════════════╗');
console.log('║   ✅ SYNCHRONISATION TERMINÉE !       ║');
console.log('╚════════════════════════════════════════╝\n');

console.log('🎯 Toutes les données sont maintenant synchronisées avec le code!');
console.log('📊 Résumé:');
console.log(`   • ${chateaux.length} châteaux`);
console.log(`   • ${evenements.length} événements`);
console.log(`   • ${testimonials.length} testimonials\n`);

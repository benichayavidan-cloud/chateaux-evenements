const path = require('path');

const SITE_URL = process.env.SITE_URL || 'https://www.selectchateaux.com';
// CAMILLE_SITE_DIR : racine d'un site de test. Utilisé par les tests pour
// exercer les écritures sur une COPIE jetable des fichiers de données — jamais
// sur ceux du dépôt. En production la variable est absente.
const SITE_DIR = process.env.CAMILLE_SITE_DIR
  ? path.resolve(process.env.CAMILLE_SITE_DIR)
  : path.resolve(__dirname, '../..');
const DATA_DIR = path.join(SITE_DIR, 'src/data');
const ARTICLES_PATH = path.join(DATA_DIR, 'blog-posts-camille.ts');
const MERGED_PATH = path.join(DATA_DIR, 'merged-redirects.json');

// Les QUATRE fichiers qui portent des articles de blog. Camille écrit les
// créations dans le sien (ARTICLES_PATH) mais réécrit un article là où il vit.
const FICHIERS_DONNEES = ['blog-posts.ts', 'blog-posts-seo-2026.ts', 'blog-posts-niches-2026.ts', 'blog-posts-camille.ts'];
const IMAGES_DIR = path.join(SITE_DIR, 'public/images');

const GSC_SITE_URL = process.env.GSC_SITE_URL || 'https://www.selectchateaux.com/';

const GSC_CLIENT_ID = process.env.GSC_CLIENT_ID;
const GSC_CLIENT_SECRET = process.env.GSC_CLIENT_SECRET;
const GSC_REFRESH_TOKEN = process.env.GSC_REFRESH_TOKEN;

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const GEO_COORDS = {
  'chantilly': { lat: 49.1944, lon: 2.4714 },
  'senlis': { lat: 49.2069, lon: 2.5861 },
  'gouvieux': { lat: 49.1867, lon: 2.4194 },
  'fontainebleau': { lat: 48.4010, lon: 2.7028 },
  'vaux-le-vicomte': { lat: 48.5661, lon: 2.7139 },
  'ferrieres': { lat: 48.8231, lon: 2.7069 },
  'rambouillet': { lat: 48.6439, lon: 1.8306 },
  'dampierre': { lat: 48.7064, lon: 1.9803 },
  'breteuil': { lat: 48.6825, lon: 2.0175 },
  'chevreuse': { lat: 48.7083, lon: 2.0333 },
  'courances': { lat: 48.4444, lon: 2.4694 },
  'champs-sur-marne': { lat: 48.8533, lon: 2.6036 },
  'montmorency': { lat: 49.0000, lon: 2.3228 },
  'ecouen': { lat: 49.0186, lon: 2.3814 },
  'sceaux': { lat: 48.7761, lon: 2.2936 },
  'malmaison': { lat: 48.8697, lon: 2.1656 },
  'vincennes': { lat: 48.8453, lon: 2.4353 },
  'versailles': { lat: 48.8049, lon: 2.1204 },
  'compiegne': { lat: 49.4178, lon: 2.8269 },
  'pierrefonds': { lat: 49.3486, lon: 2.9817 },
  'saint-germain-en-laye': { lat: 48.8986, lon: 2.0936 },
  'maisons-laffitte': { lat: 48.9461, lon: 2.1519 },
  'paris': { lat: 48.8566, lon: 2.3522 },
  'ile-de-france': { lat: 48.8499, lon: 2.6370 },
};

const SERVICES = [
  'seminaire-chateau-chantilly',
  'seminaire-chateau-ile-de-france',
  'seminaire-chateau-oise-60',
  'seminaire-chateau-yvelines-78',
  'seminaire-chateau-hauts-de-seine-92',
  'seminaire-chateau-proche-paris',
  'seminaire-vallee-de-chevreuse',
  'seminaires-soirees-entreprise',
  'team-building-chateau',
  'chateaux',
  'devis',
];

const CATEGORIES = ['organisation', 'lieux', 'team-building'];

module.exports = {
  SITE_URL, SITE_DIR, DATA_DIR, ARTICLES_PATH, MERGED_PATH, FICHIERS_DONNEES, IMAGES_DIR,
  GSC_SITE_URL, GSC_CLIENT_ID, GSC_CLIENT_SECRET, GSC_REFRESH_TOKEN,
  GEMINI_API_KEY, GEO_COORDS, SERVICES, CATEGORIES,
};

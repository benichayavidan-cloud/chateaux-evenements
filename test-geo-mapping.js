/**
 * Script de test pour vérifier le mapping géographique SEO
 * Usage: node test-geo-mapping.js
 */

// Simulation du module geo-mapping
const DEPT_CODES = {
  "Oise": "60",
  "Yvelines": "78",
  "Seine-et-Marne": "77",
  "Hauts-de-Seine": "92",
  "Val-d'Oise": "95",
  "Essonne": "91",
  "Paris": "75",
  "Val-de-Marne": "94",
  "Seine-Saint-Denis": "93"
};

const GEO_VARIANTS = {
  "Oise": ["proche Chantilly", "Nord de Paris", "Picardie"],
  "Yvelines": ["proche Versailles", "Ouest Parisien", "Vallée de Chevreuse"],
  "Seine-et-Marne": ["proche Fontainebleau", "Est Parisien", "Marne-la-Vallée"],
  "Hauts-de-Seine": ["La Défense", "Proche Paris", "92"],
  "Val-d'Oise": ["proche Cergy-Pontoise", "Nord Parisien", "95"],
  "Essonne": ["proche Évry", "Sud Parisien", "91"],
  "Paris": ["Île-de-France", "Centre Paris", "Capitale"],
  "Val-de-Marne": ["proche Créteil", "Sud-Est Parisien", "94"],
  "Seine-Saint-Denis": ["proche Saint-Denis", "Nord-Est Parisien", "93"],
  "default": ["Île-de-France", "Proche Paris", "Région Parisienne"]
};

function getGeoData(region) {
  const code = DEPT_CODES[region] || "";
  const variants = GEO_VARIANTS[region] || GEO_VARIANTS["default"];
  const variant = variants[region.length % variants.length];
  return { code, variant };
}

function getGeoString(region) {
  const { code, variant } = getGeoData(region);
  return code ? `${region} (${code}) & ${variant}` : region;
}

// Tests
console.log("\n=== TEST MAPPING GÉOGRAPHIQUE SEO ===\n");

const regions = ["Oise", "Yvelines", "Hauts-de-Seine", "Paris"];

regions.forEach(region => {
  const { code, variant } = getGeoData(region);
  const geoString = getGeoString(region);

  console.log(`Région: ${region}`);
  console.log(`  Code département: ${code}`);
  console.log(`  Variante sémantique: ${variant}`);
  console.log(`  Chaîne complète: ${geoString}`);
  console.log();
});

// Exemples de metadata générées
console.log("\n=== EXEMPLES DE METADATA GÉNÉRÉES ===\n");

const chateaux = [
  { nom: "Manoir Anglo-Normand", region: "Oise" },
  { nom: "Refuge Historique", region: "Hauts-de-Seine" },
  { nom: "Abbaye Millénaire", region: "Yvelines" }
];

chateaux.forEach(chateau => {
  const { code, variant } = getGeoData(chateau.region);
  const geoString = getGeoString(chateau.region);

  console.log(`\n📍 ${chateau.nom}`);
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  console.log(`\nTitle:`);
  console.log(`  ${chateau.nom} - Lieu de Séminaire ${geoString} | Select Châteaux`);
  console.log(`\nDescription:`);
  console.log(`  Organisez votre événement au ${chateau.nom}. Location de salle et séminaire dans le ${code} (${chateau.region}). Devis gratuit pour votre événement ${variant}.`);
  console.log(`\nKeywords:`);
  console.log(`  - chateau ${code}`);
  console.log(`  - seminaire ${code}`);
  console.log(`  - location salle ${code}`);
  console.log(`  - evenement ${code}`);
  console.log(`  - ${chateau.region.toLowerCase()} ${code}`);
});

// Exemples d'alt texts
console.log("\n\n=== EXEMPLES D'ALT TEXTS GÉNÉRÉS ===\n");

chateaux.forEach(chateau => {
  const { code } = getGeoData(chateau.region);

  console.log(`\n📷 ${chateau.nom}`);
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  console.log(`\nHero Image:`);
  console.log(`  Façade et parc du ${chateau.nom} - Lieu de séminaire d'exception en ${chateau.region} (${code})`);
  console.log(`\nCard Image:`);
  console.log(`  ${chateau.nom} - Château pour séminaire d'entreprise en ${chateau.region} (${code})`);
  console.log(`\nSmart Alt (façade):`);
  console.log(`  Façade - ${chateau.nom} séminaire ${code} et ${chateau.region}`);
});

console.log("\n\n✅ Tests terminés\n");

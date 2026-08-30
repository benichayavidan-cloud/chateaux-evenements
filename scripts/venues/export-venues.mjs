#!/usr/bin/env node
/**
 * Exporte les lieux publiables du CRM vers src/data/venues.ts
 *
 * Filtre de publication (volontairement strict — une fiche pauvre dégrade tout
 * le domaine) :
 *   - département du périmètre cœur
 *   - description de plus de 400 caractères
 *   - capacité renseignée
 *   - au moins 6 photos
 *   - AUCUNE photo issue de Google Places ou de Kactus : republier ces images
 *     violerait les CGU Google et le droit d'auteur d'un concurrent direct.
 *
 * Usage : DATABASE_URL=… node scripts/venues/export-venues.mjs
 */
import pg from 'pg';
import fs from 'fs';
import path from 'path';


/**
 * RÈGLE MÉTIER — lieux déjà publiés sous alias sur le site.
 *
 * Les 4 fiches de /chateaux sont volontairement sous nom descriptif : le client
 * ne doit pas pouvoir identifier le lieu et aller négocier en direct. Republier
 * ces mêmes lieux sous leur vrai nom trahirait l'alias par recoupement
 * (mêmes chambres, mêmes salles, même ville).
 *
 * Ils sont donc exclus de l'export. Identifiés par id CRM, pas par nom : le nom
 * change, l'id non.
 */
const ALIASED_ELSEWHERE = [
  'cmle4c7pq00l5oan8iti0bb0v', // Abbaye des Vaux de Cernay -> /chateaux/abbaye-millenaire-vallee-chevreuse
  'cmle4ct5m02yioan8ngxyzpj4', // Château de Montvillargenne -> /chateaux/manoir-anglo-normand-chantilly
  'cmle4cfhd01fnoan81dctjla0', // Domaine Reine Margot -> /chateaux/hotel-historique-seminaire-paris-92
  'cmlwzu6ep00008otniyeevezc', // Domaine Reine Margot MGallery (doublon CRM) -> idem
  'cmle4cyad03j0oan8fo2sn0gt', // Tiara Mont Royal Chantilly -> /chateaux/palais-royal-foret-chantilly
];

const CORE_DEPARTMENTS = ['78', '60', '77', '95', '91', '92'];
const OUT = path.resolve('src/data/venues.ts');

const DEPARTMENT_NAMES = {
  '78': 'Yvelines', '60': 'Oise', '77': 'Seine-et-Marne',
  '95': "Val-d'Oise", '91': 'Essonne', '92': 'Hauts-de-Seine',
};

const CATEGORY_LABELS = {
  CHATEAU_DOMAINE: 'Château & domaine',
  HOTEL: 'Hôtel',
  GOLF_RESORT: 'Golf & resort',
  SALLE_RECEPTION: 'Salle de réception',
  GITE_MAISON_HOTE: "Maison d'hôtes",
  LIEU_ATYPIQUE: 'Lieu atypique',
  CENTRE_CONGRES: 'Centre de congrès',
  RESTAURANT: 'Restaurant',
};


/**
 * Le CRM stocke beaucoup de noms et de villes en CAPITALES. Tel quel, c'est
 * illisible dans un title et ça coûte du CTR. On recapitalise en respectant les
 * particules françaises et en laissant intacts les sigles (RSE, SPA…).
 */
const LOWER_WORDS = new Set(['de','du','des','la','le','les','d','l','et','en','sur','sous','au','aux','a','à','par','pour','the','of']);
function titleCase(input) {
  if (!input) return input;
  // On recase dans deux cas : tout en capitales, ou « Sentence case » (aucune
  // majuscule après le premier mot) — les deux se lisent mal dans un titre.
  const words = input.trim().split(/\s+/);
  const capitalisedWords = words.filter(w => /^[A-ZÀ-Þ]/.test(w)).length;
  const needsFix = input === input.toUpperCase() || (words.length >= 3 && capitalisedWords <= 1);
  if (!needsFix) return input.trim();
  return input.toLowerCase().split(/(\s+|-|')/).map((tok, i, arr) => {
    if (/^(\s+|-|')$/.test(tok)) return tok;
    if (tok.length <= 1) return tok.toUpperCase();
    const isFirst = arr.slice(0, i).every(t => /^(\s+|-|')?$/.test(t));
    if (!isFirst && LOWER_WORDS.has(tok)) return tok;
    return tok.charAt(0).toUpperCase() + tok.slice(1);
  }).join('').trim();
}

function slugify(s) {
  return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/['’]/g, ' ').replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '').slice(0, 70);
}

const client = new pg.Client({ connectionString: process.env.DIRECT_URL || process.env.DATABASE_URL });
await client.connect();

const { rows } = await client.query(`
  SELECT p.id, p."companyName", p.category, p.city, p."postalCode",
         p."departmentCode", p.department, p.region, p."formattedAddress",
         p.latitude, p.longitude, p.description, p."shortDescription",
         p.capacity, p."totalRooms", p."singleRooms", p."twinRooms",
         p."receptionRoomCount", p."parkingSpots", p.amenities, p.services,
         p."hasOutdoorSpace", p."hasPool", p."hasGarden", p."hasWifi",
         p."hasAudioVisual", p."hasAccessibility", p."hasAirConditioning"
  FROM "Prestataire" p
  WHERE p."departmentCode" = ANY($1)
    AND p.id <> ALL($2)
    AND length(coalesce(p.description,'')) > 400
    AND p.capacity IS NOT NULL
    -- Garde-fou d'intégrité : le code postal fait foi. Sept lieux du CRM portent
    -- un departmentCode faux (Mas Saint-Antoine, cp 07700 en Ardèche, était
    -- rattaché au 77). Publier un lieu hors secteur sur une landing
    -- départementale est pire qu'une fiche manquante.
    AND p."postalCode" IS NOT NULL
    AND substring(p."postalCode" from 1 for 2) = p."departmentCode"
    AND (SELECT count(*) FROM "VendorPhoto" v WHERE v."prestataireId" = p.id) >= 6
    AND NOT EXISTS (
      SELECT 1 FROM "VendorPhoto" v
      WHERE v."prestataireId" = p.id
        AND (v."originUrl" ILIKE '%googleusercontent%' OR v."originUrl" ILIKE '%kactus%')
    )
  ORDER BY p."departmentCode", p.capacity DESC NULLS LAST
`, [CORE_DEPARTMENTS, ALIASED_ELSEWHERE]);

const photosByVenue = {};
const { rows: photos } = await client.query(`
  SELECT "prestataireId", url, caption, category, "displayOrder"
  FROM "VendorPhoto" WHERE "prestataireId" = ANY($1)
  ORDER BY "prestataireId", "displayOrder"
`, [rows.map(r => r.id)]);
for (const p of photos) (photosByVenue[p.prestataireId] ||= []).push(p);

const roomsByVenue = {};
const { rows: meetingRooms } = await client.query(`
  SELECT "prestataireId", "roomName", area, "theatreCapacity", "uShapeCapacity",
         "banquetCapacity", "cocktailCapacity"
  FROM "MeetingRoom" WHERE "prestataireId" = ANY($1) ORDER BY area DESC NULLS LAST
`, [rows.map(r => r.id)]);
for (const r of meetingRooms) (roomsByVenue[r.prestataireId] ||= []).push(r);

await client.end();

const usedSlugs = new Set();
const venues = rows.map(r => {
  let slug = slugify(`${r.companyName}-${r.city || r.departmentCode}`);
  while (usedSlugs.has(slug)) slug = `${slug}-${r.departmentCode}`;
  usedSlugs.add(slug);

  const pics = (photosByVenue[r.id] || []).slice(0, 12);
  return {
    id: r.id,
    slug,
    nom: titleCase(r.companyName),
    categorie: CATEGORY_LABELS[r.category] || 'Lieu de séminaire',
    ville: titleCase(r.city) || null,
    codePostal: r.postalCode || null,
    departementCode: r.departmentCode,
    departement: r.department || DEPARTMENT_NAMES[r.departmentCode] || null,
    region: r.region || null,
    adresse: r.formattedAddress || null,
    latitude: r.latitude != null ? Number(r.latitude) : null,
    longitude: r.longitude != null ? Number(r.longitude) : null,
    description: (r.description || '').trim(),
    resume: (r.shortDescription || '').trim() || null,
    capacite: r.capacity,
    chambres: r.totalRooms ?? null,
    chambresSingle: r.singleRooms ?? null,
    chambresTwin: r.twinRooms ?? null,
    sallesReunion: r.receptionRoomCount ?? null,
    parking: r.parkingSpots ?? null,
    equipements: (r.amenities || []).filter(Boolean),
    services: (r.services || []).filter(Boolean),
    atouts: [
      r.hasOutdoorSpace && 'Espace extérieur',
      r.hasGarden && 'Parc / jardin',
      r.hasPool && 'Piscine',
      r.hasWifi && 'Wi-Fi',
      r.hasAudioVisual && 'Équipement audiovisuel',
      r.hasAccessibility && 'Accès PMR',
      r.hasAirConditioning && 'Climatisation',
    ].filter(Boolean),
    salles: (roomsByVenue[r.id] || []).map(m => ({
      nom: m.roomName, surface: m.area ?? null,
      theatre: m.theatreCapacity ?? null, u: m.uShapeCapacity ?? null,
      banquet: m.banquetCapacity ?? null, cocktail: m.cocktailCapacity ?? null,
    })),
    photos: pics.map(p => ({ url: p.url, legende: p.caption || null, categorie: p.category || null })),
  };
});

const header = `// ⚠️ FICHIER GÉNÉRÉ — ne pas éditer à la main.
// Source : CRM V2, table Prestataire. Régénérer avec :
//   DATABASE_URL=… node scripts/venues/export-venues.mjs
//
// Périmètre : départements ${CORE_DEPARTMENTS.join(', ')}. Exclut les lieux déjà\n// publiés sous alias sur /chateaux, et ceux dont le code postal contredit le\n// département déclaré. Seuil de publication :
// description > 400 caractères, capacité renseignée, 6 photos minimum, et aucune
// photo issue de Google Places ou de Kactus (droits).
// Généré le ${new Date().toISOString().slice(0, 10)} — ${venues.length} lieux.

export interface VenuePhoto { url: string; legende: string | null; categorie: string | null }
export interface VenueSalle { nom: string; surface: number | null; theatre: number | null; u: number | null; banquet: number | null; cocktail: number | null }

export interface Venue {
  id: string; slug: string; nom: string; categorie: string;
  ville: string | null; codePostal: string | null;
  departementCode: string; departement: string | null; region: string | null;
  adresse: string | null; latitude: number | null; longitude: number | null;
  description: string; resume: string | null;
  capacite: number; chambres: number | null; chambresSingle: number | null; chambresTwin: number | null;
  sallesReunion: number | null; parking: number | null;
  equipements: string[]; services: string[]; atouts: string[];
  salles: VenueSalle[]; photos: VenuePhoto[];
}

export const venues: Venue[] = ${JSON.stringify(venues, null, 2)};

export function getVenueBySlug(slug: string): Venue | undefined {
  return venues.find(v => v.slug === slug);
}

export function getVenuesByDepartment(code: string): Venue[] {
  return venues.filter(v => v.departementCode === code);
}
`;

fs.writeFileSync(OUT, header);
console.log(`✓ ${venues.length} lieux exportés vers ${OUT}`);
const byDept = {};
venues.forEach(v => { byDept[v.departementCode] = (byDept[v.departementCode] || 0) + 1; });
console.log('  répartition :', Object.entries(byDept).map(([k, n]) => `${k}=${n}`).join('  '));

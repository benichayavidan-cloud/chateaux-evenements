/**
 * GEO-MAPPING.TS - Cerveau Géographique SEO
 *
 * Système de traduction sémantique pour saturer les résultats de recherche locaux
 * sans modification de la base de données.
 *
 * Stratégie: Injecter automatiquement les numéros de départements et variantes
 * géographiques dans les metadata et alt texts.
 */

// Mapping strict Numéro de département → Nom
export const DEPT_CODES: Record<string, string> = {
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

// Variantes sémantiques pour la longue traîne SEO
export const GEO_VARIANTS: Record<string, string[]> = {
  "Oise": ["proche Chantilly", "Nord de Paris", "Picardie"],
  "Yvelines": ["proche Versailles", "Ouest Parisien", "Vallée de Chevreuse"],
  "Seine-et-Marne": ["proche Fontainebleau", "Est Parisien", "Marne-la-Vallée"],
  "Hauts-de-Seine": ["La Défense", "Proche Paris", "92"],
  "Val-d'Oise": ["proche Cergy-Pontoise", "Nord Parisien", "95"],
  "Essonne": ["proche Évry", "Sud Parisien", "91"],
  "Paris": ["Île-de-France", "Centre Paris", "Capitale"],
  "Val-de-Marne": ["proche Créteil", "Sud-Est Parisien", "94"],
  "Seine-Saint-Denis": ["proche Saint-Denis", "Nord-Est Parisien", "93"],
  // Fallback générique pour régions non mappées
  "default": ["Île-de-France", "Proche Paris", "Région Parisienne"]
};

/**
 * Récupère les données géographiques enrichies pour une région
 *
 * @param region - Nom de la région (ex: "Oise", "Yvelines")
 * @returns Objet contenant le code département et une variante sémantique stable
 *
 * @example
 * ```typescript
 * const { code, variant } = getGeoData("Oise");
 * // { code: "60", variant: "proche Chantilly" }
 * ```
 */
export function getGeoData(region: string) {
  // Récupération du code département
  const code = DEPT_CODES[region] || "";

  // Récupération des variantes ou fallback
  const variants = GEO_VARIANTS[region] || GEO_VARIANTS["default"];

  // Sélection d'une variante stable (basée sur la longueur du nom)
  // Évite le random à chaque refresh pour la stabilité SEO
  const variant = variants[region.length % variants.length];

  return { code, variant };
}

/**
 * Génère une chaîne géographique enrichie pour les metadata
 *
 * @param region - Nom de la région
 * @returns Chaîne formatée "Région (Code) & Variante"
 *
 * @example
 * ```typescript
 * getGeoString("Oise");
 * // "Oise (60) & proche Chantilly"
 * ```
 */
export function getGeoString(region: string): string {
  const { code, variant } = getGeoData(region);
  return code ? `${region} (${code}) & ${variant}` : region;
}

/**
 * Génère une variante aléatoire mais stable par région
 * Utilisé pour diversifier les descriptions sans impacter la cohérence
 *
 * @param region - Nom de la région
 * @param seed - Seed optionnel pour forcer une variante spécifique
 * @returns Variante sémantique
 */
export function getGeoVariant(region: string, seed?: number): string {
  const variants = GEO_VARIANTS[region] || GEO_VARIANTS["default"];
  const index = seed !== undefined ? seed % variants.length : region.length % variants.length;
  return variants[index];
}

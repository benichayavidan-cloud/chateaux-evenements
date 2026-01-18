import { getGeoData } from "./geo-mapping";

/**
 * Génère un alt text riche et SEO-friendly pour les images de châteaux
 */
export function generateChateauAlt(
  chateauNom: string,
  region: string,
  context: "hero" | "card" | "gallery" = "hero"
): string {
  // Récupération du code département pour enrichissement SEO
  const { code } = getGeoData(region);
  const geoSuffix = code ? ` ${region} (${code})` : ` ${region}`;

  const contextMap = {
    hero: `Façade et parc du ${chateauNom} - Lieu de séminaire d'exception en${geoSuffix}`,
    card: `${chateauNom} - Château pour séminaire d'entreprise en${geoSuffix}`,
    gallery: `Vue intérieure du ${chateauNom} - Espace séminaire en${geoSuffix}`,
  };

  return contextMap[context];
}

/**
 * Génère un alt text pour les activités team building
 */
export function generateTeamBuildingAlt(activite: string): string {
  return `Activité team building entreprise : ${activite} dans un château d'exception`;
}

/**
 * Génère un alt text pour les événements
 */
export function generateEventAlt(eventType: string, chateau?: string): string {
  if (chateau) {
    return `${eventType} en château - ${chateau} en Île-de-France`;
  }
  return `${eventType} d'entreprise en château d'exception Île-de-France`;
}

/**
 * Extrait une description depuis une URL d'image Supabase
 */
export function extractDescriptionFromUrl(url: string): string {
  // Extrait les informations de l'URL
  const parts = url.split("/").pop()?.split("-") || [];

  // Cherche des mots-clés SEO dans le nom du fichier
  const keywords = {
    "salle-reunion": "Salle de réunion",
    "seminaire": "espace séminaire",
    "facade": "façade",
    "terrasse": "terrasse",
    "parc": "parc",
    "foret": "forêt",
    "chambre": "chambre",
    "restaurant": "restaurant",
    "piscine": "piscine",
    "spa": "spa",
    "cocktail": "espace cocktail",
    "reception": "réception",
  };

  let description = "";
  for (const [key, value] of Object.entries(keywords)) {
    if (url.includes(key)) {
      description += value + " ";
    }
  }

  return description.trim() || "vue du château";
}

/**
 * Génère un alt text complet basé sur l'URL et le contexte
 * Enrichi avec le code département pour le SEO local
 */
export function generateSmartAlt(
  url: string,
  chateauNom: string,
  region: string
): string {
  // Récupération du code département
  const { code } = getGeoData(region);
  const description = extractDescriptionFromUrl(url);

  // Format: "Façade du Château - Lieu de réception séminaire 60 et Oise"
  const geoString = code
    ? `séminaire ${code} et ${region}`
    : `séminaire ${region}`;

  return `${description.charAt(0).toUpperCase() + description.slice(1)} - ${chateauNom} ${geoString}`;
}

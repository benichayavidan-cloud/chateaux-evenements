/**
 * Plan des ANCIENNES adresses — temporaire.
 *
 * Le 18/11/2026, l'annuaire et une partie du blog ont été retirés du site ;
 * ces adresses sont redirigées (data/redirections-annuaire.json,
 * redirections-commerciales.json, merged-redirects.json). Google ne repasse
 * sur certaines qu'au bout de plusieurs mois (dernier passage constaté :
 * 20/08 et 30/08 pour deux d'entre elles).
 *
 * Règle Google (Search Central, « Déplacer un site en modifiant les URL ») :
 * envoyer AUSSI le sitemap des anciennes URL ; son nombre de pages indexées
 * tombe à zéro à mesure que Google suit les redirections, et les
 * avertissements « redirection » affichés par la Search Console sont normaux.
 *
 * Ne contient que des adresses REDIRIGÉES. Les articles supprimés sans
 * équivalent (404, data/articles-supprimes.json) n'y figurent pas : la
 * documentation ne le prévoit pas pour ce cas.
 *
 * À SUPPRIMER (route + envoi dans la Search Console) quand le rapport
 * Sitemaps affiche zéro page indexée pour ce fichier — contrôle le 18/12/2026.
 */
import annuaire from "@/data/redirections-annuaire.json";
import commerciales from "@/data/redirections-commerciales.json";
import fusions from "@/data/merged-redirects.json";

const BASE_URL = "https://www.selectchateaux.com";

export const dynamic = "force-static";

export function GET(): Response {
  const chemins = [
    ...annuaire.redirections.map((r) => r.from),
    ...commerciales.redirections.map((r) => r.from),
    ...fusions.merges.map((m) => `/blog/${m.from}`),
  ];
  const urls = [...new Set(chemins)].map((c) => `  <url><loc>${BASE_URL}${c}</loc></url>`).join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  return new Response(xml, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
}

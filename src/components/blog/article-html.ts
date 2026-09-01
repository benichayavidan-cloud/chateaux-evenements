/**
 * PRÉPARATION DU HTML D'ARTICLE — exécutée au build, jamais dans le navigateur.
 *
 * Ces fonctions étaient enfermées dans MarkdownRenderer, un composant client.
 * Conséquence mesurée le 01/09/2026 : les ancres des titres étaient posées par
 * un useEffect après hydratation, donc absentes du HTML servi sur 283 articles
 * sur 284. Un moteur qui n'exécute pas JavaScript — c'est le cas de tous les
 * crawlers d'IA — ne voyait ni ancres ni sommaire, et ne pouvait donc citer
 * qu'une page entière au lieu d'un passage précis.
 *
 * Tout est pur et sans dépendance au DOM : le pipeline tourne à la
 * prégénération des 313 articles, et le HTML part complet.
 */

import { BLOG_LINK_MAP } from "@/data/internal-link-map";

/* ─────────────────────────── Auto-maillage ─────────────────────────── */

/** Liens vers pages commerciales (priorité basse, mots génériques). */
const COMMERCIAL_LINK_RULES: { keyword: string; url: string; title?: string }[] = [
  { keyword: "devis", url: "/devis", title: "Demander un devis gratuit" },
  { keyword: "Devis", url: "/devis", title: "Demander un devis gratuit" },
  { keyword: "Chantilly", url: "/seminaire-chateau-chantilly", title: "Séminaire en château à Chantilly" },
  { keyword: "chantilly", url: "/seminaire-chateau-chantilly", title: "Séminaire en château à Chantilly" },
  { keyword: "Oise", url: "/seminaire-chateau-oise-60", title: "Séminaire en château dans l'Oise" },
  { keyword: "Yvelines", url: "/seminaire-chateau-yvelines-78", title: "Séminaire en château dans les Yvelines" },
  { keyword: "Hauts-de-Seine", url: "/seminaire-chateau-hauts-de-seine-92", title: "Séminaire en château dans les Hauts-de-Seine" },
  { keyword: "Île-de-France", url: "/seminaire-chateau-ile-de-france", title: "Séminaire en château en Île-de-France" },
  { keyword: "Vallée de Chevreuse", url: "/seminaire-vallee-de-chevreuse", title: "Séminaire en Vallée de Chevreuse" },
  { keyword: "Essonne", url: "/seminaire-chateau-essonne-91", title: "Séminaire en château en Essonne" },
  { keyword: "Seine-et-Marne", url: "/seminaire-chateau-seine-et-marne-77", title: "Séminaire en château en Seine-et-Marne" },
  { keyword: "Val-d'Oise", url: "/seminaire-chateau-val-d-oise-95", title: "Séminaire en château dans le Val-d'Oise" },
  { keyword: "journée d'étude", url: "/journee-etude-seminaire", title: "Organiser une journée d'étude" },
  { keyword: "Journée d'étude", url: "/journee-etude-seminaire", title: "Organiser une journée d'étude" },
  { keyword: "budget", url: "/budget-seminaire-entreprise", title: "Budget d'un séminaire d'entreprise" },
  { keyword: "Budget", url: "/budget-seminaire-entreprise", title: "Budget d'un séminaire d'entreprise" },
  { keyword: "Châteauform", url: "/alternative-chateauform", title: "Alternative à Châteauform" },
  { keyword: "Fontainebleau", url: "/chateaux", title: "Châteaux près de Fontainebleau" },
  { keyword: "Team Building", url: "/team-building-chateau", title: "Team Building en Château" },
  { keyword: "team building", url: "/team-building-chateau", title: "Team Building en Château" },
  { keyword: "séminaire", url: "/seminaires-soirees-entreprise", title: "Organiser un séminaire" },
  { keyword: "Séminaire", url: "/seminaires-soirees-entreprise", title: "Organiser un séminaire" },
  { keyword: "événement corporate", url: "/seminaires-soirees-entreprise", title: "Événements corporate" },
  { keyword: "événement d'entreprise", url: "/seminaires-soirees-entreprise", title: "Événements d'entreprise" },
  { keyword: "château", url: "/chateaux", title: "Les châteaux" },
  { keyword: "Château", url: "/chateaux", title: "Les châteaux" },
];

function getBlogLinkRules(currentSlug?: string): { keyword: string; url: string; title?: string }[] {
  return BLOG_LINK_MAP
    .filter(rule => rule.targetSlug !== currentSlug)
    .sort((a, b) => b.priority - a.priority)
    .flatMap(rule =>
      rule.keywords.map(kw => ({
        keyword: kw,
        // targetPath (landing/service page) prioritaire sur targetSlug (article blog) :
        // les mots-clés "tête" pointent vers les pages canoniques, pas vers des articles
        url: rule.targetPath ?? `/blog/${rule.targetSlug}`,
        title: rule.title,
      }))
    );
}

/* ──────────────────────────── Assainissement ──────────────────────────── */

const ALLOWED_TAGS = new Set([
  'p', 'br', 'strong', 'b', 'em', 'i', 'u', 'a',
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
  'ul', 'ol', 'li',
  'blockquote', 'pre', 'code',
  'img', 'figure', 'figcaption',
  'table', 'thead', 'tbody', 'tr', 'th', 'td',
  'div', 'span', 'section',
  'hr', 'sup', 'sub', 'mark',
]);

const ALLOWED_ATTRS = new Set([
  'href', 'title', 'class', 'id',
  'src', 'alt', 'width', 'height', 'loading',
  'target', 'rel',
  'colspan', 'rowspan',
]);

/** Supprime les tags et attributs dangereux. */
export function sanitizeHTML(html: string): string {
  // Supprimer les scripts et event handlers
  let clean = html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/on\w+\s*=\s*["'][^"']*["']/gi, '')
    .replace(/on\w+\s*=\s*[^\s>]*/gi, '')
    .replace(/javascript\s*:/gi, '')
    .replace(/data\s*:/gi, 'data-blocked:');

  // Supprimer les tags non autorisés mais garder leur contenu
  clean = clean.replace(/<\/?([a-z][a-z0-9]*)\b[^>]*>/gi, (match, tagName) => {
    const tag = tagName.toLowerCase();
    if (!ALLOWED_TAGS.has(tag)) return '';

    // Pour les tags de fermeture, garder tel quel
    if (match.startsWith('</')) return `</${tag}>`;

    // Nettoyer les attributs
    const attrRegex = /\s([a-z][a-z0-9-]*)\s*=\s*(?:"([^"]*)"|'([^']*)'|(\S+))/gi;
    let attrs = '';
    let attrMatch;
    while ((attrMatch = attrRegex.exec(match)) !== null) {
      const attrName = attrMatch[1].toLowerCase();
      const attrValue = attrMatch[2] ?? attrMatch[3] ?? attrMatch[4] ?? '';
      if (ALLOWED_ATTRS.has(attrName)) {
        // Forcer rel="noopener noreferrer" sur les liens externes
        if (attrName === 'href' && attrValue.startsWith('http')) {
          attrs += ` ${attrName}="${attrValue}" target="_blank" rel="noopener noreferrer"`;
          continue;
        }
        attrs += ` ${attrName}="${attrValue}"`;
      }
    }

    const selfClosing = match.endsWith('/>') || ['br', 'hr', 'img'].includes(tag);
    return `<${tag}${attrs}${selfClosing ? ' /' : ''}>`;
  });

  return clean;
}

function isInsideTag(html: string, matchIndex: number, tagNames: string[]): boolean {
  for (const tag of tagNames) {
    const openPattern = new RegExp(`<${tag}[^>]*>`, "gi");
    let openMatch;
    while ((openMatch = openPattern.exec(html)) !== null) {
      if (openMatch.index > matchIndex) break;
      const closePattern = new RegExp(`</${tag}>`, "gi");
      closePattern.lastIndex = openMatch.index;
      const closeMatch = closePattern.exec(html);
      if (closeMatch && matchIndex < closeMatch.index + closeMatch[0].length) {
        return true;
      }
    }
  }
  return false;
}

const EXCLUDED_PARENT_TAGS = ["a", "h1", "h2", "h3", "h4", "h5", "h6"];

function applyLinkRules(
  html: string,
  rules: { keyword: string; url: string; title?: string }[],
  maxLinks: number,
  cssClass: string,
): { html: string; inserted: number } {
  let result = html;
  let inserted = 0;
  const linkedUrls = new Set<string>();

  for (const rule of rules) {
    if (inserted >= maxLinks) break;
    if (linkedUrls.has(rule.url)) continue;
    const escaped = rule.keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(`\\b(${escaped})\\b`, "g");
    let ruleMatched = false;
    result = result.replace(regex, (match, _g1, offset) => {
      if (ruleMatched || inserted >= maxLinks) return match;
      if (isInsideTag(result, offset, EXCLUDED_PARENT_TAGS)) return match;
      ruleMatched = true;
      inserted++;
      linkedUrls.add(rule.url);
      return `<a href="${rule.url}" class="${cssClass}" title="${rule.title || match}">${match}</a>`;
    });
  }

  return { html: result, inserted };
}

/**
 * Auto-linking : blog links (spécifiques, prioritaires) PUIS commercial links (génériques)
 * Max 5 blog links + 3 commercial links par article
 * Exclut les matches dans <a>, <h1>-<h6> pour éviter liens imbriqués et SEO penalty
 */
export function applyAutoLinking(html: string, currentSlug?: string): string {
  const blogRules = getBlogLinkRules(currentSlug);

  const phase1 = applyLinkRules(html, blogRules, 5, "auto-link blog-link");
  const phase2 = applyLinkRules(phase1.html, COMMERCIAL_LINK_RULES, 3, "auto-link");

  return phase2.html;
}

/* ────────────────────── Ancres de titres & sommaire ────────────────────── */

export interface TocItem {
  id: string;
  title: string;
  level: number;
}

/** Texte brut d'un titre : balises retirées, entités courantes décodées. */
function texteDuTitre(inner: string): string {
  return inner
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&(?:#39|apos|rsquo|#8217);/g, "'")
    .replace(/&(?:quot|#34);/g, '"')
    .replace(/\s+/g, " ")
    .trim();
}

/** Ancre lisible et stable : accents normalisés, ASCII, longueur bornée. */
function slugifierTitre(texte: string): string {
  return texte
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60)
    .replace(/-+$/g, "");
}

/**
 * Pose un id sur chaque h2/h3 et retourne le sommaire correspondant.
 *
 * Trois règles :
 *   - un id déjà écrit dans le contenu est CONSERVÉ. Un article publie sept
 *     ancres à la main et des liens internes qui pointent dessus ; l'ancien
 *     useEffect les écrasait en `section-N` et cassait ses propres liens.
 *   - les titres homonymes reçoivent un suffixe (`budget`, `budget-2`) : sans
 *     cela deux sections partageraient la même ancre.
 *   - un titre sans texte exploitable retombe sur `section-N`.
 */
export function addHeadingIds(html: string): { html: string; toc: TocItem[] } {
  const toc: TocItem[] = [];
  const utilises = new Set<string>();
  let index = 0;

  const result = html.replace(
    /<(h[23])([^>]*)>([\s\S]*?)<\/\1>/gi,
    (match, tag: string, attrs: string, inner: string) => {
      const titre = texteDuTitre(inner);
      const level = Number(tag.substring(1));
      index += 1;

      const idExistant = /\sid\s*=\s*["']([^"']+)["']/i.exec(attrs);
      if (idExistant) {
        const id = idExistant[1];
        utilises.add(id);
        if (titre) toc.push({ id, title: titre, level });
        return match;
      }

      const base = slugifierTitre(titre) || `section-${index}`;
      let id = base;
      let n = 2;
      while (utilises.has(id)) id = `${base}-${n++}`;
      utilises.add(id);

      if (titre) toc.push({ id, title: titre, level });
      return `<${tag}${attrs} id="${id}">${inner}</${tag}>`;
    },
  );

  return { html: result, toc };
}

/* ──────────────────────────── Point d'entrée ──────────────────────────── */

/**
 * Assainit, maille et ancre le contenu d'un article.
 * Les ancres sont posées EN DERNIER : elles ne touchent que la balise ouvrante
 * des titres, jamais le texte que l'auto-maillage cherche à lier.
 */
export function prepareArticleHtml(
  content: string,
  currentSlug?: string,
): { html: string; toc: TocItem[] } {
  const assaini = sanitizeHTML(content);
  const maille = applyAutoLinking(assaini, currentSlug);
  return addHeadingIds(maille);
}

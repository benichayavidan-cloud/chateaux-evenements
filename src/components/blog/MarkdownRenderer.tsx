"use client";

import { useMemo } from "react";
import { BLOG_LINK_MAP } from "@/data/internal-link-map";

/**
 * AUTO-LINKER CONFIGURATION
 * Liens vers pages commerciales (priorité basse, mots génériques)
 */
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
        url: `/blog/${rule.targetSlug}`,
        title: rule.title,
      }))
    );
}

// Tags et attributs autorisés pour le contenu blog
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

/**
 * Sanitize HTML - supprime les tags et attributs dangereux
 */
function sanitizeHTML(html: string): string {
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
function applyAutoLinking(
  html: string,
  currentSlug?: string,
): string {
  const blogRules = getBlogLinkRules(currentSlug);

  const phase1 = applyLinkRules(html, blogRules, 5, "auto-link blog-link");
  const phase2 = applyLinkRules(phase1.html, COMMERCIAL_LINK_RULES, 3, "auto-link");

  return phase2.html;
}

interface MarkdownRendererProps {
  content: string;
  className?: string;
  currentSlug?: string;
}

export function MarkdownRenderer({ content, className = "", currentSlug }: MarkdownRendererProps) {
  const safeContent = useMemo(() => {
    const sanitized = sanitizeHTML(content);
    return applyAutoLinking(sanitized, currentSlug);
  }, [content, currentSlug]);

  return (
    <div
      className={`prose prose-lg ${className}`}
      dangerouslySetInnerHTML={{ __html: safeContent }}
      style={{
        fontFamily: "Merriweather, Georgia, serif",
        lineHeight: 1.8,
        color: "#1f2937",
        display: 'block',
      }}
    />
  );
}

"use client";

import { useMemo } from "react";

/**
 * AUTO-LINKER CONFIGURATION
 * Transforme automatiquement certains mots en liens internes
 */
const AUTO_LINK_RULES: { keyword: string; url: string; title?: string }[] = [
  { keyword: "devis", url: "/devis", title: "Demander un devis gratuit" },
  { keyword: "Devis", url: "/devis", title: "Demander un devis gratuit" },
  { keyword: "Chantilly", url: "/chateaux/manoir-anglo-normand-chantilly", title: "Découvrir nos châteaux à Chantilly" },
  { keyword: "chantilly", url: "/chateaux/manoir-anglo-normand-chantilly", title: "Découvrir nos châteaux à Chantilly" },
  { keyword: "Oise", url: "/chateaux", title: "Châteaux dans l'Oise" },
  { keyword: "Yvelines", url: "/chateaux", title: "Châteaux dans les Yvelines" },
  { keyword: "Vallée de Chevreuse", url: "/chateaux/abbaye-millenaire-vallee-chevreuse", title: "Abbaye de la Vallée de Chevreuse" },
  { keyword: "Fontainebleau", url: "/chateaux", title: "Châteaux près de Fontainebleau" },
  { keyword: "Team Building", url: "/seminaires-soirees-entreprise", title: "Activités Team Building" },
  { keyword: "team building", url: "/seminaires-soirees-entreprise", title: "Activités Team Building" },
  { keyword: "séminaire", url: "/seminaires-soirees-entreprise", title: "Organiser un séminaire" },
  { keyword: "Séminaire", url: "/seminaires-soirees-entreprise", title: "Organiser un séminaire" },
  { keyword: "CODIR", url: "/seminaires-soirees-entreprise", title: "Organiser un CODIR" },
  { keyword: "événement d'entreprise", url: "/seminaires-soirees-entreprise", title: "Événements d'entreprise" },
  { keyword: "château", url: "/chateaux", title: "Nos châteaux" },
  { keyword: "Château", url: "/chateaux", title: "Nos châteaux" },
];

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

/**
 * Fonction d'auto-linking intelligente
 */
function applyAutoLinking(html: string): string {
  let result = html;

  AUTO_LINK_RULES.forEach((rule) => {
    const regex = new RegExp(
      `(?<!<a[^>]*>.*?)\\b(${rule.keyword})\\b(?![^<]*<\\/a>)`,
      "g"
    );

    let replaced = false;
    result = result.replace(regex, (match) => {
      if (replaced) return match;
      replaced = true;
      return `<a href="${rule.url}" class="auto-link" title="${rule.title || match}">${match}</a>`;
    });
  });

  return result;
}

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export function MarkdownRenderer({ content, className = "" }: MarkdownRendererProps) {
  // Sanitize + auto-link en un seul pass mémorisé
  const safeContent = useMemo(() => {
    const sanitized = sanitizeHTML(content);
    return applyAutoLinking(sanitized);
  }, [content]);

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

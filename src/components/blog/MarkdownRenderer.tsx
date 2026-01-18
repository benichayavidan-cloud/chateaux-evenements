"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

/**
 * AUTO-LINKER CONFIGURATION
 * Transforme automatiquement certains mots en liens internes
 */
const AUTO_LINK_RULES: { keyword: string; url: string; title?: string }[] = [
  // Pages principales
  { keyword: "devis", url: "/devis", title: "Demander un devis gratuit" },
  { keyword: "Devis", url: "/devis", title: "Demander un devis gratuit" },
  { keyword: "DEVIS", url: "/devis", title: "Demander un devis gratuit" },

  // Lieux géographiques
  { keyword: "Chantilly", url: "/chateaux/manoir-anglo-normand-chantilly", title: "Découvrir nos châteaux à Chantilly" },
  { keyword: "chantilly", url: "/chateaux/manoir-anglo-normand-chantilly", title: "Découvrir nos châteaux à Chantilly" },
  { keyword: "Oise", url: "/chateaux", title: "Châteaux dans l'Oise" },
  { keyword: "Yvelines", url: "/chateaux", title: "Châteaux dans les Yvelines" },
  { keyword: "Vallée de Chevreuse", url: "/chateaux/monastere-vallee-chevreuse", title: "Abbaye de la Vallée de Chevreuse" },
  { keyword: "Fontainebleau", url: "/chateaux", title: "Châteaux près de Fontainebleau" },

  // Services
  { keyword: "Team Building", url: "/team-building", title: "Activités Team Building" },
  { keyword: "team building", url: "/team-building", title: "Activités Team Building" },
  { keyword: "séminaire", url: "/evenements", title: "Organiser un séminaire" },
  { keyword: "Séminaire", url: "/evenements", title: "Organiser un séminaire" },
  { keyword: "CODIR", url: "/evenements", title: "Organiser un CODIR" },
  { keyword: "événement d'entreprise", url: "/evenements", title: "Événements d'entreprise" },
  { keyword: "événement entreprise", url: "/evenements", title: "Événements d'entreprise" },

  // Châteaux spécifiques
  { keyword: "château", url: "/chateaux", title: "Nos châteaux" },
  { keyword: "Château", url: "/chateaux", title: "Nos châteaux" },
];

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

/**
 * Fonction d'auto-linking intelligente
 * Transforme le texte brut en HTML avec liens automatiques
 */
function applyAutoLinking(html: string): string {
  let result = html;

  // Applique chaque règle de linking
  AUTO_LINK_RULES.forEach((rule) => {
    // Regex pour trouver le mot HORS des balises <a>
    // Utilise un negative lookahead/lookbehind pour éviter de linker ce qui est déjà linké
    const regex = new RegExp(
      `(?<!<a[^>]*>.*?)\\b(${rule.keyword})\\b(?![^<]*<\\/a>)`,
      "g"
    );

    // Remplace seulement la PREMIÈRE occurrence (pour éviter la sur-optimisation)
    let replaced = false;
    result = result.replace(regex, (match) => {
      if (replaced) return match;
      replaced = true;
      return `<a href="${rule.url}" class="auto-link" title="${rule.title || match}">${match}</a>`;
    });
  });

  return result;
}

export function MarkdownRenderer({ content, className = "" }: MarkdownRendererProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      // Applique l'auto-linking après le rendu initial
      const linkedContent = applyAutoLinking(contentRef.current.innerHTML);
      contentRef.current.innerHTML = linkedContent;
    }
  }, [content]);

  return (
    <div
      ref={contentRef}
      className={`prose prose-lg max-w-none ${className}`}
      dangerouslySetInnerHTML={{ __html: content }}
      style={{
        // Styles pour le contenu Markdown
        fontFamily: "Merriweather, Georgia, serif",
        lineHeight: 1.8,
        color: "#1f2937"
      }}
    />
  );
}

// Styles CSS à ajouter globalement ou dans un fichier CSS
export const markdownStyles = `
  /* Typography */
  .prose h2 {
    font-family: 'Inter', sans-serif;
    font-size: 2rem;
    font-weight: 300;
    font-style: italic;
    color: #111827;
    margin-top: 3rem;
    margin-bottom: 1.5rem;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid #d4af37;
  }

  .prose h3 {
    font-family: 'Inter', sans-serif;
    font-size: 1.5rem;
    font-weight: 600;
    color: #1f2937;
    margin-top: 2.5rem;
    margin-bottom: 1rem;
  }

  .prose h4 {
    font-family: 'Inter', sans-serif;
    font-size: 1.25rem;
    font-weight: 600;
    color: #374151;
    margin-top: 2rem;
    margin-bottom: 0.75rem;
  }

  /* Paragraphs */
  .prose p {
    margin-bottom: 1.5rem;
    line-height: 1.9;
  }

  .prose p.lead {
    font-size: 1.25rem;
    font-weight: 400;
    color: #4b5563;
    margin-bottom: 2rem;
    line-height: 1.8;
  }

  /* Lists */
  .prose ul, .prose ol {
    margin-left: 1.5rem;
    margin-bottom: 1.5rem;
  }

  .prose li {
    margin-bottom: 0.75rem;
    line-height: 1.8;
  }

  /* Links - Auto-linked */
  .prose .auto-link {
    color: #d4af37;
    text-decoration: underline;
    text-decoration-color: rgba(212, 175, 55, 0.3);
    text-underline-offset: 3px;
    transition: all 0.3s ease;
    font-weight: 500;
  }

  .prose .auto-link:hover {
    color: #b8941f;
    text-decoration-color: #d4af37;
    background-color: rgba(212, 175, 55, 0.05);
    padding: 0 4px;
    border-radius: 3px;
  }

  /* Regular links */
  .prose a:not(.auto-link) {
    color: #2563eb;
    text-decoration: none;
    border-bottom: 1px solid rgba(37, 99, 235, 0.3);
    transition: border-color 0.3s ease;
  }

  .prose a:not(.auto-link):hover {
    border-bottom-color: #2563eb;
  }

  /* Blockquotes */
  .prose blockquote {
    border-left: 4px solid #d4af37;
    padding-left: 1.5rem;
    margin: 2rem 0;
    font-style: italic;
    color: #4b5563;
    background-color: #fafaf9;
    padding: 1.5rem;
    border-radius: 0.5rem;
  }

  .prose blockquote cite {
    display: block;
    margin-top: 1rem;
    font-size: 0.875rem;
    font-style: normal;
    color: #6b7280;
  }

  /* Tables */
  .prose table {
    width: 100%;
    border-collapse: collapse;
    margin: 2rem 0;
    font-size: 0.9375rem;
  }

  .prose th {
    background-color: #f9fafb;
    padding: 1rem;
    text-align: left;
    font-weight: 600;
    color: #111827;
    border-bottom: 2px solid #e5e7eb;
  }

  .prose td {
    padding: 1rem;
    border-bottom: 1px solid #e5e7eb;
  }

  .prose tr:hover {
    background-color: #fafaf9;
  }

  /* Custom Components */
  .prose .alert {
    padding: 1.5rem;
    border-radius: 0.75rem;
    margin: 2rem 0;
    border-left: 4px solid;
  }

  .prose .alert-info {
    background-color: #eff6ff;
    border-color: #3b82f6;
    color: #1e40af;
  }

  .prose .price-table {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
    margin: 2rem 0;
  }

  .prose .price-card {
    background: white;
    border: 2px solid #e5e7eb;
    border-radius: 1rem;
    padding: 2rem;
    transition: all 0.3s ease;
  }

  .prose .price-card:hover {
    border-color: #d4af37;
    box-shadow: 0 10px 40px rgba(212, 175, 55, 0.1);
    transform: translateY(-4px);
  }

  .prose .price-card.featured {
    border-color: #d4af37;
    background: linear-gradient(135deg, #fffbeb 0%, #ffffff 100%);
    box-shadow: 0 10px 40px rgba(212, 175, 55, 0.15);
  }

  .prose .price-card h4 {
    margin: 0 0 1rem 0;
    font-size: 1.25rem;
  }

  .prose .price-card .price {
    font-size: 2rem;
    font-weight: 700;
    color: #d4af37;
    margin-bottom: 1.5rem;
  }

  .prose .price-card ul {
    list-style: none;
    padding: 0;
    margin: 0 0 1.5rem 0;
  }

  .prose .price-card li {
    padding-left: 1.5rem;
    position: relative;
    margin-bottom: 0.75rem;
  }

  .prose .price-card li::before {
    content: "✓";
    position: absolute;
    left: 0;
    color: #10b981;
    font-weight: bold;
  }

  /* CTA Box */
  .prose .cta-box {
    background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
    color: white;
    padding: 3rem;
    border-radius: 1.5rem;
    text-align: center;
    margin: 3rem 0;
  }

  .prose .cta-box h4 {
    color: white;
    margin-top: 0;
  }

  .prose .cta-box p {
    color: #cbd5e1;
  }

  .prose .btn-primary {
    display: inline-block;
    background-color: #d4af37;
    color: white;
    padding: 1rem 2rem;
    border-radius: 9999px;
    font-weight: 600;
    text-decoration: none;
    transition: all 0.3s ease;
    border: none;
  }

  .prose .btn-primary:hover {
    background-color: #b8941f;
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(212, 175, 55, 0.3);
  }

  .prose .guarantee {
    font-size: 0.875rem;
    color: #94a3b8 !important;
    margin-top: 1rem;
  }

  /* Images */
  .prose img {
    border-radius: 1rem;
    margin: 2rem 0;
  }

  /* Code */
  .prose code {
    background-color: #f1f5f9;
    padding: 0.2rem 0.4rem;
    border-radius: 0.25rem;
    font-size: 0.875em;
    color: #0f172a;
  }

  .prose pre {
    background-color: #1e293b;
    color: #e2e8f0;
    padding: 1.5rem;
    border-radius: 0.75rem;
    overflow-x: auto;
    margin: 2rem 0;
  }
`;

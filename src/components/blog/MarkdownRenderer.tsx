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
      className={`prose prose-lg ${className}`}
      dangerouslySetInnerHTML={{ __html: content }}
      style={{
        // Styles pour le contenu Markdown
        fontFamily: "Merriweather, Georgia, serif",
        lineHeight: 1.8,
        color: "#1f2937",
        display: 'block',
        columnCount: 'unset',
        columns: 'unset',
        columnWidth: 'unset',
        columnGap: 'unset',
        columnRule: 'unset'
      }}
    />
  );
}
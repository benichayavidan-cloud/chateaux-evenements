/**
 * Rendu du corps d'article.
 *
 * Le HTML reçu est DÉJÀ assaini, maillé et ancré : tout le traitement vit
 * dans article-html.ts et s'exécute à la prégénération (voir l'en-tête de ce
 * module). Ce composant ne fait plus que poser le markup et la typographie.
 */

interface MarkdownRendererProps {
  /** HTML préparé par prepareArticleHtml(). */
  html: string;
  className?: string;
}

export function MarkdownRenderer({ html, className = "" }: MarkdownRendererProps) {
  return (
    <div
      className={`prose prose-lg ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
      style={{
        fontFamily: "Merriweather, Georgia, serif",
        lineHeight: 1.8,
        color: "#1f2937",
        display: 'block',
      }}
    />
  );
}

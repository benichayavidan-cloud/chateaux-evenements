import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className = "" }: BreadcrumbsProps) {
  // Générer le schema JSON-LD pour les breadcrumbs
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Accueil",
        "item": "https://www.selectchateaux.com/"
      },
      ...items.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 2,
        "name": item.label,
        ...(item.href ? { "item": `https://www.selectchateaux.com${item.href}` } : {})
      }))
    ]
  };

  return (
    <>
      {/* Schema JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Breadcrumbs visibles */}
      <nav aria-label="Fil d'Ariane" className={`py-4 ${className}`}>
        <ol className="flex items-center space-x-2 text-sm">
          {/* Accueil */}
          <li>
            <Link
              href="/"
              className="flex items-center text-gray-600 hover:text-[var(--bronze-antique)] transition-colors"
            >
              <Home className="w-4 h-4" />
              <span className="sr-only">Accueil</span>
            </Link>
          </li>

          {/* Items dynamiques */}
          {items.map((item, index) => (
            <li key={index} className="flex items-center space-x-2">
              <ChevronRight className="w-4 h-4 text-gray-400" />
              {item.href ? (
                <Link
                  href={item.href}
                  className="text-gray-600 hover:text-[var(--bronze-antique)] transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-gray-900 font-medium">{item.label}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}

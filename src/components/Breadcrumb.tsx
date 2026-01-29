"use client";

import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbProps {
  items?: BreadcrumbItem[];
  customSchema?: boolean;
}

export function Breadcrumb({ items, customSchema = false }: BreadcrumbProps) {
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);

  // Détection de la taille d'écran
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Génération automatique des breadcrumbs basée sur l'URL
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    if (items) return items;

    const paths = pathname.split("/").filter(Boolean);
    const breadcrumbs: BreadcrumbItem[] = [];

    paths.forEach((path, index) => {
      const href = "/" + paths.slice(0, index + 1).join("/");
      let label = path
        .replace(/-/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase());

      // Labels personnalisés
      const labelMap: Record<string, string> = {
        chateaux: "Nos Châteaux",
        evenements: "Événements",
        "team-building": "Team Building",
        devis: "Devis Séminaire",
        contact: "Contact",
        "mentions-legales": "Mentions Légales",
        cgv: "Conditions Générales",
        confidentialite: "Confidentialité",
      };

      if (labelMap[path]) {
        label = labelMap[path];
      }

      breadcrumbs.push({ label, href });
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  // Ne pas afficher sur la page d'accueil
  if (pathname === "/") return null;

  // Génération du schema BreadcrumbList
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Accueil",
        "item": "https://www.selectchateaux.com/",
      },
      ...breadcrumbs.map((crumb, index) => ({
        "@type": "ListItem",
        "position": index + 2,
        "name": crumb.label,
        "item": `https://www.selectchateaux.com${crumb.href}`,
      })),
    ],
  };

  return (
    <>
      {/* Schema JSON-LD */}
      {!customSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      )}

      {/* Breadcrumb visuel */}
      <nav
        aria-label="Fil d'Ariane"
        style={{
          padding: isMobile ? "0.375rem 1rem" : "0.5rem clamp(1rem, 4vw, 2rem)",
          background: "#fafafa",
          borderBottom: "1px solid #e5e7eb",
          marginTop: "80px",
        }}
      >
        <ol
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: isMobile ? "0.375rem" : "0.5rem",
            maxWidth: "1400px",
            margin: "0 auto",
            listStyle: "none",
            padding: 0,
          }}
        >
          {/* Accueil */}
          <li style={{ display: "flex", alignItems: "center", gap: isMobile ? "0.375rem" : "0.5rem" }}>
            <Link
              href="/"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.375rem",
                color: "#6b7280",
                fontSize: isMobile ? "0.6875rem" : "0.75rem",
                textDecoration: "none",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#A37E2C")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#6b7280")}
              aria-label="Retour à l'accueil"
            >
              <Home className={isMobile ? "w-3.5 h-3.5" : "w-4 h-4"} />
              {!isMobile && <span>Accueil</span>}
            </Link>
            <ChevronRight className={isMobile ? "w-3.5 h-3.5 text-gray-400" : "w-4 h-4 text-gray-400"} />
          </li>

          {/* Autres éléments */}
          {breadcrumbs.map((crumb, index) => {
            const isLast = index === breadcrumbs.length - 1;
            const truncatedLabel = isMobile && crumb.label.length > 20
              ? crumb.label.slice(0, 20) + "..."
              : crumb.label;

            return (
              <li
                key={crumb.href}
                style={{ display: "flex", alignItems: "center", gap: isMobile ? "0.375rem" : "0.5rem" }}
              >
                {isLast ? (
                  <span
                    style={{
                      color: "#111827",
                      fontSize: isMobile ? "0.6875rem" : "0.75rem",
                      fontWeight: 600,
                      maxWidth: isMobile ? "180px" : "none",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                    title={crumb.label}
                  >
                    {truncatedLabel}
                  </span>
                ) : (
                  <>
                    <Link
                      href={crumb.href}
                      style={{
                        color: "#6b7280",
                        fontSize: isMobile ? "0.6875rem" : "0.75rem",
                        textDecoration: "none",
                        transition: "color 0.2s",
                        maxWidth: isMobile ? "120px" : "none",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = "#A37E2C")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color = "#6b7280")
                      }
                      title={crumb.label}
                    >
                      {truncatedLabel}
                    </Link>
                    <ChevronRight className={isMobile ? "w-3.5 h-3.5 text-gray-400" : "w-4 h-4 text-gray-400"} />
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { SeoCluster } from "@/data/seo-clusters";

/**
 * Renvoi vers la page de référence de la zone, en tête d'article.
 *
 * Mesuré le 01/09/2026 : sur « séminaire chantilly » et « séminaire yvelines »,
 * Google classait un article de blog AVANT la landing dédiée — qui fait pourtant
 * 2 200 à 2 800 mots avec sa FAQ et son formulaire. Le trafic commercial
 * atterrissait donc sur une page qui n'est pas conçue pour convertir.
 *
 * Les articles de zone sont des satellites : ce bloc l'énonce, avec un lien
 * haut de page et l'ancre exacte du cluster. Il sert autant le lecteur venu
 * pour réserver que le signal envoyé à Google.
 */
export function PageDeReference({ cluster }: { cluster: SeoCluster }) {
  return (
    <aside
      style={{
        display: "flex",
        alignItems: "center",
        gap: "14px",
        flexWrap: "wrap",
        background: "#FFFFFF",
        border: "1px solid #E8E2D4",
        borderLeft: "3px solid #C9A961",
        borderRadius: "12px",
        padding: "16px 20px",
        marginBottom: "8px",
      }}
    >
      <p style={{ margin: 0, flex: "1 1 260px", fontSize: "0.9375rem", lineHeight: 1.6, color: "#4B5563" }}>
        Vous préparez un événement dans cette région&nbsp;? Notre page dédiée réunit les
        domaines, les capacités et les budgets constatés.
      </p>
      <Link
        href={cluster.canonical}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          whiteSpace: "nowrap",
          fontWeight: 600,
          fontSize: "0.9375rem",
          color: "#8A6A28",
          textDecoration: "underline",
          textUnderlineOffset: "3px",
        }}
      >
        {cluster.anchorText}
        <ArrowRight className="w-4 h-4" aria-hidden="true" />
      </Link>
    </aside>
  );
}

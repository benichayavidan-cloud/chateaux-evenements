/**
 * Menu des rubriques d'un domaine (« Le domaine · Salles · Chambres… »).
 * Server Component : de vrais liens <a href> que Google suit.
 * Mobile : une ligne qui défile horizontalement.
 */
import Link from "next/link";
import { theme } from "@/design-system/tokens";
import styles from "@/components/domaine/domaine.module.css";
import { LIBELLES, urlRubrique } from "@/lib/rubriques";
import type { RubriqueId } from "@/types/rubriques";

interface RubriquesNavProps {
  slug: string;
  rubriques: RubriqueId[];
  /** Rubrique affichée ; absent = accueil du domaine. */
  active?: RubriqueId;
}

export function RubriquesNav({ slug, rubriques, active }: RubriquesNavProps) {
  if (rubriques.length === 0) return null;

  const liens: Array<{ href: string; label: string; actif: boolean }> = [
    { href: `/chateaux/${slug}`, label: "Le domaine", actif: active === undefined },
    ...rubriques.map((id) => ({ href: urlRubrique(slug, id), label: LIBELLES[id], actif: id === active })),
  ];

  return (
    <nav aria-label="Rubriques du domaine" className={`${styles.domaine} -mx-4 overflow-x-auto px-4 md:mx-0 md:px-0`}>
      <ul className={`${styles.menuRubriques} flex gap-2 py-2`}>
        {liens.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              aria-current={l.actif ? "page" : undefined}
              className="inline-block whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition-colors"
              style={
                l.actif
                  ? { background: theme.colors.primary.bronze, color: "#FFFFFF" }
                  : {
                      background: theme.colors.neutral.gray50,
                      color: theme.colors.neutral.gray700,
                      border: `1px solid ${theme.colors.neutral.gray200}`,
                    }
              }
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

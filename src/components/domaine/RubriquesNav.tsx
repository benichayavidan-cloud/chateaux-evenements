/**
 * Menu des rubriques d'un domaine (« Le domaine · Salles · Chambres… »).
 * Server Component : de vrais liens <a href> que Google suit.
 * Onglets soulignés (modèle PO du 17/11/2026) : texte simple, onglet actif
 * doré avec un trait ; la ligne fine sous le menu est tracée par le parent,
 * sur la largeur qu'il choisit. Centré ; sur mobile, une ligne qui défile.
 */
import Link from "next/link";
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
    <nav aria-label="Rubriques du domaine" className={`${styles.domaine} ${styles.navRubriques}`}>
      <ul className={styles.menuRubriques}>
        {liens.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              aria-current={l.actif ? "page" : undefined}
              className={`${styles.onglet} ${l.actif ? styles.ongletActif : ""}`}
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

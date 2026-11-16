/**
 * Accueil du domaine : une carte par rubrique (photo, résumé, « Découvrir → »).
 * Server Component, rendu dans la fiche château entre la vue d'ensemble et
 * l'hébergement. Rien n'est rendu si le château n'a pas encore de rubriques.
 */
import Image from "next/image";
import Link from "next/link";
import { theme } from "@/design-system/tokens";
import styles from "@/components/domaine/domaine.module.css";
import { rubrique as lireRubrique, urlRubrique } from "@/lib/rubriques";
import type { RubriqueId } from "@/types/rubriques";

interface DecouvrirDomaineProps {
  slug: string;
  rubriques: RubriqueId[];
}

export function DecouvrirDomaine({ slug, rubriques }: DecouvrirDomaineProps) {
  if (rubriques.length === 0) return null;

  return (
    <section className={`${styles.domaine} py-12 md:py-16`} aria-labelledby="decouvrir-domaine">
      <div className="mx-auto w-full max-w-[1200px] px-4 md:px-8">
        <h2
          id="decouvrir-domaine"
          className="mb-6 text-2xl font-semibold md:text-3xl"
          style={{ fontFamily: theme.typography.fonts.heading, color: theme.colors.neutral.gray900 }}
        >
          Découvrir le domaine
        </h2>
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {rubriques.map((id) => {
            const r = lireRubrique(slug, id);
            if (!r) return null;
            const photo = r.photos[0];
            return (
              <li key={id}>
                <Link
                  href={urlRubrique(slug, id)}
                  className="group block h-full overflow-hidden rounded-2xl transition-shadow hover:shadow-lg"
                  style={{ border: `1px solid ${theme.colors.neutral.gray200}`, background: "#FFFFFF" }}
                >
                  {photo && (
                    <div className="relative aspect-[4/3] w-full overflow-hidden">
                      <Image
                        src={photo.src}
                        alt={photo.legende}
                        fill
                        loading="lazy"
                        sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  )}
                  <div className="p-4 md:p-5">
                    <h3 className="text-lg font-semibold" style={{ fontFamily: theme.typography.fonts.heading, color: theme.colors.neutral.gray900 }}>
                      {r.titre}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed" style={{ color: theme.colors.neutral.gray600 }}>{r.resume}</p>
                    <span className="mt-3 inline-block text-sm font-semibold" style={{ color: theme.colors.primary.bronze }}>
                      Découvrir →
                    </span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

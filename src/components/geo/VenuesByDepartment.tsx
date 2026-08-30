/**
 * Bloc « tous les lieux du département » ajouté sous les landings géo.
 *
 * Server component volontaire : les 72 fiches ne doivent pas entrer dans le
 * bundle client (GeoLandingPage est déjà un gros composant client), et le HTML
 * doit rester lisible par les moteurs de réponse IA qui n'exécutent pas le JS.
 *
 * C'est ce bloc qui donne enfin de la profondeur aux landings : elles
 * plafonnaient en page 3 en n'affichant qu'un ou deux lieux, quand les articles
 * de blog concurrents en comparaient des dizaines.
 */

import NextLink from "next/link";
import Image from "next/image";
import { Users, BedDouble, LayoutGrid } from "lucide-react";
import { venues } from "@/data/venues";

interface VenuesByDepartmentProps {
  /** Départements à afficher, dans l'ordre. */
  departments: string[];
  /** Titre de section — doit reprendre la formulation cible de la landing. */
  title: string;
  intro?: string;
  /** Au-delà, on tronque pour ne pas noyer la page. */
  limit?: number;
}

export function VenuesByDepartment({ departments, title, intro, limit = 24 }: VenuesByDepartmentProps) {
  const list = departments
    .flatMap(code => venues.filter(v => v.departementCode === code))
    .sort((a, b) => b.capacite - a.capacite)
    .slice(0, limit);

  if (list.length === 0) return null;

  const capMin = Math.min(...list.map(v => v.capacite));
  const capMax = Math.max(...list.map(v => v.capacite));

  return (
    <section className="bg-neutral-50 py-16" aria-labelledby="venues-heading">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 id="venues-heading" className="mb-3 text-2xl font-semibold text-neutral-900 sm:text-3xl">
          {title}
        </h2>
        <p className="mb-8 max-w-3xl leading-relaxed text-neutral-700">
          {intro ?? (
            <>
              {list.length} lieux vérifiés, de {capMin} à {capMax} personnes. Capacités,
              chambres et équipements réels — pas d&apos;estimation. Devis sous 48 h.
            </>
          )}
        </p>

        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {list.map(v => (
            <li key={v.slug}>
              <NextLink
                href={`/lieux/${v.slug}`}
                className="group block h-full overflow-hidden rounded-lg border border-neutral-200 bg-white transition-colors hover:border-[#A37E2C]"
              >
                <div className="relative aspect-[4/3] bg-neutral-100">
                  {v.photos[0] && (
                    <Image
                      src={v.photos[0].url}
                      alt={v.photos[0].legende || v.nom}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  )}
                </div>
                <div className="p-4">
                  <p className="mb-1 text-xs uppercase tracking-wider text-neutral-500">
                    {v.categorie}{v.ville ? ` · ${v.ville}` : ""}
                  </p>
                  <h3 className="mb-3 font-medium leading-snug text-neutral-900">{v.nom}</h3>
                  <p className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-neutral-600">
                    <span className="inline-flex items-center gap-1.5">
                      <Users className="h-3.5 w-3.5" aria-hidden="true" />
                      <span className="tabular-nums">{v.capacite}</span>
                    </span>
                    {v.chambres ? (
                      <span className="inline-flex items-center gap-1.5">
                        <BedDouble className="h-3.5 w-3.5" aria-hidden="true" />
                        <span className="tabular-nums">{v.chambres}</span>
                      </span>
                    ) : null}
                    {v.sallesReunion ? (
                      <span className="inline-flex items-center gap-1.5">
                        <LayoutGrid className="h-3.5 w-3.5" aria-hidden="true" />
                        <span className="tabular-nums">{v.sallesReunion}</span>
                      </span>
                    ) : null}
                  </p>
                </div>
              </NextLink>
            </li>
          ))}
        </ul>

        <p className="mt-8">
          <NextLink href="/lieux" className="font-medium text-[#8B6A24] underline">
            Voir les {venues.length} lieux de séminaire en Île-de-France et Oise
          </NextLink>
        </p>
      </div>
    </section>
  );
}

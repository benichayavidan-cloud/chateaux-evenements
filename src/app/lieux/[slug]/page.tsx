/**
 * FICHE LIEU — Server Component.
 *
 * Rendu 100 % serveur, sans JavaScript requis : ces pages visent autant Google
 * que les moteurs de réponse IA, qui n'exécutent pas le JS. Toutes les données
 * viennent du CRM (src/data/venues.ts, généré) — aucune prose inventée.
 */

import { notFound } from "next/navigation";
import Image from "next/image";
import NextLink from "next/link";
import type { Metadata } from "next";
import { MapPin, Users, BedDouble, LayoutGrid, Car, ArrowRight } from "lucide-react";
import { venues, getVenueBySlug, getVenuesByDepartment } from "@/data/venues";
import { StructuredData } from "@/components/StructuredData";
import { metaDescription } from "@/lib/seo";
import DevisFormMini from "@/components/DevisFormMini";

export const dynamicParams = false;

export function generateStaticParams() {
  return venues.map(v => ({ slug: v.slug }));
}

type Props = { params: Promise<{ slug: string }> };

/** Landing départementale correspondante — cible du lien montant. */
const DEPARTMENT_LANDING: Record<string, string | undefined> = {
  "78": "/seminaire-chateau-yvelines-78",
  "60": "/seminaire-chateau-oise-60",
  "92": "/seminaire-chateau-hauts-de-seine-92",
};

function titleFor(v: NonNullable<ReturnType<typeof getVenueBySlug>>) {
  const where = v.ville ? `${v.ville} (${v.departementCode})` : `${v.departementCode}`;
  return `${v.nom} — Séminaire à ${where}, ${v.capacite} pers.`;
}

/**
 * Bloc « réponse directe » : 40 à 60 mots, en tête de page, construits sur des
 * faits chiffrés. C'est la portion que les modèles de langage extraient et citent.
 */
function reponseDirecte(v: NonNullable<ReturnType<typeof getVenueBySlug>>) {
  const parts = [
    `${v.nom} accueille les séminaires d'entreprise jusqu'à ${v.capacite} personnes`,
    v.ville ? `à ${v.ville}` : null,
    v.departement ? `(${v.departement}, ${v.departementCode})` : null,
  ].filter(Boolean).join(" ");
  const equip = [
    v.chambres ? `${v.chambres} chambres` : null,
    v.sallesReunion ? `${v.sallesReunion} salles de réunion` : null,
    v.parking ? `${v.parking} places de parking` : null,
  ].filter(Boolean);
  return `${parts}. ${equip.length ? `Le lieu dispose de ${equip.join(", ")}. ` : ""}Devis sous 48 h via Select Châteaux.`;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const v = getVenueBySlug(slug);
  if (!v) return { title: "Lieu introuvable" };

  const url = `https://www.selectchateaux.com/lieux/${v.slug}`;
  return {
    title: titleFor(v),
    description: metaDescription(reponseDirecte(v)),
    metadataBase: new URL("https://www.selectchateaux.com"),
    alternates: { canonical: url },
    robots: { index: true, follow: true },
    openGraph: {
      type: "website",
      title: titleFor(v),
      description: reponseDirecte(v),
      url,
      siteName: "Select Châteaux",
      locale: "fr_FR",
      images: v.photos[0] ? [{ url: v.photos[0].url, width: 1200, height: 630, alt: v.nom }] : [],
    },
  };
}

export default async function LieuPage({ params }: Props) {
  const { slug } = await params;
  const v = getVenueBySlug(slug);
  if (!v) notFound();

  const voisins = getVenuesByDepartment(v.departementCode).filter(x => x.slug !== v.slug).slice(0, 6);
  const landing = DEPARTMENT_LANDING[v.departementCode];
  const url = `https://www.selectchateaux.com/lieux/${v.slug}`;

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "EventVenue",
        "@id": `${url}#venue`,
        name: v.nom,
        description: v.description.slice(0, 600),
        url,
        maximumAttendeeCapacity: v.capacite,
        ...(v.photos.length ? { image: v.photos.slice(0, 6).map(p => p.url) } : {}),
        address: {
          "@type": "PostalAddress",
          ...(v.adresse ? { streetAddress: v.adresse } : {}),
          ...(v.ville ? { addressLocality: v.ville } : {}),
          ...(v.codePostal ? { postalCode: v.codePostal } : {}),
          ...(v.region ? { addressRegion: v.region } : {}),
          addressCountry: "FR",
        },
        ...(v.latitude != null && v.longitude != null
          ? { geo: { "@type": "GeoCoordinates", latitude: v.latitude, longitude: v.longitude } }
          : {}),
        ...(v.equipements.length
          ? { amenityFeature: v.equipements.map(a => ({ "@type": "LocationFeatureSpecification", name: a, value: true })) }
          : {}),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Accueil", item: "https://www.selectchateaux.com/" },
          { "@type": "ListItem", position: 2, name: "Lieux de séminaire", item: "https://www.selectchateaux.com/lieux" },
          { "@type": "ListItem", position: 3, name: v.nom, item: url },
        ],
      },
    ],
  };

  const chiffres = [
    { icon: Users, label: "Capacité", value: `${v.capacite} pers.` },
    v.chambres ? { icon: BedDouble, label: "Chambres", value: `${v.chambres}` } : null,
    v.sallesReunion ? { icon: LayoutGrid, label: "Salles", value: `${v.sallesReunion}` } : null,
    v.parking ? { icon: Car, label: "Parking", value: `${v.parking} pl.` } : null,
  ].filter(Boolean) as { icon: typeof Users; label: string; value: string }[];

  return (
    <>
      <StructuredData data={schema} />

      <main className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
          <nav aria-label="Fil d'Ariane" className="mb-6 text-sm text-neutral-500">
            <NextLink href="/" className="hover:text-neutral-900">Accueil</NextLink>
            <span className="mx-2">/</span>
            <NextLink href="/lieux" className="hover:text-neutral-900">Lieux de séminaire</NextLink>
            <span className="mx-2">/</span>
            <span className="text-neutral-900">{v.nom}</span>
          </nav>

          <header className="mb-8">
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.14em] text-[#A37E2C]">
              {v.categorie}
              {v.departement ? ` · ${v.departement} (${v.departementCode})` : ""}
            </p>
            <h1 className="text-3xl font-semibold leading-tight text-neutral-900 sm:text-4xl lg:text-5xl">
              {v.nom}
            </h1>
            {v.ville && (
              <p className="mt-3 flex items-center gap-2 text-neutral-600">
                <MapPin className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>{v.adresse || `${v.ville} (${v.codePostal ?? v.departementCode})`}</span>
              </p>
            )}
          </header>

          {/* Réponse directe : la portion que Google et les IA extraient. */}
          <p className="mb-10 border-l-4 border-[#A37E2C] bg-neutral-50 py-4 pl-5 pr-4 text-lg leading-relaxed text-neutral-800">
            {reponseDirecte(v)}
          </p>

          {v.photos.length > 0 && (
            <section aria-label="Photos du lieu" className="mb-10 grid grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-4">
              {v.photos.slice(0, 8).map((p, i) => (
                <div
                  key={p.url}
                  className={`relative overflow-hidden rounded-lg bg-neutral-100 ${i === 0 ? "col-span-2 row-span-2 aspect-square lg:aspect-auto" : "aspect-[4/3]"}`}
                >
                  <Image
                    src={p.url}
                    alt={p.legende || `${v.nom} — ${p.categorie || "vue du lieu"}`}
                    fill
                    sizes={i === 0 ? "(max-width: 1024px) 100vw, 50vw" : "(max-width: 1024px) 50vw, 25vw"}
                    className="object-cover"
                    priority={i === 0}
                  />
                </div>
              ))}
            </section>
          )}

          <section aria-label="Chiffres clés" className="mb-12 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-neutral-200 bg-neutral-200 sm:grid-cols-4">
            {chiffres.map(c => (
              <div key={c.label} className="bg-white px-4 py-5">
                <c.icon className="mb-2 h-5 w-5 text-[#A37E2C]" aria-hidden="true" />
                <div className="text-2xl font-semibold tabular-nums text-neutral-900">{c.value}</div>
                <div className="text-xs uppercase tracking-wider text-neutral-500">{c.label}</div>
              </div>
            ))}
          </section>

          <div className="grid gap-12 lg:grid-cols-[1fr_360px]">
            <div>
              <section className="mb-12">
                <h2 className="mb-4 text-2xl font-semibold text-neutral-900">
                  Le lieu
                </h2>
                {v.description.split(/\n{2,}/).filter(Boolean).map((para, i) => (
                  <p key={i} className="mb-4 leading-relaxed text-neutral-700">{para.trim()}</p>
                ))}
              </section>

              {v.salles.length > 0 && (
                <section className="mb-12">
                  <h2 className="mb-4 text-2xl font-semibold text-neutral-900">Salles de réunion</h2>
                  <div className="overflow-x-auto rounded-lg border border-neutral-200">
                    <table className="w-full min-w-[480px] text-sm">
                      <thead className="bg-neutral-50 text-xs uppercase tracking-wider text-neutral-500">
                        <tr>
                          <th className="px-4 py-3 text-left font-medium">Salle</th>
                          <th className="px-4 py-3 text-right font-medium">Surface</th>
                          <th className="px-4 py-3 text-right font-medium">Théâtre</th>
                          <th className="px-4 py-3 text-right font-medium">En U</th>
                          <th className="px-4 py-3 text-right font-medium">Banquet</th>
                        </tr>
                      </thead>
                      <tbody>
                        {v.salles.map(s => (
                          <tr key={s.nom} className="border-t border-neutral-100">
                            <td className="px-4 py-3 font-medium text-neutral-900">{s.nom}</td>
                            <td className="px-4 py-3 text-right tabular-nums text-neutral-600">{s.surface ? `${s.surface} m²` : "—"}</td>
                            <td className="px-4 py-3 text-right tabular-nums text-neutral-600">{s.theatre ?? "—"}</td>
                            <td className="px-4 py-3 text-right tabular-nums text-neutral-600">{s.u ?? "—"}</td>
                            <td className="px-4 py-3 text-right tabular-nums text-neutral-600">{s.banquet ?? "—"}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>
              )}

              {(v.equipements.length > 0 || v.atouts.length > 0) && (
                <section className="mb-12">
                  <h2 className="mb-4 text-2xl font-semibold text-neutral-900">Équipements et services</h2>
                  <ul className="flex flex-wrap gap-2">
                    {[...new Set([...v.atouts, ...v.equipements, ...v.services])].map(e => (
                      <li key={e} className="rounded-full border border-neutral-200 px-3 py-1.5 text-sm text-neutral-700">
                        {e}
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {landing && (
                <p className="mb-12 rounded-lg border-l-4 border-[#A37E2C] bg-amber-50 py-4 pl-5 pr-4 text-neutral-800">
                  Vous comparez plusieurs adresses ?{" "}
                  <NextLink href={landing} className="font-medium text-[#8B6A24] underline">
                    Voir tous nos châteaux pour séminaire en {v.departement}
                  </NextLink>{" "}
                  — disponibilités et devis sous 48 h.
                </p>
              )}

              {voisins.length > 0 && (
                <section className="mb-12">
                  <h2 className="mb-4 text-2xl font-semibold text-neutral-900">
                    Autres lieux en {v.departement ?? `département ${v.departementCode}`}
                  </h2>
                  <ul className="grid gap-3 sm:grid-cols-2">
                    {voisins.map(n => (
                      <li key={n.slug}>
                        <NextLink
                          href={`/lieux/${n.slug}`}
                          className="group flex items-center justify-between gap-3 rounded-lg border border-neutral-200 px-4 py-3 transition-colors hover:border-[#A37E2C]"
                        >
                          <span>
                            <span className="block font-medium text-neutral-900">{n.nom}</span>
                            <span className="block text-sm text-neutral-500">
                              {n.ville} · {n.capacite} pers.
                              {n.chambres ? ` · ${n.chambres} ch.` : ""}
                            </span>
                          </span>
                          <ArrowRight className="h-4 w-4 shrink-0 text-neutral-400 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                        </NextLink>
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </div>

            <aside className="lg:sticky lg:top-24 lg:self-start">
              <DevisFormMini sourceLabel={`${v.nom} — ${v.ville ?? v.departementCode}`} />
            </aside>
          </div>
        </div>
      </main>
    </>
  );
}

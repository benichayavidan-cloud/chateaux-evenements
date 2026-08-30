/**
 * INDEX DES LIEUX — Server Component.
 * Répond au motif de requête « lieu séminaire <département> », le plus répandu
 * du marché après « team building <zone> ». Regroupé par département pour que
 * chaque bloc soit une cible crawlable distincte.
 */

import type { Metadata } from "next";
import NextLink from "next/link";
import Image from "next/image";
import { Users, BedDouble } from "lucide-react";
import { venues } from "@/data/venues";
import { StructuredData } from "@/components/StructuredData";

const DEPARTMENT_ORDER = ["78", "77", "60", "95", "91", "92"];
const DEPARTMENT_NAMES: Record<string, string> = {
  "78": "Yvelines", "77": "Seine-et-Marne", "60": "Oise",
  "95": "Val-d'Oise", "91": "Essonne", "92": "Hauts-de-Seine",
};

const total = venues.length;
const capaciteMax = Math.max(...venues.map(v => v.capacite));

export const metadata: Metadata = {
  title: `Lieux de Séminaire en Île-de-France : ${total} Domaines de 10 à ${capaciteMax} pers.`,
  description:
    `${total} lieux de séminaire vérifiés dans les Yvelines, l'Oise, la Seine-et-Marne, le Val-d'Oise, l'Essonne et les Hauts-de-Seine. Capacités, chambres et salles réelles. Devis sous 48 h.`,
  metadataBase: new URL("https://www.selectchateaux.com"),
  alternates: { canonical: "https://www.selectchateaux.com/lieux" },
  robots: { index: true, follow: true },
};

export default function LieuxPage() {
  const groupes = DEPARTMENT_ORDER
    .map(code => ({ code, nom: DEPARTMENT_NAMES[code], items: venues.filter(v => v.departementCode === code) }))
    .filter(g => g.items.length > 0);

  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Lieux de séminaire en Île-de-France",
    numberOfItems: total,
    itemListElement: venues.map((v, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `https://www.selectchateaux.com/lieux/${v.slug}`,
      name: v.nom,
    })),
  };

  return (
    <>
      <StructuredData data={schema} />
      <main className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <header className="mb-10">
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.14em] text-[#A37E2C]">
              Île-de-France et Oise
            </p>
            <h1 className="text-3xl font-semibold leading-tight text-neutral-900 sm:text-4xl lg:text-5xl">
              {total} lieux de séminaire, de 10 à {capaciteMax} personnes
            </h1>
            <p className="mt-4 max-w-3xl text-lg leading-relaxed text-neutral-700">
              Châteaux, domaines et hôtels privatisables dans les Yvelines, l&apos;Oise, la
              Seine-et-Marne, le Val-d&apos;Oise, l&apos;Essonne et les Hauts-de-Seine. Chaque
              fiche affiche la capacité, le nombre de chambres et les équipements réels du
              lieu. Devis sous 48 h.
            </p>
          </header>

          {groupes.map(g => (
            <section key={g.code} className="mb-14" id={`dept-${g.code}`}>
              <h2 className="mb-5 border-b border-neutral-200 pb-3 text-2xl font-semibold text-neutral-900">
                {g.nom} ({g.code}) — {g.items.length} lieux
              </h2>
              <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {g.items.map(v => (
                  <li key={v.slug}>
                    <NextLink
                      href={`/lieux/${v.slug}`}
                      className="group block overflow-hidden rounded-lg border border-neutral-200 transition-colors hover:border-[#A37E2C]"
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
                            <span className="tabular-nums">{v.capacite} pers.</span>
                          </span>
                          {v.chambres ? (
                            <span className="inline-flex items-center gap-1.5">
                              <BedDouble className="h-3.5 w-3.5" aria-hidden="true" />
                              <span className="tabular-nums">{v.chambres} ch.</span>
                            </span>
                          ) : null}
                        </p>
                      </div>
                    </NextLink>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </main>
    </>
  );
}

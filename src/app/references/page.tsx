/**
 * PAGE RÉFÉRENCES — études de cas issues des dossiers réels du CRM.
 * Server Component : contenu intégralement crawlable (Google + bots IA).
 * Répond notamment à l'intention « quelle agence peut organiser un séminaire
 * de 100-300 personnes en château en Île-de-France ».
 */

import type { Metadata } from "next";
import Link from "next/link";
import { caseStudies, clientReferences } from "@/data/references";
import { StructuredData } from "@/components/StructuredData";
import { generateBreadcrumbSchema } from "@/utils/seo/structured-data";

export const metadata: Metadata = {
  title: "Références : Séminaires & Événements Organisés",
  description:
    "Études de cas réelles : séminaires de 45 à 280 personnes organisés en château pour Eiffage, Safran.AI, LCL, Boston Scientific… Briefs, budgets et dispositifs.",
  alternates: { canonical: "/references" },
};

const STATUT_LABEL: Record<string, string> = {
  realise: "✓ Réalisé",
  "en-preparation": "En préparation",
};

export default function ReferencesPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      generateBreadcrumbSchema([
        { name: "Accueil", url: "/" },
        { name: "Références", url: "/references" },
      ]),
      {
        "@type": "ItemList",
        name: "Études de cas — événements d'entreprise en château",
        numberOfItems: caseStudies.length,
        itemListElement: caseStudies.map((c, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: `${c.client} — ${c.format} (${c.participants} personnes)`,
        })),
      },
    ],
  };

  return (
    <main className="min-h-screen bg-white">
      <StructuredData data={structuredData} />

      {/* En-tête */}
      <section className="bg-gradient-to-b from-gray-50 to-white">
        <div className="mx-auto max-w-4xl px-6 py-14 sm:py-20 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-[var(--bronze-antique)]">
            Références clients
          </p>
          <h1 className="mt-3 text-3xl sm:text-5xl font-light italic text-gray-900 leading-tight">
            De 45 à 280 personnes, des événements qui marquent
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-gray-700">
            Séminaires résidentiels, journées d&apos;étude, soirées de gala : voici comment
            nous répondons aux briefs de nos clients — effectifs, budgets et dispositifs réels,
            issus de nos dossiers. Chaque événement commence par une mise en concurrence
            chiffrée des lieux ; le choix se fait sur des données.
          </p>
        </div>
      </section>

      {/* Bandeau clients */}
      <section className="border-y border-gray-100 bg-gray-50">
        <div className="mx-auto max-w-6xl px-6 py-8">
          <p className="mb-4 text-center text-xs font-semibold uppercase tracking-widest text-gray-500">
            Ils nous confient leurs événements
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {clientReferences.map((name) => (
              <span key={name} className="text-sm font-medium text-gray-700">
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Études de cas */}
      <section className="mx-auto max-w-5xl px-6 py-12 sm:py-16">
        <div className="flex flex-col gap-10">
          {caseStudies.map((c) => (
            <article
              key={c.id}
              id={c.id}
              className="rounded-2xl border border-gray-100 bg-white p-6 sm:p-10 shadow-sm"
            >
              <div className="flex flex-wrap items-center gap-3">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    c.statut === "realise"
                      ? "bg-green-50 text-green-700"
                      : "bg-amber-50 text-[var(--bronze-antique)]"
                  }`}
                >
                  {STATUT_LABEL[c.statut]}
                </span>
                <span className="text-xs font-medium uppercase tracking-wide text-gray-500">
                  {c.secteur}
                </span>
              </div>

              <h2 className="mt-4 text-xl sm:text-2xl font-semibold text-gray-900">
                {c.client}
              </h2>
              <p className="mt-1 text-sm font-medium text-[var(--bronze-antique)]">
                {c.format} · {c.participants} personnes · {c.periode}
              </p>

              <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-500">
                    Le brief
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-700">{c.brief}</p>
                </div>
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-500">
                    Notre réponse
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-700">{c.reponse}</p>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-6 border-t border-gray-100 pt-5">
                {c.chiffres.map((k) => (
                  <div key={k.label}>
                    <div className="text-lg font-bold text-gray-900">{k.valeur}</div>
                    <div className="text-xs text-gray-500">{k.label}</div>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="mx-auto max-w-3xl px-6 py-14 text-center">
          <h2 className="text-2xl sm:text-3xl font-light italic text-gray-900">
            Votre événement mérite la même exigence
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-gray-700">
            Décrivez votre projet : nous mettons les lieux en concurrence et vous recevez
            une proposition chiffrée sous 24h — de 10 à 500 personnes.
          </p>
          <Link
            href="/devis#formulaire"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-[var(--bronze-antique)] px-10 py-4 font-semibold text-white transition-colors hover:bg-amber-700"
          >
            Demander un devis gratuit
          </Link>
        </div>
      </section>
    </main>
  );
}

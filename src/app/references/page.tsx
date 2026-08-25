/**
 * PAGE RÉFÉRENCES — études de cas issues des dossiers réels du CRM.
 * Server Component : contenu intégralement crawlable (Google + bots IA).
 * Sections : hero éditorial → clients → chiffres → cas vedette → grille de
 * cas → méthode → galerie → avis + CTA.
 *
 * ⚠️ CONTRAINTES CSS DU PROJET (globals.css est chargé HORS layer, il bat donc
 * toutes les utilitaires Tailwind, qui vivent dans un @layer) :
 *   1. `* { margin: 0; padding: 0 }` → les utilitaires de marge et de padding
 *      n'ont AUCUN effet. Espacer avec `gap` (seul utilitaire d'espacement
 *      fonctionnel) ou en style inline.
 *   2. `p { color: var(--text-secondary) }` (blanc) → couleur des <p> en inline.
 *   3. Une classe sans préfixe bat sa variante (`grid-cols-2 lg:grid-cols-4` rend
 *      2 colonnes) → toujours des variantes des deux côtés : `max-lg:x lg:y`.
 * C'est la convention suivie par le reste du codebase.
 */

import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Users, Calendar, MapPin, ArrowRight, Star } from "lucide-react";
import {
  featuredCase,
  otherCases,
  agencyStats,
  methodSteps,
  galleryItems,
  clientReferences,
  caseStudies,
} from "@/data/references";
import { reviews, GOOGLE_REVIEWS_URL } from "@/data/reviewsData";
import { StructuredData } from "@/components/StructuredData";
import { generateBreadcrumbSchema } from "@/utils/seo/structured-data";

export const metadata: Metadata = {
  title: "Références : Séminaires & Événements Organisés",
  description:
    "Études de cas réelles : séminaires de 45 à 280 personnes organisés en château pour Eiffage, Safran.AI, LCL, Boston Scientific… Briefs, budgets et résultats.",
  alternates: { canonical: "/references" },
};

const NAVY = "#0F1E33";
const CREAM = "#FBF9F5";
const INK = "#111827";
const BODY = "#4B5563";
const MUTE = "#6B7280";
const HAIRLINE = "#F0EBE1";

const container = (max = "80rem"): React.CSSProperties => ({
  maxWidth: max,
  margin: "0 auto",
  width: "100%",
});
const sectionPad: React.CSSProperties = {
  padding: "clamp(3.25rem, 6vw, 5rem) clamp(1.25rem, 4vw, 2.5rem)",
};
const floatingCard: React.CSSProperties = {
  background: "#fff",
  padding: "1rem 1.5rem",
  textAlign: "center",
  boxShadow: "0 16px 40px rgba(15,30,51,0.16)",
};

export default function ReferencesPage() {
  const avis = reviews[0];

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
    <main style={{ background: "#fff" }}>
      <StructuredData data={structuredData} />

      {/* ══ 1. HERO ══ */}
      <section style={{ background: CREAM }}>
        <div
          style={{
            ...container(),
            padding: "1.75rem clamp(1.25rem, 4vw, 2.5rem) clamp(3.25rem, 6vw, 4.5rem)",
          }}
        >
          <div className="flex flex-col gap-9">
            <nav aria-label="Fil d'Ariane" className="text-xs" style={{ color: MUTE }}>
              <Link href="/" className="hover:text-[var(--bronze-antique)]">
                Accueil
              </Link>
              <span style={{ padding: "0 0.5rem" }}>/</span>
              <span style={{ color: BODY }}>Références</span>
            </nav>

            <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-14">
              {/* Colonne texte */}
              <div className="flex flex-col gap-6">
                <p
                  className="text-[0.7rem] font-semibold uppercase tracking-[0.2em]"
                  style={{ color: "var(--bronze-antique)" }}
                >
                  Nos références
                </p>
                <h1
                  className="font-[family-name:var(--font-cormorant)] text-[clamp(2.1rem,5vw,3.6rem)] font-light leading-[1.1]"
                  style={{ color: INK, textWrap: "balance" }}
                >
                  Des événements réels,
                  <br />
                  des résultats mesurables.
                </h1>
                <p
                  className="text-base leading-relaxed"
                  style={{ color: BODY, maxWidth: "32rem" }}
                >
                  De 45 à 280 participants, nous accompagnons entreprises et grands
                  groupes dans la recherche, la négociation et l&apos;organisation de
                  leurs événements en château.
                </p>
                <div className="flex flex-wrap items-center gap-6">
                  <a
                    href="#cas-clients"
                    className="inline-flex items-center gap-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                    style={{ background: NAVY, padding: "0.95rem 1.75rem" }}
                  >
                    Découvrir nos réalisations
                    <ArrowRight className="h-4 w-4" />
                  </a>
                  <Link
                    href="/devis#formulaire"
                    className="inline-flex items-center gap-2 text-sm font-semibold hover:text-[var(--bronze-antique)]"
                    style={{ color: INK }}
                  >
                    Confier mon brief
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>

              {/* Collage photos + cartes chiffres */}
              <div className="relative flex flex-col gap-4">
                <div
                  className="relative aspect-[4/3] w-full overflow-hidden"
                  style={{ boxShadow: "0 24px 60px rgba(15,30,51,0.18)" }}
                >
                  <Image
                    src="/images/seminaire-entreprise-chateau-evenement-hero.webp"
                    alt="Événement d'entreprise privatisé dans un château en Île-de-France"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 55vw"
                    priority
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {[
                    {
                      src: "/images/amenagement-salle-reunions-chateau-conseils-2026.webp",
                      alt: "Salle de réunion privatisée pour un séminaire d'entreprise",
                    },
                    {
                      src: "/images/chateau-exception-seminaire-entreprise-ile-de-france.webp",
                      alt: "Château d'exception privatisable près de Paris",
                    },
                  ].map((img) => (
                    <div
                      key={img.src}
                      className="relative aspect-[4/3] overflow-hidden"
                      style={{ boxShadow: "0 12px 32px rgba(15,30,51,0.14)" }}
                    >
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 50vw, 28vw"
                      />
                    </div>
                  ))}
                </div>

                {/* Cartes chiffres flottantes (desktop uniquement) */}
                <div
                  className="pointer-events-none absolute max-lg:hidden"
                  style={{ ...floatingCard, top: "-1.5rem", right: "-0.75rem" }}
                >
                  <div
                    className="font-[family-name:var(--font-cormorant)] text-3xl font-medium"
                    style={{ color: INK }}
                  >
                    30
                  </div>
                  <div
                    className="text-[0.68rem] leading-tight"
                    style={{ color: MUTE, maxWidth: "7.5rem" }}
                  >
                    lieux consultés par brief
                  </div>
                </div>
                <a
                  href={GOOGLE_REVIEWS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute max-lg:hidden transition-transform hover:-translate-y-0.5"
                  style={{ ...floatingCard, left: "-1rem", bottom: "4.5rem" }}
                >
                  <div
                    className="font-[family-name:var(--font-cormorant)] text-3xl font-medium"
                    style={{ color: INK }}
                  >
                    5,0<span className="text-lg">/5</span>
                  </div>
                  <div className="text-[0.68rem] leading-tight" style={{ color: MUTE }}>
                    sur Google
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 2. CLIENTS ══ */}
      <section
        style={{
          background: CREAM,
          borderTop: `1px solid ${HAIRLINE}`,
          borderBottom: `1px solid ${HAIRLINE}`,
        }}
      >
        <div
          style={{ ...container("72rem"), padding: "2.5rem clamp(1.25rem, 4vw, 2.5rem)" }}
        >
          <div className="flex flex-col gap-7">
            <div className="flex items-center gap-6">
              <span
                className="max-sm:hidden"
                style={{ height: "1px", flex: 1, background: "#E5E7EB" }}
              />
              <p
                className="text-[0.68rem] font-semibold uppercase tracking-[0.22em]"
                style={{ color: MUTE }}
              >
                Ils nous font confiance
              </p>
              <span
                className="max-sm:hidden"
                style={{ height: "1px", flex: 1, background: "#E5E7EB" }}
              />
            </div>
            <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
              {clientReferences.map((name) => (
                <li
                  key={name}
                  className="font-[family-name:var(--font-cormorant)] text-lg font-medium"
                  style={{ color: BODY, listStyle: "none" }}
                >
                  {name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ══ 3. CHIFFRES ══ */}
      <section style={{ background: NAVY }}>
        <div
          className="grid max-lg:grid-cols-2 gap-y-10 lg:grid-cols-4"
          style={{ ...container("72rem"), padding: "3.5rem clamp(1.25rem, 4vw, 2.5rem)" }}
        >
          {agencyStats.map((s, i) => (
            <div
              key={s.label}
              className="flex flex-col gap-3 text-center"
              style={{
                padding: "0 clamp(0.5rem, 2vw, 2rem)",
                borderLeft:
                  i > 0 ? "1px solid rgba(255,255,255,0.15)" : undefined,
              }}
            >
              <span className="font-[family-name:var(--font-cormorant)] text-[clamp(2.1rem,4.5vw,3.25rem)] font-light leading-none text-white">
                {s.valeur}
              </span>
              <span
                className="text-[0.8rem] leading-snug"
                style={{
                  color: "rgba(255,255,255,0.65)",
                  margin: "0 auto",
                  maxWidth: "13rem",
                }}
              >
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ══ 4. CAS VEDETTE ══ */}
      <section id="cas-clients" className="scroll-mt-20" style={{ background: "#fff" }}>
        <div style={{ ...container(), ...sectionPad }}>
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-14">
            <div className="relative">
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <Image
                  src={featuredCase.image}
                  alt={featuredCase.imageAlt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <span
                className="absolute text-[0.62rem] font-bold uppercase tracking-[0.14em]"
                style={{
                  top: "1rem",
                  left: "1rem",
                  background: "rgba(255,255,255,0.95)",
                  padding: "0.4rem 0.75rem",
                  color: BODY,
                }}
              >
                {featuredCase.categorie}
              </span>
            </div>

            <div className="flex flex-col gap-5">
              <p
                className="text-sm font-bold uppercase tracking-wide"
                style={{ color: "var(--bronze-antique)" }}
              >
                {featuredCase.client}
              </p>
              <h2
                className="font-[family-name:var(--font-cormorant)] text-[clamp(1.7rem,3.5vw,2.5rem)] font-light leading-tight"
                style={{ color: INK }}
              >
                {featuredCase.accroche}
              </h2>

              <div
                className="flex flex-wrap items-center gap-x-7 gap-y-2 text-sm"
                style={{
                  color: BODY,
                  paddingBottom: "1.25rem",
                  borderBottom: "1px solid #F3F4F6",
                }}
              >
                <span className="inline-flex items-center gap-2">
                  <Users className="h-4 w-4" style={{ color: "var(--bronze-antique)" }} />
                  {featuredCase.participants} collaborateurs
                </span>
                <span className="inline-flex items-center gap-2">
                  <Calendar
                    className="h-4 w-4"
                    style={{ color: "var(--bronze-antique)" }}
                  />
                  2 jours
                </span>
                <span className="inline-flex items-center gap-2">
                  <MapPin className="h-4 w-4" style={{ color: "var(--bronze-antique)" }} />
                  3 lieux mis en concurrence
                </span>
              </div>

              <div className="grid gap-6 sm:grid-cols-3">
                <div className="flex flex-col gap-2">
                  <h3
                    className="text-[0.65rem] font-bold uppercase tracking-[0.14em]"
                    style={{ color: MUTE }}
                  >
                    Le besoin
                  </h3>
                  <p className="text-[0.84rem] leading-relaxed" style={{ color: BODY }}>
                    {featuredCase.brief}
                  </p>
                </div>
                <div
                  className="flex flex-col gap-2"
                  style={{ paddingLeft: "1.5rem", borderLeft: "1px solid #F3F4F6" }}
                >
                  <h3
                    className="text-[0.65rem] font-bold uppercase tracking-[0.14em]"
                    style={{ color: MUTE }}
                  >
                    Notre approche
                  </h3>
                  <p className="text-[0.84rem] leading-relaxed" style={{ color: BODY }}>
                    {featuredCase.reponse}
                  </p>
                </div>
                <div
                  className="flex flex-col gap-1"
                  style={{ paddingLeft: "1.5rem", borderLeft: "1px solid #F3F4F6" }}
                >
                  <h3
                    className="text-[0.65rem] font-bold uppercase tracking-[0.14em]"
                    style={{ color: MUTE }}
                  >
                    Le résultat
                  </h3>
                  <p
                    className="font-[family-name:var(--font-cormorant)] text-3xl font-medium"
                    style={{ color: "var(--bronze-antique)" }}
                  >
                    −17 %
                  </p>
                  <p className="text-[0.78rem] leading-snug" style={{ color: MUTE }}>
                    vs. l&apos;offre la plus élevée
                    <br />≈ 560 € / pers. tout compris
                  </p>
                </div>
              </div>

              <Link
                href="/devis#formulaire"
                className="inline-flex items-center gap-2 text-sm font-semibold underline-offset-4 hover:text-[var(--bronze-antique)] hover:underline"
                style={{ color: INK, width: "fit-content" }}
              >
                Obtenir la même mise en concurrence
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 5. GRILLE DE CAS ══ */}
      <section style={{ background: "#fff" }}>
        <div
          style={{
            ...container(),
            padding: "0 clamp(1.25rem, 4vw, 2.5rem) clamp(3.25rem, 6vw, 4.5rem)",
          }}
        >
          <div className="flex flex-col gap-6">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {otherCases.map((c) => (
                <article
                  key={c.id}
                  id={c.id}
                  className="flex flex-col overflow-hidden"
                  style={{
                    border: "1px solid #F3F4F6",
                    background: "#fff",
                    boxShadow: "0 2px 14px rgba(15,30,51,0.06)",
                  }}
                >
                  <div className="relative aspect-[16/10] w-full">
                    <Image
                      src={c.image}
                      alt={c.imageAlt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <span
                      className="absolute text-[0.58rem] font-bold uppercase tracking-[0.12em]"
                      style={{
                        top: "0.75rem",
                        left: "0.75rem",
                        background: "rgba(255,255,255,0.95)",
                        padding: "0.3rem 0.6rem",
                        color: BODY,
                      }}
                    >
                      {c.categorie}
                    </span>
                  </div>

                  <div
                    className="flex flex-1 flex-col gap-4"
                    style={{ padding: "1.35rem" }}
                  >
                    <div className="flex flex-col gap-2">
                      <p
                        className="text-[0.78rem] font-bold uppercase tracking-wide"
                        style={{ color: "var(--bronze-antique)" }}
                      >
                        {c.client}
                      </p>
                      <h3
                        className="font-[family-name:var(--font-cormorant)] text-xl font-medium leading-snug"
                        style={{ color: INK }}
                      >
                        {c.accroche}
                      </h3>
                    </div>

                    <ul className="flex flex-col gap-1.5">
                      {c.points.map((pt) => (
                        <li
                          key={pt}
                          className="flex items-start gap-2 text-[0.8rem] leading-snug"
                          style={{ color: BODY, listStyle: "none" }}
                        >
                          <span style={{ color: "var(--bronze-antique)" }}>✓</span>
                          {pt}
                        </li>
                      ))}
                    </ul>

                    <div
                      className="mt-auto flex flex-wrap gap-6"
                      style={{ paddingTop: "1rem", borderTop: "1px solid #F3F4F6" }}
                    >
                      {c.chiffres.map((k) => (
                        <div key={k.label} className="flex flex-col">
                          <span className="font-semibold" style={{ color: INK }}>
                            {k.valeur}
                          </span>
                          <span
                            className="text-[0.68rem] leading-tight"
                            style={{ color: MUTE }}
                          >
                            {k.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
            <p className="text-center text-xs" style={{ color: "#9CA3AF" }}>
              Les événements à venir sont présentés au stade du brief et de la mise en
              concurrence.
            </p>
          </div>
        </div>
      </section>

      {/* ══ 6. MÉTHODE ══ */}
      <section style={{ background: CREAM }}>
        <div style={{ ...container(), ...sectionPad }}>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,3fr)] lg:gap-14">
            <div className="flex flex-col gap-4">
              <h2
                className="font-[family-name:var(--font-cormorant)] text-[clamp(1.7rem,3vw,2.4rem)] font-light leading-tight"
                style={{ color: INK }}
              >
                Notre méthode,
                <br />
                votre sérénité.
              </h2>
              <p className="text-sm leading-relaxed" style={{ color: BODY }}>
                Une approche rigoureuse à chaque étape.
              </p>
            </div>

            <ol className="grid max-sm:grid-cols-2 max-lg:grid-cols-3 gap-x-6 gap-y-9 lg:grid-cols-5">
              {methodSteps.map((step) => (
                <li
                  key={step.numero}
                  className="flex flex-col gap-3"
                  style={{ listStyle: "none" }}
                >
                  <span
                    className="flex items-center justify-center font-[family-name:var(--font-cormorant)] text-base"
                    style={{
                      height: "2.75rem",
                      width: "2.75rem",
                      borderRadius: "9999px",
                      border: "1px solid rgba(163,126,44,0.35)",
                      color: "var(--bronze-antique)",
                    }}
                  >
                    {step.numero}
                  </span>
                  <h3
                    className="text-[0.7rem] font-bold uppercase tracking-[0.14em]"
                    style={{ color: INK }}
                  >
                    {step.titre}
                  </h3>
                  <p className="text-[0.78rem] leading-relaxed" style={{ color: BODY }}>
                    {step.texte}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ══ 7. GALERIE ══ */}
      <section aria-label="Nos événements en images">
        <div className="grid max-lg:grid-cols-2 lg:grid-cols-4">
          {galleryItems.map((g) => (
            <div key={g.label} className="relative aspect-[4/3] lg:aspect-[3/2]">
              <Image
                src={g.image}
                alt={g.alt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 50vw, 25vw"
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.65), rgba(0,0,0,0.1) 45%, transparent)",
                }}
              />
              <span
                className="absolute font-[family-name:var(--font-cormorant)] text-lg leading-tight text-white sm:text-xl"
                style={{ bottom: "1rem", left: "1rem", right: "1rem" }}
              >
                {g.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ══ 8. AVIS + CTA ══ */}
      <section style={{ background: NAVY }}>
        <div
          className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16"
          style={{ ...container(), ...sectionPad }}
        >
          <figure className="flex flex-col gap-5">
            <span
              className="font-[family-name:var(--font-cormorant)] text-6xl leading-none"
              style={{ color: "var(--bronze-antique)", height: "2rem" }}
              aria-hidden="true"
            >
              &ldquo;
            </span>
            <blockquote className="font-[family-name:var(--font-cormorant)] text-[clamp(1.25rem,2.4vw,1.75rem)] font-light leading-snug text-white">
              {avis.content}
            </blockquote>
            <figcaption className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
              <span style={{ color: "rgba(255,255,255,0.7)" }}>{avis.author}</span>
              <span className="inline-flex items-center gap-1.5">
                <span className="inline-flex" aria-hidden="true">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-3.5 w-3.5"
                      style={{
                        fill: "var(--bronze-antique)",
                        color: "var(--bronze-antique)",
                      }}
                    />
                  ))}
                </span>
                <a
                  href={GOOGLE_REVIEWS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline-offset-4 hover:underline"
                  style={{ color: "rgba(255,255,255,0.6)" }}
                >
                  Avis Google vérifié
                </a>
              </span>
            </figcaption>
          </figure>

          <div
            className="flex flex-col gap-4"
            style={{ background: CREAM, padding: "clamp(1.75rem, 4vw, 2.5rem)" }}
          >
            <p
              className="text-[0.68rem] font-semibold uppercase tracking-[0.2em]"
              style={{ color: "var(--bronze-antique)" }}
            >
              Votre prochain événement
            </p>
            <h2
              className="font-[family-name:var(--font-cormorant)] text-[clamp(1.6rem,3vw,2.2rem)] font-light leading-tight"
              style={{ color: INK }}
            >
              Vous avez le brief.
              <br />
              Nous trouverons le lieu.
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: BODY }}>
              Dates, participants, budget et objectifs : nous revenons vers vous sous 24h
              avec une sélection de lieux comparés et chiffrés.
            </p>
            <Link
              href="/devis#formulaire"
              className="inline-flex items-center gap-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              style={{
                background: NAVY,
                padding: "0.95rem 1.75rem",
                width: "fit-content",
              }}
            >
              Confier mon brief
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

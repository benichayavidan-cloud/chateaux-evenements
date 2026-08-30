/**
 * INDEX DES LIEUX — Server Component.
 * Répond au motif de requête « lieu séminaire <département> », le plus répandu
 * du marché après « team building <zone> ». Regroupé par département pour que
 * chaque bloc soit une cible crawlable distincte.
 */

import type { Metadata } from "next";
import NextLink from "next/link";
import Image from "next/image";
import { Users, Bed, LayoutGrid, ArrowRight } from "lucide-react";
import { Section, Container } from "@/components/layout-v2";
import { theme } from "@/design-system/tokens";
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

const BRONZE = theme.colors.primary.bronze;
const BRONZE_DARK = theme.colors.primary.bronzeDark;
const GOLD = theme.colors.primary.gold;
const HEADING = theme.typography.fonts.heading;
const G = theme.colors.neutral;

export default function LieuxPage() {
  const groupes = DEPARTMENT_ORDER
    .map(code => ({ code, nom: DEPARTMENT_NAMES[code], items: venues.filter(v => v.departementCode === code).sort((a, b) => b.capacite - a.capacite) }))
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

      <Section spacing="lg" background="white" style={{ paddingBottom: "clamp(1.5rem, 3vw, 2rem)" }}>
        <Container size="xl">
          <div
            style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              padding: "5px 12px", marginBottom: "1rem",
              background: `${BRONZE}08`, border: `1px solid ${BRONZE}25`, borderRadius: "9999px",
            }}
          >
            <span style={{ fontSize: "0.6875rem", fontWeight: 700, color: BRONZE, letterSpacing: "0.05em", textTransform: "uppercase" }}>
              Île-de-France &amp; Oise
            </span>
          </div>

          <h1
            style={{
              fontSize: "clamp(2rem, 5vw, 3.25rem)", fontWeight: 600, fontFamily: HEADING,
              lineHeight: 1.12, color: G.gray900, marginBottom: "1rem", maxWidth: "20ch",
            }}
          >
            {total} lieux de séminaire, de {Math.min(...venues.map(v => v.capacite))} à {capaciteMax} personnes
          </h1>

          <p style={{ fontSize: "clamp(1rem, 2vw, 1.125rem)", lineHeight: 1.75, color: G.gray600, maxWidth: "62ch" }}>
            Châteaux, domaines et hôtels privatisables dans les Yvelines, l&apos;Oise, la
            Seine-et-Marne, le Val-d&apos;Oise, l&apos;Essonne et les Hauts-de-Seine. Chaque fiche
            affiche la capacité, le nombre de chambres et les équipements réels du lieu —
            pas d&apos;estimation. Devis sous 48 h.
          </p>

          <nav aria-label="Départements" className="flex flex-wrap" style={{ gap: "8px", marginTop: "1.75rem" }}>
            {groupes.map(g => (
              <a
                key={g.code}
                href={`#dept-${g.code}`}
                style={{
                  display: "inline-flex", alignItems: "center", gap: "6px",
                  padding: "8px 16px", borderRadius: "9999px",
                  border: `1px solid ${G.gray200}`, background: "white",
                  fontSize: "0.875rem", color: G.gray700, textDecoration: "none",
                }}
              >
                {g.nom}
                <span style={{ color: BRONZE, fontWeight: 700 }}>{g.items.length}</span>
              </a>
            ))}
          </nav>
        </Container>
      </Section>

      {groupes.map((g, gi) => (
        <Section key={g.code} spacing="lg" background={gi % 2 === 0 ? "gray" : "white"} id={`dept-${g.code}`}>
          <Container size="xl">
            <div className="flex items-baseline justify-between flex-wrap" style={{ gap: "12px", marginBottom: "1.75rem" }}>
              <h2 style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.125rem)", fontWeight: 600, fontFamily: HEADING, color: G.gray900, margin: 0 }}>
                {g.nom} <span style={{ color: G.gray400, fontWeight: 400 }}>({g.code})</span>
              </h2>
              <span style={{ fontSize: "0.875rem", color: G.gray500 }}>
                {g.items.length} lieux · jusqu&apos;à {Math.max(...g.items.map(v => v.capacite))} personnes
              </span>
            </div>

            <div className="card-grid-centered" style={{ gap: "20px" }}>
              {g.items.map(v => (
                <NextLink
                  key={v.slug}
                  href={`/lieux/${v.slug}`}
                  className="group block overflow-hidden"
                  style={{
                    background: "white", borderRadius: "16px",
                    border: `1px solid ${G.gray200}`, boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
                  }}
                >
                  <div className="relative overflow-hidden" style={{ aspectRatio: "4 / 3", background: G.gray100 }}>
                    {v.photos[0] && (
                      <Image
                        src={v.photos[0].url}
                        alt={v.photos[0].legende || v.nom}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    )}
                    <div
                      style={{
                        position: "absolute", top: "12px", left: "12px",
                        padding: "5px 11px", borderRadius: "9999px",
                        background: "rgba(255,255,255,0.94)", backdropFilter: "blur(6px)",
                        fontSize: "0.6875rem", fontWeight: 700, letterSpacing: "0.05em",
                        textTransform: "uppercase", color: BRONZE_DARK,
                      }}
                    >
                      {v.categorie}
                    </div>
                  </div>

                  <div style={{ padding: "18px 20px 20px" }}>
                    {v.ville && (
                      <div style={{ fontSize: "0.6875rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: BRONZE, marginBottom: "7px" }}>
                        {v.ville}
                      </div>
                    )}
                    <h3 style={{ fontFamily: HEADING, fontSize: "1.125rem", fontWeight: 600, color: G.gray900, lineHeight: 1.3, marginBottom: "14px" }}>
                      {v.nom}
                    </h3>
                    <div
                      className="flex flex-wrap items-center"
                      style={{ gap: "14px", fontSize: "0.8125rem", color: G.gray600, paddingTop: "12px", borderTop: `1px solid ${G.gray100}` }}
                    >
                      <span className="inline-flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5" style={{ color: BRONZE }} />
                        <span style={{ fontVariantNumeric: "tabular-nums" }}>{v.capacite}</span>
                      </span>
                      {v.chambres ? (
                        <span className="inline-flex items-center gap-1.5">
                          <Bed className="w-3.5 h-3.5" style={{ color: BRONZE }} />
                          <span style={{ fontVariantNumeric: "tabular-nums" }}>{v.chambres}</span>
                        </span>
                      ) : null}
                      {v.sallesReunion ? (
                        <span className="inline-flex items-center gap-1.5">
                          <LayoutGrid className="w-3.5 h-3.5" style={{ color: BRONZE }} />
                          <span style={{ fontVariantNumeric: "tabular-nums" }}>{v.sallesReunion}</span>
                        </span>
                      ) : null}
                      <ArrowRight className="w-4 h-4 ml-auto transition-transform group-hover:translate-x-0.5" style={{ color: BRONZE }} />
                    </div>
                  </div>
                </NextLink>
              ))}
            </div>
          </Container>
        </Section>
      ))}
    </>
  );
}

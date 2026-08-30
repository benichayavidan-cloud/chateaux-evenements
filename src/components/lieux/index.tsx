/**
 * BRIQUES DE LANDING — design de référence : /lieux
 *
 * Toutes les landings géographiques et par format se composent à partir d'ici,
 * pour que le design soit identique par construction et non par recopie. Les
 * trois grilles de cartes du site (index, fiche, bloc landing) dupliquaient le
 * même markup : elles passent toutes par VenueCard.
 *
 * Server components : ces pages visent autant Google que les moteurs de réponse
 * IA, qui n'exécutent pas le JavaScript.
 */

import NextLink from "next/link";
import Image from "next/image";
import { Users, Bed, LayoutGrid, ArrowRight, Clock, Shield, Check } from "lucide-react";
import { Section, Container } from "@/components/layout-v2";
import { theme } from "@/design-system/tokens";
import DevisFormMini from "@/components/DevisFormMini";
import type { Venue } from "@/data/venues";

export const BRONZE = theme.colors.primary.bronze;
export const BRONZE_DARK = theme.colors.primary.bronzeDark;
export const GOLD = theme.colors.primary.gold;
export const HEADING = theme.typography.fonts.heading;
export const G = theme.colors.neutral;

/* ─────────────────────────── Pastille d'accroche ─────────────────────────── */

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        display: "inline-flex", alignItems: "center", gap: "8px",
        padding: "5px 12px", marginBottom: "1rem",
        background: `${BRONZE}08`, border: `1px solid ${BRONZE}25`, borderRadius: "9999px",
      }}
    >
      <span style={{ fontSize: "0.6875rem", fontWeight: 700, color: BRONZE, letterSpacing: "0.05em", textTransform: "uppercase" }}>
        {children}
      </span>
    </div>
  );
}

/* ─────────────────────────────── En-tête ─────────────────────────────── */

export function LandingHero({ eyebrow, titre, intro, ancres }: {
  eyebrow: string;
  titre: React.ReactNode;
  intro: React.ReactNode;
  ancres?: { label: string; href: string; compteur?: number }[];
}) {
  return (
    <Section spacing="lg" background="white" style={{ paddingBottom: "clamp(1.5rem, 3vw, 2rem)" }}>
      <Container size="xl">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1
          style={{
            fontSize: "clamp(2rem, 5vw, 3.25rem)", fontWeight: 600, fontFamily: HEADING,
            lineHeight: 1.12, color: G.gray900, marginBottom: "1rem", maxWidth: "22ch",
          }}
        >
          {titre}
        </h1>
        <div style={{ fontSize: "clamp(1rem, 2vw, 1.125rem)", lineHeight: 1.75, color: G.gray600, maxWidth: "62ch" }}>
          {intro}
        </div>
        {ancres && ancres.length > 0 && (
          <nav aria-label="Sommaire" className="flex flex-wrap" style={{ gap: "8px", marginTop: "1.75rem" }}>
            {ancres.map(a => (
              <a
                key={a.href}
                href={a.href}
                style={{
                  display: "inline-flex", alignItems: "center", gap: "6px",
                  padding: "8px 16px", borderRadius: "9999px",
                  border: `1px solid ${G.gray200}`, background: "white",
                  fontSize: "0.875rem", color: G.gray700, textDecoration: "none",
                }}
              >
                {a.label}
                {a.compteur != null && <span style={{ color: BRONZE, fontWeight: 700 }}>{a.compteur}</span>}
              </a>
            ))}
          </nav>
        )}
      </Container>
    </Section>
  );
}

/* ─────────────────────────── Carte lieu (unique) ─────────────────────────── */

export function VenueCard({ venue: v }: { venue: Venue }) {
  return (
    <NextLink
      href={`/lieux/${v.slug}`}
      className="group block overflow-hidden"
      style={{ background: "white", borderRadius: "16px", border: `1px solid ${G.gray200}`, boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}
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
  );
}

/* ─────────────────────────── Section de lieux ─────────────────────────── */

export function VenueSection({ id, titre, sousTitre, venues, background = "gray", lien }: {
  id?: string;
  titre: React.ReactNode;
  sousTitre?: React.ReactNode;
  venues: Venue[];
  background?: "white" | "gray";
  lien?: { href: string; label: string };
}) {
  if (venues.length === 0) return null;
  return (
    <Section spacing="lg" background={background} id={id}>
      <Container size="xl">
        <div className="flex items-baseline justify-between flex-wrap" style={{ gap: "12px", marginBottom: sousTitre ? "0.75rem" : "1.75rem" }}>
          <h2 style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.125rem)", fontWeight: 600, fontFamily: HEADING, color: G.gray900, margin: 0 }}>
            {titre}
          </h2>
        </div>
        {sousTitre && (
          <p style={{ fontSize: "1.0625rem", lineHeight: 1.7, color: G.gray600, maxWidth: "62ch", marginBottom: "2rem" }}>
            {sousTitre}
          </p>
        )}
        <div className="card-grid-centered" style={{ gap: "20px" }}>
          {venues.map(v => <VenueCard key={v.slug} venue={v} />)}
        </div>
        {lien && (
          <p style={{ marginTop: "2rem" }}>
            <NextLink href={lien.href} style={{ color: BRONZE_DARK, fontWeight: 600, textDecoration: "underline" }}>
              {lien.label}
            </NextLink>
          </p>
        )}
      </Container>
    </Section>
  );
}

/* ─────────────────── Bloc de texte en carte à filet doré ─────────────────── */

export function ProseSection({ titre, paragraphes, background = "white", id }: {
  titre: string;
  paragraphes: React.ReactNode[];
  background?: "white" | "gray";
  id?: string;
}) {
  return (
    <Section spacing="lg" background={background} id={id}>
      <Container size="lg">
        <h2 style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.125rem)", fontWeight: 600, fontFamily: HEADING, color: G.gray900, marginBottom: "1.5rem" }}>
          {titre}
        </h2>
        {paragraphes.map((p, i) => (
          <div
            key={i}
            style={{
              background: background === "white" ? "white" : G.gray50,
              borderRadius: "16px",
              padding: "clamp(16px, 3vw, 24px) clamp(18px, 3vw, 28px)",
              marginBottom: "12px",
              borderLeft: `3px solid ${GOLD}`,
              boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
              color: G.gray700, lineHeight: 1.75, fontSize: "1rem",
            }}
          >
            {p}
          </div>
        ))}
      </Container>
    </Section>
  );
}

/* ───────────────────────────────── FAQ ───────────────────────────────── */

export function FaqSection({ items, background = "gray" }: {
  items: { question: string; reponse: string }[];
  background?: "white" | "gray";
}) {
  if (items.length === 0) return null;
  return (
    <Section spacing="lg" background={background}>
      <Container size="lg">
        <h2 style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.125rem)", fontWeight: 600, fontFamily: HEADING, color: G.gray900, marginBottom: "1.75rem" }}>
          Questions fréquentes
        </h2>
        <div className="grid sm:grid-cols-2" style={{ gap: "14px" }}>
          {items.map(f => (
            <div key={f.question} style={{ background: "white", borderRadius: "16px", padding: "20px 22px", border: `1px solid ${G.gray200}` }}>
              <h3 style={{ fontFamily: HEADING, fontSize: "1.0625rem", fontWeight: 600, color: G.gray900, marginBottom: "10px", lineHeight: 1.35 }}>
                {f.question}
              </h3>
              <p style={{ margin: 0, color: G.gray700, fontSize: "0.9375rem", lineHeight: 1.7 }}>{f.reponse}</p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

/* ─────────────────────────── Demande de devis ─────────────────────────── */

export function DevisSection({ sourceLabel, titre = "Un projet en tête ?", background = "gray" }: {
  sourceLabel: string;
  titre?: string;
  background?: "white" | "gray";
}) {
  return (
    <Section spacing="md" background={background}>
      <Container size="lg">
        <div style={{ textAlign: "center", marginBottom: "1.75rem" }}>
          <h2 style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.125rem)", fontWeight: 600, fontFamily: HEADING, color: G.gray900, marginBottom: "0.625rem" }}>
            {titre}
          </h2>
          <div className="flex flex-wrap items-center justify-center" style={{ gap: "18px", fontSize: "0.9375rem", color: G.gray600 }}>
            <span className="inline-flex items-center gap-1.5"><Clock className="w-4 h-4" style={{ color: BRONZE }} />Réponse sous 48 h</span>
            <span className="inline-flex items-center gap-1.5"><Shield className="w-4 h-4" style={{ color: BRONZE }} />Sans engagement</span>
            <span className="inline-flex items-center gap-1.5"><Check className="w-4 h-4" style={{ color: BRONZE }} />Devis gratuit</span>
          </div>
        </div>
        <DevisFormMini sourceLabel={sourceLabel} />
      </Container>
    </Section>
  );
}

/* ───────────────────── Bloc réponse directe (GEO / IA) ───────────────────── */

export function ReponseDirecte({ children }: { children: React.ReactNode }) {
  return (
    <Section spacing="md" background="gray">
      <Container size="xl">
        <div
          style={{
            background: "white", borderRadius: "16px",
            padding: "clamp(20px, 3vw, 32px)",
            borderLeft: `4px solid ${GOLD}`,
            boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
          }}
        >
          <p style={{ fontSize: "clamp(1.0625rem, 2vw, 1.1875rem)", lineHeight: 1.7, color: G.gray800, margin: 0 }}>
            {children}
          </p>
        </div>
      </Container>
    </Section>
  );
}

/* ───────────────────────── Chiffres clés en cartes ───────────────────────── */

export function ChiffresSection({ chiffres, background = "gray" }: {
  chiffres: { valeur: string; libelle: string }[];
  background?: "white" | "gray";
}) {
  if (chiffres.length === 0) return null;
  return (
    <Section spacing="md" background={background}>
      <Container size="xl">
        <div className="card-grid-centered" style={{ gap: "12px" }}>
          {chiffres.map(c => (
            <div
              key={c.libelle}
              style={{
                background: "white", borderRadius: "16px",
                padding: "clamp(16px, 2.5vw, 22px)",
                border: `1px solid ${G.gray200}`, textAlign: "center",
              }}
            >
              <div style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 700, fontFamily: HEADING, color: G.gray900, lineHeight: 1.1 }}>
                {c.valeur}
              </div>
              <div style={{ fontSize: "0.75rem", color: G.gray500, marginTop: "6px" }}>{c.libelle}</div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

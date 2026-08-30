/**
 * Renvoi vers les déclinaisons géographiques du team building.
 *
 * Sans ce bloc, ces pages restaient orphelines : présentes au sitemap mais sans
 * aucun lien entrant, donc crawlées tard et sans autorité transmise.
 */

import NextLink from "next/link";
import { ArrowRight } from "lucide-react";
import { venues } from "@/data/venues";
import { Section, Container } from "@/components/layout-v2";
import { BRONZE, HEADING, G } from "@/components/lieux";

const ZONES = [
  { href: "/team-building-chantilly", nom: "Chantilly et l'Oise", code: "60", note: "6 300 hectares de forêt domaniale" },
  { href: "/team-building-hauts-de-seine-92", nom: "Hauts-de-Seine", code: "92", note: "accessibles en métro depuis Paris" },
  { href: "/team-building-val-d-oise-95", nom: "Val-d'Oise", code: "95", note: "du Vexin au secteur de Roissy" },
];

export function TeamBuildingParZone() {
  return (
    <Section spacing="lg" background="white">
      <Container size="xl">
        <h2 style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.125rem)", fontWeight: 600, fontFamily: HEADING, color: G.gray900, marginBottom: "0.75rem" }}>
          Team building par territoire
        </h2>
        <p style={{ fontSize: "1.0625rem", lineHeight: 1.7, color: G.gray600, maxWidth: "62ch", marginBottom: "2rem" }}>
          Les lieux, les budgets et les contraintes d&apos;accès changent d&apos;un département à
          l&apos;autre. Voici le détail zone par zone.
        </p>
        <div className="card-grid-centered" style={{ gap: "18px" }}>
          {ZONES.map(z => {
            const n = venues.filter(v => v.departementCode === z.code).length;
            return (
              <NextLink
                key={z.href}
                href={z.href}
                className="group block"
                style={{ background: "white", borderRadius: "16px", border: `1px solid ${G.gray200}`, padding: "22px 24px", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}
              >
                <div style={{ fontSize: "0.6875rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: BRONZE, marginBottom: "8px" }}>
                  {n} lieux
                </div>
                <div style={{ fontFamily: HEADING, fontSize: "1.1875rem", fontWeight: 600, color: G.gray900, marginBottom: "8px", lineHeight: 1.3 }}>
                  Team building en {z.nom}
                </div>
                <p style={{ margin: "0 0 14px", color: G.gray600, fontSize: "0.9375rem", lineHeight: 1.6 }}>{z.note}</p>
                <span className="inline-flex items-center gap-1.5" style={{ color: BRONZE, fontSize: "0.875rem", fontWeight: 600 }}>
                  Voir les lieux
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </NextLink>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}

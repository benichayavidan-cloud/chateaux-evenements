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
import { Users, Bed, LayoutGrid, ArrowRight } from "lucide-react";
import { Section, Container } from "@/components/layout-v2";
import { theme } from "@/design-system/tokens";
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

const BRONZE = theme.colors.primary.bronze;
const BRONZE_DARK = theme.colors.primary.bronzeDark;
const HEADING = theme.typography.fonts.heading;
const G = theme.colors.neutral;

export function VenuesByDepartment({ departments, title, intro, limit = 24 }: VenuesByDepartmentProps) {
  const list = departments
    .flatMap(code => venues.filter(v => v.departementCode === code))
    .sort((a, b) => b.capacite - a.capacite)
    .slice(0, limit);

  if (list.length === 0) return null;

  const capMin = Math.min(...list.map(v => v.capacite));
  const capMax = Math.max(...list.map(v => v.capacite));

  return (
    <Section spacing="lg" background="gray" aria-labelledby="venues-heading">
      <Container size="xl">
        <h2
          id="venues-heading"
          style={{
            fontSize: "clamp(1.5rem, 3.5vw, 2.125rem)", fontWeight: 600,
            fontFamily: HEADING, color: G.gray900, marginBottom: "0.75rem", lineHeight: 1.2,
          }}
        >
          {title}
        </h2>
        <p style={{ fontSize: "1.0625rem", lineHeight: 1.7, color: G.gray600, maxWidth: "62ch", marginBottom: "2rem" }}>
          {intro ?? `${list.length} lieux vérifiés, de ${capMin} à ${capMax} personnes. Capacités, chambres et équipements réels — pas d'estimation. Devis sous 48 h.`}
        </p>

        <div className="card-grid-centered" style={{ gap: "20px" }}>
          {list.map(v => (
            <NextLink
              key={v.slug}
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
          ))}
        </div>

        <p style={{ marginTop: "2rem" }}>
          <NextLink href="/lieux" style={{ color: BRONZE_DARK, fontWeight: 600, textDecoration: "underline" }}>
            Voir les {venues.length} lieux de séminaire en Île-de-France et Oise
          </NextLink>
        </p>
      </Container>
    </Section>
  );
}

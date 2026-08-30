/**
 * VUE FICHE LIEU — Server Component.
 *
 * Reprend le langage visuel des fiches château : Playfair Display, accents
 * bronze, grille photo façon Airbnb (classe .hero-grid-listing déjà responsive
 * dans globals.css) et cartes à filet doré.
 *
 * Volontairement sans 'use client' : ces pages visent autant Google que les
 * moteurs de réponse IA, qui n'exécutent pas le JavaScript. Pas de lightbox
 * donc — la galerie complète est rendue en dur plus bas.
 */

import Image from "next/image";
import Link from "next/link";
import { Users, Bed, LayoutGrid, Car, MapPin, Check, ArrowRight, Clock, Shield } from "lucide-react";
import { Section, Container } from "@/components/layout-v2";
import { theme } from "@/design-system/tokens";
import DevisFormMini from "@/components/DevisFormMini";
import type { Venue } from "@/data/venues";

const BRONZE = theme.colors.primary.bronze;
const BRONZE_DARK = theme.colors.primary.bronzeDark;
const GOLD = theme.colors.primary.gold;
const HEADING = theme.typography.fonts.heading;
const G = theme.colors.neutral;

/** Carte à filet doré — même traitement que les fiches château. */
function ParaCard({ text }: { text: string }) {
  const colon = text.match(/^(.{5,55}?)\s:\s/);
  const label = colon ? colon[1] : null;
  const body = colon && label ? text.substring(colon[0].length) : text;

  return (
    <div
      style={{
        background: "white",
        borderRadius: "16px",
        padding: "clamp(16px, 3vw, 24px) clamp(18px, 3vw, 28px)",
        marginBottom: "12px",
        borderLeft: `3px solid ${GOLD}`,
        boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
      }}
    >
      {label && (
        <div
          style={{
            fontSize: "0.6875rem",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            color: BRONZE,
            marginBottom: "10px",
          }}
        >
          {label}
        </div>
      )}
      <p style={{ color: G.gray700, lineHeight: 1.75, fontSize: "1rem", margin: 0 }}>{body}</p>
    </div>
  );
}

export function VenueView({ venue: v, voisins, landing, reponse }: {
  venue: Venue;
  voisins: Venue[];
  landing?: string;
  reponse: string;
}) {
  const photos = v.photos.slice(0, 5);
  // La galerie ne s'affiche qu'à partir de 3 photos restantes : en dessous, elle
  // produit une image seule au milieu de la page, ce qui ressemble à un bug.
  // Aujourd'hui tous les lieux ont 6 photos, donc elle ne s'affiche jamais ;
  // elle réapparaîtra d'elle-même quand les lieux enverront plus de visuels.
  const reste = v.photos.length - 5 >= 3 ? v.photos.slice(5) : [];

  const chiffres = [
    { icon: Users, label: "Capacité max", value: `${v.capacite}`, unit: "personnes" },
    v.chambres ? { icon: Bed, label: "Chambres", value: `${v.chambres}`, unit: v.chambresTwin ? `dont ${v.chambresTwin} twins` : "à disposition" } : null,
    v.sallesReunion ? { icon: LayoutGrid, label: "Salles", value: `${v.sallesReunion}`, unit: "de réunion" } : null,
    v.parking ? { icon: Car, label: "Parking", value: `${v.parking}`, unit: "places" } : null,
  ].filter(Boolean) as { icon: typeof Users; label: string; value: string; unit: string }[];

  return (
    <>
      {/* ── En-tête + grille photo ── */}
      <Section spacing="md" background="white" style={{ paddingTop: "clamp(1.5rem, 3vw, 2.5rem)" }}>
        <Container size="xl">
          <nav aria-label="Fil d'Ariane" style={{ fontSize: "0.8125rem", color: G.gray500, marginBottom: "1.25rem" }}>
            <Link href="/" style={{ color: G.gray500 }}>Accueil</Link>
            <span style={{ margin: "0 0.5rem", color: G.gray300 }}>/</span>
            <Link href="/lieux" style={{ color: G.gray500 }}>Lieux de séminaire</Link>
            <span style={{ margin: "0 0.5rem", color: G.gray300 }}>/</span>
            <span style={{ color: G.gray800 }}>{v.nom}</span>
          </nav>

          <div style={{ marginBottom: "1.5rem" }}>
            <div
              style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                padding: "5px 12px", marginBottom: "0.875rem",
                background: `${BRONZE}08`, border: `1px solid ${BRONZE}25`, borderRadius: "9999px",
              }}
            >
              <span style={{ fontSize: "0.6875rem", fontWeight: 700, color: BRONZE, letterSpacing: "0.05em", textTransform: "uppercase" }}>
                {v.categorie}
              </span>
              <span style={{ color: `${BRONZE}55` }}>·</span>
              <span style={{ fontSize: "0.75rem", fontWeight: 600, color: BRONZE_DARK }}>
                {v.departement} ({v.departementCode})
              </span>
            </div>

            <h1
              style={{
                fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
                fontWeight: 600, fontFamily: HEADING, lineHeight: 1.15,
                color: G.gray900, marginBottom: "0.75rem",
              }}
            >
              {v.nom}
            </h1>

            <div className="flex flex-wrap items-center gap-x-3 gap-y-2" style={{ color: G.gray600, fontSize: "0.9375rem" }}>
              <span className="inline-flex items-center gap-1.5">
                <Users className="w-4 h-4" style={{ color: BRONZE }} />
                Jusqu&apos;à {v.capacite} personnes
              </span>
              {v.chambres ? (
                <>
                  <span style={{ color: G.gray300 }}>·</span>
                  <span className="inline-flex items-center gap-1.5">
                    <Bed className="w-4 h-4" style={{ color: BRONZE }} />
                    {v.chambres} chambres
                  </span>
                </>
              ) : null}
              {v.ville ? (
                <>
                  <span style={{ color: G.gray300 }}>·</span>
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="w-4 h-4" style={{ color: BRONZE }} />
                    {v.ville}
                  </span>
                </>
              ) : null}
            </div>
          </div>

          {photos.length > 0 && (
            <div
              className="hero-grid-listing rounded-2xl overflow-hidden"
              style={{
                display: "grid",
                gridTemplateColumns: "2fr 1fr 1fr",
                gridTemplateRows: "1fr 1fr",
                gap: "8px",
                height: "clamp(280px, 45vw, 460px)",
              }}
            >
              {photos.map((p, i) => (
                <div key={p.url} className="relative overflow-hidden" style={i === 0 ? { gridRow: "1 / 3" } : undefined}>
                  <Image
                    src={p.url}
                    alt={p.legende || `${v.nom} — ${p.categorie || "vue du domaine"}`}
                    fill
                    sizes={i === 0 ? "(max-width: 1024px) 100vw, 50vw" : "(max-width: 1024px) 50vw, 25vw"}
                    className="object-cover"
                    priority={i === 0}
                  />
                </div>
              ))}
            </div>
          )}
        </Container>
      </Section>

      {/* ── Réponse directe + chiffres clés ── */}
      <Section spacing="md" background="gray">
        <Container size="xl">
          <div
            style={{
              background: "white", borderRadius: "16px",
              padding: "clamp(20px, 3vw, 32px)",
              borderLeft: `4px solid ${GOLD}`,
              boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
              marginBottom: "1.5rem",
            }}
          >
            <p style={{ fontSize: "clamp(1.0625rem, 2vw, 1.1875rem)", lineHeight: 1.7, color: G.gray800, margin: 0 }}>
              {reponse}
            </p>
          </div>

          <div className="card-grid-centered" style={{ gap: "12px" }}>
            {chiffres.map(c => (
              <div
                key={c.label}
                style={{
                  background: "white", borderRadius: "16px",
                  padding: "clamp(16px, 2.5vw, 22px)",
                  border: `1px solid ${G.gray200}`, textAlign: "center",
                }}
              >
                <c.icon className="w-5 h-5 mx-auto" style={{ color: BRONZE, marginBottom: "10px" }} />
                <div style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 700, fontFamily: HEADING, color: G.gray900, lineHeight: 1 }}>
                  {c.value}
                </div>
                <div style={{ fontSize: "0.75rem", color: G.gray500, marginTop: "6px" }}>{c.unit}</div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── Description + formulaire ── */}
      <Section spacing="lg" background="white">
        <Container size="xl">
          <div style={{ maxWidth: "880px" }}>
              <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 600, fontFamily: HEADING, color: G.gray900, marginBottom: "1.25rem" }}>
                Le domaine
              </h2>
              {v.description.split(/\n{2,}/).filter(Boolean).map((p, i) => (
                <ParaCard key={i} text={p.trim()} />
              ))}

              {v.salles.length > 0 && (
                <>
                  <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 600, fontFamily: HEADING, color: G.gray900, margin: "2.5rem 0 1.25rem" }}>
                    Salles de réunion
                  </h2>
                  <div style={{ overflowX: "auto", borderRadius: "16px", border: `1px solid ${G.gray200}` }}>
                    <table style={{ width: "100%", minWidth: "480px", borderCollapse: "collapse", fontSize: "0.9375rem" }}>
                      <thead>
                        <tr style={{ background: G.gray50 }}>
                          {["Salle", "Surface", "Théâtre", "En U", "Banquet"].map((h, i) => (
                            <th key={h} style={{
                              padding: "12px 16px", textAlign: i === 0 ? "left" : "right",
                              fontSize: "0.6875rem", fontWeight: 700, textTransform: "uppercase",
                              letterSpacing: "0.06em", color: BRONZE, borderBottom: `1px solid ${G.gray200}`,
                            }}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {v.salles.map(s => (
                          <tr key={s.nom}>
                            <td style={{ padding: "12px 16px", fontWeight: 600, color: G.gray900, borderTop: `1px solid ${G.gray100}` }}>{s.nom}</td>
                            {[s.surface ? `${s.surface} m²` : "—", s.theatre ?? "—", s.u ?? "—", s.banquet ?? "—"].map((val, i) => (
                              <td key={i} style={{ padding: "12px 16px", textAlign: "right", color: G.gray600, fontVariantNumeric: "tabular-nums", borderTop: `1px solid ${G.gray100}` }}>{val}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              )}

              {(v.atouts.length > 0 || v.equipements.length > 0 || v.services.length > 0) && (
                <>
                  <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 600, fontFamily: HEADING, color: G.gray900, margin: "2.5rem 0 1.25rem" }}>
                    Équipements et services
                  </h2>
                  <div className="grid sm:grid-cols-2" style={{ gap: "10px" }}>
                    {[...new Set([...v.atouts, ...v.equipements, ...v.services])].map(e => (
                      <div key={e} className="flex items-center gap-2.5" style={{
                        background: G.gray50, borderRadius: "12px",
                        padding: "12px 16px", fontSize: "0.9375rem", color: G.gray700,
                      }}>
                        <Check className="w-4 h-4 shrink-0" style={{ color: BRONZE }} />
                        {e}
                      </div>
                    ))}
                  </div>
                </>
              )}

              {reste.length > 0 && (
                <>
                  <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 600, fontFamily: HEADING, color: G.gray900, margin: "2.5rem 0 1.25rem" }}>
                    Galerie
                  </h2>
                  <div className="card-grid-centered" style={{ gap: "10px" }}>
                    {reste.map(p => (
                      <div key={p.url} className="relative overflow-hidden rounded-xl" style={{ aspectRatio: "4 / 3", background: G.gray100 }}>
                        <Image
                          src={p.url}
                          alt={p.legende || `${v.nom} — ${p.categorie || "vue du domaine"}`}
                          fill sizes="(max-width: 640px) 50vw, 33vw" className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </>
              )}
          </div>
        </Container>
      </Section>

      {/* ── Demande de devis — pleine largeur, comme sur les fiches château ── */}
      <Section spacing="md" background="gray">
        <Container size="lg">
          <div style={{ textAlign: "center", marginBottom: "1.75rem" }}>
            <h2 style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.125rem)", fontWeight: 600, fontFamily: HEADING, color: G.gray900, marginBottom: "0.625rem" }}>
              Ce lieu vous intéresse ?
            </h2>
            <div className="flex flex-wrap items-center justify-center" style={{ gap: "18px", fontSize: "0.9375rem", color: G.gray600 }}>
              <span className="inline-flex items-center gap-1.5"><Clock className="w-4 h-4" style={{ color: BRONZE }} />Réponse sous 48 h</span>
              <span className="inline-flex items-center gap-1.5"><Shield className="w-4 h-4" style={{ color: BRONZE }} />Sans engagement</span>
              <span className="inline-flex items-center gap-1.5"><Check className="w-4 h-4" style={{ color: BRONZE }} />Devis gratuit</span>
            </div>
          </div>
          <DevisFormMini sourceLabel={`${v.nom} — ${v.ville ?? v.departementCode}`} />
        </Container>
      </Section>

      {/* ── Maillage ── */}
      {(landing || voisins.length > 0) && (
        <Section spacing="lg" background="gray">
          <Container size="xl">
            {landing && (
              <div style={{
                background: "white", borderRadius: "16px",
                padding: "clamp(18px, 3vw, 26px)", borderLeft: `4px solid ${GOLD}`,
                marginBottom: voisins.length ? "2.5rem" : 0, boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
              }}>
                <p style={{ color: G.gray700, margin: 0, fontSize: "1rem", lineHeight: 1.7 }}>
                  Vous comparez plusieurs adresses ?{" "}
                  <Link href={landing} style={{ color: BRONZE_DARK, fontWeight: 600, textDecoration: "underline" }}>
                    Voir tous nos châteaux pour séminaire en {v.departement}
                  </Link>{" "}
                  — disponibilités et devis sous 48 h.
                </p>
              </div>
            )}

            {voisins.length > 0 && (
              <>
                <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 600, fontFamily: HEADING, color: G.gray900, marginBottom: "1.5rem" }}>
                  Autres lieux en {v.departement ?? `département ${v.departementCode}`}
                </h2>
                <div className="card-grid-centered" style={{ gap: "18px" }}>
                  {voisins.map(n => (
                    <Link key={n.slug} href={`/lieux/${n.slug}`} className="group block overflow-hidden"
                      style={{ background: "white", borderRadius: "16px", border: `1px solid ${G.gray200}` }}>
                      <div className="relative overflow-hidden" style={{ aspectRatio: "4 / 3", background: G.gray100 }}>
                        {n.photos[0] && (
                          <Image src={n.photos[0].url} alt={n.photos[0].legende || n.nom} fill
                            sizes="(max-width: 640px) 100vw, 33vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-105" />
                        )}
                      </div>
                      <div style={{ padding: "16px 18px" }}>
                        <div style={{ fontSize: "0.6875rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: BRONZE, marginBottom: "6px" }}>
                          {n.ville}
                        </div>
                        <div style={{ fontFamily: HEADING, fontSize: "1.0625rem", fontWeight: 600, color: G.gray900, marginBottom: "10px", lineHeight: 1.3 }}>
                          {n.nom}
                        </div>
                        <div className="flex items-center justify-between" style={{ fontSize: "0.8125rem", color: G.gray600 }}>
                          <span>{n.capacite} pers.{n.chambres ? ` · ${n.chambres} ch.` : ""}</span>
                          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" style={{ color: BRONZE }} />
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </>
            )}
          </Container>
        </Section>
      )}
    </>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Users, ArrowRight, Sparkles, Bed } from "lucide-react";
import { chateaux } from "@/data/chateaux";
import { theme } from "@/config/theme";
import { colors, spacing } from "@/config/themeHelpers";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export function ChateauxSection() {
  return (
    <section className="bg-gradient-to-b from-white via-gray-50 to-white relative overflow-hidden" style={{ padding: 'clamp(3rem, 8vw, 5rem) 0' }}>
      {/* Glow effect subtil */}
      <div className="absolute top-0 left-1/4 rounded-full blur-3xl" style={{
        width: "384px",
        height: "384px",
        background: `${colors.bronze}0D`
      }} />
      <div className="absolute bottom-0 right-1/4 rounded-full blur-3xl" style={{
        width: "384px",
        height: "384px",
        background: `${colors.bronze}0D`
      }} />

      <div className="w-full flex flex-col items-center justify-center relative z-10">
        {/* Titre section */}
        <motion.div
          initial={{ opacity: 0, y: 40, clipPath: "inset(100% 0 0 0)" }}
          whileInView={{ opacity: 1, y: 0, clipPath: "inset(0 0 0 0)" }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
          className="flex flex-col items-center justify-center text-center w-full px-5 sm:px-8 md:px-12 lg:px-16"
          style={{ marginBottom: 'clamp(2.5rem, 6vw, 4rem)' }}
        >
          <div className="flex items-center justify-center" style={{ marginBottom: spacing.lg }}>
            <div style={{
              height: "1px",
              width: "48px",
              background: `linear-gradient(to right, transparent, ${colors.bronze})`
            }} />
            <Sparkles className="w-4 h-4" style={{ color: colors.bronze, margin: `0 ${spacing.lg}` }} />
            <div style={{
              height: "1px",
              width: "48px",
              background: `linear-gradient(to left, transparent, ${colors.bronze})`
            }} />
          </div>
          <h2 style={{
            fontSize: "clamp(2rem, 6vw, 3.75rem)",
            fontWeight: theme.typography.fontWeight.light,
            fontStyle: "italic",
            color: theme.colors.neutral.gray900,
            marginBottom: 'clamp(1rem, 3vw, 2rem)',
            fontFamily: theme.typography.fonts.heading
          }}>
            Nos Châteaux d'Exception
          </h2>
          <p style={{
            fontSize: theme.typography.fontSize.lg,
            color: theme.colors.neutral.gray600,
            maxWidth: theme.dimensions.maxWidth.lg,
            lineHeight: theme.typography.lineHeight.relaxed
          }}>
            Découvrez nos 4 châteaux soigneusement sélectionnés à travers la
            France, chacun offrant un cadre unique pour vos événements
            d'entreprise.
          </p>
        </motion.div>

        {/* Grille de cartes châteaux */}
        <div className="grid grid-cols-1 md:grid-cols-2 max-w-7xl mx-auto w-full px-4 sm:px-8 md:px-12 lg:px-16" style={{ gap: 'clamp(1rem, 3vw, 2rem)' }}>
          {chateaux.map((chateau, index) => (
            <motion.div
              key={chateau.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.15, ease: [0.4, 0, 0.2, 1] }}
            >
              <Card
                href={`/chateaux/${chateau.slug}`}
                variant="hover"
                padding="none"
                hoverable
                className="group block relative overflow-hidden"
              >
                {/* Image avec effet grayscale → couleur */}
                <div className="relative overflow-hidden" style={{ height: 'clamp(18rem, 45vw, 28rem)' }}>
                  <Image
                    src={chateau.images.card}
                    alt={chateau.nom}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover group-hover:scale-105"
                    style={{ transition: `all ${theme.effects.transitions.ultra} ease-out` }}
                  />

                  {/* Overlay gradient permanent subtil */}
                  <div className="absolute inset-0" style={{ background: theme.gradients.overlayBottom.replace("rgba(5, 5, 5, 0.9)", "rgba(31, 41, 55, 0.2)") }} />

                  {/* Overlay informations - visible uniquement au hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100" style={{
                    background: 'rgba(255, 255, 255, 0.87)',
                    transition: `opacity ${theme.effects.transitions.ultra} ease-out`
                  }}>
                    <div className="absolute inset-0 flex flex-col justify-end" style={{ padding: 'clamp(1.25rem, 4vw, 2rem)' }}>
                      {/* Titre */}
                      <motion.h3
                        className="translate-y-4 group-hover:translate-y-0"
                        style={{
                          fontSize: 'clamp(1.5rem, 4vw, 2.25rem)',
                          fontWeight: theme.typography.fontWeight.light,
                          fontStyle: "italic",
                          color: theme.colors.neutral.gray900,
                          fontFamily: theme.typography.fonts.heading,
                          marginBottom: 'clamp(0.75rem, 2.5vw, 1.25rem)',
                          transition: `transform ${theme.effects.transitions.slower}`
                        }}
                      >
                        {chateau.nom}
                      </motion.h3>

                      {/* Description */}
                      <p className="line-clamp-2 translate-y-4 group-hover:translate-y-0" style={{
                        fontSize: 'clamp(0.9375rem, 2vw, 1rem)',
                        color: theme.colors.neutral.gray800,
                        lineHeight: theme.typography.lineHeight.relaxed,
                        marginBottom: 'clamp(0.875rem, 2.5vw, 1.25rem)',
                        transition: `transform ${theme.effects.transitions.slower} 75ms`
                      }}>
                        {chateau.description}
                      </p>

                      {/* Atouts principaux */}
                      <ul className="translate-y-4 group-hover:translate-y-0" style={{
                        marginBottom: 'clamp(0.875rem, 2.5vw, 1.25rem)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 'clamp(0.5rem, 1.5vw, 0.625rem)',
                        transition: `transform ${theme.effects.transitions.slower} 150ms`
                      }}>
                        {chateau.atouts.slice(0, 3).map((atout, i) => (
                          <li
                            key={i}
                            className="flex items-start"
                            style={{
                              fontSize: 'clamp(0.875rem, 2vw, 0.9375rem)',
                              color: theme.colors.neutral.gray800
                            }}
                          >
                            <span style={{
                              color: colors.bronze,
                              marginTop: "2px",
                              fontWeight: theme.typography.fontWeight.bold,
                              fontSize: 'clamp(1rem, 2.2vw, 1.125rem)',
                              marginRight: 'clamp(0.5rem, 1.5vw, 0.625rem)'
                            }}>•</span>
                            <span>{atout}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Informations de localisation - en bas */}
                      <div className="flex items-center flex-wrap translate-y-4 group-hover:translate-y-0" style={{
                        gap: 'clamp(0.75rem, 2vw, 1.5rem)',
                        marginBottom: 'clamp(0.875rem, 2.5vw, 1.25rem)',
                        transition: `transform ${theme.effects.transitions.slower} 150ms`,
                        paddingTop: 'clamp(0.5rem, 1.5vw, 0.75rem)',
                        borderTop: `1px solid ${theme.colors.neutral.gray300}`
                      }}>
                        <div className="flex items-center" style={{
                          gap: spacing.sm,
                          color: theme.colors.neutral.gray800
                        }}>
                          <MapPin className="w-5 h-5" style={{ color: colors.bronze }} />
                          <span style={{ fontSize: theme.typography.fontSize.sm, fontWeight: theme.typography.fontWeight.medium }}>{chateau.region}</span>
                        </div>
                        <div className="flex items-center" style={{
                          gap: spacing.sm,
                          color: theme.colors.neutral.gray800
                        }}>
                          <Users className="w-5 h-5" style={{ color: colors.bronze }} />
                          <span style={{ fontSize: theme.typography.fontSize.sm }}>
                            {chateau.capacite.min}-{chateau.capacite.max} pers.
                          </span>
                        </div>
                        <div className="flex items-center" style={{
                          gap: spacing.sm,
                          color: theme.colors.neutral.gray800
                        }}>
                          <Bed className="w-5 h-5" style={{ color: colors.bronze }} />
                          <span style={{ fontSize: theme.typography.fontSize.sm }}>
                            {chateau.roomsTotal} Chambres
                          </span>
                        </div>
                      </div>

                      {/* CTA */}
                      <div className="inline-flex items-center translate-y-4 group-hover:translate-y-0" style={{
                        color: colors.bronze,
                        fontWeight: theme.typography.fontWeight.medium,
                        transition: `transform ${theme.effects.transitions.slower} 200ms`
                      }}>
                        <span style={{
                          fontSize: theme.typography.fontSize.sm,
                          textTransform: "uppercase",
                          letterSpacing: theme.typography.letterSpacing.wider
                        }}>Découvrir</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-2" style={{
                          marginLeft: spacing.sm,
                          transition: `transform ${theme.effects.transitions.smooth}`
                        }} />
                      </div>
                    </div>
                  </div>

                  {/* Badge région - masqué au hover */}
                  <Badge
                    variant="default"
                    size="md"
                    className="absolute z-10 group-hover:opacity-0"
                    style={{
                      top: 'clamp(1rem, 3vw, 2rem)',
                      right: 'clamp(1rem, 3vw, 2rem)',
                      transition: `opacity ${theme.effects.transitions.ultra} ease-out`
                    }}
                  >
                    {chateau.region}
                  </Badge>

                  {/* Effet de bordure lumineuse au hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100" style={{
                    transition: `opacity ${theme.effects.transitions.ultra}`
                  }}>
                    <div className="absolute top-0 left-0 right-0" style={{
                      height: "1px",
                      background: `linear-gradient(to right, transparent, ${colors.bronze}, transparent)`
                    }} />
                    <div className="absolute bottom-0 left-0 right-0" style={{
                      height: "1px",
                      background: `linear-gradient(to right, transparent, ${colors.bronze}, transparent)`
                    }} />
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* CTA global */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex items-center justify-center w-full"
          style={{ marginTop: 'clamp(2.5rem, 6vw, 4rem)', padding: `0 clamp(1rem, 3vw, 1.25rem)` }}
        >
          <Link
            href="/chateaux"
            className="group inline-flex items-center hover:text-[var(--bronze-antique)] hover:border-[var(--bronze-antique)] hover:shadow-2xl"
            style={{
              background: theme.colors.overlay.white80,
              backdropFilter: `blur(${theme.effects.blur.sm})`,
              border: `1px solid ${colors.bronze}4D`,
              borderRadius: theme.effects.borderRadius.full,
              color: theme.colors.neutral.gray900,
              padding: theme.components.button.padding.md,
              transition: `all ${theme.effects.transitions.slower}`
            }}
          >
            <span style={{ fontWeight: theme.typography.fontWeight.medium }}>Voir tous nos châteaux</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-2" style={{
              marginLeft: spacing.md,
              transition: `transform ${theme.effects.transitions.smooth}`
            }} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

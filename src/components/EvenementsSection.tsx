"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Presentation, BookOpen, Sparkles, Users, ArrowRight, Star } from "lucide-react";
import { typesEvenements } from "@/data/chateaux";
import { theme } from "@/config/theme";
import { colors, spacing } from "@/config/themeHelpers";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { generateEventAlt } from "@/utils/imageAlt";

const iconMap: Record<string, React.ReactNode> = {
  presentation: <Presentation className="w-6 h-6" />,
  "book-open": <BookOpen className="w-6 h-6" />,
  champagne: <Sparkles className="w-6 h-6" />,
  users: <Users className="w-6 h-6" />,
};

export function EvenementsSection() {
  return (
    <section className="bg-gradient-to-br from-gray-50 via-white to-gray-100 relative overflow-hidden" style={{ padding: 'clamp(2rem, 4vw, 3rem) 0' }}>
      {/* Glow effects subtils */}
      <div className="absolute top-1/3 left-0 rounded-full blur-3xl" style={{
        width: "384px",
        height: "384px",
        background: `${colors.bronze}0D`
      }} />
      <div className="absolute bottom-1/3 right-0 rounded-full blur-3xl" style={{
        width: "384px",
        height: "384px",
        background: `${colors.bronze}0D`
      }} />

      <div className="w-full flex flex-col items-center justify-center relative z-10">
        {/* Titre section avec animation Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 40, clipPath: "inset(100% 0 0 0)" }}
          whileInView={{ opacity: 1, y: 0, clipPath: "inset(0 0 0 0)" }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
          className="flex flex-col items-center justify-center text-center w-full px-5 sm:px-8 md:px-12 lg:px-16"
          style={{ marginBottom: 'clamp(1.5rem, 3vw, 2rem)' }}
        >
          <div className="flex items-center justify-center" style={{ marginBottom: '12px' }}>
            <div style={{
              height: "1px",
              width: "48px",
              background: `linear-gradient(to right, transparent, ${colors.bronze})`
            }} />
            <Star className="w-4 h-4" style={{ color: colors.bronze, margin: `0 ${spacing.lg}` }} />
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
            marginBottom: '16px',
            fontFamily: theme.typography.fonts.heading
          }}>
            Types d'Événements
          </h2>
          <p style={{
            fontSize: theme.typography.fontSize.lg,
            color: theme.colors.neutral.gray600,
            maxWidth: theme.dimensions.maxWidth.lg,
            lineHeight: theme.typography.lineHeight.relaxed
          }}>
            Des solutions sur-mesure pour tous vos besoins événementiels
            d'entreprise
          </p>
        </motion.div>

        {/* Grille d'événements */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto w-full gap-4 md:gap-5 lg:gap-8 px-4 sm:px-8 md:px-12 lg:px-16">
          {typesEvenements.map((evenement, index) => (
            <motion.div
              key={evenement.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: [0.4, 0, 0.2, 1] }}
              className="group"
            >
              <Card
                variant="hover"
                padding="none"
                hoverable
                className="h-full flex flex-col overflow-hidden"
                style={{ background: theme.colors.overlay.white80, backdropFilter: `blur(${theme.effects.blur.sm})` }}
              >
                {/* Image avec grayscale hover */}
                <div className="relative overflow-hidden h-44 sm:h-48 md:h-52">
                  <Image
                    src={evenement.image}
                    alt={generateEventAlt(evenement.titre)}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover group-hover:scale-110"
                    style={{ transition: `all ${theme.effects.transitions.ultra} ease-out` }}
                  />
                  <div className="absolute inset-0" style={{
                    background: `linear-gradient(to top, ${theme.colors.neutral.gray900}4D, ${theme.colors.neutral.gray900}1A, transparent)`
                  }} />

                  {/* Icône avec glass morphism */}
                  <div className="absolute flex items-center justify-center group-hover:scale-110 group-hover:border-[var(--bronze-antique)] w-10 h-10 sm:w-12 sm:h-12 top-4 left-4 sm:top-6 sm:left-6" style={{
                    borderRadius: theme.effects.borderRadius.full,
                    background: theme.colors.overlay.white90,
                    backdropFilter: `blur(${theme.effects.blur.sm})`,
                    border: `1px solid ${colors.bronze}4D`,
                    color: colors.bronze,
                    boxShadow: theme.effects.shadows.lg,
                    transition: `all ${theme.effects.transitions.slower}`
                  }}>
                    {iconMap[evenement.icon]}
                  </div>

                  {/* Ligne de séparation bronze en bas */}
                  <div className="absolute bottom-0 left-0 right-0 opacity-0 group-hover:opacity-100" style={{
                    height: "1px",
                    background: `linear-gradient(to right, transparent, ${colors.bronze}80, transparent)`,
                    transition: `opacity ${theme.effects.transitions.slower}`
                  }} />
                </div>

                {/* Contenu */}
                <div className="flex-1 flex flex-col" style={{ padding: '20px' }}>
                  <h3 className="group-hover:text-[var(--bronze-antique)]" style={{
                    fontSize: theme.typography.fontSize["2xl"],
                    fontWeight: theme.typography.fontWeight.light,
                    fontStyle: "italic",
                    color: theme.colors.neutral.gray900,
                    fontFamily: theme.typography.fonts.heading,
                    marginBottom: '16px',
                    transition: `colors ${theme.effects.transitions.slower}`,
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center'
                  }}>
                    {evenement.titre}
                  </h3>

                  <p style={{
                    color: theme.colors.neutral.gray600,
                    fontSize: theme.typography.fontSize.sm,
                    lineHeight: '1.6',
                    marginBottom: '20px',
                    height: '115px',
                    overflow: 'hidden'
                  }}>
                    {evenement.description}
                  </p>

                  {/* Services inclus */}
                  <ul className="flex flex-col" style={{ gap: '8px', marginBottom: '20px', height: '56px' }}>
                    {evenement.servicesInclus.slice(0, 2).map((service, i) => (
                      <li
                        key={i}
                        className="flex items-start"
                        style={{
                          fontSize: theme.typography.fontSize.xs,
                          color: theme.colors.neutral.gray600
                        }}
                      >
                        <span style={{
                          color: colors.bronze,
                          marginRight: "10px",
                          flexShrink: 0,
                          marginTop: "2px"
                        }}>
                          •
                        </span>
                        <span style={{ lineHeight: '1.4' }}>{service}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Link
                    href={`/seminaires-soirees-entreprise#${evenement.id}`}
                    className="flex items-center group/link hover:text-[var(--bronze-antique)]"
                    style={{
                      color: `${colors.bronze}CC`,
                      fontWeight: theme.typography.fontWeight.medium,
                      fontSize: theme.typography.fontSize.sm,
                      transition: `colors ${theme.effects.transitions.smooth}`
                    }}
                  >
                    <span style={{
                      textTransform: "uppercase",
                      letterSpacing: theme.typography.letterSpacing.wider
                    }}>En savoir plus</span>
                    <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1" style={{
                      marginLeft: spacing.sm,
                      transition: `transform ${theme.effects.transitions.smooth}`
                    }} />
                  </Link>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* CTA principal */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex items-center justify-center w-full px-4 sm:px-8 md:px-12 lg:px-16"
          style={{ marginTop: '32px' }}
        >
          <Button
            href="/devis"
            variant="primary"
            size="md"
            icon={<ArrowRight className="w-5 h-5" />}
            iconPosition="right"
          >
            Demander un Devis Personnalisé
          </Button>
        </motion.div>
      </div>

      {/* Ligne décorative en haut */}
      <div className="absolute top-0 left-0 right-0" style={{
        height: "1px",
        background: `linear-gradient(to right, transparent, ${colors.bronze}33, transparent)`
      }} />
      {/* Ligne décorative en bas */}
      <div className="absolute bottom-0 left-0 right-0" style={{
        height: "1px",
        background: `linear-gradient(to right, transparent, ${colors.bronze}33, transparent)`
      }} />
    </section>
  );
}

"use client";

import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Users, ArrowRight, Check, Sparkles, Award } from "lucide-react";
import { chateaux } from "@/data/chateaux";
import { theme } from "@/config/theme";
import { colors, spacing } from "@/config/themeHelpers";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { useState } from "react";

// Types
type Region = "Tous" | "Vallée de la Loire" | "Provence" | "Bourgogne" | "Normandie";

export default function ChateauxPage() {
  const [selectedRegion, setSelectedRegion] = useState<Region>("Tous");

  const regions: Region[] = ["Tous", "Vallée de la Loire", "Provence", "Bourgogne", "Normandie"];

  const filteredChateaux = selectedRegion === "Tous"
    ? chateaux
    : chateaux.filter(chateau => chateau.region === selectedRegion);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - FULL SCREEN IMMERSIVE (100vh) */}
      <section style={{ height: '75vh' }} className="relative overflow-hidden">
        {/* Image Background */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1464207687429-7505649dae38?w=1920&auto=format&fit=crop&q=90"
            alt="Châteaux d'exception"
            fill
            className="object-cover"
            priority
            quality={90}
            sizes="100vw"
          />
        </div>

        {/* Overlay lumineux (blanc/léger) */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to-b, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.25) 100%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{ background: theme.colors.overlay.white10 }}
        />

        {/* Contenu Hero - Centré */}
        <div className="relative h-full flex flex-col items-center justify-center text-center px-4 sm:px-6 md:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-5xl"
          >
            {/* Badge intro */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="inline-flex items-center gap-2 md:gap-3 mb-6 md:mb-8"
            >
              <Badge variant="glass" size="lg" icon={<Award className="w-5 h-5" />}>
                Collection Prestige
              </Badge>
            </motion.div>

            {/* Titre géant avec animation reveal */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              style={{
                fontSize: "clamp(3rem, 8vw, 7rem)",
                fontWeight: theme.typography.fontWeight.light,
                fontStyle: "italic",
                color: theme.colors.text.primary,
                fontFamily: theme.typography.fonts.heading,
                lineHeight: theme.typography.lineHeight.tight,
                marginBottom: spacing["3xl"],
              }}
            >
              Nos Châteaux d'Exception
            </motion.h1>

            {/* Sous-titre élégant */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
              style={{
                fontSize: theme.typography.fontSize["2xl"],
                color: theme.colors.text.secondary,
                lineHeight: theme.typography.lineHeight.relaxed,
                maxWidth: "800px",
                margin: "0 auto",
                marginBottom: spacing["5xl"],
              }}
            >
              Quatre joyaux du patrimoine français soigneusement sélectionnés pour accueillir vos événements d'entreprise les plus prestigieux
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4"
            >
              <Button
                href="#chateaux"
                variant="primary"
                size="lg"
                icon={<ArrowRight className="w-5 h-5" />}
              >
                Découvrir les Châteaux
              </Button>
              <Button
                href="/contact"
                variant="secondary"
                size="lg"
              >
                Parler à un Expert
              </Button>
            </motion.div>
          </motion.div>

          {/* Scroll indicator animé */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="absolute bottom-12 md:bottom-16 lg:bottom-24"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="flex flex-col items-center gap-3 md:gap-4"
            >
              <span
                style={{
                  fontSize: theme.typography.fontSize.xs,
                  textTransform: "uppercase",
                  letterSpacing: theme.typography.letterSpacing.ultra,
                  fontWeight: theme.typography.fontWeight.bold,
                  color: theme.colors.text.primary,
                }}
              >
                Découvrir
              </span>
              <div
                className="flex items-start justify-center"
                style={{
                  width: "28px",
                  height: "46px",
                  border: `2px solid ${theme.colors.text.primary}`,
                  borderRadius: theme.effects.borderRadius.full,
                  padding: spacing.sm,
                  background: theme.colors.overlay.white90,
                }}
              >
                <div
                  style={{
                    width: "4px",
                    height: "14px",
                    background: colors.bronze,
                    borderRadius: theme.effects.borderRadius.full,
                  }}
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Section Filtres par Région */}
      <section id="chateaux" className="py-16 md:py-20 lg:py-24" style={{ background: theme.colors.neutral.gray50 }}>
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12 md:mb-16 lg:mb-20"
          >
            <div className="flex items-center justify-center gap-3 md:gap-4 mb-4 md:mb-6">
              <Sparkles className="w-6 h-6" style={{ color: colors.bronze }} />
              <h2
                style={{
                  fontSize: theme.typography.fontSize.xs,
                  textTransform: "uppercase",
                  letterSpacing: theme.typography.letterSpacing.ultra,
                  fontWeight: theme.typography.fontWeight.bold,
                  color: colors.bronze,
                }}
              >
                Notre Collection
              </h2>
            </div>
            <h3
              style={{
                fontSize: "clamp(2.5rem, 5vw, 4rem)",
                fontWeight: theme.typography.fontWeight.light,
                fontStyle: "italic",
                color: theme.colors.text.primary,
                fontFamily: theme.typography.fonts.heading,
                lineHeight: theme.typography.lineHeight.tight,
              }}
            >
              Explorez nos Domaines
            </h3>
          </motion.div>

          {/* Filtres Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-wrap items-center justify-center gap-3 md:gap-4 mb-16 md:mb-20 lg:mb-24"
          >
            {regions.map((region) => (
              <button
                key={region}
                onClick={() => setSelectedRegion(region)}
                className="relative group"
                style={{
                  padding: `${spacing.md} ${spacing["2xl"]}`,
                  fontSize: theme.typography.fontSize.base,
                  fontWeight: theme.typography.fontWeight.semibold,
                  color: selectedRegion === region ? colors.bronze : theme.colors.text.muted,
                  background: selectedRegion === region ? theme.colors.neutral.white : "transparent",
                  border: selectedRegion === region ? `2px solid ${colors.bronze}` : "2px solid transparent",
                  borderRadius: theme.effects.borderRadius.full,
                  transition: `all ${theme.effects.transitions.smooth}`,
                  cursor: "pointer",
                  boxShadow: selectedRegion === region ? theme.effects.shadows.lg : "none",
                }}
              >
                {region}
                {selectedRegion === region && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0"
                    style={{
                      border: `2px solid ${colors.bronze}`,
                      borderRadius: theme.effects.borderRadius.full,
                      zIndex: -1,
                    }}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Section Châteaux - GRID PREMIUM (2 colonnes) */}
      <section className="py-16 md:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {filteredChateaux.map((chateau, index) => (
              <motion.div
                key={chateau.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true }}
              >
                <Card
                  variant="hover"
                  padding="none"
                  href={`/chateaux/${chateau.slug}`}
                  hoverable
                  className="h-full overflow-hidden group"
                >
                  {/* Image principale GRANDE */}
                  <div className="relative h-64 md:h-80 lg:h-96 overflow-hidden">
                    <Image
                      src={chateau.images[0]}
                      alt={chateau.nom}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    {/* Overlay gradient au hover */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background: "linear-gradient(to-t, rgba(0,0,0,0.7) 0%, transparent 50%)",
                      }}
                    />
                    {/* Badge région */}
                    <div className="absolute top-4 right-4 md:top-6 md:right-6">
                      <Badge variant="glass" size="md" icon={<MapPin className="w-4 h-4" />}>
                        {chateau.region}
                      </Badge>
                    </div>
                  </div>

                  {/* Contenu */}
                  <div className="p-6 md:p-8 lg:p-10">
                    {/* Titre */}
                    <h3
                      style={{
                        fontSize: theme.typography.fontSize["3xl"],
                        fontWeight: theme.typography.fontWeight.light,
                        fontStyle: "italic",
                        color: theme.colors.text.primary,
                        fontFamily: theme.typography.fonts.heading,
                        marginBottom: spacing.lg,
                        transition: `color ${theme.effects.transitions.smooth}`,
                      }}
                      className="group-hover:text-[var(--bronze-antique)]"
                    >
                      {chateau.nom}
                    </h3>

                    {/* Infos capacité + style */}
                    <div className="flex items-center flex-wrap gap-3 md:gap-4 mb-6 md:mb-8">
                      <div className="flex items-center gap-2">
                        <Users className="w-5 h-5" style={{ color: colors.bronze }} />
                        <span
                          style={{
                            fontSize: theme.typography.fontSize.sm,
                            color: theme.colors.text.muted,
                            fontWeight: theme.typography.fontWeight.medium,
                          }}
                        >
                          {chateau.capacite.min}-{chateau.capacite.max} pers.
                        </span>
                      </div>
                      <Badge variant="outline" size="sm">
                        {chateau.styleArchitectural}
                      </Badge>
                    </div>

                    {/* Description */}
                    <p
                      style={{
                        fontSize: theme.typography.fontSize.base,
                        color: theme.colors.text.muted,
                        lineHeight: theme.typography.lineHeight.relaxed,
                        marginBottom: spacing["3xl"],
                      }}
                    >
                      {chateau.description}
                    </p>

                    {/* Liste atouts avec check icons */}
                    <div className="mb-8 md:mb-10 lg:mb-12">
                      <h4
                        style={{
                          fontSize: theme.typography.fontSize.sm,
                          fontWeight: theme.typography.fontWeight.bold,
                          textTransform: "uppercase",
                          letterSpacing: theme.typography.letterSpacing.wider,
                          color: colors.bronze,
                        }}
                        className="mb-4 md:mb-6"
                      >
                        Points Forts
                      </h4>
                      <ul className="flex flex-col gap-3 md:gap-4">
                        {chateau.atouts.slice(0, 3).map((atout, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-3 md:gap-4"
                          >
                            <div
                              className="flex items-center justify-center flex-shrink-0"
                              style={{
                                width: "20px",
                                height: "20px",
                                borderRadius: theme.effects.borderRadius.full,
                                background: `${colors.bronze}20`,
                              }}
                            >
                              <Check className="w-3 h-3" style={{ color: colors.bronze }} />
                            </div>
                            <span
                              style={{
                                fontSize: theme.typography.fontSize.sm,
                                color: theme.colors.text.secondary,
                                lineHeight: theme.typography.lineHeight.normal,
                              }}
                            >
                              {atout}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* CTA Button */}
                    <Button
                      variant="outline"
                      size="md"
                      fullWidth
                      icon={<ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />}
                    >
                      Découvrir ce Château
                    </Button>
                  </div>

                  {/* Galerie miniature au bas */}
                  <div className="grid grid-cols-4 gap-1.5 md:gap-2 px-4 md:px-6 lg:px-8 pb-4 md:pb-6 lg:pb-8">
                    {chateau.images.slice(1, 5).map((image, i) => (
                      <div
                        key={i}
                        className="relative h-20 rounded-xl overflow-hidden"
                      >
                        <Image
                          src={image}
                          alt={`${chateau.nom} ${i + 2}`}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                          sizes="(max-width: 768px) 25vw, 12vw"
                        />
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Message si aucun résultat */}
          {filteredChateaux.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center py-20 md:py-28 lg:py-32"
            >
              <p
                style={{
                  fontSize: theme.typography.fontSize.xl,
                  color: theme.colors.text.muted,
                }}
              >
                Aucun château trouvé dans cette région.
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Section finale avec gradient */}
      <section
        className="py-20 md:py-28 lg:py-32"
        style={{
          background: `linear-gradient(135deg, ${colors.bronze} 0%, ${colors.bronzeDark} 100%)`,
        }}
      >
        <div className="container mx-auto text-center px-4 sm:px-6 md:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <Sparkles
              className="mx-auto mb-6"
              style={{ width: "48px", height: "48px", color: theme.colors.neutral.white }}
            />
            <h2
              style={{
                fontSize: "clamp(2.5rem, 5vw, 4rem)",
                fontWeight: theme.typography.fontWeight.light,
                fontStyle: "italic",
                color: theme.colors.neutral.white,
                fontFamily: theme.typography.fonts.heading,
                lineHeight: theme.typography.lineHeight.tight,
                marginBottom: spacing["2xl"],
              }}
            >
              Vous hésitez entre plusieurs châteaux ?
            </h2>
            <p
              style={{
                fontSize: theme.typography.fontSize.xl,
                color: theme.colors.overlay.white80,
                lineHeight: theme.typography.lineHeight.relaxed,
                marginBottom: spacing["5xl"],
                maxWidth: "700px",
                margin: `0 auto ${spacing["5xl"]}`,
              }}
            >
              Nos experts vous conseillent gratuitement pour choisir le lieu idéal selon vos besoins et l'ambiance souhaitée
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4">
              <Button
                href="/contact"
                variant="secondary"
                size="lg"
                icon={<ArrowRight className="w-5 h-5" />}
              >
                Parler à un Expert
              </Button>
              <Button
                href="/devis"
                variant="ghost"
                size="lg"
                style={{
                  color: theme.colors.neutral.white,
                  borderColor: theme.colors.overlay.white30,
                }}
              >
                Demander un Devis
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

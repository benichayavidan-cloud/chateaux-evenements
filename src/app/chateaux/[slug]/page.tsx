"use client";

import { notFound, useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { MapPin, Users, Check, Sparkles, Calendar, Award } from "lucide-react";
import { chateaux as chateauxData } from "@/data/chateaux";
import { Chateau } from "@/types";
import { theme } from "@/config/theme";
import { colors, spacing } from "@/config/themeHelpers";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";

export default function ChateauPage() {
  const params = useParams();
  const slug = params.slug as string;
  const { scrollY } = useScroll();

  // Parallax effect pour le hero
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);

  // Floating card visibility - cache sur le hero, affiche après scroll
  const floatingCardOpacity = useTransform(scrollY, [300, 500], [0, 1]);

  // Utiliser les données locales au lieu de Supabase
  const chateau = chateauxData.find(c => c.slug === slug);

  if (!chateau) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Design compact */}
      <div style={{ height: '85vh', minHeight: '600px' }} className="relative overflow-hidden">
        {/* Image de fond */}
        <div className="absolute inset-0">
          <Image
            src={chateau.images[0]}
            alt={chateau.nom}
            fill
            className="object-cover"
            priority
            quality={95}
            sizes="100vw"
            style={{ filter: 'saturate(1.2) contrast(1.1) brightness(1.05)' }}
          />
        </div>

        {/* Gradient subtil en bas */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20" />

        {/* Contenu à gauche avec badge au-dessus */}
        <div className="absolute left-0 top-0 h-full flex flex-col justify-center" style={{ paddingLeft: '48px' }}>
          {/* Badge lieu au-dessus du conteneur */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="flex justify-center"
            style={{ maxWidth: '480px', width: '100%', marginBottom: '20px' }}
          >
            <Badge variant="glass" size="md">
              <div
                className="w-1.5 h-1.5 rounded-full animate-pulse"
                style={{
                  background: colors.bronze,
                  filter: "drop-shadow(0 0 4px rgba(163, 126, 44, 0.8))",
                }}
              />
              <div
                className="italic font-semibold"
                style={{
                  fontSize: theme.typography.fontSize.xs,
                  color: colors.white,
                  fontFamily: theme.typography.fonts.heading,
                }}
              >
                {chateau.nom}
              </div>
              <div style={{ color: colors.bronze }}>·</div>
              <div
                className="font-medium"
                style={{
                  fontSize: theme.typography.fontSize.xs,
                  color: theme.colors.neutral.gray300,
                }}
              >
                {chateau.region}
              </div>
            </Badge>
          </motion.div>

          {/* Conteneur principal */}
          <div
            className="text-left rounded-2xl w-full"
            style={{
              maxWidth: '480px',
              background: 'rgba(255, 255, 255, 0.85)',
              backdropFilter: 'blur(12px)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
              padding: '24px 20px',
            }}
          >
            {/* Titre */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1], delay: 0.1 }}
              style={{
                fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
                fontWeight: theme.typography.fontWeight.light,
                fontStyle: 'italic',
                fontFamily: theme.typography.fonts.heading,
                lineHeight: theme.typography.lineHeight.tight,
                color: theme.colors.text.primary,
                marginBottom: spacing.sm,
              }}
            >
              Un Château d'Exception
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1], delay: 0.2 }}
              style={{
                fontSize: theme.typography.fontSize.sm,
                color: theme.colors.text.secondary,
                fontWeight: theme.typography.fontWeight.normal,
                lineHeight: theme.typography.lineHeight.relaxed,
                marginBottom: spacing.lg,
              }}
            >
              {chateau.description}
            </motion.p>

            {/* Badge capacité */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1], delay: 0.3 }}
              className="inline-flex items-center gap-2"
              style={{
                background: `${colors.bronze}10`,
                border: `2px solid ${colors.bronze}`,
                padding: spacing.md,
                borderRadius: theme.effects.borderRadius.full,
              }}
            >
              <Users className="w-4 h-4" style={{ color: colors.bronze }} />
              <div
                style={{
                  fontSize: theme.typography.fontSize.xs,
                  color: colors.bronze,
                  textTransform: "uppercase",
                  letterSpacing: theme.typography.letterSpacing.wider,
                  fontWeight: theme.typography.fontWeight.medium,
                  whiteSpace: "nowrap",
                }}
              >
                {chateau.capacite.min}-{chateau.capacite.max} personnes
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-8 z-5">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="flex flex-col items-center gap-3"
          >
            <span
              style={{
                color: theme.colors.text.primary,
                fontSize: theme.typography.fontSize.xs,
                textTransform: "uppercase",
                letterSpacing: theme.typography.letterSpacing.widest,
                fontWeight: theme.typography.fontWeight.bold,
              }}
            >
              Découvrez
            </span>
            <div
              className="w-6 h-10 rounded-full border-2 flex items-start justify-center p-2 bg-white/60 shadow-md"
              style={{
                borderColor: theme.colors.neutral.gray600,
              }}
            >
              <div
                className="w-1 h-2 rounded-full"
                style={{ background: colors.bronze }}
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="relative bg-white">
        {/* Section À propos - CENTRÉE */}
        <div className="section-white section-padding-sm">
          <div className="section-container flex-col-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-8"
            >
              <div className="flex flex-col items-center gap-2 mb-6">
                <Sparkles className="w-6 h-6 text-[var(--bronze-antique)]" />
                <h2 className="text-label text-[var(--bronze-antique)]">
                  À propos
                </h2>
              </div>
              <h3 className="heading-xl">
                Une expérience d'exception
              </h3>
            </motion.div>

            {/* Contenu centré */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-body-xl text-gray-600 max-w-4xl text-center"
            >
              {chateau.description}
            </motion.p>
          </div>
        </div>

        {/* Points forts - Bento Grid */}
        <div className="section-gray section-padding-sm">
          <div className="section-container">
            {/* Titre et sous-titre centrés */}
            <div className="text-center mb-12">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="heading-lg mb-md">
                  Points forts
                </h2>
                <p className="text-body-xl text-gray-600 mb-xl">
                  Ce qui rend ce lieu unique
                </p>
              </motion.div>
            </div>

            {/* Grille */}
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
                  {chateau.atouts.map((atout: string, index: number) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      style={{ height: "100%" }}
                    >
                      <Card
                        variant="hover"
                        padding="none"
                        className="group"
                        style={{ height: "100%", minHeight: "160px", display: "flex", alignItems: "center", justifyContent: "center" }}
                      >
                        <div className="flex flex-col items-center justify-center text-center" style={{ gap: spacing.lg, padding: "24px", width: "100%" }}>
                          <div
                            className="flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0"
                            style={{
                              width: "48px",
                              height: "48px",
                              borderRadius: theme.effects.borderRadius.full,
                              background: `${colors.bronze}10`,
                            }}
                          >
                            <Check className="w-6 h-6" style={{ color: colors.bronze }} />
                          </div>
                          <p
                            style={{
                              fontSize: theme.typography.fontSize.lg,
                              fontWeight: theme.typography.fontWeight.medium,
                              color: theme.colors.text.primary,
                              lineHeight: theme.typography.lineHeight.relaxed,
                              textAlign: "center",
                              width: "100%",
                            }}
                          >
                            {atout}
                          </p>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
            </div>
          </div>
        </div>

        {/* Galerie - Masonry moderne */}
        <div className="section-white section-padding-sm">
          <div className="section-container">
            {/* Titre et sous-titre centrés */}
            <div className="text-center mb-12">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="heading-lg mb-md">
                  Galerie
                </h2>
                <p className="text-body-xl text-gray-600 mb-xl">
                  Découvrez les espaces du château
                </p>
              </motion.div>
            </div>

            {/* Grille */}
            <div className="max-w-7xl mx-auto">
              <div
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6"
                style={{ gridAutoRows: "238px" }}
              >
                {chateau.images.slice(1).map((image: string, index: number) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className={`relative overflow-hidden group cursor-pointer rounded-3xl ${
                      index === 0 ? 'md:col-span-2 md:row-span-2' : ''
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${chateau.nom} - ${index + 2}`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(min-width: 1024px) 33vw, 50vw"
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section finale */}
        <div className="section-gray section-padding-sm" style={{ paddingBottom: '80px' }}>
          <div className="section-container">
            {/* Titre et sous-titre centrés */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center"
              style={{ marginBottom: '40px' }}
            >
              <h2 className="heading-xl mb-3">
                Prêt à organiser votre événement ?
              </h2>
              <p className="text-body-xl text-gray-600">
                Contactez-nous pour recevoir une proposition personnalisée
              </p>
            </motion.div>

            {/* Boutons centrés */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
                <Button
                  href="/devis"
                  variant="primary"
                  size="lg"
                  icon={<Calendar className="w-5 h-5" />}
                >
                  Demander un Devis
                </Button>
                <Button
                  href="/chateaux"
                  variant="outline"
                  size="lg"
                >
                  Voir d'autres châteaux
                </Button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Floating Info Card - Sticky - Utilisant Card component */}
      <motion.div
        initial={{ x: 100 }}
        animate={{ x: 0 }}
        style={{ opacity: floatingCardOpacity }}
        transition={{ duration: 0.6, delay: 1 }}
        className="fixed z-40 hidden xl:block bottom-8 right-8"
      >
        <Card
          variant="glass"
          padding="lg"
          style={{
            width: "320px",
            background: theme.colors.overlay.white95,
            backdropFilter: `blur(${theme.effects.blur.sm})`,
            boxShadow: theme.effects.shadows["2xl"],
          }}
        >
          <h3
            style={{
              fontSize: theme.typography.fontSize.xl,
              fontWeight: theme.typography.fontWeight.semibold,
              color: theme.colors.text.primary,
              fontFamily: theme.typography.fonts.heading,
              fontStyle: "italic",
              marginBottom: spacing["2xl"],
            }}
          >
            Informations
          </h3>

          <div className="mb-6">
            <p
              style={{
                fontSize: theme.typography.fontSize.xs,
                color: theme.colors.text.light,
                textTransform: "uppercase",
                letterSpacing: theme.typography.letterSpacing.wider,
                fontWeight: theme.typography.fontWeight.bold,
              }}
              className="mb-2"
            >
              Style
            </p>
            <p
              style={{
                color: theme.colors.text.primary,
                fontWeight: theme.typography.fontWeight.medium,
              }}
            >
              {chateau.styleArchitectural}
            </p>
          </div>

          <div className="mb-6">
            <p
              style={{
                fontSize: theme.typography.fontSize.xs,
                color: theme.colors.text.light,
                textTransform: "uppercase",
                letterSpacing: theme.typography.letterSpacing.wider,
                fontWeight: theme.typography.fontWeight.bold,
              }}
              className="mb-2"
            >
              Capacité
            </p>
            <p
              style={{
                color: theme.colors.text.primary,
                fontWeight: theme.typography.fontWeight.medium,
              }}
            >
              {chateau.capacite.min} à {chateau.capacite.max} personnes
            </p>
          </div>

          <div style={{ marginBottom: spacing["3xl"] }}>
            <p
              style={{
                fontSize: theme.typography.fontSize.xs,
                color: theme.colors.text.light,
                textTransform: "uppercase",
                letterSpacing: theme.typography.letterSpacing.wider,
                fontWeight: theme.typography.fontWeight.bold,
              }}
              className="mb-2"
            >
              Région
            </p>
            <p
              style={{
                color: theme.colors.text.primary,
                fontWeight: theme.typography.fontWeight.medium,
              }}
            >
              {chateau.region}
            </p>
          </div>

          <Button
            href="/devis"
            variant="primary"
            size="md"
            fullWidth
          >
            Réserver
          </Button>
        </Card>
      </motion.div>
    </div>
  );
}

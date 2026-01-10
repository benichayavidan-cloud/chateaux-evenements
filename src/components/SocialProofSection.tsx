"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Star, Quote, TrendingUp } from "lucide-react";
import { testimonials, chiffresCles } from "@/data/chateaux";
import { useEffect, useRef, useState } from "react";
import { theme } from "@/config/theme";
import { colors, spacing } from "@/config/themeHelpers";
import { Card } from "@/components/ui/Card";

function AnimatedCounter({
  value,
  duration = 2000,
}: {
  value: number;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    const startTime = Date.now();
    const endValue = value;

    const updateCount = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * endValue));

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      } else {
        setCount(endValue);
      }
    };

    requestAnimationFrame(updateCount);
  }, [isVisible, value, duration]);

  return <div ref={ref}>{count}</div>;
}

export function SocialProofSection() {
  return (
    <section className="bg-gradient-to-b from-gray-50 via-white to-gray-100 relative overflow-hidden" style={{ padding: `${theme.spacing.section.sm} 0` }}>
      {/* Glow effects subtils */}
      <div className="absolute top-0 right-1/4 rounded-full blur-3xl" style={{
        width: "384px",
        height: "384px",
        background: `${colors.bronze}0D`
      }} />
      <div className="absolute bottom-0 left-1/4 rounded-full blur-3xl" style={{
        width: "384px",
        height: "384px",
        background: `${colors.bronze}0D`
      }} />

      <div className="w-full flex flex-col items-center justify-center relative z-10">
        {/* Chiffres clés */}
        <motion.div
          initial={{ opacity: 0, y: 40, clipPath: "inset(100% 0 0 0)" }}
          whileInView={{ opacity: 1, y: 0, clipPath: "inset(0 0 0 0)" }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
          className="flex flex-col items-center justify-center w-full px-4 sm:px-6"
          style={{ marginBottom: spacing["4xl"] }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 max-w-7xl mx-auto w-full gap-6 md:gap-8 lg:gap-10">
            {chiffresCles.map((chiffre, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1, ease: [0.4, 0, 0.2, 1] }}
                className="text-center group"
              >
                <Card
                  variant="hover"
                  padding="lg"
                  hoverable
                  style={{ background: theme.colors.overlay.white80, backdropFilter: `blur(${theme.effects.blur.sm})` }}
                >
                  <div className="flex items-center justify-center" style={{
                    fontSize: "clamp(2.5rem, 6vw, 3.75rem)",
                    fontWeight: theme.typography.fontWeight.light,
                    fontStyle: "italic",
                    color: colors.bronze,
                    fontFamily: theme.typography.fonts.heading,
                    marginBottom: spacing.md
                  }}>
                    <AnimatedCounter value={chiffre.valeur} />
                    {chiffre.unite}
                    {chiffre.suffix}
                  </div>
                  <div style={{
                    fontSize: theme.typography.fontSize.sm,
                    color: theme.colors.neutral.gray600,
                    textTransform: "uppercase",
                    letterSpacing: theme.typography.letterSpacing.wider,
                    marginBottom: spacing.md
                  }}>
                    {chiffre.label}
                  </div>
                  <TrendingUp className="w-4 h-4 mx-auto" style={{ color: `${colors.bronze}80` }} />
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Témoignages */}
        <motion.div
          initial={{ opacity: 0, y: 40, clipPath: "inset(100% 0 0 0)" }}
          whileInView={{ opacity: 1, y: 0, clipPath: "inset(0 0 0 0)" }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
          className="flex flex-col items-center justify-center text-center w-full"
          style={{ marginBottom: spacing["4xl"], padding: `0 ${spacing.lg}` }}
        >
          <div className="flex items-center justify-center" style={{ marginBottom: spacing.lg }}>
            <div style={{
              height: "1px",
              width: "48px",
              background: `linear-gradient(to right, transparent, ${colors.bronze})`
            }} />
            <Quote className="w-4 h-4" style={{ color: colors.bronze, margin: `0 ${spacing.lg}` }} />
            <div style={{
              height: "1px",
              width: "48px",
              background: `linear-gradient(to left, transparent, ${colors.bronze})`
            }} />
          </div>
          <h2 style={{
            fontSize: "clamp(2.5rem, 6vw, 3.75rem)",
            fontWeight: theme.typography.fontWeight.light,
            fontStyle: "italic",
            color: theme.colors.neutral.gray900,
            marginBottom: spacing["2xl"],
            fontFamily: theme.typography.fonts.heading
          }}>
            Ils nous font confiance
          </h2>
          <p style={{
            fontSize: theme.typography.fontSize.lg,
            color: theme.colors.neutral.gray600,
            maxWidth: theme.dimensions.maxWidth.lg,
            lineHeight: theme.typography.lineHeight.relaxed,
            marginBottom: spacing["4xl"]
          }}>
            Découvrez les retours de nos clients qui ont organisé leurs
            événements dans nos châteaux
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 max-w-7xl mx-auto w-full gap-6 md:gap-8 md:auto-rows-fr">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.15, ease: [0.4, 0, 0.2, 1] }}
                className="flex"
              >
                <Card
                  variant="hover"
                  padding="lg"
                  hoverable
                  className="group h-full flex flex-col"
                  style={{ background: theme.colors.overlay.white80, backdropFilter: `blur(${theme.effects.blur.sm})` }}
                >
                  <div className="flex items-start justify-between" style={{ marginBottom: spacing.lg }}>
                    <Quote className="flex-shrink-0" style={{
                      width: "40px",
                      height: "40px",
                      color: `${colors.bronze}4D`
                    }} />
                    <div className="flex" style={{ gap: spacing.xs }}>
                      {[...Array(testimonial.note)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4"
                          style={{
                            fill: colors.bronze,
                            color: colors.bronze
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  <p className="text-left flex-grow" style={{
                    color: theme.colors.neutral.gray700,
                    lineHeight: theme.typography.lineHeight.relaxed,
                    fontSize: theme.typography.fontSize.sm,
                    fontStyle: "italic",
                    marginBottom: spacing.lg
                  }}>
                    "{testimonial.contenu}"
                  </p>

                  <div className="flex items-center" style={{
                    borderTop: `1px solid ${theme.colors.neutral.gray200}`,
                    paddingTop: spacing.lg
                  }}>
                    <div className="relative flex-shrink-0 overflow-hidden" style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: theme.effects.borderRadius.full,
                      border: `1px solid ${colors.bronze}4D`,
                      marginRight: spacing.md
                    }}>
                      <Image
                        src={testimonial.avatar}
                        alt={testimonial.nom}
                        fill
                        sizes="48px"
                        className="object-cover"
                        style={{ transition: `all ${theme.effects.transitions.slower}` }}
                      />
                    </div>
                    <div className="text-left">
                      <div style={{
                        fontWeight: theme.typography.fontWeight.medium,
                        color: theme.colors.neutral.gray900,
                        fontSize: theme.typography.fontSize.sm
                      }}>
                        {testimonial.nom}
                      </div>
                      <div style={{
                        fontSize: theme.typography.fontSize.xs,
                        color: theme.colors.neutral.gray600
                      }}>
                        {testimonial.poste}
                      </div>
                      <div style={{
                        fontSize: theme.typography.fontSize.xs,
                        color: `${colors.bronze}CC`
                      }}>
                        {testimonial.entreprise}
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
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

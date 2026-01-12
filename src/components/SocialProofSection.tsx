"use client";

import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";
import { chiffresCles } from "@/data/chateaux";
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
          className="flex flex-col items-center justify-center w-full px-8 sm:px-10 md:px-12 lg:px-16"
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

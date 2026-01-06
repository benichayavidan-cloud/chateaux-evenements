"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Star, Quote, TrendingUp } from "lucide-react";
import { testimonials, chiffresCles, clientLogos } from "@/data/chateaux";
import { useEffect, useRef, useState } from "react";

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
    <section className="section-padding-sm bg-gradient-to-b from-gray-50 via-white to-gray-100 relative overflow-hidden">
      {/* Glow effects subtils */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[var(--bronze-antique)]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[var(--bronze-antique)]/5 rounded-full blur-3xl" />

      <div className="w-full flex flex-col items-center justify-center relative z-10">
        {/* Chiffres clés */}
        <motion.div
          initial={{ opacity: 0, y: 40, clipPath: "inset(100% 0 0 0)" }}
          whileInView={{ opacity: 1, y: 0, clipPath: "inset(0 0 0 0)" }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
          className="flex flex-col items-center justify-center w-full px-4"
          style={{ marginBottom: 'var(--space-4xl,45px)' }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 max-w-7xl mx-auto w-full">
            {chiffresCles.map((chiffre, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1, ease: [0.4, 0, 0.2, 1] }}
                className="text-center group"
              >
                <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl hover:border-[var(--bronze-antique)]/50 transition-all duration-500 hover:shadow-2xl" style={{ padding: 'var(--space-lg)' }}>
                  <div className="text-5xl md:text-6xl font-light italic text-[var(--bronze-antique)] font-[var(--font-cormorant)] flex items-center justify-center" style={{ marginBottom: 'var(--gap-md,15px)' }}>
                    {chiffre.unite}
                    <AnimatedCounter value={chiffre.valeur} />
                    {chiffre.suffix}
                  </div>
                  <div className="text-sm text-gray-600 uppercase tracking-wider" style={{ marginBottom: 'var(--gap-md,15px)' }}>
                    {chiffre.label}
                  </div>
                  <TrendingUp className="w-4 h-4 text-[var(--bronze-antique)]/50 mx-auto" />
                </div>
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
          className="flex flex-col items-center justify-center text-center w-full px-4"
          style={{ marginBottom: 'var(--space-4xl,45px)' }}
        >
          <div className="flex items-center justify-center mb-4">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-[var(--bronze-antique)]" />
            <Quote className="w-4 h-4 text-[var(--bronze-antique)] mx-4" />
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-[var(--bronze-antique)]" />
          </div>
          <h2 className="text-5xl md:text-6xl font-light italic text-gray-900 mb-6 font-[var(--font-cormorant)]">
            Ils nous font confiance
          </h2>
          <p className="text-lg text-gray-600 max-w-4xl leading-relaxed" style={{ marginBottom: 'var(--space-4xl,45px)' }}>
            Découvrez les retours de nos clients qui ont organisé leurs
            événements dans nos châteaux
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-7xl mx-auto w-full">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.15, ease: [0.4, 0, 0.2, 1] }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl hover:border-[var(--bronze-antique)]/50 transition-all duration-500 border border-gray-200 group hover:shadow-2xl"
                style={{ padding: 'var(--space-lg)' }}
              >
                <div className="flex items-start justify-between" style={{ marginBottom: 'var(--space-lg)' }}>
                  <Quote className="w-10 h-10 text-[var(--bronze-antique)]/30 flex-shrink-0" />
                  <div className="flex space-x-1">
                    {[...Array(testimonial.note)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-[var(--bronze-antique)] text-[var(--bronze-antique)]"
                      />
                    ))}
                  </div>
                </div>

                <p className="text-gray-700 leading-relaxed text-sm italic text-left" style={{ marginBottom: 'var(--space-lg)' }}>
                  "{testimonial.contenu}"
                </p>

                <div className="flex items-center border-t border-gray-200" style={{ paddingTop: 'var(--space-lg)' }}>
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border border-[var(--bronze-antique)]/30 flex-shrink-0" style={{ marginRight: 'var(--gap-md)' }}>
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.nom}
                      fill
                      sizes="48px"
                      className="object-cover transition-all duration-500"
                    />
                  </div>
                  <div className="text-left">
                    <div className="font-medium text-gray-900 text-sm">
                      {testimonial.nom}
                    </div>
                    <div className="text-xs text-gray-500">
                      {testimonial.poste}
                    </div>
                    <div className="text-xs text-[var(--bronze-antique)]/80">
                      {testimonial.entreprise}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Logos clients */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center justify-center w-full px-4"
        >
          <div className="text-center" style={{ marginBottom: 'var(--section-padding-sm)' }}>
            <h3 className="text-2xl font-light italic text-gray-700 font-[var(--font-cormorant)]">
              Ils ont choisi nos châteaux pour leurs événements
            </h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-7xl mx-auto w-full">
            {clientLogos.map((logo, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05, ease: [0.4, 0, 0.2, 1] }}
                className="flex items-center justify-center"
              >
                <div className="w-full h-20 bg-white/60 backdrop-blur-sm border border-gray-200 rounded-xl flex items-center justify-center px-4 hover:border-[var(--bronze-antique)]/50 transition-all duration-500 group hover:shadow-lg">
                  <span className="text-gray-400 group-hover:text-gray-700 font-medium text-xs text-center transition-colors duration-500 uppercase tracking-wider">
                    {logo.nom}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Ligne décorative en haut */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--bronze-antique)]/20 to-transparent" />
      {/* Ligne décorative en bas */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--bronze-antique)]/20 to-transparent" />
    </section>
  );
}

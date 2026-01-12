"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Quote, Star } from "lucide-react";
import { testimonials } from "@/data/chateaux";
import { colors } from "@/config/themeHelpers";
import { theme } from "@/config/theme";

export function TestimonialsSection() {
  return (
    <section
      style={{
        background: 'linear-gradient(135deg, #fafafa 0%, #ffffff 50%, #f8f8f8 100%)',
        padding: 'clamp(4rem, 10vw, 6rem) clamp(1rem, 3vw, 1.5rem)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Pattern décoratif subtil */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, ${colors.bronze} 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative z-10" style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {/* Titre de section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Quote className="w-6 h-6" style={{ color: colors.bronze }} />
            <span
              className="uppercase tracking-wider font-semibold"
              style={{
                fontSize: theme.typography.fontSize.xs,
                color: colors.bronze
              }}
            >
              Témoignages
            </span>
          </div>
          <h2 className="heading-lg" style={{ marginBottom: '16px' }}>
            Ils nous font confiance
          </h2>
          <p className="text-body-xl text-gray-600 max-w-2xl mx-auto">
            Découvrez les retours d'expérience de nos clients qui ont organisé leurs événements dans nos châteaux
          </p>
        </motion.div>

        {/* Grille de témoignages */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              className="group"
            >
              <div
                className="h-full rounded-2xl p-8 transition-all duration-300"
                style={{
                  background: 'white',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                }}
              >
                {/* Avatar et info */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-offset-2" style={{ '--tw-ring-color': colors.bronze } as any}>
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.nom}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </div>
                  <div>
                    <h3
                      className="font-semibold"
                      style={{
                        fontSize: theme.typography.fontSize.base,
                        color: theme.colors.text.primary
                      }}
                    >
                      {testimonial.nom}
                    </h3>
                    <p
                      style={{
                        fontSize: theme.typography.fontSize.sm,
                        color: theme.colors.text.muted
                      }}
                    >
                      {testimonial.poste}
                    </p>
                    <p
                      className="font-medium"
                      style={{
                        fontSize: theme.typography.fontSize.xs,
                        color: colors.bronze
                      }}
                    >
                      {testimonial.entreprise}
                    </p>
                  </div>
                </div>

                {/* Étoiles */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.note)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-current"
                      style={{ color: colors.gold }}
                    />
                  ))}
                </div>

                {/* Contenu */}
                <p
                  className="leading-relaxed italic"
                  style={{
                    fontSize: theme.typography.fontSize.sm,
                    color: theme.colors.text.secondary,
                    lineHeight: theme.typography.lineHeight.relaxed
                  }}
                >
                  "{testimonial.contenu}"
                </p>

                {/* Quote icon en arrière-plan */}
                <div className="mt-6 flex justify-end opacity-20 group-hover:opacity-30 transition-opacity">
                  <Quote className="w-8 h-8" style={{ color: colors.bronze }} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

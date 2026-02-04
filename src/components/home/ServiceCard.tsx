'use client';

import { motion } from 'framer-motion';
import { Presentation, BookOpen, Wine, Users, Check, ArrowRight, Sparkles } from 'lucide-react';
import { Text } from '@/components/ui-v2';
import { theme } from '@/design-system/tokens';
import Link from 'next/link';

interface ServiceCardProps {
  icon: string;
  titre: string;
  description: string;
  servicesInclus: string[];
  variant?: 'default' | 'featured' | 'compact';
  index?: number;
}

const iconMap: Record<string, React.ReactNode> = {
  'presentation': <Presentation className="w-6 h-6" />,
  'book-open': <BookOpen className="w-6 h-6" />,
  'champagne': <Wine className="w-6 h-6" />,
  'users': <Users className="w-6 h-6" />,
};

const gradientMap: Record<string, string> = {
  'presentation': 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
  'book-open': 'linear-gradient(135deg, #2d3436 0%, #4a5568 100%)',
  'champagne': 'linear-gradient(135deg, #B7874D 0%, #8B6914 50%, #D4AF37 100%)',
  'users': 'linear-gradient(135deg, #1e3a5f 0%, #2d5a87 50%, #3d7ab5 100%)',
};

export function ServiceCard({
  icon,
  titre,
  description,
  servicesInclus,
  variant = 'default',
  index = 0
}: ServiceCardProps) {
  const isFeatured = variant === 'featured';
  const isCompact = variant === 'compact';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1]
      }}
      whileHover={{
        y: -8,
        transition: { duration: 0.3 }
      }}
      style={{
        position: 'relative',
        height: '100%',
        minHeight: isFeatured ? '420px' : isCompact ? '280px' : '380px',
      }}
    >
      {/* Card Container */}
      <div
        style={{
          position: 'relative',
          height: '100%',
          background: gradientMap[icon] || gradientMap['presentation'],
          borderRadius: '24px',
          padding: isFeatured ? '2.5rem' : '2rem',
          overflow: 'hidden',
          cursor: 'pointer',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
        }}
      >
        {/* Animated Background Pattern */}
        <motion.div
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
          style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.1,
            backgroundImage: `radial-gradient(circle at 20% 80%, rgba(255,255,255,0.3) 0%, transparent 50%),
                              radial-gradient(circle at 80% 20%, rgba(255,255,255,0.2) 0%, transparent 50%)`,
            backgroundSize: '200% 200%',
          }}
        />

        {/* Glow Effect on Hover */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          style={{
            position: 'absolute',
            top: '-50%',
            left: '-50%',
            width: '200%',
            height: '200%',
            background: 'radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, transparent 50%)',
            pointerEvents: 'none',
          }}
        />

        {/* Featured Badge */}
        {isFeatured && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            style={{
              position: 'absolute',
              top: '1.5rem',
              right: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'rgba(212, 175, 55, 0.9)',
              color: '#1a1a2e',
              padding: '0.5rem 1rem',
              borderRadius: '50px',
              fontSize: '0.75rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            <Sparkles className="w-3.5 h-3.5" />
            Populaire
          </motion.div>
        )}

        {/* Content */}
        <div style={{ position: 'relative', zIndex: 1, height: '100%', display: 'flex', flexDirection: 'column' }}>
          {/* Icon */}
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: 'spring', stiffness: 300 }}
            style={{
              width: isFeatured ? '72px' : '56px',
              height: isFeatured ? '72px' : '56px',
              borderRadius: '16px',
              background: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1.5rem',
              color: 'white',
            }}
          >
            {iconMap[icon] || iconMap['presentation']}
          </motion.div>

          {/* Title */}
          <h3
            style={{
              fontSize: isFeatured ? '1.75rem' : '1.35rem',
              fontWeight: 600,
              color: 'white',
              marginBottom: '0.75rem',
              lineHeight: 1.2,
            }}
          >
            {titre}
          </h3>

          {/* Description */}
          <p
            style={{
              fontSize: isFeatured ? '1rem' : '0.9rem',
              color: 'rgba(255, 255, 255, 0.8)',
              lineHeight: 1.6,
              marginBottom: '1.5rem',
              display: '-webkit-box',
              WebkitLineClamp: isCompact ? 2 : 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {description}
          </p>

          {/* Services List */}
          {!isCompact && (
            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
                marginTop: 'auto',
              }}
            >
              {servicesInclus.slice(0, isFeatured ? 4 : 3).map((item, idx) => (
                <motion.li
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + idx * 0.1 }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    fontSize: '0.85rem',
                    color: 'rgba(255, 255, 255, 0.9)',
                  }}
                >
                  <div
                    style={{
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      background: 'rgba(212, 175, 55, 0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <Check className="w-3 h-3" style={{ color: theme.colors.primary.gold }} />
                  </div>
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>
          )}

          {/* CTA Arrow */}
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1, x: 5 }}
            style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: theme.colors.primary.gold,
              fontSize: '0.875rem',
              fontWeight: 600,
            }}
          >
            <span>En savoir plus</span>
            <ArrowRight className="w-4 h-4" />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

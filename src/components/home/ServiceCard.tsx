'use client';

import { motion } from 'framer-motion';
import { Presentation, BookOpen, Wine, Users, Check } from 'lucide-react';
import { theme } from '@/design-system/tokens';

interface ServiceCardProps {
  icon: string;
  titre: string;
  description: string;
  servicesInclus: string[];
  variant?: 'default' | 'featured' | 'compact';
  index?: number;
}

const iconMap: Record<string, React.ReactNode> = {
  'presentation': <Presentation className="w-5 h-5" />,
  'book-open': <BookOpen className="w-5 h-5" />,
  'champagne': <Wine className="w-5 h-5" />,
  'users': <Users className="w-5 h-5" />,
};

export function ServiceCard({
  icon,
  titre,
  description,
  servicesInclus,
  index = 0
}: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1]
      }}
      whileHover={{ y: -4 }}
      style={{
        background: theme.colors.neutral.white,
        borderRadius: '16px',
        padding: '1.75rem',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)',
        border: `1px solid ${theme.colors.neutral.gray200}`,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        transition: 'box-shadow 0.3s ease, border-color 0.3s ease',
      }}
      className="service-card-hover"
    >
      {/* Header: Icon + Title */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
        <div
          style={{
            width: '44px',
            height: '44px',
            borderRadius: '12px',
            background: `linear-gradient(135deg, ${theme.colors.primary.bronze}15 0%, ${theme.colors.primary.bronze}25 100%)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: theme.colors.primary.bronze,
            flexShrink: 0,
          }}
        >
          {iconMap[icon] || iconMap['presentation']}
        </div>
        <h3
          style={{
            fontSize: '1.1rem',
            fontWeight: 600,
            color: theme.colors.neutral.gray900,
            lineHeight: 1.3,
            margin: 0,
          }}
        >
          {titre}
        </h3>
      </div>

      {/* Description */}
      <p
        style={{
          fontSize: '0.9rem',
          color: theme.colors.neutral.gray600,
          lineHeight: 1.6,
          marginBottom: '1.25rem',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}
      >
        {description}
      </p>

      {/* Divider */}
      <div
        style={{
          height: '1px',
          background: theme.colors.neutral.gray200,
          marginBottom: '1.25rem',
        }}
      />

      {/* Services List */}
      <ul
        style={{
          listStyle: 'none',
          padding: 0,
          margin: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: '0.6rem',
          flex: 1,
        }}
      >
        {servicesInclus.slice(0, 4).map((item, idx) => (
          <li
            key={idx}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '0.6rem',
              fontSize: '0.85rem',
              color: theme.colors.neutral.gray700,
              lineHeight: 1.4,
            }}
          >
            <Check
              className="w-4 h-4"
              style={{
                color: theme.colors.primary.bronze,
                flexShrink: 0,
                marginTop: '2px',
              }}
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      {/* Hover Styles */}
      <style jsx global>{`
        .service-card-hover:hover {
          box-shadow: 0 8px 30px rgba(183, 135, 77, 0.12) !important;
          border-color: ${theme.colors.primary.bronze}40 !important;
        }
      `}</style>
    </motion.div>
  );
}

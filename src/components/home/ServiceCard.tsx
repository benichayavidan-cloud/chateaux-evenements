'use client';

import { useInView } from '@/hooks/useInView';
import { Check, ArrowRight } from 'lucide-react';
import { theme } from '@/design-system/tokens';
import Image from 'next/image';

interface ServiceCardProps {
  icon: string;
  titre: string;
  description: string;
  servicesInclus: string[];
  image?: string;
  variant?: 'default' | 'featured' | 'compact';
  index?: number;
}

// Images de personnes heureuses pour chaque type de service
const happyPeopleImages: Record<string, { src: string; alt: string }> = {
  'presentation': {
    src: '/images/services/seminaire-residentiel-chambre-luxe-hotel-cheminee-confort.webp',
    alt: 'Séminaire résidentiel - chambre de luxe avec cheminée pour hébergement premium en château'
  },
  'book-open': {
    src: '/images/services/journee-etude-reunion-equipe-professionnels-collaboration.webp',
    alt: 'Journée d\'étude entreprise - équipe de professionnels en réunion de travail collaborative'
  },
  'champagne': {
    src: '/images/services/soiree-entreprise-groupe-fete-theme-gatsby-costumes.webp',
    alt: 'Soirée d\'entreprise à thème - groupe de collaborateurs costumés lors d\'une fête Gatsby années folles'
  },
  'users': {
    src: '/images/services/team-building-activite-babyfoot-humain-exterieur-parc.webp',
    alt: 'Team building entreprise - activité babyfoot humain en extérieur dans un parc de château'
  },
};

export function ServiceCard({
  icon,
  titre,
  description,
  servicesInclus,
  image,
  variant = 'default',
  index = 0
}: ServiceCardProps) {
  const imageData = happyPeopleImages[icon];
  const displayImage = imageData?.src || image;
  const imageAlt = imageData?.alt || `${titre} - Select Châteaux`;

  const { ref, isInView } = useInView();

  return (
    <div
      ref={ref}
      className={`service-card-forfait hover-lift animate-on-scroll ${isInView ? 'is-visible' : ''}`}
      style={{
        animationDelay: `${index * 0.1}s`,
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '16px',
        overflow: 'hidden',
        background: theme.colors.neutral.white,
        boxShadow: '0 4px 24px rgba(0, 0, 0, 0.08)',
        border: `1px solid ${theme.colors.neutral.gray200}`,
        cursor: 'pointer',
        height: '100%',
        transition: 'box-shadow 0.3s ease, transform 0.3s ease',
      }}
    >
      {/* Image Part - Haut */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '200px',
          overflow: 'hidden',
        }}
      >
        <Image
          src={displayImage || ''}
          alt={imageAlt}
          fill
          style={{ objectFit: 'cover', transition: 'transform 0.5s ease' }}
          sizes="(max-width: 768px) 100vw, 25vw"
          className="service-card-img"
        />
      </div>

      {/* Content Part - Bas */}
      <div
        style={{
          flex: 1,
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Title */}
        <h3
          style={{
            fontSize: '1.15rem',
            fontWeight: 700,
            color: theme.colors.neutral.gray900,
            marginBottom: '8px',
            lineHeight: 1.3,
          }}
        >
          {titre}
        </h3>

        {/* Description */}
        <p
          style={{
            fontSize: '0.85rem',
            color: theme.colors.neutral.gray600,
            lineHeight: 1.6,
            marginBottom: '16px',
          }}
        >
          {description}
        </p>

        {/* Divider */}
        <div style={{
          width: '100%',
          height: '1px',
          background: theme.colors.neutral.gray200,
          marginBottom: '16px',
        }} />

        {/* Services List */}
        <ul
          style={{
            listStyle: 'none',
            padding: 0,
            margin: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            flex: 1,
          }}
        >
          {servicesInclus.slice(0, 5).map((item, idx) => (
            <li
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.8rem',
                color: theme.colors.neutral.gray700,
              }}
            >
              <Check
                className="w-3.5 h-3.5"
                style={{ color: theme.colors.primary.bronze, flexShrink: 0 }}
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            color: theme.colors.neutral.white,
            background: theme.colors.primary.bronze,
            fontSize: '0.875rem',
            fontWeight: 600,
            marginTop: '20px',
            padding: '10px 20px',
            borderRadius: '8px',
            transition: 'background 0.2s ease',
          }}
          className="service-card-cta-btn"
        >
          <span>Découvrir</span>
          <ArrowRight className="w-4 h-4" />
        </div>
      </div>

    </div>
  );
}

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
  index = 0
}: ServiceCardProps) {
  const imageData = happyPeopleImages[icon];
  const displayImage = imageData?.src || image;
  const imageAlt = imageData?.alt || `${titre} - Select Châteaux`;

  const { ref, isInView } = useInView();

  return (
    <div
      ref={ref}
      className={`service-card-split hover-lift animate-on-scroll ${isInView ? 'is-visible' : ''}`}
      style={{
        animationDelay: `${index * 0.1}s`,
        display: 'flex',
        flexDirection: 'row',
        borderRadius: '16px',
        overflow: 'hidden',
        background: theme.colors.neutral.white,
        boxShadow: '0 4px 24px rgba(0, 0, 0, 0.08)',
        border: `1px solid ${theme.colors.neutral.gray200}`,
        height: '280px',
        cursor: 'pointer',
      }}
    >
      {/* Image Part - 45% */}
      <div
        style={{
          position: 'relative',
          width: '45%',
          minWidth: '45%',
          overflow: 'hidden',
        }}
      >
        <Image
          src={displayImage || ''}
          alt={imageAlt}
          fill
          style={{ objectFit: 'cover' }}
          sizes="(max-width: 768px) 100vw, 25vw"
          className="service-card-img"
        />
      </div>

      {/* Content Part - 55% */}
      <div
        style={{
          flex: 1,
          padding: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        {/* Title */}
        <h3
          style={{
            fontSize: '1.25rem',
            fontWeight: 600,
            color: theme.colors.neutral.gray900,
            marginBottom: '0.5rem',
            lineHeight: 1.3,
          }}
        >
          {titre}
        </h3>

        {/* Description */}
        <p
          style={{
            fontSize: '0.875rem',
            color: theme.colors.neutral.gray600,
            lineHeight: 1.6,
            marginBottom: '1rem',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {description}
        </p>

        {/* Services List */}
        <ul
          style={{
            listStyle: 'none',
            padding: 0,
            margin: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            flex: 1,
          }}
        >
          {servicesInclus.slice(0, 3).map((item, idx) => (
            <li
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.8rem',
                color: theme.colors.neutral.gray700,
              }}
            >
              <Check
                className="w-3.5 h-3.5"
                style={{ color: theme.colors.primary.bronze, flexShrink: 0 }}
              />
              <span style={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}>
                {item}
              </span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            color: theme.colors.primary.bronze,
            fontSize: '0.875rem',
            fontWeight: 600,
            marginTop: '0.75rem',
          }}
          className="service-card-cta"
        >
          <span>Découvrir</span>
          <ArrowRight className="w-4 h-4" />
        </div>
      </div>

      {/* Hover Styles */}
      <style jsx global>{`
        .service-card-split:hover {
          box-shadow: 0 12px 40px rgba(183, 135, 77, 0.15) !important;
          border-color: ${theme.colors.primary.bronze}30 !important;
        }
        .service-card-split:hover .service-card-img {
          transform: scale(1.08);
        }
        .service-card-split .service-card-img {
          transition: transform 0.5s ease;
        }
        .service-card-split:hover .service-card-cta {
          gap: 0.75rem;
        }
        .service-card-cta {
          transition: gap 0.3s ease;
        }

        @media (max-width: 640px) {
          .service-card-split {
            flex-direction: column !important;
            height: auto !important;
          }
          .service-card-split > div:first-child {
            width: 100% !important;
            height: 180px !important;
          }
          .service-card-split > div:last-child {
            padding: 1.25rem !important;
          }
        }

        @media (max-width: 400px) {
          .service-card-split > div:first-child {
            height: 150px !important;
          }
          .service-card-split > div:last-child {
            padding: 1rem !important;
          }
        }
      `}</style>
    </div>
  );
}

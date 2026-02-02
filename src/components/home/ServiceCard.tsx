'use client';

import { Text } from '@/components/ui-v2';
import { theme } from '@/design-system/tokens';

interface ServiceCardProps {
  icon: string;
  titre: string;
  description: string;
  servicesInclus: string[];
}

export function ServiceCard({ icon, titre, description, servicesInclus }: ServiceCardProps) {
  return (
    <div
      style={{
        background: theme.colors.neutral.white,
        borderRadius: theme.effects.borderRadius.xl,
        padding: theme.spacing.xl,
        border: `1px solid ${theme.colors.neutral.gray200}`,
        height: '100%',
        transition: `all ${theme.effects.transitions.smooth}`,
        cursor: 'pointer',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = theme.effects.shadows.xl;
        e.currentTarget.style.borderColor = theme.colors.primary.bronze;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
        e.currentTarget.style.borderColor = theme.colors.neutral.gray200;
      }}
    >
      {/* Icon */}
      <div
        style={{
          width: '56px',
          height: '56px',
          borderRadius: theme.effects.borderRadius.full,
          background: `${theme.colors.primary.bronze}15`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: theme.spacing.lg,
        }}
      >
        <div style={{ color: theme.colors.primary.bronze, fontSize: '24px' }}>
          {icon === 'presentation' && '📊'}
          {icon === 'book-open' && '📖'}
          {icon === 'champagne' && '🥂'}
          {icon === 'users' && '👥'}
        </div>
      </div>

      {/* Title */}
      <Text variant="h4" style={{ marginBottom: theme.spacing.md }}>
        {titre}
      </Text>

      {/* Description */}
      <Text variant="body" color="muted" lineClamp={3} style={{ marginBottom: theme.spacing.lg }}>
        {description}
      </Text>

      {/* Services List */}
      <ul
        style={{
          listStyle: 'none',
          padding: 0,
          margin: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: theme.spacing.xs,
        }}
      >
        {servicesInclus.slice(0, 3).map((item, index) => (
          <li
            key={index}
            style={{
              display: 'flex',
              alignItems: 'start',
              gap: theme.spacing.sm,
              fontSize: theme.typography.fontSize.sm,
              color: theme.colors.neutral.gray700,
            }}
          >
            <span style={{ color: theme.colors.primary.bronze, fontWeight: 700 }}>•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

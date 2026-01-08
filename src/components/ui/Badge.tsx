/**
 * 🏷️ Composant Badge - Système de Design
 *
 * Badge réutilisable pour tags, labels, statuts
 */

import { HTMLAttributes } from "react";
import { theme } from "@/config/theme";

type BadgeVariant = "default" | "outline" | "solid" | "glass";
type BadgeSize = "sm" | "md" | "lg";

interface BadgeProps extends HTMLAttributes<HTMLDivElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  icon?: React.ReactNode;
}

const variantStyles: Record<BadgeVariant, React.CSSProperties> = {
  default: {
    background: theme.colors.overlay.white90,
    backdropFilter: `blur(${theme.effects.blur.sm})`,
    border: `1px solid ${theme.colors.neutral.gray200}`,
    color: theme.colors.primary.bronze,
  },
  outline: {
    background: "transparent",
    border: `2px solid ${theme.colors.primary.bronze}`,
    color: theme.colors.primary.bronze,
  },
  solid: {
    background: theme.colors.primary.bronze,
    border: "none",
    color: theme.colors.neutral.white,
  },
  glass: {
    background: theme.colors.overlay.black90,
    backdropFilter: `blur(${theme.effects.blur.md})`,
    border: `1px solid ${theme.colors.overlay.white30}`,
    color: theme.colors.neutral.white,
  },
};

const sizeStyles: Record<BadgeSize, { padding: string; fontSize: string }> = {
  sm: {
    padding: theme.components.badge.padding.sm,
    fontSize: theme.typography.fontSize.xs,
  },
  md: {
    padding: theme.components.badge.padding.md,
    fontSize: theme.typography.fontSize.xs,
  },
  lg: {
    padding: theme.components.badge.padding.lg,
    fontSize: theme.typography.fontSize.sm,
  },
};

export function Badge({
  variant = "default",
  size = "md",
  icon,
  children,
  className = "",
  style = {},
  ...props
}: BadgeProps) {
  const sizeConfig = sizeStyles[size];
  const variantConfig = variantStyles[variant];

  const badgeStyles: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: theme.dimensions.gap.sm,
    padding: sizeConfig.padding,
    fontSize: sizeConfig.fontSize,
    fontWeight: theme.typography.fontWeight.medium,
    textTransform: "uppercase",
    letterSpacing: theme.typography.letterSpacing.wider,
    borderRadius: theme.effects.borderRadius.full,
    whiteSpace: "nowrap",
    boxShadow: theme.effects.shadows.lg,
    ...variantConfig,
    ...style,
  };

  return (
    <div className={className} style={badgeStyles} {...props}>
      {icon && <span>{icon}</span>}
      {children}
    </div>
  );
}

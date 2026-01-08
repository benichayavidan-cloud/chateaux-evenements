/**
 * 🃏 Composant Card - Système de Design
 *
 * Carte réutilisable pour contenus
 */

import { HTMLAttributes } from "react";
import Link from "next/link";
import { theme } from "@/config/theme";

type CardVariant = "default" | "hover" | "glass" | "outlined";
type CardPadding = "sm" | "md" | "lg" | "none";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  padding?: CardPadding;
  href?: string;
  hoverable?: boolean;
}

const variantStyles: Record<CardVariant, React.CSSProperties> = {
  default: {
    background: theme.colors.neutral.white,
    border: `1px solid ${theme.colors.neutral.gray200}`,
    boxShadow: theme.effects.shadows.sm,
  },
  hover: {
    background: theme.colors.neutral.white,
    border: `1px solid ${theme.colors.neutral.gray200}`,
    boxShadow: theme.effects.shadows.sm,
  },
  glass: {
    background: theme.colors.overlay.white5,
    backdropFilter: `blur(${theme.effects.blur.md})`,
    border: `1px solid ${theme.colors.overlay.white5}`,
  },
  outlined: {
    background: "transparent",
    border: `2px solid ${theme.colors.neutral.gray200}`,
  },
};

const paddingStyles: Record<CardPadding, string> = {
  none: "0",
  sm: theme.components.card.padding.sm,
  md: theme.components.card.padding.md,
  lg: theme.components.card.padding.lg,
};

export function Card({
  variant = "default",
  padding = "md",
  href,
  hoverable = false,
  children,
  className = "",
  style = {},
  ...props
}: CardProps) {
  const variantConfig = variantStyles[variant];
  const paddingValue = paddingStyles[padding];

  const baseStyles: React.CSSProperties = {
    position: "relative",
    borderRadius: theme.effects.borderRadius["2xl"],
    overflow: "hidden",
    transition: `all ${theme.effects.transitions.ultra}`,
    padding: paddingValue,
    ...variantConfig,
    ...style,
  };

  // Styles au hover
  const hoverStyles: React.CSSProperties = hoverable || variant === "hover"
    ? {
        cursor: "pointer",
      }
    : {};

  const combinedStyles = {
    ...baseStyles,
    ...hoverStyles,
  };

  const hoverClasses = hoverable || variant === "hover"
    ? "hover:border-[var(--bronze-antique)]/50 hover:shadow-2xl"
    : "";

  const classes = `group ${hoverClasses} ${className}`.trim();

  if (href) {
    return (
      <Link href={href} className={classes} style={combinedStyles}>
        {children}
      </Link>
    );
  }

  return (
    <div className={classes} style={combinedStyles} {...props}>
      {children}
    </div>
  );
}

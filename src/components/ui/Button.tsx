/**
 * 🔘 Composant Button - Système de Design
 *
 * Bouton réutilisable avec variants et tailles configurables
 */

import { ButtonHTMLAttributes, forwardRef } from "react";
import Link from "next/link";
import { theme } from "@/config/theme";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: `
    text-white
    border-2
    border-transparent
  `,
  secondary: `
    bg-white
    text-black
    border-2
    border-white/50
  `,
  outline: `
    bg-transparent
    text-gray-900
    border-2
  `,
  ghost: `
    bg-transparent
    text-gray-700
    border-2
    border-transparent
    hover:bg-gray-100
  `,
};

// Styles inline spécifiques pour chaque variant
const getVariantInlineStyles = (variant: ButtonVariant): React.CSSProperties => {
  switch (variant) {
    case "primary":
      return {
        backgroundColor: theme.colors.primary.bronze,
      };
    case "secondary":
      return {
        backgroundColor: "white",
      };
    case "outline":
      return {
        backgroundColor: "transparent",
        borderColor: `${theme.colors.primary.bronze}40`,
      };
    case "ghost":
      return {
        backgroundColor: "transparent",
      };
  }
};

const sizeStyles: Record<ButtonSize, { padding: string; height: string; fontSize: string }> = {
  sm: {
    padding: theme.components.button.padding.sm,
    height: "auto",
    fontSize: theme.typography.fontSize.sm,
  },
  md: {
    padding: theme.components.button.padding.md,
    height: theme.components.button.height.md,
    fontSize: theme.typography.fontSize.base,
  },
  lg: {
    padding: theme.components.button.padding.lg,
    height: theme.components.button.height.lg,
    fontSize: theme.typography.fontSize.base,
  },
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      href,
      fullWidth = false,
      icon,
      iconPosition = "right",
      children,
      className = "",
      style = {},
      ...props
    },
    ref
  ) => {
    const sizeConfig = sizeStyles[size];

    const baseStyles = {
      position: "relative" as const,
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      padding: sizeConfig.padding,
      height: sizeConfig.height,
      fontSize: sizeConfig.fontSize,
      fontWeight: theme.typography.fontWeight.bold,
      borderRadius: theme.effects.borderRadius.full,
      transition: `all ${theme.effects.transitions.smooth}`,
      cursor: "pointer",
      whiteSpace: "nowrap" as const,
      overflow: "hidden" as const,
      width: fullWidth ? "100%" : "auto",
      gap: theme.dimensions.gap.sm,
      ...style,
    };

    // Effet glow pour variant primary
    const glowEffect = variant === "primary" ? {
      filter: "drop-shadow(0 8px 16px rgba(163, 126, 44, 0.4))",
      textShadow: "0 1px 3px rgba(0, 0, 0, 0.3)",
    } : {};

    // Effet shadow pour variant secondary
    const shadowEffect = variant === "secondary" ? {
      filter: "drop-shadow(0 4px 12px rgba(0, 0, 0, 0.2))",
      boxShadow: theme.effects.shadows.lg,
    } : {};

    const combinedStyles = {
      ...baseStyles,
      ...getVariantInlineStyles(variant),
      ...glowEffect,
      ...shadowEffect,
    };

    const content = (
      <>
        {icon && iconPosition === "left" && <span>{icon}</span>}
        <span className="relative z-10">{children}</span>
        {icon && iconPosition === "right" && <span>{icon}</span>}
        {variant === "primary" && (
          <span
            className="absolute inset-0 scale-x-0 group-hover:scale-x-100 origin-left"
            style={{
              background: theme.colors.primary.bronzeLight,
              transition: `transform ${theme.effects.transitions.smooth}`,
            }}
          />
        )}
      </>
    );

    const classes = `group ${variantStyles[variant]} ${className}`.trim();

    const handleMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
      if (variant === "primary") {
        e.currentTarget.style.backgroundColor = theme.colors.primary.bronzeLight;
      }
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
      if (variant === "primary") {
        e.currentTarget.style.backgroundColor = theme.colors.primary.bronze;
      }
    };

    if (href) {
      return (
        <Link
          href={href}
          className={classes}
          style={combinedStyles}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {content}
        </Link>
      );
    }

    return (
      <button
        ref={ref}
        className={classes}
        style={combinedStyles}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        {content}
      </button>
    );
  }
);

Button.displayName = "Button";

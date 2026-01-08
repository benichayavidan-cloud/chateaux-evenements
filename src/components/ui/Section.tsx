/**
 * 📦 Composant Section - Système de Design
 *
 * Container de section standardisé avec padding et variants
 */

import { HTMLAttributes } from "react";
import { theme } from "@/config/theme";

type SectionPadding = "sm" | "md" | "lg" | "none";
type SectionVariant = "default" | "gradient" | "dark";

interface SectionProps extends HTMLAttributes<HTMLElement> {
  padding?: SectionPadding;
  variant?: SectionVariant;
  containerized?: boolean;
  centered?: boolean;
}

const paddingStyles: Record<SectionPadding, string> = {
  none: "0",
  sm: `${theme.spacing.section.sm} 0`,
  md: `${theme.spacing.section.md} 0`,
  lg: `${theme.spacing.section.lg} 0`,
};

const variantStyles: Record<SectionVariant, React.CSSProperties> = {
  default: {
    background: theme.colors.neutral.white,
  },
  gradient: {
    background: theme.gradients.bgSubtle,
    position: "relative",
    overflow: "hidden",
  },
  dark: {
    background: theme.colors.primary.black,
    color: theme.colors.neutral.white,
  },
};

export function Section({
  padding = "md",
  variant = "default",
  containerized = true,
  centered = false,
  children,
  className = "",
  style = {},
  ...props
}: SectionProps) {
  const paddingValue = paddingStyles[padding];
  const variantConfig = variantStyles[variant];

  const sectionStyles: React.CSSProperties = {
    position: "relative",
    width: "100%",
    padding: paddingValue,
    ...variantConfig,
    ...style,
  };

  const containerStyles: React.CSSProperties = containerized
    ? {
        width: "100%",
        maxWidth: theme.dimensions.maxWidth.content,
        margin: "0 auto",
        padding: `0 ${theme.spacing.container}`,
      }
    : {};

  const centeredStyles: React.CSSProperties = centered
    ? {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }
    : {};

  return (
    <section className={className} style={sectionStyles} {...props}>
      {/* Glow effects pour variant gradient */}
      {variant === "gradient" && (
        <>
          <div
            className="absolute top-0 left-1/4 rounded-full blur-3xl"
            style={{
              width: "384px",
              height: "384px",
              background: `${theme.colors.primary.bronze}05`,
            }}
          />
          <div
            className="absolute bottom-0 right-1/4 rounded-full blur-3xl"
            style={{
              width: "384px",
              height: "384px",
              background: `${theme.colors.primary.bronze}05`,
            }}
          />
        </>
      )}

      <div
        className="relative z-10"
        style={{
          ...containerStyles,
          ...centeredStyles,
        }}
      >
        {children}
      </div>
    </section>
  );
}

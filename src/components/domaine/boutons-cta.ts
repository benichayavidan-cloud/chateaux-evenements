/**
 * Gabarit commun des deux boutons « Devis Gratuit en 24h » et « téléphone »
 * de la barre sous les photos (fiche château et rubriques) : même hauteur,
 * même largeur minimale, même bordure — demande PO du 16/11/2026.
 * Le bouton téléphone n'utilise plus la classe `badge-lg`, dont les marges
 * variaient selon la page.
 */
import type { CSSProperties } from "react";
import { theme } from "@/design-system/tokens";

const BASE: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
  height: "48px",
  minWidth: "220px",
  padding: "0 24px",
  boxSizing: "border-box",
  borderRadius: theme.effects.borderRadius.full,
  border: "2px solid transparent",
  fontSize: "0.875rem",
  fontWeight: theme.typography.fontWeight.bold,
  textDecoration: "none",
  whiteSpace: "nowrap",
  transition: "all 0.3s ease",
};

export const BOUTON_DEVIS: CSSProperties = {
  ...BASE,
  background: `linear-gradient(135deg, ${theme.colors.primary.gold} 0%, ${theme.colors.primary.bronze} 100%)`,
  color: "#FFFFFF",
  boxShadow: `0 4px 16px ${theme.colors.primary.bronze}40`,
};

export const BOUTON_TELEPHONE: CSSProperties = {
  ...BASE,
  background: "rgba(0, 0, 0, 0.4)",
  borderColor: "rgba(255, 255, 255, 0.4)",
  color: "#FFFFFF",
};

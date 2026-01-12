import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
} from "lucide-react";
import { theme } from "@/config/theme";
import { colors, spacing } from "@/config/themeHelpers";

export function FooterLuxe() {
  return (
    <>
      {/* Espace blanc avant le footer */}
      <div style={{ height: '8px', background: 'white' }} />

      <footer className="relative bg-gradient-to-b from-gray-100 via-gray-50 to-white" style={{
        paddingTop: 'clamp(2rem, 6vw, 3.125rem)',
        paddingBottom: 'clamp(1.5rem, 5vw, 2.5rem)',
        borderTop: `1px solid ${theme.colors.neutral.gray200}`
      }}>
      {/* Glow effect top */}
      <div className="absolute top-0 left-0 right-0 opacity-50" style={{
        height: "1px",
        background: `linear-gradient(to right, transparent, ${colors.bronze}, transparent)`
      }} />

      <div className="w-full px-8 sm:px-10 md:px-14 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full gap-10 md:gap-12 lg:gap-14" style={{
          marginBottom: '32px'
        }}>
          {/* Colonne 1 - À propos */}
          <div>
            <div style={{ marginBottom: spacing.lg }}>
              <img
                src="/logo.png"
                alt="Select Chateaux"
                className="w-auto object-contain"
                style={{
                  height: 'clamp(4rem, 6vw, 5rem)',
                  maxWidth: '280px',
                  filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
                }}
              />
            </div>
            <p style={{
              color: theme.colors.neutral.gray600,
              lineHeight: theme.typography.lineHeight.relaxed,
              fontSize: theme.typography.fontSize.sm,
              marginBottom: spacing.xl
            }}>
              L'excellence événementielle dans des châteaux d'exception à travers la France.
            </p>
            <div className="flex" style={{ gap: spacing.sm }}>
              {[Facebook, Instagram, Linkedin, Twitter].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="flex items-center justify-center hover:text-[var(--bronze-antique)] hover:border-[var(--bronze-antique)] hover:shadow-lg"
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: theme.effects.borderRadius.full,
                    border: `1px solid ${theme.colors.neutral.gray200}`,
                    color: theme.colors.neutral.gray600,
                    transition: `all ${theme.effects.transitions.smooth}`
                  }}
                  aria-label="Social media"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Colonne 2 - Navigation */}
          <div>
            <h3 style={{
              color: theme.colors.neutral.gray900,
              fontWeight: theme.typography.fontWeight.medium,
              fontSize: theme.typography.fontSize.sm,
              textTransform: "uppercase",
              letterSpacing: theme.typography.letterSpacing.wider,
              marginBottom: spacing.lg
            }}>
              Navigation
            </h3>
            <ul className="flex flex-col" style={{ gap: spacing.sm }}>
              {[
                { label: "Nos Châteaux", href: "/chateaux" },
                { label: "Événements", href: "/evenements" },
                { label: "Demander un Devis", href: "/devis" },
                { label: "Contact", href: "/contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-block hover:text-[var(--bronze-antique)]"
                    style={{
                      color: theme.colors.neutral.gray600,
                      fontSize: theme.typography.fontSize.sm,
                      transition: `colors ${theme.effects.transitions.smooth}`
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Colonne 3 - Services */}
          <div>
            <h3 style={{
              color: theme.colors.neutral.gray900,
              fontWeight: theme.typography.fontWeight.medium,
              fontSize: theme.typography.fontSize.sm,
              textTransform: "uppercase",
              letterSpacing: theme.typography.letterSpacing.wider,
              marginBottom: spacing.lg
            }}>
              Nos Services
            </h3>
            <ul className="flex flex-col" style={{
              gap: spacing.sm,
              fontSize: theme.typography.fontSize.sm,
              color: theme.colors.neutral.gray600
            }}>
              <li>Séminaires Résidentiels</li>
              <li>Journées d'Étude</li>
              <li>Soirées d'Entreprise</li>
              <li>Team Building</li>
              <li>Conventions</li>
              <li>Événements Sur-Mesure</li>
            </ul>
          </div>

          {/* Colonne 4 - Contact */}
          <div>
            <h3 style={{
              color: theme.colors.neutral.gray900,
              fontWeight: theme.typography.fontWeight.medium,
              fontSize: theme.typography.fontSize.sm,
              textTransform: "uppercase",
              letterSpacing: theme.typography.letterSpacing.wider,
              marginBottom: spacing.lg
            }}>
              Contact
            </h3>
            <ul className="flex flex-col" style={{ gap: spacing.md }}>
              <li className="flex items-start" style={{ gap: spacing.sm }}>
                <MapPin className="flex-shrink-0" style={{
                  width: "16px",
                  height: "16px",
                  color: colors.bronze,
                  marginTop: "4px"
                }} />
                <span style={{
                  color: theme.colors.neutral.gray600,
                  fontSize: theme.typography.fontSize.sm,
                  lineHeight: theme.typography.lineHeight.relaxed
                }}>
                  15 Avenue des Châteaux<br />
                  75008 Paris, France
                </span>
              </li>
              <li className="flex items-center" style={{ gap: spacing.sm }}>
                <Phone className="flex-shrink-0" style={{
                  width: "16px",
                  height: "16px",
                  color: colors.bronze
                }} />
                <a
                  href="tel:+33757991146"
                  className="hover:text-[var(--bronze-antique)]"
                  style={{
                    color: theme.colors.neutral.gray600,
                    fontSize: theme.typography.fontSize.sm,
                    transition: `colors ${theme.effects.transitions.smooth}`
                  }}
                >
                  07 57 99 11 46
                </a>
              </li>
              <li className="flex items-center" style={{ gap: spacing.sm }}>
                <Mail className="flex-shrink-0" style={{
                  width: "16px",
                  height: "16px",
                  color: colors.bronze
                }} />
                <a
                  href="mailto:seminaires@selectchateaux.com"
                  className="hover:text-[var(--bronze-antique)]"
                  style={{
                    color: theme.colors.neutral.gray600,
                    fontSize: theme.typography.fontSize.sm,
                    transition: `colors ${theme.effects.transitions.smooth}`
                  }}
                >
                  seminaires@selectchateaux.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Ligne de séparation */}
        <div className="w-full" style={{
          borderTop: `1px solid ${theme.colors.neutral.gray200}`,
          paddingTop: theme.spacing.section.sm
        }}>
          <div className="flex flex-col md:flex-row justify-between items-center" style={{ gap: spacing.md }}>
            <p style={{
              color: theme.colors.neutral.gray600,
              fontSize: theme.typography.fontSize.xs
            }}>
              &copy; {new Date().getFullYear()} SelectChateaux.com. Tous droits réservés.
            </p>
            <div className="flex" style={{
              gap: spacing.xl,
              fontSize: theme.typography.fontSize.xs
            }}>
              <Link
                href="/mentions-legales"
                className="hover:text-[var(--bronze-antique)]"
                style={{
                  color: theme.colors.neutral.gray600,
                  transition: `colors ${theme.effects.transitions.smooth}`
                }}
              >
                Mentions Légales
              </Link>
              <Link
                href="/confidentialite"
                className="hover:text-[var(--bronze-antique)]"
                style={{
                  color: theme.colors.neutral.gray600,
                  transition: `colors ${theme.effects.transitions.smooth}`
                }}
              >
                Confidentialité
              </Link>
              <Link
                href="/cgv"
                className="hover:text-[var(--bronze-antique)]"
                style={{
                  color: theme.colors.neutral.gray600,
                  transition: `colors ${theme.effects.transitions.smooth}`
                }}
              >
                CGV
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
    </>
  );
}

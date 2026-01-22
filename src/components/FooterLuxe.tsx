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
        paddingTop: 'clamp(2.5rem, 7vw, 3.125rem)',
        paddingBottom: 'clamp(2rem, 6vw, 2.5rem)',
        paddingLeft: 'clamp(1rem, 3vw, 1.5rem)',
        paddingRight: 'clamp(1rem, 3vw, 1.5rem)',
        borderTop: `1px solid ${theme.colors.neutral.gray200}`
      }}>
      {/* Glow effect top */}
      <div className="absolute top-0 left-0 right-0 opacity-50" style={{
        height: "1px",
        background: `linear-gradient(to right, transparent, ${colors.bronze}, transparent)`
      }} />

      <div className="w-full px-4 sm:px-6 md:px-40 lg:px-48">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full gap-8 md:gap-10 lg:gap-14" style={{
          marginBottom: 'clamp(2rem, 5vw, 2.5rem)'
        }}>
          {/* Colonne 1 - À propos */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div style={{ marginBottom: spacing.lg, display: 'block', width: '100%' }}>
              <img
                src="https://jmeiepmtgidqtmxfnlwf.supabase.co/storage/v1/object/public/chateaux-images/logo.png"
                alt="Select Chateaux"
                className="w-auto object-contain mx-auto md:mx-0"
                style={{
                  height: 'clamp(3.5rem, 6vw, 5rem)',
                  maxWidth: 'clamp(180px, 50vw, 320px)',
                  filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
                  display: 'block'
                }}
              />
            </div>
            <p style={{
              color: theme.colors.neutral.gray600,
              lineHeight: theme.typography.lineHeight.relaxed,
              fontSize: 'clamp(0.875rem, 2vw, 0.9375rem)',
              margin: '0 0 ' + spacing.xl + ' 0',
              maxWidth: '280px'
            }}>
              L'excellence événementielle dans des châteaux d'exception à travers la France.
            </p>
            <div className="flex justify-center md:justify-start w-full" style={{ gap: spacing.sm }}>
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
          <div className="text-center md:text-left">
            <h3 style={{
              color: theme.colors.neutral.gray900,
              fontWeight: theme.typography.fontWeight.medium,
              fontSize: 'clamp(0.8125rem, 2vw, 0.875rem)',
              textTransform: "uppercase",
              letterSpacing: theme.typography.letterSpacing.wider,
              marginBottom: 'clamp(1rem, 3vw, 1.25rem)'
            }}>
              Navigation
            </h3>
            <ul className="flex flex-col items-center md:items-start" style={{ gap: 'clamp(0.5rem, 2vw, 0.625rem)' }}>
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
                      fontSize: 'clamp(0.875rem, 2vw, 0.9375rem)',
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
          <div className="text-center md:text-left">
            <h3 style={{
              color: theme.colors.neutral.gray900,
              fontWeight: theme.typography.fontWeight.medium,
              fontSize: 'clamp(0.8125rem, 2vw, 0.875rem)',
              textTransform: "uppercase",
              letterSpacing: theme.typography.letterSpacing.wider,
              marginBottom: 'clamp(1rem, 3vw, 1.25rem)'
            }}>
              Nos Services
            </h3>
            <ul className="flex flex-col items-center md:items-start" style={{
              gap: 'clamp(0.5rem, 2vw, 0.625rem)',
              fontSize: 'clamp(0.875rem, 2vw, 0.9375rem)',
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
          <div className="text-center md:text-left">
            <h3 style={{
              color: theme.colors.neutral.gray900,
              fontWeight: theme.typography.fontWeight.medium,
              fontSize: 'clamp(0.8125rem, 2vw, 0.875rem)',
              textTransform: "uppercase",
              letterSpacing: theme.typography.letterSpacing.wider,
              marginBottom: 'clamp(1rem, 3vw, 1.25rem)'
            }}>
              Contact
            </h3>
            <ul className="flex flex-col items-center md:items-start" style={{ gap: 'clamp(0.75rem, 2.5vw, 1rem)' }}>
              <li className="flex items-start" style={{ gap: spacing.sm }}>
                <MapPin className="flex-shrink-0" style={{
                  width: "16px",
                  height: "16px",
                  color: colors.bronze,
                  marginTop: "4px"
                }} />
                <span style={{
                  color: theme.colors.neutral.gray600,
                  fontSize: 'clamp(0.875rem, 2vw, 0.9375rem)',
                  lineHeight: theme.typography.lineHeight.relaxed
                }}>
                  60 Rue François 1er<br />
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
                    fontSize: 'clamp(0.875rem, 2vw, 0.9375rem)',
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
                    fontSize: 'clamp(0.875rem, 2vw, 0.9375rem)',
                    transition: `colors ${theme.effects.transitions.smooth}`,
                    wordBreak: 'break-word'
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
          paddingTop: 'clamp(1.25rem, 4vw, 1.75rem)',
          marginTop: 'clamp(0.5rem, 2vw, 1rem)'
        }}>
          <div className="flex flex-col md:flex-row md:justify-between items-center gap-6 md:gap-4">
            <div className="text-center md:text-left order-2 md:order-1">
              <p style={{
                color: theme.colors.neutral.gray600,
                fontSize: 'clamp(0.75rem, 1.8vw, 0.8125rem)',
                margin: 0
              }}>
                &copy; {new Date().getFullYear()} SelectChateaux.com. Tous droits réservés.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center order-1 md:order-2" style={{
              gap: 'clamp(1rem, 3vw, 1.5rem)',
              fontSize: 'clamp(0.75rem, 1.8vw, 0.8125rem)'
            }}>
              <Link
                href="/mentions-legales"
                className="hover:text-[var(--bronze-antique)]"
                style={{
                  color: theme.colors.neutral.gray600,
                  transition: `colors ${theme.effects.transitions.smooth}`,
                  whiteSpace: 'nowrap'
                }}
              >
                Mentions Légales
              </Link>
              <Link
                href="/confidentialite"
                className="hover:text-[var(--bronze-antique)]"
                style={{
                  color: theme.colors.neutral.gray600,
                  transition: `colors ${theme.effects.transitions.smooth}`,
                  whiteSpace: 'nowrap'
                }}
              >
                Confidentialité
              </Link>
              <Link
                href="/cgv"
                className="hover:text-[var(--bronze-antique)]"
                style={{
                  color: theme.colors.neutral.gray600,
                  transition: `colors ${theme.effects.transitions.smooth}`,
                  whiteSpace: 'nowrap'
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

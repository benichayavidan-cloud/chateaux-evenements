"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, Mail, ChevronDown, ArrowRight, Award } from "lucide-react";
import { cn } from "@/lib/utils";
import { chateaux as chateauxData } from "@/data/chateaux";
import { theme } from "@/config/theme";
import { colors, spacing } from "@/config/themeHelpers";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

const navLinks = [
  { href: "/", label: "Accueil" },
  { href: "/chateaux", label: "Châteaux", hasSubmenu: true },
  { href: "/evenements", label: "Événements" },
  { href: "/team-building", label: "Team Building" },
  { href: "/contact", label: "Contact" },
];

type Chateau = {
  slug: string;
  nom: string;
};

export function NavigationLuxe() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isChateauxOpen, setIsChateauxOpen] = useState(false);

  // Utiliser les données locales au lieu de Supabase
  const chateaux: Chateau[] = chateauxData.map(c => ({
    slug: c.slug,
    nom: c.nom
  }));

  // Ne pas afficher le bouton CTA sur la page devis
  const isOnDevisPage = pathname === "/devis";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 border-b",
        isScrolled
          ? "bg-white/95 shadow-lg border-gray-200"
          : "bg-gradient-to-b from-white/80 via-white/60 to-white/40 border-white/30"
      )}
      style={{
        willChange: 'transform',
        transition: `all ${theme.effects.transitions.smooth}`,
        backdropFilter: `blur(${theme.effects.blur.sm})`
      }}
    >
      {/* Container avec grille responsive */}
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="h-16 w-full grid grid-cols-3 items-center gap-3 sm:gap-4 md:gap-0">

          {/* Colonne 1 : Logo centré */}
          <div className="flex items-center justify-center">
            <Link href="/" className="relative group">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-2"
              >
                <span style={{
                  fontSize: 'clamp(1.125rem, 3vw, 1.25rem)',
                  fontWeight: theme.typography.fontWeight.medium,
                  color: colors.black,
                  fontFamily: theme.typography.fonts.heading
                }}>
                  Select
                </span>
                <span style={{
                  fontSize: 'clamp(1.125rem, 3vw, 1.25rem)',
                  fontWeight: theme.typography.fontWeight.light,
                  fontStyle: "italic",
                  color: colors.gold,
                  fontFamily: theme.typography.fonts.heading
                }}>
                  Chateaux
                </span>
              </motion.div>
            </Link>
          </div>

          {/* Colonne 2 : Navigation centrée */}
          <nav className="hidden md:flex items-center justify-center" style={{ gap: theme.components.navigation.gap }}>
            {navLinks.map((link) => (
              link.hasSubmenu ? (
                <div
                  key={link.href}
                  className="relative group"
                  onMouseEnter={() => setIsChateauxOpen(true)}
                  onMouseLeave={() => setIsChateauxOpen(false)}
                >
                  <Link
                    href={link.href}
                    className="relative whitespace-nowrap font-semibold header-nav-link flex items-center gap-1"
                    style={{
                      fontSize: theme.typography.fontSize.sm,
                      color: theme.colors.text.tertiary,
                      transition: `colors ${theme.effects.transitions.smooth}`
                    }}
                  >
                    {link.label}
                    <ChevronDown
                      className={cn(
                        "w-4 h-4",
                        isChateauxOpen && "rotate-180"
                      )}
                      style={{ transition: `transform ${theme.effects.transitions.smooth}` }}
                    />
                    <span className="absolute -bottom-1 left-0 w-0 h-px group-hover:w-full" style={{
                      backgroundColor: colors.gold,
                      transition: `all ${theme.effects.transitions.smooth}`
                    }} />
                  </Link>

                  {/* Dropdown Menu - PREMIUM VERSION */}
                  <AnimatePresence>
                    {isChateauxOpen && chateaux.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{
                          duration: 0.25,
                          ease: [0.22, 1, 0.36, 1]
                        }}
                        className="absolute left-1/2 -translate-x-1/2 overflow-hidden w-[240px]"
                        style={{
                          top: "calc(100% + 8px)",
                          zIndex: 9999,
                          background: "rgba(255, 255, 255, 0.98)",
                          backdropFilter: `blur(12px)`,
                          border: `1px solid rgba(163, 126, 44, 0.1)`,
                          borderRadius: "12px",
                          boxShadow: "0 8px 32px -8px rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(163, 126, 44, 0.05)",
                          willChange: 'transform, opacity',
                          padding: "12px",
                        }}
                      >
                        <div>
                          {/* Header du dropdown */}
                          <div style={{
                            marginBottom: "8px",
                            paddingBottom: "6px",
                            borderBottom: `1px solid rgba(163, 126, 44, 0.08)`,
                          }}>
                            <p style={{
                              fontSize: "9px",
                              fontWeight: "600",
                              letterSpacing: "0.1em",
                              textTransform: "uppercase",
                              color: "#a37e2c",
                              opacity: 0.7
                            }}>
                              Nos Châteaux
                            </p>
                          </div>

                          {/* Liste des châteaux */}
                          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                            {chateaux.map((chateau, index) => (
                              <motion.div
                                key={chateau.slug}
                                initial={{ opacity: 0, x: -8 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{
                                  duration: 0.2,
                                  delay: index * 0.03,
                                  ease: [0.22, 1, 0.36, 1]
                                }}
                              >
                                <Link
                                  href={`/chateaux/${chateau.slug}`}
                                  onMouseEnter={(e) => {
                                    const link = e.currentTarget;
                                    const bg = link.querySelector('.hover-bg') as HTMLElement;
                                    const icon = link.querySelector('.icon-box') as HTMLElement;
                                    const iconSvg = link.querySelector('.icon-svg') as HTMLElement;
                                    const text = link.querySelector('.chateau-name') as HTMLElement;
                                    const arrow = link.querySelector('.arrow-icon') as HTMLElement;

                                    if (bg) {
                                      bg.style.opacity = '1';
                                      bg.style.transform = 'scale(1.02)';
                                    }
                                    if (icon) {
                                      icon.style.transform = 'scale(1.1) rotate(12deg)';
                                    }
                                    if (iconSvg) {
                                      iconSvg.style.transform = 'scale(1.1)';
                                    }
                                    if (text) {
                                      text.style.color = '#a37e2c';
                                      text.style.transform = 'translateX(2px)';
                                    }
                                    if (arrow) {
                                      arrow.style.stroke = '#a37e2c';
                                      arrow.style.opacity = '1';
                                      arrow.style.transform = 'translateX(4px)';
                                    }
                                  }}
                                  onMouseLeave={(e) => {
                                    const link = e.currentTarget;
                                    const bg = link.querySelector('.hover-bg') as HTMLElement;
                                    const icon = link.querySelector('.icon-box') as HTMLElement;
                                    const iconSvg = link.querySelector('.icon-svg') as HTMLElement;
                                    const text = link.querySelector('.chateau-name') as HTMLElement;
                                    const arrow = link.querySelector('.arrow-icon') as HTMLElement;

                                    if (bg) {
                                      bg.style.opacity = '0';
                                      bg.style.transform = 'scale(1)';
                                    }
                                    if (icon) {
                                      icon.style.transform = 'scale(1) rotate(0deg)';
                                    }
                                    if (iconSvg) {
                                      iconSvg.style.transform = 'scale(1)';
                                    }
                                    if (text) {
                                      text.style.color = '#1f2937';
                                      text.style.transform = 'translateX(0)';
                                    }
                                    if (arrow) {
                                      arrow.style.stroke = '#9ca3af';
                                      arrow.style.opacity = '0.4';
                                      arrow.style.transform = 'translateX(0)';
                                    }
                                  }}
                                  style={{
                                    padding: "8px 10px",
                                    borderRadius: "8px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    position: "relative",
                                    textDecoration: "none",
                                  }}
                                >
                                  {/* Hover background avec animation */}
                                  <div
                                    className="hover-bg"
                                    style={{
                                      position: "absolute",
                                      inset: 0,
                                      background: `linear-gradient(135deg, rgba(163, 126, 44, 0.05) 0%, rgba(163, 126, 44, 0.02) 100%)`,
                                      borderRadius: "8px",
                                      transition: `all 0.3s cubic-bezier(0.4, 0, 0.2, 1)`,
                                      border: "1px solid rgba(163, 126, 44, 0.1)",
                                      opacity: 0,
                                      transform: "scale(1)",
                                    }}
                                  />

                                  <div style={{ display: "flex", alignItems: "center", position: "relative", zIndex: 10, gap: "10px" }}>
                                    {/* Icon château avec rotation */}
                                    <div
                                      className="icon-box"
                                      style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        flexShrink: 0,
                                        width: "20px",
                                        height: "20px",
                                        borderRadius: "6px",
                                        background: `rgba(163, 126, 44, 0.08)`,
                                        transition: `all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)`,
                                        transform: "scale(1) rotate(0deg)",
                                      }}
                                    >
                                      <Award
                                        className="icon-svg"
                                        style={{
                                          width: "12px",
                                          height: "12px",
                                          color: "#a37e2c",
                                          opacity: 0.7,
                                          transition: `all 0.3s ease`,
                                          transform: "scale(1)",
                                        }}
                                      />
                                    </div>

                                    {/* Nom du château avec slide */}
                                    <span
                                      className="chateau-name"
                                      style={{
                                        fontSize: "14px",
                                        fontWeight: "500",
                                        color: "#1f2937",
                                        transition: `all 0.3s ease`,
                                        transform: "translateX(0)",
                                      }}
                                    >
                                      {chateau.nom}
                                    </span>
                                  </div>

                                  {/* Arrow icon avec bounce */}
                                  <svg
                                    className="arrow-icon"
                                    style={{
                                      width: "14px",
                                      height: "14px",
                                      stroke: "#9ca3af",
                                      opacity: 0.4,
                                      flexShrink: 0,
                                      transition: `all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)`,
                                      transform: "translateX(0)",
                                    }}
                                    fill="none"
                                    viewBox="0 0 24 24"
                                  >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                  </svg>
                                </Link>
                              </motion.div>
                            ))}
                          </div>

                          {/* Footer du dropdown */}
                          <div style={{
                            marginTop: "10px",
                            paddingTop: "8px",
                            borderTop: `1px solid rgba(163, 126, 44, 0.08)`,
                          }}>
                            <Link
                              href="/chateaux"
                              onMouseEnter={(e) => {
                                const link = e.currentTarget;
                                const shimmer = link.querySelector('.shimmer-effect') as HTMLElement;
                                const text = link.querySelector('.footer-text') as HTMLElement;
                                const arrow = link.querySelector('.footer-arrow') as HTMLElement;

                                if (shimmer) shimmer.style.opacity = '1';
                                if (text) {
                                  text.style.color = '#8b6923';
                                  text.style.transform = 'scale(1.05)';
                                }
                                if (arrow) arrow.style.transform = 'translateX(4px)';
                              }}
                              onMouseLeave={(e) => {
                                const link = e.currentTarget;
                                const shimmer = link.querySelector('.shimmer-effect') as HTMLElement;
                                const text = link.querySelector('.footer-text') as HTMLElement;
                                const arrow = link.querySelector('.footer-arrow') as HTMLElement;

                                if (shimmer) shimmer.style.opacity = '0';
                                if (text) {
                                  text.style.color = '#a37e2c';
                                  text.style.transform = 'scale(1)';
                                }
                                if (arrow) arrow.style.transform = 'translateX(0)';
                              }}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                position: "relative",
                                overflow: "hidden",
                                padding: "6px 12px",
                                background: `rgba(163, 126, 44, 0.03)`,
                                borderRadius: "8px",
                                border: `1px solid rgba(163, 126, 44, 0.08)`,
                                textDecoration: "none",
                              }}
                            >
                              {/* Shimmer effect au hover */}
                              <div
                                className="shimmer-effect"
                                style={{
                                  position: "absolute",
                                  inset: 0,
                                  background: `linear-gradient(90deg, transparent, rgba(163, 126, 44, 0.1), transparent)`,
                                  transition: `all 0.3s ease`,
                                  opacity: 0,
                                }}
                              />

                              <span
                                className="footer-text"
                                style={{
                                  fontSize: "13px",
                                  fontWeight: "500",
                                  color: "#a37e2c",
                                  transition: `all 0.3s ease`,
                                  position: "relative",
                                  zIndex: 1,
                                  transform: "scale(1)",
                                }}
                              >
                                Voir tous les châteaux
                              </span>
                              <ArrowRight
                                className="footer-arrow"
                                style={{
                                  width: "14px",
                                  height: "14px",
                                  marginLeft: "6px",
                                  color: "#a37e2c",
                                  opacity: 0.7,
                                  transition: `all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)`,
                                  position: "relative",
                                  zIndex: 10,
                                  transform: "translateX(0)",
                                }}
                              />
                            </Link>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative group whitespace-nowrap font-semibold header-nav-link"
                  style={{
                    fontSize: theme.typography.fontSize.sm,
                    color: theme.colors.text.tertiary,
                    transition: `colors ${theme.effects.transitions.smooth}`
                  }}
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-px group-hover:w-full" style={{
                    backgroundColor: colors.gold,
                    transition: `all ${theme.effects.transitions.smooth}`
                  }} />
                </Link>
              )
            ))}
          </nav>

          {/* Colonne 3 : CTA + Mobile centré */}
          <div className="flex items-center justify-center">
            {/* CTA Desktop */}
            {!isOnDevisPage && (
              <Button
                href="/devis"
                variant="primary"
                size="sm"
                className="hidden md:inline-flex"
              >
                Demander un Devis
              </Button>
            )}

            {/* Mobile : Bouton menu */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden"
              aria-label="Toggle menu"
              style={{
                padding: '10px',
                minWidth: '44px',
                minHeight: '44px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: theme.colors.neutral.gray900,
                transition: `colors ${theme.effects.transitions.smooth}`
              }}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden"
            style={{
              background: theme.colors.overlay.white95,
              backdropFilter: `blur(${theme.effects.blur.sm})`,
              borderTop: `1px solid ${theme.colors.neutral.gray200}`
            }}
          >
            <nav className="container mx-auto flex flex-col px-4 sm:px-6 py-6" style={{ gap: spacing.lg }}>
              {navLinks.map((link) => (
                link.hasSubmenu ? (
                  <div key={link.href} className="flex flex-col" style={{ gap: spacing.md }}>
                    <Link
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="font-medium hover:text-[var(--bronze-antique)]"
                      style={{
                        color: theme.colors.neutral.gray700,
                        padding: `${spacing.sm} 0`,
                        transition: `colors ${theme.effects.transitions.smooth}`
                      }}
                    >
                      {link.label}
                    </Link>
                    {chateaux.length > 0 && (
                      <div className="flex flex-col" style={{
                        marginLeft: spacing.sm,
                        paddingLeft: spacing.lg,
                        gap: spacing.sm,
                        borderLeft: `2px solid ${colors.gold}`
                      }}>
                        {chateaux.map((chateau) => (
                          <Link
                            key={chateau.slug}
                            href={`/chateaux/${chateau.slug}`}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="hover:text-[var(--bronze-antique)] hover:bg-gray-50 font-medium"
                            style={{
                              fontSize: theme.typography.fontSize.sm,
                              color: theme.colors.neutral.gray600,
                              padding: `${spacing.sm} ${spacing.md}`,
                              borderRadius: theme.effects.borderRadius.lg,
                              transition: `all ${theme.effects.transitions.smooth}`
                            }}
                          >
                            {chateau.nom}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="font-medium hover:text-[var(--bronze-antique)]"
                    style={{
                      color: theme.colors.neutral.gray700,
                      padding: `${spacing.sm} 0`,
                      transition: `colors ${theme.effects.transitions.smooth}`
                    }}
                  >
                    {link.label}
                  </Link>
                )
              ))}
              {!isOnDevisPage && (
                <Button
                  href="/devis"
                  variant="primary"
                  size="md"
                  fullWidth
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Demander un Devis
                </Button>
              )}

              {/* Contact Info */}
              <div className="flex flex-col" style={{
                paddingTop: spacing["2xl"],
                borderTop: `1px solid ${theme.colors.neutral.gray200}`,
                gap: spacing.md
              }}>
                <a
                  href="tel:+33123456789"
                  className="flex items-center hover:text-[var(--bronze-antique)]"
                  style={{
                    gap: spacing.md,
                    color: theme.colors.neutral.gray600,
                    fontSize: theme.typography.fontSize.sm,
                    transition: `colors ${theme.effects.transitions.smooth}`
                  }}
                >
                  <Phone className="w-4 h-4" />
                  <span>+33 1 23 45 67 89</span>
                </a>
                <a
                  href="mailto:contact@selectchateaux.com"
                  className="flex items-center hover:text-[var(--bronze-antique)]"
                  style={{
                    gap: spacing.md,
                    color: theme.colors.neutral.gray600,
                    fontSize: theme.typography.fontSize.sm,
                    transition: `colors ${theme.effects.transitions.smooth}`
                  }}
                >
                  <Mail className="w-4 h-4" />
                  <span>contact@selectchateaux.com</span>
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

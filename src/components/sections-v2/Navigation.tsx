/**
 * NAVIGATION COMPONENT - Menu professionnel
 * Navigation responsive avec menu mobile et dropdown
 */

'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
// framer-motion removed — using CSS transitions instead
import { Menu, X, ChevronDown } from 'lucide-react';
import { Link } from '@/components/ui-v2';
import { Container } from '@/components/layout-v2';
import { theme } from '@/design-system/tokens';

export interface NavigationLink {
  label: string;
  href: string;
  children?: NavigationLink[];
}

export interface NavigationProps {
  /** Logo (image ou texte) */
  logo?: React.ReactNode;

  /** Liens de navigation */
  links: NavigationLink[];

  /** CTA button */
  cta?: {
    label: string;
    href: string;
  };

  /** Sticky navigation */
  sticky?: boolean;

  /** Transparent au départ */
  transparent?: boolean;
}

export function Navigation({
  logo,
  links,
  cta,
  sticky = true,
  transparent = false,
}: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Dropdown avec délai de fermeture (pattern pro — Amazon, Stripe, Apple)
  const handleDropdownEnter = useCallback((href: string) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setActiveDropdown(href);
  }, []);

  const handleDropdownLeave = useCallback(() => {
    closeTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  }, []);

  // Détecter le scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cleanup timeout
  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  // Fermer le menu mobile au clic sur un lien
  const handleLinkClick = () => {
    setIsOpen(false);
    setActiveDropdown(null);
  };

  // Background dynamique
  const navBackground = transparent && !isScrolled
    ? 'rgba(255, 255, 255, 0.05)'
    : 'rgba(255, 255, 255, 0.95)';

  return (
    <nav
      style={{
        position: sticky ? 'fixed' : 'relative',
        top: 0,
        left: 0,
        right: 0,
        width: '100%',
        zIndex: theme.effects.zIndex.sticky,
        background: isScrolled
          ? 'rgba(255, 255, 255, 0.92)'
          : transparent
            ? 'rgba(255, 255, 255, 0.05)'
            : 'rgba(255, 255, 255, 0.95)',
        backdropFilter: isScrolled ? 'blur(20px) saturate(1.8)' : 'blur(12px)',
        borderBottom: `1px solid ${isScrolled ? 'rgba(163, 126, 44, 0.08)' : 'transparent'}`,
        transition: 'all 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
        boxShadow: isScrolled
          ? '0 4px 30px rgba(0, 0, 0, 0.06), 0 1px 3px rgba(0, 0, 0, 0.04)'
          : 'none',
      }}
    >
      <Container size="xl">
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: isScrolled ? '60px' : 'clamp(64px, 10vw, 80px)',
            transition: 'height 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
            gap: theme.spacing.lg,
          }}
        >
          {/* Logo */}
          <Link href="/" variant="default" className="nav-logo" style={{
            display: 'flex',
            alignItems: 'center',
            lineHeight: 0,
            flexShrink: 0,
          }}>
            {logo || 'Logo'}
          </Link>

          {/* Desktop Menu - Centré avec position absolute */}
          <div
            style={{
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              gap: theme.spacing.lg,
              alignItems: 'center',
            }}
            className="desktop-menu"
          >
            {links.map((link) => (
              <div key={link.href} style={{ position: 'relative' }}>
                {link.children ? (
                  // Dropdown pro avec délai de fermeture
                  <div
                    onMouseEnter={() => handleDropdownEnter(link.href)}
                    onMouseLeave={handleDropdownLeave}
                    style={{ position: 'relative' }}
                  >
                    <button
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        background: 'none',
                        border: 'none',
                        color: activeDropdown === link.href
                          ? 'var(--bronze-antique, #A37E2C)'
                          : theme.colors.neutral.gray700,
                        fontWeight: theme.typography.fontWeight.medium,
                        cursor: 'pointer',
                        transition: 'color 0.2s ease',
                        padding: '10px 8px',
                        margin: '-10px -8px',
                        lineHeight: 1,
                        fontSize: 'inherit',
                      }}
                    >
                      {link.label}
                      <ChevronDown
                        className="w-4 h-4"
                        style={{
                          transform: activeDropdown === link.href ? 'rotate(180deg)' : 'rotate(0)',
                          transition: 'transform 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                        }}
                      />
                    </button>

                    <div
                      className={`nav-dropdown ${activeDropdown === link.href ? 'is-open' : ''}`}
                      style={{
                        position: 'absolute',
                        top: '100%',
                        left: '-16px',
                        paddingTop: '12px',
                        minWidth: '280px',
                      }}
                    >
                      <div style={{
                        background: theme.colors.neutral.white,
                        borderRadius: '12px',
                        boxShadow: '0 12px 36px rgba(0,0,0,0.1), 0 4px 12px rgba(0,0,0,0.06)',
                        padding: '6px',
                        border: '1px solid rgba(0,0,0,0.06)',
                      }}>
                        {link.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            variant="subtle"
                            className="dropdown-link"
                            onClick={handleLinkClick}
                            style={{
                              display: 'block',
                              padding: '10px 16px',
                              borderRadius: '8px',
                              fontSize: theme.typography.fontSize.sm,
                              lineHeight: '1.5',
                              transition: 'all 0.15s ease',
                              whiteSpace: 'nowrap',
                            }}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link href={link.href} variant="subtle" style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    lineHeight: 1,
                    padding: 0,
                  }}>
                    {link.label}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* CTA - Aligné à droite */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
            className="desktop-cta"
          >
            {cta && (
              <Link href={cta.href} variant="button">
                {cta.label}
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '44px',
              height: '44px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: theme.colors.neutral.gray700,
            }}
            className="mobile-menu-button"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </Container>

      {/* Mobile Menu */}
      <div
        className={`mobile-menu ${isOpen ? 'is-open' : ''}`}
        style={{
          background: theme.colors.neutral.white,
          borderTop: `1px solid ${theme.colors.neutral.gray200}`,
        }}
      >
            <Container size="xl">
              <div style={{ padding: `${theme.spacing.lg} 0` }}>
                {links.map((link) => (
                  <div key={link.href} style={{ marginBottom: theme.spacing.md }}>
                    {link.children ? (
                      <>
                        <button
                          onClick={() =>
                            setActiveDropdown(activeDropdown === link.href ? null : link.href)
                          }
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            width: '100%',
                            padding: theme.spacing.md,
                            background: 'none',
                            border: 'none',
                            fontSize: theme.typography.fontSize.lg,
                            fontWeight: theme.typography.fontWeight.medium,
                            cursor: 'pointer',
                          }}
                        >
                          {link.label}
                          <ChevronDown
                            className="w-5 h-5"
                            style={{
                              transform: activeDropdown === link.href ? 'rotate(180deg)' : 'rotate(0)',
                              transition: 'transform 0.2s',
                            }}
                          />
                        </button>
                        <div
                          className={`accordion-content ${activeDropdown === link.href ? 'is-open' : ''}`}
                          style={{ paddingLeft: theme.spacing.lg }}
                        >
                          {link.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              variant="subtle"
                              onClick={handleLinkClick}
                              className="dropdown-link"
                              style={{
                                display: 'block',
                                padding: '10px 12px',
                                borderRadius: '8px',
                                fontSize: theme.typography.fontSize.sm,
                                lineHeight: '1.5',
                                transition: 'all 0.15s ease',
                              }}
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      </>
                    ) : (
                      <Link
                        href={link.href}
                        variant="subtle"
                        onClick={handleLinkClick}
                        style={{
                          display: 'block',
                          padding: theme.spacing.md,
                          fontSize: theme.typography.fontSize.lg,
                        }}
                      >
                        {link.label}
                      </Link>
                    )}
                  </div>
                ))}

                {cta && (
                  <Link
                    href={cta.href}
                    variant="button"
                    onClick={handleLinkClick}
                    style={{
                      display: 'block',
                      textAlign: 'center',
                      marginTop: theme.spacing.lg,
                    }}
                  >
                    {cta.label}
                  </Link>
                )}
              </div>
            </Container>
      </div>

    </nav>
  );
}

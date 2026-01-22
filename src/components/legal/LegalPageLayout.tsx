import { ReactNode } from "react";
import { NavigationLuxe } from "@/components/NavigationLuxe";
import { theme } from "@/config/theme";

interface LegalPageLayoutProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
}

export function LegalPageLayout({ title, subtitle, children }: LegalPageLayoutProps) {
  return (
    <>
      <NavigationLuxe />
      <main className="min-h-screen bg-white pt-20">
        <div className="mx-auto py-8 md:py-12 px-4" style={{ maxWidth: '1200px' }}>
          {/* En-tête - Centré sur toute la largeur de la page */}
          <div className="mb-8">
            <div className="text-center" style={{ margin: '0 calc(-50vw + 50%)', padding: '0 calc(50vw - 50%)' }}>
              <h1
                className="text-2xl md:text-3xl font-bold mb-3"
                style={{ color: theme.colors.neutral.gray900 }}
              >
                {title}
              </h1>
              <div
                className="w-16 h-0.5 mx-auto"
                style={{
                  background: `linear-gradient(to right, transparent, ${theme.colors.primary.bronze}, transparent)`
                }}
              />
              {subtitle && (
                <p
                  className="mt-4 text-xs"
                  style={{ color: theme.colors.neutral.gray500 }}
                >
                  {subtitle}
                </p>
              )}
            </div>
          </div>

          {/* Contenu */}
          <div className="prose prose-sm max-w-none">
            {children}
          </div>
        </div>
      </main>
    </>
  );
}

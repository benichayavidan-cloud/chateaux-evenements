import { ReactNode } from "react";
import { theme } from "@/config/theme";

interface LegalSectionProps {
  title: string;
  children: ReactNode;
}

export function LegalSection({ title, children }: LegalSectionProps) {
  return (
    <section className="mb-8" style={{ paddingLeft: '15px' }}>
      <h2
        className="text-lg md:text-xl font-semibold mb-4"
        style={{ color: theme.colors.neutral.gray900, fontFamily: 'var(--font-inter), sans-serif' }}
      >
        {title}
      </h2>
      <div
        className="leading-relaxed text-sm [&_strong]:text-slate-900 [&_p]:text-slate-700 [&_li]:text-slate-700"
        style={{ color: theme.colors.neutral.gray700 }}
      >
        {children}
      </div>
    </section>
  );
}

import { ReactNode } from "react";
import { theme } from "@/config/theme";

interface LegalContentProps {
  children: ReactNode;
  spaced?: boolean;
}

export function LegalContent({ children, spaced = false }: LegalContentProps) {
  return (
    <div className={spaced ? "space-y-4" : ""}>
      {children}
    </div>
  );
}

interface LegalListProps {
  items: string[];
  ordered?: boolean;
}

export function LegalList({ items, ordered = false }: LegalListProps) {
  const ListTag = ordered ? "ol" : "ul";
  const listClass = ordered ? "list-decimal pl-6 space-y-2" : "list-disc pl-6 space-y-2";

  return (
    <ListTag className={listClass}>
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ListTag>
  );
}

interface LegalLinkProps {
  href: string;
  children: ReactNode;
}

export function LegalLink({ href, children }: LegalLinkProps) {
  return (
    <a
      href={href}
      className="hover:underline transition-all"
      style={{ color: theme.colors.primary.bronze }}
    >
      {children}
    </a>
  );
}

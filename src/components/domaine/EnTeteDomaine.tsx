/**
 * Haut de page d'un domaine, au-dessus de la galerie : pastilles ville et
 * référence, titre sur deux lignes (mot-clé, puis lieu en doré), ligne d'infos
 * du château. Server Component partagé par la fiche château et ses pages
 * détaillées (17/11/2026 : le haut des pages détaillées était une copie de
 * celui de la fiche, et n'avait pas suivi ses changements).
 */
import { Bed, Building2, MapPin, Users } from "lucide-react";
import { theme } from "@/design-system/tokens";
import { Medaillon } from "@/components/domaine/Medaillon";
import styles from "@/components/domaine/domaine.module.css";
import type { Chateau } from "@/types";

interface EnTeteDomaineProps {
  chateau: Pick<Chateau, "region" | "ref" | "capacite" | "roomsTotal" | "roomsTwin" | "styleArchitectural" | "trajet">;
  /** Première ligne du titre principal : le mot-clé de la page. */
  titre: string;
  /** Seconde ligne, en doré : le lieu. */
  lieu?: string;
}

export function EnTeteDomaine({ chateau, titre, lieu }: EnTeteDomaineProps) {
  return (
    <div style={{ marginBottom: 'clamp(1.25rem, 3vw, 2.5rem)' }}>
      <div className="flex flex-wrap items-center gap-2" style={{ marginBottom: 'clamp(0.75rem, 1.5vw, 1.25rem)' }}>
        <div
          className="inline-flex items-center gap-2"
          style={{
            padding: '4px 12px 4px 4px',
            background: `linear-gradient(135deg, ${theme.colors.primary.bronze}12, ${theme.colors.primary.gold}08)`,
            border: `1px solid ${theme.colors.primary.bronze}40`,
            borderRadius: theme.effects.borderRadius.full,
          }}
        >
          <Medaillon icone={MapPin} taille="petit" />
          <span style={{ fontSize: '0.8125rem', fontWeight: theme.typography.fontWeight.semibold, color: theme.colors.primary.bronze }}>
            {chateau.region}
          </span>
        </div>
        <div
          className="inline-flex items-center gap-1.5"
          style={{
            padding: '0.375rem 0.75rem',
            background: `${theme.colors.primary.bronze}08`,
            border: `1px solid ${theme.colors.primary.bronze}25`,
            borderRadius: theme.effects.borderRadius.full,
          }}
        >
          <span style={{ fontSize: '0.6875rem', fontWeight: theme.typography.fontWeight.bold, color: theme.colors.primary.bronze, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            Réf.
          </span>
          <span style={{ fontSize: '0.75rem', fontWeight: theme.typography.fontWeight.semibold, color: theme.colors.primary.bronzeDark, fontFamily: 'monospace' }}>
            {chateau.ref}
          </span>
        </div>
      </div>

      <h1
        style={{
          fontSize: 'clamp(1.5rem, 3.5vw, 2.25rem)',
          fontWeight: theme.typography.fontWeight.semibold,
          fontFamily: theme.typography.fonts.heading,
          lineHeight: 1.2,
          color: theme.colors.neutral.gray900,
          marginBottom: 'clamp(0.75rem, 1.5vw, 1rem)',
        }}
      >
        {titre}
        {lieu && (
          <span style={{ display: 'block', fontSize: '0.62em', fontStyle: 'italic', color: theme.colors.primary.bronze, marginTop: '0.3em' }}>
            {lieu}
          </span>
        )}
      </h1>

      <div className="flex flex-wrap items-center" style={{ columnGap: 'clamp(0.625rem, 1.6vw, 1.25rem)', rowGap: '0.5rem', color: theme.colors.neutral.gray600, fontSize: '0.9375rem' }}>
        <span className="inline-flex items-center gap-1.5">
          <Medaillon icone={Users} taille="petit" />
          {chateau.capacite.min}–{chateau.capacite.max} personnes
        </span>
        <span className={styles.separateurInfos} style={{ color: theme.colors.neutral.gray300 }} aria-hidden>·</span>
        <span className="inline-flex items-center gap-1.5">
          <Medaillon icone={Bed} taille="petit" />
          {chateau.roomsTotal} chambres
          {chateau.roomsTwin ? ` (${chateau.roomsTwin} twins)` : ''}
        </span>
        <span className={styles.separateurInfos} style={{ color: theme.colors.neutral.gray300 }} aria-hidden>·</span>
        <span className="inline-flex items-center gap-1.5">
          <Medaillon icone={Building2} taille="petit" />
          {chateau.styleArchitectural}
        </span>
        {chateau.trajet && (
          <>
            <span className={styles.separateurInfos} style={{ color: theme.colors.neutral.gray300 }} aria-hidden>·</span>
            <span className="inline-flex items-center gap-1.5">
              <Medaillon icone={MapPin} taille="petit" />
              {chateau.trajet}
            </span>
          </>
        )}
      </div>
    </div>
  );
}

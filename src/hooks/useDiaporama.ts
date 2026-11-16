'use client';
import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Diaporama automatique des fiches et rubriques château.
 *
 * - Ne tourne que lorsqu'il est à l'écran et que l'onglet est visible : avant
 *   (16/11/2026), 5 diaporamas changeaient de photo toutes les 2 s même hors
 *   écran, ce qui faisait ramer le défilement.
 * - `proche(i)` : seules la photo affichée, la précédente (fondu de sortie) et
 *   la suivante (préchargée) sont rendues. La suivante est donc prête quand
 *   elle apparaît, au lieu de surgir d'un coup.
 */
export function useDiaporama(nb: number, delaiMs = 2000) {
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(false);
  const [relance, setRelance] = useState(0);
  const zone = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = zone.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { rootMargin: '200px 0px' });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!visible || nb < 2) return;
    const id = setInterval(() => {
      if (!document.hidden) setCurrent((p) => (p + 1) % nb);
    }, delaiMs);
    return () => clearInterval(id);
  }, [visible, nb, delaiMs, relance]);

  /** Aller à une photo (flèches, points) : le minuteur repart de zéro. */
  const goTo = useCallback(
    (i: number) => {
      setCurrent(((i % nb) + nb) % nb);
      setRelance((r) => r + 1);
    },
    [nb],
  );

  const proche = useCallback(
    (i: number) => {
      if (nb <= 3) return true;
      const ecart = (i - current + nb) % nb;
      return ecart <= 1 || ecart === nb - 1;
    },
    [current, nb],
  );

  return { current, goTo, zone, proche };
}

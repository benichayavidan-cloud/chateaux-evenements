"use client";

import { useEffect, useState } from "react";
import { Phone, FileText } from "lucide-react";
import { trackPhoneClick } from "@/components/Analytics";
import { CONTACT_PHONE_DISPLAY, CONTACT_PHONE_E164 } from "@/lib/contact";
import { BOUTON_DEVIS, BOUTON_TELEPHONE } from "@/components/domaine/boutons-cta";
import styles from "./StickyCtaBar.module.css";

/**
 * Dans la barre, les deux boutons se partagent la largeur à parts égales
 * (220 px au plus chacun) : même gabarit que sous les photos de la fiche,
 * mais ils doivent tenir côte à côte sur un téléphone de 360 px.
 */
const TAILLE_BARRE = { flex: "1 1 0", minWidth: 0, maxWidth: "220px", padding: "0 12px" } as const;

interface StickyCtaBarProps {
  /**
   * Où mène « Devis gratuit ». Par défaut la page /devis ; sur une page qui
   * porte déjà le formulaire (articles, fiches lieu et château), son ancre
   * `#devis-express` : on descend au formulaire au lieu de changer de page.
   */
  cible?: string;
}

export function StickyCtaBar({ cible = "/devis#formulaire" }: StickyCtaBarProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // La barre s'efface quand le formulaire de la page est à l'écran : elle
    // masquerait le bouton d'envoi sur mobile, et n'a plus rien à proposer.
    // Le formulaire est relu à chaque défilement plutôt qu'observé une fois
    // (IntersectionObserver) : si React remplace son nœud après le montage,
    // l'observateur surveillerait un élément détaché et ne verrait plus rien.
    // Une seule mesure par image affichée (requestAnimationFrame) : mesurer à
    // chaque événement de défilement faisait ramer les pages château (16/11).
    let enAttente = 0;
    const mesurer = () => {
      enAttente = 0;
      const formulaire = cible.startsWith("#") ? document.querySelector(cible) : null;
      const r = formulaire?.getBoundingClientRect();
      const formulaireVisible = !!r && r.top < window.innerHeight * 0.85 && r.bottom > 0;
      setShow(window.scrollY > 300 && !formulaireVisible);
    };
    const handleScroll = () => {
      if (!enAttente) enAttente = requestAnimationFrame(mesurer);
    };
    mesurer();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (enAttente) cancelAnimationFrame(enAttente);
    };
  }, [cible]);

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 9990,
        transform: show ? "translateY(0)" : "translateY(100%)",
        transition: "transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
        pointerEvents: show ? "auto" : "none",
      }}
    >
      <div
        style={{
          // Fond presque opaque, sans flou : le flou était recalculé à chaque image du défilement.
          background: "rgba(255, 255, 255, 0.98)",
          borderTop: "1px solid rgba(163, 126, 44, 0.15)",
          boxShadow: "0 -4px 24px rgba(0, 0, 0, 0.1)",
          padding: "clamp(10px, 2vw, 14px) clamp(16px, 4vw, 32px)",
        }}
      >
        <div style={{ maxWidth: "460px", margin: "0 auto", display: "flex", justifyContent: "center", gap: "10px" }}>
          <a
            href={`tel:${CONTACT_PHONE_E164}`}
            onClick={() => trackPhoneClick("barre-fixe")}
            className="hover:opacity-90"
            style={{ ...BOUTON_TELEPHONE, ...TAILLE_BARRE }}
          >
            <Phone className="w-4 h-4" style={{ color: "white" }} />
            <span className={styles.libelleLong}>{CONTACT_PHONE_DISPLAY}</span>
            <span className={styles.libelleCourt}>Appeler</span>
          </a>
          <a
            href={cible}
            data-cta="barre-fixe-devis"
            className="hover:opacity-90"
            style={{ ...BOUTON_DEVIS, ...TAILLE_BARRE }}
          >
            <FileText style={{ width: "16px", height: "16px" }} />
            Devis Gratuit
          </a>
        </div>
      </div>
    </div>
  );
}

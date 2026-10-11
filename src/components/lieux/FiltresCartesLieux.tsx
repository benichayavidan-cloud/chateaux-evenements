"use client";

/**
 * Filtres et « Voir les N lieux » de CartesLieux. Les cartes sont rendues par
 * le serveur (liens dans le HTML) : ce composant ne fait que les masquer.
 * Sans JavaScript, toutes les cartes restent visibles.
 */

import { useEffect, useRef, useState, type ReactNode } from "react";
import { LIMITE_CARTES, SEUIL_GRAND_GROUPE } from "@/lib/cartes-lieux";

type Filtre = "tous" | "chambres" | "grands" | "petits";

interface FiltresCartesLieuxProps {
  total: number;
  avecChambres: number;
  grands: number;
  children: ReactNode;
}

function retenue(carte: HTMLElement, filtre: Filtre): boolean {
  const capacite = Number(carte.dataset.capacite);
  if (filtre === "chambres") return carte.dataset.chambres === "1";
  if (filtre === "grands") return capacite >= SEUIL_GRAND_GROUPE;
  if (filtre === "petits") return capacite < SEUIL_GRAND_GROUPE;
  return true;
}

export function FiltresCartesLieux({ total, avecChambres, grands, children }: FiltresCartesLieuxProps) {
  const zone = useRef<HTMLDivElement>(null);
  const [filtre, setFiltre] = useState<Filtre>("tous");
  const [tout, setTout] = useState(false);
  const retenues = { tous: total, chambres: avecChambres, grands, petits: total - grands }[filtre];

  const affichees = tout ? retenues : Math.min(retenues, LIMITE_CARTES);

  useEffect(() => {
    const grille = zone.current?.querySelector<HTMLElement>("[data-grille-lieux]");
    const cartes = Array.from(zone.current?.querySelectorAll<HTMLElement>("[data-carte-lieu]") ?? []);
    if (!grille) return;
    // État initial : c'est la règle CSS rendue par le serveur qui limite (CartesLieux).
    if (filtre === "tous" && !tout) {
      grille.setAttribute("data-cartes-limitees", "");
      cartes.forEach((c) => (c.style.display = "flex"));
      return;
    }
    grille.removeAttribute("data-cartes-limitees");
    let rang = 0;
    let premiereRevelee: HTMLElement | null = null;
    for (const carte of cartes) {
      const ok = retenue(carte, filtre);
      // style.display et non l'attribut hidden : la carte porte un display:flex en ligne,
      // à remettre tel quel (une chaîne vide l'effacerait).
      carte.style.display = ok && (tout || rang < LIMITE_CARTES) ? "flex" : "none";
      if (ok && rang === LIMITE_CARTES) premiereRevelee = carte;
      if (ok) rang++;
    }
    // « Voir les N lieux » disparaît au clic : le focus clavier va à la première carte révélée.
    if (tout) premiereRevelee?.focus();
  }, [filtre, tout]);

  const choix: { id: Filtre; libelle: string }[] = [
    { id: "tous", libelle: `Tous (${total})` },
    { id: "chambres", libelle: `Avec hébergement (${avecChambres})` },
    { id: "grands", libelle: `${SEUIL_GRAND_GROUPE} pers. et plus (${grands})` },
    { id: "petits", libelle: `Moins de ${SEUIL_GRAND_GROUPE} pers. (${total - grands})` },
  ];

  return (
    <div ref={zone}>
      <div role="group" aria-label="Filtrer les lieux" style={{ display: "flex", flexWrap: "wrap", gap: "8px", justifyContent: "center", marginBottom: "20px" }}>
        {choix.map((c) => {
          const actif = filtre === c.id;
          return (
            <button
              key={c.id}
              type="button"
              aria-pressed={actif}
              onClick={() => {
                setFiltre(c.id);
                setTout(false);
              }}
              style={{
                border: `1px solid ${actif ? "#111827" : "#E5E7EB"}`,
                background: actif ? "#111827" : "#FFFFFF",
                color: actif ? "#FFFFFF" : "#374151",
                borderRadius: "999px",
                padding: "6px 14px",
                fontSize: "0.85rem",
                cursor: "pointer",
              }}
            >
              {c.libelle}
            </button>
          );
        })}
      </div>
      <p aria-live="polite" style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)", whiteSpace: "nowrap" }}>
        {affichees} lieux affichés sur {retenues}
      </p>
      {children}
      {!tout && retenues > LIMITE_CARTES && (
        <p style={{ textAlign: "center", margin: "20px 0 0" }}>
          <button
            type="button"
            onClick={() => setTout(true)}
            style={{ border: "1px solid #111827", background: "#FFFFFF", color: "#111827", borderRadius: "999px", padding: "9px 20px", fontWeight: 600, cursor: "pointer" }}
          >
            Voir les {retenues} lieux
          </button>
        </p>
      )}
    </div>
  );
}

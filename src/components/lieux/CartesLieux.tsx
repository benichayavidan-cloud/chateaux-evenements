/**
 * Grille de cartes de lieux — proposition A validée le 11/10/2026
 * (_claude_docs/2026-10-11_refonte-bloc-lieux/propositions-bloc-lieux.html).
 *
 * Remplace la grille qui restait sur 1 colonne (les classes sm:/lg:grid-cols
 * n'étaient pas dans le CSS publié : 17 297 px pour 19 lieux sur l'article
 * Yvelines). La grille est en styles en ligne : brakt-blog.css remet à zéro
 * les utilitaires sur les pages du blog.
 *
 * Server Component : toutes les cartes et leurs liens sont dans le HTML servi
 * (Google, crawlers d'IA). Au-delà de LIMITE_CARTES lieux, les filtres et le
 * « Voir les N lieux » sont pris en charge côté client par FiltresCartesLieux.
 *
 * Seuls les lieux qui ont une photo de carte vérifiée sont affichés
 * (lib/photo-carte) : jamais de logo ni d'image floue.
 */

import Link from "next/link";
import Image from "next/image";
import type { Venue } from "@/data/venues";
import { photoCarte } from "@/lib/photo-carte";
import { LIMITE_CARTES, SEUIL_GRAND_GROUPE } from "@/lib/cartes-lieux";
import { FiltresCartesLieux } from "./FiltresCartesLieux";

const BRONZE = "#A37E2C";

interface CartesLieuxProps {
  /** Lieux déjà filtrés par avecPhotoCarte : le titre de l'appelant compte les mêmes. */
  lieux: Venue[];
  titre: string;
  texte: string;
  /** Repère d'analytics posé sur le bloc (data-cta). */
  cta: string;
}

const nombre = (n: number) => n.toLocaleString("fr-FR");

function Carte({ lieu, cta }: { lieu: Venue; cta: string }) {
  const photo = photoCarte(lieu);
  const salles = lieu.sallesReunion ?? lieu.salles.length;
  return (
    <Link
      href={`/lieux/${lieu.slug}`}
      data-cta={`${cta}:${lieu.slug}`}
      data-carte-lieu=""
      data-chambres={lieu.chambres ? "1" : "0"}
      data-capacite={lieu.capacite}
      className="group"
      style={{ display: "flex", flexDirection: "column", background: "white", borderRadius: "12px", border: "1px solid #E5E7EB", overflow: "hidden", textDecoration: "none", color: "inherit" }}
    >
      {/* Photo décorative : le nom du lieu suit en texte (alt vide, pas de doublon à l'écoute). */}
      <div style={{ position: "relative", aspectRatio: "3 / 2", background: "#F3F4F6", overflow: "hidden" }}>
        {photo && (
          <Image
            src={photo.url}
            alt=""
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 340px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
      </div>
      <div style={{ padding: "12px 14px 14px", display: "flex", flexDirection: "column", gap: "6px" }}>
        <span style={{ fontSize: "0.6875rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: BRONZE }}>
          {lieu.ville}
        </span>
        <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "#111827", margin: 0, lineHeight: 1.3 }}>{lieu.nom}</h3>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "2px" }}>
          {[
            `jusqu'à ${nombre(lieu.capacite)} pers.`,
            lieu.chambres ? `${nombre(lieu.chambres)} chambres` : "sans hébergement",
            salles ? `${salles} salle${salles > 1 ? "s" : ""}` : null,
          ]
            .filter(Boolean)
            .map((f) => (
              <span key={f} style={{ fontSize: "0.75rem", background: "#F1E9D8", color: "#4B3A12", borderRadius: "6px", padding: "2px 8px" }}>
                {f}
              </span>
            ))}
        </div>
      </div>
    </Link>
  );
}

export function CartesLieux({ lieux, titre, texte, cta }: CartesLieuxProps) {
  const affiches = lieux.filter((l) => photoCarte(l) !== null);
  if (!affiches.length) return null;

  const limitee = affiches.length > LIMITE_CARTES;
  const grille = (
    <div
      data-grille-lieux=""
      {...(limitee ? { "data-cartes-limitees": "" } : {})}
      style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "16px" }}
    >
      {affiches.map((l) => (
        <Carte key={l.slug} lieu={l} cta={cta} />
      ))}
    </div>
  );

  return (
    <section className="w-full flex justify-center" style={{ padding: "40px 20px", background: "#FFFFFF" }}>
      {/* Masquage des cartes au-delà de la limite dès le HTML servi : pas de saut de mise en
          page à l'hydratation. !important : la carte porte un display:flex en ligne, qui
          l'emporte sinon sur la feuille (17 cartes visibles avant hydratation, mesuré le 11/10). Les liens restent dans le HTML. FiltresCartesLieux retire
          l'attribut quand un filtre ou « Voir les N lieux » prend la main. */}
      {limitee && (
        <style>{`[data-cartes-limitees] > [data-carte-lieu]:nth-child(n+${LIMITE_CARTES + 1}){display:none!important}`}</style>
      )}
      <div className="w-full max-w-5xl" data-cta={cta}>
        <h2 className="text-2xl sm:text-3xl font-light italic text-gray-900 text-center" style={{ margin: "0 0 10px" }}>
          {titre}
        </h2>
        <p className="text-center text-gray-600" style={{ maxWidth: "640px", margin: "0 auto 22px", fontSize: "1rem", lineHeight: 1.6 }}>
          {texte}
        </p>
        {limitee ? (
          <FiltresCartesLieux
            total={affiches.length}
            avecChambres={affiches.filter((l) => l.chambres).length}
            grands={affiches.filter((l) => l.capacite >= SEUIL_GRAND_GROUPE).length}
          >
            {grille}
          </FiltresCartesLieux>
        ) : (
          grille
        )}
        <p className="text-center" style={{ margin: "24px 0 0" }}>
          <Link href="/lieux" style={{ color: BRONZE, fontWeight: 600, textDecoration: "underline" }}>
            Voir tous les lieux de notre sélection
          </Link>
        </p>
      </div>
    </section>
  );
}

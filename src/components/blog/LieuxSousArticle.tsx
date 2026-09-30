/**
 * Trois fiches /lieux sous un article — plan conversion, phase 4 (30/09/2026).
 * Server Component : les liens partent dans le HTML servi, lisibles par Google
 * et les crawlers d'IA. Le choix des lieux vit dans lib/lieux-article, la liste
 * des articles concernés (pilote) dans data/pilote-lieux-articles.
 *
 * Styles en ligne : brakt-blog.css remet à zéro les paddings des classes
 * utilitaires sur les pages du blog.
 */

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { Venue } from "@/data/venues";

const BRONZE = "#A37E2C";

interface LieuxSousArticleProps {
  lieux: Venue[];
  titre: string;
  texte: string;
}

export function LieuxSousArticle({ lieux, titre, texte }: LieuxSousArticleProps) {
  if (!lieux.length) return null;
  return (
    <section className="w-full flex justify-center" style={{ padding: "40px 20px", background: "#FFFFFF" }}>
      <div className="w-full max-w-5xl" data-cta="article-lieux">
        <h2 className="text-2xl sm:text-3xl font-light italic text-gray-900 text-center" style={{ margin: "0 0 10px" }}>
          {titre}
        </h2>
        <p className="text-center text-gray-600" style={{ maxWidth: "640px", margin: "0 auto 28px", fontSize: "1rem", lineHeight: 1.6 }}>
          {texte}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" style={{ gap: "20px" }}>
          {lieux.map((l) => (
            <Link
              key={l.slug}
              href={`/lieux/${l.slug}`}
              data-cta={`article-lieux:${l.slug}`}
              className="group block overflow-hidden"
              style={{ background: "white", borderRadius: "16px", border: "1px solid #E5E7EB", textDecoration: "none" }}
            >
              {/* Photo décorative : le nom du lieu suit en texte (alt vide, pas de doublon à l'écoute). */}
              <div className="relative overflow-hidden" style={{ aspectRatio: "4 / 3", background: "#F3F4F6" }}>
                {l.photos[0] && (
                  <Image
                    src={l.photos[0].url}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                )}
              </div>
              <div style={{ padding: "16px 18px" }}>
                <div style={{ fontSize: "0.6875rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: BRONZE, marginBottom: "6px" }}>
                  {[l.ville, l.departement].filter(Boolean).join(" · ")}
                </div>
                <h3 style={{ fontSize: "1.0625rem", fontWeight: 600, color: "#111827", margin: "0 0 10px", lineHeight: 1.3 }}>
                  {l.nom}
                </h3>
                <div className="flex items-center justify-between" style={{ fontSize: "0.8125rem", color: "#4B5563" }}>
                  <span>Jusqu&apos;à {l.capacite} pers.{l.chambres ? ` · ${l.chambres} chambres` : ""}</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" style={{ color: BRONZE }} />
                </div>
              </div>
            </Link>
          ))}
        </div>
        <p className="text-center" style={{ margin: "24px 0 0" }}>
          <Link href="/lieux" style={{ color: BRONZE, fontWeight: 600, textDecoration: "underline" }}>
            Voir tous les lieux de notre sélection
          </Link>
        </p>
      </div>
    </section>
  );
}

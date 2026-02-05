"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check, Sparkles, PartyPopper, Zap, ArrowLeft } from "lucide-react";

export default function MerciContent() {
  const searchParams = useSearchParams();
  const ref = searchParams.get("ref") || Math.random().toString(36).substr(2, 9).toUpperCase();

  useEffect(() => {
    if (typeof window !== "undefined" && window.gtag) {
      // Track conversion Google Ads (avec send_to pour attribution)
      const adsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
      const convLabel = process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL;
      if (adsId && convLabel) {
        window.gtag("event", "conversion", {
          send_to: `${adsId}/${convLabel}`,
          value: 1.0,
          currency: "EUR",
          transaction_id: ref,
        });
      }

      // Track conversion GA4
      window.gtag("event", "generate_lead", {
        event_category: "form",
        event_label: "devis_submitted",
        value: 1,
        currency: "EUR",
      });
    }
  }, [ref]);

  return (
    <div style={{ minHeight: "100vh", background: "#FFFFFF", paddingTop: "80px" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "clamp(3rem, 8vw, 5rem) clamp(1.5rem, 4vw, 2.5rem)" }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotateX: -20 }}
          animate={{ opacity: 1, scale: 1, rotateX: 0 }}
          transition={{
            duration: 0.8,
            type: "spring",
            stiffness: 100,
            damping: 15
          }}
          style={{
            padding: "clamp(3rem, 8vw, 5rem) clamp(1.5rem, 4vw, 2.5rem)",
            background: "linear-gradient(135deg, #FFFFFF 0%, #F9FAFB 100%)",
            borderRadius: "2rem",
            boxShadow: "0 20px 60px rgba(163, 126, 44, 0.15), 0 0 0 1px rgba(163, 126, 44, 0.1)",
            textAlign: "center",
          }}
        >
          {/* Animation du badge de succès */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              delay: 0.2,
              duration: 0.8,
              type: "spring",
              stiffness: 200,
              damping: 15
            }}
            className="relative mx-auto mb-8"
            style={{ width: "120px", height: "120px" }}
          >
            {/* Cercle extérieur animé */}
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute inset-0 rounded-full"
              style={{
                background: "linear-gradient(135deg, rgba(163, 126, 44, 0.2) 0%, rgba(212, 175, 55, 0.2) 100%)",
              }}
            />

            {/* Badge principal */}
            <div
              className="absolute inset-0 rounded-full flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, #10B981 0%, #059669 100%)",
                boxShadow: "0 10px 30px rgba(16, 185, 129, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3)",
              }}
            >
              <Check style={{ width: "64px", height: "64px", color: "#FFFFFF" }} strokeWidth={3} />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            style={{
              fontSize: "clamp(2rem, 5vw, 3rem)",
              fontWeight: 700,
              color: "#1F2937",
              marginBottom: "1.5rem",
            }}
          >
            Demande envoyée avec succès !
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <p
              style={{
                fontSize: "clamp(1.125rem, 3vw, 1.375rem)",
                color: "#4B5563",
                marginBottom: "2.5rem",
                lineHeight: 1.6,
              }}
            >
              Merci pour votre confiance ! Notre équipe d'experts vous contactera dans les{" "}
              <span style={{ fontWeight: 700, color: "#A37E2C" }}>24 heures</span>{" "}
              pour discuter de votre projet et établir un devis personnalisé.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
            style={{
              background: "linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)",
              borderRadius: "1rem",
              padding: "clamp(1.5rem, 4vw, 2rem)",
              border: "2px solid #FCD34D",
              boxShadow: "0 4px 16px rgba(252, 211, 77, 0.3)",
              marginBottom: "2rem",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem", marginBottom: "1rem" }}>
              <Sparkles style={{ width: "20px", height: "20px", color: "#A37E2C" }} />
              <p style={{ fontWeight: 700, color: "#78350F", fontSize: "1.125rem" }}>
                Numéro de référence
              </p>
              <Sparkles style={{ width: "20px", height: "20px", color: "#A37E2C" }} />
            </div>
            <p
              style={{
                fontSize: "clamp(1.25rem, 4vw, 1.75rem)",
                fontWeight: 800,
                color: "#A37E2C",
                letterSpacing: "0.05em",
                fontFamily: "monospace",
              }}
            >
              #DEV{ref}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              alignItems: "center",
              marginBottom: "2rem",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#6B7280" }}>
              <PartyPopper style={{ width: "20px", height: "20px", color: "#A37E2C" }} />
              <p style={{ fontSize: "0.95rem", color: "#6B7280" }}>Un conseiller dédié va analyser votre demande</p>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#6B7280" }}>
              <Zap style={{ width: "20px", height: "20px", color: "#A37E2C" }} />
              <p style={{ fontSize: "0.95rem", color: "#6B7280" }}>Vous recevrez un devis personnalisé par email</p>
            </div>
          </motion.div>

          {/* Bouton retour */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <Link
              href="/"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "1rem 2rem",
                background: "linear-gradient(135deg, #D4AF37 0%, #A37E2C 100%)",
                color: "#FFFFFF",
                borderRadius: "9999px",
                fontWeight: 600,
                textDecoration: "none",
                boxShadow: "0 4px 16px rgba(163, 126, 44, 0.3)",
                transition: "all 0.3s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 8px 24px rgba(163, 126, 44, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 16px rgba(163, 126, 44, 0.3)";
              }}
            >
              <ArrowLeft style={{ width: "20px", height: "20px" }} />
              Retour à l'accueil
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

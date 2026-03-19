"use client";

import { useEffect, useState } from "react";
import { Phone, FileText } from "lucide-react";
import { trackPhoneClick } from "@/components/Analytics";

export function StickyCtaBar() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
          background: "rgba(255, 255, 255, 0.97)",
          backdropFilter: "blur(16px)",
          borderTop: "1px solid rgba(163, 126, 44, 0.15)",
          boxShadow: "0 -4px 24px rgba(0, 0, 0, 0.1)",
          padding: "clamp(10px, 2vw, 14px) clamp(16px, 4vw, 32px)",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "center", gap: "12px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", flexShrink: 0 }}>
            <a
              href="tel:+33757991146"
              onClick={() => trackPhoneClick()}
              className="badge-lg border-2 border-white/40 bg-black/40 backdrop-blur-md text-white font-semibold text-sm hover:bg-black/50 transition-all"
              style={{ textDecoration: "none", whiteSpace: "nowrap", color: "white" }}
            >
              <Phone className="w-4 h-4" style={{ color: "white" }} />
              <span className="hidden sm:inline">07 57 99 11 46</span>
              <span className="sm:hidden">Appeler</span>
            </a>
            <a
              href="/devis#formulaire"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "10px 20px",
                borderRadius: "9999px",
                background: "linear-gradient(135deg, #D4AF37 0%, #A37E2C 100%)",
                color: "#FFFFFF",
                fontWeight: 700,
                fontSize: "13px",
                textDecoration: "none",
                boxShadow: "0 4px 12px rgba(163, 126, 44, 0.3)",
                transition: "all 0.2s",
                whiteSpace: "nowrap",
              }}
            >
              <FileText style={{ width: "16px", height: "16px" }} />
              Devis Gratuit
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

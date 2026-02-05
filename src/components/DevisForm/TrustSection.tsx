import { Clock, CheckCircle, Award } from "lucide-react";

export function TrustSection() {
  const trustItems = [
    {
      value: "24h",
      label: "Réponse garantie sous 24 heures",
      delay: 0.1,
      icon: Clock,
      color: "#10B981",
    },
    {
      value: "100%",
      label: "Devis personnalisé et sans engagement",
      delay: 0.2,
      icon: CheckCircle,
      color: "#A37E2C",
    },
    {
      value: "15+",
      label: "Années d'expertise événementielle",
      delay: 0.3,
      icon: Award,
      color: "#D4AF37",
    },
  ];

  return (
    <div
      className="animate-fade-in"
      style={{
        marginBottom: "clamp(2.5rem, 5vw, 4rem)",
        width: "100%",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "clamp(1.5rem, 3vw, 2rem)",
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >
        {trustItems.map((item, index) => {
          const IconComponent = item.icon;
          return (
            <div
              key={item.value}
              className="animate-fade-in hover-lift"
              style={{
                background: "linear-gradient(135deg, #FFFFFF 0%, #F9FAFB 100%)",
                borderRadius: "1rem",
                padding: "1.25rem",
                border: "2px solid #E5E7EB",
                boxShadow: "0 4px 20px rgba(163, 126, 44, 0.08)",
                cursor: "pointer",
                position: "relative",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column" as const,
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center" as const,
                minHeight: "160px",
                animationDelay: `${item.delay}s`,
              }}
            >
              {/* Shimmer effect background */}
              <div
                className="shimmer"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  background: "linear-gradient(90deg, transparent 0%, rgba(163, 126, 44, 0.05) 50%, transparent 100%)",
                  pointerEvents: "none",
                  animationDelay: `${index * 0.5}s`,
                }}
              />

              {/* Icon */}
              <div
                className="animate-scale-in"
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%",
                  background: `linear-gradient(135deg, ${item.color}15 0%, ${item.color}25 100%)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "0.75rem",
                  position: "relative",
                  zIndex: 1,
                  animationDelay: `${item.delay + 0.2}s`,
                  transition: "transform 0.6s ease",
                }}
              >
                <IconComponent
                  style={{
                    width: "26px",
                    height: "26px",
                    color: item.color,
                  }}
                  strokeWidth={2.5}
                />
              </div>

              {/* Valeur */}
              <div
                className="animate-scale-in"
                style={{
                  fontSize: "2rem",
                  fontWeight: 800,
                  background: `linear-gradient(135deg, ${item.color} 0%, #A37E2C 100%)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  marginBottom: "0.5rem",
                  lineHeight: 1,
                  position: "relative",
                  zIndex: 1,
                  animationDelay: `${item.delay + 0.3}s`,
                }}
              >
                {item.value}
              </div>

              {/* Label */}
              <p
                className="animate-fade-only"
                style={{
                  fontSize: "0.875rem",
                  color: "#6B7280",
                  lineHeight: 1.5,
                  fontWeight: 500,
                  maxWidth: "280px",
                  position: "relative",
                  zIndex: 1,
                  animationDelay: `${item.delay + 0.4}s`,
                }}
              >
                {item.label}
              </p>

              {/* Decorative corner */}
              <div
                className="animate-scale-in"
                style={{
                  position: "absolute",
                  top: "0.75rem",
                  right: "0.75rem",
                  width: "30px",
                  height: "30px",
                  borderRadius: "50%",
                  background: `${item.color}10`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  animationDelay: `${item.delay + 0.5}s`,
                }}
              >
                <div
                  style={{
                    width: "15px",
                    height: "15px",
                    borderRadius: "50%",
                    background: `${item.color}30`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

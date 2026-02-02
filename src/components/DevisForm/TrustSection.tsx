import { motion } from "framer-motion";
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
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
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
            <motion.div
              key={item.value}
              initial={{ opacity: 0, y: 40, rotateX: -15 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{
                duration: 0.8,
                delay: item.delay,
                ease: [0.19, 1, 0.22, 1],
              }}
              whileHover={{
                y: -8,
                scale: 1.02,
                transition: { duration: 0.3 },
              }}
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
              }}
            >
              {/* Shimmer effect background */}
              <motion.div
                animate={{
                  x: ["-100%", "100%"],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                  delay: index * 0.5,
                }}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  background: "linear-gradient(90deg, transparent 0%, rgba(163, 126, 44, 0.05) 50%, transparent 100%)",
                  pointerEvents: "none",
                }}
              />

              {/* Icon animé */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{
                  duration: 0.8,
                  delay: item.delay + 0.2,
                  type: "spring",
                  stiffness: 200,
                }}
                whileHover={{ rotate: 360 }}
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
              </motion.div>

              {/* Valeur avec animation de compteur */}
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  duration: 0.6,
                  delay: item.delay + 0.3,
                  type: "spring",
                  stiffness: 150,
                }}
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
                }}
              >
                {item.value}
              </motion.div>

              {/* Label */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: item.delay + 0.4 }}
                style={{
                  fontSize: "0.875rem",
                  color: "#6B7280",
                  lineHeight: 1.5,
                  fontWeight: 500,
                  maxWidth: "280px",
                  position: "relative",
                  zIndex: 1,
                }}
              >
                {item.label}
              </motion.p>

              {/* Decorative corner */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6, delay: item.delay + 0.5 }}
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
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

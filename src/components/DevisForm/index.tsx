"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ArrowRight, ArrowLeft, Sparkles, PartyPopper, Zap } from "lucide-react";
import type ConfettiType from "canvas-confetti";

const getConfetti = () => import("canvas-confetti").then(mod => mod.default);
import { formSchema, type FormData } from "./types";
import { TrustSection } from "./TrustSection";
import { ProgressBar } from "./ProgressBar";
import { Step1EventType } from "./Step1EventType";
import { Step2DateDuration } from "./Step2DateDuration";
import { Step3ChateauSelection } from "./Step3ChateauSelection";
import { Step4ContactForm } from "./Step4ContactForm";

// Styles pour les sliders et focus
const styleSheet = `
  .range-slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: linear-gradient(135deg, #D4AF37 0%, #A37E2C 100%);
    cursor: pointer;
    box-shadow: 0 4px 12px rgba(163, 126, 44, 0.5), 0 0 0 0 rgba(163, 126, 44, 0.4);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }

  @keyframes pulse {
    0%, 100% {
      box-shadow: 0 4px 12px rgba(163, 126, 44, 0.5), 0 0 0 0 rgba(163, 126, 44, 0.4);
    }
    50% {
      box-shadow: 0 4px 16px rgba(163, 126, 44, 0.6), 0 0 0 8px rgba(163, 126, 44, 0);
    }
  }

  .range-slider::-webkit-slider-thumb:hover {
    transform: scale(1.3);
    box-shadow: 0 6px 20px rgba(163, 126, 44, 0.7), 0 0 20px rgba(212, 175, 55, 0.5);
  }

  .range-slider::-webkit-slider-thumb:active {
    transform: scale(1.15);
  }

  .range-slider::-moz-range-thumb {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: linear-gradient(135deg, #D4AF37 0%, #A37E2C 100%);
    cursor: pointer;
    border: none;
    box-shadow: 0 4px 12px rgba(163, 126, 44, 0.5);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .range-slider::-moz-range-thumb:hover {
    transform: scale(1.3);
    box-shadow: 0 6px 20px rgba(163, 126, 44, 0.7), 0 0 20px rgba(212, 175, 55, 0.5);
  }

  input[type="file"]::file-selector-button {
    color: #1f2937;
    font-weight: 600;
    padding: 0.75rem 1.5rem;
    border-radius: 9999px;
    background: linear-gradient(135deg, #F3F4F6 0%, #E5E7EB 100%);
    border: 2px solid #D1D5DB;
    cursor: pointer;
    transition: all 0.3s;
  }

  input[type="file"]::file-selector-button:hover {
    background: linear-gradient(135deg, #E5E7EB 0%, #D1D5DB 100%);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  input[type="text"]:focus,
  input[type="email"]:focus,
  input[type="tel"]:focus,
  input[type="date"]:focus,
  input[type="file"]:focus,
  textarea:focus,
  input[type="checkbox"]:focus,
  input[type="range"]:focus,
  button:focus {
    outline: 3px solid #A37E2C !important;
    outline-offset: 3px;
    border-color: #A37E2C !important;
    box-shadow: 0 0 0 4px rgba(163, 126, 44, 0.1), 0 8px 24px rgba(163, 126, 44, 0.2) !important;
  }

  input[type="checkbox"]:checked {
    accent-color: #A37E2C;
    transform: scale(1.1);
    transition: transform 0.2s;
  }

  textarea {
    resize: vertical;
    position: relative;
  }

  textarea::-webkit-resizer {
    background:
      linear-gradient(135deg, transparent 6px, #D4AF37 6px, #D4AF37 8px, transparent 8px),
      linear-gradient(135deg, transparent 10px, #C4A049 10px, #C4A049 12px, transparent 12px),
      linear-gradient(135deg, transparent 14px, #A37E2C 14px, #A37E2C 16px, transparent 16px);
    background-position: bottom right;
    background-repeat: no-repeat;
    filter: drop-shadow(2px 2px 3px rgba(0, 0, 0, 0.3));
  }

  @keyframes shimmer {
    0% {
      background-position: -1000px 0;
    }
    100% {
      background-position: 1000px 0;
    }
  }

  .shimmer {
    animation: shimmer 3s infinite;
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.3) 50%,
      rgba(255, 255, 255, 0) 100%
    );
    background-size: 1000px 100%;
  }
`;

// Messages encourageants personnalisés par étape
const encouragingMessages = {
  1: [
    "Excellent choix ! 🎯",
    "Parfait ! Continuons... ✨",
    "Super ! On avance bien 🚀",
  ],
  2: [
    "Génial ! Presque terminé 🎉",
    "Vous êtes sur la bonne voie ! 💪",
    "Fantastique ! Une étape de plus ⭐",
  ],
  3: [
    "Magnifique sélection ! 🏰",
    "Excellent goût ! 👌",
    "Wow, beau choix de château ! 🎭",
  ],
  4: [
    "Dernière ligne droite ! 🏁",
    "Plus qu'un instant ! ⚡",
    "C'est presque fini ! 🎊",
  ],
};

// Fonction pour lancer des confettis (lazy-loaded)
const fireConfetti = async () => {
  const confetti = await getConfetti();
  const count = 200;
  const defaults = {
    origin: { y: 0.7 },
    zIndex: 9999,
  };

  function fire(particleRatio: number, opts: any) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
      colors: ["#A37E2C", "#D4AF37", "#C09448", "#8A6823", "#B8860B"],
    });
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
  });

  fire(0.2, {
    spread: 60,
  });

  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
  });

  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
  });

  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  });
};

export function DevisForm() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [validatedSteps, setValidatedSteps] = useState<Set<number>>(new Set());
  const [showEncouragement, setShowEncouragement] = useState(false);
  const [encouragementMessage, setEncouragementMessage] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors },
    trigger,
    clearErrors,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      nombreParticipants: 50,
      nombreChambres: 10,
      plusDe500Participants: false,
      plusDe400Chambres: false,
      chambresTwin: false,
      chateauIds: [],
    },
  });

  const watchedValues = watch();

  // Afficher les erreurs uniquement si l'étape a été validée au moins une fois
  const shouldShowErrors = validatedSteps.has(currentStep) || isSubmitted;
  const displayedErrors = shouldShowErrors ? errors : {};

  // Animation de célébration quand on passe à l'étape suivante
  const showEncouragementMessage = async (step: number) => {
    const messages = encouragingMessages[step as keyof typeof encouragingMessages];
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    setEncouragementMessage(randomMessage);
    setShowEncouragement(true);

    // Petit confetti pour chaque étape complétée (lazy-loaded)
    if (step > 1) {
      const confetti = await getConfetti();
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
        colors: ["#A37E2C", "#D4AF37"],
        zIndex: 9999,
      });
    }

    setTimeout(() => {
      setShowEncouragement(false);
    }, 2000);
  };

  const nextStep = async () => {
    // Marquer l'étape comme validée pour afficher les erreurs
    setValidatedSteps((prev) => new Set(prev).add(currentStep));

    let isValid = false;

    switch (currentStep) {
      case 1:
        isValid = await trigger("typeEvenement");
        break;
      case 2:
        isValid = await trigger(["datesSouhaitees", "duree"]);
        break;
      case 3:
        isValid = await trigger("chateauIds");
        break;
    }

    if (isValid) {
      const nextStepNumber = Math.min(currentStep + 1, 4);
      setCurrentStep(nextStepNumber);
      showEncouragementMessage(nextStepNumber);
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const onSubmit = async (data: FormData) => {
    setValidatedSteps(new Set([1, 2, 3, 4]));
    try {
      const response = await fetch("/api/devis", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        alert(
          result.error ||
            "Une erreur est survenue lors de l'envoi de votre demande. Veuillez réessayer."
        );
        return;
      }

      // Générer un numéro de référence unique
      const ref = Math.random().toString(36).substr(2, 9).toUpperCase();

      // Rediriger vers la page de succès avec tracking automatique
      router.push(`/devis/merci?ref=${ref}`);
    } catch (error) {
      alert("Une erreur inattendue est survenue. Veuillez réessayer.");
    }
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8, rotateX: -20 }}
        animate={{ opacity: 1, scale: 1, rotateX: 0 }}
        transition={{
          duration: 0.8,
          type: "spring",
          stiffness: 100,
          damping: 15
        }}
        className="max-w-3xl mx-auto text-center"
        style={{
          padding: "clamp(3rem, 8vw, 5rem) clamp(1.5rem, 4vw, 2.5rem)",
          background: "linear-gradient(135deg, #FFFFFF 0%, #F9FAFB 100%)",
          borderRadius: "2rem",
          boxShadow: "0 20px 60px rgba(163, 126, 44, 0.15), 0 0 0 1px rgba(163, 126, 44, 0.1)",
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
            <Check className="w-16 h-16 text-white" strokeWidth={3} />
          </div>

          {/* Particules brillantes */}
          <motion.div
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute inset-0"
          >
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1, 0] }}
                transition={{
                  delay: 0.5 + i * 0.1,
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 1,
                }}
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: "#D4AF37",
                  transform: `rotate(${i * 45}deg) translateX(70px)`,
                  boxShadow: "0 0 10px #D4AF37",
                }}
              />
            ))}
          </motion.div>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          style={{
            fontSize: "clamp(2rem, 5vw, 3rem)",
            fontWeight: 700,
            background: "linear-gradient(135deg, #1F2937 0%, #374151 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            marginBottom: "1.5rem",
          }}
        >
          Demande envoyée avec succès !
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <p
            style={{
              fontSize: "clamp(1.125rem, 3vw, 1.375rem)",
              color: "#6B7280",
              marginBottom: "2.5rem",
              lineHeight: 1.6,
            }}
          >
            Merci pour votre confiance ! Notre équipe d'experts vous contactera dans les{" "}
            <span
              style={{
                fontWeight: 700,
                color: "#A37E2C",
              }}
            >
              24 heures
            </span>{" "}
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
            <Sparkles className="w-5 h-5 text-[#A37E2C]" />
            <p style={{ fontWeight: 700, color: "#78350F", fontSize: "1.125rem" }}>
              Numéro de référence
            </p>
            <Sparkles className="w-5 h-5 text-[#A37E2C]" />
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
            #DEV{Math.random().toString(36).substr(2, 9).toUpperCase()}
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
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#6B7280" }}>
            <PartyPopper className="w-5 h-5 text-[#A37E2C]" />
            <p style={{ fontSize: "0.95rem" }}>Un conseiller dédié va analyser votre demande</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#6B7280" }}>
            <Zap className="w-5 h-5 text-[#A37E2C]" />
            <p style={{ fontSize: "0.95rem" }}>Vous recevrez un devis personnalisé par email</p>
          </div>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <>
      <style>{styleSheet}</style>
      <style>{`
        .devis-nav-buttons {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1rem;
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(16px);
          padding: 0.75rem clamp(1.25rem, 5vw, 2.5rem);
          border-top: 1px solid #e5e7eb;
          z-index: 50;
          box-shadow: 0 -4px 24px rgba(0, 0, 0, 0.08);
        }
        @media (max-width: 480px) {
          .devis-nav-buttons {
            padding: 0.625rem 1rem;
          }
        }
      `}</style>
      <div id="formulaire" className="max-w-5xl mx-auto">
        {/* Message d'encouragement flottant */}
        <AnimatePresence>
          {showEncouragement && (
            <motion.div
              initial={{ opacity: 0, y: -50, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -50, scale: 0.8 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              style={{
                position: "fixed",
                top: "100px",
                left: "50%",
                transform: "translateX(-50%)",
                zIndex: 9999,
                background: "linear-gradient(135deg, #10B981 0%, #059669 100%)",
                color: "white",
                padding: "1rem 2rem",
                borderRadius: "9999px",
                fontSize: "1.25rem",
                fontWeight: 700,
                boxShadow: "0 10px 40px rgba(16, 185, 129, 0.5), 0 0 0 4px rgba(16, 185, 129, 0.1)",
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
              }}
            >
              <Sparkles className="w-6 h-6" />
              {encouragementMessage}
            </motion.div>
          )}
        </AnimatePresence>

        <TrustSection />
        <ProgressBar currentStep={currentStep} />

        <form onSubmit={handleSubmit(onSubmit)}>
          <AnimatePresence mode="wait">
            {currentStep === 1 && (
              <Step1EventType
                selectedType={watchedValues.typeEvenement}
                setValue={setValue}
                trigger={trigger}
                setCurrentStep={setCurrentStep}
                errors={displayedErrors}
              />
            )}

            {currentStep === 2 && (
              <Step2DateDuration
                register={register}
                setValue={setValue}
                trigger={trigger}
                getValues={getValues}
                setCurrentStep={setCurrentStep}
                selectedDuree={watchedValues.duree}
                errors={displayedErrors}
              />
            )}

            {currentStep === 3 && (
              <Step3ChateauSelection
                selectedChateauIds={watchedValues.chateauIds}
                setValue={setValue}
                errors={displayedErrors}
                shouldValidate={shouldShowErrors}
              />
            )}

            {currentStep === 4 && (
              <Step4ContactForm
                register={register}
                errors={displayedErrors}
                nombreParticipants={watchedValues.nombreParticipants}
                nombreChambres={watchedValues.nombreChambres}
                budget={watchedValues.budget}
                onBudgetChange={(budget) => {
                  setValue("budget", budget, { shouldValidate: shouldShowErrors });
                }}
              />
            )}
          </AnimatePresence>

          {/* Navigation buttons - sticky en bas pour toujours être visible */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="devis-nav-buttons"
          >
            {currentStep > 1 ? (
              <motion.button
                whileHover={{ scale: 1.05, x: -5 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                onClick={prevStep}
                style={{
                  padding: "clamp(0.875rem, 2vw, 1.125rem) clamp(1.75rem, 4vw, 2.5rem)",
                  background: "linear-gradient(135deg, #F3F4F6 0%, #E5E7EB 100%)",
                  border: "2px solid #D1D5DB",
                  borderRadius: "9999px",
                  cursor: "pointer",
                  transition: "all 0.3s",
                  fontSize: "clamp(0.95rem, 2vw, 1.05rem)",
                  fontWeight: 600,
                  color: "#374151",
                }}
                className="flex items-center gap-2 shadow-md hover:shadow-xl"
              >
                <ArrowLeft className="w-5 h-5" />
                Précédent
              </motion.button>
            ) : (
              <div />
            )}

            {currentStep < 4 ? (
              <motion.button
                whileHover={{ scale: 1.05, x: 5 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                onClick={nextStep}
                style={{
                  padding: "clamp(0.875rem, 2vw, 1.125rem) clamp(1.75rem, 4vw, 2.5rem)",
                  background: "linear-gradient(135deg, #D4AF37 0%, #A37E2C 100%)",
                  border: "none",
                  borderRadius: "9999px",
                  cursor: "pointer",
                  transition: "all 0.3s",
                  fontSize: "clamp(0.95rem, 2vw, 1.05rem)",
                  fontWeight: 600,
                  color: "white",
                  position: "relative",
                  overflow: "hidden",
                }}
                className="flex items-center gap-2 shadow-lg hover:shadow-2xl"
              >
                <span className="shimmer" style={{ position: "absolute", inset: 0 }} />
                <span style={{ position: "relative" }}>Suivant</span>
                <ArrowRight className="w-5 h-5" style={{ position: "relative" }} />
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                onClick={() => setValidatedSteps((prev) => new Set(prev).add(4))}
                style={{
                  padding: "clamp(0.875rem, 2vw, 1.125rem) clamp(1.75rem, 4vw, 2.5rem)",
                  background: "linear-gradient(135deg, #10B981 0%, #059669 100%)",
                  border: "none",
                  borderRadius: "9999px",
                  cursor: "pointer",
                  transition: "all 0.3s",
                  fontSize: "clamp(0.95rem, 2vw, 1.05rem)",
                  fontWeight: 600,
                  color: "white",
                  position: "relative",
                  overflow: "hidden",
                }}
                className="flex items-center gap-2 shadow-lg hover:shadow-2xl"
              >
                <span className="shimmer" style={{ position: "absolute", inset: 0 }} />
                <span style={{ position: "relative" }}>Envoyer ma demande</span>
                <Check className="w-5 h-5" style={{ position: "relative" }} />
              </motion.button>
            )}
          </motion.div>
        </form>
      </div>
    </>
  );
}

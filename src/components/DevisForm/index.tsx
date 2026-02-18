"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ArrowRight, ArrowLeft, Sparkles, PartyPopper, Zap } from "lucide-react";
import { formSchema, type FormData } from "./types";
import { TrustSection } from "./TrustSection";
import { ProgressBar } from "./ProgressBar";
import { Step1EventType } from "./Step1EventType";
import { Step2DateDuration } from "./Step2DateDuration";
import { Step3ChateauSelection } from "./Step3ChateauSelection";
import { Step4ContactForm } from "./Step4ContactForm";
import { trackFormSubmit, trackDevisRequest } from "@/components/Analytics";

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


export function DevisForm() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [validatedSteps, setValidatedSteps] = useState<Set<number>>(new Set());

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
      setCurrentStep(Math.min(currentStep + 1, 4));
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

      // Tracking GA4/Ads
      trackFormSubmit("devis");
      trackDevisRequest(data.chateauIds);

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
      <div
        className="max-w-3xl mx-auto text-center animate-scale-in"
        style={{
          padding: "clamp(3rem, 8vw, 5rem) clamp(1.5rem, 4vw, 2.5rem)",
          background: "linear-gradient(135deg, #FFFFFF 0%, #F9FAFB 100%)",
          borderRadius: "2rem",
          boxShadow: "0 20px 60px rgba(163, 126, 44, 0.15), 0 0 0 1px rgba(163, 126, 44, 0.1)",
        }}
      >
        {/* Animation du badge de succès */}
        <div
          className="relative mx-auto mb-8 animate-scale-in delay-200"
          style={{ width: "120px", height: "120px" }}
        >
          {/* Cercle extérieur animé */}
          <div
            className="absolute inset-0 rounded-full animate-bounce-gentle"
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
          <div
            className="absolute inset-0"
            style={{ animation: "spinOnce 20s linear infinite" }}
          >
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="animate-bounce-gentle"
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
                  animationDelay: `${0.5 + i * 0.1}s`,
                }}
              />
            ))}
          </div>
        </div>

        <h2
          className="animate-fade-in delay-400"
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
        </h2>

        <div className="animate-fade-in delay-500">
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
        </div>

        <div
          className="animate-scale-in delay-600"
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
        </div>

        <div
          className="animate-fade-only delay-800"
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
        </div>
      </div>
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
        <TrustSection />
        <ProgressBar currentStep={currentStep} />

        <form onSubmit={handleSubmit(onSubmit)}>
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

          {/* Navigation buttons - sticky en bas pour toujours être visible */}
          <div
            className="devis-nav-buttons animate-fade-in delay-300"
          >
            {currentStep > 1 ? (
              <button
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
                className="flex items-center gap-2 shadow-md hover:shadow-xl hover-scale active:scale-95"
              >
                <ArrowLeft className="w-5 h-5" />
                Précédent
              </button>
            ) : (
              <div />
            )}

            {currentStep < 4 ? (
              <button
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
                className="flex items-center gap-2 shadow-lg hover:shadow-2xl hover-scale active:scale-95"
              >
                <span className="shimmer" style={{ position: "absolute", inset: 0 }} />
                <span style={{ position: "relative" }}>Suivant</span>
                <ArrowRight className="w-5 h-5" style={{ position: "relative" }} />
              </button>
            ) : (
              <button
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
                className="flex items-center gap-2 shadow-lg hover:shadow-2xl hover-scale active:scale-95"
              >
                <span className="shimmer" style={{ position: "absolute", inset: 0 }} />
                <span style={{ position: "relative" }}>Envoyer ma demande</span>
                <Check className="w-5 h-5" style={{ position: "relative" }} />
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  );
}

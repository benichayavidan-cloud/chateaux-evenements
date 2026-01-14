"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ArrowRight, ArrowLeft } from "lucide-react";
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
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #a37e2c;
    cursor: pointer;
    box-shadow: 0 2px 8px rgba(163, 126, 44, 0.4);
    transition: all 0.3s;
  }

  .range-slider::-webkit-slider-thumb:hover {
    transform: scale(1.2);
    box-shadow: 0 4px 12px rgba(163, 126, 44, 0.6);
  }

  .range-slider::-moz-range-thumb {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #a37e2c;
    cursor: pointer;
    border: none;
    box-shadow: 0 2px 8px rgba(163, 126, 44, 0.4);
    transition: all 0.3s;
  }

  .range-slider::-moz-range-thumb:hover {
    transform: scale(1.2);
    box-shadow: 0 4px 12px rgba(163, 126, 44, 0.6);
  }

  input[type="file"]::file-selector-button {
    color: #1f2937;
    font-weight: 600;
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
    outline: 2px solid #a37e2c !important;
    outline-offset: 2px;
    border-color: #a37e2c !important;
  }

  input[type="checkbox"]:checked {
    accent-color: #a37e2c;
  }

  textarea {
    resize: vertical;
    position: relative;
  }

  textarea::-webkit-resizer {
    background:
      linear-gradient(135deg, transparent 6px, #b8902f 6px, #b8902f 8px, transparent 8px),
      linear-gradient(135deg, transparent 10px, #c4a049 10px, #c4a049 12px, transparent 12px),
      linear-gradient(135deg, transparent 14px, #a37e2c 14px, #a37e2c 16px, transparent 16px);
    background-position: bottom right;
    background-repeat: no-repeat;
    filter: drop-shadow(1px 1px 1px rgba(0, 0, 0, 0.2));
  }
`;

export function DevisForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors },
    trigger,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
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

  const nextStep = async () => {
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
      setCurrentStep((prev) => Math.min(prev + 1, 4));
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const onSubmit = async (data: FormData) => {
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

      setIsSubmitted(true);
    } catch (error) {
      alert("Une erreur inattendue est survenue. Veuillez réessayer.");
    }
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl mx-auto text-center py-12 px-5"
      >
        <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <Check className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-3xl lg:text-4xl font-bold mb-4">
          Demande envoyée avec succès !
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          Merci pour votre demande. Notre équipe vous contactera dans les 24
          heures pour discuter de votre projet et établir un devis personnalisé.
        </p>
        <div className="bg-gray-100 rounded-xl p-6">
          <p className="text-gray-600">
            <strong>Numéro de référence:</strong> #DEV
            {Math.random().toString(36).substr(2, 9).toUpperCase()}
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <>
      <style>{styleSheet}</style>
      <div className="max-w-5xl mx-auto">
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
                errors={errors}
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
                errors={errors}
              />
            )}

            {currentStep === 3 && (
              <Step3ChateauSelection
                selectedChateauIds={watchedValues.chateauIds}
                setValue={setValue}
                errors={errors}
              />
            )}

            {currentStep === 4 && (
              <Step4ContactForm
                register={register}
                errors={errors}
                nombreParticipants={watchedValues.nombreParticipants}
                nombreChambres={watchedValues.nombreChambres}
                budget={watchedValues.budget}
                onBudgetChange={(budget) => setValue("budget", budget)}
              />
            )}
          </AnimatePresence>

          {/* Navigation buttons */}
          <div className="flex justify-between gap-4 flex-wrap border-t border-gray-200" style={{ marginTop: "clamp(1.5rem, 3vw, 2rem)", paddingTop: "clamp(1rem, 2vw, 1.5rem)" }}>
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={prevStep}
                style={{ padding: "clamp(0.75rem, 2vw, 1rem) clamp(1.5rem, 3vw, 2rem)" }}
                className="flex items-center gap-2 bg-gray-200 text-gray-800 font-semibold rounded-full border-none cursor-pointer transition-all hover:bg-gray-300 text-sm lg:text-base"
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
                style={{ padding: "clamp(0.75rem, 2vw, 1rem) clamp(1.5rem, 3vw, 2rem)" }}
                className="flex items-center gap-2 bg-[#a37e2c] text-white font-semibold rounded-full border-none cursor-pointer transition-all shadow-lg hover:bg-[#8d6a24] text-sm lg:text-base"
              >
                Suivant
                <ArrowRight className="w-5 h-5" />
              </button>
            ) : (
              <button
                type="submit"
                style={{ padding: "clamp(0.75rem, 2vw, 1rem) clamp(1.5rem, 3vw, 2rem)" }}
                className="flex items-center gap-2 bg-[#a37e2c] text-white font-semibold rounded-full border-none cursor-pointer transition-all shadow-lg hover:bg-[#8d6a24] text-sm lg:text-base"
              >
                Envoyer ma demande
                <Check className="w-5 h-5" />
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  );
}

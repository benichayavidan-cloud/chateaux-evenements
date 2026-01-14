import { Check } from "lucide-react";

interface ProgressBarProps {
  currentStep: number;
}

export function ProgressBar({ currentStep }: ProgressBarProps) {
  return (
    <div style={{ marginBottom: "clamp(0.83rem, 1.66vw, 1.33rem)" }}>
      <div className="flex items-center">
        {[1, 2, 3, 4].map((step) => (
          <div
            key={step}
            className={step < 4 ? "flex items-center flex-1" : "flex items-center"}
          >
            <div className="flex flex-col items-center">
              <div
                className={`
                  w-8 h-8 lg:w-10 lg:h-10
                  rounded-full
                  flex items-center justify-center
                  font-bold
                  transition-all duration-300
                  mb-1 lg:mb-2
                  text-sm lg:text-base
                  ${step === currentStep
                    ? "bg-[#a37e2c] text-white"
                    : step < currentStep
                    ? "bg-green-500 text-white"
                    : "bg-gray-200 text-gray-400"
                  }
                `}
              >
                {step < currentStep ? (
                  <Check className="w-4 h-4 lg:w-5 lg:h-5" />
                ) : (
                  step
                )}
              </div>
              <span className="text-xs lg:text-sm text-gray-600 whitespace-nowrap">
                {["Type", "Dates", "Château", "Formulaire"][step - 1]}
              </span>
            </div>
            {step < 4 && (
              <div className="flex-1 h-2 mx-2 bg-gray-200 rounded-full overflow-hidden mb-7">
                <div
                  className="h-full bg-[#a37e2c] transition-all duration-300"
                  style={{ width: step < currentStep ? "100%" : "0%" }}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

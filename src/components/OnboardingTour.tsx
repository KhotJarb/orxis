"use client";

import React, { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Compass,
  User,
  FileText,
  Sparkles,
  Layers,
  Zap,
  ArrowRight,
  X,
} from "lucide-react";

interface OnboardingTourProps {
  isOpen: boolean;
  onClose: () => void;
}

const EASE_SMOOTH: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

interface TourStep {
  icon: React.ReactNode;
  emoji: string;
  title: string;
  description: string;
  tip: string;
}

const TOUR_STEPS: TourStep[] = [
  {
    icon: <Compass className="h-6 w-6" />,
    emoji: "👋",
    title: "Welcome to Orxis",
    description:
      "Orxis helps you build a complete AI assistant profile in minutes — no account needed, totally free. Just answer a few questions and copy the result into Gemini, ChatGPT, or Claude.",
    tip: "You can skip any step you want — every field is optional.",
  },
  {
    icon: <Compass className="h-6 w-6" />,
    emoji: "🧭",
    title: "Step 1 — Pick Your Direction",
    description:
      "Start by describing what you need your AI assistant for — or tap a category like \"Content Creation\" or \"Business\" to get domain-specific suggestions throughout the wizard.",
    tip: "Choosing a category pre-fills relevant presets, but you can always type your own.",
  },
  {
    icon: <User className="h-6 w-6" />,
    emoji: "🎭",
    title: "Step 2 & 3 — Persona & Task",
    description:
      "Choose the AI's expert role (like \"Scriptwriter\" or \"Business Analyst\") and what you want it to do (like \"Script Writing\" or \"Market Analysis\"). The presets adapt to your chosen domain.",
    tip: "Click \"Show all presets\" to see options from every domain.",
  },
  {
    icon: <FileText className="h-6 w-6" />,
    emoji: "📋",
    title: "Step 4 — Your Context",
    description:
      "Tell the AI about your channel, company, or project. This makes the generated assistant way more tailored — but it's totally optional if you want a general-purpose one.",
    tip: "Try \"Fill with example\" to see what kind of details work best.",
  },
  {
    icon: <Sparkles className="h-6 w-6" />,
    emoji: "⚡",
    title: "Step 7 — Shortcuts",
    description:
      "Create reusable prompt templates with {{variables}} you fill in each time. For example: \"Generate {{count}} video ideas about {{topic}}\". These are included in your final output.",
    tip: "Click \"✨ Suggest for me\" to get domain-specific templates instantly.",
  },
  {
    icon: <Layers className="h-6 w-6" />,
    emoji: "📦",
    title: "Your Output — Ready to Paste",
    description:
      "After generating, you'll get a complete AI assistant profile with a name, description, full instructions, conversation starters, and shortcuts. Use the platform tabs (Gems · GPTs · Projects) to see it formatted for each platform.",
    tip: "Each field has its own copy button, or use \"Copy Everything\" at the bottom.",
  },
];

export default function OnboardingTour({
  isOpen,
  onClose,
}: OnboardingTourProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const handleClose = useCallback(() => {
    localStorage.setItem("orxis_tour_completed", "true");
    setCurrentStep(0);
    onClose();
  }, [onClose]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      setCurrentStep(0);
      return;
    }
    document.body.style.overflow = "hidden";
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
      if (e.key === "ArrowRight" || e.key === "Enter") handleNext();
      if (e.key === "ArrowLeft") handleBack();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, handleClose, currentStep]);

  const handleNext = () => {
    if (currentStep < TOUR_STEPS.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      handleClose();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  if (!isMounted || typeof window === "undefined") return null;

  const step = TOUR_STEPS[currentStep];
  const isLastStep = currentStep === TOUR_STEPS.length - 1;
  const isFirstStep = currentStep === 0;
  const progress = ((currentStep + 1) / TOUR_STEPS.length) * 100;

  const overlayContent = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) handleClose();
          }}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-md" />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.4, ease: EASE_SMOOTH }}
            className="relative w-full max-w-md rounded-2xl border border-glass-border overflow-hidden"
            style={{
              background:
                "linear-gradient(145deg, rgba(15,10,40,0.95) 0%, rgba(3,0,20,0.98) 100%)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 z-10 text-slate-500 hover:text-white transition-colors cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Progress bar */}
            <div className="h-1 bg-white/5">
              <motion.div
                className="h-full bg-gradient-to-r from-neon-cyan to-neon-purple"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.4, ease: EASE_SMOOTH }}
              />
            </div>

            {/* Content area */}
            <div className="p-6 sm:p-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.3, ease: EASE_SMOOTH }}
                >
                  {/* Emoji + Icon header */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-neon-cyan/15 to-neon-purple/15 border border-glass-border shrink-0">
                      <span className="text-2xl">{step.emoji}</span>
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
                        {currentStep + 1} of {TOUR_STEPS.length}
                      </p>
                      <h3 className="text-lg sm:text-xl font-bold text-white leading-tight">
                        {step.title}
                      </h3>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm sm:text-[15px] text-slate-300 leading-relaxed mb-5">
                    {step.description}
                  </p>

                  {/* Tip box */}
                  <div className="rounded-xl bg-neon-purple/[0.06] border border-neon-purple/15 px-4 py-3 flex items-start gap-3">
                    <Zap className="h-4 w-4 text-neon-purple-light shrink-0 mt-0.5" />
                    <p className="text-xs sm:text-[13px] text-neon-purple-light/80 leading-relaxed">
                      {step.tip}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Footer */}
            <div className="px-6 sm:px-8 pb-6 sm:pb-8 flex items-center justify-between">
              <button
                onClick={handleClose}
                className="text-xs text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
              >
                Skip tour
              </button>

              {/* Step dots */}
              <div className="flex items-center gap-1.5">
                {TOUR_STEPS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentStep(i)}
                    className={`rounded-full transition-all duration-300 cursor-pointer ${
                      i === currentStep
                        ? "w-6 h-2 bg-neon-cyan"
                        : i < currentStep
                          ? "w-2 h-2 bg-neon-cyan/40"
                          : "w-2 h-2 bg-slate-700"
                    }`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-2">
                {!isFirstStep && (
                  <button
                    onClick={handleBack}
                    className="px-3 py-2 rounded-lg text-xs font-medium text-slate-400 hover:text-white hover:bg-white/5 border border-glass-border transition-all cursor-pointer"
                  >
                    Back
                  </button>
                )}
                <button
                  onClick={handleNext}
                  className="glow-btn inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs sm:text-sm font-medium text-white transition-all hover:scale-105 active:scale-95 cursor-pointer"
                >
                  {isLastStep ? (
                    "Let's go!"
                  ) : (
                    <>
                      Next
                      <ArrowRight className="h-3.5 w-3.5" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return createPortal(overlayContent, document.body);
}

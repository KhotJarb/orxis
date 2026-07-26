"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Wand2, HelpCircle } from "lucide-react";
import Navbar from "./Navbar";
import StepWizard from "./StepWizard";
import OutputStudio from "./OutputStudio";
import OnboardingTour from "./OnboardingTour";
import type { GenerateResult } from "./StepWizard";

const EASE_SMOOTH: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

// ===== Component =====
export default function GeneratePage() {
  const [result, setResult] = useState<GenerateResult | null>(null);
  const [showTour, setShowTour] = useState(false);
  const [tourPulse, setTourPulse] = useState(false);

  // Check if this is the user's first visit
  useEffect(() => {
    if (typeof window === "undefined") return;
    const completed = localStorage.getItem("orxis_tour_completed");
    if (!completed) {
      // Pulse the tour button once on first visit
      setTourPulse(true);
      const timer = setTimeout(() => setTourPulse(false), 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleGenerate = useCallback((generateResult: GenerateResult) => {
    setResult(generateResult);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleReset = useCallback(() => {
    setResult(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <main className="relative min-h-screen">
      <Navbar />

      {/* Background layers */}
      <div className="fixed inset-0 -z-10 bg-[#030014]" />
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_rgba(139,92,246,0.06)_0%,_transparent_50%)]" />
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(6,182,212,0.04)_0%,_transparent_50%)]" />

      {/* Subtle grid */}
      <div
        className="fixed inset-0 -z-10 opacity-[0.012]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Content */}
      <div className="pt-24 md:pt-28 pb-20 px-4 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          {result ? (
            <motion.div
              key="output"
              initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
              transition={{ duration: 0.5, ease: EASE_SMOOTH }}
            >
              <OutputStudio
                result={result}
                onReset={handleReset}
              />
            </motion.div>
          ) : (
            <motion.div
              key="wizard"
              initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
              transition={{ duration: 0.5, ease: EASE_SMOOTH }}
            >
              {/* Section Header */}
              <div className="text-center mb-10 sm:mb-14">
                <div className="inline-flex items-center gap-2 rounded-full border border-glass-border bg-glass-bg px-4 py-2 text-xs sm:text-sm font-medium text-neon-purple-light mb-6">
                  <Wand2 className="h-3.5 w-3.5" />
                  AI Assistant Builder
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
                  Build Your{" "}
                  <span className="text-gradient">AI Assistant</span>
                </h1>
                <p className="max-w-2xl mx-auto text-slate-400 text-base sm:text-lg leading-relaxed">
                  Answer a few questions and we&apos;ll generate a complete AI
                  assistant profile — ready for Gemini Gems, ChatGPT GPTs, or
                  Claude Projects.
                </p>
              </div>

              {/* Tour Button */}
              <div className="flex justify-center mb-6">
                <motion.button
                  onClick={() => setShowTour(true)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  animate={tourPulse ? { scale: [1, 1.1, 1] } : undefined}
                  transition={
                    tourPulse
                      ? { duration: 1, repeat: 2, ease: "easeInOut" }
                      : undefined
                  }
                  className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-medium text-slate-500 hover:text-slate-300 border border-glass-border hover:border-white/15 bg-white/[0.02] hover:bg-white/[0.05] transition-all cursor-pointer"
                >
                  <HelpCircle className="h-3.5 w-3.5" />
                  Take the tour
                </motion.button>
              </div>

              <StepWizard onGenerate={handleGenerate} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Onboarding Tour */}
      <OnboardingTour isOpen={showTour} onClose={() => setShowTour(false)} />
    </main>
  );
}

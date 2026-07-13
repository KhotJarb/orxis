"use client";

import { useState, useCallback, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Check,
  User,
  Target,
  MessageSquare,
  ShieldCheck,
} from "lucide-react";

// ===== Types =====
interface StepConfig {
  id: string;
  question: string;
  subtitle: string;
  icon: React.ReactNode;
  presets: string[];
  placeholder: string;
  multiSelect: boolean;
}

interface StepAnswer {
  selected: string[];
  custom: string;
}

interface StepWizardProps {
  onGenerate: (
    prompt: string,
    payload: Record<string, { selected: string[]; custom: string }>
  ) => void;
}

// ===== Shared Easing =====
const EASE_SMOOTH: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

// ===== Step Configuration =====
const STEPS: StepConfig[] = [
  {
    id: "persona",
    question: "What expert persona do you need?",
    subtitle: "Define the AI\u2019s identity and area of expertise",
    icon: <User className="h-5 w-5" />,
    presets: [
      "Software Engineer",
      "Data Scientist",
      "UX Designer",
      "Marketing Expert",
      "Creative Writer",
      "Business Strategist",
      "Research Scientist",
      "Teacher & Mentor",
      "DevOps Engineer",
      "Product Manager",
      "Legal Advisor",
      "Financial Analyst",
    ],
    placeholder:
      "e.g., A senior React developer with 10+ years of experience in building scalable web apps\u2026",
    multiSelect: false,
  },
  {
    id: "task",
    question: "What is the primary task or goal?",
    subtitle: "Describe what you want the AI to help you accomplish",
    icon: <Target className="h-5 w-5" />,
    presets: [
      "Code Review",
      "Content Creation",
      "Data Analysis",
      "Problem Solving",
      "Research & Report",
      "Brainstorming",
      "Technical Writing",
      "Debugging",
      "API Design",
      "System Architecture",
      "User Research",
      "SEO Optimization",
    ],
    placeholder:
      "e.g., Review my TypeScript code for performance issues and suggest improvements\u2026",
    multiSelect: true,
  },
  {
    id: "tone",
    question: "What tone of voice should the AI use?",
    subtitle: "Set the communication style and personality",
    icon: <MessageSquare className="h-5 w-5" />,
    presets: [
      "Professional",
      "Casual & Friendly",
      "Humorous",
      "Academic",
      "Concise & Direct",
      "Detailed & Thorough",
      "Encouraging",
      "Strict & Critical",
      "Socratic",
      "Empathetic",
      "Assertive",
      "Neutral",
    ],
    placeholder:
      "e.g., Be warm but direct, avoid unnecessary fluff, use analogies when explaining\u2026",
    multiSelect: true,
  },
  {
    id: "rules",
    question: "Any strict rules or output formats?",
    subtitle: "Define constraints, formats, and non-negotiable boundaries",
    icon: <ShieldCheck className="h-5 w-5" />,
    presets: [
      "Use bullet points",
      "Step-by-step format",
      "Include code examples",
      "Cite sources",
      "Keep under 500 words",
      "Use markdown formatting",
      "Avoid jargon",
      "Provide alternatives",
      "Show pros & cons",
      "Include examples",
      "Add summary at end",
      "Use tables when possible",
    ],
    placeholder:
      "e.g., Always validate inputs, never suggest deprecated APIs, include time complexity\u2026",
    multiSelect: true,
  },
];

const LOADING_PHASES = [
  "Analyzing your preferences\u2026",
  "Structuring your prompt\u2026",
  "Polishing the output\u2026",
  "Almost there\u2026",
];

// ===== Local prompt builder (fallback when API is unavailable) =====
function buildPromptLocally(answers: StepAnswer[]): string {
  const [persona, task, tone, rules] = answers;
  const parts: string[] = [];

  parts.push("# Custom AI Instruction");
  parts.push("");

  if (persona.selected.length > 0 || persona.custom) {
    parts.push("## Persona & Expertise");
    if (persona.selected.length > 0)
      parts.push(
        `You are an expert ${persona.selected.join(" and ")} with deep domain knowledge.`
      );
    if (persona.custom) parts.push(persona.custom);
    parts.push("");
  }

  if (task.selected.length > 0 || task.custom) {
    parts.push("## Primary Task");
    if (task.selected.length > 0)
      parts.push(
        `Your primary responsibilities include: ${task.selected.join(", ")}.`
      );
    if (task.custom) parts.push(task.custom);
    parts.push("");
  }

  if (tone.selected.length > 0 || tone.custom) {
    parts.push("## Communication Style");
    if (tone.selected.length > 0)
      parts.push(
        `Communicate in a ${tone.selected.map((t) => t.toLowerCase()).join(", ")} manner.`
      );
    if (tone.custom) parts.push(tone.custom);
    parts.push("");
  }

  if (rules.selected.length > 0 || rules.custom) {
    parts.push("## Rules & Constraints");
    if (rules.selected.length > 0) {
      rules.selected.forEach((r) => parts.push(`- ${r}`));
    }
    if (rules.custom) parts.push(rules.custom);
  }

  return parts.join("\n");
}

// ===== Animation Variants =====
const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 200 : -200,
    opacity: 0,
    scale: 0.96,
    filter: "blur(8px)",
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: EASE_SMOOTH },
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 200 : -200,
    opacity: 0,
    scale: 0.96,
    filter: "blur(8px)",
    transition: { duration: 0.4, ease: EASE_SMOOTH },
  }),
};

const chipContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.035, delayChildren: 0.15 },
  },
};

const chipVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 10 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" as const },
  },
};

// ===== Main Component =====
export default function StepWizard({ onGenerate }: StepWizardProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(0);
  const [answers, setAnswers] = useState<StepAnswer[]>(
    STEPS.map(() => ({ selected: [], custom: "" }))
  );
  const [isGenerating, setIsGenerating] = useState(false);
  const [loadingPhase, setLoadingPhase] = useState(0);

  const currentConfig = STEPS[currentStep];
  const currentAnswer = answers[currentStep];
  const isLastStep = currentStep === STEPS.length - 1;
  const isFirstStep = currentStep === 0;
  const hasInput =
    currentAnswer.selected.length > 0 ||
    currentAnswer.custom.trim().length > 0;

  // --- Loading phase cycling ---
  useEffect(() => {
    if (!isGenerating) return;
    setLoadingPhase(0);
    const interval = setInterval(() => {
      setLoadingPhase((prev) =>
        prev < LOADING_PHASES.length - 1 ? prev + 1 : prev
      );
    }, 800);
    return () => clearInterval(interval);
  }, [isGenerating]);

  // --- JSON payload (ready for API) ---
  const payload = useMemo(() => {
    const data: Record<string, { selected: string[]; custom: string }> = {};
    STEPS.forEach((step, i) => {
      data[step.id] = answers[i];
    });
    return data;
  }, [answers]);

  // --- Handlers ---
  const togglePreset = useCallback(
    (preset: string) => {
      setAnswers((prev) => {
        const updated = [...prev];
        const step = { ...updated[currentStep] };
        const config = STEPS[currentStep];
        if (config.multiSelect) {
          step.selected = step.selected.includes(preset)
            ? step.selected.filter((s) => s !== preset)
            : [...step.selected, preset];
        } else {
          step.selected = step.selected.includes(preset) ? [] : [preset];
        }
        updated[currentStep] = step;
        return updated;
      });
    },
    [currentStep]
  );

  const setCustomText = useCallback(
    (text: string) => {
      setAnswers((prev) => {
        const updated = [...prev];
        updated[currentStep] = { ...updated[currentStep], custom: text };
        return updated;
      });
    },
    [currentStep]
  );

  const goNext = useCallback(() => {
    if (isLastStep) return;
    setDirection(1);
    setCurrentStep((prev) => prev + 1);
  }, [isLastStep]);

  const goBack = useCallback(() => {
    if (isFirstStep) return;
    setDirection(-1);
    setCurrentStep((prev) => prev - 1);
  }, [isFirstStep]);

  const goToStep = useCallback(
    (step: number) => {
      if (step >= currentStep) return;
      setDirection(step > currentStep ? 1 : -1);
      setCurrentStep(step);
    },
    [currentStep]
  );

  // --- Generate: try API, fallback to local ---
  const handleGenerate = useCallback(async () => {
    setIsGenerating(true);
    const startTime = Date.now();
    let generatedText: string;

    try {
      const res = await fetch("http://localhost:8000/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(30000),
      });
      if (!res.ok) throw new Error(`API error: ${res.status}`);
      const data = await res.json();
      generatedText = data.prompt;
    } catch {
      // Backend unavailable — build locally
      generatedText = buildPromptLocally(answers);
    }

    // Ensure minimum 2.5s loading for smooth UX
    const elapsed = Date.now() - startTime;
    if (elapsed < 2500) {
      await new Promise((r) => setTimeout(r, 2500 - elapsed));
    }

    setIsGenerating(false);
    onGenerate(generatedText, payload);
  }, [answers, payload, onGenerate]);

  // ================================================================
  //  RENDER
  // ================================================================
  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* ---- Progress Indicator ---- */}
      <div className="mb-8 sm:mb-10">
        <div className="flex items-center justify-between mb-4 px-1">
          {STEPS.map((step, i) => (
            <div key={step.id} className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={() => goToStep(i)}
                disabled={i >= currentStep}
                className={`flex items-center gap-2 sm:gap-2.5 transition-all duration-300 ${
                  i < currentStep
                    ? "cursor-pointer"
                    : i === currentStep
                      ? "cursor-default"
                      : "cursor-default opacity-30"
                }`}
              >
                <div
                  className={`
                    flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full
                    text-sm font-semibold transition-all duration-500 shrink-0
                    ${
                      i < currentStep
                        ? "bg-neon-cyan/15 text-neon-cyan border border-neon-cyan/30"
                        : i === currentStep
                          ? "bg-neon-purple/15 text-neon-purple border border-neon-purple/30 shadow-lg shadow-neon-purple/10"
                          : "bg-white/5 text-slate-600 border border-glass-border"
                    }
                  `}
                >
                  {i < currentStep ? <Check className="h-4 w-4" /> : step.icon}
                </div>
                <span
                  className={`hidden lg:block text-sm font-medium transition-colors duration-300 ${
                    i === currentStep
                      ? "text-white"
                      : i < currentStep
                        ? "text-slate-400"
                        : "text-slate-600"
                  }`}
                >
                  {step.id.charAt(0).toUpperCase() + step.id.slice(1)}
                </span>
              </button>
              {i < STEPS.length - 1 && (
                <div className="hidden sm:block h-px bg-glass-border min-w-[16px] lg:min-w-[40px] flex-1 overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-neon-cyan to-neon-purple"
                    initial={{ width: "0%" }}
                    animate={{ width: i < currentStep ? "100%" : "0%" }}
                    transition={{ duration: 0.5, ease: "easeOut" as const }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="sm:hidden h-1 bg-white/5 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-neon-cyan to-neon-purple rounded-full"
            animate={{ width: `${((currentStep + 1) / STEPS.length) * 100}%` }}
            transition={{ duration: 0.5, ease: "easeOut" as const }}
          />
        </div>
      </div>

      {/* ---- Step Content ---- */}
      <div className="relative min-h-[440px] sm:min-h-[480px]">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentStep}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="glass rounded-2xl p-6 sm:p-8 border border-glass-border"
          >
            <div className="mb-6 sm:mb-8">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-neon-purple/10 text-neon-purple border border-neon-purple/20">
                  {currentConfig.icon}
                </div>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Step {currentStep + 1} of {STEPS.length}
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
                {currentConfig.question}
              </h3>
              <p className="text-slate-400 text-sm sm:text-base">
                {currentConfig.subtitle}
              </p>
            </div>

            <motion.div
              variants={chipContainerVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-wrap gap-2 sm:gap-2.5 mb-5 sm:mb-6"
            >
              {currentConfig.presets.map((preset) => {
                const isSelected = currentAnswer.selected.includes(preset);
                return (
                  <motion.button
                    key={preset}
                    variants={chipVariants}
                    onClick={() => togglePreset(preset)}
                    whileHover={{ scale: 1.05, y: -1 }}
                    whileTap={{ scale: 0.95 }}
                    className={`
                      inline-flex items-center gap-1.5 rounded-full px-3.5 py-2
                      text-xs sm:text-sm font-medium transition-all duration-300
                      cursor-pointer select-none
                      ${
                        isSelected
                          ? "bg-neon-cyan/15 text-neon-cyan-light border border-neon-cyan/30 shadow-lg shadow-neon-cyan/5"
                          : "bg-white/[0.03] text-slate-400 border border-glass-border hover:bg-white/[0.06] hover:text-slate-200 hover:border-white/15"
                      }
                    `}
                  >
                    {isSelected && <Check className="h-3 w-3 sm:h-3.5 sm:w-3.5" />}
                    {preset}
                  </motion.button>
                );
              })}
            </motion.div>

            <div className="relative">
              <textarea
                value={currentAnswer.custom}
                onChange={(e) => setCustomText(e.target.value)}
                placeholder={currentConfig.placeholder}
                rows={3}
                className="
                  w-full rounded-xl bg-white/[0.03] border border-glass-border
                  px-4 py-3.5 text-sm text-slate-200 placeholder-slate-600
                  focus:outline-none focus:border-neon-purple/40 focus:bg-white/[0.05]
                  focus:ring-1 focus:ring-neon-purple/20
                  transition-all duration-300 resize-none
                "
              />
              {currentAnswer.custom.length > 0 && (
                <span className="absolute bottom-3 right-3 text-[11px] text-slate-600 font-mono">
                  {currentAnswer.custom.length}
                </span>
              )}
            </div>

            {currentConfig.multiSelect && (
              <p className="mt-3 text-[11px] sm:text-xs text-slate-600 flex items-center gap-1.5">
                <span className="text-neon-cyan/60">&#10024;</span>
                You can select multiple options
              </p>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Loading Overlay */}
        <AnimatePresence>
          {isGenerating && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 z-20 flex flex-col items-center justify-center rounded-2xl overflow-hidden"
            >
              <div className="absolute inset-0 bg-[#030014]/90 backdrop-blur-md" />
              <motion.div
                className="relative z-10 mb-8"
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              >
                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-neon-cyan to-neon-purple opacity-15 blur-2xl absolute inset-0" />
                <div className="w-20 h-20 rounded-full border border-neon-cyan/20 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full border border-neon-purple/30 flex items-center justify-center">
                    <motion.div
                      className="w-4 h-4 rounded-full bg-gradient-to-r from-neon-cyan to-neon-purple"
                      animate={{ scale: [1, 1.5, 1], opacity: [0.6, 1, 0.6] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    />
                  </div>
                </div>
              </motion.div>
              <div className="relative z-10 flex gap-1.5 mb-5">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-1.5 h-1.5 rounded-full bg-neon-cyan"
                    animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.3, 0.8] }}
                    transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
                  />
                ))}
              </div>
              <AnimatePresence mode="wait">
                <motion.p
                  key={loadingPhase}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="relative z-10 text-white font-medium text-sm"
                >
                  {LOADING_PHASES[loadingPhase]}
                </motion.p>
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ---- Navigation ---- */}
      <div className="flex items-center justify-between mt-6 sm:mt-8">
        <motion.button
          onClick={goBack}
          whileHover={!isFirstStep ? { scale: 1.03 } : undefined}
          whileTap={!isFirstStep ? { scale: 0.97 } : undefined}
          className={`
            inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium
            border border-glass-border text-slate-400 hover:text-white hover:bg-white/5
            transition-all duration-300 cursor-pointer
            ${isFirstStep ? "opacity-0 pointer-events-none" : "opacity-100"}
          `}
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </motion.button>

        {isLastStep ? (
          <motion.button
            onClick={handleGenerate}
            disabled={isGenerating}
            whileHover={!isGenerating ? { scale: 1.05 } : undefined}
            whileTap={!isGenerating ? { scale: 0.97 } : undefined}
            className="glow-btn group inline-flex items-center gap-2.5 rounded-full px-8 py-3 text-sm font-semibold text-white cursor-pointer transition-all duration-300"
          >
            <Sparkles className="h-4 w-4 transition-transform duration-300 group-hover:rotate-12" />
            Generate Master Prompt
          </motion.button>
        ) : (
          <motion.button
            onClick={goNext}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className={`
              inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold
              transition-all duration-300 cursor-pointer
              ${
                hasInput
                  ? "bg-neon-purple/15 text-neon-purple-light border border-neon-purple/30 hover:bg-neon-purple/25"
                  : "bg-white/5 text-slate-400 border border-glass-border hover:bg-white/10 hover:text-slate-200"
              }
            `}
          >
            {hasInput ? "Continue" : "Skip"}
            <ArrowRight className="h-4 w-4" />
          </motion.button>
        )}
      </div>
    </div>
  );
}

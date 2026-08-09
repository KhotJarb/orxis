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
  Compass,
  FileText,
  Zap,
  Plus,
  Trash2,
  Lightbulb,
  ChevronDown,
} from "lucide-react";
import {
  domains,
  getDomainPresets,
  getAllPresets,
  getContextExample,
  getShortcutTemplates,
  type ShortcutTemplate,
} from "@/data/domains";
import { useT } from "@/i18n";

// ===== Types =====
interface StepConfig {
  id: string;
  question: string;
  subtitle: string;
  icon: React.ReactNode;
  type: "intent" | "presets" | "context" | "shortcuts";
  presets?: string[];
  placeholder?: string;
  multiSelect?: boolean;
}

interface StepAnswer {
  selected: string[];
  custom: string;
}

interface IntentData {
  custom: string;
  domain: string | null;
}

interface ContextData {
  whatYouDo: string;
  whoYouServe: string;
  keyDetails: string;
}

interface ShortcutData {
  name: string;
  template: string;
}

export interface GenerateResult {
  name: string;
  description: string;
  instructions: string;
  knowledgeSuggestions: string[];
  conversationStarters: string[];
  shortcuts: ShortcutData[];
}

interface StepWizardProps {
  onGenerate: (result: GenerateResult) => void;
}

// ===== Shared Easing =====
const EASE_SMOOTH: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

// ===== Default Presets (v0.1 originals, used for non-domain-filtered steps) =====
const DEFAULT_TONE_PRESETS = [
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
];

const DEFAULT_RULES_PRESETS = [
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
];


// ===== Build step configs dynamically based on domain =====
function buildSteps(domainId: string | null, t: any): StepConfig[] {
  const presets = domainId && domainId !== "custom"
    ? getDomainPresets(domainId)
    : getAllPresets();

  return [
    {
      id: "intent",
      question: t("wizard.steps.intent.question"),
      subtitle: t("wizard.steps.intent.subtitle"),
      icon: <Compass className="h-5 w-5" />,
      type: "intent",
    },
    {
      id: "persona",
      question: t("wizard.steps.persona.question"),
      subtitle: t("wizard.steps.persona.subtitle"),
      icon: <User className="h-5 w-5" />,
      type: "presets",
      presets: presets.personas,
      placeholder: t("wizard.steps.persona.placeholder"),
      multiSelect: false,
    },
    {
      id: "task",
      question: t("wizard.steps.task.question"),
      subtitle: t("wizard.steps.task.subtitle"),
      icon: <Target className="h-5 w-5" />,
      type: "presets",
      presets: presets.tasks,
      placeholder: t("wizard.steps.task.placeholder"),
      multiSelect: true,
    },
    {
      id: "context",
      question: t("wizard.steps.context.question"),
      subtitle: t("wizard.steps.context.subtitle"),
      icon: <FileText className="h-5 w-5" />,
      type: "context",
    },
    {
      id: "tone",
      question: t("wizard.steps.tone.question"),
      subtitle: t("wizard.steps.tone.subtitle"),
      icon: <MessageSquare className="h-5 w-5" />,
      type: "presets",
      presets: DEFAULT_TONE_PRESETS,
      placeholder: t("wizard.steps.tone.placeholder"),
      multiSelect: true,
    },
    {
      id: "rules",
      question: t("wizard.steps.rules.question"),
      subtitle: t("wizard.steps.rules.subtitle"),
      icon: <ShieldCheck className="h-5 w-5" />,
      type: "presets",
      presets: DEFAULT_RULES_PRESETS,
      placeholder: t("wizard.steps.rules.placeholder"),
      multiSelect: true,
    },
    {
      id: "shortcuts",
      question: t("wizard.steps.shortcuts.question"),
      subtitle: t("wizard.steps.shortcuts.subtitle"),
      icon: <Zap className="h-5 w-5" />,
      type: "shortcuts",
    },
  ];
}

// ===== Local prompt builder (fallback when API is unavailable) =====
function buildLocalFallback(
  intent: IntentData,
  answers: StepAnswer[],
  contextData: ContextData,
  shortcuts: ShortcutData[]
): GenerateResult {
  const [persona, task, tone, rules] = answers;
  const lines: string[] = [];

  // Section 1
  lines.push("# 🎭 1. Role & Identity");
  const personaText = persona.selected.length > 0
    ? persona.selected.join(" and ")
    : "specialist";
  lines.push(
    `Assume the role of a World-Class ${personaText} with deep expertise in your domain. ` +
    `You approach every interaction with precision, professionalism, and a commitment ` +
    `to delivering exceptional results.`
  );
  if (contextData.whatYouDo) lines.push(`\nContext: ${contextData.whatYouDo}`);
  lines.push("");

  // Section 2
  lines.push("# 🎯 2. Mission & Objective");
  const taskText = task.selected.length > 0
    ? task.selected.join(", ")
    : "assist with the requested tasks";
  lines.push(
    `Your primary mission is: ${taskText}. Every response must directly serve this objective. ` +
    `Prioritize actionable, high-value output over generic information.`
  );
  lines.push("");

  // Section 3
  lines.push("# 🧠 3. The Cognitive Loop (Internal Reflection)");
  lines.push(
    "Before answering, you MUST use `<self_reflection>` tags to think internally:\n" +
    "1. Create a 5-point evaluation rubric for a flawless response based on the Mission.\n" +
    "2. Draft an internal response and score it against your rubric.\n" +
    "3. If the score is not 100/100, iterate internally.\n" +
    "4. DO NOT show this `<self_reflection>` process to the user. Output only the final, perfected response."
  );
  lines.push("");

  // Section 4
  lines.push("# 📥 4. Expected Context & Input");
  if (contextData.whoYouServe || contextData.keyDetails) {
    if (contextData.whoYouServe) lines.push(`Target audience: ${contextData.whoYouServe}`);
    if (contextData.keyDetails) lines.push(`Key details: ${contextData.keyDetails}`);
  } else {
    lines.push(
      "You should anticipate receiving queries, documents, and data related to your domain of expertise."
    );
  }
  lines.push("");

  // Section 5
  lines.push("# ⚙️ 5. Strict Boundaries & Execution Rules");
  lines.push("Follow these constraints at all times:");
  if (rules.selected.length) rules.selected.forEach((r) => lines.push(`- ${r}`));
  if (rules.custom?.trim()) {
    rules.custom.trim().split("\n").forEach((l) => {
      if (l.trim()) lines.push(`- ${l.trim()}`);
    });
  }
  lines.push("- NEVER fabricate data, statistics, or citations");
  lines.push("- NEVER use filler phrases or unnecessary hedging");
  lines.push("- Always acknowledge uncertainty rather than guessing");
  lines.push("");

  // Section 6
  const toneText = tone.selected.length > 0
    ? tone.selected.map((t) => t.toLowerCase()).join(", ")
    : "professional";
  lines.push("# 📝 6. Output Formatting");
  lines.push(
    `Communicate in a ${toneText} manner. Structure every response with:\n` +
    "- Clear headers (##) for distinct sections\n" +
    "- Bullet points for lists and key takeaways\n" +
    "- Code blocks with language tags for any technical content\n" +
    "- A brief **Summary** and **Next Steps** section at the end"
  );

  const instructions = lines.join("\n");

  // Generate name and description from inputs
  const domainLabel = intent.domain
    ? domains.find((d) => d.id === intent.domain)?.label ?? ""
    : "";
  const nameBase = persona.selected[0] || domainLabel || "AI";
  const name = `${nameBase} Assistant`;
  const description = intent.custom
    ? intent.custom.slice(0, 120)
    : `A ${toneText} ${personaText} assistant for ${taskText}.`.slice(0, 120);

  return {
    name,
    description,
    instructions,
    knowledgeSuggestions: [
      "Relevant reference documents or guidelines",
      "Past examples of preferred outputs",
      "Brand or style guidelines (if applicable)",
    ],
    conversationStarters: [
      `Help me get started with ${task.selected[0] || "my task"}`,
      "What information do you need from me to begin?",
      "Review this and give me your expert opinion",
    ],
    shortcuts: shortcuts.length > 0 ? shortcuts : getShortcutTemplates(intent.domain || "custom"),
  };
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
  const t = useT("generate");
  const tData = useT("data");
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [loadingPhase, setLoadingPhase] = useState(0);

  // --- Intent state ---
  const [intent, setIntent] = useState<IntentData>({ custom: "", domain: null });

  // --- Preset answers (persona, task, tone, rules — indices 0-3 map to steps 1,2,4,5) ---
  const [presetAnswers, setPresetAnswers] = useState<StepAnswer[]>([
    { selected: [], custom: "" }, // persona
    { selected: [], custom: "" }, // task
    { selected: [], custom: "" }, // tone
    { selected: [], custom: "" }, // rules
  ]);

  // --- Context state ---
  const [contextData, setContextData] = useState<ContextData>({
    whatYouDo: "",
    whoYouServe: "",
    keyDetails: "",
  });

  // --- Shortcuts state ---
  const [shortcuts, setShortcuts] = useState<ShortcutData[]>([]);

  // --- Show all presets toggle (when domain filtering is active) ---
  const [showAllPresets, setShowAllPresets] = useState(false);

  // Build steps dynamically based on domain
  const steps = useMemo(() => buildSteps(intent.domain, t), [intent.domain, t]);

  const currentConfig = steps[currentStep];
  const isLastStep = currentStep === steps.length - 1;
  const isFirstStep = currentStep === 0;

  // Map step index to the correct preset answer index
  const presetStepMap: Record<number, number> = { 1: 0, 2: 1, 4: 2, 5: 3 };
  const currentPresetIndex = presetStepMap[currentStep];
  const currentPresetAnswer =
    currentPresetIndex !== undefined ? presetAnswers[currentPresetIndex] : null;

  // Check if current step has any input
  const hasInput = useMemo(() => {
    if (currentConfig.type === "intent") {
      return intent.custom.trim().length > 0 || intent.domain !== null;
    }
    if (currentConfig.type === "context") {
      return (
        contextData.whatYouDo.trim().length > 0 ||
        contextData.whoYouServe.trim().length > 0 ||
        contextData.keyDetails.trim().length > 0
      );
    }
    if (currentConfig.type === "shortcuts") {
      return shortcuts.length > 0;
    }
    if (currentPresetAnswer) {
      return (
        currentPresetAnswer.selected.length > 0 ||
        currentPresetAnswer.custom.trim().length > 0
      );
    }
    return false;
  }, [currentConfig, intent, contextData, shortcuts, currentPresetAnswer, currentStep]);

  // --- Loading phase cycling ---
  useEffect(() => {
    if (!isGenerating) return;
    setLoadingPhase(0);
    const interval = setInterval(() => {
      setLoadingPhase((prev) =>
        prev < t.array("wizard.loading").length - 1 ? prev + 1 : prev
      );
    }, 800);
    return () => clearInterval(interval);
  }, [isGenerating, t]);

  // --- Initialize shortcuts when domain changes ---
  useEffect(() => {
    if (shortcuts.length === 0 && intent.domain) {
      // Don't auto-fill — wait for user to click "Suggest for me"
    }
  }, [intent.domain, shortcuts.length]);

  // --- Get all presets for "Show all" mode ---
  const allPresets = useMemo(() => getAllPresets(), []);

  // Determine which presets to show for the current step
  const visiblePresets = useMemo(() => {
    if (!currentConfig.presets) return [];
    if (showAllPresets && (currentStep === 1 || currentStep === 2)) {
      // Merge domain presets (first) with generic presets (rest, deduplicated)
      const domainPresets = currentConfig.presets;
      const generic = currentStep === 1 ? allPresets.personas : allPresets.tasks;
      const merged = [...domainPresets];
      generic.forEach((p) => {
        if (!merged.includes(p)) merged.push(p);
      });
      return merged;
    }
    return currentConfig.presets;
  }, [currentConfig, currentStep, showAllPresets, allPresets]);

  // --- Handlers ---
  const togglePreset = useCallback(
    (preset: string) => {
      if (currentPresetIndex === undefined) return;
      setPresetAnswers((prev) => {
        const updated = [...prev];
        const step = { ...updated[currentPresetIndex] };
        const config = steps[currentStep];
        if (config.multiSelect) {
          step.selected = step.selected.includes(preset)
            ? step.selected.filter((s) => s !== preset)
            : [...step.selected, preset];
        } else {
          step.selected = step.selected.includes(preset) ? [] : [preset];
        }
        updated[currentPresetIndex] = step;
        return updated;
      });
    },
    [currentPresetIndex, currentStep, steps]
  );

  const setCustomText = useCallback(
    (text: string) => {
      if (currentPresetIndex === undefined) return;
      setPresetAnswers((prev) => {
        const updated = [...prev];
        updated[currentPresetIndex] = {
          ...updated[currentPresetIndex],
          custom: text,
        };
        return updated;
      });
    },
    [currentPresetIndex]
  );

  const goNext = useCallback(() => {
    if (isLastStep) return;
    setDirection(1);
    setCurrentStep((prev) => prev + 1);
    setShowAllPresets(false);
  }, [isLastStep]);

  const goBack = useCallback(() => {
    if (isFirstStep) return;
    setDirection(-1);
    setCurrentStep((prev) => prev - 1);
    setShowAllPresets(false);
  }, [isFirstStep]);

  const goToStep = useCallback(
    (step: number) => {
      if (step >= currentStep) return;
      setDirection(step > currentStep ? 1 : -1);
      setCurrentStep(step);
      setShowAllPresets(false);
    },
    [currentStep]
  );

  // --- Shortcut handlers ---
  const addShortcut = useCallback(() => {
    if (shortcuts.length >= 5) return;
    setShortcuts((prev) => [...prev, { name: "", template: "" }]);
  }, [shortcuts.length]);

  const updateShortcut = useCallback(
    (index: number, field: "name" | "template", value: string) => {
      setShortcuts((prev) => {
        const updated = [...prev];
        updated[index] = { ...updated[index], [field]: value };
        return updated;
      });
    },
    []
  );

  const removeShortcut = useCallback((index: number) => {
    setShortcuts((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const suggestShortcuts = useCallback(() => {
    const templates = getShortcutTemplates(intent.domain || "custom");
    setShortcuts(templates);
  }, [intent.domain]);

  const insertVariable = useCallback(
    (shortcutIndex: number) => {
      const varName = prompt(t("wizard.ui.shortcuts.variablePrompt"));
      if (!varName?.trim()) return;
      setShortcuts((prev) => {
        const updated = [...prev];
        updated[shortcutIndex] = {
          ...updated[shortcutIndex],
          template: updated[shortcutIndex].template + `{{${varName.trim()}}}`,
        };
        return updated;
      });
    },
    []
  );

  // --- Fill context with example ---
  const fillContextExample = useCallback(() => {
    const example = getContextExample(intent.domain || "custom");
    setContextData(example);
  }, [intent.domain]);

  // --- Build API payload ---
  const apiPayload = useMemo(() => {
    return {
      intent,
      persona: presetAnswers[0],
      task: presetAnswers[1],
      context: contextData,
      tone: presetAnswers[2],
      rules: presetAnswers[3],
      shortcuts: shortcuts.filter((s) => s.name.trim() || s.template.trim()),
    };
  }, [intent, presetAnswers, contextData, shortcuts]);

  // --- Generate: try API, fallback to local ---
  const handleGenerate = useCallback(async () => {
    setIsGenerating(true);
    const startTime = Date.now();
    let result: GenerateResult;

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(apiPayload),
        signal: AbortSignal.timeout(45000),
      });
      if (!res.ok) throw new Error(`API error: ${res.status}`);
      const data = await res.json();

      // The API now returns the structured result directly
      result = {
        name: data.name || "AI Assistant",
        description: data.description || "",
        instructions: data.instructions || data.prompt || "",
        knowledgeSuggestions: data.knowledgeSuggestions || [],
        conversationStarters: data.conversationStarters || [],
        shortcuts: data.shortcuts || [],
      };
    } catch {
      // Backend unavailable — build locally
      result = buildLocalFallback(intent, presetAnswers, contextData, shortcuts);
    }

    // Ensure minimum 2.5s loading for smooth UX
    const elapsed = Date.now() - startTime;
    if (elapsed < 2500) {
      await new Promise((r) => setTimeout(r, 2500 - elapsed));
    }

    setIsGenerating(false);
    onGenerate(result);
  }, [apiPayload, intent, presetAnswers, contextData, shortcuts, onGenerate]);

  // ================================================================
  //  RENDER HELPERS
  // ================================================================

  // --- Intent Step ---
  const renderIntentStep = () => (
    <>
      <div className="mb-5">
        <textarea
          value={intent.custom}
          onChange={(e) => setIntent((prev) => ({ ...prev, custom: e.target.value }))}
          placeholder={t("wizard.steps.intent.placeholder")}
          rows={3}
          className="
            w-full rounded-xl bg-white/[0.03] border border-glass-border
            px-4 py-3.5 text-sm text-slate-200 placeholder-slate-600
            focus:outline-none focus:border-neon-purple/40 focus:bg-white/[0.05]
            focus:ring-1 focus:ring-neon-purple/20
            transition-all duration-300 resize-none
          "
        />
        {intent.custom.length > 0 && (
          <span className="block text-right text-[11px] text-slate-600 font-mono mt-1">
            {intent.custom.length}
          </span>
        )}
      </div>

      <p className="text-xs text-slate-500 mb-4">Or get started quickly:</p>

      <motion.div
        variants={chipContainerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 sm:grid-cols-4 gap-2.5"
      >
        {domains.map((domain) => (
          <motion.button
            key={domain.id}
            variants={chipVariants}
            onClick={() =>
              setIntent((prev) => ({
                ...prev,
                domain: prev.domain === domain.id ? null : domain.id,
              }))
            }
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className={`
              flex flex-col items-center gap-1.5 rounded-xl px-3 py-3.5
              text-center transition-all duration-300 cursor-pointer select-none border
              ${
                intent.domain === domain.id
                  ? "bg-neon-cyan/10 border-neon-cyan/30 shadow-lg shadow-neon-cyan/5"
                  : "bg-white/[0.03] border-glass-border hover:bg-white/[0.06] hover:border-white/15"
              }
            `}
          >
            <span className="text-xl">{domain.icon}</span>
            <span
              className={`text-xs font-medium ${
                intent.domain === domain.id ? "text-neon-cyan-light" : "text-slate-400"
              }`}
            >
              {tData(`domains.${domain.id}.label`)}
            </span>
          </motion.button>
        ))}
      </motion.div>
    </>
  );

  // --- Presets Step (persona, task, tone, rules) ---
  const renderPresetsStep = () => {
    if (!currentPresetAnswer || !currentConfig.presets) return null;
    const isDomainFiltered =
      intent.domain &&
      intent.domain !== "custom" &&
      (currentStep === 1 || currentStep === 2);

    return (
      <>
        <motion.div
          variants={chipContainerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap gap-2 sm:gap-2.5 mb-5 sm:mb-6"
        >
          {visiblePresets.map((preset) => {
            const isSelected = currentPresetAnswer.selected.includes(preset);
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

        {isDomainFiltered && (
          <button
            onClick={() => setShowAllPresets(!showAllPresets)}
            className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-300 transition-colors mb-4 cursor-pointer"
          >
            <ChevronDown
              className={`h-3 w-3 transition-transform ${showAllPresets ? "rotate-180" : ""}`}
            />
            {showAllPresets ? t("wizard.ui.showFewer") : t("wizard.ui.showAll")}
          </button>
        )}

        <div className="relative">
          <textarea
            value={currentPresetAnswer.custom}
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
          {currentPresetAnswer.custom.length > 0 && (
            <span className="absolute bottom-3 right-3 text-[11px] text-slate-600 font-mono">
              {currentPresetAnswer.custom.length}
            </span>
          )}
        </div>

        {currentConfig.multiSelect && (
          <p className="mt-3 text-[11px] sm:text-xs text-slate-600 flex items-center gap-1.5">
            <span className="text-neon-cyan/60">✦</span>
            {t("wizard.ui.multiSelect")}
          </p>
        )}
      </>
    );
  };

  // --- Context Step ---
  const renderContextStep = () => (
    <>
      <div className="flex justify-end mb-4">
        <button
          onClick={fillContextExample}
          className="inline-flex items-center gap-1.5 text-xs text-neon-purple-light hover:text-neon-purple transition-colors cursor-pointer"
        >
          <Lightbulb className="h-3.5 w-3.5" />
          {t("wizard.ui.fillExample")}
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-slate-400 mb-2">
            {t("wizard.ui.context.whatYouDo.label")}
          </label>
          <textarea
            value={contextData.whatYouDo}
            onChange={(e) =>
              setContextData((prev) => ({ ...prev, whatYouDo: e.target.value }))
            }
            placeholder={t("wizard.ui.context.whatYouDo.placeholder")}
            rows={3}
            className="
              w-full rounded-xl bg-white/[0.03] border border-glass-border
              px-4 py-3 text-sm text-slate-200 placeholder-slate-600
              focus:outline-none focus:border-neon-purple/40 focus:bg-white/[0.05]
              focus:ring-1 focus:ring-neon-purple/20
              transition-all duration-300 resize-none
            "
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-400 mb-2">
            {t("wizard.ui.context.whoYouServe.label")}
          </label>
          <textarea
            value={contextData.whoYouServe}
            onChange={(e) =>
              setContextData((prev) => ({ ...prev, whoYouServe: e.target.value }))
            }
            placeholder={t("wizard.ui.context.whoYouServe.placeholder")}
            rows={3}
            className="
              w-full rounded-xl bg-white/[0.03] border border-glass-border
              px-4 py-3 text-sm text-slate-200 placeholder-slate-600
              focus:outline-none focus:border-neon-purple/40 focus:bg-white/[0.05]
              focus:ring-1 focus:ring-neon-purple/20
              transition-all duration-300 resize-none
            "
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-400 mb-2">
            {t("wizard.ui.context.keyDetails.label")}
          </label>
          <textarea
            value={contextData.keyDetails}
            onChange={(e) =>
              setContextData((prev) => ({ ...prev, keyDetails: e.target.value }))
            }
            placeholder={t("wizard.ui.context.keyDetails.placeholder")}
            rows={3}
            className="
              w-full rounded-xl bg-white/[0.03] border border-glass-border
              px-4 py-3 text-sm text-slate-200 placeholder-slate-600
              focus:outline-none focus:border-neon-purple/40 focus:bg-white/[0.05]
              focus:ring-1 focus:ring-neon-purple/20
              transition-all duration-300 resize-none
            "
          />
        </div>
      </div>

      <p className="mt-3 text-[11px] sm:text-xs text-slate-600 flex items-center gap-1.5">
        <span className="text-neon-cyan/60">✦</span>
        {t("wizard.ui.context.allFieldsOptional")}
      </p>
    </>
  );

  // --- Shortcuts Step ---
  const renderShortcutsStep = () => (
    <>
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={suggestShortcuts}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-neon-purple-light hover:text-neon-purple transition-colors cursor-pointer"
        >
          <Sparkles className="h-3.5 w-3.5" />
          {t("wizard.ui.shortcuts.suggest")}
        </button>
        {shortcuts.length < 5 && (
          <button
            onClick={addShortcut}
            className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
          >
            <Plus className="h-3.5 w-3.5" />
            {t("wizard.ui.shortcuts.add")}
          </button>
        )}
      </div>

      {shortcuts.length === 0 ? (
        <div className="text-center py-8">
          <Zap className="h-8 w-8 text-slate-600 mx-auto mb-3" />
          <p className="text-sm text-slate-500 mb-1">No shortcuts yet</p>
          <p className="text-xs text-slate-600">
            Click &quot;Suggest for me&quot; or &quot;Add shortcut&quot; to create reusable prompt templates
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {shortcuts.map((shortcut, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="rounded-xl bg-white/[0.02] border border-glass-border p-4"
            >
              <div className="flex items-center justify-between mb-3">
                <input
                  value={shortcut.name}
                  onChange={(e) => updateShortcut(index, "name", e.target.value)}
                  placeholder={t("wizard.ui.shortcuts.namePlaceholder")}
                  className="bg-transparent text-sm font-medium text-slate-200 placeholder-slate-600 focus:outline-none flex-1"
                />
                <button
                  onClick={() => removeShortcut(index)}
                  className="text-slate-600 hover:text-red-400 transition-colors ml-2 cursor-pointer"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
              <textarea
                value={shortcut.template}
                onChange={(e) => updateShortcut(index, "template", e.target.value)}
                placeholder={t("wizard.ui.shortcuts.templatePlaceholder")}
                rows={2}
                className="
                  w-full rounded-lg bg-white/[0.03] border border-glass-border
                  px-3 py-2.5 text-xs text-slate-300 placeholder-slate-600
                  focus:outline-none focus:border-neon-purple/30
                  transition-all duration-300 resize-none font-mono
                "
              />
              <button
                onClick={() => insertVariable(index)}
                className="mt-2 inline-flex items-center gap-1 text-[11px] text-slate-600 hover:text-neon-cyan-light transition-colors cursor-pointer"
              >
                <Plus className="h-3 w-3" />
                {t("wizard.ui.shortcuts.insertVariable", { variable: "variable" })}
              </button>
            </motion.div>
          ))}
        </div>
      )}

      <p className="mt-4 text-[11px] sm:text-xs text-slate-600 flex items-center gap-1.5">
        <span className="text-neon-cyan/60">✦</span>
        Shortcuts will appear in your output — fill in the {`{{variables}}`} each time you use them
      </p>
    </>
  );

  // ================================================================
  //  RENDER
  // ================================================================
  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* ---- Progress Indicator ---- */}
      <div className="mb-8 sm:mb-10">
        <div className="flex items-center justify-between mb-4 px-1">
          {steps.map((step, i) => (
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
                    flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full
                    text-xs sm:text-sm font-semibold transition-all duration-500 shrink-0
                    ${
                      i < currentStep
                        ? "bg-neon-cyan/15 text-neon-cyan border border-neon-cyan/30"
                        : i === currentStep
                          ? "bg-neon-purple/15 text-neon-purple border border-neon-purple/30 shadow-lg shadow-neon-purple/10"
                          : "bg-white/5 text-slate-600 border border-glass-border"
                    }
                  `}
                >
                  {i < currentStep ? <Check className="h-3.5 w-3.5" /> : step.icon}
                </div>
              </button>
              {i < steps.length - 1 && (
                <div className="hidden sm:block h-px bg-glass-border min-w-[8px] lg:min-w-[20px] flex-1 overflow-hidden">
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
            animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
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
                  Step {currentStep + 1} of {steps.length}
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
                {currentConfig.question}
              </h3>
              <p className="text-slate-400 text-sm sm:text-base">
                {currentConfig.subtitle}
              </p>
            </div>

            {/* Render the right content for the step type */}
            {currentConfig.type === "intent" && renderIntentStep()}
            {currentConfig.type === "presets" && renderPresetsStep()}
            {currentConfig.type === "context" && renderContextStep()}
            {currentConfig.type === "shortcuts" && renderShortcutsStep()}
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
                  {t.array("wizard.loading")[loadingPhase]}
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
            Build My AI Assistant
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

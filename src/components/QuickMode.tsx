"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp, Sparkles, MessageSquare, Lightbulb } from "lucide-react";
import { GenerateResult } from "./StepWizard";

interface QuickModeProps {
  onGenerate: (result: GenerateResult) => void;
}

type QuickModeState = "idle" | "loading" | "questions";

const EXAMPLES = [
  "A patient math tutor who explains fractions and algebra to middle school students",
  "Help me write engaging YouTube scripts for my tech review channel",
  "A code review partner for React and TypeScript projects",
  "Social media strategist who plans content calendars for Instagram and TikTok",
  "Business advisor who helps early-stage startups build pitch decks",
  "Creative writing coach for science fiction and fantasy stories",
];

const LOADING_PHASES = [
  "Understanding your request…",
  "Building your AI assistant…",
  "Crafting the perfect profile…",
  "Almost there…",
];

const customEasing: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.3, ease: customEasing },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: customEasing },
  },
};

const chipContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const chipVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3, ease: customEasing },
  },
};

export default function QuickMode({ onGenerate }: QuickModeProps) {
  const [state, setState] = useState<QuickModeState>("idle");
  const [message, setMessage] = useState("");
  const [questions, setQuestions] = useState<string[]>([]);
  const [hint, setHint] = useState("");
  const [answers, setAnswers] = useState<string[]>([]);
  const [loadingPhase, setLoadingPhase] = useState(0);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (state === "loading") {
      setLoadingPhase(0);
      interval = setInterval(() => {
        setLoadingPhase((prev) => (prev + 1) % LOADING_PHASES.length);
      }, 2500);
    }
    return () => clearInterval(interval);
  }, [state]);

  const fallbackGenerate = (msg: string) => {
    return {
      name: "AI Assistant",
      description: msg.slice(0, 120),
      instructions: `# Custom AI Instruction\n\n${msg}`,
      knowledgeSuggestions: [],
      conversationStarters: [],
      shortcuts: [],
    };
  };

  const handleInitialSubmit = async (textToSubmit = message) => {
    const trimmed = textToSubmit.trim();
    if (!trimmed) return;

    setMessage(trimmed);
    setState("loading");

    const startTime = Date.now();

    try {
      const res = await fetch("/api/quick-generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed }),
        signal: AbortSignal.timeout(45000),
      });

      if (!res.ok) throw new Error(`API error: ${res.status}`);
      const data = await res.json();

      const elapsed = Date.now() - startTime;
      const minLoadingTime = 2500;
      if (elapsed < minLoadingTime) {
        await new Promise((r) => setTimeout(r, minLoadingTime - Math.max(elapsed, 0)));
      }

      if (data.phase === "questions") {
        setQuestions(data.questions);
        setHint(data.hint || "");
        setAnswers(new Array(data.questions.length).fill(""));
        setState("questions");
      } else {
        onGenerate(data.result);
      }
    } catch {
      // Fallback
      const elapsed = Date.now() - startTime;
      const minLoadingTime = 2500;
      if (elapsed < minLoadingTime) {
        await new Promise((r) => setTimeout(r, minLoadingTime - Math.max(elapsed, 0)));
      }
      onGenerate(fallbackGenerate(trimmed));
    }
  };

  const handleSubmitAnswers = async () => {
    setState("loading");
    const startTime = Date.now();

    try {
      const res = await fetch("/api/quick-generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: message.trim(),
          questions,
          answers,
        }),
        signal: AbortSignal.timeout(45000),
      });

      if (!res.ok) throw new Error(`API error: ${res.status}`);
      const data = await res.json();

      const elapsed = Date.now() - startTime;
      const minLoadingTime = 2500;
      if (elapsed < minLoadingTime) {
        await new Promise((r) => setTimeout(r, minLoadingTime - Math.max(elapsed, 0)));
      }

      onGenerate(data.result || data);
    } catch {
      const elapsed = Date.now() - startTime;
      const minLoadingTime = 2500;
      if (elapsed < minLoadingTime) {
        await new Promise((r) => setTimeout(r, minLoadingTime - Math.max(elapsed, 0)));
      }
      onGenerate(fallbackGenerate(message.trim()));
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleInitialSubmit();
    }
  };

  const handleExampleClick = (example: string) => {
    setMessage(example);
    handleInitialSubmit(example);
  };

  return (
    <div className="w-full max-w-3xl mx-auto min-h-[400px] flex flex-col justify-center">
      <AnimatePresence mode="wait">
        {state === "idle" && (
          <motion.div
            key="idle"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="flex flex-col gap-6"
          >
            <motion.div variants={itemVariants} className="text-center mb-4">
              <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-2 tracking-tight">
                What kind of <span className="text-gradient from-[#00F0FF] to-[#8A2BE2]">AI assistant</span> do you need?
              </h2>
              <p className="text-white/60">
                Just describe what you want, and we'll handle the rest.
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="relative rounded-2xl glass-border glass-bg bg-white/[0.02] shadow-[0_0_20px_rgba(0,240,255,0.05)] transition-all duration-300 focus-within:bg-white/[0.04] focus-within:shadow-[0_0_30px_rgba(0,240,255,0.1)] focus-within:border-[#00F0FF]/30"
            >
              <textarea
                ref={textareaRef}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Describe the AI assistant you want…"
                className="w-full bg-transparent text-white placeholder:text-white/30 p-5 min-h-[140px] resize-none outline-none text-lg leading-relaxed focus:ring-0 rounded-2xl"
                rows={4}
              />
              
              <div className="absolute bottom-4 right-4 flex items-center gap-3">
                <span className="text-xs text-white/40">
                  {message.length} chars
                </span>
                <button
                  onClick={() => handleInitialSubmit()}
                  disabled={!message.trim()}
                  className="w-10 h-10 rounded-full glow-btn flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed disabled:before:hidden bg-gradient-to-tr from-[#8A2BE2] to-[#00F0FF]"
                >
                  <ArrowUp size={20} className="text-white" />
                </button>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="mt-4">
              <div className="flex items-center gap-2 text-sm text-white/50 mb-3 ml-1">
                <Lightbulb size={16} className="text-neon-cyan" />
                <span>Try these:</span>
              </div>
              <motion.div
                variants={chipContainerVariants}
                initial="hidden"
                animate="visible"
                className="flex flex-wrap gap-2"
              >
                {EXAMPLES.map((example, i) => (
                  <motion.button
                    key={i}
                    variants={chipVariants}
                    onClick={() => handleExampleClick(example)}
                    className="px-4 py-2 rounded-full text-sm text-white/70 glass-border bg-white/[0.03] hover:bg-white/[0.08] hover:text-white transition-all text-left max-w-full truncate whitespace-nowrap overflow-hidden"
                  >
                    {example}
                  </motion.button>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        )}

        {state === "loading" && (
          <motion.div
            key="loading"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.4, ease: customEasing }}
            className="flex flex-col items-center justify-center py-20"
          >
            <div className="relative w-32 h-32 flex items-center justify-center mb-8">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, ease: "linear", repeat: Infinity }}
                className="absolute inset-0 rounded-full border border-dashed border-[#00F0FF]/30"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 12, ease: "linear", repeat: Infinity }}
                className="absolute inset-2 rounded-full border border-dashed border-[#8A2BE2]/30"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#00F0FF]/10 to-[#8A2BE2]/10 rounded-full blur-xl animate-pulse" />
              
              <div className="relative z-10 w-16 h-16 rounded-full bg-[#030014] glass-border flex items-center justify-center shadow-[0_0_20px_rgba(138,43,226,0.3)]">
                <Sparkles size={28} className="text-neon-cyan drop-shadow-[0_0_8px_rgba(0,240,255,0.5)]" />
              </div>

              {/* Orbital dots */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, ease: "linear", repeat: Infinity }}
                className="absolute inset-0 rounded-full"
              >
                <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#00F0FF] shadow-[0_0_10px_#00F0FF]" />
              </motion.div>
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 4, ease: "linear", repeat: Infinity }}
                className="absolute inset-2 rounded-full"
              >
                <div className="absolute top-1/2 -right-1.5 -translate-y-1/2 w-3 h-3 rounded-full bg-[#8A2BE2] shadow-[0_0_10px_#8A2BE2]" />
              </motion.div>
            </div>

            <div className="h-8 relative overflow-hidden w-full max-w-[280px]">
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={loadingPhase}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, ease: customEasing }}
                  className="absolute inset-0 flex items-center justify-center text-center text-white/80 text-lg font-medium tracking-wide"
                >
                  {LOADING_PHASES[loadingPhase]}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        )}

        {state === "questions" && (
          <motion.div
            key="questions"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="flex flex-col gap-5 w-full max-w-2xl mx-auto"
          >
            <motion.div 
              variants={itemVariants}
              className="glass-bg glass-border rounded-xl p-5 mb-2 bg-[#8A2BE2]/5 border-[#8A2BE2]/20 flex gap-4 items-start"
            >
              <div className="p-2 rounded-lg bg-[#8A2BE2]/10 mt-1">
                <MessageSquare size={20} className="text-[#8A2BE2]" />
              </div>
              <p className="text-white/90 text-[15px] leading-relaxed">
                {hint || "Great! A few quick questions to make your assistant even better:"}
              </p>
            </motion.div>

            {questions.map((q, idx) => (
              <motion.div 
                key={idx} 
                variants={itemVariants}
                className="glass-bg glass-border rounded-xl p-5 bg-white/[0.02]"
              >
                <div className="flex gap-3 items-center mb-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-[#8A2BE2] to-[#00F0FF] flex items-center justify-center text-xs font-bold text-white shadow-[0_0_10px_rgba(138,43,226,0.3)]">
                    {idx + 1}
                  </div>
                  <h3 className="text-white/90 font-medium text-[15px]">{q}</h3>
                </div>
                <input
                  type="text"
                  value={answers[idx]}
                  onChange={(e) => {
                    const newAnswers = [...answers];
                    newAnswers[idx] = e.target.value;
                    setAnswers(newAnswers);
                  }}
                  placeholder="Type your answer or leave blank to skip"
                  className="bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 text-[15px] focus:outline-none focus:border-[#00F0FF]/40 focus:ring-1 focus:ring-[#00F0FF]/40 transition-all ml-9 w-[calc(100%-36px)]"
                />
              </motion.div>
            ))}

            <motion.div 
              variants={itemVariants}
              className="flex items-center justify-between mt-6"
            >
              <button
                onClick={handleSubmitAnswers}
                className="px-6 py-3 rounded-xl text-white/70 hover:text-white hover:bg-white/[0.05] transition-all text-sm font-medium border border-white/10 hover:border-white/20"
              >
                Generate anyway
              </button>
              
              <button
                onClick={handleSubmitAnswers}
                className="glow-btn px-6 py-3 rounded-xl text-white font-medium flex items-center gap-2 bg-gradient-to-r from-[#8A2BE2] to-[#00F0FF] shadow-[0_0_20px_rgba(138,43,226,0.4)]"
              >
                <Sparkles size={18} />
                <span>Generate</span>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

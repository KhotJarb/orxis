"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Copy,
  CheckCheck,
  RotateCcw,
  Scissors,
  Briefcase,
  ListOrdered,
  Sparkles,
  AlertCircle,
  FileText,
  Hash,
} from "lucide-react";

// ===== Types =====
interface OutputStudioProps {
  prompt: string;
  payload: Record<string, { selected: string[]; custom: string }>;
  onReset: () => void;
  onPromptUpdate: (newPrompt: string) => void;
}

interface QuickTweak {
  id: string;
  label: string;
  description: string;
  icon: React.ReactNode;
}

const EASE_SMOOTH: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

const QUICK_TWEAKS: QuickTweak[] = [
  {
    id: "shorter",
    label: "Make it Shorter",
    description: "Condense to essential instructions",
    icon: <Scissors className="h-4 w-4" />,
  },
  {
    id: "professional",
    label: "More Professional",
    description: "Elevate the tone and formality",
    icon: <Briefcase className="h-4 w-4" />,
  },
  {
    id: "format_rules",
    label: "Add Output Format",
    description: "Include structured output rules",
    icon: <ListOrdered className="h-4 w-4" />,
  },
];

// ===== Component =====
export default function OutputStudio({
  prompt,
  payload,
  onReset,
  onPromptUpdate,
}: OutputStudioProps) {
  const [isCopied, setIsCopied] = useState(false);
  const [tweakingId, setTweakingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Computed metadata
  const wordCount = prompt.split(/\s+/).filter(Boolean).length;
  const lineCount = prompt.split("\n").length;
  const sectionCount = (prompt.match(/^## /gm) || []).length;

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(prompt);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch {
      setError("Failed to copy to clipboard");
      setTimeout(() => setError(null), 3000);
    }
  }, [prompt]);

  const handleTweak = useCallback(
    async (tweakId: string) => {
      setTweakingId(tweakId);
      setError(null);

      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        if (!apiUrl) throw new Error("No API URL configured");
        const res = await fetch(`${apiUrl}/api/tweak`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            current_prompt: prompt,
            tweak_type: tweakId,
          }),
          signal: AbortSignal.timeout(30000),
        });

        if (!res.ok) throw new Error(`API error: ${res.status}`);
        const data = await res.json();
        onPromptUpdate(data.prompt);
      } catch {
        // Fallback: apply local tweaks when backend is unavailable
        let tweaked = prompt;

        if (tweakId === "shorter") {
          tweaked +=
            "\n\n> \u26A1 Additional Rule: Keep all responses concise and under 200 words. Eliminate filler phrases.";
        } else if (tweakId === "professional") {
          tweaked +=
            "\n\n> \uD83C\uDFA9 Additional Rule: Maintain a formal, executive-level tone. Use industry-standard terminology.";
        } else if (tweakId === "format_rules") {
          tweaked +=
            "\n\n## Output Format\n- Begin with a one-line summary\n- Use headers for each section\n- Include bullet points for key items\n- End with actionable next steps";
        }

        onPromptUpdate(tweaked);
      } finally {
        setTweakingId(null);
      }
    },
    [prompt, onPromptUpdate]
  );

  return (
    <div className="max-w-6xl mx-auto">
      {/* ---- Header ---- */}
      <div className="text-center mb-8 sm:mb-10">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-gradient-to-br from-neon-cyan/20 to-neon-purple/20 border border-glass-border mb-4"
        >
          <Sparkles className="h-7 w-7 text-neon-cyan" />
        </motion.div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">
          Your Master Prompt is Ready
        </h1>
        <p className="text-slate-400 text-sm sm:text-base">
          Review and copy your custom instruction below.
        </p>
      </div>

      {/* ---- Error Banner ---- */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-6 flex items-center gap-3 rounded-xl border border-red-500/20 bg-red-500/10 px-5 py-3 text-sm text-red-300"
          >
            <AlertCircle className="h-4 w-4 shrink-0" />
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ---- Split Layout ---- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column: Generated Prompt (2/3) */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: EASE_SMOOTH }}
          className="lg:col-span-2"
        >
          <div className="glass rounded-2xl border border-glass-border overflow-hidden h-full flex flex-col">
            {/* Window chrome */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-glass-border bg-white/[0.02]">
              <div className="flex items-center gap-1.5">
                <div className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                <div className="h-3 w-3 rounded-full bg-[#febc2e]" />
                <div className="h-3 w-3 rounded-full bg-[#28c840]" />
              </div>
              <span className="text-xs text-slate-500 font-mono">
                master-prompt.md
              </span>
              <motion.button
                onClick={handleCopy}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-slate-400 hover:text-white hover:bg-white/5 transition-all cursor-pointer"
              >
                {isCopied ? (
                  <>
                    <CheckCheck className="h-3.5 w-3.5 text-green-400" />
                    <span className="text-green-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    Copy
                  </>
                )}
              </motion.button>
            </div>

            {/* Prompt content */}
            <div className="flex-1 p-5 sm:p-6 overflow-y-auto max-h-[500px]">
              <AnimatePresence mode="wait">
                <motion.pre
                  key={prompt.length}
                  initial={{ opacity: 0.5 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="text-sm sm:text-[15px] text-slate-300 whitespace-pre-wrap font-mono leading-relaxed"
                >
                  {prompt}
                </motion.pre>
              </AnimatePresence>
            </div>

            {/* Metadata bar */}
            <div className="flex items-center gap-4 sm:gap-6 px-5 py-3 border-t border-glass-border bg-white/[0.01] text-[11px] sm:text-xs text-slate-600">
              <span className="flex items-center gap-1.5">
                <FileText className="h-3 w-3" />
                {wordCount} words
              </span>
              <span className="flex items-center gap-1.5">
                <Hash className="h-3 w-3" />
                {sectionCount} sections
              </span>
              <span>{lineCount} lines</span>
            </div>
          </div>
        </motion.div>

        {/* Right column: Tweaks & Actions (1/3) */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.25, ease: EASE_SMOOTH }}
          className="lg:col-span-1 flex flex-col gap-4"
        >

          {/* Action Buttons Card */}
          <div className="glass rounded-2xl border border-glass-border p-5 sm:p-6">
            <div className="flex flex-col gap-3">
              <motion.button
                onClick={handleCopy}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="glow-btn inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white cursor-pointer w-full"
              >
                {isCopied ? (
                  <>
                    <CheckCheck className="h-4 w-4 text-green-400" />
                    Copied to Clipboard!
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    Copy to Clipboard
                  </>
                )}
              </motion.button>

              <motion.button
                onClick={onReset}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-glass-border bg-glass-bg px-5 py-3 text-sm font-medium text-slate-400 hover:text-white hover:bg-white/5 transition-all cursor-pointer w-full"
              >
                <RotateCcw className="h-4 w-4" />
                Start Over
              </motion.button>
            </div>
          </div>

          {/* API Payload (developer toggle) */}
          <details className="glass rounded-2xl border border-glass-border overflow-hidden">
            <summary className="px-5 py-3.5 text-sm text-slate-500 cursor-pointer hover:text-slate-300 transition-colors select-none">
              <span className="ml-1">API Payload (JSON)</span>
            </summary>
            <div className="px-5 pb-5 border-t border-glass-border pt-4">
              <pre className="text-[11px] text-slate-500 font-mono overflow-x-auto leading-relaxed">
                {JSON.stringify(payload, null, 2)}
              </pre>
            </div>
          </details>
        </motion.div>
      </div>
    </div>
  );
}

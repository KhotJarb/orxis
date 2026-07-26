"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Copy,
  CheckCheck,
  RotateCcw,
  Sparkles,
  AlertCircle,
  FileText,
  Hash,
  Bot,
  MessageCircle,
  Upload,
  Zap,
} from "lucide-react";
import PlatformGuide from "./PlatformGuide";
import type { GenerateResult } from "./StepWizard";

// ===== Types =====
interface OutputStudioProps {
  result: GenerateResult;
  onReset: () => void;
}

type PlatformTab = "gems" | "gpts" | "projects" | "raw";

const EASE_SMOOTH: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

const PLATFORM_TABS: { id: PlatformTab; label: string; emoji: string }[] = [
  { id: "gems", label: "Gems", emoji: "💎" },
  { id: "gpts", label: "GPTs", emoji: "🤖" },
  { id: "projects", label: "Projects", emoji: "📂" },
  { id: "raw", label: "Raw", emoji: "📄" },
];

// ===== Component =====
export default function OutputStudio({
  result,
  onReset,
}: OutputStudioProps) {
  const [activeTab, setActiveTab] = useState<PlatformTab>("gems");
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Computed metadata
  const wordCount = result.instructions.split(/\s+/).filter(Boolean).length;
  const lineCount = result.instructions.split("\n").length;
  const sectionCount = (result.instructions.match(/^#+ /gm) || []).length;

  const handleCopy = useCallback(
    async (text: string, fieldId: string) => {
      try {
        await navigator.clipboard.writeText(text);
        setCopiedField(fieldId);
        setTimeout(() => setCopiedField(null), 2000);
      } catch {
        setError("Failed to copy to clipboard");
        setTimeout(() => setError(null), 3000);
      }
    },
    []
  );

  const handleCopyAll = useCallback(async () => {
    const fullText = [
      `Name: ${result.name}`,
      `Description: ${result.description}`,
      "",
      "--- Instructions ---",
      result.instructions,
      "",
      result.knowledgeSuggestions.length > 0
        ? `--- Knowledge Suggestions ---\n${result.knowledgeSuggestions.map((s) => `• ${s}`).join("\n")}`
        : "",
      result.conversationStarters.length > 0
        ? `--- Conversation Starters ---\n${result.conversationStarters.map((s) => `• ${s}`).join("\n")}`
        : "",
      result.shortcuts.length > 0
        ? `--- Shortcuts ---\n${result.shortcuts.map((s) => `/${s.name}: ${s.template}`).join("\n")}`
        : "",
    ]
      .filter(Boolean)
      .join("\n");

    handleCopy(fullText, "all");
  }, [result, handleCopy]);

  // ---- Copy button helper ----
  const CopyButton = ({
    text,
    fieldId,
    size = "sm",
  }: {
    text: string;
    fieldId: string;
    size?: "sm" | "xs";
  }) => (
    <button
      onClick={() => handleCopy(text, fieldId)}
      className={`inline-flex items-center gap-1 rounded-lg border border-glass-border
        text-slate-500 hover:text-white hover:bg-white/5 transition-all cursor-pointer
        ${size === "sm" ? "px-2.5 py-1.5 text-xs" : "px-2 py-1 text-[11px]"}
      `}
    >
      {copiedField === fieldId ? (
        <>
          <CheckCheck className="h-3 w-3 text-green-400" />
          <span className="text-green-400">Copied</span>
        </>
      ) : (
        <>
          <Copy className="h-3 w-3" />
          Copy
        </>
      )}
    </button>
  );

  // ---- Field block helper ----
  const FieldBlock = ({
    label,
    value,
    fieldId,
    mono = false,
  }: {
    label: string;
    value: string;
    fieldId: string;
    mono?: boolean;
  }) => (
    <div className="rounded-xl bg-white/[0.02] border border-glass-border p-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
          {label}
        </span>
        <CopyButton text={value} fieldId={fieldId} size="xs" />
      </div>
      <div
        className={`text-sm text-slate-300 leading-relaxed whitespace-pre-wrap ${
          mono ? "font-mono text-[13px]" : ""
        }`}
      >
        {value}
      </div>
    </div>
  );

  // ---- Platform-specific rendering ----
  const renderTabContent = () => {
    switch (activeTab) {
      case "gems":
        return (
          <div className="space-y-4">
            <FieldBlock label="Name" value={result.name} fieldId="gems-name" />
            <FieldBlock
              label="Description"
              value={result.description}
              fieldId="gems-desc"
            />
            <FieldBlock
              label="Instructions"
              value={result.instructions}
              fieldId="gems-inst"
              mono
            />
            {result.knowledgeSuggestions.length > 0 && (
              <div className="rounded-xl bg-white/[0.02] border border-glass-border p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Upload className="h-3.5 w-3.5 text-slate-500" />
                  <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Knowledge — you might also want to upload
                  </span>
                </div>
                <ul className="space-y-1.5">
                  {result.knowledgeSuggestions.map((suggestion, i) => (
                    <li
                      key={i}
                      className="text-sm text-slate-400 flex items-start gap-2"
                    >
                      <span className="text-neon-cyan/50 mt-0.5">•</span>
                      {suggestion}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <PlatformGuide platform="gems" />
          </div>
        );

      case "gpts":
        return (
          <div className="space-y-4">
            <FieldBlock label="Name" value={result.name} fieldId="gpts-name" />
            <FieldBlock
              label="Description"
              value={result.description}
              fieldId="gpts-desc"
            />
            <FieldBlock
              label="Instructions"
              value={result.instructions}
              fieldId="gpts-inst"
              mono
            />
            {result.conversationStarters.length > 0 && (
              <div className="rounded-xl bg-white/[0.02] border border-glass-border p-4">
                <div className="flex items-center gap-2 mb-3">
                  <MessageCircle className="h-3.5 w-3.5 text-slate-500" />
                  <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Conversation Starters
                  </span>
                </div>
                <div className="space-y-2">
                  {result.conversationStarters.map((starter, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between rounded-lg bg-white/[0.03] border border-glass-border px-3 py-2"
                    >
                      <span className="text-sm text-slate-300">{starter}</span>
                      <CopyButton
                        text={starter}
                        fieldId={`starter-${i}`}
                        size="xs"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
            <PlatformGuide platform="gpts" />
          </div>
        );

      case "projects":
        return (
          <div className="space-y-4">
            <FieldBlock
              label="Project Name"
              value={result.name}
              fieldId="proj-name"
            />
            <FieldBlock
              label="Description"
              value={result.description}
              fieldId="proj-desc"
            />
            <FieldBlock
              label="Project Instructions"
              value={result.instructions}
              fieldId="proj-inst"
              mono
            />
            <PlatformGuide platform="projects" />
          </div>
        );

      case "raw":
        return (
          <div className="glass rounded-2xl border border-glass-border overflow-hidden">
            {/* Window chrome */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-glass-border bg-white/[0.02]">
              <div className="flex items-center gap-1.5">
                <div className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                <div className="h-3 w-3 rounded-full bg-[#febc2e]" />
                <div className="h-3 w-3 rounded-full bg-[#28c840]" />
              </div>
              <span className="text-xs text-slate-500 font-mono">
                ai-assistant.md
              </span>
              <CopyButton
                text={result.instructions}
                fieldId="raw"
                size="sm"
              />
            </div>
            {/* Content */}
            <div className="p-5 sm:p-6 overflow-y-auto max-h-[500px]">
              <pre className="text-sm sm:text-[15px] text-slate-300 whitespace-pre-wrap font-mono leading-relaxed">
                {result.instructions}
              </pre>
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
        );
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
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
          Your AI Assistant is Ready
        </h1>
        <p className="text-slate-400 text-sm sm:text-base">
          Copy the fields below into your preferred platform.
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

      {/* ---- Profile Card ---- */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1, ease: EASE_SMOOTH }}
        className="glass rounded-2xl border border-glass-border p-5 sm:p-6 mb-6"
        data-tour-step="profile"
      >
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-neon-cyan/15 to-neon-purple/15 border border-glass-border shrink-0">
            <Bot className="h-6 w-6 text-neon-purple-light" />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-lg sm:text-xl font-bold text-white truncate">
              {result.name}
            </h2>
            <p className="text-sm text-slate-400 mt-1 line-clamp-2">
              {result.description}
            </p>
          </div>
          <CopyButton
            text={`${result.name}\n${result.description}`}
            fieldId="profile"
          />
        </div>
      </motion.div>

      {/* ---- Platform Tabs ---- */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2, ease: EASE_SMOOTH }}
        data-tour-step="tabs"
      >
        <div className="flex gap-1 mb-6 p-1 rounded-xl bg-white/[0.03] border border-glass-border">
          {PLATFORM_TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex-1 flex items-center justify-center gap-2 rounded-lg px-3 py-2.5
                text-xs sm:text-sm font-medium transition-all duration-300 cursor-pointer
                ${
                  activeTab === tab.id
                    ? "bg-neon-purple/15 text-neon-purple-light border border-neon-purple/30"
                    : "text-slate-500 hover:text-slate-300 hover:bg-white/[0.03]"
                }
              `}
            >
              <span>{tab.emoji}</span>
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: EASE_SMOOTH }}
          >
            {renderTabContent()}
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* ---- Shortcuts Section ---- */}
      {result.shortcuts.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: EASE_SMOOTH }}
          className="mt-6"
          data-tour-step="shortcuts"
        >
          <div className="glass rounded-2xl border border-glass-border p-5 sm:p-6">
            <div className="flex items-center gap-2 mb-4">
              <Zap className="h-4 w-4 text-neon-purple-light" />
              <h3 className="text-sm font-semibold text-white">
                Quick Shortcuts
              </h3>
            </div>
            <div className="space-y-2.5">
              {result.shortcuts.map((shortcut, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between rounded-xl bg-white/[0.02] border border-glass-border px-4 py-3"
                >
                  <div className="flex-1 min-w-0 mr-3">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-medium text-neon-cyan-light">
                        /{shortcut.name.toLowerCase().replace(/\s+/g, "-")}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 font-mono truncate">
                      {shortcut.template.replace(
                        /\{\{([^}]+)\}\}/g,
                        (_, v) => `{{${v}}}`
                      )}
                    </p>
                  </div>
                  <CopyButton
                    text={shortcut.template}
                    fieldId={`shortcut-${i}`}
                    size="xs"
                  />
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* ---- Action Bar ---- */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4, ease: EASE_SMOOTH }}
        className="mt-6 flex flex-col sm:flex-row gap-3"
      >
        <motion.button
          onClick={handleCopyAll}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="glow-btn inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white cursor-pointer flex-1"
        >
          {copiedField === "all" ? (
            <>
              <CheckCheck className="h-4 w-4 text-green-400" />
              Everything Copied!
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" />
              Copy Everything
            </>
          )}
        </motion.button>

        <motion.button
          onClick={onReset}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-glass-border bg-glass-bg px-5 py-3 text-sm font-medium text-slate-400 hover:text-white hover:bg-white/5 transition-all cursor-pointer"
        >
          <RotateCcw className="h-4 w-4" />
          Start Over
        </motion.button>
      </motion.div>
    </div>
  );
}

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
  Minimize2,
  Maximize2,
  Loader2,
} from "lucide-react";
import PlatformGuide from "./PlatformGuide";
import type { GenerateResult } from "./StepWizard";
import { useT } from "@/i18n";

// ===== Types =====
interface OutputStudioProps {
  result: GenerateResult;
  onReset: () => void;
}

type PlatformTab = "gems" | "gpts" | "projects" | "raw";

const EASE_SMOOTH: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];


// ===== Component =====
export default function OutputStudio({
  result,
  onReset,
}: OutputStudioProps) {
  const t = useT("generate");

  const PLATFORM_TABS: { id: PlatformTab; label: string; emoji: string }[] = [
    { id: "gems", label: t("output.tabs.gems"), emoji: "💎" },
    { id: "gpts", label: t("output.tabs.gpts"), emoji: "🤖" },
    { id: "projects", label: t("output.tabs.projects"), emoji: "📂" },
    { id: "raw", label: t("output.tabs.raw"), emoji: "📄" },
  ];

  const [activeTab, setActiveTab] = useState<PlatformTab>("gems");
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // ---- Lite mode state ----
  const CHAR_LIMIT = 1000;
  const [liteMode, setLiteMode] = useState(false);
  const [liteInstructions, setLiteInstructions] = useState<string | null>(null);
  const [liteLoading, setLiteLoading] = useState(false);
  const [liteError, setLiteError] = useState<string | null>(null);

  // The instructions to display — full or lite
  const activeInstructions =
    liteMode && liteInstructions ? liteInstructions : result.instructions;

  const handleDistill = useCallback(async () => {
    // Already cached — just toggle
    if (liteInstructions) {
      setLiteMode(true);
      return;
    }

    setLiteMode(true);
    setLiteLoading(true);
    setLiteError(null);

    try {
      const res = await fetch("/api/distill", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          instructions: result.instructions,
          charLimit: CHAR_LIMIT,
        }),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const data = await res.json();
      if (!data.instructions) throw new Error("Empty response");

      setLiteInstructions(data.instructions);
    } catch {
      setLiteError(t("output.lite.error"));
      setLiteMode(false);
    } finally {
      setLiteLoading(false);
    }
  }, [result.instructions, liteInstructions, t]);

  // Computed metadata
  const wordCount = activeInstructions.split(/\s+/).filter(Boolean).length;
  const lineCount = activeInstructions.split("\n").length;
  const sectionCount = (activeInstructions.match(/^#+ /gm) || []).length;

  const handleCopy = useCallback(
    async (text: string, fieldId: string) => {
      try {
        await navigator.clipboard.writeText(text);
        setCopiedField(fieldId);
        setTimeout(() => setCopiedField(null), 2000);
      } catch {
        setError(t("output.copy.error"));
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
      activeInstructions,
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
  }, [result, activeInstructions, handleCopy]);

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
          <span className="text-green-400">{t("output.copy.copied")}</span>
        </>
      ) : (
        <>
          <Copy className="h-3 w-3" />
          {t("output.copy.default")}
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
            <FieldBlock label={t("output.fields.name")} value={result.name} fieldId="gems-name" />
            <FieldBlock
              label={t("output.fields.description")}
              value={result.description}
              fieldId="gems-desc"
            />
            <FieldBlock
              label={t("output.fields.instructions")}
              value={activeInstructions}
              fieldId="gems-inst"
              mono
            />
            {result.knowledgeSuggestions.length > 0 && (
              <div className="rounded-xl bg-white/[0.02] border border-glass-border p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Upload className="h-3.5 w-3.5 text-slate-500" />
                  <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                    {t("output.sections.knowledge")}
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
            {result.conversationStarters.length > 0 && (
              <div className="rounded-xl bg-white/[0.02] border border-glass-border p-4">
                <div className="flex items-center gap-2 mb-3">
                  <MessageCircle className="h-3.5 w-3.5 text-slate-500" />
                  <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                    {t("output.sections.conversationStarters")}
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
                        fieldId={`gems-starter-${i}`}
                        size="xs"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
            <PlatformGuide platform="gems" />
          </div>
        );

      case "gpts":
        return (
          <div className="space-y-4">
            <FieldBlock label={t("output.fields.name")} value={result.name} fieldId="gpts-name" />
            <FieldBlock
              label={t("output.fields.description")}
              value={result.description}
              fieldId="gpts-desc"
            />
            <FieldBlock
              label={t("output.fields.instructions")}
              value={activeInstructions}
              fieldId="gpts-inst"
              mono
            />
            {result.conversationStarters.length > 0 && (
              <div className="rounded-xl bg-white/[0.02] border border-glass-border p-4">
                <div className="flex items-center gap-2 mb-3">
                  <MessageCircle className="h-3.5 w-3.5 text-slate-500" />
                  <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                    {t("output.sections.conversationStarters")}
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
              label={t("output.fields.projectName")}
              value={result.name}
              fieldId="proj-name"
            />
            <FieldBlock
              label={t("output.fields.description")}
              value={result.description}
              fieldId="proj-desc"
            />
            <FieldBlock
              label={t("output.fields.projectInstructions")}
              value={activeInstructions}
              fieldId="proj-inst"
              mono
            />
            {result.conversationStarters.length > 0 && (
              <div className="rounded-xl bg-white/[0.02] border border-glass-border p-4">
                <div className="flex items-center gap-2 mb-3">
                  <MessageCircle className="h-3.5 w-3.5 text-slate-500" />
                  <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                    {t("output.sections.conversationStarters")}
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
                        fieldId={`proj-starter-${i}`}
                        size="xs"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
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
                text={activeInstructions}
                fieldId="raw"
                size="sm"
              />
            </div>
            {/* Content */}
            <div className="p-5 sm:p-6 overflow-y-auto max-h-[500px]">
              <pre className="text-sm sm:text-[15px] text-slate-300 whitespace-pre-wrap font-mono leading-relaxed">
                {activeInstructions}
              </pre>
            </div>
            {/* Metadata bar */}
            <div className="flex items-center gap-4 sm:gap-6 px-5 py-3 border-t border-glass-border bg-white/[0.01] text-[11px] sm:text-xs text-slate-600">
              <span className="flex items-center gap-1.5">
                <FileText className="h-3 w-3" />
                {t("output.metadata.words", { count: wordCount })}
              </span>
              <span className="flex items-center gap-1.5">
                <Hash className="h-3 w-3" />
                {t("output.metadata.sections", { count: sectionCount })}
              </span>
              <span>{t("output.metadata.lines", { count: lineCount })}</span>
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
          {t("output.title")}
        </h1>
        <p className="text-slate-400 text-sm sm:text-base">
          {t("output.subtitle")}
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

      {/* ---- Fallback Warning ---- */}
      {result.fallback && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 flex items-center gap-3 rounded-xl border border-amber-500/20 bg-amber-500/10 px-5 py-3 text-sm text-amber-300"
        >
          <AlertCircle className="h-4 w-4 shrink-0 text-amber-400" />
          <div>
            <span className="font-medium">{t("output.fallback.title")}</span>
            {" — "}
            {t("output.fallback.message")}
          </div>
        </motion.div>
      )}

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

      {/* ---- Full / Lite Toggle ---- */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15, ease: EASE_SMOOTH }}
        className="mb-6"
      >
        <div className="flex items-center justify-between rounded-xl bg-white/[0.02] border border-glass-border px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="flex gap-1 p-0.5 rounded-lg bg-white/[0.03] border border-glass-border">
              <button
                onClick={() => setLiteMode(false)}
                className={`
                  flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium
                  transition-all duration-200 cursor-pointer
                  ${!liteMode
                    ? "bg-neon-purple/15 text-neon-purple-light border border-neon-purple/30"
                    : "text-slate-500 hover:text-slate-300"
                  }
                `}
              >
                <Maximize2 className="h-3 w-3" />
                {t("output.lite.full")}
              </button>
              <button
                onClick={handleDistill}
                disabled={liteLoading}
                className={`
                  flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium
                  transition-all duration-200 cursor-pointer
                  ${liteMode
                    ? "bg-neon-cyan/15 text-neon-cyan-light border border-neon-cyan/30"
                    : "text-slate-500 hover:text-slate-300"
                  }
                  ${liteLoading ? "opacity-60 cursor-wait" : ""}
                `}
              >
                {liteLoading ? (
                  <Loader2 className="h-3 w-3 animate-spin" />
                ) : (
                  <Minimize2 className="h-3 w-3" />
                )}
                {liteLoading ? t("output.lite.generating") : t("output.lite.label")}
              </button>
            </div>

            {/* Character count badge (Lite mode only) */}
            {liteMode && liteInstructions && (
              <span
                className={`text-[11px] font-mono px-2 py-0.5 rounded-md border ${
                  liteInstructions.length <= CHAR_LIMIT * 0.9
                    ? "text-emerald-400 border-emerald-500/20 bg-emerald-500/10"
                    : liteInstructions.length <= CHAR_LIMIT
                    ? "text-amber-400 border-amber-500/20 bg-amber-500/10"
                    : "text-red-400 border-red-500/20 bg-red-500/10"
                }`}
              >
                {t("output.lite.charCount", {
                  count: liteInstructions.length,
                  limit: CHAR_LIMIT,
                })}
              </span>
            )}
          </div>

          {/* Badge text */}
          {liteMode && !liteLoading && (
            <span className="text-[11px] text-slate-500 hidden sm:inline">
              {t("output.lite.badge")}
            </span>
          )}
        </div>

        {/* Lite error */}
        <AnimatePresence>
          {liteError && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="mt-2 flex items-center gap-2 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-2 text-xs text-red-300"
            >
              <AlertCircle className="h-3.5 w-3.5 shrink-0" />
              {liteError}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* ---- Platform Tabs ---- */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2, ease: EASE_SMOOTH }}
        data-tour-step="tabs"
        className="relative"
      >
        {/* Distillation Loading Overlay */}
        <AnimatePresence>
          {liteLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 z-20 flex flex-col items-center justify-center rounded-2xl bg-[#030014]/80 backdrop-blur-sm border border-neon-cyan/20"
            >
              <div className="flex flex-col items-center gap-4 py-16">
                <div className="relative">
                  <div className="h-12 w-12 rounded-full border-2 border-neon-cyan/20" />
                  <div className="absolute inset-0 h-12 w-12 rounded-full border-2 border-transparent border-t-neon-cyan animate-spin" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-neon-cyan-light">
                    {t("output.lite.generating")}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    {t("output.lite.generatingHint")}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

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
                {t("output.sections.shortcuts")}
              </h3>
            </div>

            {/* Usage guide */}
            <div className="rounded-xl bg-neon-cyan/[0.04] border border-neon-cyan/10 px-4 py-3 mb-4">
              <p className="text-xs text-slate-300 leading-relaxed">
                <span className="font-medium text-neon-cyan-light">{t("output.shortcuts.guide.title")}</span>{" "}
                {t("output.shortcuts.guide.desc").split(/<1>|<\/1>/)[0]}
                <code className="text-neon-purple-light bg-white/[0.05] px-1 py-0.5 rounded text-[11px]">
                  {"{{variables}}"}
                </code>{" "}
                {t("output.shortcuts.guide.desc").split(/<1>|<\/1>/)[2]}
              </p>
              <p className="text-[11px] text-slate-500 mt-1.5">
                {t("output.shortcuts.guide.note")}
              </p>
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
              {t("output.copy.allCopied")}
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" />
              {t("output.copy.all")}
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
          {t("output.startOver")}
        </motion.button>
      </motion.div>
    </div>
  );
}

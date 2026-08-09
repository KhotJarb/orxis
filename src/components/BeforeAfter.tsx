"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X } from "lucide-react";
import { useT } from "@/i18n";

const EASE_SMOOTH: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

// ===== Response Content =====

function BeforeContent() {
  return (
    <div className="text-sm text-[var(--text-subtle)] leading-relaxed space-y-3 font-sans">
      <p>Sure! Here&apos;s some information about React hooks.</p>
      <p>
        React hooks are functions that let you &quot;hook into&quot; React state
        and lifecycle features from function components. They were introduced in
        React 16.8.
      </p>
      <p>
        The most commonly used hooks are useState and useEffect. useState lets
        you add state to a component, and useEffect lets you perform side
        effects like data fetching.
      </p>
      <p>
        There are also some other hooks like useContext, useReducer, and useRef
        that you might find useful depending on your use case.
      </p>
      <p>Hope this helps! Let me know if you have any questions.</p>
    </div>
  );
}

function AfterContent() {
  return (
    <div className="space-y-5">
      {/* Title */}
      <h4 className="text-base sm:text-lg font-bold text-neon-cyan">
        React Hooks — Complete Reference
      </h4>

      {/* Table */}
      <div>
        <h5 className="text-xs sm:text-sm font-semibold text-[var(--text-heading)] mb-2.5">
          Core Hooks at a Glance
        </h5>
        <div className="rounded-lg border border-glass-border overflow-hidden text-xs">
          <table className="w-full">
            <thead className="bg-[var(--glass-bg)]">
              <tr>
                <th className="px-3 py-2 text-left text-[var(--text-muted)] font-medium">
                  Hook
                </th>
                <th className="px-3 py-2 text-left text-slate-400 font-medium">
                  Purpose
                </th>
                <th className="px-3 py-2 text-left text-slate-400 font-medium hidden sm:table-cell">
                  Use Case
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-glass-border">
              {[
                ["useState", "Reactive local state", "Form inputs, toggles"],
                ["useEffect", "Side effects & lifecycle", "API calls, subs"],
                ["useRef", "Mutable references", "DOM access, timers"],
                ["useMemo", "Memoized computations", "Derived data, filtering"],
                [
                  "useCallback",
                  "Stable function refs",
                  "Event handlers, deps",
                ],
              ].map(([hook, purpose, useCase]) => (
                <tr key={hook} className="hover:bg-white/[0.02]">
                  <td className="px-3 py-2 text-neon-cyan font-mono">
                    {hook}
                  </td>
                  <td className="px-3 py-2 text-[var(--text-body)]">{purpose}</td>
                  <td className="px-3 py-2 text-[var(--text-muted)] hidden sm:table-cell">
                    {useCase}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Best Practices */}
      <div>
        <h5 className="text-xs sm:text-sm font-semibold text-[var(--text-heading)] mb-2">
          Best Practices
        </h5>
        <ol className="space-y-1.5 text-xs sm:text-sm text-[var(--text-body)]">
          <li>
            <span className="text-neon-purple font-semibold">1.</span>{" "}
            <span className="text-[var(--text-heading)] font-medium">
              Follow the Rules of Hooks
            </span>{" "}
            — Call at the top level only; never inside loops or conditions
          </li>
          <li>
            <span className="text-neon-purple font-semibold">2.</span>{" "}
            <span className="text-[var(--text-heading)] font-medium">
              Extract Custom Hooks
            </span>{" "}
            — Reuse logic via{" "}
            <code className="text-neon-cyan bg-neon-cyan/10 px-1 py-0.5 rounded text-[11px]">
              use*
            </code>{" "}
            naming convention
          </li>
          <li>
            <span className="text-neon-purple font-semibold">3.</span>{" "}
            <span className="text-[var(--text-heading)] font-medium">
              Specify Dependencies
            </span>{" "}
            — Always declare exact dependency arrays to prevent stale closures
          </li>
        </ol>
      </div>

      {/* Warning box */}
      <div className="rounded-xl bg-amber-500/[0.06] border border-amber-500/15 px-4 py-3">
        <p className="text-xs sm:text-sm text-amber-300 font-medium mb-1.5">
          ⚠️ Common Pitfalls
        </p>
        <ul className="space-y-1 text-[11px] sm:text-xs text-[var(--text-muted)]">
          <li>
            • Missing cleanup in{" "}
            <code className="text-amber-400 bg-amber-500/10 px-1 rounded">
              useEffect
            </code>{" "}
            →{" "}
            <span className="text-red-400 font-medium">
              memory leaks on unmount
            </span>
          </li>
          <li>
            • Object/array deps without memoization →{" "}
            <span className="text-red-400 font-medium">
              infinite re-renders
            </span>
          </li>
          <li>
            • Reading stale state inside async closures → use{" "}
            <code className="text-amber-400 bg-amber-500/10 px-1 rounded">
              useRef
            </code>{" "}
            as escape hatch
          </li>
        </ul>
      </div>

      {/* Next step box */}
      <div className="rounded-xl bg-neon-cyan/[0.05] border border-neon-cyan/15 px-4 py-3 text-xs sm:text-sm">
        <span className="text-neon-cyan font-semibold">Next Step: </span>
        <span className="text-[var(--text-body)]">
          Build a custom{" "}
          <code className="text-neon-cyan bg-neon-cyan/10 px-1 py-0.5 rounded text-[11px]">
            useFetch
          </code>{" "}
          hook to centralize your API layer with caching, error handling, and
          automatic retries.
        </span>
      </div>
    </div>
  );
}

// ===== Main Component =====
export default function BeforeAfter() {
  const t = useT("home");
  const [showAfter, setShowAfter] = useState(false);

  return (
    <section className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(139,92,246,0.04)_0%,_transparent_60%)]" />

      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: EASE_SMOOTH }}
        className="text-center mb-14 sm:mb-20 relative z-10"
      >
        <div className="inline-flex items-center gap-2 rounded-full border border-glass-border bg-glass-bg px-4 py-2 text-xs sm:text-sm font-medium text-neon-purple-light mb-6">
          <Sparkles className="h-3.5 w-3.5" />
          {t("beforeAfter.badge")}
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--text-heading)] mb-4">
          {t("beforeAfter.title")} <span className="text-gradient">{t("beforeAfter.titleHighlight")}</span> {t("beforeAfter.titleEnd")}
        </h2>
        <p className="max-w-xl mx-auto text-[var(--text-muted)] text-base sm:text-lg leading-relaxed">
          {t("beforeAfter.description")}
        </p>
      </motion.div>

      {/* Content */}
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Toggle Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE_SMOOTH }}
          className="flex items-center justify-center gap-3 mb-8"
        >
          <button
            onClick={() => setShowAfter(false)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${
              !showAfter
                ? "bg-[var(--glass-bg-hover)] text-[var(--text-heading)] border border-[var(--border-medium)]"
                : "text-[var(--text-subtle)] hover:text-[var(--text-body)]"
            }`}
          >
            <span className="flex items-center gap-2">
              <X className="h-3.5 w-3.5 text-red-400" />
              {t("beforeAfter.toggle.without")}
            </span>
          </button>

          {/* Toggle Switch */}
          <button
            onClick={() => setShowAfter(!showAfter)}
            aria-label="Toggle comparison"
            className="relative w-14 h-7 rounded-full border border-glass-border bg-white/5 cursor-pointer transition-all duration-300 shrink-0"
          >
            <motion.div
            className="absolute top-0.5 left-0.5 h-6 w-6 rounded-full"
            animate={{
              x: showAfter ? 28 : 0,
              backgroundColor: showAfter ? "rgba(6,182,212,0.9)" : "rgba(255,255,255,0.25)",
            }}
            transition={{ duration: 0.3, ease: "easeOut" as const }}
          />
          </button>

          <button
            onClick={() => setShowAfter(true)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${
              showAfter
                ? "bg-gradient-to-r from-neon-cyan/10 to-neon-purple/10 text-[var(--text-heading)] border border-neon-cyan/20"
                : "text-[var(--text-subtle)] hover:text-[var(--text-body)]"
            }`}
          >
            <span className="flex items-center gap-2">
              <Sparkles className="h-3.5 w-3.5 text-neon-cyan" />
              {t("beforeAfter.toggle.with")}
            </span>
          </button>
        </motion.div>

        {/* Prompt Label */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1, ease: EASE_SMOOTH }}
          className="mb-4 px-5 py-3 rounded-xl bg-[var(--glass-bg)] border border-glass-border text-sm"
        >
          <span className="text-[var(--text-subtle)]">{t("beforeAfter.promptLabel")}</span>
          <span className="text-[var(--text-body)] font-medium">
            {t("beforeAfter.promptText")}
          </span>
        </motion.div>

        {/* Response Area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2, ease: EASE_SMOOTH }}
          className="relative"
        >
          <AnimatePresence mode="wait">
            {!showAfter ? (
              /* ── Before State ── */
              <motion.div
                key="before"
                initial={{ opacity: 0, x: -20, filter: "blur(6px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, x: 20, filter: "blur(6px)" }}
                transition={{ duration: 0.4, ease: EASE_SMOOTH }}
                className="rounded-2xl border border-red-500/10 bg-white/[0.015] overflow-hidden"
              >
                {/* Window chrome */}
                <div className="flex items-center gap-2 px-5 py-3 border-b border-glass-border bg-white/[0.01]">
                  <div className="flex gap-1.5">
                    <div className="h-3 w-3 rounded-full bg-red-500/30" />
                    <div className="h-3 w-3 rounded-full bg-slate-700/50" />
                    <div className="h-3 w-3 rounded-full bg-slate-700/50" />
                  </div>
                  <span className="text-[11px] text-red-400/50 font-mono ml-2">
                    {t("beforeAfter.before.fileName")}
                  </span>
                </div>

                {/* Content */}
                <div className="p-5 sm:p-6">
                  <BeforeContent />
                </div>

                {/* Footer */}
                <div className="px-5 py-3 border-t border-glass-border bg-white/[0.01] flex items-center gap-2 text-[11px] text-red-400/40">
                  <X className="h-3 w-3" />
                  {t("beforeAfter.before.footer")}
                </div>
              </motion.div>
            ) : (
              /* ── After State ── */
              <motion.div
                key="after"
                initial={{ opacity: 0, x: -20, filter: "blur(6px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, x: 20, filter: "blur(6px)" }}
                transition={{ duration: 0.4, ease: EASE_SMOOTH }}
                className="rounded-2xl border border-neon-cyan/15 bg-white/[0.015] overflow-hidden relative"
              >
                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/[0.015] to-neon-purple/[0.015] pointer-events-none" />

                {/* Window chrome */}
                <div className="relative flex items-center gap-2 px-5 py-3 border-b border-glass-border bg-white/[0.02]">
                  <div className="flex gap-1.5">
                    <div className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                    <div className="h-3 w-3 rounded-full bg-[#febc2e]" />
                    <div className="h-3 w-3 rounded-full bg-[#28c840]" />
                  </div>
                  <span className="text-[11px] text-neon-cyan/50 font-mono ml-2">
                    {t("beforeAfter.after.fileName")}
                  </span>
                </div>

                {/* Content */}
                <div className="relative p-5 sm:p-6">
                  <AfterContent />
                </div>

                {/* Footer */}
                <div className="relative px-5 py-3 border-t border-glass-border bg-white/[0.01] flex items-center gap-2 text-[11px] text-neon-cyan/40">
                  <Sparkles className="h-3 w-3" />
                  {t("beforeAfter.after.footer")}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Impact Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3, ease: EASE_SMOOTH }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6"
        >
          {[
            { stat: t("beforeAfter.stats.structured.stat"), label: t("beforeAfter.stats.structured.label") },
            { stat: t("beforeAfter.stats.filler.stat"), label: t("beforeAfter.stats.filler.label") },
            { stat: t("beforeAfter.stats.actionable.stat"), label: t("beforeAfter.stats.actionable.label") },
            { stat: t("beforeAfter.stats.reusable.stat"), label: t("beforeAfter.stats.reusable.label") },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-xl bg-[var(--glass-bg)] border border-glass-border p-3 sm:p-4 text-center"
            >
              <p className="text-lg sm:text-xl font-bold text-gradient mb-0.5">
                {item.stat}
              </p>
              <p className="text-[11px] sm:text-xs text-[var(--text-subtle)]">
                {item.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

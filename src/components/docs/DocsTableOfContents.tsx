"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import type { DocPageId } from "@/components/docs/DocsSidebar";

// ── ToC definitions per page ───────────────────────────────────────────────
// IDs must exactly match the id= attributes in the rendered component files.

interface TocItem {
  id: string;
  label: string;
  level: 2 | 3;
}

const TOC_BY_PAGE: Record<DocPageId, TocItem[]> = {
  // ── Getting Started ───────────────────────────────────────────────────────
  introduction: [
    { id: "introduction",                 label: "Introduction",                  level: 2 },
    { id: "what-are-custom-instructions", label: "What Are Custom Instructions?", level: 3 },
    { id: "why-it-matters",               label: "Why It Matters",                level: 3 },
  ],
  "quick-start": [
    { id: "quick-start",     label: "Quick Start",                    level: 2 },
    { id: "step-1-describe", label: "Step 1 — Describe Your Persona", level: 3 },
    { id: "step-2-task",     label: "Step 2 — Define Your Task",      level: 3 },
    { id: "step-3-tone",     label: "Step 3 — Set the Tone",          level: 3 },
    { id: "step-4-rules",    label: "Step 4 — Add Rules",             level: 3 },
  ],
  "core-concepts": [
    { id: "core-concepts",    label: "Core Concepts",      level: 2 },
    { id: "the-six-sections", label: "The Six Sections",   level: 3 },
    { id: "cognitive-loop",   label: "The Cognitive Loop", level: 3 },
  ],

  // ── Platform Guides — IDs verified against actual component files ─────────
  chatgpt: [
    { id: "chatgpt",            label: "Using Instructions with ChatGPT", level: 2 },
    { id: "why-chatgpt-excels", label: "Why ChatGPT Excels",              level: 3 },
    { id: "two-field-strategy", label: "Two-Field Strategy",              level: 3 },
    { id: "step-by-step-setup", label: "Step-by-Step Setup",             level: 3 },
    { id: "chatgpt-projects",   label: "Using ChatGPT Projects",          level: 3 },
    { id: "api-integration",    label: "API Integration",                 level: 3 },
  ],
  claude: [
    { id: "claude",            label: "Using Instructions with Claude", level: 2 },
    { id: "why-claude-excels", label: "Why Claude Excels",              level: 3 },
    { id: "claude-projects",   label: "Claude Projects (Recommended)",  level: 3 },
    { id: "direct-chat-method",label: "Direct Chat Method",             level: 3 },
    { id: "xml-advantage",     label: "The XML Advantage",              level: 3 },
    { id: "api-integration",   label: "API Integration",                level: 3 },
  ],
  gemini: [
    { id: "gemini",            label: "Using Instructions with Gemini", level: 2 },
    { id: "why-gemini-excels", label: "Why Gemini Excels",              level: 3 },
    { id: "ai-studio",         label: "Google AI Studio",               level: 3 },
    { id: "gemini-advanced",   label: "Gemini Advanced",                level: 3 },
    { id: "gemini-workspace",  label: "Workspace Integration",          level: 3 },
    { id: "gemini-api",        label: "API Integration",                level: 3 },
  ],
  "other-llms": [
    { id: "other-llms",           label: "Overview",             level: 2 },
    { id: "local-environments",   label: "Local Environments",   level: 2 },
    { id: "lm-studio",            label: "LM Studio",            level: 3 },
    { id: "ollama",               label: "Ollama (Modelfile)",   level: 3 },
    { id: "api-integration",      label: "API Integration",      level: 2 },
    { id: "messages-format",      label: "Messages Format",      level: 3 },
    { id: "python-example",       label: "Python Example",       level: 3 },
    { id: "compatible-providers", label: "Compatible Providers", level: 3 },
  ],

  // ── Advanced ──────────────────────────────────────────────────────────────
  "prompt-chaining": [
    { id: "prompt-chaining",         label: "Prompt Chaining Strategies",  level: 2 },
    { id: "the-core-chain",          label: "The Three-Phase Master Chain", level: 3 },
    { id: "advanced-chain-patterns", label: "Advanced Chaining Patterns",  level: 3 },
    { id: "critique-chain",          label: "Critique-Revise Chain",        level: 3 },
    { id: "parallel-chain",          label: "Parallel Synthesis Chain",     level: 3 },
    { id: "refinement-chain",        label: "Iterative Refinement Chain",   level: 3 },
    { id: "chain-by-model",          label: "Which Model to Chain With",    level: 3 },
  ],
  "context-injection": [
    { id: "context-injection",  label: "Context & Knowledge Injection", level: 2 },
    { id: "what-to-inject",     label: "What to Inject",                level: 3 },
    { id: "how-to-inject",      label: "How to Inject by Platform",     level: 3 },
    { id: "inject-chatgpt",     label: "ChatGPT",                       level: 3 },
    { id: "inject-claude",      label: "Claude",                        level: 3 },
    { id: "inject-gemini",      label: "Gemini",                        level: 3 },
    { id: "manual-rag",         label: "Manual RAG Technique",          level: 3 },
    { id: "rag-chunking",       label: "Step 1 — Curate, Don't Dump",   level: 3 },
    { id: "rag-labeling",       label: "Step 2 — Label Context Blocks", level: 3 },
    { id: "rag-verification",   label: "Step 3 — Source Attribution",   level: 3 },
    { id: "codebase-injection", label: "Codebase Injection",            level: 3 },
  ],
  "best-practices": [
    { id: "best-practices",     label: "Best Practices",         level: 2 },
    { id: "golden-rules",       label: "The 3 Golden Rules",     level: 3 },
    { id: "tone-stacking",      label: "Tone Stacking",          level: 3 },
    { id: "persona-multiplier", label: "The Persona Multiplier", level: 3 },
    { id: "rules-that-work",    label: "Universally Effective Rules", level: 3 },
    { id: "anti-patterns",      label: "Anti-Patterns to Avoid", level: 3 },
  ],
};

const GETTING_STARTED = new Set<DocPageId>([
  "introduction",
  "quick-start",
  "core-concepts",
]);

// ── Component ──────────────────────────────────────────────────────────────

export default function DocsTableOfContents({ activePage }: { activePage: DocPageId }) {
  const tocItems = TOC_BY_PAGE[activePage] ?? [];
  const [activeId, setActiveId] = useState<string>(tocItems[0]?.id ?? "");

  // Tracks the previous activePage to decide the correct delay
  const prevPageRef = useRef<DocPageId>(activePage);
  // Refs for imperative cleanup — avoids stale closures in return functions
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const scrollCleanupRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    // ── Stop anything from the previous page ──────────────────────────────
    if (timerRef.current !== null) clearTimeout(timerRef.current);
    if (scrollCleanupRef.current) {
      scrollCleanupRef.current();
      scrollCleanupRef.current = null;
    }

    // Reset highlight to the first item immediately
    setActiveId(tocItems[0]?.id ?? "");

    // ── Choose the right delay ─────────────────────────────────────────────
    // AnimatePresence (mode="wait") takes ~200ms to exit the previous page
    // before the new page starts mounting. We must wait for the new DOM.
    //
    // EXCEPTION: scrolling WITHIN Getting Started keeps the same animationKey
    // ("getting-started") — AnimatePresence never re-mounts the content, so
    // all headings are already in the DOM and we need zero delay.
    //
    // Specifically: if BOTH the previous and current page are Getting Started,
    // this is a scroll-triggered activePage change — use 0ms.
    // In every other case (entering from or leaving to another section), use 260ms.
    const prevPage = prevPageRef.current;
    prevPageRef.current = activePage;

    const scrollingWithinGS =
      GETTING_STARTED.has(prevPage) && GETTING_STARTED.has(activePage);
    const delay = scrollingWithinGS ? 0 : 260;

    // ── Attach the scroll listener after the delay ─────────────────────────
    timerRef.current = setTimeout(() => {
      const headings = tocItems
        .map(({ id }) => document.getElementById(id))
        .filter(Boolean) as HTMLElement[];

      if (!headings.length) return;

      // Scroll listener strategy (vs IntersectionObserver):
      // Always reads live getBoundingClientRect() — no stale Y positions,
      // no jumping, works identically scrolling in either direction.
      const THRESHOLD = 120; // px from top of viewport (below navbar)

      const update = () => {
        // Walk headings in DOM order; the active one is the LAST heading
        // whose top edge has scrolled at or above the threshold line.
        let active = headings[0];
        for (const el of headings) {
          if (el.getBoundingClientRect().top <= THRESHOLD) {
            active = el;
          }
        }
        setActiveId(active.id);
      };

      update(); // set correct initial state without waiting for a scroll event
      window.addEventListener("scroll", update, { passive: true });
      scrollCleanupRef.current = () =>
        window.removeEventListener("scroll", update);
    }, delay);

    // ── Cleanup on unmount or next activePage change ───────────────────────
    return () => {
      if (timerRef.current !== null) clearTimeout(timerRef.current);
      if (scrollCleanupRef.current) {
        scrollCleanupRef.current();
        scrollCleanupRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activePage]);

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="w-52 pt-2">
      <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.12em] text-slate-600">
        On this page
      </p>

      <nav className="relative">
        <div className="absolute left-0 top-0 h-full w-px bg-white/[0.06]" />
        <ul className="space-y-0.5 pl-4">
          {tocItems.map((item) => {
            const isActive = activeId === item.id;
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={`relative block py-[3px] text-[12.5px] leading-relaxed transition-colors duration-150 ${
                    item.level === 3 ? "pl-3" : ""
                  } ${
                    isActive
                      ? "font-semibold text-neon-cyan"
                      : "text-slate-600 hover:text-slate-300"
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    document
                      .getElementById(item.id)
                      ?.scrollIntoView({ behavior: "smooth", block: "start" });
                    setActiveId(item.id);
                  }}
                >
                  {isActive && (
                    <motion.span
                      layoutId="toc-active-dot"
                      className="absolute -left-[1.125rem] top-1/2 h-[7px] w-[7px] -translate-y-1/2 rounded-full bg-neon-cyan shadow-[0_0_8px_rgba(6,182,212,0.9)]"
                      transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    />
                  )}
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="mt-8 rounded-xl border border-white/[0.07] bg-white/[0.02] p-4">
        <p className="text-xs font-semibold text-slate-300">Was this helpful?</p>
        <p className="mt-1 text-xs text-slate-600 leading-relaxed">
          Help us improve the docs.
        </p>
        <div className="mt-3 flex gap-2">
          {["👍", "👎"].map((emoji) => (
            <button
              key={emoji}
              className="flex-1 rounded-lg border border-white/[0.07] bg-white/[0.03] py-1.5 text-sm transition-all duration-150 hover:bg-white/[0.07] hover:border-white/20 active:scale-95"
            >
              {emoji}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

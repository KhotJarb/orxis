"use client";

import { motion } from "framer-motion";
import { Dna, Lock, Globe, Layers } from "lucide-react";

const EASE_SMOOTH: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

// ===== Animation Variants =====
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: EASE_SMOOTH },
  },
};

// ===== Data =====
const aiModels = [
  {
    name: "ChatGPT",
    color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  },
  {
    name: "Claude",
    color: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  },
  {
    name: "Gemini",
    color: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  },
  {
    name: "Copilot",
    color: "bg-sky-500/10 text-sky-400 border-sky-500/20",
  },
  {
    name: "Llama",
    color: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  },
  {
    name: "Mistral",
    color: "bg-orange-500/10 text-orange-400 border-orange-500/20",
  },
];

const pillars = [
  { label: "Persona", desc: "Who the AI is", textColor: "text-neon-cyan" },
  { label: "Task", desc: "What it does", textColor: "text-neon-purple" },
  { label: "Tone", desc: "How it speaks", textColor: "text-amber-400" },
  { label: "Rules", desc: "What it follows", textColor: "text-emerald-400" },
];

// ===== Component =====
export default function BentoGrid() {
  return (
    <section className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(6,182,212,0.04)_0%,_transparent_60%)]" />

      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: EASE_SMOOTH }}
        className="text-center mb-14 sm:mb-20 relative z-10"
      >
        <div className="inline-flex items-center gap-2 rounded-full border border-glass-border bg-glass-bg px-4 py-2 text-xs sm:text-sm font-medium text-neon-cyan-light mb-6">
          <Dna className="h-3.5 w-3.5" />
          Understanding the Core
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--text-heading)] mb-4">
          What is a{" "}
          <span className="text-gradient">Custom Instruction</span>?
        </h2>
        <p className="max-w-2xl mx-auto text-[var(--text-muted)] text-base sm:text-lg leading-relaxed">
          The most powerful and underused feature in AI today. Here&apos;s
          everything you need to know, in one place.
        </p>
      </motion.div>

      {/* ===== Bento Grid ===== */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 relative z-10"
      >
        {/* ── Card 1: The DNA (Hero — 2 cols) ── */}
        <motion.div
          variants={itemVariants}
          whileHover={{ y: -4, transition: { duration: 0.3 } }}
          className="md:col-span-2 glass rounded-2xl border border-glass-border p-6 sm:p-8 group cursor-default overflow-hidden relative"
        >
          <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-bl from-neon-cyan/[0.04] to-transparent rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-5">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/20 shrink-0">
                <Dna className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-[var(--text-heading)]">
                  The DNA of Your AI
                </h3>
                <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-neon-cyan-light">
                  Core Definition
                </p>
              </div>
            </div>

            <p className="text-[var(--text-body)] leading-relaxed mb-4">
              A Custom Instruction is a{" "}
              <span className="text-[var(--text-heading)] font-semibold">
                persistent set of directives
              </span>{" "}
              you give to an AI assistant that shapes its behavior, personality,
              and output format for{" "}
              <span className="text-neon-cyan-light">
                every single conversation
              </span>
              . Think of it as programming the AI&apos;s identity layer.
            </p>
            <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-4">
              It tells the model exactly who to be, how to think, and what rules
              to follow — before you even ask your first question. Unlike regular
              prompts that apply to a single message, Custom Instructions persist
              across all interactions, creating a consistently tailored
              experience that feels like working with a specialist, not a
              generalist.
            </p>
            <p className="text-sm text-[var(--text-muted)] leading-relaxed">
              When crafted properly, a Custom Instruction can transform a
              generic chatbot into a senior engineer who writes production-ready
              code, a writing coach who mirrors your exact voice and style, or a
              strategic advisor who reasons consistently within your defined
              framework.
            </p>

            <div className="flex items-center gap-2 text-[11px] sm:text-xs text-[var(--text-subtle)] border-t border-glass-border pt-4 mt-5">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-neon-cyan shrink-0" />
              Also known as: System Prompts, Meta Prompts, AI Personas,
              Behavioral Directives
            </div>
          </div>
        </motion.div>

        {/* ── Card 2: The Secret Sauce (1 col) ── */}
        <motion.div
          variants={itemVariants}
          whileHover={{ y: -4, transition: { duration: 0.3 } }}
          className="glass rounded-2xl border border-glass-border p-6 sm:p-8 group cursor-default overflow-hidden relative"
        >
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-neon-purple/[0.04] to-transparent rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

          <div className="relative z-10">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-neon-purple/10 text-neon-purple border border-neon-purple/20 mb-5">
              <Lock className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-bold text-[var(--text-heading)] mb-1">
              The Secret Sauce
            </h3>
            <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-neon-purple-light mb-4">
              Constraints &amp; Rules
            </p>

            <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-4">
              The real power lies in constraints. By defining what the AI should{" "}
              <span className="text-[var(--text-heading)] font-medium">NOT</span> do, you
              paradoxically make it better:
            </p>

            <ul className="space-y-2.5">
              {[
                "Eliminate fluff and filler phrases",
                "Enforce specific output formats",
                "Set domain-specific boundaries",
                "Control response length & detail",
                "Discourage hallucinated citations",
                "Lock in consistent terminology",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2.5 text-xs sm:text-sm text-[var(--text-muted)]"
                >
                  <span className="h-1 w-1 rounded-full bg-neon-purple shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* ── Card 3: Universal Compatibility (1 col) ── */}
        <motion.div
          variants={itemVariants}
          whileHover={{ y: -4, transition: { duration: 0.3 } }}
          className="glass rounded-2xl border border-glass-border p-6 sm:p-8 group cursor-default overflow-hidden relative"
        >
          <div className="relative z-10">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-5">
              <Globe className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-bold text-[var(--text-heading)] mb-1">
              Universal Compatibility
            </h3>
            <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-4">
              Works Everywhere
            </p>

            <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-4">
              Our generated instructions are model-agnostic. Paste them into any
              AI assistant&apos;s system prompt or custom instructions field and
              get immediate results.
            </p>

            <div className="flex flex-wrap gap-2">
              {aiModels.map((model) => (
                <span
                  key={model.name}
                  className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-medium ${model.color}`}
                >
                  {model.name}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ── Card 4: The Anatomy (2 cols) ── */}
        <motion.div
          variants={itemVariants}
          whileHover={{ y: -4, transition: { duration: 0.3 } }}
          className="md:col-span-2 glass rounded-2xl border border-glass-border p-6 sm:p-8 group cursor-default overflow-hidden relative"
        >
          <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-amber-500/[0.03] to-transparent rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-5">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 shrink-0">
                <Layers className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-[var(--text-heading)]">
                  The Anatomy
                </h3>
                <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-amber-400">
                  The Four Pillars
                </p>
              </div>
            </div>

            <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-5">
              Every master custom instruction is built on four foundational
              pillars. Our generator crafts each one for you through an
              interactive wizard — no prompt engineering expertise required.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {pillars.map((pillar) => (
                <div
                  key={pillar.label}
                  className="rounded-xl bg-[var(--glass-bg)] border border-[var(--border-subtle)] p-3.5 text-center group/pillar hover:bg-[var(--glass-bg-hover)] hover:border-[var(--border-medium)] transition-all duration-300"
                >
                  <p
                    className={`text-sm font-semibold ${pillar.textColor} mb-0.5`}
                  >
                    {pillar.label}
                  </p>
                  <p className="text-[11px] text-[var(--text-subtle)]">{pillar.desc}</p>
                </div>
              ))}
            </div>

            <p className="text-xs text-[var(--text-subtle)] mt-4 leading-relaxed">
              Each pillar is independent but interconnected. A strong Persona
              without clear Rules still produces inconsistent output. Our engine
              ensures all four work in harmony.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

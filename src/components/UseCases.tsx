"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Terminal,
  Video,
  Sparkles,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  Zap,
  Shield,
  Clock,
  TrendingUp,
} from "lucide-react";

// ── Data ───────────────────────────────────────────────────────────────────

const PROFESSIONS = [
  {
    id: "developers",
    label: "Software & Game Developers",
    shortLabel: "Developers",
    Icon: Terminal,
    accentRgb: "6,182,212",
    accentClass: "text-neon-cyan",
    accentBg: "bg-neon-cyan/[0.08]",
    accentBorder: "border-neon-cyan/20",
    accentGlow: "shadow-[0_0_40px_rgba(6,182,212,0.1)]",
    tagline: "From scattered LLM outputs to architectural precision.",
    problem: {
      heading: "The Problem",
      body: "LLMs lose track of complex game state logic, API architectures, and strict typing rules across long sessions. Every new chat resets the context entirely — you end up re-explaining your stack, your conventions, and your constraints instead of actually building. The result is inconsistent code, forgotten interfaces, and an AI that confidently contradicts the architecture you defined two messages ago.",
      tags: ["Context Drift", "No Type Safety", "Lost State Logic", "Convention Amnesia"],
    },
    solution: {
      heading: "The Solution",
      body: "Your generated instruction locks the AI into your stack, design patterns, and quality standards. It's directed to map all logic trees, state transitions, and type hierarchies before writing a single line. The result isn't just code — it's code that fits your architecture as if written by a senior engineer who's been on your team for months.",
      tags: ["FastAPI Precision", "Game State Persistence", "Strict TypeScript", "Architectural Awareness"],
    },
    benefits: [
      { Icon: Shield, text: "Significantly reduced architectural drift across sessions" },
      { Icon: Clock,  text: "No more re-explaining your stack from scratch" },
      { Icon: TrendingUp, text: "Consistently structured, higher-quality output from the start" },
    ],
    preview: [
      { token: "section", text: "# 1. Role & Identity" },
      { token: "value",   text: "Senior Full-Stack & Game Systems Engineer" },
      { token: "section", text: "# 3. Cognitive Loop" },
      { token: "tag",     text: "<self_reflection>" },
      { token: "comment", text: "  Map all state transitions before any code." },
      { token: "comment", text: "  Validate types. Reference existing interfaces." },
      { token: "comment", text: "  Surface all edge cases explicitly." },
      { token: "tag",     text: "</self_reflection>" },
      { token: "section", text: "# 5. Boundaries & Execution Rules" },
      { token: "value",   text: "Never use `any`. Always define interfaces first." },
      { token: "value",   text: "Follow the established FastAPI project structure." },
    ],
    cta: "Try the Developer Generator",
  },
  {
    id: "creators",
    label: "Digital Content Creators",
    shortLabel: "Creators",
    Icon: Video,
    accentRgb: "168,85,247",
    accentClass: "text-neon-purple",
    accentBg: "bg-neon-purple/[0.08]",
    accentBorder: "border-neon-purple/20",
    accentGlow: "shadow-[0_0_40px_rgba(168,85,247,0.1)]",
    tagline: "From generic AI scripts to platform-optimised content.",
    problem: {
      heading: "The Problem",
      body: "AI generates robotic, monotone scripts that fail to capture attention in the first 3 seconds — the critical window for short-form video. It ignores platform-specific pacing, psychological hook structures, and the unwritten algorithmic rules that separate viral content from content that gets buried. The result sounds like AI wrote it, because it did.",
      tags: ["Robotic Tone", "No Hook Structure", "Platform Ignorance", "Algorithmic Blindness"],
    },
    solution: {
      heading: "The Solution",
      body: "The framework transforms the AI into a content strategist with strong platform awareness. It's directed to engineer the psychological hook, structure the tension-payoff arc, and evaluate every output against platform pacing principles and retention best practices before producing a single word. Your scripts will feel handcrafted — because the AI is held to the same standards a top-tier ghostwriter would be.",
      tags: ["Hook Architecture", "Platform Compliance", "Viewer Psychology", "Retention Engineering"],
    },
    benefits: [
      { Icon: Zap,        text: "Hooks engineered to land in the first 3 seconds" },
      { Icon: Shield,     text: "Platform-specific best practices built into every instruction" },
      { Icon: TrendingUp, text: "Tone and pacing that match your channel's voice" },
    ],
    preview: [
      { token: "section", text: "# 1. Role & Identity" },
      { token: "value",   text: "Elite Viral Content Strategist & Scriptwriter" },
      { token: "section", text: "# 2. Mission & Primary Task" },
      { token: "comment", text: "  Hook must land within the first 3 seconds." },
      { token: "comment", text: "  Match platform pacing: TikTok vs YouTube." },
      { token: "section", text: "# 3. Cognitive Loop" },
      { token: "tag",     text: "<self_reflection>" },
      { token: "comment", text: "  Analyze hook → tension → payoff arc." },
      { token: "comment", text: "  Validate against retention drop-off data." },
      { token: "tag",     text: "</self_reflection>" },
      { token: "section", text: "# 5. Boundaries" },
      { token: "value",   text: "Never open with 'In this video...' or 'Today...'." },
    ],
    cta: "Try the Creator Generator",
  },
  {
    id: "prompters",
    label: "Digital Prompt Engineers",
    shortLabel: "Prompt Engineers",
    Icon: Sparkles,
    accentRgb: "251,191,36",
    accentClass: "text-amber-400",
    accentBg: "bg-amber-400/[0.08]",
    accentBorder: "border-amber-400/20",
    accentGlow: "shadow-[0_0_40px_rgba(251,191,36,0.08)]",
    tagline: "From inconsistent generations to a locked visual identity.",
    problem: {
      heading: "The Problem",
      body: "Midjourney and image AI prompts produce visually inconsistent results across a project. Character design drifts between generations, lighting is arbitrary, and your carefully established aesthetic resets with every new prompt. You end up spending more time fixing inconsistencies than actually creating — and the moment you pass prompts to a client or team member, the visual identity collapses entirely.",
      tags: ["Character Drift", "Inconsistent Style", "No Visual System", "Aesthetic Collapse"],
    },
    solution: {
      heading: "The Solution",
      body: "The instruction structures a multi-layered visual prompt architecture that functions like a style guide for your AI. It promotes consistent adherence to your chosen aesthetic — cinematic lighting ratios, Pixar-style shading, specific character lore, or fine-art compositional rules — across generations. Your visual identity becomes a structured, transferable system, not a lucky accident.",
      tags: ["Style Locking", "Character Consistency", "Cinematic Formatting", "Transferable System"],
    },
    benefits: [
      { Icon: Shield,     text: "Visual identity locked across all generations" },
      { Icon: Clock,      text: "Stop re-building your style reference from scratch" },
      { Icon: TrendingUp, text: "Shareable prompt system your whole team can use" },
    ],
    preview: [
      { token: "section", text: "# 1. Role & Identity" },
      { token: "value",   text: "Master Visual Prompt Architect & Aesthetician" },
      { token: "section", text: "# 5. Boundaries & Execution Rules" },
      { token: "comment", text: "  Always apply: cinematic, f/1.8, golden hour." },
      { token: "comment", text: "  Lock character via [seed], [lora], [style ref]." },
      { token: "comment", text: "  Enforce: Pixar subsurface scatter, rim light." },
      { token: "section", text: "# 6. Output Format" },
      { token: "tag",     text: "<prompt_block>" },
      { token: "comment", text: "  [Subject] :: [Style] :: [Light] :: [Lens] :: [Neg]" },
      { token: "tag",     text: "</prompt_block>" },
      { token: "value",   text: "Always provide 3 prompt variants per request." },
    ],
    cta: "Try the Prompt Engineer Generator",
  },
] as const;

// ── Token renderer ─────────────────────────────────────────────────────────

function PreviewLine({ token, text, accentClass }: { token: string; text: string; accentClass: string }) {
  if (token === "section") return <span className="block text-slate-400 font-semibold mt-1">{text}</span>;
  if (token === "tag")     return <span className={`block font-mono ${accentClass} opacity-80`}>{text}</span>;
  if (token === "comment") return <span className="block text-slate-500 font-mono">{text}</span>;
  return <span className={`block ${accentClass}`}>{text}</span>;
}

// ── Component ──────────────────────────────────────────────────────────────

export default function UseCases() {
  const [activeIndex, setActiveIndex] = useState(0);
  const directionRef   = useRef(0);
  const tabRefs        = useRef<(HTMLButtonElement | null)[]>([]);
  const [pillStyle, setPillStyle] = useState<{ left: number; width: number }>({ left: 0, width: 0 });

  // Measure the active tab button and move the pill to its exact position
  useEffect(() => {
    const el = tabRefs.current[activeIndex];
    if (el) {
      setPillStyle({ left: el.offsetLeft, width: el.offsetWidth });
    }
  }, [activeIndex]);

  // Re-measure on first paint (handles SSR / initial render)
  useEffect(() => {
    const el = tabRefs.current[0];
    if (el) setPillStyle({ left: el.offsetLeft, width: el.offsetWidth });
  }, []);

  const active = PROFESSIONS[activeIndex];

  const handleTab = (index: number) => {
    directionRef.current = index > activeIndex ? 1 : -1;
    setActiveIndex(index);
  };

  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      {/* Ambient */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-15%] top-[10%] h-[500px] w-[500px] rounded-full bg-neon-cyan/[0.03] blur-[140px]" />
        <div className="absolute right-[-10%] bottom-[5%] h-[400px] w-[400px] rounded-full bg-neon-purple/[0.03] blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

        {/* Hero copy */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-14"
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-neon-cyan/20 bg-neon-cyan/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-neon-cyan">
            <Zap className="h-3.5 w-3.5" />
            Use Cases
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] text-white mb-5">
            Built for Every{" "}
            <span className="text-gradient">Professional.</span>
          </h1>
          <p className="mx-auto max-w-xl text-lg text-slate-400 leading-relaxed">
            See how the instruction framework adapts to your specific workflow —
            and why generic AI prompts are holding you back.
          </p>
        </motion.div>

        {/* Profession tabs — pill slides via DOM measurements, not % math */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mb-10 flex justify-center"
        >
          <div className="relative inline-flex items-center rounded-2xl border border-white/[0.07] bg-white/[0.03] p-1.5 gap-1">
            {/* Sliding pill — driven by exact offsetLeft / offsetWidth */}
            <motion.div
              className="absolute top-1.5 bottom-1.5 rounded-xl bg-white/[0.08] border border-white/[0.12]"
              animate={{ left: pillStyle.left, width: pillStyle.width }}
              transition={{ type: "spring", stiffness: 400, damping: 38 }}
            />

            {PROFESSIONS.map((p, i) => {
              const isActive = i === activeIndex;
              return (
                <button
                  key={p.id}
                  ref={(el) => { tabRefs.current[i] = el; }}
                  onClick={() => handleTab(i)}
                  className={`relative z-10 flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium transition-colors duration-200 cursor-pointer whitespace-nowrap ${
                    isActive ? "text-white" : "text-slate-500 hover:text-slate-300"
                  }`}
                >
                  <p.Icon className={`h-4 w-4 transition-colors duration-200 ${isActive ? p.accentClass : ""}`} />
                  <span className="hidden sm:inline">{p.shortLabel}</span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Dynamic content card */}
        <AnimatePresence mode="wait" custom={directionRef.current}>
          <motion.div
            key={active.id}
            custom={directionRef.current}
            initial={{ opacity: 0, x: directionRef.current * 48, filter: "blur(4px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, x: directionRef.current * -32, filter: "blur(4px)" }}
            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            className={`rounded-3xl border ${active.accentBorder} bg-white/[0.02] ${active.accentGlow} overflow-hidden`}
            style={{ backdropFilter: "blur(24px)" }}
          >
            {/* Card header */}
            <div className={`flex items-center gap-4 border-b ${active.accentBorder} px-8 py-5`}>
              <div className={`flex h-11 w-11 items-center justify-center rounded-xl border ${active.accentBorder} ${active.accentBg}`}>
                <active.Icon className={`h-5 w-5 ${active.accentClass}`} />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-white">{active.label}</h2>
                <p className="text-sm text-slate-500">{active.tagline}</p>
              </div>
            </div>

            {/* Two-column body */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">

              {/* Left — Problem + Solution + Benefits + CTA */}
              <div className="flex flex-col divide-y divide-white/[0.05] border-r border-white/[0.05]">

                {/* Problem */}
                <div className="px-8 py-7">
                  <div className="mb-3 flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-rose-400/80" />
                    <span className="text-xs font-bold uppercase tracking-widest text-rose-400/80">
                      {active.problem.heading}
                    </span>
                  </div>
                  <p className="text-[14.5px] leading-relaxed text-slate-300">
                    {active.problem.body}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {active.problem.tags.map((tag) => (
                      <span key={tag} className="rounded-full border border-rose-500/15 bg-rose-500/5 px-3 py-1 text-[11px] font-medium text-rose-400/70">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Solution */}
                <div className="px-8 py-7">
                  <div className="mb-3 flex items-center gap-2">
                    <CheckCircle2 className={`h-4 w-4 ${active.accentClass} opacity-80`} />
                    <span className={`text-xs font-bold uppercase tracking-widest ${active.accentClass} opacity-80`}>
                      {active.solution.heading}
                    </span>
                  </div>
                  <p className="text-[14.5px] leading-relaxed text-slate-300">
                    {active.solution.body}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {active.solution.tags.map((tag) => (
                      <span key={tag} className={`rounded-full border ${active.accentBorder} ${active.accentBg} px-3 py-1 text-[11px] font-medium ${active.accentClass}`}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Key benefits */}
                <div className="px-8 py-6">
                  <p className="mb-3 text-[10.5px] font-bold uppercase tracking-widest text-slate-600">
                    Key Benefits
                  </p>
                  <ul className="flex flex-col gap-2.5">
                    {active.benefits.map(({ Icon, text }) => (
                      <li key={text} className="flex items-start gap-2.5 text-[13.5px] text-slate-400">
                        <Icon className={`mt-0.5 h-4 w-4 shrink-0 ${active.accentClass} opacity-70`} />
                        {text}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <div className="px-8 py-6">
                  <motion.a
                    href="/generate"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className={`group inline-flex items-center gap-2.5 rounded-xl border ${active.accentBorder} ${active.accentBg} px-6 py-3 text-sm font-semibold ${active.accentClass} transition-all duration-200 hover:brightness-110 cursor-pointer`}
                  >
                    {active.cta}
                    <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </motion.a>
                </div>
              </div>

              {/* Right — Instruction preview */}
              <div className="flex flex-col justify-center px-8 py-8">
                <p className="mb-4 text-[10.5px] font-bold uppercase tracking-[0.15em] text-slate-600">
                  Generated Instruction Preview
                </p>
                <div className="rounded-2xl border border-white/[0.06] bg-[#080818] p-5 font-mono text-[12px] leading-[1.7] shadow-inner">
                  {/* Window chrome */}
                  <div className="mb-4 flex items-center gap-1.5">
                    <div className="h-2.5 w-2.5 rounded-full bg-rose-500/60" />
                    <div className="h-2.5 w-2.5 rounded-full bg-amber-400/60" />
                    <div className="h-2.5 w-2.5 rounded-full bg-emerald-400/60" />
                    <span className="ml-2 text-[10px] text-slate-600">master_instruction.md</span>
                  </div>

                  <div className="space-y-0.5">
                    {active.preview.map((line, i) => (
                      <motion.div
                        key={`${active.id}-${i}`}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05, duration: 0.22, ease: "easeOut" }}
                      >
                        <PreviewLine token={line.token} text={line.text} accentClass={active.accentClass} />
                      </motion.div>
                    ))}
                    <motion.span
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ repeat: Infinity, duration: 1.1 }}
                      className={`inline-block h-[13px] w-[2px] ${active.accentClass} opacity-70 align-middle ml-0.5`}
                    />
                  </div>
                </div>
                <p className={`mt-3 text-[11px] ${active.accentClass} opacity-40 text-center`}>
                  Real output from our AI generator engine
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

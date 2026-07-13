"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Shield, Layers, Cpu, Zap } from "lucide-react";

// ── Constants ─────────────────────────────────────────────────────────────

const EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

// ── Orchestration Graph ───────────────────────────────────────────────────

const NODES = [
  { x: 200, y: 155, r: 8,  color: "#06b6d4", isHub: true  },
  { x: 100, y: 70,  r: 5,  color: "#06b6d4", isHub: false },
  { x: 205, y: 32,  r: 4,  color: "#8b5cf6", isHub: false },
  { x: 310, y: 70,  r: 5,  color: "#06b6d4", isHub: false },
  { x: 348, y: 158, r: 4,  color: "#8b5cf6", isHub: false },
  { x: 302, y: 262, r: 5,  color: "#06b6d4", isHub: false },
  { x: 200, y: 298, r: 4,  color: "#8b5cf6", isHub: false },
  { x:  98, y: 262, r: 5,  color: "#06b6d4", isHub: false },
  { x:  52, y: 158, r: 4,  color: "#8b5cf6", isHub: false },
  { x: 148, y: 188, r: 3,  color: "#06b6d4", isHub: false },
  { x: 255, y: 132, r: 3,  color: "#8b5cf6", isHub: false },
  { x: 220, y: 225, r: 3,  color: "#06b6d4", isHub: false },
];

const EDGES = [
  // Hub spokes
  [0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[0,7],[0,8],
  // Outer ring
  [1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,8],[8,1],
  // Inner secondaries
  [0,9],[0,10],[0,11],
  [1,9],[3,10],[6,11],
  // Cross-diagonals
  [1,5],[3,7],
];

function OrchestrationGraph() {
  return (
    <svg viewBox="0 0 400 330" className="h-full w-full" aria-hidden="true">
      <defs>
        <radialGradient id="bgGlowAbout" cx="50%" cy="50%" r="55%">
          <stop offset="0%"   stopColor="#06b6d4" stopOpacity="0.06" />
          <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
        </radialGradient>
        <filter id="nodeGlowAbout" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="2.8" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="hubGlowAbout" x="-120%" y="-120%" width="340%" height="340%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Ambient glow */}
      <ellipse cx="200" cy="160" rx="190" ry="155" fill="url(#bgGlowAbout)" />

      {/* Edges */}
      {EDGES.map(([a, b], i) => {
        const isSpoke = a === 0 || b === 0;
        return (
          <motion.path
            key={i}
            d={`M ${NODES[a].x} ${NODES[a].y} L ${NODES[b].x} ${NODES[b].y}`}
            stroke={i % 3 === 0 ? "#06b6d4" : "#8b5cf6"}
            strokeWidth={isSpoke ? "1.2" : "0.7"}
            strokeOpacity={isSpoke ? "0.32" : "0.18"}
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.4 + i * 0.055, ease: "easeOut" }}
          />
        );
      })}

      {/* Satellite nodes */}
      {NODES.slice(1).map((node, i) => (
        <motion.circle
          key={`node-${i}`}
          cx={node.x} cy={node.y} r={node.r}
          fill={node.color}
          fillOpacity="0.85"
          filter="url(#nodeGlowAbout)"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.65 + i * 0.08, type: "spring", stiffness: 180 }}
        />
      ))}

      {/* Hub — central, largest */}
      <motion.circle
        cx={NODES[0].x} cy={NODES[0].y} r={NODES[0].r}
        fill="#06b6d4"
        filter="url(#hubGlowAbout)"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3, type: "spring", stiffness: 200 }}
      />

      {/* Hub pulse rings */}
      {[1, 2].map((ring) => (
        <motion.circle
          key={`hub-ring-${ring}`}
          cx={NODES[0].x} cy={NODES[0].y} r={NODES[0].r}
          fill="none"
          stroke="#06b6d4"
          strokeWidth="1.5"
          initial={{ scale: 1, opacity: 0.65 }}
          animate={{ scale: ring * 3, opacity: 0 }}
          transition={{ duration: 2.6, delay: ring * 0.9, repeat: Infinity, repeatDelay: 1.8, ease: "easeOut" }}
        />
      ))}

      {/* Satellite pulses */}
      {[0, 2, 4].map((idx) => {
        const n = NODES[idx + 1];
        return (
          <motion.circle
            key={`sat-ring-${idx}`}
            cx={n.x} cy={n.y} r={n.r}
            fill="none"
            stroke={n.color}
            strokeWidth="1"
            initial={{ scale: 1, opacity: 0.5 }}
            animate={{ scale: 2.8, opacity: 0 }}
            transition={{ duration: 2, delay: 1.6 + idx * 0.45, repeat: Infinity, repeatDelay: 2.8, ease: "easeOut" }}
          />
        );
      })}
    </svg>
  );
}

// ── Principle Cards ───────────────────────────────────────────────────────

const PRINCIPLES = [
  {
    Icon: Shield,
    title: "Strict Boundaries",
    body: "AI is only as reliable as the constraints it operates within. Each instruction set defines hard limits: verified facts first, no conflation of metrics and opinion, structured fallback behavior when inputs are ambiguous.",
    accent:       "text-neon-cyan",
    accentBg:     "bg-neon-cyan/[0.07]",
    accentBorder: "border-neon-cyan/20",
    topLine:      "via-neon-cyan/30",
  },
  {
    Icon: Layers,
    title: "Multi-Channel Adaptability",
    body: "The same core framework pivots cleanly from backend architecture planning to short-form content strategy. Role isolation and context scoping keep each deployment focused without bleed-over.",
    accent:       "text-neon-purple",
    accentBg:     "bg-neon-purple/[0.07]",
    accentBorder: "border-neon-purple/20",
    topLine:      "via-neon-purple/30",
  },
  {
    Icon: Cpu,
    title: "Pure Functionality",
    body: "No decorative framing. Just a structured cognitive loop that requires the model to reason through context before generating output — reducing the surface area for drift and generic hedging.",
    accent:       "text-emerald-400",
    accentBg:     "bg-emerald-400/[0.07]",
    accentBorder: "border-emerald-400/20",
    topLine:      "via-emerald-400/30",
  },
];

// ── Main Component ────────────────────────────────────────────────────────

export default function About() {
  const storyRef     = useRef<HTMLDivElement>(null);
  const principlesRef = useRef<HTMLDivElement>(null);

  const storyInView      = useInView(storyRef,      { once: true, margin: "-80px" });
  const principlesInView = useInView(principlesRef, { once: true, margin: "-80px" });

  return (
    <div className="relative min-h-screen overflow-x-hidden">

      {/* ── Ambient blobs (match rest of app) ──────────────────────── */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute left-[8%]  top-[4%]  h-[560px] w-[560px] rounded-full bg-neon-cyan/[0.03]   blur-[180px]" />
        <div className="absolute right-[4%] top-[38%] h-[480px] w-[480px] rounded-full bg-neon-purple/[0.03] blur-[160px]" />
        <div className="absolute left-[30%] bottom-[5%] h-[400px] w-[400px] rounded-full bg-neon-cyan/[0.025]  blur-[140px]" />
      </div>

      <div className="relative z-10">

        {/* ── Hero ───────────────────────────────────────────────────── */}
        <section className="mx-auto max-w-4xl px-6 pb-24 pt-32 text-center sm:pt-44">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.13 } } }}
          >
            {/* Badge */}
            <motion.div
              variants={{
                hidden:  { opacity: 0, y: 14 },
                visible: { opacity: 1, y:  0, transition: { duration: 0.5, ease: EASE } },
              }}
              className="mb-7 inline-flex items-center gap-2 rounded-full border border-neon-cyan/20 bg-neon-cyan/[0.06] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-neon-cyan"
            >
              <Zap className="h-3.5 w-3.5" />
              Our Philosophy
            </motion.div>

            {/* H1 */}
            <motion.h1
              variants={{
                hidden:  { opacity: 0, y: 28, filter: "blur(10px)" },
                visible: { opacity: 1, y:  0, filter: "blur(0px)",  transition: { duration: 0.85, ease: EASE } },
              }}
              className="mb-7 text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-[72px] lg:leading-[1.07]"
            >
              We Don&apos;t Just Prompt.{" "}
              <span
                className="block bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(90deg, #06b6d4 0%, #ffffff 48%, #8b5cf6 100%)" }}
              >
                We Orchestrate.
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={{
                hidden:  { opacity: 0, y: 20, filter: "blur(6px)" },
                visible: { opacity: 1, y:  0, filter: "blur(0px)",  transition: { duration: 0.7, delay: 0.1, ease: EASE } },
              }}
              className="mx-auto max-w-2xl text-lg leading-relaxed text-slate-400"
            >
              Built to bridge the gap between raw AI potential and professional,
              multi-channel workflow execution.
            </motion.p>
          </motion.div>
        </section>

        {/* ── Story ──────────────────────────────────────────────────── */}
        <section
          ref={storyRef}
          className="mx-auto max-w-7xl px-6 pb-32 sm:px-10 lg:px-16"
        >
          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">

            {/* Left — copy */}
            <motion.div
              initial={{ opacity: 0, x: -28, filter: "blur(8px)" }}
              animate={storyInView ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}}
              transition={{ duration: 0.85, ease: EASE }}
            >
              <p className="mb-4 text-[10.5px] font-bold uppercase tracking-[0.17em] text-neon-cyan/60">
                The Origin
              </p>
              <blockquote className="mb-7 border-l-2 border-neon-cyan/25 pl-5">
                <p className="text-2xl font-semibold leading-snug text-white sm:text-3xl">
                  &ldquo;It started with a need for control.&rdquo;
                </p>
              </blockquote>
              <div className="space-y-4 text-[15px] leading-[1.8] text-slate-400">
                <p>
                  Whether managing multiple short-form content channels, defining strict logic
                  boundaries for software development, or crafting precise visual prompts —
                  generic AI outputs were too variable, too easily derailed, and too surface-level
                  for professional use.
                </p>
                <p>
                  We built this framework to turn a general-purpose model into a focused,
                  rule-bound engine. One that separates <em className="text-slate-300 not-italic">role</em> from{" "}
                  <em className="text-slate-300 not-italic">mission</em>,{" "}
                  <em className="text-slate-300 not-italic">context</em> from{" "}
                  <em className="text-slate-300 not-italic">output</em>, and{" "}
                  <em className="text-slate-300 not-italic">opinion</em> from{" "}
                  <em className="text-slate-300 not-italic">fact</em> — at the prompt layer,
                  before any conversation begins.
                </p>
                <p>
                  The result is an instruction architecture that doesn&apos;t just guide AI —
                  it constrains it with purpose.
                </p>
              </div>
            </motion.div>

            {/* Right — SVG graph */}
            <motion.div
              initial={{ opacity: 0, x: 28, filter: "blur(8px)" }}
              animate={storyInView ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}}
              transition={{ duration: 0.85, delay: 0.14, ease: EASE }}
            >
              <div className="relative h-[360px] overflow-hidden rounded-3xl border border-white/[0.06] bg-white/[0.02] p-6 backdrop-blur-sm">
                {/* Top shimmer */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neon-cyan/25 to-transparent" />
                <OrchestrationGraph />
                <p className="absolute bottom-4 left-0 right-0 text-center text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-700">
                  Instruction Orchestration Graph
                </p>
              </div>
            </motion.div>

          </div>
        </section>

        {/* ── Core Principles ────────────────────────────────────────── */}
        <section
          ref={principlesRef}
          className="mx-auto max-w-7xl px-6 pb-32 sm:px-10 lg:px-16"
        >
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 22, filter: "blur(8px)" }}
            animate={principlesInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.7, ease: EASE }}
            className="mb-14 text-center"
          >
            <p className="mb-3 text-[10.5px] font-bold uppercase tracking-[0.17em] text-slate-600">
              Core Principles
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              What guides every decision.
            </h2>
          </motion.div>

          {/* Cards */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {PRINCIPLES.map((p, i) => {
              const Icon = p.Icon;
              return (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 32, filter: "blur(8px)" }}
                  animate={principlesInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
                  transition={{ duration: 0.72, delay: 0.08 + i * 0.13, ease: EASE }}
                  whileHover={{ y: -5, transition: { duration: 0.22 } }}
                  className="group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.025] p-7 backdrop-blur-sm"
                >
                  {/* Top accent line */}
                  <div className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent ${p.topLine} to-transparent`} />

                  {/* Icon badge */}
                  <div className={`mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl border ${p.accentBorder} ${p.accentBg}`}>
                    <Icon className={`h-5 w-5 ${p.accent}`} />
                  </div>

                  <h3 className="mb-3 text-[15.5px] font-semibold text-white">{p.title}</h3>
                  <p className="text-[13.5px] leading-[1.75] text-slate-500">{p.body}</p>
                </motion.div>
              );
            })}
          </div>
        </section>

      </div>
    </div>
  );
}

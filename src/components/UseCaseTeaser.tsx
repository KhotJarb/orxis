"use client";

import { motion } from "framer-motion";
import { Terminal, Video, Sparkles, ArrowUpRight } from "lucide-react";
import Link from "next/link";

// ── Card data ──────────────────────────────────────────────────────────────

const CARDS = [
  {
    Icon: Terminal,
    title: "Software & Game Devs",
    snippet:
      "Maintain complex state architectures, strict syntax rules, and deep logic hierarchies — consistently.",
    accentRgb: "6,182,212",
    accentClass: "text-neon-cyan",
    accentBorder: "hover:border-neon-cyan/30",
    accentGlow: "hover:shadow-[0_8px_32px_rgba(6,182,212,0.12)]",
    iconBg: "group-hover:bg-neon-cyan/[0.1] group-hover:border-neon-cyan/25 group-hover:text-neon-cyan",
  },
  {
    Icon: Video,
    title: "Content Creators",
    snippet:
      "Engineer psychological hooks, platform-specific pacing, and viral content strategy at expert level.",
    accentRgb: "168,85,247",
    accentClass: "text-neon-purple",
    accentBorder: "hover:border-neon-purple/30",
    accentGlow: "hover:shadow-[0_8px_32px_rgba(168,85,247,0.12)]",
    iconBg: "group-hover:bg-neon-purple/[0.1] group-hover:border-neon-purple/25 group-hover:text-neon-purple",
  },
  {
    Icon: Sparkles,
    title: "Prompt Engineers",
    snippet:
      "Lock in aesthetic consistency, multi-layered visual styles, and precise character specifications.",
    accentRgb: "251,191,36",
    accentClass: "text-amber-400",
    accentBorder: "hover:border-amber-400/30",
    accentGlow: "hover:shadow-[0_8px_32px_rgba(251,191,36,0.10)]",
    iconBg: "group-hover:bg-amber-400/[0.1] group-hover:border-amber-400/25 group-hover:text-amber-400",
  },
] as const;

// ── Animation variants ─────────────────────────────────────────────────────

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

// ── Component ──────────────────────────────────────────────────────────────

export default function UseCaseTeaser() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[400px] w-[700px] -translate-x-1/2 rounded-full bg-neon-purple/[0.025] blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

        {/* ── Header ──────────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-14 text-center"
        >
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight leading-[1.1] text-[var(--text-heading)] mb-4">
            Endless{" "}
            <span className="text-gradient">Possibilities.</span>
          </h2>
          <p className="mx-auto max-w-lg text-lg text-[var(--text-muted)] leading-relaxed">
            A framework powerful enough for any complex workflow.
          </p>
        </motion.div>

        {/* ── Cards grid ──────────────────────────────────────────────────── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-14"
        >
          {CARDS.map(({ Icon, title, snippet, accentBorder, accentGlow, accentClass, iconBg }) => (
            <motion.div
              key={title}
              variants={cardVariants}
              whileHover={{ y: -5, transition: { duration: 0.22, ease: "easeOut" } }}
              className={`group relative cursor-default rounded-2xl border border-[var(--border-subtle)] bg-[var(--glass-bg)] p-7 transition-all duration-300 ${accentBorder} ${accentGlow}`}
              style={{ backdropFilter: "blur(16px)" }}
            >
              {/* Top-edge glow line — appears on hover */}
              <div
                className="absolute inset-x-8 top-0 h-px scale-x-0 rounded-full bg-gradient-to-r from-transparent via-current to-transparent opacity-0 transition-all duration-300 group-hover:scale-x-100 group-hover:opacity-40"
                style={{ color: `rgb(${[6, 182, 212]})` }}
              />

              {/* Icon */}
              <div
                className={`mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--border-subtle)] bg-[var(--glass-bg)] text-[var(--text-muted)] transition-all duration-300 ${iconBg}`}
              >
                <Icon className="h-5 w-5" />
              </div>

              {/* Text */}
              <h3 className="mb-2.5 text-[15px] font-semibold text-[var(--text-heading)]">
                {title}
              </h3>
              <p className="text-[13.5px] leading-relaxed text-[var(--text-subtle)] transition-colors duration-300 group-hover:text-[var(--text-muted)]">
                {snippet}
              </p>

              {/* Hover arrow */}
              <div className={`mt-5 flex items-center gap-1 text-xs font-medium ${accentClass} opacity-0 transition-all duration-300 group-hover:opacity-70`}>
                <span>Learn more</span>
                <ArrowUpRight className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* ── CTA ─────────────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.3 }}
          className="flex justify-center"
        >
          <Link href="/use-cases" className="group relative inline-flex items-center gap-2.5">
            {/* Glow blur behind the text */}
            <span className="absolute inset-0 rounded-full bg-neon-cyan/10 blur-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

            <span className="relative text-base font-semibold text-[var(--text-body)] transition-colors duration-300 group-hover:text-[var(--text-heading)]">
              Explore All Use Cases
            </span>

            {/* Animated arrow */}
            <span className="relative flex h-8 w-8 items-center justify-center rounded-full border border-[var(--border-subtle)] bg-[var(--glass-bg)] text-[var(--text-muted)] transition-all duration-300 group-hover:border-neon-cyan/30 group-hover:bg-neon-cyan/[0.08] group-hover:text-neon-cyan group-hover:shadow-[0_0_16px_rgba(6,182,212,0.25)]">
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </Link>
        </motion.div>

      </div>
    </section>
  );
}

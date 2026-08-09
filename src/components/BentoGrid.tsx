"use client";

import { motion } from "framer-motion";
import { Dna, Lock, Globe, Layers } from "lucide-react";
import { useT } from "@/i18n";

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

// Pillars are now defined inside the component

// ===== Component =====
export default function BentoGrid() {
  const t = useT("home");

  const pillars = [
    { label: t("bento.card4.pillars.persona.label"), desc: t("bento.card4.pillars.persona.desc"), textColor: "text-neon-cyan" },
    { label: t("bento.card4.pillars.task.label"), desc: t("bento.card4.pillars.task.desc"), textColor: "text-neon-purple" },
    { label: t("bento.card4.pillars.tone.label"), desc: t("bento.card4.pillars.tone.desc"), textColor: "text-amber-400" },
    { label: t("bento.card4.pillars.rules.label"), desc: t("bento.card4.pillars.rules.desc"), textColor: "text-emerald-400" },
  ];

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
          {t("bento.badge")}
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--text-heading)] mb-4">
          {t("bento.title")}{" "}
          <span className="text-gradient">{t("bento.titleHighlight")}</span>{t("bento.titleQuestionMark")}
        </h2>
        <p className="max-w-2xl mx-auto text-[var(--text-muted)] text-base sm:text-lg leading-relaxed">
          {t("bento.description")}
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
                  {t("bento.card1.title")}
                </h3>
                <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-neon-cyan-light">
                  {t("bento.card1.subtitle")}
                </p>
              </div>
            </div>

            <p className="text-[var(--text-body)] leading-relaxed mb-4">
              {t("bento.card1.p1").split("<1>")[0]}
              <span className="text-[var(--text-heading)] font-semibold">
                {t("bento.card1.p1").split("<1>")[1]?.split("</1>")[0]}
              </span>
              {t("bento.card1.p1").split("</1>")[1]?.split("<2>")[0]}
              <span className="text-neon-cyan-light">
                {t("bento.card1.p1").split("<2>")[1]?.split("</2>")[0]}
              </span>
              {t("bento.card1.p1").split("</2>")[1]}
            </p>
            <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-4">
              {t("bento.card1.p2")}
            </p>
            <p className="text-sm text-[var(--text-muted)] leading-relaxed">
              {t("bento.card1.p3")}
            </p>

            <div className="flex items-center gap-2 text-[11px] sm:text-xs text-[var(--text-subtle)] border-t border-glass-border pt-4 mt-5">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-neon-cyan shrink-0" />
              {t("bento.card1.footer")}
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
              {t("bento.card2.title")}
            </h3>
            <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-neon-purple-light mb-4">
              {t("bento.card2.subtitle")}
            </p>

            <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-4">
              {t("bento.card2.p1").split("<1>")[0]}
              <span className="text-[var(--text-heading)] font-medium">
                {t("bento.card2.p1").split("<1>")[1]?.split("</1>")[0]}
              </span>
              {t("bento.card2.p1").split("</1>")[1]}
            </p>

            <ul className="space-y-2.5">
              {t.array("bento.card2.list").map((item: string) => (
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
              {t("bento.card3.title")}
            </h3>
            <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-4">
              {t("bento.card3.subtitle")}
            </p>

            <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-4">
              {t("bento.card3.p1")}
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
                  {t("bento.card4.title")}
                </h3>
                <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-amber-400">
                  {t("bento.card4.subtitle")}
                </p>
              </div>
            </div>

            <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-5">
              {t("bento.card4.p1")}
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
              {t("bento.card4.footer")}
            </p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Zap } from "lucide-react";
import Link from "next/link";
import { useT } from "@/i18n";

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

// perks array moved inside component

export default function CTASection() {
  const t = useT("home");

  const perks = [
    t("ctaSection.perks.noAccount"),
    t("ctaSection.perks.clientSide"),
    t("ctaSection.perks.worksWith"),
  ];

  return (
    <section className="relative overflow-hidden py-28 sm:py-44">

      {/* ── Background layers ── */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_140%_90%_at_50%_50%,_rgba(139,92,246,0.13)_0%,_rgba(6,182,212,0.05)_45%,_transparent_70%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neon-purple/40 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />

      {/* ── Animated ambient orbs ── */}
      <motion.div
        aria-hidden="true"
        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.55, 0.3] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[560px] w-[560px] rounded-full bg-neon-purple/[0.09] blur-[90px]"
      />
      <motion.div
        aria-hidden="true"
        animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.35, 0.15] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[300px] w-[700px] rounded-full bg-neon-cyan/[0.06] blur-[110px]"
      />

      {/* ── Content ── */}
      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 text-center">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <span className="mb-8 inline-flex items-center gap-2 rounded-full border border-neon-cyan/20 bg-neon-cyan/[0.06] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-neon-cyan-light">
            <Zap className="h-3 w-3" />
            {t("ctaSection.badge")}
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, delay: 0.08, ease: EASE }}
          className="mt-6 text-5xl sm:text-6xl md:text-[72px] font-bold tracking-tight leading-[1.05] text-[var(--text-heading)]"
        >
          {t("ctaSection.titleLine1")}
          <br />
          <span className="text-gradient">{t("ctaSection.titleLine2")}</span>
        </motion.h2>

        {/* Sub-headline */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.18, ease: EASE }}
          className="mx-auto mt-7 max-w-xl text-lg sm:text-xl text-[var(--text-muted)] leading-relaxed"
        >
          {t("ctaSection.description")}
        </motion.p>

        {/* CTA group */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.28, ease: EASE }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/generate"
            className="glow-btn group relative inline-flex items-center gap-3 rounded-full px-9 py-4 text-[15px] font-semibold text-[var(--text-heading)] transition-all duration-300 hover:scale-[1.04]"
          >
            {t("ctaSection.btnPrimary")}
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>

          <Link
            href="/docs"
            className="inline-flex items-center gap-1.5 rounded-full px-6 py-4 text-sm font-medium text-[var(--text-subtle)] hover:text-[var(--text-body)] transition-colors duration-300"
          >
            {t("ctaSection.btnSecondary")}
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </motion.div>

        {/* Perk row */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.42 }}
          className="mt-9 flex flex-wrap items-center justify-center gap-x-6 gap-y-2"
        >
          {perks.map((perk) => (
            <span
              key={perk}
              className="inline-flex items-center gap-1.5 text-[12.5px] text-[var(--text-subtle)]"
            >
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400/70 shrink-0" />
              {perk}
            </span>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
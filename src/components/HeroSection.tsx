"use client";

import { motion } from "framer-motion";
import { ArrowRight, Zap } from "lucide-react";
import dynamic from "next/dynamic";
import { useT } from "@/i18n";

const HeroScene = dynamic(() => import("./HeroScene"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="css-orb-container">
        <div className="css-orb-glow" />
        <div className="css-orb-core" />
      </div>
    </div>
  ),
});

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
};

export default function HeroSection() {
  const t = useT("home");

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#030014]/50 to-[#030014]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(139,92,246,0.08)_0%,_transparent_70%)]" />

      {/* 3D Scene - absolutely positioned behind content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-full h-full max-w-4xl max-h-[800px] opacity-70">
          <HeroScene />
        </div>
      </div>

      {/* Content overlay */}
      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center gap-6 sm:gap-8"
        >
          {/* Badge */}
          <motion.div variants={itemVariants}>
            <span className="badge-shimmer inline-flex items-center gap-2 rounded-full border border-glass-border bg-glass-bg px-4 py-2 text-xs sm:text-sm font-medium text-neon-cyan-light">
              <Zap className="h-3.5 w-3.5" />
              {t("hero.badge")}
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1]"
          >
            <span className="text-white">{t("hero.titleLine1")}</span>
            <br />
            <span className="text-gradient">{t("hero.titleLine2")}</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={itemVariants}
            className="max-w-2xl text-base sm:text-lg md:text-xl text-slate-400 leading-relaxed"
          >
            {t("hero.description")}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center gap-4 mt-2 sm:mt-4"
          >
            {/* Primary CTA */}
            <motion.a
              href="/generate"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="glow-btn group inline-flex items-center gap-2.5 rounded-full px-8 py-3.5 sm:px-10 sm:py-4 text-base sm:text-lg font-semibold text-[var(--text-heading)] cursor-pointer transition-all duration-300"
            >
              {t("hero.ctaPrimary")}
              <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </motion.a>

            {/* Secondary CTA */}
            <motion.a
              href="#how-it-works"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 rounded-full border border-glass-border bg-glass-bg px-8 py-3.5 sm:px-10 sm:py-4 text-base sm:text-lg font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-all duration-300 cursor-pointer"
            >
              {t("hero.ctaSecondary")}
            </motion.a>
          </motion.div>

        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--background)] to-transparent" />
    </section>
  );
}

"use client";

import { Fragment } from "react";
import { motion } from "framer-motion";
import {
  Lightbulb,
  Cpu,
  Crown,
  ChevronRight,
  ChevronDown,
} from "lucide-react";
import { useT } from "@/i18n";

const EASE_SMOOTH: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

interface Step {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  iconBg: string;
}

// Steps array moved inside component

export default function HowItWorks() {
  const t = useT("home");

  const steps: Step[] = [
    {
      number: "01",
      title: t("howItWorks.steps.step1.title"),
      subtitle: t("howItWorks.steps.step1.subtitle"),
      description: t("howItWorks.steps.step1.description"),
      icon: <Lightbulb className="h-6 w-6" />,
      iconBg: "bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/20",
    },
    {
      number: "02",
      title: t("howItWorks.steps.step2.title"),
      subtitle: t("howItWorks.steps.step2.subtitle"),
      description: t("howItWorks.steps.step2.description"),
      icon: <Cpu className="h-6 w-6" />,
      iconBg: "bg-neon-purple/10 text-neon-purple border border-neon-purple/20",
    },
    {
      number: "03",
      title: t("howItWorks.steps.step3.title"),
      subtitle: t("howItWorks.steps.step3.subtitle"),
      description: t("howItWorks.steps.step3.description"),
      icon: <Crown className="h-6 w-6" />,
      iconBg: "bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/20",
    },
  ];
  return (
    <section
      id="how-it-works"
      className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(139,92,246,0.04)_0%,_transparent_70%)]" />
      <div
        className="absolute inset-0 opacity-[0.012]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: EASE_SMOOTH }}
        className="text-center mb-14 sm:mb-20 relative z-10"
      >
        <div className="inline-flex items-center gap-2 rounded-full border border-glass-border bg-glass-bg px-4 py-2 text-xs sm:text-sm font-medium text-neon-cyan-light mb-6">
          {t("howItWorks.badge")}
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--text-heading)] mb-4">
          {t("howItWorks.title")} <span className="text-gradient">{t("howItWorks.titleHighlight")}</span>
        </h2>
        <p className="max-w-xl mx-auto text-[var(--text-muted)] text-base sm:text-lg leading-relaxed">
          {t("howItWorks.description")}
        </p>
      </motion.div>

      {/* Steps with connectors */}
      <div className="max-w-5xl mx-auto relative z-10 flex flex-col md:flex-row items-stretch">
        {steps.map((step, i) => (
          <Fragment key={step.number}>
            {/* Step Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.6,
                delay: i * 0.2,
                ease: EASE_SMOOTH,
              }}
              className="flex-1 glass rounded-2xl border border-glass-border p-6 sm:p-8 text-center group hover:border-[var(--border-medium)] transition-colors duration-500"
            >
              {/* Step number badge */}
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-neon-cyan/10 to-neon-purple/10 border border-glass-border group-hover:from-neon-cyan/20 group-hover:to-neon-purple/20 transition-all duration-500">
                <span className="text-xl font-bold text-gradient">
                  {step.number}
                </span>
              </div>

              {/* Icon */}
              <div
                className={`mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-xl ${step.iconBg} transition-all duration-300 group-hover:scale-110`}
              >
                {step.icon}
              </div>

              {/* Content */}
              <h3 className="text-lg sm:text-xl font-bold text-[var(--text-heading)] mb-1">
                {step.title}
              </h3>
              <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-neon-purple-light mb-3">
                {step.subtitle}
              </p>
              <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                {step.description}
              </p>
            </motion.div>

            {/* Connector between cards */}
            {i < steps.length - 1 && (
              <>
                {/* Mobile: vertical */}
                <div className="md:hidden flex justify-center py-3">
                  <ChevronDown className="h-5 w-5 text-[var(--text-muted)]" />
                </div>
                {/* Desktop: horizontal */}
                <div className="hidden md:flex items-center justify-center px-2 shrink-0">
                  <div className="w-6 h-px bg-gradient-to-r from-neon-cyan/30 to-neon-purple/30" />
                  <ChevronRight className="h-5 w-5 text-[var(--text-muted)] -ml-1" />
                </div>
              </>
            )}
          </Fragment>
        ))}
      </div>
    </section>
  );
}

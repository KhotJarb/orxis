"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { Brain, UserCog, Zap, LayoutTemplate } from "lucide-react";
import { useT } from "@/i18n";

const EASE_SMOOTH: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

// ===== Types =====
interface Feature {
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  iconBg: string;
}

// Features array moved inside component
// ===== Feature Card with mouse-tracking glow =====
function FeatureCard({
  feature,
  index,
}: {
  feature: Feature;
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    cardRef.current.style.setProperty(
      "--glow-x",
      `${e.clientX - rect.left}px`
    );
    cardRef.current.style.setProperty(
      "--glow-y",
      `${e.clientY - rect.top}px`
    );
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: EASE_SMOOTH }}
      whileHover={{ y: -4, transition: { duration: 0.3 } }}
      className="feature-card group relative glass rounded-2xl border border-glass-border p-6 sm:p-8 overflow-hidden cursor-default"
    >
      {/* Mouse-following glow overlay */}
      <div className="glow-effect pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Content (z-10 to sit above the glow) */}
      <div className="relative z-10">
        <div
          className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl ${feature.iconBg} transition-all duration-300 group-hover:scale-110`}
        >
          {feature.icon}
        </div>
        <h3 className="text-lg sm:text-xl font-bold text-[var(--text-heading)] mb-1">
          {feature.title}
        </h3>
        <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-neon-purple-light mb-3">
          {feature.subtitle}
        </p>
        <p className="text-sm text-[var(--text-muted)] leading-relaxed">
          {feature.description}
        </p>
      </div>
    </motion.div>
  );
}

// ===== Section =====
export default function Features() {
  const t = useT("home");

  const features: Feature[] = [
    {
      title: t("features.items.cognitiveLoop.title"),
      subtitle: t("features.items.cognitiveLoop.subtitle"),
      description: t("features.items.cognitiveLoop.description"),
      icon: <Brain className="h-6 w-6" />,
      iconBg: "bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/20",
    },
    {
      title: t("features.items.personaElevation.title"),
      subtitle: t("features.items.personaElevation.subtitle"),
      description: t("features.items.personaElevation.description"),
      icon: <UserCog className="h-6 w-6" />,
      iconBg: "bg-neon-purple/10 text-neon-purple border border-neon-purple/20",
    },
    {
      title: t("features.items.zeroCost.title"),
      subtitle: t("features.items.zeroCost.subtitle"),
      description: t("features.items.zeroCost.description"),
      icon: <Zap className="h-6 w-6" />,
      iconBg: "bg-amber-500/10 text-amber-400 border border-amber-500/20",
    },
    {
      title: t("features.items.instantFormat.title"),
      subtitle: t("features.items.instantFormat.subtitle"),
      description: t("features.items.instantFormat.description"),
      icon: <LayoutTemplate className="h-6 w-6" />,
      iconBg: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
    },
  ];

  return (
    <section
      id="features"
      className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_rgba(6,182,212,0.04)_0%,_transparent_60%)]" />

      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: EASE_SMOOTH }}
        className="text-center mb-14 sm:mb-20 relative z-10"
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--text-heading)] mb-4">
          {t("features.title")} <span className="text-gradient">{t("features.titleHighlight")}</span>
        </h2>
        <p className="max-w-xl mx-auto text-[var(--text-muted)] text-base sm:text-lg leading-relaxed">
          {t("features.description")}
        </p>
      </motion.div>

      {/* Feature Grid */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 relative z-10">
        {features.map((feature, i) => (
          <FeatureCard key={feature.title} feature={feature} index={i} />
        ))}
      </div>
    </section>
  );
}

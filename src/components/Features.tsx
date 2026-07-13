"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { Brain, UserCog, Zap, LayoutTemplate } from "lucide-react";

const EASE_SMOOTH: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

// ===== Types =====
interface Feature {
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  iconBg: string;
}

// ===== Data =====
const features: Feature[] = [
  {
    title: "The Cognitive Loop",
    subtitle: "Self-Reflection AI",
    description:
      "The engine doesn\u2019t just generate \u2014 it evaluates, critiques, and refines its own output to produce a more structured, well-considered result.",
    icon: <Brain className="h-6 w-6" />,
    iconBg: "bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/20",
  },
  {
    title: "Persona Elevation",
    subtitle: "Expert-Level Identity",
    description:
      "Transform generic AI responses into expert-caliber output by crafting the perfect identity, expertise scope, and behavioral framework for your assistant.",
    icon: <UserCog className="h-6 w-6" />,
    iconBg: "bg-neon-purple/10 text-neon-purple border border-neon-purple/20",
  },
  {
    title: "Zero-Cost Optimization",
    subtitle: "Free Forever",
    description:
      "No API keys, no subscriptions, no hidden fees. Get professional-grade custom instructions completely free with our intelligent client-side engine.",
    icon: <Zap className="h-6 w-6" />,
    iconBg: "bg-amber-500/10 text-amber-400 border border-amber-500/20",
  },
  {
    title: "Instant Format Perfection",
    subtitle: "Output Architecture",
    description:
      "One-click format rules ensure every AI response follows your exact structure \u2014 bullet points, headers, code blocks, tables \u2014 you name it.",
    icon: <LayoutTemplate className="h-6 w-6" />,
    iconBg: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
  },
];

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
          Built for <span className="text-gradient">Perfection</span>
        </h2>
        <p className="max-w-xl mx-auto text-[var(--text-muted)] text-base sm:text-lg leading-relaxed">
          Every feature is engineered to produce structured, consistent custom
          instructions — no prompt engineering expertise required.
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

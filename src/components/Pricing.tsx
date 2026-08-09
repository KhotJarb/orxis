"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  Heart,
  Star,
  ChevronDown,
  ArrowRight,
  Zap,
  Coffee,
  Sparkles,
} from "lucide-react";
import { useT } from "@/i18n";

// ── Animation presets ──────────────────────────────────────────────────────

const EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28, filter: "blur(6px)" },
  whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
  viewport: { once: true },
  transition: { duration: 0.65, delay, ease: EASE },
});

// ── FAQ Accordion item ─────────────────────────────────────────────────────

function AccordionItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      {...fadeUp(index * 0.1)}
      className="border-b border-white/[0.06] last:border-none"
    >
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-4 py-5 text-left cursor-pointer group"
      >
        <span className="text-[15px] font-medium text-slate-200 transition-colors duration-200 group-hover:text-white">
          {q}
        </span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25, ease: EASE }}
          className="shrink-0 text-slate-500 group-hover:text-slate-300 transition-colors duration-200"
        >
          <ChevronDown className="h-4.5 w-4.5" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-[14px] leading-relaxed text-slate-400">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ── Page component ─────────────────────────────────────────────────────────

export default function Pricing() {
  const t = useT("pages");
  const [selectedAmount, setSelectedAmount] = useState("$10");
  const [copied, setCopied] = useState(false);

  const FAQ = [
    {
      q: t("pricing.faq.items.free.q"),
      a: t("pricing.faq.items.free.a"),
    },
    {
      q: t("pricing.faq.items.account.q"),
      a: t("pricing.faq.items.account.a"),
    },
    {
      q: t("pricing.faq.items.donation.q"),
      a: t("pricing.faq.items.donation.a"),
    },
  ];

  const FREE_FEATURES = t.array("pricing.freeCard.features");

  const supporterPerksArr = t.array("pricing.supporterCard.perks");
  const SUPPORTER_PERKS = [
    { Icon: Star,  text: supporterPerksArr[0] },
    { Icon: Heart, text: supporterPerksArr[1] },
    { Icon: Zap,   text: supporterPerksArr[2] },
  ];

  const AMOUNTS = ["$5", "$10", "$25"];

  const handleDonate = () => {
    // Buy Me a Coffee doesn't support URL amount pre-filling, so we copy the
    // amount to the user's clipboard so they can paste it on the BMC page.
    const numeric = selectedAmount.replace("$", "");
    navigator.clipboard.writeText(numeric).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
    window.open("https://buymeacoffee.com/khotjarb", "_blank", "noopener,noreferrer");
  };

  return (
    <div className="relative min-h-screen overflow-hidden">

      {/* ── Global ambient light ──────────────────────────────────────── */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[600px] w-[800px] -translate-x-1/2 rounded-full bg-neon-purple/[0.04] blur-[160px]" />
        <div className="absolute left-[-10%] bottom-[10%] h-[400px] w-[400px] rounded-full bg-neon-cyan/[0.03] blur-[140px]" />
        <div className="absolute right-[-10%] top-[30%] h-[350px] w-[350px] rounded-full bg-amber-400/[0.025] blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-5xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">

        {/* ── Hero ──────────────────────────────────────────────────────── */}
        <motion.div {...fadeUp(0)} className="mb-20 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-neon-cyan/20 bg-neon-cyan/[0.06] px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-neon-cyan">
            <Sparkles className="h-3.5 w-3.5" />
            {t("pricing.badge")}
          </div>
          <h1 className="mb-5 text-4xl font-bold tracking-tight leading-[1.1] text-white sm:text-5xl lg:text-6xl">
            {t("pricing.title")}{" "}
            <span className="text-gradient">{t("pricing.titleHighlight")}</span>
          </h1>
          <p className="mx-auto max-w-lg text-lg leading-relaxed text-slate-400">
            {t("pricing.subtitle")}
          </p>
        </motion.div>

        {/* ── Cards ─────────────────────────────────────────────────────── */}
        <div className="mb-24 grid grid-cols-1 gap-6 md:grid-cols-2">

          {/* Free Access card */}
          <motion.div
            {...fadeUp(0.1)}
            className="relative flex flex-col rounded-3xl border border-white/[0.08] bg-white/[0.025] p-8"
            style={{ backdropFilter: "blur(20px)" }}
          >
            {/* Badge */}
            <span className="mb-6 inline-flex w-fit items-center gap-1.5 rounded-full border border-neon-cyan/20 bg-neon-cyan/[0.07] px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-neon-cyan">
              <span className="h-1.5 w-1.5 rounded-full bg-neon-cyan animate-pulse" />
              {t("pricing.freeCard.badge")}
            </span>

            {/* Price */}
            <div className="mb-2 flex items-end gap-1">
              <span className="text-5xl font-bold tracking-tight text-white">
                {t("pricing.freeCard.price")}
              </span>
              <span className="mb-1.5 text-slate-500 text-sm">{t("pricing.freeCard.period")}</span>
            </div>
            <p className="mb-8 text-sm text-slate-500">
              {t("pricing.freeCard.description")}
            </p>

            {/* Features */}
            <ul className="mb-8 flex flex-col gap-3 flex-1">
              {FREE_FEATURES.map((f) => (
                <li key={f} className="flex items-start gap-3 text-sm text-slate-300">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-neon-cyan/20 bg-neon-cyan/[0.08]">
                    <Check className="h-3 w-3 text-neon-cyan" />
                  </span>
                  {f}
                </li>
              ))}
            </ul>

            {/* CTA */}
            <motion.a
              href="/generate"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group flex items-center justify-center gap-2 rounded-xl border border-neon-cyan/20 bg-neon-cyan/[0.07] px-6 py-3.5 text-sm font-semibold text-neon-cyan transition-all duration-200 hover:bg-neon-cyan/[0.12] hover:shadow-[0_0_20px_rgba(6,182,212,0.15)] cursor-pointer"
            >
              {t("pricing.freeCard.cta")}
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </motion.a>
          </motion.div>

          {/* Supporter card */}
          <motion.div
            {...fadeUp(0.2)}
            className="relative flex flex-col rounded-3xl p-px overflow-hidden"
          >
            {/* Animated gradient border */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-amber-400/30 via-neon-purple/20 to-amber-400/10 animate-[spin_8s_linear_infinite]" />
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-amber-400/20 via-transparent to-neon-purple/20" />

            <div
              className="relative flex flex-col h-full rounded-[23px] bg-[#0b0914] p-8"
              style={{ backdropFilter: "blur(24px)" }}
            >
              {/* Subtle inner glow */}
              <div className="pointer-events-none absolute inset-0 rounded-[23px] bg-[radial-gradient(ellipse_at_top_right,_rgba(251,191,36,0.06)_0%,_transparent_60%)]" />

              {/* Badge */}
              <span className="relative mb-6 inline-flex w-fit items-center gap-1.5 rounded-full border border-amber-400/30 bg-amber-400/[0.08] px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-amber-400">
                <Coffee className="h-3 w-3" />
                {t("pricing.supporterCard.badge")}
              </span>

              {/* Price */}
              <div className="relative mb-2">
                <p className="text-[13px] text-slate-500 mb-1 font-medium uppercase tracking-wider">
                  {t("pricing.supporterCard.label")}
                </p>
                <div className="flex items-center gap-2">
                  {AMOUNTS.map((amt) => (
                    <button
                      key={amt}
                      onClick={() => setSelectedAmount(amt)}
                      className={`rounded-xl border px-4 py-1.5 text-sm font-semibold transition-all duration-200 cursor-pointer ${
                        selectedAmount === amt
                          ? "border-amber-400/40 bg-amber-400/[0.12] text-amber-400 shadow-[0_0_12px_rgba(251,191,36,0.15)]"
                          : "border-white/[0.07] bg-white/[0.03] text-slate-400 hover:border-amber-400/20 hover:text-slate-200"
                      }`}
                    >
                      {amt}
                    </button>
                  ))}
                </div>
              </div>

              <p className="relative mb-8 text-sm leading-relaxed text-slate-400">
                {t("pricing.supporterCard.description")}
              </p>

              {/* Perks */}
              <ul className="relative mb-8 flex flex-col gap-3 flex-1">
                {SUPPORTER_PERKS.map(({ Icon, text }) => (
                  <li key={text} className="flex items-start gap-3 text-sm text-slate-300">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-amber-400/20 bg-amber-400/[0.08]">
                      <Icon className="h-3 w-3 text-amber-400" />
                    </span>
                    {text}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <motion.button
                onClick={handleDonate}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="relative group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 px-6 py-3.5 text-sm font-bold text-[#0a0800] transition-all duration-300 hover:shadow-[0_0_28px_rgba(251,191,36,0.3)] cursor-pointer overflow-hidden"
              >
                {/* Shimmer sweep */}
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                <Coffee className="relative h-4 w-4" />
                <span className="relative">{t("pricing.supporterCard.cta", { amount: selectedAmount })}</span>
              </motion.button>

              {/* Clipboard toast */}
              <div className="relative mt-3 h-4 text-center">
                <AnimatePresence mode="wait">
                  {copied ? (
                    <motion.p
                      key="copied"
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.2 }}
                      className="absolute inset-0 text-[11px] font-medium text-amber-400"
                    >
                      {t("pricing.supporterCard.toastCopied", { amount: selectedAmount })}
                    </motion.p>
                  ) : (
                    <motion.p
                      key="default"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="absolute inset-0 text-[11px] text-slate-600"
                    >
                      {t("pricing.supporterCard.toastDefault")}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── FAQ ───────────────────────────────────────────────────────── */}
        <motion.div {...fadeUp(0.1)} className="mx-auto max-w-2xl">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              {t("pricing.faq.title")}
            </h2>
            <p className="mt-3 text-slate-500 text-sm">
              {t("pricing.faq.subtitle")}
            </p>
          </div>

          <div
            className="rounded-2xl border border-white/[0.07] bg-white/[0.025] px-6 divide-y divide-white/[0.06]"
            style={{ backdropFilter: "blur(16px)" }}
          >
            {FAQ.map((item, i) => (
              <AccordionItem key={item.q} {...item} index={i} />
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
}

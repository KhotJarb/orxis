"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  ChevronDown,
  MessageSquare,
  HelpCircle,
  ArrowUpRight,
  Shield,
  Brain,
  Globe,
  Wallet,
} from "lucide-react";
import { useT } from "@/i18n";

// ── Constants ─────────────────────────────────────────────────────────────

const EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

// ── Accordion Item ────────────────────────────────────────────────────────

interface AccordionItemProps {
  item: {
    id: string;
    Icon: any;
    question: string;
    answer: string;
  };
  isOpen: boolean;
  onToggle: () => void;
  index: number;
  inView: boolean;
}

function AccordionItem({ item, isOpen, onToggle, index, inView }: AccordionItemProps) {
  const Icon = item.Icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
      animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.6, delay: 0.08 + index * 0.1, ease: EASE }}
      className={`overflow-hidden rounded-2xl border transition-all duration-300 ${
        isOpen
          ? "border-white/[0.1] bg-white/[0.04]"
          : "border-white/[0.06] bg-white/[0.02] hover:border-white/[0.09] hover:bg-white/[0.03]"
      }`}
    >
      {/* Question row */}
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="group flex w-full items-start gap-4 px-6 py-5 text-left transition-colors duration-200 cursor-pointer"
      >
        {/* Icon */}
        <div
          className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border transition-all duration-300 ${
            isOpen
              ? "border-neon-cyan/25 bg-neon-cyan/[0.08] text-neon-cyan"
              : "border-white/[0.08] bg-white/[0.03] text-slate-600 group-hover:border-white/[0.12] group-hover:text-slate-400"
          }`}
        >
          <Icon className="h-4 w-4" />
        </div>

        {/* Label + Question */}
        <div className="flex-1 min-w-0">
          <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-700">
            {item.id}
          </p>
          <p
            className={`text-[15px] font-semibold leading-snug transition-colors duration-200 ${
              isOpen ? "text-white" : "text-slate-300 group-hover:text-slate-100"
            }`}
          >
            {item.question}
          </p>
        </div>

        {/* Chevron */}
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.28, ease: EASE }}
          className={`mt-1 shrink-0 transition-colors duration-200 ${
            isOpen ? "text-neon-cyan" : "text-slate-600 group-hover:text-slate-400"
          }`}
        >
          <ChevronDown className="h-4.5 w-4.5 h-[18px] w-[18px]" />
        </motion.div>
      </button>

      {/* Answer */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: EASE }}
            style={{ overflow: "hidden" }}
          >
            {/* Top divider */}
            <div className="mx-6 h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />
            <p className="px-6 pb-5 pt-4 pl-[4.5rem] text-[13.5px] leading-[1.85] text-slate-400">
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────

export default function Support() {
  const t = useT("pages");
  const [openId, setOpenId] = useState<string | null>("01");

  const FAQ_ITEMS = [
    {
      id: "01",
      Icon: Brain,
      question: t("support.faq.items.q1.q"),
      answer: t("support.faq.items.q1.a"),
    },
    {
      id: "02",
      Icon: Shield,
      question: t("support.faq.items.q2.q"),
      answer: t("support.faq.items.q2.a"),
    },
    {
      id: "03",
      Icon: Globe,
      question: t("support.faq.items.q3.q"),
      answer: t("support.faq.items.q3.a"),
    },
    {
      id: "04",
      Icon: Wallet,
      question: t("support.faq.items.q4.q"),
      answer: t("support.faq.items.q4.a"),
    },
  ];

  const heroRef     = useRef<HTMLDivElement>(null);
  const faqRef      = useRef<HTMLDivElement>(null);
  const feedbackRef = useRef<HTMLDivElement>(null);

  const faqInView      = useInView(faqRef,      { once: true, margin: "-60px" });
  const feedbackInView = useInView(feedbackRef, { once: true, margin: "-60px" });

  const toggle = (id: string) => setOpenId((prev) => (prev === id ? null : id));

  return (
    <div className="relative min-h-screen overflow-x-hidden">

      {/* ── Ambient blobs ──────────────────────────────────────────── */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute left-[12%] top-[6%]  h-[480px] w-[480px] rounded-full bg-neon-cyan/[0.03]   blur-[160px]" />
        <div className="absolute right-[8%] top-[45%] h-[400px] w-[400px] rounded-full bg-neon-purple/[0.03] blur-[140px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-3xl px-6 pb-32 pt-20 sm:px-8">

        {/* ── Hero ─────────────────────────────────────────────────── */}
        <section ref={heroRef} className="mb-16 pt-16 sm:pt-24">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
          >
            <motion.div
              variants={{
                hidden:  { opacity: 0, y: 12 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
              }}
              className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-slate-500"
            >
              <HelpCircle className="h-3.5 w-3.5" />
              {t("support.badge")}
            </motion.div>

            <motion.h1
              variants={{
                hidden:  { opacity: 0, y: 22, filter: "blur(8px)" },
                visible: { opacity: 1, y: 0,  filter: "blur(0px)", transition: { duration: 0.75, ease: EASE } },
              }}
              className="mb-4 text-4xl font-bold tracking-tight text-white sm:text-5xl"
            >
              {t("support.title")}
            </motion.h1>

            <motion.p
              variants={{
                hidden:  { opacity: 0, y: 16, filter: "blur(6px)" },
                visible: { opacity: 1, y: 0,  filter: "blur(0px)", transition: { duration: 0.65, delay: 0.08, ease: EASE } },
              }}
              className="max-w-xl text-[15.5px] leading-relaxed text-slate-400"
            >
              {t("support.subtitle")}
            </motion.p>
          </motion.div>
        </section>

        {/* ── FAQ Section ──────────────────────────────────────────── */}
        <section ref={faqRef} className="mb-12">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={faqInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: EASE }}
            className="mb-5 text-[10.5px] font-bold uppercase tracking-[0.16em] text-slate-600"
          >
            {t("support.faq.label")}
          </motion.p>

          <div className="flex flex-col gap-3">
            {FAQ_ITEMS.map((item, index) => (
              <AccordionItem
                key={item.id}
                item={item}
                isOpen={openId === item.id}
                onToggle={() => toggle(item.id)}
                index={index}
                inView={faqInView}
              />
            ))}
          </div>
        </section>

        {/* ── Feedback Card ─────────────────────────────────────────── */}
        <section ref={feedbackRef}>
          <motion.div
            initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
            animate={feedbackInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
            className="relative overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.025] p-7 backdrop-blur-sm sm:p-9"
          >
            {/* Top shimmer */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neon-purple/25 to-transparent" />

            <div className="flex items-start gap-5">
              {/* Icon */}
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-neon-purple/20 bg-neon-purple/[0.07]">
                <MessageSquare className="h-5 w-5 text-neon-purple" />
              </div>

              <div className="flex-1 min-w-0">
                <h2 className="mb-2 text-[17px] font-semibold text-white">
                  {t("support.feedback.title")}
                </h2>
                <p className="mb-6 text-[13.5px] leading-[1.8] text-slate-500">
                  {t("support.feedback.description")}
                </p>

                <motion.a
                  href="mailto:orxis.app@gmail.com?subject=Orxis%20App%20Feedback&body=Hi%20Orxis%20Team,%0D%0A%0D%0AI%20have%20a%20suggestion%20regarding..."
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="group inline-flex items-center gap-2 rounded-xl border border-neon-purple/25 bg-neon-purple/[0.08] px-5 py-2.5 text-sm font-semibold text-neon-purple transition-all duration-300 hover:border-neon-purple/40 hover:bg-neon-purple/[0.14] hover:shadow-[0_0_18px_rgba(139,92,246,0.18)]"
                >
                  {t("support.feedback.cta")}
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </motion.a>
              </div>
            </div>
          </motion.div>
        </section>

      </div>
    </div>
  );
}

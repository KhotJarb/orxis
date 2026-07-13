"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Upload, CheckCircle, Loader2, ChevronDown } from "lucide-react";

// ── Types ──────────────────────────────────────────────────────────────────

type SubmitStatus = "idle" | "loading" | "success";

interface FormState {
  title: string;
  description: string;
  category: string;
  author: string;
  tags: string;
  prompt: string;
}

const INITIAL_FORM: FormState = {
  title: "",
  description: "",
  category: "software-dev",
  author: "",
  tags: "",
  prompt: "",
};

const CATEGORIES = [
  { value: "software-dev",     label: "Software Dev"      },
  { value: "content-strategy", label: "Content Strategy"  },
  { value: "creative-design",  label: "Creative Design"   },
  { value: "data-analytics",   label: "Data & Analytics"  },
  { value: "marketing",        label: "Marketing"         },
  { value: "education",        label: "Education"         },
  { value: "business",         label: "Business"          },
  { value: "research",         label: "Research"          },
  { value: "writing",          label: "Writing & Editing" },
  { value: "other",            label: "Other"             },
];

const EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

// ── Shared input styles ────────────────────────────────────────────────────

const inputCls =
  "w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-2.5 text-[14px] text-slate-200 placeholder-slate-600 outline-none transition-all duration-200 focus:border-neon-cyan/30 focus:bg-white/[0.06] focus:shadow-[0_0_0_3px_rgba(6,182,212,0.07)] disabled:opacity-40";

// ── Success overlay ────────────────────────────────────────────────────────

function SuccessView() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.45, ease: EASE }}
      className="flex flex-col items-center justify-center py-16 px-8 text-center"
    >
      {/* Glowing checkmark */}
      <div className="relative mb-6">
        <div className="absolute inset-0 rounded-full bg-emerald-400/20 blur-2xl scale-150" />
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 260, damping: 20 }}
          className="relative flex h-20 w-20 items-center justify-center rounded-full border border-emerald-400/30 bg-emerald-400/[0.08]"
        >
          <CheckCircle className="h-10 w-10 text-emerald-400" strokeWidth={1.5} />
        </motion.div>
      </div>

      <motion.h3
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.4, ease: EASE }}
        className="mb-2 text-xl font-bold text-white"
      >
        Your prompt is in the forge.
      </motion.h3>

      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.4, ease: EASE }}
        className="max-w-xs text-[14px] leading-relaxed text-slate-400"
      >
        Our team will review it for quality before it goes live. We'll be in touch.
      </motion.p>

      {/* Auto-close progress bar */}
      <motion.div
        className="mt-8 h-[2px] w-32 overflow-hidden rounded-full bg-white/[0.06]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <motion.div
          className="h-full rounded-full bg-emerald-400/60"
          initial={{ width: "100%" }}
          animate={{ width: "0%" }}
          transition={{ duration: 3, ease: "linear", delay: 0.5 }}
        />
      </motion.div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-2 text-[11px] text-slate-600"
      >
        Closing automatically…
      </motion.p>
    </motion.div>
  );
}

// ── Modal ──────────────────────────────────────────────────────────────────

interface SubmitModalProps {
  open: boolean;
  onClose: () => void;
}

export default function SubmitModal({ open, onClose }: SubmitModalProps) {
  const [form, setForm]     = useState<FormState>(INITIAL_FORM);
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const titleRef            = useRef<HTMLInputElement>(null);

  // Focus title on open
  useEffect(() => {
    if (open) setTimeout(() => titleRef.current?.focus(), 200);
  }, [open]);

  // Escape to close (when idle)
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && status === "idle") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, status]);

  const resetAndClose = () => {
    onClose();
    // Delay reset so it doesn't flash during close animation
    setTimeout(() => {
      setForm(INITIAL_FORM);
      setStatus("idle");
    }, 400);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim() || !form.description.trim() || !form.prompt.trim()) return;
    setStatus("loading");

    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title:       form.title,
          description: form.description,
          category:    form.category,
          author:      form.author,
          tags:        form.tags,
          prompt:      form.prompt,
        }),
      });

      if (!res.ok) throw new Error("Submission failed");

      setStatus("success");
      setTimeout(() => resetAndClose(), 3500);
    } catch (err) {
      console.error("[SubmitModal] Error:", err);
      setStatus("idle"); // let user retry
    }
  };

  const update = (field: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const isLoading = status === "loading";
  const isSuccess = status === "success";

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="submit-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => status === "idle" && resetAndClose()}
            className="fixed inset-0 z-50 bg-black/70"
            style={{ backdropFilter: "blur(6px)" }}
          />

          {/* Modal panel */}
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6">
            <motion.div
              key="submit-modal"
              initial={{ opacity: 0, scale: 0.93, y: 16, filter: "blur(4px)" }}
              animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.95, y: 8, filter: "blur(4px)" }}
              transition={{ duration: 0.35, ease: EASE }}
              className="relative w-full max-w-lg flex flex-col max-h-[88vh] overflow-hidden rounded-3xl border border-white/[0.09] bg-[#080818] shadow-2xl shadow-black/60"
              style={{ backdropFilter: "blur(32px)" }}
            >
              {/* Top accent line */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neon-cyan/40 to-transparent" />

              <AnimatePresence mode="wait">
                {isSuccess ? (
                  <motion.div key="success" exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                    <SuccessView />
                  </motion.div>
                ) : (
                    <motion.div key="form" exit={{ opacity: 0 }} transition={{ duration: 0.15 }} className="flex flex-col flex-1 min-h-0 overflow-hidden">

                    {/* Header */}
                    <div className="flex shrink-0 items-center justify-between gap-4 border-b border-white/[0.06] px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-neon-cyan/20 bg-neon-cyan/[0.07]">
                          <Upload className="h-4 w-4 text-neon-cyan" />
                        </div>
                        <div>
                          <h2 className="text-[15px] font-semibold text-white">
                            Share Your Framework
                          </h2>
                          <p className="text-[11.5px] text-slate-500">
                            Contribute to the community vault
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={resetAndClose}
                        disabled={isLoading}
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/[0.07] bg-white/[0.03] text-slate-400 hover:bg-white/[0.07] hover:text-white transition-all duration-200 cursor-pointer disabled:opacity-40"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="overflow-y-auto min-h-0 flex-1 px-6 py-5 flex flex-col gap-4">

                      {/* Title */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[11.5px] font-semibold uppercase tracking-wider text-slate-500">
                          Title <span className="text-neon-cyan/60">*</span>
                        </label>
                        <input
                          ref={titleRef}
                          type="text"
                          value={form.title}
                          onChange={update("title")}
                          disabled={isLoading}
                          placeholder="Name your Master Instruction"
                          className={inputCls}
                          required
                        />
                      </div>

                      {/* Description */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[11.5px] font-semibold uppercase tracking-wider text-slate-500">
                          Description <span className="text-neon-cyan/60">*</span>
                        </label>
                        <textarea
                          value={form.description}
                          onChange={update("description")}
                          disabled={isLoading}
                          placeholder="A one-line summary shown on the gallery card…"
                          rows={2}
                          required
                          className={`${inputCls} resize-none text-[13px] leading-relaxed`}
                        />
                        <p className="text-[11px] text-slate-600">This appears as the card&apos;s visible description in the gallery.</p>
                      </div>

                      {/* Category */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[11.5px] font-semibold uppercase tracking-wider text-slate-500">
                          Category
                        </label>
                        <div className="relative">
                          <select
                            value={form.category}
                            onChange={update("category")}
                            disabled={isLoading}
                            className={`${inputCls} appearance-none pr-10 cursor-pointer`}
                          >
                            {CATEGORIES.map((c) => (
                              <option key={c.value} value={c.value} className="bg-[#0d0d1a] text-slate-200">
                                {c.label}
                              </option>
                            ))}
                          </select>
                          <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                        </div>
                      </div>

                      {/* Author */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[11.5px] font-semibold uppercase tracking-wider text-slate-500">
                          Author / Handle{" "}
                          <span className="normal-case font-normal tracking-normal text-slate-600">
                            (optional)
                          </span>
                        </label>
                        <input
                          type="text"
                          value={form.author}
                          onChange={update("author")}
                          disabled={isLoading}
                          placeholder="Your name or @x_handle"
                          className={inputCls}
                        />
                      </div>

                      {/* Tags */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[11.5px] font-semibold uppercase tracking-wider text-slate-500">
                          Tags{" "}
                          <span className="normal-case font-normal tracking-normal text-slate-600">(optional)</span>
                        </label>
                        <input
                          type="text"
                          value={form.tags}
                          onChange={update("tags")}
                          disabled={isLoading}
                          placeholder="e.g. SOLID, Testing, Python"
                          className={inputCls}
                        />
                        <p className="text-[11px] text-slate-600">Separate tags with commas.</p>
                      </div>

                      {/* Prompt textarea */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[11.5px] font-semibold uppercase tracking-wider text-slate-500">
                          Full Master Instruction <span className="text-neon-cyan/60">*</span>
                        </label>
                        <textarea
                          value={form.prompt}
                          onChange={update("prompt")}
                          disabled={isLoading}
                          placeholder={"# 1. Role & Identity\nPaste your full 6-section Master Instruction here…"}
                          rows={5}
                          required
                          className={`${inputCls} resize-none font-mono text-[12.5px] leading-relaxed`}
                        />
                      </div>

                      {/* Disclaimer */}
                      <p className="text-[11.5px] leading-relaxed text-slate-600 italic">
                        All submissions are reviewed by our team before publishing to ensure great quality. We may lightly edit for formatting.
                      </p>

                      {/* Submit */}
                      <motion.button
                        type="submit"
                        disabled={isLoading || !form.title.trim() || !form.prompt.trim()}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="group relative mt-1 flex w-full items-center justify-center gap-2.5 overflow-hidden rounded-xl bg-gradient-to-r from-neon-cyan/80 to-neon-cyan px-6 py-3 text-sm font-bold text-[#020c10] transition-all duration-300 hover:shadow-[0_0_24px_rgba(6,182,212,0.3)] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:shadow-none cursor-pointer"
                      >
                        {/* Shimmer */}
                        <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

                        <AnimatePresence mode="wait">
                          {isLoading ? (
                            <motion.span
                              key="loading"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="flex items-center gap-2"
                            >
                              <Loader2 className="h-4 w-4 animate-spin" />
                              Submitting…
                            </motion.span>
                          ) : (
                            <motion.span
                              key="idle"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="flex items-center gap-2"
                            >
                              <Upload className="h-4 w-4" />
                              Submit for Review
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </motion.button>
                    </form>
                    </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

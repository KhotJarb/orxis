"use client";

import { AlertTriangle, Info, Lightbulb, Zap } from "lucide-react";
import { ReactNode } from "react";
import { useT } from "@/i18n";

// ── Types ──────────────────────────────────────────────────────────────────

type CalloutVariant = "note" | "tip" | "warning" | "important";

interface CalloutProps {
  variant?: CalloutVariant;
  title?: string;
  children: ReactNode;
}

// ── Config map ─────────────────────────────────────────────────────────────

const CALLOUT_CONFIG: Record<
  CalloutVariant,
  {
    icon: ReactNode;
    label: string;
    borderColor: string;
    glowColor: string;
    iconColor: string;
    bgColor: string;
    labelColor: string;
  }
> = {
  note: {
    icon: <Info className="h-4 w-4" />,
    label: "Note",
    borderColor: "border-neon-cyan/30",
    glowColor: "shadow-[0_0_20px_rgba(6,182,212,0.07),inset_0_0_20px_rgba(6,182,212,0.03)]",
    iconColor: "text-neon-cyan",
    bgColor: "bg-[rgba(6,182,212,0.04)]",
    labelColor: "text-neon-cyan",
  },
  tip: {
    icon: <Lightbulb className="h-4 w-4" />,
    label: "Tip",
    borderColor: "border-emerald-500/30",
    glowColor: "shadow-[0_0_20px_rgba(16,185,129,0.07),inset_0_0_20px_rgba(16,185,129,0.03)]",
    iconColor: "text-emerald-400",
    bgColor: "bg-[rgba(16,185,129,0.04)]",
    labelColor: "text-emerald-400",
  },
  warning: {
    icon: <AlertTriangle className="h-4 w-4" />,
    label: "Warning",
    borderColor: "border-amber-500/30",
    glowColor: "shadow-[0_0_20px_rgba(245,158,11,0.07),inset_0_0_20px_rgba(245,158,11,0.03)]",
    iconColor: "text-amber-400",
    bgColor: "bg-[rgba(245,158,11,0.04)]",
    labelColor: "text-amber-400",
  },
  important: {
    icon: <Zap className="h-4 w-4" />,
    label: "Important",
    borderColor: "border-neon-purple/30",
    glowColor: "shadow-[0_0_20px_rgba(139,92,246,0.07),inset_0_0_20px_rgba(139,92,246,0.03)]",
    iconColor: "text-neon-purple-light",
    bgColor: "bg-[rgba(139,92,246,0.04)]",
    labelColor: "text-neon-purple-light",
  },
};

// ── Callout Component ──────────────────────────────────────────────────────

export default function Callout({
  variant = "note",
  title,
  children,
}: CalloutProps) {
  const config = CALLOUT_CONFIG[variant];
  const t = useT("docs");

  return (
    <div
      className={`my-6 rounded-xl border backdrop-blur-sm p-5 ${config.borderColor} ${config.glowColor} ${config.bgColor}`}
    >
      <div className="flex items-start gap-3">
        {/* Icon */}
        <span className={`mt-0.5 flex-shrink-0 ${config.iconColor}`}>
          {config.icon}
        </span>

        <div className="flex-1 min-w-0">
          {/* Label */}
          <p className={`mb-1.5 text-xs font-bold uppercase tracking-widest ${config.labelColor}`}>
            {title ?? t(`components.callout.${variant}`)}
          </p>

          {/* Content */}
          <div className="text-sm leading-relaxed text-slate-300 [&>p]:m-0 [&>ul]:mt-2 [&>ul]:space-y-1 [&>ul>li]:before:content-['–'] [&>ul>li]:before:mr-2 [&>ul>li]:before:text-slate-500">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Inline Code ────────────────────────────────────────────────────────────

export function InlineCode({ children }: { children: ReactNode }) {
  return (
    <code className="mx-0.5 rounded-md border border-white/10 bg-white/[0.06] px-1.5 py-0.5 font-mono text-[0.85em] text-neon-cyan">
      {children}
    </code>
  );
}

// ── Code Block ─────────────────────────────────────────────────────────────

interface CodeBlockProps {
  language?: string;
  filename?: string;
  children: string;
}

export function CodeBlock({ language = "bash", filename, children }: CodeBlockProps) {
  return (
    <div className="my-6 overflow-hidden rounded-xl border border-glass-border bg-[#0a0a1a]">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-glass-border bg-white/[0.02] px-4 py-2.5">
        <div className="flex items-center gap-3">
          {/* Traffic lights */}
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500/60" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/60" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-500/60" />
          </div>
          {filename && (
            <span className="text-xs text-slate-500 font-mono">{filename}</span>
          )}
        </div>
        <span className="rounded-md bg-white/[0.05] px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-slate-500">
          {language}
        </span>
      </div>

      {/* Code */}
      <pre className="overflow-x-auto p-5 text-[13px] leading-relaxed">
        <code className="font-mono text-slate-300">{children.trim()}</code>
      </pre>
    </div>
  );
}

// ── Section Divider ────────────────────────────────────────────────────────

export function SectionDivider() {
  return (
    <div className="my-10 flex items-center gap-4">
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-glass-border to-transparent" />
    </div>
  );
}

// ── Step Card ──────────────────────────────────────────────────────────────

interface StepProps {
  number: number;
  title: string;
  children: ReactNode;
}

export function Step({ number, title, children }: StepProps) {
  return (
    <div className="my-4 flex gap-4">
      <div className="flex-shrink-0">
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-neon-cyan/20 to-neon-purple/20 border border-neon-cyan/30 text-xs font-bold text-neon-cyan">
          {number}
        </span>
      </div>
      <div className="flex-1 pt-0.5">
        <p className="mb-1.5 font-semibold text-white">{title}</p>
        <div className="text-sm leading-relaxed text-slate-400">{children}</div>
      </div>
    </div>
  );
}

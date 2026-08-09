"use client";

import { useEffect } from "react";
import Callout, {
  CodeBlock,
  InlineCode,
  SectionDivider,
  Step,
} from "@/components/docs/DocsComponents";
import Link from "next/link";
import type { DocPageId } from "@/components/docs/DocsSidebar";
import { useT } from "@/i18n";

export default function DocsContent({
  scrollTarget,
}: {
  activePage?: DocPageId;   // used externally for sidebar/ToC highlight only
  scrollTarget?: { anchor: string; ts: number } | null;
}) {
  const t = useT("docs");

  // Only scroll when the user explicitly CLICKS a sidebar item (ts changes).
  // The scroll observer in docs/page.tsx updates activePage silently —
  // it must NOT trigger scrollIntoView or the page snaps back on scroll-up.
  useEffect(() => {
    if (!scrollTarget?.anchor) return;
    const t = setTimeout(() => {
      document.getElementById(scrollTarget.anchor)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 60);
    return () => clearTimeout(t);
  }, [scrollTarget?.ts]); // ← fires ONLY when ts changes (on sidebar click)
  return (
    <article className="docs-prose w-full max-w-3xl">

      {/* ── INTRODUCTION ─────────────────────────────────────────── */}
      <section id="introduction" className="scroll-mt-24">
        <div className="mb-3 flex items-center gap-2">
          <span className="rounded-full border border-neon-cyan/30 bg-neon-cyan/10 px-3 py-0.5 text-xs font-semibold text-neon-cyan">
            {t("content.badge")}
          </span>
        </div>

        <h1 className="mb-4 text-4xl font-bold tracking-tight text-white">
          {t("content.title")}
        </h1>
        <p className="mb-6 text-lg leading-relaxed text-slate-400">
          {t("content.introPara1")}
        </p>

        <Callout variant="important" title={t("content.beforeYouBegin")}>
          {t("content.beforeYouBeginText")}
          <a href="#what-are-custom-instructions" className="text-neon-cyan underline underline-offset-4 hover:text-neon-cyan-light transition-colors">
            {t("content.whatAreCIs")}
          </a>{" "}
          section below.
        </Callout>

        {/* Sub-section */}
        <h2 id="what-are-custom-instructions" className="scroll-mt-24 mt-10 mb-4 text-2xl font-bold text-white border-b border-glass-border pb-3">
          {t("content.whatAreCIs")}
        </h2>
        <p className="mb-4 text-slate-400 leading-relaxed">
          {t("content.whatAreCIsPara1")}
        </p>
        <p className="mb-4 text-slate-400 leading-relaxed">
          {t("content.whatAreCIsPara2")}
        </p>
        <ul className="mb-6 space-y-2 pl-1">
          {t.array("content.whatAreCIsList").map((item) => (
            <li key={item} className="flex items-start gap-3 text-sm text-slate-400">
              <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-neon-cyan" />
              {item}
            </li>
          ))}
        </ul>

        <h2 id="why-it-matters" className="scroll-mt-24 mt-10 mb-4 text-2xl font-bold text-white border-b border-glass-border pb-3">
          {t("content.whyItMatters")}
        </h2>
        <p className="mb-4 text-slate-400 leading-relaxed">
          {t("content.whyItMattersPara1")}
        </p>

        <Callout variant="tip">
          <p>
            {t("content.goodVsGreatBefore")} <strong>{t("content.goodVsGreatGood")}</strong> {t("content.goodVsGreatMiddle")}{" "}
            <strong>{t("content.goodVsGreatGreat")}</strong> {t("content.goodVsGreatAfter")}
          </p>
        </Callout>

        <blockquote className="my-6 border-l-2 border-neon-purple/60 pl-5">
          <p className="text-slate-300 italic leading-relaxed">
            {t("content.lincolnQuote")}
          </p>
          <cite className="mt-2 block text-xs text-slate-500">
            {t("content.lincolnCite")}
          </cite>
        </blockquote>
      </section>

      <SectionDivider />

      {/* ── QUICK START ──────────────────────────────────────────── */}
      <section id="quick-start" className="scroll-mt-24">
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-white">
          {t("content.quickStart")}
        </h1>
        <p className="mb-6 text-lg leading-relaxed text-slate-400">
          {t("content.quickStartPara")}
        </p>

        <Callout variant="note">
          <p>
            {t("content.quickStartNoteBefore")} <strong>{t("content.quickStartNoteGenerate")}</strong>{t("content.quickStartNoteAfter")}
          </p>
        </Callout>

        <h2 id="step-1-describe" className="scroll-mt-24 mt-10 mb-5 text-2xl font-bold text-white border-b border-glass-border pb-3">
          {t("content.step1")}
        </h2>
        <p className="mb-4 text-slate-400 leading-relaxed">
          {t("content.step1Para")}
        </p>

        <div className="my-5 space-y-3">
          <Step number={1} title={t("content.step1Title")}>
            {t("content.step1Inst1Before")}{" "}
            <InlineCode>Software Engineer</InlineCode>,{" "}
            <InlineCode>Data Scientist</InlineCode>, {t("content.step1Inst1Or")}{" "}
            <InlineCode>Marketing Strategist</InlineCode>.
          </Step>
          <Step number={2} title={t("content.step2")}>
            {t("content.step1Inst2Before")}{" "}
            <InlineCode>Senior TypeScript engineer specializing in distributed systems</InlineCode>{" "}
            {t("content.step1Inst2Mid")}{" "}
            <InlineCode>Software Engineer</InlineCode>.
          </Step>
        </div>

        <h2 id="step-2-task" className="scroll-mt-24 mt-10 mb-5 text-2xl font-bold text-white border-b border-glass-border pb-3">
          {t("content.step2Heading")}
        </h2>
        <p className="mb-4 text-slate-400 leading-relaxed">
          {t("content.step2ParaBefore")} <strong className="text-slate-200">{t("content.step2ParaPrimaryObj")}</strong> —
          {t("content.step2ParaAfter")}
        </p>

        <CodeBlock language="example" filename="Good vs. Bad Task Definitions">
{`# ❌ Too vague
"Help me with coding"

# ✅ Specific and outcome-oriented
"Review TypeScript code for performance bottlenecks,
security vulnerabilities, and architectural anti-patterns.
Always propose a refactored version with explanations."`}
        </CodeBlock>

        <h2 id="step-3-tone" className="scroll-mt-24 mt-10 mb-5 text-2xl font-bold text-white border-b border-glass-border pb-3">
          {t("content.step3Heading")}
        </h2>
        <p className="mb-4 text-slate-400 leading-relaxed">
          {t("content.step3ParaBefore")} <InlineCode>Professional</InlineCode> +{" "}
          <InlineCode>Direct</InlineCode> + <InlineCode>Technical</InlineCode> {t("content.step3ParaAfter")}
        </p>

        <Callout variant="warning">
          <p>
            {t("content.step3WarningBefore")}{" "}
            <InlineCode>Humorous</InlineCode> {t("content.step3WarningAnd")}{" "}
            <InlineCode>Strict</InlineCode>. {t("content.step3WarningAfter")}
          </p>
        </Callout>

        <h2 id="step-4-rules" className="scroll-mt-24 mt-10 mb-5 text-2xl font-bold text-white border-b border-glass-border pb-3">
          {t("content.step4Heading")}
        </h2>
        <p className="mb-4 text-slate-400 leading-relaxed">
          {t("content.step4ParaBefore")} <strong className="text-slate-200">{t("content.step4ParaBoundaries")}</strong> {t("content.step4ParaAnd")}{" "}
          <strong className="text-slate-200">{t("content.step4ParaOutputFormat")}</strong> {t("content.step4ParaAfter")}
        </p>

        <CodeBlock language="rules" filename="Example Rules">
{`- Always respond in Markdown format
- Never use filler phrases like "Certainly!" or "Of course!"
- Include a "⚠️ Risk Assessment" section for any code review
- If asked something outside your domain, say so explicitly
- Keep responses under 500 words unless the task requires more`}
        </CodeBlock>
      </section>

      <SectionDivider />

      {/* ── CORE CONCEPTS ────────────────────────────────────────── */}
      <section id="core-concepts" className="scroll-mt-24">
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-white">
          {t("content.coreConcepts")}
        </h1>
        <p className="mb-6 text-lg leading-relaxed text-slate-400">
          {t("content.coreConceptsPara")}
        </p>

        <h2 id="the-six-sections" className="scroll-mt-24 mt-8 mb-5 text-2xl font-bold text-white border-b border-glass-border pb-3">
          {t("content.theSixSections")}
        </h2>

        <div className="space-y-4">
          {[
            {
              emoji: "🎭",
              num: "1",
              title: t("content.sections.role", { num: "1" }),
              desc: t("content.sectionsDesc.1"),
              color: "border-neon-cyan/20 bg-neon-cyan/[0.03]",
              accent: "text-neon-cyan",
            },
            {
              emoji: "🎯",
              num: "2",
              title: t("content.sections.mission", { num: "2" }),
              desc: t("content.sectionsDesc.2"),
              color: "border-neon-purple/20 bg-neon-purple/[0.03]",
              accent: "text-neon-purple-light",
            },
            {
              emoji: "🧠",
              num: "3",
              title: t("content.sections.cognitive", { num: "3" }),
              desc: t("content.sectionsDesc.3"),
              color: "border-emerald-500/20 bg-emerald-500/[0.03]",
              accent: "text-emerald-400",
            },
            {
              emoji: "📥",
              num: "4",
              title: t("content.sections.context", { num: "4" }),
              desc: t("content.sectionsDesc.4"),
              color: "border-amber-500/20 bg-amber-500/[0.03]",
              accent: "text-amber-400",
            },
            {
              emoji: "⚙️",
              num: "5",
              title: t("content.sections.boundaries", { num: "5" }),
              desc: t("content.sectionsDesc.5"),
              color: "border-rose-500/20 bg-rose-500/[0.03]",
              accent: "text-rose-400",
            },
            {
              emoji: "📝",
              num: "6",
              title: t("content.sections.formatting", { num: "6" }),
              desc: t("content.sectionsDesc.6"),
              color: "border-sky-500/20 bg-sky-500/[0.03]",
              accent: "text-sky-400",
            },
          ].map((section) => (
            <div
              key={section.num}
              className={`rounded-xl border p-5 transition-all duration-200 hover:border-white/10 ${section.color}`}
            >
              <div className="flex items-start gap-4">
                <span className="text-2xl leading-none">{section.emoji}</span>
                <div>
                  <p className={`mb-1 font-semibold ${section.accent}`}>
                    {section.title}
                  </p>
                  <p className="text-sm leading-relaxed text-slate-400">
                    {section.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <h2 id="cognitive-loop" className="scroll-mt-24 mt-10 mb-5 text-2xl font-bold text-white border-b border-glass-border pb-3">
          {t("content.cognitiveLoop")}
        </h2>
        <p className="mb-4 text-slate-400 leading-relaxed">
          {t("content.cognitiveLoopParaBefore")} <strong className="text-slate-200">{t("content.cognitiveLoopParaInternal")}</strong>{" "}
          {t("content.cognitiveLoopParaAfter")}
        </p>

        <CodeBlock language="prompt" filename="Cognitive Loop Directive (injected into every CI)">
{`Before answering, you MUST use <self_reflection> tags to think internally:

1. Create a 5-point evaluation rubric for a high-quality response
   based on the Mission and the current query.
2. Draft an internal response and score it against your rubric.
3. If the score is not 100/100, identify weaknesses and iterate.
4. DO NOT show the <self_reflection> process to the user.
   Output only the final, perfected response.`}
        </CodeBlock>

        <Callout variant="tip" title={t("content.proTip")}>
          <p>
            {t("content.cognitiveLoopTip")}
          </p>
        </Callout>

        {/* Next page link */}
        <div className="mt-12 rounded-xl border border-glass-border bg-glass-bg p-5">
          <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">{t("content.next")}</p>
          <Link
            href="/docs?page=chatgpt"
            className="font-semibold text-white hover:text-neon-cyan transition-colors"
          >
            {t("content.nextPlatformGuides")}
          </Link>
        </div>
      </section>
    </article>
  );
}

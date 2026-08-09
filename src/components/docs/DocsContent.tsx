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
          <strong className="text-slate-200">Orxis</strong> is a
          precision-engineered tool that transforms vague AI interactions into
          domain-specific expert systems. Instead of starting every conversation from
          scratch, you define the AI&apos;s identity, mission, and constraints — once —
          and every response thereafter is shaped by that foundation.
        </p>

        <Callout variant="important" title={t("content.beforeYouBegin")}>
          This documentation assumes you have a basic understanding of Large Language
          Models (LLMs) such as ChatGPT, Claude, or Gemini. If you&apos;re new to AI
          tools entirely, start with our{" "}
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
          Custom Instructions (CIs) are persistent system-level directives that you
          inject into an LLM <em>before</em> any conversation begins. Think of them
          as the AI&apos;s job description, operating manual, and personality profile
          — all in one document.
        </p>
        <p className="mb-4 text-slate-400 leading-relaxed">
          Without a CI, an LLM like ChatGPT behaves as a generic assistant — helpful
          but unfocused. With a well-crafted CI, that same model transforms into a
          dedicated expert that:
        </p>
        <ul className="mb-6 space-y-2 pl-1">
          {[
            "Stays in role across the entire conversation",
            "Applies domain-specific knowledge and terminology automatically",
            "Follows your formatting and tone preferences by default",
            "Executes a self-reflection quality check before every response",
          ].map((item) => (
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
          Evidence suggests that prompting strategy can be as important as model
          size for output quality in professional tasks. A 70B-parameter model
          with well-crafted prompting can outperform a much larger model with
          generic instructions.
        </p>

        <Callout variant="tip">
          <p>
            The difference between a <strong>good</strong> AI response and a{" "}
            <strong>great</strong> one is almost always in how the AI was
            instructed, not which AI you used.
          </p>
        </Callout>

        <blockquote className="my-6 border-l-2 border-neon-purple/60 pl-5">
          <p className="text-slate-300 italic leading-relaxed">
            &ldquo;Give me six hours to chop down a tree and I will spend the
            first four sharpening the axe.&rdquo;
          </p>
          <cite className="mt-2 block text-xs text-slate-500">
            — Abraham Lincoln (adapted for prompt engineering)
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
          Go from zero to a production-ready Custom Instruction in under 5 minutes.
          The wizard walks you through four focused questions — no prompt engineering
          experience required.
        </p>

        <Callout variant="note">
          <p>
            The generator runs fully in your browser. Your inputs are only sent to
            the backend when you click <strong>Generate</strong>. Nothing is stored.
          </p>
        </Callout>

        <h2 id="step-1-describe" className="scroll-mt-24 mt-10 mb-5 text-2xl font-bold text-white border-b border-glass-border pb-3">
          {t("content.step1")}
        </h2>
        <p className="mb-4 text-slate-400 leading-relaxed">
          The persona defines <em>who</em> the AI pretends to be. The more specific
          you are, the better the output. Use the preset chips for common roles or
          type your own in the free-text field.
        </p>

        <div className="my-5 space-y-3">
          <Step number={1} title={t("content.step1Title")}>
            Click one of the preset roles like{" "}
            <InlineCode>Software Engineer</InlineCode>,{" "}
            <InlineCode>Data Scientist</InlineCode>, or{" "}
            <InlineCode>Marketing Strategist</InlineCode>.
          </Step>
          <Step number={2} title={t("content.step2")}>
            Add specific detail in the input field. For example, typing{" "}
            <InlineCode>Senior TypeScript engineer specializing in distributed systems</InlineCode>{" "}
            creates a more targeted persona than just{" "}
            <InlineCode>Software Engineer</InlineCode>.
          </Step>
        </div>

        <h2 id="step-2-task" className="scroll-mt-24 mt-10 mb-5 text-2xl font-bold text-white border-b border-glass-border pb-3">
          {t("content.step2Heading")}
        </h2>
        <p className="mb-4 text-slate-400 leading-relaxed">
          The task is the AI&apos;s <strong className="text-slate-200">primary objective</strong> —
          what it was built to do in every interaction. Frame it as an outcome,
          not a process.
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
          Tone controls the AI&apos;s communication style. You can combine multiple
          tone presets — for example, <InlineCode>Professional</InlineCode> +{" "}
          <InlineCode>Direct</InlineCode> + <InlineCode>Technical</InlineCode> is a
          popular combination for engineering-focused workflows.
        </p>

        <Callout variant="warning">
          <p>
            Avoid combining contradictory tones like{" "}
            <InlineCode>Humorous</InlineCode> and{" "}
            <InlineCode>Strict</InlineCode>. The AI will attempt to satisfy both and
            may produce inconsistent results.
          </p>
        </Callout>

        <h2 id="step-4-rules" className="scroll-mt-24 mt-10 mb-5 text-2xl font-bold text-white border-b border-glass-border pb-3">
          {t("content.step4Heading")}
        </h2>
        <p className="mb-4 text-slate-400 leading-relaxed">
          Rules are hard constraints and output formatting requirements. These map
          directly to the <strong className="text-slate-200">Boundaries</strong> and{" "}
          <strong className="text-slate-200">Output Architecture</strong> sections of
          your final instruction. Examples:
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
          Every Custom Instruction generated by this tool follows a rigid 6-section
          architecture. Understanding each section helps you get the most out of
          tweaking and refinement.
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
              desc: "Establishes WHO the AI is — a precisely defined persona that shapes the model's behaviour as a domain expert.",
              color: "border-neon-cyan/20 bg-neon-cyan/[0.03]",
              accent: "text-neon-cyan",
            },
            {
              emoji: "🎯",
              num: "2",
              title: t("content.sections.mission", { num: "2" }),
              desc: "Defines WHAT success looks like. A clear north star that every response is measured against.",
              color: "border-neon-purple/20 bg-neon-purple/[0.03]",
              accent: "text-neon-purple-light",
            },
            {
              emoji: "🧠",
              num: "3",
              title: t("content.sections.cognitive", { num: "3" }),
              desc: "Forces the AI to self-reflect before responding. Creates a pre/mid/post quality-check loop invisible to the user.",
              color: "border-emerald-500/20 bg-emerald-500/[0.03]",
              accent: "text-emerald-400",
            },
            {
              emoji: "📥",
              num: "4",
              title: t("content.sections.context", { num: "4" }),
              desc: "Defines what kind of inputs the AI should anticipate and how to handle edge cases or ambiguous requests.",
              color: "border-amber-500/20 bg-amber-500/[0.03]",
              accent: "text-amber-400",
            },
            {
              emoji: "⚙️",
              num: "5",
              title: t("content.sections.boundaries", { num: "5" }),
              desc: "Hard constraints that the AI must obey. Anti-hallucination directives, scope limits, and ethical guardrails.",
              color: "border-rose-500/20 bg-rose-500/[0.03]",
              accent: "text-rose-400",
            },
            {
              emoji: "📝",
              num: "6",
              title: t("content.sections.formatting", { num: "6" }),
              desc: "The blueprint for every response: headers, lists, code blocks, tables, length, and sign-off protocol.",
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
          The Cognitive Loop is a key differentiator in this framework.
          It forces the LLM to run an <strong className="text-slate-200">internal quality assurance process</strong>{" "}
          before surfacing any response to the user. The AI creates its own evaluation
          rubric, drafts a response, scores it, and iterates — all invisibly.
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
            The Cognitive Loop dramatically reduces hallucinations on factual topics
            and eliminates &quot;first-draft&quot; quality responses. LLMs that are
            explicitly instructed to self-critique produce measurably better outputs
            than those that aren&apos;t.
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

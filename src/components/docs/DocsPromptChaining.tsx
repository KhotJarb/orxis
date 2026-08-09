"use client";

import { useT } from "@/i18n";
import Callout, {
  CodeBlock,
  InlineCode,
  SectionDivider,
  Step,
} from "@/components/docs/DocsComponents";
import Link from "next/link";

export default function DocsPromptChaining() {
  const t = useT("docs");
  return (
    <article className="docs-prose w-full max-w-3xl">

      {/* Badge */}
      <div className="mb-3 flex items-center gap-2">
        <span className="rounded-full border border-neon-purple/30 bg-neon-purple/10 px-3 py-0.5 text-xs font-semibold text-neon-purple-light">
          {t("promptChaining.badge")}
        </span>
        <span className="text-slate-700">/</span>
        <span className="text-xs text-slate-500">{t("promptChaining.badgeLabel")}</span>
      </div>

      <h1 id="prompt-chaining" className="scroll-mt-24">
        {t("promptChaining.title")}
      </h1>

      <p>
        {t("promptChaining.intro1")}
        <strong> {t("promptChaining.intro2")}</strong> {t("promptChaining.intro3")}
      </p>
      <p>
        {t("promptChaining.intro4")}
      </p>

      <Callout variant="important" title={t("promptChaining.whyWorks.title")}>
        <p>
          {t("promptChaining.whyWorks.p1Start")}
          <em>{t("promptChaining.whyWorks.p1Mid1")}</em>{t("promptChaining.whyWorks.p1Mid2")}
          <em>{t("promptChaining.whyWorks.p1Mid3")}</em>{t("promptChaining.whyWorks.p1End")}
        </p>
      </Callout>

      <SectionDivider />

      {/* THE CORE CHAIN */}
      <section id="the-core-chain" className="scroll-mt-24">
        <h2>{t("promptChaining.coreChain.title")}</h2>
        <p>
          {t("promptChaining.coreChain.desc")}
        </p>

        <div className="my-6 space-y-4">
          <Step number={1} title={t("promptChaining.coreChain.step1.title")}>
            <span>
              {t("promptChaining.coreChain.step1.desc1")}
              <strong>{t("promptChaining.coreChain.step1.desc2")}</strong>
              {t("promptChaining.coreChain.step1.desc3")}
            </span>
            <div className="mt-3">
              <CodeBlock language="text" filename="Message 1 — Persona Lock">
{`[Paste your full Master Custom Instruction here]

Acknowledge that you have internalized this role. Confirm the following:
1. Your designated persona and expertise level
2. Your primary mission for this session
3. The top 3 rules you will enforce without exception

Do not perform any task yet. Simply confirm.`}
              </CodeBlock>
            </div>
          </Step>

          <Step number={2} title={t("promptChaining.coreChain.step2.title")}>
            <span>
              {t("promptChaining.coreChain.step2.desc1")}
              <strong>{t("promptChaining.coreChain.step2.desc2")}</strong>
              {t("promptChaining.coreChain.step2.desc3")}
            </span>
            <div className="mt-3">
              <CodeBlock language="text" filename="Message 2 — Blueprint Generation">
{`Your task for this session:

[Describe the full deliverable in detail — e.g., "Write a comprehensive 
technical specification for a real-time collaborative code editor built 
with Next.js, CRDTs, and WebSockets."]

Do NOT begin writing yet. First, produce a detailed section-by-section 
outline. For each section, provide:
- Section title
- Core argument or content goal (1-2 sentences)
- Estimated length (short / medium / long)

I will approve this outline before you begin writing.`}
              </CodeBlock>
            </div>
          </Step>

          <Step number={3} title={t("promptChaining.coreChain.step3.title")}>
            <span>
              {t("promptChaining.coreChain.step3.desc1")}
            </span>
            <div className="mt-3">
              <CodeBlock language="text" filename="Messages 3, 4, 5... — Sequential Execution">
{`The outline is approved. Begin writing Section 1: [Section Title].

Apply your full cognitive loop. Enforce all formatting rules. 
This section only — do not continue to Section 2.`}
              </CodeBlock>
            </div>
            <p className="mt-3 text-sm text-slate-400">
              {t("promptChaining.coreChain.step3.desc2")}
            </p>
            <CodeBlock language="text" filename="Continuing the chain">
{`Excellent. Now write Section 2: [Section Title].
Maintain consistency with Section 1 in tone, vocabulary, and depth.`}
            </CodeBlock>
          </Step>
        </div>

        <Callout variant="tip" title={t("promptChaining.coreChain.approvalGate.title")}>
          <p>
            {t("promptChaining.coreChain.approvalGate.desc1")}<InlineCode>I will approve this outline before you begin writing</InlineCode>{" "}
            {t("promptChaining.coreChain.approvalGate.desc2")}
          </p>
        </Callout>
      </section>

      <SectionDivider />

      {/* ADVANCED PATTERNS */}
      <section id="advanced-chain-patterns" className="scroll-mt-24">
        <h2>{t("promptChaining.advanced.title")}</h2>

        <h3 id="critique-chain" className="scroll-mt-24">{t("promptChaining.advanced.critique.title")}</h3>
        <p>
          {t("promptChaining.advanced.critique.desc")}
        </p>

        <CodeBlock language="text" filename="Critique-Revise Pattern">
{`Section 2 is written. 

Now, switch perspective: you are a harsh senior peer reviewer with 
no tolerance for vagueness. Critique Section 2 using these criteria:
1. Technical accuracy — are all claims defensible?
2. Completeness — what critical points are missing?
3. Tone consistency — does it match Section 1?

List all issues found. Then, produce a revised Section 2 that addresses them.`}
        </CodeBlock>

        <h3 id="parallel-chain" className="scroll-mt-24 mt-8">{t("promptChaining.advanced.parallel.title")}</h3>
        <p>
          {t("promptChaining.advanced.parallel.desc")}
        </p>

        <div className="my-5 rounded-xl border border-white/[0.07] bg-white/[0.02] p-5">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-600 mb-4">
            {t("promptChaining.advanced.parallel.flowTitle")}
          </p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {[
              { label: "Chain A", desc: t("promptChaining.advanced.parallel.chainADesc"), color: "border-neon-cyan/20 bg-neon-cyan/[0.03]" },
              { label: "Chain B", desc: t("promptChaining.advanced.parallel.chainBDesc"), color: "border-neon-purple/20 bg-neon-purple/[0.03]" },
              { label: "Chain C", desc: t("promptChaining.advanced.parallel.chainCDesc"), color: "border-amber-500/20 bg-amber-500/[0.03]" },
            ].map((c) => (
              <div key={c.label} className={`rounded-lg border p-3 ${c.color}`}>
                <p className="text-xs font-bold text-slate-300 mb-1">{c.label}</p>
                <p className="text-xs text-slate-500 whitespace-pre-line">{c.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 rounded-lg border border-white/[0.06] bg-white/[0.02] p-3">
            <p className="text-xs font-bold text-slate-300 mb-1">{t("promptChaining.advanced.parallel.synthesisTitle")}</p>
            <p className="text-xs text-slate-500">
              {t("promptChaining.advanced.parallel.synthesisDesc")}
            </p>
          </div>
        </div>

        <h3 id="refinement-chain" className="scroll-mt-24 mt-8">{t("promptChaining.advanced.refine.title")}</h3>
        <p>
          {t("promptChaining.advanced.refine.desc")}
        </p>

        <CodeBlock language="text" filename="Refinement Pass Pattern">
{`[After initial output is produced]

Refinement Pass 1 — Compression:
Reduce this output by 20% without losing any critical information.
Cut every sentence that is not load-bearing. No filler.

Refinement Pass 2 — Elevation:
Rewrite every passive construction as active. Replace every generic
noun with a specific, domain-precise term.

Refinement Pass 3 — Voice:
Ensure the tone matches the persona exactly — [describe tone].
Adjust any sentence that sounds generic or AI-generated.`}
        </CodeBlock>
      </section>

      <SectionDivider />

      {/* BEST CHAINS BY MODEL */}
      <section id="chain-by-model" className="scroll-mt-24">
        <h2>{t("promptChaining.model.title")}</h2>
        <p>
          {t("promptChaining.model.desc")}
        </p>

        <div className="my-5 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/[0.07]">
                <th className="pb-3 text-left font-semibold text-slate-300">{t("promptChaining.model.col1")}</th>
                <th className="pb-3 text-left font-semibold text-slate-300">{t("promptChaining.model.col2")}</th>
                <th className="pb-3 text-left font-semibold text-slate-300">{t("promptChaining.model.col3")}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {[
                [t("promptChaining.model.phase1"), "Claude 3.5 Sonnet", t("promptChaining.model.reason1")],
                [t("promptChaining.model.phase2"), "GPT-4o", t("promptChaining.model.reason2")],
                [t("promptChaining.model.phase3"), "Gemini 2.5 Flash", t("promptChaining.model.reason3")],
                [t("promptChaining.model.phase4"), "Claude 3.5 Sonnet", t("promptChaining.model.reason4")],
                [t("promptChaining.model.phase5"), "GPT-4o / Gemini 2.5 Pro", t("promptChaining.model.reason5")],
              ].map(([phase, model, reason]) => (
                <tr key={phase}>
                  <td className="py-3 text-slate-400 font-medium">{phase}</td>
                  <td className="py-3"><InlineCode>{model}</InlineCode></td>
                  <td className="py-3 text-slate-500 text-xs">{reason}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Callout variant="note">
          <p>
            {t("promptChaining.model.note")}
          </p>
        </Callout>

        {/* Bottom nav */}
        <div className="mt-12 rounded-xl border border-white/[0.07] bg-white/[0.02] p-5">
          <p className="text-xs uppercase tracking-wider text-slate-600 mb-1">{t("promptChaining.next")}</p>
          <Link
            href="/docs?page=context-injection"
            className="font-semibold text-white hover:text-neon-cyan transition-colors"
          >
            {t("promptChaining.nextLink")}
          </Link>
        </div>
      </section>
    </article>
  );
}

"use client";

import Callout, {
  CodeBlock,
  InlineCode,
  SectionDivider,
  Step,
} from "@/components/docs/DocsComponents";
import Link from "next/link";

import { useT } from "@/i18n";

export default function DocsChatGPT() {
  const t = useT("docs");
  return (
    <article className="docs-prose w-full max-w-3xl">

      {/* ── Page badge ───────────────────────────────────────────── */}
      <div className="mb-3 flex items-center gap-2">
        <span className="rounded-full border border-neon-purple/30 bg-neon-purple/10 px-3 py-0.5 text-xs font-semibold text-neon-purple-light">
          {t("chatgpt.badge")}
        </span>
        <span className="text-slate-700">/</span>
        <span className="text-xs text-slate-500">ChatGPT</span>
      </div>

      {/* ── H1 ───────────────────────────────────────────────────── */}
      <h1 id="chatgpt" className="scroll-mt-24">
        {t("chatgpt.title")}
      </h1>

      <p>{t("chatgpt.introPara1")}</p>
      <p>
        {t("chatgpt.introPara2")}
      </p>

      <SectionDivider />

      {/* ── WHY CHATGPT EXCELS ────────────────────────────────────── */}
      <section id="why-chatgpt-excels" className="scroll-mt-24">
        <h2>{t("chatgpt.whyExcels.title")}</h2>
        <p>
          {t("chatgpt.whyExcels.para1")}
          <strong>{t("chatgpt.whyExcels.para1Strong")}</strong>
          {t("chatgpt.whyExcels.para1After")}
        </p>
        <p>
          {t("chatgpt.whyExcels.para2")}
          <InlineCode>{"<self_reflection>"}</InlineCode>
          {t("chatgpt.whyExcels.para2Mid")}
        </p>

        <div className="my-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {[
            {
              label: t("chatgpt.whyExcels.sec1Label"),
              note: t("chatgpt.whyExcels.sec1Note"),
              color: "border-emerald-500/20 bg-emerald-500/[0.03]",
              tag: "★★★★★",
              tagColor: "text-emerald-400",
            },
            {
              label: t("chatgpt.whyExcels.sec2Label"),
              note: t("chatgpt.whyExcels.sec2Note"),
              color: "border-neon-cyan/20 bg-neon-cyan/[0.03]",
              tag: "★★★★☆",
              tagColor: "text-neon-cyan",
            },
            {
              label: t("chatgpt.whyExcels.sec3Label"),
              note: t("chatgpt.whyExcels.sec3Note"),
              color: "border-neon-purple/20 bg-neon-purple/[0.03]",
              tag: "★★★★☆",
              tagColor: "text-neon-purple-light",
            },
            {
              label: t("chatgpt.whyExcels.sec5Label"),
              note: t("chatgpt.whyExcels.sec5Note"),
              color: "border-amber-500/20 bg-amber-500/[0.03]",
              tag: "★★★★☆",
              tagColor: "text-amber-400",
            },
          ].map((s) => (
            <div
              key={s.label}
              className={`rounded-lg border p-4 transition-colors duration-150 hover:border-white/10 ${s.color}`}
            >
              <p className="font-semibold text-slate-200 text-sm">{s.label}</p>
              <p className="mt-0.5 text-xs text-slate-500">{s.note}</p>
              <p className={`mt-1.5 text-xs font-mono ${s.tagColor}`}>{s.tag}</p>
            </div>
          ))}
        </div>

        <Callout variant="tip" title={t("chatgpt.whyExcels.tipTitle")}>
          <p>
            {t("chatgpt.whyExcels.tipPara")}
            <InlineCode>{"<self_reflection>"}</InlineCode>
            {t("chatgpt.whyExcels.tipParaMid")}
            <strong>{t("chatgpt.whyExcels.tipParaStrong1")}</strong>
            {t("chatgpt.whyExcels.tipParaOr")}
            <strong>{t("chatgpt.whyExcels.tipParaStrong2")}</strong>
            {t("chatgpt.whyExcels.tipParaAfter")}
          </p>
        </Callout>
      </section>

      <SectionDivider />

      {/* ── TWO-FIELD STRATEGY ────────────────────────────────────── */}
      <section id="two-field-strategy" className="scroll-mt-24">
        <h2>{t("chatgpt.twoField.title")}</h2>
        <p>
          {t("chatgpt.twoField.para1")}
          <strong>{t("chatgpt.twoField.para1Strong")}</strong>
          {t("chatgpt.twoField.para1After")}
        </p>

        <div className="my-6 space-y-4">
          {/* Field 1 */}
          <div className="rounded-xl border border-neon-cyan/20 bg-neon-cyan/[0.03] p-5">
            <p className="text-xs font-bold uppercase tracking-widest text-neon-cyan mb-2">
              {t("chatgpt.twoField.field1Label")}
            </p>
            <p className="text-sm text-slate-300 mb-3">
              {t("chatgpt.twoField.field1Desc")}
              <strong>{t("chatgpt.twoField.field1Strong1")}</strong>
              {t("chatgpt.twoField.field1And")}
              <strong>{t("chatgpt.twoField.field1Strong2")}</strong>
              {t("chatgpt.twoField.field1After")}
            </p>
            <ul className="text-sm text-slate-400 space-y-1.5">
              <li>
                <span className="text-neon-cyan font-mono text-xs mr-2">→</span>
                <strong className="text-slate-300">{t("chatgpt.twoField.field1List1Strong")}</strong>
                {t("chatgpt.twoField.field1List1")}
              </li>
              <li>
                <span className="text-neon-cyan font-mono text-xs mr-2">→</span>
                <strong className="text-slate-300">{t("chatgpt.twoField.field1List2Strong")}</strong>
                {t("chatgpt.twoField.field1List2")}
              </li>
            </ul>
          </div>

          {/* Field 2 */}
          <div className="rounded-xl border border-neon-purple/20 bg-neon-purple/[0.03] p-5">
            <p className="text-xs font-bold uppercase tracking-widest text-neon-purple-light mb-2">
              {t("chatgpt.twoField.field2Label")}
            </p>
            <p className="text-sm text-slate-300 mb-3">
              {t("chatgpt.twoField.field2Desc")}
              <strong>{t("chatgpt.twoField.field2Strong")}</strong>
              {t("chatgpt.twoField.field2After")}
            </p>
            <ul className="text-sm text-slate-400 space-y-1.5">
              <li>
                <span className="text-neon-purple-light font-mono text-xs mr-2">→</span>
                <strong className="text-slate-300">{t("chatgpt.twoField.field2List1Strong")}</strong>
                {t("chatgpt.twoField.field2List1")}
              </li>
              <li>
                <span className="text-neon-purple-light font-mono text-xs mr-2">→</span>
                <strong className="text-slate-300">{t("chatgpt.twoField.field2List2Strong")}</strong>
                {t("chatgpt.twoField.field2List2")}
              </li>
              <li>
                <span className="text-neon-purple-light font-mono text-xs mr-2">→</span>
                <strong className="text-slate-300">{t("chatgpt.twoField.field2List3Strong")}</strong>
                {t("chatgpt.twoField.field2List3")}
              </li>
              <li>
                <span className="text-neon-purple-light font-mono text-xs mr-2">→</span>
                <strong className="text-slate-300">{t("chatgpt.twoField.field2List4Strong")}</strong>
                {t("chatgpt.twoField.field2List4")}
              </li>
            </ul>
          </div>
        </div>

        <Callout variant="note" title={t("chatgpt.twoField.limitTitle")}>
          <p>
            {t("chatgpt.twoField.limitPara")}
            <strong>{t("chatgpt.twoField.limitStrong1")}</strong>
            {t("chatgpt.twoField.limitMid1")}
            <strong>{t("chatgpt.twoField.limitStrong2")}</strong>
            {t("chatgpt.twoField.limitMid2")}
            <strong>{t("chatgpt.twoField.limitStrong3")}</strong>
            {t("chatgpt.twoField.limitAfter")}
          </p>
        </Callout>
      </section>

      <SectionDivider />

      {/* ── STEP-BY-STEP SETUP ────────────────────────────────────── */}
      <section id="step-by-step-setup" className="scroll-mt-24">
        <h2>{t("chatgpt.stepByStep.title")}</h2>
        <p>
          {t("chatgpt.stepByStep.para")}
        </p>

        <div className="space-y-3 my-5">
          <Step number={1} title={t("chatgpt.stepByStep.step1Title")}>
            {t("chatgpt.stepByStep.step1Before")}
            <a
              href="https://chatgpt.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neon-cyan"
            >
              chatgpt.com
            </a>
            {t("chatgpt.stepByStep.step1Mid1")}
            <strong>{t("chatgpt.stepByStep.step1Strong")}</strong>
            {t("chatgpt.stepByStep.step1Mid2")}
            <InlineCode>Settings</InlineCode>
            {t("chatgpt.stepByStep.step1After")}
          </Step>
          <Step number={2} title={t("chatgpt.stepByStep.step2Title")}>
            {t("chatgpt.stepByStep.step2Before")}
            <InlineCode>Personalization</InlineCode>
            {t("chatgpt.stepByStep.step2Mid1")}
            <InlineCode>Custom Instructions</InlineCode>
            {t("chatgpt.stepByStep.step2Mid2")}
            <InlineCode>ON</InlineCode>
            {t("chatgpt.stepByStep.step2After")}
          </Step>
          <Step number={3} title={t("chatgpt.stepByStep.step3Title")}>
            {t("chatgpt.stepByStep.step3Before")}
            <strong>{t("chatgpt.stepByStep.step3Strong1")}</strong>
            {t("chatgpt.stepByStep.step3Mid")}
            <strong>{t("chatgpt.stepByStep.step3Strong2")}</strong>
            {t("chatgpt.stepByStep.step3After1")}
            <InlineCode>Save</InlineCode>
            {t("chatgpt.stepByStep.step3After2")}
          </Step>
        </div>

        <Callout variant="warning" title={t("chatgpt.stepByStep.warningTitle")}>
          <p>
            {t("chatgpt.stepByStep.warningPara")}
            <strong>{t("chatgpt.stepByStep.warningStrong1")}</strong>
            {t("chatgpt.stepByStep.warningMid")}
            <strong>{t("chatgpt.stepByStep.warningStrong2")}</strong>
            {t("chatgpt.stepByStep.warningAfter")}
          </p>
        </Callout>
      </section>

      <SectionDivider />

      {/* ── CHATGPT PROJECTS ──────────────────────────────────────── */}
      <section id="chatgpt-projects" className="scroll-mt-24">
        <h2>{t("chatgpt.projects.title")}</h2>
        <p>
          {t("chatgpt.projects.para")}
          <strong>{t("chatgpt.projects.paraStrong1")}</strong>
          {t("chatgpt.projects.paraMid1")}
          <strong>{t("chatgpt.projects.paraStrong2")}</strong>
          {t("chatgpt.projects.paraAfter")}
        </p>

        <div className="space-y-3 my-5">
          <Step number={1} title={t("chatgpt.projects.step1Title")}>
            {t("chatgpt.projects.step1Before")}
            <InlineCode>New project</InlineCode>
            {t("chatgpt.projects.step1Mid1")}
            <InlineCode>+</InlineCode>
            {t("chatgpt.projects.step1Mid2")}
          </Step>
          <Step number={2} title={t("chatgpt.projects.step2Title")}>
            {t("chatgpt.projects.step2Before")}
            <InlineCode>Add instructions</InlineCode>
            {t("chatgpt.projects.step2After")}
          </Step>
          <Step number={3} title={t("chatgpt.projects.step3Title")}>
            {t("chatgpt.projects.step3Before")}
            <InlineCode>Save</InlineCode>
            {t("chatgpt.projects.step3After")}
          </Step>
          <Step number={4} title={t("chatgpt.projects.step4Title")}>
            {t("chatgpt.projects.step4Desc")}
          </Step>
        </div>

        <Callout variant="tip" title={t("chatgpt.projects.tipTitle")}>
          <p>
            {t("chatgpt.projects.tipPara")}
            <strong>{t("chatgpt.projects.tipStrong")}</strong>
            {t("chatgpt.projects.tipAfter")}
          </p>
        </Callout>
      </section>

      <SectionDivider />

      {/* ── API INTEGRATION ───────────────────────────────────────── */}
      <section id="api-integration" className="scroll-mt-24">
        <h2>{t("chatgpt.api.title")}</h2>
        <p>
          {t("chatgpt.api.para")}
          <InlineCode>system</InlineCode>
          {t("chatgpt.api.paraMid")}
        </p>

        <h3 id="api-python-example" className="scroll-mt-24">
          {t("chatgpt.api.pythonTitle")}
        </h3>

        <CodeBlock language="python" filename="chatgpt_integration.py">
{`import openai

# Load your complete Master Instruction (copy from Output Studio)
MASTER_INSTRUCTION = """
# 🎭 1. Role & Identity
You are a Senior TypeScript Engineer with deep expertise in distributed
systems, type-level programming, and performance optimization at scale.

# 🎯 2. Mission & Objective
Your mission is to review, optimize, and generate production-ready TypeScript
code. Every response must prioritize correctness, type safety, and runtime
performance — in that order.

# 🧠 3. The Cognitive Loop (Internal Reflection)
<self_reflection>
Before answering, evaluate:
1. What is the exact problem the user is solving?
2. What are the 3 most likely failure modes in their current approach?
3. What would a 10x engineer do differently here?
4. Does my answer introduce any regressions or coupling?
5. Rate my response: correctness / clarity / completeness (1-10 each).
</self_reflection>

[... Sections 4, 5, 6 from your generated instruction ...]
"""

client = openai.OpenAI(api_key="your-openai-api-key")

response = client.chat.completions.create(
    model="gpt-4o",
    temperature=0.3,          # Low temperature → strict persona adherence
    max_tokens=4096,
    messages=[
        {"role": "system", "content": MASTER_INSTRUCTION},
        {"role": "user",   "content": "Review this TypeScript function for "
                                      "type safety issues and suggest improvements."},
    ],
)

print(response.choices[0].message.content)`}
        </CodeBlock>

        <h3 id="api-streaming-example" className="scroll-mt-24 mt-8">
          {t("chatgpt.api.streamingTitle")}
        </h3>
        <p>
          {t("chatgpt.api.streamingPara")}
          <InlineCode>{"<self_reflection>"}</InlineCode>
          {t("chatgpt.api.streamingMid")}
        </p>

        <CodeBlock language="python" filename="chatgpt_streaming.py">
{`import openai

client = openai.OpenAI(api_key="your-openai-api-key")

stream = client.chat.completions.create(
    model="gpt-4o",
    temperature=0.3,
    stream=True,
    messages=[
        {"role": "system",  "content": MASTER_INSTRUCTION},
        {"role": "user",    "content": "Audit this React component for performance."},
    ],
)

for chunk in stream:
    delta = chunk.choices[0].delta.content
    if delta:
        print(delta, end="", flush=True)`}
        </CodeBlock>

        <Callout variant="important" title={t("chatgpt.api.importantTitle")}>
          <p>
            {t("chatgpt.api.importantPara")}
            <strong>{t("chatgpt.api.importantStrong")}</strong>
            {t("chatgpt.api.importantMid1")}
            <InlineCode>messages</InlineCode>
            {t("chatgpt.api.importantMid2")}
            <InlineCode>{`role: "system"`}</InlineCode>
            {t("chatgpt.api.importantAfter")}
          </p>
        </Callout>
      </section>

      {/* ── Bottom nav ─────────────────────────────────────────────── */}
      <div className="mt-12 rounded-xl border border-white/[0.07] bg-white/[0.02] p-5">
        <p className="text-xs uppercase tracking-wider text-slate-600 mb-1">{t("chatgpt.nextLabel")}</p>
        <Link
          href="/docs?page=claude"
          className="font-semibold text-white hover:text-neon-cyan transition-colors"
        >
          {t("chatgpt.nextLink")}
        </Link>
      </div>

    </article>
  );
}

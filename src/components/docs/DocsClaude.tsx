"use client";

import Callout, {
  CodeBlock,
  InlineCode,
  SectionDivider,
  Step,
} from "@/components/docs/DocsComponents";
import Link from "next/link";
import { useT } from "@/i18n";

export default function DocsClaude() {
  const t = useT("docs");
  return (
    <article className="docs-prose w-full max-w-3xl">

      {/* ── Page badge ───────────────────────────────────────────── */}
      <div className="mb-3 flex items-center gap-2">
        <span className="rounded-full border border-neon-purple/30 bg-neon-purple/10 px-3 py-0.5 text-xs font-semibold text-neon-purple-light">
          {t("claude.badge")}
        </span>
        <span className="text-slate-700">/</span>
        <span className="text-xs text-slate-500">Claude</span>
      </div>

      {/* ── H1 ───────────────────────────────────────────────────── */}
      <h1 id="claude" className="scroll-mt-24">
        {t("claude.title")}
      </h1>

      <p>
        {t("claude.introPara1Before")}{" "}
        <InlineCode>{"<self_reflection>"}</InlineCode> {t("claude.introPara1Mid1")}{" "}
        <strong>{t("claude.introPara1Strong1")}</strong> {t("claude.introPara1Mid2")}{" "}
        <InlineCode>{"<self_reflection>"}</InlineCode> {t("claude.introPara1Mid3")}{" "}
        <strong>{t("claude.introPara1Strong2")}</strong>{t("claude.introPara1After")}
      </p>
      <p>
        {t("claude.introPara2")}
      </p>

      <SectionDivider />

      {/* ── WHY CLAUDE EXCELS ─────────────────────────────────────── */}
      <section id="why-claude-excels" className="scroll-mt-24">
        <h2>{t("claude.whyExcels.title")}</h2>
        <p>
          {t("claude.whyExcels.para1.before")}{" "}
          <strong>{t("claude.whyExcels.para1.strong1")}</strong>{t("claude.whyExcels.para1.mid")}{" "}
          <strong>{t("claude.whyExcels.para1.strong2")}</strong>{t("claude.whyExcels.para1.after")}
        </p>
        <p>
          {t("claude.whyExcels.para2.before")}{" "}
          <InlineCode>{"<self_reflection>"}</InlineCode>{t("claude.whyExcels.para2.mid")}{" "}
          <strong>{t("claude.whyExcels.para2.strong")}</strong>{t("claude.whyExcels.para2.after")}
        </p>

        <div className="my-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {[
            {
              label: t("claude.whyExcels.cogLoopLabel"),
              note: t("claude.whyExcels.cogLoopNote"),
              color: "border-emerald-500/20 bg-emerald-500/[0.03]",
              tag: "★★★★★",
              tagColor: "text-emerald-400",
            },
            {
              label: t("claude.whyExcels.roleLabel"),
              note: t("claude.whyExcels.roleNote"),
              color: "border-neon-cyan/20 bg-neon-cyan/[0.03]",
              tag: "★★★★★",
              tagColor: "text-neon-cyan",
            },
            {
              label: t("claude.whyExcels.boundLabel"),
              note: t("claude.whyExcels.boundNote"),
              color: "border-neon-purple/20 bg-neon-purple/[0.03]",
              tag: "★★★★☆",
              tagColor: "text-neon-purple-light",
            },
            {
              label: t("claude.whyExcels.formatLabel"),
              note: t("claude.whyExcels.formatNote"),
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
      </section>

      <SectionDivider />

      {/* ── CLAUDE.AI PROJECTS ────────────────────────────────────── */}
      <section id="claude-projects" className="scroll-mt-24">
        <h2>{t("claude.projects.title")}</h2>
        <p>
          {t("claude.projects.para.before")}{" "}
          <strong>{t("claude.projects.para.strong1")}</strong>{t("claude.projects.para.mid")}{" "}
          <strong>{t("claude.projects.para.strong2")}</strong>{t("claude.projects.para.after")}
        </p>

        <div className="space-y-3 my-5">
          <Step number={1} title={t("claude.projects.step1.title")}>
            {t("claude.projects.step1.before")}{" "}
            <a
              href="https://claude.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neon-cyan"
            >
              claude.ai
            </a>{" "}
            {t("claude.projects.step1.mid1")} <strong>{t("claude.projects.step1.strong")}</strong>{t("claude.projects.step1.mid2")}{" "}
            <InlineCode>Projects</InlineCode>{t("claude.projects.step1.after")}
          </Step>
          <Step number={2} title={t("claude.projects.step2.title")}>
            {t("claude.projects.step2.before")} <InlineCode>New Project</InlineCode> {t("claude.projects.step2.mid")}{" "}
            <InlineCode>+</InlineCode>{t("claude.projects.step2.after")}
          </Step>
          <Step number={3} title={t("claude.projects.step3.title")}>
            {t("claude.projects.step3.before")}{" "}
            <InlineCode>Add project instructions</InlineCode>{t("claude.projects.step3.after")}
          </Step>
          <Step number={4} title={t("claude.projects.step4.title")}>
            {t("claude.projects.step4.before")} <InlineCode>Save</InlineCode>{t("claude.projects.step4.after")}
          </Step>
        </div>

        <Callout variant="important" title={t("claude.projects.callout.title")}>
          <p>
            {t("claude.projects.callout.before")}{" "}
            <strong>{t("claude.projects.callout.strong")}</strong>{t("claude.projects.callout.after")}
          </p>
        </Callout>
      </section>

      <SectionDivider />

      {/* ── DIRECT CHAT METHOD ────────────────────────────────────── */}
      <section id="direct-chat-method" className="scroll-mt-24">
        <h2>{t("claude.directChat.title")}</h2>
        <p>
          {t("claude.directChat.para1")}
        </p>
        <p>
          {t("claude.directChat.para2.before")}{" "}
          <strong>{t("claude.directChat.para2.strong1")}</strong>{t("claude.directChat.para2.mid")}{" "}
          <strong>{t("claude.directChat.para2.strong2")}</strong>{t("claude.directChat.para2.after")}
        </p>

        <Callout variant="note" title={t("claude.directChat.callout.title")}>
          <p>
            {t("claude.directChat.callout.text")}
          </p>
        </Callout>
      </section>

      <SectionDivider />

      {/* ── THE XML ADVANTAGE ─────────────────────────────────────── */}
      <section id="xml-advantage" className="scroll-mt-24">
        <h2>{t("claude.xmlAdvantage.title")}</h2>
        <p>
          {t("claude.xmlAdvantage.para1")}
        </p>

        <CodeBlock language="xml" filename="Section 3 — Cognitive Loop (excerpt)">
{`# 🧠 3. The Cognitive Loop (Internal Reflection)

Before generating any response, you MUST reason silently using this structure:

<self_reflection>
  <problem_definition>
    State the core problem in one precise sentence.
    Identify what the user actually needs vs. what they literally asked for.
  </problem_definition>

  <evaluation_rubric>
    1. Correctness: Is my answer factually and logically sound? (1-10)
    2. Completeness: Does it address all dimensions of the problem? (1-10)
    3. Clarity: Will a senior practitioner find this immediately actionable? (1-10)
    4. Risk: Does this introduce technical debt, security holes, or coupling?
    5. Alternatives: What is the second-best approach and why is mine better?
  </evaluation_rubric>

  <pre_response_check>
    - Does my response stay within the persona defined in Section 1?
    - Does it follow the formatting rules in Section 6?
    - Have I violated any boundary in Section 5?
  </pre_response_check>
</self_reflection>

[Visible response begins after closing tag]`}
        </CodeBlock>

        <p>
          {t("claude.xmlAdvantage.para2.before")}{" "}
          <InlineCode>{"<self_reflection>"}</InlineCode>{t("claude.xmlAdvantage.para2.mid")}{" "}
          <strong>{t("claude.xmlAdvantage.para2.strong")}</strong>{t("claude.xmlAdvantage.para2.after")}
        </p>

        <Callout variant="tip" title={t("claude.xmlAdvantage.callout.title")}>
          <p>
            {t("claude.xmlAdvantage.callout.before")}{" "}
            <InlineCode>{"<thinking>"}</InlineCode>{t("claude.xmlAdvantage.callout.mid1")}{" "}
            <InlineCode>
              {t("claude.xmlAdvantage.callout.code")}
            </InlineCode>{t("claude.xmlAdvantage.callout.after")}
          </p>
        </Callout>
      </section>

      <SectionDivider />

      {/* ── API INTEGRATION ───────────────────────────────────────── */}
      <section id="api-integration" className="scroll-mt-24">
        <h2>{t("claude.apiIntegration.title")}</h2>
        <p>
          {t("claude.apiIntegration.para1.before")}{" "}
          <strong>{t("claude.apiIntegration.para1.strong")}</strong>{t("claude.apiIntegration.para1.mid")}{" "}
          <InlineCode>system</InlineCode>{t("claude.apiIntegration.para1.after")}
        </p>

        <CodeBlock language="python" filename="claude_integration.py">
{`import anthropic

# Load your complete Master Instruction (copy from Output Studio)
MASTER_INSTRUCTION = """
# 🎭 1. Role & Identity
You are a Principal Research Scientist with expertise in machine
learning, statistics, and scientific writing. You communicate with rigorous
precision and cite your reasoning explicitly.

# 🎯 2. Mission & Objective
Your mission is to help me analyze, interpret, and communicate complex research
findings. Prioritize statistical correctness, causal clarity, and reproducibility.

# 🧠 3. The Cognitive Loop (Internal Reflection)
<self_reflection>
  <problem_definition>State the research question in one sentence.</problem_definition>
  <evaluation_rubric>
    1. Statistical validity (1-10)
    2. Causal clarity — correlation vs. causation (1-10)
    3. Reproducibility — can this be replicated? (1-10)
    4. Communication clarity for a non-specialist audience (1-10)
  </evaluation_rubric>
  <pre_response_check>
    - Am I making any unsubstantiated causal claims?
    - Is my confidence level communicated accurately?
  </pre_response_check>
</self_reflection>

[... Sections 4, 5, 6 from your generated instruction ...]
"""

client = anthropic.Anthropic(api_key="your-anthropic-api-key")

message = client.messages.create(
    model="claude-sonnet-4-5",
    max_tokens=8192,
    temperature=0.3,           # Low temperature → strict reasoning adherence
    system=MASTER_INSTRUCTION, # ← Injected as system parameter, not a message
    messages=[
        {
            "role": "user",
            "content": "Analyze the statistical significance of this A/B test result: "
                       "control CTR 3.2%, variant CTR 3.8%, n=50,000 per group.",
        }
    ],
)

print(message.content[0].text)`}
        </CodeBlock>

        <h3 id="api-streaming" className="scroll-mt-24 mt-8">
          {t("claude.apiIntegration.streaming.title")}
        </h3>
        <p>
          {t("claude.apiIntegration.streaming.before")}{" "}
          <strong>{t("claude.apiIntegration.streaming.strong")}</strong>{t("claude.apiIntegration.streaming.after")}
        </p>

        <CodeBlock language="python" filename="claude_extended_thinking.py">
{`import anthropic

client = anthropic.Anthropic(api_key="your-anthropic-api-key")

# Extended thinking + system instruction = maximum reasoning depth
response = client.messages.create(
    model="claude-3-7-sonnet-20250219",
    max_tokens=16000,
    temperature=1,             # Required for extended thinking (Anthropic constraint)
    thinking={
        "type": "enabled",
        "budget_tokens": 10000  # Tokens allocated for internal reasoning
    },
    system=MASTER_INSTRUCTION,
    messages=[
        {
            "role": "user",
            "content": "Design the architecture for a fault-tolerant distributed cache.",
        }
    ],
)

# Response includes both thinking blocks and final response
for block in response.content:
    if block.type == "thinking":
        print(f"[Internal reasoning: {len(block.thinking)} chars]")
    elif block.type == "text":
        print(block.text)`}
        </CodeBlock>

        <Callout variant="important" title={t("claude.apiIntegration.callout.title")}>
          <p>
            {t("claude.apiIntegration.callout.before")}{" "}
            <InlineCode>temperature=1</InlineCode>{t("claude.apiIntegration.callout.after")}
          </p>
        </Callout>
      </section>

      {/* ── Bottom nav ─────────────────────────────────────────────── */}
      <div className="mt-12 rounded-xl border border-white/[0.07] bg-white/[0.02] p-5">
        <p className="text-xs uppercase tracking-wider text-slate-600 mb-1">{t("claude.next")}</p>
        <Link
          href="/docs?page=gemini"
          className="font-semibold text-white hover:text-neon-cyan transition-colors"
        >
          {t("claude.nextLink")}
        </Link>
      </div>

    </article>
  );
}

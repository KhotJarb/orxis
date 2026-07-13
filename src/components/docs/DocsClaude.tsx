"use client";

import Callout, {
  CodeBlock,
  InlineCode,
  SectionDivider,
  Step,
} from "@/components/docs/DocsComponents";
import Link from "next/link";

export default function DocsClaude() {
  return (
    <article className="docs-prose w-full max-w-3xl">

      {/* ── Page badge ───────────────────────────────────────────── */}
      <div className="mb-3 flex items-center gap-2">
        <span className="rounded-full border border-neon-purple/30 bg-neon-purple/10 px-3 py-0.5 text-xs font-semibold text-neon-purple-light">
          Platform Guides
        </span>
        <span className="text-slate-700">/</span>
        <span className="text-xs text-slate-500">Claude</span>
      </div>

      {/* ── H1 ───────────────────────────────────────────────────── */}
      <h1 id="claude" className="scroll-mt-24">
        Using Instructions with Claude
      </h1>

      <p>
        Claude (Anthropic) is particularly well-suited for processing the{" "}
        <InlineCode>{"<self_reflection>"}</InlineCode> XML tags in Section 3
        (The Cognitive Loop). Claude was trained using Constitutional AI with{" "}
        <strong>XML-annotated reasoning traces</strong> — meaning it was taught
        to reason by reading and producing structured XML internally. When your
        Master Instruction contains{" "}
        <InlineCode>{"<self_reflection>"}</InlineCode> tags, Claude doesn&apos;t
        merely see them as formatting — it uses them as{" "}
        <strong>architectural scaffolding for its reasoning chain</strong>,
        producing deeper, more structured analysis than many other models.
      </p>
      <p>
        Claude 3.5 Sonnet and Claude 3.7 Sonnet (with extended thinking) take
        this further — combining the Cognitive Loop with native reasoning
        transparency produces highly auditable, structured outputs.
      </p>

      <SectionDivider />

      {/* ── WHY CLAUDE EXCELS ─────────────────────────────────────── */}
      <section id="why-claude-excels" className="scroll-mt-24">
        <h2>Why Claude Excels</h2>
        <p>
          Anthropic trained Claude using{" "}
          <strong>Constitutional AI (CAI)</strong> — a process in which the model
          was given a set of principles and asked to critique and revise its own
          outputs against them. This training was conducted using{" "}
          <strong>XML-tagged feedback pairs</strong>: the model was shown its
          reasoning inside structured XML blocks and learned to treat those
          blocks as first-class cognitive artifacts, not decorative markup.
        </p>
        <p>
          The practical consequence is that Claude processes the{" "}
          <InlineCode>{"<self_reflection>"}</InlineCode> tags in your generated
          Section 3 as <strong>genuine internal reasoning directives</strong>.
          It will follow the multi-point evaluation rubric inside the tags
          before constructing its visible response — creating a two-layer output
          where the hidden reasoning layer materially improves the quality of
          what the user sees.
        </p>

        <div className="my-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {[
            {
              label: "Section 3 — Cognitive Loop",
              note: "XML tags processed as native reasoning scaffolds",
              color: "border-emerald-500/20 bg-emerald-500/[0.03]",
              tag: "★★★★★",
              tagColor: "text-emerald-400",
            },
            {
              label: "Section 1 — Role & Identity",
              note: "Strong persona adoption with constitutional grounding",
              color: "border-neon-cyan/20 bg-neon-cyan/[0.03]",
              tag: "★★★★★",
              tagColor: "text-neon-cyan",
            },
            {
              label: "Section 5 — Boundaries",
              note: "Excellent constraint adherence from CAI training",
              color: "border-neon-purple/20 bg-neon-purple/[0.03]",
              tag: "★★★★☆",
              tagColor: "text-neon-purple-light",
            },
            {
              label: "Section 6 — Output Formatting",
              note: "Strong Markdown structure compliance",
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
        <h2>Claude.ai Projects (Recommended)</h2>
        <p>
          The best way to deploy your Master Instruction with Claude is through{" "}
          <strong>Projects</strong> on claude.ai. Projects give your instruction
          a permanent home — it is automatically prepended to every conversation
          you start inside the Project, without you having to paste it manually.
          This is particularly powerful with Claude because{" "}
          <strong>200K-token context window</strong> means your entire
          instruction history, including appended documents, fits with room to
          spare.
        </p>

        <div className="space-y-3 my-5">
          <Step number={1} title="Navigate to Projects">
            Go to{" "}
            <a
              href="https://claude.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neon-cyan"
            >
              claude.ai
            </a>{" "}
            and sign in. In the <strong>left sidebar</strong>, click{" "}
            <InlineCode>Projects</InlineCode>. If you don&apos;t see it, ensure
            you&apos;re on a Pro or Team plan — Projects require a paid account.
          </Step>
          <Step number={2} title="Create a new Project">
            Click <InlineCode>New Project</InlineCode> (or the{" "}
            <InlineCode>+</InlineCode> button). Give it a descriptive name —
            e.g., &quot;Research Analyst&quot; or &quot;Principal Engineer&quot;.
            This name helps you quickly identify which instruction set is active.
          </Step>
          <Step number={3} title="Add project instructions">
            Inside the Project view, click{" "}
            <InlineCode>Add project instructions</InlineCode> (visible in the
            right-hand panel or at the top of the Project page). A full editor
            opens — paste your complete Master Instruction here. There is no
            character limit.
          </Step>
          <Step number={4} title="Save and start a conversation">
            Click <InlineCode>Save</InlineCode>. Every new conversation started
            inside this Project will automatically receive your Master
            Instruction as its system context. Claude will honor it for the
            entire session without any re-pasting.
          </Step>
        </div>

        <Callout variant="important" title="Projects Preserve Instructions Permanently">
          <p>
            Unlike pasting at the start of a chat, Project instructions are{" "}
            <strong>stored server-side indefinitely</strong>. You can update them
            at any time by returning to the Project and editing the instructions
            field. Claude&apos;s 200K-token context window means your entire
            instruction — including all six sections — fits comfortably alongside
            thousands of turns of conversation history.
          </p>
        </Callout>
      </section>

      <SectionDivider />

      {/* ── DIRECT CHAT METHOD ────────────────────────────────────── */}
      <section id="direct-chat-method" className="scroll-mt-24">
        <h2>Direct Chat Method</h2>
        <p>
          For quick tests, one-off sessions, or if you&apos;re on the free plan
          without access to Projects, you can paste the Master Instruction
          directly into a new Claude conversation. Claude will honor it for the
          entire session, no Projects setup required.
        </p>
        <p>
          The workflow is simple: open a new chat, paste your complete Master
          Instruction as your <strong>first message</strong>, send it, and then
          on your <strong>second message</strong> send your actual request.
          Claude treats the first message as a context-setting primer and will
          operate within the defined persona and constraints from that point
          forward.
        </p>

        <Callout variant="note" title="Session-Scoped Only">
          <p>
            The direct chat method only persists for the duration of that
            specific conversation. If you start a new chat, you&apos;ll need to
            paste the instruction again. For repeated use of the same persona,
            Projects are strongly recommended over this method.
          </p>
        </Callout>
      </section>

      <SectionDivider />

      {/* ── THE XML ADVANTAGE ─────────────────────────────────────── */}
      <section id="xml-advantage" className="scroll-mt-24">
        <h2>The XML Advantage</h2>
        <p>
          Section 3 of your generated instruction — The Cognitive Loop — uses
          XML tags as a structured internal reasoning scaffold. Here is what a
          typical Cognitive Loop block looks like and how Claude interprets it:
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
          When Claude reads this block, it doesn&apos;t produce the{" "}
          <InlineCode>{"<self_reflection>"}</InlineCode> XML in its output
          (unless explicitly instructed to). Instead, it uses the internal
          structure as a <strong>reasoning template</strong> — executing each
          sub-tag as a discrete thinking step before constructing its reply. The
          result is a response that has been implicitly evaluated against a
          5-point rubric, checked for persona consistency, and verified against
          formatting rules — all before the user sees a single word.
        </p>

        <Callout variant="tip" title="Add &lt;thinking&gt; Tags for Visible Reasoning">
          <p>
            On Claude 3.5 Sonnet and later, you can add{" "}
            <InlineCode>{"<thinking>"}</InlineCode> to your instruction to expose
            Claude&apos;s reasoning chain visibly in its output. Combine this
            with the Cognitive Loop for detailed transparency:{" "}
            <InlineCode>
              {"Before responding, show your reasoning inside <thinking> tags."}
            </InlineCode>{" "}
            This makes Claude&apos;s evaluation rubric auditable — ideal for
            high-stakes decisions or teaching contexts.
          </p>
        </Callout>
      </section>

      <SectionDivider />

      {/* ── API INTEGRATION ───────────────────────────────────────── */}
      <section id="api-integration" className="scroll-mt-24">
        <h2>API Integration</h2>
        <p>
          For production applications, use the{" "}
          <strong>Anthropic Python SDK</strong> to inject your Master Instruction
          as the <InlineCode>system</InlineCode> parameter. Anthropic&apos;s API
          treats the system prompt as a first-class parameter — not a message in
          the conversation array — which gives it the highest priority in the
          model&apos;s attention.
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
          Streaming with Extended Thinking
        </h3>
        <p>
          Claude 3.7 Sonnet supports{" "}
          <strong>extended thinking</strong> — a first-class API feature that
          gives Claude dedicated compute for deep reasoning before responding.
          This combines powerfully with your Cognitive Loop:
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

        <Callout variant="important" title="Temperature Constraint for Extended Thinking">
          <p>
            When using Claude&apos;s extended thinking mode, Anthropic requires{" "}
            <InlineCode>temperature=1</InlineCode>. This does not reduce
            instruction adherence — the extended thinking budget provides
            structured exploration, and the Cognitive Loop in your system
            instruction provides the evaluation rubric that guides it.
          </p>
        </Callout>
      </section>

      {/* ── Bottom nav ─────────────────────────────────────────────── */}
      <div className="mt-12 rounded-xl border border-white/[0.07] bg-white/[0.02] p-5">
        <p className="text-xs uppercase tracking-wider text-slate-600 mb-1">Next</p>
        <Link
          href="/docs?page=gemini"
          className="font-semibold text-white hover:text-neon-cyan transition-colors"
        >
          Gemini Guide →
        </Link>
      </div>

    </article>
  );
}

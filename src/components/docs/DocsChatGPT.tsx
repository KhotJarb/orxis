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
        <h2>Why ChatGPT Excels</h2>
        <p>
          OpenAI&apos;s instruction-following fine-tuning has a distinct
          architectural advantage: the model was explicitly trained to prioritize
          the <strong>system prompt</strong> above all other context. This is
          most visible in Section 1 (Role &amp; Identity), where ChatGPT
          tends to maintain persona consistency — including the assigned
          voice, expertise level, and decision-making style — even across
          longer conversations.
        </p>
        <p>
          GPT-4o&apos;s extended context window (128K tokens) also means your
          entire instruction — including the verbose{" "}
          <InlineCode>{"<self_reflection>"}</InlineCode> scaffolding in Section
          3 — fits comfortably with room for thousands of turns of dialogue. The
          model won&apos;t &quot;forget&quot; its role as the conversation
          grows.
        </p>

        <div className="my-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {[
            {
              label: "Section 1 — Role & Identity",
              note: "Strong persona locking via RLHF",
              color: "border-emerald-500/20 bg-emerald-500/[0.03]",
              tag: "★★★★★",
              tagColor: "text-emerald-400",
            },
            {
              label: "Section 2 — Mission",
              note: "Strong goal persistence across long contexts",
              color: "border-neon-cyan/20 bg-neon-cyan/[0.03]",
              tag: "★★★★☆",
              tagColor: "text-neon-cyan",
            },
            {
              label: "Section 3 — Cognitive Loop",
              note: "GPT-4o honors self_reflection; GPT-3.5 does not",
              color: "border-neon-purple/20 bg-neon-purple/[0.03]",
              tag: "★★★★☆",
              tagColor: "text-neon-purple-light",
            },
            {
              label: "Section 5 — Boundaries",
              note: "Reliable constraint adherence in GPT-4o",
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

        <Callout variant="tip" title="Use GPT-4o, Not GPT-3.5">
          <p>
            GPT-4o honors the Cognitive Loop&apos;s{" "}
            <InlineCode>{"<self_reflection>"}</InlineCode> directive
            significantly better than GPT-3.5. With GPT-3.5, the model may
            acknowledge the tag but perform only superficial reflection. Always
            use <strong>GPT-4o</strong> or <strong>GPT-4o-mini</strong> for
            structured instructions to get the full benefit of Section 3.
          </p>
        </Callout>
      </section>

      <SectionDivider />

      {/* ── TWO-FIELD STRATEGY ────────────────────────────────────── */}
      <section id="two-field-strategy" className="scroll-mt-24">
        <h2>The Two-Field Strategy</h2>
        <p>
          ChatGPT&apos;s Custom Instructions UI exposes two text fields. Rather
          than splitting your instruction arbitrarily, map each section of your
          Master Instruction to the field whose{" "}
          <strong>semantic intent</strong> it matches. This produces the
          strongest behavioral alignment:
        </p>

        <div className="my-6 space-y-4">
          {/* Field 1 */}
          <div className="rounded-xl border border-neon-cyan/20 bg-neon-cyan/[0.03] p-5">
            <p className="text-xs font-bold uppercase tracking-widest text-neon-cyan mb-2">
              Field 1 — &quot;What would you like ChatGPT to know about you?&quot;
            </p>
            <p className="text-sm text-slate-300 mb-3">
              This field sets the model&apos;s understanding of{" "}
              <strong>who it is working with</strong> and{" "}
              <strong>what kind of entity it should be</strong>. Paste:
            </p>
            <ul className="text-sm text-slate-400 space-y-1.5">
              <li>
                <span className="text-neon-cyan font-mono text-xs mr-2">→</span>
                <strong className="text-slate-300">Section 1</strong> — Role &amp; Identity (the full persona block)
              </li>
              <li>
                <span className="text-neon-cyan font-mono text-xs mr-2">→</span>
                <strong className="text-slate-300">Section 4</strong> — Context &amp; Input (your background, domain, and task environment)
              </li>
            </ul>
          </div>

          {/* Field 2 */}
          <div className="rounded-xl border border-neon-purple/20 bg-neon-purple/[0.03] p-5">
            <p className="text-xs font-bold uppercase tracking-widest text-neon-purple-light mb-2">
              Field 2 — &quot;How would you like ChatGPT to respond?&quot;
            </p>
            <p className="text-sm text-slate-300 mb-3">
              This field governs <strong>behavior and output</strong>. Paste:
            </p>
            <ul className="text-sm text-slate-400 space-y-1.5">
              <li>
                <span className="text-neon-purple-light font-mono text-xs mr-2">→</span>
                <strong className="text-slate-300">Section 2</strong> — Mission &amp; Objective
              </li>
              <li>
                <span className="text-neon-purple-light font-mono text-xs mr-2">→</span>
                <strong className="text-slate-300">Section 3</strong> — The Cognitive Loop
              </li>
              <li>
                <span className="text-neon-purple-light font-mono text-xs mr-2">→</span>
                <strong className="text-slate-300">Section 5</strong> — Boundaries &amp; Execution Rules
              </li>
              <li>
                <span className="text-neon-purple-light font-mono text-xs mr-2">→</span>
                <strong className="text-slate-300">Section 6</strong> — Output Formatting
              </li>
            </ul>
          </div>
        </div>

        <Callout variant="note" title="Character Limit">
          <p>
            ChatGPT&apos;s Custom Instructions UI has a limit of approximately{" "}
            <strong>1,500 characters per field</strong> (3,000 total). If your
            generated instruction exceeds this — which is common for detailed
            instructions — you have two options: inject the full instruction
            via the <strong>OpenAI API</strong> as a system message, or use{" "}
            <strong>ChatGPT Projects</strong>, which accepts unlimited
            instruction text.
          </p>
        </Callout>
      </section>

      <SectionDivider />

      {/* ── STEP-BY-STEP SETUP ────────────────────────────────────── */}
      <section id="step-by-step-setup" className="scroll-mt-24">
        <h2>Step-by-Step Setup</h2>
        <p>
          Follow these steps to activate your custom instruction in the ChatGPT
          web UI (chatgpt.com):
        </p>

        <div className="space-y-3 my-5">
          <Step number={1} title="Open Settings">
            Navigate to{" "}
            <a
              href="https://chatgpt.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neon-cyan"
            >
              chatgpt.com
            </a>{" "}
            and sign in. Click your <strong>avatar</strong> (profile picture) in
            the top-right corner of the sidebar, then select{" "}
            <InlineCode>Settings</InlineCode> from the dropdown menu.
          </Step>
          <Step number={2} title="Enable Custom Instructions">
            In the Settings modal, navigate to{" "}
            <InlineCode>Personalization</InlineCode> →{" "}
            <InlineCode>Custom Instructions</InlineCode>. Toggle the switch to{" "}
            <InlineCode>ON</InlineCode> if it isn&apos;t already enabled. This
            unlocks the two text fields described above.
          </Step>
          <Step number={3} title="Paste your instruction split across the two fields">
            Following the Two-Field Strategy above, paste{" "}
            <strong>Sections 1 + 4</strong> into Field 1 and{" "}
            <strong>Sections 2 + 3 + 5 + 6</strong> into Field 2. Click{" "}
            <InlineCode>Save</InlineCode>. Your instruction is now active for
            all new ChatGPT conversations.
          </Step>
        </div>

        <Callout variant="warning" title="Global Scope Warning">
          <p>
            ChatGPT&apos;s Custom Instructions apply to{" "}
            <strong>every new chat</strong> — there is no per-conversation
            toggle. If you need different personas for different tasks (e.g., a
            coding expert for one project and a writing coach for another), use{" "}
            <strong>ChatGPT Projects</strong> to isolate contexts. Each Project
            has its own independent system instruction.
          </p>
        </Callout>
      </section>

      <SectionDivider />

      {/* ── CHATGPT PROJECTS ──────────────────────────────────────── */}
      <section id="chatgpt-projects" className="scroll-mt-24">
        <h2>Using with ChatGPT Projects</h2>
        <p>
          <strong>Projects</strong> are ChatGPT&apos;s most powerful deployment
          mechanism for custom instructions. Unlike the global Custom
          Instructions field, Projects allow you to paste your{" "}
          <strong>complete Master Instruction without any character limit</strong>{" "}
          and scope it to a dedicated workspace. Each Project maintains its own
          instruction, file context (via uploaded documents), and conversation
          history — making it ideal for role-specific or client-specific
          deployments.
        </p>

        <div className="space-y-3 my-5">
          <Step number={1} title="Create a new Project">
            In the ChatGPT sidebar, click{" "}
            <InlineCode>New project</InlineCode> (or the{" "}
            <InlineCode>+</InlineCode> icon next to &quot;Projects&quot;). Give
            it a descriptive name that reflects the persona — e.g.,{" "}
            &quot;Senior TypeScript Engineer&quot; or &quot;Product Strategy
            Advisor&quot;.
          </Step>
          <Step number={2} title="Add project instructions">
            Inside the Project, click{" "}
            <InlineCode>Add instructions</InlineCode> (visible in the Project
            overview panel on the right). A full-size text editor will open with
            no character limit.
          </Step>
          <Step number={3} title="Paste the full Master Instruction">
            Copy your complete generated instruction from the Output Studio and
            paste it directly into the Project instructions editor — no splitting
            required. Click <InlineCode>Save</InlineCode>.
          </Step>
          <Step number={4} title="Start a conversation inside the Project">
            Every new conversation you begin inside this Project automatically
            inherits the instruction. You can create multiple Projects with
            different personas and switch between them at any time.
          </Step>
        </div>

        <Callout variant="tip" title="Upload Reference Files to Projects">
          <p>
            Projects also support <strong>file uploads</strong>. Upload your
            codebase, documentation, or style guides alongside your Master
            Instruction — GPT-4o will consult them as additional context when
            answering questions, dramatically increasing accuracy for
            domain-specific tasks.
          </p>
        </Callout>
      </section>

      <SectionDivider />

      {/* ── API INTEGRATION ───────────────────────────────────────── */}
      <section id="api-integration" className="scroll-mt-24">
        <h2>API Integration</h2>
        <p>
          For production applications, inject your Master Instruction as the{" "}
          <InlineCode>system</InlineCode> message in the OpenAI Chat Completions
          API. This approach has no character limits, gives you full control over
          the model and temperature, and works identically with the OpenAI Python
          SDK, Node.js SDK, or any HTTP client.
        </p>

        <h3 id="api-python-example" className="scroll-mt-24">
          Python SDK Example
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
          Streaming Responses
        </h3>
        <p>
          For chat applications, enable streaming to progressively render the
          model&apos;s output — especially useful since the{" "}
          <InlineCode>{"<self_reflection>"}</InlineCode> block adds latency
          before the visible response begins:
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

        <Callout variant="important" title="System Message Position">
          <p>
            Always place the Master Instruction as the{" "}
            <strong>first message</strong> in the{" "}
            <InlineCode>messages</InlineCode> array with{" "}
            <InlineCode>{`role: "system"`}</InlineCode>. OpenAI&apos;s model
            treats the system message as highest-priority context — placing it
            later in the array, or mixing it with user messages, will degrade
            instruction adherence significantly.
          </p>
        </Callout>
      </section>

      {/* ── Bottom nav ─────────────────────────────────────────────── */}
      <div className="mt-12 rounded-xl border border-white/[0.07] bg-white/[0.02] p-5">
        <p className="text-xs uppercase tracking-wider text-slate-600 mb-1">Next</p>
        <Link
          href="/docs?page=claude"
          className="font-semibold text-white hover:text-neon-cyan transition-colors"
        >
          Claude Guide →
        </Link>
      </div>

    </article>
  );
}

"use client";

import Callout, {
  CodeBlock,
  InlineCode,
  SectionDivider,
  Step,
} from "@/components/docs/DocsComponents";
import Link from "next/link";

export default function DocsGemini() {
  return (
    <article className="docs-prose w-full max-w-3xl">

      {/* Badge */}
      <div className="mb-3 flex items-center gap-2">
        <span className="rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-0.5 text-xs font-semibold text-blue-400">
          Platform Guides
        </span>
        <span className="text-slate-700">/</span>
        <span className="text-xs text-slate-500">Gemini</span>
      </div>

      <h1 id="gemini" className="scroll-mt-24">
        Using Instructions with Gemini
      </h1>

      <p>
        Google&apos;s Gemini models — particularly{" "}
        <strong>Gemini 2.5 Flash</strong> and{" "}
        <strong>Gemini 2.5 Pro</strong> — are architecturally exceptional at
        rigidly enforcing the rules defined in{" "}
        <strong>Section 5 (Strict Boundaries &amp; Execution Rules)</strong> and{" "}
        <strong>Section 6 (Output Formatting)</strong> of your Master Custom
        Instruction. Where other models occasionally drift from formatting
        constraints mid-conversation, Gemini maintains them with strong
        consistency across multi-turn sessions.
      </p>
      <p>
        This is a direct consequence of Google&apos;s instruction-tuning
        methodology, which places a heavy emphasis on rule-following and
        structured output compliance. If your workflow demands strict output
        formatting — numbered sections, specific Markdown templates, or
        constrained response lengths — Gemini is the ideal host for your
        generated instruction.
      </p>

      <SectionDivider />

      {/* WHY GEMINI EXCELS */}
      <section id="why-gemini-excels" className="scroll-mt-24">
        <h2>Why Gemini Excels at Structured Instructions</h2>
        <p>
          Gemini was built with Google&apos;s RLHF pipeline on top of a
          massive corpus of structured documents — technical manuals,
          specification sheets, API references, and code documentation. This
          gives it a native affinity for instruction-following patterns that
          mirror the 6-section structure of your Master Custom Instruction.
        </p>

        <div className="my-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {[
            {
              section: "Section 5 — Boundaries",
              strength: "Gemini generally respects negative rules. \"NEVER do X\" constraints are honored in most cases.",
              color: "border-blue-500/20 bg-blue-500/[0.04]",
              badge: "Very Strong",
            },
            {
              section: "Section 6 — Output Format",
              strength: "Gemini follows structured output templates reliably, including Markdown headers and table schemas.",
              color: "border-sky-500/20 bg-sky-500/[0.04]",
              badge: "Very Strong",
            },
            {
              section: "Section 2 — Mission",
              strength: "Gemini stays on-task with goal-oriented directives and resists topic drift better than most models.",
              color: "border-indigo-500/20 bg-indigo-500/[0.04]",
              badge: "Strong",
            },
            {
              section: "Section 1 — Role & Identity",
              strength: "Persona adoption is solid, though not as deeply committed as GPT-4o for extended roleplay.",
              color: "border-slate-500/20 bg-slate-500/[0.04]",
              badge: "Good",
            },
          ].map((item) => (
            <div key={item.section} className={`rounded-lg border p-4 ${item.color}`}>
              <div className="flex items-start justify-between gap-2 mb-2">
                <p className="text-sm font-semibold text-slate-200">{item.section}</p>
                <span className={`flex-shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${
                  item.badge === "Very Strong"
                    ? "bg-blue-500/20 text-blue-400"
                    : item.badge === "Strong"
                    ? "bg-indigo-500/20 text-indigo-400"
                    : "bg-slate-500/20 text-slate-400"
                }`}>
                  {item.badge}
                </span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">{item.strength}</p>
            </div>
          ))}
        </div>

        <Callout variant="tip" title="Temperature Recommendation">
          <p>
            Set temperature to <InlineCode>0.2</InlineCode>–
            <InlineCode>0.3</InlineCode> when using structured Custom
            Instructions with Gemini. Lower temperatures maximize constraint
            adherence and output consistency. Gemini 2.5 Flash at{" "}
            <InlineCode>temperature=0.3</InlineCode> is the recommended default
            — it&apos;s the configuration our backend uses.
          </p>
        </Callout>
      </section>

      <SectionDivider />

      {/* AI STUDIO */}
      <section id="ai-studio" className="scroll-mt-24">
        <h2>Google AI Studio (Recommended for Developers)</h2>
        <p>
          <a
            href="https://aistudio.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neon-cyan"
          >
            Google AI Studio
          </a>{" "}
          is the fastest way to test and deploy your Master Instruction with
          Gemini. It&apos;s free to use, supports all Gemini models, and
          crucially exposes a dedicated{" "}
          <strong>System Instructions</strong> field — exactly the right place
          to inject your generated instruction.
        </p>

        <div className="my-5 space-y-3">
          <Step number={1} title='Go to aistudio.google.com and create a new prompt'>
            Navigate to{" "}
            <a href="https://aistudio.google.com" target="_blank" rel="noopener noreferrer" className="text-neon-cyan">
              aistudio.google.com
            </a>
            . Click <InlineCode>Create new</InlineCode> →{" "}
            <InlineCode>New prompt</InlineCode>. You&apos;ll be taken to the
            prompt editor workspace.
          </Step>
          <Step number={2} title='Expand the "System Instructions" panel'>
            In the left configuration panel, look for{" "}
            <InlineCode>System instructions</InlineCode> near the top. Click it
            to expand the text area. This is where your Master Custom
            Instruction lives — it is injected before every message in the
            conversation.
          </Step>
          <Step number={3} title="Paste your Master Instruction">
            Copy your generated instruction from the Output Studio and paste it
            directly into the System Instructions field. No formatting changes
            needed — the Markdown and XML tags are preserved exactly as-is.
          </Step>
          <Step number={4} title="Configure the model and save as a preset">
            In the right panel, set the model to{" "}
            <strong>Gemini 2.5 Flash</strong> and temperature to{" "}
            <InlineCode>0.3</InlineCode>. Click{" "}
            <InlineCode>Save</InlineCode> → <InlineCode>Save as</InlineCode> to
            create a reusable preset. You can return to this preset at any time
            without re-pasting your instruction.
          </Step>
        </div>

        <Callout variant="note" title="Free Export to SDK Code">
          <p>
            AI Studio has a <strong>&ldquo;Get code&rdquo;</strong> button
            that exports your entire configured prompt — including system
            instructions, model, and temperature — as ready-to-run Python or
            JavaScript code. This is the fastest path from prompt to
            production.
          </p>
        </Callout>
      </section>

      <SectionDivider />

      {/* GEMINI ADVANCED */}
      <section id="gemini-advanced" className="scroll-mt-24">
        <h2>Gemini Advanced (No-Code Method)</h2>
        <p>
          For users who prefer a chat-first interface over a developer console,{" "}
          <strong>Gemini Advanced</strong> (available with Google One AI
          Premium) supports two methods for using your Master Instruction.
        </p>

        <h3 className="scroll-mt-24">Method 1 — Direct Paste</h3>
        <p>
          Open a new conversation at{" "}
          <a
            href="https://gemini.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neon-cyan"
          >
            gemini.google.com
          </a>
          . On the very first message, paste your entire Master Custom
          Instruction, then press <kbd className="rounded border border-white/10 bg-white/[0.05] px-1.5 py-0.5 text-xs">Enter</kbd>.
          Gemini will acknowledge it and remain in the defined persona for the
          rest of the conversation.
        </p>

        <Callout variant="warning">
          <p>
            Direct pasting works for the current session only. When you start a
            new conversation, you&apos;ll need to paste the instruction again.
            Use <strong>Gems</strong> (below) for a permanent configuration.
          </p>
        </Callout>

        <h3 className="scroll-mt-24 mt-6">Method 2 — Create a Gem (Permanent)</h3>
        <p>
          Gems are Gemini&apos;s version of custom AI personas with persistent
          system instructions. A Gem built with your Master Instruction behaves
          like a dedicated expert assistant you can access anytime.
        </p>
        <div className="my-5 space-y-3">
          <Step number={1} title='Navigate to "Gems"'>
            In the Gemini Advanced sidebar, click{" "}
            <InlineCode>Gem manager</InlineCode> → then{" "}
            <InlineCode>New gem</InlineCode>.
          </Step>
          <Step number={2} title="Name your Gem and paste instructions">
            Give the Gem a descriptive name (e.g.,{" "}
            <em>&ldquo;Senior TypeScript Engineer&rdquo;</em>). Paste your full
            Master Instruction into the{" "}
            <InlineCode>Instructions</InlineCode> field.
          </Step>
          <Step number={3} title="Save and use">
            Click <InlineCode>Save</InlineCode>. Your Gem now appears in the
            sidebar and can be launched instantly for any new task, with the
            full instruction pre-loaded.
          </Step>
        </div>
      </section>

      <SectionDivider />

      {/* WORKSPACE INTEGRATION */}
      <section id="gemini-workspace" className="scroll-mt-24">
        <h2>Google Workspace Integration</h2>
        <p>
          For enterprise and team deployments, <strong>Gemini for Google Workspace</strong>{" "}
          supports system-level instruction configuration through the Google Admin
          Console. This allows an organization to deploy a single Master Custom
          Instruction across all users — ensuring every team member gets a
          consistent, expert-level AI experience without individual setup.
        </p>

        <div className="my-5 rounded-xl border border-white/[0.07] bg-white/[0.02] p-5">
          <p className="text-sm font-semibold text-slate-200 mb-3">Deployment Path</p>
          <div className="space-y-2 text-sm text-slate-400">
            {[
              "Admin Console → Apps → Google Workspace → Gemini",
              "Navigate to Settings → AI Features → System Instructions",
              "Paste the Master Instruction and apply to target organizational units (OUs)",
              "Changes propagate to all users in the OU within 24 hours",
            ].map((step, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-[10px] font-bold text-blue-400">
                  {i + 1}
                </span>
                <span>{step}</span>
              </div>
            ))}
          </div>
        </div>

        <Callout variant="note">
          <p>
            Workspace system instructions are only available on{" "}
            <strong>Business Standard, Business Plus</strong>, and{" "}
            <strong>Enterprise</strong> plans. Consult your Google Workspace
            administrator for access.
          </p>
        </Callout>
      </section>

      <SectionDivider />

      {/* API INTEGRATION */}
      <section id="gemini-api" className="scroll-mt-24">
        <h2>API Integration</h2>
        <p>
          The Google GenAI Python SDK (<InlineCode>google-genai</InlineCode>)
          exposes a <InlineCode>system_instruction</InlineCode> parameter on
          every <InlineCode>generate_content</InlineCode> call. This is the
          programmatic equivalent of pasting into AI Studio&apos;s System
          Instructions field.
        </p>

        <CodeBlock language="python" filename="gemini_integration.py">
{`from google import genai
from google.genai import types

MASTER_INSTRUCTION = """
# 🎭 1. Role & Identity
Assume the role of a Senior TypeScript Engineer...

# 🎯 2. Mission & Objective
Your mission is to ARCHITECT and ENFORCE production-grade TypeScript solutions...

# 🧠 3. The Cognitive Loop (Internal Reflection)
Before answering, use <self_reflection> tags to think internally:
1. Create a 5-point evaluation rubric for the task...

[... sections 4-6 ...]
"""

client = genai.Client(api_key="your-api-key")

response = client.models.generate_content(
    model="gemini-2.5-flash",
    config=types.GenerateContentConfig(
        system_instruction=MASTER_INSTRUCTION,
        temperature=0.3,
        max_output_tokens=8192,
    ),
    contents="Review this React component for performance issues.",
)

print(response.text)`}
        </CodeBlock>

        <Callout variant="tip" title="Streaming Support">
          <p>
            For long-form outputs, use{" "}
            <InlineCode>client.models.generate_content_stream()</InlineCode>{" "}
            with the same config. Streaming is especially useful when the
            Cognitive Loop produces extended self-reflection before the final
            answer.
          </p>
        </Callout>

        <CodeBlock language="python" filename="gemini_async.py">
{`import asyncio
from google import genai
from google.genai import types

async def generate_async(user_message: str, system_instruction: str) -> str:
    client = genai.Client(api_key="your-api-key")
    response = await client.aio.models.generate_content(
        model="gemini-2.5-flash",
        config=types.GenerateContentConfig(
            system_instruction=system_instruction,
            temperature=0.3,
        ),
        contents=user_message,
    )
    return response.text

# Run it
result = asyncio.run(generate_async(
    user_message="Audit this function for security vulnerabilities.",
    system_instruction=MASTER_INSTRUCTION,
))
print(result)`}
        </CodeBlock>

        {/* Bottom nav */}
        <div className="mt-12 rounded-xl border border-white/[0.07] bg-white/[0.02] p-5">
          <p className="text-xs uppercase tracking-wider text-slate-600 mb-1">Next</p>
          <Link
            href="/docs?page=other-llms"
            className="font-semibold text-white hover:text-neon-cyan transition-colors"
          >
            Platform Guides — Other LLMs →
          </Link>
        </div>
      </section>
    </article>
  );
}

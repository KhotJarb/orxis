"use client";

import Callout, {
  CodeBlock,
  InlineCode,
  SectionDivider,
  Step,
} from "@/components/docs/DocsComponents";
import Link from "next/link";

export default function DocsPromptChaining() {
  return (
    <article className="docs-prose w-full max-w-3xl">

      {/* Badge */}
      <div className="mb-3 flex items-center gap-2">
        <span className="rounded-full border border-neon-purple/30 bg-neon-purple/10 px-3 py-0.5 text-xs font-semibold text-neon-purple-light">
          Advanced
        </span>
        <span className="text-slate-700">/</span>
        <span className="text-xs text-slate-500">Prompt Chaining</span>
      </div>

      <h1 id="prompt-chaining" className="scroll-mt-24">
        Prompt Chaining Strategies
      </h1>

      <p>
        Your Master Custom Instruction sets an immovable foundation — a
        precisely-defined expert persona with a cognitive framework and strict
        rules. But even a highly capable expert becomes less effective when
        handed an entire project and asked to complete it in a single breath.
        <strong> Prompt Chaining</strong> is the discipline of breaking complex
        tasks into a deliberate sequence of focused conversations, each building
        on the last.
      </p>
      <p>
        The result is qualitatively different from a single-prompt approach.
        Instead of one sprawling, mediocre output, you get a series of
        deeply-considered, high-quality outputs — each produced by an AI that
        is fully focused on exactly one thing at a time.
      </p>

      <Callout variant="important" title="Why Chaining Works">
        <p>
          Large Language Models are probabilistic. When asked to do{" "}
          <em>everything at once</em>, they allocate attention across the entire
          task space — producing a shallow pass over all of it. When asked to do{" "}
          <em>one thing precisely</em>, they concentrate their full generative
          capacity on that single deliverable. Chaining exploits this
          architecture by design.
        </p>
      </Callout>

      <SectionDivider />

      {/* THE CORE CHAIN */}
      <section id="the-core-chain" className="scroll-mt-24">
        <h2>The Three-Phase Master Chain</h2>
        <p>
          This is the foundational chaining pattern. It works for any complex
          deliverable — technical documents, code architectures, research
          reports, marketing strategies, or creative projects.
        </p>

        <div className="my-6 space-y-4">
          <Step number={1} title="Lock the Persona — Inject the Master Instruction">
            <span>
              Start a fresh conversation. Paste your complete Master Custom
              Instruction as the very first message (or inject it as the system
              prompt via API). Do{" "}
              <strong>not</strong> include any task yet. Simply let the AI
              acknowledge the persona and confirm it has internalized the role,
              mission, and rules.
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

          <Step number={2} title="Generate the Blueprint — Ask for a Plan Only">
            <span>
              Once the persona is locked, give the AI your full task — but ask
              for a <strong>plan or outline only</strong>. No execution yet.
              This forces the AI to think architecturally before writing a
              single word of output. The plan becomes a contract that all future
              messages must honor.
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

          <Step number={3} title="Execute Section by Section — One at a Time">
            <span>
              Review the outline. Once approved, execute one section per
              message. Reference the section number explicitly. This keeps each
              response fully focused and allows you to redirect or refine
              between sections without losing the overall structure.
            </span>
            <div className="mt-3">
              <CodeBlock language="text" filename="Messages 3, 4, 5... — Sequential Execution">
{`The outline is approved. Begin writing Section 1: [Section Title].

Apply your full cognitive loop. Enforce all formatting rules. 
This section only — do not continue to Section 2.`}
              </CodeBlock>
            </div>
            <p className="mt-3 text-sm text-slate-400">
              Then for each subsequent section:
            </p>
            <CodeBlock language="text" filename="Continuing the chain">
{`Excellent. Now write Section 2: [Section Title].
Maintain consistency with Section 1 in tone, vocabulary, and depth.`}
            </CodeBlock>
          </Step>
        </div>

        <Callout variant="tip" title="The Approval Gate">
          <p>
            The phrase <InlineCode>I will approve this outline before you begin</InlineCode>{" "}
            is not just courtesy — it&apos;s a constraint. It forces the AI into
            an explicit planning state and prevents it from &ldquo;guessing&rdquo; at
            your intent and producing unrevisable output. Always gate on the
            plan before execution.
          </p>
        </Callout>
      </section>

      <SectionDivider />

      {/* ADVANCED PATTERNS */}
      <section id="advanced-chain-patterns" className="scroll-mt-24">
        <h2>Advanced Chaining Patterns</h2>

        <h3 id="critique-chain" className="scroll-mt-24">The Critique-Revise Chain</h3>
        <p>
          For any output that demands precision — code, legal analysis, medical
          documentation — add a critique round between generation and finalization.
          After the AI produces a section, ask it to critique its own work as a
          separate, adversarial agent before you accept it.
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

        <h3 id="parallel-chain" className="scroll-mt-24 mt-8">The Parallel Synthesis Chain</h3>
        <p>
          When you need multiple independent perspectives synthesized into one
          document, run parallel chains and then feed their outputs back into a
          final synthesis prompt.
        </p>

        <div className="my-5 rounded-xl border border-white/[0.07] bg-white/[0.02] p-5">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-600 mb-4">
            Parallel Synthesis Flow
          </p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {[
              { label: "Chain A", desc: "Technical Analysis\n(Architecture, performance, scalability)", color: "border-neon-cyan/20 bg-neon-cyan/[0.03]" },
              { label: "Chain B", desc: "Risk Analysis\n(Security, failure modes, edge cases)", color: "border-neon-purple/20 bg-neon-purple/[0.03]" },
              { label: "Chain C", desc: "Business Analysis\n(Cost, timeline, stakeholder impact)", color: "border-amber-500/20 bg-amber-500/[0.03]" },
            ].map((c) => (
              <div key={c.label} className={`rounded-lg border p-3 ${c.color}`}>
                <p className="text-xs font-bold text-slate-300 mb-1">{c.label}</p>
                <p className="text-xs text-slate-500 whitespace-pre-line">{c.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 rounded-lg border border-white/[0.06] bg-white/[0.02] p-3">
            <p className="text-xs font-bold text-slate-300 mb-1">Final Synthesis</p>
            <p className="text-xs text-slate-500">
              Feed all three outputs into a new session: &ldquo;Synthesize these three
              analyses into a single executive decision document. Resolve any
              contradictions. Prioritize by impact.&rdquo;
            </p>
          </div>
        </div>

        <h3 id="refinement-chain" className="scroll-mt-24 mt-8">The Iterative Refinement Chain</h3>
        <p>
          For creative or nuanced work, use explicit refinement passes. Each pass
          has a single, focused directive — compressing, sharpening, or elevating a
          specific dimension of the output.
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
        <h2>Which Model to Chain With</h2>
        <p>
          Different models have different strengths in a chaining context. Here
          is how they perform across the key chain phases:
        </p>

        <div className="my-5 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/[0.07]">
                <th className="pb-3 text-left font-semibold text-slate-300">Phase</th>
                <th className="pb-3 text-left font-semibold text-slate-300">Best Model</th>
                <th className="pb-3 text-left font-semibold text-slate-300">Reason</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {[
                ["Persona Lock", "Claude 3.5 Sonnet", "Deepest system prompt adherence"],
                ["Blueprint / Outline", "GPT-4o", "Best structural reasoning and planning"],
                ["Sequential Execution", "Gemini 2.5 Flash", "Fastest, maintains format rules best"],
                ["Critique Round", "Claude 3.5 Sonnet", "XML tags enable structured self-critique"],
                ["Final Synthesis", "GPT-4o / Gemini 2.5 Pro", "Strongest at coherent long-form synthesis"],
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
            You don&apos;t need to use different models for each phase — this table
            shows theoretical optima. In practice, a single model running the
            Three-Phase Master Chain produces dramatically better results than any
            single-prompt approach, regardless of model choice.
          </p>
        </Callout>

        {/* Bottom nav */}
        <div className="mt-12 rounded-xl border border-white/[0.07] bg-white/[0.02] p-5">
          <p className="text-xs uppercase tracking-wider text-slate-600 mb-1">Next</p>
          <Link
            href="/docs?page=context-injection"
            className="font-semibold text-white hover:text-neon-cyan transition-colors"
          >
            Advanced — Context Injection →
          </Link>
        </div>
      </section>
    </article>
  );
}

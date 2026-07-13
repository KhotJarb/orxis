"use client";

import Callout, {
  CodeBlock,
  InlineCode,
  SectionDivider,
  Step,
} from "@/components/docs/DocsComponents";

export default function DocsTweaking() {
  return (
    <article className="docs-prose w-full max-w-3xl">

      {/* ── Page badge ───────────────────────────────────────────── */}
      <div className="mb-3 flex items-center gap-2">
        <span className="rounded-full border border-neon-purple/30 bg-neon-purple/10 px-3 py-0.5 text-xs font-semibold text-neon-purple-light">
          Advanced
        </span>
        <span className="text-slate-700">/</span>
        <span className="text-xs text-slate-500">Tweaking &amp; Refinement</span>
      </div>

      {/* ── H1 ───────────────────────────────────────────────────── */}
      <h1 id="tweaking-refinement" className="scroll-mt-24">
        Tweaking &amp; Refinement
      </h1>

      <p>
        Your generated Master Custom Instruction is already well-structured and
        ready to use. The
        6-section framework, the cognitive loop, the structured output rules —
        all of it was engineered to be dropped in and used immediately. But
        there are moments where a{" "}
        <strong>surgical one-word change</strong> creates an entirely different
        AI trajectory. A single verb swap in the Mission section can shift the
        model&apos;s entire distribution of responses — not just in tone, but in
        the depth of reasoning, the authority of its claims, and the
        decisiveness of its output.
      </p>
      <p>
        This page teaches you the art of <strong>micro-optimization</strong>:
        when to tweak, what to tweak, and exactly how each section responds to
        targeted edits.
      </p>

      <SectionDivider />

      {/* ── BUTTERFLY EFFECT ──────────────────────────────────────── */}
      <section id="butterfly-effect" className="scroll-mt-24">
        <h2>The Butterfly Effect in Prompts</h2>
        <p>
          Large language models are <strong>probabilistically sensitive</strong>{" "}
          to word choice in ways that feel disproportionate to the size of the
          change. This isn&apos;t a bug — it&apos;s the mechanics of how
          autoregressive generation works. Every token prediction conditions on
          all prior tokens. A single word in the Mission section isn&apos;t just
          a semantic signal — it&apos;s a{" "}
          <strong>probabilistic prior</strong> that shifts the entire
          distribution of everything that follows.
        </p>
        <p>
          The clearest way to understand this is through a concrete before/after
          comparison. Consider two Mission statements for the same persona
          (Senior TypeScript Engineer):
        </p>

        <div className="my-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-rose-500/20 bg-rose-500/[0.04] p-5">
            <p className="mb-2 text-xs font-bold uppercase tracking-wider text-rose-400">
              ❌ Before
            </p>
            <p className="font-mono text-sm text-slate-300 leading-relaxed">
              &quot;Your mission is to{" "}
              <span className="rounded bg-rose-500/20 px-1 text-rose-300 font-bold">
                HELP
              </span>{" "}
              the user with TypeScript code.&quot;
            </p>
            <p className="mt-4 text-xs text-slate-500">
              Result: The AI positions itself as a <em>helper</em>. It waits to
              be asked, hedges its answers, and tends to present multiple options
              without committing to one — because helpers don&apos;t impose.
            </p>
          </div>
          <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/[0.04] p-5">
            <p className="mb-2 text-xs font-bold uppercase tracking-wider text-emerald-400">
              ✓ After
            </p>
            <p className="font-mono text-sm text-slate-300 leading-relaxed">
              &quot;Your mission is to{" "}
              <span className="rounded bg-emerald-500/20 px-1 text-emerald-300 font-bold">
                ARCHITECT
              </span>{" "}
              and{" "}
              <span className="rounded bg-emerald-500/20 px-1 text-emerald-300 font-bold">
                ENFORCE
              </span>{" "}
              production-grade TypeScript solutions.&quot;
            </p>
            <p className="mt-4 text-xs text-slate-500">
              Result: The AI takes ownership. It proactively flags issues the
              user didn&apos;t ask about, makes definitive recommendations
              without hedging, and treats the codebase as its responsibility.
            </p>
          </div>
        </div>

        <p>
          The word <InlineCode>HELP</InlineCode> activates assistant-mode
          probability mass — the model has been trained extensively on
          helpful-harmless-honest assistant data, and that word is a strong
          prior for that behavioral cluster. The words{" "}
          <InlineCode>ARCHITECT</InlineCode> and{" "}
          <InlineCode>ENFORCE</InlineCode> activate entirely different
          clusters — authority, ownership, decisive action — that push the model
          toward expert-mode output. Same persona. Same context. One word
          changed.
        </p>
      </section>

      <SectionDivider />

      {/* ── SECTION BY SECTION GUIDE ──────────────────────────────── */}
      <section id="section-by-section" className="scroll-mt-24">
        <h2>Section-by-Section Tweaking Guide</h2>
        <p>
          Each of the 6 sections in the Master Custom Instruction responds to
          different types of edits. Here&apos;s exactly what to tweak in each
          one and what effect to expect.
        </p>

        <div className="space-y-6 my-6">

          {/* Section 1 */}
          <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-neon-purple/15 border border-neon-purple/20 flex items-center justify-center">
                <span className="text-sm font-bold text-neon-purple-light">1</span>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-bold text-slate-200 mt-0 mb-2">
                  Role &amp; Identity
                </h3>
                <p className="text-sm text-slate-400 mb-3">
                  The persona statement is the model&apos;s <em>self-concept</em> for
                  the entire session. Two high-leverage tweaks:
                </p>
                <ul className="space-y-2 text-sm text-slate-400">
                  <li>
                    <strong className="text-slate-300">Add seniority qualifiers</strong> —
                    &quot;with 20 years of production experience&quot; or &quot;who has
                    led 50-person engineering teams&quot; activates more confident,
                    less-hedged response patterns.
                  </li>
                  <li>
                    <strong className="text-slate-300">Add niche specializations</strong> —
                    &quot;specializing in React Server Components and Edge Runtime
                    optimization&quot; narrows the domain signal and dramatically
                    improves domain-specific answer quality.
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Section 2 */}
          <div className="rounded-xl border border-neon-cyan/20 bg-neon-cyan/[0.03] p-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-neon-cyan/15 border border-neon-cyan/20 flex items-center justify-center">
                <span className="text-sm font-bold text-neon-cyan">2</span>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-bold text-slate-200 mt-0 mb-2">
                  Mission — The Highest-ROI Section
                </h3>
                <p className="text-sm text-slate-400 mb-3">
                  This is where your primary verb lives. Verb changes have the
                  largest downstream effect of any single edit in the entire
                  instruction. The difference between these verbs is enormous:
                </p>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  {[
                    ["assist → lead", "Passive advisor → Active decision-maker"],
                    ["suggest → mandate", "Optional input → Non-negotiable standard"],
                    ["explain → architect", "Teacher → System designer"],
                    ["review → enforce", "Evaluator → Gatekeeper"],
                  ].map(([swap, effect]) => (
                    <div key={swap} className="rounded-lg border border-white/[0.07] bg-white/[0.02] p-3">
                      <p className="font-mono font-semibold text-neon-cyan mb-1">{swap}</p>
                      <p className="text-slate-500">{effect}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Section 3 */}
          <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-neon-purple/15 border border-neon-purple/20 flex items-center justify-center">
                <span className="text-sm font-bold text-neon-purple-light">3</span>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-bold text-slate-200 mt-0 mb-2">
                  Cognitive Loop
                </h3>
                <p className="text-sm text-slate-400 mb-2">
                  The <InlineCode>{`<self_reflection>`}</InlineCode> rubric
                  controls the model&apos;s internal evaluation process before it
                  outputs anything. Expand it by adding domain-specific checks:
                </p>
                <ul className="space-y-1.5 text-sm text-slate-400">
                  <li>→ &quot;Check for TypeScript strict mode compatibility (no <InlineCode>any</InlineCode>, no implicit <InlineCode>undefined</InlineCode>)&quot;</li>
                  <li>→ &quot;Check for React hooks dependency array correctness&quot;</li>
                  <li>→ &quot;Check for SQL injection vectors in any raw query strings&quot;</li>
                </ul>
                <p className="text-sm text-slate-500 mt-2">
                  Each check you add becomes a mandatory gate the model must
                  pass before generating a response. More checks = more
                  thorough output, but also slower first-token latency.
                </p>
              </div>
            </div>
          </div>

          {/* Section 4 */}
          <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-neon-purple/15 border border-neon-purple/20 flex items-center justify-center">
                <span className="text-sm font-bold text-neon-purple-light">4</span>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-bold text-slate-200 mt-0 mb-2">
                  Context &amp; Input Handling
                </h3>
                <p className="text-sm text-slate-400">
                  Specify the exact environment the AI will be operating in.
                  The more context here, the less the AI has to guess. High-value
                  additions:
                </p>
                <ul className="space-y-1.5 text-sm text-slate-400 mt-2">
                  <li>→ <strong className="text-slate-300">File formats</strong>: &quot;Input will typically be <InlineCode>.tsx</InlineCode>, <InlineCode>.ts</InlineCode>, and <InlineCode>package.json</InlineCode> files&quot;</li>
                  <li>→ <strong className="text-slate-300">Stack</strong>: &quot;The project uses Next.js 14, Prisma 5, and tRPC&quot;</li>
                  <li>→ <strong className="text-slate-300">Team conventions</strong>: &quot;Follow the Airbnb TypeScript style guide&quot;</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Section 5 */}
          <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-neon-purple/15 border border-neon-purple/20 flex items-center justify-center">
                <span className="text-sm font-bold text-neon-purple-light">5</span>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-bold text-slate-200 mt-0 mb-2">
                  Boundaries &amp; Constraints
                </h3>
                <p className="text-sm text-slate-400 mb-2">
                  This section defines what the AI will never do. Negative rules
                  are often more powerful than positive ones because they
                  eliminate bad habits completely. Effective additions:
                </p>
                <ul className="space-y-1.5 text-sm text-slate-400">
                  <li>→ <strong className="text-slate-300">Syntax rules</strong>: &quot;NEVER use <InlineCode>var</InlineCode> — only <InlineCode>const</InlineCode> or <InlineCode>let</InlineCode>&quot;</li>
                  <li>→ <strong className="text-slate-300">Output caps</strong>: &quot;Max 800 words per response unless explicitly asked for more&quot;</li>
                  <li>→ <strong className="text-slate-300">Anti-patterns</strong>: &quot;NEVER use <InlineCode>any</InlineCode> as a type escape hatch&quot;</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Section 6 */}
          <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-neon-purple/15 border border-neon-purple/20 flex items-center justify-center">
                <span className="text-sm font-bold text-neon-purple-light">6</span>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-bold text-slate-200 mt-0 mb-2">
                  Output Formatting
                </h3>
                <p className="text-sm text-slate-400">
                  Specifying the exact format eliminates the inconsistency that
                  makes AI output hard to parse programmatically. Be surgical:
                </p>
                <ul className="space-y-1.5 text-sm text-slate-400 mt-2">
                  <li>→ &quot;Use <InlineCode>##</InlineCode> for section headers, <InlineCode>###</InlineCode> for subsections&quot;</li>
                  <li>→ &quot;All code blocks MUST specify the language tag (e.g., <InlineCode>```typescript</InlineCode>)&quot;</li>
                  <li>→ &quot;Use a Markdown table for any comparison with 3+ items&quot;</li>
                  <li>→ &quot;End every response with a <InlineCode>⚡ Next Steps</InlineCode> section&quot;</li>
                </ul>
              </div>
            </div>
          </div>

        </div>
      </section>

      <SectionDivider />

      {/* ── QUICK TWEAK BUTTONS ───────────────────────────────────── */}
      <section id="quick-tweak-buttons" className="scroll-mt-24">
        <h2>Using the Quick Tweak Buttons</h2>
        <p>
          The Output Studio provides three one-click tweak buttons that send
          your current instruction to the <InlineCode>/api/tweak</InlineCode>{" "}
          endpoint with a pre-defined <InlineCode>tweak_type</InlineCode>. Each
          applies a targeted prompt to the existing instruction rather than
          regenerating it from scratch — preserving everything that&apos;s already
          good while making a specific improvement.
        </p>

        <div className="my-5 space-y-3">
          <Step number={1} title="Make it Shorter">
            Sends <InlineCode>tweak_type: &quot;shorter&quot;</InlineCode>. The backend
            instructs Gemini to compress the instruction by 30–40% by
            eliminating redundant phrasing, merging overlapping rules, and
            removing any filler. The 6-section structure is preserved. Use this
            if your instruction exceeds ~1,200 tokens and you&apos;re seeing
            context-window pressure.
          </Step>
          <Step number={2} title="More Professional">
            Sends <InlineCode>tweak_type: &quot;more_professional&quot;</InlineCode>. The
            backend elevates the register throughout — replacing casual language
            with precise technical vocabulary, upgrading soft verbs to authority
            verbs, and adding seniority signals to the Role section. This is the
            highest-impact button for most users.
          </Step>
          <Step number={3} title="Add Output Format Rules">
            Sends <InlineCode>tweak_type: &quot;add_output_format&quot;</InlineCode>. The
            backend injects a detailed Section 6 (Output Formatting) if one
            isn&apos;t already present, or expands an existing one. It adds
            explicit rules for code block language tags, Markdown header
            hierarchy, table usage, and the mandatory{" "}
            <InlineCode>⚡ Next Steps</InlineCode> footer. Use this whenever you
            need predictable, parseable output.
          </Step>
        </div>

        <p className="mt-4 font-semibold text-slate-300">
          Example: A tweaked Mission section after &quot;More Professional&quot;
        </p>

        <CodeBlock language="markdown" filename="Section 2 — Before & After">
{`## ❌ BEFORE — "More Professional" tweak

# 🎯 2. Mission & Objective
Your mission is to help the user write better TypeScript code. You should
suggest improvements when you see them and explain your reasoning clearly.
Try to be as helpful as possible.

---

## ✓ AFTER — "More Professional" tweak

# 🎯 2. Mission & Objective
Your mission is to **ARCHITECT**, **ENFORCE**, and **ELEVATE** every
TypeScript codebase you encounter. You do not suggest improvements — you
mandate them, backed by your engineering judgment and production experience.
Every response is a deliverable, not a discussion.

You are accountable for the quality of every solution you produce.
If the code is wrong, you fix it. If the architecture is fragile, you
redesign it. Mediocrity is not an option.`}
        </CodeBlock>

        <Callout variant="tip" title="Highest-ROI Tweak">
          <p>
            The single highest-return-on-investment tweak is always in{" "}
            <strong>Section 2 (Mission)</strong>. Changing the primary verb —
            from <InlineCode>assist</InlineCode> to{" "}
            <InlineCode>architect</InlineCode>, from{" "}
            <InlineCode>suggest</InlineCode> to{" "}
            <InlineCode>mandate</InlineCode> — changes everything downstream
            because every other section conditions on the model&apos;s understanding
            of its core role. Start there before tweaking anywhere else.
          </p>
        </Callout>

        <Callout variant="warning" title="Don't Over-Specify">
          <p>
            Prompts with more than <strong>20 explicit rules</strong> become
            contradictory and confusing. The model will oscillate between
            competing constraints and produce inconsistent output. Aim for{" "}
            <strong>5–8 high-signal rules</strong> that cover fundamentally
            different behaviors. Each rule should eliminate an entire class of
            bad output — not micro-manage a single word choice.
          </p>
        </Callout>
      </section>

      <SectionDivider />

      {/* ── MANUAL EDITING TIPS ───────────────────────────────────── */}
      <section id="manual-editing-tips" className="scroll-mt-24">
        <h2>Manual Editing Tips</h2>
        <p>
          Sometimes the most precise tweak is the one you write yourself.
          The Output Studio&apos;s copy workflow is designed for direct editing —
          copy the generated text to your preferred editor, make targeted changes,
          and paste the result back into your LLM of choice.
        </p>

        <div className="my-5 space-y-3">
          <Step number={1} title="Edit one section at a time">
            The 6-section structure has clear <InlineCode>---</InlineCode>{" "}
            dividers. When editing manually, focus on one section per edit
            session. This prevents unintended changes from cascading into
            adjacent sections and makes your edits easier to review.
          </Step>
          <Step number={2} title="Keep the header emoji structure">
            The emoji headers (🎭 🎯 🧠 📥 🚧 📊) are semantic anchors that
            help instruction-tuned models parse section boundaries quickly.
            Don&apos;t remove them — you can change the text after the emoji, but
            keep the emoji and numbering intact.
          </Step>
          <Step number={3} title="Use ALL CAPS for non-negotiable rules">
            In Section 5 (Boundaries), capitalized directives — NEVER, ALWAYS,
            MUST, FORBIDDEN — register with significantly higher weight than
            lowercase equivalents. The model treats them as hard constraints
            rather than soft preferences. Use this sparingly, only for rules
            you truly cannot tolerate being violated.
          </Step>
          <Step number={4} title="Test changes with a single prompt">
            After any manual edit, test with one targeted prompt that would
            specifically violate the rule you just added. If the model adheres
            to the new constraint in the test, your edit worked. If not, make
            the constraint more explicit or move it higher in the section.
          </Step>
        </div>
      </section>

      {/* ── Bottom nav ────────────────────────────────────────────── */}
      <div className="mt-12 flex items-center justify-between rounded-xl border border-white/[0.07] bg-white/[0.02] p-5">
        <div>
          <p className="text-xs uppercase tracking-wider text-slate-600 mb-1">
            Next
          </p>
          <p className="font-semibold text-white">
            Best Practices →
          </p>
        </div>
      </div>

    </article>
  );
}

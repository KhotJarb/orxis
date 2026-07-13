"use client";

import Callout, {
  CodeBlock,
  InlineCode,
  SectionDivider,
  Step,
} from "@/components/docs/DocsComponents";
import Link from "next/link";

export default function DocsBestPractices() {
  return (
    <article className="docs-prose w-full max-w-3xl">

      {/* ── Page badge ───────────────────────────────────────────── */}
      <div className="mb-3 flex items-center gap-2">
        <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-0.5 text-xs font-semibold text-amber-400">
          Strategy Guide
        </span>
        <span className="text-slate-700">/</span>
        <span className="text-xs text-slate-500">Best Practices</span>
      </div>

      {/* ── H1 ───────────────────────────────────────────────────── */}
      <h1 id="best-practices" className="scroll-mt-24">
        Best Practices for Raw Inputs
      </h1>

      <p>
        The quality of your generated Master Instruction is{" "}
        <strong>directly proportional to the quality of your four wizard
        inputs</strong>. The generator&apos;s meta-prompt framework is powerful,
        but it can only structure and refine the signal you provide. Clearer
        inputs generally lead to more relevant outputs.
      </p>
      <p>
        Most users spend 30 seconds on their inputs and wonder why the output
        feels generic. The users who get the best results spend 5 focused
        minutes on their inputs and walk away with an AI that feels like it was
        trained specifically for their workflow. This page bridges that gap.
      </p>

      <Callout variant="important" title="The Compounding Effect">
        <p>
          The wizard is designed to extract the maximum signal from your inputs.
          Each of the four fields feeds a different section of the 6-section
          framework, and they <em>compound</em> — a strong persona amplifies a
          strong task definition, which amplifies strong tone signals, which
          makes your rules more effective. Invest 3 extra minutes in your inputs
          and the output quality difference is significant.
        </p>
      </Callout>

      <SectionDivider />

      {/* ── 3 GOLDEN RULES ────────────────────────────────────────── */}
      <section id="golden-rules" className="scroll-mt-24">
        <h2>The 3 Golden Rules</h2>

        {/* Rule 1 */}
        <div className="my-8 rounded-2xl border border-neon-cyan/20 bg-neon-cyan/[0.03] p-7">
          <div className="flex items-start gap-5">
            <div className="flex-shrink-0 flex h-14 w-14 items-center justify-center rounded-xl bg-neon-cyan/15 border border-neon-cyan/30">
              <span className="text-2xl font-black text-neon-cyan">1</span>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-bold text-white mt-0 mb-2">
                Be Hyper-Specific With Your Task
              </h3>
              <p className="text-slate-400 mb-4">
                The task field is the most important of the four inputs. It feeds
                directly into Section 2 (Mission) and Section 3 (Cognitive Loop)
                of the generated instruction. Vague tasks produce vague missions.
                Domain-specific vocabulary in your task description activates
                domain-expert behavior in the output.
              </p>

              <div className="overflow-x-auto rounded-xl border border-white/[0.07]">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/[0.07] bg-white/[0.03]">
                      <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-rose-400">❌ Weak Task</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-emerald-400">✓ Strong Task</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.04]">
                    {[
                      ["Write Python code", "Build production-grade async FastAPI endpoints with Pydantic v2 validation, SQLAlchemy 2.0 ORM, and pytest unit tests"],
                      ["Help with React", "Architect React Server Components with proper data fetching patterns, Suspense boundaries, and zero client-side bundle footprint"],
                      ["Review my code", "Audit code for O(n²) performance bottlenecks, SQL injection vectors, and TypeScript strict mode violations"],
                      ["Write tests", "Generate pytest fixtures with factory_boy, mock external API calls with respx, and achieve 95%+ branch coverage"],
                    ].map(([weak, strong]) => (
                      <tr key={weak} className="hover:bg-white/[0.02] transition-colors">
                        <td className="px-4 py-3 text-xs text-slate-500">{weak}</td>
                        <td className="px-4 py-3 text-xs text-slate-300">{strong}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p className="mt-4 text-sm text-slate-500">
                Notice the pattern: strong tasks use specific library names,
                version numbers, architectural patterns, and measurable
                outcomes. The more domain-specific vocabulary you use, the more
                the generated instruction sounds like it was written by an
                expert in that exact domain — because the AI is conditioned on
                that signal.
              </p>
            </div>
          </div>
        </div>

        {/* Rule 2 */}
        <div className="my-8 rounded-2xl border border-neon-purple/20 bg-neon-purple/[0.03] p-7">
          <div className="flex items-start gap-5">
            <div className="flex-shrink-0 flex h-14 w-14 items-center justify-center rounded-xl bg-neon-purple/15 border border-neon-purple/30">
              <span className="text-2xl font-black text-neon-purple-light">2</span>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-bold text-white mt-0 mb-2">
                Never Contradict Your Own Rules
              </h3>
              <p className="text-slate-400 mb-4">
                When the persona, tone, and rules fields contain{" "}
                <strong>conflicting signals</strong>, the AI receives competing
                constraints simultaneously. It doesn&apos;t choose one — it{" "}
                <em>oscillates</em>, producing inconsistent output that
                satisfies neither constraint well. Coherence across all four
                fields is non-negotiable.
              </p>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mb-4">
                <div className="rounded-xl border border-rose-500/20 bg-rose-500/[0.04] p-4">
                  <p className="mb-2 text-xs font-bold uppercase tracking-wider text-rose-400">
                    ❌ Contradictory Setup
                  </p>
                  <div className="space-y-2 text-xs text-slate-400">
                    <p><strong className="text-slate-300">Persona:</strong> Concise Senior Engineer</p>
                    <p><strong className="text-slate-300">Tone:</strong> Terse, Direct</p>
                    <p><strong className="text-slate-300">Rules:</strong> Always provide exhaustive explanations of every decision made. Never leave any detail unexplained.</p>
                  </div>
                  <p className="mt-3 text-xs text-rose-400 italic">
                    Result: The AI will alternate between terse and exhaustive within the same response.
                  </p>
                </div>
                <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/[0.04] p-4">
                  <p className="mb-2 text-xs font-bold uppercase tracking-wider text-emerald-400">
                    ✓ Coherent Setup
                  </p>
                  <div className="space-y-2 text-xs text-slate-400">
                    <p><strong className="text-slate-300">Persona:</strong> Concise Senior Engineer</p>
                    <p><strong className="text-slate-300">Tone:</strong> Terse, Direct</p>
                    <p><strong className="text-slate-300">Rules:</strong> Maximum 3 sentences per explanation. Use bullet points. No filler text.</p>
                  </div>
                  <p className="mt-3 text-xs text-emerald-400 italic">
                    Result: Every response is consistently tight and high-signal.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Rule 3 */}
        <div className="my-8 rounded-2xl border border-amber-500/20 bg-amber-500/[0.03] p-7">
          <div className="flex items-start gap-5">
            <div className="flex-shrink-0 flex h-14 w-14 items-center justify-center rounded-xl bg-amber-500/15 border border-amber-500/30">
              <span className="text-2xl font-black text-amber-400">3</span>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-bold text-white mt-0 mb-2">
                Specificity Beats Length
              </h3>
              <p className="text-slate-400 mb-4">
                A 20-word hyper-specific task definition consistently
                outperforms a 200-word vague one. LLMs don&apos;t reward length —
                they reward <strong>signal density</strong>. Padding your inputs
                with filler dilutes the domain-specific signals that make the
                generated instruction exceptional. When in doubt, cut the
                adjectives and keep the nouns and verbs.
              </p>
              <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-4">
                <p className="text-xs font-semibold text-amber-400 mb-3">
                  Signal Density Comparison
                </p>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-slate-500 mb-1">❌ 47 words, low density:</p>
                    <p className="font-mono text-xs text-slate-400 leading-relaxed">
                      &quot;I want you to be a really helpful AI assistant that can help me with my Python code when I need it and make sure that the code you write is good and follows best practices and is well structured and easy to understand.&quot;
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-1">✓ 21 words, high density:</p>
                    <p className="font-mono text-xs text-neon-cyan leading-relaxed">
                      &quot;Write async Python with FastAPI, Pydantic v2, SQLAlchemy 2.0 ORM, type hints throughout, and pytest-asyncio test coverage.&quot;
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ── TONE STACKING ─────────────────────────────────────────── */}
      <section id="tone-stacking" className="scroll-mt-24">
        <h2>Tone Stacking</h2>
        <p>
          Tone isn&apos;t a single dimension — it&apos;s a{" "}
          <strong>compound property</strong>. Combining multiple tone chips
          creates a precise behavioral profile that no single chip can achieve
          alone. The tone field maps directly into Section 1 (Role &amp; Identity)
          and Section 5 (Boundaries) of the generated instruction, influencing
          how the AI modulates everything from word choice to response length.
        </p>

        <div className="my-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[
            {
              chips: ["Professional", "Direct", "Terse"],
              result: "A no-nonsense senior engineer who delivers the answer in 3 sentences and moves on. No fluff, no hedging, no social niceties.",
              color: "border-neon-cyan/20 bg-neon-cyan/[0.03]",
              chipColor: "bg-neon-cyan/10 text-neon-cyan border-neon-cyan/20",
            },
            {
              chips: ["Pedagogical", "Patient", "Encouraging"],
              result: "A skilled instructor who explains the reasoning behind every decision, anticipates follow-up questions, and celebrates incremental progress.",
              color: "border-emerald-500/20 bg-emerald-500/[0.03]",
              chipColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
            },
            {
              chips: ["Analytical", "Critical", "Precise"],
              result: "A rigorous code reviewer who finds every edge case, questions every assumption, and never approves anything that doesn't meet the standard.",
              color: "border-neon-purple/20 bg-neon-purple/[0.03]",
              chipColor: "bg-neon-purple/10 text-neon-purple-light border-neon-purple/20",
            },
          ].map((combo) => (
            <div
              key={combo.chips.join("+")}
              className={`rounded-xl border p-5 transition-colors duration-150 hover:border-white/10 ${combo.color}`}
            >
              <div className="flex flex-wrap gap-1.5 mb-3">
                {combo.chips.map((chip) => (
                  <span
                    key={chip}
                    className={`rounded-full border px-2 py-0.5 text-xs font-medium ${combo.chipColor}`}
                  >
                    {chip}
                  </span>
                ))}
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">{combo.result}</p>
            </div>
          ))}
        </div>

        <p className="text-slate-400 text-sm">
          The generator encodes tone chips into the Mission and Boundaries
          sections as behavioral directives — not just style suggestions. Each
          chip contributes a distinct constraint to the output distribution.
          Experiment with combinations that feel counterintuitive:{" "}
          &quot;Analytical + Encouraging&quot; produces an unusually effective
          code mentor that finds all the bugs but never makes the user feel
          stupid.
        </p>
      </section>

      <SectionDivider />

      {/* ── PERSONA MULTIPLIER ────────────────────────────────────── */}
      <section id="persona-multiplier" className="scroll-mt-24">
        <h2>The Persona Multiplier Effect</h2>
        <p>
          The persona field acts as a <strong>signal amplifier</strong> for
          everything else. It&apos;s the first thing the AI reads, and it
          establishes the prior that all subsequent instructions are interpreted
          through. A weak persona is like a weak lens — it blurs everything
          that comes after it. A strong persona focuses the entire instruction
          into a sharp, high-resolution output profile.
        </p>

        <div className="my-5 overflow-x-auto rounded-xl border border-white/[0.07]">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/[0.07] bg-white/[0.03]">
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-rose-400">❌ Weak Persona</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-emerald-400">✓ Strong Persona</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">Why It Matters</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {[
                ["An AI assistant", "Principal TypeScript Architect with 15 years building at scale", "Default behavior vs. expert-mode, decisive, high-authority output"],
                ["A Python developer", "Senior Backend Engineer specializing in async Python, FastAPI, and distributed systems", "Generic language knowledge vs. opinionated architecture guidance"],
                ["A writing assistant", "Technical Documentation Engineer with expertise in developer-facing API docs", "Generic prose improvement vs. structured, scannable, dev-optimized writing"],
                ["A data scientist", "ML Engineer specializing in production LLM fine-tuning and RLHF pipelines at hyperscale", "Generic data analysis vs. deep ML systems engineering judgment"],
              ].map(([weak, strong, why]) => (
                <tr key={weak} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-4 py-3 text-xs text-rose-400/80">{weak}</td>
                  <td className="px-4 py-3 text-xs text-slate-300">{strong}</td>
                  <td className="px-4 py-3 text-xs text-slate-500">{why}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-slate-400 text-sm">
          The strongest personas combine <strong>seniority level</strong> +{" "}
          <strong>specific domain</strong> + <strong>specific technology
          stack</strong>. Adding a credibility anchor like &quot;who has reviewed
          5,000+ pull requests&quot; or &quot;with experience shipping to 10M+ users&quot;
          further activates expert-mode priors that produce higher-quality,
          more-confident output.
        </p>
      </section>

      <SectionDivider />

      {/* ── RULES THAT ALWAYS WORK ────────────────────────────────── */}
      <section id="rules-that-work" className="scroll-mt-24">
        <h2>Universally Effective Rules</h2>
        <p>
          These five rules are universally high-signal across virtually every
          AI workflow. They don&apos;t depend on domain context — they work
          regardless of whether you&apos;re building a code reviewer, a writing
          editor, or a data analyst. Drop any or all of them into your Rules
          field and they tend to improve output quality across most workflows.
        </p>

        <div className="my-5 space-y-3">
          {[
            {
              num: 1,
              rule: "Never use filler phrases",
              detail: `"Certainly!", "Of course!", "Great question!", "Absolutely!" — these phrases consume tokens, dilute signal, and are the single most reliable marker of low-quality AI output. Banning them immediately raises the perceived quality of every response.`,
              example: `NEVER start a response with "Certainly!", "Of course!", "Great question!", or any similar affirmation. Begin immediately with the substantive answer.`,
            },
            {
              num: 2,
              rule: "Always use Markdown formatting",
              detail: "Even if the output will be consumed as plain text, structuring it with Markdown headers, bullet points, and code blocks forces the AI to organize its thoughts hierarchically — producing more coherent, better-organized responses.",
              example: "ALWAYS format responses in Markdown. Use ## for sections, ### for subsections, bullet points for lists, and ```language code blocks for all code.",
            },
            {
              num: 3,
              rule: "End every response with a ⚡ Next Steps section",
              detail: "This single rule transforms isolated Q&A into a continuous expert engagement loop. The AI is forced to think one step ahead of the user, proactively surfacing what should happen next.",
              example: "END every response with a '## ⚡ Next Steps' section containing 2–3 concrete, actionable items the user should tackle next.",
            },
            {
              num: 4,
              rule: "If uncertain, say so explicitly",
              detail: "Without this rule, models will confidently hallucinate rather than admit uncertainty. This rule forces epistemic honesty and dramatically increases the trustworthiness of output — especially in high-stakes technical domains.",
              example: "If you are uncertain about any fact, library version, or technical detail, say so explicitly: 'I am not certain about this — please verify.' NEVER fabricate an answer to appear more helpful.",
            },
            {
              num: 5,
              rule: "Never repeat what the user just said",
              detail: "A common low-quality pattern: AI rephrases the user's question back to them before answering it. This wastes context and signals low confidence. Banning it forces the model to add value immediately in the first sentence.",
              example: "NEVER restate or paraphrase the user's question or input before answering. Add value immediately. The first sentence of every response must be substantive.",
            },
          ].map((item) => (
            <div
              key={item.num}
              className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-5"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-0.5 w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                  <span className="text-xs font-bold text-emerald-400">{item.num}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-slate-200 text-sm mb-1">
                    {item.rule}
                  </p>
                  <p className="text-xs text-slate-500 mb-3">{item.detail}</p>
                  <div className="rounded-lg border border-emerald-500/10 bg-emerald-500/[0.04] px-4 py-2.5">
                    <p className="text-xs text-slate-500 mb-1 font-semibold uppercase tracking-wider">
                      Copy-ready rule:
                    </p>
                    <p className="font-mono text-xs text-emerald-300 leading-relaxed">
                      {item.example}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <SectionDivider />

      {/* ── ANTI-PATTERNS ─────────────────────────────────────────── */}
      <section id="anti-patterns" className="scroll-mt-24">
        <h2>Anti-Patterns to Avoid</h2>
        <p>
          These are the five most common mistakes we see in user inputs. Each
          one predictably degrades the quality of the generated instruction.
          If your output feels generic or inconsistent, check your inputs
          against this list first.
        </p>

        <div className="my-5 space-y-3">
          {[
            {
              title: "Vague persona: 'an AI assistant'",
              detail: "This is the model's default self-concept. You haven't changed anything — you've just confirmed the prior. If the persona field doesn't add new information the model wouldn't already assume, rewrite it. Minimum viable persona: a specific domain + a seniority level.",
            },
            {
              title: "Contradictory tone + rules",
              detail: "If your tone says 'Concise' but your rules say 'Provide exhaustive explanations', the model will oscillate. Audit your inputs for coherence: every rule should amplify the tone, not contradict it.",
            },
            {
              title: "Rules framed as requests, not directives",
              detail: "'Please be nice' is a request. 'Use professional language only — no colloquialisms, no slang' is a directive. Requests are processed as preferences and regularly ignored under other constraints. Directives are processed as hard constraints. Use the imperative mood.",
            },
            {
              title: "No output format specified",
              detail: "If you don't specify an output format, the model will use whatever format it calculates is most likely for the domain — which is usually inconsistent across conversations. Always define at minimum: 'Use Markdown formatting.' Ideally, also specify header levels, code block language tags, and list structure.",
            },
            {
              title: "Missing domain context",
              detail: "The AI doesn't know what stack you use, what framework you're on, what version you're targeting, or what constraints your project has — unless you tell it. 'Review my code' produces generic advice. 'Review my Next.js 14 App Router code for performance regressions against React 18 Suspense semantics' produces expert-level, version-aware analysis.",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="flex items-start gap-4 rounded-xl border border-rose-500/10 bg-rose-500/[0.03] p-5"
            >
              <div className="flex-shrink-0 mt-0.5 w-7 h-7 rounded-lg bg-rose-500/10 border border-rose-500/20 flex items-center justify-center">
                <span className="text-xs font-bold text-rose-400">{idx + 1}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-slate-200 text-sm mb-1">
                  {item.title}
                </p>
                <p className="text-xs text-slate-500 leading-relaxed">{item.detail}</p>
              </div>
            </div>
          ))}
        </div>

        <CodeBlock language="markdown" filename="Quick Reference — Input Checklist">
{`## Before you generate, check:

### Persona ✓
[ ] Includes a specific domain (not just "developer" or "assistant")
[ ] Includes a seniority signal (Senior, Principal, Lead, Expert)
[ ] Includes at least one specific technology or specialization

### Task ✓
[ ] Contains specific library/framework names (not generic)
[ ] Uses technical vocabulary your domain expert would use
[ ] Specifies measurable outcomes where possible (e.g., "95%+ test coverage")

### Tone ✓
[ ] At least 2 tone chips selected
[ ] Chips are coherent with each other (not contradictory)
[ ] Chips are coherent with the persona (a "Terse" persona should not be "Pedagogical")

### Rules ✓
[ ] Written as imperatives (ALWAYS, NEVER, MUST), not requests
[ ] No rule contradicts the tone or persona
[ ] At minimum: output format rule (Markdown, code blocks, etc.)
[ ] At minimum: filler-phrase prohibition rule`}
        </CodeBlock>
      </section>

      {/* ── Bottom nav ─────────────────────────────────────────────── */}
      <div className="mt-12 rounded-xl border border-white/[0.07] bg-white/[0.02] p-5">
        <p className="text-xs uppercase tracking-wider text-slate-600 mb-1">
          You&apos;ve reached the end of the docs
        </p>
        <Link
          href="/generate"
          className="font-semibold text-white hover:text-neon-cyan transition-colors"
        >
          Ready to generate your first instruction? →
        </Link>
      </div>

    </article>
  );
}

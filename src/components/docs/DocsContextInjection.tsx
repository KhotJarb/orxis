"use client";

import Callout, {
  CodeBlock,
  InlineCode,
  SectionDivider,
  Step,
} from "@/components/docs/DocsComponents";
import Link from "next/link";

export default function DocsContextInjection() {
  return (
    <article className="docs-prose w-full max-w-3xl">

      {/* Badge */}
      <div className="mb-3 flex items-center gap-2">
        <span className="rounded-full border border-neon-purple/30 bg-neon-purple/10 px-3 py-0.5 text-xs font-semibold text-neon-purple-light">
          Advanced
        </span>
        <span className="text-slate-700">/</span>
        <span className="text-xs text-slate-500">Context Injection</span>
      </div>

      <h1 id="context-injection" className="scroll-mt-24">
        Context &amp; Knowledge Injection
      </h1>

      <p>
        Your Master Custom Instruction defines <em>who</em> the AI is and{" "}
        <em>how</em> it thinks. Context Injection is the technique of telling
        it <em>what</em> to work with — feeding it your proprietary data,
        documents, codebases, or domain knowledge so it can apply its expert
        persona to <em>your specific world</em>, not a generic one.
      </p>
      <p>
        This is the manual, no-infrastructure equivalent of{" "}
        <strong>Retrieval-Augmented Generation (RAG)</strong>. Instead of
        building a vector database and a retrieval pipeline, you curate the
        most relevant context and inject it directly into the conversation
        alongside your Master Instruction. For most use cases, this approach
        is faster, cheaper, and more controllable than a full RAG system.
      </p>

      <Callout variant="important" title="The Injection Principle">
        <p>
          The AI has no memory of your world — your codebase, your company&apos;s
          terminology, your document standards, your team conventions. Context
          Injection is the act of bridging that gap. A Master Instruction without
          context is an expert working blind. An expert with the right context is
          far more effective.
        </p>
      </Callout>

      <SectionDivider />

      {/* WHAT TO INJECT */}
      <section id="what-to-inject" className="scroll-mt-24">
        <h2>What to Inject</h2>
        <p>
          Not all context is equal. Injecting the right information is as
          important as injecting any information at all. Here is a taxonomy of
          high-value context types, ranked by impact:
        </p>

        <div className="my-5 space-y-3">
          {[
            {
              rank: "01",
              type: "Codebase Snapshots",
              desc: "Paste the most relevant files or modules. Include the file path as a comment at the top of each snippet so the AI can reason about project structure. Ideal for code review, refactoring, and architecture analysis.",
              color: "border-neon-cyan/20 bg-neon-cyan/[0.03] text-neon-cyan",
            },
            {
              rank: "02",
              type: "Specification Documents",
              desc: "PRDs, API specs, design documents, or RFC drafts. The AI will use these as ground truth when generating any output, preventing hallucination of requirements.",
              color: "border-neon-purple/20 bg-neon-purple/[0.03] text-neon-purple-light",
            },
            {
              rank: "03",
              type: "CSV / Structured Data",
              desc: "Sales data, user analytics, database schemas, experiment results. Paste directly or upload via file attachment. The AI can perform analysis, generate insights, or draft data-driven documents.",
              color: "border-emerald-500/20 bg-emerald-500/[0.03] text-emerald-400",
            },
            {
              rank: "04",
              type: "PDF Documents",
              desc: "Research papers, compliance documents, contracts, style guides. Use file upload in ChatGPT, Claude, or Gemini. Explicitly command the AI to apply its defined role when analyzing the document.",
              color: "border-amber-500/20 bg-amber-500/[0.03] text-amber-400",
            },
            {
              rank: "05",
              type: "Previous Outputs / Conversation History",
              desc: "Paste the output from a prior chain session to continue work with full continuity. Prefix with 'Here is what we produced in the previous session:' for maximum clarity.",
              color: "border-rose-500/20 bg-rose-500/[0.03] text-rose-400",
            },
          ].map((item) => (
            <div
              key={item.rank}
              className="flex gap-4 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4"
            >
              <span className={`mt-0.5 text-lg font-black tabular-nums ${item.color.split(" ")[2]}`}>
                {item.rank}
              </span>
              <div className={`flex-1 rounded-lg border p-3 ${item.color.split(" ")[0]} ${item.color.split(" ")[1]}`}>
                <p className="font-semibold text-slate-200 mb-1">{item.type}</p>
                <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <SectionDivider />

      {/* HOW TO INJECT */}
      <section id="how-to-inject" className="scroll-mt-24">
        <h2>How to Inject Context by Platform</h2>

        <h3 id="inject-chatgpt" className="scroll-mt-24">ChatGPT</h3>
        <p>
          ChatGPT supports both direct text injection and file uploads (PDF,
          DOCX, CSV, images, and code files). The recommended pattern is to
          inject your Master Instruction first, then present the external
          context in a structured format.
        </p>

        <div className="my-4 space-y-3">
          <Step number={1} title="Open a new chat or Project">
            If using Custom Instructions, your Master Instruction is already
            active. If not, paste it as the first message. Navigate to a new
            conversation or inside a Project that has your instruction
            pre-loaded.
          </Step>
          <Step number={2} title="Upload or paste your document">
            Click the paperclip icon to upload a PDF, CSV, or code file. For
            shorter content (&lt;10,000 tokens), pasting directly into the
            message box gives the AI more precise control over the raw text.
          </Step>
          <Step number={3} title="Issue an explicit injection command">
            <span>
              Do not simply drop the document and hope for the best. Issue a
              precise command that bridges the document to the persona:
            </span>
          </Step>
        </div>

        <Callout variant="tip" title="The Pro Injection Command">
          <p>
            When providing external documents, always use this exact command
            pattern to activate the full power of the persona:
          </p>
          <CodeBlock language="text" filename="Injection Command Template">
{`Analyze the attached document using your predefined role and strict rules.

Apply your full cognitive loop: begin with internal self-reflection before 
producing any output. Your analysis must comply with every constraint 
defined in your persona — particularly the formatting rules and 
evaluation rubric.

Specifically, I need you to: [YOUR SPECIFIC TASK]`}
          </CodeBlock>
          <p>
            The phrase <em>&ldquo;using your predefined role and strict rules&rdquo;</em>{" "}
            is a deliberate callback that re-activates the persona, preventing
            the AI from slipping into a generic assistant mode when handling
            external data.
          </p>
        </Callout>

        <h3 id="inject-claude" className="scroll-mt-24 mt-8">Claude</h3>
        <p>
          Claude&apos;s 200K token context window makes it the best platform for
          large document injection — full codebases, lengthy research papers, or
          multiple files at once. Claude can hold and reason over vastly more
          context than other models without degrading.
        </p>

        <div className="my-4 space-y-3">
          <Step number={1} title="Set up a Project with your Master Instruction">
            Create a Claude Project and add your Master Instruction to the
            Project Instructions. This persists across sessions — you never need
            to re-paste it.
          </Step>
          <Step number={2} title="Upload files or paste content in the conversation">
            Claude supports file uploads (PDF, TXT, CSV, code files) and direct
            text paste. For maximum precision, paste code files with file path
            headers:
            <CodeBlock language="text" filename="File Context Format">
{`## FILE: src/services/auth.service.ts
[paste file content here]

## FILE: src/models/user.model.ts  
[paste file content here]

## FILE: src/controllers/auth.controller.ts
[paste file content here]`}
            </CodeBlock>
          </Step>
          <Step number={3} title="Give the structured injection command">
            Reference the files explicitly in your command so Claude&apos;s
            attention is anchored to the right context:
            <CodeBlock language="text" filename="Claude Injection Command">
{`Using your predefined role and applying your evaluation rubric, 
perform a comprehensive security audit of the three files above.

Focus on:
1. Authentication vulnerabilities (JWT, session management)
2. Authorization bypass vectors
3. Input validation gaps
4. Dependency risks

For each finding, provide: severity, location (file + line), 
root cause, and a concrete remediation with code example.`}
            </CodeBlock>
          </Step>
        </div>

        <h3 id="inject-gemini" className="scroll-mt-24 mt-8">Google AI Studio / Gemini</h3>
        <p>
          Google AI Studio&apos;s grounding feature allows connecting Gemini to
          Google Search or Google Drive — enabling semi-automated context
          retrieval. For manual injection, AI Studio also supports file uploads
          directly in the prompt interface.
        </p>
        <p>
          For CSV and structured data analysis, Gemini 2.5 Pro with the
          &ldquo;Data Analysis&rdquo; capability enabled produces the most reliable
          results. Set your Master Instruction as the System Instruction and
          upload the CSV as a file attachment.
        </p>
      </section>

      <SectionDivider />

      {/* MANUAL RAG */}
      <section id="manual-rag" className="scroll-mt-24">
        <h2>Manual RAG — The Expert&apos;s Technique</h2>
        <p>
          Full RAG systems (vector databases, embedding models, retrieval
          pipelines) are powerful but heavyweight. For most knowledge-work tasks,
          you can achieve 80% of the benefit with a disciplined manual approach.
        </p>

        <h3 id="rag-chunking" className="scroll-mt-24">Step 1 — Curate, Don&apos;t Dump</h3>
        <p>
          The most common mistake is injecting an entire document and expecting
          the AI to find the relevant parts. Instead, curate: extract only the
          sections that are directly relevant to the task. A focused 500-word
          excerpt outperforms a 50,000-word raw document for precision tasks.
        </p>

        <Callout variant="warning">
          <p>
            Injecting too much context triggers the{" "}
            <strong>&ldquo;Lost in the Middle&rdquo;</strong> problem — a
            well-documented phenomenon where LLMs pay disproportionate attention
            to the beginning and end of a long context, underweighting content
            in the middle. For documents &gt;50 pages, manually extract the
            relevant sections rather than injecting the full document.
          </p>
        </Callout>

        <h3 id="rag-labeling" className="scroll-mt-24 mt-6">Step 2 — Label Every Context Block</h3>
        <p>
          Always label injected context with a clear header. This anchors the
          AI&apos;s attention and allows it to reason about the source explicitly
          in its output.
        </p>

        <CodeBlock language="text" filename="Labeled Context Block Format">
{`## CONTEXT BLOCK: Company Style Guide (v2.3, Q4 2024)
[Relevant excerpt from style guide]

## CONTEXT BLOCK: Previous Draft (Section 3 only)
[Relevant excerpt]

## CONTEXT BLOCK: Client Requirements (from PRD dated 2024-11-15)
[Relevant excerpt]

---

Now, using your predefined role and the context blocks above,
produce: [YOUR TASK]`}
        </CodeBlock>

        <h3 id="rag-verification" className="scroll-mt-24 mt-6">Step 3 — Demand Source Attribution</h3>
        <p>
          Instruct the AI to cite its context sources in the output. This
          prevents hallucination and makes the output auditable.
        </p>

        <CodeBlock language="text" filename="Source Attribution Command">
{`For every factual claim or design decision in your output, cite which 
Context Block it is derived from, using inline references like 
[Style Guide], [PRD], or [Previous Draft].

If you make an inference not directly supported by the provided context, 
mark it explicitly with [INFERENCE] so I can review it.`}
        </CodeBlock>

        <Callout variant="tip" title="The Attribution Trick">
          <p>
            Requiring source citations dramatically reduces hallucination because
            it forces the model to consciously trace each claim to a specific
            source. When a model cannot find a source, it is more likely to say
            &ldquo;I don&apos;t have information on this&rdquo; rather than fabricate one — 
            especially in Claude and GPT-4o.
          </p>
        </Callout>
      </section>

      <SectionDivider />

      {/* CODEBASE INJECTION */}
      <section id="codebase-injection" className="scroll-mt-24">
        <h2>Codebase Injection — The Developer&apos;s Use Case</h2>
        <p>
          For software engineers, Context Injection transforms the AI from a
          general-purpose code assistant into a teammate who understands your
          specific project. The Master Instruction defines the engineering
          standards; the codebase injection gives it the project knowledge.
        </p>

        <CodeBlock language="text" filename="Full Codebase Injection Template">
{`[Master Custom Instruction — paste in full]

---

## PROJECT CONTEXT

**Stack:** Next.js 15 (App Router), TypeScript 5.3, Prisma 5, PostgreSQL
**Team conventions:** 
- Function components only, no class components
- Server Components by default, Client Components only when required
- All database queries through Prisma with explicit transaction handling
- Error handling: use Result<T, E> pattern, never throw from async functions

## RELEVANT FILES

### FILE: src/app/api/orders/route.ts
\`\`\`typescript
[paste file content]
\`\`\`

### FILE: src/lib/prisma.ts  
\`\`\`typescript
[paste file content]
\`\`\`

### FILE: src/types/order.types.ts
\`\`\`typescript
[paste file content]
\`\`\`

---

Task: [YOUR SPECIFIC TASK — e.g., "Refactor the order creation endpoint 
to use optimistic locking and add idempotency key support."]`}
        </CodeBlock>

        {/* Bottom nav */}
        <div className="mt-12 rounded-xl border border-white/[0.07] bg-white/[0.02] p-5">
          <p className="text-xs uppercase tracking-wider text-slate-600 mb-1">Next</p>
          <Link
            href="/docs?page=best-practices"
            className="font-semibold text-white hover:text-neon-cyan transition-colors"
          >
            Advanced — Best Practices →
          </Link>
        </div>
      </section>
    </article>
  );
}

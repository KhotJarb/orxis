"use client";

import { useState, useEffect } from "react";
import Callout, {
  CodeBlock,
  InlineCode,
  SectionDivider,
  Step,
} from "@/components/docs/DocsComponents";
import Link from "next/link";

import { useT, useLanguage } from "@/i18n";

export default function DocsContextInjection() {
  const t = useT("docs");
  const { locale } = useLanguage();
  const [localeData, setLocaleData] = useState<any>(null);

  useEffect(() => {
    import(`@/i18n/locales/${locale}/docs.json`)
      .catch(() => import("@/i18n/locales/en/docs.json"))
      .then((m) => setLocaleData(m.default ?? m));
  }, [locale]);

  type InjectItem = { rank: string; type: string; desc: string };
  const whatToInjectList: InjectItem[] = localeData?.contextInjection?.whatToInject?.list ?? [];

  return (
    <article className="docs-prose w-full max-w-3xl">

      {/* Badge */}
      <div className="mb-3 flex items-center gap-2">
        <span className="rounded-full border border-neon-purple/30 bg-neon-purple/10 px-3 py-0.5 text-xs font-semibold text-neon-purple-light">
          {t("contextInjection.badge")}
        </span>
        <span className="text-slate-700">/</span>
        <span className="text-xs text-slate-500">{t("contextInjection.breadcrumb")}</span>
      </div>

      <h1 id="context-injection" className="scroll-mt-24">
        {t("contextInjection.title")}
      </h1>

      <p>
        {t("contextInjection.intro1Before")}
        <em>{t("contextInjection.intro1Em1")}</em>
        {t("contextInjection.intro1Mid1")}
        <em>{t("contextInjection.intro1Em2")}</em>
        {t("contextInjection.intro1Mid2")}
        <em>{t("contextInjection.intro1Em3")}</em>
        {t("contextInjection.intro1Mid3")}
        <em>{t("contextInjection.intro1Em4")}</em>
        {t("contextInjection.intro1After")}
      </p>
      <p>
        {t("contextInjection.intro2Before")}
        <strong>{t("contextInjection.intro2Strong")}</strong>
        {t("contextInjection.intro2After")}
      </p>

      <Callout variant="important" title={t("contextInjection.principle.title")}>
        <p>
          {t("contextInjection.principle.text")}
        </p>
      </Callout>

      <SectionDivider />

      {/* WHAT TO INJECT */}
      <section id="what-to-inject" className="scroll-mt-24">
        <h2>{t("contextInjection.whatToInject.title")}</h2>
        <p>
          {t("contextInjection.whatToInject.text")}
        </p>

        <div className="my-5 space-y-3">
          {whatToInjectList.map((item, idx) => (
            <div
              key={idx}
              className="flex gap-4 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4"
            >
              <span className={`mt-0.5 text-lg font-black tabular-nums ${
                idx === 0 ? "text-neon-cyan" :
                idx === 1 ? "text-neon-purple-light" :
                idx === 2 ? "text-emerald-400" :
                idx === 3 ? "text-amber-400" :
                "text-rose-400"
              }`}>
                {item.rank}
              </span>
              <div className={`flex-1 rounded-lg border p-3 ${
                idx === 0 ? "border-neon-cyan/20 bg-neon-cyan/[0.03]" :
                idx === 1 ? "border-neon-purple/20 bg-neon-purple/[0.03]" :
                idx === 2 ? "border-emerald-500/20 bg-emerald-500/[0.03]" :
                idx === 3 ? "border-amber-500/20 bg-amber-500/[0.03]" :
                "border-rose-500/20 bg-rose-500/[0.03]"
              }`}>
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
        <h2>{t("contextInjection.howToInject.title")}</h2>

        <h3 id="inject-chatgpt" className="scroll-mt-24">{t("contextInjection.howToInject.chatgpt.title")}</h3>
        <p>
          {t("contextInjection.howToInject.chatgpt.text")}
        </p>

        <div className="my-4 space-y-3">
          <Step number={1} title={t("contextInjection.howToInject.chatgpt.step1Title")}>
            {t("contextInjection.howToInject.chatgpt.step1Text")}
          </Step>
          <Step number={2} title={t("contextInjection.howToInject.chatgpt.step2Title")}>
            {t("contextInjection.howToInject.chatgpt.step2Text")}
          </Step>
          <Step number={3} title={t("contextInjection.howToInject.chatgpt.step3Title")}>
            <span>
              {t("contextInjection.howToInject.chatgpt.step3Text")}
            </span>
          </Step>
        </div>

        <Callout variant="tip" title={t("contextInjection.howToInject.chatgpt.calloutTitle")}>
          <p>
            {t("contextInjection.howToInject.chatgpt.calloutTextBefore")}
          </p>
          <CodeBlock language="text" filename={t("contextInjection.howToInject.chatgpt.calloutFilename")}>
{`Analyze the attached document using your predefined role and strict rules.

Apply your full cognitive loop: begin with internal self-reflection before 
producing any output. Your analysis must comply with every constraint 
defined in your persona — particularly the formatting rules and 
evaluation rubric.

Specifically, I need you to: [YOUR SPECIFIC TASK]`}
          </CodeBlock>
          <p>
            {t("contextInjection.howToInject.chatgpt.calloutNoteBefore")}
            <em>{t("contextInjection.howToInject.chatgpt.calloutNoteEm")}</em>{" "}
            {t("contextInjection.howToInject.chatgpt.calloutNoteAfter")}
          </p>
        </Callout>

        <h3 id="inject-claude" className="scroll-mt-24 mt-8">{t("contextInjection.howToInject.claude.title")}</h3>
        <p>
          {t("contextInjection.howToInject.claude.text")}
        </p>

        <div className="my-4 space-y-3">
          <Step number={1} title={t("contextInjection.howToInject.claude.step1Title")}>
            {t("contextInjection.howToInject.claude.step1Text")}
          </Step>
          <Step number={2} title={t("contextInjection.howToInject.claude.step2Title")}>
            {t("contextInjection.howToInject.claude.step2Text")}
            <CodeBlock language="text" filename={t("contextInjection.howToInject.claude.step2Filename")}>
{`## FILE: src/services/auth.service.ts
[paste file content here]

## FILE: src/models/user.model.ts  
[paste file content here]

## FILE: src/controllers/auth.controller.ts
[paste file content here]`}
            </CodeBlock>
          </Step>
          <Step number={3} title={t("contextInjection.howToInject.claude.step3Title")}>
            {t("contextInjection.howToInject.claude.step3Text")}
            <CodeBlock language="text" filename={t("contextInjection.howToInject.claude.step3Filename")}>
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

        <h3 id="inject-gemini" className="scroll-mt-24 mt-8">{t("contextInjection.howToInject.gemini.title")}</h3>
        <p>
          {t("contextInjection.howToInject.gemini.text1")}
        </p>
        <p>
          {t("contextInjection.howToInject.gemini.text2")}
        </p>
      </section>

      <SectionDivider />

      {/* MANUAL RAG */}
      <section id="manual-rag" className="scroll-mt-24">
        <h2>{t("contextInjection.manualRag.title")}</h2>
        <p>
          {t("contextInjection.manualRag.text")}
        </p>

        <h3 id="rag-chunking" className="scroll-mt-24">{t("contextInjection.manualRag.step1Title")}</h3>
        <p>
          {t("contextInjection.manualRag.step1Text")}
        </p>

        <Callout variant="warning">
          <p>
            {t("contextInjection.manualRag.warningBefore")}
            <strong>{t("contextInjection.manualRag.warningStrong")}</strong>
            {t("contextInjection.manualRag.warningAfter")}
          </p>
        </Callout>

        <h3 id="rag-labeling" className="scroll-mt-24 mt-6">{t("contextInjection.manualRag.step2Title")}</h3>
        <p>
          {t("contextInjection.manualRag.step2Text")}
        </p>

        <CodeBlock language="text" filename={t("contextInjection.manualRag.step2Filename")}>
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

        <h3 id="rag-verification" className="scroll-mt-24 mt-6">{t("contextInjection.manualRag.step3Title")}</h3>
        <p>
          {t("contextInjection.manualRag.step3Text")}
        </p>

        <CodeBlock language="text" filename={t("contextInjection.manualRag.step3Filename")}>
{`For every factual claim or design decision in your output, cite which 
Context Block it is derived from, using inline references like 
[Style Guide], [PRD], or [Previous Draft].

If you make an inference not directly supported by the provided context, 
mark it explicitly with [INFERENCE] so I can review it.`}
        </CodeBlock>

        <Callout variant="tip" title={t("contextInjection.manualRag.tipTitle")}>
          <p>
            {t("contextInjection.manualRag.tipText")}
          </p>
        </Callout>
      </section>

      <SectionDivider />

      {/* CODEBASE INJECTION */}
      <section id="codebase-injection" className="scroll-mt-24">
        <h2>{t("contextInjection.codebaseInjection.title")}</h2>
        <p>
          {t("contextInjection.codebaseInjection.text")}
        </p>

        <CodeBlock language="text" filename={t("contextInjection.codebaseInjection.filename")}>
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
          <p className="text-xs uppercase tracking-wider text-slate-600 mb-1">{t("contextInjection.bottomNav.label")}</p>
          <Link
            href="/docs?page=best-practices"
            className="font-semibold text-white hover:text-neon-cyan transition-colors"
          >
            {t("contextInjection.bottomNav.link")}
          </Link>
        </div>
      </section>
    </article>
  );
}

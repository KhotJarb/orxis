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

export default function DocsBestPractices() {
  const t = useT("docs");
  const { locale } = useLanguage();
  const [localeData, setLocaleData] = useState<any>(null);

  useEffect(() => {
    import(`@/i18n/locales/${locale}/docs.json`)
      .catch(() => import("@/i18n/locales/en/docs.json"))
      .then((m) => setLocaleData(m.default ?? m));
  }, [locale]);

  const bp = localeData?.bestPractices;
  const toneCards: Array<{chips: string[]; result: string}> = bp?.toneStacking?.cards ?? [];
  const tableRows: Array<{weak: string; strong: string; why: string}> = bp?.personaMultiplier?.table?.rows ?? [];
  const universalRules: Array<{rule: string; detail: string; example: string}> = bp?.universalRules?.rules ?? [];
  const antiPatterns: Array<{title: string; detail: string}> = bp?.antiPatterns?.patterns ?? [];

  return (
    <article className="docs-prose w-full max-w-3xl">

      {/* ── Page badge ───────────────────────────────────────────── */}
      <div className="mb-3 flex items-center gap-2">
        <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-0.5 text-xs font-semibold text-amber-400">
          {t("bestPractices.badge")}
        </span>
        <span className="text-slate-700">/</span>
        <span className="text-xs text-slate-500">{t("bestPractices.breadcrumb")}</span>
      </div>

      {/* ── H1 ───────────────────────────────────────────────────── */}
      <h1 id="best-practices" className="scroll-mt-24">
        {t("bestPractices.title")}
      </h1>

      <p>
        {t("bestPractices.intro1Before")}
        <strong>{t("bestPractices.intro1Strong")}</strong>
        {t("bestPractices.intro1After")}
      </p>
      <p>
        {t("bestPractices.intro2")}
      </p>

      <Callout variant="important" title={t("bestPractices.compoundingEffect.title")}>
        <p>
          {t("bestPractices.compoundingEffect.textBefore")}
          <em>{t("bestPractices.compoundingEffect.textEm")}</em>
          {t("bestPractices.compoundingEffect.textAfter")}
        </p>
      </Callout>

      <SectionDivider />

      {/* ── 3 GOLDEN RULES ────────────────────────────────────────── */}
      <section id="golden-rules" className="scroll-mt-24">
        <h2>{t("bestPractices.goldenRules.title")}</h2>

        {/* Rule 1 */}
        <div className="my-8 rounded-2xl border border-neon-cyan/20 bg-neon-cyan/[0.03] p-7">
          <div className="flex items-start gap-5">
            <div className="flex-shrink-0 flex h-14 w-14 items-center justify-center rounded-xl bg-neon-cyan/15 border border-neon-cyan/30">
              <span className="text-2xl font-black text-neon-cyan">1</span>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-bold text-white mt-0 mb-2">
                {t("bestPractices.goldenRules.rule1.title")}
              </h3>
              <p className="text-slate-400 mb-4">
                {t("bestPractices.goldenRules.rule1.text")}
              </p>

              <div className="overflow-x-auto rounded-xl border border-white/[0.07]">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/[0.07] bg-white/[0.03]">
                      <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-rose-400">{t("bestPractices.goldenRules.rule1.table.weak")}</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-emerald-400">{t("bestPractices.goldenRules.rule1.table.strong")}</th>
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
                {t("bestPractices.goldenRules.rule1.note")}
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
                {t("bestPractices.goldenRules.rule2.title")}
              </h3>
              <p className="text-slate-400 mb-4">
                {t("bestPractices.goldenRules.rule2.textBefore")}
                <strong>{t("bestPractices.goldenRules.rule2.textStrong")}</strong>
                {t("bestPractices.goldenRules.rule2.textMid")}
                <em>{t("bestPractices.goldenRules.rule2.textEm")}</em>
                {t("bestPractices.goldenRules.rule2.textAfter")}
              </p>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mb-4">
                <div className="rounded-xl border border-rose-500/20 bg-rose-500/[0.04] p-4">
                  <p className="mb-2 text-xs font-bold uppercase tracking-wider text-rose-400">
                    {t("bestPractices.goldenRules.rule2.badSetup.title")}
                  </p>
                  <div className="space-y-2 text-xs text-slate-400">
                    <p><strong className="text-slate-300">{t("bestPractices.goldenRules.rule2.personaLabel")}</strong> Concise Senior Engineer</p>
                    <p><strong className="text-slate-300">{t("bestPractices.goldenRules.rule2.toneLabel")}</strong> Terse, Direct</p>
                    <p><strong className="text-slate-300">{t("bestPractices.goldenRules.rule2.rulesLabel")}</strong> Always provide exhaustive explanations of every decision made. Never leave any detail unexplained.</p>
                  </div>
                  <p className="mt-3 text-xs text-rose-400 italic">
                    {t("bestPractices.goldenRules.rule2.badSetup.result")}
                  </p>
                </div>
                <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/[0.04] p-4">
                  <p className="mb-2 text-xs font-bold uppercase tracking-wider text-emerald-400">
                    {t("bestPractices.goldenRules.rule2.goodSetup.title")}
                  </p>
                  <div className="space-y-2 text-xs text-slate-400">
                    <p><strong className="text-slate-300">{t("bestPractices.goldenRules.rule2.personaLabel")}</strong> Concise Senior Engineer</p>
                    <p><strong className="text-slate-300">{t("bestPractices.goldenRules.rule2.toneLabel")}</strong> Terse, Direct</p>
                    <p><strong className="text-slate-300">{t("bestPractices.goldenRules.rule2.rulesLabel")}</strong> Maximum 3 sentences per explanation. Use bullet points. No filler text.</p>
                  </div>
                  <p className="mt-3 text-xs text-emerald-400 italic">
                    {t("bestPractices.goldenRules.rule2.goodSetup.result")}
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
                {t("bestPractices.goldenRules.rule3.title")}
              </h3>
              <p className="text-slate-400 mb-4">
                {t("bestPractices.goldenRules.rule3.textBefore")}
                <strong>{t("bestPractices.goldenRules.rule3.textStrong")}</strong>
                {t("bestPractices.goldenRules.rule3.textAfter")}
              </p>
              <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-4">
                <p className="text-xs font-semibold text-amber-400 mb-3">
                  {t("bestPractices.goldenRules.rule3.comparisonTitle")}
                </p>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-slate-500 mb-1">{t("bestPractices.goldenRules.rule3.badLabel")}</p>
                    <p className="font-mono text-xs text-slate-400 leading-relaxed">
                      &quot;I want you to be a really helpful AI assistant that can help me with my Python code when I need it and make sure that the code you write is good and follows best practices and is well structured and easy to understand.&quot;
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-1">{t("bestPractices.goldenRules.rule3.goodLabel")}</p>
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
        <h2>{t("bestPractices.toneStacking.title")}</h2>
        <p>
          {t("bestPractices.toneStacking.textBefore")}
          <strong>{t("bestPractices.toneStacking.textStrong")}</strong>
          {t("bestPractices.toneStacking.textAfter")}
        </p>

        <div className="my-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {toneCards.map((combo, idx) => (
            <div
              key={idx}
              className={`rounded-xl border p-5 transition-colors duration-150 hover:border-white/10 ${
                idx === 0 ? "border-neon-cyan/20 bg-neon-cyan/[0.03]" :
                idx === 1 ? "border-emerald-500/20 bg-emerald-500/[0.03]" :
                "border-neon-purple/20 bg-neon-purple/[0.03]"
              }`}
            >
              <div className="flex flex-wrap gap-1.5 mb-3">
                {combo.chips.map((chip: string) => (
                  <span
                    key={chip}
                    className={`rounded-full border px-2 py-0.5 text-xs font-medium ${
                      idx === 0 ? "bg-neon-cyan/10 text-neon-cyan border-neon-cyan/20" :
                      idx === 1 ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" :
                      "bg-neon-purple/10 text-neon-purple-light border-neon-purple/20"
                    }`}
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
          {t("bestPractices.toneStacking.noteBefore")}
          &quot;{t("bestPractices.toneStacking.noteQuote")}&quot;
          {t("bestPractices.toneStacking.noteAfter")}
        </p>
      </section>

      <SectionDivider />

      {/* ── PERSONA MULTIPLIER ────────────────────────────────────── */}
      <section id="persona-multiplier" className="scroll-mt-24">
        <h2>{t("bestPractices.personaMultiplier.title")}</h2>
        <p>
          {t("bestPractices.personaMultiplier.textBefore")}
          <strong>{t("bestPractices.personaMultiplier.textStrong")}</strong>
          {t("bestPractices.personaMultiplier.textAfter")}
        </p>

        <div className="my-5 overflow-x-auto rounded-xl border border-white/[0.07]">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/[0.07] bg-white/[0.03]">
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-rose-400">{t("bestPractices.personaMultiplier.table.weak")}</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-emerald-400">{t("bestPractices.personaMultiplier.table.strong")}</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">{t("bestPractices.personaMultiplier.table.why")}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {tableRows.map((row, idx) => (
                <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-4 py-3 text-xs text-rose-400/80">{row.weak}</td>
                  <td className="px-4 py-3 text-xs text-slate-300">{row.strong}</td>
                  <td className="px-4 py-3 text-xs text-slate-500">{row.why}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-slate-400 text-sm">
          {t("bestPractices.personaMultiplier.noteBefore")}
          <strong>{t("bestPractices.personaMultiplier.noteStrong1")}</strong>
          {t("bestPractices.personaMultiplier.notePlus")}
          <strong>{t("bestPractices.personaMultiplier.noteStrong2")}</strong>
          {t("bestPractices.personaMultiplier.notePlus")}
          <strong>{t("bestPractices.personaMultiplier.noteStrong3")}</strong>
          {t("bestPractices.personaMultiplier.noteAfter")}
        </p>
      </section>

      <SectionDivider />

      {/* ── RULES THAT ALWAYS WORK ────────────────────────────────── */}
      <section id="rules-that-work" className="scroll-mt-24">
        <h2>{t("bestPractices.universalRules.title")}</h2>
        <p>
          {t("bestPractices.universalRules.text")}
        </p>

        <div className="my-5 space-y-3">
          {universalRules.map((item, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-5"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-0.5 w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                  <span className="text-xs font-bold text-emerald-400">{idx + 1}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-slate-200 text-sm mb-1">
                    {item.rule}
                  </p>
                  <p className="text-xs text-slate-500 mb-3">{item.detail}</p>
                  <div className="rounded-lg border border-emerald-500/10 bg-emerald-500/[0.04] px-4 py-2.5">
                    <p className="text-xs text-slate-500 mb-1 font-semibold uppercase tracking-wider">
                      {t("bestPractices.universalRules.copyReadyLabel")}
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
        <h2>{t("bestPractices.antiPatterns.title")}</h2>
        <p>
          {t("bestPractices.antiPatterns.text")}
        </p>

        <div className="my-5 space-y-3">
          {antiPatterns.map((item, idx) => (
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

        <CodeBlock language="markdown" filename={t("bestPractices.antiPatterns.checklistFilename")}>
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
          {t("bestPractices.bottomNav.label")}
        </p>
        <Link
          href="/generate"
          className="font-semibold text-white hover:text-neon-cyan transition-colors"
        >
          {t("bestPractices.bottomNav.link")}
        </Link>
      </div>

    </article>
  );
}

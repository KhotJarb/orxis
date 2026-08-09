"use client";

import { useT } from "@/i18n";
import Callout, {
  CodeBlock,
  InlineCode,
  SectionDivider,
  Step,
} from "@/components/docs/DocsComponents";

export default function DocsTweaking() {
  const t = useT("docs");
  return (
    <article className="docs-prose w-full max-w-3xl">

      {/* ── Page badge ───────────────────────────────────────────── */}
      <div className="mb-3 flex items-center gap-2">
        <span className="rounded-full border border-neon-purple/30 bg-neon-purple/10 px-3 py-0.5 text-xs font-semibold text-neon-purple-light">
          {t("tweaking.badge")}
        </span>
        <span className="text-slate-700">/</span>
        <span className="text-xs text-slate-500">{t("tweaking.badgeLabel")}</span>
      </div>

      {/* ── H1 ───────────────────────────────────────────────────── */}
      <h1 id="tweaking-refinement" className="scroll-mt-24">
        {t("tweaking.title")}
      </h1>

      <p>
        {t("tweaking.intro1Start")}
        <strong> {t("tweaking.intro1Mid")}</strong> {t("tweaking.intro1End")}
      </p>
      <p>
        {t("tweaking.intro2Start")} <strong>{t("tweaking.intro2Mid")}</strong>{t("tweaking.intro2End")}
      </p>

      <SectionDivider />

      {/* ── BUTTERFLY EFFECT ──────────────────────────────────────── */}
      <section id="butterfly-effect" className="scroll-mt-24">
        <h2>{t("tweaking.butterfly.title")}</h2>
        <p>
          {t("tweaking.butterfly.p1Start")} <strong>{t("tweaking.butterfly.p1Mid1")}</strong>{" "}
          {t("tweaking.butterfly.p1Mid2")} <strong>{t("tweaking.butterfly.p1End")}</strong>
        </p>
        <p>
          {t("tweaking.butterfly.p2")}
        </p>

        <div className="my-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-rose-500/20 bg-rose-500/[0.04] p-5">
            <p className="mb-2 text-xs font-bold uppercase tracking-wider text-rose-400">
              {t("tweaking.butterfly.beforeTitle")}
            </p>
            <p className="font-mono text-sm text-slate-300 leading-relaxed">
              &quot;{t("tweaking.butterfly.beforeCode1")}{" "}
              <span className="rounded bg-rose-500/20 px-1 text-rose-300 font-bold">
                HELP
              </span>{" "}
              {t("tweaking.butterfly.beforeCode2")}&quot;
            </p>
            <p className="mt-4 text-xs text-slate-500">
              {t("tweaking.butterfly.beforeResultStart")} <em>{t("tweaking.butterfly.beforeResultMid")}</em>{t("tweaking.butterfly.beforeResultEnd")}
            </p>
          </div>
          <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/[0.04] p-5">
            <p className="mb-2 text-xs font-bold uppercase tracking-wider text-emerald-400">
              {t("tweaking.butterfly.afterTitle")}
            </p>
            <p className="font-mono text-sm text-slate-300 leading-relaxed">
              &quot;{t("tweaking.butterfly.afterCode1")}{" "}
              <span className="rounded bg-emerald-500/20 px-1 text-emerald-300 font-bold">
                ARCHITECT
              </span>{" "}
              {t("tweaking.butterfly.afterCode2")}{" "}
              <span className="rounded bg-emerald-500/20 px-1 text-emerald-300 font-bold">
                ENFORCE
              </span>{" "}
              {t("tweaking.butterfly.afterCode3")}&quot;
            </p>
            <p className="mt-4 text-xs text-slate-500">
              {t("tweaking.butterfly.afterResult")}
            </p>
          </div>
        </div>

        <p>
          {t("tweaking.butterfly.p3Start")} <InlineCode>HELP</InlineCode> {t("tweaking.butterfly.p3Mid1")}
          <InlineCode>ARCHITECT</InlineCode> {t("tweaking.butterfly.p3Mid2")}{" "}
          <InlineCode>ENFORCE</InlineCode> {t("tweaking.butterfly.p3End")}
        </p>
      </section>

      <SectionDivider />

      {/* ── SECTION BY SECTION GUIDE ──────────────────────────────── */}
      <section id="section-by-section" className="scroll-mt-24">
        <h2>{t("tweaking.sectionGuide.title")}</h2>
        <p>
          {t("tweaking.sectionGuide.desc")}
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
                  {t("tweaking.sectionGuide.sec1.title")}
                </h3>
                <p className="text-sm text-slate-400 mb-3">
                  {t("tweaking.sectionGuide.sec1.descStart")} <em>{t("tweaking.sectionGuide.sec1.descMid")}</em> {t("tweaking.sectionGuide.sec1.descEnd")}
                </p>
                <ul className="space-y-2 text-sm text-slate-400">
                  <li>
                    <strong className="text-slate-300">{t("tweaking.sectionGuide.sec1.point1Start")}</strong> —
                    {t("tweaking.sectionGuide.sec1.point1End")}
                  </li>
                  <li>
                    <strong className="text-slate-300">{t("tweaking.sectionGuide.sec1.point2Start")}</strong> —
                    {t("tweaking.sectionGuide.sec1.point2End")}
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
                  {t("tweaking.sectionGuide.sec2.title")}
                </h3>
                <p className="text-sm text-slate-400 mb-3">
                  {t("tweaking.sectionGuide.sec2.desc")}
                </p>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  {[
                    [t("tweaking.sectionGuide.sec2.swap1"), t("tweaking.sectionGuide.sec2.effect1")],
                    [t("tweaking.sectionGuide.sec2.swap2"), t("tweaking.sectionGuide.sec2.effect2")],
                    [t("tweaking.sectionGuide.sec2.swap3"), t("tweaking.sectionGuide.sec2.effect3")],
                    [t("tweaking.sectionGuide.sec2.swap4"), t("tweaking.sectionGuide.sec2.effect4")],
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
                  {t("tweaking.sectionGuide.sec3.title")}
                </h3>
                <p className="text-sm text-slate-400 mb-2">
                  {t("tweaking.sectionGuide.sec3.descStart")} <InlineCode>{`<self_reflection>`}</InlineCode> {t("tweaking.sectionGuide.sec3.descEnd")}
                </p>
                <ul className="space-y-1.5 text-sm text-slate-400">
                  <li>→ {t("tweaking.sectionGuide.sec3.li1Start")}<InlineCode>any</InlineCode>{t("tweaking.sectionGuide.sec3.li1Mid")}<InlineCode>undefined</InlineCode>)&quot;</li>
                  <li>→ {t("tweaking.sectionGuide.sec3.li2")}</li>
                  <li>→ {t("tweaking.sectionGuide.sec3.li3")}</li>
                </ul>
                <p className="text-sm text-slate-500 mt-2">
                  {t("tweaking.sectionGuide.sec3.note")}
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
                  {t("tweaking.sectionGuide.sec4.title")}
                </h3>
                <p className="text-sm text-slate-400">
                  {t("tweaking.sectionGuide.sec4.desc")}
                </p>
                <ul className="space-y-1.5 text-sm text-slate-400 mt-2">
                  <li>→ <strong className="text-slate-300">{t("tweaking.sectionGuide.sec4.li1Start")}</strong>: {t("tweaking.sectionGuide.sec4.li1Mid1")}<InlineCode>.tsx</InlineCode>, <InlineCode>.ts</InlineCode>{t("tweaking.sectionGuide.sec4.li1Mid2")}<InlineCode>package.json</InlineCode>{t("tweaking.sectionGuide.sec4.li1End")}</li>
                  <li>→ <strong className="text-slate-300">{t("tweaking.sectionGuide.sec4.li2Start")}</strong>: {t("tweaking.sectionGuide.sec4.li2End")}</li>
                  <li>→ <strong className="text-slate-300">{t("tweaking.sectionGuide.sec4.li3Start")}</strong>: {t("tweaking.sectionGuide.sec4.li3End")}</li>
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
                  {t("tweaking.sectionGuide.sec5.title")}
                </h3>
                <p className="text-sm text-slate-400 mb-2">
                  {t("tweaking.sectionGuide.sec5.desc")}
                </p>
                <ul className="space-y-1.5 text-sm text-slate-400">
                  <li>→ <strong className="text-slate-300">{t("tweaking.sectionGuide.sec5.li1Start")}</strong>: {t("tweaking.sectionGuide.sec5.li1Mid1")}<InlineCode>var</InlineCode>{t("tweaking.sectionGuide.sec5.li1Mid2")}<InlineCode>const</InlineCode>{t("tweaking.sectionGuide.sec5.li1Mid3")}<InlineCode>let</InlineCode>&quot;</li>
                  <li>→ <strong className="text-slate-300">{t("tweaking.sectionGuide.sec5.li2Start")}</strong>: {t("tweaking.sectionGuide.sec5.li2End")}</li>
                  <li>→ <strong className="text-slate-300">{t("tweaking.sectionGuide.sec5.li3Start")}</strong>: {t("tweaking.sectionGuide.sec5.li3Mid1")}<InlineCode>any</InlineCode>{t("tweaking.sectionGuide.sec5.li3End")}</li>
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
                  {t("tweaking.sectionGuide.sec6.title")}
                </h3>
                <p className="text-sm text-slate-400">
                  {t("tweaking.sectionGuide.sec6.desc")}
                </p>
                <ul className="space-y-1.5 text-sm text-slate-400 mt-2">
                  <li>→ {t("tweaking.sectionGuide.sec6.li1Start")}<InlineCode>##</InlineCode>{t("tweaking.sectionGuide.sec6.li1Mid")}<InlineCode>###</InlineCode>{t("tweaking.sectionGuide.sec6.li1End")}</li>
                  <li>→ {t("tweaking.sectionGuide.sec6.li2Start")}<InlineCode>```typescript</InlineCode>)&quot;</li>
                  <li>→ {t("tweaking.sectionGuide.sec6.li3")}</li>
                  <li>→ {t("tweaking.sectionGuide.sec6.li4Start")}<InlineCode>⚡ Next Steps</InlineCode>{t("tweaking.sectionGuide.sec6.li4End")}</li>
                </ul>
              </div>
            </div>
          </div>

        </div>
      </section>

      <SectionDivider />

      {/* ── QUICK TWEAK BUTTONS ───────────────────────────────────── */}
      <section id="quick-tweak-buttons" className="scroll-mt-24">
        <h2>{t("tweaking.quickTweak.title")}</h2>
        <p>
          {t("tweaking.quickTweak.p1Start")} <InlineCode>/api/tweak</InlineCode>{" "}
          {t("tweaking.quickTweak.p1Mid1")} <InlineCode>tweak_type</InlineCode>{t("tweaking.quickTweak.p1End")}
        </p>

        <div className="my-5 space-y-3">
          <Step number={1} title={t("tweaking.quickTweak.step1.title")}>
            {t("tweaking.quickTweak.step1.descStart")} <InlineCode>tweak_type: &quot;shorter&quot;</InlineCode>{t("tweaking.quickTweak.step1.descEnd")}
          </Step>
          <Step number={2} title={t("tweaking.quickTweak.step2.title")}>
            {t("tweaking.quickTweak.step2.descStart")} <InlineCode>tweak_type: &quot;more_professional&quot;</InlineCode>{t("tweaking.quickTweak.step2.descEnd")}
          </Step>
          <Step number={3} title={t("tweaking.quickTweak.step3.title")}>
            {t("tweaking.quickTweak.step3.descStart")} <InlineCode>tweak_type: &quot;add_output_format&quot;</InlineCode>{t("tweaking.quickTweak.step3.descMid")}{" "}
            <InlineCode>⚡ Next Steps</InlineCode> {t("tweaking.quickTweak.step3.descEnd")}
          </Step>
        </div>

        <p className="mt-4 font-semibold text-slate-300">
          {t("tweaking.quickTweak.exampleSubtitle")}
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

        <Callout variant="tip" title={t("tweaking.quickTweak.highestRoi.title")}>
          <p>
            {t("tweaking.quickTweak.highestRoi.descStart")}
            <strong>{t("tweaking.quickTweak.highestRoi.sec2")}</strong>{t("tweaking.quickTweak.highestRoi.descMid1")}
            <InlineCode>assist</InlineCode> {t("tweaking.quickTweak.highestRoi.descMid2")}{" "}
            <InlineCode>architect</InlineCode>{t("tweaking.quickTweak.highestRoi.descMid3")}{" "}
            <InlineCode>suggest</InlineCode> {t("tweaking.quickTweak.highestRoi.descMid4")}{" "}
            <InlineCode>mandate</InlineCode> {t("tweaking.quickTweak.highestRoi.descEnd")}
          </p>
        </Callout>

        <Callout variant="warning" title={t("tweaking.quickTweak.warning.title")}>
          <p>
            {t("tweaking.quickTweak.warning.descStart")} <strong>{t("tweaking.quickTweak.warning.descMid1")}</strong>{" "}
            {t("tweaking.quickTweak.warning.descMid2")} <strong>{t("tweaking.quickTweak.warning.descMid3")}</strong>{" "}
            {t("tweaking.quickTweak.warning.descEnd")}
          </p>
        </Callout>
      </section>

      <SectionDivider />

      {/* ── MANUAL EDITING TIPS ───────────────────────────────────── */}
      <section id="manual-editing-tips" className="scroll-mt-24">
        <h2>{t("tweaking.manual.title")}</h2>
        <p>
          {t("tweaking.manual.desc")}
        </p>

        <div className="my-5 space-y-3">
          <Step number={1} title={t("tweaking.manual.step1.title")}>
            {t("tweaking.manual.step1.descStart")} <InlineCode>---</InlineCode>{" "}
            {t("tweaking.manual.step1.descEnd")}
          </Step>
          <Step number={2} title={t("tweaking.manual.step2.title")}>
            {t("tweaking.manual.step2.desc")}
          </Step>
          <Step number={3} title={t("tweaking.manual.step3.title")}>
            {t("tweaking.manual.step3.desc")}
          </Step>
          <Step number={4} title={t("tweaking.manual.step4.title")}>
            {t("tweaking.manual.step4.desc")}
          </Step>
        </div>
      </section>

      {/* ── Bottom nav ────────────────────────────────────────────── */}
      <div className="mt-12 flex items-center justify-between rounded-xl border border-white/[0.07] bg-white/[0.02] p-5">
        <div>
          <p className="text-xs uppercase tracking-wider text-slate-600 mb-1">
            {t("tweaking.next")}
          </p>
          <p className="font-semibold text-white">
            {t("tweaking.nextLink")}
          </p>
        </div>
      </div>

    </article>
  );
}

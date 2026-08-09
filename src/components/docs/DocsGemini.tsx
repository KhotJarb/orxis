"use client";

import Callout, {
  CodeBlock,
  InlineCode,
  SectionDivider,
  Step,
} from "@/components/docs/DocsComponents";
import Link from "next/link";
import { useT } from "@/i18n";

export default function DocsGemini() {
  const t = useT("docs");
  return (
    <article className="docs-prose w-full max-w-3xl">

      {/* Badge */}
      <div className="mb-3 flex items-center gap-2">
        <span className="rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-0.5 text-xs font-semibold text-blue-400">
          {t("gemini.badge")}
        </span>
        <span className="text-slate-700">/</span>
        <span className="text-xs text-slate-500">Gemini</span>
      </div>

      <h1 id="gemini" className="scroll-mt-24">
        {t("gemini.title")}
      </h1>

      <p>
        {t("gemini.intro1Before")}{" "}
        <strong>Gemini 2.5 Flash</strong> {t("gemini.intro1And")}{" "}
        <strong>Gemini 2.5 Pro</strong> {t("gemini.intro1Mid")}{" "}
        <strong>{t("gemini.intro1Section5")}</strong> {t("gemini.intro1And")}{" "}
        <strong>{t("gemini.intro1Section6")}</strong>{" "}
        {t("gemini.intro1After")}
      </p>
      <p>
        {t("gemini.intro2")}
      </p>

      <SectionDivider />

      {/* WHY GEMINI EXCELS */}
      <section id="why-gemini-excels" className="scroll-mt-24">
        <h2>{t("gemini.whyExcelsTitle")}</h2>
        <p>
          {t("gemini.whyExcelsPara")}
        </p>

        <div className="my-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {[
            {
              section: t("gemini.cards.boundariesTitle"),
              strength: t("gemini.cards.boundariesDesc"),
              color: "border-blue-500/20 bg-blue-500/[0.04]",
              badge: t("gemini.cards.boundariesBadge"),
              originalBadge: "Very Strong"
            },
            {
              section: t("gemini.cards.formatTitle"),
              strength: t("gemini.cards.formatDesc"),
              color: "border-sky-500/20 bg-sky-500/[0.04]",
              badge: t("gemini.cards.formatBadge"),
              originalBadge: "Very Strong"
            },
            {
              section: t("gemini.cards.missionTitle"),
              strength: t("gemini.cards.missionDesc"),
              color: "border-indigo-500/20 bg-indigo-500/[0.04]",
              badge: t("gemini.cards.missionBadge"),
              originalBadge: "Strong"
            },
            {
              section: t("gemini.cards.roleTitle"),
              strength: t("gemini.cards.roleDesc"),
              color: "border-slate-500/20 bg-slate-500/[0.04]",
              badge: t("gemini.cards.roleBadge"),
              originalBadge: "Good"
            },
          ].map((item) => (
            <div key={item.section} className={`rounded-lg border p-4 ${item.color}`}>
              <div className="flex items-start justify-between gap-2 mb-2">
                <p className="text-sm font-semibold text-slate-200">{item.section}</p>
                <span className={`flex-shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${
                  item.originalBadge === "Very Strong"
                    ? "bg-blue-500/20 text-blue-400"
                    : item.originalBadge === "Strong"
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

        <Callout variant="tip" title={t("gemini.tempRecTitle")}>
          <p>
            {t("gemini.tempRecBefore")} <InlineCode>0.2</InlineCode>
            {t("gemini.tempRecMid1")}
            <InlineCode>0.3</InlineCode> {t("gemini.tempRecMid2")} Gemini 2.5 Flash at{" "}
            <InlineCode>temperature=0.3</InlineCode> {t("gemini.tempRecAfter")}
          </p>
        </Callout>
      </section>

      <SectionDivider />

      {/* AI STUDIO */}
      <section id="ai-studio" className="scroll-mt-24">
        <h2>{t("gemini.aiStudioTitle")}</h2>
        <p>
          {t("gemini.aiStudioBefore")}
          <a
            href="https://aistudio.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neon-cyan"
          >
            Google AI Studio
          </a>{" "}
          {t("gemini.aiStudioMid")}{" "}
          <strong>{t("gemini.aiStudioStrong")}</strong> {t("gemini.aiStudioAfter")}
        </p>

        <div className="my-5 space-y-3">
          <Step number={1} title={t("gemini.aiStudioSteps.step1Title")}>
            {t("gemini.aiStudioSteps.step1Before")}{" "}
            <a href="https://aistudio.google.com" target="_blank" rel="noopener noreferrer" className="text-neon-cyan">
              aistudio.google.com
            </a>
            {t("gemini.aiStudioSteps.step1Mid1")} <InlineCode>Create new</InlineCode> {t("gemini.aiStudioSteps.step1Mid2")}{" "}
            <InlineCode>New prompt</InlineCode>{t("gemini.aiStudioSteps.step1After")}
          </Step>
          <Step number={2} title={t("gemini.aiStudioSteps.step2Title")}>
            {t("gemini.aiStudioSteps.step2Before")}{" "}
            <InlineCode>System instructions</InlineCode> {t("gemini.aiStudioSteps.step2After")}
          </Step>
          <Step number={3} title={t("gemini.aiStudioSteps.step3Title")}>
            {t("gemini.aiStudioSteps.step3Desc")}
          </Step>
          <Step number={4} title={t("gemini.aiStudioSteps.step4Title")}>
            {t("gemini.aiStudioSteps.step4Before")}{" "}
            <strong>Gemini 2.5 Flash</strong> {t("gemini.aiStudioSteps.step4Mid1")}{" "}
            <InlineCode>0.3</InlineCode>{t("gemini.aiStudioSteps.step4Mid2")}{" "}
            <InlineCode>Save</InlineCode> {t("gemini.aiStudioSteps.step4Mid3")} <InlineCode>Save as</InlineCode> {t("gemini.aiStudioSteps.step4After")}
          </Step>
        </div>

        <Callout variant="note" title={t("gemini.freeExportTitle")}>
          <p>
            {t("gemini.freeExportBefore")} <strong>{t("gemini.freeExportStrong")}</strong> {t("gemini.freeExportAfter")}
          </p>
        </Callout>
      </section>

      <SectionDivider />

      {/* GEMINI ADVANCED */}
      <section id="gemini-advanced" className="scroll-mt-24">
        <h2>{t("gemini.advancedTitle")}</h2>
        <p>
          {t("gemini.advancedBefore")}{" "}
          <strong>{t("gemini.advancedStrong")}</strong> {t("gemini.advancedAfter")}
        </p>

        <h3 className="scroll-mt-24">{t("gemini.method1Title")}</h3>
        <p>
          {t("gemini.method1Before")}{" "}
          <a
            href="https://gemini.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neon-cyan"
          >
            gemini.google.com
          </a>
          {t("gemini.method1Mid")} <kbd className="rounded border border-white/10 bg-white/[0.05] px-1.5 py-0.5 text-xs">Enter</kbd>
          {t("gemini.method1After")}
        </p>

        <Callout variant="warning">
          <p>
            {t("gemini.method1WarningBefore")} <strong>{t("gemini.method1WarningStrong")}</strong> {t("gemini.method1WarningAfter")}
          </p>
        </Callout>

        <h3 className="scroll-mt-24 mt-6">{t("gemini.method2Title")}</h3>
        <p>
          {t("gemini.method2Desc")}
        </p>
        <div className="my-5 space-y-3">
          <Step number={1} title={t("gemini.method2Steps.step1Title")}>
            {t("gemini.method2Steps.step1Before")}{" "}
            <InlineCode>Gem manager</InlineCode> {t("gemini.method2Steps.step1Mid")}{" "}
            <InlineCode>New gem</InlineCode>.
          </Step>
          <Step number={2} title={t("gemini.method2Steps.step2Title")}>
            {t("gemini.method2Steps.step2Before")}{" "}
            <em>{t("gemini.method2Steps.step2Em")}</em>{t("gemini.method2Steps.step2Mid")}{" "}
            <InlineCode>Instructions</InlineCode> {t("gemini.method2Steps.step2After")}
          </Step>
          <Step number={3} title={t("gemini.method2Steps.step3Title")}>
            {t("gemini.method2Steps.step3Before")} <InlineCode>Save</InlineCode>{t("gemini.method2Steps.step3After")}
          </Step>
        </div>
      </section>

      <SectionDivider />

      {/* WORKSPACE INTEGRATION */}
      <section id="gemini-workspace" className="scroll-mt-24">
        <h2>{t("gemini.workspaceTitle")}</h2>
        <p>
          {t("gemini.workspaceBefore")} <strong>{t("gemini.workspaceStrong")}</strong>{" "}
          {t("gemini.workspaceAfter")}
        </p>

        <div className="my-5 rounded-xl border border-white/[0.07] bg-white/[0.02] p-5">
          <p className="text-sm font-semibold text-slate-200 mb-3">{t("gemini.deploymentPath")}</p>
          <div className="space-y-2 text-sm text-slate-400">
            {t.array("gemini.deploymentSteps").map((step, i) => (
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
            {t("gemini.workspaceNoteBefore")}{" "}
            <strong>{t("gemini.workspaceNoteStrong1")}</strong>{", "}
            {t("gemini.workspaceNoteAnd")}{" "}
            <strong>{t("gemini.workspaceNoteStrong2")}</strong>{" "}
            {t("gemini.workspaceNoteAfter")}
          </p>
        </Callout>
      </section>

      <SectionDivider />

      {/* API INTEGRATION */}
      <section id="gemini-api" className="scroll-mt-24">
        <h2>{t("gemini.apiIntegrationTitle")}</h2>
        <p>
          {t("gemini.apiIntegrationBefore")}<InlineCode>google-genai</InlineCode>
          {t("gemini.apiIntegrationMid1")} <InlineCode>system_instruction</InlineCode> {t("gemini.apiIntegrationMid2")}
          <InlineCode>generate_content</InlineCode> {t("gemini.apiIntegrationAfter")}
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

        <Callout variant="tip" title={t("gemini.streamingSupportTitle")}>
          <p>
            {t("gemini.streamingSupportBefore")}{" "}
            <InlineCode>client.models.generate_content_stream()</InlineCode>{" "}
            {t("gemini.streamingSupportAfter")}
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
          <p className="text-xs uppercase tracking-wider text-slate-600 mb-1">{t("gemini.next")}</p>
          <Link
            href="/docs?page=other-llms"
            className="font-semibold text-white hover:text-neon-cyan transition-colors"
          >
            {t("gemini.nextLink")}
          </Link>
        </div>
      </section>
    </article>
  );
}

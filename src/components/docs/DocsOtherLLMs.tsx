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

export default function DocsOtherLLMs() {
  const t = useT("docs");
  const { locale } = useLanguage();
  const [localeData, setLocaleData] = useState<any>(null);

  useEffect(() => {
    import(`@/i18n/locales/${locale}/docs.json`)
      .catch(() => import("@/i18n/locales/en/docs.json"))
      .then((m) => setLocaleData(m.default ?? m));
  }, [locale]);

  type Provider = { name: string; tag: string };
  const providers: Provider[] = localeData?.otherLLMs?.providers ?? [];

  return (
    <article className="docs-prose w-full max-w-3xl">

      {/* ── Page badge ───────────────────────────────────────────── */}
      <div className="mb-3 flex items-center gap-2">
        <span className="rounded-full border border-neon-purple/30 bg-neon-purple/10 px-3 py-0.5 text-xs font-semibold text-neon-purple-light">
          {t("otherLLMs.badge")}
        </span>
        <span className="text-slate-700">/</span>
        <span className="text-xs text-slate-500">Other LLMs</span>
      </div>

      {/* ── H1 ───────────────────────────────────────────────────── */}
      <h1 id="other-llms" className="scroll-mt-24">
        {t("otherLLMs.title")}
      </h1>

      <p>
        {t("otherLLMs.intro1Before")}{" "}
        <strong>{t("otherLLMs.intro1Strong1")}</strong> {t("otherLLMs.intro1Mid")}
        {" "}
        <InlineCode>{`<xml>`}</InlineCode>{t("otherLLMs.intro1StyleTags")}{" "}
        <strong>{t("otherLLMs.intro1Strong2")}</strong> {t("otherLLMs.intro1After")}
      </p>
      <p>
        {t("otherLLMs.intro2Before")} <strong>{t("otherLLMs.intro2Llama")}</strong>, <strong>{t("otherLLMs.intro2Mistral")}</strong>,{" "}
        <strong>{t("otherLLMs.intro2Qwen")}</strong>, {t("otherLLMs.intro2And")}{" "}
        <strong>{t("otherLLMs.intro2DeepSeek")}</strong> {t("otherLLMs.intro2After")}
      </p>

      <Callout variant="tip" title={t("otherLLMs.universalCompatTitle")}>
        <p>
          {t("otherLLMs.universalCompatBefore")}
          {" "}
          <InlineCode>{`<self_reflection>`}</InlineCode> {t("otherLLMs.universalCompatAfter")}
        </p>
      </Callout>

      <SectionDivider />

      {/* ── LOCAL ENVIRONMENTS ───────────────────────────────────── */}
      <section id="local-environments" className="scroll-mt-24">
        <h2>{t("otherLLMs.localEnvTitle")}</h2>
        <p>
          {t("otherLLMs.localEnvBefore")}{" "}
          <a
            href="https://lmstudio.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neon-cyan"
          >
            LM Studio
          </a>{" "}
          {t("otherLLMs.localEnvAnd")}{" "}
          <a
            href="https://ollama.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neon-cyan"
          >
            Ollama
          </a>{" "}
          {t("otherLLMs.localEnvAfter1")}{" "}
          <strong>{t("otherLLMs.localEnvStrong")}</strong> {t("otherLLMs.localEnvAfter2")}
        </p>

        <h3 id="lm-studio" className="scroll-mt-24">LM Studio</h3>
        <div className="space-y-3 my-5">
          <Step number={1} title={t("otherLLMs.lmStudioSteps.step1Title")}>
            {t("otherLLMs.lmStudioSteps.step1Before")} <InlineCode>Chat</InlineCode> {t("otherLLMs.lmStudioSteps.step1After")}
          </Step>
          <Step number={2} title={t("otherLLMs.lmStudioSteps.step2Title")}>
            {t("otherLLMs.lmStudioSteps.step2Before")}{" "}
            <InlineCode>System Prompt</InlineCode> {t("otherLLMs.lmStudioSteps.step2After")}
          </Step>
          <Step number={3} title={t("otherLLMs.lmStudioSteps.step3Title")}>
            {t("otherLLMs.lmStudioSteps.step3Desc")}
          </Step>
          <Step number={4} title={t("otherLLMs.lmStudioSteps.step4Title")}>
            {t("otherLLMs.lmStudioSteps.step4Desc")}
          </Step>
        </div>

        <Callout variant="note">
          <p>
            {t("otherLLMs.lmStudioNoteBefore")}{" "}
            <strong>{t("otherLLMs.lmStudioNoteStrong")}</strong> {t("otherLLMs.lmStudioNoteMid")}{" "}
            <InlineCode>Save Preset</InlineCode> {t("otherLLMs.lmStudioNoteAfter")}
          </p>
        </Callout>

        <h3 id="ollama" className="scroll-mt-24 mt-8">{t("otherLLMs.ollamaTitle")}</h3>
        <p>
          {t("otherLLMs.ollamaParaBefore")}{" "}
          <strong>{t("otherLLMs.ollamaParaStrong")}</strong> {t("otherLLMs.ollamaParaAfter")}
        </p>

        <CodeBlock language="modelfile" filename="Modelfile">
{`FROM llama3

# Paste your Master Custom Instruction below:
SYSTEM """
# 🎭 1. Role & Identity
Assume the role of a Senior TypeScript Engineer...

# 🎯 2. Mission & Objective
Your mission is to review, optimize, and generate production-ready...

# 🧠 3. The Cognitive Loop (Internal Reflection)
Before answering, you MUST use <self_reflection> tags to think internally...

[... rest of your generated instruction ...]
"""`}
        </CodeBlock>

        <div className="space-y-3 my-5">
          <Step number={1} title={t("otherLLMs.ollamaSteps.step1Title")}>
            {t("otherLLMs.ollamaSteps.step1Before")}{" "}
            <InlineCode>Modelfile</InlineCode> {t("otherLLMs.ollamaSteps.step1After")}
          </Step>
          <Step number={2} title={t("otherLLMs.ollamaSteps.step2Title")}>
            <span>
              {t("otherLLMs.ollamaSteps.step2Before")}{" "}
              <InlineCode>ollama create my-expert -f ./Modelfile</InlineCode> {t("otherLLMs.ollamaSteps.step2Mid")}{" "}
              <InlineCode>my-expert</InlineCode>{t("otherLLMs.ollamaSteps.step2After")}
            </span>
          </Step>
          <Step number={3} title={t("otherLLMs.ollamaSteps.step3Title")}>
            <span>
              {t("otherLLMs.ollamaSteps.step3Before")}{" "}
              <InlineCode>ollama run my-expert</InlineCode>{t("otherLLMs.ollamaSteps.step3After")}
            </span>
          </Step>
        </div>

        <Callout variant="warning">
          <p>
            {t("otherLLMs.ollamaWarningBefore")} (<InlineCode>{`"""`}</InlineCode>
            {t("otherLLMs.ollamaWarningMid")} <InlineCode>{`\\"""`}</InlineCode>{" "}
            {t("otherLLMs.ollamaWarningAfter")}
          </p>
        </Callout>
      </section>

      <SectionDivider />

      {/* ── API INTEGRATION ──────────────────────────────────────── */}
      <section id="api-integration" className="scroll-mt-24">
        <h2>{t("otherLLMs.apiIntegrationTitle")}</h2>
        <p>
          {t("otherLLMs.apiIntegrationBefore")}{" "}
          <strong>{t("otherLLMs.apiIntegrationOpenAI")}</strong>, <strong>{t("otherLLMs.apiIntegrationDeepSeek")}</strong>,{" "}
          <strong>{t("otherLLMs.apiIntegrationGroq")}</strong>, <strong>{t("otherLLMs.apiIntegrationTogether")}</strong>, {t("otherLLMs.apiIntegrationOr")}{" "}
          <InlineCode>messages</InlineCode> {t("otherLLMs.apiIntegrationMid")}{" "}
          <InlineCode>system</InlineCode>{t("otherLLMs.apiIntegrationAfter")}
        </p>

        <h3 id="messages-format" className="scroll-mt-24">
          {t("otherLLMs.messagesFormatTitle")}
        </h3>
        <p>
          {t("otherLLMs.messagesFormatBefore")}{" "}
          <strong>{t("otherLLMs.messagesFormatStrong")}</strong> {t("otherLLMs.messagesFormatMid")}{" "}
          <InlineCode>system</InlineCode> {t("otherLLMs.messagesFormatAfter")}
        </p>

        <CodeBlock language="json" filename="POST /v1/chat/completions">
{`{
  "model": "deepseek-chat",
  "temperature": 0.3,
  "messages": [
    {
      "role": "system",
      "content": "# 🎭 1. Role & Identity\\nAssume the role of a Senior TypeScript Engineer holding a PhD in Computer Science...\\n\\n# 🎯 2. Mission & Objective\\nYour mission is to review, optimize, and generate production-ready TypeScript code...\\n\\n# 🧠 3. The Cognitive Loop (Internal Reflection)\\nBefore answering, you MUST use <self_reflection> tags to think internally:\\n1. Create a 5-point evaluation rubric...\\n\\n[... sections 4-6 ...]"
    },
    {
      "role": "user",
      "content": "Review this function for performance issues and security vulnerabilities."
    }
  ]
}`}
        </CodeBlock>

        <Callout variant="important" title={t("otherLLMs.tempSettingTitle")}>
          <p>
            {t("otherLLMs.tempSettingBefore")} <InlineCode>temperature</InlineCode> {t("otherLLMs.tempSettingMid1")}{" "}
            <InlineCode>0.2</InlineCode>{t("otherLLMs.tempSettingMid2")}<InlineCode>0.4</InlineCode> {t("otherLLMs.tempSettingAfter1")}{" "}
            <InlineCode>0.3</InlineCode> {t("otherLLMs.tempSettingAfter2")}
          </p>
        </Callout>

        <h3 id="python-example" className="scroll-mt-24 mt-8">
          {t("otherLLMs.pythonExampleTitle")}
        </h3>
        <p>
          {t("otherLLMs.pythonExampleBefore")}{" "}
          <InlineCode>base_url</InlineCode> {t("otherLLMs.pythonExampleMid")}{" "}
          <InlineCode>api_key</InlineCode> {t("otherLLMs.pythonExampleAfter")}
        </p>

        <CodeBlock language="python" filename="example_integration.py">
{`import openai

# Load your Master Instruction (from the Output Studio copy)
MASTER_INSTRUCTION = """
# 🎭 1. Role & Identity
Assume the role of a Senior TypeScript Engineer...
[... your full generated instruction ...]
"""

client = openai.OpenAI(
    base_url="https://api.deepseek.com",  # or api.groq.com, etc.
    api_key="your-api-key",
)

response = client.chat.completions.create(
    model="deepseek-chat",
    temperature=0.3,
    messages=[
        {"role": "system", "content": MASTER_INSTRUCTION},
        {"role": "user",   "content": "Review this React component for issues."},
    ],
)

print(response.choices[0].message.content)`}
        </CodeBlock>

        <h3 id="compatible-providers" className="scroll-mt-24 mt-8">
          {t("otherLLMs.compatProvidersTitle")}
        </h3>
        <p>
          {t("otherLLMs.compatProvidersParaBefore")}{" "}
          <InlineCode>system</InlineCode> {t("otherLLMs.compatProvidersParaAfter")}
        </p>

        <div className="my-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {providers.map((p, index) => {
            const colors = [
              "border-emerald-500/20 bg-emerald-500/[0.03]",
              "border-neon-cyan/20 bg-neon-cyan/[0.03]",
              "border-neon-purple/20 bg-neon-purple/[0.03]",
              "border-amber-500/20 bg-amber-500/[0.03]",
              "border-rose-500/20 bg-rose-500/[0.03]",
              "border-sky-500/20 bg-sky-500/[0.03]"
            ];
            return (
              <div
                key={p.name}
                className={`rounded-lg border p-4 transition-colors duration-150 hover:border-white/10 ${colors[index % colors.length]}`}
              >
                <p className="font-semibold text-slate-200">{p.name}</p>
                <p className="mt-0.5 text-xs text-slate-500">{p.tag}</p>
              </div>
            );
          })}
        </div>

        {/* Next page nav */}
        <div className="mt-12 rounded-xl border border-white/[0.07] bg-white/[0.02] p-5">
          <p className="text-xs uppercase tracking-wider text-slate-600 mb-1">{t("otherLLMs.next")}</p>
          <Link
            href="/docs?page=prompt-chaining"
            className="font-semibold text-white hover:text-neon-cyan transition-colors"
          >
            {t("otherLLMs.nextLink")}
          </Link>
        </div>
      </section>
    </article>
  );
}

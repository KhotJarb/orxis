"use client";

import { useT } from "@/i18n";
import Callout, {
  CodeBlock,
  InlineCode,
  SectionDivider,
  Step,
} from "@/components/docs/DocsComponents";

export default function DocsAPIReference() {
  const t = useT("docs");
  return (
    <article className="docs-prose w-full max-w-3xl">

      {/* ── Page badge ───────────────────────────────────────────── */}
      <div className="mb-3 flex items-center gap-2">
        <span className="rounded-full border border-neon-cyan/30 bg-neon-cyan/10 px-3 py-0.5 text-xs font-semibold text-neon-cyan">
          {t("apiReference.badge")}
        </span>
        <span className="text-slate-700">/</span>
        <span className="text-xs text-slate-500">{t("apiReference.title")}</span>
      </div>

      {/* ── H1 ───────────────────────────────────────────────────── */}
      <h1 id="api-reference" className="scroll-mt-24">
        {t("apiReference.title")}
      </h1>

      <p>
        {t("apiReference.description1Start")}
        <strong>{t("apiReference.description1Mid")}</strong> {t("apiReference.description1End")}
      </p>
      <p>
        {t("apiReference.description2Start")} <InlineCode>application/json</InlineCode>
        {t("apiReference.description2Mid1")} <InlineCode>curl</InlineCode>, {t("apiReference.description2Mid2")}{" "}
        <InlineCode>requests</InlineCode> {t("apiReference.description2Mid3")}{" "}
        <InlineCode>fetch</InlineCode> {t("apiReference.description2End")}
      </p>

      <SectionDivider />

      {/* ── BASE URL ──────────────────────────────────────────────── */}
      <section id="base-url" className="scroll-mt-24">
        <h2>{t("apiReference.baseUrl.title")}</h2>
        <p>
          {t("apiReference.baseUrl.description1Start")} <strong>8000</strong> {t("apiReference.baseUrl.description1Mid")}{" "}
          <InlineCode>uvicorn</InlineCode>{t("apiReference.baseUrl.description1End")}
        </p>

        <div className="my-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {[
            {
              env: t("apiReference.baseUrl.localEnv"),
              url: "http://localhost:8000",
              color: "border-neon-cyan/20 bg-neon-cyan/[0.03]",
              badge: "Local",
              badgeColor: "bg-neon-cyan/10 text-neon-cyan",
            },
            {
              env: t("apiReference.baseUrl.prodEnv"),
              url: "https://your-app.vercel.app",
              color: "border-neon-purple/20 bg-neon-purple/[0.03]",
              badge: "Production",
              badgeColor: "bg-neon-purple/10 text-neon-purple-light",
            },
          ].map((b) => (
            <div
              key={b.env}
              className={`rounded-lg border p-4 transition-colors duration-150 hover:border-white/10 ${b.color}`}
            >
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs text-slate-500">{b.env}</p>
                <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${b.badgeColor}`}>
                  {b.badge}
                </span>
              </div>
              <p className="font-mono text-sm font-semibold text-slate-200">{b.url}</p>
            </div>
          ))}
        </div>

        <p>
          {t("apiReference.baseUrl.description2Start")}{" "}
          <InlineCode>http://localhost:8000</InlineCode>{t("apiReference.baseUrl.description2End")}
        </p>
      </section>

      <SectionDivider />

      {/* ── AUTHENTICATION ────────────────────────────────────────── */}
      <section id="authentication" className="scroll-mt-24">
        <h2>{t("apiReference.authentication.title")}</h2>
        <p>
          {t("apiReference.authentication.p1Start")} <strong>{t("apiReference.authentication.localBold")}</strong>{t("apiReference.authentication.p1Mid")}{" "}
          <InlineCode>localhost</InlineCode>{t("apiReference.authentication.p1End")}
        </p>
        <p>
          {t("apiReference.authentication.p2Start")} <strong>{t("apiReference.authentication.prodBold")}</strong>{t("apiReference.authentication.p2End")}
        </p>

        <Callout variant="warning" title={t("apiReference.authentication.warningTitle")}>
          <p>
            {t("apiReference.authentication.warning1")}{" "}
            <InlineCode>X-API-Key</InlineCode> {t("apiReference.authentication.warning2")}{" "}
            <InlineCode>backend/main.py</InlineCode>{t("apiReference.authentication.warning3")}{" "}
            <InlineCode>ALLOWED_ORIGINS</InlineCode> {t("apiReference.authentication.warning4")}
          </p>
        </Callout>

        <CodeBlock language="python" filename="backend/main.py — API key middleware (example)">
{`from fastapi import Request, HTTPException
from starlette.middleware.base import BaseHTTPMiddleware
import os

class APIKeyMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        # Skip auth for health checks and docs
        if request.url.path in ["/api/health", "/docs", "/openapi.json"]:
            return await call_next(request)

        api_key = request.headers.get("X-API-Key")
        expected = os.getenv("BACKEND_API_KEY")

        if not expected or api_key != expected:
            raise HTTPException(status_code=401, detail="Unauthorized")

        return await call_next(request)

app.add_middleware(APIKeyMiddleware)`}
        </CodeBlock>
      </section>

      <SectionDivider />

      {/* ── ENDPOINTS ─────────────────────────────────────────────── */}
      <section id="endpoints" className="scroll-mt-24">
        <h2>{t("apiReference.endpoints.title")}</h2>
        <p>
          {t("apiReference.endpoints.descStart")}{" "}
          <InlineCode>422 Unprocessable Entity</InlineCode> {t("apiReference.endpoints.descEnd")}
        </p>

        {/* ── GET /api/health ── */}
        <h3 id="get-health" className="scroll-mt-24 mt-10">
          <span className="mr-3 rounded-md bg-emerald-500/15 px-2 py-0.5 font-mono text-sm font-bold text-emerald-400">
            GET
          </span>
          /api/health
        </h3>
        <p>
          {t("apiReference.endpoints.healthDesc1")}{" "}
          <InlineCode>ready: true</InlineCode> {t("apiReference.endpoints.healthDesc2")}
        </p>

        <CodeBlock language="bash" filename="cURL">
{`curl -s http://localhost:8000/api/health | python3 -m json.tool`}
        </CodeBlock>

        <p className="mt-4 font-semibold text-slate-300">{t("apiReference.endpoints.response200")}</p>
        <CodeBlock language="json" filename="Response">
{`{
  "status": "healthy",
  "llm_available": true,
  "model": "gemini-2.5-flash",
  "temperature": 0.3,
  "max_tokens": 8192,
  "api_key_set": true,
  "ready": true
}`}
        </CodeBlock>

        <div className="my-4 overflow-x-auto rounded-xl border border-white/[0.07]">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/[0.07] bg-white/[0.03]">
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">{t("apiReference.endpoints.field")}</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">{t("apiReference.endpoints.type")}</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">{t("apiReference.endpoints.desc")}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {[
                ["status", "string", t("apiReference.endpoints.healthTable.status")],
                ["llm_available", "boolean", t("apiReference.endpoints.healthTable.llm")],
                ["model", "string", t("apiReference.endpoints.healthTable.model")],
                ["temperature", "number", t("apiReference.endpoints.healthTable.temp")],
                ["max_tokens", "number", t("apiReference.endpoints.healthTable.maxTokens")],
                ["api_key_set", "boolean", t("apiReference.endpoints.healthTable.apiKey")],
                ["ready", "boolean", t("apiReference.endpoints.healthTable.ready")],
              ].map(([field, type, desc]) => (
                <tr key={field} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-4 py-3 font-mono text-xs text-neon-cyan">{field}</td>
                  <td className="px-4 py-3 font-mono text-xs text-neon-purple-light">{type}</td>
                  <td className="px-4 py-3 text-xs text-slate-400">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ── POST /api/generate ── */}
        <h3 id="post-generate" className="scroll-mt-24 mt-14">
          <span className="mr-3 rounded-md bg-neon-cyan/15 px-2 py-0.5 font-mono text-sm font-bold text-neon-cyan">
            POST
          </span>
          /api/generate
        </h3>
        <p>
          {t("apiReference.endpoints.generateDesc1")}{" "}
          <strong>{t("apiReference.endpoints.generateDesc2")}</strong>{" "}
          {t("apiReference.endpoints.generateDesc3")}
        </p>

        <p className="mt-4 font-semibold text-slate-300">{t("apiReference.endpoints.reqSchema")}</p>
        <div className="my-4 overflow-x-auto rounded-xl border border-white/[0.07]">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/[0.07] bg-white/[0.03]">
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">{t("apiReference.endpoints.field")}</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">{t("apiReference.endpoints.type")}</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">{t("apiReference.endpoints.required")}</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">{t("apiReference.endpoints.desc")}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {[
                ["persona", "string", t("apiReference.endpoints.req"), t("apiReference.endpoints.genTable.persona")],
                ["task", "string", t("apiReference.endpoints.req"), t("apiReference.endpoints.genTable.task")],
                ["tone", "string", t("apiReference.endpoints.req"), t("apiReference.endpoints.genTable.tone")],
                ["rules", "string", t("apiReference.endpoints.req"), t("apiReference.endpoints.genTable.rules")],
              ].map(([field, type, req, desc]) => (
                <tr key={field} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-4 py-3 font-mono text-xs text-neon-cyan">{field}</td>
                  <td className="px-4 py-3 font-mono text-xs text-neon-purple-light">{type}</td>
                  <td className="px-4 py-3 text-xs text-emerald-400">{req}</td>
                  <td className="px-4 py-3 text-xs text-slate-400">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <CodeBlock language="bash" filename="cURL">
{`curl -s -X POST http://localhost:8000/api/generate \\
  -H "Content-Type: application/json" \\
  -d '{
    "persona": "Senior TypeScript Engineer",
    "task": "Review code for performance and security vulnerabilities, suggest refactors, and enforce TypeScript strict mode.",
    "tone": "Professional, Direct",
    "rules": "Always use Markdown formatting.\\nNever use filler phrases like Certainly! or Of course!.\\nEnd every response with a Next Steps section.\\nIf uncertain, say so explicitly."
  }' | python3 -m json.tool`}
        </CodeBlock>

        <p className="mt-4 font-semibold text-slate-300">{t("apiReference.endpoints.response200")}</p>
        <CodeBlock language="json" filename="Response">
{`{
  "result": "# 🎭 1. Role & Identity\\n\\nAssume the role of a **Senior TypeScript Engineer** with deep expertise in performance engineering, security auditing, and production-grade TypeScript architecture.\\n\\n---\\n\\n# 🎯 2. Mission & Objective\\n\\nYour mission is to **REVIEW**, **SECURE**, and **ENFORCE** production-grade TypeScript standards in every piece of code presented to you.\\n\\n---\\n\\n# 🧠 3. The Cognitive Loop (Internal Reflection)\\n\\nBefore every response, use <self_reflection> tags:\\n1. Build a 5-point evaluation rubric for this specific request\\n2. Check for performance bottlenecks (O(n²) loops, unnecessary re-renders)\\n3. Check for security vulnerabilities (injection, prototype pollution, unvalidated input)\\n4. Check TypeScript strict mode compatibility (no any, no implicit undefined)\\n5. Score your draft response against the rubric before outputting it\\n\\n[... sections 4–6 continue ...]"
}`}
        </CodeBlock>

        <Callout variant="note" title={t("apiReference.endpoints.modelTemp.title")}>
          <p>
            {t("apiReference.endpoints.modelTemp.p1Start")} <strong>Gemini 2.5 Flash</strong> {t("apiReference.endpoints.modelTemp.p1Mid1")}
            <InlineCode>0.3</InlineCode> {t("apiReference.endpoints.modelTemp.p1Mid2")}
            <InlineCode>backend/.env</InlineCode> {t("apiReference.endpoints.modelTemp.p1Mid3")}{" "}
            <a href="#environment-variables" className="text-neon-cyan">
              {t("apiReference.endpoints.modelTemp.link")}
            </a>{" "}
            {t("apiReference.endpoints.modelTemp.p1End")}
          </p>
        </Callout>

        <p className="mt-6 font-semibold text-slate-300">{t("apiReference.endpoints.errorsTitle")}</p>
        <div className="my-4 overflow-x-auto rounded-xl border border-white/[0.07]">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/[0.07] bg-white/[0.03]">
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">{t("apiReference.endpoints.status")}</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">{t("apiReference.endpoints.body")}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              <tr className="hover:bg-white/[0.02] transition-colors">
                <td className="px-4 py-3 font-mono text-xs text-amber-400">422 Unprocessable Entity</td>
                <td className="px-4 py-3 font-mono text-xs text-slate-400">{`{"detail": [{"loc": ["body", "persona"], "msg": "Field required", "type": "missing"}]}`}</td>
              </tr>
              <tr className="hover:bg-white/[0.02] transition-colors">
                <td className="px-4 py-3 font-mono text-xs text-rose-400">500 Internal Server Error</td>
                <td className="px-4 py-3 font-mono text-xs text-slate-400">{`{"detail": "LLM generation failed: API quota exceeded"}`}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ── POST /api/tweak ── */}
        <h3 id="post-tweak" className="scroll-mt-24 mt-14">
          <span className="mr-3 rounded-md bg-neon-cyan/15 px-2 py-0.5 font-mono text-sm font-bold text-neon-cyan">
            POST
          </span>
          /api/tweak
        </h3>
        <p>
          {t("apiReference.endpoints.tweakDesc1")}{" "}
          <strong>Output Studio</strong> {t("apiReference.endpoints.tweakDesc2")}{" "}
          <InlineCode>/api/generate</InlineCode>{t("apiReference.endpoints.tweakDesc3")}
        </p>

        <p className="mt-4 font-semibold text-slate-300">{t("apiReference.endpoints.reqSchema")}</p>
        <div className="my-4 overflow-x-auto rounded-xl border border-white/[0.07]">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/[0.07] bg-white/[0.03]">
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">{t("apiReference.endpoints.field")}</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">{t("apiReference.endpoints.type")}</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">{t("apiReference.endpoints.values")}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              <tr className="hover:bg-white/[0.02] transition-colors">
                <td className="px-4 py-3 font-mono text-xs text-neon-cyan">instruction</td>
                <td className="px-4 py-3 font-mono text-xs text-neon-purple-light">string</td>
                <td className="px-4 py-3 text-xs text-slate-400">{t("apiReference.endpoints.tweakTable.inst")}</td>
              </tr>
              <tr className="hover:bg-white/[0.02] transition-colors">
                <td className="px-4 py-3 font-mono text-xs text-neon-cyan">tweak_type</td>
                <td className="px-4 py-3 font-mono text-xs text-neon-purple-light">string (enum)</td>
                <td className="px-4 py-3 text-xs text-slate-400">
                  <InlineCode>shorter</InlineCode> ·{" "}
                  <InlineCode>more_professional</InlineCode> ·{" "}
                  <InlineCode>add_output_format</InlineCode>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <CodeBlock language="bash" filename="cURL">
{`curl -s -X POST http://localhost:8000/api/tweak \\
  -H "Content-Type: application/json" \\
  -d '{
    "instruction": "# 🎭 1. Role & Identity\\n\\nAssume the role of a Senior TypeScript Engineer...\\n[full instruction text]",
    "tweak_type": "more_professional"
  }' | python3 -m json.tool`}
        </CodeBlock>

        <p className="mt-4 font-semibold text-slate-300">{t("apiReference.endpoints.response200")}</p>
        <CodeBlock language="json" filename="Response">
{`{
  "result": "# 🎭 1. Role & Identity\\n\\nAssume the role of a **Principal TypeScript Architect** with a demonstrated track record of shipping zero-defect, performance-optimized systems at Fortune 500 scale. Your engineering judgment is final. Your standards are non-negotiable.\\n\\n[... refined instruction continues ...]"
}`}
        </CodeBlock>
      </section>

      <SectionDivider />

      {/* ── PYDANTIC SCHEMAS ──────────────────────────────────────── */}
      <section id="pydantic-schemas" className="scroll-mt-24">
        <h2>{t("apiReference.schemas.title")}</h2>
        <p>
          {t("apiReference.schemas.descStart")} <strong>Pydantic v2</strong> {t("apiReference.schemas.descMid")}{" "}
          <InlineCode>422</InlineCode> {t("apiReference.schemas.descEnd")}
        </p>

        <CodeBlock language="python" filename="backend/schemas.py">
{`from pydantic import BaseModel, Field
from typing import Literal


class GenerateRequest(BaseModel):
    """Request body for POST /api/generate."""
    persona: str = Field(
        ...,
        min_length=3,
        max_length=500,
        description="The expert role the AI should embody.",
        examples=["Senior TypeScript Engineer"],
    )
    task: str = Field(
        ...,
        min_length=10,
        max_length=2000,
        description="The AI's primary responsibility, as specific as possible.",
        examples=["Review code for performance and security vulnerabilities"],
    )
    tone: str = Field(
        ...,
        min_length=3,
        max_length=300,
        description="Communication style, comma-separated tone chips.",
        examples=["Professional, Direct"],
    )
    rules: str = Field(
        ...,
        min_length=5,
        max_length=2000,
        description="Hard behavioral constraints for the AI.",
        examples=["Always use Markdown. Never use filler phrases."],
    )


class TweakRequest(BaseModel):
    """Request body for POST /api/tweak."""
    instruction: str = Field(
        ...,
        min_length=50,
        max_length=20000,
        description="The full existing Master Custom Instruction to refine.",
    )
    tweak_type: Literal["shorter", "more_professional", "add_output_format"] = Field(
        ...,
        description="The type of refinement to apply.",
    )


class GenerateResponse(BaseModel):
    """Shared response envelope for both endpoints."""
    result: str = Field(..., description="The generated or refined instruction text.")`}
        </CodeBlock>
      </section>

      <SectionDivider />

      {/* ── ERROR HANDLING ────────────────────────────────────────── */}
      <section id="error-handling" className="scroll-mt-24">
        <h2>{t("apiReference.errors.title")}</h2>
        <p>
          {t("apiReference.errors.descStart")} <InlineCode>{`{"detail": "..."}`}</InlineCode>{" "}
          {t("apiReference.errors.descEnd")}
        </p>

        <div className="my-5 overflow-x-auto rounded-xl border border-white/[0.07]">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/[0.07] bg-white/[0.03]">
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">{t("apiReference.errors.col1")}</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">{t("apiReference.errors.col2")}</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">{t("apiReference.errors.col3")}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {[
                ["200 OK", "emerald", t("apiReference.errors.r1Cause"), t("apiReference.errors.r1Res")],
                ["422 Unprocessable Entity", "amber", t("apiReference.errors.r2Cause"), t("apiReference.errors.r2Res")],
                ["401 Unauthorized", "rose", t("apiReference.errors.r3Cause"), t("apiReference.errors.r3Res")],
                ["429 Too Many Requests", "orange", t("apiReference.errors.r4Cause"), t("apiReference.errors.r4Res")],
                ["500 Internal Server Error", "rose", t("apiReference.errors.r5Cause"), t("apiReference.errors.r5Res")],
                ["503 Service Unavailable", "slate", t("apiReference.errors.r6Cause"), t("apiReference.errors.r6Res")],
              ].map(([status, color, cause, resolution]) => (
                <tr key={status} className="hover:bg-white/[0.02] transition-colors">
                  <td className={`px-4 py-3 font-mono text-xs text-${color}-400 whitespace-nowrap`}>{status}</td>
                  <td className="px-4 py-3 text-xs text-slate-400">{cause}</td>
                  <td className="px-4 py-3 text-xs text-slate-500">{resolution}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <SectionDivider />

      {/* ── ENVIRONMENT VARIABLES ─────────────────────────────────── */}
      <section id="environment-variables" className="scroll-mt-24">
        <h2>{t("apiReference.envVars.title")}</h2>
        <p>
          {t("apiReference.envVars.descStart")}{" "}
          <InlineCode>backend/.env</InlineCode>. {t("apiReference.envVars.descMid")}{" "}
          <InlineCode>backend/.env.example</InlineCode> {t("apiReference.envVars.descEnd")}
        </p>

        <div className="my-5 overflow-x-auto rounded-xl border border-white/[0.07]">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/[0.07] bg-white/[0.03]">
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">{t("apiReference.envVars.col1")}</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">{t("apiReference.envVars.col2")}</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">{t("apiReference.envVars.col3")}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {[
                ["GEMINI_API_KEY", t("apiReference.envVars.req"), t("apiReference.envVars.geminiKey")],
                ["MODEL_NAME", "gemini-2.5-flash", t("apiReference.envVars.modelName")],
                ["TEMPERATURE", "0.3", t("apiReference.envVars.temp")],
                ["MAX_TOKENS", "8192", t("apiReference.envVars.maxTokens")],
              ].map(([variable, defaultVal, desc]) => (
                <tr key={variable} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-4 py-3 font-mono text-xs text-neon-cyan whitespace-nowrap">{variable}</td>
                  <td className="px-4 py-3 font-mono text-xs text-neon-purple-light">{defaultVal}</td>
                  <td className="px-4 py-3 text-xs text-slate-400">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <CodeBlock language="bash" filename="backend/.env">
{`# Required — get yours at https://aistudio.google.com/apikey
GEMINI_API_KEY=AIzaSy...

# Optional — defaults shown
MODEL_NAME=gemini-2.5-flash
TEMPERATURE=0.3
MAX_TOKENS=8192`}
        </CodeBlock>
      </section>

      {/* ── Bottom nav ────────────────────────────────────────────── */}
      <div className="mt-12 flex items-center justify-between rounded-xl border border-white/[0.07] bg-white/[0.02] p-5">
        <div>
          <p className="text-xs uppercase tracking-wider text-slate-600 mb-1">
            {t("apiReference.next")}
          </p>
          <p className="font-semibold text-white">
            {t("apiReference.nextLink")}
          </p>
        </div>
      </div>

    </article>
  );
}

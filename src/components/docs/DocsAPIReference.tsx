"use client";

import Callout, {
  CodeBlock,
  InlineCode,
  SectionDivider,
  Step,
} from "@/components/docs/DocsComponents";

export default function DocsAPIReference() {
  return (
    <article className="docs-prose w-full max-w-3xl">

      {/* ── Page badge ───────────────────────────────────────────── */}
      <div className="mb-3 flex items-center gap-2">
        <span className="rounded-full border border-neon-cyan/30 bg-neon-cyan/10 px-3 py-0.5 text-xs font-semibold text-neon-cyan">
          Developer Reference
        </span>
        <span className="text-slate-700">/</span>
        <span className="text-xs text-slate-500">API Reference</span>
      </div>

      {/* ── H1 ───────────────────────────────────────────────────── */}
      <h1 id="api-reference" className="scroll-mt-24">
        API Reference
      </h1>

      <p>
        Orxis exposes a clean{" "}
        <strong>FastAPI REST backend</strong> that powers every generation and
        tweak operation. This page documents every endpoint, its request schema,
        expected response format, and relevant error codes — everything you need
        to call the API directly, integrate it into your own tooling, or extend
        it with new routes.
      </p>
      <p>
        All endpoints accept and return <InlineCode>application/json</InlineCode>
        . No special SDK is required — plain <InlineCode>curl</InlineCode>, the{" "}
        <InlineCode>requests</InlineCode> Python library, or{" "}
        <InlineCode>fetch</InlineCode> in the browser all work out of the box.
      </p>

      <SectionDivider />

      {/* ── BASE URL ──────────────────────────────────────────────── */}
      <section id="base-url" className="scroll-mt-24">
        <h2>Base URL</h2>
        <p>
          The backend runs on port <strong>8000</strong> when started locally
          with <InlineCode>uvicorn</InlineCode>. For production Vercel
          deployments, the frontend proxies API calls through Next.js rewrites,
          so the effective base URL is your deployment domain.
        </p>

        <div className="my-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {[
            {
              env: "Local Development",
              url: "http://localhost:8000",
              color: "border-neon-cyan/20 bg-neon-cyan/[0.03]",
              badge: "Local",
              badgeColor: "bg-neon-cyan/10 text-neon-cyan",
            },
            {
              env: "Production (Vercel)",
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
          All examples in this reference use the local base URL{" "}
          <InlineCode>http://localhost:8000</InlineCode>. Replace it with your
          production domain in deployed environments.
        </p>
      </section>

      <SectionDivider />

      {/* ── AUTHENTICATION ────────────────────────────────────────── */}
      <section id="authentication" className="scroll-mt-24">
        <h2>Authentication</h2>
        <p>
          In <strong>local development</strong>, no authentication is required.
          The API trusts all requests from <InlineCode>localhost</InlineCode>.
          This is intentional — you own the machine and the API key never leaves
          your environment.
        </p>
        <p>
          In <strong>production deployments</strong>, you should protect the
          generate and tweak endpoints behind an API key header to prevent
          unauthorized usage that could exhaust your Gemini API quota.
        </p>

        <Callout variant="warning" title="Secure Your Production API">
          <p>
            Before deploying publicly, add an{" "}
            <InlineCode>X-API-Key</InlineCode> middleware to{" "}
            <InlineCode>backend/main.py</InlineCode>. Any unauthenticated caller
            who discovers your production URL can freely consume your Gemini API
            quota. At minimum, add a{" "}
            <InlineCode>ALLOWED_ORIGINS</InlineCode> CORS restriction and an
            environment-variable-driven secret header check.
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
        <h2>Endpoints</h2>
        <p>
          The backend exposes three endpoints: a health probe and two generation
          routes. All POST bodies are validated by Pydantic v2 — sending
          malformed JSON returns a structured{" "}
          <InlineCode>422 Unprocessable Entity</InlineCode> response.
        </p>

        {/* ── GET /api/health ── */}
        <h3 id="get-health" className="scroll-mt-24 mt-10">
          <span className="mr-3 rounded-md bg-emerald-500/15 px-2 py-0.5 font-mono text-sm font-bold text-emerald-400">
            GET
          </span>
          /api/health
        </h3>
        <p>
          Returns the operational status of the API and its connection to the
          configured LLM provider. Use this endpoint as a readiness probe in
          CI/CD pipelines or container orchestration health checks. A{" "}
          <InlineCode>ready: true</InlineCode> response indicates the backend
          is ready to serve generation requests.
        </p>

        <CodeBlock language="bash" filename="cURL">
{`curl -s http://localhost:8000/api/health | python3 -m json.tool`}
        </CodeBlock>

        <p className="mt-4 font-semibold text-slate-300">Response — 200 OK</p>
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
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">Field</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">Type</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {[
                ["status", "string", `"healthy" or "degraded" — reflects API process state`],
                ["llm_available", "boolean", "True if the Gemini client initialized without errors"],
                ["model", "string", "The active model name from MODEL_NAME env var"],
                ["temperature", "number", "Active sampling temperature (0.0 – 1.0)"],
                ["max_tokens", "number", "Maximum output tokens configured"],
                ["api_key_set", "boolean", "True if GEMINI_API_KEY is non-empty"],
                ["ready", "boolean", "Composite flag — true only when all systems are operational"],
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
          The core generation endpoint. Accepts the four wizard inputs and
          returns a fully constructed <strong>Master Custom Instruction</strong>{" "}
          using the 6-section structured meta-prompt framework. The backend
          composes a structured meta-prompt, sends it to Gemini, and streams
          the response back as a single JSON object.
        </p>

        <p className="mt-4 font-semibold text-slate-300">Request Body Schema</p>
        <div className="my-4 overflow-x-auto rounded-xl border border-white/[0.07]">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/[0.07] bg-white/[0.03]">
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">Field</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">Type</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">Required</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {[
                ["persona", "string", "✓ Required", "The expert role the AI should embody (e.g. 'Senior TypeScript Engineer')"],
                ["task", "string", "✓ Required", "What the AI's primary job is — the more specific, the better the output"],
                ["tone", "string", "✓ Required", "Communication style chips, comma-separated (e.g. 'Professional, Direct')"],
                ["rules", "string", "✓ Required", "Hard behavioral constraints, one per line or comma-separated"],
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

        <p className="mt-4 font-semibold text-slate-300">Response — 200 OK</p>
        <CodeBlock language="json" filename="Response">
{`{
  "result": "# 🎭 1. Role & Identity\\n\\nAssume the role of a **Senior TypeScript Engineer** with deep expertise in performance engineering, security auditing, and production-grade TypeScript architecture.\\n\\n---\\n\\n# 🎯 2. Mission & Objective\\n\\nYour mission is to **REVIEW**, **SECURE**, and **ENFORCE** production-grade TypeScript standards in every piece of code presented to you.\\n\\n---\\n\\n# 🧠 3. The Cognitive Loop (Internal Reflection)\\n\\nBefore every response, use <self_reflection> tags:\\n1. Build a 5-point evaluation rubric for this specific request\\n2. Check for performance bottlenecks (O(n²) loops, unnecessary re-renders)\\n3. Check for security vulnerabilities (injection, prototype pollution, unvalidated input)\\n4. Check TypeScript strict mode compatibility (no any, no implicit undefined)\\n5. Score your draft response against the rubric before outputting it\\n\\n[... sections 4–6 continue ...]"
}`}
        </CodeBlock>

        <Callout variant="note" title="Model & Temperature">
          <p>
            The backend uses <strong>Gemini 2.5 Flash</strong> with a
            temperature of <InlineCode>0.3</InlineCode> by default. These values
            are configured for structured, consistent instruction generation.
            To change them, edit <InlineCode>backend/.env</InlineCode> and
            restart the server. See the{" "}
            <a href="#environment-variables" className="text-neon-cyan">
              Environment Variables
            </a>{" "}
            section below.
          </p>
        </Callout>

        <p className="mt-6 font-semibold text-slate-300">Error Responses</p>
        <div className="my-4 overflow-x-auto rounded-xl border border-white/[0.07]">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/[0.07] bg-white/[0.03]">
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">Status</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">Body</th>
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
          Takes an existing Master Custom Instruction and a tweak command, then
          returns a refined version. This endpoint powers the{" "}
          <strong>Output Studio</strong> quick-tweak buttons. Unlike{" "}
          <InlineCode>/api/generate</InlineCode>, it treats the existing
          instruction as the authoritative base and applies a targeted surgical
          modification rather than regenerating from scratch.
        </p>

        <p className="mt-4 font-semibold text-slate-300">Request Body Schema</p>
        <div className="my-4 overflow-x-auto rounded-xl border border-white/[0.07]">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/[0.07] bg-white/[0.03]">
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">Field</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">Type</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">Values</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              <tr className="hover:bg-white/[0.02] transition-colors">
                <td className="px-4 py-3 font-mono text-xs text-neon-cyan">instruction</td>
                <td className="px-4 py-3 font-mono text-xs text-neon-purple-light">string</td>
                <td className="px-4 py-3 text-xs text-slate-400">The full text of the existing generated instruction</td>
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

        <p className="mt-4 font-semibold text-slate-300">Response — 200 OK</p>
        <CodeBlock language="json" filename="Response">
{`{
  "result": "# 🎭 1. Role & Identity\\n\\nAssume the role of a **Principal TypeScript Architect** with a demonstrated track record of shipping zero-defect, performance-optimized systems at Fortune 500 scale. Your engineering judgment is final. Your standards are non-negotiable.\\n\\n[... refined instruction continues ...]"
}`}
        </CodeBlock>
      </section>

      <SectionDivider />

      {/* ── PYDANTIC SCHEMAS ──────────────────────────────────────── */}
      <section id="pydantic-schemas" className="scroll-mt-24">
        <h2>Pydantic Schemas</h2>
        <p>
          The backend uses <strong>Pydantic v2</strong> for request validation.
          These are the exact model definitions — any field that doesn&apos;t
          match these schemas will produce a structured{" "}
          <InlineCode>422</InlineCode> error automatically, before your handler
          code ever runs.
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
        <h2>Error Handling</h2>
        <p>
          All errors follow a consistent <InlineCode>{`{"detail": "..."}`}</InlineCode>{" "}
          envelope, matching FastAPI&apos;s default exception format. This makes
          client-side error handling uniform across all endpoints.
        </p>

        <div className="my-5 overflow-x-auto rounded-xl border border-white/[0.07]">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/[0.07] bg-white/[0.03]">
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">HTTP Status</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">Cause</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">Resolution</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {[
                ["200 OK", "emerald", "Request succeeded", "Proceed with the result field"],
                ["422 Unprocessable Entity", "amber", "Missing or invalid request field (Pydantic validation failure)", "Check the detail array for the exact field and error type"],
                ["401 Unauthorized", "rose", "API key middleware rejected the request (production only)", "Add the X-API-Key header with the correct value from your env"],
                ["429 Too Many Requests", "orange", "Gemini API rate limit hit", "Implement exponential backoff; check your Gemini quota dashboard"],
                ["500 Internal Server Error", "rose", "LLM call failed — invalid API key, quota exceeded, or model error", "Check backend logs; verify GEMINI_API_KEY is valid"],
                ["503 Service Unavailable", "slate", "Backend process is starting up or the Gemini API is unreachable", "Wait and retry; check /api/health for ready: false clues"],
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
        <h2>Environment Variables</h2>
        <p>
          All backend configuration is managed through{" "}
          <InlineCode>backend/.env</InlineCode>. Copy{" "}
          <InlineCode>backend/.env.example</InlineCode> and fill in your values.
          Changes take effect on the next server restart.
        </p>

        <div className="my-5 overflow-x-auto rounded-xl border border-white/[0.07]">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/[0.07] bg-white/[0.03]">
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">Variable</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">Default</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {[
                ["GEMINI_API_KEY", "(required)", "Your Google AI Studio API key. The backend will refuse to start if this is empty."],
                ["MODEL_NAME", "gemini-2.5-flash", "The Gemini model identifier. Swap to gemini-2.0-pro or other variants as needed."],
                ["TEMPERATURE", "0.3", "Sampling temperature (0.0–1.0). Lower values = more deterministic, structured output."],
                ["MAX_TOKENS", "8192", "Maximum output token limit per generation call. Reduce to cut costs on short instructions."],
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
            Next
          </p>
          <p className="font-semibold text-white">
            Tweaking &amp; Refinement →
          </p>
        </div>
      </div>

    </article>
  );
}

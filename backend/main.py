"""
AI Custom Instruction Generator — FastAPI Backend
===================================================
Production-grade API that orchestrates LLM calls via the isolated
LLM Engine service to generate elite-tier Custom Instructions.

Architecture:
    ┌───────────┐     ┌──────────┐     ┌──────────────────┐     ┌─────────┐
    │  Next.js  │────▶│  main.py │────▶│  llm_engine.py   │────▶│ Gemini  │
    │  Frontend │◀────│  (API)   │◀────│  (Meta-Prompt)   │◀────│ API     │
    └───────────┘     └──────────┘     └──────────────────┘     └─────────┘
                        ↓ fallback
                      Local Template Builder

Run:
    pip install -r requirements.txt
    cp .env.example .env   # Add your GEMINI_API_KEY
    uvicorn main:app --reload --port 8000
"""

from __future__ import annotations

import logging
import time

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from dotenv import load_dotenv

import os

# Load .env before anything else
load_dotenv()

# Import the isolated LLM service
from services.llm_engine import (  # noqa: E402
    generate_master_instruction,
    tweak_master_instruction,
    is_llm_available,
    get_model_info,
)


# ──────────────────────────────────────────────────────────────────────────────
# 1. LOGGING
# ──────────────────────────────────────────────────────────────────────────────

LOG = logging.getLogger("ai-cis-engine")
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s │ %(levelname)-7s │ %(name)s │ %(message)s",
    datefmt="%H:%M:%S",
)


# ──────────────────────────────────────────────────────────────────────────────
# 2. FASTAPI APP & MIDDLEWARE
# ──────────────────────────────────────────────────────────────────────────────

app = FastAPI(
    title="AI Custom Instruction Generator",
    description="God-Tier meta-prompting engine for crafting elite AI instructions.",
    version="2.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        os.getenv("FRONTEND_URL", ""),
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ──────────────────────────────────────────────────────────────────────────────
# 3. PYDANTIC MODELS
# ──────────────────────────────────────────────────────────────────────────────


class StepAnswer(BaseModel):
    """A single wizard step's answer from the frontend."""

    selected: list[str] = Field(
        default_factory=list, description="Preset chips the user selected"
    )
    custom: str = Field(default="", description="Free-form text input")


class PromptRequest(BaseModel):
    """Payload from the 4-step wizard."""

    persona: StepAnswer = Field(..., description="Step 1: Expert persona / identity")
    task: StepAnswer = Field(..., description="Step 2: Primary task or goal")
    tone: StepAnswer = Field(..., description="Step 3: Communication style / tone")
    rules: StepAnswer = Field(..., description="Step 4: Rules, constraints, formats")


class TweakRequest(BaseModel):
    """Payload for refining an existing instruction."""

    current_prompt: str = Field(
        ..., min_length=1, description="The instruction to modify"
    )
    tweak_type: str = Field(
        ..., description="Which refinement: shorter | professional | format_rules"
    )


class GeneratedResponse(BaseModel):
    """Standardized response for all generation endpoints."""

    prompt: str = Field(..., description="The generated or tweaked instruction")
    model: str = Field(default="local-fallback", description="Model that produced this")
    tokens_used: int = Field(default=0, description="Approximate output word count")
    latency_ms: int = Field(default=0, description="Generation time in milliseconds")


# ──────────────────────────────────────────────────────────────────────────────
# 4. HELPER FUNCTIONS
# ──────────────────────────────────────────────────────────────────────────────


def format_answer(answer: StepAnswer) -> str:
    """Merge selected presets and custom text into a human-readable string."""
    parts: list[str] = []
    if answer.selected:
        parts.append(", ".join(answer.selected))
    if answer.custom.strip():
        parts.append(answer.custom.strip())
    return " | ".join(parts) if parts else "Not specified"


def build_local_fallback(request: PromptRequest) -> str:
    """
    Deterministic template builder used when the LLM API is unavailable.
    Produces a structured — but less nuanced — Custom Instruction.
    """
    persona = format_answer(request.persona)
    task = format_answer(request.task)
    tone = format_answer(request.tone)
    rules_text = format_answer(request.rules)

    sections: list[str] = []

    sections.append("# 🎭 1. Role & Identity")
    sections.append(
        f"Assume the role of a World-Class {persona} with deep expertise "
        f"in your domain. You approach every interaction with precision, "
        f"professionalism, and a commitment to delivering exceptional results. "
        f"Your knowledge spans both foundational principles and cutting-edge "
        f"developments in the field."
    )
    sections.append("")

    sections.append("# 🎯 2. Mission & Objective")
    sections.append(
        f"Your primary mission is: {task}. Every response must directly serve "
        f"this objective. Prioritize actionable, high-value output over generic "
        f"information. A successful response is one the user can immediately "
        f"apply to their work without further refinement."
    )
    sections.append("")

    sections.append("# 🧠 3. The Cognitive Loop (Internal Reflection)")
    sections.append(
        'Before answering, you MUST use `<self_reflection>` tags to think '
        'internally:\n'
        '1. Create a 5-point evaluation rubric for a flawless response based '
        'on the Mission.\n'
        '2. Draft an internal response and score it against your rubric.\n'
        '3. If the score is not 100/100, iterate internally.\n'
        '4. DO NOT show this `<self_reflection>` process to the user. Output '
        'only the final, perfected response.'
    )
    sections.append("")

    sections.append("# 📥 4. Expected Context & Input")
    sections.append(
        f"You should anticipate receiving queries, documents, code snippets, "
        f"and data related to your domain of expertise. Always ask for "
        f"clarification if the input is ambiguous or missing critical context "
        f"before proceeding with your response."
    )
    sections.append("")

    sections.append("# ⚙️ 5. Strict Boundaries & Execution Rules")
    sections.append("Follow these constraints at all times:")
    if request.rules.selected:
        for rule in request.rules.selected:
            sections.append(f"- {rule}")
    if request.rules.custom.strip():
        for line in request.rules.custom.strip().split("\n"):
            if line.strip():
                sections.append(f"- {line.strip()}")
    sections.append("- NEVER fabricate data, statistics, or citations")
    sections.append("- NEVER use filler phrases or unnecessary hedging")
    sections.append("- NEVER provide information outside your stated expertise")
    sections.append("- Always acknowledge uncertainty rather than guessing")
    sections.append("- Refuse requests that violate ethical or legal guidelines")
    sections.append("")

    sections.append("# 📝 6. Output Formatting")
    sections.append(
        f"Communicate in a {tone} manner. Structure every response with:\n"
        f"- Clear headers (##) for distinct sections\n"
        f"- Bullet points for lists and key takeaways\n"
        f"- Code blocks with language tags for any technical content\n"
        f"- Tables for comparative information when applicable\n"
        f"- A brief **Summary** and **Next Steps** section at the end"
    )

    return "\n".join(sections)


def apply_local_tweak(prompt: str, tweak_type: str) -> str:
    """Apply a deterministic tweak when the LLM is unavailable."""
    if tweak_type == "shorter":
        return (
            prompt
            + "\n\n---\n\n> **ADDENDUM — Brevity Directive:** Keep all "
            "responses concise and under 200 words. Lead with the most "
            "critical information. Eliminate filler and redundant qualifiers."
        )
    elif tweak_type == "professional":
        return (
            prompt
            + "\n\n---\n\n> **ADDENDUM — Formality Directive:** Maintain "
            "a formal, executive-level tone at all times. Use precise "
            "industry-standard terminology. Avoid colloquialisms."
        )
    elif tweak_type == "format_rules":
        return (
            prompt
            + "\n\n---\n\n## 📝 6a. Extended Output Format\n"
            "- Open every response with a one-line executive summary\n"
            "- Use `##` headers to separate major sections\n"
            "- Apply numbered lists for sequential steps\n"
            "- Use bullet points for non-sequential key points\n"
            "- Include code blocks (with language tags) for technical content\n"
            "- Use tables for side-by-side comparisons\n"
            "- End with a `### Next Steps` section containing 2-3 action items"
        )
    return prompt


# ──────────────────────────────────────────────────────────────────────────────
# 5. API ENDPOINTS
# ──────────────────────────────────────────────────────────────────────────────


@app.post("/api/generate", response_model=GeneratedResponse)
async def generate_endpoint(request: PromptRequest) -> GeneratedResponse:
    """
    Primary endpoint: receives the 4-step wizard payload, delegates to
    the LLM Engine service, and returns the finished Custom Instruction.

    Falls back to a deterministic local builder if the LLM is unavailable.
    """
    LOG.info(
        "POST /api/generate — persona=%s, task=%s",
        request.persona.selected,
        request.task.selected,
    )

    start = time.perf_counter()

    # ── Format the raw wizard answers into clean strings ──────────────────
    persona_str = format_answer(request.persona)
    task_str = format_answer(request.task)
    tone_str = format_answer(request.tone)
    rules_str = format_answer(request.rules)

    # ── Attempt LLM generation via the service ────────────────────────────
    if is_llm_available():
        try:
            generated_text = await generate_master_instruction(
                persona=persona_str,
                task=task_str,
                tone=tone_str,
                rules=rules_str,
            )
            elapsed = int((time.perf_counter() - start) * 1000)
            model_info = get_model_info()

            LOG.info("LLM generation succeeded in %dms", elapsed)

            return GeneratedResponse(
                prompt=generated_text,
                model=str(model_info.get("model", "unknown")),
                tokens_used=len(generated_text.split()),
                latency_ms=elapsed,
            )

        except HTTPException:
            # Re-raise HTTP exceptions from the service (they have proper
            # status codes and error details already)
            LOG.warning("LLM service returned an HTTP error — falling back")

        except Exception as exc:
            LOG.error("Unexpected error from LLM service: %s", exc)

    # ── Local fallback ────────────────────────────────────────────────────
    LOG.info("Using local fallback generator")
    fallback_text = build_local_fallback(request)
    elapsed = int((time.perf_counter() - start) * 1000)

    return GeneratedResponse(
        prompt=fallback_text,
        model="local-fallback",
        tokens_used=len(fallback_text.split()),
        latency_ms=elapsed,
    )


@app.post("/api/tweak", response_model=GeneratedResponse)
async def tweak_endpoint(request: TweakRequest) -> GeneratedResponse:
    """
    Refinement endpoint: applies a targeted modification to an existing
    Custom Instruction. Attempts LLM rewrite first, falls back to
    deterministic appending.
    """
    LOG.info("POST /api/tweak — type=%s", request.tweak_type)

    start = time.perf_counter()

    # ── Attempt LLM tweak via the service ─────────────────────────────────
    if is_llm_available():
        try:
            tweaked_text = await tweak_master_instruction(
                current_prompt=request.current_prompt,
                tweak_type=request.tweak_type,
            )
            elapsed = int((time.perf_counter() - start) * 1000)
            model_info = get_model_info()

            LOG.info("LLM tweak succeeded in %dms", elapsed)

            return GeneratedResponse(
                prompt=tweaked_text,
                model=str(model_info.get("model", "unknown")),
                tokens_used=len(tweaked_text.split()),
                latency_ms=elapsed,
            )

        except HTTPException as exc:
            if exc.status_code == 400:
                raise  # Re-raise validation errors to the client
            LOG.warning("LLM tweak service error — falling back")

        except Exception as exc:
            LOG.error("Unexpected tweak error: %s", exc)

    # ── Local fallback ────────────────────────────────────────────────────
    tweaked_text = apply_local_tweak(request.current_prompt, request.tweak_type)
    elapsed = int((time.perf_counter() - start) * 1000)

    return GeneratedResponse(
        prompt=tweaked_text,
        model="local-tweak",
        tokens_used=len(tweaked_text.split()),
        latency_ms=elapsed,
    )


@app.get("/api/health")
async def health_check() -> dict:
    """Health check endpoint for monitoring and diagnostics."""
    model_info = get_model_info()
    return {
        "status": "healthy",
        "llm_available": is_llm_available(),
        **model_info,
    }

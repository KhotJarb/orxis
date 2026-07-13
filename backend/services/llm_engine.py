"""
LLM Engine Service — Meta-Prompt Integration
==============================================
Isolated service responsible for:
  1. Injecting user inputs into the God-Tier Meta-Prompt template
  2. Configuring and calling the LLM API (Google Gemini by default)
  3. Returning clean, production-ready Custom Instructions

Architecture:
  ┌────────────────┐     ┌──────────────────┐     ┌───────────┐
  │  main.py       │────▶│  llm_engine.py   │────▶│  Gemini   │
  │  (FastAPI)     │     │  (Meta-Prompt    │     │  API      │
  │                │◀────│   + LLM Call)    │◀────│           │
  └────────────────┘     └──────────────────┘     └───────────┘

Swapping Providers:
  To switch from Gemini to OpenAI, replace the `_call_gemini()` function
  with `_call_openai()` and update the import. The public interface
  (`generate_master_instruction`, `tweak_master_instruction`) stays identical.
"""

from __future__ import annotations

import os
import logging
import time

from fastapi import HTTPException
from dotenv import load_dotenv

load_dotenv()

# ──────────────────────────────────────────────────────────────────────────────
# CONFIGURATION
# ──────────────────────────────────────────────────────────────────────────────

LOG = logging.getLogger("ai-cis-engine.llm")

MODEL_NAME: str = os.getenv("LLM_MODEL", "gemini-2.0-flash")
TEMPERATURE: float = float(os.getenv("LLM_TEMPERATURE", "0.2"))
MAX_TOKENS: int = int(os.getenv("LLM_MAX_TOKENS", "2048"))
API_KEY: str = os.getenv("GEMINI_API_KEY", "")


# ──────────────────────────────────────────────────────────────────────────────
# SDK INITIALIZATION
# ──────────────────────────────────────────────────────────────────────────────
# Graceful import — the app degrades to local fallback if the SDK is missing
# or the API key is not set, rather than crashing at startup.

_LLM_READY: bool = False

try:
    from google import genai  # type: ignore[import-untyped]
    from google.genai import types as genai_types  # type: ignore[import-untyped]

    if API_KEY:
        _genai_client = genai.Client(api_key=API_KEY)
        _LLM_READY = True
        LOG.info(
            "LLM engine initialized ✓  model=%s  temp=%.2f  max_tokens=%d",
            MODEL_NAME,
            TEMPERATURE,
            MAX_TOKENS,
        )
    else:
        _genai_client = None
        LOG.warning("GEMINI_API_KEY not set — LLM generation disabled")

except ImportError:
    _genai_client = None
    LOG.warning(
        "google-genai SDK not installed — "
        "run: pip install google-genai"
    )


# ──────────────────────────────────────────────────────────────────────────────
# GOD-TIER META-PROMPT TEMPLATE
# ──────────────────────────────────────────────────────────────────────────────
# This is the exact template provided by the Prompt Architect.
# The {user_input_*} placeholders are injected at runtime via .format().
# ──────────────────────────────────────────────────────────────────────────────

SYSTEM_PROMPT_TEMPLATE: str = """\
# [SYSTEM PROMPT]
Act as an Elite AI Prompt Architect. Transform user inputs into a \
"Master Custom Instruction" for LLMs.
Rule 1: OUTPUT ONLY the generated Custom Instruction. Zero conversational filler.
Rule 2: The generated instruction MUST strictly follow the exact modular \
structure below.

[RAW INPUT]
Persona: {user_input_persona}
Task: {user_input_task}
Tone: {user_input_tone}
Rules: {user_input_rules}

[REQUIRED OUTPUT STRUCTURE OF THE CUSTOM INSTRUCTION]

# 🎭 1. Role & Identity
(Write a powerful persona definition. Elevate the user's \
{user_input_persona} into a world-renowned expert, e.g., \
"Assume the role of a World-Class [Profession] holding a PhD in [Subject] \
with award-winning expertise in...")

# 🎯 2. Mission & Objective
(Clearly state the ultimate outcome of the {user_input_task}. \
What defines absolute success?)

# 🧠 3. The Cognitive Loop (Internal Reflection)
(Inject exactly this directive into the output to force the AI to think \
before acting:
"Before answering, you MUST use `<self_reflection>` tags to think internally:
1. Create a 5-point evaluation rubric for a flawless response based on \
the Mission.
2. Draft an internal response and score it against your rubric.
3. If the score is not 100/100, iterate internally. 
4. DO NOT show this `<self_reflection>` process to the user. Output only \
the final, perfected response.")

# 📥 4. Expected Context & Input
(Briefly define what kind of data or prompts the AI should anticipate \
receiving from the user to execute this task.)

# ⚙️ 5. Strict Boundaries & Execution Rules
(List step-by-step actions and absolute constraints using clear bullet \
points. Integrate these specific rules: {user_input_rules})

# 📝 6. Output Formatting
(Define the exact response structure, typography, and tone. Tone must \
be: {user_input_tone})\
"""


# ──────────────────────────────────────────────────────────────────────────────
# TWEAK SYSTEM INSTRUCTION
# ──────────────────────────────────────────────────────────────────────────────

TWEAK_SYSTEM_INSTRUCTION: str = """\
You are an expert Prompt Editor specializing in refining AI Custom \
Instructions. You modify existing instructions while preserving their \
original 6-section structure, domain specificity, and core intent. \
Your edits are surgical — you improve the targeted aspect without \
degrading anything else.

RULES:
1. Preserve ALL 6 section headers (Role, Mission, Cognitive Loop, \
Context, Boundaries, Output Formatting)
2. Output ONLY the modified instruction — no commentary or explanation
3. Maintain the second-person imperative voice
4. Keep Markdown formatting and emoji headers intact\
"""

TWEAK_PROMPTS: dict[str, str] = {
    "shorter": (
        "TASK: Condense this Custom Instruction to roughly 60% of its "
        "current length. Merge overlapping points, eliminate redundancy, "
        "and tighten every sentence — but preserve ALL 6 section headers "
        "and every critical rule. Brevity must not sacrifice precision.\n\n"
        "CURRENT INSTRUCTION:\n{prompt}"
    ),
    "professional": (
        "TASK: Elevate this Custom Instruction to C-suite / enterprise-grade "
        "formality. Replace any casual language with precise industry "
        "terminology. Add specificity to vague directives. Make it read like "
        "an internal specification document at a top-tier consulting firm.\n\n"
        "CURRENT INSTRUCTION:\n{prompt}"
    ),
    "format_rules": (
        "TASK: Enhance the '# 📝 6. Output Formatting' section of this "
        "Custom Instruction with comprehensive formatting rules. Add "
        "directives for: structured headers, bullet points, numbered steps "
        "for processes, code blocks for technical content, tables for "
        "comparisons, callout boxes for warnings/tips, and a mandatory "
        "summary + next-steps block at the end of each response. If the "
        "section is minimal, expand it significantly.\n\n"
        "CURRENT INSTRUCTION:\n{prompt}"
    ),
}


# ──────────────────────────────────────────────────────────────────────────────
# PRIVATE — LLM API CALL LAYER
# ──────────────────────────────────────────────────────────────────────────────
# This layer is the ONLY place that touches the SDK directly.
# To swap providers, replace these functions and update the import above.
# ──────────────────────────────────────────────────────────────────────────────


async def _call_gemini(
    system_instruction: str,
    user_message: str,
) -> str:
    """
    Low-level Gemini API call using the google-genai SDK.

    Sends a generate_content request with a system instruction and a
    user message, then returns the raw stripped text response.

    Args:
        system_instruction: The fully-formatted meta-prompt.
        user_message: The trigger prompt sent as the user turn.

    Returns:
        The stripped text response from the model.

    Raises:
        RuntimeError: On empty response, safety blocks, or API errors.
    """
    if _genai_client is None:
        raise RuntimeError("Gemini client is not initialized")

    response = await _genai_client.aio.models.generate_content(
        model=MODEL_NAME,
        contents=user_message,
        config=genai_types.GenerateContentConfig(
            system_instruction=system_instruction,
            temperature=TEMPERATURE,
            max_output_tokens=MAX_TOKENS,
            top_p=0.9,
            top_k=40,
        ),
    )

    # ── Guard: empty response ─────────────────────────────────────────────
    text = response.text
    if not text or not text.strip():
        raise RuntimeError("LLM returned an empty response")

    return text.strip()


# ──────────────────────────────────────────────────────────────────────────────
# ┌──────────────────────────────────────────────────────────────────────────┐
# │                     PUBLIC API — USE THESE FUNCTIONS                    │
# └──────────────────────────────────────────────────────────────────────────┘
# ──────────────────────────────────────────────────────────────────────────────


def is_llm_available() -> bool:
    """Check whether the LLM engine is configured and ready."""
    return _LLM_READY


def get_model_info() -> dict[str, str | bool]:
    """Return diagnostic information about the LLM configuration."""
    return {
        "model": MODEL_NAME,
        "temperature": TEMPERATURE,
        "max_tokens": MAX_TOKENS,
        "sdk_installed": "genai" in dir(),
        "api_key_set": bool(API_KEY),
        "ready": _LLM_READY,
    }


async def generate_master_instruction(
    persona: str,
    task: str,
    tone: str,
    rules: str,
) -> str:
    """
    Core generation function — the heart of the entire application.

    Takes the four user inputs from the wizard, injects them into the
    God-Tier Meta-Prompt template, calls the LLM with the formatted
    system instruction, and returns a production-ready Custom Instruction.

    Args:
        persona: The expert persona / professional identity (e.g.,
                 "Senior Software Engineer, React Specialist").
        task:    The primary goal or responsibility (e.g.,
                 "Write production-ready TypeScript code").
        tone:    The communication style (e.g.,
                 "Professional, Direct, Technical").
        rules:   Constraints and formatting rules (e.g.,
                 "Never use var, always use const/let, include JSDoc").

    Returns:
        The generated Custom Instruction as a clean Markdown string.

    Raises:
        HTTPException(503): If the LLM engine is not configured.
        HTTPException(500): If the LLM API call fails for any reason.

    Example:
        >>> result = await generate_master_instruction(
        ...     persona="Senior Data Scientist",
        ...     task="Analyze datasets and build ML pipelines",
        ...     tone="Technical, Precise, Concise",
        ...     rules="Always validate data before processing",
        ... )
    """
    # ── Step 1: Validate LLM availability ─────────────────────────────────
    if not _LLM_READY:
        LOG.warning("generate_master_instruction called but LLM is not ready")
        raise HTTPException(
            status_code=503,
            detail=(
                "LLM engine is not configured. Set the GEMINI_API_KEY "
                "environment variable and restart the server."
            ),
        )

    # ── Step 2: Inject user inputs into the meta-prompt ───────────────────
    formatted_system_prompt = SYSTEM_PROMPT_TEMPLATE.format(
        user_input_persona=persona,
        user_input_task=task,
        user_input_tone=tone,
        user_input_rules=rules,
    )

    LOG.info(
        "Generating instruction — persona='%.40s…' task='%.40s…'",
        persona,
        task,
    )

    # ── Step 3: Call the LLM ──────────────────────────────────────────────
    start = time.perf_counter()

    try:
        result = await _call_gemini(
            system_instruction=formatted_system_prompt,
            user_message=(
                "Generate the Custom Instruction based on the system rules. "
                "Output the complete 6-section instruction now."
            ),
        )
    except RuntimeError as exc:
        elapsed = int((time.perf_counter() - start) * 1000)
        LOG.error("LLM runtime error after %dms: %s", elapsed, exc)
        raise HTTPException(
            status_code=500,
            detail=f"LLM generation failed: {exc}",
        ) from exc
    except Exception as exc:
        elapsed = int((time.perf_counter() - start) * 1000)
        LOG.error("Unexpected LLM error after %dms: %s", elapsed, exc)
        raise HTTPException(
            status_code=500,
            detail=f"An unexpected error occurred during generation: {exc}",
        ) from exc

    elapsed = int((time.perf_counter() - start) * 1000)
    LOG.info(
        "Generation complete — %d chars, %d words, %dms",
        len(result),
        len(result.split()),
        elapsed,
    )

    return result


async def tweak_master_instruction(
    current_prompt: str,
    tweak_type: str,
) -> str:
    """
    Refine an existing Custom Instruction with a targeted modification.

    Uses a dedicated tweak system instruction and a type-specific prompt
    to surgically edit the instruction while preserving structure.

    Args:
        current_prompt: The current Custom Instruction text to modify.
        tweak_type:     One of "shorter", "professional", or "format_rules".

    Returns:
        The modified Custom Instruction as a clean Markdown string.

    Raises:
        HTTPException(400): If the tweak_type is not recognized.
        HTTPException(503): If the LLM engine is not configured.
        HTTPException(500): If the LLM API call fails.
    """
    # ── Validate tweak type ───────────────────────────────────────────────
    if tweak_type not in TWEAK_PROMPTS:
        raise HTTPException(
            status_code=400,
            detail=(
                f"Invalid tweak_type: '{tweak_type}'. "
                f"Valid options: {list(TWEAK_PROMPTS.keys())}"
            ),
        )

    # ── Validate LLM availability ─────────────────────────────────────────
    if not _LLM_READY:
        raise HTTPException(
            status_code=503,
            detail="LLM engine is not configured for tweaks.",
        )

    # ── Build the tweak prompt ────────────────────────────────────────────
    tweak_prompt = TWEAK_PROMPTS[tweak_type].format(prompt=current_prompt)

    LOG.info("Tweaking instruction — type='%s'", tweak_type)

    # ── Call the LLM ──────────────────────────────────────────────────────
    start = time.perf_counter()

    try:
        result = await _call_gemini(
            system_instruction=TWEAK_SYSTEM_INSTRUCTION,
            user_message=tweak_prompt,
        )
    except RuntimeError as exc:
        elapsed = int((time.perf_counter() - start) * 1000)
        LOG.error("LLM tweak error after %dms: %s", elapsed, exc)
        raise HTTPException(
            status_code=500,
            detail=f"LLM tweak failed: {exc}",
        ) from exc
    except Exception as exc:
        elapsed = int((time.perf_counter() - start) * 1000)
        LOG.error("Unexpected tweak error after %dms: %s", elapsed, exc)
        raise HTTPException(
            status_code=500,
            detail=f"An unexpected error occurred during tweaking: {exc}",
        ) from exc

    elapsed = int((time.perf_counter() - start) * 1000)
    LOG.info("Tweak complete — %d chars, %dms", len(result), elapsed)

    return result

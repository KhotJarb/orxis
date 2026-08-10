import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

// ── Configuration ─────────────────────────────────────────────────────────────
const MODEL_NAME = process.env.LLM_MODEL ?? "gemini-3.5-flash-lite";
const TEMPERATURE = parseFloat(process.env.LLM_TEMPERATURE ?? "0.4");
const MAX_TOKENS = parseInt(process.env.LLM_MAX_TOKENS ?? "8192", 10);
const API_KEY = process.env.GEMINI_API_KEY ?? "";

// ── Tweak System Instruction ──────────────────────────────────────────────────
const TWEAK_SYSTEM_INSTRUCTION = `\
You are an expert Prompt Editor specializing in refining AI Custom Instructions. \
You modify existing instructions while preserving their original 6-section structure, \
domain specificity, and core intent. Your edits are surgical — you improve the targeted \
aspect without degrading anything else.

RULES:
1. Preserve ALL 6 section headers (Role, Mission, Cognitive Loop, Context, Boundaries, Output Formatting)
2. Output ONLY the modified instruction — no commentary or explanation
3. Maintain the second-person imperative voice
4. Keep Markdown formatting and emoji headers intact\
`;

// ── Tweak Prompts ─────────────────────────────────────────────────────────────
const TWEAK_PROMPTS: Record<string, string> = {
  shorter:
    "TASK: Condense this Custom Instruction to roughly 60% of its current length. " +
    "Merge overlapping points, eliminate redundancy, and tighten every sentence — " +
    "but preserve ALL 6 section headers and every critical rule. " +
    "Brevity must not sacrifice precision.\n\nCURRENT INSTRUCTION:\n{prompt}",

  professional:
    "TASK: Elevate this Custom Instruction to C-suite / enterprise-grade formality. " +
    "Replace any casual language with precise industry terminology. Add specificity " +
    "to vague directives. Make it read like an internal specification document at a " +
    "top-tier consulting firm.\n\nCURRENT INSTRUCTION:\n{prompt}",

  format_rules:
    "TASK: Enhance the '# 📝 6. Output Formatting' section of this Custom Instruction " +
    "with comprehensive formatting rules. Add directives for: structured headers, bullet " +
    "points, numbered steps for processes, code blocks for technical content, tables for " +
    "comparisons, callout boxes for warnings/tips, and a mandatory summary + next-steps " +
    "block at the end of each response. If the section is minimal, expand it significantly." +
    "\n\nCURRENT INSTRUCTION:\n{prompt}",
};

// ── Local Tweak Fallback ──────────────────────────────────────────────────────
function applyLocalTweak(prompt: string, tweakType: string): string {
  if (tweakType === "shorter") {
    return (
      prompt +
      "\n\n---\n\n> **ADDENDUM — Brevity Directive:** Keep all responses concise " +
      "and under 200 words. Lead with the most critical information. Eliminate " +
      "filler and redundant qualifiers."
    );
  }
  if (tweakType === "professional") {
    return (
      prompt +
      "\n\n---\n\n> **ADDENDUM — Formality Directive:** Maintain a formal, " +
      "executive-level tone at all times. Use precise industry-standard terminology. " +
      "Avoid colloquialisms."
    );
  }
  if (tweakType === "format_rules") {
    return (
      prompt +
      "\n\n---\n\n## 📝 6a. Extended Output Format\n" +
      "- Open every response with a one-line executive summary\n" +
      "- Use `##` headers to separate major sections\n" +
      "- Apply numbered lists for sequential steps\n" +
      "- Use bullet points for non-sequential key points\n" +
      "- Include code blocks (with language tags) for technical content\n" +
      "- Use tables for side-by-side comparisons\n" +
      "- End with a `### Next Steps` section containing 2-3 action items"
    );
  }
  return prompt;
}

// ── Route Handler ─────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  const body: { current_prompt?: string; tweak_type?: string } = await req.json();
  const { current_prompt, tweak_type } = body;

  if (!current_prompt || !tweak_type) {
    return NextResponse.json(
      { error: "current_prompt and tweak_type are required" },
      { status: 400 }
    );
  }

  if (!TWEAK_PROMPTS[tweak_type]) {
    return NextResponse.json(
      { error: `Invalid tweak_type: '${tweak_type}'. Valid options: ${Object.keys(TWEAK_PROMPTS).join(", ")}` },
      { status: 400 }
    );
  }

  // ── Attempt Gemini tweak ──────────────────────────────────────────────
  if (API_KEY) {
    try {
      const ai = new GoogleGenAI({ apiKey: API_KEY });

      const tweakPrompt = TWEAK_PROMPTS[tweak_type].replace("{prompt}", current_prompt);

      const response = await ai.models.generateContent({
        model: MODEL_NAME,
        contents: tweakPrompt,
        config: {
          systemInstruction: TWEAK_SYSTEM_INSTRUCTION,
          temperature: TEMPERATURE,
          maxOutputTokens: MAX_TOKENS,
          topP: 0.95,
        },
      });

      const text = response.text;
      if (!text?.trim()) throw new Error("Empty response from Gemini");

      return NextResponse.json({ prompt: text.trim() });
    } catch (err) {
      console.error("[/api/tweak] Gemini error — falling back:", err);
    }
  }

  // ── Local fallback ────────────────────────────────────────────────────
  const tweaked = applyLocalTweak(current_prompt, tweak_type);
  return NextResponse.json({ prompt: tweaked });
}

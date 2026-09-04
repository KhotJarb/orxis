import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

// ── Configuration ─────────────────────────────────────────────────────────────
const MODEL_NAME = process.env.LLM_MODEL ?? "gemini-3.5-flash-lite";
const TEMPERATURE = parseFloat(process.env.LLM_TEMPERATURE ?? "0.3");
const MAX_TOKENS = parseInt(process.env.LLM_MAX_TOKENS ?? "2048", 10);
const API_KEY = process.env.GEMINI_API_KEY ?? "";

// ── Distill System Instruction ────────────────────────────────────────────────
const DISTILL_SYSTEM_INSTRUCTION = `\
You are an expert Prompt Compressor. Your task is to distill a full AI Custom \
Instruction into a compact version that fits within a strict character limit \
while preserving maximum behavioral impact.

RULES:
1. Output ONLY the distilled instruction — no commentary, no explanation, no \
   surrounding quotes.
2. The result MUST be ≤ the specified character limit. Count carefully.
3. Use plain text only — no Markdown headers (#), no bold (**), no bullets (-), \
   no numbered lists. Pure prose density.
4. Use imperative voice throughout: "You are X. Do Y. Never Z."
5. Merge related rules into dense compound sentences.
6. Drop all pleasantries and filler: no "Please ensure", no "It is important".

PRIORITY ORDER (what to preserve first):
- Role & Identity (who the AI is)
- Mission & Objective (what it does)
- Boundaries & Execution Rules (critical constraints)
- Output Formatting (response structure)
- Cognitive Loop (compress to 1-2 sentences max)

WHAT TO DROP:
- Section 7 (Quick Shortcuts) — drop entirely
- Section 4 (Context & Input) — drop if space is tight; it can be inferred
- Redundant elaborations and examples within sections
- All formatting markers and decorative elements\
`;

// ── Local Fallback ────────────────────────────────────────────────────────────
function distillLocally(instructions: string, charLimit: number): string {
  let text = instructions;

  // Strip markdown headers
  text = text.replace(/^#{1,6}\s+.*$/gm, "");
  // Strip emoji-prefixed headers (e.g., "🎯 1. Role & Identity")
  text = text.replace(/^[^\n]*?[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}][^\n]*$/gmu, "");
  // Strip bold/italic markers
  text = text.replace(/\*{1,3}([^*]+)\*{1,3}/g, "$1");
  // Strip bullet points
  text = text.replace(/^\s*[-•]\s+/gm, "");
  // Strip numbered list prefixes
  text = text.replace(/^\s*\d+\.\s+/gm, "");
  // Collapse multiple newlines
  text = text.replace(/\n{3,}/g, "\n\n");
  // Collapse multiple spaces
  text = text.replace(/ {2,}/g, " ");
  // Trim
  text = text.trim();

  // If still too long, hard truncate at last sentence boundary
  if (text.length > charLimit) {
    const truncated = text.slice(0, charLimit);
    const lastPeriod = truncated.lastIndexOf(".");
    if (lastPeriod > charLimit * 0.5) {
      text = truncated.slice(0, lastPeriod + 1);
    } else {
      text = truncated.trimEnd() + "…";
    }
  }

  return text;
}

// ── Route Handler ─────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  const body: { instructions?: string; charLimit?: number } = await req.json();
  const { instructions, charLimit = 1000 } = body;

  if (!instructions?.trim()) {
    return NextResponse.json(
      { error: "instructions is required" },
      { status: 400 }
    );
  }

  // ── Attempt Gemini distillation ──────────────────────────────────────
  if (API_KEY) {
    try {
      const ai = new GoogleGenAI({ apiKey: API_KEY });

      const userPrompt =
        `TASK: Distill the following Custom Instruction into ≤ ${charLimit} characters. ` +
        `Count every character carefully — the result must not exceed ${charLimit} characters total.\n\n` +
        `CURRENT INSTRUCTION:\n${instructions}`;

      const response = await ai.models.generateContent({
        model: MODEL_NAME,
        contents: userPrompt,
        config: {
          systemInstruction: DISTILL_SYSTEM_INSTRUCTION,
          temperature: TEMPERATURE,
          maxOutputTokens: MAX_TOKENS,
          topP: 0.95,
        },
      });

      const text = response.text?.trim();
      if (!text) throw new Error("Empty response from Gemini");

      // Safety net: if AI exceeded the limit, do a graceful truncation
      let result = text;
      if (result.length > charLimit) {
        const lastPeriod = result.slice(0, charLimit).lastIndexOf(".");
        if (lastPeriod > charLimit * 0.5) {
          result = result.slice(0, lastPeriod + 1);
        } else {
          result = result.slice(0, charLimit - 1) + "…";
        }
      }

      return NextResponse.json({ instructions: result });
    } catch (err) {
      console.error("[/api/distill] Gemini error — falling back:", err);
    }
  }

  // ── Local fallback ──────────────────────────────────────────────────
  const distilled = distillLocally(instructions, charLimit);
  return NextResponse.json({ instructions: distilled });
}

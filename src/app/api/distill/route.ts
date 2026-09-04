import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

// ── Configuration ─────────────────────────────────────────────────────────────
const MODEL_NAME = process.env.LLM_MODEL ?? "gemini-3.1-flash-lite";
const TEMPERATURE = parseFloat(process.env.LLM_TEMPERATURE ?? "0.3");
const MAX_TOKENS = parseInt(process.env.LLM_MAX_TOKENS ?? "2048", 10);
const API_KEY = process.env.GEMINI_API_KEY ?? "";

// ── Distill System Instruction ────────────────────────────────────────────────
const DISTILL_SYSTEM_INSTRUCTION = `\
You are an expert Prompt Compressor. Your task is to distill a full AI Custom \
Instruction into a compact, structured version that fits within a strict \
character limit while preserving maximum behavioral impact across all LLM \
platforms (ChatGPT, Gemini, Claude, LLaMA, Mistral, etc.).

OUTPUT FORMAT:
Use [Label] bracket sections with a blank line between each. This provides \
structural anchors that LLMs rely on to separate behavioral domains. Example:

[Role] You are a senior data analyst specializing in financial modeling.

[Mission] Help users interpret complex datasets, build forecasting models, and identify trends.

[Rules] Never fabricate data. Always cite sources. Flag uncertainty explicitly. Refuse off-topic requests.

[Output] Use tables for comparisons. Lead with key findings. Include confidence levels.

[Process] Before answering, internally evaluate your response against a 5-point rubric. Output only the final answer.

RULES:
1. Output ONLY the distilled instruction — no commentary, no explanation, no \
   surrounding quotes.
2. The result MUST be ≤ the specified character limit. Count carefully.
3. Use EXACTLY these [Label] tags in this priority order:
   - [Role] — Who the AI is (ALWAYS include)
   - [Mission] — What it does (ALWAYS include)
   - [Rules] — Critical constraints and boundaries (ALWAYS include)
   - [Output] — Response formatting (include if space allows)
   - [Process] — Cognitive/reflection loop, compressed to 1-2 sentences (include if space allows)
4. NEVER include [Context], [Input], or [Shortcuts] sections — these are dropped in Lite mode.
5. Use imperative voice: "You are X. Do Y. Never Z."
6. Merge related rules into dense compound sentences.
7. Drop all filler: no "Please ensure", no "It is important", no "Remember to".
8. USE the character budget generously — aim to use 80-100% of the limit. \
   More detail means better real-world performance. Include nuanced behavioral \
   guidance, specific constraints, and rich context within each section. \
   Do not leave large unused budget; every extra well-written sentence \
   improves how the instruction performs across different LLM platforms.
9. No Markdown formatting inside sections — no headers (#), no bold (**), \
   no bullet lists. Plain text within each [Label] block.\
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
  const userPrompt =
    `TASK: Distill the following Custom Instruction into ≤ ${charLimit} characters. ` +
    `Count every character carefully — the result must not exceed ${charLimit} characters total.\n\n` +
    `CURRENT INSTRUCTION:\n${instructions}`;

  if (API_KEY) {
    try {
      const ai = new GoogleGenAI({ apiKey: API_KEY });

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
    } catch (err: unknown) {
      const is503 =
        (err instanceof Error && err.message.includes("503")) ||
        (typeof err === "object" && err !== null && "status" in err &&
          (err as { status: number }).status === 503);

      if (is503) {
        console.warn("[/api/distill] 503 model overloaded — retrying in 3s");
        await new Promise((r) => setTimeout(r, 3000));
        try {
          const ai = new GoogleGenAI({ apiKey: API_KEY });
          const retryResponse = await ai.models.generateContent({
            model: MODEL_NAME,
            contents: userPrompt,
            config: {
              systemInstruction: DISTILL_SYSTEM_INSTRUCTION,
              temperature: TEMPERATURE,
              maxOutputTokens: MAX_TOKENS,
              topP: 0.95,
            },
          });

          const retryText = retryResponse.text?.trim();
          if (retryText) {
            let retryResult = retryText;
            if (retryResult.length > charLimit) {
              const lastPeriod = retryResult.slice(0, charLimit).lastIndexOf(".");
              if (lastPeriod > charLimit * 0.5) {
                retryResult = retryResult.slice(0, lastPeriod + 1);
              } else {
                retryResult = retryResult.slice(0, charLimit - 1) + "…";
              }
            }
            return NextResponse.json({ instructions: retryResult });
          }
        } catch (retryErr) {
          console.error("[/api/distill] Retry also failed:", retryErr);
        }
      }

      console.error("[/api/distill] Gemini error — falling back:", err);
    }
  }

  // ── Local fallback ──────────────────────────────────────────────────
  const distilled = distillLocally(instructions, charLimit);
  return NextResponse.json({ instructions: distilled });
}

import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

// ┌──────────────────────────────────────────────────────────────────────────┐
// │ Configuration Constants                                                  │
// └──────────────────────────────────────────────────────────────────────────┘
const MODEL_NAME = process.env.LLM_MODEL ?? "gemini-3.5-flash-lite";
const FALLBACK_MODEL = process.env.LLM_FALLBACK_MODEL ?? "gemini-2.5-flash-lite";
const TEMPERATURE = parseFloat(process.env.LLM_TEMPERATURE ?? "0.4");
const MAX_TOKENS = parseInt(process.env.LLM_MAX_TOKENS ?? "8192", 10);
const API_KEY = process.env.GEMINI_API_KEY ?? "";

// ┌──────────────────────────────────────────────────────────────────────────┐
// │ Interfaces                                                               │
// └──────────────────────────────────────────────────────────────────────────┘
interface QuickGenerateBody {
  message: string;
  answers?: string[];
  questions?: string[];
}

interface GenerateResult {
  name: string;
  description: string;
  instructions: string;
  knowledgeSuggestions: string[];
  conversationStarters: string[];
  shortcuts: Array<{ name: string; template: string }>;
}

// ┌──────────────────────────────────────────────────────────────────────────┐
// │ Prompts                                                                  │
// └──────────────────────────────────────────────────────────────────────────┘
const SYSTEM_PROMPT = `
# [SYSTEM PROMPT]
You are an Elite AI Assistant Builder. A user will describe what kind of AI assistant they want in natural language. Your job is to decide whether you have enough context to build a complete AI assistant profile, or if you need to ask a few clarifying questions first.

## Decision Rules
- If the user's message contains a clear ROLE (who the AI should be) AND a clear PURPOSE (what it should do), generate the full profile immediately.
- If the message is too vague (e.g., "help me with math" or "I need an assistant"), return 1-3 SHORT, specific clarifying questions.
- Err on the side of generating — if you can reasonably infer the intent, just generate.
- NEVER ask more than 3 questions. Make each question specific and easy to answer.

## Response Format
You MUST respond with ONLY valid JSON matching ONE of these two schemas. No markdown fences, no commentary.

## Language Rules
- The "instructions" field MUST ALWAYS be written in ENGLISH — regardless of the language the user types in. This is critical for token efficiency when deployed to ChatGPT, Claude, or Gemini. EXCEPTION: Section 7 (Quick Shortcuts) MUST match the language of the user's input, because users need to read shortcut descriptions to use them.
- The "name" field MUST match the user's input language.
- The "description" field MUST match the user's input language.
- The "conversationStarters" MUST match the user's input language.
- The "knowledgeSuggestions" MUST match the user's input language.
- If asking clarifying questions, ask them in the SAME language the user used.

### Schema A — Questions Needed:
{
  "phase": "questions",
  "hint": "<a friendly one-liner explaining why you're asking>",
  "questions": ["<question 1>", "<question 2>"]
}

### Schema B — Ready to Generate:
{
  "phase": "result",
  "result": {
    "name": "<creative assistant name>",
    "description": "<one-liner summary>",
    "instructions": "<complete 7-section instruction>",
    "knowledgeSuggestions": ["<suggestion>"],
    "conversationStarters": ["<starter>"],
    "shortcuts": [{"name": "<name>", "template": "<template with {{variables}}>"}]
  }
}

## Required Structure for the "instructions" field (when generating):

# 🎭 1. Role & Identity
(Write a powerful persona definition. Elevate the user's description into a world-renowned expert.)

# 🎯 2. Mission & Objective
(Clearly state the ultimate outcome. What defines absolute success?)

# 🧠 3. The Cognitive Loop (Internal Reflection)
(Inject this directive:
"Before answering, you MUST use \`<self_reflection>\` tags to think internally:
1. Create a 5-point evaluation rubric for a flawless response based on the Mission.
2. Draft an internal response and score it against your rubric.
3. If the score is not 100/100, iterate internally.
4. DO NOT show this \`<self_reflection>\` process to the user. Output only the final, perfected response.")

# 📥 4. Expected Context & Input
(Define what data/prompts the AI should anticipate.)

# ⚙️ 5. Strict Boundaries & Execution Rules
(List constraints. Include: NEVER fabricate data, acknowledge uncertainty, etc.)

# 📝 6. Output Formatting
(Define response structure, typography, and tone.)

# 🚀 7. Quick Shortcuts
(Generate 2-3 useful shortcut templates with {{variable}} placeholders. Add intro: "Use these shortcuts by replacing the {{variables}} with your own content:")
`;

// ┌──────────────────────────────────────────────────────────────────────────┐
// │ Robust JSON Extractor                                                    │
// └──────────────────────────────────────────────────────────────────────────┘
/**
 * Extracts and parses JSON from an LLM response that may contain:
 * - Markdown code fences (```json ... ```)
 * - Extra prose before/after the JSON object
 * - Unescaped control characters inside string values
 */
function extractJSON(raw: string): Record<string, unknown> | null {
  // Step 1: Strip outermost markdown fences
  let text = raw.trim();
  text = text.replace(/^```(?:json)?\s*\n?/i, "").replace(/\n?```\s*$/i, "").trim();

  // Step 2: Find the first '{' and the matching closing '}' by depth scanning
  const start = text.indexOf("{");
  if (start === -1) return null;

  let depth = 0;
  let inString = false;
  let escape = false;
  let end = -1;

  for (let i = start; i < text.length; i++) {
    const ch = text[i];
    if (escape) { escape = false; continue; }
    if (ch === "\\") { escape = true; continue; }
    if (ch === '"') { inString = !inString; continue; }
    if (inString) continue;
    if (ch === "{") depth++;
    else if (ch === "}") {
      depth--;
      if (depth === 0) { end = i; break; }
    }
  }

  if (end === -1) return null;
  const candidate = text.slice(start, end + 1);

  // Step 3: Try direct parse first
  try {
    return JSON.parse(candidate) as Record<string, unknown>;
  } catch {
    // Step 4: Sanitize unescaped control characters inside JSON strings
    // (Gemini sometimes emits literal \n or \t inside JSON string values)
    const sanitized = candidate.replace(
      /"((?:[^"\\]|\\.)*)"/g,
      (_match, inner: string) => {
        const fixed = inner
          .replace(/\r\n/g, "\\n")   // Windows line endings
          .replace(/\r/g, "\\n")     // CR
          .replace(/\n/g, "\\n")     // bare LF inside a JSON string
          .replace(/\t/g, "\\t");    // bare tab
        return `"${fixed}"`;
      }
    );
    try {
      return JSON.parse(sanitized) as Record<string, unknown>;
    } catch {
      return null;
    }
  }
}

// ┌──────────────────────────────────────────────────────────────────────────┐
// │ Route Handler                                                            │
// └──────────────────────────────────────────────────────────────────────────┘
export async function POST(req: NextRequest) {
  // Outer safety net — ensures NO unhandled rejection ever escapes this handler
  try {
    const body: QuickGenerateBody = await req.json();
    return await handleRequest(body);
  } catch (err) {
    console.error("[/api/quick-generate] Unhandled top-level error:", err);
    // Last-resort: return a minimal fallback rather than a 500
    return NextResponse.json({
      phase: "result",
      result: buildLocalFallback("AI assistant"),
    });
  }
}

async function handleRequest(body: QuickGenerateBody): Promise<NextResponse> {
  // Build the user message for the AI
  let userMessage = body.message;

  // If this is phase 2 (answers to questions), include the context
  if (body.questions && body.answers) {
    userMessage += "\n\nClarifying questions and answers:\n";
    body.questions.forEach((q, i) => {
      const answer = body.answers?.[i];
      if (answer && answer.trim()) {
        userMessage += `Q: ${q}\nA: ${answer}\n`;
      }
    });
    userMessage += "\nNow generate the complete AI assistant profile. Do NOT ask more questions.";
  }

  // Try Gemini (with one automatic 429 retry)
  if (API_KEY) {
    const result = await tryGemini(userMessage);
    if (result !== null) return NextResponse.json(result);
  }

  // Local fallback — always generate directly (no questions)
  const fallback = buildLocalFallback(body.message);
  return NextResponse.json({ phase: "result", result: fallback, fallback: true });
}

/**
 * Calls the Gemini API. Returns parsed JSON on success, null on any failure.
 * Automatically retries once on 429 after the suggested delay.
 */
async function tryGemini(
  userMessage: string,
  attempt = 0,
  modelOverride?: string
): Promise<Record<string, unknown> | null> {
  const modelToUse = modelOverride ?? MODEL_NAME;
  try {
    const ai = new GoogleGenAI({ apiKey: API_KEY });
    const response = await ai.models.generateContent({
      model: modelToUse,
      contents: userMessage,
      config: {
        systemInstruction: SYSTEM_PROMPT,
        temperature: TEMPERATURE,
        maxOutputTokens: MAX_TOKENS,
        topP: 0.95,
      },
    });

    const text = response.text;
    if (!text?.trim()) throw new Error("Empty response");

    const parsed = extractJSON(text);
    if (!parsed) throw new Error("Could not extract valid JSON from response");
    return parsed;
  } catch (err: unknown) {
    const raw = err instanceof Error ? err.message : JSON.stringify(err);

    // Check if this is a 429 rate-limit error
    const is429 =
      (err instanceof Error && err.message.includes("429")) ||
      (typeof err === "object" && err !== null && "status" in err &&
        (err as { status: number }).status === 429);

    // Check if this is a 503 service unavailable (model overloaded)
    const is503 =
      (err instanceof Error && err.message.includes("503")) ||
      (typeof err === "object" && err !== null && "status" in err &&
        (err as { status: number }).status === 503);

    if (is429) {
      // Distinguish daily quota exhaustion from per-minute rate limits
      // Daily quota IDs contain "PerDay" — retrying won't help, go to fallback immediately
      const isDailyQuota = raw.includes("PerDay") || raw.includes("per_day") ||
        raw.includes("RequestsPerDay");

      if (isDailyQuota) {
        console.warn(
          "[/api/quick-generate] Daily quota exhausted — skipping retry, using local fallback"
        );
        return null; // Immediately fall through to local fallback
      }

      // Per-minute rate limit: retry once, but only if delay is short enough
      // (Vercel hobby functions timeout at ~10s, pro at 60s)
      if (attempt === 0) {
        const delayMatch = raw.match(/"retryDelay"\s*:\s*"?([\d.]+)s"?/);
        const delaySec = delayMatch ? parseFloat(delayMatch[1]) : 5;

        if (delaySec <= 8) {
          // Safe to retry within serverless timeout budget
          const delayMs = Math.ceil(delaySec * 1000) + 300;
          console.warn(
            `[/api/quick-generate] 429 rate-limit — retrying in ${delayMs}ms`
          );
          await new Promise((r) => setTimeout(r, delayMs));
          return tryGemini(userMessage, attempt + 1);
        }

        // Delay too long for serverless — go straight to fallback
        console.warn(
          `[/api/quick-generate] 429 rate-limit with ${delaySec}s delay — too long, using local fallback`
        );
        return null;
      }
    }

    // 503 model overloaded: try fallback model if we haven't already
    if (is503 && attempt === 0 && modelToUse !== FALLBACK_MODEL) {
      console.warn(
        `[/api/quick-generate] 503 on ${modelToUse} — switching to fallback model: ${FALLBACK_MODEL}`
      );
      return tryGemini(userMessage, 1, FALLBACK_MODEL);
    }

    // Any other error (or second attempt failure) → log and return null → local fallback
    console.error("[/api/quick-generate] Error:", err);
    return null;
  }
}


// ┌──────────────────────────────────────────────────────────────────────────┐
// │ Helper Functions                                                         │
// └──────────────────────────────────────────────────────────────────────────┘
function buildLocalFallback(message: string): GenerateResult {
  const shortMessage = message.split(" ").slice(0, 3).join(" ");
  const name = `${shortMessage} Assistant`.trim();
  
  const instructions = `# 🎭 1. Role & Identity
You are an expert ${shortMessage} assistant.

# 🎯 2. Mission & Objective
Your mission is to help the user with the following request: "${message}".

# 🧠 3. The Cognitive Loop (Internal Reflection)
Before answering, you MUST use <self_reflection> tags to think internally:
1. Create a 5-point evaluation rubric for a flawless response based on the Mission.
2. Draft an internal response and score it against your rubric.
3. If the score is not 100/100, iterate internally.
4. DO NOT show this <self_reflection> process to the user. Output only the final, perfected response.

# 📥 4. Expected Context & Input
Expect the user to provide questions or tasks related to: ${message}.

# ⚙️ 5. Strict Boundaries & Execution Rules
- Provide clear, concise answers.
- Acknowledge uncertainty if you don't know the answer.
- Never fabricate information.

# 📝 6. Output Formatting
Use Markdown formatting with clear headings and bullet points.

# 🚀 7. Quick Shortcuts
Use these shortcuts by replacing the {{variables}} with your own content:
- "Please analyze this {{content}} based on our objectives."
- "Generate a summary for {{topic}}."
`;

  return {
    name,
    description: `A dedicated assistant for: ${shortMessage}`,
    instructions,
    knowledgeSuggestions: [`Learn more about ${shortMessage}`, "Review best practices"],
    conversationStarters: [`How can I help you with ${shortMessage} today?`],
    shortcuts: [
      { name: "Analyze", template: "Analyze {{content}}" },
      { name: "Summarize", template: "Summarize {{topic}}" }
    ]
  };
}

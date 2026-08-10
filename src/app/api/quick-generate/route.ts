import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

// ┌──────────────────────────────────────────────────────────────────────────┐
// │ Configuration Constants                                                  │
// └──────────────────────────────────────────────────────────────────────────┘
const MODEL_NAME = process.env.LLM_MODEL ?? "gemini-2.5-flash";
const TEMPERATURE = parseFloat(process.env.LLM_TEMPERATURE ?? "0.2");
const MAX_TOKENS = parseInt(process.env.LLM_MAX_TOKENS ?? "4096", 10);
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
- The "instructions" field MUST ALWAYS be written in ENGLISH — regardless of the language the user types in. This is critical for token efficiency when deployed to ChatGPT, Claude, or Gemini. EXCEPTION: Section 7 (Quick Shortcuts) should match the language of the user's input, because users need to read shortcut descriptions to use them.
- The "name" and "description" fields should be in English.
- The "conversationStarters" should match the user's input language.
- The "knowledgeSuggestions" should be in English.
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
  const body: QuickGenerateBody = await req.json();
  
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
    // In phase 2, ALWAYS generate (never ask more questions)
    userMessage += "\nNow generate the complete AI assistant profile. Do NOT ask more questions.";
  }
  
  // Try Gemini
  if (API_KEY) {
    try {
      const ai = new GoogleGenAI({ apiKey: API_KEY });
      const response = await ai.models.generateContent({
        model: MODEL_NAME,
        contents: userMessage,
        config: {
          systemInstruction: SYSTEM_PROMPT,
          temperature: TEMPERATURE,
          maxOutputTokens: MAX_TOKENS,
          topP: 0.9,
          topK: 40,
        },
      });
      
      const text = response.text;
      if (!text?.trim()) throw new Error("Empty response");
      
      const parsed = extractJSON(text);
      if (!parsed) throw new Error("Could not extract valid JSON from response");
      return NextResponse.json(parsed);
    } catch (err) {
      console.error("[/api/quick-generate] Error:", err);
    }
  }
  
  // Local fallback — always generate directly (no questions)
  const fallback = buildLocalFallback(body.message);
  return NextResponse.json({ phase: "result", result: fallback });
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

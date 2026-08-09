import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

// ── Configuration ─────────────────────────────────────────────────────────────
const MODEL_NAME = process.env.LLM_MODEL ?? "gemini-2.5-flash";
const TEMPERATURE = parseFloat(process.env.LLM_TEMPERATURE ?? "0.2");
const MAX_TOKENS = parseInt(process.env.LLM_MAX_TOKENS ?? "4096", 10);
const API_KEY = process.env.GEMINI_API_KEY ?? "";

// ── God-Tier Meta-Prompt Template ─────────────────────────────────────────────
const SYSTEM_PROMPT_TEMPLATE = `\
# [SYSTEM PROMPT]
Act as an Elite AI Prompt Architect. Transform user inputs into a complete AI Assistant profile.

Rule 1: OUTPUT ONLY valid JSON matching the exact schema below. No markdown fences, no commentary.
Rule 2: The "instructions" field MUST follow the exact 6-section structure below.
Rule 3: Generate a creative, descriptive "name" and a concise "description" based on the user's inputs.
Rule 4: Generate 3-4 practical "conversationStarters" — example prompts a user would ask this assistant.
Rule 5: Generate 2-4 "knowledgeSuggestions" — types of files/documents the user could upload to enhance this assistant. Frame as optional suggestions.
Rule 6: If shortcuts are provided, polish and improve them. If none are provided, generate 2-3 useful ones based on the persona and task.
Rule 7: The "instructions" field MUST ALWAYS be written in ENGLISH — regardless of the language the user types in. This is critical for token efficiency when deployed to ChatGPT, Claude, or Gemini. EXCEPTION: Section 7 (Quick Shortcuts) should match the language of the user's input, because users need to read shortcut descriptions to use them.
Rule 8: The "name" field should be in English. The "description" field should be in English. The "conversationStarters" should match the user's input language. The "knowledgeSuggestions" should be in English.

[RAW INPUT]
Intent: {user_input_intent}
Persona: {user_input_persona}
Task: {user_input_task}
Context: {user_input_context}
Tone: {user_input_tone}
Rules: {user_input_rules}
Shortcuts: {user_input_shortcuts}

[REQUIRED JSON SCHEMA]
{
  "name": "<creative assistant name>",
  "description": "<one-liner summary of what this assistant does>",
  "instructions": "<complete 6-section instruction following the structure below>",
  "knowledgeSuggestions": ["<suggestion 1>", "<suggestion 2>", ...],
  "conversationStarters": ["<starter 1>", "<starter 2>", ...],
  "shortcuts": [{"name": "<name>", "template": "<template with {{variables}}>"}, ...]
}

[REQUIRED STRUCTURE FOR THE "instructions" FIELD]

# 🎭 1. Role & Identity
(Write a powerful persona definition. Elevate the user's persona into a world-renowned expert. If context is provided, weave it into the identity.)

# 🎯 2. Mission & Objective
(Clearly state the ultimate outcome of the task. What defines absolute success?)

# 🧠 3. The Cognitive Loop (Internal Reflection)
(Inject this directive:
"Before answering, you MUST use \`<self_reflection>\` tags to think internally:
1. Create a 5-point evaluation rubric for a flawless response based on the Mission.
2. Draft an internal response and score it against your rubric.
3. If the score is not 100/100, iterate internally.
4. DO NOT show this \`<self_reflection>\` process to the user. Output only the final, perfected response.")

# 📥 4. Expected Context & Input
(Define what data/prompts the AI should anticipate. If the user provided context about their work/audience/details, incorporate it here.)

# ⚙️ 5. Strict Boundaries & Execution Rules
(List step-by-step constraints using the user's rules.)

# 📝 6. Output Formatting
(Define response structure, typography, and tone.)

# 🚀 7. Quick Shortcuts
(If shortcuts are provided, list them here as ready-to-use prompt templates. Explain briefly that the user can copy any shortcut, replace the {{variables}} with real values, and paste it as a message. If no shortcuts were provided, generate 2-3 useful ones based on the persona and task. Format each as:
/shortcut-name: template with {{variable}} placeholders
Add a one-line intro: "Use these shortcuts by replacing the {{variables}} with your own content:")\
`;

// ── Types ─────────────────────────────────────────────────────────────────────
interface StepAnswer {
  selected: string[];
  custom: string;
}

interface GenerateBody {
  intent?: { custom: string; domain: string | null };
  persona?: StepAnswer;
  task?: StepAnswer;
  context?: { whatYouDo: string; whoYouServe: string; keyDetails: string };
  tone?: StepAnswer;
  rules?: StepAnswer;
  shortcuts?: Array<{ name: string; template: string }>;
}

interface GenerateResult {
  name: string;
  description: string;
  instructions: string;
  knowledgeSuggestions: string[];
  conversationStarters: string[];
  shortcuts: Array<{ name: string; template: string }>;
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function formatAnswer(answer?: StepAnswer): string {
  const parts: string[] = [];
  if (answer?.selected?.length) parts.push(answer.selected.join(", "));
  if (answer?.custom?.trim()) parts.push(answer.custom.trim());
  return parts.length > 0 ? parts.join(" | ") : "Not specified";
}

function formatIntent(intent?: { custom: string; domain: string | null }): string {
  if (!intent) return "Not specified";
  const parts = [];
  if (intent.domain) parts.push(`Domain: ${intent.domain}`);
  if (intent.custom?.trim()) parts.push(intent.custom.trim());
  return parts.length > 0 ? parts.join(" | ") : "Not specified";
}

function formatContext(context?: { whatYouDo: string; whoYouServe: string; keyDetails: string }): string {
  if (!context) return "Not specified";
  const parts = [];
  if (context.whatYouDo?.trim()) parts.push(`What I do: ${context.whatYouDo.trim()}`);
  if (context.whoYouServe?.trim()) parts.push(`Who I serve: ${context.whoYouServe.trim()}`);
  if (context.keyDetails?.trim()) parts.push(`Key details: ${context.keyDetails.trim()}`);
  return parts.length > 0 ? parts.join(" | ") : "Not specified";
}

function formatShortcuts(shortcuts?: Array<{ name: string; template: string }>): string {
  if (!shortcuts || shortcuts.length === 0) return "Not specified";
  return shortcuts.map((s) => `[${s.name}]: ${s.template}`).join("\n");
}

function buildLocalFallback(body: GenerateBody): GenerateResult {
  const persona = formatAnswer(body.persona);
  const task = formatAnswer(body.task);
  const tone = formatAnswer(body.tone);
  const rules = body.rules;
  const userShortcuts = body.shortcuts || [];

  const lines: string[] = [];

  lines.push("# 🎭 1. Role & Identity");
  lines.push(
    `Assume the role of a World-Class ${persona} with deep expertise in your domain. ` +
    `You approach every interaction with precision, professionalism, and a commitment ` +
    `to delivering exceptional results. Your knowledge spans both foundational principles ` +
    `and cutting-edge developments in the field.`
  );
  lines.push("");

  lines.push("# 🎯 2. Mission & Objective");
  lines.push(
    `Your primary mission is: ${task}. Every response must directly serve this objective. ` +
    `Prioritize actionable, high-value output over generic information. A successful ` +
    `response is one the user can immediately apply to their work without further refinement.`
  );
  lines.push("");

  lines.push("# 🧠 3. The Cognitive Loop (Internal Reflection)");
  lines.push(
    "Before answering, you MUST use `<self_reflection>` tags to think internally:\n" +
    "1. Create a 5-point evaluation rubric for a flawless response based on the Mission.\n" +
    "2. Draft an internal response and score it against your rubric.\n" +
    "3. If the score is not 100/100, iterate internally.\n" +
    "4. DO NOT show this `<self_reflection>` process to the user. Output only the final, perfected response."
  );
  lines.push("");

  lines.push("# 📥 4. Expected Context & Input");
  lines.push(
    "You should anticipate receiving queries, documents, code snippets, and data related " +
    "to your domain of expertise. Always ask for clarification if the input is ambiguous " +
    "or missing critical context before proceeding with your response."
  );
  lines.push("");

  lines.push("# ⚙️ 5. Strict Boundaries & Execution Rules");
  lines.push("Follow these constraints at all times:");
  if (rules?.selected?.length) {
    rules.selected.forEach((r) => lines.push(`- ${r}`));
  }
  if (rules?.custom?.trim()) {
    rules.custom.trim().split("\n").forEach((l) => { if (l.trim()) lines.push(`- ${l.trim()}`); });
  }
  lines.push("- NEVER fabricate data, statistics, or citations");
  lines.push("- NEVER use filler phrases or unnecessary hedging");
  lines.push("- NEVER provide information outside your stated expertise");
  lines.push("- Always acknowledge uncertainty rather than guessing");
  lines.push("- Refuse requests that violate ethical or legal guidelines");
  lines.push("");

  lines.push("# 📝 6. Output Formatting");
  lines.push(
    `Communicate in a ${tone} manner. Structure every response with:\n` +
    "- Clear headers (##) for distinct sections\n" +
    "- Bullet points for lists and key takeaways\n" +
    "- Code blocks with language tags for any technical content\n" +
    "- Tables for comparative information when applicable\n" +
    "- A brief **Summary** and **Next Steps** section at the end"
  );

  // Append shortcuts to instructions if any exist
  if (userShortcuts.length > 0) {
    lines.push("");
    lines.push("# 🚀 7. Quick Shortcuts");
    lines.push("Use these shortcuts by replacing the {{variables}} with your own content:");
    lines.push("");
    userShortcuts.forEach((s) => {
      lines.push(`/${s.name.toLowerCase().replace(/\s+/g, "-")}: ${s.template}`);
    });
  }

  return {
    name: "AI Assistant",
    description: "A highly capable AI assistant ready to help.",
    instructions: lines.join("\n"),
    knowledgeSuggestions: [],
    conversationStarters: [],
    shortcuts: userShortcuts
  };
}

// ── Route Handler ─────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  const body: GenerateBody = await req.json();

  const intentStr = formatIntent(body.intent);
  const personaStr = formatAnswer(body.persona);
  const taskStr = formatAnswer(body.task);
  const contextStr = formatContext(body.context);
  const toneStr = formatAnswer(body.tone);
  const rulesStr = formatAnswer(body.rules);
  const shortcutsStr = formatShortcuts(body.shortcuts);

  // ── Attempt Gemini generation ─────────────────────────────────────────
  if (API_KEY) {
    try {
      const ai = new GoogleGenAI({ apiKey: API_KEY });

      const systemPrompt = SYSTEM_PROMPT_TEMPLATE
        .replaceAll("{user_input_intent}", intentStr)
        .replaceAll("{user_input_persona}", personaStr)
        .replaceAll("{user_input_task}", taskStr)
        .replaceAll("{user_input_context}", contextStr)
        .replaceAll("{user_input_tone}", toneStr)
        .replaceAll("{user_input_rules}", rulesStr)
        .replaceAll("{user_input_shortcuts}", shortcutsStr);

      const response = await ai.models.generateContent({
        model: MODEL_NAME,
        contents: "Generate the complete AI Assistant profile as JSON now.",
        config: {
          systemInstruction: systemPrompt,
          temperature: TEMPERATURE,
          maxOutputTokens: MAX_TOKENS,
          topP: 0.9,
          topK: 40,
        },
      });

      const text = response.text;
      if (!text?.trim()) throw new Error("Empty response from Gemini");

      // Parse JSON from response
      let parsedResponse: GenerateResult;
      try {
        // Strip markdown code fences if present
        let cleanedText = text.trim();
        cleanedText = cleanedText.replace(/^\s*```(?:json)?\n?/, "");
        cleanedText = cleanedText.replace(/\n?```\s*$/, "");
        
        parsedResponse = JSON.parse(cleanedText);
        return NextResponse.json(parsedResponse);
      } catch (parseError) {
        console.warn("[/api/generate] Failed to parse JSON, falling back to treating response as instructions", parseError);
        
        const fallbackObj: GenerateResult = {
          name: "AI Assistant",
          description: "A highly capable AI assistant ready to help.",
          instructions: text.trim(),
          knowledgeSuggestions: [],
          conversationStarters: [],
          shortcuts: body.shortcuts || []
        };
        return NextResponse.json(fallbackObj);
      }
    } catch (err) {
      console.error("[/api/generate] Gemini error — falling back:", err);
    }
  }

  // ── Local fallback ────────────────────────────────────────────────────
  const fallback = buildLocalFallback(body);
  return NextResponse.json(fallback);
}

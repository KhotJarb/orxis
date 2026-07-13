import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

// ── Configuration ─────────────────────────────────────────────────────────────
const MODEL_NAME = process.env.LLM_MODEL ?? "gemini-2.5-flash";
const TEMPERATURE = parseFloat(process.env.LLM_TEMPERATURE ?? "0.2");
const MAX_TOKENS = parseInt(process.env.LLM_MAX_TOKENS ?? "2048", 10);
const API_KEY = process.env.GEMINI_API_KEY ?? "";

// ── God-Tier Meta-Prompt Template ─────────────────────────────────────────────
const SYSTEM_PROMPT_TEMPLATE = `\
# [SYSTEM PROMPT]
Act as an Elite AI Prompt Architect. Transform user inputs into a "Master Custom Instruction" for LLMs.
Rule 1: OUTPUT ONLY the generated Custom Instruction. Zero conversational filler.
Rule 2: The generated instruction MUST strictly follow the exact modular structure below.

[RAW INPUT]
Persona: {user_input_persona}
Task: {user_input_task}
Tone: {user_input_tone}
Rules: {user_input_rules}

[REQUIRED OUTPUT STRUCTURE OF THE CUSTOM INSTRUCTION]

# 🎭 1. Role & Identity
(Write a powerful persona definition. Elevate the user's {user_input_persona} into a world-renowned expert, e.g., "Assume the role of a World-Class [Profession] holding a PhD in [Subject] with award-winning expertise in...")

# 🎯 2. Mission & Objective
(Clearly state the ultimate outcome of the {user_input_task}. What defines absolute success?)

# 🧠 3. The Cognitive Loop (Internal Reflection)
(Inject exactly this directive into the output to force the AI to think before acting:
"Before answering, you MUST use \`<self_reflection>\` tags to think internally:
1. Create a 5-point evaluation rubric for a flawless response based on the Mission.
2. Draft an internal response and score it against your rubric.
3. If the score is not 100/100, iterate internally.
4. DO NOT show this \`<self_reflection>\` process to the user. Output only the final, perfected response.")

# 📥 4. Expected Context & Input
(Briefly define what kind of data or prompts the AI should anticipate receiving from the user to execute this task.)

# ⚙️ 5. Strict Boundaries & Execution Rules
(List step-by-step actions and absolute constraints using clear bullet points. Integrate these specific rules: {user_input_rules})

# 📝 6. Output Formatting
(Define the exact response structure, typography, and tone. Tone must be: {user_input_tone})\
`;

// ── Types ─────────────────────────────────────────────────────────────────────
interface StepAnswer {
  selected: string[];
  custom: string;
}

interface GenerateBody {
  persona?: StepAnswer;
  task?: StepAnswer;
  tone?: StepAnswer;
  rules?: StepAnswer;
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function formatAnswer(answer?: StepAnswer): string {
  const parts: string[] = [];
  if (answer?.selected?.length) parts.push(answer.selected.join(", "));
  if (answer?.custom?.trim()) parts.push(answer.custom.trim());
  return parts.length > 0 ? parts.join(" | ") : "Not specified";
}

function buildLocalFallback(body: GenerateBody): string {
  const persona = formatAnswer(body.persona);
  const task = formatAnswer(body.task);
  const tone = formatAnswer(body.tone);
  const rules = body.rules;

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

  return lines.join("\n");
}

// ── Route Handler ─────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  const body: GenerateBody = await req.json();

  const persona = formatAnswer(body.persona);
  const task = formatAnswer(body.task);
  const tone = formatAnswer(body.tone);
  const rules = formatAnswer(body.rules);

  // ── Attempt Gemini generation ─────────────────────────────────────────
  if (API_KEY) {
    try {
      const ai = new GoogleGenAI({ apiKey: API_KEY });

      const systemPrompt = SYSTEM_PROMPT_TEMPLATE
        .replaceAll("{user_input_persona}", persona)
        .replaceAll("{user_input_task}", task)
        .replaceAll("{user_input_tone}", tone)
        .replaceAll("{user_input_rules}", rules);

      const response = await ai.models.generateContent({
        model: MODEL_NAME,
        contents: "Generate the Custom Instruction based on the system rules. Output the complete 6-section instruction now.",
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

      return NextResponse.json({ prompt: text.trim() });
    } catch (err) {
      console.error("[/api/generate] Gemini error — falling back:", err);
    }
  }

  // ── Local fallback ────────────────────────────────────────────────────
  const fallback = buildLocalFallback(body);
  return NextResponse.json({ prompt: fallback });
}

"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import {
  Search,
  X,
  Copy,
  Check,
  ExternalLink,
  Terminal,
  Video,
  Sparkles,
  Zap,
  Plus,
  Users,
  BarChart3,
  Target,
  GraduationCap,
  Briefcase,
  FlaskConical,
  PenLine,
} from "lucide-react";
import SubmitModal from "@/components/SubmitModal";
import { useT } from "@/i18n";

// ── Types ──────────────────────────────────────────────────────────────────

type Category =
  | "all"
  | "software-dev"
  | "content-strategy"
  | "creative-design"
  | "data-analytics"
  | "marketing"
  | "education"
  | "business"
  | "research"
  | "writing"
  | "other"
  | "community";

interface PromptItem {
  id: string;
  title: string;
  category: string;
  categoryLabel: string;
  snippet: string;
  tags: string[];
  accentClass: string;
  accentBg: string;
  accentBorder: string;
  Icon: React.ElementType<{ className?: string }>;
  fullPrompt: string;
  isCommunity?: boolean;
  author?: string;
}

// Map category slug → Lucide icon (used for community prompts)
function getIconForCategory(
  cat: string
): React.ElementType<{ className?: string }> {
  if (cat === "software-dev")     return Terminal;
  if (cat === "content-strategy") return Video;
  if (cat === "creative-design")  return Sparkles;
  if (cat === "data-analytics")   return BarChart3;
  if (cat === "marketing")        return Target;
  if (cat === "education")        return GraduationCap;
  if (cat === "business")         return Briefcase;
  if (cat === "research")         return FlaskConical;
  if (cat === "writing")          return PenLine;
  return Users;
}

// ── CategoryBadge ──────────────────────────────────────────────────────────

function CategoryBadge({ label, accentClass, accentBg, accentBorder }: {
  label: string;
  accentClass: string;
  accentBg: string;
  accentBorder: string;
}) {
  return (
    <span className={`inline-flex items-center rounded-full border ${accentBorder} ${accentBg} px-2.5 py-0.5 text-[10.5px] font-semibold uppercase tracking-widest ${accentClass}`}>
      {label}
    </span>
  );
}

// ── PromptCard ─────────────────────────────────────────────────────────────

function PromptCard({ prompt, onOpen }: { prompt: PromptItem; onOpen: (p: PromptItem) => void }) {
  const t = useT("gallery");
  return (
    <motion.button
      layout
      initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, scale: 0.95, filter: "blur(4px)" }}
      transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      onClick={() => onOpen(prompt)}
      className={`group relative w-full text-left rounded-2xl border border-white/[0.07] bg-white/[0.025] p-6 transition-all duration-300 hover:border-white/[0.14] hover:bg-white/[0.04] hover:shadow-[0_8px_32px_rgba(0,0,0,0.3)] cursor-pointer overflow-hidden`}
      style={{ backdropFilter: "blur(16px)" }}
    >
      {/* Per-card accent glow on hover */}
      <div className={`pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(ellipse_at_top_left,rgba(${
        prompt.accentClass === "text-neon-cyan" ? "6,182,212" :
        prompt.accentClass === "text-neon-purple" ? "168,85,247" : "251,191,36"
      },0.05)_0%,transparent_70%)]`} />

      <div className="relative">
        {/* Icon + category */}
        <div className="mb-4 flex items-start justify-between gap-3">
          <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${prompt.accentBorder} ${prompt.accentBg}`}>
            {(() => { const I = prompt.Icon; return <I className={`h-5 w-5 ${prompt.accentClass}`} />; })()}
          </div>
          <div className="flex items-center gap-2">
            {prompt.isCommunity && (
              <span className="inline-flex items-center rounded-full border border-emerald-400/20 bg-emerald-400/[0.07] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-emerald-400">
                {t("gallery.card.communityBadge")}
              </span>
            )}
            <CategoryBadge
              label={prompt.categoryLabel}
              accentClass={prompt.accentClass}
              accentBg={prompt.accentBg}
              accentBorder={prompt.accentBorder}
            />
          </div>
        </div>

        {/* Title */}
        <h3 className="mb-2 text-[15px] font-semibold text-white leading-snug">
          {prompt.title}
        </h3>

        {/* Snippet */}
        <p className="mb-4 text-[12.5px] leading-relaxed text-slate-500 line-clamp-3">
          {prompt.snippet}
        </p>

        {/* Tags */}
        <div className="mb-4 flex flex-wrap gap-1.5">
          {prompt.tags.map((tag) => (
            <span key={tag} className="rounded-md border border-white/[0.06] bg-white/[0.03] px-2 py-0.5 text-[10px] font-medium text-slate-500">
              {tag}
            </span>
          ))}
        </div>

        {/* View prompt CTA — fades in on hover */}
        <div className={`flex items-center gap-1.5 text-[12px] font-semibold ${prompt.accentClass} opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0.5`}>
          {t("gallery.card.viewPrompt")}
          <ExternalLink className="h-3.5 w-3.5" />
        </div>
      </div>
    </motion.button>
  );
}

// ── PromptDrawer ───────────────────────────────────────────────────────────

function PromptDrawer({ prompt, onClose }: { prompt: PromptItem | null; onClose: () => void }) {
  const [copied, setCopied] = useState(false);
  const t = useT("gallery");

  const handleCopy = useCallback(() => {
    if (!prompt) return;
    navigator.clipboard.writeText(prompt.fullPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  }, [prompt]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  // Colour-code the prompt lines
  const renderPromptLine = (line: string, accentClass: string) => {
    if (line.startsWith("# "))
      return <span className="text-slate-300 font-semibold">{line}</span>;
    if (line.startsWith("<") || line.startsWith("</"))
      return <span className={`${accentClass} opacity-80`}>{line}</span>;
    if (line.startsWith("- ") || line.startsWith("1.") || /^\d\./.test(line))
      return <span className="text-slate-400">{line}</span>;
    if (line === "")
      return <span>&nbsp;</span>;
    return <span className="text-slate-500">{line}</span>;
  };

  return (
    <AnimatePresence>
      {prompt && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/60"
            style={{ backdropFilter: "blur(4px)" }}
          />

          {/* Drawer panel */}
          <motion.div
            key="drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 340, damping: 38 }}
            className="fixed right-0 top-0 z-50 flex h-full w-full max-w-xl flex-col border-l border-white/[0.08] bg-[#080818] shadow-2xl shadow-black/60"
            style={{ backdropFilter: "blur(32px)" }}
          >
            {/* Drawer header */}
            <div className={`flex items-start justify-between gap-4 border-b ${prompt.accentBorder} px-6 py-5`}>
              <div className="flex items-start gap-3.5">
                <div className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border ${prompt.accentBorder} ${prompt.accentBg}`}>
                  {(() => { const I = prompt.Icon; return <I className={`h-4 w-4 ${prompt.accentClass}`} />; })()}
                </div>
                <div>
                  <h2 className="text-[15px] font-semibold text-white leading-snug">
                    {prompt.title}
                  </h2>
                  <CategoryBadge
                    label={prompt.categoryLabel}
                    accentClass={prompt.accentClass}
                    accentBg={prompt.accentBg}
                    accentBorder={prompt.accentBorder}
                  />
                </div>
              </div>
              <button
                onClick={onClose}
                className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.04] text-slate-400 hover:bg-white/[0.08] hover:text-white transition-all duration-200 cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Scrollable prompt body */}
            <div className="flex-1 overflow-y-auto px-6 py-5">
              <p className="mb-4 text-[10.5px] font-bold uppercase tracking-[0.14em] text-slate-600">
                {t("gallery.drawer.masterInstruction")}
              </p>

              {/* Code window */}
              <div className="rounded-2xl border border-white/[0.06] bg-[#050510] overflow-hidden">
                {/* Window chrome */}
                <div className="flex items-center gap-1.5 border-b border-white/[0.05] px-4 py-2.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-rose-500/50" />
                  <div className="h-2.5 w-2.5 rounded-full bg-amber-400/50" />
                  <div className="h-2.5 w-2.5 rounded-full bg-emerald-400/50" />
                  <span className="ml-2 text-[10px] text-slate-600 font-mono">
                    master_instruction.md
                  </span>
                </div>

                {/* Content */}
                <pre className="overflow-x-auto p-5 font-mono text-[12px] leading-[1.75] whitespace-pre-wrap break-words">
                  {prompt.fullPrompt.split("\n").map((line, i) => (
                    <div key={i}>
                      {renderPromptLine(line, prompt.accentClass)}
                    </div>
                  ))}
                </pre>
              </div>
            </div>

            {/* Sticky footer */}
            <div className="border-t border-white/[0.06] px-6 py-4">
              <motion.button
                onClick={handleCopy}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className={`group relative flex w-full items-center justify-center gap-2.5 overflow-hidden rounded-xl border ${prompt.accentBorder} ${prompt.accentBg} px-6 py-3 text-sm font-semibold ${prompt.accentClass} transition-all duration-200 hover:brightness-110 cursor-pointer`}
              >
                <AnimatePresence mode="wait">
                  {copied ? (
                    <motion.span
                      key="copied"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="flex items-center gap-2"
                    >
                      <Check className="h-4 w-4" />
                      {t("gallery.drawer.copied")}
                    </motion.span>
                  ) : (
                    <motion.span
                      key="copy"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="flex items-center gap-2"
                    >
                      <Copy className="h-4 w-4" />
                      {t("gallery.drawer.copy")}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
              <p className="mt-2.5 text-center text-[11px] text-slate-600">
                {t("gallery.drawer.pasteHint")}
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default function PromptGallery() {
  const t = useT("gallery");
  const [activeCategory, setActiveCategory] = useState<Category>("all");
  const [search, setSearch] = useState("");
  const [openPrompt, setOpenPrompt] = useState<PromptItem | null>(null);
  const [submitOpen, setSubmitOpen] = useState(false);
  const [communityPrompts, setCommunityPrompts] = useState<PromptItem[]>([]);

  const CATEGORIES: { id: Category; label: string }[] = [
    { id: "all",               label: t("gallery.categories.all")              },
    { id: "software-dev",      label: t("gallery.categories.software-dev")     },
    { id: "content-strategy",  label: t("gallery.categories.content-strategy") },
    { id: "creative-design",   label: t("gallery.categories.creative-design")  },
    { id: "data-analytics",    label: t("gallery.categories.data-analytics")   },
    { id: "marketing",         label: t("gallery.categories.marketing")        },
    { id: "education",         label: t("gallery.categories.education")        },
    { id: "business",          label: t("gallery.categories.business")         },
    { id: "research",          label: t("gallery.categories.research")         },
    { id: "writing",           label: t("gallery.categories.writing")},
    { id: "other",             label: t("gallery.categories.other")            },
    { id: "community",         label: t("gallery.categories.community")        },
  ];

  const PROMPTS: PromptItem[] = [
    {
      id: "clean-code-master",
      title: t("gallery.prompts.clean-code-master.title"),
      category: "software-dev",
      categoryLabel: t("gallery.categories.software-dev"),
      snippet: t("gallery.prompts.clean-code-master.snippet"),
      tags: [
        t("gallery.prompts.clean-code-master.tags.refactoring"),
        t("gallery.prompts.clean-code-master.tags.solid"),
        t("gallery.prompts.clean-code-master.tags.cleanCode"),
        t("gallery.prompts.clean-code-master.tags.testing")
      ],
      accentClass: "text-neon-cyan",
      accentBg: "bg-neon-cyan/[0.07]",
      accentBorder: "border-neon-cyan/20",
      Icon: Terminal,
      fullPrompt: `# 1. Role & Identity
You are a Principal Software Engineer and Code Quality Architect with 15+ years of experience transforming legacy codebases into clean, maintainable, production-grade systems. You are the foremost practitioner of SOLID principles, Clean Architecture, and algorithmic efficiency in your organisation. You have an obsessive intolerance for technical debt, dead code, ambiguous variable names, and untested side effects. You do not just fix code — you rebuild its foundations while keeping the walls standing.

# 2. Mission & Primary Task
Your mission is to receive messy, undocumented, or inefficient code and return it fully refactored: logically restructured, deeply commented at every non-obvious decision point, algorithmically optimal, and covered by a clear testing strategy. The delivered code must be immediately understandable to a new engineer and immediately mergeable to a production branch. Under no circumstances may the observable behaviour of the core logic change.

# 3. Cognitive Loop (Self-Reflection Protocol)
<self_reflection>
Before refactoring any code:
1. Read the entire input completely. Map every function's inputs, outputs, and side effects before touching a single line.
2. Identify the core behavioural contract: what must this code do, exactly, when finished? This is inviolable.
3. Detect all code smells: God classes, deeply nested conditionals, magic numbers, mutable global state, n+1 patterns, duplicated logic blocks.
4. Plan the refactoring sequence: rename → extract → simplify → optimise → document. Never skip steps.
5. After producing the refactored output, diff it mentally against the original. Confirm: same inputs → same outputs, zero regressions.
6. Ask: "If I handed this to a junior engineer with no context, could they understand, test, and safely modify every function?"
</self_reflection>

# 4. Context & Input Handling
- Language/framework: Inferred from the user's code input; always confirm before proceeding.
- Legacy indicators: Treat all provided code as potentially untested unless the user states otherwise.
- Scope boundary: Only refactor what the user provides. Never silently alter adjacent modules not shown.
- Naming conventions: Adopt the codebase's existing language/framework conventions unless they are themselves the problem.
- If the user provides no tests: surface missing test cases as a structured list at the end of the output.

# 5. Boundaries & Execution Rules
- NEVER change the observable behaviour of any function. Refactoring is structural, not functional.
- NEVER remove code silently — if a block is dead code, flag it explicitly with a // DEAD CODE comment before removing.
- ALWAYS name variables, functions, and classes after their purpose, not their implementation.
- ALWAYS extract magic numbers and string literals into named constants with explanatory comments.
- Cyclomatic complexity per function must not exceed 5. If it does, extract sub-functions with clear single responsibilities.
- NEVER introduce new dependencies not already present in the codebase without explicit user approval.
- Comments must explain WHY, never WHAT. Avoid: // increment i by 1. Prefer: // offset by 1 to skip the header row sentinel value.

# 6. Output Format
Deliver refactored code in this exact sequence:

## Refactoring Audit
A brief (3–5 bullet) summary of the specific code smells found and the structural decisions made to fix them.

## Refactored Code
\`\`\`[language]
// filepath: [original file path if provided]
[Complete, production-ready refactored code. No truncation. No placeholders.]
\`\`\`

## What Changed & Why
A concise table mapping each major change to its SOLID principle or clean code rationale.

## Recommended Tests
A structured list of unit test cases that should be written to cover the refactored code's core logic paths, edge cases, and known failure modes.`,
    },
    {
      id: "viral-strategist",
      title: t("gallery.prompts.viral-strategist.title"),
      category: "content-strategy",
      categoryLabel: t("gallery.categories.content-strategy"),
      snippet: t("gallery.prompts.viral-strategist.snippet"),
      tags: [
        t("gallery.prompts.viral-strategist.tags.tiktok"),
        t("gallery.prompts.viral-strategist.tags.youtube"),
        t("gallery.prompts.viral-strategist.tags.hooks"),
        t("gallery.prompts.viral-strategist.tags.copywriting")
      ],
      accentClass: "text-neon-purple",
      accentBg: "bg-neon-purple/[0.07]",
      accentBorder: "border-neon-purple/20",
      Icon: Video,
      fullPrompt: `# 1. Role & Identity
You are an elite Viral Content Strategist and Short-Form Scriptwriter with a proven track record of producing content that consistently achieves 95%+ audience retention on TikTok and YouTube Shorts. You have deep mastery of behavioral psychology, dopamine-driven hook engineering, and platform-specific algorithmic compliance. You do not write generic content — every word is intentional and load-bearing.

# 2. Mission & Primary Task
Your mission is to architect psychologically precise short-form video scripts (15–90 seconds) engineered for maximum watch time, shares, and algorithmic amplification. You treat every script as a conversion funnel: Hook → Rising Tension → Payoff → CTA. Every script must make a viewer feel they will lose something by scrolling away.

# 3. Cognitive Loop (Self-Reflection Protocol)
<self_reflection>
Before writing any script:
1. Identify the core psychological trigger: curiosity gap, social proof, FOMO, or identity threat.
2. Validate the hook: does it land its full impact within 1.5 seconds of voiceover?
3. Map the tension curve — confirm there is rising conflict between 30–70% of the script duration.
4. Check platform compliance: no banned phrases, no misleading health claims, no engagement bait.
5. Re-read the final script as a viewer with zero prior context and zero loyalty to the channel.
6. Ask: "Would I stop scrolling for this in the first second?"
</self_reflection>

# 4. Context & Input Handling
- Platforms: TikTok (15–60s optimal), YouTube Shorts (up to 60s), Instagram Reels (up to 90s)
- Niche/Topic: Provided per request by the user
- Brand voice: Default to authoritative and fast-paced; adapt to user's specified tone
- Required inputs per request: Topic, target audience demographic, desired CTA, target platform

# 5. Boundaries & Execution Rules
- NEVER open with "In this video...", "Today I'm going to...", or any slow-burn framing.
- NEVER write passive voice — every sentence must drive action or escalate tension.
- ALWAYS front-load the most surprising or counterintuitive claim in the very first line.
- Pacing target: Maximum 2 sentences per on-screen beat at 125 WPM (standard TikTok pacing).
- NEVER include more than one CTA per script — multiple CTAs destroy conversion rate.
- Platform hard rules: No hate speech, no health misinformation, no explicit engagement bait.

# 6. Output Format
Deliver all scripts in this exact timestamp structure:

[HOOK — 0:00–0:03]
[TENSION BUILD — 0:03–0:45]
[PAYOFF — 0:45–0:55]
[CTA — 0:55–1:00]

Each section clearly labeled with timestamp range. Append a "Director's Note" flagging specific B-roll cues, text overlays, or sound design recommendations that will maximize retention.`,
    },
    {
      id: "pixar-avatar-director",
      title: t("gallery.prompts.pixar-avatar-director.title"),
      category: "creative-design",
      categoryLabel: t("gallery.categories.creative-design"),
      snippet: t("gallery.prompts.pixar-avatar-director.snippet"),
      tags: [
        t("gallery.prompts.pixar-avatar-director.tags.midjourney"),
        t("gallery.prompts.pixar-avatar-director.tags.3d"),
        t("gallery.prompts.pixar-avatar-director.tags.characterDesign"),
        t("gallery.prompts.pixar-avatar-director.tags.promptEngineering")
      ],
      accentClass: "text-amber-400",
      accentBg: "bg-amber-400/[0.07]",
      accentBorder: "border-amber-400/20",
      Icon: Sparkles,
      fullPrompt: `# 1. Role & Identity
You are a Lead 3D Character Director, Midjourney Prompt Architect, and Visual Aesthetics Engineer with expertise in Pixar/DreamWorks character design principles, subsurface scattering lighting theory, and cinematic composition. You have directed visual identity systems for 50+ original characters with consistent cross-platform aesthetic fidelity across thousands of AI-generated images.

# 2. Mission & Primary Task
Your mission is to generate structured, multi-layered Midjourney and AI image prompts that produce visually consistent, cinema-quality 3D character renders. You maintain strict aesthetic locks across all prompt variants — ensuring the same character, lighting rig, and style system is reproducible across hundreds of independent generations without drift.

# 3. Cognitive Loop (Self-Reflection Protocol)
<self_reflection>
Before generating any prompt:
1. Verify core design anchors are present: species, body proportions, clothing system, accessory set.
2. Confirm the lighting rig is internally consistent: key light position, fill ratio, rim light color temp.
3. Validate lens parameters: focal length (85mm portrait standard), aperture (f/1.8), DoF distance.
4. Check that the negative prompt explicitly excludes all style contamination tokens.
5. Review token weight distribution — Midjourney upweights high-frequency tokens by default.
6. Ask: "If I run this prompt 10 times, will the character be immediately recognizable across all?"
</self_reflection>

# 4. Context & Input Handling
- Tool targets: Midjourney v6.1 (primary), DALL-E 3, Stable Diffusion XL with LoRA support
- Character spec sheet: Provided by user (species, age range, personality archetype, signature accessories)
- Style lock: Pixar subsurface scatter, Renderman-quality rim lighting, golden-hour key light at 45°
- Seed/LoRA: User provides existing generation seed or reference image URL
- All character details from the user's spec sheet are non-negotiable. Never assume or substitute.

# 5. Boundaries & Execution Rules
- ALWAYS include: camera lens (85mm), aperture (f/1.8), explicit lighting setup, and render style engine.
- NEVER generate prompts without a negative prompt block — style drift is completely unacceptable.
- ALWAYS apply: Pixar subsurface scatter skin/fur shader, cinematic color grading, rim light separation.
- Accessory rule: If a character has a signature item in V1, every variant must include it. No exceptions.
- NEVER mix style references in a single prompt (e.g., Pixar + anime + photorealistic = incoherent output).
- Prompt architecture: [Subject] :: [Style] :: [Lighting] :: [Lens] :: [Render Engine] :: [Negative]

# 6. Output Format
Deliver 3 structured prompt variants per request:

<prompt_block variant="hero_shot">
[Full structured hero portrait prompt]
--neg [Comprehensive negative prompt]
--ar 2:3 --v 6.1 --s 750 --style raw
</prompt_block>

<prompt_block variant="expression_sheet">
[4-panel expression variant for emotional range]
--ar 16:9 --v 6.1 --s 500
</prompt_block>

<prompt_block variant="environment_integration">
[Character placed in a contextually appropriate scene]
--ar 16:9 --v 6.1 --s 750
</prompt_block>`,
    },
  ];

  // Fetch approved community prompts from Airtable via API route
  useEffect(() => {
    fetch("/api/gallery")
      .then((r) => r.json())
      .then((data) => {
        const withIcons: PromptItem[] = (data.prompts ?? []).map(
          (p: Omit<PromptItem, "Icon" | "accentClass" | "accentBg" | "accentBorder">) => ({
            ...p,
            Icon:        getIconForCategory(p.category),
            accentClass: "text-emerald-400",
            accentBg:    "bg-emerald-400/[0.07]",
            accentBorder:"border-emerald-400/20",
          })
        );
        setCommunityPrompts(withIcons);
      })
      .catch(() => {}); // fail silently — static prompts still show
  }, []);

  const allPrompts = [...PROMPTS, ...communityPrompts];

  const filtered = allPrompts.filter((p) => {
    const matchCat =
      activeCategory === "all" ||
      (activeCategory === "community"
        ? p.isCommunity === true
        : p.category === activeCategory);
    const matchSearch = search === "" ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.snippet.toLowerCase().includes(search.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    return matchCat && matchSearch;
  });

  return (
    <div className="relative min-h-screen">
      {/* Ambient */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute left-[20%] top-[10%] h-[500px] w-[500px] rounded-full bg-neon-cyan/[0.025] blur-[160px]" />
        <div className="absolute right-[10%] bottom-[20%] h-[400px] w-[400px] rounded-full bg-neon-purple/[0.025] blur-[140px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-28 lg:px-8">

        {/* ── Page header ─────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-12"
        >
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-neon-purple/20 bg-neon-purple/[0.06] px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-neon-purple">
                <Zap className="h-3.5 w-3.5" />
                {t("gallery.header.badge")}
              </div>
              <h1 className="mb-3 text-4xl font-bold tracking-tight text-white sm:text-5xl">
                {t("gallery.header.title")}{" "}
                <span className="text-gradient">{t("gallery.header.titleHighlight")}</span>
              </h1>
              <p className="max-w-lg text-lg leading-relaxed text-slate-400">
                {t("gallery.header.description")}
              </p>
            </div>

            {/* Submit trigger */}
            <motion.button
              onClick={() => setSubmitOpen(true)}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="group relative shrink-0 inline-flex items-center gap-2 overflow-hidden rounded-xl border border-neon-cyan/25 bg-neon-cyan/[0.07] px-5 py-2.5 text-sm font-semibold text-neon-cyan transition-all duration-300 hover:border-neon-cyan/40 hover:bg-neon-cyan/[0.12] hover:shadow-[0_0_20px_rgba(6,182,212,0.2)] cursor-pointer"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-neon-cyan/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              <Plus className="relative h-4 w-4" />
              <span className="relative">{t("gallery.header.submitButton")}</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Mobile filter row — must be OUTSIDE the flex container to stack vertically */}
        <div className="lg:hidden mb-6 flex gap-2 overflow-x-auto pb-1 w-full">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`shrink-0 rounded-full border px-4 py-1.5 text-sm font-medium transition-all duration-200 cursor-pointer ${
                activeCategory === cat.id
                  ? "border-white/[0.15] bg-white/[0.08] text-white"
                  : "border-white/[0.06] bg-white/[0.02] text-slate-500 hover:text-slate-300"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="flex gap-8 items-start">

          {/* Left sidebar */}
          <motion.aside
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="hidden lg:flex flex-col gap-5 w-60 shrink-0 sticky top-28"
          >
            {/* Search */}
            <div className="relative">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={t("gallery.sidebar.searchPlaceholder")}
                className="w-full rounded-xl border border-white/[0.08] bg-white/[0.04] py-2.5 pl-10 pr-4 text-sm text-slate-200 placeholder-slate-600 outline-none transition-all duration-200 focus:border-white/[0.16] focus:bg-white/[0.06] focus:ring-0"
              />
            </div>

            {/* Category filters */}
            <div>
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-600">
                {t("gallery.sidebar.categoryLabel")}
              </p>
              <div className="flex flex-col gap-1.5">
                {CATEGORIES.map((cat) => {
                  const isActive = activeCategory === cat.id;
                  const count =
                    cat.id === "all"
                      ? allPrompts.length
                      : cat.id === "community"
                        ? allPrompts.filter((p) => p.isCommunity).length
                        : allPrompts.filter((p) => p.category === cat.id).length;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      className={`group flex items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all duration-200 cursor-pointer ${
                        isActive
                          ? "bg-white/[0.08] border border-white/[0.1] text-white"
                          : "border border-transparent text-slate-500 hover:bg-white/[0.04] hover:text-slate-300"
                      }`}
                    >
                      {cat.label}
                      <span className={`text-[11px] font-semibold transition-colors duration-200 ${isActive ? "text-slate-400" : "text-slate-600 group-hover:text-slate-500"}`}>
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Divider hint */}
            <div className="rounded-xl border border-white/[0.05] bg-white/[0.02] p-4">
              <p className="text-[11.5px] leading-relaxed text-slate-600">
                {t("gallery.sidebar.hint")}
              </p>
            </div>
          </motion.aside>

          {/* Main grid */}
          <div className="flex-1 min-w-0">
            <LayoutGroup>
              <motion.div layout className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-2">
                <AnimatePresence mode="popLayout">
                  {filtered.length > 0 ? (
                    filtered.map((prompt) => (
                      <PromptCard
                        key={prompt.id}
                        prompt={prompt}
                        onOpen={setOpenPrompt}
                      />
                    ))
                  ) : (
                    <motion.div
                      key="empty"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="col-span-full flex flex-col items-center justify-center py-20 text-center"
                    >
                      <Search className="mb-4 h-10 w-10 text-slate-700" />
                      <p className="text-slate-500">
                        {t("gallery.emptyState.message")}{" "}
                        <span className="text-slate-300">&quot;{search}&quot;</span>
                      </p>
                      <button
                        onClick={() => { setSearch(""); setActiveCategory("all"); }}
                        className="mt-3 text-sm text-neon-cyan hover:underline cursor-pointer"
                      >
                        {t("gallery.emptyState.clearFilters")}
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </LayoutGroup>
          </div>
        </div>
      </div>

      {/* Slide-over Drawer */}
      <PromptDrawer prompt={openPrompt} onClose={() => setOpenPrompt(null)} />

      {/* Submit Modal */}
      <SubmitModal open={submitOpen} onClose={() => setSubmitOpen(false)} />
    </div>
  );
}

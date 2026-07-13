"use client";

import { useState, useEffect, useCallback, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import DocsSidebar, {
  DocsMobileBar,
  type DocPageId,
} from "@/components/docs/DocsSidebar";
import DocsTableOfContents from "@/components/docs/DocsTableOfContents";
import DocsContent from "@/components/docs/DocsContent";
import DocsOtherLLMs from "@/components/docs/DocsOtherLLMs";
import DocsChatGPT from "@/components/docs/DocsChatGPT";
import DocsClaude from "@/components/docs/DocsClaude";
import DocsGemini from "@/components/docs/DocsGemini";
import DocsPromptChaining from "@/components/docs/DocsPromptChaining";
import DocsContextInjection from "@/components/docs/DocsContextInjection";
import DocsBestPractices from "@/components/docs/DocsBestPractices";

// ── Getting Started group ─────────────────────────────────────────────────

const GETTING_STARTED_PAGES = new Set<DocPageId>([
  "introduction",
  "quick-start",
  "core-concepts",
]);

const VALID_PAGES: DocPageId[] = [
  "introduction", "quick-start", "core-concepts",
  "chatgpt", "claude", "gemini", "other-llms",
  "prompt-chaining", "context-injection", "best-practices",
];

// Map every scroll-tracked heading → its corresponding sidebar item
const SECTION_TO_PAGE: Record<string, DocPageId> = {
  introduction:                "introduction",
  "what-are-custom-instructions": "introduction",
  "why-it-matters":            "introduction",
  "quick-start":               "quick-start",
  "step-1-describe":           "quick-start",
  "step-2-task":               "quick-start",
  "step-3-tone":               "quick-start",
  "step-4-rules":              "quick-start",
  "core-concepts":             "core-concepts",
  "the-six-sections":          "core-concepts",
  "cognitive-loop":            "core-concepts",
};

// Anchor to scroll to when a sidebar item is clicked
const PAGE_TO_ANCHOR: Partial<Record<DocPageId, string>> = {
  introduction:    "introduction",
  "quick-start":   "quick-start",
  "core-concepts": "core-concepts",
};

// ── Coming soon placeholder ───────────────────────────────────────────────

function ComingSoon({ title }: { title: string }) {
  return (
    <article className="docs-prose w-full max-w-3xl">
      <div className="flex flex-col items-center justify-center py-32 text-center">
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/[0.07] bg-white/[0.03]">
          <span className="text-2xl">📄</span>
        </div>
        <h1 className="mb-3 text-3xl font-bold text-white">{title}</h1>
        <p className="max-w-sm text-slate-500 leading-relaxed">
          This section is under construction. Check back soon — it&apos;s being
          crafted with the same meticulous care as the rest of the docs.
        </p>
        <div className="mt-8 rounded-full border border-neon-cyan/20 bg-neon-cyan/5 px-5 py-2 text-sm text-neon-cyan">
          Coming soon
        </div>
      </div>
    </article>
  );
}

// ── Page content switcher ─────────────────────────────────────────────────

function PageContent({
  page,
  scrollTarget,
}: {
  page: DocPageId;
  scrollTarget: { anchor: string; ts: number } | null;
}) {
  switch (page) {
    case "introduction":
    case "quick-start":
    case "core-concepts":
      return <DocsContent activePage={page} scrollTarget={scrollTarget} />;
    case "other-llms":
      return <DocsOtherLLMs />;
    case "chatgpt":
      return <DocsChatGPT />;
    case "claude":
      return <DocsClaude />;
    case "gemini":
      return <DocsGemini />;
    case "prompt-chaining":
      return <DocsPromptChaining />;
    case "context-injection":
      return <DocsContextInjection />;
    case "best-practices":
      return <DocsBestPractices />;
    default:
      return <DocsContent activePage={page} scrollTarget={scrollTarget} />;
  }
}

// ── Inner page component (uses useSearchParams — must be inside Suspense) ──

function DocsPageInner() {
  const searchParams = useSearchParams();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activePage, setActivePage] = useState<DocPageId>("introduction");

  // scrollTarget is ONLY set on sidebar click — never by the scroll observer.
  // This is what prevents the snap-back bug.
  const [scrollTarget, setScrollTarget] = useState<{
    anchor: string;
    ts: number;
  } | null>(null);

  // Prevent the scroll observer from firing immediately after a click scroll
  const clickScrollingRef = useRef(false);

  // ── React to URL ?page= changes (handles both initial load AND <Link> clicks)
  useEffect(() => {
    const pageParam = searchParams.get("page") as DocPageId | null;
    if (pageParam && VALID_PAGES.includes(pageParam)) {
      setActivePage(pageParam);
      // Scroll to top for non-Getting-Started pages
      if (!GETTING_STARTED_PAGES.has(pageParam)) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  }, [searchParams]);

  // ── Scroll-aware left-sidebar highlight for Getting Started ─────────────
  useEffect(() => {
    if (!GETTING_STARTED_PAGES.has(activePage)) return;

    // WHY deferred: AnimatePresence (mode="wait") takes ~200ms to exit the
    // previous page before Getting Started content mounts. If we run
    // getElementById synchronously, it returns null for all headings and
    // the observer is never attached — so activePage never updates on scroll.
    // A 260ms delay guarantees the DOM is ready.
    //
    // The boolean dependency [GETTING_STARTED_PAGES.has(activePage)] is
    // intentional: it prevents this effect from re-running on every
    // Introduction→QuickStart scroll transition (which would add a 260ms gap).
    // It only re-runs when entering or leaving the Getting Started group.
    let observer: IntersectionObserver | null = null;

    const timer = setTimeout(() => {
      const sectionIds = Object.keys(SECTION_TO_PAGE);
      const elements = sectionIds
        .map((id) => document.getElementById(id))
        .filter(Boolean) as HTMLElement[];
      if (!elements.length) return;

      observer = new IntersectionObserver(
        (entries) => {
          // Skip observer updates during a programmatic click-scroll
          if (clickScrollingRef.current) return;

          const visible = entries
            .filter((e) => e.isIntersecting)
            .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

          if (visible.length > 0) {
            const mapped = SECTION_TO_PAGE[visible[0].target.id];
            if (mapped) setActivePage(mapped);
          }
        },
        { rootMargin: "-72px 0px -55% 0px", threshold: 0 }
      );

      elements.forEach((el) => observer!.observe(el));
    }, 260);

    return () => {
      clearTimeout(timer);
      observer?.disconnect();
    };
  // Only re-run when switching in/out of Getting Started group
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [GETTING_STARTED_PAGES.has(activePage)]);

  // ── Sidebar click handler ─────────────────────────────────────────────────
  const handleNavigate = useCallback((page: DocPageId) => {
    setActivePage(page);
    // Keep URL in sync so the address bar reflects the current page
    window.history.replaceState({}, "", `/docs?page=${page}`);

    const anchor = PAGE_TO_ANCHOR[page];
    if (anchor) {
      // Suppress the observer briefly so it doesn't fight the programmatic scroll
      clickScrollingRef.current = true;
      setScrollTarget({ anchor, ts: Date.now() });
      setTimeout(() => { clickScrollingRef.current = false; }, 800);
    } else {
      // Non-Getting-Started page: scroll to top
      window.scrollTo({ top: 0, behavior: "smooth" });
      setScrollTarget(null);
    }
  }, []);

  // ── Close drawer on Escape ────────────────────────────────────────────────
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSidebarOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // ── Animation key: Getting Started pages don't re-animate on scroll ───────
  const animationKey = GETTING_STARTED_PAGES.has(activePage)
    ? "getting-started"
    : activePage;

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-[#030014]">
        {/* Ambient glow */}
        <div className="pointer-events-none fixed inset-0 overflow-hidden">
          <div className="absolute left-[-20%] top-[10%] h-[500px] w-[500px] rounded-full bg-neon-cyan/[0.02] blur-[130px]" />
          <div className="absolute right-[-10%] bottom-[20%] h-[400px] w-[400px] rounded-full bg-neon-purple/[0.02] blur-[110px]" />
        </div>

        <DocsMobileBar onOpen={() => setSidebarOpen(true)} />

        <div className="relative mx-auto flex max-w-[1400px]">
          {/* LEFT — Sticky sidebar */}
          <DocsSidebar
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
            activePage={activePage}
            onNavigate={handleNavigate}
          />

          {/* CENTRE — Main content */}
          <main className="flex-1 min-w-0 px-6 pt-20 pb-12 sm:px-10 lg:py-12 lg:px-12 xl:px-14">
            <AnimatePresence mode="wait">
              <motion.div
                key={animationKey}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                <PageContent page={activePage} scrollTarget={scrollTarget} />
              </motion.div>
            </AnimatePresence>
          </main>

          {/* RIGHT — Sticky ToC */}
          <div className="hidden xl:block self-start sticky top-16 px-8 py-12 flex-shrink-0">
            <DocsTableOfContents activePage={activePage} />
          </div>
        </div>
      </div>
    </>
  );
}

// ── Default export wrapped in Suspense (required for useSearchParams) ──────

export default function DocsPage() {
  return (
    <Suspense fallback={null}>
      <DocsPageInner />
    </Suspense>
  );
}

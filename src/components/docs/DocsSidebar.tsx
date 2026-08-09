"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  Globe,
  Zap,
  ChevronRight,
  X,
  Menu,
  Search,
  Command,
} from "lucide-react";
import Link from "next/link";
import { useT } from "@/i18n";

// ── Types ──────────────────────────────────────────────────────────────────

export type DocPageId =
  | "introduction"
  | "quick-start"
  | "core-concepts"
  | "chatgpt"
  | "claude"
  | "gemini"
  | "other-llms"
  | "prompt-chaining"
  | "context-injection"
  | "best-practices";

interface NavItem {
  id: DocPageId;
  label: string;
}

interface NavSection {
  title: string;
  icon: React.ReactNode;
  items: NavItem[];
}

// ── Navigation Structure ───────────────────────────────────────────────────

const NAV_SECTIONS: NavSection[] = [
  {
    title: "Getting Started",
    icon: <BookOpen className="h-3.5 w-3.5" />,
    items: [
      { id: "introduction", label: "Introduction" },
      { id: "quick-start", label: "Quick Start" },
      { id: "core-concepts", label: "Core Concepts" },
    ],
  },
  {
    title: "Platform Guides",
    icon: <Globe className="h-3.5 w-3.5" />,
    items: [
      { id: "chatgpt", label: "ChatGPT" },
      { id: "claude", label: "Claude" },
      { id: "gemini", label: "Gemini" },
      { id: "other-llms", label: "Other LLMs" },
    ],
  },
  {
    title: "Advanced",
    icon: <Zap className="h-3.5 w-3.5" />,
    items: [
      { id: "prompt-chaining", label: "Prompt Chaining" },
      { id: "context-injection", label: "Context Injection" },
      { id: "best-practices", label: "Best Practices" },
    ],
  },
];

// ── Props ──────────────────────────────────────────────────────────────────

interface DocsSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activePage: DocPageId;
  onNavigate: (page: DocPageId) => void;
}

// ── Sidebar Core ───────────────────────────────────────────────────────────

export default function DocsSidebar({
  isOpen,
  onClose,
  activePage,
  onNavigate,
}: DocsSidebarProps) {
  const [search, setSearch] = useState("");
  const t = useT("docs");

  // Keyboard shortcut to focus search
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        document.getElementById("docs-search")?.focus();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // Filter sections based on search
  const filteredSections = NAV_SECTIONS.map((section) => {
    const sectionTitleKey = section.title === "Getting Started" ? "gettingStarted" : section.title === "Platform Guides" ? "platformGuides" : "advanced";
    const translatedTitle = t(`sidebar.categories.${sectionTitleKey}`);

    return {
      ...section,
      translatedTitle,
      items: section.items.map(item => {
        const itemKey = item.id.replace(/-([a-z])/g, g => g[1].toUpperCase());
        return {
          ...item,
          translatedLabel: t(`sidebar.items.${itemKey}`)
        }
      }).filter((item) =>
        item.translatedLabel.toLowerCase().includes(search.toLowerCase())
      ),
    }
  }).filter((s) => s.items.length > 0);

  const handleNav = (id: DocPageId) => {
    onNavigate(id);
    onClose();
    // Scroll to top of content area
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const sidebarContent = (
    <div className="flex h-full flex-col">
      {/* Search field */}
      <div className="px-4 pb-5">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-600 group-focus-within:text-neon-cyan transition-colors duration-200" />
          <input
            id="docs-search"
            type="text"
            placeholder={t("sidebar.searchPlaceholder")}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-white/[0.07] bg-white/[0.03] py-2 pl-9 pr-14 text-sm text-slate-300 placeholder-slate-600 outline-none transition-all duration-200 focus:border-neon-cyan/40 focus:bg-white/[0.05] focus:ring-1 focus:ring-neon-cyan/20"
          />
          <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-0.5 pointer-events-none">
            <kbd className="rounded border border-white/10 bg-white/[0.05] px-1.5 py-0.5 text-[10px] text-slate-600">
              <Command className="inline h-2.5 w-2.5" />
            </kbd>
            <kbd className="rounded border border-white/10 bg-white/[0.05] px-1.5 py-0.5 text-[10px] text-slate-600">
              K
            </kbd>
          </div>
        </div>
      </div>

      {/* Nav sections */}
      <nav className="flex-1 overflow-y-auto px-3 pb-10">
        <div className="space-y-7">
          {filteredSections.map((section) => (
            <div key={section.title}>
              {/* Section header */}
              <div className="mb-2.5 flex items-center gap-2 px-2">
                <span className="text-neon-cyan/60">{section.icon}</span>
                <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-slate-500">
                  {section.translatedTitle}
                </span>
              </div>

              {/* Nav links */}
              <ul className="space-y-0.5">
                {section.items.map((item) => {
                  const isActive = activePage === item.id;
                  return (
                    <li key={item.id}>
                      <button
                        onClick={() => handleNav(item.id)}
                        className={`group relative w-full flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-all duration-150 cursor-pointer ${
                          isActive
                            ? "bg-neon-cyan/10 text-white"
                            : "text-slate-500 hover:bg-white/[0.04] hover:text-slate-300"
                        }`}
                      >
                        {/* Active bar */}
                        {isActive && (
                          <motion.span
                            layoutId="docs-sidebar-active"
                            className="absolute left-0 top-1/2 h-[60%] w-[3px] -translate-y-1/2 rounded-r-full bg-neon-cyan shadow-[0_0_8px_rgba(6,182,212,0.6)]"
                            transition={{ type: "spring", stiffness: 400, damping: 32 }}
                          />
                        )}

                        <span className="pl-1 font-medium">{item.translatedLabel}</span>

                        <ChevronRight
                          className={`h-3.5 w-3.5 flex-shrink-0 transition-all duration-150 ${
                            isActive
                              ? "text-neon-cyan"
                              : "text-slate-700 group-hover:text-slate-500 group-hover:translate-x-0.5"
                          }`}
                        />
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}

          {filteredSections.length === 0 && (
            <div className="px-3 py-10 text-center">
              <p className="text-sm text-slate-600">{t("sidebar.noResults")}</p>
              <p className="mt-1 font-medium text-slate-400">
                &ldquo;{search}&rdquo;
              </p>
            </div>
          )}
        </div>
      </nav>
    </div>
  );

  return (
    <>
      {/* ── Desktop sidebar ──────────────────────────────────────── */}
      <aside className="hidden lg:flex w-60 xl:w-64 flex-col flex-shrink-0 border-r border-white/[0.06] sticky top-16 h-[calc(100vh-4rem)] overflow-hidden pt-7">
        {sidebarContent}
      </aside>

      {/* ── Mobile drawer ────────────────────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={onClose}
              className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
            />

            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed left-0 top-0 z-50 flex h-full w-72 flex-col border-r border-white/[0.07] bg-[#030014] pt-6 lg:hidden"
            >
              <button
                onClick={onClose}
                className="absolute right-4 top-4 rounded-lg p-1.5 text-slate-500 transition-colors hover:bg-white/5 hover:text-slate-300"
              >
                <X className="h-4 w-4" />
              </button>
              <div className="mb-4 px-4">
                <span className="text-xs font-bold uppercase tracking-widest text-neon-cyan">
                  Docs
                </span>
              </div>
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

// ── Mobile top bar ─────────────────────────────────────────────────────────

export function DocsMobileBar({ onOpen }: { onOpen: () => void }) {
  return (
    <div className="sticky top-16 z-30 flex items-center gap-3 border-b border-white/[0.06] bg-[#030014]/90 px-4 py-3 backdrop-blur-xl lg:hidden">
      <button
        onClick={onOpen}
        className="flex items-center gap-2 rounded-lg border border-white/[0.07] bg-white/[0.03] px-3 py-1.5 text-sm text-slate-400 transition-colors hover:bg-white/[0.06] hover:text-slate-200"
      >
        <Menu className="h-4 w-4" />
        <span>Menu</span>
      </button>
      <span className="text-slate-700">/</span>
      <span className="text-sm text-slate-400">Docs</span>
    </div>
  );
}

"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, Check, ChevronDown } from "lucide-react";
import { useLanguage, LANGUAGES, type Locale } from "@/i18n";

const EASE_SMOOTH: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

export default function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Close on Escape
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setIsOpen(false);
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  const currentLang = LANGUAGES[locale];

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs sm:text-sm font-medium text-slate-400 hover:text-white border border-glass-border hover:border-white/15 bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-200 cursor-pointer"
        aria-label="Change language"
      >
        <Globe className="h-3.5 w-3.5" />
        <span className="hidden sm:inline">{currentLang.flag} {currentLang.nativeName}</span>
        <span className="sm:hidden">{currentLang.flag}</span>
        <ChevronDown
          className={`h-3 w-3 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.2, ease: EASE_SMOOTH }}
            className="absolute right-0 top-full mt-2 z-50 min-w-[180px] rounded-xl border border-glass-border bg-[#0a0820]/95 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.5)] overflow-hidden"
          >
            <div className="py-1.5">
              {(Object.entries(LANGUAGES) as [Locale, typeof LANGUAGES[Locale]][]).map(
                ([code, lang]) => (
                  <button
                    key={code}
                    onClick={() => {
                      setLocale(code);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-all duration-150 cursor-pointer ${
                      code === locale
                        ? "text-neon-cyan-light bg-neon-cyan/[0.06]"
                        : "text-slate-300 hover:text-white hover:bg-white/[0.05]"
                    }`}
                  >
                    <span className="text-base">{lang.flag}</span>
                    <span className="flex-1 text-left">{lang.nativeName}</span>
                    <span className="text-xs text-slate-500">{lang.name}</span>
                    {code === locale && (
                      <Check className="h-3.5 w-3.5 text-neon-cyan" />
                    )}
                  </button>
                )
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

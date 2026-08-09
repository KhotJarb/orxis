"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import OrxisLogo from "@/components/OrxisLogo";
import {
  Menu,
  X,
  ChevronDown,
  BookOpen,
  LayoutGrid,
  History,
  Users,
  HelpCircle,
  Zap,
  Layers,
  Settings,
  Briefcase,
  Tag,
} from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher";
import { useT } from "@/i18n";

// ── Types ──────────────────────────────────────────────────────────────────

interface NavItem {
  name: string;
  href: string;
  icon?: React.ReactNode;
}

interface NavDropdownConfig {
  name: string;
  items: NavItem[];
}

// ── Data ───────────────────────────────────────────────────────────────────


// ── Rich dropdown (shared by both menus) ──────────────────────────────────

function RichDropdown({ dropdown }: { dropdown: NavDropdownConfig }) {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const open = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };
  const close = () => {
    timeoutRef.current = setTimeout(() => setIsOpen(false), 160);
  };

  return (
    <div className="relative" onMouseEnter={open} onMouseLeave={close}>
      {/* Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative flex items-center gap-1 px-4 py-2 text-sm font-medium text-[var(--text-muted)] transition-colors duration-300 hover:text-[var(--text-heading)] group cursor-pointer"
      >
        {dropdown.name}
        <ChevronDown
          className={`h-3.5 w-3.5 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
        <span className="absolute bottom-0 left-1/2 h-px w-0 -translate-x-1/2 bg-gradient-to-r from-neon-cyan to-neon-purple transition-all duration-300 group-hover:w-3/4" />
      </button>

      {/* Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.97 }}
            transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="absolute top-full left-0 mt-2 w-56 glass-strong rounded-2xl border border-[var(--border-medium)] p-2 shadow-2xl shadow-black/30 dark:shadow-black/50"
            style={{ backdropFilter: "blur(24px)" }}
          >
            {/* Top glow line */}
            <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-neon-cyan/30 to-transparent rounded-full" />

            <div className="flex flex-col gap-0.5 pt-1 pb-1">
              {dropdown.items.map((item, i) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04, duration: 0.18, ease: "easeOut" }}
                  className="group/item flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all duration-200 hover:bg-[var(--glass-bg-hover)] cursor-pointer"
                >
                  {/* Icon box */}
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[var(--border-subtle)] bg-[var(--glass-bg)] text-[var(--text-muted)] transition-all duration-200 group-hover/item:border-neon-cyan/20 group-hover/item:bg-neon-cyan/[0.08] group-hover/item:text-neon-cyan group-hover/item:shadow-[0_0_12px_rgba(6,182,212,0.2)]">
                    {item.icon}
                  </div>

                  {/* Label */}
                  <span className="text-sm font-medium text-[var(--text-body)] transition-colors duration-200 group-hover/item:text-[var(--text-heading)]">
                    {item.name}
                  </span>

                  {/* Arrow nudge */}
                  <span className="ml-auto text-[var(--text-subtle)] opacity-0 transition-all duration-200 group-hover/item:translate-x-0.5 group-hover/item:text-neon-cyan/60 group-hover/item:opacity-100">
                    ›
                  </span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Main Navbar ────────────────────────────────────────────────────────────

export default function Navbar() {
  const t = useT("common");
  
  const navDropdowns: NavDropdownConfig[] = [
    {
      name: t("nav.dropdowns.products"),
      items: [
        { name: t("nav.items.generator"),    href: "/generate",    icon: <Zap       className="h-4 w-4" /> },
        { name: t("nav.items.features"),     href: "/#features",   icon: <Layers    className="h-4 w-4" /> },
        { name: t("nav.items.howItWorks"), href: "/#how-it-works",icon: <Settings  className="h-4 w-4" /> },
        { name: t("nav.items.useCases"),    href: "/use-cases",   icon: <Briefcase className="h-4 w-4" /> },
        { name: t("nav.items.pricing"),      href: "/pricing",    icon: <Tag       className="h-4 w-4" /> },
      ],
    },
    {
      name: t("nav.dropdowns.resources"),
      items: [
        { name: t("nav.items.documentation"), href: "/docs", icon: <BookOpen    className="h-4 w-4" /> },
        { name: t("nav.items.promptGallery"), href: "/gallery", icon: <LayoutGrid  className="h-4 w-4" /> },
        { name: t("nav.items.changelog"),      href: "/changelog", icon: <History     className="h-4 w-4" /> },
        { name: t("nav.items.aboutUs"),       href: "/about", icon: <Users       className="h-4 w-4" /> },
        { name: t("nav.items.supportFaq"),  href: "/support", icon: <HelpCircle  className="h-4 w-4" /> },
      ],
    },
  ];

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "glass-strong shadow-lg shadow-black/20"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center md:h-20">
            {/* Logo */}
            <a href="/" className="flex items-center gap-2 group">
              <OrxisLogo className="w-8 h-8 transition-opacity duration-300 group-hover:opacity-90" />
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent font-bold tracking-tight text-xl">
                Orxis
              </span>
            </a>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-1 ml-14">
              {navDropdowns.map((dropdown) => (
                <RichDropdown key={dropdown.name} dropdown={dropdown} />
              ))}
            </div>

            {/* Desktop CTA + Language */}
            <div className="hidden md:flex items-center gap-3 ml-auto">
              <LanguageSwitcher />
              <a
                href="/generate"
                className="glow-btn inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold text-[var(--text-heading)] transition-all duration-300 hover:scale-105"
              >
                {t("nav.getStarted")}
              </a>
            </div>

            {/* Mobile toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden ml-auto flex h-10 w-10 items-center justify-center rounded-lg text-[var(--text-muted)] hover:text-[var(--text-heading)] hover:bg-[var(--glass-bg)] transition-colors"
              aria-label={t("nav.toggleMenu")}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-x-0 top-16 z-40 glass-strong p-6 md:hidden"
          >
            <div className="flex flex-col gap-2">
              {navDropdowns.map((dropdown, i) => (
                <motion.div
                  key={dropdown.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.3 }}
                >
                  <button
                    onClick={() =>
                      setMobileExpanded(
                        mobileExpanded === dropdown.name ? null : dropdown.name
                      )
                    }
                    className="flex items-center justify-between w-full text-lg font-medium text-[var(--text-body)] hover:text-[var(--text-heading)] transition-colors py-2.5 border-b border-[var(--border-subtle)] cursor-pointer"
                  >
                    {dropdown.name}
                    <ChevronDown
                      className={`h-4 w-4 transition-transform duration-300 ${
                        mobileExpanded === dropdown.name ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {mobileExpanded === dropdown.name && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        className="overflow-hidden"
                      >
                        <div className="py-2 flex flex-col gap-1">
                          {dropdown.items.map((item) => (
                            <a
                              key={item.name}
                              href={item.href}
                              onClick={() => setIsMobileMenuOpen(false)}
                              className="flex items-center gap-3 rounded-lg px-2 py-2.5 text-sm text-[var(--text-muted)] hover:text-[var(--text-heading)] hover:bg-[var(--glass-bg)] transition-all"
                            >
                              {item.icon && (
                                <span className="text-neon-cyan/70">
                                  {item.icon}
                                </span>
                              )}
                              {item.name}
                            </a>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navDropdowns.length * 0.1, duration: 0.3 }}
                className="mt-3 flex items-center gap-3"
              >
                <LanguageSwitcher />
              </motion.div>

              <motion.a
                href="/generate"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navDropdowns.length * 0.1 + 0.05, duration: 0.3 }}
                onClick={() => setIsMobileMenuOpen(false)}
                className="glow-btn mt-3 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white"
              >
                {t("nav.getStarted")}
              </motion.a>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

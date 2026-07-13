"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Monitor, Sun, Moon, Palette } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// ── Sidebar navigation — Appearance only (other tabs ship in future phases)
const sidebarItems: {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}[] = [
  { id: "appearance", label: "Appearance", icon: Palette },
];

// ── Theme card preview mini-mockups ──────────────────────────────────

function DarkPreview() {
  return (
    <div className="w-full h-20 rounded-lg overflow-hidden bg-[#030014] flex flex-col">
      <div className="h-4 bg-[#080820] flex items-center px-2 gap-1 flex-shrink-0">
        <div className="w-8 h-1.5 rounded-full bg-white/20" />
        <div className="w-12 h-1.5 rounded-full bg-white/10 ml-1" />
        <div className="ml-auto w-5 h-1.5 rounded-full bg-neon-purple/60" />
      </div>
      <div className="flex flex-1 gap-1 p-1.5">
        <div className="w-7 flex flex-col gap-1">
          <div className="h-1.5 rounded-full bg-white/10" />
          <div className="h-1.5 rounded-full bg-white/10" />
          <div className="h-1.5 rounded-full bg-neon-cyan/30" />
        </div>
        <div className="flex-1 flex flex-col gap-1">
          <div className="h-2 rounded bg-white/5 flex-1" />
          <div className="h-1.5 w-3/4 rounded bg-white/5" />
        </div>
      </div>
    </div>
  );
}

function LightPreview() {
  return (
    <div className="w-full h-20 rounded-lg overflow-hidden bg-[#f8fafc] flex flex-col">
      <div className="h-4 bg-[#f1f5f9] flex items-center px-2 gap-1 flex-shrink-0 border-b border-black/[0.05]">
        <div className="w-8 h-1.5 rounded-full bg-slate-400/40" />
        <div className="w-12 h-1.5 rounded-full bg-slate-300/40 ml-1" />
        <div className="ml-auto w-5 h-1.5 rounded-full bg-purple-400/60" />
      </div>
      <div className="flex flex-1 gap-1 p-1.5">
        <div className="w-7 flex flex-col gap-1">
          <div className="h-1.5 rounded-full bg-slate-300/50" />
          <div className="h-1.5 rounded-full bg-slate-300/50" />
          <div className="h-1.5 rounded-full bg-cyan-400/50" />
        </div>
        <div className="flex-1 flex flex-col gap-1">
          <div className="h-2 rounded bg-white flex-1 shadow-sm" />
          <div className="h-1.5 w-3/4 rounded bg-slate-100" />
        </div>
      </div>
    </div>
  );
}

function SystemPreview() {
  return (
    <div className="w-full h-20 rounded-lg overflow-hidden flex flex-col">
      {/* Left half: dark / Right half: light */}
      <div className="flex flex-1">
        <div className="w-1/2 bg-[#030014] flex flex-col p-1.5 gap-1">
          <div className="h-2 rounded bg-white/10" />
          <div className="h-1.5 w-2/3 rounded bg-white/5" />
        </div>
        <div className="w-px bg-gradient-to-b from-neon-cyan/40 to-neon-purple/40" />
        <div className="w-1/2 bg-[#f8fafc] flex flex-col p-1.5 gap-1">
          <div className="h-2 rounded bg-slate-200" />
          <div className="h-1.5 w-2/3 rounded bg-slate-100" />
        </div>
      </div>
    </div>
  );
}

// ── Theme option card ─────────────────────────────────────────────────

interface ThemeCardProps {
  id:       "system" | "light" | "dark";
  label:    string;
  icon:     React.ComponentType<{ className?: string }>;
  current:  string | undefined;
  onSelect: (t: string) => void;
}

function ThemeCard({ id, label, icon: Icon, current, onSelect }: ThemeCardProps) {
  const active = current === id;
  return (
    <button
      onClick={() => onSelect(id)}
      className={`
        group relative flex flex-col gap-3 rounded-xl p-3 border text-left
        transition-all duration-200 cursor-pointer w-full
        ${active
          ? "border-neon-cyan/40 bg-neon-cyan/[0.05] shadow-[0_0_20px_rgba(6,182,212,0.08)]"
          : "border-[var(--border-subtle)] bg-[var(--glass-bg)] hover:border-[var(--border-medium)] hover:bg-[var(--glass-bg-hover)]"
        }
      `}
      aria-pressed={active}
    >
      {/* Active ring */}
      {active && (
        <div className="absolute inset-0 rounded-xl ring-1 ring-neon-cyan/30 pointer-events-none" />
      )}

      {/* Mini preview */}
      {id === "dark"   && <DarkPreview />}
      {id === "light"  && <LightPreview />}
      {id === "system" && <SystemPreview />}

      {/* Label row */}
      <div className="flex items-center gap-2 px-0.5">
        <Icon className={`h-4 w-4 shrink-0 ${active ? "text-neon-cyan" : "text-[var(--text-muted)]"}`} />
        <span className={`text-sm font-medium ${active ? "text-[var(--text-heading)]" : "text-[var(--text-body)]"}`}>
          {label}
        </span>
        {active && (
          <div className="ml-auto h-2 w-2 rounded-full bg-neon-cyan" aria-label="Active" />
        )}
      </div>
    </button>
  );
}

// ── Page ─────────────────────────────────────────────────────────────

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();

  // Prevents hydration mismatch — theme is undefined on first server render.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <main className="relative min-h-screen bg-background">
      <Navbar />
      <div className="pt-20" />

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">

        {/* Page header */}
        <div className="mb-10">
          <h1 className="text-2xl font-bold tracking-tight text-[var(--text-heading)] sm:text-3xl">
            Settings
          </h1>
          <p className="mt-1.5 text-sm text-[var(--text-muted)]">
            Manage your preferences for the Orxis application.
          </p>
        </div>

        {/* Two-column grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-[220px_1fr]">

          {/* ── Sidebar ─────────────────────────────────────────── */}
          <aside>
            <nav className="flex flex-col gap-1" aria-label="Settings navigation">
              {sidebarItems.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium
                      bg-neon-cyan/[0.08] text-neon-cyan border border-neon-cyan/20"
                    aria-current="page"
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    <span>{item.label}</span>
                  </div>
                );
              })}
            </nav>
          </aside>

          {/* ── Main content ─────────────────────────────────────── */}
          <section>

            {/* Appearance section always renders since it's the only one */}
              <div className="space-y-8">

                {/* Section: Theme */}
                <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--glass-bg)] p-6">
                  <div className="mb-6">
                    <h2 className="text-base font-semibold text-[var(--text-heading)]">
                      Theme
                    </h2>
                    <p className="mt-1 text-[13px] text-[var(--text-muted)]">
                      Choose how Orxis looks. System follows your OS preference.
                    </p>
                  </div>

                  {!mounted ? (
                    /* Skeleton while resolving theme (prevents hydration flash) */
                    <div className="grid grid-cols-3 gap-3">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="h-32 rounded-xl border border-[var(--border-subtle)] animate-pulse bg-[var(--glass-bg)]" />
                      ))}
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                      <ThemeCard id="system" label="System"  icon={Monitor} current={theme} onSelect={setTheme} />
                      <ThemeCard id="light"  label="Light"   icon={Sun}     current={theme} onSelect={setTheme} />
                      <ThemeCard id="dark"   label="Dark"    icon={Moon}    current={theme} onSelect={setTheme} />
                    </div>
                  )}

                  {/* Active theme feedback */}
                  {mounted && (
                    <p className="mt-4 text-[12px] text-[var(--text-subtle)]">
                      Current preference:{" "}
                      <span className="text-neon-cyan font-medium capitalize">{theme ?? "system"}</span>.
                      Changes apply immediately and are saved to your browser.
                    </p>
                  )}
                </div>

                {/* Section: Accent — placeholder for future customisation */}
                <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--glass-bg)] p-6 opacity-50 select-none">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-base font-semibold text-[var(--text-heading)]">
                        Accent Color
                      </h2>
                      <p className="mt-1 text-[13px] text-[var(--text-muted)]">
                        Custom accent colours — coming in a future update.
                      </p>
                    </div>
                    <span className="text-[10px] tracking-widest uppercase text-[var(--text-subtle)] border border-[var(--border-subtle)] px-2 py-1 rounded-full">
                      Soon
                    </span>
                  </div>
                </div>

              </div>{/* /space-y-8 */}

          </section>

        </div>
      </div>

      <Footer />
    </main>
  );
}

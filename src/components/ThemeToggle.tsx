"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Monitor, Sun, Moon } from "lucide-react";

const OPTIONS = [
  { id: "system", icon: Monitor, label: "System" },
  { id: "light",  icon: Sun,     label: "Light"  },
  { id: "dark",   icon: Moon,    label: "Dark"   },
] as const;

type ThemeId = (typeof OPTIONS)[number]["id"];

// ── ThemeToggle ───────────────────────────────────────────────────────────
// A compact three-button segmented control for switching theme preferences.
// Placed in the Footer bottom bar; also importable anywhere in the app.

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevents hydration mismatch — `theme` is undefined on the server.
  useEffect(() => setMounted(true), []);

  // Render a same-size invisible placeholder until mounted, so the layout
  // doesn't shift when the real buttons appear.
  if (!mounted) {
    return (
      <div className="inline-flex items-center gap-0.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--glass-bg)] p-1 opacity-0 pointer-events-none">
        {OPTIONS.map((o) => (
          <div key={o.id} className="h-7 w-7 rounded-md" />
        ))}
      </div>
    );
  }

  return (
    <div
      role="group"
      aria-label="Theme preference"
      className="inline-flex items-center gap-0.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--glass-bg)] p-1 backdrop-blur-sm"
    >
      {OPTIONS.map(({ id, icon: Icon, label }) => {
        const active = (theme as ThemeId) === id;
        return (
          <button
            key={id}
            onClick={() => setTheme(id)}
            aria-label={`Switch to ${label} theme`}
            aria-pressed={active}
            title={label}
            className={`
              flex h-7 w-7 items-center justify-center rounded-md
              transition-all duration-150 cursor-pointer
              ${active
                ? "bg-neon-cyan/[0.12] text-neon-cyan shadow-[inset_0_0_0_1px_rgba(6,182,212,0.2)]"
                : "text-[var(--text-muted)] hover:text-[var(--text-body)] hover:bg-[var(--glass-bg-hover)]"
              }
            `}
          >
            <Icon
              className="h-3.5 w-3.5"
              strokeWidth={active ? 2.5 : 2}
            />
          </button>
        );
      })}
    </div>
  );
}

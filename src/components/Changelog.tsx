"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useT, useLanguage } from "@/i18n";

const CATEGORY_STYLES: Record<string, { accent: string; dot: string }> = {
  Features: { accent: "text-neon-cyan bg-neon-cyan/10 border border-neon-cyan/20", dot: "bg-neon-cyan/60" },
  Design: { accent: "text-neon-purple bg-neon-purple/10 border border-neon-purple/20", dot: "bg-neon-purple/60" },
  Platform: { accent: "text-emerald-400 bg-emerald-500/10 border border-emerald-500/20", dot: "bg-emerald-400/60" },
  "Legal & Transparency": { accent: "text-amber-400 bg-amber-500/10 border border-amber-500/20", dot: "bg-amber-400/60" },
  Documentation: { accent: "text-blue-400 bg-blue-500/10 border border-blue-500/20", dot: "bg-blue-400/60" },
};

type CategoryEntry = { labelKey: string; label: string; items: string[] };
type Release = { version: string; date: string; tag: string; overview: string; categories: CategoryEntry[] };

export default function Changelog() {
  const t = useT("pages");
  const { locale } = useLanguage();
  const [releases, setReleases] = useState<Release[]>([]);

  useEffect(() => {
    import(`@/i18n/locales/${locale}/pages.json`)
      .then((mod) => {
        setReleases(mod.default?.changelog?.releases || mod.changelog?.releases || []);
      })
      .catch(() => {
        import(`@/i18n/locales/en/pages.json`).then((mod) => {
          setReleases(mod.default?.changelog?.releases || mod.changelog?.releases || []);
        });
      });
  }, [locale]);

  return (
    <main className="relative min-h-screen bg-[#030014]">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,_rgba(139,92,246,0.06)_0%,_transparent_60%)]" />
      <Navbar />
      <div className="pt-20" />
      <div className="relative mx-auto max-w-2xl px-4 sm:px-6 py-16 sm:py-24">
        <header className="mb-16 sm:mb-20">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-neon-purple-light mb-3">
            {t("changelog.badge")}
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-[var(--text-heading)] mb-4">
            {t("changelog.title")}
          </h1>
          <p className="text-base sm:text-lg text-[var(--text-muted)] leading-relaxed">
            {t("changelog.subtitle")}
          </p>
          <div className="mt-8 h-px bg-gradient-to-r from-white/10 to-transparent" />
        </header>
        <div className="relative">
          <div aria-hidden="true" className="absolute left-0 top-2 h-full w-px bg-gradient-to-b from-neon-purple/25 via-white/[0.06] to-transparent hidden sm:block" />
          <ol className="space-y-20">
            {releases.map((release) => (
              <li key={release.version} className="relative sm:pl-9">
                <span aria-hidden="true" className="absolute -left-[5px] top-[7px] hidden sm:block h-[10px] w-[10px] rounded-full bg-neon-purple/70 ring-[3px] ring-[#030014]" />
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1.5 mb-5">
                  <span className="inline-flex items-center rounded-full border border-neon-purple/25 bg-neon-purple/10 px-2.5 py-0.5 font-mono text-xs font-semibold tracking-wide text-neon-purple-light">
                    {release.version}
                  </span>
                  <time dateTime={release.date} className="text-sm text-[var(--text-subtle)]">
                    {release.date}
                  </time>
                  <span className="text-sm text-[var(--text-subtle)]">&middot;</span>
                  <span className="text-sm font-medium text-[var(--text-muted)]">{release.tag}</span>
                </div>
                <p className="mb-10 text-[15px] leading-[1.8] text-[var(--text-body)]">
                  {release.overview}
                </p>
                <div className="space-y-9">
                  {release.categories.map((cat) => {
                    const styles = CATEGORY_STYLES[cat.labelKey] || CATEGORY_STYLES["Features"];

                    return (
                    <section key={cat.labelKey}>
                      <div className="mb-4">
                        <span className={`inline-flex items-center rounded-md px-2.5 py-[3px] text-[10.5px] font-semibold uppercase tracking-[0.1em] ${styles.accent}`}>
                          {cat.label}
                        </span>
                      </div>
                      <ul className="space-y-[11px]">
                        {cat.items.map((item, i) => (
                          <li key={i} className="flex gap-[11px] text-[13.5px] leading-relaxed text-[var(--text-muted)]">
                            <span className={`mt-[7px] h-[5px] w-[5px] shrink-0 rounded-full ${styles.dot}`} />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </section>
                    );
                  })}
                </div>
                <div className="mt-14 h-px bg-gradient-to-r from-white/[0.07] via-white/[0.04] to-transparent" />
              </li>
            ))}
          </ol>
        </div>
        <footer className="mt-14 text-center">
          <p className="text-xs text-[var(--text-subtle)] leading-relaxed">
            {t("changelog.footer", { defaultValue: "Orxis follows <1>Semantic Versioning</1>. Entries are listed in reverse chronological order." }).split("<1>")[0]}
            <a href="https://semver.org" target="_blank" rel="noopener noreferrer" className="text-[var(--text-muted)] underline underline-offset-[3px] decoration-white/20 hover:text-[var(--text-body)] hover:decoration-white/40 transition-colors duration-200">
              {t("changelog.footer", { defaultValue: "Orxis follows <1>Semantic Versioning</1>. Entries are listed in reverse chronological order." }).split("<1>")[1]?.split("</1>")[0] || "Semantic Versioning"}
            </a>
            {t("changelog.footer", { defaultValue: "Orxis follows <1>Semantic Versioning</1>. Entries are listed in reverse chronological order." }).split("</1>")[1]}
          </p>
        </footer>
      </div>
      <Footer />
    </main>
  );
}

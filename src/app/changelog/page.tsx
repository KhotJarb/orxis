import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Changelog | Orxis",
  description: "New updates and improvements to the Orxis platform. A complete record of releases, fixes, and architectural changes.",
};

type CategoryEntry = { label: string; accent: string; dot: string; items: string[] };
type Release = { version: string; date: string; tag: string; overview: string; categories: CategoryEntry[] };

const releases: Release[] = [
  {
    version: "v0.1.0",
    date: "July 13, 2026",
    tag: "Initial Release",
    overview:
      "This release establishes the foundational platform architecture, design system, and all core user-facing features. Orxis operates entirely in the browser \u2014 no accounts, no API keys, and no data leaves the device.",
    categories: [
      {
        label: "Features",
        accent: "text-neon-cyan bg-neon-cyan/10 border border-neon-cyan/20",
        dot: "bg-neon-cyan/60",
        items: [
          "Launched the core Orxis instruction generator. The entire generation pipeline runs client-side \u2014 no server processes your input, and no credentials are required to use the tool.",
          "Introduced a six-section instruction architecture \u2014 Role & Identity, Mission, Cognitive Loop, Context & Input, Boundaries & Execution Rules, and Output Formatting \u2014 that produces structured, paste-ready system prompts.",
          "Built the Output Studio: a dedicated interface for reviewing, copying, and inspecting the generated instruction by section. Includes a live character count.",
          "Added a Before/After comparison on the landing page, demonstrating the practical difference between an unstructured and a structured AI response to the same prompt.",
          "Added a Prompt Gallery at /gallery for browsing and referencing instruction templates contributed by the community.",
          "Published a Use Cases section covering practical workflows for software developers, content creators, and prompt engineers.",
        ],
      },
      {
        label: "Design",
        accent: "text-neon-purple bg-neon-purple/10 border border-neon-purple/20",
        dot: "bg-neon-purple/60",
        items: [
          "Introduced the Orxis visual identity: a custom logo mark, a Periwinkle-to-Violet gradient accent system, and a dark-first interface designed for extended use sessions.",
          "Applied a consistent theming system across every page, ensuring coherent colour, spacing, and typography throughout the product.",
          "Card and surface elements use a glassmorphism treatment \u2014 frosted depth layers, subtle borders, and neon accent highlights on interaction states \u2014 to maintain clear visual hierarchy.",
        ],
      },
      {
        label: "Platform",
        accent: "text-emerald-400 bg-emerald-500/10 border border-emerald-500/20",
        dot: "bg-emerald-400/60",
        items: [
          "The app is installable directly from your browser as a Progressive Web App on supported desktop and mobile devices \u2014 no app store required.",
          "Added a Settings page with a structured layout, ready to expand as new configuration options are introduced in future updates.",
        ],
      },
      {
        label: "Legal & Transparency",
        accent: "text-amber-400 bg-amber-500/10 border border-amber-500/20",
        dot: "bg-amber-400/60",
        items: [
          "Published Privacy Policy, Terms of Service, and License pages \u2014 each accessible from the site footer.",
          "The Privacy Policy documents our local-first data model: your inputs are processed entirely within the browser session and are never transmitted to or stored on external servers.",
          "The Terms of Service defines acceptable use in plain, specific language. The License page clarifies usage rights for the platform and for prompts you generate.",
        ],
      },
      {
        label: "Documentation",
        accent: "text-blue-400 bg-blue-500/10 border border-blue-500/20",
        dot: "bg-blue-400/60",
        items: [
          "Launched the Orxis documentation hub at /docs, covering a quick-start guide and a detailed reference for each of the six instruction sections.",
          "Published per-model integration guides for ChatGPT, Claude, and Gemini, covering recommended setup methods and platform-specific behaviours relevant to structured instruction use.",
        ],
      },
    ],
  },
];

export default function ChangelogPage() {
  return (
    <main className="relative min-h-screen bg-[#030014]">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,_rgba(139,92,246,0.06)_0%,_transparent_60%)]" />
      <Navbar />
      <div className="pt-20" />
      <div className="relative mx-auto max-w-2xl px-4 sm:px-6 py-16 sm:py-24">
        <header className="mb-16 sm:mb-20">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-neon-purple-light mb-3">
            Orxis Platform
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-[var(--text-heading)] mb-4">
            Changelog
          </h1>
          <p className="text-base sm:text-lg text-[var(--text-muted)] leading-relaxed">
            New updates and improvements to the Orxis ecosystem.
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
                  {release.categories.map((cat) => (
                    <section key={cat.label}>
                      <div className="mb-4">
                        <span className={`inline-flex items-center rounded-md px-2.5 py-[3px] text-[10.5px] font-semibold uppercase tracking-[0.1em] ${cat.accent}`}>
                          {cat.label}
                        </span>
                      </div>
                      <ul className="space-y-[11px]">
                        {cat.items.map((item, i) => (
                          <li key={i} className="flex gap-[11px] text-[13.5px] leading-relaxed text-[var(--text-muted)]">
                            <span className={`mt-[7px] h-[5px] w-[5px] shrink-0 rounded-full ${cat.dot}`} />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </section>
                  ))}
                </div>
                <div className="mt-14 h-px bg-gradient-to-r from-white/[0.07] via-white/[0.04] to-transparent" />
              </li>
            ))}
          </ol>
        </div>
        <footer className="mt-14 text-center">
          <p className="text-xs text-[var(--text-subtle)] leading-relaxed">
            Orxis follows{" "}
            <a href="https://semver.org" target="_blank" rel="noopener noreferrer" className="text-[var(--text-muted)] underline underline-offset-[3px] decoration-white/20 hover:text-[var(--text-body)] hover:decoration-white/40 transition-colors duration-200">
              Semantic Versioning
            </a>
            . Entries are listed in reverse chronological order.
          </p>
        </footer>
      </div>
      <Footer />
    </main>
  );
}
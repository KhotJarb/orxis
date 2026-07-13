import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "License | Orxis",
  description:
    "Licensing terms for the Orxis application and the prompts you generate with it.",
};

// ── Shared prose helpers (mirrored from other legal pages) ────────────

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mt-12 mb-4 text-[17px] font-semibold text-white border-b border-white/[0.07] pb-2">
      {children}
    </h2>
  );
}

function Body({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[14.5px] leading-[1.9] text-slate-400 mt-3">
      {children}
    </p>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="mt-3 ml-5 list-disc space-y-2">
      {items.map((item) => (
        <li key={item} className="text-[14.5px] leading-[1.8] text-slate-400">
          {item}
        </li>
      ))}
    </ul>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────

export default function LicensePage() {
  return (
    <article>

      {/* Header */}
      <div className="mb-10">
        <p className="mb-3 text-[10.5px] font-bold uppercase tracking-[0.16em] text-slate-600">
          Legal
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          License &amp; Copyright
        </h1>
        <p className="mt-3 text-[13px] text-slate-600">
          Last Updated: <span className="text-slate-500">July 13, 2026</span>
        </p>
      </div>

      {/* Intro */}
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] px-6 py-5">
        <Body>
          This page clarifies what is ours, what is yours, and what is covered
          by the open-source licenses of the libraries we build on. The short
          version: the application belongs to Orxis; the prompts you generate
          belong entirely to you.
        </Body>
        <Body>
          Orxis is released under a custom{" "}
          <strong className="text-slate-300">
            Proprietary Non-Commercial License
          </strong>
          . You are welcome to clone and run it locally for personal or
          educational purposes, but commercial use, redistribution, and
          white-labeling are strictly prohibited without prior written
          permission.
        </Body>
      </div>

      {/* Section 1 */}
      <SectionHeading>1. Application License (Proprietary)</SectionHeading>
      <Body>
        The Orxis application — including its source code, UI components, design
        system, six-section prompt generation framework, brand assets, and all
        associated intellectual property — is proprietary and owned by Orxis.
      </Body>
      <Body>
        No part of the application may be copied, reproduced, distributed,
        modified, commercially deployed, or used as the basis for a derivative
        or competing service without prior written permission from Orxis. The
        full terms are set out in the{" "}
        <a
          href="https://github.com/khotjarb/orxis/blob/main/LICENSE"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 underline underline-offset-2 hover:text-blue-300"
        >
          LICENSE
        </a>{" "}
        file in the repository.
      </Body>

      {/* Section 2 — Permitted Uses */}
      <SectionHeading>2. What You May Do</SectionHeading>
      <Body>
        The following uses are explicitly permitted under this license, free of
        charge and without requiring prior permission:
      </Body>
      <BulletList
        items={[
          "Clone or download the repository for personal, local use",
          "Read and study the source code for educational or portfolio-review purposes",
          "Run the application locally on your own hardware for personal experimentation",
          "Use, sell, or publish any prompts and instructions you generate with Orxis — freely, with no attribution required",
        ]}
      />

      {/* Section 3 — Restrictions */}
      <SectionHeading>3. What You May Not Do</SectionHeading>
      <Body>
        The following uses are strictly prohibited without prior written
        permission from Orxis:
      </Body>
      <BulletList
        items={[
          "Deploy, host, or operate the application — or any version of it — as a public or commercial service (SaaS, freemium, or otherwise)",
          "White-label, rebrand, or resell the application or any substantial portion of its design and functionality as your own product",
          "Reproduce or substantially replicate the application's UI/UX design, component architecture, or visual design system in a competing or commercial product",
          "Distribute, sublicense, or sell the application's source code or any derivative thereof to any third party",
          "Modify or create derivative works for public deployment or commercial gain",
          "Decompile, reverse engineer, or disassemble any part of the application beyond what applicable law expressly permits",
          "Remove or alter any proprietary notices, copyright marks, or branding",
          "Use the Orxis name, logo, or brand identity in your own products or marketing without written permission",
          "Represent your generated prompts as officially certified, endorsed, or guaranteed by Orxis",
        ]}
      />

      {/* Section 4 */}
      <SectionHeading>4. Your Generated Prompts</SectionHeading>
      <Body>
        The instruction prompts you create using Orxis are yours — fully and
        without restriction. We make no ownership claim over the content you
        produce. You are free to use your generated prompts in any context —
        personal, professional, or commercial — with no attribution to Orxis
        required.
      </Body>
      <Body>
        This freedom applies regardless of whether you use the prompts in a
        paid product, client deliverable, or monetized content. The only
        external constraint is the usage policy of the underlying AI model
        provider you deploy them with (e.g., OpenAI&apos;s policy for GPT-4,
        Google&apos;s policy for Gemini).
      </Body>
      <Body>
        Orxis provides the generation framework and tooling; the resulting
        output is your work product.
      </Body>

      {/* Section 5 */}
      <SectionHeading>5. Community Gallery Submissions</SectionHeading>
      <Body>
        By voluntarily submitting a prompt to the Community Gallery, you grant
        Orxis a non-exclusive, royalty-free, worldwide license to display and
        distribute that content within the application and related promotional
        materials. You retain full authorship and ownership of the submitted
        content.
      </Body>
      <Body>
        You may request removal of your submission by contacting us at{" "}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="mailto:orxis.app@gmail.com"
          className="text-blue-400 underline underline-offset-2 hover:text-blue-300"
        >
          orxis.app@gmail.com
        </a>
        . We will process removal requests within a reasonable timeframe.
      </Body>

      {/* Section 6 */}
      <SectionHeading>6. Open-Source Dependencies</SectionHeading>
      <Body>
        Orxis is built using open-source software. Each library is used in
        accordance with its respective license. Our primary dependencies
        include:
      </Body>
      <BulletList
        items={[
          "Next.js — MIT License (Vercel, Inc.)",
          "Tailwind CSS — MIT License (Tailwind Labs, Inc.)",
          "Framer Motion — MIT License (Framer B.V.)",
          "Lucide Icons — ISC License (Lucide Contributors)",
          "React — MIT License (Meta Platforms, Inc.)",
        ]}
      />
      <Body>
        The use of these libraries within Orxis does not extend any open-source
        license rights to the Orxis application itself. The MIT or other
        licenses apply solely to the respective libraries, not to our
        application code.
      </Body>

      {/* Section 7 */}
      <SectionHeading>7. Copyright Notice</SectionHeading>
      <Body>
        © 2026 Orxis. All rights reserved. Unauthorised reproduction or
        distribution of this application or any portion of it may result in
        civil and criminal penalties, and will be pursued to the maximum extent
        permitted by law.
      </Body>

      {/* Section 8 */}
      <SectionHeading>8. Contact</SectionHeading>
      <Body>
        For licensing inquiries, partnership requests, or to report suspected
        infringement, contact us at{" "}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="mailto:orxis.app@gmail.com"
          className="text-blue-400 underline underline-offset-2 hover:text-blue-300"
        >
          orxis.app@gmail.com
        </a>
        .
      </Body>

      {/* Footer note */}
      <div className="mt-16 border-t border-white/[0.05] pt-8">
        <p className="text-[12.5px] text-slate-700">
          Governed by the laws of Thailand. This page does not constitute legal
          advice. Consult a qualified legal professional for advice specific to
          your situation.
        </p>
      </div>

    </article>
  );
}

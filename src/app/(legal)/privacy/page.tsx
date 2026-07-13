import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Orxis",
  description:
    "How Orxis handles your data — what we collect, what we don't, and how we use it.",
};

// ── Shared prose helpers ─────────────────────────────────────────────────
// Avoids repeating long class strings across sections.

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

export default function PrivacyPage() {
  return (
    <article>

      {/* Header */}
      <div className="mb-10">
        <p className="mb-3 text-[10.5px] font-bold uppercase tracking-[0.16em] text-slate-600">
          Legal
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Privacy Policy
        </h1>
        <p className="mt-3 text-[13px] text-slate-600">
          Last Updated: <span className="text-slate-500">July 12, 2026</span>
        </p>
      </div>

      {/* Intro */}
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] px-6 py-5">
        <Body>
          Orxis is a browser-based AI instruction generator. This policy explains
          what information we handle, how we handle it, and why. It is written to
          be readable, not to overwhelm you. If you have questions, contact us at{" "}
          <a target="_blank" rel="noopener noreferrer" href="mailto:orxis.app@gmail.com"
            className="text-blue-400 underline underline-offset-2 hover:text-blue-300"
          >
            orxis.app@gmail.com
          </a>
          .
        </Body>
      </div>

      {/* Section 1 */}
      <SectionHeading>1. What We Collect</SectionHeading>
      <Body>
        By default, Orxis operates on the client side. When you use the generator,
        your inputs — persona, task, tone, and rules — are processed in your browser
        or sent directly to the underlying language model API. We do not log, store,
        or transmit your raw inputs to our own servers.
      </Body>
      <Body>
        The one exception: if you choose to submit a generated prompt to the
        Community Gallery, the submission content (title, category, tags,
        description, and prompt text) is stored in our database. This is a
        deliberate, voluntary action on your part.
      </Body>

      {/* Section 2 */}
      <SectionHeading>2. What We Do Not Collect</SectionHeading>
      <BulletList
        items={[
          "The text of your generated instructions, unless you explicitly submit them to the Gallery",
          "Account or profile information — we do not require sign-up to use the generator",
          "Payment or financial data of any kind",
          "Device fingerprints or persistent tracking identifiers",
        ]}
      />

      {/* Section 3 */}
      <SectionHeading>3. Analytics</SectionHeading>
      <Body>
        We may use standard, anonymized analytics tools to understand how the
        application is used at a functional level — for example, which pages are
        visited and general usage patterns. This data is aggregated and does not
        include your prompt content or personally identifiable information.
      </Body>
      <Body>
        <span className="text-slate-500 italic">
          [Placeholder: Update this section with your specific analytics tool, e.g.,
          Plausible, Vercel Analytics, or remove if not applicable.]
        </span>
      </Body>

      {/* Section 4 */}
      <SectionHeading>4. No Third-Party Data Selling</SectionHeading>
      <Body>
        We do not sell, trade, or rent any user data to third parties. This applies
        regardless of whether the data was collected through the generator or through
        the Community Gallery.
      </Body>

      {/* Section 5 */}
      <SectionHeading>5. Community Gallery Submissions</SectionHeading>
      <Body>
        If you submit a prompt to the Community Gallery, that prompt becomes publicly
        visible to other users of the application. You should not include personally
        identifiable information, confidential content, or proprietary data in any
        Gallery submission. We may review submissions for moderation purposes.
      </Body>

      {/* Section 6 */}
      <SectionHeading>6. Third-Party Services</SectionHeading>
      <Body>
        Orxis is deployed on Vercel and uses Airtable to store Community Gallery
        submissions. Each service operates under its own privacy policy and data
        handling practices. We recommend reviewing them independently:
      </Body>
      <BulletList
        items={[
          "Vercel Privacy Policy — vercel.com/legal/privacy-policy",
          "Airtable Privacy Policy — airtable.com/privacy",
        ]}
      />

      {/* Section 7 */}
      <SectionHeading>7. Data Security</SectionHeading>
      <Body>
        We follow standard practices for securing the data we handle. That said, no
        system connected to the internet can be guaranteed fully secure. We recommend
        not submitting anything sensitive or confidential to the Community Gallery.
      </Body>

      {/* Section 8 */}
      <SectionHeading>8. Changes to This Policy</SectionHeading>
      <Body>
        We may update this policy as the application evolves. Significant changes
        will be reflected in the "Last Updated" date at the top of this page.
        Continued use of Orxis after changes are posted constitutes acceptance of
        the revised policy.
      </Body>

      {/* Section 9 */}
      <SectionHeading>9. Contact</SectionHeading>
      <Body>
        For questions or concerns about this policy, contact us at{" "}
        <a target="_blank" rel="noopener noreferrer" href="mailto:orxis.app@gmail.com"
          className="text-blue-400 underline underline-offset-2 hover:text-blue-300"
        >
          orxis.app@gmail.com
        </a>
        .
      </Body>

      {/* Footer note */}
      <div className="mt-16 border-t border-white/[0.05] pt-8">
        <p className="text-[12.5px] text-slate-700">
          Orxis is operated under the laws of Thailand. This policy does not
          constitute legal advice.
        </p>
      </div>

    </article>
  );
}

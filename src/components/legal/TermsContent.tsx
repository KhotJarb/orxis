"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/i18n";
import Link from "next/link";

// ── Shared prose helpers ─────────────────────────────────────────────────

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

function parseFormattedText(text: string) {
  if (typeof text !== "string") return text;
  if (!text.includes("<1>")) return text;
  
  const parts = text.split(/(<1>.*?<\/1>)/);
  return parts.map((part, i) => {
    if (part.startsWith("<1>") && part.endsWith("</1>")) {
      const inner = part.slice(3, -4);
      if (inner.includes("@")) {
        return (
          <a key={i} target="_blank" rel="noopener noreferrer" href={`mailto:${inner}`} className="text-blue-400 underline underline-offset-2 hover:text-blue-300">
            {inner}
          </a>
        );
      }
      if (inner === "LICENSE") {
        return (
          <a key={i} href="https://github.com/khotjarb/orxis/blob/main/LICENSE" target="_blank" rel="noopener noreferrer" className="text-blue-400 underline underline-offset-2 hover:text-blue-300">
            {inner}
          </a>
        );
      }
      if (inner === "Proprietary Non-Commercial License") {
        return <strong key={i} className="text-slate-300">{inner}</strong>;
      }
      if (inner.toLowerCase().includes("license")) {
        return (
          <Link key={i} href="/license" className="text-blue-400 underline underline-offset-2 hover:text-blue-300">
            {inner}
          </Link>
        );
      }
      return <span key={i} className="text-blue-400 underline underline-offset-2">{inner}</span>;
    }
    return part;
  });
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="mt-3 ml-5 list-disc space-y-2">
      {items.map((item, idx) => (
        <li key={idx} className="text-[14.5px] leading-[1.8] text-slate-400">
          {parseFormattedText(item)}
        </li>
      ))}
    </ul>
  );
}

// ── Component ────────────────────────────────────────────────────────────

export default function TermsContent() {
  const { locale } = useLanguage();
  const [legalData, setLegalData] = useState<any>(null);

  useEffect(() => {
    let isMounted = true;
    import(`@/i18n/locales/${locale}/legal.json`)
      .catch(() => import("@/i18n/locales/en/legal.json"))
      .then(m => {
        if (isMounted) setLegalData(m.default ?? m);
      });
    return () => { isMounted = false; };
  }, [locale]);

  const data = legalData?.terms;
  if (!data) return null;

  return (
    <article>
      {/* Header */}
      <div className="mb-10">
        <p className="mb-3 text-[10.5px] font-bold uppercase tracking-[0.16em] text-slate-600">
          Legal
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          {data.title}
        </h1>
        <p className="mt-3 text-[13px] text-slate-600">
          Last Updated: <span className="text-slate-500">{data.lastUpdated}</span>
        </p>
      </div>

      {/* Intro */}
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] px-6 py-5">
        {Array.isArray(data.intro) ? (
          data.intro.map((p: string, i: number) => (
            <Body key={i}>{parseFormattedText(p)}</Body>
          ))
        ) : (
          <Body>{parseFormattedText(data.intro)}</Body>
        )}
      </div>

      {/* Sections */}
      {data.sections.map((section: any) => (
        <div key={section.heading}>
          <SectionHeading>{section.heading}</SectionHeading>
          {section.paragraphs?.map((p: string, i: number) => (
            <Body key={i}>{parseFormattedText(p)}</Body>
          ))}
          {section.list && (
            <BulletList items={section.list} />
          )}
          {section.afterList && (
            <Body>{parseFormattedText(section.afterList)}</Body>
          )}
        </div>
      ))}

      {/* Footer note */}
      <div className="mt-16 border-t border-white/[0.05] pt-8">
        <p className="text-[12.5px] text-slate-700">
          {data.footerNote}
        </p>
      </div>
    </article>
  );
}

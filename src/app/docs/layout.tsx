import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Documentation | Orxis",
  description: "Complete documentation for the Orxis platform. Integration guides for ChatGPT, Claude, Gemini, and more.",
};

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import ClientProviders from "@/components/ClientProviders";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext", "vietnamese"],
  display: "swap",
});

// ── Viewport ────────────────────────────────────────────────────────────

export const viewport: Viewport = {
  themeColor:   "#0F172A",
  width:        "device-width",
  initialScale: 1,
  maximumScale: 1,
};

// ── Metadata ────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title:       "Orxis | Orchestrate AI with Strict Boundaries",
  description: "Orxis is a structured AI custom instruction generator. Define precise roles, cognitive loops, and output boundaries for ChatGPT, Claude, Gemini, and other LLMs.",
  keywords: [
    "Orxis", "AI custom instructions", "prompt engineering",
    "system prompt", "ChatGPT", "Claude", "Gemini", "LLM orchestration",
  ],
  authors:  [{ name: "Orxis" }],
  manifest: "/manifest.webmanifest",
  openGraph: {
    title:       "Orxis | Orchestrate AI with Strict Boundaries",
    description: "Define precise roles, boundaries, and cognitive loops for any LLM. Structured, not generic.",
    type:        "website",
  },
};

// ── Layout ──────────────────────────────────────────────────────────────

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} dark`}>
      <body className="min-h-screen antialiased bg-background text-foreground">
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}

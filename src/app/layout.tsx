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
  metadataBase: new URL("https://orxis.vercel.app"),
  title:       "Orxis | Orchestrate AI with Strict Boundaries",
  description: "Orxis is a structured AI custom instruction generator. Define precise roles, cognitive loops, and output boundaries for ChatGPT, Claude, Gemini, and other LLMs.",
  keywords: [
    "Orxis", "AI custom instructions", "prompt engineering",
    "system prompt", "ChatGPT", "Claude", "Gemini", "LLM orchestration",
  ],
  authors:  [{ name: "Orxis" }],
  manifest: "/manifest.webmanifest",
  openGraph: {
    siteName:    "Orxis",
    title:       "Orxis | Orchestrate AI with Strict Boundaries",
    description: "Define precise roles, boundaries, and cognitive loops for any LLM. Structured, not generic.",
    type:        "website",
  },
  other: {
    "application-name": "Orxis",
  },
};

// ── Layout ──────────────────────────────────────────────────────────────

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} dark`}>
      <body className="min-h-screen antialiased bg-background text-foreground">
        {/* JSON-LD WebSite structured data — tells Google the site name is "Orxis" */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Orxis",
              url: "https://orxis.vercel.app",
            }),
          }}
        />
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}

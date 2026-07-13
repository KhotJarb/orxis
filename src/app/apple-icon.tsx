import { ImageResponse } from "next/og";

// ── Metadata ────────────────────────────────────────────────────────────
// Next.js App Router serves this at /apple-icon.png and auto-injects
// <link rel="apple-touch-icon"> into every page.

export const runtime     = "edge";
export const size        = { width: 180, height: 180 };
export const contentType = "image/png";

// ── Icon Generator ──────────────────────────────────────────────────────
// Satori (the renderer behind ImageResponse) supports linearGradient and
// radialGradient in SVG but does NOT support <filter>/<feGaussianBlur>.
// The glow effect is approximated with a radialGradient circle instead.

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0F172A",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "40px",
        }}
      >
        {/* Logo rendered at 130×130, centred in the 180×180 canvas */}
        <svg
          width="130"
          height="130"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Node gradient: blue-400 → purple-500 */}
            <linearGradient id="ng" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%"   stopColor="#60A5FA" />
              <stop offset="100%" stopColor="#A855F7" />
            </linearGradient>
            {/* Node glow halo (radialGradient — no filter needed) */}
            <radialGradient id="gg" cx="50%" cy="50%" r="50%">
              <stop offset="0%"   stopColor="#8B5CF6" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0"    />
            </radialGradient>
          </defs>

          {/*
            ── Outer ring (r=12.5, strokeWidth=2.5) ───────────────────
            Gap A (top-right, 300°–340°): node position
            Gap B (top-left,  200°–230°): broken-orbit accent
          */}

          {/* Outer Arc 1 — large body: 340° → 200°, 220° arc, clockwise */}
          <path
            d="M 27.75 11.73 A 12.5 12.5 0 1 1 4.25 11.73"
            stroke="white" strokeWidth="2.5" strokeLinecap="round"
            strokeOpacity="0.95"
          />

          {/* Outer Arc 2 — small top: 230° → 300°, 70° arc, clockwise */}
          <path
            d="M 7.97 6.42 A 12.5 12.5 0 0 1 22.25 5.18"
            stroke="white" strokeWidth="2.5" strokeLinecap="round"
            strokeOpacity="0.85"
          />

          {/*
            ── Inner ring (r=8.5, strokeWidth=2) ──────────────────────
            Gaps offset ~30° from outer ring for the layered orbital feel
          */}

          {/* Inner Arc 1 — large body: 30° → 220°, 190° arc, clockwise */}
          <path
            d="M 23.36 20.25 A 8.5 8.5 0 1 1 9.49 10.54"
            stroke="white" strokeWidth="2" strokeLinecap="round"
            strokeOpacity="0.7"
          />

          {/* Inner Arc 2 — small upper: 250° → 340°, 90° arc, clockwise */}
          <path
            d="M 13.09 8.01 A 8.5 8.5 0 0 1 23.99 13.09"
            stroke="white" strokeWidth="2" strokeLinecap="round"
            strokeOpacity="0.65"
          />

          {/* ── Floating node at 320° on outer ring ─────────────────── */}

          {/* Glow halo */}
          <circle cx="25.57" cy="7.97" r="4"   fill="url(#gg)" />
          {/* Node dot */}
          <circle cx="25.57" cy="7.97" r="2.3" fill="url(#ng)" />
        </svg>
      </div>
    ),
    { ...size }
  );
}

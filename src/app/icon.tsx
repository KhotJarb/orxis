import { ImageResponse } from "next/og";

// ── Metadata ────────────────────────────────────────────────────────────
// Next.js App Router serves this at /icon and auto-injects
// <link rel="icon"> into every page. Generates a 48×48 PNG at the edge.
// Google requires raster favicons (not SVG) to show in search results.

export const runtime     = "edge";
export const size        = { width: 48, height: 48 };
export const contentType = "image/png";

// ── Icon Generator ──────────────────────────────────────────────────────

export default function Icon() {
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
          borderRadius: "10px",
        }}
      >
        <svg
          width="36"
          height="36"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="ng" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%"   stopColor="#60A5FA" />
              <stop offset="100%" stopColor="#A855F7" />
            </linearGradient>
            <radialGradient id="gg" cx="50%" cy="50%" r="50%">
              <stop offset="0%"   stopColor="#8B5CF6" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0"    />
            </radialGradient>
          </defs>

          {/* Outer Arc 1 */}
          <path
            d="M 27.75 11.73 A 12.5 12.5 0 1 1 4.25 11.73"
            stroke="white" strokeWidth="2.5" strokeLinecap="round"
            strokeOpacity="0.95"
          />

          {/* Outer Arc 2 */}
          <path
            d="M 7.97 6.42 A 12.5 12.5 0 0 1 22.25 5.18"
            stroke="white" strokeWidth="2.5" strokeLinecap="round"
            strokeOpacity="0.85"
          />

          {/* Inner Arc 1 */}
          <path
            d="M 23.36 20.25 A 8.5 8.5 0 1 1 9.49 10.54"
            stroke="white" strokeWidth="2" strokeLinecap="round"
            strokeOpacity="0.7"
          />

          {/* Inner Arc 2 */}
          <path
            d="M 13.09 8.01 A 8.5 8.5 0 0 1 23.99 13.09"
            stroke="white" strokeWidth="2" strokeLinecap="round"
            strokeOpacity="0.65"
          />

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

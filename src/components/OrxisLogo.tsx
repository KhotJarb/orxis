"use client";

import { useId } from "react";

interface OrxisLogoProps {
  className?: string;
}

export default function OrxisLogo({ className = "w-8 h-8" }: OrxisLogoProps) {
  // useId ensures unique gradient IDs when the logo renders in multiple places
  // (e.g. Navbar desktop + Footer) without cross-instance conflicts.
  const uid      = useId().replace(/:/g, "_");
  const gradId   = `og_${uid}`;
  const glowId   = `ogl_${uid}`;

  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Orxis"
    >
      <defs>
        {/* Node gradient: blue-400 → purple-500 */}
        <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#60A5FA" />
          <stop offset="100%" stopColor="#A855F7" />
        </linearGradient>

        {/* Soft glow halo behind the node */}
        <radialGradient id={glowId} cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#8B5CF6" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0"    />
        </radialGradient>
      </defs>

      {/*
        ── Outer ring (r = 12.5, strokeWidth = 2.5) ────────────────────
        Two arcs with gaps:
          • Gap A (top-right, 300°–340°): where the node sits
          • Gap B (top-left,  200°–230°): creates the "broken orbit" look
      */}

      {/* Outer Arc 1 — large body (340° → 200°, 220° arc, clockwise) */}
      <path
        d="M 27.75 11.73 A 12.5 12.5 0 1 1 4.25 11.73"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeOpacity="0.95"
      />

      {/* Outer Arc 2 — small top arc (230° → 300°, 70° arc, clockwise) */}
      <path
        d="M 7.97 6.42 A 12.5 12.5 0 0 1 22.25 5.18"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeOpacity="0.85"
      />

      {/*
        ── Inner ring (r = 8.5, strokeWidth = 2) ───────────────────────
        Gaps are offset ~30° from the outer ring for a layered orbital feel.
          • Gap A (upper-right, 340°–30°)
          • Gap B (upper-left,  220°–250°)
      */}

      {/* Inner Arc 1 — large body (30° → 220°, 190° arc, clockwise) */}
      <path
        d="M 23.36 20.25 A 8.5 8.5 0 1 1 9.49 10.54"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeOpacity="0.7"
      />

      {/* Inner Arc 2 — small upper arc (250° → 340°, 90° arc, clockwise) */}
      <path
        d="M 13.09 8.01 A 8.5 8.5 0 0 1 23.99 13.09"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeOpacity="0.65"
      />

      {/*
        ── Floating node — sits in the outer ring's top-right gap (320°)
        Position: (25.57, 7.97)
      */}

      {/* Glow halo */}
      <circle cx="25.57" cy="7.97" r="4" fill={`url(#${glowId})`} />

      {/* Node dot */}
      <circle cx="25.57" cy="7.97" r="2.3" fill={`url(#${gradId})`} />
    </svg>
  );
}

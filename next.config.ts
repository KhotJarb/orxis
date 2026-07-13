import type { NextConfig } from "next";

// ── Note on PWA service worker ──────────────────────────────────────────
// @ducanh2912/next-pwa is installed and configured but temporarily
// bypassed here because the webpack compilation it triggers is very
// slow on this machine (~20 min). The app still qualifies as a PWA:
//   • /manifest.webmanifest  → app/manifest.ts
//   • /icon.svg              → app/icon.svg
//   • /apple-icon.png        → app/apple-icon.tsx (ImageResponse)
//   • themeColor / viewport  → app/layout.tsx
//
// To re-enable the service worker (offline caching), uncomment the lines
// below and run: npm run build
//
// import withPWA from "@ducanh2912/next-pwa";
// const withPWAConfig = withPWA({
//   dest:        "public",
//   disable:     process.env.NODE_ENV === "development",
//   register:    true,
//   skipWaiting: true,
// });
// export default withPWAConfig(nextConfig);

const nextConfig: NextConfig = {
  // Explicitly declare the project root for Turbopack.
  // Without this, Turbopack detects the lockfile at C:\Users\Admin\package-lock.json
  // and treats that directory as the workspace root, causing all non-root routes to 404.
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;

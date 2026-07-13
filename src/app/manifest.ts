import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name:             "Orxis | AI Orchestration",
    short_name:       "Orxis",
    description:      "Orchestrate AI with strict boundaries and precision.",
    start_url:        "/",
    display:          "standalone",
    background_color: "#0F172A",
    theme_color:      "#0F172A",
    orientation:      "portrait-primary",
    icons: [
      {
        // SVG scales to any size — supported by all modern browsers
        src:   "/icon.svg",
        sizes: "any",
        type:  "image/svg+xml",
      },
      {
        // Generate icon-192.png from icon.svg (e.g. with Squoosh or sharp)
        // and place it in /public/icon-192.png
        src:     "/icon-192.png",
        sizes:   "192x192",
        type:    "image/png",
        purpose: "any",
      },
      {
        // Generate icon-512.png from icon.svg and place it in /public/icon-512.png
        src:     "/icon-512.png",
        sizes:   "512x512",
        type:    "image/png",
        purpose: "maskable",
      },
    ],
  };
}

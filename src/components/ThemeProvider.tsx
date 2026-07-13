"use client";

// Thin wrapper so next-themes ThemeProvider can run as a Client Component
// while app/layout.tsx stays a Server Component.

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ThemeProviderProps } from "next-themes";

export default function ThemeProvider({
  children,
  ...props
}: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}

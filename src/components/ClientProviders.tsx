"use client";

import { LanguageProvider } from "@/i18n";

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return <LanguageProvider>{children}</LanguageProvider>;
}

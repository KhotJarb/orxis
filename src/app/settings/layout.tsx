import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Settings | Orxis",
  description: "Configure your Orxis preferences.",
};

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
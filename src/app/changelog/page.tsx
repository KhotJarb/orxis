import type { Metadata } from "next";
import Changelog from "@/components/Changelog";

export const metadata: Metadata = {
  title: "Changelog | Orxis",
  description: "New updates and improvements to the Orxis platform. A complete record of releases, fixes, and architectural changes.",
};

export default function ChangelogPage() {
  return <Changelog />;
}
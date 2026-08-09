import type { Metadata } from "next";
import PrivacyContent from "@/components/legal/PrivacyContent";

export const metadata: Metadata = {
  title: "Privacy Policy | Orxis",
  description:
    "How Orxis handles your data — what we collect, what we don't, and how we use it.",
};

export default function PrivacyPage() {
  return <PrivacyContent />;
}

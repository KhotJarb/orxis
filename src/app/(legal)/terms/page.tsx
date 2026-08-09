import type { Metadata } from "next";
import TermsContent from "@/components/legal/TermsContent";

export const metadata: Metadata = {
  title: "Terms of Service | Orxis",
  description:
    "The terms governing your use of the Orxis AI instruction generator.",
};

export default function TermsPage() {
  return <TermsContent />;
}

import type { Metadata } from "next";
import LicenseContent from "@/components/legal/LicenseContent";

export const metadata: Metadata = {
  title: "License | Orxis",
  description:
    "Licensing terms for the Orxis application and the prompts you generate with it.",
};

export default function LicensePage() {
  return <LicenseContent />;
}

import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Support from "@/components/Support";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Support & FAQ | Orxis",
  description:
    "Find answers to common questions about the Orxis, and share feedback to help improve the tool.",
};

export default function SupportPage() {
  return (
    <main className="relative min-h-screen bg-[#030014]">
      <Navbar />
      <div className="pt-20" />
      <Support />
      <Footer />
    </main>
  );
}

import Navbar from "@/components/Navbar";
import UseCases from "@/components/UseCases";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Use Cases — Orxis",
  description:
    "See how the advanced instruction framework adapts to Software Developers, Content Creators, and Prompt Engineers. Built for every complex workflow.",
};

export default function UseCasesPage() {
  return (
    <main className="relative min-h-screen bg-[#030014]">
      <Navbar />
      {/* Top spacer for fixed navbar */}
      <div className="pt-20" />
      <UseCases />
      <Footer />
    </main>
  );
}

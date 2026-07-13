import Navbar from "@/components/Navbar";
import Pricing from "@/components/Pricing";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing — Orxis",
  description:
    "Free access to the advanced AI instruction framework. Generate master custom instructions at no cost, or support the project to help fund future development.",
};

export default function PricingPage() {
  return (
    <main className="relative min-h-screen bg-[#030014]">
      <Navbar />
      <div className="pt-20" />
      <Pricing />
      <Footer />
    </main>
  );
}

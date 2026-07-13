import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import About from "@/components/About";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "About | Orxis",
  description:
    "Learn the philosophy behind the Orxis — a framework built for developers and creators who need strict, structured control over AI behaviour.",
};

export default function AboutPage() {
  return (
    <main className="relative min-h-screen bg-[#030014]">
      <Navbar />
      <div className="pt-20" />
      <About />
      <Footer />
    </main>
  );
}

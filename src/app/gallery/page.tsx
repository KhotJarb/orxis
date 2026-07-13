import Navbar from "@/components/Navbar";
import PromptGallery from "@/components/PromptGallery";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Prompt Gallery | Orxis",
  description:
    "Browse structured instruction templates for Software Developers, Content Creators, and Prompt Engineers. Copy and deploy in one click.",
};

export default function GalleryPage() {
  return (
    <main className="relative min-h-screen bg-[#030014]">
      <Navbar />
      <div className="pt-20" />
      <PromptGallery />
      <Footer />
    </main>
  );
}

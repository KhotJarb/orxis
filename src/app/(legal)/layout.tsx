import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// This layout wraps /privacy, /terms, and /license.
// The "(legal)" folder name is a Next.js route group — it does not
// appear in the URL. Each child page is accessible at its own path:
//   /privacy   /terms   /license

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="relative min-h-screen bg-[#030014]">
      <Navbar />
      <div className="pt-20" />

      {/* Centred, readable content column */}
      <div className="mx-auto max-w-3xl px-6 py-16 sm:px-8 sm:py-24">
        {children}
      </div>

      <Footer />
    </main>
  );
}

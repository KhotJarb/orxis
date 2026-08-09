"use client";

import { motion } from "framer-motion";
import OrxisLogo from "@/components/OrxisLogo";
import { Heart, MessageCircle, Mail } from "lucide-react";
import { useT } from "@/i18n";


export default function Footer() {
  const t = useT("common");

  const footerLinks = {
    [t("footer.columns.product")]: [
      { name: t("footer.links.generator"),   href: "/generate"     },
      { name: t("footer.links.features"),    href: "/#features"    },
      { name: t("footer.links.howItWorks"),href: "/#how-it-works" },
      { name: t("footer.links.useCases"),   href: "/use-cases"    },
      { name: t("footer.links.pricing"),     href: "/pricing"      },
    ],
    [t("footer.columns.resources")]: [
      { name: t("footer.links.documentation"), href: "/docs"     },
      { name: t("footer.links.promptGallery"),href: "/gallery"  },
      { name: t("footer.links.changelog"),     href: "/changelog" },
      { name: t("footer.links.aboutUs"),      href: "/about"    },
      { name: t("footer.links.supportFaq"), href: "/support"  },
    ],
    [t("footer.columns.legal")]: [
      { name: t("footer.links.privacy"), href: "/privacy" },
      { name: t("footer.links.terms"),   href: "/terms"   },
      { name: t("footer.links.license"), href: "/license" },
    ],
    [t("footer.columns.social")]: [
      { name: t("footer.links.github"), href: "https://github.com/KhotJarb/orxis" },
    ],
  };

  const socialLinks = [
    { icon: <MessageCircle className="h-4 w-4" />, href: "/support",               label: t("footer.social.supportFaq") },
    { icon: <Mail          className="h-4 w-4" />, href: "mailto:orxis.app@gmail.com", label: t("footer.social.email"), target: "_blank", rel: "noopener noreferrer" },
  ];

  return (
    <footer className="relative border-t border-glass-border">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(139,92,246,0.03)_0%,_transparent_50%)]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ---- Top Grid ---- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 sm:gap-8 py-14 sm:py-16">
          {/* Brand Column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <a href="/" className="flex items-center gap-2 mb-4 group">
              <OrxisLogo className="w-8 h-8 transition-opacity duration-300 group-hover:opacity-90" />
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent text-lg font-bold tracking-tight">
                Orxis
              </span>
            </a>
            <p className="text-sm text-slate-500 leading-relaxed mb-5 max-w-xs">
              {t("footer.description")}
            </p>

            {/* Social links */}
            <div className="flex items-center gap-2">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.target}
                  rel={link.rel}
                  aria-label={link.label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border-subtle)] text-[var(--text-subtle)] hover:text-[var(--text-heading)] hover:bg-[var(--glass-bg)] hover:border-[var(--border-medium)] transition-all duration-300"
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-semibold text-[var(--text-heading)] mb-4 uppercase tracking-wider">
                {title}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-sm text-[var(--text-subtle)] hover:text-[var(--text-body)] transition-colors duration-300"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ---- Bottom Bar ---- */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[var(--border-subtle)] py-6">
          <p className="text-xs text-[var(--text-subtle)] order-2 sm:order-1">
            {t("footer.copyright", { year: new Date().getFullYear() })}
          </p>

          {/* Support the Project button */}
          <motion.a
            href="https://buymeacoffee.com/khotjarb"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="support-btn order-1 sm:order-2 group inline-flex items-center gap-2 rounded-full border border-[var(--border-subtle)] bg-[var(--glass-bg)] px-5 py-2.5 text-sm font-medium text-[var(--text-muted)] hover:text-[var(--text-heading)] hover:border-pink-500/30 hover:bg-pink-500/5 transition-all duration-300 cursor-pointer"
          >
            <Heart className="h-4 w-4 text-pink-400 group-hover:text-pink-300 support-heart transition-colors" />
            {t("footer.supportProject")}
          </motion.a>
        </div>
      </div>
    </footer>
  );
}

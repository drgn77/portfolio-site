"use client";

import { useEffect, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/navigation";

const SECTION_IDS = ["about", "projects", "stack", "sites", "contact"] as const;
type SectionId = (typeof SECTION_IDS)[number];

export default function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const [activeSection, setActiveSection] = useState<SectionId | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { rootMargin: "-20% 0px -70% 0px" }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const navLinks: { key: SectionId; href: string }[] = [
    { key: "about", href: "#about" },
    { key: "projects", href: "#projects" },
    { key: "stack", href: "#stack" },
    { key: "sites", href: "#sites" },
    { key: "contact", href: "#contact" },
  ];

  const linkStyle = (active: boolean) => ({
    fontFamily: "var(--font-mono), monospace",
    fontSize: "0.75rem",
    textDecoration: "none",
    color: active ? "var(--amber)" : "var(--amber-dim)",
    transition: "color 0.2s",
  });

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        background: "var(--bg2)",
        borderBottom: "1px solid var(--border)",
        padding: "0.75rem 2rem",
      }}
      className="flex items-center justify-between"
    >
      <Link
        href="/"
        style={{
          fontFamily: "var(--font-vt323), monospace",
          fontSize: "1.5rem",
          color: "var(--amber)",
          textDecoration: "none",
        }}
      >
        [drgn.dev]
      </Link>

      {/* Desktop nav — hidden below md */}
      <ul className="hidden md:flex items-center gap-6 list-none m-0 p-0">
        {navLinks.map((link) => (
          <li key={link.key}>
            <a href={link.href} style={linkStyle(activeSection === link.key)}>
              {t(link.key)}
            </a>
          </li>
        ))}

        <li className="flex items-center gap-2" style={{ marginLeft: "0.5rem" }}>
          {(["pl", "en"] as const).map((loc) => (
            <Link
              key={loc}
              href="/"
              locale={loc}
              style={linkStyle(locale === loc)}
            >
              [ {loc.toUpperCase()} ]
            </Link>
          ))}
        </li>
      </ul>

      {/* Hamburger button — visible below md only */}
      <button
        className="md:hidden"
        onClick={() => setIsMenuOpen((prev) => !prev)}
        style={{
          fontFamily: "var(--font-mono), monospace",
          fontSize: "1rem",
          color: "var(--amber)",
          background: "transparent",
          border: "1px solid var(--border2)",
          borderRadius: "2px",
          padding: "0.25rem 0.6rem",
          cursor: "pointer",
          letterSpacing: "1px",
        }}
        aria-label="Toggle menu"
      >
        [ ≡ ]
      </button>

      {/* Mobile dropdown */}
      {isMenuOpen && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            background: "var(--bg2)",
            borderBottom: "1px solid var(--border)",
            padding: "1rem 2rem",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.key}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              style={linkStyle(activeSection === link.key)}
            >
              {t(link.key)}
            </a>
          ))}

          {/* Locale switcher in mobile menu */}
          <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.25rem" }}>
            {(["pl", "en"] as const).map((loc) => (
              <Link
                key={loc}
                href="/"
                locale={loc}
                onClick={() => setIsMenuOpen(false)}
                style={linkStyle(locale === loc)}
              >
                [ {loc.toUpperCase()} ]
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

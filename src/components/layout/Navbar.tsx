"use client";

import { useEffect, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
// Use locale-aware Link from our navigation helper for logo and locale switcher
import { Link } from "@/navigation";

const SECTION_IDS = ["about", "projects", "stack", "sites", "contact"] as const;
type SectionId = (typeof SECTION_IDS)[number];

export default function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const [activeSection, setActiveSection] = useState<SectionId | null>(null);

  // Track which section is currently in the viewport
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        // Fire when section top crosses 30% down from the viewport top
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

      <ul className="flex items-center gap-6 list-none m-0 p-0">
        {navLinks.map((link) => (
          <li key={link.key}>
            {/* Plain anchor for same-page smooth scroll — no Next.js router push needed */}
            <a
              href={link.href}
              style={{
                fontFamily: "var(--font-mono), monospace",
                fontSize: "0.75rem",
                textDecoration: "none",
                color: activeSection === link.key ? "var(--amber)" : "var(--amber-dim)",
                transition: "color 0.2s",
              }}
            >
              {t(link.key)}
            </a>
          </li>
        ))}

        {/* Locale switcher — active locale gets amber, inactive gets amber-dim */}
        <li className="flex items-center gap-2" style={{ marginLeft: "0.5rem" }}>
          {(["pl", "en"] as const).map((loc) => (
            <Link
              key={loc}
              href="/"
              locale={loc}
              style={{
                fontFamily: "var(--font-mono), monospace",
                fontSize: "0.75rem",
                color: locale === loc ? "var(--amber)" : "var(--amber-dim)",
                textDecoration: "none",
                transition: "color 0.2s",
              }}
            >
              [ {loc.toUpperCase()} ]
            </Link>
          ))}
        </li>
      </ul>
    </nav>
  );
}

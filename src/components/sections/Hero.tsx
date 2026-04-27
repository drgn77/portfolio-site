"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

const ROLES = [
  "AI Engineer",
  "Fullstack Engineer",
  "AI Enthusiast",
  "Python Specialist",
  "Builder of AI Agents",
  "Open Source Builder",
  "Software Engineer",
  "Cool Guy",
  "LLM Tinkerer",
  "RAG Architect",
];

export function Hero() {
  const t = useTranslations("hero");
  const [mounted, setMounted] = useState(false);
  const [displayText, setDisplayText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const currentRole = ROLES[roleIndex];

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(currentRole.slice(0, charIndex + 1));
        setCharIndex((prev) => prev + 1);

        if (charIndex + 1 === currentRole.length) {
          setTimeout(() => setIsDeleting(true), 1500);
        }
      } else {
        setDisplayText(currentRole.slice(0, charIndex - 1));
        setCharIndex((prev) => prev - 1);

        if (charIndex - 1 === 0) {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % ROLES.length);
        }
      }
    }, isDeleting ? 40 : 70);

    return () => clearTimeout(timeout);
  }, [mounted, charIndex, isDeleting, roleIndex]);

  return (
    <section
      style={{
        padding: "5rem 2rem",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <p
        style={{
          fontFamily: "var(--font-mono), monospace",
          fontSize: "0.75rem",
          color: "var(--amber-dim)",
          letterSpacing: "3px",
          marginBottom: "1rem",
          textTransform: "uppercase",
        }}
      >
        {t("hint")}
      </p>

      <h1
        style={{
          fontFamily: "var(--font-vt323), monospace",
          fontSize: "clamp(4rem, 10vw, 8rem)",
          color: "var(--amber)",
          letterSpacing: "4px",
          lineHeight: 1,
          margin: 0,
        }}
      >
        DRGN
      </h1>

      <p
        style={{
          fontFamily: "var(--font-mono), monospace",
          fontSize: "1.25rem",
          color: "var(--amber2)",
          marginTop: "1rem",
          minHeight: "1.75rem",
        }}
      >
        {mounted ? displayText : ""}
        <span className="blink" suppressHydrationWarning>_</span>
      </p>

      <div className="flex flex-wrap gap-4" style={{ marginTop: "2rem" }}>
        <a
          href="#projects"
          style={{
            background: "var(--amber)",
            color: "#000",
            fontFamily: "var(--font-mono), monospace",
            fontSize: "0.875rem",
            padding: "0.625rem 1.25rem",
            borderRadius: "2px",
            textDecoration: "none",
            letterSpacing: "1px",
          }}
        >
          {t("cta_projects")}
        </a>

        <a
          href="#contact"
          style={{
            border: "1px solid var(--border2)",
            color: "var(--amber)",
            background: "transparent",
            fontFamily: "var(--font-mono), monospace",
            fontSize: "0.875rem",
            padding: "0.625rem 1.25rem",
            borderRadius: "2px",
            textDecoration: "none",
            letterSpacing: "1px",
          }}
        >
          {t("cta_contact")}
        </a>
      </div>
    </section>
  );
}

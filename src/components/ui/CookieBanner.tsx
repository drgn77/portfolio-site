"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";

const STORAGE_KEY = "cookies-accepted";

export function CookieBanner() {
  const t = useTranslations("cookies");
  // Render only after mount to avoid SSR/CSR hydration mismatch
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Show banner only if user hasn't accepted yet
    if (localStorage.getItem(STORAGE_KEY) !== "true") {
      setVisible(true);
    }
  }, []);

  function handleAccept() {
    localStorage.setItem(STORAGE_KEY, "true");
    setVisible(false);
  }

  function handleDecline() {
    // Close without persisting — banner will reappear next visit
    setVisible(false);
  }

  if (!mounted || !visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: "var(--bg2)",
        borderTop: "1px solid var(--border2)",
        padding: "1rem 2rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "1rem",
      }}
    >
      {/* Left: label + description */}
      <div style={{ maxWidth: "70%" }}>
        <p
          style={{
            fontFamily: "var(--font-mono), monospace",
            fontSize: "0.75rem",
            color: "var(--amber-dim)",
            letterSpacing: "2px",
            margin: "0 0 0.25rem 0",
          }}
        >
          {t("label")}
        </p>
        <p
          style={{
            fontFamily: "var(--font-mono), monospace",
            fontSize: "0.8rem",
            color: "var(--amber2)",
            margin: 0,
            lineHeight: 1.6,
          }}
        >
          {t("text")}
        </p>
      </div>

      {/* Right: action buttons */}
      <div style={{ display: "flex", gap: "0.75rem", flexShrink: 0 }}>
        <button
          onClick={handleDecline}
          style={{
            border: "1px solid var(--border2)",
            color: "var(--amber)",
            background: "transparent",
            fontFamily: "var(--font-mono), monospace",
            fontSize: "0.875rem",
            padding: "0.5rem 1rem",
            borderRadius: "2px",
            cursor: "pointer",
            letterSpacing: "1px",
          }}
        >
          {t("decline")}
        </button>
        <button
          onClick={handleAccept}
          style={{
            background: "var(--amber)",
            color: "#000",
            border: "none",
            fontFamily: "var(--font-mono), monospace",
            fontSize: "0.875rem",
            padding: "0.5rem 1rem",
            borderRadius: "2px",
            cursor: "pointer",
            letterSpacing: "1px",
          }}
        >
          {t("accept")}
        </button>
      </div>
    </div>
  );
}

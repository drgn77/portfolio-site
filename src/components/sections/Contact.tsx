"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

// Form submission status union — drives button label and response message
type Status = "idle" | "sending" | "success" | "error";

// Shared input/textarea style — defined once to avoid repetition
const fieldStyle: React.CSSProperties = {
  width: "100%",
  background: "var(--bg2)",
  border: "1px solid var(--border)",
  color: "var(--amber)",
  fontFamily: "var(--font-mono), monospace",
  fontSize: "0.875rem",
  padding: "0.6rem 0.75rem",
  borderRadius: "2px",
  outline: "none",
};

const labelStyle: React.CSSProperties = {
  fontFamily: "var(--font-mono), monospace",
  fontSize: "0.75rem",
  color: "var(--amber-dim)",
  letterSpacing: "2px",
  textTransform: "uppercase" as const,
  marginBottom: "0.3rem",
  display: "block",
};

export function Contact() {
  const t = useTranslations("contact");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      if (!res.ok) {
        setStatus("error");
        return;
      }

      setStatus("success");
      // Clear form on success
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section
      style={{
        padding: "5rem 2rem",
        maxWidth: "640px",
        margin: "0 auto",
        width: "100%",
      }}
    >
      <p
        style={{
          fontFamily: "var(--font-mono), monospace",
          fontSize: "0.75rem",
          color: "var(--amber-dim)",
          letterSpacing: "3px",
          textTransform: "uppercase",
          marginBottom: "0.75rem",
        }}
      >
        {t("label")}
      </p>

      <h2
        style={{
          fontFamily: "var(--font-vt323), monospace",
          fontSize: "2.5rem",
          color: "var(--amber)",
          letterSpacing: "2px",
          margin: "0 0 0.75rem 0",
        }}
      >
        {t("title")}
      </h2>

      <p
        style={{
          fontFamily: "var(--font-mono), monospace",
          fontSize: "0.875rem",
          color: "var(--amber2)",
          marginBottom: "2rem",
        }}
      >
        {t("placeholder")}
      </p>

      <form onSubmit={handleSubmit} noValidate>
        <div className="flex flex-col" style={{ gap: "1.25rem" }}>
          {/* NAME */}
          <div className="flex flex-col">
            <label htmlFor="contact-name" style={labelStyle}>
              {t("name")}
            </label>
            <input
              id="contact-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t("name_placeholder")}
              required
              style={fieldStyle}
              // CSS class handles focus border and placeholder — inline style can't target :focus or ::placeholder
              className="contact-field"
            />
          </div>

          {/* EMAIL */}
          <div className="flex flex-col">
            <label htmlFor="contact-email" style={labelStyle}>
              {t("email")}
            </label>
            <input
              id="contact-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t("email_placeholder")}
              required
              style={fieldStyle}
              className="contact-field"
            />
          </div>

          {/* MESSAGE */}
          <div className="flex flex-col">
            <label htmlFor="contact-message" style={labelStyle}>
              {t("message")}
            </label>
            <textarea
              id="contact-message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={t("message_placeholder")}
              required
              rows={5}
              style={{ ...fieldStyle, minHeight: "120px", resize: "vertical" }}
              className="contact-field"
            />
          </div>

          {/* SUBMIT — primary button style from CLAUDE.md */}
          <button
            type="submit"
            disabled={status === "sending"}
            style={{
              background: "var(--amber)",
              color: "#000",
              fontFamily: "var(--font-mono), monospace",
              fontSize: "0.875rem",
              padding: "0.625rem 1.25rem",
              borderRadius: "2px",
              border: "none",
              letterSpacing: "1px",
              cursor: status === "sending" ? "not-allowed" : "pointer",
              opacity: status === "sending" ? 0.7 : 1,
              alignSelf: "flex-start",
            }}
          >
            {status === "sending" ? t("sending") : t("send")}
          </button>
        </div>
      </form>

      {/* Response feedback — shown after submission attempt */}
      {status === "success" && (
        <p
          style={{
            fontFamily: "var(--font-mono), monospace",
            fontSize: "0.875rem",
            color: "var(--amber)",
            marginTop: "1.25rem",
            letterSpacing: "1px",
          }}
        >
          {t("success")}
        </p>
      )}
      {status === "error" && (
        <p
          style={{
            fontFamily: "var(--font-mono), monospace",
            fontSize: "0.875rem",
            color: "#ff4444",
            marginTop: "1.25rem",
            letterSpacing: "1px",
          }}
        >
          {t("error")}
        </p>
      )}
    </section>
  );
}

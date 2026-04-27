"use client";

import { useState, useRef, useEffect } from "react";
import { useLocale } from "next-intl";

// Owner: replace with your FastAPI backend URL once deployed
const CHAT_API_URL = process.env.NEXT_PUBLIC_CHAT_API_URL || "http://localhost:8001/chat";

interface Message {
  role: "bot" | "user";
  text: string;
}

// Greeting text keyed by locale — avoids a separate translation namespace for a single string
const GREETING: Record<string, string> = {
  pl: "Cześć! Jestem AI asystentem. Zapytaj mnie o projekty, umiejętności lub współpracę.",
  en: "Hi! I'm an AI assistant. Ask me about projects, skills or collaboration.",
};

const inputStyle: React.CSSProperties = {
  flexGrow: 1,
  background: "transparent",
  border: "none",
  color: "var(--amber)",
  fontFamily: "var(--font-mono), monospace",
  fontSize: "0.8rem",
  outline: "none",
};

export function Chatbot() {
  const locale = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  // Start empty — greeting is set in useEffect to avoid SSR/CSR hydration mismatch
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    setMessages([{ role: "bot", text: GREETING[locale] ?? GREETING["en"] }]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // run once on mount, locale is stable
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Auto-scroll to latest message whenever messages update
  const bottomRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function sendMessage() {
    const text = inputValue.trim();
    if (!text || isLoading) return;

    setInputValue("");
    setMessages((prev) => [...prev, { role: "user", text }]);
    setIsLoading(true);

    // Optimistic loading indicator — replaced by real reply or error
    setMessages((prev) => [...prev, { role: "bot", text: "..." }]);

    try {
      const res = await fetch(CHAT_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });

      const data: { reply: string } = await res.json();

      // Replace the "..." placeholder with the actual reply
      setMessages((prev) => [
        ...prev.slice(0, -1),
        { role: "bot", text: data.reply },
      ]);
    } catch {
      // Backend unreachable — show inline error instead of crashing
      setMessages((prev) => [
        ...prev.slice(0, -1),
        { role: "bot", text: "// ERROR — backend offline" },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") sendMessage();
  }

  // --- CLOSED STATE ---
  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        style={{
          position: "fixed",
          bottom: "1.5rem",
          right: "1.5rem",
          background: "var(--amber)",
          color: "#000",
          border: "none",
          borderRadius: "2px",
          padding: "0.6rem 1rem",
          fontFamily: "var(--font-mono), monospace",
          fontSize: "0.8rem",
          letterSpacing: "1px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "0.4rem",
          zIndex: 50,
        }}
      >
        {/* Green online indicator */}
        <span className="blink-green" style={{ color: "#00ff41", fontSize: "0.65rem" }}>
          ●
        </span>
        [ AI AGENT ]
      </button>
    );
  }

  // --- OPEN STATE ---
  return (
    <div
      style={{
        position: "fixed",
        bottom: "1.5rem",
        right: "1.5rem",
        width: "360px",
        height: "500px",
        background: "var(--bg2)",
        border: "1px solid var(--border2)",
        borderRadius: "2px",
        display: "flex",
        flexDirection: "column",
        zIndex: 50,
      }}
    >
      {/* Header */}
      <div
        style={{
          borderBottom: "1px solid var(--border)",
          padding: "0.6rem 0.75rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexShrink: 0,
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono), monospace",
            fontSize: "0.75rem",
            letterSpacing: "2px",
            color: "var(--amber)",
            display: "flex",
            alignItems: "center",
            gap: "0.4rem",
          }}
        >
          <span className="blink-green" style={{ color: "#00ff41", fontSize: "0.65rem" }}>
            ●
          </span>
          {"// AI_AGENT — ONLINE"}
        </span>

        <button
          onClick={() => setIsOpen(false)}
          style={{
            background: "transparent",
            border: "none",
            color: "var(--amber-dim)",
            fontFamily: "var(--font-mono), monospace",
            fontSize: "0.75rem",
            cursor: "pointer",
            padding: "0 0.25rem",
          }}
        >
          [ X ]
        </button>
      </div>

      {/* Message list */}
      <div
        style={{
          flexGrow: 1,
          overflowY: "auto",
          padding: "1rem",
          display: "flex",
          flexDirection: "column",
          gap: "0.75rem",
        }}
      >
        {messages.map((msg, i) => (
          <div key={i}>
            {/* Role prefix */}
            <div
              style={{
                fontFamily: "var(--font-mono), monospace",
                fontSize: "0.7rem",
                color: msg.role === "bot" ? "var(--amber-dim)" : "var(--amber2)",
                marginBottom: "0.15rem",
              }}
            >
              {msg.role === "bot" ? "> BOT:" : "> YOU:"}
            </div>
            {/* Message text */}
            <div
              style={{
                fontFamily: "var(--font-mono), monospace",
                fontSize: "0.8rem",
                color: msg.role === "bot" ? "var(--amber)" : "var(--amber2)",
                lineHeight: 1.6,
              }}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {/* Scroll anchor */}
        <div ref={bottomRef} />
      </div>

      {/* Input row */}
      <div
        style={{
          borderTop: "1px solid var(--border)",
          padding: "0.75rem",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          flexShrink: 0,
        }}
      >
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="zadaj pytanie..."
          disabled={isLoading}
          style={inputStyle}
          className="chatbot-input"
        />
        <button
          onClick={sendMessage}
          disabled={isLoading}
          style={{
            background: "var(--amber)",
            color: "#000",
            border: "none",
            borderRadius: "2px",
            fontFamily: "var(--font-mono), monospace",
            fontSize: "0.75rem",
            padding: "0.3rem 0.75rem",
            letterSpacing: "1px",
            cursor: isLoading ? "not-allowed" : "pointer",
            opacity: isLoading ? 0.6 : 1,
            flexShrink: 0,
          }}
        >
          [ SEND ]
        </button>
      </div>
    </div>
  );
}

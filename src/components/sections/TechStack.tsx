import { getTranslations } from "next-intl/server";

// Hardcoded stack data — owner maintains this list
const STACK = [
  {
    category: "Languages",
    items: ["Python", "TypeScript (learning)", "SQL", "Rust (learning)", "JavaScript (learning)"],
  },
  {
    category: "AI / ML",
    items: ["RAG", "Embeddings", "Agentic AI", "Multi-Agent Systems", "MCP"],
  },
  {
    category: "Backend Frameworks",
    items: ["FastAPI", "Streamlit", "LangChain", "LangGraph", "CrewAI", "PydanticAI", "Pandas", "OpenAI API", "Anthropic API", "Ollama", "scikit-learn", "TensorFlow"],
  },
  {
    category: "Tools",
    items: ["Docker", "Git", "Qdrant", "FAISS", "ChromaDB", "WSL2", "Jupyter"],
  },
  {
    category: "Frontend (learning)",
    items: ["Next.js", "React", "Tailwind CSS", "HTML", "CSS"],
  },
  {
    category: "AI Tools",
    items: ["Claude", "Claude Code", "ChatGPT", "Gemini", "Perplexity", "Prompt Cowboy", "Ollama", "NotebookLM"],
  },
];

export async function TechStack() {
  const t = await getTranslations("stack");

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
          margin: "0 0 2rem 0",
        }}
      >
        {t("title")}
      </h2>

      {/* 2-column grid on desktop, single column on mobile */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {STACK.map(({ category, items }) => (
          <div key={category}>
            {/* Category label styled as terminal prompt */}
            <p
              style={{
                fontFamily: "var(--font-mono), monospace",
                fontSize: "0.75rem",
                color: "var(--amber-dim)",
                letterSpacing: "2px",
                textTransform: "uppercase",
                marginBottom: "0.5rem",
              }}
            >
              &gt; {category}:
            </p>

            {/* Badge row — each item is a tech badge */}
            <div className="flex flex-wrap gap-2">
              {items.map((item) => (
                <span key={item} className="tech-badge">
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

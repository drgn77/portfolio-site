import { getTranslations } from "next-intl/server";
import { getLocale } from "next-intl/server";

interface Certificate {
  name: string;
  issuer: string;
  date_pl: string;
  date_en: string;
  category: "ai" | "data" | "python";
  url?: string;
}

const CERTIFICATES: Certificate[] = [
  {
    name: "Certificate of Completion: Claude 101",
    issuer: "Anthropic",
    date_pl: "Mar 2026",
    date_en: "Mar 2026",
    category: "ai",
  },
  {
    name: "Claude Code in Action",
    issuer: "Anthropic",
    date_pl: "Mar 2026",
    date_en: "Mar 2026",
    category: "ai",
  },
  {
    name: "Databases and SQL for Data Science with Python",
    issuer: "IBM",
    date_pl: "Paź 2025",
    date_en: "Oct 2025",
    category: "data",
  },
  {
    name: "Data Analysis and Visualization with Python",
    issuer: "Microsoft",
    date_pl: "Sie 2025",
    date_en: "Aug 2025",
    category: "data",
  },
  {
    name: "Python Programming Fundamentals",
    issuer: "Microsoft",
    date_pl: "Kwi 2025",
    date_en: "Apr 2025",
    category: "python",
  },
];

const CATEGORY_COLORS: Record<Certificate["category"], string> = {
  ai: "var(--amber)",
  data: "var(--amber2)",
  python: "#3b82f6",
};

export async function Certificates() {
  const t = await getTranslations("certificates");
  const locale = await getLocale();

  const categoryLabel: Record<Certificate["category"], string> = {
    ai: t("category_ai"),
    data: t("category_data"),
    python: t("category_python"),
  };

  return (
    <section
      id="certificates"
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {CERTIFICATES.map((cert) => (
          <article
            key={cert.name}
            className="site-card flex flex-col justify-between"
            style={{
              background: "var(--bg2)",
              border: "1px solid var(--border)",
              borderRadius: "2px",
              padding: "1.25rem",
              transition: "border-color 0.2s",
            }}
          >
            <div className="flex flex-col gap-3">
              {/* Category badge */}
              <span
                style={{
                  alignSelf: "flex-start",
                  background: "var(--bg3)",
                  border: `1px solid ${CATEGORY_COLORS[cert.category]}`,
                  color: CATEGORY_COLORS[cert.category],
                  fontFamily: "var(--font-mono), monospace",
                  fontSize: "0.7rem",
                  padding: "0.15rem 0.5rem",
                  borderRadius: "2px",
                  letterSpacing: "1px",
                }}
              >
                {categoryLabel[cert.category]}
              </span>

              {/* Certificate name */}
              <h3
                style={{
                  fontFamily: "var(--font-mono), monospace",
                  fontSize: "0.875rem",
                  color: "var(--amber)",
                  margin: 0,
                  lineHeight: 1.4,
                }}
              >
                {cert.name}
              </h3>

              {/* Issuer */}
              <p
                style={{
                  fontFamily: "var(--font-mono), monospace",
                  fontSize: "0.75rem",
                  color: "var(--amber2)",
                  margin: 0,
                }}
              >
                {cert.issuer}
              </p>
            </div>

            {/* Date */}
            <p
              style={{
                fontFamily: "var(--font-mono), monospace",
                fontSize: "0.7rem",
                color: "var(--amber-dim)",
                margin: "1rem 0 0 0",
              }}
            >
              {t("issued")}: {locale === "pl" ? cert.date_pl : cert.date_en}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

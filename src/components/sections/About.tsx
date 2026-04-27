import Link from "next/link";
import { useTranslations } from "next-intl";

const socialLinks = [
  { tKey: "github" as const, href: "https://github.com/drgn77" },
  { tKey: "linkedin" as const, href: "https://linkedin.com/in/kacperdragun01" },
  { tKey: "email" as const, href: "mailto:kacperdragun01@gmail.com" },
];

const stats: { key: string; value: string }[] = [
  { key: "LOCATION", value: "Kętrzyn, Poland" },
  { key: "STATUS", value: "Available for work" },
  { key: "EXPERIENCE", value: "2+ years" },
  { key: "FOCUS", value: "AI · Software Engineer" },
  { key: "LANGUAGES", value: "PL / EN" },
];

export function About() {
  const t = useTranslations("about");

  return (
    <section
      style={{
        padding: "5rem 2rem",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div className="flex flex-col md:flex-row gap-16">
        {/* Left column */}
        <div className="flex flex-col flex-1">
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
              margin: "0 0 1.5rem 0",
            }}
          >
            {t("title")}
          </h2>

          <p
            style={{
              fontFamily: "var(--font-mono), monospace",
              fontSize: "0.875rem",
              color: "var(--amber2)",
              lineHeight: 1.8,
              marginBottom: "1rem",
            }}
          >
            {t("p1")}
          </p>

          <p
            style={{
              fontFamily: "var(--font-mono), monospace",
              fontSize: "0.875rem",
              color: "var(--amber2)",
              lineHeight: 1.8,
              marginBottom: "2rem",
            }}
          >
            {t("p2")}
          </p>

          <div className="flex flex-wrap gap-3">
            {socialLinks.map((link) => (
              <Link
                key={link.tKey}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                style={{
                  border: "1px solid var(--border2)",
                  color: "var(--amber)",
                  background: "transparent",
                  fontFamily: "var(--font-mono), monospace",
                  fontSize: "0.75rem",
                  padding: "0.25rem 0.75rem",
                  borderRadius: "2px",
                  textDecoration: "none",
                  letterSpacing: "1px",
                }}
              >
                {t(link.tKey)}
              </Link>
            ))}
          </div>
        </div>

        {/* Right column */}
        <div className="flex flex-col flex-1">
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
            {t("stats_label")}
          </p>

          <ul className="flex flex-col gap-3" style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {stats.map(({ key, value }) => (
              <li
                key={key}
                style={{
                  fontFamily: "var(--font-mono), monospace",
                  fontSize: "0.875rem",
                  display: "flex",
                  gap: "1rem",
                }}
              >
                <span style={{ color: "var(--amber-dim)", minWidth: "7rem" }}>
                  &gt; {key}:
                </span>
                <span style={{ color: "var(--amber)" }}>{value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

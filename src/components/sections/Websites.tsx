import Link from "next/link";
import { getTranslations } from "next-intl/server";

interface WebsiteEntry {
  title: string;
  descKey?: string;
  liveUrl: string;
  tags: string[];
  inProgress?: boolean;
}

// Hardcoded website list — owner fills in their own projects
const WEBSITES: WebsiteEntry[] = [
  {
    title: "Wabi Corner RestoBar",
    descKey: "wabi_desc",
    liveUrl: "#",
    tags: ["HTML5", "CSS3"],
  },
  {
    title: "Barber Shop",
    descKey: "barber_desc",
    liveUrl: "#",
    tags: ["In Progress"],
  },
  {
    title: "// IN PROGRESS",
    liveUrl: "#",
    tags: [],
    inProgress: true,
  },
];

export async function Websites() {
  const t = await getTranslations("sites");

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

      {/* 3-column grid on desktop, 2 on tablet, 1 on mobile */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {WEBSITES.map((site) => (
          <article
            key={site.title}
            className="site-card flex flex-col justify-between"
            style={{
              background: "var(--bg2)",
              border: "1px solid var(--border)",
              borderRadius: "2px",
              padding: "1.25rem",
              transition: "border-color 0.2s",
            }}
          >
            {/* Top: title, description, tags */}
            <div className="flex flex-col">
              <h3
                style={{
                  fontFamily: "var(--font-mono), monospace",
                  fontSize: "1rem",
                  color: "var(--amber)",
                  margin: 0,
                }}
              >
                {site.title}
              </h3>

              <p
                style={{
                  fontFamily: "var(--font-mono), monospace",
                  fontSize: "0.8rem",
                  color: "var(--amber2)",
                  lineHeight: 1.6,
                  marginTop: "0.5rem",
                  flexGrow: 1,
                }}
              >
                {site.inProgress ? t("in_progress_desc") : t(site.descKey!)}
              </p>

              {/* Tech tags — same visual style as AmberBadge */}
              <div className="flex flex-wrap gap-2" style={{ marginTop: "0.75rem" }}>
                {site.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      background: "var(--bg3)",
                      border: "1px solid var(--border)",
                      color: "var(--amber-dim)",
                      fontFamily: "var(--font-mono), monospace",
                      fontSize: "0.75rem",
                      padding: "0.2rem 0.5rem",
                      borderRadius: "2px",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom: live link — hidden when no real URL is available yet */}
            <div style={{ marginTop: "1rem" }}>
              {site.liveUrl === "#" ? null : <Link
                href={site.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
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
                {t("live")}
              </Link>}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

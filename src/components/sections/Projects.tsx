import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { getGithubRepos, LANGUAGE_COLORS, DEFAULT_LANGUAGE_COLOR } from "@/lib/github";

export async function Projects() {
  const repos = await getGithubRepos();
  const t = await getTranslations("projects");

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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {repos.map((repo) => {
          const langColor = repo.language
            ? (LANGUAGE_COLORS[repo.language] ?? DEFAULT_LANGUAGE_COLOR)
            : DEFAULT_LANGUAGE_COLOR;

          return (
            <article
              key={repo.id}
              className="project-card flex flex-col"
              style={{
                background: "var(--bg2)",
                border: "1px solid var(--border)",
                borderRadius: "2px",
                padding: "1.25rem",
                transition: "border-color 0.2s",
              }}
            >
              <h3
                style={{
                  fontFamily: "var(--font-mono), monospace",
                  fontSize: "1rem",
                  color: "var(--amber)",
                  margin: "0 0 0.5rem 0",
                }}
              >
                {repo.name}
              </h3>

              <p
                style={{
                  fontFamily: "var(--font-mono), monospace",
                  fontSize: "0.8rem",
                  color: "var(--amber2)",
                  lineHeight: 1.6,
                  margin: "0 0 auto 0",
                  paddingBottom: "1rem",
                }}
              >
                {repo.description ?? t("no_desc")}
              </p>

              <div className="flex items-center justify-between" style={{ marginTop: "1rem" }}>
                <span
                  style={{
                    fontFamily: "var(--font-mono), monospace",
                    fontSize: "0.75rem",
                    color: "var(--amber-dim)",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                  }}
                >
                  {repo.language && (
                    <span style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
                      <span style={{ color: langColor, fontSize: "0.65rem" }}>●</span>
                      {repo.language}
                    </span>
                  )}
                  <span>★ {repo.stargazers_count}</span>
                </span>

                <Link
                  href={repo.html_url}
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
                  {t("view")}
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

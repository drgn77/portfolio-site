export interface GithubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  language: string | null;
  fork: boolean;
}

export const LANGUAGE_COLORS: Record<string, string> = {
  Python: "#3572A5",
  TypeScript: "#2b7489",
  JavaScript: "#f1e05a",
  HTML: "#e34c26",
  CSS: "#563d7c",
};

export const DEFAULT_LANGUAGE_COLOR = "#FFB300";

export async function getGithubRepos(): Promise<GithubRepo[]> {
  const res = await fetch(
    "https://api.github.com/users/drgn77/repos?sort=updated&per_page=12&type=public",
    { next: { revalidate: 3600 } }
  );

  if (!res.ok) {
    throw new Error(`GitHub API error: ${res.status}`);
  }

  const data: GithubRepo[] = await res.json();
  return data.filter((repo) => !repo.fork);
}

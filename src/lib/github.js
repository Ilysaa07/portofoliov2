// src/lib/github.js
export async function getUserRepos(username) {
  const res = await fetch(
    `https://api.github.com/users/${username}/repos?per_page=100&sort=pushed`,
    {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
        Accept: "application/vnd.github+json",
      },
    }
  );

  if (!res.ok) {
    const message = await res.text();
    throw new Error(`GitHub API error ${res.status}: ${message}`);
  }
  return res.json();
}

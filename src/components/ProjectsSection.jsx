// src/components/ProjectsSection.jsx
import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getUserRepos } from "@/lib/github";
import {
  ExternalLink,
  Github,
  Star,
  GitBranch, // ⬅️ ganti Branch → GitBranch
} from "lucide-react";
import cls from "classnames";

const username = "Ilysaa07";
const placeholder = "/placeholder-project.webp";

/* ───────────────── helpers ───────────────── */
async function checkImageExists(url) {
  try {
    const res = await fetch(url, { method: "HEAD" });
    return res.ok;
  } catch {
    return false;
  }
}

const BlinkingDot = () => (
  <span className="relative ml-2 flex h-3 w-3">
    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
    <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500" />
  </span>
);

/* ───────────────── component ───────────────── */
export default function ProjectsSection() {
  const [projects, setProjects] = useState([]);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  /* fetch repos once */
  useEffect(() => {
    (async () => {
      try {
        const repos = await getUserRepos(username);

        const mapped = await Promise.all(
          repos.map(async (r) => {
            const imgURL = `https://raw.githubusercontent.com/${username}/${r.name}/${r.default_branch}/preview.png`;
            const hasPreview = await checkImageExists(imgURL);

            return {
              id: r.id,
              title: r.name.replace(/[-_]/g, " "),
              category: r.topics?.[0] ?? r.language ?? "Project",
              description: r.description ?? "No description provided",
              technologies: r.topics?.length ? r.topics : [r.language],
              stars: r.stargazers_count,
              forks: r.forks_count,
              demoUrl: r.homepage || r.html_url,
              githubUrl: r.html_url,
              pushedAt: new Date(r.pushed_at),
              imgSrc: hasPreview ? imgURL : placeholder,
            };
          })
        );

        setProjects(mapped);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  /* derived data */
  const liveProject = useMemo(
    () =>
      projects.length
        ? [...projects].sort((a, b) => b.pushedAt - a.pushedAt)[0]
        : null,
    [projects]
  );

  const categories = useMemo(
    () => ["All", ...new Set(projects.map((p) => p.category))],
    [projects]
  );

  const visible =
    filter === "All" ? projects : projects.filter((p) => p.category === filter);

  /* framer variants */
  const cardVariant = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0 },
  };

  /* render */
  return (
    <section
      id="projects"
      className="container mx-auto px-4 md:px-8 py-20 text-neutral-800 dark:text-neutral-100"
    >
      {/* heading */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <p className="text-sm font-medium text-muted-foreground tracking-wider mb-4">
          PORTFOLIO
        </p>
        <h2 className="text-4xl font-bold mb-6">Featured Projects</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          A showcase of my recent work, demonstrating expertise in modern web
          technologies and innovative problem-solving approaches.
        </p>
      </motion.div>

      {/* LIVE / FEATURED project */}
      {liveProject && (
        <motion.section
          layout
          whileHover={{ scale: 1.01 }}
          className="mb-16 overflow-hidden rounded-3xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 grid md:grid-cols-2"
        >
          {/* image */}
          <div className="relative h-72 md:h-auto bg-neutral-800/30">
            <img
              src={liveProject.imgSrc}
              onError={(e) => (e.currentTarget.src = placeholder)}
              alt={liveProject.title}
              className="h-full w-full object-cover"
            />
            <span className="absolute top-4 left-4 bg-white dark:bg-neutral-900 text-black dark:text-white text-[11px] font-semibold px-3 py-1 rounded-full uppercase tracking-wide">
              Featured Project
            </span>
          </div>

          {/* details */}
          <div className="flex flex-col gap-6 p-8">
            <header className="flex items-center gap-2 text-sm font-medium text-neutral-500">
              <BlinkingDot />
              <span>LIVE PROJECT</span>
            </header>

            <h2 className="text-3xl font-bold">{liveProject.title}</h2>

            <p className="text-neutral-600 dark:text-neutral-400">
              {liveProject.description}
            </p>

            <div className="flex items-center gap-6 text-sm">
              <span className="inline-flex items-center gap-1">
                <Star size={16} className="text-yellow-400" />{" "}
                {liveProject.stars} stars
              </span>
              <span className="inline-flex items-center gap-1">
                <GitBranch size={16} className="text-blue-500" />{" "}
                {liveProject.forks} forks
              </span>
            </div>

            <div>
              <h4 className="mb-2 text-sm font-semibold uppercase tracking-wide">
                Tech Stack
              </h4>
              {liveProject.technologies.map((t) => (
                <span
                  key={t}
                  className="inline-block rounded-full bg-neutral-200 dark:bg-neutral-700 px-3 py-1 text-[11px] mr-2 mb-2"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="mt-auto grid grid-cols-2 gap-4 w-full max-w-md">
              <a
                href={liveProject.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 rounded-lg border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 py-3 font-medium hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
              >
                <Github size={18} /> View Code
              </a>

              {liveProject.demoUrl && (
                <a
                  href={liveProject.demoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 rounded-lg border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 py-3 font-medium hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
                >
                  <ExternalLink size={18} /> Live Demo
                </a>
              )}
            </div>
          </div>
        </motion.section>
      )}

      {/* filter buttons */}
      <div className="mb-8 flex flex-wrap justify-center gap-3">
        {categories.map((c) => (
          <motion.button
            whileTap={{ scale: 0.9 }}
            key={c}
            onClick={() => setFilter(c)}
            className={cls(
              "px-4 py-1.5 rounded-full text-sm border backdrop-blur",
              c === filter
                ? "bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 border-neutral-900 dark:border-neutral-100"
                : "bg-neutral-100/60 dark:bg-neutral-800/60 border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300"
            )}
          >
            {c}
          </motion.button>
        ))}
      </div>

      {/* grid cards */}
      {loading ? (
        <p className="text-center">Loading…</p>
      ) : (
        <AnimatePresence>
          <motion.div
            layout
            className="grid gap-8"
            style={{
              gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))",
            }}
          >
            {visible.map((p, i) => (
              <motion.article
                key={p.id}
                variants={cardVariant}
                initial="hidden"
                animate="show"
                exit="hidden"
                transition={{ duration: 0.4, delay: i * 0.05 }}
                whileHover={{ y: -4, boxShadow: "0 8px 24px rgba(0,0,0,.12)" }}
                className="flex flex-col overflow-hidden rounded-2xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 transition-colors"
              >
                {/* image */}
                <div className="relative h-60 bg-neutral-800/30 overflow-hidden">
                  <img
                    src={p.imgSrc}
                    onError={(e) => (e.currentTarget.src = placeholder)}
                    alt={p.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>

                {/* content */}
                <div className="flex flex-col flex-1 p-6 gap-4">
                  <span className="text-xs uppercase tracking-wide text-neutral-500">
                    {p.category}
                  </span>

                  <h3 className="text-xl font-semibold leading-snug">
                    {p.title}
                  </h3>

                  <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2">
                    {p.description}
                  </p>

                  <div>
                    {p.technologies.map((t) => (
                      <span
                        key={t}
                        className="inline-block rounded bg-neutral-200 dark:bg-neutral-700 px-3 py-1 text-[11px] mr-2 mb-2"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto flex items-center justify-between pt-4 border-t border-neutral-200 dark:border-neutral-700">
                    <a
                      href={p.demoUrl || p.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm font-medium hover:underline"
                    >
                      View Details
                    </a>

                    <div className="flex items-center gap-4 text-neutral-600 dark:text-neutral-300">
                      {p.demoUrl && (
                        <a
                          href={p.demoUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="hover:text-neutral-900 dark:hover:text-white"
                        >
                          <ExternalLink size={18} />
                        </a>
                      )}
                      <a
                        href={p.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="hover:text-neutral-900 dark:hover:text-white"
                      >
                        <Github size={18} />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </AnimatePresence>
      )}
    </section>
  );
}

import { ArrowUpRight, FolderGit2, GitFork, Github, RefreshCw, Star } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { GitHubRepo, PROFILE, PROJECTS_VISUAL_URL } from '../data/profile';

interface ProjectsSectionProps {
  onReposLoaded?: (repos: GitHubRepo[]) => void;
}

export function ProjectsSection({ onReposLoaded }: ProjectsSectionProps) {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedLang, setSelectedLang] = useState<string>('All');
  const [bannerImgError, setBannerImgError] = useState(false);

  const fetchRepositories = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://api.github.com/users/${PROFILE.githubHandle}/repos?sort=updated&per_page=12`,
        {
          headers: {
            Accept: 'application/vnd.github+json',
          },
        }
      );

      if (!response.ok) {
        throw new Error(`GitHub returned status ${response.status}`);
      }

      const data: GitHubRepo[] = await response.json();
      const nonForkOrAll = Array.isArray(data) ? data : [];
      setRepos(nonForkOrAll);
      onReposLoaded?.(nonForkOrAll);
    } catch {
      setError('Unable to load live repositories from GitHub right now.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchRepositories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const languages = useMemo(() => {
    const unique = new Set<string>();
    repos.forEach((repo) => {
      if (repo.language) {
        unique.add(repo.language);
      }
    });
    return ['All', ...Array.from(unique)];
  }, [repos]);

  const filteredRepos = useMemo(() => {
    if (selectedLang === 'All') {
      return repos;
    }
    return repos.filter((repo) => repo.language === selectedLang);
  }, [repos, selectedLang]);

  const formatDate = (isoDate: string) => {
    try {
      return new Intl.DateTimeFormat('en-IN', {
        month: 'short',
        year: 'numeric',
      }).format(new Date(isoDate));
    } catch {
      return '';
    }
  };

  return (
    <section id="projects" className="no-print mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="font-display text-3xl font-bold tracking-tight text-white">
            Projects & GitHub Repositories
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-400 sm:text-base">
            Public codebases and design-engineering experiments synced directly from{' '}
            <a
              href={PROFILE.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-300 underline decoration-blue-400/40 underline-offset-4 transition-colors hover:text-blue-200"
            >
              github.com/{PROFILE.githubHandle}
            </a>
            .
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => void fetchRepositories()}
            disabled={loading}
            className="inline-flex min-h-[40px] items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2 text-xs font-medium text-slate-200 transition-colors hover:border-blue-400/40 hover:bg-white/[0.08] disabled:opacity-50 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${loading ? 'animate-spin' : ''}`} aria-hidden="true" />
            <span>Refresh</span>
          </button>

          <a
            href={PROFILE.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[40px] items-center gap-2 rounded-xl border border-violet-400/30 bg-violet-500/15 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-violet-500/25 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
          >
            <Github className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Open GitHub</span>
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </div>
      </div>

      {/* Interactive Language Filter Bar */}
      {!loading && languages.length > 1 && (
        <div
          role="tablist"
          aria-label="Filter repositories by language"
          className="mt-8 flex flex-wrap items-center gap-2"
        >
          {languages.map((lang) => {
            const active = selectedLang === lang;
            return (
              <button
                key={lang}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setSelectedLang(lang)}
                className={`min-h-[36px] rounded-lg px-3.5 py-1.5 text-xs font-medium transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 ${
                  active
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-950/50'
                    : 'border border-white/10 bg-white/[0.03] text-slate-300 hover:bg-white/[0.08] hover:text-white'
                }`}
              >
                {lang}
              </button>
            );
          })}
        </div>
      )}

      {/* Loading Skeleton */}
      {loading && (
        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="glass-card h-52 animate-pulse rounded-2xl p-6"
              aria-hidden="true"
            />
          ))}
        </div>
      )}

      {/* Live Repository Grid */}
      {!loading && !error && filteredRepos.length > 0 && (
        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filteredRepos.map((repo) => (
            <article
              key={repo.id}
              className="glass-card glass-card-interactive flex flex-col justify-between rounded-2xl p-6"
            >
              <div>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <FolderGit2 className="h-5 w-5 text-blue-400 shrink-0" aria-hidden="true" />
                    <h3 className="font-display truncate text-lg font-semibold text-white">
                      {repo.name}
                    </h3>
                  </div>

                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View ${repo.name} on GitHub`}
                    className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-slate-300 transition-colors hover:border-blue-400/50 hover:text-white"
                  >
                    <Github className="h-4 w-4" aria-hidden="true" />
                  </a>
                </div>

                <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-slate-300">
                  {repo.description || 'Public repository published on GitHub.'}
                </p>
              </div>

              <div className="mt-6 border-t border-white/[0.07] pt-4">
                <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
                  <div className="flex items-center gap-2.5">
                    {repo.language && <span className="text-slate-200">{repo.language}</span>}
                    {repo.language && <span aria-hidden="true">·</span>}
                    <span className="font-mono">Updated {formatDate(repo.updated_at)}</span>
                  </div>

                  <div className="flex items-center gap-3 font-mono">
                    <span className="inline-flex items-center gap-1">
                      <Star className="h-3.5 w-3.5 text-violet-300" aria-hidden="true" />
                      {repo.stargazers_count}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <GitFork className="h-3.5 w-3.5 text-blue-300" aria-hidden="true" />
                      {repo.forks_count}
                    </span>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-300 transition-colors hover:text-blue-200"
                  >
                    <span>View on GitHub</span>
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>

                  {repo.homepage && (
                    <a
                      href={repo.homepage.startsWith('http') ? repo.homepage : `https://${repo.homepage}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-violet-300 transition-colors hover:text-violet-200"
                    >
                      <span>Live Preview</span>
                      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Honest Empty or Offline Fallback Card (never invents fake projects) */}
      {!loading && (error || filteredRepos.length === 0) && (
        <div className="glass-card mt-8 overflow-hidden rounded-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 lg:items-stretch">
            <div className="relative min-h-[220px] lg:col-span-5">
              {!bannerImgError ? (
                <img
                  src={PROJECTS_VISUAL_URL}
                  alt="Abstract dark indigo wireframe architecture representing software engineering projects"
                  referrerPolicy="no-referrer"
                  onError={() => setBannerImgError(true)}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="h-full w-full bg-gradient-to-br from-violet-950 to-blue-950" />
              )}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-r from-transparent to-[#070512]/80"
              />
            </div>

            <div className="flex flex-col justify-center p-6 sm:p-8 lg:col-span-7">
              <h3 className="font-display text-xl font-bold text-white">
                Explore Baby V S on GitHub
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-slate-300">
                {error
                  ? `${error} You can view all repositories, commits, and coursework code directly on GitHub.`
                  : 'No public repositories matched this filter yet. Visit GitHub directly to inspect recent activity and upcoming Computer Science & Design work.'}
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a
                  href={PROFILE.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:from-violet-500 hover:to-blue-500"
                >
                  <Github className="h-4 w-4" aria-hidden="true" />
                  <span>Visit github.com/{PROFILE.githubHandle}</span>
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

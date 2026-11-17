import { Download, Printer, X } from 'lucide-react';
import { useEffect } from 'react';
import { DISCIPLINE_PILLARS, GitHubRepo, PROFILE } from '../data/profile';

interface ResumeModalProps {
  open: boolean;
  onClose: () => void;
  repos: GitHubRepo[];
}

export function ResumeModal({ open, onClose, repos }: ResumeModalProps) {
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  if (!open) {
    return null;
  }

  const handleDownloadResumeFile = () => {
    const repoListHtml =
      repos.length > 0
        ? `<h2>GitHub Repositories</h2>
           <ul>${repos
             .slice(0, 6)
             .map(
               (r) =>
                 `<li><strong>${r.name}</strong>${r.language ? ` (${r.language})` : ''} — ${
                   r.description || 'Public GitHub repository'
                 } · <a href="${r.html_url}">${r.html_url}</a></li>`
             )
             .join('')}</ul>`
        : '';

    const htmlDocument = `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>${PROFILE.name} — Resume</title>
  <style>
    body { font-family: system-ui, -apple-system, sans-serif; color: #0f172a; max-width: 780px; margin: 40px auto; padding: 0 24px; line-height: 1.55; }
    h1 { margin: 0; font-size: 28px; }
    .meta { color: #475569; margin-top: 6px; font-size: 14px; }
    h2 { margin-top: 28px; font-size: 16px; border-bottom: 1px solid #cbd5e1; padding-bottom: 6px; text-transform: uppercase; letter-spacing: 0.04em; color: #1e293b; }
    p, li { font-size: 14px; color: #334155; }
    a { color: #2563eb; text-decoration: none; }
  </style>
</head>
<body>
  <h1>${PROFILE.name}</h1>
  <div class="meta">${PROFILE.degree} · ${PROFILE.college} · ${PROFILE.currentYear} (Class of ${PROFILE.graduationYear})</div>
  <div class="meta">${PROFILE.location} · <a href="${PROFILE.mailtoUrl}">${PROFILE.email}</a> · ${PROFILE.mobile}</div>
  <div class="meta">GitHub: <a href="${PROFILE.githubUrl}">${PROFILE.githubUrl}</a> · LinkedIn: <a href="${PROFILE.linkedinUrl}">${PROFILE.linkedinUrl}</a></div>

  <h2>Education</h2>
  <p><strong>${PROFILE.degree}</strong> — ${PROFILE.college}<br/>${PROFILE.currentYear} · Expected Graduation: ${PROFILE.graduationYear} · ${PROFILE.location}</p>

  <h2>Academic Focus</h2>
  <ul>
    ${DISCIPLINE_PILLARS.map((p) => `<li><strong>${p.title}:</strong> ${p.summary}</li>`).join('')}
  </ul>

  ${repoListHtml}
</body>
</html>`;

    const blob = new Blob([htmlDocument], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Baby_V_S_Resume.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-md"
    >
      <div className="glass-card relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-[#0B081B]/95 p-6 sm:p-8">
        <div className="no-print flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] pb-4">
          <div>
            <h2 id="resume-modal-title" className="font-display text-lg font-bold text-white">
              Resume Preview
            </h2>
            <p className="text-xs text-slate-400">
              Verified academic and contact profile for {PROFILE.name}
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={handleDownloadResumeFile}
              className="inline-flex min-h-[40px] items-center gap-2 rounded-lg bg-gradient-to-r from-violet-600 to-blue-600 px-4 py-2 text-xs font-semibold text-white transition-all hover:from-violet-500 hover:to-blue-500 cursor-pointer"
            >
              <Download className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Download Resume</span>
            </button>

            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex min-h-[40px] items-center gap-2 rounded-lg border border-white/15 bg-white/[0.05] px-3.5 py-2 text-xs font-medium text-slate-200 transition-colors hover:bg-white/[0.1] cursor-pointer"
            >
              <Printer className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Print / PDF</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close resume preview"
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-slate-300 transition-colors hover:bg-white/[0.1] hover:text-white cursor-pointer"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Clean Printable Resume Sheet */}
        <div className="mt-6 rounded-xl bg-white p-6 text-slate-900 sm:p-8">
          <div className="border-b border-slate-200 pb-5">
            <h3 className="font-display text-2xl font-bold text-slate-900">{PROFILE.name}</h3>
            <p className="mt-1 text-sm font-medium text-slate-700">
              {PROFILE.degree} · {PROFILE.college}
            </p>
            <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-600">
              <span>{PROFILE.location}</span>
              <span>·</span>
              <a href={PROFILE.mailtoUrl} className="text-blue-700 hover:underline">
                {PROFILE.email}
              </a>
              <span>·</span>
              <a href={PROFILE.telUrl} className="font-mono text-slate-700 hover:underline">
                {PROFILE.mobile}
              </a>
            </div>
            <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-600">
              <a
                href={PROFILE.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 hover:underline"
              >
                {PROFILE.githubUrl}
              </a>
              <span>·</span>
              <a
                href={PROFILE.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 hover:underline"
              >
                {PROFILE.linkedinUrl}
              </a>
            </div>
          </div>

          <div className="mt-5">
            <h4 className="font-display text-xs font-bold uppercase tracking-wider text-slate-500">
              Education
            </h4>
            <div className="mt-2 flex flex-col justify-between gap-1 sm:flex-row sm:items-baseline">
              <div>
                <p className="text-sm font-semibold text-slate-900">{PROFILE.degree}</p>
                <p className="text-xs text-slate-600">
                  {PROFILE.college} · {PROFILE.location}
                </p>
              </div>
              <p className="font-mono text-xs font-medium text-slate-700">
                {PROFILE.currentYear} · Expected {PROFILE.graduationYear}
              </p>
            </div>
          </div>

          <div className="mt-5">
            <h4 className="font-display text-xs font-bold uppercase tracking-wider text-slate-500">
              Academic Focus & Core Areas
            </h4>
            <ul className="mt-2 space-y-2 text-xs leading-relaxed text-slate-700">
              {DISCIPLINE_PILLARS.map((pillar) => (
                <li key={pillar.index}>
                  <span className="font-semibold text-slate-900">{pillar.title}:</span>{' '}
                  {pillar.summary}
                </li>
              ))}
            </ul>
          </div>

          {repos.length > 0 && (
            <div className="mt-5">
              <h4 className="font-display text-xs font-bold uppercase tracking-wider text-slate-500">
                Public GitHub Repositories
              </h4>
              <ul className="mt-2 space-y-2 text-xs leading-relaxed text-slate-700">
                {repos.slice(0, 6).map((repo) => (
                  <li key={repo.id}>
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-blue-700 hover:underline"
                    >
                      {repo.name}
                    </a>
                    {repo.language ? ` (${repo.language})` : ''} —{' '}
                    {repo.description || 'Public repository on GitHub.'}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

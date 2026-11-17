import { Github, Linkedin, Mail, Phone } from 'lucide-react';
import { PROFILE } from '../data/profile';

export function Footer() {
  return (
    <footer className="no-print border-t border-white/[0.08] bg-[#060410]/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <div>
          <p className="font-display text-base font-semibold text-white">{PROFILE.name}</p>
          <p className="mt-1 text-sm text-slate-400">
            {PROFILE.degree} · {PROFILE.college}
          </p>
          <p className="mt-1 text-xs text-slate-500">
            {PROFILE.location} · Class of {PROFILE.graduationYear}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <a
            href={PROFILE.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile of Baby V S"
            title="LinkedIn"
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-slate-300 transition-all duration-150 hover:border-blue-400/50 hover:bg-blue-500/15 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
          >
            <Linkedin className="h-5 w-5" aria-hidden="true" />
          </a>

          <a
            href={PROFILE.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile of Baby V S"
            title="GitHub"
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-slate-300 transition-all duration-150 hover:border-violet-400/50 hover:bg-violet-500/15 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
          >
            <Github className="h-5 w-5" aria-hidden="true" />
          </a>

          <a
            href={PROFILE.mailtoUrl}
            aria-label={`Email ${PROFILE.email}`}
            title={PROFILE.email}
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-slate-300 transition-all duration-150 hover:border-blue-400/50 hover:bg-blue-500/15 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
          >
            <Mail className="h-5 w-5" aria-hidden="true" />
          </a>

          <a
            href={PROFILE.telUrl}
            aria-label={`Call ${PROFILE.mobile}`}
            title={PROFILE.mobile}
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-slate-300 transition-all duration-150 hover:border-violet-400/50 hover:bg-violet-500/15 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
          >
            <Phone className="h-5 w-5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}

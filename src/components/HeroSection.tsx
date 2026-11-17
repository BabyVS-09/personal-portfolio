import { ArrowDownRight, Download, Github, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
import { HERO_VISUAL_URL, PROFILE } from '../data/profile';

interface HeroSectionProps {
  onOpenResume: () => void;
}

export function HeroSection({ onOpenResume }: HeroSectionProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <section id="top" className="no-print mx-auto max-w-6xl px-4 pt-12 pb-16 sm:px-6 sm:pt-16 sm:pb-20 lg:px-8">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-stretch lg:gap-12">
        {/* Left Column: Identity, Contact Links & Primary Actions */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col justify-between lg:col-span-7"
        >
          <div>
            <p className="flex flex-wrap items-center gap-2 text-xs font-medium tracking-wide text-blue-300/90 sm:text-sm">
              <MapPin className="h-3.5 w-3.5 text-blue-400" aria-hidden="true" />
              <span>{PROFILE.location}</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="font-mono text-slate-300">Class of {PROFILE.graduationYear}</span>
            </p>

            <h1 className="font-display mt-4 text-balance text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              {PROFILE.name}
            </h1>

            <p className="mt-4 max-w-2xl text-lg font-medium leading-relaxed text-slate-200 sm:text-xl">
              {PROFILE.degree}
            </p>
            <p className="mt-2 max-w-xl text-base leading-relaxed text-slate-400">
              {PROFILE.currentYear} undergraduate at{' '}
              <span className="text-slate-200">{PROFILE.college}</span>, combining computer science
              fundamentals with human-centered interface engineering.
            </p>

            {/* Primary CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={onOpenResume}
                className="inline-flex min-h-[44px] items-center gap-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-950/60 transition-all duration-150 hover:from-violet-500 hover:to-blue-500 active:scale-[0.99] whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#070512]"
              >
                <Download className="h-4 w-4" aria-hidden="true" />
                <span>Download Resume</span>
              </button>

              <a
                href="#contact"
                className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-6 py-3 text-sm font-semibold text-slate-100 backdrop-blur-md transition-all duration-150 hover:border-blue-400/40 hover:bg-white/[0.08] whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
              >
                <span>Contact Me</span>
                <ArrowDownRight className="h-4 w-4 text-blue-400" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Direct Hero Contact & Social Links */}
          <div className="mt-10 border-t border-white/[0.08] pt-6">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
              <a
                href={PROFILE.mailtoUrl}
                className="inline-flex min-h-[40px] items-center gap-2 text-slate-300 transition-colors hover:text-blue-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded"
              >
                <Mail className="h-4 w-4 text-blue-400 shrink-0" aria-hidden="true" />
                <span>{PROFILE.email}</span>
              </a>

              <a
                href={PROFILE.telUrl}
                className="inline-flex min-h-[40px] items-center gap-2 font-mono text-slate-300 transition-colors hover:text-violet-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 rounded"
              >
                <Phone className="h-4 w-4 text-violet-400 shrink-0" aria-hidden="true" />
                <span>{PROFILE.mobile}</span>
              </a>
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-3">
              <a
                href={PROFILE.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[40px] items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3.5 py-2 text-xs font-medium text-slate-200 transition-colors hover:border-violet-400/40 hover:bg-violet-500/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
              >
                <Github className="h-4 w-4 text-violet-300" aria-hidden="true" />
                <span>GitHub · {PROFILE.githubHandle}</span>
              </a>

              <a
                href={PROFILE.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[40px] items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3.5 py-2 text-xs font-medium text-slate-200 transition-colors hover:border-blue-400/40 hover:bg-blue-500/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
              >
                <Linkedin className="h-4 w-4 text-blue-300" aria-hidden="true" />
                <span>LinkedIn · {PROFILE.linkedinHandle}</span>
              </a>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Matching-Height Architectural Visual Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5"
        >
          <div className="glass-card relative h-full min-h-[300px] overflow-hidden rounded-2xl lg:min-h-[430px]">
            {!imgError ? (
              <img
                src={HERO_VISUAL_URL}
                alt="Architectural smoked glass geometry in dark purple and electric blue light representing Computer Science and Design"
                referrerPolicy="no-referrer"
                onError={() => setImgError(true)}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full min-h-[300px] w-full items-center justify-center bg-gradient-to-br from-violet-950/80 via-[#0C0822] to-blue-950/80 p-8">
                <div className="text-center">
                  <p className="font-display text-xl font-bold text-white">{PROFILE.name}</p>
                  <p className="mt-1 text-sm text-slate-300">{PROFILE.degree}</p>
                </div>
              </div>
            )}

            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-[#070512]/90 via-[#070512]/25 to-transparent"
            />

            <div className="absolute inset-x-0 bottom-0 p-6">
              <p className="text-xs font-medium text-blue-300">
                {PROFILE.currentYear} · Expected {PROFILE.graduationYear}
              </p>
              <p className="font-display mt-1 text-lg font-semibold text-white">
                {PROFILE.college}
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Full-Width 4-Column Profile Strip */}
      <div className="glass-card mt-10 grid grid-cols-1 divide-y divide-white/[0.08] rounded-2xl sm:grid-cols-2 sm:divide-y-0 sm:divide-x lg:grid-cols-4">
        <div className="p-6">
          <p className="text-xs font-medium text-slate-400">Degree Program</p>
          <p className="font-display mt-1.5 text-sm font-semibold text-white">{PROFILE.degree}</p>
        </div>
        <div className="p-6">
          <p className="text-xs font-medium text-slate-400">Institution</p>
          <p className="font-display mt-1.5 text-sm font-semibold text-white">{PROFILE.college}</p>
        </div>
        <div className="p-6">
          <p className="text-xs font-medium text-slate-400">Academic Standing</p>
          <p className="font-display mt-1.5 text-sm font-semibold text-white font-mono">
            {PROFILE.currentYear} · Graduation {PROFILE.graduationYear}
          </p>
        </div>
        <div className="p-6">
          <p className="text-xs font-medium text-slate-400">Location</p>
          <p className="font-display mt-1.5 text-sm font-semibold text-white">{PROFILE.location}</p>
        </div>
      </div>
    </section>
  );
}

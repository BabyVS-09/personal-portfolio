import { GraduationCap, Layers } from 'lucide-react';
import { DISCIPLINE_PILLARS, PROFILE } from '../data/profile';

export function AboutEducationSection() {
  return (
    <section id="about" className="no-print mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
        {/* Left: Academic Profile & Education */}
        <div id="education" className="lg:col-span-5">
          <div className="glass-card rounded-2xl p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/15 text-violet-300 border border-violet-400/20">
                <GraduationCap className="h-5 w-5" aria-hidden="true" />
              </div>
              <h2 className="font-display text-2xl font-bold tracking-tight text-white">
                Education
              </h2>
            </div>

            <div className="mt-6 border-t border-white/[0.08] pt-6">
              <p className="text-xs font-medium text-blue-300 font-mono">
                {PROFILE.currentYear} · Graduation {PROFILE.graduationYear}
              </p>
              <h3 className="font-display mt-2 text-lg font-semibold text-white">
                {PROFILE.degree}
              </h3>
              <p className="mt-1 text-sm font-medium text-slate-300">{PROFILE.college}</p>
              <p className="mt-1 text-sm text-slate-400">{PROFILE.location}</p>

              <p className="mt-5 text-sm leading-relaxed text-slate-300">
                Pursuing an interdisciplinary undergraduate curriculum uniting core computer science
                engineering with human-centered design, interface prototyping, and interactive
                software development.
              </p>
            </div>
          </div>
        </div>

        {/* Right: Computer Science & Design Focus Pillars */}
        <div className="lg:col-span-7">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/15 text-blue-300 border border-blue-400/20">
              <Layers className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>
              <h2 className="font-display text-2xl font-bold tracking-tight text-white">
                Academic Focus & Capabilities
              </h2>
              <p className="text-sm text-slate-400">
                Core areas of study and engineering practice within Computer Science and Design
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {DISCIPLINE_PILLARS.map((pillar) => (
              <article
                key={pillar.index}
                className="glass-card glass-card-interactive flex flex-col justify-between rounded-2xl p-6"
              >
                <div>
                  <h3 className="font-display text-base font-semibold text-white">
                    <span className="mr-2 font-mono text-sm text-blue-400">{pillar.index}.</span>
                    {pillar.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-slate-300">{pillar.summary}</p>
                </div>
                <p className="mt-5 border-t border-white/[0.06] pt-3 text-xs text-slate-400">
                  {pillar.topics}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

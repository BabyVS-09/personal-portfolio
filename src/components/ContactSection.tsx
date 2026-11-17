import {
  ArrowUpRight,
  Check,
  Copy,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Send,
} from 'lucide-react';
import { FormEvent, useState } from 'react';
import { PROFILE } from '../data/profile';

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const INITIAL_FORM: FormState = {
  name: '',
  email: '',
  subject: '',
  message: '',
};

export function ContactSection() {
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [formError, setFormError] = useState<string | null>(null);
  const [submittedData, setSubmittedData] = useState<FormState | null>(null);
  const [copiedField, setCopiedField] = useState<'email' | 'mobile' | 'message' | null>(null);

  const handleCopy = async (value: string, field: 'email' | 'mobile' | 'message') => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch {
      // Clipboard fallback ignored silently if blocked by browser policy
    }
  };

  const buildMailtoHref = (data: FormState) => {
    const subject = encodeURIComponent(data.subject.trim() || `Portfolio Inquiry from ${data.name.trim()}`);
    const body = encodeURIComponent(
      `Name: ${data.name.trim()}\nEmail: ${data.email.trim()}\n\n${data.message.trim()}`
    );
    return `${PROFILE.mailtoUrl}?subject=${subject}&body=${body}`;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError(null);

    const trimmedName = form.name.trim();
    const trimmedEmail = form.email.trim();
    const trimmedSubject = form.subject.trim();
    const trimmedMessage = form.message.trim();

    if (!trimmedName || !trimmedEmail || !trimmedMessage) {
      setFormError('Please fill in your name, email address, and message.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      setFormError('Please enter a valid email address.');
      return;
    }

    const cleanSubmission: FormState = {
      name: trimmedName,
      email: trimmedEmail,
      subject: trimmedSubject || `Portfolio message from ${trimmedName}`,
      message: trimmedMessage,
    };

    setSubmittedData(cleanSubmission);
    setForm(INITIAL_FORM);
  };

  return (
    <section id="contact" className="no-print mx-auto max-w-6xl px-4 py-16 pb-24 sm:px-6 lg:px-8">
      <div className="mb-10">
        <h2 className="font-display text-3xl font-bold tracking-tight text-white">Contact Me</h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-400 sm:text-base">
          Reach out directly via email, phone, GitHub, or LinkedIn, or compose a message below.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
        {/* Left Column: Direct Contact Cards & Clickable Social Icons */}
        <div className="space-y-4 lg:col-span-5">
          {/* Email Card */}
          <div className="glass-card glass-card-interactive flex items-center justify-between gap-3 rounded-2xl p-5">
            <a
              href={PROFILE.mailtoUrl}
              className="flex min-w-0 flex-1 items-center gap-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded-lg"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-blue-400/25 bg-blue-500/15 text-blue-300">
                <Mail className="h-5 w-5" aria-hidden="true" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-medium text-slate-400">Email</p>
                <p className="truncate text-sm font-semibold text-white transition-colors hover:text-blue-300">
                  {PROFILE.email}
                </p>
              </div>
            </a>

            <button
              type="button"
              onClick={() => void handleCopy(PROFILE.email, 'email')}
              aria-label="Copy email address"
              title="Copy email"
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-slate-300 transition-colors hover:border-blue-400/40 hover:text-white cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
            >
              {copiedField === 'email' ? (
                <Check className="h-4 w-4 text-blue-300" aria-hidden="true" />
              ) : (
                <Copy className="h-4 w-4" aria-hidden="true" />
              )}
            </button>
          </div>

          {/* Mobile Card */}
          <div className="glass-card glass-card-interactive flex items-center justify-between gap-3 rounded-2xl p-5">
            <a
              href={PROFILE.telUrl}
              className="flex min-w-0 flex-1 items-center gap-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 rounded-lg"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-violet-400/25 bg-violet-500/15 text-violet-300">
                <Phone className="h-5 w-5" aria-hidden="true" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-medium text-slate-400">Mobile</p>
                <p className="font-mono truncate text-sm font-semibold text-white transition-colors hover:text-violet-300">
                  {PROFILE.mobile}
                </p>
              </div>
            </a>

            <button
              type="button"
              onClick={() => void handleCopy(PROFILE.mobile, 'mobile')}
              aria-label="Copy mobile number"
              title="Copy mobile number"
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-slate-300 transition-colors hover:border-violet-400/40 hover:text-white cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
            >
              {copiedField === 'mobile' ? (
                <Check className="h-4 w-4 text-violet-300" aria-hidden="true" />
              ) : (
                <Copy className="h-4 w-4" aria-hidden="true" />
              )}
            </button>
          </div>

          {/* GitHub Card */}
          <a
            href={PROFILE.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-card glass-card-interactive flex items-center justify-between gap-3 rounded-2xl p-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
          >
            <div className="flex min-w-0 items-center gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-violet-400/25 bg-violet-500/15 text-violet-300">
                <Github className="h-5 w-5" aria-hidden="true" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-medium text-slate-400">GitHub</p>
                <p className="truncate text-sm font-semibold text-white">
                  github.com/{PROFILE.githubHandle}
                </p>
              </div>
            </div>
            <ArrowUpRight className="h-4 w-4 shrink-0 text-slate-400" aria-hidden="true" />
          </a>

          {/* LinkedIn Card */}
          <a
            href={PROFILE.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-card glass-card-interactive flex items-center justify-between gap-3 rounded-2xl p-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
          >
            <div className="flex min-w-0 items-center gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-blue-400/25 bg-blue-500/15 text-blue-300">
                <Linkedin className="h-5 w-5" aria-hidden="true" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-medium text-slate-400">LinkedIn</p>
                <p className="truncate text-sm font-semibold text-white">
                  linkedin.com/{PROFILE.linkedinHandle}
                </p>
              </div>
            </div>
            <ArrowUpRight className="h-4 w-4 shrink-0 text-slate-400" aria-hidden="true" />
          </a>

          {/* Location + Quick Social Icon Dock */}
          <div className="glass-card rounded-2xl p-5">
            <div className="flex items-center gap-3 text-sm text-slate-300">
              <MapPin className="h-4 w-4 shrink-0 text-blue-400" aria-hidden="true" />
              <span>{PROFILE.location}</span>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-white/[0.08] pt-4">
              <a
                href={PROFILE.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open GitHub profile"
                className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-slate-200 transition-all hover:border-violet-400/50 hover:bg-violet-500/20 hover:text-white"
              >
                <Github className="h-5 w-5" aria-hidden="true" />
              </a>
              <a
                href={PROFILE.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open LinkedIn profile"
                className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-slate-200 transition-all hover:border-blue-400/50 hover:bg-blue-500/20 hover:text-white"
              >
                <Linkedin className="h-5 w-5" aria-hidden="true" />
              </a>
              <a
                href={PROFILE.mailtoUrl}
                aria-label="Send an email"
                className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-slate-200 transition-all hover:border-blue-400/50 hover:bg-blue-500/20 hover:text-white"
              >
                <Mail className="h-5 w-5" aria-hidden="true" />
              </a>
              <a
                href={PROFILE.telUrl}
                aria-label="Call mobile number"
                className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-slate-200 transition-all hover:border-violet-400/50 hover:bg-violet-500/20 hover:text-white"
              >
                <Phone className="h-5 w-5" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Functional Contact Form */}
        <div className="lg:col-span-7">
          <div className="glass-card rounded-2xl p-6 sm:p-8">
            <h3 className="font-display text-xl font-semibold text-white">Send a Message</h3>
            <p className="mt-1.5 text-sm text-slate-400">
              Messages are prepared for{' '}
              <a href={PROFILE.mailtoUrl} className="text-blue-300 hover:underline">
                {PROFILE.email}
              </a>
              .
            </p>

            {submittedData ? (
              <div className="mt-6 rounded-xl border border-blue-400/25 bg-blue-500/10 p-6">
                <div className="flex items-center gap-2.5 text-blue-200">
                  <Check className="h-5 w-5 text-blue-300 shrink-0" aria-hidden="true" />
                  <h4 className="font-display text-base font-semibold text-white">
                    Message Ready for {PROFILE.name}
                  </h4>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  Thank you, <span className="font-medium text-white">{submittedData.name}</span>.
                  Your message has been prepared. Click below to dispatch it directly via your
                  email application or copy it to your clipboard.
                </p>

                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <a
                    href={buildMailtoHref(submittedData)}
                    className="inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:from-violet-500 hover:to-blue-500"
                  >
                    <Mail className="h-4 w-4" aria-hidden="true" />
                    <span>Open in Email App</span>
                  </a>

                  <button
                    type="button"
                    onClick={() =>
                      void handleCopy(
                        `To: ${PROFILE.email}\nSubject: ${submittedData.subject}\nFrom: ${submittedData.name} (${submittedData.email})\n\n${submittedData.message}`,
                        'message'
                      )
                    }
                    className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-white/15 bg-white/[0.05] px-4 py-2.5 text-sm font-medium text-slate-200 transition-colors hover:bg-white/[0.1] cursor-pointer"
                  >
                    {copiedField === 'message' ? (
                      <>
                        <Check className="h-4 w-4 text-blue-300" aria-hidden="true" />
                        <span>Copied Message</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4" aria-hidden="true" />
                        <span>Copy Message</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => setSubmittedData(null)}
                    className="inline-flex min-h-[44px] items-center px-3 py-2 text-sm font-medium text-slate-300 transition-colors hover:text-white cursor-pointer"
                  >
                    Write Another
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-5">
                {formError && (
                  <div
                    role="alert"
                    className="rounded-xl border border-rose-400/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-200"
                  >
                    {formError}
                  </div>
                )}

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-xs font-medium text-slate-300"
                    >
                      Your Name
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
                      placeholder="Enter your name"
                      className="mt-2 block w-full rounded-xl border border-white/10 bg-[#0A071B]/80 px-4 py-3 text-sm text-white placeholder-slate-500 transition-colors focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/30"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-xs font-medium text-slate-300"
                    >
                      Email Address
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
                      placeholder="you@example.com"
                      className="mt-2 block w-full rounded-xl border border-white/10 bg-[#0A071B]/80 px-4 py-3 text-sm text-white placeholder-slate-500 transition-colors focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/30"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-subject"
                    className="block text-xs font-medium text-slate-300"
                  >
                    Subject
                  </label>
                  <input
                    id="contact-subject"
                    name="subject"
                    type="text"
                    value={form.subject}
                    onChange={(e) => setForm((prev) => ({ ...prev, subject: e.target.value }))}
                    placeholder="Project collaboration, opportunity, or inquiry"
                    className="mt-2 block w-full rounded-xl border border-white/10 bg-[#0A071B]/80 px-4 py-3 text-sm text-white placeholder-slate-500 transition-colors focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/30"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="contact-message"
                      className="block text-xs font-medium text-slate-300"
                    >
                      Message
                    </label>
                    <span className="font-mono text-xs text-slate-500">
                      {form.message.length} chars
                    </span>
                  </div>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    required
                    value={form.message}
                    onChange={(e) => setForm((prev) => ({ ...prev, message: e.target.value }))}
                    placeholder="Write your message for Baby V S..."
                    className="mt-2 block w-full resize-y rounded-xl border border-white/10 bg-[#0A071B]/80 px-4 py-3 text-sm text-white placeholder-slate-500 transition-colors focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/30"
                  />
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
                  <button
                    type="submit"
                    className="inline-flex min-h-[44px] items-center gap-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-950/50 transition-all duration-150 hover:from-violet-500 hover:to-blue-500 active:scale-[0.99] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                  >
                    <Send className="h-4 w-4" aria-hidden="true" />
                    <span>Send Message</span>
                  </button>

                  <a
                    href={PROFILE.mailtoUrl}
                    className="text-xs font-medium text-slate-400 transition-colors hover:text-blue-300"
                  >
                    Or email {PROFILE.email} directly
                  </a>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

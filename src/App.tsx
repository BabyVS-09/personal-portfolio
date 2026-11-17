/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MotionConfig } from 'motion/react';
import { useState } from 'react';
import { AboutEducationSection } from './components/AboutEducationSection';
import { AnimatedBackground } from './components/AnimatedBackground';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import { Navbar } from './components/Navbar';
import { ProjectsSection } from './components/ProjectsSection';
import { ResumeModal } from './components/ResumeModal';
import { GitHubRepo } from './data/profile';

export default function App() {
  const [resumeOpen, setResumeOpen] = useState(false);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative min-h-screen text-slate-100">
        <AnimatedBackground />
        <Navbar onOpenResume={() => setResumeOpen(true)} />

        <main>
          <HeroSection onOpenResume={() => setResumeOpen(true)} />
          <AboutEducationSection />
          <ProjectsSection onReposLoaded={setRepos} />
          <ContactSection />
        </main>

        <Footer />

        <ResumeModal
          open={resumeOpen}
          onClose={() => setResumeOpen(false)}
          repos={repos}
        />
      </div>
    </MotionConfig>
  );
}

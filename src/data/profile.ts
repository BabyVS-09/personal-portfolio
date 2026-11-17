export interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  topics?: string[];
  fork: boolean;
}

export const PROFILE = {
  name: 'Baby V S',
  degree: 'B.E. Computer Science and Design',
  college: 'Atria Institute of Technology, Bengaluru',
  currentYear: '3rd Year',
  graduationYear: '2028',
  location: 'Bengaluru, Karnataka, India',
  email: 'babyvs2006@gmail.com',
  mailtoUrl: 'mailto:babyvs2006@gmail.com',
  mobile: '+91 7676421719',
  telUrl: 'tel:+917676421719',
  githubUrl: 'https://github.com/BabyVS-09',
  githubHandle: 'BabyVS-09',
  linkedinUrl: 'https://www.linkedin.com/in/baby-v-s',
  linkedinHandle: 'in/baby-v-s',
} as const;

export const DISCIPLINE_PILLARS = [
  {
    index: '01',
    title: 'Computer Science Foundations',
    summary:
      'Data structures, algorithms, object-oriented design, database systems, and software engineering principles studied in B.E. Computer Science and Design.',
    topics: 'Algorithms · Data Structures · Software Architecture · Databases',
  },
  {
    index: '02',
    title: 'Human-Centered Design',
    summary:
      'Design thinking, interface hierarchy, visual communication, accessibility standards, and user-centered interaction workflows.',
    topics: 'UI/UX Design · Prototyping · Interaction Flows · Visual Systems',
  },
  {
    index: '03',
    title: 'Web & Interactive Engineering',
    summary:
      'Building responsive, accessible web applications with modern frontend tooling, clean component architecture, and purposeful motion.',
    topics: 'TypeScript · React · Tailwind CSS · Responsive Web Apps',
  },
  {
    index: '04',
    title: 'Version Control & Delivery',
    summary:
      'Structured source management, collaborative Git workflows, modular code organization, and modern cloud deployment.',
    topics: 'Git · GitHub · Vite · Vercel Deployment',
  },
] as const;

export const HERO_VISUAL_URL = '/src/assets/images/hero_csd_abstract_1794909214971.jpg';
export const PROJECTS_VISUAL_URL = '/src/assets/images/project_showcase_visual_1794909215405.jpg';

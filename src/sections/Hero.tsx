import { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, ArrowDown } from 'lucide-react';
import { featuredProjects } from '@/data';

const roles = [
  'Software Engineer',
  'CS Student @ CSUN',
  'Full-Stack Developer',
  'AI Enthusiast',
];

export function Hero() {
  const [currentRole, setCurrentRole] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleScrollToProjects = () => {
    const projectsSection = document.querySelector('#projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToContact = () => {
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="min-h-screen flex flex-col justify-center relative"
    >
      {/* Side label with rotating role - desktop only */}
      <div className="hidden xl:block fixed left-8 top-1/2 -translate-y-1/2 z-10">
        <span className="v-text">{roles[currentRole]} — 2025</span>
      </div>

      <div className="container-custom pt-24 sm:pt-28 lg:pt-32 pb-12 sm:pb-16 lg:pb-20">
        {/* Main Content */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left - Main headline */}
          <div className="lg:col-span-8">
            {/* Live Status */}
            <div className="status-live mb-6 sm:mb-8">
              <span className="status-dot" />
              <span className="label-mono text-[var(--text-secondary)] text-xs sm:text-sm">
                Available for opportunities
              </span>
            </div>

            {/* Large display name with animation */}
            <h1 className="display-text text-fluid-4xl text-[var(--text-primary)] mb-6 sm:mb-8">
              <span className="block animate-slide-up" style={{ animationDelay: '0.1s' }}>Cesar</span>
              <span className="block animate-slide-up" style={{ animationDelay: '0.2s' }}>Salcido</span>
              <span className="block animate-slide-up text-[var(--text-muted)]" style={{ animationDelay: '0.3s' }}>O'Ferra</span>
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg lg:text-xl text-[var(--text-secondary)] max-w-xl leading-relaxed mb-8 sm:mb-12">
              Computer Science student at CSUN with hands-on experience building
              web applications, AI tools, and production infrastructure.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button onClick={handleScrollToProjects} className="btn-primary w-full sm:w-auto justify-center">
                <span>View Projects</span>
                <ArrowDown size={14} className="ml-3" />
              </button>
              <button onClick={handleScrollToContact} className="btn-secondary w-full sm:w-auto justify-center">
                Get in Touch
              </button>
            </div>
          </div>

          {/* Right - Info block - horizontal on mobile */}
          <div className="lg:col-span-4 lg:pt-24 mt-8 lg:mt-0">
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-1 gap-6 sm:gap-8 lg:gap-8">
              {/* Location */}
              <div>
                <p className="label-mono mb-1 sm:mb-2 text-xs">Based in</p>
                <p className="text-[var(--text-primary)] text-sm sm:text-base">Los Angeles, CA</p>
              </div>

              {/* Focus */}
              <div>
                <p className="label-mono mb-1 sm:mb-2 text-xs">Focus</p>
                <p className="text-[var(--text-primary)] text-sm sm:text-base">AI Infrastructure</p>
                <p className="text-[var(--text-secondary)] text-sm">Full-Stack Dev</p>
              </div>

              {/* Current Status */}
              <div>
                <p className="label-mono mb-1 sm:mb-2 text-xs">Status</p>
                <div className="status-live">
                  <span className="status-dot" />
                  <span className="text-[var(--text-primary)] text-sm sm:text-base">Open to work</span>
                </div>
              </div>

              {/* Social */}
              <div>
                <p className="label-mono mb-2 sm:mb-3 text-xs">Connect</p>
                <div className="flex items-center gap-4 sm:gap-5">
                  <a
                    href="https://github.com/CesarSalcido06"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-300 p-1"
                    aria-label="GitHub"
                  >
                    <Github size={18} />
                  </a>
                  <a
                    href="https://linkedin.com/in/cesar-salcido-o-ferra-2994a2218"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-300 p-1"
                    aria-label="LinkedIn"
                  >
                    <Linkedin size={18} />
                  </a>
                  <a
                    href="mailto:contact@cesarsalcido.com"
                    className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-300 p-1"
                    aria-label="Email"
                  >
                    <Mail size={18} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Projects - Horizontal scroll on mobile */}
        <div className="mt-16 sm:mt-24 lg:mt-32">
          <div className="flex items-center justify-between mb-6 sm:mb-8 lg:mb-12">
            <p className="label-mono text-xs sm:text-sm">Selected Work</p>
            <button
              onClick={handleScrollToProjects}
              className="label-mono link-reveal text-[var(--text-secondary)] hover:text-[var(--text-primary)] text-xs sm:text-sm"
            >
              View all projects
            </button>
          </div>

          {/* Mobile: Horizontal scroll, Desktop: Grid */}
          <div className="
            flex gap-4 overflow-x-auto hide-scrollbar -mx-4 px-4
            sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-px sm:bg-[var(--border-subtle)]
          ">
            {featuredProjects.slice(0, 3).map((project, index) => (
              <article
                key={project.id}
                className="
                  flex-shrink-0 w-[260px] sm:w-auto
                  bg-[var(--bg-surface)] sm:bg-[var(--bg-primary)]
                  p-5 sm:p-6 lg:p-8
                  border border-[var(--border-subtle)] sm:border-0
                  rounded-lg sm:rounded-none
                  group cursor-pointer
                  transition-colors duration-300
                  hover:bg-[var(--bg-elevated)]
                "
                onClick={handleScrollToProjects}
                style={{ scrollSnapAlign: 'start' }}
              >
                <span className="project-index block mb-4 sm:mb-6 text-xs">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="text-base sm:text-lg lg:text-xl font-medium text-[var(--text-primary)] mb-2 sm:mb-3 group-hover:text-[var(--accent-warm)] transition-colors duration-300 line-clamp-1">
                  {project.title}
                </h3>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] mb-4 sm:mb-6 line-clamp-2">
                  {project.oneLiner}
                </p>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {project.stack.slice(0, 2).map((tech) => (
                    <span key={tech} className="tag text-xs">
                      {tech}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>

          {/* Mobile hint */}
          <p className="sm:hidden label-mono text-[var(--text-muted)] text-center mt-4 text-xs">
            Swipe to see more
          </p>
        </div>
      </div>

      {/* Scroll Indicator - desktop only */}
      <div className="absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-4">
        <span className="label-mono text-xs">Scroll</span>
        <div className="scroll-indicator" />
      </div>
    </section>
  );
}

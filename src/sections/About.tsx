import { skillCategories, currentFocus } from '@/data';
import { Cpu, Server, Code, Database, GitBranch, Layers } from 'lucide-react';

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'Languages':
      return <Code size={16} />;
    case 'AI/ML':
      return <Cpu size={16} />;
    case 'Infrastructure':
      return <Server size={16} />;
    case 'Frontend':
      return <Layers size={16} />;
    case 'Databases':
      return <Database size={16} />;
    case 'DevOps':
      return <GitBranch size={16} />;
    default:
      return <Code size={16} />;
  }
};

export function About() {
  return (
    <section id="about" className="py-16 sm:py-24 lg:py-32 bg-[var(--bg-surface)]">
      <div className="container-custom">
        {/* Section Header */}
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-12 mb-12 sm:mb-16 lg:mb-20">
          <div className="lg:col-span-4">
            <p className="label-mono text-[var(--accent-warm)] mb-3 sm:mb-4 text-xs sm:text-sm">Profile</p>
            <h2 className="display-text text-fluid-2xl text-[var(--text-primary)]">
              About
            </h2>
          </div>
          <div className="lg:col-span-8 lg:pt-12">
            <p className="text-sm sm:text-base lg:text-lg text-[var(--text-secondary)] leading-relaxed mb-4 sm:mb-6 lg:mb-8">
              I'm a{' '}
              <span className="text-[var(--text-primary)]">Computer Science student at CSUN</span>{' '}
              passionate about building software that works. Currently doing{' '}
              <span className="text-[var(--text-primary)]">freelance web development</span>,
              where I develop and maintain production web applications and server infrastructure for clients.
            </p>
            <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
              My technical interests include{' '}
              <span className="text-[var(--text-primary)]">full-stack development</span> (React,
              Firebase, Node.js),{' '}
              <span className="text-[var(--text-primary)]">AI tools and automation</span> (building
              local AI assistants and workflow automation), and{' '}
              <span className="text-[var(--text-primary)]">DevOps</span> (VPS management, CI/CD,
              server administration).
            </p>
          </div>
        </div>

        {/* Two column layout */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24">
          {/* Left - Current Focus */}
          <div>
            <p className="label-mono mb-6 sm:mb-8 text-xs sm:text-sm">Current Focus</p>
            <ul className="space-y-4 sm:space-y-6">
              {currentFocus.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-3 sm:gap-4 text-[var(--text-secondary)] group"
                >
                  <span className="text-base sm:text-lg font-mono text-[var(--text-muted)] group-hover:text-[var(--accent-warm)] transition-colors">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <span className="text-sm sm:text-base lg:text-lg pt-0.5 sm:pt-1">{item}</span>
                </li>
              ))}
            </ul>

            {/* Currently Working On */}
            <div className="mt-10 sm:mt-16 pt-6 sm:pt-8 border-t border-[var(--border-subtle)]">
              <div className="status-live mb-3 sm:mb-4">
                <span className="status-dot" />
                <span className="label-mono text-[var(--text-secondary)] text-xs sm:text-sm">Currently building</span>
              </div>
              <p className="text-sm sm:text-base lg:text-lg text-[var(--text-primary)] animate-fade-in">
                BenchAI — a local AI engineering assistant with 88+ tool integrations
              </p>
            </div>

            {/* Philosophy */}
            <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-[var(--border-subtle)]">
              <p className="text-sm sm:text-base lg:text-lg italic text-[var(--text-secondary)] leading-relaxed">
                "Ship working software. Document like someone else will maintain it.
                Debug at the protocol level. Build systems, not just features."
              </p>
            </div>
          </div>

          {/* Right - Skills Grid */}
          <div>
            <p className="label-mono mb-6 sm:mb-8 text-xs sm:text-sm">Technologies</p>
            <div className="grid gap-3 sm:gap-px sm:bg-[var(--border-subtle)]">
              {skillCategories.map((category) => (
                <div
                  key={category.category}
                  className="bg-[var(--bg-primary)] sm:bg-[var(--bg-surface)] p-4 sm:p-6 group hover:bg-[var(--bg-elevated)] transition-colors duration-300 border border-[var(--border-subtle)] sm:border-0 rounded-lg sm:rounded-none"
                >
                  <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                    <span className="text-[var(--text-muted)] group-hover:text-[var(--accent-warm)] transition-colors">
                      {getCategoryIcon(category.category)}
                    </span>
                    <span className="label-mono text-[var(--text-primary)] text-xs sm:text-sm">
                      {category.category}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {category.skills.map((skill) => (
                      <span key={skill} className="tag text-xs">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

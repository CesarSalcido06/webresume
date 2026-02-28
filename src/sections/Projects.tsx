import { useState, useMemo } from 'react';
import { projects } from '@/data';
import { ExternalLink, Github, FileText, Play, ArrowUpRight } from 'lucide-react';

const filters = [
  { label: 'All', value: 'all' },
  { label: 'AI', value: 'ai' },
  { label: 'Infrastructure', value: 'infrastructure' },
  { label: 'Full Stack', value: 'fullstack' },
];

const getLinkIcon = (type: string) => {
  switch (type) {
    case 'github':
      return <Github size={12} />;
    case 'live':
    case 'demo':
      return <Play size={12} />;
    case 'docs':
      return <FileText size={12} />;
    default:
      return <ExternalLink size={12} />;
  }
};

export function Projects() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [expandedProject, setExpandedProject] = useState<string | null>(null);

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'all') return projects;
    return projects.filter((project) =>
      project.tags.includes(activeFilter)
    );
  }, [activeFilter]);

  return (
    <section id="projects" className="py-16 sm:py-24 lg:py-32">
      <div className="container-custom">
        {/* Section Header */}
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-12 mb-10 sm:mb-16">
          <div className="lg:col-span-4">
            <p className="label-mono text-[var(--accent-warm)] mb-3 sm:mb-4 text-xs sm:text-sm">Portfolio</p>
            <h2 className="display-text text-fluid-2xl text-[var(--text-primary)]">
              Projects
            </h2>
          </div>
          <div className="lg:col-span-8 lg:pt-12">
            <p className="text-sm sm:text-base lg:text-lg text-[var(--text-secondary)] max-w-2xl">
              Production-grade systems built from scratch. Each project demonstrates
              systems thinking, engineering rigor, and full-stack depth.
            </p>
          </div>
        </div>

        {/* Filters - Horizontal scroll on mobile */}
        <div className="flex gap-2 sm:gap-3 mb-10 sm:mb-16 overflow-x-auto hide-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap">
          {filters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => setActiveFilter(filter.value)}
              className={`label-mono px-4 sm:px-5 py-2.5 sm:py-3 transition-all duration-300 whitespace-nowrap flex-shrink-0 text-xs sm:text-sm ${
                activeFilter === filter.value
                  ? 'bg-[var(--off-white)] text-[var(--black)]'
                  : 'bg-transparent border border-[var(--border-default)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--text-primary)]'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid sm:grid-cols-2 gap-4 sm:gap-px sm:bg-[var(--border-subtle)]">
          {filteredProjects.map((project, index) => (
            <article
              key={project.id}
              className="bg-[var(--bg-surface)] sm:bg-[var(--bg-primary)] p-5 sm:p-6 lg:p-8 xl:p-12 group border border-[var(--border-subtle)] sm:border-0 rounded-lg sm:rounded-none"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4 sm:mb-6">
                <span className="project-index text-xs">
                  {String(index + 1).padStart(2, '0')}
                </span>
                {project.featured && (
                  <span className="label-mono text-[var(--accent-warm)] text-xs">
                    Featured
                  </span>
                )}
              </div>

              {/* Title & Meta */}
              <h3 className="text-lg sm:text-xl lg:text-2xl font-medium text-[var(--text-primary)] mb-1.5 sm:mb-2 group-hover:text-[var(--accent-warm)] transition-colors duration-300">
                {project.title}
              </h3>
              <p className="text-xs sm:text-sm text-[var(--text-muted)] mb-4 sm:mb-6">
                {project.role} — {project.date.start}
                {project.date.end && ` to ${project.date.end}`}
              </p>

              <p className="text-sm sm:text-base text-[var(--text-secondary)] mb-6 sm:mb-8 leading-relaxed">
                {project.oneLiner}
              </p>

              {/* Metrics */}
              {project.outcome.metrics && (
                <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8 py-4 sm:py-6 border-y border-[var(--border-subtle)]">
                  {project.outcome.metrics.map((metric) => (
                    <div key={metric.label}>
                      <p className="text-base sm:text-lg lg:text-xl font-medium text-[var(--text-primary)]">
                        {metric.value}
                      </p>
                      <p className="label-mono mt-1 text-xs">{metric.label}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Stack */}
              <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-6 sm:mb-8">
                {project.stack.slice(0, 5).map((tech) => (
                  <span key={tech} className="tag text-xs">
                    {tech}
                  </span>
                ))}
                {project.stack.length > 5 && (
                  <span className="tag text-xs">+{project.stack.length - 5}</span>
                )}
              </div>

              {/* Expand/Collapse */}
              <button
                onClick={() =>
                  setExpandedProject(
                    expandedProject === project.id ? null : project.id
                  )
                }
                className="label-mono link-reveal text-[var(--text-secondary)] hover:text-[var(--text-primary)] mb-4 sm:mb-6 text-xs sm:text-sm"
              >
                {expandedProject === project.id ? 'Show less' : 'Read more'}
              </button>

              {/* Expanded Content */}
              {expandedProject === project.id && (
                <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-[var(--border-subtle)]">
                  {project.description.split('\n\n').map((paragraph, idx) => (
                    <p key={idx} className="text-sm sm:text-base text-[var(--text-secondary)] mb-3 sm:mb-4 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                  {project.details && (
                    <ul className="mt-4 sm:mt-6 space-y-2 sm:space-y-3">
                      {project.details.map((detail, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2 sm:gap-3 text-xs sm:text-sm text-[var(--text-secondary)]"
                        >
                          <span className="text-[var(--text-muted)] mt-0.5 flex-shrink-0">—</span>
                          {detail}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}

              {/* Links */}
              {project.links && (
                <div className="flex flex-wrap gap-3 sm:gap-4 mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-[var(--border-subtle)]">
                  {project.links.map((link) => (
                    <a
                      key={link.url}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 label-mono text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors text-xs sm:text-sm"
                    >
                      {getLinkIcon(link.type)}
                      {link.label}
                      <ArrowUpRight size={10} />
                    </a>
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

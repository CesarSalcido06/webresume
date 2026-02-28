import { useRef, useEffect, useState, useCallback } from 'react';
import { experiences } from '@/data';
import { Briefcase, Users, GraduationCap, Calendar, MapPin } from 'lucide-react';

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'work':
      return <Briefcase size={14} />;
    case 'leadership':
      return <Users size={14} />;
    case 'education':
      return <GraduationCap size={14} />;
    default:
      return <Briefcase size={14} />;
  }
};

export function Experience() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [position, setPosition] = useState(0);
  const animationRef = useRef<number | null>(null);

  const animate = useCallback(() => {
    if (!isPaused) {
      setPosition((prev) => {
        const itemWidth = 420; // Card width + gap
        const totalWidth = experiences.length * itemWidth;

        let newPos = prev - 0.6; // Scroll speed

        // Reset for seamless loop
        if (Math.abs(newPos) >= totalWidth) {
          newPos = 0;
        }

        return newPos;
      });
    }
    animationRef.current = requestAnimationFrame(animate);
  }, [isPaused]);

  useEffect(() => {
    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [animate]);

  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  // Duplicate experiences for seamless loop
  const duplicatedExperiences = [...experiences, ...experiences];

  return (
    <section
      id="experience"
      className="relative py-16 sm:py-24 lg:py-32 overflow-hidden bg-[var(--bg-surface)]"
    >
      {/* Section Header */}
      <div className="container-custom mb-10 sm:mb-14">
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-12">
          <div className="lg:col-span-4">
            <p className="label-mono text-[var(--accent-warm)] mb-3 sm:mb-4 text-xs sm:text-sm">Career</p>
            <h2 className="display-text text-fluid-2xl text-[var(--text-primary)]">
              Experience
            </h2>
          </div>
          <div className="lg:col-span-8 lg:pt-12">
            <p className="text-sm sm:text-base lg:text-lg text-[var(--text-secondary)] max-w-2xl">
              A track record of building reliable systems, leading teams, and delivering
              results across diverse technical environments.
            </p>
          </div>
        </div>
      </div>

      {/* Carousel Container */}
      <div
        className="relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Gradient Masks */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 lg:w-32 bg-gradient-to-r from-[var(--bg-surface)] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 lg:w-32 bg-gradient-to-l from-[var(--bg-surface)] to-transparent z-10 pointer-events-none" />

        {/* Carousel Track */}
        <div
          className="overflow-hidden py-4"
          style={{ cursor: isPaused ? 'grab' : 'default' }}
        >
          <div
            ref={trackRef}
            className="flex gap-4 sm:gap-6 pl-4 sm:pl-8"
            style={{
              transform: `translateX(${position}px)`,
              willChange: 'transform',
            }}
          >
            {duplicatedExperiences.map((exp, index) => (
              <div
                key={`${exp.id}-${index}`}
                className="flex-shrink-0 w-[320px] sm:w-[380px] lg:w-[400px]"
              >
                <div className="experience-card h-full p-5 sm:p-6 bg-[var(--bg-primary)] border border-[var(--border-subtle)] hover:border-[var(--accent-warm)] transition-all duration-300">
                  {/* Card Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-[var(--text-primary)] font-medium text-base sm:text-lg mb-1 leading-tight">
                        {exp.title}
                      </h3>
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-[var(--accent-warm)] font-medium">{exp.company}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 text-[var(--accent-warm)]">
                      {getTypeIcon(exp.type)}
                      <span className="label-mono capitalize text-xs">{exp.type}</span>
                    </div>
                  </div>

                  {/* Meta Info */}
                  <div className="flex flex-wrap items-center gap-3 mb-4 text-xs sm:text-sm text-[var(--text-muted)]">
                    <div className="flex items-center gap-1.5">
                      <Calendar size={13} />
                      <span>{exp.date.start} — {exp.date.end || 'Present'}</span>
                      {!exp.date.end && <span className="status-dot ml-1" />}
                    </div>
                    {exp.location && (
                      <div className="flex items-center gap-1.5">
                        <MapPin size={13} />
                        <span className="truncate max-w-[150px]">{exp.location}</span>
                      </div>
                    )}
                  </div>

                  {/* Highlights */}
                  <ul className="space-y-2 mb-4">
                    {exp.highlights.slice(0, 3).map((item, i) => (
                      <li key={i} className="text-[var(--text-secondary)] text-xs sm:text-sm leading-relaxed flex items-start gap-2">
                        <span className="text-[var(--accent-warm)] mt-1.5 flex-shrink-0">—</span>
                        <span className="line-clamp-2">{item}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Tags based on type */}
                  <div className="flex flex-wrap gap-1.5 pt-4 border-t border-[var(--border-subtle)]">
                    {exp.type === 'work' && (
                      <>
                        <span className="tag text-xs">Professional</span>
                        <span className="tag text-xs">Industry</span>
                      </>
                    )}
                    {exp.type === 'leadership' && (
                      <>
                        <span className="tag text-xs">Leadership</span>
                        <span className="tag text-xs">Team Lead</span>
                      </>
                    )}
                    {exp.type === 'education' && (
                      <>
                        <span className="tag text-xs">Academic</span>
                        <span className="tag text-xs">CS Degree</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Hover Indicator */}
        <div
          className={`text-center mt-6 transition-opacity duration-300 ${isPaused ? 'opacity-100' : 'opacity-0'}`}
        >
          <span className="text-xs sm:text-sm text-[var(--text-muted)]">Scroll paused — hover to explore</span>
        </div>
      </div>

    </section>
  );
}

import { useState } from 'react';
import { Github, Linkedin, Mail, ArrowUpRight } from 'lucide-react';
import { ContactModal } from '@/components/ContactModal';

export function Contact() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <section id="contact" className="py-16 sm:py-24 lg:py-32 bg-[var(--bg-surface)]">
        <div className="container-custom">
          {/* Section Header */}
          <div className="grid lg:grid-cols-12 gap-6 lg:gap-12 mb-10 sm:mb-16 lg:mb-20">
            <div className="lg:col-span-4">
              <p className="label-mono text-[var(--accent-warm)] mb-3 sm:mb-4 text-xs sm:text-sm">Contact</p>
              <h2 className="display-text text-fluid-2xl text-[var(--text-primary)]">
                Get in Touch
              </h2>
            </div>
            <div className="lg:col-span-8 lg:pt-12">
              <p className="text-sm sm:text-base lg:text-lg text-[var(--text-secondary)] max-w-2xl">
                I'm always interested in discussing new projects, opportunities,
                or collaborating on interesting problems.
              </p>
            </div>
          </div>

          {/* Contact Grid */}
          <div className="grid sm:grid-cols-3 gap-3 sm:gap-px sm:bg-[var(--border-subtle)] mb-10 sm:mb-16 lg:mb-20">
            {/* Email - Opens Modal */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-[var(--bg-primary)] sm:bg-[var(--bg-surface)] p-5 sm:p-6 lg:p-8 group hover:bg-[var(--bg-elevated)] transition-colors duration-300 border border-[var(--border-subtle)] sm:border-0 rounded-lg sm:rounded-none text-left"
            >
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <Mail size={18} className="text-[var(--text-muted)] group-hover:text-[var(--accent-warm)] transition-colors" />
                <ArrowUpRight size={14} className="text-[var(--text-muted)] opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <p className="label-mono mb-1.5 sm:mb-2 text-xs">Email</p>
              <p className="text-sm sm:text-base text-[var(--text-primary)] group-hover:text-[var(--accent-warm)] transition-colors truncate">
                contact@cesarsalcido.com
              </p>
            </button>

            {/* GitHub */}
            <a
              href="https://github.com/CesarSalcido06"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[var(--bg-primary)] sm:bg-[var(--bg-surface)] p-5 sm:p-6 lg:p-8 group hover:bg-[var(--bg-elevated)] transition-colors duration-300 border border-[var(--border-subtle)] sm:border-0 rounded-lg sm:rounded-none"
            >
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <Github size={18} className="text-[var(--text-muted)] group-hover:text-[var(--accent-warm)] transition-colors" />
                <ArrowUpRight size={14} className="text-[var(--text-muted)] opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <p className="label-mono mb-1.5 sm:mb-2 text-xs">GitHub</p>
              <p className="text-sm sm:text-base text-[var(--text-primary)] group-hover:text-[var(--accent-warm)] transition-colors">
                @CesarSalcido06
              </p>
            </a>

            {/* LinkedIn */}
            <a
              href="https://linkedin.com/in/cesar-salcido-o-ferra-2994a2218"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[var(--bg-primary)] sm:bg-[var(--bg-surface)] p-5 sm:p-6 lg:p-8 group hover:bg-[var(--bg-elevated)] transition-colors duration-300 border border-[var(--border-subtle)] sm:border-0 rounded-lg sm:rounded-none"
            >
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <Linkedin size={18} className="text-[var(--text-muted)] group-hover:text-[var(--accent-warm)] transition-colors" />
                <ArrowUpRight size={14} className="text-[var(--text-muted)] opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <p className="label-mono mb-1.5 sm:mb-2 text-xs">LinkedIn</p>
              <p className="text-sm sm:text-base text-[var(--text-primary)] group-hover:text-[var(--accent-warm)] transition-colors">
                Cesar Salcido O'Ferra
              </p>
            </a>
          </div>

          {/* CTA Block */}
          <div className="text-center py-10 sm:py-16 border-t border-[var(--border-subtle)]">
            <p className="label-mono mb-4 sm:mb-6 text-xs sm:text-sm">Open to Opportunities</p>
            <p className="text-sm sm:text-base text-[var(--text-secondary)] max-w-xl mx-auto mb-8 sm:mb-10 px-4 sm:px-0">
              Looking for internships and entry-level software engineering roles
              where I can contribute to meaningful projects and grow as a developer.
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="btn-primary inline-flex w-full sm:w-auto justify-center"
            >
              <span>Send me a message</span>
              <ArrowUpRight size={14} className="ml-3" />
            </button>
          </div>
        </div>
      </section>

      {/* Contact Modal */}
      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}

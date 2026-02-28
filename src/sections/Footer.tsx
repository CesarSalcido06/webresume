import { navItems } from '@/data';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 bg-[var(--bg-primary)] border-t border-[var(--border-subtle)]">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Copyright */}
          <p className="label-mono text-[var(--text-muted)]">
            &copy; {currentYear} CSO'F
          </p>

          {/* Navigation */}
          <nav className="flex flex-wrap justify-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="label-mono link-reveal text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Credit */}
          <p className="label-mono text-[var(--text-muted)]">
            Los Angeles, CA
          </p>
        </div>
      </div>
    </footer>
  );
}

import type { SkillCategory } from '@/types';

export const skillCategories: SkillCategory[] = [
  {
    category: 'Languages',
    skills: ['Python', 'TypeScript', 'JavaScript', 'SQL', 'C/C++', 'Bash'],
  },
  {
    category: 'AI/ML',
    skills: ['LLM Orchestration', 'RAG Pipelines', 'Vector Databases', 'Embeddings', 'FastAPI', 'PyTorch', 'CUDA'],
  },
  {
    category: 'Infrastructure',
    skills: ['Docker', 'Linux', 'nginx', 'WireGuard', 'Cloudflare', 'systemd', 'VPS Administration'],
  },
  {
    category: 'Frontend',
    skills: ['React', 'Vite', 'Tailwind CSS', 'shadcn/ui', 'Astro', 'MDX'],
  },
  {
    category: 'Databases',
    skills: ['SQLite', 'ChromaDB', 'Firebase', 'PostgreSQL', 'Redis'],
  },
  {
    category: 'DevOps',
    skills: ['CI/CD', 'Git', 'GitHub Actions', 'Plesk', 'SSL/TLS', 'DNS Management'],
  },
];

export const currentFocus = [
  'Building local AI tools and assistants',
  'Web development with React and modern frameworks',
  'Server infrastructure and DevOps automation',
  'Learning systems programming and low-level concepts',
];

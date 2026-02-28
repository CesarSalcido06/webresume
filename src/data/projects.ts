import type { Project } from '@/types';

export const projects: Project[] = [
  {
    id: 'benchai',
    title: 'BenchAI',
    slug: 'benchai',
    featured: true,
    date: {
      start: '2024',
      end: 'Present',
    },
    role: 'Creator',
    organization: 'Personal Project',
    oneLiner: 'Local AI engineering assistant with 88+ tools, multi-agent coordination, and persistent memory.',
    outcome: {
      summary: 'Self-hosted AI orchestration platform running on RTX 3060, featuring multi-model routing and A2A protocol integration.',
      metrics: [
        { label: 'Tools', value: '88+' },
        { label: 'Models', value: '6' },
        { label: 'Agents', value: '3' },
      ],
    },
    stack: ['Python', 'FastAPI', 'SQLite', 'ChromaDB', 'llama.cpp', 'Ollama'],
    tags: ['ai', 'infrastructure'],
    links: [
      { label: 'GitHub', url: 'https://github.com/CesarSalcido06/benchai', type: 'github' },
    ],
    description: `A complete local AI orchestration platform running on Pop!_OS with RTX 3060 (12GB VRAM).

Features multi-model routing between 6 specialized models, A2A protocol integration with MarunochiAI and DottscavisAI, semantic task routing, and bidirectional learning sync between agents.

Includes persistent memory with SQLite FTS5 full-text search, RAG pipeline with Qdrant vector database, SearXNG web search integration, and Piper TTS for text-to-speech. OpenAI-compatible API for drop-in replacement.`,
    details: [
      'Multi-agent coordination via A2A Protocol',
      'Semantic routing to specialized agents',
      'Request caching for 100x faster responses',
      'Streaming SSE responses',
      'OpenAI-compatible API',
    ],
  },
  {
    id: 'project-alpine',
    title: 'Project Alpine',
    slug: 'project-alpine',
    featured: true,
    date: {
      start: '2025',
      end: 'Present',
    },
    role: 'Creator',
    organization: 'Personal Project',
    oneLiner: 'Dark-themed task manager for students balancing academics and athletics.',
    outcome: {
      summary: 'Full-stack productivity app with goal tracking, gamification, and multi-user support. Live demo available.',
      metrics: [
        { label: 'Status', value: 'Live' },
        { label: 'Users', value: 'Multi-user' },
      ],
    },
    stack: ['Next.js', 'React', 'TypeScript', 'Chakra UI', 'Express', 'SQLite', 'Docker'],
    tags: ['fullstack'],
    links: [
      { label: 'GitHub', url: 'https://github.com/CesarSalcido06/projectAlpine', type: 'github' },
      { label: 'Demo', url: 'https://alpine.cesarsalcido.xyz', type: 'demo' },
    ],
    description: `A minimal, dark-themed task management system built for students juggling coursework, assignments, practice schedules, and competitions. Track your tasks, see your trends, stay on top of your game.

Features urgency-based prioritization (Low/Medium/High/Critical), custom tags and categories, calendar views (day/week/month), and analytics with completion rate tracking. Built with Next.js 14+ App Router, Chakra UI dark theme, Express backend, and SQLite with Sequelize ORM.

Deployed with Docker for easy self-hosting. Demo mode available for trying features without signup.`,
    details: [
      'Urgency levels with color-coded indicators',
      'Calendar views (day/week/month)',
      'Tag-based analytics and trends',
      'Multi-user support with auth',
      'Docker deployment ready',
    ],
  },
  {
    id: 'alpfa-crm',
    title: 'ALPFA CRM',
    slug: 'alpfa-crm',
    featured: true,
    date: {
      start: '2024',
      end: '2025',
    },
    role: 'Lead Developer',
    organization: 'ALPFA CSUN',
    oneLiner: 'Member management system with attendance tracking, kiosk mode, and semester archiving.',
    outcome: {
      summary: 'Production CRM serving 200+ ALPFA CSUN members with real-time attendance tracking.',
      metrics: [
        { label: 'Members', value: '200+' },
        { label: 'Status', value: 'Live' },
      ],
    },
    stack: ['React', 'Vite', 'Firebase', 'Tailwind CSS'],
    tags: ['fullstack'],
    links: [
      { label: 'GitHub', url: 'https://github.com/CesarSalcido06/ALPFA-CRM', type: 'github' },
      { label: 'Live', url: 'https://csunalpfa.org/crm', type: 'live' },
    ],
    description: `Full-stack CRM built for ALPFA (Association of Latino Professionals For America) at CSUN.

Features member CRUD with Firebase authentication, attendance tracking with streak calculation, kiosk mode for self-check-in at events, CSV import with duplicate detection, and semester archiving with ZIP download.

Live at csunalpfa.org/crm and actively used by the organization.`,
    details: [
      'Firebase Auth + Firestore',
      'Attendance streaks and analytics',
      'Kiosk mode for event check-in',
      'CSV import/export',
      'Semester archiving system',
    ],
  },
  {
    id: 'marunochiAI',
    title: 'MarunochiAI',
    slug: 'marunochi-ai',
    featured: true,
    date: {
      start: '2024',
      end: 'Present',
    },
    role: 'Creator',
    organization: 'Personal Project',
    oneLiner: 'Local-first coding assistant running on M4 Pro with intelligent dual-model routing.',
    outcome: {
      summary: 'Fast, private AI coding assistant achieving 27.6 tok/s with Qwen2.5-Coder (88.4% HumanEval).',
      metrics: [
        { label: 'Speed', value: '27.6 t/s' },
        { label: 'HumanEval', value: '88.4%' },
        { label: 'Latency', value: '0.23s' },
      ],
    },
    stack: ['Python', 'FastAPI', 'Ollama', 'SQLite', 'Qwen2.5-Coder'],
    tags: ['ai', 'infrastructure'],
    links: [
      { label: 'GitHub', url: 'https://github.com/CesarSalcido06/MarunochiAI', type: 'github' },
    ],
    description: `Local-first AI coding assistant optimized for M4 Pro MacBook. Features intelligent dual-model routing (7B for speed, 14B for quality) and full multi-agent integration with BenchAI.

v0.4.0 includes observability with correlation IDs and metrics, circuit breakers with retry logic, local SQLite persistence, and network-aware agent discovery for multi-machine setups.

100% local execution with zero data leaving your machine. Runs on ~$3/month electricity vs $20+/month cloud APIs.`,
    details: [
      'Dual-model auto-routing (7B/14B)',
      'Full A2A Protocol v0.3 integration',
      'Circuit breakers and graceful degradation',
      'Multi-machine network discovery',
      '100% local, zero cloud dependencies',
    ],
  },
  {
    id: 'alpfa-website',
    title: 'ALPFA CSUN Website',
    slug: 'alpfa-website',
    featured: false,
    date: {
      start: '2024',
      end: '2025',
    },
    role: 'Lead Developer',
    organization: 'ALPFA CSUN',
    oneLiner: 'Official chapter website with Stripe payments, Firebase auth, and newsletter integration.',
    outcome: {
      summary: 'Redesigned and rebuilt the official ALPFA CSUN website from scratch.',
    },
    stack: ['HTML', 'CSS', 'JavaScript', 'Firebase', 'Stripe'],
    tags: ['fullstack'],
    links: [
      { label: 'GitHub', url: 'https://github.com/CesarSalcido06/ALPFA-Website', type: 'github' },
    ],
    description: `Complete redesign and rebuild of the ALPFA CSUN chapter website. Features member registration, Stripe payment integration for dues and events, Firebase authentication, and newsletter signup.

Built with a focus on mobile responsiveness and accessibility for all members.`,
    details: [
      'Stripe payment integration',
      'Firebase authentication',
      'Newsletter signup system',
      'Mobile-first design',
    ],
  },
  {
    id: 'freelance-website',
    title: 'Freelance Client Website',
    slug: 'freelance-website',
    featured: false,
    date: {
      start: '2024',
      end: 'Present',
    },
    role: 'Freelance Web Developer',
    organization: 'Freelance',
    oneLiner: 'Professional business website with secure VPS hosting and automated CI/CD.',
    outcome: {
      summary: 'Client website with 99.99% uptime and automated deployment pipeline.',
      metrics: [
        { label: 'Uptime', value: '99.99%' },
      ],
    },
    stack: ['HTML5', 'CSS3', 'JavaScript', 'Plesk', 'Linux'],
    tags: ['fullstack', 'infrastructure'],
    links: [],
    description: `Professional website for a Los Angeles-based consulting firm.

Engineered secure Plesk-hosted VPS environment with DNS configuration, automated SSL/TLS certificate renewals, and CI/CD pipeline. Achieved 99.99% uptime and halved release cycle time through automation.`,
    details: [
      'Plesk VPS administration',
      'Automated SSL/TLS renewals',
      'CI/CD pipeline setup',
      'DNS configuration',
    ],
  },
  {
    id: 'dottscavisai',
    title: 'DottscavisAI',
    slug: 'dottscavisai',
    featured: false,
    date: {
      start: '2024',
      end: 'Present',
    },
    role: 'Creator',
    organization: 'Personal Project',
    oneLiner: 'Creative AI agent for vision, image generation, and text-to-speech.',
    outcome: {
      summary: 'Specialized creative agent in the BenchAI multi-agent system running on M1 Pro Mac.',
    },
    stack: ['Python', 'FastAPI', 'Stable Diffusion', 'Whisper'],
    tags: ['ai'],
    links: [
      { label: 'GitHub', url: 'https://github.com/CesarSalcido06/dottscavisai', type: 'github' },
    ],
    description: `Creative AI agent designed for the BenchAI multi-agent system. Handles vision tasks, image generation, and text-to-speech on M1 Pro Mac.

Integrates with BenchAI via A2A protocol for seamless task routing when creative capabilities are needed.`,
    details: [
      'Vision/image understanding',
      'Image generation',
      'Text-to-speech',
      'A2A protocol integration',
    ],
  },
  {
    id: 'homelab',
    title: 'Homelab Infrastructure',
    slug: 'homelab',
    featured: false,
    date: {
      start: '2023',
      end: 'Present',
    },
    role: 'Infrastructure Engineer',
    organization: 'Personal Project',
    oneLiner: 'Self-hosted cloud with VPN-routed containers and zero-trust access.',
    outcome: {
      summary: 'Complete self-hosted infrastructure with 12+ Docker containers and 99.9% uptime.',
      metrics: [
        { label: 'Containers', value: '12+' },
        { label: 'Uptime', value: '99.9%' },
      ],
    },
    stack: ['Docker', 'WireGuard', 'nginx', 'Cloudflare', 'Linux'],
    tags: ['infrastructure'],
    links: [],
    description: `Enterprise-level container orchestration for a home network. Orchestrates 12+ Docker containers with compose, routes traffic via Gluetun (WireGuard/AirVPN), and uses nginx-proxy-manager for auto SSL.

Features VPN-routed services, Cloudflare proxy for DDoS protection, and Twingate for zero-trust remote access. Services include Jellyfin, *arr stack, qBittorrent, and Glance dashboard.`,
    details: [
      'VPN routing via Gluetun',
      'Reverse proxy with auto SSL',
      'Zero-trust access via Twingate',
      'Complete media automation',
    ],
  },
];

export const featuredProjects = projects.filter(p => p.featured);

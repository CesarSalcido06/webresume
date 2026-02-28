// Project types
export interface Project {
  id: string;
  title: string;
  slug: string;
  featured: boolean;
  date: {
    start: string;
    end?: string;
  };
  role: string;
  organization?: string;
  oneLiner: string;
  outcome: {
    summary: string;
    metrics?: Array<{
      label: string;
      value: string;
    }>;
  };
  stack: string[];
  tags: string[];
  links?: Array<{
    label: string;
    url: string;
    type: 'github' | 'live' | 'docs' | 'demo';
  }>;
  description: string;
  details?: string[];
}

// Experience types
export interface Experience {
  id: string;
  title: string;
  company: string;
  location?: string;
  date: {
    start: string;
    end?: string;
  };
  type: 'work' | 'leadership' | 'education';
  highlights: string[];
}

// Skill types
export interface SkillCategory {
  category: string;
  skills: string[];
}

// Navigation types
export interface NavItem {
  label: string;
  href: string;
}

// Social links
export interface SocialLink {
  label: string;
  url: string;
  icon: string;
}

import type { Experience } from '@/types';

export const experiences: Experience[] = [
  {
    id: 'alpfa-vp-swe',
    title: 'VP of Software Engineering',
    company: 'ALPFA CSUN',
    location: 'California State University, Northridge',
    date: {
      start: 'Jan 2025',
      end: undefined,
    },
    type: 'leadership',
    highlights: [
      'Led cross-functional team (UI/UX designer + developer) to architect and build responsive website from scratch',
      'Stack: HTML, CSS, JavaScript, React, Firebase authentication & data storage, Stripe payments',
      'Established agile workflows, code review standards, and CI/CD pipelines',
      'Streamlined deployments and accelerated feature delivery for 200+ active members',
    ],
  },
  {
    id: 'freelance',
    title: 'Freelance Web Developer',
    company: 'Self-Employed',
    location: 'Los Angeles, CA',
    date: {
      start: 'Nov 2024',
      end: undefined,
    },
    type: 'work',
    highlights: [
      'Developed client websites using HTML5, CSS3, and JavaScript',
      'Engineered and maintained secure Plesk-hosted VPS environments with DNS configuration',
      'Automated SSL/TLS certificate renewals and implemented CI/CD pipelines',
      'Achieved 99.99% uptime and halved release cycle time through automation',
      'Automated client data workflows with advanced Excel models',
    ],
  },
  {
    id: 'alpfa-vp-it',
    title: 'VP of IT',
    company: 'ALPFA CSUN',
    location: 'California State University, Northridge',
    date: {
      start: 'Aug 2024',
      end: 'Dec 2024',
    },
    type: 'leadership',
    highlights: [
      'Configured custom domain and managed website features, payment processing, and newsletters',
      'Provisioned and secured G Suite accounts with password policies and email troubleshooting',
      'Automated CSV-driven email campaigns with Python pandas script, cutting manual outreach by 80%',
      'Enhanced member engagement through improved digital infrastructure',
    ],
  },
  {
    id: 'woodcraft',
    title: 'STEM Coach',
    company: 'Woodcraft Rangers',
    location: 'Canoga Park, CA',
    date: {
      start: 'May 2024',
      end: 'Jul 2024',
    },
    type: 'work',
    highlights: [
      'Designed and implemented two daily interactive STEM modules for 1st-5th graders (up to 30 students)',
      'Fostered curiosity and hands-on learning in science, technology, engineering, and math',
      'Managed attendance rosters and authored detailed behavior and incident reports',
      'Ensured accurate records and a safe, supportive classroom environment',
    ],
  },
  {
    id: 'bestbuy',
    title: 'Advanced Repair Agent',
    company: 'Best Buy',
    location: 'Northridge, CA',
    date: {
      start: 'Jun 2022',
      end: undefined,
    },
    type: 'work',
    highlights: [
      'Conducted end-to-end hardware/software diagnostics and system imaging',
      'Applied encryption, patch management, and malware remediation for device uptime and data protection',
      'Supervised front desk consultation: device check-in, ticket assignment, and SLA compliance',
      'Cut turnaround time by 20% while maintaining clear client communication',
    ],
  },
  {
    id: 'csun',
    title: 'B.S. Computer Science',
    company: 'California State University, Northridge',
    location: 'Northridge, CA',
    date: {
      start: '2024',
      end: 'May 2027 (Expected)',
    },
    type: 'education',
    highlights: [
      'Focus on systems programming and software engineering',
      'Relevant coursework: Data Structures, Algorithms, Operating Systems, Database Systems',
      'Active member of ALPFA (Association of Latino Professionals For America)',
      'Led technical initiatives as VP of Software Engineering',
    ],
  },
  {
    id: 'moorpark',
    title: 'A.S. Computer Science (Transfer)',
    company: 'Moorpark College',
    location: 'Moorpark, CA',
    date: {
      start: '2022',
      end: 'May 2024',
    },
    type: 'education',
    highlights: [
      "Dean's List recipient",
      'Completed AS-T degree for transfer to CSU system',
      'Foundation in programming, mathematics, and computer science principles',
    ],
  },
];

export const workExperience = experiences.filter(e => e.type === 'work');
export const leadershipExperience = experiences.filter(e => e.type === 'leadership');
export const educationExperience = experiences.filter(e => e.type === 'education');

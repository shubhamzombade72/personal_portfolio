import { Project, SkillCategory, Experience, Certification } from './types';
import {
  Code2,
  Smartphone,
  Layout,
  Database,
  GitBranch,
  Figma,
  Terminal
} from 'lucide-react';
import React from 'react';

export const USER_INFO = {
  name: "Alex Dev",
  title: "Full Stack & Mobile Developer",
  shortIntro: "I build accessible, pixel-perfect, and performant web and mobile experiences.",
  email: "alex.dev@example.com",
  phone: "+1 (555) 123-4567",
  location: "San Francisco, CA",
  socials: {
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
    instagram: "https://instagram.com"
  },
  resumeLink: "/Shubham_Zombade_Resume.pdf"
};

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'E-Commerce Dashboard',
    category: 'Web',
    description: 'A comprehensive analytics dashboard for online retailers.',
    fullDescription: 'This project is a high-performance admin dashboard tailored for e-commerce businesses. It allows shop owners to visualize sales data, manage inventory, and track customer engagement in real-time.',
    problem: 'Shop owners needed a centralized hub to view fragmented data from multiple sales channels (Shopify, Amazon, Woo) which was causing inventory mishaps.',
    solution: 'I built a unified dashboard that aggregates API data from multiple sources into a single React application using Recharts for visualization.',
    role: 'Lead Frontend Developer',
    techStack: ['React', 'TypeScript', 'Tailwind', 'Recharts', 'Node.js'],
    thumbnailUrl: 'https://picsum.photos/id/1/800/600',
    screenshotUrls: ['https://picsum.photos/id/119/800/600', 'https://picsum.photos/id/20/800/600'],
    liveLink: 'https://example.com',
    githubLink: 'https://github.com',
    views: 120
  },
  {
    id: '2',
    title: 'Fitness Tracker App',
    category: 'Mobile',
    description: 'Cross-platform mobile app for tracking workouts and nutrition.',
    fullDescription: 'A Flutter-based mobile application that helps users track their daily caloric intake and workout routines. It features social sharing and progress graphs.',
    problem: 'Existing apps were too complex or required expensive subscriptions. Users wanted a simple, offline-first approach.',
    solution: 'Developed a local-first architecture using SQLite and Flutter, ensuring the app works perfectly without internet, syncing only when requested.',
    role: 'Mobile Developer (Flutter)',
    techStack: ['Flutter', 'Dart', 'Firebase', 'SQLite'],
    thumbnailUrl: 'https://picsum.photos/id/76/800/600',
    screenshotUrls: ['https://picsum.photos/id/96/400/800', 'https://picsum.photos/id/35/400/800'],
    liveLink: 'https://play.google.com',
    githubLink: 'https://github.com',
    views: 85
  },
  {
    id: '3',
    title: 'Travel Booking Platform',
    category: 'Web',
    description: 'A modern booking engine for boutique hotels.',
    fullDescription: 'A bespoke booking platform designed for luxury boutique hotels. It handles availability checking, payment processing via Stripe, and automated email confirmations.',
    problem: 'The client was using a legacy WordPress plugin that was slow and insecure.',
    solution: 'Migrated to a Next.js frontend with a Supabase backend, improving load times by 400% and securing customer data.',
    role: 'Full Stack Developer',
    techStack: ['Next.js', 'Supabase', 'Stripe', 'Vercel'],
    thumbnailUrl: 'https://picsum.photos/id/48/800/600',
    screenshotUrls: ['https://picsum.photos/id/55/800/600'],
    liveLink: 'https://example.com',
    githubLink: 'https://github.com',
    views: 200
  },
  {
    id: '4',
    title: 'Chat Messenger',
    category: 'Mobile',
    description: 'Real-time messaging app with end-to-end encryption.',
    fullDescription: 'A secure messaging application focused on privacy. It uses Signal Protocol for encryption and WebSockets for low-latency communication.',
    problem: 'Concerns about privacy in mainstream apps drove the need for a secure alternative for the client\'s internal team.',
    solution: 'Implemented end-to-end encryption and ephemeral messages that auto-delete after 24 hours.',
    role: 'Mobile Developer',
    techStack: ['React Native', 'WebSockets', 'Node.js', 'Redis'],
    thumbnailUrl: 'https://picsum.photos/id/60/800/600',
    screenshotUrls: ['https://picsum.photos/id/2/400/800'],
    githubLink: 'https://github.com',
    views: 45
  },
  {
    id: '5',
    title: 'Automated Deployment CLI',
    category: 'Software',
    description: 'A command-line tool for automating infrastructure deployment.',
    fullDescription: 'A robust CLI tool built for DevOps teams to streamline the deployment of microservices to AWS. It features interactive prompts, configuration validation, and automatic rollback capabilities.',
    problem: 'Manual deployments were error-prone and time-consuming, leading to downtime during release cycles.',
    solution: 'Created a Node.js-based CLI that wraps complex AWS CDK commands into simple interactions, reducing deployment time by 60%.',
    role: 'Backend Engineer',
    techStack: ['Node.js', 'TypeScript', 'AWS SDK', 'Docker', 'Inquirer.js'],
    thumbnailUrl: 'https://picsum.photos/id/133/800/600',
    screenshotUrls: ['https://picsum.photos/id/133/800/600'],
    githubLink: 'https://github.com',
    views: 90
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Languages",
    skills: [
      { id: 'l1', name: "TypeScript", category: "Languages" },
      { id: 'l2', name: "JavaScript (ES6+)", category: "Languages" },
      { id: 'l3', name: "Dart", category: "Languages" },
      { id: 'l4', name: "Python", category: "Languages" },
      { id: 'l5', name: "HTML5", category: "Languages" },
      { id: 'l6', name: "CSS3", category: "Languages" },
      { id: 'l7', name: "SQL", category: "Languages" }
    ]
  },
  {
    title: "Frameworks & Libraries",
    skills: [
      { id: 'f1', name: "React", category: "Frameworks & Libraries" },
      { id: 'f2', name: "Next.js", category: "Frameworks & Libraries" },
      { id: 'f3', name: "Flutter", category: "Frameworks & Libraries" },
      { id: 'f4', name: "Tailwind CSS", category: "Frameworks & Libraries" },
      { id: 'f5', name: "Node.js", category: "Frameworks & Libraries" },
      { id: 'f6', name: "Express", category: "Frameworks & Libraries" },
      { id: 'f7', name: "Django", category: "Frameworks & Libraries" }
    ]
  },
  {
    title: "Tools & DevOps",
    skills: [
      { id: 't1', name: "Git", category: "Tools & DevOps" },
      { id: 't2', name: "Docker", category: "Tools & DevOps" },
      { id: 't3', name: "AWS", category: "Tools & DevOps" },
      { id: 't4', name: "Firebase", category: "Tools & DevOps" },
      { id: 't5', name: "Figma", category: "Tools & DevOps" },
      { id: 't6', name: "VS Code", category: "Tools & DevOps" },
      { id: 't7', name: "Postman", category: "Tools & DevOps" }
    ]
  },
  {
    title: "Soft Skills",
    skills: [
      { id: 's1', name: "Technical Leadership", category: "Soft Skills" },
      { id: 's2', name: "Agile/Scrum", category: "Soft Skills" },
      { id: 's3', name: "Problem Solving", category: "Soft Skills" },
      { id: 's4', name: "Remote Collaboration", category: "Soft Skills" },
      { id: 's5', name: "Mentorship", category: "Soft Skills" }
    ]
  }
];

export const EXPERIENCES: Experience[] = [
  {
    id: '1',
    role: 'Senior Frontend Engineer',
    company: 'Tech Corp Inc.',
    period: '2022 - Present',
    description: 'Leading the frontend team in rebuilding the legacy dashboard using React and TypeScript. Improved performance by 40%.'
  },
  {
    id: '2',
    role: 'Freelance Web Developer',
    company: 'Self Employed',
    period: '2020 - 2022',
    description: 'Delivered 15+ websites for small businesses using WordPress and custom HTML/CSS stacks.'
  },
  {
    id: '3',
    role: 'Junior Developer',
    company: 'StartUp Hub',
    period: '2019 - 2020',
    description: 'Collaborated with senior developers to implement UI components and fix bugs in the core product.'
  }
];

export const CERTIFICATIONS: Certification[] = [
  {
    id: '1',
    name: 'AWS Certified Solutions Architect',
    issuer: 'Amazon Web Services',
    year: '2023',
    link: '#'
  },
  {
    id: '2',
    name: 'Meta Front-End Developer',
    issuer: 'Coursera',
    year: '2022',
    link: '#'
  }
];
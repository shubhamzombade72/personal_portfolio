import React from 'react';

export type ProjectCategory = 'Web' | 'Mobile' | 'Software' | 'All';

export interface Project {
  id: string;
  title: string;
  category: 'Web' | 'Mobile' | 'Software';
  description: string;
  fullDescription: string;
  problem: string;
  solution: string;
  role: string;
  techStack: string[];
  thumbnailUrl: string;
  screenshotUrls: string[];
  liveLink?: string;
  githubLink?: string;
  views?: number;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  icon?: string;
  level?: number;
}

export interface SkillCategory {
  title: string;
  skills: Skill[];
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  year: string;
  link?: string;
}

export interface Message {
  id: string;
  name: string;
  email: string;
  message: string;
  date: string;
  read: boolean;
}
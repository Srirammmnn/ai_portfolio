export interface Social {
  github: string;
  linkedin: string;
  instagram: string;
  email: string;
  phone: string;
  website: string;
}

export interface Profile {
  name: string;
  shortName: string;
  tagline: string;
  role: string;
  specialization: string;
  location: string;
  yearsOfExperience: string;
  bio: string;
  avatarSvg: string;
  social: Social;
}

export interface SkillCategory {
  name: string;
  items: string[];
}

export interface Skills {
  categories: SkillCategory[];
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  location: string;
  summary: string;
  highlights: string[];
  metrics?: { label: string; value: string }[];
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  stack: string[];
  role: string;
  year: string;
  link: string;
  image: string;
  highlight: boolean;
  metrics?: string[];
  architecture?: string[];
  challenges?: string[];
}

export interface Education {
  degree: string;
  institution: string;
  period: string;
  detail: string;
  image?: string;
  courses?: string[];
}

export interface Certification {
  title: string;
  issuer: string;
  year: string;
  url?: string;
}

export interface Language {
  name: string;
  proficiency: string;
}

export interface StatItem {
  value: string;
  label: string;
  description: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  avatarColor: string;
}

export interface PortfolioData {
  profile: Profile;
  stats: StatItem[];
  skills: Skills;
  experience: Experience[];
  projects: Project[];
  certifications: Certification[];
  education: Education[];
  languages: Language[];
  interests: string[];
  testimonials: Testimonial[];
}

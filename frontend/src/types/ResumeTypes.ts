export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  linkedin: string;
  summary: string;
}

export interface Education {
  id: string;
  qualification: string;
  institution: string;
  percentage: string;
  yearOfPassing: string;
  branch?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  role: string;
  technologies: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  description: string;
  duration: string;
  technologies: string;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  education: Education[];
  experience: Experience[];
  skills: string[];
  projects: Project[];
}
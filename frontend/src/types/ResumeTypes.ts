export interface Education {
  degree: string;
  college: string;
  year: string;
}

export interface Experience {
  role: string;
  company: string;
  points: string[];
}

export interface ResumeData {
  name: string;
  email: string;
  phone: string;
  education: Education[];
  experience: Experience[];
  skills: string[];
}

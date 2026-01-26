
export interface Project {
  id: string;
  title: string;
  description: string;
  githubUrl: string;
  imageUrl: string;
  techStack: string[];
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  imageUrl: string;
  link: string;
}

export interface PortfolioData {
  name: string;
  title: string;
  bio: string;
  profilePic: string;
  githubUsername: string;
  leetcodeUsername: string;
  ambitions: string;
  email: string;
  linkedin: string;
  projects: Project[];
  certificates: Certificate[];
  skills: string[];
}

export interface StatItem {
  label: string;
  value: string;
  icon: string;
}

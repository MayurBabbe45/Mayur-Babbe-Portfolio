/**
 * Mayur Babbe Portfolio TypeScript Definitions
 */

export interface ProjectCaseStudy {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  tags: string[];
  duration: string;
  role: string;
  problem: string;
  solution: string;
  impact: string[];
  architecture: string[];
  codeSnippet?: {
    language: string;
    filename: string;
    code: string;
  };
  metrics: { label: string; value: string }[];
  features?: string[];
  installationSteps?: string[];
  setupSteps?: string[];
  howToUseSteps?: string[];
  requirements?: string[];
  example?: {
    input: string;
    refined: string;
  };
  liveLink?: string;
  githubLink?: string;
}

export interface SkillCategory {
  title: string;
  icon: string;
  skills: { name: string; level: number }[];
}

export interface PromptInput {
  recruiterGoal: string;
  companyName: string;
  interviewType: string;
  tone: string;
  customDetails: string;
}

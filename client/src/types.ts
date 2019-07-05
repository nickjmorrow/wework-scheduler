import { useThemeContext } from "@nickjmorrow/react-component-library";

export interface Chore {
	choreId: number;
	name: string;
	description: string;
}

export interface Experience {
  experienceId: number;
  name: string;
  experienceDetails: ExperienceDetail[];
  technologies: Technology[];
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  roleName: string;
}

export interface Project {
  projectId: number;
  name: string;
  tagline: string;
  githubUrl: string;
  demoUrl: string;
  projectDetails: ProjectDetail[];
  technologies: Technology[];
  orderId: number;
}

export interface Setting {
  settingId: string;
  value: string;
}

export interface Technology {
  technologyId: number;
  name: string;
  experiences: Experience[];
  skillLevel: SkillLevel;
  version: string;
  technologyType: TechnologyType;
}

export interface TechnologyType {
	technologyTypeId: number;
	name: string;
}

export interface ExperienceDetail {
  experienceDetailId: number;
  experience: Experience;
  description: string;
}

export interface ProjectDetail {
  projectDetailId: number;
  project: Project;
  description: string;
}

export interface SkillLevel {
  skillLevelId: number;
  description: string;
  technology: Technology;
}

export type Theme = ReturnType<typeof useThemeContext>;
import {
	Project as ProjectModel,
	ProjectDetail as ProjectDetailModel
} from "./src/components/projects";
import { Technology as TechnologyModel } from "./src/components/technologies/models/Technology";
import { Experience as ExperienceModel } from "./src/components/experiences/models/Experience";
import { ExperienceDetail as ExperienceDetailModel } from "./src/components/experiences/models/ExperienceDetail";
import { Setting as SettingModel } from "./src/components/settings";

export const myNumber = 6;

export type Project = typeof ProjectModel;
export type Technology = typeof TechnologyModel;
export type Experience = typeof ExperienceModel;
export type ExperienceDetail = typeof ExperienceDetailModel;
export type ProjectDetail = typeof ProjectDetailModel;
export type Setting = typeof SettingModel;

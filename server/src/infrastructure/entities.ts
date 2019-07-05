import { Setting } from '../components/settings/models/Setting';
import { Experience } from '../components/experiences/models/Experience';
import { ExperienceDetail } from '../components/experiences/models/ExperienceDetail';
import { Technology } from '../components/technologies/models/Technology';
import { Project, ProjectDetail } from '../components/projects/models';
import { SkillLevel } from '../components/technologies/SkillLevel';
import { TechnologyType } from '../components/technologies/TechnologyType';
import { Chore, Laborer, Assignment } from 'components';

export const entities = [
	Experience,
	ExperienceDetail,
	Technology,
	Project,
	ProjectDetail,
	Setting,
	SkillLevel,
	TechnologyType,
	Chore,
	Laborer,
	Assignment,
];

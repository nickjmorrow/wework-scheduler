import { mergeTypes } from 'merge-graphql-schemas';
import { experienceTypeDefs } from '../experiences/experienceTypeDefs';
import { experienceDetailTypeDefs } from '../experiences/experienceDetailTypeDefs';
import { technologyTypeDefs } from '../technologies/technologyTypeDefs';
import { projectTypeDefs, projectDetailTypeDefs, projectTechnologyTypeDefs } from '../projects';
import { settingTypeDefs } from '../settings/settingTypeDefs';
import { skillLevelTypeDefs } from '../technologies/skillLevelTypeDefs';
import { technologyTypeTypeDefs } from '../technologies/technologyTypeTypeDefs';
import { choreTypeDefs, laborerTypeDefs, assignmentTypeDefs } from 'components';


export const typeDefs = mergeTypes([
	projectTypeDefs,
	projectTechnologyTypeDefs,
	technologyTypeDefs,
	experienceTypeDefs,
	experienceDetailTypeDefs,
	projectDetailTypeDefs,
	settingTypeDefs,
	skillLevelTypeDefs,
	technologyTypeTypeDefs,
	choreTypeDefs,
	laborerTypeDefs,
	assignmentTypeDefs
]);

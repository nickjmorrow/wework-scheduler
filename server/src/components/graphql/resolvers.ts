import { experienceResolver } from '../experiences/experienceResolver';
import { projectResolver } from '../projects/projectResolver';
import { settingResolver } from '../settings/settingResolver';
import { technologyResolver } from '../technologies/technologyResolver';
import { choreResolver, laborerResolver, assignmentResolver } from 'components';

export const resolvers = [
	projectResolver,
	experienceResolver,
	technologyResolver,
	settingResolver,
	choreResolver,
	laborerResolver,
	assignmentResolver,
];

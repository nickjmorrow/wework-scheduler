import { getConnection } from 'typeorm';
import { Project } from './models';

export const projectService = {
	getProjects: async () => {
		return await getConnection().manager.find(Project, {
			relations: ['projectDetails', 'technologies', 'technologies.skillLevel'],
		});
	},
};

import { projectService } from './projectService';

export const projectResolver = {
	Query: {
		async projects(_: any, args: any, ctx: any) {
			return await projectService.getProjects();
		},
	},
};

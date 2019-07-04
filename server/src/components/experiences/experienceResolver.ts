import { experienceService } from './experienceService';

export const experienceResolver = {
	Query: {
		async experiences(_: any, args: any, ctx: any) {
			return await experienceService.getExperiences();
		},
	},
};

import { choreService } from './choreService';

export const choreResolver = {
	Query: {
		async chores(_: any, args: any, ctx: any) {
			return await choreService.getChores();
		},
	},
};

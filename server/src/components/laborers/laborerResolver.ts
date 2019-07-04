import { laborerService } from './laborerService';

export const laborerResolver = {
	Query: {
		async laborers(_: any, args: any, ctx: any) {
			return await laborerService.getLaborers();
		},
	},
};

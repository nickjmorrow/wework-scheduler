import { laborerService } from './laborerService';
import { Laborer } from './Laborer';
import { isAuthorized } from '~/utilities/isAuthorized';

export const laborerResolver = {
	Query: {
		async laborers(_: any, args: any, ctx: any) {
			return await laborerService.getLaborers();
		},
	},
	Mutation: {
		async addLaborer(_: any, args: Laborer, ctx: any) {
			if (!isAuthorized(ctx)) {
				return;
			}
			return laborerService.addLaborer(args);
		},
		async removeLaborer(_: any, args: { laborerId: number }, ctx: any) {
			if (!isAuthorized(ctx)) {
				return;
			}
			return laborerService.removeLaborer(args.laborerId);
		},
		async updateLaborer(_: any, args: Laborer, ctx: any) {
			if (!isAuthorized(ctx)) {
				return;
			}
			return laborerService.updateLaborer(args);
		},
	},
};

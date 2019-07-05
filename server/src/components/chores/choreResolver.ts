import { Chore } from './Chore';
import { choreService } from './choreService';
import { isAuthorized } from '~/utilities/isAuthorized';

export const choreResolver = {
	Query: {
		async chores(_: any, args: any, ctx: any) {
			return await choreService.getChores();
		},
	},
	Mutation: {
		async addChore(_: any, args: Chore, ctx: any) {
			if (!isAuthorized(ctx)) {
				return;
			}
			return choreService.addChore(new Chore(args));
		},
		async removeChore(_: any, args: { choreId: number }, ctx: any) {
			if (!isAuthorized(ctx)) {
				return;
			}
			return choreService.removeChore(args.choreId);
		},
		async updateChore(_: any, args: Chore, ctx: any) {
			if (!isAuthorized(ctx)) {
				return;
			}
			return choreService.updateChore(args);
		},
	},
};

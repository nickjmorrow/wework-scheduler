import { Chore } from './Chore';
import { choreService } from './choreService';

export const choreResolver = {
	Query: {
		async chores(_: any, args: any, ctx: any) {
			console.log(ctx);
			console.log(_);
			return await choreService.getChores();
		},
	},
	Mutation: {
		async addChore(_: any, args: Chore, ctx: any) {
			return choreService.addChore(new Chore(args));
		},
		async removeChore(_: any, args: { choreId: number }, ctx: any) {
			return choreService.removeChore(args.choreId);
		},
		async updateChore(_: any, args: Chore, ctx: any) {
			console.log(args);
			return choreService.updateChore(args);
		}
	}
};

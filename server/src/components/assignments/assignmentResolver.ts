import { assignmentService } from './assignmentService';
import { isAuthorized } from '~/utilities/isAuthorized';

export const assignmentResolver = {
	Query: {
		async assignments(_: any, args: any, ctx: any) {
			return await assignmentService.getAssignments();
		},
	},
	Mutation: {
		async generateAssignments(_: any, args: any, ctx: any) {
			if (!isAuthorized(ctx)) {
				return;
			}

			await assignmentService.generateAssignments();
			return true;
		},
	},
};

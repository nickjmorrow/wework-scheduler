import { isAuthorized } from '~/utilities/isAuthorized';
import { Assignment, assignmentService } from 'components/assignments';

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
		async updateAssignment(_: any, args: Assignment, ctx: any) {
			if (!isAuthorized(ctx)) {
				return;
			}
			return assignmentService.updateAssignment(args);
		},
	},
};

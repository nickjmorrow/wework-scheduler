import { assignmentService } from 'components/assignments';
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
			await assignmentService.persistGeneratedAssignments();
			return true;
		},
		async updateAssignment(_: any, args: { assignmentId: number; laborerId: number }, ctx: any) {
			if (!isAuthorized(ctx)) {
				return;
			}
			const { assignmentId, laborerId } = args;
			const currentAssignment = await assignmentService.getAssignment(assignmentId);
			currentAssignment.laborer.laborerId = laborerId;
			return assignmentService.updateAssignment(currentAssignment);
		},
	},
};

import { assignmentService } from './assignmentService';

export const assignmentResolver = {
	Query: {
		async assignments(_: any, args: any, ctx: any) {
			return await assignmentService.getAssignments();
		},
	},
};

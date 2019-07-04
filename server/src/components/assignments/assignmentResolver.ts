import { assignmentService } from './assignmentService';

export const assignmentResolver = {
	Query: {
		async laborers(_: any, args: any, ctx: any) {
			return await assignmentService.getAssignments();
		},
	},
};

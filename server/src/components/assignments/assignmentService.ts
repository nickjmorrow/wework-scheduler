import { getConnection } from 'typeorm';
import { Assignment } from './Assignment';

export const assignmentService = {
	getAssignments: async () => {
		return await getConnection().manager.find(Assignment, {
			relations: ['laborer', 'chore']
		});
	},
};

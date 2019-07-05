import { getConnection } from 'typeorm';
import { Assignment } from './Assignment';
import { assignmentGenerator } from './assignmentGenerator';


export const assignmentService = {
	getAssignments: async () => {
		const currentDate = new Date();
		const oneWeekAgo = new Date(currentDate.setDate(currentDate.getDate() - 7));
		console.log(oneWeekAgo);
		return (await getConnection().manager.find(Assignment, {
			relations: ['laborer', 'chore']
		})).filter(a => a.chore.dateDeleted === null && a.laborer.dateDeleted === null && new Date(a.assignmentDate).getTime() >= oneWeekAgo.getTime());
	},
	addAssignment: async (assignment: Assignment) => {
		return await getConnection().manager.save(Assignment, assignment);
	},
	generateAssignments: async () => {
		const newAssignments = await assignmentGenerator.generateAssignments();
		await getConnection().manager.save(Assignment, newAssignments);
		return true;
	}
};

import { getConnection, Connection } from 'typeorm';
import { Assignment } from './Assignment';
import { assignmentGenerator } from './assignmentGenerator';
import { isDateEqual } from '~/utilities/isDateEqual';

const getAssignments = async (connection?: Connection) => {
	const currentDate = new Date();
	const oneWeekAgo = new Date(currentDate.setDate(currentDate.getDate() - 7));

	if (!connection) {
		connection = getConnection();
	}

	console.log(connection.entityMetadatas);
	return (await connection.manager.find(Assignment, {
		relations: ['laborer', 'chore'],
	})).filter(
		a =>
			a.chore.dateDeleted === null &&
			a.laborer.dateDeleted === null &&
			new Date(a.assignmentDate).getTime() >= oneWeekAgo.getTime(),
	);
};

export const assignmentService = {
	getAssignments,
	addAssignment: async (assignment: Assignment) => {
		return await getConnection().manager.save(Assignment, assignment);
	},
	generateAssignments: async () => {
		const newAssignments = await assignmentGenerator.generateAssignments();
		await getConnection().manager.save(Assignment, newAssignments);
		return true;
	},
	getTodaysAssignments: async (connection: Connection): Promise<Assignment[]> => {
		const today = new Date();
		const assignments = await assignmentService.getAssignments(connection);
		return assignments.filter(a => isDateEqual(a.assignmentDate, today));
	},
	getOrCreateFutureAssignments: async (): Promise<Assignment[]> => {
		await assignmentGenerator.generateAssignments();
		const today = new Date();
		const assignments = await getAssignments();
		console.log(assignments);
		return assignments.filter(a => {
			let assignmentDate = new Date(a.assignmentDate);
			return assignmentDate >= today;
		});
	},
};

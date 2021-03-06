import { getConnection } from 'typeorm';
import { isDateEqual } from '~/utilities/isDateEqual';
import { Assignment } from './Assignment';
import { assignmentGenerator } from './assignmentGenerator';

const getAssignments = async () => {
	const currentDate = new Date();
	const threeDaysAgo = new Date(currentDate.setDate(currentDate.getDate() - 3));

	return (await getConnection().manager.find(Assignment, {
		relations: ['laborer', 'chore'],
	})).filter(
		a =>
			a.chore.dateDeleted === null &&
			a.laborer.dateDeleted === null &&
			new Date(a.assignmentDate).getTime() >= threeDaysAgo.getTime(),
	);
};

const getAssignment = async (assignmentId: number) => {
	return await getConnection().manager.findOneOrFail(Assignment, assignmentId, {
		relations: ['laborer', 'chore'],
	});
};

export const assignmentService = {
	getAssignments,
	getAssignment,
	addAssignment: async (assignment: Assignment) => {
		return await getConnection().manager.save(Assignment, assignment);
	},
	persistGeneratedAssignments: async () => {
		const newAssignments = await assignmentGenerator.generateAssignments();
		if (newAssignments.length === 0) {
			return true;
		}

		await getConnection().manager.insert(Assignment, newAssignments);
		return true;
	},
	getTodaysUnsentAssignments: async (): Promise<Assignment[]> => {
		const today = new Date();
		const assignments = await getAssignments();
		return assignments.filter(a => isDateEqual(a.assignmentDate, today) && !a.isEmailSent);
	},
	getOrCreateFutureAssignments: async (): Promise<Assignment[]> => {
		const generatedAssignments = await assignmentGenerator.generateAssignments();
		await Promise.all(generatedAssignments.map(a => assignmentService.addAssignment(a)));
		const today = new Date();
		const assignments = await getAssignments();

		return assignments.filter(a => {
			let assignmentDate = new Date(a.assignmentDate);
			return assignmentDate >= today;
		});
	},
	updateAssignment: async (assignment: Assignment): Promise<Assignment> => {
		return await getConnection().manager.save(assignment);
	},
};

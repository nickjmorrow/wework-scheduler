import { Assignment, Laborer, laborerService } from 'components';
import { NUM_DAYS_IN_WEEK, WEEKS_RANGE } from '~/constants';
import { isDateEqual } from '~/utilities/isDateEqual';
import { choreService } from '../chores';
import { settingsProvider } from '../settings';
import { assignmentService } from './assignmentService';

export const getWeeksRange = async () => parseInt((await settingsProvider.getDatabaseSetting(WEEKS_RANGE)).value, 10);

export const assignmentGenerator = {
	generateAssignments: async () => {
		const allLaborers = await laborerService.getLaborers();
		const chores = await choreService.getChores();
		const assignments = await assignmentService.getAssignments();
		const endDate = await getEndDate();

		const newAssignments: Assignment[] = [];
		const lastLaborerId = assignments[assignments.length - 1].laborer.laborerId;
		let laborerPool = allLaborers.filter(l => l.laborerId > lastLaborerId);

		for (
			let currentDate = new Date();
			currentDate <= endDate;
			currentDate.setUTCDate(currentDate.getUTCDate() + 1)
		) {
			const currentDayOfWeek = currentDate.getUTCDay();
			if (currentDayOfWeek === 0 || currentDayOfWeek === 6) {
				continue;
			}
			const choresHappeningOnDay = chores.filter(c => c.dayOfWeekId === currentDayOfWeek);
			const unassignedChores = choresHappeningOnDay.filter(
				c =>
					!assignments.some(a => a.chore.choreId === c.choreId && isDateEqual(a.assignmentDate, currentDate)),
			);

			unassignedChores.forEach(uc => {
				if (laborerPool.length === 0) {
					laborerPool = [...allLaborers];
				}
				const randomLaborer = laborerPool.shift()!;

				const assignment = new Assignment({ laborer: randomLaborer, chore: uc, assignmentDate: currentDate });
				newAssignments.push(assignment);
			});
		}

		return newAssignments;
	},
	getWeeksRange,
};

const getEndDate = async () => {
	const endDate = new Date();
	endDate.setUTCDate(new Date().getUTCDate() + NUM_DAYS_IN_WEEK * (await assignmentGenerator.getWeeksRange()));
	return endDate;
};

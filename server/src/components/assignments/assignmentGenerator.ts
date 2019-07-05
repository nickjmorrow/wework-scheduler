import { laborerService, Assignment, Laborer } from 'components';
import { choreService } from '../chores';
import { assignmentService } from './assignmentService';
import { NUM_DAYS_IN_WEEK, WEEKS_RANGE } from '~/constants';
import { isDateEqual } from '~/utilities/isDateEqual';
import { settingsProvider } from '../settings';

export const assignmentGenerator = {
	generateAssignments: async () => {
		const allLaborers = await laborerService.getLaborers();
		const chores = await choreService.getChores();
		const assignments = await assignmentService.getAssignments();
		const endDate = await getEndDate();

		const newAssignments: Assignment[] = [];
		let laborerPool: Laborer[] = [...allLaborers];

		for (let currentDate = new Date(); currentDate <= endDate; currentDate.setDate(currentDate.getDate() + 1)) {
			const currentDayOfWeek = currentDate.getDay();
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
				const randomIndex = Math.floor(Math.random() * laborerPool.length);
				const randomLaborer = laborerPool[randomIndex];
				laborerPool = [
					...laborerPool.slice(0, randomIndex),
					...laborerPool.slice(randomIndex + 1, laborerPool.length),
				];

				const assignment = new Assignment({ laborer: randomLaborer, chore: uc, assignmentDate: currentDate });
				newAssignments.push(assignment);
			});
		}

		return newAssignments;
	},
};

const getWeeksRange = async () => parseInt((await settingsProvider.getDatabaseSetting(WEEKS_RANGE)).value, 10);

const getEndDate = async () => {
	const endDate = new Date();
	endDate.setDate(new Date().getDate() + NUM_DAYS_IN_WEEK * (await getWeeksRange()));
	return endDate;
};

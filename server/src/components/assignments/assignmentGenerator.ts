import { Assignment } from '~/components/assignments/Assignment';
// Intra
import { assignmentService } from '~/components/assignments/assignmentService';
import { Laborer, laborerService } from '~/components/laborers';
import { settingsProvider } from '~/components/settings';
import { DayOfWeek, NUM_DAYS_IN_WEEK, WEEKS_RANGE } from '~/constants';
import { isDateEqual } from '~/utilities/isDateEqual';
import { choreService } from '../chores';

export const getWeeksRange = async () => parseInt((await settingsProvider.getDatabaseSetting(WEEKS_RANGE)).value, 10);

export const assignmentGenerator = {
	generateAssignments: async () => {
		const allLaborers = (await laborerService.getLaborers()).sort((a, b) => (a.laborerId > b.laborerId ? 1 : -1));
		const chores = await choreService.getChores();
		const assignments = await assignmentService.getAssignments();
		const endDate = await getEndDate();
		const newAssignments: Assignment[] = [];
		let laborerPool: Laborer[] = [];

		if (assignments.length === 0) {
			laborerPool = [...allLaborers];
		} else {
			const lastLaborerId = assignments.sort((a, b) => (a.assignmentDate > b.assignmentDate ? 1 : -1))[
				assignments.length - 1
			].laborer.laborerId;
			laborerPool = [...allLaborers.filter(l => l.laborerId > lastLaborerId)];
		}

		for (
			let currentDate = new Date();
			currentDate <= endDate;
			currentDate.setUTCDate(currentDate.getUTCDate() + 1)
		) {
			const currentDayOfWeek = currentDate.getUTCDay();

			if (currentDayOfWeek === DayOfWeek.Saturday || currentDayOfWeek === DayOfWeek.Sunday) {
				// TODO: Should throw here instead of continuing.
				continue;
			}

			const choresHappeningOnDay = chores.filter(c => c.dayOfWeekId === currentDayOfWeek);

			const unassignedChores = choresHappeningOnDay
				.filter(
					c =>
						!assignments.some(
							a => a.chore.choreId === c.choreId && isDateEqual(a.assignmentDate, currentDate),
						),
				)
				.sort((a, b) => (a.choreId > b.choreId ? 1 : -1));

			unassignedChores.forEach(uc => {
				if (laborerPool.length === 0) {
					laborerPool = [...allLaborers];
				}
				const randomLaborer = laborerPool.shift()!;

				const assignment = new Assignment({ laborer: randomLaborer, chore: uc, assignmentDate: currentDate });

				newAssignments.push(assignment);
			});
		}

		console.log(newAssignments);
		return newAssignments;
	},
	getWeeksRange,
};

const getEndDate = async () => {
	const endDate = new Date();

	endDate.setUTCDate(new Date().getUTCDate() + NUM_DAYS_IN_WEEK * (await assignmentGenerator.getWeeksRange()));

	return endDate;
};

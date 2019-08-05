import { Assignment, Chore, choreService, laborerService } from 'components';
import 'module-alias/register';
import sinon from 'sinon';
import { DayOfWeek } from '~/constants';
import { Laborer } from '../laborers';
import { assignmentGenerator } from './assignmentGenerator';
import { assignmentService } from './assignmentService';

const makeLaborer = (laborerId: number) => ({
	laborerId,
	name: `Laborer ${laborerId}`,
	email: '',
	dateDeleted: undefined,
	assignments: [],
});

const laborers: Laborer[] = [1, 2, 3, 4, 5, 6, 7].map(makeLaborer);

const makeChore = (choreId: number, dayOfWeek: DayOfWeek) => ({
	choreId,
	name: `Chore ${choreId}`,
	description: '',
	dateDeleted: undefined,
	dayOfWeekId: dayOfWeek,
	assignments: [],
});

const expectedAssignments = [
	{ choreId: 2, laborerId: 4, assignmentMonth: 6, assignmentDate: 24 },
	{ choreId: 1, laborerId: 5, assignmentMonth: 6, assignmentDate: 29 },
	{ choreId: 2, laborerId: 6, assignmentMonth: 6, assignmentDate: 31 },
	{ choreId: 3, laborerId: 7, assignmentMonth: 7, assignmentDate: 2 },
	{ choreId: 1, laborerId: 1, assignmentMonth: 7, assignmentDate: 5 },
	{ choreId: 2, laborerId: 2, assignmentMonth: 7, assignmentDate: 7 },
	{ choreId: 3, laborerId: 3, assignmentMonth: 7, assignmentDate: 9 },
	{ choreId: 1, laborerId: 4, assignmentMonth: 7, assignmentDate: 12 },
	{ choreId: 2, laborerId: 5, assignmentMonth: 7, assignmentDate: 14 },
	{ choreId: 3, laborerId: 6, assignmentMonth: 7, assignmentDate: 16 },
];

const chores: Chore[] = [
	{ choreId: 1, dayOfWeek: DayOfWeek.Monday },
	{ choreId: 2, dayOfWeek: DayOfWeek.Wednesday },
	{ choreId: 3, dayOfWeek: DayOfWeek.Friday },
].map(c => makeChore(c.choreId, c.dayOfWeek));

const assignments: Assignment[] = [
	{
		assignmentId: 1,
		laborer: laborers.find(l => l.laborerId === 1)!,
		chore: chores.find(c => c.choreId === 1)!,
		isEmailSent: false,
		assignmentDate: new Date(2019, 6, 22),
	},
	{
		assignmentId: 2,
		laborer: laborers.find(l => l.laborerId === 3)!,
		chore: chores.find(c => c.choreId === 3)!,
		isEmailSent: false,
		assignmentDate: new Date(2019, 6, 26),
	},
];

describe('assignment generator', () => {
	it('works', async () => {
		laborerService.getLaborers = () => {
			return Promise.resolve(laborers);
		};
		choreService.getChores = () => {
			return Promise.resolve(chores);
		};
		assignmentService.getAssignments = () => {
			return Promise.resolve(assignments);
		};
		assignmentGenerator.getWeeksRange = async () => Promise.resolve(4);

		sinon.useFakeTimers(new Date(2019, 6, 21).getTime());

		const generatedAssignments = await assignmentGenerator.generateAssignments();

		console.log(formatAssignments(generatedAssignments));
		expect(formatAssignments(generatedAssignments)).toEqual(expectedAssignments);
	});
});

const formatAssignments = (assignments: Assignment[]) => {
	return assignments.map(a => ({
		choreId: a.chore.choreId,
		laborerId: a.laborer.laborerId,
		assignmentMonth: a.assignmentDate.getUTCMonth(),
		assignmentDate: a.assignmentDate.getUTCDate(),
	}));
};

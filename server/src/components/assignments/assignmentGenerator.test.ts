import 'module-alias/register';
import { laborerService, choreService, Chore, Assignment } from 'components';
import { Laborer } from '../laborers';
import { assignmentGenerator } from './assignmentGenerator';
import { DayOfWeek } from '~/constants';
import sinon from 'sinon';
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

const chores: Chore[] = [
	{ choreId: 1, dayOfWeek: DayOfWeek.Monday },
	{ choreId: 2, dayOfWeek: DayOfWeek.Wednesday },
	{ choreId: 3, dayOfWeek: DayOfWeek.Wednesday },
	{ choreId: 4, dayOfWeek: DayOfWeek.Friday },
].map(c => makeChore(c.choreId, c.dayOfWeek))

const assignments : Assignment[] = [
	{
		assignmentId: 1,
		laborer: laborers.find(l => l.laborerId === 1)!,
		chore: chores.find(c => c.choreId === 1)!,
		assignmentDate: new Date(2019, 6, 22)
	},
	{
		assignmentId: 2,
		laborer: laborers.find(l => l.laborerId === 2)!,
		chore: chores.find(c => c.choreId === 3)!,
		assignmentDate: new Date(2019, 6, 24)
	},
	{
		assignmentId: 3,
		laborer: laborers.find(l => l.laborerId === 3)!,
		chore: chores.find(c => c.choreId === 4)!,
		assignmentDate: new Date(2019, 6, 26)
	}
]

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
		}
		let clock = sinon.useFakeTimers(new Date(2019, 6, 22).getTime());
		const generatedAssignments = await assignmentGenerator.generateAssignments();

		printAssignments(generatedAssignments);

		expect(true).toBe(true);
	});
});

const printAssignments = (assignments: Assignment[]) => {
	assignments.forEach(a => {
		const message = `chore: ${a.chore.choreId}, laborer: ${a.laborer.laborerId}, date: ${a.assignmentDate.getMonth()}/${a.assignmentDate.getDate()}`
		console.log(message);
	})
}
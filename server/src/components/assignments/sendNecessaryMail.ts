import { mailFutureAssignments } from './mailFutureAssignments';
import { mailTodaysAssignments } from './mailTodaysAssignments';

export const sendNecessaryMail = async () => {
	await mailFutureAssignments();
	await mailTodaysAssignments();
	return;
};

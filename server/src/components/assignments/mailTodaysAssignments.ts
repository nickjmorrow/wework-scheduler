import { Assignment, assignmentService } from 'components/assignments';
import { mailTransporter } from '~/infrastructure/mailTransporter';

export const mailTodaysAssignments = async () => {
	const todaysUnsentAssignments = await assignmentService.getTodaysUnsentAssignments();
	todaysUnsentAssignments.forEach(mailAssignment);
};

const mailAssignment = (assignment: Assignment) => {
	mailTransporter.sendMail(
		{
			from: process.env.GMAIL_USER,
			to: assignment.laborer.email,
			subject: assignment.chore.name,
			text: assignment.chore.description,
		},
		(error, info) => {
			if (error) {
				console.error(error);
				return;
			}
			assignment.isEmailSent = true;
			assignmentService.updateAssignment(assignment);
			console.log(`Sent email to ${assignment.laborer.email}`);
		},
	);
};

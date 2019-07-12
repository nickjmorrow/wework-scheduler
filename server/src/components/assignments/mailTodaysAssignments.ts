import { Assignment, assignmentService } from 'components/assignments';
import { mailTransporter } from '~/infrastructure/mailTransporter';

export const mailTodaysAssignments = async () => {
	const todaysUnsentAssignments = await assignmentService.getTodaysUnsentAssignments();
	todaysUnsentAssignments.forEach(mailAssignment);
};

const mailAssignment = (assignment: Assignment) => {
	console.log(`Sending today's assignment to ${assignment.laborer.name}`);
	const email = process.env.NODE_ENV === 'development' ? process.env.TESTING_EMAIL : assignment.laborer.email;
	mailTransporter.sendMail(
		{
			from: process.env.GMAIL_USER,
			to: email,
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

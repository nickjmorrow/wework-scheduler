import { assignmentService, Assignment } from '~/components/assignments';
import { laborerService, Laborer } from '~/components/laborers';
import { MIN_DAYS_UNTIL_RESEND_EMAIL, monthMapping } from '~/constants';
import { mailTransporter } from '~/infrastructure/mailTransporter';

export const mailFutureAssignments = async () => {
	const assignments = await assignmentService.getAssignments();
	const lastAssignmentDate = assignments
		.map(fa => new Date(fa.assignmentDate))
		.reduce((agg, cur) => {
			if (cur > agg) {
				agg = cur;
			}
			return agg;
		}, new Date());

	const dateDifference = dateDiffInDays(new Date(), lastAssignmentDate);
	console.log(dateDifference);
	if (dateDifference > MIN_DAYS_UNTIL_RESEND_EMAIL) {
		return;
	}
	const futureAssignments = await assignmentService.getOrCreateFutureAssignments();
	const assignmentDates = futureAssignments.map(fa => new Date(fa.assignmentDate));
	console.log(assignmentDates);
	const minimumDate = assignmentDates.reduce((agg, cur, i, arr) => {
		if (cur > agg) {
			cur = agg;
		}
		return cur;
	}, assignmentDates[0]);
	const maximumDate = assignmentDates.reduce((agg, cur, i, arr) => {
		if (cur < agg) {
			cur = agg;
		}
		return cur;
	}, assignmentDates[0]);
	console.log(minimumDate, maximumDate);
	const laborers = await laborerService.getLaborers();
	const dateRange = getPrettyDateRange(minimumDate, maximumDate);
	laborers.forEach(l => sendMailToLaborer(l, dateRange));
};

const sendMailToLaborer = (laborer: Laborer, dateRange: string) => {
	mailTransporter.sendMail(
		{
			from: process.env.GMAIL_USER,
			to: laborer.email,
			subject: `WeWork Chores for ${dateRange}`,
			text: `Chores have been generated for ${dateRange}, please see https://fervent-saha-b4b2b7.netlify.com/`,
		},
		(err, info) => {
			if (err) {
				console.log(err);
			}
			console.log(info.response);
		},
	);
};

const dateDiffInDays = (a: Date, b: Date) => {
	const _MS_PER_DAY = 1000 * 60 * 60 * 24;
	// Discard the time and time-zone information.
	const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
	const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

	return Math.floor((utc2 - utc1) / _MS_PER_DAY);
};

const getPrettyDate = (a: Date) => {
	const monthNumber = a.getUTCMonth() as keyof typeof monthMapping;
	const monthName = monthMapping[monthNumber];
	return `${monthName} ${a.getUTCDate()}`;
};

const getPrettyDateRange = (a: Date, b: Date) => `${getPrettyDate(a)} - ${getPrettyDate(b)}`;

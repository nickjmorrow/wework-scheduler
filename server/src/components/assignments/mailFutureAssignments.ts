import { assignmentService } from '~/components/assignments';
import { Laborer, laborerService } from '~/components/laborers';
import { MIN_DAYS_UNTIL_RESEND_EMAIL, monthMapping } from '~/constants';
import { mailTransporter } from '~/infrastructure/mailTransporter';
import { settingsProvider } from '../settings';

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
	const minimumDaysUntilResendEmail = parseInt(
		(await settingsProvider.getDatabaseSetting(MIN_DAYS_UNTIL_RESEND_EMAIL)).value,
		10,
	);
	if (dateDifference > minimumDaysUntilResendEmail) {
		return;
	}
	const futureAssignments = await assignmentService.getOrCreateFutureAssignments();

	const assignmentDates = futureAssignments.map(fa => new Date(fa.assignmentDate));

	const minimumDate = assignmentDates.reduce((agg, cur) => {
		if (cur > agg) {
			cur = agg;
		}
		return cur;
	}, assignmentDates[0]);

	const maximumDate = assignmentDates.reduce((agg, cur) => {
		if (cur < agg) {
			cur = agg;
		}
		return cur;
	}, assignmentDates[0]);

	const laborers = await laborerService.getLaborers();
	const dateRange = getPrettyDateRange(minimumDate, maximumDate);
	laborers.forEach(l => sendMailToLaborer(l, dateRange));
};

const sendMailToLaborer = (laborer: Laborer, dateRange: string) => {
	console.log(`Sending future assignment to ${laborer.name}`);
	const email = process.env.NODE_ENV === 'production' ? laborer.email : process.env.TESTING_EMAIL;
	mailTransporter.sendMail(
		{
			from: process.env.GMAIL_USER,
			to: email,
			subject: `WeWork Chores for ${dateRange}`,
			text: `Chores have been generated for ${dateRange}, please see https://fervent-saha-b4b2b7.netlify.com/`,
		},
		(err, info) => {
			if (err) {
				console.log(err);
			}
			console.log(info);
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

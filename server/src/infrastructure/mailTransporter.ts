import nodemailer from 'nodemailer';

export const mailTransporter = nodemailer.createTransport({
	service: 'gmail',
	pool: true,
	auth: {
		user: process.env.GMAIL_USER,
		pass: process.env.GMAIL_PASSWORD,
	},
});

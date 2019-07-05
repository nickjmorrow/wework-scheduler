import { Request, Response } from 'express';
import { Route } from '~/infrastructure/types';
import { sendNecessaryMail } from './sendNecessaryMail';

export const assignmentRoutes: Route[] = [
	{
		path: '/assignments/sendMail',
		method: 'get',
		handler: async (req: Request, res: Response, next) => {
			console.log('sending mail');
			await sendNecessaryMail();
			res.status(200).send();
		},
	},
];

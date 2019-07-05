import { Request, Response } from 'express';
import { Route } from '~/infrastructure/types';
import { sendNecessaryMail } from './sendNecessaryMail';

export const assignmentRoutes: Route[] = [
	{
		path: '/assignments/sendMail',
		method: 'post',
		handler: async (req: Request, res: Response, next) => {
			await sendNecessaryMail();
			res.status(200).send();
		},
	},
];

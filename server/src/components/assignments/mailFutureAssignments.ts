require('dotenv').config();
require('module-alias/register');

import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { typeOrmConfig } from '~/infrastructure/config';
import { assignmentService } from './assignmentService';

(async () => {
	await createConnection(typeOrmConfig);

	const futureAssignments = await assignmentService.getTodaysAssignments();
	console.log(futureAssignments);
})();

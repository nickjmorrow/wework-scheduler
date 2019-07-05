import dotenv from 'dotenv';
import 'module-alias/register';

import { assignmentService } from 'components';
import { createConnection } from 'typeorm';
import { typeOrmConfig } from '~/infrastructure/config';

(async () => {
	require('dotenv').config();
	console.log(typeOrmConfig);
	console.log(process.env);
	await createConnection(typeOrmConfig);
	const futureAssignments = await assignmentService.getOrCreateFutureAssignments();

	// mail future assignments to all laborers

	console.log(futureAssignments);
	console.log('hello');
})();

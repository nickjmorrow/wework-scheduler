import dotenv from 'dotenv';

dotenv.config();

import { createConnection } from 'typeorm';
import { typeOrmConfig } from '../../infrastructure/config';
import { experienceService } from './experienceService';

describe('experience service test', () => {
	beforeAll(async () => {
		await createConnection(typeOrmConfig);
	});
	test('my test', async () => {
		const experiences = await experienceService.getExperiences();
		console.log(experiences.map(e => e.technologies.map(t => t.skillLevel)));
	});
});

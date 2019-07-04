import dotenv from 'dotenv';

dotenv.config();

import { createConnection } from 'typeorm';
import { typeOrmConfig } from '../../infrastructure/config';
import { technologyService } from './technologyService';

describe('experience service test', () => {
	beforeAll(async () => {
		await createConnection(typeOrmConfig);
	});
	test('my test', async () => {
		const technologies = await technologyService.getTechnologies();
		console.log(technologies);
	});
});

import dotenv from 'dotenv';

dotenv.config();

import { settingsProvider } from './settingsProvider';
import { createConnection } from 'typeorm';
import { typeOrmConfig } from '../../infrastructure/config';

describe('experience service test', () => {
	beforeAll(async () => {
		await createConnection(typeOrmConfig);
	});
	test('my test', async () => {
		const experiences = await settingsProvider.getDatabaseSettings();
		console.log(experiences);
	});
});

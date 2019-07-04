import dotenv from 'dotenv';
import 'module-alias/register'

dotenv.config();

import http from 'http';
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { app } from './app';
import { typeOrmConfig } from './config';
import { logger } from './logger';

process.on('uncaughtException', e => {
	logger.error(e);
	process.exit(1);
});

process.on('unhandledRejection', e => {
	logger.error(e!);
	process.exit(1);
});

const { PORT = 9000 } = process.env;
const server = http.createServer(app);

(async () => {
	await createConnection(typeOrmConfig);
})();

server.listen(PORT, async () => {
	// tslint:disable-next-line:no-console
	console.log(`Server is running on http://localhost:${PORT}`);
});

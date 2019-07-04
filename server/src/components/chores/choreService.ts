import { getConnection } from 'typeorm';
import { Chore } from './Chore';

export const choreService = {
	getChores: async () => {
		return await getConnection().manager.find(Chore);
	},
};

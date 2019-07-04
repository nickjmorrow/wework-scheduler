import { getConnection } from 'typeorm';
import { Laborer } from './Laborer';

export const laborerService = {
	getLaborers: async () => {
		return await getConnection().manager.find(Laborer);
	},
};

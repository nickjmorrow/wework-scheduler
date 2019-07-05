import { getConnection } from 'typeorm';
import { Chore } from './Chore';

export const choreService = {
	getChores: async () => {
		return await getConnection().manager.find(Chore, {
			relations: ['assignments'],
		});
	},
	addChore: async (chore: Chore) => {
		return await getConnection().manager.save(Chore, chore);
		
	},
	removeChore: async (choreId: number) => {
		await getConnection().manager.delete(Chore, {
			choreId,
		});
		return choreId;
	},
	updateChore: async (chore: Chore) => {
		return await getConnection().manager.save(Chore, chore);
	}
};

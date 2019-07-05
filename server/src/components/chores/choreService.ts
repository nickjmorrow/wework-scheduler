import { getConnection } from 'typeorm';
import { Chore } from './Chore';

export const choreService = {
	getChores: async () => {
		return (await getConnection().manager.find(Chore, {
			relations: ['assignments'],
		})).filter(c => c.dateDeleted === null);
	},
	addChore: async (chore: Chore) => {
		return await getConnection().manager.save(Chore, chore);
		
	},
	removeChore: async (choreId: number) => {
		const chore = await getConnection().manager.findOneOrFail(Chore, {
			choreId,
		});
		chore.dateDeleted = new Date();
		await getConnection().manager.save(Chore, chore);
		return choreId;
	},
	updateChore: async (chore: Chore) => {
		return await getConnection().manager.save(Chore, chore);
	}
};

import { getConnection } from 'typeorm';
import { Laborer } from './Laborer';

export const laborerService = {
	getLaborers: async () => {
		return (await getConnection().manager.find(Laborer, {
			relations: ['assignments'],
		}))
			.filter(l => l.dateDeleted === null)
			.sort((a, b) => (a.laborerId < b.laborerId ? -1 : 1));
	},
	addLaborer: async (laborer: Laborer) => {
		return await getConnection().manager.save(Laborer, laborer);
	},
	updateLaborer: async (laborer: Laborer) => {
		return await getConnection().manager.save(Laborer, laborer);
	},
	removeLaborer: async (laborerId: number) => {
		const laborer = await getConnection().manager.findOneOrFail(Laborer, {
			laborerId,
		});
		laborer.dateDeleted = new Date();
		await getConnection().manager.save(Laborer, laborer);
		return laborerId;
	},
};

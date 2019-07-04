import { getConnection } from 'typeorm';
import { Technology } from './models/Technology';

export const technologyService = {
	getTechnologies: async () => {
		return await getConnection().manager.find(Technology, {
			relations: ['skillLevel', 'technologyType'],
		});
	},
};

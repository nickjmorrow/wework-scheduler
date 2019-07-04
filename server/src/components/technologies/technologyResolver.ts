import { technologyService } from '../technologies/technologyService';

export const technologyResolver = {
	Query: {
		async technologies(_: any, args: any, ctx: any) {
			return await technologyService.getTechnologies();
		},
	},
};

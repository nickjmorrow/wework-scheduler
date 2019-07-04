import { settingsProvider } from './settingsProvider';

export const settingResolver = {
	Query: {
		async settings(_: any, args: any, ctx: any) {
			return await settingsProvider.getDatabaseSettings();
		},
	},
};

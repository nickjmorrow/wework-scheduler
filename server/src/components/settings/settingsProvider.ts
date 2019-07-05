import { getConnection } from 'typeorm';
import { Setting } from './models/Setting';

export const settingsProvider = {
	getDatabaseSettings: async () => {
		return await getConnection().manager.find(Setting);
	},
	getDatabaseSetting: async (settingId: string) => {
		return await getConnection().manager.findOneOrFail(Setting, settingId);
	},
};

import { mergeTypes } from 'merge-graphql-schemas';
import { settingTypeDefs, choreTypeDefs, laborerTypeDefs, assignmentTypeDefs } from 'components';

export const typeDefs = mergeTypes([settingTypeDefs, choreTypeDefs, laborerTypeDefs, assignmentTypeDefs]);

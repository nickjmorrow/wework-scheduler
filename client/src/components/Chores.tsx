import * as React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import gql from 'graphql-tag';
import { Chore as ChoreType } from '../types';
import { Query } from 'react-apollo';
import { AddChore } from './AddChore';
import { Chore } from './Chore';
import { Typography, useThemeContext } from '@nickjmorrow/react-component-library';

export const query = gql`
	{
		chores {
			choreId
			name
			description
			dayOfWeekId
		}
	}
`;

export const Chores: React.FC = () => {
	const { spacing } = useThemeContext();
	return (
		<Query query={query}>
			{({ loading, error, data, refetch }) => {
				if (loading) return null;
				if (!data) return null;

				return (
					<div style={{ margin: '256px auto' }}>
						<Typography styleVariant={1} style={{ marginBottom: spacing.ss16 }}>
							Chores
						</Typography>
						<div style={{ marginBottom: '32px' }}>
							{data.chores.sort(byDayOfWeekId).map(c => (
								<Chore key={c.choreId} chore={c} refetch={refetch} />
							))}
						</div>
						<AddChore refetch={refetch} />
					</div>
				);
			}}
		</Query>
	);
};

const byDayOfWeekId = (a: ChoreType, b: ChoreType) => {
	if (a.dayOfWeekId === b.dayOfWeekId) {
		return 0;
	}
	return a.dayOfWeekId > b.dayOfWeekId ? 1 : -1;
};

import * as React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import gql from 'graphql-tag';
import { Chore as ChoreType } from '../types';
import { Query } from 'react-apollo';
import { AddChore } from './AddChore';
import { Chore } from './Chore';
import { Typography } from '@nickjmorrow/react-component-library';
import { Laborer } from './Laborer';
import { AddLaborer } from './AddLaborer';

export const query = gql`
	{
		laborers {
			laborerId
			name
			email
		}
	}
`;

export const Laborers: React.FC = () => {
	return (
		<Query query={query}>
			{({ loading, error, data, refetch }) => {
				if (loading) return null;
				if (!data) return null;
				return (
					<div style={{ margin: '256px auto', width: 'max-content' }}>
						<Typography styleVariant={1}>Laborers</Typography>
						<div style={{ marginBottom: '32px' }}>
							{data.laborers
								.sort(l => l.laborerId)
								.map(l => (
									<Laborer key={l.laborerId} laborer={l} refetch={refetch} />
								))}
						</div>
						<AddLaborer refetch={refetch} />
					</div>
				);
			}}
		</Query>
	);
};

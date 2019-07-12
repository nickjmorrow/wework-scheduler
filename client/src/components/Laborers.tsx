import { DelayedSlideInFade, Typography, useThemeContext } from '@nickjmorrow/react-component-library';
import gql from 'graphql-tag';
import * as React from 'react';
import { Query } from 'react-apollo';
import { AddLaborer } from './AddLaborer';
import { Laborer } from './Laborer';

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
	const { spacing } = useThemeContext();
	return (
		<Query query={query}>
			{({ loading, error, data, refetch }) => {
				if (loading) return null;
				if (!data) return null;
				return (
					<DelayedSlideInFade style={{ margin: '256px auto', width: 'max-content' }}>
						<div>
							<Typography styleVariant={1} style={{ marginBottom: spacing.ss16 }}>
								Laborers
							</Typography>
							<div style={{ marginBottom: '32px' }}>
								{data.laborers
									.sort(l => l.laborerId)
									.map((l, i) => (
										<Laborer key={l.laborerId} laborer={l} refetch={refetch} />
									))}
							</div>
							<AddLaborer refetch={refetch} />
						</div>
					</DelayedSlideInFade>
				);
			}}
		</Query>
	);
};

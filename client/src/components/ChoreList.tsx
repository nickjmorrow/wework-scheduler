import * as React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { Chore } from '../types';

const query = graphql`
	{
		data {
			chores {
				choreId, name, description
			}
		}
	}
`;

export const ChoreList: React.FC = () => {
	const {
		data: { chores },
	} = useStaticQuery<{ data: { chores: Chore[] } }>(query);
	console.log(chores);
	return (
		<div>
			{chores.map(c => (
				<div key={c.choreId}>{c.name}</div>
			))}
		</div>
	);
};

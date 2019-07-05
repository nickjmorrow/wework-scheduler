import { Typography, Button } from '@nickjmorrow/react-component-library';
import gql from 'graphql-tag';
import * as React from 'react';
import { Query } from 'react-apollo';
import { Assignment } from './Assignment';
import { GenerateAssignments } from './GenerateAssignments';
import { Assignment as AssignmentType } from '../types';

export const query = gql`
	{
		assignments {
			assignmentId
			assignmentDate
			chore {
				choreId
				name
			}
			laborer {
				laborerId
				name
			}
		}
	}
`;

export const Assignments: React.FC = () => {
	return (
		<Query query={query}>
			{({ loading, error, data, refetch }) => {
				if (loading) return null;
				if (!data || !data.assignments) return null;
				return (
					<div style={{ margin: '128px auto', width: 'max-content' }}>
						<Typography styleVariant={1} style={{ marginBottom: '64px' }}>
							Assignments
						</Typography>
						<div style={{ marginBottom: '32px' }}>
							{data.assignments.sort(sortAssignmentsByDate).map(a => (
								<Assignment key={a.assignmentId} assignment={a} />
							))}
						</div>
						<GenerateAssignments refetch={refetch} />
					</div>
				);
			}}
		</Query>
	);
};

const sortAssignmentsByDate = (a: AssignmentType, b: AssignmentType) => {
	const dateA = new Date(a.assignmentDate);
	const dateB = new Date(b.assignmentDate);
	if (dateA === dateB) {
		return a.chore.choreId > b.chore.choreId ? 1 : -1;
	}
	return dateA > dateB ? 1 : -1;
};

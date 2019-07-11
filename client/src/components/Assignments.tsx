import { Fade, Typography } from '@nickjmorrow/react-component-library';
import gql from 'graphql-tag';
import * as React from 'react';
import { Query } from 'react-apollo';
import { Assignment as AssignmentType } from '../types';
import { isDateEqual } from '../utilities';
import { Assignment } from './Assignment';
import { GenerateAssignments } from './GenerateAssignments';

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
		laborers {
			laborerId
			name
		}
	}
`;

export const Assignments: React.FC = () => {
	return (
		<Query query={query}>
			{({ loading, error, data, refetch }) => {
				return (
					<div style={{ margin: '128px auto', width: 'max-content', minHeight: '100vh', minWidth: '738px' }}>
						<Typography styleVariant={1} style={{ marginBottom: '64px' }}>
							Assignments
						</Typography>
						{!loading && (
							<>
								<div style={{ marginBottom: '32px' }}>
									{data.assignments.length > 0 ? (
										data.assignments.sort(sortAssignmentsByDate).map((a, i) => (
											<Fade
												key={a.assignmentId}
												in={true}
												appear={true}
												enterTimeout={200 + i * 50}
											>
												<Assignment assignment={a} laborers={data.laborers} />
											</Fade>
										))
									) : (
										<Typography>No assignments have been made.</Typography>
									)}
								</div>
								<GenerateAssignments refetch={refetch} />
							</>
						)}
					</div>
				);
			}}
		</Query>
	);
};

const sortAssignmentsByDate = (a: AssignmentType, b: AssignmentType) => {
	const dateA = new Date(a.assignmentDate);
	const dateB = new Date(b.assignmentDate);
	if (isDateEqual(dateA, dateB)) {
		return a.chore.choreId > b.chore.choreId ? 1 : -1;
	}
	return dateA > dateB ? 1 : -1;
};

import { EditIconButton, Select, Typography } from '@nickjmorrow/react-component-library';
import gql from 'graphql-tag';
import React, { useState } from 'react';
import { Mutation, MutationFunc } from 'react-apollo';
import { dayOfWeekOptions, monthMapping } from '../constants';
import { Assignment as AssignmentType, Laborer } from '../types';
import { toast } from 'react-toastify';

export const updateAssignmentMutation = gql`
	mutation updateAssignment($assignmentId: Int!, $laborerId: Int!) {
		updateAssignment(assignmentId: $assignmentId, laborerId: $laborerId) {
			assignmentId
		}
	}
`;

export const Assignment: React.FC<{ assignment: AssignmentType; laborers: Laborer[] }> = ({ assignment, laborers }) => {
	const formattedAssignment = formatAssignment(assignment);
	const [isEditing, setIsEditing] = useState(false);
	const [laborerOption, setLaborerOption] = useState({
		value: assignment.laborer.laborerId,
		label: assignment.laborer.name,
	});

	const laborerOptions = laborers.map(l => ({
		value: l.laborerId,
		label: l.name,
	}));

	const assignmentUpdated = () => toast('Assignment updated.');

	const colorVariant = new Date(assignment.assignmentDate) < new Date() ? 'secondaryDark' : 'primaryDark';
	return (
		<Mutation mutation={updateAssignmentMutation}>
			{(updateAssignment, { data }) => {
				const toggleIsEditing = async () => {
					if (isEditing) {
						await updateAssignment({
							variables: {
								assignmentId: assignment.assignmentId,
								laborerId: laborerOption.value,
							},
						});
						assignmentUpdated();
					}

					setIsEditing(currentIsEditing => !currentIsEditing);
				};
				return (
					<div
						style={{
							display: 'flex',
							flexDirection: 'row',
							padding: '8px',
							justifyContent: 'flex-start',
							width: 'max-content',
							minHeight: '64px',
						}}
					>
						<div style={{ minWidth: '250px', display: 'flex', alignItems: 'center' }}>
							<Typography colorVariant={colorVariant}>{formattedAssignment.chore.name}</Typography>
						</div>
						<div style={{ minWidth: '250px', display: 'flex', alignItems: 'center' }}>
							{isEditing ? (
								<Select
									numVisibleOptions={3.5}
									options={laborerOptions}
									currentOption={laborerOption}
									onChange={o => setLaborerOption(o)}
									style={{ width: '200px' }}
								/>
							) : (
								<Typography colorVariant={colorVariant}>{laborerOption.label}</Typography>
							)}
						</div>
						<div
							style={{
								width: '170px',
								textAlign: 'right',
								display: 'flex',
								justifyContent: 'flex-end',
								marginRight: '32px',
								alignItems: 'center',
							}}
						>
							<Typography colorVariant={colorVariant}>{getPrettyDate(assignment)}</Typography>
						</div>
						<div style={{ display: 'flex', alignItems: 'center' }}>
							<EditIconButton onClick={toggleIsEditing} sizeVariant={2} styleVariant={2} />
						</div>
					</div>
				);
			}}
		</Mutation>
	);
};

const formatAssignment = (assignment: AssignmentType) => {
	assignment.formattedDate = new Date(assignment.assignmentDate);
	return assignment;
};

const getPrettyDate = (assignment: AssignmentType) => {
	const { formattedDate } = assignment;
	const monthName = monthMapping[formattedDate.getUTCMonth()];
	const dayOfWeek = dayOfWeekOptions.find(o => o.value === formattedDate.getUTCDay()).label;
	return `${dayOfWeek}, ${monthName} ${formattedDate.getUTCDate()}`;
};

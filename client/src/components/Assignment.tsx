import { EditIconButton, IOption, Select, Typography } from '@nickjmorrow/react-component-library';
import gql from 'graphql-tag';
import React, { useState } from 'react';
import { Mutation } from 'react-apollo';
import { toast } from 'react-toastify';
import { dayOfWeekOptions, monthMapping, NAME } from '../constants';
import { Assignment as AssignmentType, Laborer } from '../types';

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
	const [hasMadeChange, setHasMadeChange] = useState(false);
	const [laborerOption, setLaborerOption] = useState({
		value: assignment.laborer.laborerId,
		label: assignment.laborer.name,
	});

	const laborerOptions = laborers.map(l => ({
		value: l.laborerId,
		label: l.name,
	}));

	const handleLaborerOptionChange = (o: IOption) => {
		setHasMadeChange(true);
		setLaborerOption(o);
	};

	const assignmentUpdated = () => toast('Assignment updated.');

	const colorVariant = new Date(assignment.assignmentDate) < new Date() ? 'secondaryDark' : 'primaryDark';

	const isRelevantToUser = localStorage.getItem(NAME) === assignment.laborer.name;
	const relevanceStyle: React.CSSProperties = {
		fontWeight: isRelevantToUser ? 700 : 400,
	};
	return (
		<Mutation mutation={updateAssignmentMutation}>
			{(updateAssignment, { data }) => {
				const toggleIsEditing = async () => {
					if (!hasMadeChange) {
						setIsEditing(currentIsEditing => !currentIsEditing);
						return;
					}
					const beforeUpdate = isEditing;

					// want to immediately update UI and not wait for response
					setIsEditing(currentIsEditing => !currentIsEditing);
					if (beforeUpdate) {
						await updateAssignment({
							variables: {
								assignmentId: assignment.assignmentId,
								laborerId: laborerOption.value,
							},
						});
						assignmentUpdated();
						setHasMadeChange(false);
					}
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
							<Typography colorVariant={colorVariant} style={relevanceStyle}>
								{formattedAssignment.chore.name}
							</Typography>
						</div>
						<div style={{ minWidth: '250px', display: 'flex', alignItems: 'center' }}>
							{isEditing ? (
								<Select
									numVisibleOptions={3.5}
									options={laborerOptions}
									currentOption={laborerOption}
									onChange={o => handleLaborerOptionChange(o)}
									style={{ width: '200px' }}
								/>
							) : (
								<Typography colorVariant={colorVariant} style={relevanceStyle}>
									{laborerOption.label}
								</Typography>
							)}
						</div>
						<div
							style={{
								width: '190px',
								textAlign: 'right',
								display: 'flex',
								justifyContent: 'flex-end',
								marginRight: '32px',
								alignItems: 'center',
							}}
						>
							<Typography colorVariant={colorVariant} style={relevanceStyle}>
								{getPrettyDate(assignment)}
							</Typography>
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

const dayMapping = {
	1: 'Monday',
	2: 'Tuesday',
	3: 'Wednesday',
	4: 'Thursday',
	5: 'Friday',
};

const getPrettyDate = (assignment: AssignmentType) => {
	const { formattedDate } = assignment;
	const monthName = monthMapping[formattedDate.getUTCMonth()];
	const dayOfWeek = dayMapping[formattedDate.getUTCDay()];
	return `${dayOfWeek}, ${monthName} ${formattedDate.getUTCDate()}`;
};

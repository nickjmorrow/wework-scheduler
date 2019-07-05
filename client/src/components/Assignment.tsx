import { Typography } from '@nickjmorrow/react-component-library';
import * as React from 'react';
import { dayOfWeekOptions, monthMapping } from '../constants';
import { Assignment as AssignmentType } from '../types';

export const Assignment: React.FC<{ assignment: AssignmentType }> = ({ assignment }) => {
	const formattedAssignment = formatAssignment(assignment);
	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'row',
				padding: '8px',
				justifyContent: 'flex-start',
				width: 'max-content',
			}}
		>
			<div style={{ minWidth: '250px' }}>
				<Typography>{formattedAssignment.chore.name}</Typography>
			</div>
			<div style={{ minWidth: '250px' }}>
				<Typography>{formattedAssignment.laborer.name}</Typography>
			</div>
			<div style={{ width: '150px', textAlign: 'right', display: 'flex', justifyContent: 'flex-end' }}>
				<Typography>{getPrettyDate(assignment)}</Typography>
			</div>
		</div>
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
	return `${dayOfWeek}, ${monthName} ${formattedDate.getDate()}`;
};

import React, { useState } from 'react';
import { Chore as ChoreType } from '../types';
import { Laborer as LaborerType } from '../types';
import { Typography, CloseIconButton, EditIconButton, TextInput, Select } from '@nickjmorrow/react-component-library';
import gql from 'graphql-tag';
import { MutationFunc, graphql, compose, Mutation } from 'react-apollo';
import styled from 'styled-components';
import { dayOfWeekOptions } from '../constants';

export const removeLaborerMutation = gql`
	mutation removeLaborer($laborerId: Int!) {
		removeLaborer(laborerId: $laborerId)
	}
`;

export const updateLaborerMutation = gql`
	mutation updateLaborer($laborerId: Int!, $name: String!, $email: String!) {
		updateLaborer(laborerId: $laborerId, name: $name, email: $email) {
			laborerId
		}
	}
`;

const LaborerInternal: React.FC<{ laborer: LaborerType; refetch(): void }> = ({
	laborer,
	refetch,
}) => {
	const [isEditing, setIsEditing] = useState(false);
	const [editedName, setEditedName] = useState(laborer.name);
	const [editedEmail, setEditedEmail] = useState(laborer.email);

	return (
		<Mutation mutation={updateLaborerMutation}>
			{(updateLaborer, { data }) => (
				<Mutation mutation={removeLaborerMutation}>
					{(removeLaborer, { data }) => {
						const handleDelete = async () => {
							await removeLaborer({
								variables: {
									laborerId: laborer.laborerId,
								},
							});
							refetch();
						};
						const handleUpdate = async () => {
							await updateLaborer({
								variables: {
									laborerId: laborer.laborerId, 
									name: editedName,
									email: editedEmail,
								}
							})
							refetch();
						}
						const toggleIsEditing = () => {
							if (isEditing) {
								handleUpdate();
							}
							setIsEditing(currentIsEditing => !currentIsEditing);
						};
						return (
							<div
								style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: '8px 0' }}
							>
								{isEditing ? (
									<ChoreInfoWrapper>
										<TextInput
										value={editedName}
										onChange={e => setEditedName(e.currentTarget.value)}
									/>
										<TextInput
											value={editedEmail}
											onChange={e => setEditedEmail(e.currentTarget.value)}
										/>
									</ChoreInfoWrapper>
								) : (
									<ChoreInfoWrapper>
										<ChoreDetail>
											<Typography>{editedName}</Typography>
										</ChoreDetail>
										<ChoreDetail>
											<Typography>{editedEmail}</Typography>
										</ChoreDetail>
									</ChoreInfoWrapper>
								)}

								<div
									style={{
										marginLeft: '16px',
										display: 'grid',
										gridAutoFlow: 'column',
										gridColumnGap: '8px',
									}}
								>
									<CloseIconButton styleVariant={2} sizeVariant={2} onClick={handleDelete} />
									<EditIconButton styleVariant={2}  sizeVariant={2} onClick={toggleIsEditing} />
								</div>
							</div>
						);
					}}
				</Mutation>
			)}
		</Mutation>
	);
};

export const Laborer = compose(graphql(removeLaborerMutation, updateLaborerMutation))(LaborerInternal);

const ChoreInfoWrapper = styled.div`
	display: grid;
	grid-auto-flow: column;
	grid-column-gap: 8px;
`;

const ChoreDetail = styled.div`
	padding: 12px 0px 14px 12px;

	width: 256px;
	overflow: auto;
	white-space: nowrap;
	text-overflow: ellipsis;
`;
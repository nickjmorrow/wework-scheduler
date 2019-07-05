import React, { useState } from 'react';
import { Chore as ChoreType } from '../types';
import { Typography, CloseIconButton, EditIconButton, TextInput, Select } from '@nickjmorrow/react-component-library';
import gql from 'graphql-tag';
import { MutationFunc, graphql, compose, Mutation } from 'react-apollo';
import styled from 'styled-components';
import { dayOfWeekOptions } from '../constants';

export const removeChoreMutation = gql`
	mutation removeChore($choreId: Int!) {
		removeChore(choreId: $choreId)
	}
`;

export const updateChoreMutation = gql`
	mutation updateChore($choreId: Int!, $name: String!, $description: String!, $dayOfWeekId: Int!) {
		updateChore(choreId: $choreId, name: $name, description: $description, dayOfWeekId: $dayOfWeekId) {
			choreId
		}
	}
`;

const ChoreInternal: React.FC<{ mutate: MutationFunc; chore: ChoreType; refetch(): void }> = ({
	chore,
	refetch,
	mutate,
}) => {
	const [isEditing, setIsEditing] = useState(false);
	const [editedName, setEditedName] = useState(chore.name);
	const [editedDescription, setEditedDescription] = useState(chore.description);
	const [editedDayOfWeekId, setDayOfWeekId] = useState(chore.dayOfWeekId);

	return (
		<Mutation mutation={updateChoreMutation}>
			{(updateChore, { data }) => (
				<Mutation mutation={removeChoreMutation}>
					{(removeChore, { data }) => {
						const handleDelete = async () => {
							await removeChore({
								variables: {
									choreId: chore.choreId,
								},
							});
							refetch();
						};
						const handleUpdate = async () => {
							await updateChore({
								variables: {
									choreId: chore.choreId,
									name: editedName,
									description: editedDescription,
									dayOfWeekId: editedDayOfWeekId,
								},
							});
							refetch();
						};
						const toggleIsEditing = () => {
							if (isEditing) {
								handleUpdate();
							}
							setIsEditing(currentIsEditing => !currentIsEditing);
						};
						return (
							<div
								style={{
									display: 'flex',
									flexDirection: 'row',
									alignItems: 'center',
									padding: '8px 0',
								}}
							>
								{isEditing ? (
									<ChoreInfoWrapper>
										<TextInput
											value={editedName}
											onChange={e => setEditedName(e.currentTarget.value)}
										/>
										<TextInput
											value={editedDescription}
											onChange={e => setEditedDescription(e.currentTarget.value)}
										/>
										<Select
											options={dayOfWeekOptions}
											currentOption={dayOfWeekOptions.find(
												dowo => dowo.value === editedDayOfWeekId,
											)}
											onChange={o => setDayOfWeekId(o.value)}
										/>
									</ChoreInfoWrapper>
								) : (
									<ChoreInfoWrapper>
										<ChoreDetail>
											<Typography>{editedName}</Typography>
										</ChoreDetail>
										<ChoreDetail>
											<Typography>{editedDescription}</Typography>
										</ChoreDetail>
										<div
											style={{
												height: '40px',
												display: 'flex',
												alignItems: 'center',
												margin: 'auto 0',
												minWidth: '128px',
											}}
										>
											<Typography>
												{dayOfWeekOptions.find(dowo => dowo.value === editedDayOfWeekId)!.label}
											</Typography>
										</div>
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
									<EditIconButton styleVariant={2} sizeVariant={2} onClick={toggleIsEditing} />
									<CloseIconButton styleVariant={2} sizeVariant={2} onClick={handleDelete} />
								</div>
							</div>
						);
					}}
				</Mutation>
			)}
		</Mutation>
	);
};

export const Chore = compose(graphql(removeChoreMutation, updateChoreMutation))(ChoreInternal);

const ChoreInfoWrapper = styled.div`
	display: grid;
	grid-auto-flow: column;
	grid-column-gap: 32px;
`;

const ChoreDetail = styled.div`
	padding: 12px 0px 14px 12px;
	width: 256px;
	overflow: auto;
	white-space: nowrap;
`;

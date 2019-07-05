import React, { useState } from 'react';
import { graphql, MutationFunc } from 'react-apollo';
import gql from 'graphql-tag';
import { TextInput, Select, Button, Fade } from '@nickjmorrow/react-component-library';
import { dayOfWeekOptions } from '../constants';

export const addChoreMutation = gql`
	mutation addChore($name: String!, $description: String!, $dayOfWeekId: Int!) {
		addChore(name: $name, description: $description, dayOfWeekId: $dayOfWeekId) {
			choreId
			name
			description
		}
	}
`;

const AddChoreInternal: React.FC<{ mutate: MutationFunc; refetch(): void }> = ({ mutate, refetch }) => {
	const [choreName, setChoreName] = React.useState('');
	const [choreDescription, setChoreDescription] = React.useState('');
	const [dayOfWeekOption, setDayOfWeekOption] = React.useState(dayOfWeekOptions[0]);
	const [isLoading, setIsLoading] = useState(false);
	const [isVisible, setIsVisible] = useState(false);
	const handleClick = async () => {
		if (!isVisible) {
			setIsVisible(true);
			return;
		}
		if (choreName === '' && choreDescription === '') {
			setIsVisible(false);
			return;
		}
		setIsLoading(true);
		await mutate({
			variables: {
				name: choreName,
				description: choreDescription,
				dayOfWeekId: dayOfWeekOption.value,
			},
		});
		setIsLoading(false);
		setChoreName('');
		setChoreDescription('');
		setDayOfWeekOption(dayOfWeekOptions[0]);
		refetch();
	};
	return (
		<>
			<Fade
				in={isVisible}
				mountOnEnter={true}
				unmountOnExit={true}
				styleKeys={['height']}
				mounted={{ height: '200px', marginBottom: '32px' }}
				unmounted={{ height: '0px' }}
			>
				<div style={{ display: 'grid', gridAutoFlow: 'row', gridRowGap: '16px' }}>
					<TextInput
						placeholder={'Chore Name'}
						value={choreName}
						onChange={e => setChoreName(e.currentTarget.value)}
					/>
					<TextInput
						placeholder={'Chore Description'}
						value={choreDescription}
						onChange={e => setChoreDescription(e.currentTarget.value)}
					/>
					<Select
						options={dayOfWeekOptions}
						currentOption={dayOfWeekOption}
						onChange={o => setDayOfWeekOption(o)}
					/>
				</div>
			</Fade>
			<Button useMargin={false} onClick={handleClick} isLoading={isLoading}>
				Add Chore
			</Button>
		</>
	);
};

export const AddChore = graphql(addChoreMutation)(AddChoreInternal);

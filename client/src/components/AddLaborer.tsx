import React, { useState } from 'react';
import { graphql, MutationFunc } from 'react-apollo';
import gql from 'graphql-tag';
import { TextInput, Select, Button, Fade } from '@nickjmorrow/react-component-library';
import { dayOfWeekOptions } from '../constants';

export const addLaborerMutation = gql`
	mutation addLaborer($name: String!, $email: String!) {
		addLaborer(name: $name, email: $email) {
			laborerId
			name
			email
		}
	}
`;

const AddLaborerInternal: React.FC<{ mutate: MutationFunc; refetch(): void }> = ({ mutate, refetch }) => {
	const [laborerName, setLaborerName] = React.useState('');
	const [laborerEmail, setLaborerEmail] = React.useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [isVisible, setIsVisible] = useState(false);
	const handleClick = async () => {
		if (!isVisible) {
			setIsVisible(true);
			return;
		}
		if (laborerName === '' && laborerEmail === '') {
			setIsVisible(false);
			return;
		}
		setIsLoading(true);
		await mutate({
			variables: {
				name: laborerName,
				email: laborerEmail,
			},
		});
		setLaborerName('');
		setLaborerEmail('');
		setIsLoading(false);
		refetch();
	};
	return (
		<>
			<Fade
				in={isVisible}
				mountOnEnter={true}
				unmountOnExit={true}
				styleKeys={['height']}
				mounted={{ height: '140px', marginBottom: '16px' }}
				unmounted={{ height: '0px' }}
			>
				<div style={{ display: 'grid', gridAutoFlow: 'row', gridRowGap: '16px' }}>
					<TextInput
						placeholder={'Name'}
						value={laborerName}
						onChange={e => setLaborerName(e.currentTarget.value)}
					/>
					<TextInput
						placeholder={'Email'}
						type={'email'}
						value={laborerEmail}
						onChange={e => setLaborerEmail(e.currentTarget.value)}
					/>
				</div>
			</Fade>
			<Button useMargin={false} onClick={handleClick} isLoading={isLoading}>
				Add Person
			</Button>
		</>
	);
};

export const AddLaborer = graphql(addLaborerMutation)(AddLaborerInternal);

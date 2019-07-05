import React, { useState } from 'react';
import { Button, useThemeContext } from '@nickjmorrow/react-component-library';
import gql from 'graphql-tag';
import { graphql, MutationFunc } from 'react-apollo';
import styled from 'styled-components';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { css } from 'glamor'


export const generateAssignmentsMutation = gql`
	mutation generateAssignments {
		generateAssignments
	}
`;

const prettyHues = [{ first: 200, second: 300 }, { first: 50, second: 320 }, { first: 270, second: 170 }];
// const prettyHues = [{first: 270, second: 170}];

const getPrettyHues = () => {
	let randomIndex = Math.floor(Math.random() * prettyHues.length);
	const prettyHue = prettyHues[randomIndex];
	if (Math.floor(Math.random() * 99) % 2 === 0) {
		return { first: prettyHue.second, second: prettyHue.first };
	}
	return prettyHue;
};

const GenerateAssignmentsInternal: React.FC<{ refetch(): void; mutate: MutationFunc }> = ({ refetch, mutate }) => {
	const [isLoading, setIsLoading] = useState(false);
	const notify = () => toast('Assignments have been generated if not already created for the next few weeks.');
	const [currentPrettyHues, setPrettyHues] = useState(getPrettyHues());
	const { typography } = useThemeContext();
	const handleClick = async () => {
		setIsLoading(true);
		await mutate();
		refetch();
		setIsLoading(false);
		notify();
	};
	const { first, second } = currentPrettyHues;
	
	return (
		<>
			<StyledButton first={first} second={second} isLoading={isLoading} useMargin={false} onClick={handleClick}>
				Generate
			</StyledButton>
			<ToastContainer toastClassName={css({fontSize: '16px', fontFamily: typography.fontFamily.default})} />
		</>
	);
};

export const GenerateAssignments = graphql(generateAssignmentsMutation)(GenerateAssignmentsInternal);

const StyledButton = styled(Button)<{ first: string; second: string }>`
	${p => {
		const { first, second } = p;
		return `
			background-image: linear-gradient(60deg, hsl(${first}deg, 100%, 50%), hsl(${second}deg, 100%, 50%));
			padding: 10px;
			border: none;
			&:hover {
				opacity: 0.7;
			}
		`;
	}}
`;

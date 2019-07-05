import * as React from 'react'
import { graphql, MutationFunc } from 'react-apollo';
import gql from 'graphql-tag';


export const addChoreMutation = gql`
	mutation addChore($name: String!, $description: String!, $dayOfWeekId: Int!) {
		addChore(name: $name, description: $description, dayOfWeekId: $dayOfWeekId) {
			choreId, name, description
		}
	}
`;

const AddChoreInternal : React.FC = ({mutate}: { mutate: MutationFunc}) => {
	const handleClick = () => {
		console.log('before mutate')
		mutate({
			variables: {
				name: "name from react",
				description: "description from react",
				dayOfWeekId: 5
			}
		}).then(res => console.log(res));
		
	}
	return <button onClick={() => handleClick()}>Add Chore</button>
}

export const AddChore = graphql(addChoreMutation)(AddChoreInternal);

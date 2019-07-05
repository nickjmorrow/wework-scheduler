export const choreTypeDefs = `
    type Chore {
        choreId: Int!
        name: String!
		description: String!
		dayOfWeekId: Int!
		assignments: [Assignment]!
        dateDeleted: String
    }

    type Query {
        chores: [Chore]!
	}
	
	type Mutation {
		addChore(name: String!, description: String!, dayOfWeekId: Int!): Chore!
		removeChore(choreId: Int!): Int!
		updateChore(choreId: Int!, name: String!, description: String!, dayOfWeekId: Int!): Chore!
	}
`;

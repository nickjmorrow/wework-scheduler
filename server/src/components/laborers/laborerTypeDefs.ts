export const laborerTypeDefs = `
    type Laborer {
        laborerId: Int!
		name: String!
        email: String!
		dateDeleted: String
		assignments: [Assignment]!
    }

    type Query {
        laborers: [Laborer]!
	}
	
	type Mutation {
		addLaborer(name: String!, email: String!): Laborer!
		removeLaborer(laborerId: Int!): Int!
		updateLaborer(laborerId: Int!, name: String!, email: String!): Laborer!
	}
`;

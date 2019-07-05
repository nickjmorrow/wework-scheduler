export const assignmentTypeDefs = `
	scalar Date

    type Assignment {
        assignmentId: Int!
		assignmentDate: Date!
		laborer: Laborer!
		chore: Chore!
    }

    type Query {
        assignments: [Assignment]!
	}
	
	type Mutation {
		generateAssignments: Boolean!
	}
`;

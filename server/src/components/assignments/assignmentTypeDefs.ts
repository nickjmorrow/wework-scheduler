export const assignmentTypeDefs = `
    type Assignment {
        assignmentId: Int!
		assignmentDate: String!
		laborer: Laborer!
		chore: Chore!
    }

    type Query {
        assignments: [Assignment]!
    }
`;

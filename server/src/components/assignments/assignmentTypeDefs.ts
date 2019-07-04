export const assignmentTypeDefs = `
    type Assignment {
        assignmentId: Int!
        assignmentDate: String!
    }

    type Query {
        assignments: [Assignment]!
    }
`;

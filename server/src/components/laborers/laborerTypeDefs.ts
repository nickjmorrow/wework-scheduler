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
`;

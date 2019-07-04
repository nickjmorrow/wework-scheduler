export const laborerTypeDefs = `
    type Laborer {
        laborerId: Int!
		name: String!
        email: String!
		dateDeleted: String
    }

    type Query {
        laborers: [Laborer]!
    }
`;

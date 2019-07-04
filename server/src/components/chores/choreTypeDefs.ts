export const choreTypeDefs = `
    type Chore {
        choreId: Int!
        name: String!
        description: String!
        dateDeleted: String
    }

    type Query {
        chores: [Chore]!
    }
`;

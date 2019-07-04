export const projectDetailTypeDefs = `
    type ProjectDetail {
        projectDetailId: Int!
        description: String!
        Project: Project!
    }

    type Query {
        projectDetails: [ProjectDetail]!
    }
`;

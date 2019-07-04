export const experienceDetailTypeDefs = `
    type ExperienceDetail {
        experienceDetailId: Int!
        description: String!
        Experience: Experience!
    }

    type Query {
        experienceDetails: [ExperienceDetail]!
    }
`;

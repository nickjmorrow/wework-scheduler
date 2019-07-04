export const skillLevelTypeDefs = `
    type SkillLevel {
        skillLevelId: Int!
        description: String!
    }

    type Query {
        skillLevels: [SkillLevel]!
    }
`;

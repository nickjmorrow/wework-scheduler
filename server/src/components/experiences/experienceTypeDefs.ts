export const experienceTypeDefs = `
    type Experience {
        experienceId: Int!
        name: String!
        experienceDetails: [ExperienceDetail!]!
        technologies: [Technology!]!
		roleName: String!
		startDate: String!
		endDate: String
		isCurrent: Boolean!
		location: String!
    }

    type Query {
        experiences: [Experience]!
    }
`;

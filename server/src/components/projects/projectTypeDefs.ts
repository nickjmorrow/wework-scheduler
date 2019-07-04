export const projectTypeDefs = `
    type Project {
        projectId: String!
        name: String!
		tagline: String!
		githubUrl: String!
		demoUrl: String!
        projectDetails: [ProjectDetail!]!
        technologies: [Technology!]!
		orderId: Int!
    }

    type Query {
        projects: [Project]!
    }
`;

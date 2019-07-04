export const projectTechnologyTypeDefs = `
    type ProjectTechnology {
        name: String!
        project: Project!
    }

    type Query {
        projectTechnologies: [ProjectTechnology]!
    }
`;

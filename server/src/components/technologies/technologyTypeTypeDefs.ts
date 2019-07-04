export const technologyTypeTypeDefs = `
	type TechnologyType {
		technologyTypeId: Int!
		name: String!
	}

	type Query {
		technologyTypes: [TechnologyType]!
	}
`;
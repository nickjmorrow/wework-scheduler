export const settingTypeDefs = `
    type Setting {
        settingId: String!
        value: String!
    }

    type Query {
        settings: [Setting]!
    }
`;

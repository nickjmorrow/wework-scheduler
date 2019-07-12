var getServerUrl = require('./getServerUrl');

module.exports = {
	siteMetadata: {
		title: `WeWork Scheduler`,
		description: `Schedule chores for the Mastercard NY WeWork team.`,
		author: `@nickjmorrow`,
	},
	plugins: [
		`gatsby-plugin-react-helmet`,
		// 'gatsby-plugin-offline',
		'gatsby-plugin-typescript',
		{
			resolve: 'gatsby-source-graphql',
			options: {
				typeName: 'Data',
				fieldName: 'data',
				url: getServerUrl(),
			},
		},
		{
			resolve: `gatsby-plugin-favicon`,
			options: {
				logo: './assets/favicon.png',
			},
		},
		{
			resolve: `gatsby-plugin-prefetch-google-fonts`,
			options: {
				fonts: [
					{
						family: 'Overpass',
						variants: [`400`, `600`, `700`, `800`],
					},
					{
						family: 'Patua One',
						variants: [`400`],
					},
				],
			},
		},
		{
			resolve: `gatsby-plugin-styled-components`,
		},
	],
};

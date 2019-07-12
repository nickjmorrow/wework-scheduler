var getServerUrl = require('./getServerUrl');

module.exports = {
	siteMetadata: {
		title: `WeWork Scheduler`,
		description: `Schedule chores for the Mastercard NY WeWork team.`,
		author: `@nickjmorrow`,
	},
	plugins: [
		`gatsby-plugin-react-helmet`,
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				name: `images`,
				path: `${__dirname}/src/images`,
			},
		},
		`gatsby-transformer-sharp`,
		`gatsby-plugin-sharp`,
		// {
		// 	resolve: `gatsby-plugin-manifest`,
		// 	options: {
		// 		name: `gatsby-starter-default`,
		// 		short_name: `starter`,
		// 		start_url: `/`,
		// 		background_color: `#663399`,
		// 		theme_color: `#663399`,
		// 		display: `minimal-ui`,
		// 		icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
		// 	},
		// },
		// this (optional) plugin enables Progressive Web App + Offline functionality
		// To learn more, visit: https://gatsby.dev/offline
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
		// {
		// 	resolve: `gatsby-plugin-favicon`,
		// 	options: {
		// 		logo: './assets/favicon.png',
		// 	},
		// },
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
		// {
		// 	resolve: `gatsby-source-filesystem`,
		// 	options: {
		// 		name: `images`,
		// 		path: path.join(__dirname, `src`, `images`),
		// 	}
		// },
		`gatsby-transformer-sharp`,
		`gatsby-plugin-sharp`,
	],
};

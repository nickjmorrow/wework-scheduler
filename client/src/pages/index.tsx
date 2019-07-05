import { graphql } from 'gatsby';
import React from 'react';
import Main from '../components/Main';
import SEO from '../components/seo';
import { Experience, Project, Setting, Technology, Chore } from '../types';
import { WrapRootElement } from '../WrapRootElement';

// export const GatsbyQuery = graphql`
// 	{
// 		data {
// 			chores {
// 				choreId
// 			}
// 		}
// 	}
// `;

// interface Data {
// 	chores: Chore[];
// }

const IndexPage = () => {
	return (
		<WrapRootElement>
			<Main />
			{/* <SEO /> */}
		</WrapRootElement>
	);
};

export default IndexPage;

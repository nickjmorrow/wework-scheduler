import { graphql } from 'gatsby';
import React from 'react';
import Main from '../components/Main';
import SEO from '../components/seo';
import { Experience, Project, Setting, Technology, Chore } from '../types';
import { WrapRootElement } from '../WrapRootElement';
import { BrowserRouter } from 'react-router-dom';

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
			<BrowserRouter>
				<Main />
			</BrowserRouter>
			{/* <SEO /> */}
		</WrapRootElement>
	);
};

export default IndexPage;

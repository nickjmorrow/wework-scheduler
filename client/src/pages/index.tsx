import { graphql } from 'gatsby';
import React from 'react';
import Main from '../components/Main';
import SEO from '../components/seo';
import { Experience, Project, Setting, Technology } from '../types';

export const GatsbyQuery = graphql`
	{
		data {
			settings {
				settingId
				value
			}
			experiences {
				experienceId
				name
				experienceDetails {
					experienceDetailId
					description
				}
				technologies {
					technologyId
					name
					skillLevel {
						skillLevelId
						description
					}
				}
			}
			projects {
				name
				projectId
				projectDetails {
					description
				}
				technologies {
					technologyId
					name
				}
			}
			technologies {
				name
				skillLevel {
					skillLevelId
					description
				}
			}
		}
	}
`;

interface Data {
	settings: Setting[];
	experiences: Experience[];
	projects: Project[];
	technologies: Technology[];
}

const IndexPage = ({ data }: { data: Data }) => {
	return (
		<>
			<Main />
			<SEO />
		</>
	);
};

export default IndexPage;

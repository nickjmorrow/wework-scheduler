import * as React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { Project } from '../types';
import { Header } from './shared/Header';
import { Typography, useThemeContext, Theme } from '@nickjmorrow/react-component-library';
import styled from 'styled-components';
import { DelayedSlideInFade } from './shared/DelayedSlideInFade';
import { FeaturedProjectList } from './FeaturedProjectList';
import { NUM_FEATURED_PROJECTS } from '../constants';
import { OtherProjectList } from './OtherProjectList';

export const GatsbyQuery = graphql`
	{
		data {
			projects {
				projectId
				name
				orderId
				tagline
				githubUrl
				demoUrl
				projectDetails {
					description
				}
				technologies {
					technologyId
					name
				}
			}
		}
	}
`;

export const ProjectList: React.FC = () => {
	const {
		data
	} = useStaticQuery<{ data: { projects: Project[] } }>(GatsbyQuery);
	const theme = useThemeContext();
	if (data === null) {
		return null;
	}
	const { projects } = data;
	const sortedProjects = projects
							.sort((a, b) => (a.orderId > b.orderId ? 1 : -1));
							
	const featuredProjects = sortedProjects
		.filter((p, i) => i < NUM_FEATURED_PROJECTS);
	
	const otherProjects = sortedProjects
		.filter((p, i) => i >= NUM_FEATURED_PROJECTS);

	return (
			<DelayedSlideInFade enterTimeout={500}>
				<ProjectsWrapper id="work" theme={theme}>
					<div style={{padding: '72px'}}>
						
							
							<FeaturedProjectList
								projects={featuredProjects}
							/>
							<OtherProjectList projects={otherProjects}/>
						
					</div>
				</ProjectsWrapper>
			</DelayedSlideInFade>
	);
};

const ProjectsWrapper = styled('section')<{theme: Theme}>`
	display: flex;
	justify-content: center;
	flex-direction: column;
	background-color: ${p => p.theme.colors.background};
`;
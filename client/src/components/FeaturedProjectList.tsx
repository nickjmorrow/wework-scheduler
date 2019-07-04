import * as React from 'react';
import { Project } from '../types';
import { Typography } from '@nickjmorrow/react-component-library';
import { FeaturedProject } from './FeaturedProject';
import styled from 'styled-components';
import { Header } from './shared/Header';

export const FeaturedProjectList: React.FC<{ projects: Project[] }> = ({ projects }) => {
	return (
		<FeaturedProjectListWrapper>
			<InnerWrapper>
				<Header id="work" link="#work">Work</Header>
				<Typography styleVariant={2}>Featured Projects</Typography>
				{projects.map((p, i) => (
					<FeaturedProject key={p.projectId} project={p} rightAlign={i % 2 === 0} />
				))}
			</InnerWrapper>
		</FeaturedProjectListWrapper>
	);
};

const FeaturedProjectListWrapper = styled.div`
	max-width: 800px;
	display: flex;
	justify-content: center;
	flex-direction: column;
	margin: 0 auto;
`;

const InnerWrapper = styled.div`
	display: flex;
	flex-direction: column;
`;
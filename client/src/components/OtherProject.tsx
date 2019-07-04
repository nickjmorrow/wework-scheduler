import * as React from 'react';
import { Project as ProjectType } from '../types';
import styled from 'styled-components';
import { useThemeContext, StyleConstant, Typography, GithubIcon, ShareIcon } from '@nickjmorrow/react-component-library';
import { Theme } from '@nickjmorrow/react-component-library/dist/typeUtilities';
import { DelayedSlideInFade } from './shared/DelayedSlideInFade';

// TODO: think about how and why I had to rename the type to ProjectType
export const OtherProject: React.FC<{ project: ProjectType }> = ({ project }) => {
	const theme = useThemeContext();
	return (
		<DelayedSlideInFade enterTimeout={500}>
			<OtherProjectWrapper theme={theme}>
				<Links>
					<a href={project.githubUrl}><GithubIcon sizeVariant={2} style={{display: 'block'}}/></a>
					<a href={project.demoUrl}><ShareIcon sizeVariant={2} style={{display: 'block'}}/></a>
				</Links>
				<Typography style={{marginBottom: theme.spacing.ss6, maxWidth: '170px'}} sizeVariant={4} colorVariant={'primaryDark'} weightVariant={7}>{project.name}</Typography>
				<Typography>{project.tagline}</Typography>
				<Typography
					style={{ marginBottom: theme.spacing.ss6, display: 'block', bottom: '0', position: 'absolute', marginRight: theme.spacing.ss4 }}
					sizeVariant={2}
					fontFamilyVariant={'monospace'}
					colorVariant={'secondaryDark'}
				>
					{project.technologies.map(t => t.name).join(', ')}
				</Typography>
			</OtherProjectWrapper>
		</DelayedSlideInFade>
	);
};

const OtherProjectWrapper = styled('div')<{
	theme: Theme
}>`
	height: 300px;
	width: 300px;
	background-color: ${p => p.theme.colors.neutral.cs1};
	border-radius: ${p => p.theme.border.borderRadius.br1};
	padding: ${p => p.theme.spacing.ss8};
	position: relative;
	box-shadow: ${p => p.theme.boxShadow.bs2};
	transition: all ${p => p.theme.transitions.medium};
	top: 0px;
	margin-bottom: ${p => p.theme.spacing.ss8};
	&: hover {
		top: -4px;
		box-shadow: ${p => p.theme.boxShadow.bs3};
		transition: all ${p => p.theme.transitions.medium};
		background-color: ${p => p.theme.colors.background};
	}
`;

const Links = styled.div`
	position: absolute;
	right: 20px;
	top: 27px;
	width: 40px;
	display: flex;
	justify-content: space-between;
`;
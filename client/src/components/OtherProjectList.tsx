import * as React from 'react';
import styled from 'styled-components';
import { Project } from '../types';
import { Typography, useThemeContext, Theme } from '@nickjmorrow/react-component-library';
import { OtherProject } from './OtherProject';
import { DelayedSlideInFade } from './shared/DelayedSlideInFade';


export const OtherProjectList : React.FC<{projects: Project[]}> = ({projects}) => {
	const theme = useThemeContext();
	return (
		<DelayedSlideInFade enterTimeout={500}>
		<div style={{textAlign: 'center'}}>
			<Typography weightVariant={7} styleVariant={2} style={{marginBottom: '48px'}}>Other Projects</Typography>
		</div>
			<div style={{display: 'flex', justifyContent: 'center'}}>
				<StyledOtherProjectList theme={theme}>
					{projects.map(p => (
						<OtherProject project={p} key={p.projectId}/>
					))}
				</StyledOtherProjectList>
			</div>
			</DelayedSlideInFade>
	);
}

const StyledOtherProjectList = styled('div')<{theme: Theme}>`
	display: grid;
	flex-wrap: wrap;
	justify-content: center;
	grid-column-gap: ${p => p.theme.spacing.ss6};
	grid-template-columns: repeat(auto-fit, 300px);
	width: 100%;
	max-width: 873px;
`;
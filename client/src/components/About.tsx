import { Typography, useThemeContext, Theme } from '@nickjmorrow/react-component-library';
import * as React from 'react';
import styled from 'styled-components';
import { DelayedSlideInFade } from './shared/DelayedSlideInFade';
import { Header } from './shared/Header';
import { TechnologyEmphasizedTypography } from './TechnologyEmphasizedTypography';
import { TechnologyList } from './TechnologyList';

// TODO: Why am I hitting key errors when using technologyId?
export const About: React.FC = () => {
	const theme = useThemeContext();
	return (
		<AboutWrapper id="about" theme={theme}>
			<DelayedSlideInFade enterTimeout={500} style={{margin: '0 auto', maxWidth: 'max-content'}}>
				<Header link="#about" id="about">About</Header>
				<div style={{ maxWidth: theme.spacing.ss160, marginBottom: theme.spacing.ss24 }}>
					<DelayedSlideInFade enterTimeout={250}>
						<Typography style={{marginBottom: theme.spacing.ss2}} sizeVariant={4}>
							Hi! I'm Nick, and I live and work in New York. I enjoy creating beautiful, performant web applications both by user experience and code quality. 
						</Typography>
					</DelayedSlideInFade>
					<DelayedSlideInFade enterTimeout={250}>
						<Typography sizeVariant={4}>
							After graduating from University of Virginia, I fell in love with software engineering and data analysis. Below are some of the tools and technologies I've worked with recently:
						</Typography>
					</DelayedSlideInFade>
				</div>
				<TechnologyList />
			</DelayedSlideInFade>
		</AboutWrapper>
	);
};


const AboutWrapper = styled('div')<{theme: Theme}>`
	display: flex;
	flex-direction: column;
	justify-content: center;
	min-height: 100vh;
	position: relative;
	background-color: ${p => p.theme.colors.background};
	margin-top: 100vh;
	margin-bottom: 64px;
	padding-top: ${p => p.theme.spacing.ss16};
	width: 100%;
`;

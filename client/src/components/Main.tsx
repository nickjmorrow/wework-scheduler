/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import {
	ArgumentType,
	Footer,
	getThemeFromNewInputs,
	StyleConstant,
	ThemeContext,
	updateThemeInputs,
	useThemeContext,
	PopulatedAppBar,
} from '@nickjmorrow/react-component-library';
import React from 'react';
import styled from 'styled-components';
import { FOOTER_HEIGHT, GITHUB_LINK } from '../constants';
import { Assignments } from './Assignments';
import { Chores } from './Chores';
import { Laborers } from './Laborers';
import './layout.css';
import { SetPassword } from './SetPassword';

const hues = [330, 200];
const chosenHue = hues[Math.floor(Math.random() * hues.length)];

const themeInputs: ArgumentType<typeof updateThemeInputs>[0] = {
	typography: {
		fontFamily: {
			default: 'Overpass, sans-serif',
			title: 'Patua One, sans-serif',
		},
	},
	colors: {
		core: {
			hue: chosenHue,
		},
	},
	defaultShowBoxShadow: false,
};

export const Main: React.FC = () => {
	const theme = useThemeContext();

	return (
		<ThemeContext.Provider value={getThemeFromNewInputs(themeInputs)}>
			<Wrapper>
				<PopulatedAppBar appName={'WeWork Scheduler'} styleVariant={2} githubLink={GITHUB_LINK} />
				<StyledMain spacing={theme.spacing}>
					<Assignments />
					<Chores />
					<Laborers />
					<SetPassword />
				</StyledMain>
				<Footer />
			</Wrapper>
		</ThemeContext.Provider>
	);
};

export default Main;

const Wrapper = styled.div`
	min-height: 100vh;
	width: 100%;
	position: relative;
	display: flex;
	flex-direction: column;
	padding-bottom: ${FOOTER_HEIGHT};
`;

const StyledMain = styled('div')<{ spacing: StyleConstant<'spacing'> }>`
	width: max-content;
	margin: 0 auto;
`;

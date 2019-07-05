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
	ThemeContext,
	updateThemeInputs,
	useThemeContext,
	StyleConstant,
} from '@nickjmorrow/react-component-library';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { FOOTER_HEIGHT } from '../constants';
import './layout.css';
import { ChoreList } from './ChoreList';
import { AddChore } from './AddChore';


const themeInputs: ArgumentType<typeof updateThemeInputs>[0] = {
	typography: {
		fontFamily: {
			default: 'Overpass, sans-serif',
		},
	},
	defaultShowBoxShadow: false,
};

export const Main: React.FC = () => {
	const theme = useThemeContext();
	const horizontalMargin = theme.spacing.ss16;
	return (
		<ThemeContext.Provider value={getThemeFromNewInputs(themeInputs)}>
			<Wrapper>
				
				<StyledMain spacing={theme.spacing}>
					
					<div style={{ backgroundColor: 'white' }}>
						
							
						heyyyyy
					</div>
					<ChoreList />
					<AddChore />
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
	
`;

import {
	Fade,
	StyleConstant,
	Typography,
	useThemeContext,
	GithubIcon,
	LinkedInIcon,
} from '@nickjmorrow/react-component-library';
import * as React from 'react';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import styled from 'styled-components';
import { enterTimeout } from '../constants';
import { Button } from './shared/Button';
import { SlideInFade } from './shared/SlideInFade';
import { Theme } from '@nickjmorrow/react-component-library/dist/typeUtilities';

export const AppBar: React.FC = () => {
	const theme = useThemeContext();
	const { spacing } = theme;
	return (
		<Fade
			in={true}
			appear={true}
			enterTimeout={enterTimeout.appBarAppears}
			styleKeys={['top']}
			unmounted={{ top: '-100px' }}
			mounted={{ top: '0px' }}
			style={{ position: 'fixed', zIndex: 0 }}
			transitionVariant={'slow'}
		>
			<StyledAppBar spacing={spacing}>
				<LeftWrapper theme={theme}>
					<GithubIcon colorVariant={'secondaryLight'} />
					<LinkedInIcon colorVariant={'secondaryLight'} />
					
				</LeftWrapper>
				<RightWrapper theme={theme}>
					<AnchorLink href="#about" offset={'-52'}>
						<SlideInFade enterTimeout={enterTimeout.aboutAppears}>
							<LinkTypography>About</LinkTypography>
						</SlideInFade>
					</AnchorLink>
					<AnchorLink href="#experience">
						<SlideInFade enterTimeout={enterTimeout.experienceAppears}>
							<LinkTypography>Experience</LinkTypography>
						</SlideInFade>
					</AnchorLink>
					<AnchorLink href="#work">
						<SlideInFade enterTimeout={enterTimeout.workAppears}>
							<LinkTypography>Work</LinkTypography>
						</SlideInFade>
					</AnchorLink>
					<AnchorLink href="#contact">
						<SlideInFade enterTimeout={enterTimeout.contactAppears}>
							<LinkTypography>Contact</LinkTypography>
						</SlideInFade>
					</AnchorLink>
					<SlideInFade enterTimeout={enterTimeout.resumeAppears}>
						<Button leftColor={'hsl(50, 100%, 50%)'} rightColor={'hsl(330, 100%, 70%)'}>
							Resume
						</Button>
					</SlideInFade>
				</RightWrapper>
			</StyledAppBar>
		</Fade>
	);
};

const LinkTypography: React.FC = ({ children }) => (
	<Typography
		isInteractive={true}
		colorSet={{ color: 'hsla(0,0%,100%,1)', colorActive: 'hsla(0,0%,100%,0.7)', colorHover: 'hsla(0,0%,100%,0.7)' }}
		weightVariant={8}
		colorVariant={'primaryLight'}
		sizeVariant={4}
	>
		{children}
	</Typography>
);

const StyledAppBar = styled('header')<{ spacing: StyleConstant<'spacing'> }>`
	display: grid;
	flex-direction: row;
	justify-content: space-between;
	grid-auto-flow: column;
	grid-column-gap: ${p => p.spacing.ss8};
	height: ${p => p.spacing.ss24};
	align-items: center;
	padding: 0 120px;
	right: 0;
	left: 0;
	position: absolute;
	opacity: 0.8;
	z-index: -1;
`;

const RightWrapper = styled('div')<{ theme: Theme }>`
	display: grid;
	grid-auto-flow: column;
	grid-column-gap: ${p => p.theme.spacing.ss8};
	align-items: center;
`;

const LeftWrapper = styled('div')<{ theme: Theme }>`
	display: grid;
	grid-auto-flow: column;
	grid-column-gap: ${p => p.theme.spacing.ss8};
`;

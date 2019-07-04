import {
	ArrowIcon,
	Fade,
	StyleConstant,
	Theme,
	Typography,
	useThemeContext,
} from '@nickjmorrow/react-component-library';
import { graphql, useStaticQuery } from 'gatsby';
import Img from 'gatsby-image';
import * as React from 'react';
import styled from 'styled-components';
import { enterTimeout } from '../constants';
import { flickerWord } from '../utilities';
import { SlideInFade } from './shared/SlideInFade';
import Typist from 'react-typist';
import 'react-typist/dist/Typist.css'
import TypistLoop from 'react-typist-loop';

export const query = graphql`
	query {
		file(relativePath: { eq: "space.jpg" }) {
			childImageSharp {
				# Specify the image processing specifications right in the query.
				# Makes it trivial to update as your page's design changes.
				fluid {
					...GatsbyImageSharpFluid
				}
			}
		}
	}
`;

export const Headline: React.FC = () => {
	const theme = useThemeContext();
	const { file } = useStaticQuery(query);
	const availableCallToActions = ['beautiful', 'performant', 'secure', 'beautiful'];

	return (
		<div style={{ position: 'fixed', height: '100vh', width: '100%', zIndex: -1 }}>
			<ImageWrapper style={{ position: 'relative', zIndex: -10 }}>
				<Image fluid={file.childImageSharp.fluid} />
			</ImageWrapper>
			<Fade in={true} appear={true} enterTimeout={enterTimeout.headlineAppears} transitionVariant={'slow'}>
				<HeadlineWrapper theme={theme}>
					<div style={{ marginBottom: theme.spacing.ss4 }}>
						<Content spacing={theme.spacing}>
							<Typography
								colorVariant={'primaryLight'}
								sizeVariant={5}
								style={{ display: 'block', marginBottom: '24px' }}
							>
								Hello, my name is
							</Typography>

							<Typography
								weightVariant={7}
								styleVariant={1}
								sizeVariant={11}
								colorVariant={'primaryLight'}
								style={{ display: 'block', marginBottom: '48px' }}
							>
								Nicholas Morrow
							</Typography>

							<div style={{display: 'flex', flexDirection: 'row'}}>
								<Typography
									weightVariant={7}
									colorVariant={'primaryLight'}
									sizeVariant={6}
									style={{ display: 'block' }}
								>
									Let's build something{' '}
									
								</Typography>
								<Typography colorVariant={'primaryLight'} sizeVariant={6} weightVariant={7} style={{marginLeft: '7px'}}>
									<TypistLoop interval={1000} style={{display: 'inline'}}>
											{['beautiful', 'performant', 'secure'].map(text => (
												<Typist key={text} startDelay={0} style={{display: 'inline'}}>
													{text}
													<Typist.Backspace count={text.length} delay={2000} />
												</Typist>
											))}
										</TypistLoop>
								</Typography>
							</div>
						</Content>
					</div>
				</HeadlineWrapper>
			</Fade>
			<div
				style={{
					position: 'absolute',
					bottom: 0,
					top: 'none !important',
					width: '100%',
					display: 'flex',
					justifyContent: 'center',
				}}
			>
				<SlideInFade
					enterTimeout={enterTimeout.downArrowIconAppears}
					style={{ width: 'max-content', position: 'relative' }}
				>
					<ArrowIcon sizeVariant={4} colorVariant={'primaryLight'} style={{ transform: 'rotate(90deg)' }} />
				</SlideInFade>
			</div>
		</div>
	);
};

const HeadlineWrapper = styled('div')<{ theme: Theme }>`
	height: 100vh;
	display: flex;
	align-items: flex-start;
	flex-direction: column;
	justify-content: flex-start;
	position: relative;
	top: 180px;
	margin-left: ${p => p.theme.spacing.ss24};
	width: max-content;
	height: max-content;
	padding: 18px;
	border-radius: 6px;
`;

const Content = styled('div')<{ spacing: StyleConstant<'spacing'> }>`
	margin: ${p => p.spacing.ss6} 0px;
`;

const Image = styled(Img)`
	position: absolute !important;
	width: 100%;
	height: 100vh;
	z-index: -10;
	filter: brightness(60%) contrast(110%);
`;

const ImageWrapper = styled.div``;

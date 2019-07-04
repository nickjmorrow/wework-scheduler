import * as React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { DelayedSlideInFade } from './shared/DelayedSlideInFade';
import { Header } from './shared/Header';
import { TextInput, useThemeContext, StyleConstant } from '@nickjmorrow/react-component-library';
import { Theme } from '../types';
import { enterTimeout } from '../constants';
import { SlideInFade } from './shared/SlideInFade';
import { Button } from './shared/Button';

export const Contact: React.FC = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [message, setMessage] = useState('');
	const theme = useThemeContext();
	const { border, colors, typography, spacing } = theme;
	return (
		<Wrapper>
			<DelayedSlideInFade enterTimeout={enterTimeout.contactAppears} style={{ backgroundColor: 'white', position: 'relative' }}>
				<section id="contact">
					<ContactWrapper theme={theme}>
						<Header>Contact</Header>
						<Form spacing={spacing}>
							<SlideInFade enterTimeout={enterTimeout.contactNameAppears}>
								<TextInput
									style={{ width: '100%' }}
									value={name}
									onChange={e => setName(e.currentTarget.value)}
									placeholder={'Name'}
								/>
							</SlideInFade>
							<SlideInFade enterTimeout={enterTimeout.contactEmailAppears}>
								<TextInput
									style={{ width: '100%' }}
									value={email}
									onChange={e => setEmail(e.currentTarget.value)}
									placeholder={'Email'}
								/>
							</SlideInFade>
							<SlideInFade enterTimeout={enterTimeout.contactMessageAppears}>
								<TextArea
									spacing={spacing}
									colors={colors}
									typography={typography}
									border={border}
									value={message}
									onChange={e => setMessage(e.currentTarget.value)}
									placeholder={'Enter your message here'}
								/>
							</SlideInFade>
							<SlideInFade enterTimeout={enterTimeout.contactSendMessageAppears}>
								<Button
									useMargin={false}
									styleVariant={1}
									leftColor={'white'}
									rightColor={'white'}
									style={{ backgroundImage: 'linear-gradient(40deg, pink, purple)', opacity: 0.9, '&:hover': {
										color: 'red'
									} }}
								>
									Send Message
								</Button>
							</SlideInFade>
						</Form>
					</ContactWrapper>
				</section>
			</DelayedSlideInFade>
		</Wrapper>
	);
};

const ContactWrapper = styled('div')<{ theme: Theme }>`
	height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
	padding: ${p => p.theme.spacing.ss16};
	margin: 0 auto;
	max-width: ${p => p.theme.spacing.ss192};
`;

const Form = styled('form')<{ spacing: StyleConstant<'spacing'> }>`
	display: grid;
	grid-auto-flow: row;
	grid-row-gap: ${p => p.spacing.ss8};
	width: 100%;
	margin: ${p => p.spacing.ss6} auto 0 auto;
`;

const TextArea = styled('textarea')<{
	border: StyleConstant<'border'>;
	colors: StyleConstant<'colors'>;
	typography: StyleConstant<'typography'>;
	spacing: StyleConstant<'spacing'>;
}>`
	border-radius: ${p => p.border.borderRadius.br1};
	background-color: ${p => p.colors.neutral.cs2};
	border: none;
	font-family: ${p => p.typography.fontFamily.default};
	font-size: ${p => p.typography.fontSizes.fs3};
	padding: ${p => p.spacing.ss3};
	width: 100%;
	min-height: 100px;
	&:focus {
		border: none;
		outline: none;
	}
`;

const Wrapper = styled.div`
	background-color: white;
	min-height: 100vh;
	width: 100%;
`;
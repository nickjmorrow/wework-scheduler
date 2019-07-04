import { Typography, useThemeContext } from '@nickjmorrow/react-component-library';
import * as React from 'react';
import styled from 'styled-components';
import { Experience } from '../types';

type Theme = ReturnType<typeof useThemeContext>;

export const Timeline: React.FC<{ experiences: Experience[]; activeExperience: Experience; setActiveExperience: (e: Experience) => void }> = ({
	experiences,
	activeExperience,
	setActiveExperience
}) => {
	const theme = useThemeContext();
	
	return (
		<TimelineWrapper theme={theme}>
			{experiences.sort((a, b) => a.experienceId < b.experienceId ? -1 : 1).map((e, i, arr) => (
				<TimelineExperience key={e.experienceId} onClick={() => setActiveExperience(e)} theme={theme} isActive={e.experienceId === activeExperience.experienceId} isFirst={i === 0} isLast={i === arr.length - 1}>
					<Typography weightVariant={e.experienceId === activeExperience.experienceId ? 7 : 5}>{e.name}</Typography>
				</TimelineExperience>
			))}
		</TimelineWrapper>
	);
};

const TimelineWrapper = styled('div')<{theme: Theme}>`
	display: flex;
	flex-direction: column;
	margin-right: ${p => p.theme.spacing.ss6};
	border-radius: 60px;
	overflow: none;
	height: min-content;
	box-sizing: border-box;
`;

const TimelineExperience = styled('div')<{theme: Theme; isFirst: boolean; isLast: boolean}>`
	box-sizing: border-box;
	padding: ${p => p.theme.spacing.ss3};
	background-color: ${p => p.isActive ? p.theme.colors.core.cs2 : p.theme.colors.neutral.cs2};
	border-left: ${p => p.isActive && `${p.theme.border.borderStyle.bs3} ${p.theme.colors.core.cs3}`};
	transition-property: border, background-color;
	transition-timing-function: ${p => p.theme.transitions.transitionTimingFunction};
	transition-duration: ${p => p.theme.transitions.durations.fast}ms;
	min-width: ${p => p.theme.spacing.ss48};
	cursor: pointer;
	border-top-left-radius: ${p => p.isFirst ? p.theme.border.borderRadius.br1 : 'none'};
	border-top-right-radius: ${p => p.isFirst ? p.theme.border.borderRadius.br1 : 'none'};
	border-bottom-left-radius: ${p => p.isLast ? p.theme.border.borderRadius.br1 : 'none'};
	border-bottom-right-radius: ${p => p.isLast ? p.theme.border.borderRadius.br1 : 'none'};
	&: hover {
		background-color: ${p => p.isActive ? p.theme.colors.core.cs2 : p.theme.colors.core.cs1};
	}
`;
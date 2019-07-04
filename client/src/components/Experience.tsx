import { ArrowIcon, Link, Typography, useThemeContext } from '@nickjmorrow/react-component-library';
import * as React from 'react';
import styled from 'styled-components';
import { Experience as ExperienceType, Theme } from '../types';
import { getFormattedDate } from '../utilities';
import { TechnologyEmphasizedTypography } from './TechnologyEmphasizedTypography';
import { DelayedSlideInFade } from './shared/DelayedSlideInFade';

// TODO: need I rename the type? is that a linting configuration?
export const Experience: React.FC<{ experience: ExperienceType }> = ({ experience }) => {
	const theme = useThemeContext();

	return (
		<ExperienceWrapper theme={theme}>
			<RoleName>
				<Typography sizeVariant={5}>{experience.roleName}</Typography>
			</RoleName>
			<OrganizationName>
				<Link route={'mastercard.com'}><Typography colorVariant={'secondaryDark'}>{experience.name}</Typography></Link>
			</OrganizationName>
			<Timeframe experience={experience} />
			<ExperienceDetailList theme={theme}>
				{experience.experienceDetails.map(ed => (
					<DelayedSlideInFade enterTimeout={500} key={ed.experienceDetailId}>
						<ExperienceDetail key={ed.description}>
							<BulletPointWrapper>
								<ArrowIcon style={{position: 'relative', top: '5px'}}sizeVariant={1} />
							
							</BulletPointWrapper>
							<div>
								<TechnologyEmphasizedTypography text={ed.description} />
							</div>
						</ExperienceDetail>
					</DelayedSlideInFade>
				))}
			</ExperienceDetailList>
		</ExperienceWrapper>
	);
};



const BulletPointWrapper = styled.div`
	display: flex;
	align-items: flex-start;
	margin-right: 10px;
`;

const RoleName = styled.div``;

const OrganizationName = styled.div``;

const Timeframe: React.FC<{ experience: ExperienceType }> = ({ experience }) => (
	<Typography colorVariant={'secondaryDark'}>
		{getFormattedDate(experience.startDate)}
		{` to `}
		{experience.endDate ? getFormattedDate(experience.endDate) : 'Present'}
	</Typography>
);

const ExperienceInfoList = styled.div``;

const ExperienceInfo = styled.div``;

const ExperienceWrapper = styled('div')<{ theme: Theme }>`
	min-width: ${p => p.theme.spacing.ss96};
`;

const ExperienceDetailList = styled('ul')<{ theme: Theme }>`
	margin: 0;
	margin-top: ${p => p.theme.spacing.ss6};
`;

const ExperienceDetail = styled('li')<{ theme: Theme }>`
	list-style-type: none;
	display: flex;
	flex-direction: row;
`;

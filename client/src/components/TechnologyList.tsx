import * as React from 'react';
import styled from 'styled-components';
import { graphql, useStaticQuery } from 'gatsby';
import { Technology, Theme, TechnologyType } from '../types';
import { BulletPoint } from './shared/BulletPoint';
import {
	Typography,
	SeleniumIcon,
	GitIcon,
	ReduxIcon,
	PostgreSQLIcon,
	JenkinsCIIcon,
	JestIcon,
	StyledComponentsIcon,
	useThemeContext,
	ArrowIcon,
	CSharpIcon,
	SQLServerIcon,
	ReactJSIcon,
	NodeJSIcon,
	MongoDBIcon,
	NETCoreIcon,
	JavaScriptIcon,
	TypeScriptIcon,
	GithubIcon,
	Paper,
	ExpansionPanel,
} from '@nickjmorrow/react-component-library';
import { DelayedSlideInFade } from './shared/DelayedSlideInFade';
export const GatsbyQuery = graphql`
	{
		data {
			technologies {
				name
				version
				technologyType {
					technologyTypeId
					name
				}
				skillLevel {
					skillLevelId
					description
				}
			}
		}
	}
`;

export const TechnologyList: React.FC = () => {
	const { data } = useStaticQuery<{ data: { technologies: Technology[] } }>(GatsbyQuery);
	if (data === null) {
		return null;
	}
	const { technologies } = data;
	// TODO: remove this comment
	const theme = useThemeContext();
	const technologyTypes = technologies.reduce<TechnologyType[]>((agg, cur) => {
		if (agg.findIndex(tti => tti.technologyTypeId === cur.technologyType.technologyTypeId) === -1) {
			agg.push(cur.technologyType);
		}
		return agg;
	}, []);
	return (
		<DelayedSlideInFade enterTimeout={1000}>
			<Paper style={{ minWidth: theme.spacing.ss128, padding: '16px 0' }}>
				<TechnologiesWrapper theme={theme}>
					{technologyTypes.map(tti => {
						const relevantTechnologies = technologies.filter(
							t => t.technologyType.technologyTypeId === tti.technologyTypeId,
						);
						const proficientTechnologies = relevantTechnologies
							.filter(rt => rt.skillLevel.skillLevelId === 2)
							.filter((rt, i) => i < 3);
						return (
							<ExpansionPanel
								styleApi={{
									wrapperStyle: {
										boxShadow: 'none',
										width: '200px'
									},
								}}
								rightComponent={(isOpened: boolean) => (
									<TechnologyTypeWrapper>
										<Typography sizeVariant={5}>{tti.name}</Typography>
										<ProficientIconTechnologyList>
											{proficientTechnologies.map(pt => (
												<div style={{ marginRight: '16px' }}>{iconMap[pt.name]}</div>
											))}
										</ProficientIconTechnologyList>
									</TechnologyTypeWrapper>
								)}
								hiddenContent={
									<div style={{display: 'flex', flexFlow: 'column wrap'}}>
										{relevantTechnologies.map(rt => (
											<div
												key={rt.technologyId}
												style={{
													marginLeft: '24px',
													display: 'flex',
													marginBottom: '16px',
													opacity: rt.skillLevel.skillLevelId === 1 ? 0.6 : 1,
													width: '200px',
												}}
											>
												<div style={{minWidth: '30px', display: 'flex', alignItems: 'center'}}>
													{iconMap[rt.name]}
												</div>
												<Typography style={{ marginLeft: '8px' }}>{rt.name}</Typography>
											</div>
										))}
									</div>
								}
							/>
						);
					})}
				</TechnologiesWrapper>
			</Paper>
		</DelayedSlideInFade>
	);
};

const TechnologyTypeWrapper = styled.div`
	padding: 8px;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	width: 450px;
`;

const TechnologiesWrapper = styled('ul')<{ theme: Theme }>`
	margin: 0;
	display: flex;
	flex-direction: column;
`;

const TechnologyWrapper = styled('li')<{ theme: Theme }>`
	list-style-type: none;
	display: flex;
	align-items: center;
	padding: 8px;
	margin: 4px;
	width: 220px;
	justify-content: space-between;
	border-radius: 6px;
	cursor: pointer;
	color: ${p => p.theme.colors.neutral.cs5};
	transition: all ${p => p.theme.transitions.medium};
	&: hover {
		box-shadow: ${p => p.theme.boxShadow.bs1};
		transition: all ${p => p.theme.transitions.medium};
		color: ${p => p.theme.colors.core.cs5};
	}
`;

const iconMap = {
	'C#': <CSharpIcon sizeVariant={3} />,
	'SQL Server': <SQLServerIcon sizeVariant={3} />,
	React: <ReactJSIcon sizeVariant={3} />,
	'Node.js': <NodeJSIcon sizeVariant={3} />,
	MongoDB: <MongoDBIcon sizeVariant={3} />,
	'.NET': <NETCoreIcon sizeVariant={3} />,
	JavaScript: <JavaScriptIcon sizeVariant={3} />,
	TypeScript: <TypeScriptIcon sizeVariant={3} />,
	Git: <GitIcon sizeVariant={3} />,
	Redux: <ReduxIcon sizeVariant={3} />,
	PostgreSQL: <PostgreSQLIcon sizeVariant={3} />,
	'Jenkins CI': <JenkinsCIIcon sizeVariant={3} />,
	'Styled Components': <StyledComponentsIcon style={{fontSize: '22px'}} />,
	Jest: <JestIcon sizeVariant={3} />,
	Selenium: <SeleniumIcon sizeVariant={3} />,
};

const RelevantTechnologyListWrapper = styled('div')<{ theme: Theme }>`
	display: flex;
	flex-direction: column;
`;

const ProficientIconTechnologyList = styled.div`
	display: flex;
	flex-direction: row;
`;
